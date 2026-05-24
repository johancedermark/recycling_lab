"use strict";

// =====================================================
// KONFIGURATION — NIVÅER
// =====================================================

const LEVELS = [
  {
    id: 1, name: "Hemma", icon: "🏠",
    mode: "drag",
    itemCount: 15, lives: 3,
    unlocked: true,
  },
  {
    id: 2, name: "Sorteringsbandet", icon: "🏭",
    mode: "stations",
    itemCount: 10, lives: 3,
    timePerItem: 9000,
    slideIn: 680,
    beltSpd: "0.44s",
    unlocked: true, // DEV
  },
  {
    id: 3, name: "Materialresan", icon: "🔬",
    mode: "journey",
    itemCount: 14, lives: 3,
    timePerItem: 6000,
    slideIn: 400,
    beltSpd: "0.17s",
    unlocked: true, // DEV
  },
];

// =====================================================
// FÖREMÅLSDATABAS
// =====================================================

const ITEMS = [
  // PLAST
  { id:"pet_water",  name:"Vattenflaska",          emoji:"🍶", cat:"plast",  plastic:{code:"01",name:"PET",glyph:"♳"},
    fact:"PET-plast kan återvinnas till nya flaskor, polyestertyg och fleecejackor — en av de mest återvunna plastsorterna." },
  { id:"shampoo",    name:"Schampoflaska",          emoji:"🧴", cat:"plast",  plastic:{code:"02",name:"HDPE",glyph:"♴"},
    fact:"HDPE används i shampo- och rengöringsflaskor. Robust plast som är relativt lätt att återvinna." },
  { id:"yogurt",     name:"Yoghurtburk",            emoji:"🫙", cat:"plast",  plastic:{code:"05",name:"PP",glyph:"♷"},
    fact:"PP tål höga temperaturer. Skölj burken lätt — den behöver inte vara perfekt ren för att kunna återvinnas." },
  { id:"bags",       name:"Plastpåsar (knyte)",      emoji:"🛍️", cat:"plast",  plastic:{code:"04",name:"LDPE",glyph:"♶"},
    fact:"Samla plastpåsar i en påse och lämna som ett knyte i plastbehållaren — lägg dem inte löst!" },
  { id:"ketchup",    name:"Ketchupflaska",           emoji:"🍅", cat:"plast",  plastic:{code:"02",name:"HDPE",glyph:"♴"},
    fact:"Plastflaskor för mat sorteras som plastförpackning. Töm och tryck ihop flaskan för att spara plats." },
  { id:"soda_pet",   name:"Läskflaska (utan pant)",  emoji:"🥤", cat:"plast",  plastic:{code:"01",name:"PET",glyph:"♳"},
    fact:"Läskflaskor med pant lämnas i pantautomaten. Utan pant sorteras de som plastförpackning — behåll locket." },
  // PAPPER
  { id:"milk",       name:"Mjölkförpackning",        emoji:"🥛", cat:"papper",
    fact:"Tetrapak-förpackningar sorteras som pappersförpackning. Häll ur resterna och tryck ihop den." },
  { id:"newspaper",  name:"Dagstidning",             emoji:"📰", cat:"papper",
    fact:"Tidningar, reklam och kataloger sorteras som tidningar och återvinns till nytt tidningspapper." },
  { id:"cardboard",  name:"Wellpappkartong",          emoji:"📦", cat:"papper",
    fact:"Vik kartongen platt. Tejp och häftklamrar behöver inte tas bort — de sorteras bort i processen." },
  { id:"juice",      name:"Juiceförpackning",         emoji:"🧃", cat:"papper",
    fact:"Dryckesförpackningar av kartong sorteras som pappersförpackning — inte glas! De är papper med tunt plastskikt." },
  { id:"egg",        name:"Äggkartong",               emoji:"🥚", cat:"papper",
    fact:"Äggkartonger av papp sorteras som pappersförpackning och återvinns till ny kartong eller mjukpapper." },
  // METALL
  { id:"alum_can",   name:"Aluminiumburk",            emoji:"🥫", cat:"metall",
    fact:"Aluminium kan återvinnas oändligt utan kvalitetsförlust. Återvinning kräver bara 5 % av energin för ny aluminium!" },
  { id:"tin_can",    name:"Konservburk (stål)",       emoji:"🫙", cat:"metall",
    fact:"Konservburkar av stål är 100 % återvinningsbara och kan vara tillbaka på hyllan på 60 dagar." },
  { id:"foil",       name:"Aluminiumfolie",            emoji:"✨", cat:"metall",
    fact:"Ren aluminiumfolie sorteras som metall. Balla ihop den till en boll — annars fastnar den i sorteringsmaskinen." },
  { id:"lid",        name:"Metalllock (från glasburk)", emoji:"🔘", cat:"metall",
    fact:"Metalllock sorteras SEPARAT som metallförpackning — inte med glasburken! Ta alltid av locket först." },
  // GLAS
  { id:"wine",       name:"Vinflaska",                emoji:"🍷", cat:"glas",
    fact:"Glas kan återvinnas om och om igen utan kvalitetsförlust. En flaska kan vara ny igen inom en månad." },
  { id:"jam",        name:"Syltburk",                  emoji:"🫙", cat:"glas",
    fact:"Glasburkar sorteras som glasförpackning. Ta av metallocket och sortera det separat som metall." },
  { id:"beer",       name:"Ölflaska (utan pant)",      emoji:"🍺", cat:"glas",
    fact:"Glasflaskor utan pant sorteras som glas. Med pant lämnas de i pantautomaten för maximal miljönytta." },
  { id:"sauce",      name:"Sås-/kryddglasburk",        emoji:"🫙", cat:"glas",
    fact:"Glasförpackningar för mat sorteras som glas. Skölj ur dem och ta av locket — det är metall eller plast." },
];

// =====================================================
// NIVÅ 1 — HEMMA (drag-and-drop, inga skick-badges)
// =====================================================

const LEVEL1_ITEMS = [
  // PLAST
  { id:"h_pet_bottle",    name:"Plastflaska",          emoji:"🍶", cat:"plast",
    fact:"PET-flaskor återvinns till nya flaskor, polyestertyg och fleecejackor." },
  { id:"h_shampoo",       name:"Schampoflaska",         emoji:"🧴", cat:"plast",
    fact:"HDPE-flaskor (shampo, rengöring) är robusta och bland de lättaste att återvinna." },
  { id:"h_yogurt",        name:"Yoghurtburk",           emoji:"🫙", cat:"plast",
    fact:"PP-förpackningar (yoghurt, matbehållare) sorteras som plastförpackning." },
  { id:"h_bags",          name:"Plastpåsar (knytte)",   emoji:"🛍️", cat:"plast",
    fact:"Samla plastpåsarna i en påse och lämna som ett knytte — lägg inte löst!" },
  { id:"h_ketchup",       name:"Ketchupflaska",         emoji:"🍅", cat:"plast",
    fact:"Töm och tryck ihop flaskan. Plastflaskor för mat är plastförpackning." },
  // PAPPER
  { id:"h_newspaper",     name:"Dagstidning",           emoji:"📰", cat:"papper",
    fact:"Tidningar och reklam sorteras som tidningar och återvinns till nytt papper." },
  { id:"h_milk_carton",   name:"Mjölkförpackning",      emoji:"🥛", cat:"papper",
    fact:"Tetrapak sorteras som pappersförpackning. Tryck ihop den när den är tömd." },
  { id:"h_cardboard_box", name:"Wellpappkartong",       emoji:"📦", cat:"papper",
    fact:"Vik kartongen platt. Tejp och häftklamrar behöver inte tas bort." },
  { id:"h_juice_carton",  name:"Juiceförpackning",      emoji:"🧃", cat:"papper",
    fact:"Juiceförpackningar av kartong är papper med tunt plastskikt — inte glas!" },
  { id:"h_egg_carton",    name:"Äggkartong",            emoji:"🥚", cat:"papper",
    fact:"Äggkartonger av papp sorteras som pappersförpackning." },
  // METALL
  { id:"h_soda_can",      name:"Läskburk",              emoji:"🥤", cat:"metall",
    fact:"Aluminium kan återvinnas oändligt. Återvinning kräver bara 5 % av energin!" },
  { id:"h_tin_can",       name:"Konservburk",           emoji:"🥫", cat:"metall",
    fact:"Stålburkar är 100 % återvinningsbara och kan vara tillbaka på hyllan på 60 dagar." },
  { id:"h_foil_ball",     name:"Aluminiumfolie",        emoji:"✨", cat:"metall",
    fact:"Balla ihop ren aluminiumfolie till en boll — lösa bitar fastnar i maskinen." },
  { id:"h_metal_lid",     name:"Metalllock",            emoji:"🔘", cat:"metall",
    fact:"Metalllock sorteras SEPARAT som metallförpackning — inte med glasburken!" },
  { id:"h_spray_can",     name:"Sprayburk (tom)",       emoji:"💨", cat:"metall",
    fact:"Tomma metallsprayburkar sorteras som metallförpackning — se till att de är tomma." },
  // GLAS
  { id:"h_wine_bottle",   name:"Vinflaska",             emoji:"🍷", cat:"glas",
    fact:"Glas kan återvinnas oändligt. En flaska kan vara ny igen inom en månad." },
  { id:"h_jam_jar",       name:"Syltburk (utan lock)",  emoji:"🫙", cat:"glas",
    fact:"Glasburkar sorteras som glasförpackning. Ta alltid av metallocket separat." },
  { id:"h_beer_bottle",   name:"Ölflaska (utan pant)",  emoji:"🍺", cat:"glas",
    fact:"Glasflaskor utan pant sorteras som glas. Med pant — till pantautomaten!" },
  { id:"h_sauce_jar",     name:"Kryddglasburk",         emoji:"🧂", cat:"glas",
    fact:"Alla glasförpackningar för mat och kryddor sorteras som glasförpackning." },
  { id:"h_glass_bottle",  name:"Glasflaska (olivolja)", emoji:"🫒", cat:"glas",
    fact:"Alla glasförpackningar sorteras som glasförpackning oavsett vad de innehöll." },
  // ORGANISKT / MATRESTER
  { id:"h_banana_peel",   name:"Banan&shy;skal",        emoji:"🍌", cat:"organiskt",
    fact:"Bananskal och alla råa fruktrester är matavfall och görs till biogas eller kompost." },
  { id:"h_coffee_grounds",name:"Kaffegrounds med filter",emoji:"☕", cat:"organiskt",
    fact:"Kaffesump och pappersfilter sorteras som matavfall — de är 100 % biologiska." },
  { id:"h_apple_core",    name:"Äppelskrot",            emoji:"🍎", cat:"organiskt",
    fact:"Fruktskrot och kärnhus är matavfall. Inget matavfall är för litet att sortera." },
  { id:"h_eggshells",     name:"Äggskalar",             emoji:"🥚", cat:"organiskt",
    fact:"Äggskalar sorteras som matavfall och bryts ned i kompost till näring för ny mat." },
  { id:"h_leftover_food", name:"Matrester (tallrik)",   emoji:"🍽️", cat:"organiskt",
    fact:"Kokt mat, sås och brödskorpor — allt sorteras som matavfall, inte restavfall." },
];

// =====================================================
// NIVÅ 2 — FÖRORENINGSJUDGE
// =====================================================

const LEVEL2_ITEMS = [
  // Återvinningsbara trots skick (cat = vanlig kategori)
  { id:"l2_crushed_can",   name:"Ihoptryckt aluminiumburk", emoji:"🥫", cat:"metall",
    condition:{ label:"Ihoptryckt",       color:"ok",
      tip:"Tryck ihop burkar — de tar mindre plats. Fortfarande metall och helt återvinningsbar!" },
    fact:"Aluminium kan återvinnas oändligt utan kvalitetsförlust." },
  { id:"l2_sticky_jar",    name:"Sköljd syltburk",          emoji:"🫙", cat:"glas",
    condition:{ label:"Sköljd",           color:"ok",
      tip:"En lätt sköljning räcker. Glasburken sorteras som glas — ta alltid av metallocket." },
    fact:"Glas kan återvinnas om och om igen utan kvalitetsförlust." },
  { id:"l2_taped_box",     name:"Kartong med tejp",          emoji:"📦", cat:"papper",
    condition:{ label:"Tejpad",           color:"ok",
      tip:"Tejp behöver INTE tas bort. Sorteringsmaskinerna hanterar det automatiskt!" },
    fact:"Vik kartongen platt. Tejp och häftklamrar tas bort i återvinningsprocessen." },
  { id:"l2_labeled_pet",   name:"PET-flaska med etikett",    emoji:"🍶", cat:"plast",
    plastic:{ code:"01", name:"PET", glyph:"♳" },
    condition:{ label:"Etikett kvar",     color:"ok",
      tip:"Etiketter kan sitta kvar — de separeras automatiskt i återvinningsprocessen." },
    fact:"PET återvinns till nya flaskor och polyestertyg." },
  { id:"l2_dented_can",    name:"Bucklad konservburk",       emoji:"🥫", cat:"metall",
    condition:{ label:"Bucklad",          color:"ok",
      tip:"Buckliga burkar är helt ok — materialet är det viktiga, inte formen." },
    fact:"Konservburkar av stål är 100 % återvinningsbara." },
  { id:"l2_flat_carton",   name:"Tillplattad mjölkförp.",    emoji:"🥛", cat:"papper",
    condition:{ label:"Tillplattad",      color:"ok",
      tip:"Tillplatta alltid dryckesförpackningar — de tar mindre plats och är lättare att sortera." },
    fact:"Tetrapak sorteras som pappersförpackning." },
  // Restavfall — kan EJ återvinnas i nuvarande skick (cat:"restavfall")
  { id:"l2_pizza",         name:"Fettfläckig pizzakartong",  emoji:"🍕", cat:"restavfall",
    condition:{ label:"Fettfläckig",      color:"warn",
      tip:"Fett förstör hela pappersbunten i återvinningen. Fettiga kartonger hör till restavfall." },
    fact:"Fettiga pappersförpackningar kan inte återvinnas — de sorteras som restavfall." },
  { id:"l2_window_glass",  name:"Fönsterglas",               emoji:"🪟", cat:"restavfall",
    condition:{ label:"Fönsterglas",      color:"warn",
      tip:"Fönsterglas har annan kemisk sammansättning och förstör glassmältan vid återvinning." },
    fact:"Fönsterglas, kristallglas och porslin sorteras som restavfall — inte glasförpackning." },
  { id:"l2_pringles",      name:"Pringlesburk",              emoji:"🥫", cat:"restavfall",
    condition:{ label:"Kompositförp.",    color:"warn",
      tip:"Pringlesburken är gjord av metall, papp och plast sammansatta — går ej att separera." },
    fact:"Kompositförpackningar (flera sammanfogade material) sorteras som restavfall." },
  { id:"l2_wet_wipe",      name:"Smutsig pappershandduk",    emoji:"🧻", cat:"restavfall",
    condition:{ label:"Blöt/Smutsig",    color:"warn",
      tip:"Fuktiga och smutsiga pappersprodukter förstör pappersmassans fibrer vid återvinning." },
    fact:"Hushållspapper, servietter och fukttorkare sorteras som restavfall." },
  { id:"l2_black_plastic", name:"Svart plastbricka",         emoji:"⬛", cat:"restavfall",
    condition:{ label:"Svart plast",      color:"warn",
      tip:"Svart plast absorberar IR-ljuset i sorteringsmaskinen och kan ej identifieras." },
    fact:"Svart plast detekteras inte i optiska sorteringsanläggningar — det är restavfall." },
  { id:"l2_greasy_foil",   name:"Smutsig aluminiumfolie",    emoji:"✨", cat:"restavfall",
    condition:{ label:"Kraftigt smutsig", color:"warn",
      tip:"Lite mat är ok — men kraftigt nedsmutsad folie förorenar återvinningen." },
    fact:"Kraftigt smutsig aluminiumfolie sorteras som restavfall. Ren folie är metall." },
  { id:"l2_paper_plate",   name:"Papptallrik med matrester", emoji:"🍽️", cat:"restavfall",
    condition:{ label:"Mat kvar",         color:"warn",
      tip:"Pappersprodukter med matrester förorenar fibermassorna vid pappersåtervinning." },
    fact:"Engångstallrikar med matrester sorteras som restavfall." },
  { id:"l2_ceramics",      name:"Keramikmugg",               emoji:"☕", cat:"restavfall",
    condition:{ label:"Keramik/Porslin",  color:"warn",
      tip:"Keramik stelnar vid annan temperatur än glasförpackningar och förstör glassmältan." },
    fact:"Porslin, keramik och kristall är restavfall — inte glasförpackning." },
  { id:"l2_mirror",        name:"Krossad spegel",            emoji:"🪞", cat:"restavfall",
    condition:{ label:"Spegel",           color:"warn",
      tip:"Speglar har ett metallskikt som förorenar glassmältan vid återvinning." },
    fact:"Speglar sorteras som restavfall — inte glasförpackning." },
];

// =====================================================
// INSTRUKTIONSINNEHÅLL
// =====================================================

