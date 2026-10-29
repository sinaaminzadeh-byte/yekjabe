// ── prebuild.mjs — deploy-time DB bootstrap (PostgreSQL only) ──
// `bun run build` on Vercel/Coolify: when DATABASE_URL is PostgreSQL, push the
// schema and seed idempotently BEFORE `next build`. SQLite hosts (dev sandbox)
// are a strict no-op — there db:push stays a manual `bun run db:push`.
// Every seed is upsert-only (idempotent) so redeploys never duplicate rows.
//
// Bundled media defaults: scripts/img34 → public/media-defaults/… (ALWAYS,
// both branches). Serverless lambdas (Vercel) have an ephemeral disk, so the
// seeded galleries/blog covers/logo stream through /api/media → 307 redirect
// to these static copies when the data-root file is missing on that instance.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

// ── 0. bundle the default media (cheap, always) ──
const IMG = path.join(root, "scripts", "img34");
const DEF = path.join(root, "public", "media-defaults");
const PRODUCT_STEMS = [
  "bear-1", "bear-2", "bunny-1", "bunny-2", "cat-1", "cat-2",
  "panda-1", "panda-2", "sheep-1", "sheep-2",
  "bracelet-1", "bracelet-2", "minidoll-1", "minidoll-2",
  "watch-1", "watch-2", "choco-1", "choco-2",
];
const POST_STEMS = ["cover-gifts", "cover-yalda", "cover-plush", "inline-ribbon", "inline-hug", "inline-wash"];

if (fs.existsSync(IMG)) {
  for (const [folder, stems] of [
    ["products", PRODUCT_STEMS],
    ["posts", POST_STEMS],
    ["branding", ["logo"]],
  ]) {
    const dir = path.join(DEF, folder);
    fs.mkdirSync(dir, { recursive: true });
    for (const stem of stems) {
      // products/posts: img34 files are JPEGs with a .png name → bundle as .jpg
      // branding/logo: the owner's official file is a REAL PNG (round 37) → keep .png
      const src = path.join(IMG, `${stem}.png`);
      const out = folder === "branding" ? `${stem}.png` : `${stem}.jpg`;
      if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dir, out));
    }
  }
  console.log("[prebuild] bundled media defaults → public/media-defaults (25 files)");
} else {
  console.log("[prebuild] scripts/img34 missing — media defaults skipped");
}

const raw = process.env.DATABASE_URL ?? "";
if (!/^(postgres|postgresql):\/\//i.test(raw)) {
  console.log("[prebuild] DATABASE_URL is not PostgreSQL — nothing to do");
  process.exit(0);
}

console.log("[prebuild] PostgreSQL detected → prisma db push (postgres schema)");
execSync(
  "bunx prisma db push --accept-data-loss --skip-generate --schema prisma/schema.postgres.prisma",
  { stdio: "inherit", cwd: root },
);

console.log("[prebuild] idempotent seeds (commerce + round34 media + blog + admin demo)");
execSync("bun scripts/seed-commerce.ts", { stdio: "inherit", cwd: root });
// default galleries / blog covers / site logo (owner request round 34)
execSync("node scripts/seed-round34-images.mjs", { stdio: "inherit", cwd: root });
execSync("bun scripts/seed-blog.ts", { stdio: "inherit", cwd: root });
// rich demo dataset for the admin dashboard — owner asked it to be visible on
// the deployed panel too; idempotent (wipes its own marker rows first)
execSync("node scripts/seed-admin-demo.mjs", { stdio: "inherit", cwd: root });
