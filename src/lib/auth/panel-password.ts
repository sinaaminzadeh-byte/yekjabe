// ── panel-password.ts — DB-backed admin-panel door (round 41) ──
// تا دیروز تنها منبع رمز پنل، متغیر محیطی ADMIN_PANEL_PASSWORD روی هاست بود؛
// یعنی هر تغییر رمز نیاز به دست‌کاری Vercel و دیپلوی مجدد داشت و اگر مالک
// متغیر را اشتباه ست می‌کرد (یا دیپلوی کامل نمی‌شد)، پنل قفل می‌شد بدون هیچ
// راه بازگشتی قابل‌فهم. حالا: رمز داخل پنل قابل تغییر است و به‌صورت scrypt+
// salt در Setting admin_password_hash ذخیره می‌شود؛ متغیر محیطی فقط وقتی
// «فالبک» است که چنین Settingای وجود نداشته باشد (پنل منبع حقیقت است).
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

export const PANEL_PASSWORD_KEY = "admin_password_hash";
const SCRYPT_KEYLEN = 64;

/** scrypt+random-salt → "salt_hex:hash_hex" (هرگز رمز خام ذخیره نمی‌شود) */
export function hashPanelPassword(pw: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(pw, salt, SCRYPT_KEYLEN);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

/** مقایسه constant-time با هش ذخیره‌شده — ورودی خراب = false، هرگز throw نمی‌کند */
export function verifyPanelPassword(pw: string, stored: string): boolean {
  try {
    const [saltHex, hashHex] = stored.split(":");
    if (!saltHex || !hashHex) return false;
    const salt = Buffer.from(saltHex, "hex");
    const expected = Buffer.from(hashHex, "hex");
    if (expected.length !== SCRYPT_KEYLEN) return false;
    const test = scryptSync(pw, salt, expected.length);
    return timingSafeEqual(expected, test);
  } catch {
    return false;
  }
}