const LEVEL_INSTRUCTIONS = {
  1: {
    items: [
      "Dra varje föremål till rätt tunna. Hovra över det för att läsa mer.",
      "Fyra tunnor: <strong>Plast, Papper, Metall och Glas</strong> — sortera rätt!",
      "Fel sort kostar ett liv men föremålet stannar kvar — prova igen!",
    ]
  },
  2: {
    items: [
      "Föremål glider in på bandet — klicka rätt behållare eller tryck <kbd>1</kbd>–<kbd>4</kbd>.",
      "❤️ Tre liv. Fel sort eller timeout kostar ett liv.",
      "Plastförpackningar visar en återvinningssymbol med plastkod — lär dig dem!",
      "⏸ Tryck <kbd>Space</kbd> för att pausa och läsa lugnt.",
    ]
  },
  3: {
    items: [
      "Följ materialets resa — vad händer efter sorteringen?",
      "⏸ <kbd>Space</kbd> pausar när du vill läsa lugnt.",
    ]
  },
};

// =====================================================
// STATIONSDATA (Nivå 2)
// =====================================================

const STATIONS = [
  {
    id: "glas", name: "Glassortering", icon: "🫙", color: "#4CAF50",
    mode: "multiSort",
    desc: "Du jobbar vid sorteringsbandet hos IL Recycling. Separera klart, grönt och brunt glas — och plocka ut FK-kontaminanter.",
    instructions: [
      "Du befinner dig på <strong>färgsorteringsbandet</strong> hos IL Recycling.",
      "Varje glasskärva måste till rätt fraktion: <strong>Klart · Grönt · Brunt</strong> — eller <strong>FK-avvisa</strong> (keramik, porslin, stenar).",
      "⚠️ FK i en fraktion ger stor kvalitetsförlust — en keramikskärva kan förstöra tusentals kg glas.",
      "Fel färg i fel fraktion är också dyrt — klart glas i grön batch sänker värdet rejält.",
      "Tryck <kbd>1</kbd> Klart &nbsp;·&nbsp; <kbd>2</kbd> Grönt &nbsp;·&nbsp; <kbd>3</kbd> Brunt &nbsp;·&nbsp; <kbd>4</kbd> FK &nbsp;·&nbsp; <kbd>Space</kbd> pausar.",
    ],
    fractions: [
      { key:"klart", label:"Klart glas",  icon:"⬜", kbd:"1", cls:"ms-klart", particleColor:"#c8d8e8" },
      { key:"grönt", label:"Grönt glas",  icon:"🟢", kbd:"2", cls:"ms-gront", particleColor:"#66bb6a" },
      { key:"brunt", label:"Brunt glas",  icon:"🟤", kbd:"3", cls:"ms-brunt", particleColor:"#a0785a" },
      { key:"fk",    label:"FK — avvisa", icon:"🚫", kbd:"4", cls:"ms-fk",    particleColor:"#ef5350" },
    ],
    processSteps: [
      { icon:"🚛", label:"Ankomst",      done:true  },
      { icon:"🔧", label:"FK-rensning",  done:true  },
      { icon:"🎨", label:"Färgsortering",active:true },
      { icon:"✅", label:"Kvalitet"                  },
      { icon:"🚛", label:"Utlastning"                },
    ],
    panelLeft: {
      header: "Inkommande",
      img: "assets/glass_incoming.jpg",
      steps: [
        { done:true,   text:"🚛 Lastbil anländer med blandat glas från hushållen" },
        { done:true,   text:"⚖️ Vägning och stickprovskontroll av FK-halt" },
        { done:true,   text:"🔧 Grovsortering — metalldelar och kartong rensas bort" },
        { active:true, text:"🎨 Färgsorteringsbandet — <strong>du är här</strong>" },
      ],
      note: "Glaset krossas till skärv (cullet) och sorteras i tre rena fraktioner + FK-avfall.",
    },
    panelRight: {
      header: "Utgående fraktioner",
      img: "assets/glass_outgoing.jpg",
      fractions: [
        { cls:"ms-dot-klart", dot:"⬜", name:"Klart glas",          dest:"→ Ardagh, Verallia",    note:"Livsmedelsflaskor, apoteksglas" },
        { cls:"ms-dot-gront", dot:"🟢", name:"Grönt glas",          dest:"→ Glasproducenter",      note:"Vinflaskor, läskflaskor" },
        { cls:"ms-dot-brunt", dot:"🟤", name:"Brunt glas",          dest:"→ Bryggeriindustrin",    note:"Ölflaskor, medicinflaskor" },
        { cls:"ms-dot-fk",    dot:"🚫", name:"FK — Foreign Cullet", dest:"→ Deponi / vägfyllnad",  note:"Inget återvinningsvärde" },
      ],
    },
    items: [
      // KLART GLAS
      { id:"sg_klar_vin",    name:"Klar vinflaska",          emoji:"🫙", cat:"klart", contamination:0,
        fact:"Klart glas — mest värdefullt. Smälts om till food-grade livsmedelsförpackningar." },
      { id:"sg_klar_parfym", name:"Klar parfymflaska",       emoji:"🧴", cat:"klart", contamination:0,
        fact:"Klar glasflaska — klart fraktion. Kan bli läkemedelsbehållare eller nya parfymflaskor." },
      { id:"sg_klar_lak",    name:"Apoteksglas (klart)",     emoji:"💊", cat:"klart", contamination:0,
        fact:"Klart apoteksglas hör till klar fraktion — hög renhet, hög prioritet hos glasproducenten." },
      { id:"sg_klar_konserv",name:"Glasburk livsmedel",      emoji:"🫙", cat:"klart", contamination:0,
        fact:"Klar glasburk för mat — klart fraktion. Skölj ur och ta av locket." },
      { id:"sg_klar_sauce",  name:"Klar sauceflaska",        emoji:"🫙", cat:"klart", contamination:0,
        fact:"Klar glasflaska — klart fraktion. Godkänd för omsmältning till livsmedelsförpackningar." },
      // GRÖNT GLAS
      { id:"sg_gron_vin",    name:"Grön vinflaska",          emoji:"🍷", cat:"grönt", contamination:0,
        fact:"Grön fraktion. Smälts om till nya gröna vinflaskor — glasets kretslopp på 30 dagar." },
      { id:"sg_gron_ol",     name:"Grön ölflaska",           emoji:"🍺", cat:"grönt", contamination:0,
        fact:"Grön ölflaska — grönt fraktion. 100 % återvinningsbar utan kvalitetsförlust." },
      { id:"sg_gron_mineral",name:"Grön mineralvattenflaska",emoji:"💧", cat:"grönt", contamination:0,
        fact:"Grön glasflaska — grönt fraktion. Smälts om och återföds som ny glasflaska." },
      { id:"sg_gron_burk",   name:"Grön glasburk",           emoji:"🫙", cat:"grönt", contamination:0,
        fact:"Grön glasburk — grönt fraktion. Hör till den gröna smältbatchen." },
      // BRUNT GLAS
      { id:"sg_brun_ol",     name:"Brun ölflaska",           emoji:"🍺", cat:"brunt", contamination:0,
        fact:"Brunt glas (amber) skyddar mot UV-ljus. Smälts om till nya bruna ölflaskor." },
      { id:"sg_brun_med",    name:"Medicinflaska (brun)",    emoji:"💊", cat:"brunt", contamination:0,
        fact:"Brun medicinflaska — brunt fraktion. Glasets UV-skydd bevaras vid korrekt omsmältning." },
      { id:"sg_brun_sauce",  name:"Brun sauceflaska",        emoji:"🫙", cat:"brunt", contamination:0,
        fact:"Brun glasförpackning — brunt fraktion. Rätt färgsortering avgör slutkvaliteten." },
      // FK — FOREIGN CULLET (avvisa)
      { id:"sg_fk_keramik",  name:"Keramikskärva",           emoji:"🏺", cat:"fk", contamination:28,
        fact:"❗ FK! Keramik smälter vid 1600°C — glas vid 1400°C. Ger olösta klumpar som spränger formarna." },
      { id:"sg_fk_porslin",  name:"Porslinsbit",             emoji:"🍽️", cat:"fk", contamination:24,
        fact:"❗ FK! Porslin innehåller kaolin och fältspat — förorenar glassmältan och ger sprickor." },
      { id:"sg_fk_fonster",  name:"Fönsterglasbit",          emoji:"🪟", cat:"fk", contamination:22,
        fact:"❗ FK! Fönsterglas (floatglas) har annan sammansättning — ger missfärgning och svagheter." },
    ],
  },
  {
    id: "plast", name: "Plastsortering", icon: "♻️", color: "#F5A623",
    mode: "multiSort",
    desc: "IR-kameror läser av varje plastföremåls polymerkod. Din uppgift: sortera till rätt polymerfraktion.",
    instructions: [
      "Du jobbar vid <strong>IR-sorteringsbandet</strong> hos Stena Recycling.",
      "Varje plastföremål tillhör en polymerfraktion: <strong>PET · PE · PP</strong> — eller <strong>FK</strong> (kan ej återvinnas här).",
      "⚠️ PVC (kod 3) frigör HCl vid smältning — förstör maskiner. FK med hög kontamination sänker batchvärdet.",
      "Svart plast är IR-blind — kan inte identifieras av kameror → FK.",
      "Tryck <kbd>1</kbd> PET &nbsp;·&nbsp; <kbd>2</kbd> PE &nbsp;·&nbsp; <kbd>3</kbd> PP &nbsp;·&nbsp; <kbd>4</kbd> FK &nbsp;·&nbsp; <kbd>Space</kbd> pausar.",
    ],
    fractions: [
      { key:"pet", label:"PET ♳",       icon:"♳", kbd:"1", cls:"ms-pet",  particleColor:"#64b5f6" },
      { key:"pe",  label:"PE ♴♶",       icon:"♴", kbd:"2", cls:"ms-pe",   particleColor:"#90a4ae" },
      { key:"pp",  label:"PP ♷",        icon:"♷", kbd:"3", cls:"ms-pp",   particleColor:"#ffa726" },
      { key:"fk",  label:"FK — avvisa", icon:"🚫", kbd:"4", cls:"ms-fk",   particleColor:"#ef5350" },
    ],
    processSteps: [
      { icon:"🚛", label:"Ankomst",     done:true  },
      { icon:"🔍", label:"IR-scanning", done:true  },
      { icon:"🤖", label:"Polymersort", active:true },
      { icon:"✅", label:"Kvalitet"                 },
      { icon:"📦", label:"Balning"                  },
    ],
    panelLeft: {
      header: "Inkommande",
      img: "assets/plast_incoming.jpg",
      steps: [
        { done:true,   text:"🚛 Blandad plastinsamling anländer i lastbil" },
        { done:true,   text:"🔍 NIR-kameror skannar varje föremål (Near-Infrared)" },
        { done:true,   text:"💨 Luftdysor sorterar till rätt fack automatiskt" },
        { active:true, text:"🤖 Manuell kontroll — <strong>du är här</strong>" },
      ],
      note: "NIR-kameror identifierar polymersorten på 0,1 sekund. Svart plast absorberar IR — syns ej.",
    },
    panelRight: {
      header: "Utgående fraktioner",
      img: "assets/plast_outgoing.jpg",
      fractions: [
        { cls:"ms-dot-pet", dot:"♳", name:"PET ♳",          dest:"→ Wellman, Radici",       note:"Fibrer, nya flaskor, fleece" },
        { cls:"ms-dot-pe",  dot:"♴", name:"PE ♴♶",          dest:"→ Borealis, Trioplast",   note:"Rör, påsar, flaskor" },
        { cls:"ms-dot-pp",  dot:"♷", name:"PP ♷",           dest:"→ Borealis, Lyondell",    note:"Burkar, bilar, leksaker" },
        { cls:"ms-dot-fk",  dot:"🚫", name:"FK — avvisa",    dest:"→ Energiåtervinning",     note:"Bränsle, ingen materialloop" },
      ],
    },
    items: [
      // PET ♳
      { id:"sp2_pet_vatten",  name:"Klar PET-vattenflaska",     emoji:"🍶", cat:"pet", contamination:0,
        fact:"PET ♳ — transparent och lätt. Smälts om till fibrer, nya PET-flaskor och fleecejackor." },
      { id:"sp2_pet_lask",    name:"PET-läskflaska",            emoji:"🥤", cat:"pet", contamination:0,
        fact:"PET ♳ — en av de mest återvunna plasterna i världen. Håll locket på!" },
      { id:"sp2_pet_juice",   name:"PET-juiceflaska (klar)",    emoji:"🧃", cat:"pet", contamination:0,
        fact:"Transparent PET-förpackning. Skölj ur och behåll locket — höjer materialvärdet." },
      { id:"sp2_pet_olja",    name:"PET-matoljefflaska",        emoji:"🫒", cat:"pet", contamination:0,
        fact:"PET ♳ — trots den oljiga resten återvinns den korrekt. Töm men skölj inte." },
      // PE ♴♶
      { id:"sp2_pe_shampo",   name:"HDPE-schampoflaska",        emoji:"🧴", cat:"pe", contamination:0,
        fact:"HDPE ♴ — robust polyeten. Återvinns till dräneringsrör, bänkar och nya flaskor." },
      { id:"sp2_pe_rengoring",name:"HDPE-rengöringsflaska",     emoji:"🫧", cat:"pe", contamination:0,
        fact:"HDPE ♴ — tung polyeten. Separeras på densitet från lättare LDPE i vattenbadet." },
      { id:"sp2_pe_pase",     name:"Plastpåsar (knytte LDPE)",  emoji:"🛍️", cat:"pe", contamination:0,
        fact:"LDPE ♶ — mjuk film-plast. Samla i knytte så fastnar de inte i maskinerna." },
      { id:"sp2_pe_mjolkflaska",name:"HDPE-mjölkflaska",        emoji:"🥛", cat:"pe", contamination:0,
        fact:"HDPE ♴ — tål mejeriprodukter. Skölj ur och återvinn som PE-fraktion." },
      // PP ♷
      { id:"sp2_pp_yoghurt",  name:"PP-yoghurtburk",            emoji:"🫙", cat:"pp", contamination:0,
        fact:"PP ♷ — tål höga temperaturer. Skölj lätt (behöver inte vara ren) och sortera som PP." },
      { id:"sp2_pp_margarin",  name:"PP-margarinskål",           emoji:"🧈", cat:"pp", contamination:0,
        fact:"PP ♷ — rund matbehållare. Skölj ur fettet och sortera till PP-fraktionen." },
      { id:"sp2_pp_lock",     name:"PP-plastlock",              emoji:"🔵", cat:"pp", contamination:0,
        fact:"PP ♷ — håll locket på flaskan! PP och PET separeras automatiskt i processen." },
      { id:"sp2_pp_mat",      name:"PP-matbehållare",           emoji:"📦", cat:"pp", contamination:0,
        fact:"PP ♷ — stabil och kemikaliebeständig. En av de vanligaste matplasterna." },
      // FK — kan ej sorteras i dessa fraktioner
      { id:"sp2_fk_pvc",      name:"PVC-flaska (kod 3)",        emoji:"🧪", cat:"fk", contamination:22,
        fact:"❗ FK! PVC ♸ frigör saltsyra (HCl) vid smältning — förstör maskiner och skadar personalen." },
      { id:"sp2_fk_svart",    name:"Svart plastbehållare",      emoji:"⬛", cat:"fk", contamination:15,
        fact:"❗ FK! Svart plast absorberar NIR-ljus helt — kameran ser ingenting. Okänd polymer → FK." },
      { id:"sp2_fk_ps",       name:"EPS-skumkorg (polystyren)", emoji:"🧊", cat:"fk", contamination:10,
        fact:"FK! EPS (expanderad polystyren) är luftfyllt och lågt densitet — förstör kompaktering." },
      { id:"sp2_fk_laminat",  name:"Laminatpåse (komposit)",   emoji:"🫙", cat:"fk", contamination:18,
        fact:"❗ FK! Laminat = plast + aluminiumfolie limmade ihop — kan inte separeras kemiskt. Bränsle." },
    ],
  },
  {
    id: "metall", name: "Metallsortering", icon: "🔩", color: "#8E9EAB",
    mode: "multiSort",
    desc: "Metall sorteras på magnetism och densitet. Din uppgift: rätt metallfraktion — och håll farligt avfall borta.",
    instructions: [
      "Du jobbar vid <strong>metallsorteringen</strong> hos SYSAV.",
      "Tre metallfraktioner: <strong>Aluminium · Stål · Blandmetall</strong> — plus <strong>FK</strong> (farligt/ej metall).",
      "⚠️ Batterier är brandrisk — ett litiumpaket kan starta brand i hela lagret. FK direkt!",
      "Stål är magnetiskt — aluminium och koppar är det inte. Densiteten skiljer dem åt vidare.",
      "Tryck <kbd>1</kbd> Alu &nbsp;·&nbsp; <kbd>2</kbd> Stål &nbsp;·&nbsp; <kbd>3</kbd> Blandmetall &nbsp;·&nbsp; <kbd>4</kbd> FK &nbsp;·&nbsp; <kbd>Space</kbd> pausar.",
    ],
    fractions: [
      { key:"aluminium",   label:"Aluminium",    icon:"⬜", kbd:"1", cls:"ms-alu",   particleColor:"#b0bec5" },
      { key:"stål",        label:"Stål / Järn",  icon:"🔩", kbd:"2", cls:"ms-stal",  particleColor:"#78909c" },
      { key:"blandmetall", label:"Blandmetall",  icon:"🟡", kbd:"3", cls:"ms-bland", particleColor:"#ffa726" },
      { key:"fk",          label:"FK / Farligt", icon:"🚫", kbd:"4", cls:"ms-fk",    particleColor:"#ef5350" },
    ],
    processSteps: [
      { icon:"🚛", label:"Ankomst",     done:true  },
      { icon:"🧲", label:"Magnetsort",  done:true  },
      { icon:"🔩", label:"Fraktsort",   active:true },
      { icon:"✅", label:"Kvalitet"                 },
      { icon:"🔥", label:"Smältning"                },
    ],
    panelLeft: {
      header: "Inkommande",
      img: "assets/metall_incoming.jpg",
      steps: [
        { done:true,   text:"🚛 Blandad metallinsamling anländer" },
        { done:true,   text:"🧲 Överbandmagnet plockar ut järn och stål" },
        { done:true,   text:"⚡ Virvelströmsseparator skjuter ut aluminium" },
        { active:true, text:"🔩 Manuell fraktionssortering — <strong>du är här</strong>" },
      ],
      note: "Magneten fångar järnhaltigt stål (ferromagnetiskt). Aluminium är icke-magnetiskt men ledande — virvelströmmen kastas ut.",
    },
    panelRight: {
      header: "Utgående fraktioner",
      img: "assets/metall_outgoing.jpg",
      fractions: [
        { cls:"ms-dot-alu",   dot:"⬜", name:"Aluminium",     dest:"→ Hydro, Novelis",         note:"Nya burkar, bildelar, folie" },
        { cls:"ms-dot-stal",  dot:"🔩", name:"Stål / Järn",   dest:"→ SSAB, stålverk",          note:"Armeringsstål, nya plåtar" },
        { cls:"ms-dot-bland", dot:"🟡", name:"Blandmetall",   dest:"→ Boliden, Aurubis",        note:"Koppar, mässing, guld ur kretskort" },
        { cls:"ms-dot-fk",    dot:"🚫", name:"FK / Farligt",  dest:"→ Farligt avfall/deponi",   note:"Batterier, elektronik, blandat" },
      ],
    },
    items: [
      // ALUMINIUM
      { id:"sm2_alu_burk",    name:"Aluminiumburk (läskburk)", emoji:"🥤", cat:"aluminium", contamination:0,
        fact:"Aluminium återvinns med 5 % av primärenergin och kan cykla oändligt utan kvalitetsförlust." },
      { id:"sm2_alu_folie",   name:"Aluminiumfolie (boll)",    emoji:"✨", cat:"aluminium", contamination:0,
        fact:"Hopbakad aluminiumfolie är lättidentifierad alu. Balla ihop den — annars fastnar den i maskinen." },
      { id:"sm2_alu_tub",     name:"Aluminiumtub (tandkräm)",  emoji:"🪥", cat:"aluminium", contamination:0,
        fact:"Aluminiumtuber är mjuk alu-legering — högt metallvärde, återvinns i aluminiumsmältan." },
      { id:"sm2_alu_lock",    name:"Aluminiumlock",            emoji:"🔵", cat:"aluminium", contamination:0,
        fact:"Runda aluminiummlock från glasburkar — aluminium, inte stål. Icke-magnetiska." },
      // STÅL
      { id:"sm2_stal_konserv",name:"Konservburk (stål)",       emoji:"🥫", cat:"stål", contamination:0,
        fact:"Stål (tinplåt) — magnetisk. Stålburkar kan vara tillbaka på hyllan inom 60 dagar." },
      { id:"sm2_stal_spray",  name:"Tom stålsprayburk",        emoji:"💨", cat:"stål", contamination:0,
        fact:"Tom sprayburk av stål — stål-fraktion. Viktigt: bara tomma! Trycksatt → brandrisk." },
      { id:"sm2_stal_lock",   name:"Stållock (från glasburk)", emoji:"⚙️", cat:"stål", contamination:0,
        fact:"Stållock är magnetiska — särskiljs enkelt från aluminium. Sorteras som stål." },
      { id:"sm2_stal_plat",   name:"Plåtburk (kakao/pulver)", emoji:"🫙", cat:"stål", contamination:0,
        fact:"Cylindrisk plåtburk av stål — stål-fraktion. Magnetisk och tät tinplåt." },
      // BLANDMETALL
      { id:"sm2_bland_koppar",name:"Kopparrörsfragment",       emoji:"🟠", cat:"blandmetall", contamination:0,
        fact:"Koppar — rödgult, icke-magnetiskt. Värdefullt: ~60 kr/kg. Elektrisk kretskrets och VVS." },
      { id:"sm2_bland_massing",name:"Mässingsskruv/-bult",     emoji:"🟡", cat:"blandmetall", contamination:0,
        fact:"Mässing (koppar+zink) — guldfärgad och tyngre än alu. Icke-magnetisk, hög densitet." },
      { id:"sm2_bland_kabel", name:"Elektrisk kabel (blank)",  emoji:"🔌", cat:"blandmetall", contamination:0,
        fact:"Kabelkoppar — högt värde men kräver strippning av plastisoleringen i nästa steg." },
      // FK — farligt eller ej metall
      { id:"sm2_fk_batteri",  name:"AA-batteri (alkaliskt)",   emoji:"🔋", cat:"fk", contamination:30,
        fact:"❗ FK! Alkalibatterier innehåller mangan och zink — litium-variantens risk för brand. Farligt avfall!" },
      { id:"sm2_fk_litium",   name:"Litiumbatteri (knappcell)", emoji:"⚡", cat:"fk", contamination:35,
        fact:"❗ FK! Litiumbatterier kan termiskt gå i runaway och starta brand. ALDRIG i metallfraktionen." },
      { id:"sm2_fk_elektronik",name:"PCB-kortfragment",        emoji:"🖥️", cat:"fk", contamination:20,
        fact:"❗ FK! Elektronikkort (PCB) innehåller bly, kadmium och flamskyddsmedel. Tillhör WEEE-flödet." },
    ],
  },
  {
    id: "papper", name: "Papperssortering", icon: "📰", color: "#8D6E63",
    mode: "multiSort",
    desc: "Papper sorteras i tre rena fraktioner. Din uppgift: rätt fraktion — och håll fett, vax och laminat borta.",
    instructions: [
      "Du jobbar vid <strong>papperssorteringen</strong> hos SYSAV.",
      "Tre rena fraktioner: <strong>Tidningar · Kartong · Dryckesförpackningar</strong> — plus <strong>FK</strong> (avvisas).",
      "⚠️ Fettfläckar (pizza) och vax (smörpapper) förstör pappersfibern under massaprocessen — avvisa direkt.",
      "Dryckesförpackningar (Tetra Pak) är laminerat papper — sorteras separat för specialåtervinning.",
      "Tryck <kbd>1</kbd> Tidningar &nbsp;·&nbsp; <kbd>2</kbd> Kartong &nbsp;·&nbsp; <kbd>3</kbd> Dryck &nbsp;·&nbsp; <kbd>4</kbd> FK &nbsp;·&nbsp; <kbd>Space</kbd> pausar.",
    ],
    fractions: [
      { key:"tidningar", label:"Tidningar / Mjukpapper", icon:"📰", kbd:"1", cls:"ms-tidn",  particleColor:"#e0d5b0" },
      { key:"kartong",   label:"Kartong / Wellpapp",     icon:"📦", kbd:"2", cls:"ms-kart",  particleColor:"#d4a55a" },
      { key:"dryck",     label:"Dryckesförpackningar",   icon:"🥛", kbd:"3", cls:"ms-dryck", particleColor:"#4db6ac" },
      { key:"fk",        label:"FK — avvisa",            icon:"🚫", kbd:"4", cls:"ms-fk",    particleColor:"#ef5350" },
    ],
    processSteps: [
      { icon:"🚛", label:"Ankomst",     done:true   },
      { icon:"💨", label:"Luftsort",    done:true   },
      { icon:"📰", label:"Fraktsort",   active:true },
      { icon:"✅", label:"Kvalitet"                 },
      { icon:"🏭", label:"Massabruk"                },
    ],
    panelLeft: {
      header: "Inkommande",
      img: "assets/papper_incoming.jpg",
      steps: [
        { done:true,   text:"🚛 Blandad pappersinsamling anländer" },
        { done:true,   text:"💨 Luftsortering skiljer ut lätt mjukpapper" },
        { done:true,   text:"🔍 Optisk skanner identifierar förpackningstyp" },
        { active:true, text:"📰 Manuell fraktionssortering — <strong>du är här</strong>" },
      ],
      note: "Papper får bara blandas med liknande fiberlängd. Kraftliner (wellpapp) och tidningspapper processas i separata massabruk.",
    },
    panelRight: {
      header: "Utgående fraktioner",
      img: "assets/papper_outgoing.jpg",
      fractions: [
        { cls:"ms-dot-tidn",  dot:"📰", name:"Tidningar",          dest:"→ StoraEnso, Holmen",       note:"Nytt tidningspapper, toalettpapper" },
        { cls:"ms-dot-kart",  dot:"📦", name:"Kartong / Wellpapp", dest:"→ Smurfit Kappa, DS Smith", note:"Nya kartonger och förpackningar" },
        { cls:"ms-dot-dryck", dot:"🥛", name:"Dryckesförpackningar", dest:"→ SCA, Stora Enso",       note:"Specialprocess separerar papper, plast, alu" },
        { cls:"ms-dot-fk",    dot:"🚫", name:"FK — avvisas",       dest:"→ Energiåtervinning",       note:"Fett, vax, laminat förstör massans fibrer" },
      ],
    },
    items: [
      // TIDNINGAR / MJUKPAPPER
      { id:"sk2_tidn_dagstidning",  name:"Dagstidning",            emoji:"📰", cat:"tidningar", contamination:0,
        fact:"Tidningspapper har korta fibrer — passar för ny tidning, toalettpapper och hygienpapper." },
      { id:"sk2_tidn_reklam",       name:"Reklamblad / Katalog",   emoji:"📋", cat:"tidningar", contamination:0,
        fact:"Reklamkatalog och broschyrer är bestruket papper — återvinns som tidningar men kräver avbläckning." },
      { id:"sk2_tidn_kuvert",       name:"Kuvert (utan fönster)",  emoji:"✉️", cat:"tidningar", contamination:0,
        fact:"Papperskuvert utan plastfönster sorteras som tidningspapper — rent pappersmaterial." },
      { id:"sk2_tidn_kontorspapper",name:"Kontorspapper (A4)",     emoji:"📄", cat:"tidningar", contamination:0,
        fact:"Vitt kontorspapper är långfibrig cellulose — högt fibervärde, sorteras med tidningar." },
      // KARTONG / WELLPAPP
      { id:"sk2_kart_wellpapp",     name:"Wellpappkartong",        emoji:"📦", cat:"kartong", contamination:0,
        fact:"Wellpapp har de längsta kraftlinerfibrerna — ger starka nya kartonger och emballage." },
      { id:"sk2_kart_flingpaket",   name:"Flingpaket (food box)",  emoji:"🥣", cat:"kartong", contamination:0,
        fact:"Matvarukartonger är solidkartong — kortare fibrer än wellpapp men fortfarande värdefulla." },
      { id:"sk2_kart_skobox",       name:"Skokartong",             emoji:"👟", cat:"kartong", contamination:0,
        fact:"Skokartong och presentkartonger sorteras som kartong — inga beläggningar, rena fibrer." },
      { id:"sk2_kart_pappers_pase", name:"Papperskasse",           emoji:"🛍️", cat:"kartong", contamination:0,
        fact:"Brun eller vit papperskasse av kraftpapper — kan återvinnas som kartong." },
      // DRYCKESFÖRPACKNINGAR (Tetra Pak)
      { id:"sk2_dryck_mjolk",       name:"Mjölkförpackning (Tetra Pak)", emoji:"🥛", cat:"dryck", contamination:0,
        fact:"Tetra Pak = 75 % papper + 20 % plast + 5 % aluminium — separeras i specialprocess med vatten." },
      { id:"sk2_dryck_juice",       name:"Juiceförpackning (Tetra Pak)", emoji:"🧃", cat:"dryck", contamination:0,
        fact:"Juiceförpackningar är Tetra Pak-laminat — sorteras separat för att fibern ska kunna utvinnas." },
      { id:"sk2_dryck_sopp",        name:"Soppförpackning (Tetra Pak)",  emoji:"🍲", cat:"dryck", contamination:0,
        fact:"Tetra Pak-soppa: samma laminatstruktur som mjölkförpackning — sorteras identiskt." },
      { id:"sk2_dryck_matlagning",  name:"Matlagningsgrädde (Tetra Pak)", emoji:"🥄", cat:"dryck", contamination:0,
        fact:"Liten Tetra Pak-förpackning — hög papperskvalitet inuti. Laminatet separeras kemiskt." },
      // FK — avvisas
      { id:"sk2_fk_pizza",          name:"Pizzakartong (fettfläck)",     emoji:"🍕", cat:"fk", contamination:25,
        fact:"❗ FK! Fettfläckar från pizza bryter ned pappersfibern under massaprocessen. Avvisa alltid!" },
      { id:"sk2_fk_smor",           name:"Smörpapper / bakpapper",       emoji:"🧈", cat:"fk", contamination:20,
        fact:"❗ FK! Vaxat eller silikonbehandlat papper är vattentätt — fibern kan inte lösas upp. Avvisa!" },
      { id:"sk2_fk_mugg",           name:"Pappersmuggar (plastlaminat)", emoji:"☕", cat:"fk", contamination:22,
        fact:"❗ FK! Pappersmuggar har plastbeläggning inuti — laminatet hindrar fiberutvinning. Energiåtervinning." },
      { id:"sk2_fk_blott",          name:"Blött / smutsigt papper",      emoji:"💧", cat:"fk", contamination:18,
        fact:"❗ FK! Blött papper bryter ned fibrerna mekaniskt. Smutsigt papper sprider kontaminering i massan." },
    ],
  },
  {
    id: "organiskt", name: "Matavfallsstationen", icon: "🌱", color: "#66BB6A",
    desc: "Matavfall blir biogas och biogödsel — plast stoppar hela processen.",
    instructions: [
      "Din uppgift: <strong>acceptera</strong> rent matavfall, <strong>avvisa</strong> plast och föroreningar.",
      "⚠️ Plastpåsar med matavfall fastnar i rötningsanläggningens maskiner — stoppar biogasproduktionen.",
      "'Komposterbara' plastpåsar bryts ned för långsamt i biogasprocessen — avvisa dem också.",
      "Metalldelar (häftklamrar, kapsylar) i matavfall sliter sönder maskiner.",
      "Tryck <kbd>1</kbd> för Acceptera &nbsp;·&nbsp; <kbd>2</kbd> för Avvisa &nbsp;·&nbsp; <kbd>Space</kbd> pausar.",
    ],
    items: [
      { id:"so_banana",   name:"Bananskal",                emoji:"🍌", accept:true,  contamination:0,
        fact:"Bananskal och fruktrester — acceptera! Ger biogas och biogödsel." },
      { id:"so_coffee",   name:"Kaffesump (med filter)",   emoji:"☕", accept:true,  contamination:0,
        fact:"Kaffesump och pappersfilter är 100 % biologiska — acceptera!" },
      { id:"so_veg",      name:"Grönsaksskal",             emoji:"🥕", accept:true,  contamination:0,
        fact:"Alla råa grönsaker och frukter sorteras som matavfall — acceptera!" },
      { id:"so_eggshell", name:"Äggskalar",                emoji:"🥚", accept:true,  contamination:0,
        fact:"Äggskalar bryts ned i kompost och tillför kalk till jordbruket — acceptera!" },
      { id:"so_bread",    name:"Gammalt bröd",             emoji:"🍞", accept:true,  contamination:0,
        fact:"Mat som inte ätits sorteras som matavfall — acceptera!" },
      { id:"so_plastic",  name:"Plastpåse med mat",        emoji:"🛍️", accept:false, contamination:20,
        fact:"❗ Plastpåsar fastnar i maskiner och stoppar biogasproduktionen helt. Avvisa alltid!" },
      { id:"so_compost",  name:"'Kompostbar' plastpåse",   emoji:"🌿", accept:false, contamination:15,
        fact:"'Komposterbara' påsar bryts ned för långsamt i biogasprocessen — avvisa!" },
      { id:"so_teabag",   name:"Tepåse m. metallhäfta",   emoji:"🍵", accept:false, contamination:8,
        fact:"Metallhäftklamrar sliter sönder maskiner. Klipp av häftan och sortera tepåsen rätt." },
    ],
  },
];

