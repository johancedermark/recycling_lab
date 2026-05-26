// Generates product images for all glass station items via gpt-image-1
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const API_KEY = "OPENAI_KEY_REMOVED";
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "game/assets/items");

const ITEMS = [
  { id: "sg_klar_vin",    prompt: "Clear glass wine bottle, empty, no label, professional product photography, pure white background, studio lighting, transparent glass showing bottle shape" },
  { id: "sg_klar_parfym", prompt: "Clear glass perfume bottle, elegant shape, empty, no label, professional product photography, white background, studio lighting, transparent glass" },
  { id: "sg_klar_lak",    prompt: "Small clear glass pharmacy medicine bottle with dropper neck, empty, no label, professional product photography, white background, transparent glass" },
  { id: "sg_klar_konserv",prompt: "Clear glass food preservation jar with silver metal screw lid, empty, no label, professional product photography, white background" },
  { id: "sg_klar_sauce",  prompt: "Clear glass sauce bottle with narrow neck, empty, no label, professional product photography, white background, transparent glass" },
  { id: "sg_gron_vin",    prompt: "Dark green glass wine bottle, empty, no label, professional product photography, white background, studio lighting, classic Bordeaux bottle shape" },
  { id: "sg_gron_ol",     prompt: "Green glass beer bottle, empty, no label, no cap, professional product photography, white background, studio lighting" },
  { id: "sg_gron_mineral",prompt: "Green glass mineral water bottle, empty, no label, professional product photography, white background, studio lighting" },
  { id: "sg_gron_burk",   prompt: "Green glass jar, wide mouth, empty, no lid, no label, professional product photography, white background, studio lighting" },
  { id: "sg_brun_ol",     prompt: "Brown amber glass beer bottle, empty, no label, no cap, professional product photography, white background, studio lighting" },
  { id: "sg_brun_med",    prompt: "Brown amber glass pharmaceutical medicine bottle, small, empty, no label, professional product photography, white background, studio lighting" },
  { id: "sg_brun_sauce",  prompt: "Brown glass sauce or Worcester bottle, empty, no label, professional product photography, white background, studio lighting" },
  { id: "sg_fk_keramik",  prompt: "A single broken ceramic shard or pottery fragment, rough uneven edges, isolated on pure white background, close-up product photography, studio lighting" },
  { id: "sg_fk_porslin",  prompt: "A single broken white porcelain shard, smooth surface, irregular broken edges, isolated on pure white background, close-up product photography" },
  { id: "sg_fk_fonster",  prompt: "A fragment of flat clear window glass, float glass piece with irregular broken edges, slightly reflective, isolated on white background, close-up photography" },
];

async function generateImage(item) {
  console.log(`Generating: ${item.id} ...`);
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: item.prompt,
      n: 1,
      size: "1024x1024",
      output_format: "jpeg",
      quality: "medium",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error for ${item.id}: ${err}`);
  }

  const data = await res.json();
  const b64 = data.data[0].b64_json;
  const buf = Buffer.from(b64, "base64");
  const outPath = join(OUT_DIR, `${item.id}.jpg`);
  writeFileSync(outPath, buf);
  console.log(`  ✓ Saved ${item.id}.jpg (${Math.round(buf.length / 1024)} KB)`);
}

// Run 3 at a time to avoid rate limits
async function runBatch(items, concurrency = 3) {
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    await Promise.all(batch.map(generateImage));
  }
}

runBatch(ITEMS).then(() => {
  console.log("\nAll done!");
}).catch(e => {
  console.error(e);
  process.exit(1);
});
