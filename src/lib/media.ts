// ── media.ts — generic local media store for UGC & refund photos (Phase C) ──
// Sandbox: files live under .data/<folder>/…; at deploy the same storage keys
// move to Arvan S3 behind the identical seam (mirrors payments/manual.ts).
// Magic-byte sniffing is THE single source in payments/manual.ts — reused here.

export const UPLOAD_MAX_BYTES = 5 * 1024 * 1024; // ۵ مگابایت

const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

/** Writes the file under .data/<folder>/<stem>.<ext> and returns the storage key. */
export async function storeMediaFile(folder: "experiences" | "refunds", stem: string, buf: Buffer, mime: string): Promise<string> {
  const { mkdir, writeFile } = await import("fs/promises");
  const path = await import("path");
  const key = `${folder}/${stem}.${EXT[mime] ?? "bin"}`;
  const abs = path.join(process.cwd(), ".data", key);
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, buf);
  return key;
}

export async function deleteMediaFile(key: string): Promise<void> {
  try {
    const { rm } = await import("fs/promises");
    const path = await import("path");
    if (key.includes("..") || !(key.startsWith("experiences/") || key.startsWith("refunds/"))) return; // path-traversal guard
    await rm(path.join(process.cwd(), ".data", key), { force: true });
  } catch {
    /* best effort */
  }
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