// =====================================================
// RESEDATA (Nivå 3) — 5 materialflöden, 3 steg vardera
// =====================================================

const JOURNEYS = [
  {
    id:"glas", name:"Glasets resa", icon:"🫙", color:"#4CAF50", stationId:"glas",
    desc:"Från sorterad batch till nya glasflaskor på hyllan",
    intro:[
      "Du följer glaset från sorteringsstation till ny förpackning.",
      "Steg 1: Färgsortera batchen — blandat glas ger missfärgning i slutprodukten.",
      "Steg 2: Kalibrera smältugnen — rätt temperatur avgör om glaset kan formas.",
      "Steg 3: Se vad din batch kan bli och vilken CO₂-besparing du uppnår.",
    ],
    stages:[
      {
        type:"belt", title:"Steg 1 av 3 — Färgsortering",
        subtitle:"Genomskinligt, grönt och brunt glas måste hållas strängt isär.",
        acceptLabel:"Rätt färg (grön) — acceptera", rejectLabel:"Fel färg — avvisa",
        timePerItem:8500, slideIn:680, beltSpd:"0.44s",
        items:[
          { name:"Grön vinflaska",      emoji:"🍷", accept:true,  contamination:0,  fact:"Grön glasflaska — rätt färgfraktion. Acceptera!" },
          { name:"Grön ölflaska",       emoji:"🍺", accept:true,  contamination:0,  fact:"Grön glasförpackning hör till denna batch." },
          { name:"Grön glasburk",       emoji:"🫙", accept:true,  contamination:0,  fact:"Grön glasburk — acceptera till grön fraktion." },
          { name:"Genomskinlig flaska", emoji:"💧", accept:false, contamination:12, fact:"Genomskinligt glas ger färgstörning i grön batch — separera det!" },
          { name:"Brun ölflaska",       emoji:"🟤", accept:false, contamination:10, fact:"Brunt glas ger mörk missfärgning i grön fraktion — avvisa!" },
          { name:"Blå parfymflaska",    emoji:"💜", accept:false, contamination:15, fact:"Blått glas hör inte till standardfraktionerna — avvisa." },
          { name:"Grön läskflaska",     emoji:"🫙", accept:true,  contamination:0,  fact:"Grön glasflaska — rätt fraktion. Acceptera!" },
          { name:"Vit glasburk",        emoji:"🧂", accept:false, contamination:8,  fact:"Genomskinlig kryddburk — fel fraktion för grön batch." },
        ],
      },
      {
        type:"slider", title:"Steg 2 av 3 — Ugnskalibrering",
        subtitle:"Ställ in smältugnen till rätt temperatur",
        body:"Glas bearbetas optimalt vid 1380–1420°C. För låg temperatur ger bubblor och svaga punkter. För hög temperatur ökar energiförbrukning och gör glaset svårformat.",
        unit:"°C", min:1200, max:1500, targetMin:1380, targetMax:1420,
        tooLowMsg:"Ugnen är för kall — glaset smälter inte fullständigt, bubblor bildas och skapar svaga punkter.",
        inZoneMsg:"Perfekt! Glaset flödar jämnt och kan formas med hög precision.",
        tooHighMsg:"Ugnen är för het — onödig energiåtgång och glaset blir svårt att forma exakt.",
        qualityPenaltyLow:15, qualityPenaltyHigh:8,
      },
      {
        type:"consequence", title:"Steg 3 av 3 — Slutprodukten",
        subtitle:"Vad kan din batch bli?",
        circle:[
          { emoji:"⛏️",  label:"Sand & kvarts" },
          { emoji:"🏭",  label:"Glasfabrik" },
          { emoji:"🍷",  label:"Glasflaska" },
          { emoji:"🏠",  label:"Konsument" },
          { emoji:"♻️",  label:"Insamling" },
          { emoji:"🔥",  label:"Omsmältning" },
        ],
        outcomes:[
          { minQuality:90, emoji:"🍷", product:"Livsmedelsflaskor",
            desc:"Hög renhet — uppfyller EU-krav för livsmedelsförpackningar. Kan bli nya vinflaskor eller glasburkar för mat.",
            co2:"220 kg CO₂ sparat per ton glas", fact:"Glas kan återvinnas hur många gånger som helst utan kvalitetsförlust — en verklig cirkel." },
          { minQuality:70, emoji:"🏗️", product:"Glasull / isoleringsmaterial",
            desc:"Godtagbar renhet men inte food-grade. Glaset mals och smälts om till isoleringsmaterial för byggbranschen.",
            co2:"160 kg CO₂ sparat per ton glas", fact:"Glasull från återvunnet glas isolerar lika bra som ny glasull — men fibrerna kan inte återvinnas igen." },
          { minQuality:0,  emoji:"⛏️", product:"Fyllnadsmaterial (lägsta klass)",
            desc:"Batchen var för kontaminerad för materialåtervinning. Glaset krossas och används som fyllnadsmaterial i vägbyggen.",
            co2:"40 kg CO₂ sparat per ton", fact:"Fyllnadsmaterial är inte cirkulärt — det är en linjär slutstation. Varje kontaminant du missar knuffar ner glaset i hierarkin." },
        ],
      },
    ],
  },
  {
    id:"plast", name:"Plastens resa", icon:"♻️", color:"#F5A623", stationId:"plast",
    desc:"Från plastflaska till pellets och ny råvara via polymertypning",
    intro:[
      "Du följer plastfraktionen från anläggning till nya produkter.",
      "Steg 1: Polymertypsortera — PET och HDPE smälter vid olika temperaturer, blandning förstör batchen.",
      "Steg 2: Kalibrera extruderaren — rätt smälttemperatur avgör pelletskvaliteten.",
      "Steg 3: Se vad dina pellets kan bli — från ny flaska till nedcyclad parkbänk.",
    ],
    stages:[
      {
        type:"belt", title:"Steg 1 av 3 — Polymertypsortering",
        subtitle:"IR-sensorer skannar plasten — separera PET från övriga polymerer.",
        acceptLabel:"PET (kod 1) — hit", rejectLabel:"Annan plast — avvisa",
        timePerItem:8500, slideIn:680, beltSpd:"0.44s",
        items:[
          { name:"PET-vattenflaska",    emoji:"🍶", accept:true,  contamination:0,
            plastic:{code:"01",name:"PET",glyph:"♳"},
            fact:"PET (kod 1) — rätt polymer för denna batch. Acceptera!" },
          { name:"HDPE-schampoflaska",  emoji:"🧴", accept:false, contamination:18,
            plastic:{code:"02",name:"HDPE",glyph:"♴"},
            fact:"HDPE (kod 2) smälter vid 130°C — PET smälter vid 260°C. Blandning förstör hela batchen." },
          { name:"PVC-vattenrör",       emoji:"🧪", accept:false, contamination:22,
            plastic:{code:"03",name:"PVC",glyph:"♵"},
            fact:"PVC (kod 3) frigör saltsyra (HCl) vid smältning — frätande, farligt för maskiner och personal." },
          { name:"LDPE-plastpåse",      emoji:"🛍️", accept:false, contamination:12,
            plastic:{code:"04",name:"LDPE",glyph:"♶"},
            fact:"LDPE (kod 4) är plastfilm — fastnar i sorteringsmaskinen. Hör till separat filmfraktion." },
          { name:"PP-yoghurtburk",      emoji:"🫙", accept:false, contamination:15,
            plastic:{code:"05",name:"PP",glyph:"♷"},
            fact:"PP (kod 5) är en annan polymersort med högre smältpunkt — avvisa till separat PP-fraktion." },
          { name:"PS-engångsmugg",      emoji:"☕", accept:false, contamination:10,
            plastic:{code:"06",name:"PS",glyph:"♸"},
            fact:"PS (kod 6) — polystyren. Sällan återvunnet i Sverige, bildar skadliga styrenmonomerer vid felaktig hantering." },
          { name:"PET-läskflaska",      emoji:"🥤", accept:true,  contamination:0,
            plastic:{code:"01",name:"PET",glyph:"♳"},
            fact:"PET (kod 1) — samma polymer som vattenflaskor. IR-sensorn känner igen den direkt. Acceptera!" },
          { name:"Svart PP-låda",       emoji:"⬛", accept:false, contamination:20,
            plastic:{code:"05",name:"PP",glyph:"♷"},
            fact:"Svart plast: kolfärgämnet blockerar IR-sensorns ljusstråle — polymersorten kan inte läsas. Avvisa alltid!" },
        ],
      },
      {
        type:"slider", title:"Steg 2 av 3 — Extrudertemperatur",
        subtitle:"PET pelletiseras vid rätt smälttemperatur",
        body:"PET smälter vid 260°C men extruderas bäst vid 275–285°C. För låg temp ger klumpiga ojämna pellets. För hög temp degraderas polymeren och tappar hållfasthet.",
        unit:"°C", min:240, max:310, targetMin:275, targetMax:285,
        tooLowMsg:"För kallt — PET smälter inte jämnt, pelletsarna blir klumpiga och håller inte kvalitetskrav.",
        inZoneMsg:"Perfekt extruderingstemperatur! PET-pellets av hög kvalitet produceras.",
        tooHighMsg:"För varmt — PET-polymeren degraderas termiskt och tappar mekanisk hållfasthet.",
        qualityPenaltyLow:12, qualityPenaltyHigh:10,
      },
      {
        type:"consequence", title:"Steg 3 av 3 — Från pellets till produkt",
        subtitle:"Vart tar dina PET-pellets vägen?",
        circle:[
          { emoji:"⛽",  label:"Råolja" },
          { emoji:"🧪",  label:"PET-syntes" },
          { emoji:"🍶",  label:"PET-flaska" },
          { emoji:"🏠",  label:"Konsument" },
          { emoji:"♻️",  label:"IR-sortering" },
          { emoji:"🔬",  label:"Pelletering" },
        ],
        outcomes:[
          { minQuality:90, emoji:"🍶", product:"Nya PET-flaskor (food-grade)",
            desc:"Hög renhet — food-grade! Pelletsarna kan bli nya dryckesflaskor. Full materialcirkel utan fossil råvara.",
            co2:"1.5 ton CO₂ sparat per ton PET", fact:"Återvinning av PET kräver bara 70 % av energin jämfört med att tillverka ny PET från råolja." },
          { minQuality:65, emoji:"🧥", product:"Polyesterfleece / textilfiber",
            desc:"Godtagbar kvalitet. PET spänns ut till polyesterfiber — en fleecetröja kräver ca 25 återvunna flaskor.",
            co2:"1.1 ton CO₂ sparat per ton PET", fact:"Nedcycling: materialet återvinns men till lägre användningsområde — fleecen kan sällan återvinnas igen." },
          { minQuality:0,  emoji:"🚦", product:"Trafikkon / parkbänk",
            desc:"Låg kvalitet. Plasten kan bara formas till produkter där renhet inte är kritisk — en linjär slutstation.",
            co2:"0.6 ton CO₂ sparat per ton", fact:"Varje steg nedåt i hierarkin minskar materialets framtida återvinningsbarhet. Kod-blandning är kostsam." },
        ],
      },
    ],
  },
  {
    id:"papper", name:"Papprets resa", icon:"📄", color:"#4A90E2", stationId:"papper",
    desc:"Från tidning till ny fibermassa — fibrerna förkortas för varje cykel",
    intro:[
      "Du följer pappersfibern från anläggning till nytt papper.",
      "Steg 1: Rensa kontaminanter ur massan — plast och fett förstör fiberbildningen.",
      "Steg 2: Kalibrera fiberkoncentrationen i hydrapulpern — rätt balans avgör papperskvaliteten.",
      "Steg 3: Se vad ditt papper kan bli och hur långt fibrerna kan fortsätta cykeln.",
    ],
    stages:[
      {
        type:"belt", title:"Steg 1 av 3 — Kontaminantrensning",
        subtitle:"Pappret blöts upp i hydrapulpern — ta bort allt som inte är fiber.",
        acceptLabel:"Ren fiber — acceptera", rejectLabel:"Kontaminant — avvisa",
        timePerItem:8500, slideIn:680, beltSpd:"0.44s",
        items:[
          { name:"Tidningsfibrer (rena)",  emoji:"📰", accept:true,  contamination:0,  fact:"Rena tidningsfibrer — acceptera! Återvinns till ny tidning eller kartong." },
          { name:"Kartongfibrer (rena)",   emoji:"📦", accept:true,  contamination:0,  fact:"Ren kartongfiber passar utmärkt i ny förpackningskartong." },
          { name:"Kuvertfibrer (rena)",    emoji:"✉️", accept:true,  contamination:0,  fact:"Fibrer från vanliga kuvert — acceptera!" },
          { name:"Plastfolie i massan",    emoji:"🛍️", accept:false, contamination:15, fact:"Plastfolie fastnar i maskinen och bildar klumpar som förstör pappersarken." },
          { name:"Häftklamrar",            emoji:"📎", accept:false, contamination:8,  fact:"Metallklamrar skadar valsar i pappersmaskinen — avvisa." },
          { name:"Fettfläckig fiber",      emoji:"🍕", accept:false, contamination:18, fact:"Fett i fibermassa kan inte tvättas bort — ger svaga fläckar i det nya pappret." },
          { name:"Kontorspapper (rent)",   emoji:"📄", accept:true,  contamination:0,  fact:"Kontorspapper ger långa fibrer och hög kvalitet i det återvunna pappret." },
          { name:"Vaxpapper",              emoji:"🧈", accept:false, contamination:10, fact:"Vaxbeläggning hindrar fiberseparering och fastnar som klumpar i massan." },
        ],
      },
      {
        type:"slider", title:"Steg 2 av 3 — Fiberkoncentration",
        subtitle:"Rätt mängd fibrer i vattnet avgör papprets styrka",
        body:"Pappersmassans fiberhalt (%) styr papprets styrka och jämnhet. För lite fibrer ger svagt, ojämnt papper. För många fibrer ger ojämn fördelning och hål i arket.",
        unit:"%", min:0.1, max:4.9, targetMin:0.8, targetMax:1.2,
        tooLowMsg:"För liten fiberhalt — pappret blir för tunt och svagt, spricker vid minsta tryck.",
        inZoneMsg:"Perfekt fiberkoncentration! Papperet formas med jämn tjocklek och god styrka.",
        tooHighMsg:"För hög fiberhalt — massan flödar inte jämnt och ger hål och ojämnheter i arket.",
        qualityPenaltyLow:12, qualityPenaltyHigh:10,
      },
      {
        type:"consequence", title:"Steg 3 av 3 — Nytt papper",
        subtitle:"Vad kan ditt papper bli?",
        circle:[
          { emoji:"🌲",  label:"Skogsråvara" },
          { emoji:"🏭",  label:"Pappersmassa" },
          { emoji:"📰",  label:"Papper" },
          { emoji:"🏠",  label:"Konsument" },
          { emoji:"♻️",  label:"Insamling" },
          { emoji:"💧",  label:"Hydrapulper" },
        ],
        outcomes:[
          { minQuality:88, emoji:"📰", product:"Tidnings- och tryckeripapper",
            desc:"Hög fiberkvalitet! Kan bli tidnings- och bokpapper. Fibrerna är fortfarande långa nog för tryck.",
            co2:"700 kg CO₂ sparat per ton papper", fact:"Pappersfiber förkortas vid varje cykel — efter ~7 återvinningar är de för korta och måste ersättas med ny skogsmassa." },
          { minQuality:65, emoji:"📦", product:"Förpackningskartong",
            desc:"Fibrer för korta för tryckeripapper men perfekt för brun kartong och wellpapp. En degradering men ändå cirkulär.",
            co2:"500 kg CO₂ sparat per ton", fact:"Returkartong utgör ~80 % av allt förpackningsmaterial i Sverige — ett av de mest effektiva återvinningssystemen vi har." },
          { minQuality:0,  emoji:"🧻", product:"Mjukpapper / toalettpapper",
            desc:"Korta, svaga fibrer. Duger bara till mjukpapper — slutstationen för pappersfibrer innan de komposteras.",
            co2:"300 kg CO₂ sparat per ton", fact:"Toalettpapper är en linjär slutstation — men det är ändå bättre än att bränna eller deponera pappret direkt." },
        ],
      },
    ],
  },
  {
    id:"metall", name:"Metallens resa", icon:"🔩", color:"#8E9EAB", stationId:"metall",
    desc:"Från aluminiumburk till ingot i smältugnen — 5 % av energin för ny aluminium",
    intro:[
      "Du följer aluminiumet från sortering till ny metallprodukt.",
      "Steg 1: Separera aluminium från stål och andra metaller — legeringsföroreningar förstör smältan.",
      "Steg 2: Kalibrera smälttemperaturen — för varm skapar oxidlager, för kall ger klumpar.",
      "Steg 3: Se vad ditt aluminium kan bli och den enorma energibesparingen.",
    ],
    stages:[
      {
        type:"belt", title:"Steg 1 av 3 — Magnetsortering",
        subtitle:"Stål är magnetiskt — aluminium inte. Separera dem.",
        acceptLabel:"Aluminium — hit", rejectLabel:"Stål / övrigt — avvisa",
        timePerItem:8500, slideIn:680, beltSpd:"0.44s",
        items:[
          { name:"Aluminiumburk (ren)",  emoji:"🥤", accept:true,  contamination:0,  fact:"Aluminium — icke-magnetiskt. Rätt fraktion! Acceptera." },
          { name:"Aluminiumfolie",       emoji:"✨", accept:true,  contamination:0,  fact:"Aluminiumfolie hör till aluminiumfraktionen — acceptera!" },
          { name:"Aluminiumkapsyl",      emoji:"🔘", accept:true,  contamination:0,  fact:"Aluminiumkapsyl — rätt fraktion. Acceptera." },
          { name:"Stålkonservburk",      emoji:"🥫", accept:false, contamination:20, fact:"Stål i aluminiumsats orsakar legeringsföroreningar som försämrar aluminiumet kraftigt." },
          { name:"Batteripaket",         emoji:"🔋", accept:false, contamination:25, fact:"❗ Litium-batterier kan explodera i smältugnen. Omedelbar säkerhetsrisk — avvisa!" },
          { name:"Målade plåtdelar",     emoji:"🎨", accept:false, contamination:12, fact:"Färgrester bildar slagg i aluminiumsmältan och sänker metallkvaliteten." },
          { name:"Aluminiumlock",        emoji:"⚙️", accept:true,  contamination:0,  fact:"Rent aluminiumlock — acceptera till aluminiumfraktionen." },
          { name:"Koppartråd",           emoji:"🔌", accept:false, contamination:15, fact:"Koppar i aluminiumsmältan ger en legering med andra egenskaper — avvisa." },
        ],
      },
      {
        type:"slider", title:"Steg 2 av 3 — Smälttemperatur",
        subtitle:"Aluminium smälter vid 660°C — bearbetas vid 700–750°C",
        body:"Aluminium smälts och renas vid 700–750°C. För låg temp ger ofullständig smältning och klumpar. För hög temp ökar oxidation av aluminiumet och ger sämre metallkvalitet.",
        unit:"°C", min:640, max:820, targetMin:700, targetMax:750,
        tooLowMsg:"För kallt — aluminiumet smälter inte fullständigt, klumpar bildas och förorenar smältan.",
        inZoneMsg:"Perfekt smälttemperatur! Aluminiumet flödar rent och kan gjutas till ingots.",
        tooHighMsg:"För varmt — aluminiumet oxiderar och bildar aluminiumoxid (dross) — svårt att ta bort.",
        qualityPenaltyLow:14, qualityPenaltyHigh:10,
      },
      {
        type:"consequence", title:"Steg 3 av 3 — Aluminiumingot",
        subtitle:"Vad kan ditt aluminium bli?",
        circle:[
          { emoji:"⛏️",  label:"Bauxitgruva" },
          { emoji:"⚡",  label:"Elektrolys" },
          { emoji:"🥤",  label:"Aluminiumprodukt" },
          { emoji:"🏠",  label:"Konsument" },
          { emoji:"♻️",  label:"Insamling" },
          { emoji:"🔥",  label:"Omsmältning" },
        ],
        outcomes:[
          { minQuality:90, emoji:"🥤", product:"Nya aluminiumburkar (food-grade)",
            desc:"Primärlegering av hög renhet. Valsat till 0.1 mm tunnplåt för nya dryckburkar — full cirkel!",
            co2:"8 ton CO₂ sparat per ton aluminium", fact:"Omsmältning kräver bara 5 % av energin för primärproduktion. En burk kan vara en ny burk på 60 dagar." },
          { minQuality:70, emoji:"🚗", product:"Fordonsdelar / konstruktionsaluminium",
            desc:"Sekundärlegering. Tillräcklig renhet för fordonsindustrin — motorblock, hjulfälgar, karossdelar.",
            co2:"7 ton CO₂ sparat per ton aluminium", fact:"Fordonsindustrins aluminiumandel ökar för att sänka bilars vikt — men legering gör det svårare att återvinna tillbaka till burkar." },
          { minQuality:0,  emoji:"🏗️", product:"Gjutaluminium / byggkomponenter",
            desc:"Lägre renhet. Används som gjutmaterial för icke-kritiska konstruktionsdelar.",
            co2:"5.5 ton CO₂ sparat per ton aluminium", fact:"Även lågkvalitetsaluminium sparar enormt — men kontaminanter (koppar, stål) hindrar full cirkel tillbaka till dryckburkar." },
        ],
      },
    ],
  },
  {
    id:"organiskt", name:"Matavfallets resa", icon:"🌱", color:"#66BB6A", stationId:"organiskt",
    desc:"Från köksavfall till biogas och biogödsel — näringscirkeln slutet",
    intro:[
      "Du följer matavfallet från insamling till biogas och biogödsel.",
      "Steg 1: Förbehandla batchen — plast och hårda föremål havererar rötkammarens maskiner.",
      "Steg 2: Kalibrera rötkammartemperaturen — bakterierna kräver exakt rätt förhållanden.",
      "Steg 3: Se hur mycket biogas och biogödsel du producerar — och hur näringen återgår till åkrarna.",
    ],
    stages:[
      {
        type:"belt", title:"Steg 1 av 3 — Förbehandling",
        subtitle:"Sista rensningen — plast och hårda föremål förstör rötkammaren.",
        acceptLabel:"Rent matavfall — in", rejectLabel:"Föroreningar — avvisa",
        timePerItem:8500, slideIn:680, beltSpd:"0.44s",
        items:[
          { name:"Bananskal",            emoji:"🍌", accept:true,  contamination:0,  fact:"Bananskal bryts ned effektivt och ger god biogasutbyte." },
          { name:"Grönsaksskal",         emoji:"🥕", accept:true,  contamination:0,  fact:"Grönsaksrester — rika på organiskt material och lätta att röta." },
          { name:"Gammalt bröd",         emoji:"🍞", accept:true,  contamination:0,  fact:"Kolhydratrikt matavfall ger hög metanproduktion i rötkammaren." },
          { name:"Plastpåse med mat",    emoji:"🛍️", accept:false, contamination:22, fact:"❗ Plastpåsar fastnar i omröraren och stoppar hela rötkammaren. Avvisa alltid!" },
          { name:"Köttben",              emoji:"🦴", accept:false, contamination:10, fact:"Hårda ben sliter sönder rötkammarens knivar och pumpar — avvisa." },
          { name:"'Kompostbar' påse",    emoji:"🌿", accept:false, contamination:15, fact:"'Komposterbara' påsar bryts ned för långsamt för biogasprocessen — avvisa!" },
          { name:"Kaffesump",            emoji:"☕", accept:true,  contamination:0,  fact:"Kaffesump och pappersfilter är 100 % biologiska — acceptera!" },
          { name:"Metallhäftklamrar",    emoji:"📎", accept:false, contamination:8,  fact:"Metalldelar sliter sönder pumpar och hamnar i biogödseln — avvisa till metall." },
        ],
      },
      {
        type:"slider", title:"Steg 2 av 3 — Rötkammartemperatur",
        subtitle:"Metanproducerande bakterier kräver exakt rätt temperatur",
        body:"Metanogena bakterier arbetar optimalt vid 35–40°C (mesofilisk process). Temperaturen måste vara stabil — svängningar stressar och dödar bakterierna och stoppar gasproduktionen.",
        unit:"°C", min:20, max:65, targetMin:35, targetMax:40,
        tooLowMsg:"För kallt — bakterierna arbetar för långsamt, biogasproduktionen sjunker kraftigt.",
        inZoneMsg:"Perfekt temperatur! Metanogenerna är aktiva och biogasproduktionen optimal.",
        tooHighMsg:"För varmt — bakterierna stressas och dör, biogasproduktionen kollapsar.",
        qualityPenaltyLow:14, qualityPenaltyHigh:16,
      },
      {
        type:"consequence", title:"Steg 3 av 3 — Biogas och biogödsel",
        subtitle:"Vad producerar din rötkammare?",
        circle:[
          { emoji:"🌱",  label:"Jordbruk" },
          { emoji:"🥘",  label:"Livsmedel" },
          { emoji:"🏠",  label:"Konsument" },
          { emoji:"🗑️",  label:"Matavfall" },
          { emoji:"🏭",  label:"Biogasanläggning" },
          { emoji:"⛽",  label:"Biogas + Gödsel" },
        ],
        outcomes:[
          { minQuality:88, emoji:"⛽", product:"Fordonsgas + A-klassad biogödsel",
            desc:"Hög renhet! Biogasen uppgraderas till fordonsgas (biometan). Biogödseln är A-klassad och kan spridas fritt på åkrar — näringen återgår till jordbruket.",
            co2:"1.5 ton CO₂e sparat per ton matavfall", fact:"En biogasbuss på biogas från 1 ton matavfall kan köra ca 80 km — och gödseln minskar behovet av importerat konstgödsel." },
          { minQuality:65, emoji:"🔥", product:"Kraftvärme + B-klassad biogödsel",
            desc:"Biogasen förbränns för el och fjärrvärme. Biogödseln är B-klassad och kräver mer noggrann spridningskontroll.",
            co2:"1.1 ton CO₂e sparat per ton matavfall", fact:"Kraftvärme från biogas är koldioxidneutral — CO₂ som frigörs är biologiskt bunden, inte fossil. Men näringen i gödseln tas inte tillvara fullt ut." },
          { minQuality:0,  emoji:"🌿", product:"Kompostering (lägst energiutbyte)",
            desc:"Biogasprocessen fungerade inte optimalt pga föroreningar. Materialet komposteras — ingen energi utvinns men näringen återgår till jord.",
            co2:"0.3 ton CO₂e sparat per ton matavfall", fact:"Kompostering är en kol- och näringscirkel men utan energiutbyte. Plastpåsar i matavfallet är vanligaste orsaken till processkollaps." },
        ],
      },
    ],
  },
];

