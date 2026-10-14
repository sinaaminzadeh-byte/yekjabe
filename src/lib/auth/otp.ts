// ── auth/otp.ts — hardened OTP (guide §4.3, critic MUST-FIX) ──
// 6-digit crypto-random codes, HMAC-hashed at rest, attempt-capped,
// atomically consumed, previous codes invalidated on re-issue.
import { randomInt, createHmac, timingSafeEqual } from "crypto";
import { db } from "../db";
import { env } from "../env";
import { AppError } from "../errors";
import { rateLimit } from "../rate-limit";

const OTP_TTL_MS = 5 * 60_000;
const MAX_ATTEMPTS = 5;

const h = (phone: string, code: string) =>
  createHmac("sha256", env.SESSION_SECRET).update(`${phone}:${code}`).digest("hex");

/** Issues a fresh OTP for the phone (rate-limited). Returns devCode in dev-echo mode. */
export async function issueOtp(phone: string, ip: string): Promise<{ devCode?: string }> {
  await rateLimit("otp_phone_cooldown", phone, 1, 60);
  await rateLimit("otp_phone_hour", phone, 3, 3600);
  await rateLimit("otp_ip_day", ip, 10, 86_400);
  const code = String(randomInt(100_000, 1_000_000)); // 6 digits, crypto RNG
  await db.$transaction([
    db.authCode.updateMany({ where: { phone, used: false }, data: { used: true } }),
    db.authCode.create({
      data: { phone, codeHash: h(phone, code), ip, expiresAt: new Date(Date.now() + OTP_TTL_MS) },
    }),
  ]);
  // Phase B: enqueueSms({ phone, template: "otp", params: { code } }) — Kavenegar.
  return env.devEcho ? { devCode: code } : {};
}

/** Verifies the code; atomically consumes it; upserts AppUser. */
export async function verifyOtp(phone: string, code: string): Promise<void> {
  await rateLimit("otp_verify", phone, 10, 900);
  const row = await db.authCode.findFirst({
    where: { phone, used: false, expiresAt: { gt: new Date() } },
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
    update: { lastLoginAt: new Date() },
    create: { phone },
  });
}
