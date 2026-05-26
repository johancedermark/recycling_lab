// Generates labeled product images for the Level 3 process screen — Glass, Metal, Paper
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const env     = readFileSync(join(dirname(fileURLToPath(import.meta.url)), ".env"), "utf8");
const API_KEY = env.match(/OPENAI_API_KEY=(.+)/)?.[1]?.trim();
const ASSETS  = join(dirname(fileURLToPath(import.meta.url)), "game/assets");

const IMAGES = [
  // ── GLAS — Ofärgat (clear glass) ───────────────────────────────────────────
  { out: `${ASSETS}/proc_glas_of_a.jpg`,
    prompt: "Clear glass pharmacy medicine bottle with white label reading 'Apoteksglas — Ofärgat', amber stopper, product photography, pure white background, photorealistic, no shadows" },
  { out: `${ASSETS}/proc_glas_of_b.jpg`,
    prompt: "Clear glass preserving jar with metal lid, label reading 'Konservglas — Ofärgat', fruit jam visible inside, product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_glas_of_c.jpg`,
    prompt: "Chunk of white glass wool insulation material with visible fibres, small tag reading 'Glasull — återvunnet', product photography, pure white background, photorealistic" },

  // ── GLAS — Grönt ────────────────────────────────────────────────────────────
  { out: `${ASSETS}/proc_glas_gr_a.jpg`,
    prompt: "Dark green glass wine bottle, Bordeaux shape, label reading 'Vinflaska — Grönt glas', product photography, pure white background, photorealistic, no shadows" },
  { out: `${ASSETS}/proc_glas_gr_b.jpg`,
    prompt: "Dark green glass beer bottle with crown cap, label reading 'Ölflaska — Grönt glas ♻', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_glas_gr_c.jpg`,
    prompt: "Elegant green glass decorative vase with slightly wavy surface, tag reading 'Dekorationsvas — Återvunnet grönt glas', product photography, pure white background, photorealistic" },

  // ── GLAS — Brunt ────────────────────────────────────────────────────────────
  { out: `${ASSETS}/proc_glas_br_a.jpg`,
    prompt: "Dark amber brown pharmaceutical glass bottle with dropper cap, label reading 'Läkemedelsflaska — Brunt glas', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_glas_br_b.jpg`,
    prompt: "Brown amber glass craft beer bottle with swing-top cap, label reading 'Craftöl — Brunt glas ♻', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_glas_br_c.jpg`,
    prompt: "Brown amber glass sauce bottle with metal cap, label reading 'Såsflaska — Brunt glas', soy sauce style, product photography, pure white background, photorealistic" },

  // ── METALL — Aluminium ──────────────────────────────────────────────────────
  { out: `${ASSETS}/proc_metall_al_a.jpg`,
    prompt: "Shiny aluminium beverage can, silver with bold text 'Dryckburk — Återvunnet Al', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_metall_al_b.jpg`,
    prompt: "Silver aluminium extrusion construction profile, T-shape cross section, label plate reading 'Byggprofil — Al 6xxx', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_metall_al_c.jpg`,
    prompt: "Rough cast aluminium ingot block, silver-grey, stamped text 'Gjutaluminium — Återvunnet', product photography, pure white background, photorealistic" },

  // ── METALL — Stål ──────────────────────────────────────────────────────────
  { out: `${ASSETS}/proc_metall_stal_a.jpg`,
    prompt: "Steel structural H-beam profile, grey, label reading 'Konstruktionsstål — S355', industrial product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_metall_stal_b.jpg`,
    prompt: "Bundle of steel reinforcement rebar bars tied together, label reading 'Armeringsjärn — Återvunnet stål', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_metall_stal_c.jpg`,
    prompt: "Dark grey cast iron machine component block, rough surface texture, stamped 'Gjutjärn', product photography, pure white background, photorealistic" },

  // ── METALL — Koppar ────────────────────────────────────────────────────────
  { out: `${ASSETS}/proc_metall_kop_a.jpg`,
    prompt: "Coil of orange-red copper electrical cable on white spool, label reading 'Elkabel — Återvunnet Cu', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_metall_kop_b.jpg`,
    prompt: "Short section of shiny copper pipe with fittings, orange-red colour, label reading 'Kopparrör — VVS', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_metall_kop_c.jpg`,
    prompt: "Small golden brass alloy ingot block, slightly yellowish tone, label reading 'Mässingslegering — Cu+Zn', product photography, pure white background, photorealistic" },

  // ── PAPPER — Tidning (newspaper) ───────────────────────────────────────────
  { out: `${ASSETS}/proc_papp_tid_a.jpg`,
    prompt: "Stack of freshly printed newspapers on white surface, sharp text on top page reading 'Tryckeripapper — återvunnen fiber', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_papp_tid_b.jpg`,
    prompt: "Folded newspaper with visible headlines, label reading 'Ny tidning — Återvunnet papper ♻', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_papp_tid_c.jpg`,
    prompt: "Roll of white toilet paper on holder, label band reading 'Toalettpapper — återvunna fibrer', product photography, pure white background, photorealistic" },

  // ── PAPPER — Kartong ───────────────────────────────────────────────────────
  { out: `${ASSETS}/proc_papp_kart_a.jpg`,
    prompt: "Flat-lay of folded brown cardboard packaging box blank with print marks, label 'Förpackningskartong — återvunnen fiber', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_papp_kart_b.jpg`,
    prompt: "Section of corrugated cardboard showing honeycomb flute structure cross section, label reading 'Wellpapp — återvunnet material ♻', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_papp_kart_c.jpg`,
    prompt: "Grey moulded paper egg carton holding 6 eggs, label 'Äggkartong — återvunna fibrer', product photography, pure white background, photorealistic" },

  // ── PAPPER — Dryck / Tetra Pak ─────────────────────────────────────────────
  { out: `${ASSETS}/proc_papp_dryck_a.jpg`,
    prompt: "Roll of kitchen paper towels, white, wrapper label reading 'Hygienpapper — Tetra Pak-fiber', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_papp_dryck_b.jpg`,
    prompt: "Stack of white paper napkins fanned out, label reading 'Servetter — återvunna Tetra Pak-fibrer ♻', product photography, pure white background, photorealistic" },
  { out: `${ASSETS}/proc_papp_dryck_c.jpg`,
    prompt: "Grey moulded paper egg carton, 6-cell, label tag reading 'Äggkartong — Tetra Pak-fiber', product photography, pure white background, photorealistic" },
];

async function generate(img) {
  console.log(`  Generating: ${img.out.split("/").pop()} ...`);
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: "gpt-image-1", prompt: img.prompt,
      n: 1, size: "1024x1024", output_format: "jpeg", quality: "medium",
    }),
  });
  if (!res.ok) throw new Error(`${img.out.split("/").pop()}: ${await res.text()}`);
  const buf = Buffer.from((await res.json()).data[0].b64_json, "base64");
  writeFileSync(img.out, buf);
  console.log(`    ✓ ${img.out.split("/").pop()} (${Math.round(buf.length / 1024)} KB)`);
}

async function runBatches(images, concurrency = 3) {
  for (let i = 0; i < images.length; i += concurrency)
    await Promise.all(images.slice(i, i + concurrency).map(generate));
}

console.log(`Generating ${IMAGES.length} Level 3 product images (glas, metall, papper)...\n`);
runBatches(IMAGES).then(() => console.log("\nDone!")).catch(e => { console.error(e); process.exit(1); });