// =====================================================
// SPELSTATUS
// =====================================================

const state = {
  level:   null,   // aktuellt LEVELS-objekt
  queue:   [],
  idx:     0,
  score:   0,
  lives:   3,
  streak:  0,
  correct: 0,
  phase:   "start", // start | level-select | sliding-in | waiting | busy | paused | done
  pausedRemaining: 0,
  // stations mode
  station:         null,  // aktuellt STATIONS-objekt
  quality:         100,   // batchkvalitet 0–100
  isStationMode:   false,
  isMultiSortMode: false,
  multiSortKbdMap: {},
  // journey mode (nivå 3)
  journey:         null,  // aktuellt JOURNEYS-objekt
  journeyStageIdx: 0,
  journeyQuality:  100,
  isJourneyMode:   false,
};

// stations progress persistent i localStorage
function loadStationsCleared() {
  try { return JSON.parse(localStorage.getItem("stationsCleared") || "{}"); } catch { return {}; }
}
function saveStationCleared(stationId, quality) {
  const d = loadStationsCleared();
  if (!d[stationId] || quality > d[stationId]) d[stationId] = quality;
  localStorage.setItem("stationsCleared", JSON.stringify(d));
}
// journeys progress
function loadJourneysCleared() {
  try { return JSON.parse(localStorage.getItem("journeysCleared") || "{}"); } catch { return {}; }
}
function saveJourneyCleared(journeyId, quality) {
  const d = loadJourneysCleared();
  if (!d[journeyId] || quality > d[journeyId]) d[journeyId] = quality;
  localStorage.setItem("journeysCleared", JSON.stringify(d));
}

