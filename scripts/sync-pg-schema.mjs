// ── sync-pg-schema.mjs — regenerate prisma/schema.postgres.prisma from schema.prisma ──
// SQLite stays the dev/authoring schema (sandbox). Production (Vercel/Coolify)
// uses PostgreSQL. This script re-derives the PG schema from the single source
// of truth so the two can NEVER drift apart (the old hand-written PG schema had
// missed GiftOrder/SmsTemplate/RetentionRenewal and invented VoiceNote).
// Run after every schema change:  bun scripts/sync-pg-schema.mjs
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const src = fs.readFileSync(path.join(root, "prisma/schema.prisma"), "utf8");

const modelsStart = src.indexOf("\nmodel ");
if (modelsStart < 0) throw new Error("no models found in schema.prisma");
const models = src.slice(modelsStart + 1).trimEnd() + "\n";

const header = `// ─────────────────────────────────────────────────────────────────────────────
// Pishnam — PRODUCTION SCHEMA (PostgreSQL) — AUTO-GENERATED, DO NOT HAND-EDIT
// Source of truth: prisma/schema.prisma (SQLite, dev/authoring).
// Regenerate after every schema change:  bun scripts/sync-pg-schema.mjs
// Deploy path: scripts/prisma-boot.mjs picks THIS file when DATABASE_URL is a
// postgres:// URL (Vercel / Coolify / Cloudflare Workers). Identical models ⇒
// identical TS types.
// ─────────────────────────────────────────────────────────────────────────────

generator client {
  provider      = "prisma-client-js"
  // Engineless client (JS query compiler + node-postgres driver adapter via
  // src/lib/db.ts) — REQUIRED for Cloudflare Workers, where the Rust query
  // engine binary cannot run; identical behavior on Node (Vercel/Coolify).
  previewFeatures = ["driverAdapters", "queryCompiler"]
  // Legacy engine path keeps working where an adapter isn't wired.
  binaryTargets = ["native", "rhel-openssl-1.0.x", "rhel-openssl-3.0.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

`;

fs.writeFileSync(path.join(root, "prisma/schema.postgres.prisma"), header + models);
const count = (models.match(/^model /gm) ?? []).length;
console.log(`[sync-pg-schema] schema.postgres.prisma regenerated — ${count} models, provider=postgresql`);
