// ── media.ts — generic local media store for UGC & refund photos (Phase C) ──
// Sandbox: files live under .data/<folder>/…; at deploy the same storage keys
// move to Arvan S3 behind the identical seam (mirrors payments/manual.ts).
// Magic-byte sniffing is THE single source in payments/manual.ts — reused here.
import { dataFile } from "@/lib/data-root";
import { putMediaBlob, getMediaBlob, deleteMediaBlob } from "@/lib/media-blob";

export const UPLOAD_MAX_BYTES = 5 * 1024 * 1024; // ۵ مگابایت

const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

/**
 * Writes the file under .data/<folder>/<stem>.<ext> and returns the storage key.
 * Round 42: on a read-only filesystem (Vercel lambdas — the owner's deployed
 * site!) the disk write throws EROFS, so the bytes are persisted in the
 * MediaBlob table instead. The key contract is identical — readers fall back
 * to the DB when the file is missing on their instance's disk.
 */
export async function storeMediaFile(
  folder: "experiences" | "refunds" | "products" | "posts" | "branding",
  stem: string,
  buf: Buffer,
  mime: string,
): Promise<string> {
  const { mkdir, writeFile } = await import("fs/promises");
  const path = await import("path");
  const key = `${folder}/${stem}.${EXT[mime] ?? "bin"}`;
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

export async function deleteMediaFile(key: string): Promise<void> {
  try {
    const { rm } = await import("fs/promises");
    const allowed =
      key.startsWith("experiences/") ||
      key.startsWith("refunds/") ||
      key.startsWith("products/") ||
      key.startsWith("posts/") || // blog covers + inline images (round 34)
      key.startsWith("branding/"); // site logo (round 34)
    if (key.includes("..") || !allowed) return; // path-traversal guard
    await rm(dataFile(key), { force: true }).catch(() => {});
    await deleteMediaBlob(key); // round 42 — remove the DB copy too
  } catch {
    /* best effort */
  }
}

const MIME_FROM_EXT: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

/** Reads a CATALOG product image (public marketing asset — not private UGC). */
export async function readProductImage(key: string): Promise<{ buf: Buffer; mime: string } | null> {
  if (key.includes("..") || !key.startsWith("products/")) return null; // traversal guard
  try {
    const { readFile } = await import("fs/promises");
    const buf = await readFile(dataFile(key));
    const ext = key.split(".").pop() ?? "";
    return { buf, mime: MIME_FROM_EXT[ext] ?? "application/octet-stream" };
  } catch {
    // file missing on this instance (serverless cold start / uploaded on a
    // read-only FS) → the DB blob copy
    return await getMediaBlob(key);
  }
}

/**
 * Reads any PUBLIC media asset by storage key (round 34): product gallery
 * photos, blog covers/inline images, site logo. Traversal-guarded + prefix
 * allowlist — private folders (messages/receipts/refunds) are NEVER readable
 * through this path.
 */
export async function readPublicMedia(key: string): Promise<{ buf: Buffer; mime: string } | null> {
  if (key.includes("..")) return null;
  const ok =
    key.startsWith("products/") || key.startsWith("posts/") || key.startsWith("branding/");
  if (!ok) return null;
  try {
    const { readFile } = await import("fs/promises");
    const buf = await readFile(dataFile(key));
    const ext = key.split(".").pop() ?? "";
    return { buf, mime: MIME_FROM_EXT[ext] ?? "application/octet-stream" };
  } catch {
    // round 42 — uploaded on a read-only serverless FS → DB blob copy
    return await getMediaBlob(key);
  }
}

/**
 * Public URL for a storage key (products/posts/branding). Returns null for
 * empty/unknown prefixes so callers can fall back to emoji/plush art.
 */
export function publicMediaUrl(key: string): string | null {
  if (!key) return null;
  if (key.startsWith("products/")) return `/api/media/${key}`;
  if (key.startsWith("posts/") || key.startsWith("branding/")) return `/api/media/${key}`;
  return null;
}

/** Strict filename guard for public media streaming — uuid-ish stem + image ext. */
export function isSafeMediaFilename(file: string): boolean {
  return /^[A-Za-z0-9._-]{1,120}\.(jpg|png|webp)$/.test(file) && !file.includes("..");
}

/**
 * Static-bundle fallback for SEEDED media (round 34 deploy fix): prebuild
 * copies scripts/img34 → public/media-defaults/… so serverless filesystems
 * (Vercel lambda — ephemeral disk) can still serve the default galleries,
 * blog covers and the default logo through a static redirect, while admin
 * uploads keep streaming from the data root.
 *   products/<cuid>-<stem>.<ext> → /media-defaults/products/<stem>.<ext>
 *   posts/<file> | branding/<file> → /media-defaults/<folder>/<file>
 * Returns null for keys that can never map to a bundled default.
 */
export function publicMediaFallback(key: string): string | null {
  if (key.includes("..")) return null;
  const slash = key.indexOf("/");
  if (slash <= 0) return null;
  const folder = key.slice(0, slash);
  const file = key.slice(slash + 1);
  if (!isSafeMediaFilename(file)) return null;
  if (folder === "posts" || folder === "branding") {
    // Round 40: باندل استاتیک فقط logo.png رسمی مالک را دارد؛ هر کلیدِ
    // logo.<ext> آپلودیِ ادمین (که روی دیسک لامبدا گم می‌شود) به همان
    // پیش‌فرض رسمی برمی‌گردد تا هدر هیچ‌وقت عکس شکسته نشان ندهد.
    if (folder === "branding" && /^logo\.(jpg|png|webp)$/.test(file)) {
      return "/media-defaults/branding/logo.png";
    }
    return `/media-defaults/${folder}/${file}`;
  }
  if (folder === "products") {
    const dash = file.indexOf("-");
    const stem = dash > 0 ? file.slice(dash + 1) : file; // strip the <productId>- prefix
    return isSafeMediaFilename(stem) ? `/media-defaults/products/${stem}` : null;
  }
  return null;
}

/** Parses the refundPhotos JSON column — never trusts the shape. */
export function parsePhotoKeys(json: string): string[] {
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr.filter((k): k is string => typeof k === "string" && k.startsWith("refunds/")) : [];
  } catch {
    return [];
  }
}

// ── slugify — latin slug for posts (guide 13-f: latin transliteration) ──

const FA_TO_LATIN: Record<string, string> = {
  آ: "a", ا: "a", ب: "b", پ: "p", ت: "t", ث: "s", ج: "j", چ: "ch", ح: "h", خ: "kh",
  د: "d", ذ: "z", ر: "r", ز: "z", ژ: "zh", س: "s", ش: "sh", ص: "s", ض: "z", ط: "t",
  ظ: "z", ع: "a", غ: "gh", ف: "f", ق: "gh", ک: "k", گ: "g", ل: "l", م: "m", ن: "n",
  و: "v", ه: "h", ی: "y", ي: "y", ك: "k", "‌": "-",
};

/**
 * Auto-slug from a Persian/latin title. Latin words win; Persian is
 * transliterated; if nothing usable survives → `post-<ts>` fallback.
 * Output matches ^[a-z0-9-]{3,60}$ or the fallback.
 */
export function slugifyTitle(title: string): string {
  const mapped = title
    .toLowerCase()
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .split("")
    .map((ch) => FA_TO_LATIN[ch] ?? ch)
    .join("");
  const slug = mapped
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60)
    .replace(/-$/, "");
  if (slug.length >= 3 && !slug.startsWith("-")) return slug;
  return `post-${Date.now()}`;
}
