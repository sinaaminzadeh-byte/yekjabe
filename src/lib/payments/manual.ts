// ── payments/manual.ts — card-to-card receipt pipeline (guide §4.9) ──
// ≤5MB, magic-byte sniff (jpeg/png/webp), sha256 dedupe, max 3 attempts.
// Storage: local .data/receipts in the sandbox; Arvan S3 presigned at deploy —
// the Payment.receiptKey seam is identical in both worlds. All disk access goes
// through dataFile() so serverless deploys can point DATA_ROOT at /tmp.
import { dataFile } from "@/lib/data-root";

export const RECEIPT_MAX_BYTES = 5 * 1024 * 1024;

export function sniffImageMime(buf: Buffer): "image/jpeg" | "image/png" | "image/webp" | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "image/png";
  if (buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  return null;
}

const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

/** Writes the file under .data/receipts/{code}/ and returns the storage key. */
export async function storeReceiptFile(orderCode: string, buf: Buffer, mime: string): Promise<string> {
  const { mkdir, writeFile } = await import("fs/promises");
  const path = await import("path");
  const { randomUUID } = await import("crypto");
  const key = `receipts/${orderCode}/${randomUUID()}.${EXT[mime] ?? "bin"}`;
  const abs = dataFile(key);
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, buf);
  return key;
}

export async function readReceiptFile(key: string): Promise<Buffer | null> {
  try {
    const { readFile } = await import("fs/promises");
    if (key.includes("..") || !key.startsWith("receipts/")) return null; // path-traversal guard
    return await readFile(dataFile(key));
  } catch {
    return null;
  }
}

export async function deleteReceiptFile(key: string): Promise<void> {
  try {
    const { rm } = await import("fs/promises");
    if (key.includes("..") || !key.startsWith("receipts/")) return;
    await rm(dataFile(key), { force: true });
  } catch {
    /* best effort */
  }
}
