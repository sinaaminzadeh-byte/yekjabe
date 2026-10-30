// ── orders/message-media.ts — PRIVATE message media storage (mission §۱/§۴) ──
// Files live under .data/messages/<orderCode>/<uuid>.<ext> in the sandbox and
// move to the private S3 bucket at deploy (same key seam as receipts). They are
// NEVER served from /public — every read goes through an authorized API route.
// Magic-byte sniffing is mandatory (never trust filename/mime).
import { randomUUID } from "crypto";
import { dataFile } from "@/lib/data-root";
import { putMediaBlob, getMediaBlob, deleteMediaBlob } from "@/lib/media-blob";

export const MESSAGE_MEDIA_MAX_BYTES = 10 * 1024 * 1024; // ۱۰ مگابایت per file
export const MESSAGE_MEDIA_MAX_FILES = 3; // per order

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/ogg": "ogg",
  "audio/mp4": "m4a",
  "audio/webm": "webm",
};

export function isMessageMediaMime(mime: string): boolean {
  return mime in EXT;
}

/**
 * Magic-byte sniff for the exact allow-list above. Returns the real mime or
 * "" when the bytes don't match any accepted container.
 */
export function sniffMessageMediaMime(buf: Buffer): string {
  if (buf.length < 12) return "";
  const b = buf;
  const startsWith = (...bytes: number[]) => bytes.every((v, i) => b[i] === v);
  // images
  if (startsWith(0xff, 0xd8, 0xff)) return "image/jpeg";
  if (startsWith(0x89, 0x50, 0x4e, 0x47)) return "image/png";
  if (b.subarray(0, 4).toString("latin1") === "RIFF" && b.subarray(8, 12).toString("latin1") === "WEBP") return "image/webp";
  // mp4-family (ftyp at offset 4): mp4 / m4a
  if (b.subarray(4, 8).toString("latin1") === "ftyp") {
    const brand = b.subarray(8, 12).toString("latin1").toLowerCase();
    if (brand.startsWith("m4a") || brand.startsWith("m4b")) return "audio/mp4";
    return "video/mp4";
  }
  // webm / ogg
  if (startsWith(0x1a, 0x45, 0xdf, 0xa3)) return "video/webm";
  if (startsWith(0x4f, 0x67, 0x67, 0x53)) return "audio/ogg";
  // wav
  if (b.subarray(0, 4).toString("latin1") === "RIFF" && b.subarray(8, 12).toString("latin1") === "WAVE") return "audio/wav";
  // mp3 (ID3 tag or frame sync)
  if (b.subarray(0, 3).toString("latin1") === "ID3") return "audio/mpeg";
  if ((b[0] === 0xff && (b[1] & 0xe0) === 0xe0)) return "audio/mpeg";
  return "";
}

/**
 * Writes the file under .data/messages/<code>/ and returns its storage key.
 * Round 42: read-only serverless FS (Vercel) → the bytes go to the MediaBlob
 * table instead — same key, same seam, gift attachments survive deploys.
 */
export async function storeMessageFile(code: string, buf: Buffer, mime: string): Promise<string> {
  const { mkdir, writeFile } = await import("fs/promises");
  const path = await import("path");
  if (!/^PN-\d{6}-\d{4}$/.test(code)) throw new Error("bad_code");
  const ext = EXT[mime] ?? "bin";
  const key = `messages/${code}/${randomUUID()}.${ext}`;
  try {
    const abs = dataFile(key);
    await mkdir(path.dirname(abs), { recursive: true });
    await writeFile(abs, buf);
  } catch {
    // read-only / missing data root (serverless) → DB-backed fallback
    await putMediaBlob(key, buf, mime);
  }
  return key;
}

/** Reads a message media file back (null = missing/illegal key). */
export async function readMessageFile(key: string): Promise<Buffer | null> {
  if (!validMessageKey(key)) return null;
  try {
    const { readFile } = await import("fs/promises");
    return await readFile(dataFile(key));
  } catch {
    // round 42 — uploaded on a read-only serverless FS → DB blob copy
    return (await getMediaBlob(key))?.buf ?? null;
  }
}

export async function deleteMessageFile(key: string): Promise<void> {
  try {
    if (!validMessageKey(key)) return; // path-traversal guard
    const { rm } = await import("fs/promises");
    await rm(dataFile(key), { force: true }).catch(() => {});
    await deleteMediaBlob(key); // round 42 — remove the DB copy too
  } catch {
    /* best effort — the purge job re-verifies and retries */
  }
}

/** Only `messages/<PN-code>/<uuid>.<ext>` keys are legal — nothing else escapes. */
export function validMessageKey(key: string): boolean {
  if (typeof key !== "string" || key.includes("..")) return false;
  return /^messages\/PN-\d{6}-\d{4}\/[0-9a-f-]{36}\.(jpg|png|webp|mp4|webm|mp3|wav|ogg|m4a)$/.test(key);
}

/** Parses the mediaKeys JSON column — never trusts the shape, filters to legal keys. */
export function parseMessageMediaKeys(json: string): string[] {
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr.filter((k): k is string => validMessageKey(k)) : [];
  } catch {
    return [];
  }
}

export function mimeFromKey(key: string): string {
  const ext = key.split(".").pop() ?? "";
  for (const [mime, e] of Object.entries(EXT)) if (e === ext) return mime;
  return "application/octet-stream";
}
