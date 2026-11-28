"""Baut für jedes Produkt ein 3D-Modell in Blender, legt das Packungsfoto als Textur auf und rendert es."""
import bpy, bmesh, json, math, sys, os
import numpy as np

TEX, OUT, PRODS = sys.argv[1], sys.argv[2], sys.argv[3]
ONLY = set(sys.argv[4].split(",")) if len(sys.argv) > 4 and sys.argv[4] else None
SAMPLES = 64

prods = json.load(open(PRODS))
aspect = json.load(open(os.path.join(TEX, "aspect.json")))


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    sc.cycles.samples = SAMPLES
    sc.cycles.use_denoising = True
    sc.render.film_transparent = True
    sc.render.resolution_x = sc.render.resolution_y = 640
    sc.render.image_settings.file_format = "PNG"
    sc.render.image_settings.color_mode = "RGBA"
    sc.view_settings.view_transform = "Standard"
    w = bpy.data.worlds.new("w"); sc.world = w; w.use_nodes = True
    w.node_tree.nodes["Background"].inputs[0].default_value = (1, 1, 1, 1)
    w.node_tree.nodes["Background"].inputs[1].default_value = 0.55
    return sc


def material(img_path, side_rgb, rough=0.35):
    m = bpy.data.materials.new("m"); m.use_nodes = True
    nt = m.node_tree; bsdf = nt.nodes["Principled BSDF"]
    bsdf.inputs["Roughness"].default_value = rough
    try: bsdf.inputs["Coat Weight"].default_value = 0.25
    except KeyError: pass
    tex = nt.nodes.new("ShaderNodeTexImage"); tex.image = bpy.data.images.load(img_path)
    tex.extension = "EXTEND"
    nt.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
    side = bpy.data.materials.new("s"); side.use_nodes = True
    sb = side.node_tree.nodes["Principled BSDF"]
    sb.inputs["Base Color"].default_value = (*side_rgb, 1); sb.inputs["Roughness"].default_value = rough
    return m, side


def edge_color(img_path):
    im = bpy.data.images.load(img_path)
    px = np.array(im.pixels[:]).reshape(im.size[1], im.size[0], 4)[:, :, :3]
    hh, ww = px.shape[:2]; c = np.median(px[int(hh*.3):int(hh*.7), int(ww*.3):int(ww*.7)].reshape(-1, 3), axis=0) * 0.9
    bpy.data.images.remove(im)
    return tuple(float(v) for v in c)


def new_obj(name, bm):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(ob)
    return ob


def planar_uv(ob, w, h, zmin):
    me = ob.data; uv = me.uv_layers.new()
    for poly in me.polygons:
        for li in poly.loop_indices:
            v = me.vertices[me.loops[li].vertex_index].co
            u = v.x / w + 0.5
            if v.y < -1e-4 and abs(poly.normal.y) > 0.5:  # Rückseite gespiegelt
                u = u
            uv.data[li].uv = (min(max(u, 0), 1), min(max((v.z - zmin) / h, 0), 1))


def pillow(w, h, depth, crimp=0.07, n=48, flat_bottom=False):
    """Kissenförmige Tüte / Beutel: Vorder- und Rückseite mit Wölbung, Siegelnähte oben/unten."""
    bm = bmesh.new(); grid = {}
    for side in (1, -1):
        for i in range(n + 1):
            for j in range(n + 1):
                x = (i / n - 0.5) * w; z = j / n * h
                zz = (z / h) * 2 - 1
                lim = 1 - crimp * 2
                fz = max(0.0, 1 - (zz / lim) ** 2) ** 0.5 if abs(zz) < lim else 0.0
                if flat_bottom and zz < 0: fz = max(fz, 0.0) ** 0.6 if abs(zz) < lim else 0
                fx = max(0.0, 1 - (2 * x / w) ** 2) ** 0.45
                y = -side * depth * fx * fz
                grid[(side, i, j)] = bm.verts.new((x, y, z))
    for side in (1, -1):
        for i in range(n):
            for j in range(n):
                q = [grid[(side, i, j)], grid[(side, i + 1, j)], grid[(side, i + 1, j + 1)], grid[(side, i, j + 1)]]
                bm.faces.new(q if side == 1 else q[::-1])
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    return bm


def box(w, h, d, bevel=0.03):
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.scale(bm, vec=(w, d, h), verts=bm.verts)
    bmesh.ops.translate(bm, vec=(0, 0, h / 2), verts=bm.verts)
    if bevel: bmesh.ops.bevel(bm, geom=list(bm.edges), offset=bevel, segments=3, affect="EDGES")
    return bm


def lathe(profile, seg=64):
    """Rotationskörper aus (r, z)-Profil."""
    bm = bmesh.new(); rings = []
    for r, z in profile:
        ring = [bm.verts.new((r * math.sin(a), -r * math.cos(a), z)) for a in [2 * math.pi * k / seg for k in range(seg)]]
        rings.append(ring)
    for a, b in zip(rings, rings[1:]):
        for k in range(seg):
            bm.faces.new([a[k], a[(k + 1) % seg], b[(k + 1) % seg], b[k]])
    bm.faces.new(rings[0][::-1]); bm.faces.new(rings[-1])
    return bm


def assign(ob, front, side, front_test):
    ob.data.materials.append(front); ob.data.materials.append(side)
    for p in ob.data.polygons:
        p.material_index = 0 if front_test(p) else 1
        p.use_smooth = True