// =====================================================
// DOM-REFERENSER
// =====================================================

const $ = id => document.getElementById(id);
const el = {
  bg:           $("bg"),
  startScr:     $("start-screen"),
  levelScr:     $("level-screen"),
  stationScr:   $("station-screen"),
  stationGrid:  $("station-grid"),
  journeyScr:   $("journey-screen"),
  journeyGrid:  $("journey-grid"),
  sliderScr:    $("slider-screen"),
  consequenceScr:$("consequence-screen"),
  gameScr:      $("game-screen"),
  resultScr:    $("result-screen"),
  lives:        $("lives"),
  scoreVal:     $("score-val"),
  multBadge:    $("mult-badge"),
  progVal:      $("prog-val"),
  beltTrack:    $("belt-track"),
  itemCard:     $("item-card"),
  icImg:        $("ic-img"),
  icEmoji:      $("ic-emoji"),
  icName:       $("ic-name"),
  icSymbol:     $("ic-symbol"),
  icCondition:  $("ic-condition"),
  pauseBadge:   $("pause-badge"),
  timerBg:      $("timer-bg"),
  restavfallRow:$("restavfall-row"),
  restavfallBtn:$("restavfall-btn"),
  timerFill:    $("timer-fill"),
  toast:        $("toast"),
  sortBtns:     document.querySelectorAll(".sbtn[data-cat]"),
  resStars:     $("res-stars"),
  resTitle:     $("res-title"),
  resScore:     $("res-score"),
  resMsg:       $("res-msg"),
  resUnlock:    $("res-unlock"),
  instructionScr: $("instruction-screen"),
  // station mode
  qualityRow:     $("quality-row"),
  qualityFill:    $("quality-fill"),
  qualityPct:     $("quality-pct"),
  stationSortRow: $("station-sort-row"),
  btnAccept:      $("btn-accept"),
  btnReject:      $("btn-reject"),
  btnNextStation: $("btn-next-station"),
  btnNextJourney: $("btn-next-journey"),
  // slider
  sldrIcon:     $("sldr-icon"),
  sldrTitle:    $("sldr-title"),
  sldrBody:     $("sldr-body"),
  sldrTrack:    $("sldr-track"),
  sldrTargetZone:$("sldr-target-zone"),
  sldrHandle:   $("sldr-handle"),
  sldrMinLbl:   $("sldr-min-lbl"),
  sldrMaxLbl:   $("sldr-max-lbl"),
  sldrValDisp:  $("sldr-val-display"),
  sldrFeedback: $("sldr-feedback"),
  btnSldrConfirm:$("btn-sldr-confirm"),
  // consequence
  csqStep:      $("csq-step"),
  csqTitle:     $("csq-title"),
  csqSubtitle:  $("csq-subtitle"),
  csqEmoji:     $("csq-product-emoji"),
  csqProdName:  $("csq-product-name"),
  csqDesc:      $("csq-desc"),
  csqCo2:       $("csq-co2"),
  csqFact:      $("csq-fact"),
  csqBarFill:   $("csq-bar-fill"),
  csqPct:       $("csq-pct"),
  csqCircle:    $("csq-circle"),
  btnCsqNext:   $("btn-csq-next"),
  multiSortRow:      $("multi-sort-row"),
  processFlow:       $("process-flow"),
  multiPanelLeft:    $("multi-panel-left"),
  multiPanelRight:   $("multi-panel-right"),
  multiStartOverlay: $("multi-start-overlay"),
  btnMultiStart:     $("btn-multi-start"),
  dragScr:      $("drag-screen"),
  dragLives:    $("drag-lives"),
  dragScore:    $("drag-score"),
  dragProg:     $("drag-prog"),
  dragGrid:     $("drag-grid"),
  dragToast:    $("drag-toast"),
  dragBins:     document.querySelectorAll(".dbin"),
  instIcon:     $("inst-icon"),
  instTitle:    $("inst-title"),
  instList:     $("inst-list"),
  btnStart:     $("btn-start"),
  btnPlay:      $("btn-play"),
  btnRetry:     $("btn-retry"),
  btnLevels:    $("btn-levels"),
};

// =====================================================
// TIMER (requestAnimationFrame — jämn färgövergång)
// =====================================================

let timerRAF    = null;
let timerStart  = null;
let timerTotal  = null;

function startTimer(ms) {
  stopTimer();
  timerTotal = ms;
  timerStart = performance.now();
  el.timerFill.style.animation = "none";
  el.timerFill.style.width     = "100%";

  function tick(now) {
    const ratio = Math.max(0, 1 - (now - timerStart) / timerTotal);
    el.timerFill.style.width           = `${ratio * 100}%`;
    el.timerFill.style.backgroundColor =
      ratio > 0.5 ? "#4CAF50" : ratio > 0.2 ? "#FF9800" : "#f44336";
    el.timerFill.style.animation =
      ratio < 0.15 ? "timer-pulse 0.38s ease infinite" : "none";

    if (ratio <= 0 && state.phase === "waiting") {
      onTimeout();
    } else if (ratio > 0) {
      timerRAF = requestAnimationFrame(tick);
    }
  }
  timerRAF = requestAnimationFrame(tick);
}

function stopTimer() {
  if (timerRAF) { cancelAnimationFrame(timerRAF); timerRAF = null; }
  timerStart = null;
}

// =====================================================
// PAUS
// =====================================================

function pauseGame() {
  if (state.phase !== "waiting") return;
  state.pausedRemaining = timerTotal > 0
    ? Math.max(0, timerTotal - (performance.now() - timerStart))
    : 0;
  stopTimer();
  state.phase = "paused";
  el.gameScr.classList.add("paused");
  el.pauseBadge.classList.remove("hidden");
}

function resumeGame() {
  if (state.phase !== "paused") return;
  el.gameScr.classList.remove("paused");
  el.pauseBadge.classList.add("hidden");
  state.phase = "waiting";
  startTimer(state.pausedRemaining);
}

// =====================================================
// SKÄRMHANTERING
// =====================================================

function showScreen(name) {
  [el.startScr, el.levelScr, el.stationScr, el.journeyScr, el.instructionScr,
   el.gameScr, el.dragScr, el.sliderScr, el.consequenceScr, el.resultScr]
    .forEach(s => s.classList.add("hidden"));
  if (name === "start")           el.startScr.classList.remove("hidden");
  if (name === "levels")          el.levelScr.classList.remove("hidden");
  if (name === "station-select")  el.stationScr.classList.remove("hidden");
  if (name === "journey-select")  el.journeyScr.classList.remove("hidden");
  if (name === "instruction")     el.instructionScr.classList.remove("hidden");
  if (name === "game")            el.gameScr.classList.remove("hidden");
  if (name === "drag")            el.dragScr.classList.remove("hidden");
  if (name === "slider")          el.sliderScr.classList.remove("hidden");
  if (name === "consequence")     el.consequenceScr.classList.remove("hidden");
  if (name === "result")          el.resultScr.classList.remove("hidden");
}

// =====================================================
// INSTRUKTIONER & SPELSTART
// =====================================================

let pendingLevelId  = null;
let pendingStation  = null;  // aktuellt STATIONS-objekt vid stationsläge

function showInstructions(levelId) {
  const lvl  = LEVELS.find(l => l.id === levelId);
  if (!lvl || !lvl.unlocked) return;
  pendingLevelId = levelId;

  // Nivå 2 (stations) skickar direkt till stationsval
  if (lvl.mode === "stations") { showStationSelect(); return; }
  // Nivå 3 (journey) skickar direkt till reseväljaren
  if (lvl.mode === "journey") { showJourneySelect(); return; }

  el.instIcon.textContent  = lvl.icon;
  el.instTitle.textContent = lvl.name;

  const rows = LEVEL_INSTRUCTIONS[levelId]?.items ?? [];
  el.instList.innerHTML = rows.map(r => `<li>${r}</li>`).join("");

  showScreen("instruction");
}

