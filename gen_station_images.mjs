// Generates item + side-panel images for plastic and metal stations
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const API_KEY = process.env.OPENAI_API_KEY;
const BASE   = dirname(fileURLToPath(import.meta.url));
const ITEMS  = join(BASE, "game/assets/items");
const PANELS = join(BASE, "game/assets");

const IMAGES = [
  // ── SIDOPANELER ──────────────────────────────────────────────────────────
  { out: `${PANELS}/plast_incoming.jpg`,
    prompt: "Mixed plastic packaging waste on industrial recycling sorting conveyor belt, colourful plastic bottles PET HDPE PP bags and containers, realistic facility photo, overhead view" },
  { out: `${PANELS}/plast_outgoing.jpg`,
    prompt: "Three large compressed bales of sorted plastic: clear transparent PET bale, white PE bale, and coloured PP bale stacked in industrial warehouse, realistic photo" },
  { out: `${PANELS}/metall_incoming.jpg`,
    prompt: "Mixed metal scrap on industrial sorting conveyor belt at recycling facility, aluminium cans steel cans and various metal objects, realistic industrial photo" },
  { out: `${PANELS}/metall_outgoing.jpg`,
    prompt: "Three sorted metal piles at recycling facility: silver aluminium can bale, dark steel can bale, reddish copper scrap pile, realistic industrial photo" },

  // ── PLAST — PET ♳ ────────────────────────────────────────────────────────
  { out: `${ITEMS}/sp2_pet_vatten.jpg`,
    prompt: "Clear empty PET plastic water bottle, transparent, no label, professional product photography, pure white background" },
  { out: `${ITEMS}/sp2_pet_lask.jpg`,
    prompt: "Clear empty PET carbonated drink bottle, transparent plastic, no label, squeezed slightly, professional product photography, white background" },
  { out: `${ITEMS}/sp2_pet_juice.jpg`,
    prompt: "Clear empty PET juice bottle, slightly wide shape, transparent plastic, no label, professional product photography, white background" },
  { out: `${ITEMS}/sp2_pet_olja.jpg`,
    prompt: "Clear empty PET cooking oil bottle, tall and narrow, transparent plastic with slight yellow tint, no label, product photography, white background" },

  // ── PLAST — PE ♴♶ ───────────────────────────────────────────────────────
  { out: `${ITEMS}/sp2_pe_shampo.jpg`,
    prompt: "White empty HDPE shampoo bottle with pump dispenser, opaque white plastic, no label, product photography, white background" },
  { out: `${ITEMS}/sp2_pe_rengoring.jpg`,
    prompt: "White empty HDPE cleaning spray bottle with trigger sprayer, opaque plastic, no label, product photography, white background" },
  { out: `${ITEMS}/sp2_pe_pase.jpg`,
    prompt: "A knot-tied bundle of crumpled LDPE plastic shopping bags gathered together, product photography, white background" },
  { out: `${ITEMS}/sp2_pe_mjolkflaska.jpg`,
    prompt: "White empty HDPE milk jug with handle, one-litre, opaque white plastic, no label, product photography, white background" },

  // ── PLAST — PP ♷ ────────────────────────────────────────────────────────
  { out: `${ITEMS}/sp2_pp_yoghurt.jpg`,
    prompt: "Empty white PP plastic yogurt pot with foil lid partially peeled, product photography, white background" },
  { out: `${ITEMS}/sp2_pp_margarin.jpg`,
    prompt: "Round empty PP margarine tub, white plastic, no lid, product photography, white background" },
  { out: `${ITEMS}/sp2_pp_lock.jpg`,
    prompt: "Small round white PP plastic snap-on lid, product photography, white background, single item" },
  { out: `${ITEMS}/sp2_pp_mat.jpg`,
    prompt: "Rectangular empty PP food storage container, semi-transparent grey plastic, no lid, product photography, white background" },

  // ── PLAST — FK ───────────────────────────────────────────────────────────
  { out: `${ITEMS}/sp2_fk_pvc.jpg`,
    prompt: "Rigid PVC plastic bottle, slightly amber/yellowish tint, stiff plastic, product photography, white background, clearly plastic bottle" },
  { out: `${ITEMS}/sp2_fk_svart.jpg`,
    prompt: "Black matte plastic food tray or container, completely black opaque plastic, product photography, white background" },
  { out: `${ITEMS}/sp2_fk_ps.jpg`,
    prompt: "White EPS expanded polystyrene foam food container or cup, lightweight foam material, product photography, white background" },
  { out: `${ITEMS}/sp2_fk_laminat.jpg`,
    prompt: "Multi-layer composite food packaging pouch with aluminium foil lining visible at torn edge, product photography, white background" },

  // ── METALL — ALUMINIUM ───────────────────────────────────────────────────
  { out: `${ITEMS}/sm2_alu_burk.jpg`,
    prompt: "Empty aluminium soda can, silver metallic, slightly dented, product photography, white background" },
  { out: `${ITEMS}/sm2_alu_folie.jpg`,
    prompt: "Crumpled ball of aluminium kitchen foil, shiny silver metallic sphere, product photography, white background" },
  { out: `${ITEMS}/sm2_alu_tub.jpg`,
    prompt: "Empty rolled-up aluminium toothpaste or cream tube, flat at one end, product photography, white background" },
  { out: `${ITEMS}/sm2_alu_lock.jpg`,
    prompt: "Round silver aluminium lid from a food jar, flat metallic disc, product photography, white background" },

  // ── METALL — STÅL ────────────────────────────────────────────────────────
  { out: `${ITEMS}/sm2_stal_konserv.jpg`,
    prompt: "Empty steel food tin can with ridged sides, silver steel metal, no label, product photography, white background" },
  { out: `${ITEMS}/sm2_stal_spray.jpg`,
    prompt: "Empty steel aerosol spray can, silver cylindrical metal can, no label, product photography, white background" },
  { out: `${ITEMS}/sm2_stal_lock.jpg`,
    prompt: "Round steel metal screw-top lid from a glass jar, metallic lid, product photography, white background" },
  { out: `${ITEMS}/sm2_stal_plat.jpg`,
    prompt: "Cylindrical steel tin canister like for cocoa powder or biscuits, empty, silver metallic, product photography, white background" },

  // ── METALL — BLANDMETALL ─────────────────────────────────────────────────
  { out: `${ITEMS}/sm2_bland_koppar.jpg`,
    prompt: "Short copper pipe fragment or fitting, reddish-orange metallic copper colour, product photography, white background" },
  { out: `${ITEMS}/sm2_bland_massing.jpg`,
    prompt: "Brass bolt and nut, gold-yellow coloured metal hardware, product photography, white background" },

  // ── METALL — FK ──────────────────────────────────────────────────────────
  { out: `${ITEMS}/sm2_fk_batteri.jpg`,
    prompt: "Single AA alkaline battery standing upright, product photography, white background" },
  { out: `${ITEMS}/sm2_fk_litium.jpg`,
    prompt: "Small round silver lithium button cell battery, CR2032 type, product photography, white background" },
  { out: `${ITEMS}/sm2_fk_elektronik.jpg`,
    prompt: "Fragment of green PCB circuit board with small electronic components and solder joints, product photography, white background" },
];

async function generate(img) {
  console.log(`  Generating: ${img.out.split("/").pop()} ...`);
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type":"application/json", "Authorization":`Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: img.prompt,
      n: 1,
      size: "1024x1024",
      output_format: "jpeg",
      quality: "medium",
    }),
  });
  if (!res.ok) throw new Error(`${img.out}: ${await res.text()}`);
  const data = await res.json();
  const buf  = Buffer.from(data.data[0].b64_json, "base64");
  writeFileSync(img.out, buf);
  console.log(`    ✓ ${img.out.split("/").pop()} (${Math.round(buf.length/1024)} KB)`);
}

async function runBatches(images, concurrency = 3) {
  for (let i = 0; i < images.length; i += concurrency) {
    await Promise.all(images.slice(i, i + concurrency).map(generate));
  }
}

console.log(`Generating ${IMAGES.length} images...\n`);
runBatches(IMAGES).then(() => console.log("\nDone!")).catch(e => { console.error(e); process.exit(1); });
