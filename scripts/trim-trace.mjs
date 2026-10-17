// ── trim-trace.mjs — post-build trace sanitizer (serverless 250MB function cap) ──
// Turbopack currently ignores next.config outputFileTracingExcludes, so
// build-time-only packages (typescript, sharp/@img, @prisma/engines) survive
// in .next/server/**/*.nft.json and land inside every serverless bundle.
// This strips them (plus any workspace junk that snuck into a manifest) right
// after `next build`, BEFORE the serverless plugin packages the functions.
// On the buildbot the junk paths simply don't exist — filtering is a no-op.
import { readdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const DENY = [
  // workspace dirs that must never ship (sandbox-only artifacts)
  /(^|\/)(skills|extracted|upload|tool-results|design-ref|agent-ctx|examples|mini-services|\.zscripts|\.data)\//,
  // app sources ship as bundled chunks — the raw src/docs trees are dead weight
  /(^|\/)(src|docs)\//,
  // build-time-only node_modules (runtime needs only @prisma/client + .prisma engine)
  /(^|\/)node_modules\/(typescript|sharp|@img)\//,
  /(^|\/)node_modules\/@prisma\/engines\//,
  // repo root files
  /(^|\/)(Caddyfile|Dockerfile|docker-compose\.yml|bun\.lock|bun\.lockb|tsconfig\.tsbuildinfo|dev\.log|server\.log|components\.json|next-env\.d\.ts)$/,
];

function walk(dir) {
  let out = [];
  let entries = [];
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.name.endsWith(".nft.json")) out.push(p);
  }
  return out;
}

const manifests = walk(".next/server");
let removed = 0;
let kept = 0;
for (const f of manifests) {
  const d = JSON.parse(readFileSync(f, "utf8"));
  const before = Array.isArray(d.files) ? d.files.length : 0;
  d.files = (d.files ?? []).filter((x) => !DENY.some((re) => re.test(x)));
  removed += before - d.files.length;
  kept += d.files.length;
  writeFileSync(f, JSON.stringify(d));
}
console.log(`[trim-trace] manifests:${manifests.length} kept:${kept} removed:${removed}`);

// ── .next/standalone — @netlify/plugin-nextjs copies THIS tree verbatim into
// the serverless function, so the same build-time-only packages are deleted
// from it too (rmSync is a silent no-op for paths that don't exist).
const STANDALONE_DENY = [
  ".next/standalone/node_modules/typescript",
  ".next/standalone/node_modules/sharp",
  ".next/standalone/node_modules/@img",
  ".next/standalone/node_modules/@prisma/engines",
  ".next/standalone/node_modules/@next/swc-linux-x64-gnu",
  ".next/standalone/node_modules/@next/swc-linux-x64-musl",
  ".next/standalone/src",
  ".next/standalone/docs",
  ".next/standalone/skills",
  ".next/standalone/extracted",
  ".next/standalone/upload",
  ".next/standalone/tool-results",
  ".next/standalone/design-ref",
  ".next/standalone/agent-ctx",
  ".next/standalone/examples",
  ".next/standalone/mini-services",
  ".next/standalone/.zscripts",
  ".next/standalone/scripts",
  // CRITICAL: never ship env files — Next copies .env into standalone output,
  // and a leaked sandbox DATABASE_URL poisons the serverless runtime
  ".next/standalone/.env",
  ".next/standalone/.env.local",
  ".next/standalone/.env.production",
  ".next/standalone/.env.development",
  // root config/artifacts that have no runtime value inside the function
  ".next/standalone/Caddyfile",
  ".next/standalone/Dockerfile",
  ".next/standalone/docker-compose.yml",
  ".next/standalone/dev.log",
  ".next/standalone/server.log",
  ".next/standalone/download",
  ".next/standalone/components.json",
  ".next/standalone/eslint.config.mjs",
  ".next/standalone/netlify.toml",
  ".next/standalone/next.config.ts",
  ".next/standalone/postcss.config.mjs",
  ".next/standalone/bun.lock",
  ".next/standalone/tsconfig.tsbuildinfo",
];
let dirsRemoved = 0;
for (const rel of STANDALONE_DENY) {
  try {
    rmSync(rel, { recursive: true, force: true });
    dirsRemoved++;
  } catch {
    /* absent on this platform — fine */
  }
}
console.log(`[trim-trace] standalone paths removed:${dirsRemoved}`);