function showStationSelect() {
  const cleared = loadStationsCleared();
  el.stationGrid.innerHTML = STATIONS.map(st => {
    const best    = cleared[st.id];
    const isCleared = best && best >= 90;
    const badge   = isCleared ? `<div class="scard-badge">✓ ${best}%</div>` : "";
    return `
      <div class="scard${isCleared ? " cleared" : ""}" data-station="${st.id}"
           style="border-top: 3px solid ${st.color}">
        ${badge}
        <div class="scard-icon">${st.icon}</div>
        <div class="scard-name">${st.name}</div>
        <div class="scard-desc">${st.desc}</div>
        <button class="scard-btn">Välj →</button>
      </div>`;
  }).join("");

  el.stationGrid.querySelectorAll(".scard").forEach(card => {
    card.addEventListener("click", e => {
      if (e.target.classList.contains("scard-btn") || e.target.closest(".scard-btn")) {
        const st = STATIONS.find(s => s.id === card.dataset.station);
        if (st) showStationInstructions(st);
      }
    });
  });

  showScreen("station-select");
}

function showStationInstructions(station) {
  pendingStation = station;
  el.instIcon.textContent  = station.icon;
  el.instTitle.textContent = station.name;
  el.instList.innerHTML    = station.instructions.map(r => `<li>${r}</li>`).join("");
  showScreen("instruction");
}

function startLevel(levelId) {
  const lvl = LEVELS.find(l => l.id === levelId);
  if (!lvl || !lvl.unlocked) return;

  const pool = ITEMS;
  state.level   = lvl;
  state.queue   = shuffle(pool).slice(0, lvl.itemCount);
  state.idx     = 0;
  state.score   = 0;
  state.lives   = lvl.lives;
  state.streak  = 0;
  state.correct = 0;
  state.phase   = "idle";

  el.beltTrack.style.setProperty("--belt-spd", lvl.beltSpd);
  el.restavfallRow.classList.add("hidden"); // restavfall only in drag mode
  el.gameScr.classList.remove("paused");
  el.pauseBadge.classList.add("hidden");
  updateHUD();
  showScreen("game");
  setTimeout(loadNextItem, 300);
}

// =====================================================
// RESELÄGE (Nivå 3) — välj, instruera, kör steg i tur och ordning
// =====================================================

let pendingJourney = null;

function showJourneySelect() {
  const cleared = loadJourneysCleared();
  el.journeyGrid.innerHTML = JOURNEYS.map(j => {
    const best = cleared[j.id];
    const isDone = best && best >= 80;
    const badge = isDone ? `<div class="scard-badge">✓ ${best}%</div>` : "";
    return `
      <div class="scard${isDone ? " cleared" : ""}" data-journey="${j.id}"
           style="border-top: 3px solid ${j.color}">
        ${badge}
        <div class="scard-icon">${j.icon}</div>
        <div class="scard-name">${j.name}</div>
        <div class="scard-desc">${j.desc}</div>
        <button class="scard-btn">Följ resan →</button>
      </div>`;
  }).join("");
  el.journeyGrid.querySelectorAll(".scard").forEach(card => {
    card.addEventListener("click", e => {
      if (e.target.closest(".scard-btn")) {
        const j = JOURNEYS.find(x => x.id === card.dataset.journey);
        if (j) showJourneyInstructions(j);
      }
    });
  });
  showScreen("journey-select");
}

function showJourneyInstructions(journey) {
  pendingJourney = journey;
  el.instIcon.textContent  = journey.icon;
  el.instTitle.textContent = journey.name;
  el.instList.innerHTML    = journey.intro.map(r => `<li>${r}</li>`).join("");
  showScreen("instruction");
}

function startJourney(journey) {
  pendingJourney = null;
  state.journey        = journey;
  state.journeyStageIdx = 0;
  state.journeyQuality  = 100;
  state.isJourneyMode   = true;
  showJourneyStage(0);
}

function showJourneyStage(idx) {
  state.journeyStageIdx = idx;
  const stage = state.journey.stages[idx];
  if (!stage) { endJourney(); return; }
  if (stage.type === "belt")        startJourneyBeltStage(stage);
  else if (stage.type === "slider") showSliderStage(stage);
  else if (stage.type === "consequence") showConsequenceStage(stage);
}

function startJourneyBeltStage(stage) {
  const fakeLvl = { id:3, name:stage.title, lives:3,
                    timePerItem: stage.timePerItem || 8500,
                    slideIn: stage.slideIn || 680,
                    beltSpd: stage.beltSpd || "0.44s" };
  state.level        = fakeLvl;
  state.queue        = shuffle(stage.items);
  state.idx          = 0;
  state.lives        = 3;
  state.score        = 0;
  state.streak       = 0;
  state.correct      = 0;
  state.quality      = state.journeyQuality;
  state.isStationMode = true; // reuse ACCEPT/REJECT mechanic
  state.phase         = "idle";

  // Byt knapptexter
  el.btnAccept.querySelector(".sb-lbl").textContent = stage.acceptLabel || "Acceptera";
  el.btnReject.querySelector(".sb-lbl").textContent = stage.rejectLabel || "Avvisa";

  el.beltTrack.style.setProperty("--belt-spd", fakeLvl.beltSpd);
  document.getElementById("sort-row").classList.add("hidden");
  el.restavfallRow.classList.add("hidden");
  el.stationSortRow.classList.remove("hidden");
  el.qualityRow.classList.remove("hidden");
  el.gameScr.classList.remove("paused");
  el.pauseBadge.classList.add("hidden");

  updateHUD();
  updateQualityMeter();
  showScreen("game");
  setTimeout(loadNextItem, 300);
}

// ── Slider-skärm ──────────────────────────────────────

let sliderValue = 0;
let currentSliderStage = null;

function showSliderStage(stage) {
  currentSliderStage = stage;
  const range = stage.max - stage.min;

  el.sldrIcon.textContent  = state.journey.icon;
  el.sldrTitle.textContent = stage.title;
  el.sldrBody.textContent  = stage.body;
  el.sldrMinLbl.textContent = `${stage.min}${stage.unit}`;
  el.sldrMaxLbl.textContent = `${stage.max}${stage.unit}`;

  // Lägg target-zonen visuellt
  const zoneLeft  = ((stage.targetMin - stage.min) / range) * 100;
  const zoneWidth = ((stage.targetMax - stage.targetMin) / range) * 100;
  el.sldrTargetZone.style.left  = `${zoneLeft}%`;
  el.sldrTargetZone.style.width = `${zoneWidth}%`;

  // Startposition i mitten
  sliderValue = stage.min + range * 0.5;
  updateSliderUI(stage);
  el.sldrFeedback.textContent = "";
  el.sldrFeedback.className   = "sldr-feedback";

  showScreen("slider");
}

function updateSliderUI(stage) {
  const range  = stage.max - stage.min;
  const pct    = (sliderValue - stage.min) / range;
  el.sldrHandle.style.left = `${pct * 100}%`;

  const decimals = stage.unit === "%" ? 1 : 0;
  el.sldrValDisp.textContent = `${sliderValue.toFixed(decimals)}${stage.unit}`;

  const inZone = sliderValue >= stage.targetMin && sliderValue <= stage.targetMax;
  if (inZone) {
    el.sldrFeedback.textContent = stage.inZoneMsg;
    el.sldrFeedback.className   = "sldr-feedback in-zone";
  } else if (sliderValue < stage.targetMin) {
    el.sldrFeedback.textContent = stage.tooLowMsg;
    el.sldrFeedback.className   = "sldr-feedback too-low";
  } else {
    el.sldrFeedback.textContent = stage.tooHighMsg;
    el.sldrFeedback.className   = "sldr-feedback too-high";
  }
}

function sliderConfirm() {
  const stage  = currentSliderStage;
  const inZone = sliderValue >= stage.targetMin && sliderValue <= stage.targetMax;
  if (!inZone) {
    const penalty = sliderValue < stage.targetMin
      ? stage.qualityPenaltyLow : stage.qualityPenaltyHigh;
    state.journeyQuality = Math.max(0, state.journeyQuality - penalty);
  }
  showJourneyStage(state.journeyStageIdx + 1);
}

