// ── gen-round34-images.mjs — batch-generate default catalog + blog images ──
// Outputs PNG files to scripts/img34/ for the upload seed (seed-round34-images.mjs).
// Run: node scripts/gen-round34-images.mjs   (idempotent — skips existing files)
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "scripts", "img34");
fs.mkdirSync(OUT, { recursive: true });

const BRAND = "soft pastel light blue (#E3F6FD) studio background, warm soft lighting, professional e-commerce product photography, cute cozy gift-shop mood, no text, no watermark, high quality";

const JOBS = [
  // ── 6 plushes × 2 (product shot + lifestyle) ──
  { f: "bear-1", p: `A cute fluffy brown teddy bear plush toy sitting facing camera, ${BRAND}` },
  { f: "bear-2", p: `A cute fluffy brown teddy bear plush toy peeking out of an open light blue gift box with a white ribbon, kraft paper filler, ${BRAND}` },
  { f: "bunny-1", p: `A cute cream-white bunny rabbit plush toy with long floppy ears sitting facing camera, ${BRAND}` },
  { f: "bunny-2", p: `A cute cream-white bunny plush toy hugging a small heart pillow, cozy scene with a soft blanket, ${BRAND}` },
  { f: "cat-1", p: `A cute soft grey cat plush toy with big embroidered eyes sitting facing camera, ${BRAND}` },
  { f: "cat-2", p: `A cute soft grey cat plush toy lying on a pastel blue cushion next to a small gift box, ${BRAND}` },
  { f: "panda-1", p: `A cute chubby panda plush toy with black and white fur sitting facing camera, ${BRAND}` },
  { f: "panda-2", p: `A cute chubby panda plush toy holding a tiny bamboo toy, sitting next to a wrapped gift, ${BRAND}` },
  { f: "sheep-1", p: `A cute fluffy cream sheep plush toy with soft curly wool sitting facing camera, ${BRAND}` },
  { f: "sheep-2", p: `A cute fluffy cream sheep plush toy inside an open gift box with light blue tissue paper, ${BRAND}` },
  { f: "duck-1", p: `A cute bright yellow duck plush toy with an orange beak standing facing camera, ${BRAND}` },
  { f: "duck-2", p: `A cute bright yellow duck plush toy sitting on a stack of wrapped presents with pastel ribbons, ${BRAND}` },
  // ── 4 addons × 2 ──
  { f: "bracelet-1", p: `A delicate handmade beaded bracelet with a tiny silver heart pendant, product close-up on ${BRAND}` },
  { f: "bracelet-2", p: `A delicate handmade beaded bracelet with heart pendant displayed on a small linen card next to dried flowers, ${BRAND}` },
  { f: "minidoll-1", p: `A tiny cute mini plush keychain doll with a metal clasp, product shot on ${BRAND}` },
  { f: "minidoll-2", p: `A tiny cute mini plush keychain doll attached to a gift box ribbon, cozy scene, ${BRAND}` },
  { f: "watch-1", p: `A cute children's wristwatch with a light blue silicone strap and round white dial, product shot on ${BRAND}` },
  { f: "watch-2", p: `A cute children's wristwatch with light blue strap displayed in a small open gift box, ${BRAND}` },
  { f: "choco-1", p: `An elegant premium chocolate gift box tied with a white ribbon, product shot on ${BRAND}` },
  { f: "choco-2", p: `An open premium chocolate gift box with assorted chocolates in paper cups, soft light, ${BRAND}` },
  // ── blog covers (wide) ──
  { f: "cover-gifts", p: `Flat lay top view of gift boxes wrapped in light blue paper, ribbons, plush teddy bear and greeting cards on a pastel blue background, cozy gift wrapping scene, no text, high quality`, s: "1344x768" },
  { f: "cover-yalda", p: `Cozy Persian Yalda night scene: pomegranates, lit candles, red winter fruits, a warm blanket and a plush teddy bear, warm bokeh lights, no text, high quality`, s: "1344x768" },
  { f: "cover-plush", p: `Cute plush toys (bear, bunny, duck) arranged on a white shelf with soft daylight and pastel decorations, no text, high quality`, s: "1344x768" },
  // ── blog inline images ──
  { f: "inline-ribbon", p: `Hands tying a light blue ribbon around a small gift box with a plush toy peeking out, cozy wooden table, warm light, no text, high quality`, s: "1152x864" },
  { f: "inline-hug", p: `A child warmly hugging a fluffy teddy bear plush toy, cozy home scene, soft window light, no text, high quality`, s: "1152x864" },
  { f: "inline-wash", p: `A plush teddy bear being gently hand-washed with mild soap and water in a small basin, bright clean scene, no text, high quality`, s: "1152x864" },
  // ── default site logo (square) ──
  { f: "logo", p: `Minimal flat vector style logo badge: a cute light blue gift box with a smiling face and a small white heart floating above it, rounded square icon, pastel blue and white palette, clean modern, no text, no letters`, s: "1024x1024" },
];

async function main() {
  const zai = await ZAI.create();
  let done = 0, failed = 0;
  const queue = JOBS.filter((j) => !fs.existsSync(path.join(OUT, `${j.f}.png`)));
  console.log(`[gen] ${JOBS.length - queue.length} cached, ${queue.length} to generate`);

  async function worker(job, idx) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await zai.images.generations.create({ prompt: job.p, size: job.s ?? "1024x1024" });
        const b64 = res?.data?.[0]?.base64;
        if (!b64) throw new Error("empty response");
        fs.writeFileSync(path.join(OUT, `${job.f}.png`), Buffer.from(b64, "base64"));
        done++;
        console.log(`[gen] ✓ ${job.f} (${done}/${JOBS.length})`);
        return;
      } catch (e) {
        console.error(`[gen] ✗ ${job.f} attempt ${attempt}: ${e.message}`);
        if (attempt === 3) failed++;
        else await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
  }

  // concurrency 4
  const workers = Array.from({ length: 4 }, async (_, w) => {
    for (let i = w; i < queue.length; i += 4) await worker(queue[i], i);
  });
  await Promise.all(workers);
  console.log(`[gen] done: ${done} generated, ${failed} failed, ${JOBS.length - queue.length} cached`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => { console.error("[gen] fatal:", e); process.exit(1); });
