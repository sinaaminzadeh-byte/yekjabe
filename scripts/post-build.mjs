// ── post-build.mjs — standalone-server assembly for self-host targets ──
// Vercel packages the app itself (no .next/standalone tree) — skip there.
// Sandbox / Coolify single-box: copy static assets + public into the standalone
// server. Replaces the old inline `cp` chain which CRASHED the build on hosts
// where standalone doesn't exist (`cp: cannot stat` → exit 1).
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");

if (process.env.VERCEL) {
  console.log("[post-build] Vercel — standalone assembly skipped");
  process.exit(0);
}

const standalone = path.join(root, ".next/standalone");
if (!fs.existsSync(standalone)) {
  console.log("[post-build] no .next/standalone — skipped");
  process.exit(0);
}

execSync("cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/", {
  cwd: root,
  stdio: "inherit",
});
console.log("[post-build] standalone assembled");
