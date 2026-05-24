// Generates item + side-panel images for the paper sorting station
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const env     = readFileSync(join(dirname(fileURLToPath(import.meta.url)), ".env"), "utf8");
const API_KEY = env.match(/OPENAI_API_KEY=(.+)/)?.[1]?.trim();
const BASE    = dirname(fileURLToPath(import.meta.url));
const ITEMS   = join(BASE, "game/assets/items");
const PANELS  = join(BASE, "game/assets");

const IMAGES = [
  // ── SIDOPANELER ──────────────────────────────────────────────────────────
  { out: `${PANELS}/papper_incoming.jpg`,
    prompt: "Mixed paper waste on industrial sorting conveyor belt at recycling facility, newspapers cardboard boxes milk cartons and paper bags, realistic overhead photo" },
  { out: `${PANELS}/papper_outgoing.jpg`,
    prompt: "Three sorted paper bales at recycling facility: compressed newspaper bale, brown cardboard bale, and colourful Tetra Pak carton bale stacked in warehouse, realistic industrial photo" },

  // ── TIDNINGAR / MJUKPAPPER ───────────────────────────────────────────────
  { out: `${ITEMS}/sk2_tidn_dagstidning.jpg`,
    prompt: "Stack of rolled newspapers, printed newsprint paper, product photography, white background" },
  { out: `${ITEMS}/sk2_tidn_reklam.jpg`,
    prompt: "A printed advertising catalogue or brochure folded, glossy paper magazine, product photography, white background" },
  { out: `${ITEMS}/sk2_tidn_kuvert.jpg`,
    prompt: "Plain white paper envelope, no plastic window, product photography, white background" },
  { out: `${ITEMS}/sk2_tidn_kontorspapper.jpg`,
    prompt: "Small stack of white A4 office paper sheets, product photography, white background" },

  // ── KARTONG / WELLPAPP ───────────────────────────────────────────────────
  { out: `${ITEMS}/sk2_kart_wellpapp.jpg`,
    prompt: "Flat folded corrugated cardboard box, brown cardboard, product photography, white background" },
  { out: `${ITEMS}/sk2_kart_flingpaket.jpg`,
    prompt: "Empty cereal or food cardboard box folded flat, printed paperboard packaging, product photography, white background" },
  { out: `${ITEMS}/sk2_kart_skobox.jpg`,
    prompt: "Empty plain brown shoe box with lid, cardboard box, product photography, white background" },
  { out: `${ITEMS}/sk2_kart_pappers_pase.jpg`,
    prompt: "Brown paper shopping bag with handles, flat, product photography, white background" },

  // ── DRYCKESFÖRPACKNINGAR ─────────────────────────────────────────────────
  { out: `${ITEMS}/sk2_dryck_mjolk.jpg`,
    prompt: "Empty Tetra Pak milk carton, flat folded, white and red printed liquid carton packaging, product photography, white background" },
  { out: `${ITEMS}/sk2_dryck_juice.jpg`,
    prompt: "Empty Tetra Pak juice carton, small brick shape, colourful printed liquid carton, product photography, white background" },
  { out: `${ITEMS}/sk2_dryck_sopp.jpg`,
    prompt: "Empty Tetra Pak soup or broth carton, tall slim shape, printed liquid carton packaging, product photography, white background" },
  { out: `${ITEMS}/sk2_dryck_matlagning.jpg`,
    prompt: "Empty Tetra Pak cooking cream or crème fraiche small carton, printed liquid packaging, product photography, white background" },

  // ── FK / AVVISA ──────────────────────────────────────────────────────────
  { out: `${ITEMS}/sk2_fk_pizza.jpg`,
    prompt: "Cardboard pizza box with visible greasy oil stains on inside surface, slightly open lid, product photography, white background" },
  { out: `${ITEMS}/sk2_fk_smor.jpg`,
    prompt: "Crumpled piece of wax-coated baking paper or butter wrapper, translucent greasy paper, product photography, white background" },
  { out: `${ITEMS}/sk2_fk_mugg.jpg`,
    prompt: "Disposable paper coffee cup with plastic lid, single use cup with plastic coating inside, product photography, white background" },
  { out: `${ITEMS}/sk2_fk_blott.jpg`,
    prompt: "Wet soggy crumpled newspaper or paper, damp and starting to fall apart, product photography, white background" },
];

async function generate(img) {
  console.log(`  Generating: ${img.out.split("/").pop()} ...`);
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type":"application/json", "Authorization":`Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: "gpt-image-1", prompt: img.prompt,
      n: 1, size: "1024x1024", output_format: "jpeg", quality: "medium",
    }),
  });
  if (!res.ok) throw new Error(`${img.out.split("/").pop()}: ${await res.text()}`);
  const buf = Buffer.from((await res.json()).data[0].b64_json, "base64");
  writeFileSync(img.out, buf);
  console.log(`    ✓ ${img.out.split("/").pop()} (${Math.round(buf.length/1024)} KB)`);
}

async function runBatches(images, concurrency = 3) {
  for (let i = 0; i < images.length; i += concurrency)
    await Promise.all(images.slice(i, i + concurrency).map(generate));
}

console.log(`Generating ${IMAGES.length} images...\n`);
runBatches(IMAGES).then(() => console.log("\nDone!")).catch(e => { console.error(e); process.exit(1); });
