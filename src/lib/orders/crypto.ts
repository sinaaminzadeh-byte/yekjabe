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

// ── S-10 (audit wave 38) — strict format check for the request nonce/key ──
// The Idempotency-Key (and every request nonce derived from it) used to accept
// ANY string of 8–64 chars — including control characters, whitespace and
// 2MB unicode payloads trimmed to 64. A nonce is a storage/dedup identifier:
// it must be a bounded, boring token. UUIDs (newIdempotencyKey) and the legacy
// client keys ([A-Za-z0-9._-]) both satisfy this; nothing else gets through.
const NONCE_RE = /^[A-Za-z0-9._-]{8,64}$/;

/** Strict client-key/nonce shape: charset + length, no whitespace/control chars. */
export function isValidRequestNonce(k: string): boolean {
  return NONCE_RE.test(k);
}

/** Returns the trimmed key when well-formed; null otherwise (reject early). */
export function normalizeRequestNonce(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const s = raw.trim();
  return isValidRequestNonce(s) ? s : null;
}
