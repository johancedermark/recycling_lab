// Generates pedagogical molecular/crystal structure images for the L3 chemistry panel
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const env     = readFileSync(join(dirname(fileURLToPath(import.meta.url)), ".env"), "utf8");
const API_KEY = env.match(/OPENAI_API_KEY=(.+)/)?.[1]?.trim();
const ASSETS  = join(dirname(fileURLToPath(import.meta.url)), "game/assets");

const IMAGES = [
  // ── PLAST ──────────────────────────────────────────────────────────────────
  { out: `${ASSETS}/mol_pet.jpg`, prompt:
    "Clean educational chemistry diagram on pure white background. Shows one PET (polyethylene terephthalate) repeat unit as a 2D structural formula. The two ester linkages C(=O)-O are drawn in bold red and labeled 'Esterbindning – hydrolyseras vid >90°C' with a red warning arrow. The central benzene ring is drawn as a regular hexagon labeled 'Bensenring'. The ethylene glycol part -CH2-CH2- is labeled in grey. A bracket with subscript n shows it repeats. Below: text 'Kristallinitet: 30-40%'. Style: precise textbook chemistry, black ink on white, colored highlights only on the ester groups, clean sans-serif labels, no decorative elements." },

  { out: `${ASSETS}/mol_pe.jpg`, prompt:
    "Clean educational chemistry diagram on pure white background. Shows a side-by-side comparison of two polyethylene (HDPE) chain regions. LEFT side: tightly packed parallel zigzag carbon chains labeled 'Kristallin region – stark, tät' with blue shading. RIGHT side: tangled random chains labeled 'Amorf region – flexibel'. Carbon atoms shown as grey circles, hydrogen as white circles, bonds as lines. An arrow between the two regions. Below: 'HDPE kristallinitet: 70-90%'. Style: educational textbook illustration, clean, two-tone blue-grey color scheme, sans-serif labels." },

  { out: `${ASSETS}/mol_pp.jpg`, prompt:
    "Clean educational chemistry diagram on pure white background. Shows an isotactic polypropylene chain segment, 6-8 repeat units. The carbon backbone is drawn as a zigzag. Every other carbon has a CH3 methyl side group – ALL on the SAME side of the chain (isotactic), shown in orange. One methyl-bearing carbon is circled and labeled 'Tertiärt kol – oxidationskänsligt vid >270°C' with an orange warning arrow. The regular side-group arrangement is labeled 'Isotaktisk ordning → kristallinitet'. Below: 'Tm: 165°C'. Style: educational textbook, black backbone, orange methyl groups, clean sans-serif labels." },

  // ── GLAS ───────────────────────────────────────────────────────────────────
  { out: `${ASSETS}/mol_glas_of.jpg`, prompt:
    "Clean educational chemistry diagram on pure white background. Shows a 2D cross-section of amorphous silica glass network. Silicon atoms shown as small blue circles labeled 'Si', oxygen atoms as larger red circles labeled 'O'. Si-O-Si bonds drawn as lines forming an irregular network of connected tetrahedra – no repeating pattern, deliberately random arrangement. Compare to a small inset in corner showing a regular crystal lattice labeled 'Kristall (ej glas)'. Main structure labeled 'Amorft nätverk – oregelbunden struktur = transparent'. A light ray arrow passes through labeled 'Ljus passerar fritt'. Style: educational chemistry textbook, blue-red atom color scheme, white background." },

  { out: `${ASSETS}/mol_glas_gr.jpg`, prompt:
    "Clean educational chemistry diagram on pure white background. Shows a simplified SiO4 glass network (same as silica glass) with two Cr3+ chromium ions inserted at network modifier positions, shown as larger green circles labeled 'Cr³⁺ (krom)'. Colored light spectrum bar below: red and orange wavelengths have a red X mark labeled 'Absorberas av Cr³⁺', green wavelength has a green check mark labeled 'Passerar → grön färg'. Above: 'Grönt glas: Fe²⁺ + Cr³⁺'. Style: educational chemistry infographic, green accent color for chromium, white background, clean sans-serif." },

  { out: `${ASSETS}/mol_glas_br.jpg`, prompt:
    "Clean educational chemistry diagram on pure white background. Shows a simplified SiO4 glass network with an Fe2+-S2- chromophore complex highlighted in amber/orange. The Fe and S atoms are shown as a pair labeled 'Fe²⁺–S²⁻ komplex (amber-kromofor)'. A UV light spectrum diagram below: ultraviolet wavelengths (below 450nm) are blocked with a red stop symbol labeled 'UV blockeras >99%', visible light passes labeled 'Synligt ljus passerar'. An amber/brown color swatch labeled 'Bärnglas'. Above: 'Reducerande ugnsatmosfär krävs för Fe²⁺'. Style: educational chemistry infographic, amber accent color, white background." },

  // ── METALL ─────────────────────────────────────────────────────────────────
  { out: `${ASSETS}/mol_al.jpg`, prompt:
    "Clean educational 3D crystal structure diagram on pure white background. Shows the FCC (face-centered cubic) unit cell of aluminum. Silver-grey spheres at each corner and face center, connected by thin lines. Key features labeled: 'FCC-enhetscell' (the cell), 'Glidplan {111}' with an arrow showing a diagonal slip plane highlighted in blue, labeled 'Hög formbarhet – atomer glider lätt'. A separate small inset shows a thin Al2O3 oxide layer labeled 'Al₂O₃-skikt – självläkande korrosionsskydd'. Bold text below: '95% energibesparing vs ny aluminium'. Style: clean 3D technical illustration, silver atoms, blue slip plane highlight, white background." },

  { out: `${ASSETS}/mol_stal.jpg`, prompt:
    "Clean educational crystal structure diagram on pure white background. LEFT half: BCC (body-centered cubic) unit cell, dark grey iron atoms, one atom in center, labeled 'BCC – Ferrit (rumstemperatur)' with a small carbon atom labeled 'C interstitiellt' squeezed between lattice positions, labeled 'Låg C-löslighet'. RIGHT half: FCC unit cell, same iron atoms but different arrangement, labeled 'FCC – Austenit (>912°C)' with larger carbon atoms fitting in octahedral holes, labeled 'Hög C-löslighet'. A large arrow between them labeled '912°C'. Below: 'Kolhalten avgör stålkvalitet: 0.15% C = mjukt, 0.8% C = härdbart'. Style: educational metallurgy textbook, grey atoms, blue/orange contrast for phases." },

  { out: `${ASSETS}/mol_koppar.jpg`, prompt:
    "Clean educational crystal structure diagram on pure white background. Shows FCC copper unit cell: orange-red copper atom spheres at corners and face centers of a cube, connected by thin lines, labeled 'FCC-struktur – kubisk tätpackad'. Surrounding the unit cell: a cloud of small yellow dots labeled 'Fria elektroner – leder ström'. An arrow from a power plug symbol to the copper labeled '59.6 MS/m – högst konduktivitet bland vanliga metaller'. Small text: 'Cu kan dras till 0.05mm tråd utan att spricka'. Style: educational 3D metallurgy diagram, orange-red copper atoms, yellow electron cloud, white background." },

  // ── PAPPER ─────────────────────────────────────────────────────────────────
  { out: `${ASSETS}/mol_cellulosa.jpg`, prompt:
    "Clean educational chemistry diagram on pure white background. Shows two parallel cellulose polymer chains, each with 4 glucose units connected by beta-1,4 glycosidic bonds. The glycosidic bonds (O between rings) are labeled 'β-1,4-glykosidisk bindning'. The OH hydroxyl groups on each sugar ring are shown prominently. Between the two chains: multiple dashed blue lines connecting OH groups labeled 'Vätebindningar (H-bindningar) – ger papperets styrka'. One chain segment is labeled 'Cellulosa (C6H10O5)n'. Below: a bar showing 'Fiberlängd avgör produktklass: 3-4mm barrträ → 0.3mm återvunnet'. Style: educational biochemistry textbook, blue hydrogen bonds, clean black structural formula, white background." },
];

async function generate(img) {
  console.log(`  Generating: ${img.out.split("/").pop()} ...`);
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: "gpt-image-1", prompt: img.prompt,
      n: 1, size: "1024x1024", output_format: "jpeg", quality: "high",
    }),
  });
  if (!res.ok) throw new Error(`${img.out.split("/").pop()}: ${await res.text()}`);
  const buf = Buffer.from((await res.json()).data[0].b64_json, "base64");
  writeFileSync(img.out, buf);
  console.log(`    ✓ ${img.out.split("/").pop()} (${Math.round(buf.length / 1024)} KB)`);
}

async function runBatches(images, concurrency = 2) {
  for (let i = 0; i < images.length; i += concurrency)
    await Promise.all(images.slice(i, i + concurrency).map(generate));
}

console.log(`Generating ${IMAGES.length} molecule/crystal structure images...\n`);
runBatches(IMAGES).then(() => console.log("\nDone!")).catch(e => { console.error(e); process.exit(1); });
