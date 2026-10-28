// ── prebuild.mjs — deploy-time DB bootstrap (PostgreSQL only) ──
// `bun run build` on Vercel/Coolify: when DATABASE_URL is PostgreSQL, push the
// schema and seed idempotently BEFORE `next build`. SQLite hosts (dev sandbox)
// are a strict no-op — there db:push stays a manual `bun run db:push`.
// Both seeds are upsert-only (idempotent) so redeploys never duplicate rows.
import { execSync } from "node:child_process";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
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

console.log("[prebuild] idempotent seeds (commerce + blog)");
execSync("bun scripts/seed-commerce.ts", { stdio: "inherit", cwd: root });
execSync("bun scripts/seed-blog.ts", { stdio: "inherit", cwd: root });
