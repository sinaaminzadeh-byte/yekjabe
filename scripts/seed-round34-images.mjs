// ── seed-round34-images.mjs — "upload" the generated default images ──
// Mirrors the admin upload flow exactly: magic-byte sniff → .data storage →
// DB rows (ProductImage gallery / Post.coverKey / Setting site_logo).
// Deterministic stems so seeded blog posts can reference /api/media/posts/<f>.
// Idempotent: skips products that already have a gallery, re-syncs DB keys.
// Run: node scripts/seed-round34-images.mjs
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const IMG = path.join(process.cwd(), "scripts", "img34");
const DATA = process.env.DATA_ROOT
  ? path.join(process.env.DATA_ROOT)
  : path.join(process.cwd(), ".data");

const MIME_FROM_EXT = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

function sniff(buf) {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8) return "image/jpeg";
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "image/png";
  if (buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  return null;
}

async function store(folder, stem, file) {
  const buf = fs.readFileSync(file);
  const mime = sniff(buf);
  if (!mime) throw new Error(`bad image: ${file}`);
  const ext = mime === "image/jpeg" ? "jpg" : mime === "image/png" ? "png" : "webp";
  const key = `${folder}/${stem}.${ext}`;
  const abs = path.join(DATA, key);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, buf);
  return { key, mime, size: buf.length };
}

const PRODUCT_GALLERY = {
  bear: ["bear-1", "bear-2"],
  bunny: ["bunny-1", "bunny-2"],
  cat: ["cat-1", "cat-2"],
  panda: ["panda-1", "panda-2"],
  sheep: ["sheep-1", "sheep-2"],
  duck: ["duck-1", "duck-2"],
  "addon-bracelet": ["bracelet-1", "bracelet-2"],
  "addon-doll": ["minidoll-1", "minidoll-2"],
  "addon-watch": ["watch-1", "watch-2"],
  "addon-choco": ["choco-1", "choco-2"],
};

const PRODUCT_ALT = {
  bear: "عروسک پولیشی خرس قهوه‌ای جعبه آبی",
  bunny: "عروسک پولیشی خرگوش کرم جعبه آبی",
  cat: "عروسک پولیشی گربه خاکستری جعبه آبی",
  panda: "عروسک پولیشی پاندای جعبه آبی",
  sheep: "عروسک پولیشی گوسفند پشمالو جعبه آبی",
  duck: "عروسک پولیشی اردک زرد جعبه آبی",
  "addon-bracelet": "دستبند مهربونی با قلب نقره‌ای",
  "addon-doll": "عروسک مینی آویز کلیدی",
  "addon-watch": "ساعت بچگی بند آبی",
  "addon-choco": "جعبه شکلات کادویی",
};

const POST_IMAGES = [
  "cover-gifts",
  "cover-yalda",
  "cover-plush",
  "inline-ribbon",
  "inline-hug",
  "inline-wash",
];

const LOGO_FILE = "logo.png";

async function main() {
  if (!fs.existsSync(IMG)) {
    console.error("scripts/img34 missing — run gen-round34-images.mjs first");
    process.exit(1);
  }

  // ── 1. product galleries ──
  const products = await db.product.findMany({ select: { id: true, slug: true } });
  const byslug = new Map(products.map((p) => [p.slug, p]));
  let gallerySynced = 0;
  for (const [slug, stems] of Object.entries(PRODUCT_GALLERY)) {
    const product = byslug.get(slug);
    if (!product) {
      console.warn(`  ! product ${slug} not found — skip`);
      continue;
    }
    const existing = await db.productImage.count({ where: { productId: product.id } });
    if (existing > 0) {
      console.log(`  = ${slug}: gallery already has ${existing} images — skip`);
      continue;
    }
    let sortOrder = 0;
    let firstKey = "";
    for (const stem of stems) {
      const file = path.join(IMG, `${stem}.png`);
      if (!fs.existsSync(file)) {
        console.warn(`  ! missing file ${stem}.png — skip`);
        continue;
      }
      const { key } = await store("products", `${product.id}-${stem}`, file);
      await db.productImage.create({
        data: { productId: product.id, key, alt: PRODUCT_ALT[slug] ?? "", sortOrder },
      });
      if (sortOrder === 0) firstKey = key;
      sortOrder++;
    }
    if (firstKey && !product.slug.startsWith("addon")) {
      // keep cover synced (legacy consumers)
      await db.product.update({ where: { id: product.id }, data: { imageKey: firstKey } });
    }
    gallerySynced += sortOrder;
    console.log(`  ✓ ${slug}: ${sortOrder} images`);
  }
  // addons keep emoji+gallery; their cover also syncs for admin thumbnails
  for (const slug of ["addon-bracelet", "addon-doll", "addon-watch", "addon-choco"]) {
    const product = byslug.get(slug);
    if (!product) continue;
    const first = await db.productImage.findFirst({
      where: { productId: product.id },
      orderBy: { sortOrder: "asc" },
    });
    if (first) {
      const p = await db.product.findUnique({ where: { id: product.id }, select: { imageKey: true } });
      if (p && !p.imageKey) await db.product.update({ where: { id: product.id }, data: { imageKey: first.key } });
    }
  }

  // ── 2. blog images (deterministic keys: posts/<stem>.<ext>) ──
  for (const stem of POST_IMAGES) {
    const file = path.join(IMG, `${stem}.png`);
    if (!fs.existsSync(file)) {
      console.warn(`  ! missing blog image ${stem}.png — skip`);
      continue;
    }
    const { key } = await store("posts", stem, file);
    console.log(`  ✓ posts: ${key}`);
  }

  // ── 3. site logo (owner's official PNG, round 37) ──
  // Applies the bundled default when the setting is missing or still points to
  // an old seed default — NEVER when the owner uploaded a custom logo (marker
  // Setting site_logo_source=owner, written by /api/admin/branding/logo).
  // Round 40: even when nothing changes, the row is touched so `?v=updatedAt`
  // (branding.ts) bumps on every deploy → browsers refetch the header logo
  // (this is what made the owner think the new logo “wasn’t uploaded”).
  const logoSetting = await db.setting.findUnique({ where: { key: "site_logo" } });
  const logoSource = await db.setting.findUnique({ where: { key: "site_logo_source" } });
  const isOldDefault = logoSetting?.value === "branding/logo.jpg";
  if (fs.existsSync(path.join(IMG, LOGO_FILE)) && (!logoSetting || isOldDefault) && logoSource?.value !== "owner") {
    const { key } = await store("branding", "logo", path.join(IMG, LOGO_FILE));
    if (isOldDefault) {
      // remove the stale generated default file so no orphan media stays
      try { fs.unlinkSync(path.join(DATA, logoSetting.value)); } catch { /* already gone */ }
    }
    await db.setting.upsert({ where: { key: "site_logo" }, create: { key: "site_logo", value: key }, update: { value: key } });
    console.log(`  ✓ site logo: ${key}`);
  } else if (logoSetting) {
    // value untouched (owner-uploaded or already current) — just bump updatedAt
    await db.setting.update({ where: { key: "site_logo" }, data: { value: logoSetting.value } });
    console.log(`  = site logo: ${logoSetting.value} (cache-bust v bumped)`);
  } else {
    console.log("  = site logo: owner-uploaded or file missing — untouched");
  }

  console.log(`✓ round-34 images uploaded (gallery images: ${gallerySynced})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
