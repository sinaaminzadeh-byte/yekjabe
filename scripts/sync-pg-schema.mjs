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
// postgres:// URL (Vercel / Coolify). Identical models ⇒ identical TS types.
// ─────────────────────────────────────────────────────────────────────────────

generator client {
  provider      = "prisma-client-js"
  // Vercel functions = Amazon Linux (openssl 1.0.x on the older runtime,
  // 3.0.x on Node 20+/AL2023) — ship every Linux engine plus the build host's.
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
