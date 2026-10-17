// ── data-root.ts — THE single seam for runtime file storage ──
// Sandbox / single-box (Coolify): files live under .data/ next to the app.
// Serverless (Netlify): the deploy bundle is read-only — the DATA_ROOT env
// points this same seam at the writable /tmp mount (set in the site env).
// Storage keys never carry the root; every reader/writer goes through
// dataFile() — mirrors the S3 seam documented in payments/manual.ts.
import path from "path";

export function dataFile(key: string): string {
  const root = process.env.DATA_ROOT || path.join(process.cwd(), ".data");
  return path.join(root, key);
}