def cap(x, z, r, hgt, rgb):
    bm = lathe([(r, z), (r, z + hgt * 0.2), (r * 1.1, z + hgt * 0.25), (r * 1.1, z + hgt), (r * 0.9, z + hgt * 1.02)], 40)
    ob = new_obj("cap", bm); ob.location.x = x
    m = bpy.data.materials.new("c"); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]; b.inputs["Base Color"].default_value = (*rgb, 1); b.inputs["Roughness"].default_value = 0.4
    ob.data.materials.append(m)
    for p in ob.data.polygons: p.use_smooth = True
    return ob


def build(p):
    slug, shape = p["slug"], p["shape"]
    img = os.path.join(TEX, slug + ".png"); a = aspect[slug][0]
    side_rgb = edge_color(img)
    front, side = material(img, side_rgb)
    H = 2.0; W = H * a; objs = []
    if shape in ("bag",):
        ob = new_obj("bag", pillow(W, H, min(W, H) * 0.16)); planar_uv(ob, W, H, 0)
        assign(ob, front, side, lambda q: True)
    elif shape == "pouch":
        ob = new_obj("pouch", pillow(W, H, W * 0.14, crimp=0.04)); planar_uv(ob, W, H, 0)
        assign(ob, front, side, lambda q: True)
        if p["cap"]: objs.append(cap(0, H * 0.985, W * 0.13, H * 0.13, (0.08, 0.13, 0.45)))
    elif shape in ("box", "gum", "lighter"):
        d = {"box": 0.55, "gum": 0.32, "lighter": 0.6}[shape] * min(W, H)
        ob = new_obj("box", box(W, H, d, bevel=0.02 if shape != "gum" else 0.04)); planar_uv(ob, W, H, 0)
        assign(ob, front, side, lambda q: abs(q.normal.y) > 0.7)
    elif shape == "carton":
        ob = new_obj("carton", box(W, H, W, bevel=0.01)); planar_uv(ob, W, H, 0)
        assign(ob, front, side, lambda q: abs(q.normal.y) > 0.7)
        bm = bmesh.new()
        v = [bm.verts.new(c) for c in [(-W/2, -W/2, H), (W/2, -W/2, H), (W/2, W/2, H), (-W/2, W/2, H), (-W/2, 0, H + W*0.35), (W/2, 0, H + W*0.35)]]
        for f in ([v[0], v[1], v[5], v[4]], [v[2], v[3], v[4], v[5]], [v[1], v[2], v[5]], [v[3], v[0], v[4]]): bm.faces.new(f)
        top = new_obj("top", bm); top.data.materials.append(side); objs.append(top)
        objs.append(cap(W * 0.2, H + W * 0.12, W * 0.12, W * 0.18, (0.95, 0.8, 0.1)))
    elif shape in ("bottle", "wine"):
        r = W / 2
        if shape == "wine":
            prof = [(0.001, 0), (r, 0), (r, H * 0.62), (r * 0.8, H * 0.72), (r * 0.36, H * 0.8), (r * 0.34, H * 1.0), (r * 0.38, H * 1.02), (0.001, H * 1.02)]
        else:
            prof = [(0.001, 0), (r * 0.95, 0), (r, H * 0.05), (r, H * 0.68), (r * 0.6, H * 0.82), (r * 0.42, H * 0.86), (r * 0.42, H * 0.97), (0.001, H * 0.97)]
        ob = new_obj("bottle", lathe(prof)); planar_uv(ob, W, H, 0)
        assign(ob, front, side, lambda q: q.normal.y < 0.2)
        for m in (front, side):
            b = m.node_tree.nodes["Principled BSDF"]; b.inputs["Roughness"].default_value = 0.15
    objs.append(ob)
    return objs, W, H


def stage(objs, W, H):
    sc = bpy.context.scene
    for o in objs: o.rotation_euler.z = math.radians(-24)
    bpy.ops.mesh.primitive_plane_add(size=40); fl = bpy.context.active_object; fl.is_shadow_catcher = True
    bpy.context.view_layer.update()
    top = max(max((o.matrix_world @ v.co).z for v in o.data.vertices) for o in objs)
    top = max(top, H) * 1.03
    cam_data = bpy.data.cameras.new("cam"); cam_data.type = "ORTHO"; cam_data.ortho_scale = max(W * 1.3, top * 1.18)
    cam = bpy.data.objects.new("cam", cam_data); sc.collection.objects.link(cam); sc.camera = cam
    dist = 20; el = math.radians(14)
    cam.location = (0, -dist * math.cos(el), top / 2 + dist * math.sin(el))
    cam.rotation_euler = (math.radians(90) - el, 0, 0)
    for loc, en, size in [((-4, -6, 6), 1300, 5), ((5, -5, 3), 500, 6), ((0, 5, 6), 400, 4)]:
        ld = bpy.data.lights.new("l", "AREA"); ld.energy = en; ld.size = size
        lo = bpy.data.objects.new("l", ld); sc.collection.objects.link(lo); lo.location = loc
        d = -lo.location; lo.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()


for p in prods:
    if ONLY and p["slug"] not in ONLY: continue
    sc = reset()
    objs, W, H = build(p)
    stage(objs, W, H)
    sc.render.filepath = os.path.join(OUT, p["slug"] + ".png")
    bpy.ops.render.render(write_still=True)
    print("OK", p["slug"], flush=True)
