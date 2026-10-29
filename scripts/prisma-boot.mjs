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

// Fast path: an already-generated client that matches BOTH the wanted provider
// AND the schema CONTENT is kept (local `bun install` stays ~2s). Content check
// is mandatory: Vercel restores the previous build's node_modules cache, so a
// provider-only match once shipped a stale client (round 33 deploy failure:
// ContactMessageWhereInput missing `read`). Fresh CI hosts always generate.
// Force a regeneration with PRISMA_BOOT_FORCE=1 when debugging.
const marker = path.join(root, "node_modules/.prisma/client/schema.prisma");
if (!process.env.PRISMA_BOOT_FORCE && fs.existsSync(marker)) {
  const cached = fs.readFileSync(marker, "utf8");
  const provider = /provider\s*=\s*"(\w+)"/.exec(cached)?.[1];
  const wanted = fs.readFileSync(path.join(root, schema), "utf8");
  // Prisma reflows column padding when it copies the schema into the client,
  // so compare whitespace-normalized model sections — token-level identity.
  const norm = (s) => s.slice(s.indexOf("\nmodel ")).replace(/\s+/g, " ").trim();
  const sameContent = norm(cached) === norm(wanted);
  if (provider === (isPg ? "postgresql" : "sqlite") && sameContent) {
    console.log("[prisma-boot] generated client already matches — skipping");
    process.exit(0);
  }
  console.log(
    `[prisma-boot] stale client (${provider}${sameContent ? "" : " + schema content drift"}) → regenerating`,
  );
}

execSync(`bunx prisma generate --schema ${schema}`, { stdio: "inherit", cwd: root });
