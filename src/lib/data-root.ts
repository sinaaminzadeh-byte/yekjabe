// ── data-root.ts — THE single seam for runtime file storage ──
// Sandbox / single-box (Coolify): files live under .data/ next to the app.
// Serverless (Netlify): the deploy bundle is read-only — the DATA_ROOT env
// points this same seam at the writable /tmp mount (set in the site env).
// Storage keys never carry the root; every reader/writer goes through
// dataFile() — mirrors the S3 seam documented in payments/manual.ts.
import path from "path";

// node-file-trace over-copies the whole workspace when it can statically see
// process.cwd() feeding fs paths (Netlify 250MB function cap) — keep the cwd
// access opaque to the tracer; the runtime value is identical.
const cwdFn = process.cwd.bind(process);

export function dataFile(key: string): string {
  const root = process.env.DATA_ROOT || path.join(cwdFn(), ".data");
  return path.join(root, key);
}
