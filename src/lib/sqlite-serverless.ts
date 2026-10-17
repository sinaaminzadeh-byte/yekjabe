// ── sqlite-serverless.ts — synchronous SQLite bootstrap for serverless cold starts ──
// Netlify's bundled server handler does NOT reliably run instrumentation.ts
// register(), so the bootstrap lives here — imported (and executed) by db.ts
// at module scope, BEFORE the PrismaClient is constructed. Every server code
// path reaches Prisma only through db.ts, so this always runs first.
//
// The deploy bundle is read-only: the seeded db ships INSIDE the bundle
// (next.config outputFileTracingIncludes → .next/standalone/db) and is copied
// once per instance to the writable /tmp mount. If a stale/injected
// DATABASE_URL points at /tmp (missing or empty file — SQLite would auto-create
// a blank db), the bundled seed OVERWRITES it so the instance never serves an
// empty schema. A real external DATABASE_URL (VPS/PG) always wins untouched.
import fs from "fs";
import path from "path";

let done = false;

export function bootstrapServerlessSqlite(): void {
  if (done) return;
  done = true;
  const serverless =
    process.env.NETLIFY === "true" ||
    !!process.env.AWS_LAMBDA_FUNCTION_NAME ||
    !!process.env.LAMBDA_TASK_ROOT;
  if (!serverless) return; // .env / VPS deploys own DATABASE_URL

  const url = process.env.DATABASE_URL ?? "";
  const urlFileExists = (): boolean => {
    if (!url.startsWith("file:")) return true; // non-file (PG etc.) — trust it
    const p = url.slice("file:".length).split("?")[0];
    try {
      return fs.existsSync(p) && fs.statSync(p).size > 0;
    } catch {
      return false;
    }
  };
  if (url && !url.startsWith("file:/tmp/") && urlFileExists()) return; // real external db — untouched

  // node-file-trace over-copies the whole workspace when it sees a literal
  // process.cwd() feeding fs paths (Netlify 250MB function cap) — keep the cwd
  // access opaque to the tracer; the runtime value is identical.
  const cwdFn = process.cwd.bind(process);
  const base = cwdFn();
  const target = "/tmp/custom.db";
  try {
    // Refresh on every cold start unless the target already holds real data.
    let needsCopy = !fs.existsSync(target) || fs.statSync(target).size < 100 * 1024;
    if (!needsCopy && url) return; // healthy /tmp db + explicit URL — keep it
    if (needsCopy) {
      const candidates = [
        path.join(base, "db", "custom.db"),
        path.join(base, "..", "db", "custom.db"),
        path.join(base, ".next", "server", "db", "custom.db"),
      ];
      for (const c of candidates) {
        if (!fs.existsSync(c)) continue;
        fs.copyFileSync(c, target);
        for (const ext of ["-wal", "-shm"]) {
          if (fs.existsSync(c + ext)) fs.copyFileSync(c + ext, target + ext);
        }
        needsCopy = false;
        break;
      }
    }
    if (fs.existsSync(target) && fs.statSync(target).size > 100 * 1024) {
      process.env.DATABASE_URL = "file:" + target;
      if (url !== process.env.DATABASE_URL) {
        console.log("[sqlite-serverless] bootstrapped → /tmp/custom.db");
      }
    } else {
      console.error("[sqlite-serverless] no bundled db found — DATABASE_URL stays:", url || "(unset)");
    }
  } catch (err) {
    console.error("[sqlite-serverless] bootstrap failed:", err);
  }
}
