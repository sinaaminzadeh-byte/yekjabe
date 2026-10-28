// ── prisma-boot.mjs — pick the Prisma schema from DATABASE_URL, generate client ──
// Runs as `postinstall` on every host (bun install locally, Vercel CI):
//   postgres:// | postgresql://  → prisma/schema.postgres.prisma  (production)
//   file: | unset                → prisma/schema.prisma           (SQLite dev)
// Why: on Vercel nothing ran `prisma generate` before, so `next build` type-
// checked against a STALE cached client and every deployment failed with
// "Property 'ordererFirstName' does not exist". The client must always be
// generated fresh from the schema that matches the runtime DATABASE_URL.
// Only the URL protocol is printed — credentials never reach the logs.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const raw = process.env.DATABASE_URL ?? "";
const isPg = /^(postgres|postgresql):\/\//i.test(raw);
const schema = isPg ? "prisma/schema.postgres.prisma" : "prisma/schema.prisma";

console.log(`[prisma-boot] DATABASE_URL protocol = ${raw ? raw.split(":")[0] : "(unset)"} → ${schema}`);

// Fast path: an already-generated client that matches the wanted provider is
// kept (local `bun install` stays ~2s). Fresh CI hosts always generate. Force
// a regeneration with PRISMA_BOOT_FORCE=1 when debugging.
const marker = path.join(root, "node_modules/.prisma/client/schema.prisma");
if (!process.env.PRISMA_BOOT_FORCE && fs.existsSync(marker)) {
  const provider = /provider\s*=\s*"(\w+)"/.exec(fs.readFileSync(marker, "utf8"))?.[1];
  if (provider === (isPg ? "postgresql" : "sqlite")) {
    console.log("[prisma-boot] generated client already matches — skipping");
    process.exit(0);
  }
  console.log(`[prisma-boot] stale client (${provider}) → regenerating`);
}

execSync(`bunx prisma generate --schema ${schema}`, { stdio: "inherit", cwd: root });
