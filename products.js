// Produktkatalog Südstadt Kiosk & Shop
// price: Zahl in Euro, oder null = Preis noch offen (wird als "Preis folgt" angezeigt)
// shape: pouch | bottle | carton | bag | gum | box | wine | roll | lighter
// c1/c2 = Packungsfarben, tx = Textfarbe

const CATEGORIES = [
  { id: "getraenke", name: "Getränke", icon: "🥤" },
  { id: "energy",    name: "Energy & Sport", icon: "⚡" },
  { id: "wein",      name: "Wein", icon: "🍷" },
  { id: "chips",     name: "Chips & Knabbereien", icon: "🍟" },
  { id: "kerne",     name: "Kerne & Nüsse", icon: "🌻" },
  { id: "suess",     name: "Süßes & Gebäck", icon: "🍫" },
  { id: "kaugummi",  name: "Kaugummi & Bonbons", icon: "🍬" },
  { id: "alltag",    name: "Alltag", icon: "🔥" }
];

const PRODUCTS = [
  // ---------- Getränke ----------
  { cat:"getraenke", brand:"Capri-Sun", name:"Trinkbeutel – verschiedene Sorten", size:"200 ml", price:0.70, shape:"pouch", c1:"#1e3a8a", c2:"#38bdf8", tx:"#fff",
    info:"Der Klassiker im Trinkbeutel mit Strohhalm, z. B. Multivitamin, Orange oder Mystery Drink." },
  { cat:"getraenke", brand:"Capri-Sun", name:"Cherry & Pomegranate", size:"330 ml", price:null, shape:"pouch", cap:true, c1:"#1e3a8a", c2:"#e11d48", tx:"#fff",
    info:"Kirsche-Granatapfel im wiederverschließbaren Beutel mit Drehverschluss." },
  { cat:"getraenke", brand:"Capri-Sun", name:"Multivitamin", size:"330 ml", price:null, shape:"pouch", cap:true, c1:"#1e3a8a", c2:"#f59e0b", tx:"#fff",
    info:"Fruchtiges Multivitamin-Getränk im wiederverschließbaren Beutel." },
  { cat:"getraenke", brand:"Pfanner", name:"Refresh Vita Multivitamin", size:"Tetra Pak", price:null, shape:"carton", c1:"#f97316", c2:"#facc15", tx:"#14532d",
    info:"Erfrischendes Multivitamin-Fruchtgetränk mit Vitaminen." },
  { cat:"getraenke", brand:"Pfanner", name:"Refresh Vita Green Apple", size:"Tetra Pak", price:null, shape:"carton", c1:"#65a30d", c2:"#bef264", tx:"#14532d",
    info:"Erfrischendes Fruchtgetränk mit grünem Apfel und Vitaminen." },
  { cat:"getraenke", brand:"Twist and Drink", name:"Apfel", size:"Flasche", price:1.00, shape:"bottle", c1:"#16a34a", c2:"#86efac", tx:"#fff",
    info:"Fruchtsaftgetränk in der bunten Drehverschluss-Flasche – beliebt bei Kindern." },
  { cat:"getraenke", brand:"Twist and Drink", name:"Wildberry", size:"Flasche", price:null, shape:"bottle", c1:"#1d4ed8", c2:"#60a5fa", tx:"#fff",
    info:"Fruchtsaftgetränk mit Waldbeer-Geschmack in der Drehverschluss-Flasche." },

  // ---------- Energy & Sport ----------
  { cat:"energy", brand:"Capri-Sun", name:"Game On Energy Drink Mango Peach", size:"330 ml", price:null, shape:"pouch", cap:true, c1:"#facc15", c2:"#fde047", tx:"#1e3a8a",
    info:"Stilles Energy-Getränk mit Koffein (32 mg/100 ml), Taurin, Magnesium und Vitaminen C, B1, B6. Nicht für Kinder und Schwangere empfohlen." },
  { cat:"energy", brand:"Capri-Sun", name:"Game On Energy Drink Red Berry", size:"330 ml", price:null, shape:"pouch", cap:true, c1:"#e11d48", c2:"#fb7185", tx:"#1e3a8a",
    info:"Stilles Energy-Getränk mit Beerengeschmack, Koffein, Taurin und Vitaminen. Nicht für Kinder und Schwangere empfohlen." },
  { cat:"energy", brand:"Capri-Sun", name:"+Electrolytes Blackberry & Raspberry", size:"330 ml", price:null, shape:"pouch", cap:true, c1:"#c0c4cc", c2:"#7c3aed", tx:"#1e3a8a",
    info:"Kalorienarmes Erfrischungsgetränk mit Elektrolyten (Magnesium) und Vitaminen – ohne Koffein." },

  // ---------- Wein ----------
  { cat:"wein", brand:"Rotwein", name:"Cabernet Sauvignon", size:"0,75 l", price:6.00, shape:"wine", c1:"#4c0519", c2:"#f5f5f4", tx:"#4c0519",
    info:"Kräftiger, trockener Rotwein. Abgabe nur ab 16 Jahren." },
  { cat:"wein", brand:"Rotwein", name:"Zweigelt", size:"0,75 l", price:6.00, shape:"wine", c1:"#3f0d12", c2:"#f5f5f4", tx:"#3f0d12",
    info:"Fruchtiger Rotwein aus Österreichs bekanntester Rebsorte. Abgabe nur ab 16 Jahren." },
  { cat:"wein", brand:"Rotwein", name:"Merlot", size:"0,75 l", price:null, shape:"wine", c1:"#450a0a", c2:"#f5f5f4", tx:"#450a0a",
    info:"Weicher, samtiger Rotwein. Abgabe nur ab 16 Jahren." },
  { cat:"wein", brand:"Rotwein", name:"Bordeaux Rouge", size:"0,75 l", price:null, shape:"wine", c1:"#3b0764", c2:"#fef3c7", tx:"#3b0764",
    info:"Klassischer französischer Rotwein aus dem Bordelais. Abgabe nur ab 16 Jahren." },
  { cat:"wein", brand:"Weißwein", name:"Chardonnay alkoholfrei (0 %)", size:"0,75 l", price:null, shape:"wine", c1:"#d9f99d", c2:"#67e8f9", tx:"#0e7490",
    info:"Alkoholfreie Alternative zum Weißwein – frisch und fruchtig." },

  // ---------- Chips & Knabbereien ----------
  { cat:"chips", brand:"Lay's", name:"Gesalzen", size:"150 g", price:2.50, shape:"bag", c1:"#facc15", c2:"#dc2626", tx:"#dc2626",
    info:"Klassische, dünne Kartoffelchips – einfach gesalzen." },
  { cat:"chips", brand:"Lay's", name:"Salt & Vinegar", size:"150 g", price:2.50, shape:"bag", c1:"#38bdf8", c2:"#dc2626", tx:"#dc2626",
    info:"Kartoffelchips mit Salz-und-Essig-Geschmack." },
  { cat:"chips", brand:"Lay's", name:"Sour Cream & Onion", size:"150 g", price:2.50, shape:"bag", c1:"#84cc16", c2:"#dc2626", tx:"#dc2626",
    info:"Kartoffelchips mit Sauerrahm-Zwiebel-Geschmack." },
  { cat:"chips", brand:"Lay's Max", name:"Chili & Lime", size:"185 g", price:2.50, shape:"bag", c1:"#111827", c2:"#22c55e", tx:"#fff",
    info:"Extra dicke Riffelchips mit Chili-Limetten-Geschmack." },
  { cat:"chips", brand:"funny-frisch", name:"Chipsfrisch Peperoni", size:"150 g", price:2.50, shape:"bag", c1:"#14532d", c2:"#ef4444", tx:"#facc15",
    info:"Würzige Kartoffelchips mit Peperoni-Geschmack." },
  { cat:"chips", brand:"funny-frisch", name:"Chipsfrisch Oriental", size:"150 g", price:2.50, shape:"bag", c1:"#14532d", c2:"#a855f7", tx:"#facc15",
    info:"Kartoffelchips mit orientalischer Gewürzmischung." },
  { cat:"chips", brand:"Takis", name:"Blue Heat", size:"Tüte", price:3.00, shape:"bag", c1:"#4c1d95", c2:"#2563eb", tx:"#facc15",
    info:"Gerollte Tortilla-Chips, sehr scharf mit Chili – berühmt für die blaue Farbe." },
  { cat:"chips", brand:"Crunchie", name:"Blue Flame", size:"Tüte", price:3.00, shape:"bag", c1:"#1e3a8a", c2:"#38bdf8", tx:"#fff",
    info:"Extrem knusprige, scharfe Snacks mit „Blue Flame“-Würzung." },
  { cat:"chips", brand:"Kartoffelchips", name:"Dicke Scheibe", size:"Tüte", price:1.00, shape:"bag", c1:"#78350f", c2:"#fbbf24", tx:"#fff",
    info:"Kräftig knusprige Kartoffelchips aus dicken Scheiben." },
  { cat:"chips", brand:"Cheetos", name:"Käse-Snack", size:"Tüte", price:null, shape:"bag", c1:"#f97316", c2:"#facc15", tx:"#fff",
    info:"Knusprige Mais-Snacks mit Käsegeschmack." },
  { cat:"chips", brand:"Snackline", name:"Frites Ketchup", size:"100 g", price:1.50, shape:"bag", c1:"#dc2626", c2:"#facc15", tx:"#fff",
    info:"Knusprige Kartoffel-Snacks in Pommes-Form mit Ketchup-Geschmack." },
  { cat:"chips", brand:"Snackline", name:"Mais Balls Käse", size:"125 g", price:1.50, shape:"bag", c1:"#f59e0b", c2:"#fde68a", tx:"#b91c1c",
    info:"Luftige Maisbällchen mit Käsegeschmack." },
  { cat:"chips", brand:"Snackline", name:"Spicy Cheese Balls", size:"125 g", price:1.50, shape:"bag", c1:"#dc2626", c2:"#fde047", tx:"#fff",
    info:"Maisbällchen mit Käse und einer feurigen Prise Pfeffer." },
  { cat:"chips", brand:"Snackline", name:"Popcorn salzig", size:"Tüte", price:1.50, shape:"bag", c1:"#2563eb", c2:"#fefce8", tx:"#fff",
    info:"Fertig gepopptes, gesalzenes Popcorn – ideal für den Filmabend." },
  { cat:"chips", brand:"Fibay", name:"BBQ Mais", size:"Tüte", price:1.50, shape:"bag", c1:"#111827", c2:"#dc2626", tx:"#fff",
    info:"Geröstete, knackige Maiskörner mit BBQ-Würzung." },

  // ---------- Kerne & Nüsse ----------
  { cat:"kerne", brand:"Fibay Dakota", name:"Sonnenblumenkerne – geröstet & gesalzen", size:"ca. 150 g", price:1.20, shape:"bag", c1:"#86198f", c2:"#111827", tx:"#fff",
    info:"Geröstete Sonnenblumenkerne in der Schale, gesalzen – der Klassiker zum Knabbern." },
  { cat:"kerne", brand:"Fibay Dakota", name:"Sonnenblumenkerne – ungesalzen", size:"ca. 150 g", price:1.20, shape:"bag", c1:"#65a30d", c2:"#111827", tx:"#fff",
    info:"Geröstete Sonnenblumenkerne in der Schale, ohne Salz." },
  { cat:"kerne", brand:"Fibay Dakota", name:"Sonnenblumenkerne – extra gesalzen", size:"ca. 150 g", price:1.20, shape:"bag", c1:"#dc2626", c2:"#111827", tx:"#fff",
    info:"Geröstete Sonnenblumenkerne in der Schale, kräftig gesalzen." },
  { cat:"kerne", brand:"Fibay Dakota", name:"Sonnenblumenkerne – würzig", size:"ca. 140 g", price:1.20, shape:"bag", c1:"#ea580c", c2:"#7f1d1d", tx:"#fff",
    info:"Geröstete Sonnenblumenkerne mit pikanter Würzung." },
  { cat:"kerne", brand:"Fibay Dakota", name:"Sonnenblumenkerne – leicht gesalzen", size:"ca. 150 g", price:1.20, shape:"bag", c1:"#1f2937", c2:"#0ea5e9", tx:"#fff",
    info:"Geröstete Sonnenblumenkerne in der Schale, leicht gesalzen." },

  // ---------- Süßes & Gebäck ----------
  { cat:"suess", brand:"Milka", name:"Choco Grain", size:"Packung", price:2.00, shape:"box", c1:"#7c3aed", c2:"#c4b5fd", tx:"#fff",
    info:"Knusprige Vollkornkekse mit Milka-Alpenmilch-Schokolade." },
  { cat:"suess", brand:"Milka", name:"Choco Cow", size:"Packung", price:2.00, shape:"box", c1:"#7c3aed", c2:"#fff", tx:"#fff",
    info:"Kekse in Kuh-Form, mit Milka-Schokolade überzogen." },
  { cat:"suess", brand:"Oreo", name:"Original", size:"Packung", price:null, shape:"box", c1:"#1d4ed8", c2:"#111827", tx:"#fff",
    info:"Kakaokekse mit Vanille-Creme-Füllung – twist, lick, dunk." },
  { cat:"suess", brand:"Feiny Biscuits", name:"Wafers Vanilla", size:"125 g", price:2.00, shape:"box", c1:"#bae6fd", c2:"#fef3c7", tx:"#1e3a8a",
    info:"Knusprige Waffelschnitten mit Vanillecreme-Füllung." },
  { cat:"suess", brand:"Feiny Biscuits", name:"Wafers Zitrone", size:"125 g", price:2.00, shape:"box", c1:"#bef264", c2:"#fef9c3", tx:"#14532d",
    info:"Knusprige Waffelschnitten mit Zitronencreme-Füllung." },
  { cat:"suess", brand:"Feiny Biscuits", name:"Wafers Vanilla – große Packung", size:"250 g", price:3.00, shape:"bag", c1:"#d4d4d8", c2:"#facc15", tx:"#1e3a8a",
    info:"Waffeln mit Vanillecreme im großen Vorratsbeutel." },
  { cat:"suess", brand:"Feiny Biscuits", name:"Cubus Wafers", size:"125 g", price:1.50, shape:"bag", c1:"#fff", c2:"#dc2626", tx:"#7f1d1d",
    info:"Kleine Waffelwürfel mit Cremefüllung, z. B. Napolitaner (Haselnuss)." },
  { cat:"suess", brand:"Gebäck", name:"Florentiner", size:"Packung", price:2.50, shape:"box", c1:"#fef3c7", c2:"#a16207", tx:"#713f12",
    info:"Mandel-Karamell-Gebäck mit Schokoladenboden." },
  { cat:"suess", brand:"American Style", name:"Brownies", size:"Packung", price:3.00, shape:"box", c1:"#fff", c2:"#7c2d12", tx:"#7c2d12",
    info:"Saftige Schoko-Brownies mit Haselnussstückchen." },
  { cat:"suess", brand:"American Style", name:"Chocolate Chip Cookies", size:"Packung", price:2.00, shape:"box", c1:"#bfdbfe", c2:"#b45309", tx:"#1e3a8a",
    info:"Knusprige Cookies mit Schokostückchen." },
  { cat:"suess", brand:"Coco Nut", name:"Kokos-Kekse", size:"Packung", price:2.00, shape:"box", c1:"#0ea5e9", c2:"#fff", tx:"#fff",
    info:"Mürbe Kekse mit Kokosraspeln." },
  { cat:"suess", brand:"Merendine", name:"Strawberry", size:"10 Stück", price:null, shape:"box", c1:"#fff", c2:"#f43f5e", tx:"#be123c",
    info:"Weiche Biskuit-Snacks mit Erdbeerfüllung, einzeln verpackt." },
  { cat:"suess", brand:"ohlala", name:"fair choc", size:"Packung", price:3.00, shape:"box", c1:"#db2777", c2:"#78350f", tx:"#fff",
    info:"Schokoladen-Pralinen aus fair gehandeltem Kakao." },
  { cat:"suess", brand:"Fruchtgummi", name:"Peelable Gummies Mango", size:"Packung", price:1.30, shape:"box", c1:"#facc15", c2:"#22c55e", tx:"#166534",
    info:"Trendiges Schäl-Fruchtgummi mit Mango-Geschmack." },
  { cat:"suess", brand:"Fruchtgummi", name:"Super Sour Candy", size:"Tüte", price:1.00, shape:"bag", c1:"#a3e635", c2:"#7c3aed", tx:"#fff",
    info:"Extra saure Fruchtgummis." },

  // ---------- Kaugummi & Bonbons ----------
  { cat:"kaugummi", brand:"Extra", name:"Refreshers Bubblemint", size:"Dose", price:1.50, shape:"gum", c1:"#f9a8d4", c2:"#fff", tx:"#1d4ed8",
    info:"Weiche Kaugummi-Dragees mit flüssigem Kern, zuckerfrei." },
  { cat:"kaugummi", brand:"Extra", name:"Refreshers Peppermint", size:"Dose", price:null, shape:"gum", c1:"#60a5fa", c2:"#fff", tx:"#1d4ed8",
    info:"Weiche Kaugummi-Dragees mit Pfefferminz, zuckerfrei." },
  { cat:"kaugummi", brand:"Extra", name:"Refreshers Tropical", size:"Dose", price:null, shape:"gum", c1:"#facc15", c2:"#fff", tx:"#1d4ed8",
    info:"Weiche Kaugummi-Dragees mit tropischem Fruchtgeschmack, zuckerfrei." },
  { cat:"kaugummi", brand:"Extra", name:"Refreshers Strawberry Lemon", size:"Dose", price:null, shape:"gum", c1:"#fb7185", c2:"#fde047", tx:"#1d4ed8",
    info:"Weiche Kaugummi-Dragees mit Erdbeer-Zitronen-Geschmack, zuckerfrei." },
  { cat:"kaugummi", brand:"Extra", name:"Strong Mint", size:"10 Dragees", price:1.50, shape:"gum", c1:"#0ea5e9", c2:"#1e3a8a", tx:"#fff",
    info:"Zuckerfreier Kaugummi mit starkem Minzgeschmack." },
  { cat:"kaugummi", brand:"Extra", name:"Bubblemint", size:"10 Dragees", price:1.50, shape:"gum", c1:"#ec4899", c2:"#fbcfe8", tx:"#fff",
    info:"Zuckerfreier Kaugummi mit Bubblemint-Geschmack." },
  { cat:"kaugummi", brand:"Extra", name:"Spearmint", size:"10 Dragees", price:1.50, shape:"gum", c1:"#22c55e", c2:"#bbf7d0", tx:"#fff",
    info:"Zuckerfreier Kaugummi mit grüner Minze." },
  { cat:"kaugummi", brand:"Extra", name:"Fresh", size:"10 Dragees", price:null, shape:"gum", c1:"#3b82f6", c2:"#e0f2fe", tx:"#fff",
    info:"Zuckerfreier Kaugummi mit frischem Geschmack." },
  { cat:"kaugummi", brand:"Extra Professional", name:"White Himbeere-Granatapfel", size:"10 Dragees", price:1.50, shape:"gum", c1:"#e5e7eb", c2:"#be123c", tx:"#1e3a8a",
    info:"Zuckerfreier Zahnpflege-Kaugummi mit Himbeer-Granatapfel-Geschmack." },
  { cat:"kaugummi", brand:"Extra Professional", name:"White Citrus", size:"10 Dragees", price:1.50, shape:"gum", c1:"#e5e7eb", c2:"#facc15", tx:"#1e3a8a",
    info:"Zuckerfreier Zahnpflege-Kaugummi mit Zitrusgeschmack." },
  { cat:"kaugummi", brand:"Extra Professional", name:"White Mint", size:"10 Dragees", price:1.50, shape:"gum", c1:"#e5e7eb", c2:"#64748b", tx:"#1e3a8a",
    info:"Zuckerfreier Zahnpflege-Kaugummi mit Minzgeschmack." },
  { cat:"kaugummi", brand:"Airwaves", name:"Cherry Menthol", size:"10 Dragees", price:1.50, shape:"gum", c1:"#4c1d95", c2:"#e11d48", tx:"#fff",
    info:"Zuckerfreier Kaugummi mit Menthol-Eukalyptus und Kirsche – befreit die Atemwege." },
  { cat:"kaugummi", brand:"Airwaves", name:"Cool Cassis", size:"10 Dragees", price:1.50, shape:"gum", c1:"#1e1b4b", c2:"#7c3aed", tx:"#fff",
    info:"Zuckerfreier Kaugummi mit Menthol und schwarzer Johannisbeere." },
  { cat:"kaugummi", brand:"Airwaves", name:"Strong", size:"10 Dragees", price:1.50, shape:"gum", c1:"#1e3a8a", c2:"#0ea5e9", tx:"#fff",
    info:"Zuckerfreier Kaugummi mit extra starkem Menthol." },
  { cat:"kaugummi", brand:"Hubba Bubba", name:"Erdbeere", size:"5 Streifen", price:1.00, shape:"gum", c1:"#ec4899", c2:"#ef4444", tx:"#fff",
    info:"Weicher Bubble Gum mit Erdbeergeschmack – perfekt für große Blasen." },
  { cat:"kaugummi", brand:"Hubba Bubba", name:"Apfel", size:"5 Streifen", price:1.00, shape:"gum", c1:"#ec4899", c2:"#84cc16", tx:"#fff",
    info:"Weicher Bubble Gum mit Apfelgeschmack." },
  { cat:"kaugummi", brand:"Hubba Bubba", name:"Fancy Fruit", size:"5 Streifen", price:1.00, shape:"gum", c1:"#ec4899", c2:"#a855f7", tx:"#fff",
    info:"Weicher Bubble Gum mit Tutti-Frutti-Geschmack." },
  { cat:"kaugummi", brand:"Chupa Chups", name:"Babol Tutti Frutti", size:"6 Stück", price:null, shape:"gum", c1:"#f472b6", c2:"#facc15", tx:"#fff",
    info:"Fruchtiger Kaugummi mit Tutti-Frutti-Geschmack." },
  { cat:"kaugummi", brand:"Chupa Chups", name:"Babol Cola Lemon", size:"6 Stück", price:null, shape:"gum", c1:"#78350f", c2:"#facc15", tx:"#fff",
    info:"Kaugummi mit Cola-Zitrone-Geschmack." },
  { cat:"kaugummi", brand:"Fisherman's Friend", name:"Lemon", size:"25 g", price:null, shape:"gum", c1:"#fef08a", c2:"#fff", tx:"#b91c1c",
    info:"Extra starke Menthol-Pastillen mit Zitrone, zuckerfrei." },
  { cat:"kaugummi", brand:"Fisherman's Friend", name:"Mint", size:"25 g", price:null, shape:"gum", c1:"#6ee7b7", c2:"#fff", tx:"#b91c1c",
    info:"Extra starke Menthol-Pastillen mit Minze, zuckerfrei." },
  { cat:"kaugummi", brand:"Fisherman's Friend", name:"Spearmint", size:"25 g", price:null, shape:"gum", c1:"#5eead4", c2:"#fff", tx:"#b91c1c",
    info:"Extra starke Pastillen mit grüner Minze, zuckerfrei." },
  { cat:"kaugummi", brand:"Fisherman's Friend", name:"Kirsche", size:"25 g", price:null, shape:"gum", c1:"#f9a8d4", c2:"#fff", tx:"#b91c1c",
    info:"Extra starke Menthol-Pastillen mit Kirschgeschmack, zuckerfrei." },

  // ---------- Alltag ----------
  { cat:"alltag", brand:"TQ", name:"Feuerzeug", size:"1 Stück", price:null, shape:"lighter", c1:"#111827", c2:"#f59e0b", tx:"#fff",
    info:"Nachfüllbares Einweg-Feuerzeug in verschiedenen Farben." }
];

