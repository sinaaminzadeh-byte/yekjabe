// ── auth/otp.ts — hardened OTP (guide §4.3, critic MUST-FIX) ──
// 4-digit crypto-random codes (owner request: «همه‌ی کدهای وریفای ۴ عددی باشن»),
// HMAC-hashed at rest, attempt-capped, atomically consumed, previous codes
// invalidated on re-issue.
// Purpose-aware (owner round: تأیید شماره سفارش‌دهنده قبل از پرداخت):
//   "login"            → ورود / ثبت‌نام حساب
//   "checkout_orderer" → تأیید شماره سفارش‌دهنده در صفحه پرداخت
//   "gift_recv"        → تأیید شماره گیرنده برای باز کردن پیام هدیه (owner round 29:
//                         رمز کارت حذف شد — گیرنده با شماره موبایل + کد پیامکی می‌بیند)
// A code issued for one purpose can never satisfy the other.
// Delivery is REAL SMS (ippanel pattern) via sendSmsNow — best-effort: if the
// provider hiccups the code still exists in the DB and the attempt is visible
// in the admin پیامک report; dev-echo mode logs it instead of sending.
import { randomInt, createHmac, timingSafeEqual } from "crypto";
import { db } from "../db";
import { env } from "../env";
import { AppError } from "../errors";
import { rateLimit } from "../rate-limit";
import { sendSmsNow } from "../sms";

const OTP_TTL_MS = 5 * 60_000;
const MAX_ATTEMPTS = 5;

export type OtpPurpose = "login" | "checkout_orderer" | "gift_recv";

/** SMS template per purpose — each is an admin-editable ippanel pattern. */
export function otpTemplateFor(purpose: OtpPurpose): string {
  return purpose === "gift_recv" ? "otp_gift" : "otp_login";
}

const h = (phone: string, code: string) =>
  createHmac("sha256", env.SESSION_SECRET).update(`${phone}:${code}`).digest("hex");

/** Issues a fresh OTP for the phone (rate-limited). Returns devCode in dev-echo mode. */
export async function issueOtp(phone: string, ip: string, purpose: OtpPurpose = "login"): Promise<{ devCode?: string }> {
  await rateLimit("otp_phone_cooldown", phone, 1, 60);
  await rateLimit("otp_phone_hour", phone, 3, 3600);
  await rateLimit("otp_ip_day", ip, 10, 86_400);
  // 4 digits (1000–9999), crypto RNG — no leading-zero codes so SMS/OTPs read naturally
  const code = String(randomInt(1_000, 10_000));
  await db.$transaction([
    db.authCode.updateMany({ where: { phone, used: false, purpose }, data: { used: true } }),
    db.authCode.create({
      data: { phone, codeHash: h(phone, code), ip, purpose, expiresAt: new Date(Date.now() + OTP_TTL_MS) },
    }),
  ]);
  // real SMS — pattern template via ippanel (otp_login | otp_gift); failures
  // land in the SmsOutbox report; never block issuing (the code is usable the
  // moment it's created)
  void sendSmsNow({ phone, template: otpTemplateFor(purpose), params: { code } }).catch(() => {});
  // S-09 (audit wave 38): the code is NEVER logged — not here, not in the sms
  // layer (the dev-echo line prints param names + length only). devCode below
  // is the documented dev-echo aid returned to the CLIENT in dev mode only,
  // never written to any server log.
  return env.devEcho ? { devCode: code } : {};
}

/** Verifies the code; atomically consumes it; upserts AppUser. */
export async function verifyOtp(phone: string, code: string, purpose: OtpPurpose = "login", name?: string): Promise<void> {
  await rateLimit("otp_verify", phone, 10, 900);
  const row = await db.authCode.findFirst({
    where: { phone, purpose, used: false, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });
  if (!row || row.attempts >= MAX_ATTEMPTS) throw new AppError(401, "invalid_code");
  const ok = timingSafeEqual(Buffer.from(h(phone, code)), Buffer.from(row.codeHash));
  if (!ok) {
    await db.authCode.update({ where: { id: row.id }, data: { attempts: { increment: 1 } } });
    throw new AppError(401, "invalid_code");
  }
  // atomic consume — two parallel verifies can never both pass
  const used = await db.authCode.updateMany({ where: { id: row.id, used: false }, data: { used: true } });
  if (used.count !== 1) throw new AppError(401, "invalid_code");
  await db.appUser.upsert({
    where: { phone },
    update: { lastLoginAt: new Date(), ...(name ? { name } : {}) },
    create: { phone, ...(name ? { name } : {}) },
  });
}
