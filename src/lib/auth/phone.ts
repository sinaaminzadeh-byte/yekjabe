// ── auth/phone.ts — THE single phone normalizer (guide A3: kill the copies) ──
// Persian/Latin digits → Latin, strips spaces/dashes; validates Iranian mobile.

export function normPhone(v: unknown): string {
  if (typeof v !== "string") return "";
  return v
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[\s-]/g, "")
    .replace(/\D/g, "")
    .slice(0, 15);
}

/** Strict: must be a valid Iranian mobile (09xxxxxxxxx) — used for identity. */
export function validPhone(v: unknown): string | null {
  const p = normPhone(v);
  return /^09\d{9}$/.test(p) ? p : null;
}

/** Normalizes an OTP code input (Persian digits → Latin digits). */
export function normCode(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).trim();
}
