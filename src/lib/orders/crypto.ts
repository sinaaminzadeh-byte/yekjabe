// ── orders/crypto.ts — scrypt gift-password hashing + canonical JSON (guide §4.11) ──
import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";

export function sha256Hex(s: string): string {
  return createHash("sha256").update(s).digest("hex");
}

/** Deterministic JSON (sorted keys) — used for the idempotency requestHash. */
export function canonicalJson(v: unknown): string {
  if (v === null || typeof v !== "object") return JSON.stringify(v) ?? "null";
  if (Array.isArray(v)) return `[${v.map((x) => canonicalJson(x)).join(",")}]`;
  const o = v as Record<string, unknown>;
  const keys = Object.keys(o).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${canonicalJson(o[k])}`).join(",")}}`;
}

/** scrypt$salt$hash — native crypto, no dependency (guide §4.11). */
export function hashGiftPassword(pw: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(pw.normalize("NFKC").trim(), salt, 32);
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

export function verifyGiftPassword(pw: string, stored: string): boolean {
  try {
    const [scheme, saltHex, hashHex] = stored.split("$");
    if (scheme !== "scrypt" || !saltHex || !hashHex) return false;
    const hash = scryptSync(pw.normalize("NFKC").trim(), Buffer.from(saltHex, "hex"), 32);
    return timingSafeEqual(hash, Buffer.from(hashHex, "hex"));
  } catch {
    return false;
  }
}
