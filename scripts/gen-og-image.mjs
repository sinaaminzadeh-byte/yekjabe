// ── gen-og-image.mjs — branded OG + favicon assets (audit wave 37, SEO-07/SEO-09) ──
// Generates, from pure vector (SVG → sharp/librsvg), the share & icon assets
// «جعبه آبی» was missing:
//   public/og-default.jpg      1200×630 JPEG q~80 (<300KB) — Telegram/WhatsApp card
//   src/app/favicon.ico        64×64 (PNG-in-ICO container, hand-wrapped)
//   src/app/icon.png           512×512 — Next.js App Router file convention
//   src/app/apple-icon.png     180×180 — iOS home-screen icon
// Design: brand blue #00ABE7 rounded square with a white heart (the app's
// fallback mark), white background, brand name «جعبه آبی» + tagline
// «یکی دوستت داره…» set in the real Vazirmatn font from public/fonts.
//
// Persian font note: this sandbox has no Arabic-capable UI font that renders
// nicely, so the script registers the repo's vazirmatn-*.woff2 with fontconfig
// (FreeType 2.13+ reads WOFF2) via a private FONTCONFIG_FILE and renders text
// through pango/harfbuzz — proper RTL shaping, no system-font dependency.
// Run: node scripts/gen-og-image.mjs   (idempotent — regenerates every file)
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

// ── 0. Persian font registration (must happen BEFORE sharp's first render) ──
// sharp bundles its own fontconfig which does NOT scan user dirs; a private
// conf pointing at /usr/share/fonts + the repo's public/fonts fixes that.
const FONT_DIR = path.join(root, "public", "fonts");
const FC_CACHE = fs.mkdtempSync(path.join(os.tmpdir(), "pishnam-fc-"));
const FC_CONF = path.join(FC_CACHE, "fonts.conf");
fs.writeFileSync(
  FC_CONF,
  `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>/usr/share/fonts</dir>
  <dir>${FONT_DIR}</dir>
  <cachedir>${FC_CACHE}</cachedir>
</fontconfig>
`,
);
process.env.FONTCONFIG_FILE = FC_CONF;

const sharp = (await import("sharp")).default;

const BLUE = "#00ABE7";
const DARK = "#04202E";
const SOFT = "#E3F6FD";
const GRAY = "#4A6572";

// RLE…PDF bidi controls: force an RTL paragraph so trailing neutrals (…)
// land on the visually-LEFT end like real Persian typography (librsvg's
// direction="rtl" attribute is unreliable → do it with Unicode controls).
const rtl = (s) => "\u202B" + s + "\u202C";

/** Classic heart path inside a 0 0 100 100 box. */
const HEART =
  "M50 91 C22 68 6 48 6 29 C6 14 17 5 30 5 C39 5 46 10 50 17 C54 10 61 5 70 5 C83 5 94 14 94 29 C94 48 78 68 50 91 Z";

/** Blue rounded square + white heart — the brand mark at any size. */
function markSvg(size, { radius = 0.24, pad = 0.16 } = {}) {
  const r = Math.round(size * radius);
  const heart = size * (1 - pad * 2);
  const off = size * pad;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="${BLUE}"/>
  <g transform="translate(${off} ${off}) scale(${heart / 100})">
    <path d="${HEART}" fill="#FFFFFF"/>
  </g>
</svg>`;
}

// ── 1. OG 1200×630 — white bg, heart badge on a soft blob (left), RTL text (right) ──
function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FFFFFF"/>
  <!-- soft brand blob under the badge -->
  <circle cx="300" cy="322" r="235" fill="${SOFT}"/>
  <circle cx="960" cy="90" r="90" fill="${SOFT}" opacity="0.55"/>
  <circle cx="1080" cy="540" r="130" fill="${SOFT}" opacity="0.45"/>
  <!-- floating mini hearts -->
  <g transform="translate(148 118) scale(0.42)" opacity="0.9"><path d="${HEART}" fill="${BLUE}"/></g>
  <g transform="translate(468 452) scale(0.30)" opacity="0.75"><path d="${HEART}" fill="${BLUE}"/></g>
  <g transform="translate(520 140) scale(0.22)" opacity="0.55"><path d="${HEART}" fill="${BLUE}"/></g>
  <!-- the brand mark: blue rounded square with a white heart -->
  <g transform="translate(178 200) rotate(-6 122 122)">
    <rect width="244" height="244" rx="56" fill="${BLUE}"/>
    <g transform="translate(39 39) scale(1.66)"><path d="${HEART}" fill="#FFFFFF"/></g>
  </g>
  <!-- brand name + tagline (RTL, real Vazirmatn) -->
  <text x="1130" y="290" text-anchor="end" font-family="Vazirmatn" font-weight="900" font-size="150" fill="${DARK}">${rtl("جعبه آبی")}</text>
  <text x="1130" y="400" text-anchor="end" font-family="Vazirmatn" font-weight="700" font-size="66" fill="${BLUE}">${rtl("یکی دوستت داره…")}</text>
  <text x="1130" y="484" text-anchor="end" font-family="Vazirmatn" font-weight="500" font-size="34" fill="${GRAY}">${rtl("عروسک پولیشی + پیام صوتی + کارت پستال QR")}</text>
  <!-- site pill -->
  <rect x="920" y="530" width="210" height="54" rx="27" fill="${BLUE}"/>
  <text x="1025" y="567" text-anchor="middle" font-family="Vazirmatn" font-weight="700" font-size="30" fill="#FFFFFF">yekdoost.ir</text>
</svg>`;
}