// Drag på slider-handtaget
(function () {
  let dragging = false;
  function setFromPointer(e) {
    if (!currentSliderStage) return;
    const r    = el.sldrTrack.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    const range = currentSliderStage.max - currentSliderStage.min;
    sliderValue = currentSliderStage.min + pct * range;
    updateSliderUI(currentSliderStage);
  }
  el.sldrHandle.addEventListener("pointerdown", e => {
    dragging = true;
    el.sldrHandle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  el.sldrHandle.addEventListener("pointermove", e => {
    if (dragging) setFromPointer(e);
  });
  el.sldrHandle.addEventListener("pointerup",   () => { dragging = false; });
  el.sldrTrack.addEventListener("click", e => setFromPointer(e));
})();

document.addEventListener("keydown", e => {
  if (!currentSliderStage) return;
  if (!["ArrowLeft","ArrowRight"].includes(e.key)) return;
  const step  = (currentSliderStage.max - currentSliderStage.min) / 100;
  sliderValue += e.key === "ArrowRight" ? step : -step;
  sliderValue  = Math.max(currentSliderStage.min, Math.min(currentSliderStage.max, sliderValue));
  updateSliderUI(currentSliderStage);
}, true);

// ── Konsekvens-skärm ──────────────────────────────────

function showConsequenceStage(stage) {
  const q  = Math.round(state.journeyQuality);
  const outcomes = [...stage.outcomes].sort((a,b) => b.minQuality - a.minQuality);
  const outcome  = outcomes.find(o => q >= o.minQuality) || outcomes[outcomes.length - 1];
  const stageNum = state.journeyStageIdx + 1;

  el.csqStep.textContent     = `${state.journey.name} · ${stageNum} av ${state.journey.stages.length}`;
  el.csqTitle.textContent    = stage.title;
  el.csqSubtitle.textContent = stage.subtitle;
  el.csqEmoji.textContent    = outcome.emoji;
  el.csqProdName.textContent = outcome.product;
  el.csqDesc.textContent     = outcome.desc;
  el.csqCo2.textContent      = outcome.co2 || "";
  el.csqFact.textContent     = outcome.fact;
  el.csqBarFill.style.transform = `scaleX(${q / 100})`;
  el.csqPct.textContent      = `${q}%`;
  const col = q >= 80 ? "#66bb6a" : q >= 60 ? "#ff9800" : "#ef5350";
  el.csqPct.style.color = col;

  if (stage.circle) renderCircleFlow(stage.circle);
  else el.csqCircle.innerHTML = "";

  showScreen("consequence");

  if (stage.circle) animateCircle(stage.circle.length);
}

let _circleAnimTimer = null;

function renderCircleFlow(steps) {
  const half = Math.ceil(steps.length / 2);
  const top  = steps.slice(0, half);
  const bot  = [...steps.slice(half)].reverse();

  function node(step, idx) {
    return `<div class="cc-node" data-cidx="${idx}">
      <span class="cc-emoji">${step.emoji}</span>
      <span class="cc-lbl">${step.label}</span>
    </div>`;
  }

  const topHtml = top.map((s, i) =>
    node(s, i) + (i < top.length - 1 ? '<span class="cc-arr">›</span>' : '')
  ).join('');

  const botHtml = bot.map((s, i) => {
    const realIdx = steps.length - 1 - i;
    return node(s, realIdx) + (i < bot.length - 1 ? '<span class="cc-arr">‹</span>' : '');
  }).join('');

  el.csqCircle.innerHTML = `
    <div class="cc-track">${topHtml}</div>
    <div class="cc-mid"><span class="cc-side-arr">↑</span><span></span><span class="cc-side-arr">↓</span></div>
    <div class="cc-track">${botHtml}</div>
    <div class="cc-loop-lbl">↺ materialet återcirkulerar</div>`;
}

function animateCircle(count) {
  if (_circleAnimTimer) clearTimeout(_circleAnimTimer);
  el.csqCircle.querySelectorAll(".cc-node").forEach(n => n.classList.remove("lit"));
  let i = 0;
  (function step() {
    if (i >= count) return;
    const node = el.csqCircle.querySelector(`[data-cidx="${i}"]`);
    if (node) node.classList.add("lit");
    i++;
    _circleAnimTimer = setTimeout(step, 440);
  })();
}

// ── Journeyavslut ─────────────────────────────────────

function endJourney() {
  const q = Math.round(state.journeyQuality);
  saveJourneyCleared(state.journey.id, q);

  const nCleared = JOURNEYS.filter(j => { const d = loadJourneysCleared(); return d[j.id] && d[j.id] >= 80; }).length;
  const allDone  = nCleared >= JOURNEYS.length;

  el.resStars.textContent = q >= 90 ? "⭐⭐⭐" : q >= 70 ? "⭐⭐" : "⭐";
  el.resTitle.textContent = q >= 80 ? `${state.journey.name} klar! 🎉` : "Resan avslutad";
  el.resScore.innerHTML   = `Slutkvalitet: <strong style="font-size:1.6rem">${q}%</strong>`;
  el.resMsg.textContent   = q >= 80
    ? `Materialet nådde en bra slutprodukt! Följ fler materialresor.`
    : `Kvaliteten sjönk på vägen. Försök igen och lär av misstagen!`;
  el.resUnlock.textContent = allDone
    ? "🏆 Alla 5 materialresor avslutade!"
    : `${nCleared} / 5 resor genomförda`;
  el.resUnlock.classList.remove("hidden");

  el.btnRetry.classList.toggle("hidden", q >= 80);
  el.btnNextStation.classList.add("hidden");
  el.btnNextJourney.classList.toggle("hidden", q < 80 || allDone);

  state.isJourneyMode  = false;
  state.isStationMode  = false;
  // Återställ UI
  document.getElementById("sort-row").classList.remove("hidden");
  el.stationSortRow.classList.add("hidden");
  el.qualityRow.classList.add("hidden");

  showScreen("result");
}

// =====================================================
// STATIONSLÄGE — start, sortering, avslut
// =====================================================

function startStation(station) {
  pendingStation = null;
  const lvl = LEVELS.find(l => l.mode === "stations");

  state.level          = lvl || { id:2, name:station.name, icon:station.icon, lives:3, timePerItem:9000, slideIn:680, beltSpd:"0.44s" };
  state.station        = station;
  state.isStationMode  = true;
  state.isMultiSortMode = station.mode === "multiSort";
  state.queue          = shuffle(station.items);
  state.idx            = 0;
  state.score          = 0;
  state.lives          = 3;
  state.streak         = 0;
  state.correct        = 0;
  state.quality        = 100;
  state.phase          = "idle";

  el.beltTrack.style.setProperty("--belt-spd", state.level.beltSpd || "0.44s");
  document.getElementById("sort-row").classList.add("hidden");
  el.restavfallRow.classList.add("hidden");
  el.qualityRow.classList.remove("hidden");
  el.gameScr.classList.remove("paused");
  el.pauseBadge.classList.add("hidden");

  if (state.isMultiSortMode) {
    el.stationSortRow.classList.add("hidden");
    el.multiSortRow.classList.add("hidden");        // shown after start click
    el.processFlow.classList.remove("hidden");
    el.multiPanelLeft.classList.remove("hidden");
    el.multiPanelRight.classList.remove("hidden");
    el.multiStartOverlay.classList.remove("hidden");
    el.gameScr.classList.add("belt-ltr");
    renderMultiSortUI(station);
    el.btnMultiStart.onclick = () => {
      el.multiStartOverlay.classList.add("hidden");
      el.multiSortRow.classList.remove("hidden");
      loadNextItem();
    };
  } else {
    el.stationSortRow.classList.remove("hidden");
    el.multiSortRow.classList.add("hidden");
    el.processFlow.classList.add("hidden");
    el.multiPanelLeft.classList.add("hidden");
    el.multiPanelRight.classList.add("hidden");
    el.multiStartOverlay.classList.add("hidden");
  }

  updateHUD();
  updateQualityMeter();
  showScreen("game");
  if (!state.isMultiSortMode) setTimeout(loadNextItem, 300);
}

// ── Generisk multiSort (glass, plast, metall) ──────────────────────────────

function renderMultiSortUI(station) {
  // Sort buttons
  el.multiSortRow.innerHTML = "";
  state.multiSortKbdMap = {};
  station.fractions.forEach(f => {
    state.multiSortKbdMap[f.kbd] = f.key;
    const btn = document.createElement("button");
    btn.className = `mstn-btn ${f.cls}`;
    btn.dataset.mcat = f.key;
    btn.innerHTML = `<span class="mstn-icon">${f.icon}</span><span class="mstn-lbl">${f.label}</span><kbd>${f.kbd}</kbd>`;
    btn.addEventListener("click", () => sortMulti(f.key));
    el.multiSortRow.appendChild(btn);
  });

  // Process flow
  if (station.processSteps) {
    el.processFlow.innerHTML = station.processSteps.map((s, i) =>
      (i > 0 ? '<div class="pf-arrow">›</div>' : "") +
      `<div class="pf-step ${s.done ? "pf-done" : s.active ? "pf-active" : ""}" data-pf="${i}">` +
      `<span class="pf-icon">${s.icon}</span><span class="pf-lbl">${s.label}</span></div>`
    ).join("");
  }

  // Left panel
  const L = station.panelLeft;
  el.multiPanelLeft.innerHTML = `
    <div class="gsp-header">${L.header}</div>
    <img src="${L.img}" class="gsp-img" alt="" onerror="this.style.display='none'">
    <ol class="gsp-steps">
      ${L.steps.map(s => `<li class="${s.active ? "gsp-active" : s.done ? "gsp-done" : ""}">${s.text}</li>`).join("")}
    </ol>
    ${L.note ? `<div class="gsp-note">${L.note}</div>` : ""}`;

  // Right panel
  const R = station.panelRight;
  el.multiPanelRight.innerHTML = `
    <div class="gsp-header">${R.header}</div>
    <img src="${R.img}" class="gsp-img" alt="" onerror="this.style.display='none'">
    <ul class="gsp-fractions">
      ${R.fractions.map(f => `
        <li class="${f.cls}">
          <span class="gsf-dot">${f.dot}</span>
          <div><strong>${f.name}</strong><br>${f.dest}<br><em>${f.note}</em></div>
        </li>`).join("")}
    </ul>`;
}

function sortMulti(fraction) {
  if (state.phase !== "waiting") return;
  state.phase = "busy";
  stopTimer();

  const item    = state.queue[state.idx];
  const correct = fraction === item.cat;
  const binBtn  = el.multiSortRow.querySelector(`[data-mcat="${fraction}"]`);

  if (correct) handleMultiCorrect(item, binBtn, fraction);
  else         handleMultiWrong(item, binBtn, fraction);
}

function handleMultiCorrect(item, binBtn, fraction) {
  state.correct++;
  flashSortBtn(binBtn, "ok");

  const r  = el.itemCard.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const fracData = state.station.fractions.find(f => f.key === fraction);
  spawnParticles(cx, cy, fracData?.particleColor || "#66bb6a");

  const label = fracData ? fracData.label : fraction;
  showToast(`✅ ${fraction === "fk" ? "FK avvisad!" : label + " — rätt fraktion!"} ${item.fact}`, "ok");

  flyToBin(binBtn, () => {
    state.idx++;
    state.phase = "idle";
    hideToast();
    updateHUD();
    if (state.idx >= state.queue.length) endStation();
    else setTimeout(loadNextItem, 120);
  });
}

function handleMultiWrong(item, binBtn, fraction) {
  let penalty, toastText;
  const correctLabel = state.station.fractions.find(f => f.key === item.cat)?.label || item.cat;

  if (item.cat === "fk") {
    penalty   = item.contamination;
    toastText = `❌ FK i fraktionen! ${item.fact}`;
  } else if (fraction === "fk") {
    penalty   = 5;
    toastText = `❌ Rätt material avvisades! Hörde till <strong>${correctLabel}</strong>. ${item.fact}`;
  } else {
    penalty   = 12;
    toastText = `❌ Fel fraktion! Hörde till <strong>${correctLabel}</strong>. ${item.fact}`;
  }

  state.quality = Math.max(0, state.quality - penalty);
  state.lives--;
  updateHUD();
  updateQualityMeter();

  flashSortBtn(binBtn, "err");
  el.itemCard.animate([
    { transform:"translate(-50%,-50%)" },
    { transform:"translate(calc(-50% - 13px),-50%) rotate(-3deg)" },
    { transform:"translate(calc(-50% + 13px),-50%) rotate(3deg)" },
    { transform:"translate(-50%,-50%)" },
  ], { duration:370, easing:"ease" });

  showToast(toastText);
  if (state.lives <= 0) { setTimeout(() => endStation(), 700); return; }

  setTimeout(() => {
    slideItemOut(() => {
      state.idx++;
      state.phase = "idle";
      hideToast();
      updateHUD();
      if (state.idx >= state.queue.length) endStation();
      else loadNextItem();
    });
  }, 2400);
}

function flashSortBtn(btn, type) {
  if (!btn) return;
  btn.classList.remove("anim-ok", "anim-err");
  void btn.offsetWidth;
  btn.classList.add(type === "ok" ? "anim-ok" : "anim-err");
  setTimeout(() => btn.classList.remove("anim-ok", "anim-err"), 400);
}

function sortStation(accept) {
  if (state.phase !== "waiting") return;
  state.phase = "busy";
  stopTimer();

  const item    = state.queue[state.idx];
  const correct = accept === item.accept;
  const binBtn  = accept ? el.btnAccept : el.btnReject;

  if (correct) {
    handleStationCorrect(item, binBtn, accept);
  } else {
    handleStationWrong(item, binBtn, accept);
  }
}

function handleStationCorrect(item, binBtn, accepted) {
  state.correct++;
  flashBtn(binBtn, "ok");

  const r  = el.itemCard.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  spawnParticles(cx, cy, accepted ? "#66bb6a" : "#ef5350");

  const toastText = accepted
    ? `✅ Rätt accepterat! ${item.fact}`
    : `✅ Rätt avvisat! ${item.fact}`;
  showToast(toastText, "ok");

  flyToBin(binBtn, () => {
    state.idx++;
    state.phase = "idle";
    hideToast();
    updateHUD();
    if (state.idx >= state.queue.length) endStation();
    else setTimeout(loadNextItem, 120);
  });
}

function handleStationWrong(item, binBtn, accepted) {
  const penalty = accepted ? item.contamination : 3;
  state.quality = Math.max(0, state.quality - penalty);
  state.lives--;
  updateHUD();
  updateQualityMeter();

  flashBtn(binBtn, "err");
  el.itemCard.animate([
    { transform: "translate(-50%,-50%)" },
    { transform: "translate(calc(-50% - 13px),-50%) rotate(-3deg)" },
    { transform: "translate(calc(-50% + 13px),-50%) rotate(3deg)" },
    { transform: "translate(-50%,-50%)" },
  ], { duration: 370, easing: "ease" });

  const toastText = accepted
    ? `❌ Fel! Du accepterade en kontaminant. ${item.fact}`
    : `❌ Fel! Det föremålet hörde hit. ${item.fact}`;
  showToast(toastText);

  if (state.lives <= 0) { setTimeout(() => endStation(), 700); return; }

  setTimeout(() => {
    slideItemOut(() => {
      state.idx++;
      state.phase = "idle";
      hideToast();
      updateHUD();
      if (state.idx >= state.queue.length) endStation();
      else loadNextItem();
    });
  }, 2200);
}

function updateQualityMeter() {
  const q = state.quality;
  el.qualityFill.style.transform = `scaleX(${q / 100})`;
  el.qualityPct.textContent = `${Math.round(q)}%`;
  const color = q >= 90 ? "#66bb6a" : q >= 70 ? "#ff9800" : "#ef5350";
  el.qualityPct.style.color = color;
}

function endStation() {
  stopTimer();
  state.phase = "done";

  // Journey-läge: för bältsteg i resa — avancera till nästa steg
  if (state.isJourneyMode) {
    state.journeyQuality = state.quality;
    state.isStationMode  = false;
    document.getElementById("sort-row").classList.remove("hidden");
    el.stationSortRow.classList.add("hidden");
    el.qualityRow.classList.add("hidden");
    el.btnAccept.querySelector(".sb-lbl").textContent = "Acceptera — hör hit";
    el.btnReject.querySelector(".sb-lbl").textContent = "Avvisa — hör ej hit";
    showJourneyStage(state.journeyStageIdx + 1);
    return;
  }

  const q = Math.round(state.quality);
  const cleared = q >= 90;

  if (cleared) saveStationCleared(state.station.id, q);

  const allCleared = STATIONS.every(s => {
    const d = loadStationsCleared();
    return d[s.id] && d[s.id] >= 90;
  });

  el.resStars.textContent = cleared ? "⭐⭐⭐" : q >= 70 ? "⭐⭐" : "⭐";
  el.resTitle.textContent = cleared ? "Station klarad! 🎉" : "Försök igen";
  el.resScore.innerHTML   = `Batchkvalitet: <strong style="font-size:1.6rem">${q}%</strong>`;
  el.resMsg.textContent   = cleared
    ? `Du höll batchen ren nog för återvinning på ${state.station.name}!`
    : `Du behöver 90 % för att klara stationen. Du nådde ${q} %.`;

  if (allCleared) {
    el.resUnlock.textContent = "🏆 Alla 5 stationer klarade — Nivå 2 klar!";
    el.resUnlock.classList.remove("hidden");
  } else {
    const nCleared = STATIONS.filter(s => { const d = loadStationsCleared(); return d[s.id] && d[s.id] >= 90; }).length;
    el.resUnlock.textContent = `${nCleared} / 5 stationer klarade`;
    el.resUnlock.classList.remove("hidden");
  }

  // Visa "Välj station" istället för "Försök igen" / "Nivåer" vid klarad
  el.btnNextStation.classList.toggle("hidden", !cleared || allCleared);
  el.btnRetry.classList.toggle("hidden", cleared);

  // Återställ sorteringsraden
  document.getElementById("sort-row").classList.remove("hidden");
  el.stationSortRow.classList.add("hidden");
  el.multiSortRow.classList.add("hidden");
  el.processFlow.classList.add("hidden");
  el.multiPanelLeft.classList.add("hidden");
  el.multiPanelRight.classList.add("hidden");
  el.multiStartOverlay.classList.add("hidden");
  el.qualityRow.classList.add("hidden");
  el.gameScr.classList.remove("belt-ltr");
  state.isStationMode   = false;
  state.isMultiSortMode = false;

  showScreen("result");
}

// =====================================================
// FÖREMÅLSHANTERING
// =====================================================

function loadNextItem() {
  if (state.idx >= state.queue.length) { endLevel(); return; }

  const item = state.queue[state.idx];
  el.icName.textContent  = item.name;

  if (item.condition) {
    const icon = item.condition.color === "ok" ? "🟢" : "🟠";
    el.icCondition.textContent = `${icon} ${item.condition.label}`;
    el.icCondition.className = `cond-${item.condition.color}`;
    el.icCondition.classList.remove("hidden");
  } else {
    el.icCondition.classList.add("hidden");
  }

  if (item.plastic) {
    el.icSymbol.innerHTML = `
      <div class="pb">
        <span class="pb-glyph">${item.plastic.glyph}</span>
        <div class="pb-meta">
          <div class="pb-code">${item.plastic.code} · ${item.plastic.name}</div>
          <div class="pb-name">Plasttyp</div>
        </div>
      </div>`;
  } else {
    el.icSymbol.innerHTML = "";
  }

  // Try to show a real image; fall back to emoji. Slide in after image resolves.
  const imgSrc = `assets/items/${item.id}.jpg`;
  const probe  = new Image();
  const doSlide = (hasImg) => {
    if (hasImg) {
      el.icImg.src = imgSrc;
      el.icImg.classList.remove("hidden");
      el.icEmoji.classList.add("hidden");
    } else {
      el.icImg.classList.add("hidden");
      el.icEmoji.textContent = item.emoji;
      el.icEmoji.classList.remove("hidden");
    }
    slideItemIn();
  };
  probe.onload  = () => doSlide(true);
  probe.onerror = () => doSlide(false);
  probe.src = imgSrc;
}

function slideItemIn() {
  const card = el.itemCard;
  const dur  = state.level.slideIn;
  const ltr  = state.isMultiSortMode; // glass: items travel left → right

  // Off-screen (left or right) — no transition
  card.style.transition = "none";
  card.style.opacity    = "0";
  card.style.transform  = ltr
    ? "translate(calc(-50% - 380px), -50%) rotate(-6deg)"
    : "translate(calc(-50% + 380px), -50%) rotate(6deg)";
  void card.offsetWidth;

  // Slide to center
  card.style.transition = `transform ${dur}ms cubic-bezier(0.22,1,0.36,1), opacity 0.28s ease`;
  card.style.opacity    = "1";
  card.style.transform  = "translate(-50%, -50%)";
  state.phase = "sliding-in";

  setTimeout(() => {
    if (state.phase === "sliding-in") {
      state.phase = "waiting";
      startTimer(state.level.timePerItem);
    }
  }, dur);
}

function slideItemOut(onDone) {
  const card = el.itemCard;
  const ltr  = state.isMultiSortMode;
  card.style.transition = "transform 0.38s ease-in, opacity 0.3s ease";
  card.style.transform  = ltr
    ? "translate(calc(-50% + 380px), -50%) rotate(6deg)"
    : "translate(calc(-50% - 380px), -50%) rotate(-6deg)";
  card.style.opacity    = "0";
  setTimeout(onDone, 420);
}

// =====================================================
// SORTERINGSLOGIK
// =====================================================

function sortItem(category) {
  if (state.phase !== "waiting") return;
  state.phase = "busy";
  stopTimer();

  const item    = state.queue[state.idx];
  const correct = category === item.cat;
  const binBtn  = document.querySelector(`.sbtn[data-cat="${category}"]`);

  if (correct) handleCorrect(item, binBtn);
  else         handleWrong(item, binBtn);
}

function handleCorrect(item, binBtn) {
  const mult = getMultiplier();
  const pts  = Math.round(10 * mult);
  state.score   += pts;
  state.streak++;
  state.correct++;
  updateHUD();

  // Knappblink + beltglow
  flashBtn(binBtn, "ok");

  // Skakskärm vid streak-milstolpe
  if (state.streak === 3 || state.streak === 5 || state.streak % 5 === 0) screenShake();

  // Partiklar + poängpopup
  const r = el.itemCard.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const catCol = { plast:"#F5A623", papper:"#4A90E2", metall:"#8E9EAB", glas:"#55B040", restavfall:"#9E9E9E" };
  spawnParticles(cx, cy, catCol[item.cat] || "#9E9E9E");
  showScorePop(cx, r.top, `+${pts}${mult > 1 ? " ×" + mult : ""}`);
  updateMultDisplay();

  if (item.condition) showToast(`✅ ${item.condition.tip}`, "ok");

  flyToBin(binBtn, () => {
    state.idx++;
    state.phase = "idle";
    hideToast();
    updateHUD();
    if (state.idx >= state.queue.length) endLevel();
    else setTimeout(loadNextItem, item.condition ? 600 : 120);
  });
}

function handleWrong(item, binBtn) {
  state.streak = 0;
  state.lives--;
  updateHUD();
  updateMultDisplay();

  flashBtn(binBtn, "err");

  // Skaka föremålskortet
  el.itemCard.animate([
    { transform: "translate(-50%,-50%)" },
    { transform: "translate(calc(-50% - 13px),-50%) rotate(-3deg)" },
    { transform: "translate(calc(-50% + 13px),-50%) rotate(3deg)" },
    { transform: "translate(calc(-50% - 7px), -50%)" },
    { transform: "translate(calc(-50% + 7px), -50%)" },
    { transform: "translate(-50%,-50%)" },
  ], { duration: 370, easing: "ease" });

  showToast(`❌ Det hör till <strong>${catLabel(item.cat)}</strong> — ${item.fact}`);

  if (state.lives <= 0) { setTimeout(() => endLevel(true), 700); return; }

  setTimeout(() => {
    slideItemOut(() => {
      state.idx++;
      state.phase = "idle";
      hideToast();
      updateHUD();
      if (state.idx >= state.queue.length) endLevel();
      else loadNextItem();
    });
  }, 2200);
}

function onTimeout() {
  if (state.phase !== "waiting") return;
  state.phase = "busy";
  state.streak = 0;
  state.lives--;

  if (state.isStationMode) {
    // Timeout i stationsläge: minus 5 % kvalitet (missad inspektion)
    state.quality = Math.max(0, state.quality - 5);
    updateHUD();
    updateQualityMeter();
    showToast(`⏱️ För långsamt! Föremålet passerade osorterat. ${state.queue[state.idx].fact}`);
    if (state.lives <= 0) { setTimeout(() => endStation(), 700); return; }
    slideItemOut(() => {
      state.idx++;
      state.phase = "idle";
      hideToast();
      updateHUD();
      if (state.idx >= state.queue.length) endStation();
      else loadNextItem();
    });
    return;
  }

  updateHUD();
  updateMultDisplay();
  showToast(`⏱️ För långsamt! ${state.queue[state.idx].fact}`);
  if (state.lives <= 0) { setTimeout(() => endLevel(true), 700); return; }

  slideItemOut(() => {
    state.idx++;
    state.phase = "idle";
    hideToast();
    updateHUD();
    if (state.idx >= state.queue.length) endLevel();
    else loadNextItem();
  });
}

// =====================================================
// NIVÅSLUT
// =====================================================

function endLevel(gameOver = false) {
  stopTimer();
  state.phase = "done";

  const n   = state.queue.length;
  const pct = n > 0 ? state.correct / n : 0;
  let stars, title, msg;

  if (gameOver) {
    stars = "🖤🖤🖤"; title = "Game Over";
    msg   = `Du sorterade ${state.correct} av ${n} rätt innan liven tog slut.`;
  } else if (pct >= 0.9) {
    stars = "⭐⭐⭐"; title = "Perfekt!";
    msg   = "Du sorterade allt rätt! Du är en riktig återvinningsexpert. 🌍";
    const next = LEVELS.find(l => l.id === state.level.id + 1);
    if (next) next.unlocked = true;
    renderLevelCards();
  } else if (pct >= 0.7) {
    stars = "⭐⭐"; title = "Bra jobbat!";
    msg   = `Du sorterade ${state.correct} av ${n} rätt. Läs faktatexterna och försök igen!`;
  } else {
    stars = "⭐"; title = "Fortsätt träna!";
    msg   = `Du sorterade ${state.correct} av ${n} rätt. Det finns mer att lära!`;
  }

  el.resStars.textContent = stars;
  el.resTitle.textContent = title;
  el.resScore.textContent = `${state.score} poäng`;
  el.resMsg.textContent   = msg;

  const next = LEVELS.find(l => l.id === state.level.id + 1);
  if (pct >= 0.9 && next) {
    el.resUnlock.textContent = `🔓 Nivå ${next.id} (${next.name}) är nu upplåst!`;
    el.resUnlock.classList.remove("hidden");
  } else {
    el.resUnlock.classList.add("hidden");
  }

  showScreen("result");
}

// =====================================================
// HUD
// =====================================================

function updateHUD() {
  if (state.isStationMode) {
    el.scoreVal.textContent = `${Math.round(state.quality)}%`;
    el.multBadge.classList.add("hidden");
  } else {
    el.scoreVal.textContent = state.score;
  }
  el.lives.textContent    = ["❤️","❤️","❤️"].map((_,i) => i < state.lives ? "❤️" : "🖤").join("");
  const total = state.queue.length;
  el.progVal.textContent  = `${Math.min(state.idx + 1, total)} / ${total}`;
}

function getMultiplier() {
  if (state.streak >= 5) return 2;
  if (state.streak >= 3) return 1.5;
  return 1;
}

function updateMultDisplay() {
  const m = getMultiplier();
  if (m > 1) {
    el.multBadge.textContent = `×${m}`;
    el.multBadge.classList.remove("hidden");
    el.multBadge.animate([{transform:"scale(1.6)"},{transform:"scale(1)"}],
      {duration:220, easing:"ease-out"});
  } else {
    el.multBadge.classList.add("hidden");
  }
}

// =====================================================
// ANIMATIONER
// =====================================================

/** Flyger kortet till vald knapp (klonar för att undvika layout-störning) */
function flyToBin(binBtn, onDone) {
  const card     = el.itemCard;
  const cardRect = card.getBoundingClientRect();
  const binRect  = binBtn.getBoundingClientRect();

  // Klona på fixed position
  const clone = card.cloneNode(true);
  Object.assign(clone.style, {
    position: "fixed",
    left: cardRect.left + "px", top: cardRect.top + "px",
    width: cardRect.width + "px", transform: "none",
    transition: "none", margin: "0", zIndex: "500",
  });
  document.body.appendChild(clone);
  card.style.opacity = "0";

  const dx = binRect.left + binRect.width  / 2 - cardRect.left - cardRect.width  / 2;
  const dy = binRect.top  + binRect.height / 2 - cardRect.top  - cardRect.height / 2;

  clone.animate([
    { transform: "scale(1)",                                     opacity: 1 },
    { transform: `translate(${dx}px,${dy}px) scale(0.08)`,     opacity: 0, offset: 0.82 },
    { transform: `translate(${dx}px,${dy}px) scale(0)`,        opacity: 0 },
  ], { duration: 460, easing: "cubic-bezier(0.4,0,1,0.8)", fill: "forwards" })
  .onfinish = () => { clone.remove(); onDone(); };
}

/** Partiklar som exploderar från mitten */
function spawnParticles(cx, cy, color) {
  const colors = [color, "#FFD700", "#fff", "#b8f0c4"];
  for (let i = 0; i < 14; i++) {
    const angle = (i / 14) * Math.PI * 2;
    const spd   = 55 + Math.random() * 95;
    const dx    = Math.cos(angle) * spd;
    const dy    = Math.sin(angle) * spd - 45;
    const size  = 4 + Math.random() * 7;
    const p     = document.createElement("div");
    Object.assign(p.style, {
      position: "fixed", left: cx + "px", top: cy + "px",
      width: size + "px", height: size + "px", borderRadius: "50%",
      background: colors[i % colors.length],
      pointerEvents: "none", zIndex: "999",
    });
    document.body.appendChild(p);
    p.animate([
      { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`, opacity: 0 },
    ], { duration: 480 + Math.random() * 280, easing: "ease-out", fill: "forwards" })
    .onfinish = () => p.remove();
  }
}

/** Flytande poängtext */
function showScorePop(x, y, text) {
  const pop = document.createElement("div");
  pop.textContent = text;
  Object.assign(pop.style, {
    position: "fixed", left: x + "px", top: y + "px",
    fontSize: "1.55rem", fontWeight: "800",
    color: "#FFD700", textShadow: "0 2px 8px rgba(0,0,0,0.9)",
    pointerEvents: "none", zIndex: "999",
    fontFamily: "inherit", transform: "translate(-50%, -50%)",
  });
  document.body.appendChild(pop);
  pop.animate([
    { transform: "translate(-50%,-50%) scale(0.8)", opacity: 0 },
    { transform: "translate(-50%,-120%) scale(1.15)", opacity: 1, offset: 0.18 },
    { transform: "translate(-50%,-210%) scale(1)",   opacity: 0 },
  ], { duration: 860, easing: "ease-out", fill: "forwards" })
  .onfinish = () => pop.remove();
}

/** Lätt skakrörelse på hela skärmen vid streak-milstolpe */
function screenShake() {
  document.body.animate([
    { transform: "translate(4px,-3px)" },
    { transform: "translate(-4px,2px)" },
    { transform: "translate(2px,4px)" },
    { transform: "translate(0,0)" },
  ], { duration: 200, easing: "ease" });
}

/** Blink-animation på sorteringsknapp */
function flashBtn(btn, type) {
  btn.classList.remove("anim-ok", "anim-err");
  void btn.offsetWidth;
  btn.classList.add(type === "ok" ? "anim-ok" : "anim-err");
  setTimeout(() => btn.classList.remove("anim-ok","anim-err"), 400);
}

// =====================================================
// TOAST (faktaruta)
// =====================================================

function showToast(html, type = "") {
  el.toast.innerHTML = html;
  el.toast.classList.remove("hidden", "toast-ok");
  if (type === "ok") el.toast.classList.add("toast-ok");
}
function hideToast() {
  el.toast.classList.remove("toast-ok");
  el.toast.classList.add("hidden");
}

// =====================================================
// NIVÅKORT — uppdatera låst/upplåst status
// =====================================================

function renderLevelCards() {
  document.querySelectorAll(".level-card").forEach(card => {
    const lvl = LEVELS.find(l => l.id === +card.dataset.level);
    if (lvl) card.classList.toggle("locked", !lvl.unlocked);
  });
}

// =====================================================
// HJÄLPFUNKTIONER
// =====================================================

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function catLabel(cat) {
  return { plast:"Plastförpackningar", papper:"Papper & Kartong",
           metall:"Metallförpackningar", glas:"Glasförpackningar",
           restavfall:"Restavfall" }[cat] || cat;
}

// =====================================================
// HÄNDELSELYSSNARE
// =====================================================

el.btnPlay.addEventListener("click", () => { renderLevelCards(); showScreen("levels"); });
el.btnRetry.addEventListener("click", () => {
  if (state.journey)  showJourneyInstructions(state.journey);
  else if (state.station) showStationInstructions(state.station);
  else showInstructions(state.level.id);
});
el.btnLevels.addEventListener("click", () => { renderLevelCards(); showScreen("levels"); });

document.querySelectorAll(".btn-level").forEach(btn => {
  btn.closest(".level-card").addEventListener("click", e => {
    if (e.target.classList.contains("btn-level")) {
      showInstructions(+e.currentTarget.dataset.level);
    }
  });
});
el.btnStart.addEventListener("click", () => {
  if (pendingJourney)  { startJourney(pendingJourney); return; }
  if (pendingStation)  { startStation(pendingStation); return; }
  if (!pendingLevelId) return;
  const lvl = LEVELS.find(l => l.id === pendingLevelId);
  if (lvl?.mode === "drag") startDragLevel(pendingLevelId);
  else startLevel(pendingLevelId);
});

el.sortBtns.forEach(btn => {
  btn.addEventListener("click", () => sortItem(btn.dataset.cat));
});
el.restavfallBtn.addEventListener("click", () => sortItem("restavfall"));
el.btnAccept.addEventListener("click", () => sortStation(true));
el.btnReject.addEventListener("click", () => sortStation(false));
el.btnNextStation.addEventListener("click", () => showStationSelect());
el.btnNextJourney.addEventListener("click",  () => showJourneySelect());
el.btnSldrConfirm.addEventListener("click",  () => sliderConfirm());
el.btnCsqNext.addEventListener("click",      () => showJourneyStage(state.journeyStageIdx + 1));
document.getElementById("btn-journey-back")
  .addEventListener("click", () => { renderLevelCards(); showScreen("levels"); });
el.pauseBadge.addEventListener("click", resumeGame);
el.beltTrack.addEventListener("click", resumeGame);

document.getElementById("btn-station-back")
  .addEventListener("click", () => { renderLevelCards(); showScreen("levels"); });

document.addEventListener("keydown", e => {
  if (e.key === " ") {
    e.preventDefault();
    if (state.phase === "waiting") pauseGame();
    else if (state.phase === "paused") resumeGame();
    return;
  }
  if (e.key === "Enter") return;
  if (state.isMultiSortMode && state.phase === "waiting") {
    const frac = state.multiSortKbdMap[e.key];
    if (frac) sortMulti(frac);
    return;
  }
  if (state.isStationMode && state.phase === "waiting") {
    if (e.key === "1") sortStation(true);
    if (e.key === "2") sortStation(false);
    return;
  }
  const map = { "1":"plast", "2":"papper", "3":"metall", "4":"glas" };
  if (state.level && state.level.id >= 2) map["5"] = "restavfall";
  if (map[e.key] && state.phase === "waiting") sortItem(map[e.key]);
});

// =====================================================
// DRAG-LÄGE (Nivå 2)
// =====================================================

const DRAG_BATCH = 20;
const ROTATIONS = [-2.2, 1.5, -1.8, 2.4, -0.9, 1.9, -2.6, 1.1, -1.4, 2.1, -0.7, 1.8, 2.3, -1.1, 0.8, -2.0, 1.6, -0.5, 2.8, -1.7];
let dragToastTimer = null;

function startDragLevel(levelId) {
  const lvl = LEVELS.find(l => l.id === levelId);
  if (!lvl || !lvl.unlocked) return;

  const pool = levelId === 1 ? LEVEL1_ITEMS : LEVEL2_ITEMS;
  state.level      = lvl;
  state.queue      = shuffle(pool).slice(0, lvl.itemCount);
  state.score      = 0;
  state.lives      = lvl.lives;
  state.streak     = 0;
  state.correct    = 0;
  state.phase      = "waiting";
  state.batchStart = 0;

  const hasRestavfall = pool.some(item => item.cat === "restavfall");
  document.querySelector('.dbin[data-cat="restavfall"]')
    ?.classList.toggle("hidden", !hasRestavfall);
  const hasOrganiskt = pool.some(item => item.cat === "organiskt");
  document.querySelector('.dbin[data-cat="organiskt"]')
    ?.classList.toggle("hidden", !hasOrganiskt);

  updateDragHUD();
  showScreen("drag");
  renderDragBatch();
}

function renderDragBatch() {
  const batch = state.queue.slice(state.batchStart, state.batchStart + DRAG_BATCH);
  el.dragGrid.innerHTML = "";

  batch.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "ditem";
    div.style.setProperty('--rot', `${ROTATIONS[i % ROTATIONS.length]}deg`);
    div.dataset.itemId = item.id;
    const badge = item.condition
      ? `<div class="ditem-badge cond-${item.condition.color}">${item.condition.color === "ok" ? "🟢" : "🟠"} ${item.condition.label}</div>`
      : "";
    const tipText = item.condition ? item.condition.tip : item.fact;
    div.innerHTML = `
      <div class="ditem-photo-wrap">
        <img class="ditem-photo" src="assets/items/${item.id}.png" alt="${item.name}"
             onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
        <div class="ditem-emoji-fallback" style="display:none">${item.emoji}</div>
      </div>
      <div class="ditem-name">${item.name}</div>
      ${badge}
      <div class="ditem-tip"><strong>${item.name}</strong><br>${tipText}</div>
    `;
    attachPointerDrag(div, item);
    el.dragGrid.appendChild(div);
  });
}

function updateDragHUD() {
  el.dragScore.textContent = state.score;
  el.dragLives.textContent = Array.from({ length: state.level.lives },
    (_, i) => i < state.lives ? "❤️" : "🖤").join("");
  el.dragProg.textContent = `${state.correct} / ${state.queue.length}`;
}

// ── Pointer drag ──────────────────────────────────

function attachPointerDrag(itemEl, data) {
  itemEl.addEventListener("pointerdown", e => {
    if (state.phase !== "waiting") return;
    e.preventDefault();
    itemEl.setPointerCapture(e.pointerId);

    const r    = itemEl.getBoundingClientRect();
    const offX = e.clientX - r.left;
    const offY = e.clientY - r.top;

    const clone = itemEl.cloneNode(true);
    Object.assign(clone.style, {
      position: "fixed", pointerEvents: "none", zIndex: "2000",
      left: r.left + "px", top: r.top + "px",
      width: r.width + "px", margin: "0",
      transform: "scale(1.07) rotate(3deg)",
      transformOrigin: `${offX}px ${offY}px`,
      transition: "none",
    });
    document.body.appendChild(clone);
    itemEl.classList.add("is-dragging");

    let activeBin = null;

    const onMove = ev => {
      clone.style.left = (ev.clientX - offX) + "px";
      clone.style.top  = (ev.clientY - offY) + "px";

      clone.style.visibility = "hidden";
      const under = document.elementFromPoint(ev.clientX, ev.clientY)?.closest(".dbin");
      clone.style.visibility = "";

      if (under !== activeBin) {
        activeBin?.classList.remove("drop-active");
        activeBin = under;
        activeBin?.classList.add("drop-active");
      }
    };

    const onUp = ev => {
      itemEl.removeEventListener("pointermove", onMove);
      itemEl.removeEventListener("pointerup", onUp);
      itemEl.removeEventListener("pointercancel", onUp);

      clone.style.visibility = "hidden";
      const binEl = document.elementFromPoint(ev.clientX, ev.clientY)?.closest(".dbin");
      clone.style.visibility = "";

      activeBin?.classList.remove("drop-active");
      clone.remove();

      if (binEl) processDragDrop(data, itemEl, binEl);
      else itemEl.classList.remove("is-dragging");
    };

    itemEl.addEventListener("pointermove", onMove);
    itemEl.addEventListener("pointerup", onUp);
    itemEl.addEventListener("pointercancel", onUp);
  });
}

// ── Sorteringslogik ───────────────────────────────

function processDragDrop(data, itemEl, binEl) {
  const correct = data.cat === binEl.dataset.cat;
  const mult    = getMultiplier();
  const pts     = Math.round(10 * mult);

  if (correct) {
    state.score  += pts;
    state.streak++;
    state.correct++;
    updateDragHUD();
    updateMultDisplay();
    if (state.streak === 3 || state.streak === 5 || state.streak % 5 === 0) screenShake();

    flashDbin(binEl, "ok");

    const r  = itemEl.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const catCol = { plast:"#F5A623", papper:"#4A90E2", metall:"#8E9EAB", glas:"#55B040", restavfall:"#9E9E9E" };
    spawnParticles(cx, cy, catCol[data.cat] || "#fff");
    showScorePop(cx, cy, `+${pts}${mult > 1 ? " ×" + mult : ""}`);

    showDragToast(`✅ ${data.condition ? data.condition.tip : data.fact}`, "ok");

    // Fly item to bin then remove it
    const br = binEl.getBoundingClientRect();
    const flyClone = itemEl.cloneNode(true);
    Object.assign(flyClone.style, {
      position: "fixed", pointerEvents: "none", zIndex: "1500",
      left: r.left + "px", top: r.top + "px",
      width: r.width + "px", margin: "0", transform: "none",
    });
    document.body.appendChild(flyClone);
    itemEl.style.visibility = "hidden";

    flyClone.animate([
      { transform: "scale(1)", opacity: 1 },
      { transform: `translate(${br.left + br.width/2 - r.left - r.width/2}px,
                               ${br.top  + br.height/2 - r.top  - r.height/2}px) scale(0.08)`,
        opacity: 0, offset: 0.85 },
      { transform: `translate(${br.left + br.width/2 - r.left - r.width/2}px,
                               ${br.top  + br.height/2 - r.top  - r.height/2}px) scale(0)`,
        opacity: 0 },
    ], { duration: 440, easing: "cubic-bezier(0.4,0,1,0.8)", fill: "forwards" })
    .onfinish = () => {
      flyClone.remove();
      itemEl.remove();
      const remaining = el.dragGrid.querySelectorAll(".ditem").length;
      if (remaining === 0) {
        state.batchStart += DRAG_BATCH;
        if (state.batchStart >= state.queue.length) endLevel();
        else setTimeout(renderDragBatch, 380);
      }
    };

  } else {
    state.streak = 0;
    state.lives--;
    updateDragHUD();
    updateMultDisplay();
    itemEl.classList.remove("is-dragging");

    flashDbin(binEl, "err");
    itemEl.animate([
      { transform: "translateX(0)" },
      { transform: "translateX(-10px) rotate(-2deg)" },
      { transform: "translateX(10px) rotate(2deg)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(0)" },
    ], { duration: 360, easing: "ease" });

    showDragToast(`❌ <strong>${catLabel(data.cat)}</strong> — ${data.fact}`);

    if (state.lives <= 0) setTimeout(() => endLevel(true), 800);
  }
}

function flashDbin(binEl, type) {
  binEl.classList.remove("anim-ok", "anim-err");
  void binEl.offsetWidth;
  binEl.classList.add(type === "ok" ? "anim-ok" : "anim-err");
  setTimeout(() => binEl.classList.remove("anim-ok", "anim-err"), 420);
}

function showDragToast(html, type = "") {
  el.dragToast.innerHTML = html;
  el.dragToast.classList.remove("hidden", "toast-ok");
  if (type === "ok") el.dragToast.classList.add("toast-ok");
  clearTimeout(dragToastTimer);
  dragToastTimer = setTimeout(() => el.dragToast.classList.add("hidden"), 3800);
}

// =====================================================
// BAKGRUNDSBILD — tyst fallback
// =====================================================

(function () {
  const img = new Image();
  img.onerror = () => { el.bg.style.backgroundImage = "none"; };
  img.src = "assets/bg.png";
})();
