"use strict";

// =====================================================
// KONFIGURATION — NIVÅER
// =====================================================

const LEVELS = [
  {
    id: 1, name: "Hemma", icon: "🏠",
    mode: "drag",
    itemCount: 12, lives: 3,
    unlocked: true,
  },
  {
    id: 2, name: "Sorteringsbandet", icon: "🏭",
    mode: "belt",
    itemCount: 10, lives: 3,
    timePerItem: 9000,
    slideIn: 680,
    beltSpd: "0.44s",
    unlocked: true, // DEV
  },
  {
    id: 3, name: "Materialresan", icon: "🔬",
    mode: "belt",
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
};

// =====================================================
// DOM-REFERENSER
// =====================================================

const $ = id => document.getElementById(id);
const el = {
  bg:           $("bg"),
  startScr:     $("start-screen"),
  levelScr:     $("level-screen"),
  gameScr:      $("game-screen"),
  resultScr:    $("result-screen"),
  lives:        $("lives"),
  scoreVal:     $("score-val"),
  multBadge:    $("mult-badge"),
  progVal:      $("prog-val"),
  beltTrack:    $("belt-track"),
  itemCard:     $("item-card"),
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
  sortBtns:     document.querySelectorAll(".sbtn"),
  resStars:     $("res-stars"),
  resTitle:     $("res-title"),
  resScore:     $("res-score"),
  resMsg:       $("res-msg"),
  resUnlock:    $("res-unlock"),
  instructionScr: $("instruction-screen"),
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
  [el.startScr, el.levelScr, el.instructionScr, el.gameScr, el.dragScr, el.resultScr]
    .forEach(s => s.classList.add("hidden"));
  if (name === "start")       el.startScr.classList.remove("hidden");
  if (name === "levels")      el.levelScr.classList.remove("hidden");
  if (name === "instruction") el.instructionScr.classList.remove("hidden");
  if (name === "game")        el.gameScr.classList.remove("hidden");
  if (name === "drag")        el.dragScr.classList.remove("hidden");
  if (name === "result")      el.resultScr.classList.remove("hidden");
}

// =====================================================
// INSTRUKTIONER & SPELSTART
// =====================================================

let pendingLevelId = null;

function showInstructions(levelId) {
  const lvl  = LEVELS.find(l => l.id === levelId);
  if (!lvl || !lvl.unlocked) return;
  pendingLevelId = levelId;

  el.instIcon.textContent  = lvl.icon;
  el.instTitle.textContent = lvl.name;

  const rows = LEVEL_INSTRUCTIONS[levelId]?.items ?? [];
  el.instList.innerHTML = rows.map(r => `<li>${r}</li>`).join("");

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
// FÖREMÅLSHANTERING
// =====================================================

function loadNextItem() {
  if (state.idx >= state.queue.length) { endLevel(); return; }

  const item = state.queue[state.idx];
  el.icEmoji.textContent = item.emoji;
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

  slideItemIn();
}

function slideItemIn() {
  const card = el.itemCard;
  const dur  = state.level.slideIn;

  // Off-screen right — no transition
  card.style.transition = "none";
  card.style.opacity    = "0";
  card.style.transform  = "translate(calc(-50% + 380px), -50%) rotate(6deg)";
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
  card.style.transition = "transform 0.38s ease-in, opacity 0.3s ease";
  card.style.transform  = "translate(calc(-50% - 380px), -50%) rotate(-6deg)";
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
  el.scoreVal.textContent = state.score;
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
el.btnRetry.addEventListener("click",  () => showInstructions(state.level.id));
el.btnLevels.addEventListener("click", () => { renderLevelCards(); showScreen("levels"); });

document.querySelectorAll(".btn-level").forEach(btn => {
  btn.closest(".level-card").addEventListener("click", e => {
    if (e.target.classList.contains("btn-level")) {
      showInstructions(+e.currentTarget.dataset.level);
    }
  });
});
el.btnStart.addEventListener("click", () => {
  if (!pendingLevelId) return;
  const lvl = LEVELS.find(l => l.id === pendingLevelId);
  if (lvl?.mode === "drag") startDragLevel(pendingLevelId);
  else startLevel(pendingLevelId);
});

el.sortBtns.forEach(btn => {
  btn.addEventListener("click", () => sortItem(btn.dataset.cat));
});
el.restavfallBtn.addEventListener("click", () => sortItem("restavfall"));
el.pauseBadge.addEventListener("click", resumeGame);
el.beltTrack.addEventListener("click", resumeGame);

document.addEventListener("keydown", e => {
  if (e.key === " ") {
    e.preventDefault();
    if (state.phase === "waiting") pauseGame();
    else if (state.phase === "paused") resumeGame();
    return;
  }
  if (e.key === "Enter") return;
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