// ── 2. minimal PNG-in-ICO container (Vista+ icons are just embedded PNGs) ──
function pngToIco(png, size) {
  const header = Buffer.alloc(6); // ICONDIR: reserved, type=1(icon), count=1
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16); // ICONDIRENTRY for one PNG payload
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // payload size
  entry.writeUInt32LE(22, 12); // payload offset (6 + 16)
  return Buffer.concat([header, entry, png]);
}

async function main() {
  const out = {};

  // ── OG share card ──
  const ogPath = path.join(root, "public", "og-default.jpg");
  await sharp(Buffer.from(ogSvg())).jpeg({ quality: 80, mozjpeg: true }).toFile(ogPath);
  out.og = fs.statSync(ogPath).size;

  // ── square icons (no text → font-independent, crisp at any size) ──
  const icon512 = path.join(root, "src", "app", "icon.png");
  await sharp(Buffer.from(markSvg(512))).png().toFile(icon512);
  out.icon512 = fs.statSync(icon512).size;

  const apple180 = path.join(root, "src", "app", "apple-icon.png");
  // iOS masks its own corners — full-bleed blue, slightly larger heart
  await sharp(Buffer.from(markSvg(180, { radius: 0, pad: 0.18 }))).png().toFile(apple180);
  out.apple180 = fs.statSync(apple180).size;

  const icoPath = path.join(root, "src", "app", "favicon.ico");
  const png64 = await sharp(Buffer.from(markSvg(64))).png().toBuffer();
  fs.writeFileSync(icoPath, pngToIco(png64, 64));
  out.ico = fs.statSync(icoPath).size;

  // ── sanity guard: Persian text must have actually rendered (not tofu/blank) ──
  const probe = await sharp(Buffer.from(ogSvg())).greyscale().raw().toBuffer();
  let ink = 0;
  for (const v of probe) if (v < 120) ink++;
  if (ink < 2000) {
    console.error(`[gen-og-image] WARNING: only ${ink} ink pixels — Persian text may not have rendered. Check font registration.`);
    process.exitCode = 2;
  }

  console.log(
    `[gen-og-image] og-default.jpg ${(out.og / 1024).toFixed(0)}KB · icon.png ${(out.icon512 / 1024).toFixed(0)}KB · apple-icon.png ${(out.apple180 / 1024).toFixed(0)}KB · favicon.ico ${out.ico}B (ink=${ink})`,
  );
  // tiny digest printed so CI logs can confirm regeneration happened
  for (const f of ["public/og-default.jpg", "src/app/icon.png", "src/app/apple-icon.png", "src/app/favicon.ico"]) {
    const h = crypto.createHash("sha1").update(fs.readFileSync(path.join(root, f))).digest("hex").slice(0, 8);
    console.log(`[gen-og-image] ${f} → ${h}`);
  }
}

main().catch((e) => {
  console.error("[gen-og-image] failed:", e.message);
  process.exit(1);
});
