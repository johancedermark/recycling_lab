// Generates labeled product images for the plastic process screen (Level 3)
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const env     = readFileSync(join(dirname(fileURLToPath(import.meta.url)), ".env"), "utf8");
const API_KEY = env.match(/OPENAI_API_KEY=(.+)/)?.[1]?.trim();
const ASSETS  = join(dirname(fileURLToPath(import.meta.url)), "game/assets");

const IMAGES = [
  // ── PET ──────────────────────────────────────────────────────────────────
  { out: `${ASSETS}/proc_pet_a.jpg`,
    prompt: "Clear transparent PET plastic water bottle with bold 'PET ♳' text printed on white label, product photography, white background, photorealistic" },
  { out: `${ASSETS}/proc_pet_b.jpg`,
    prompt: "Bright blue recycled polyester fleece jacket neatly folded with prominent hang tag showing 'Tillverkad av PET ♳ återvunnen plast', product photography, white background, photorealistic" },
  { out: `${ASSETS}/proc_pet_c.jpg`,
    prompt: "Industrial brown PET plastic strapping packaging band coiled into neat circle, with 'PET ♳' printed on the band surface, product photography, white background, photorealistic" },

  // ── PE ───────────────────────────────────────────────────────────────────
  { out: `${ASSETS}/proc_pe_a.jpg`,
    prompt: "White HDPE plastic milk jug with handle, bold 'HDPE ♴' recycling symbol clearly printed on the jug, product photography, white background, photorealistic" },
  { out: `${ASSETS}/proc_pe_b.jpg`,
    prompt: "Stack of three grey PE plastic storage crates, 'PE ♴' symbol embossed on the side panel, product photography, white background, photorealistic" },
  { out: `${ASSETS}/proc_pe_c.jpg`,
    prompt: "Black HDPE corrugated drainage pipe cross-section showing interior ribs, 'HDPE PE ♴' stamp on outer surface, product photography, white background, photorealistic" },

  // ── PP ───────────────────────────────────────────────────────────────────
  { out: `${ASSETS}/proc_pp_a.jpg`,
    prompt: "Stack of clear and white polypropylene food containers and yogurt pots, 'PP ♷' recycling code embossed on bottom visible on front pot, product photography, white background, photorealistic" },
  { out: `${ASSETS}/proc_pp_b.jpg`,
    prompt: "Set of terracotta-coloured PP polypropylene plant pots different sizes nested, 'PP ♷' marking on rim, product photography, white background, photorealistic" },
  { out: `${ASSETS}/proc_pp_c.jpg`,
    prompt: "Grey polypropylene acoustic noise barrier panel section, modern industrial design, 'PP' material marking plate on surface, realistic product photo, white background" },
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

console.log(`Generating ${IMAGES.length} labeled product images...\n`);
runBatches(IMAGES).then(() => console.log("\nDone!")).catch(e => { console.error(e); process.exit(1); });