// ---------- Packungs-Illustrationen (SVG) ----------
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c])); }

// Text mehrzeilig und passend in eine Breite w (SVG-Einheiten) setzen
function fitText(text, cx, y, w, size, weight, color, family = "Arial,sans-serif", maxLines = 3) {
  const words = esc(text).split(" ");
  let fs = size, lines;
  for (;;) {
    const max = Math.floor(w / (fs * 0.56));
    lines = []; let cur = "";
    for (const wd of words) {
      if ((cur + " " + wd).trim().length <= max) cur = (cur + " " + wd).trim();
      else { if (cur) lines.push(cur); cur = wd; }
    }
    if (cur) lines.push(cur);
    if ((lines.length <= maxLines && lines.every(l => l.length <= max)) || fs <= 5) break;
    fs -= 0.5;
  }
  return lines.map((l, k) => `<text x="${cx}" y="${y + k * fs * 1.15}" text-anchor="middle" font-family="${family}" font-weight="${weight}" font-size="${fs}" fill="${color}"${l.length * fs * 0.56 > w ? ` textLength="${w}" lengthAdjust="spacingAndGlyphs"` : ""}>${l}</text>`).join("");
}

function label(p, y, w) {
  const name = p.name.split(" – ")[0];
  return fitText(p.brand, 60, y, w, 15, 900, p.tx, "Arial Black,Arial,sans-serif", 2) +
         fitText(name, 60, y + 15, w, 10, 700, p.tx);
}

function packSVG(p, i) {
  const g = `g${i}`;
  const grad = `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.c1}"/><stop offset="1" stop-color="${p.c2}"/></linearGradient>
    <linearGradient id="${g}s" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".3" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
  let body = "";
  switch (p.shape) {
    case "pouch":
      body = `<path d="M30 ${p.cap ? 40 : 22} Q60 ${p.cap ? 30 : 16} 90 ${p.cap ? 40 : 22} L96 140 Q60 148 24 140 Z" fill="url(#${g})"/>
        ${p.cap ? `<rect x="50" y="14" width="20" height="20" rx="3" fill="#1e3a8a"/><rect x="47" y="10" width="26" height="8" rx="2" fill="#1e40af"/>` : `<rect x="78" y="4" width="4" height="26" fill="#e5e7eb" transform="rotate(12 80 17)"/>`}
        <path d="M30 ${p.cap ? 40 : 22} L96 140 Q60 148 24 140 Z" fill="url(#${g}s)"/>${label(p, 88, 62)}`;
      break;
    case "bottle":
      body = `<rect x="50" y="8" width="20" height="14" rx="3" fill="${p.c2}"/><path d="M52 22 h16 v14 q16 10 16 30 v70 q0 10 -10 10 h-28 q-10 0 -10 -10 v-70 q0 -20 16 -30z" fill="url(#${g})"/>
        <rect x="38" y="70" width="44" height="40" rx="4" fill="#fff" opacity=".9"/>
        ${fitText(p.brand, 60, 82, 38, 8, 900, p.c1, "Arial Black,Arial", 2)}${fitText(p.name, 60, 100, 38, 9, 700, p.c1)}`;
      break;
    case "carton":
      body = `<path d="M36 30 L60 16 L84 30 Z" fill="${p.c2}"/><rect x="66" y="12" width="10" height="12" rx="2" fill="#facc15"/>
        <rect x="36" y="30" width="48" height="112" rx="3" fill="url(#${g})"/><rect x="36" y="30" width="14" height="112" fill="url(#${g}s)"/>
        <rect x="40" y="70" width="40" height="40" rx="4" fill="#fff" opacity=".85"/>
        ${fitText(p.brand, 60, 82, 34, 8, 900, p.tx, "Arial Black,Arial", 1)}${fitText(p.name, 60, 93, 34, 7, 700, p.tx)}`;
      break;
    case "wine":
      body = `<rect x="53" y="4" width="14" height="24" rx="2" fill="${p.c1}"/><path d="M53 28 h14 q0 18 14 26 v84 q0 6 -6 6 h-30 q-6 0 -6 -6 v-84 q14 -8 14 -26z" fill="${p.c1}"/>
        <path d="M45 56 v80" stroke="#fff" stroke-opacity=".25" stroke-width="4"/>
        <rect x="42" y="82" width="36" height="44" rx="2" fill="${p.c2}"/>
        ${fitText(p.brand.toUpperCase(), 60, 94, 30, 5, 400, p.tx, "Georgia,serif", 1)}${fitText(p.name.split(" (")[0], 60, 106, 30, 7, 700, p.tx, "Georgia,serif")}`;
      break;
    case "bag":
      body = `<path d="M18 22 h84 l-4 6 l4 6 v100 l-4 6 l4 6 h-84 l4 -6 l-4 -6 v-100 l4 -6 z" fill="url(#${g})"/>
        <path d="M18 22 h84 v6 h-84z M18 140 h84 v6 h-84z" fill="#000" opacity=".12"/>
        <rect x="18" y="22" width="22" height="124" fill="url(#${g}s)"/>
        <ellipse cx="60" cy="72" rx="36" ry="20" fill="#fff" opacity=".18"/>${label(p, 72, 70)}
        <circle cx="86" cy="122" r="8" fill="#fff" opacity=".25"/><circle cx="34" cy="118" r="5" fill="#fff" opacity=".2"/>`;
      break;
    case "box":
      body = `<path d="M14 46 L30 34 H106 L90 46 Z" fill="${p.c2}" opacity=".85"/><path d="M90 46 L106 34 V118 L90 130 Z" fill="#000" opacity=".2"/>
        <rect x="14" y="46" width="76" height="84" rx="3" fill="url(#${g})"/><rect x="14" y="46" width="76" height="84" rx="3" fill="url(#${g}s)"/>
        <g transform="translate(-8 4)">${label(p, 84, 64)}</g>`;
      break;
    case "gum":
      body = `<rect x="22" y="44" width="76" height="64" rx="8" fill="url(#${g})"/><rect x="22" y="44" width="76" height="64" rx="8" fill="url(#${g}s)"/>
        <rect x="30" y="52" width="60" height="18" rx="9" fill="#fff" opacity=".9"/>
        ${fitText(p.brand, 60, 64, 54, 11, 900, p.tx === "#fff" ? p.c1 : p.tx, "Arial Black,Arial", 1)}${fitText(p.name, 60, 84, 68, 9, 700, p.tx)}`;
      break;
    case "lighter":
      body = `<rect x="44" y="24" width="32" height="20" rx="3" fill="#9ca3af"/><rect x="46" y="44" width="28" height="94" rx="6" fill="url(#${g})"/>
        <text x="60" y="96" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="14" fill="${p.tx}">${esc(p.brand)}</text>`;
      break;
  }
  return `<svg viewBox="0 0 120 150" class="w-full h-full drop-shadow-md" role="img" aria-label="${esc(p.brand + " " + p.name)}">${grad}${body}</svg>`;
}

// Dateiname des Produktfotos (img/produkte/<slug>.webp)
function slug(t) {
  return t.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// ---------- Rendering, Filter & Suche ----------
const euro = n => n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });

function renderCatalog() {
  const grid = document.getElementById("productGrid");
  const q = (document.getElementById("productSearch").value || "").trim().toLowerCase();
  const active = document.querySelector("[data-cat].is-active")?.dataset.cat || "alle";
  let html = "", count = 0;
  for (const cat of CATEGORIES) {
    if (active !== "alle" && active !== cat.id) continue;
    const items = PRODUCTS.map((p, i) => [p, i]).filter(([p]) => p.cat === cat.id &&
      (!q || (p.brand + " " + p.name + " " + p.info).toLowerCase().includes(q)));
    if (!items.length) continue;
    count += items.length;
    html += `<h3 class="col-span-full mt-6 first:mt-0 text-xl font-extrabold flex items-center gap-2">${cat.icon} ${cat.name}
      <span class="text-sm font-medium text-slate-500">(${items.length})</span></h3>`;
    html += items.map(([p, i]) => `
      <article class="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
        <div class="bg-gradient-to-b from-white to-stone-100 aspect-square flex items-center justify-center overflow-hidden p-3"><img src="img/produkte/${slug(p.brand + " " + p.name)}.webp" alt="${esc(p.brand + " " + p.name)}" loading="lazy" class="w-full h-full object-contain" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'w-full h-full p-4',innerHTML:packSVG(PRODUCTS[${i}],${i})}))"></div>
        <div class="p-4 flex flex-col flex-1">
          <p class="text-xs font-semibold uppercase tracking-wide text-teal-700">${esc(p.brand)}</p>
          <h4 class="font-bold leading-snug">${esc(p.name)}</h4>
          <p class="text-xs text-slate-500 mt-0.5">${esc(p.size)}</p>
          <p class="text-sm text-slate-600 mt-2 flex-1">${esc(p.info)}</p>
          <p class="mt-3 text-lg font-extrabold ${p.price == null ? "text-slate-400 text-sm" : "text-slate-900"}">
            ${p.price == null ? "Preis folgt" : euro(p.price)}</p>
        </div>
      </article>`).join("");
  }
  grid.innerHTML = html || `<p class="col-span-full text-slate-500">Keine Produkte gefunden.</p>`;
  document.getElementById("productCount").textContent = `${count} Produkte`;
}

function initCatalog() {
  const bar = document.getElementById("catBar");
  bar.innerHTML = [{ id: "alle", name: "Alle", icon: "🛍️" }, ...CATEGORIES].map(c =>
    `<button type="button" data-cat="${c.id}" class="cat-btn shrink-0 px-4 py-2 rounded-full border border-stone-300 bg-white text-sm font-semibold hover:border-teal-600 ${c.id === "alle" ? "is-active" : ""}">${c.icon} ${c.name}</button>`).join("");
  bar.addEventListener("click", e => {
    const b = e.target.closest("[data-cat]"); if (!b) return;
    bar.querySelectorAll("[data-cat]").forEach(x => x.classList.remove("is-active"));
    b.classList.add("is-active"); renderCatalog();
  });
  document.getElementById("productSearch").addEventListener("input", renderCatalog);
  renderCatalog();
}
document.addEventListener("DOMContentLoaded", initCatalog);
