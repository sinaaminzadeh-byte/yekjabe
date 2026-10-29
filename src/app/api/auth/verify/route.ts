// ── /api/auth/verify — consume the OTP, mint DB-backed sessions ──
// Customer cookie always on success; when the phone is in ADMIN_SEED_PHONES
// an admin session is minted too (AdminUser upserted, role owner).
// purpose: "login" (default) | "checkout_orderer" | "gift_recv" — a checkout-purpose verify
// also saves the orderer's name on the account and mints the SAME 30-day
// customer session (owner: بعد از وریفای، حساب بساز و لاگین کن).
// gift_recv = گیرنده‌ی هدیه در صفحه‌ی نمایش هدیه (owner round 29: بدون رمز کارت)
// S-07 (audit wave 38): same-site origin guard — verify mints session
// cookies, so a cross-site form/fetch posting here must never succeed.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { toErrorResponse, AppError } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/auth/session";
import { validPhone, normCode } from "@/lib/auth/phone";
import { verifyOtp, type OtpPurpose } from "@/lib/auth/otp";
import { createSession } from "@/lib/auth/session";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

const PURPOSES: OtpPurpose[] = ["login", "checkout_orderer", "gift_recv"];

export async function POST(req: Request) {
  try {
    assertSameOrigin(req); // S-07 — cross-site POST → 403 (no-Origin callers pass)
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const phone = validPhone(body.phone);
    const code = normCode(body.code);
    if (!phone || !/^\d{4}$/.test(code)) throw new AppError(400, "invalid_input");
    const purpose = PURPOSES.includes(body.purpose as OtpPurpose) ? (body.purpose as OtpPurpose) : "login";
    // checkout verify carries the orderer name so the auto-created account
    // isn't nameless (login flow keeps its own name step)
    const rawName = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";

    await verifyOtp(phone, code, purpose, purpose === "checkout_orderer" && rawName ? rawName : undefined);

    // admin detection — seats are pinned via env (guide A7)
    const isAdmin = env.adminPhones.has(phone);
    if (isAdmin) {
      await db.adminUser.upsert({
        where: { phone },
        create: { phone, role: "owner", lastLoginAt: new Date() },
        update: { lastLoginAt: new Date(), isActive: true },
      });
      await createSession(phone, "admin");
    }
    await createSession(phone, "customer");

    const user = await db.appUser.findUnique({ where: { phone } });
    return NextResponse.json({
      ok: true,
      user: { phone, name: user?.name ?? "" },
      admin: isAdmin,
    });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json(
        { error: "rate_limited", details: { retryAfter: e.retryAfter } },
        { status: 429, headers: { "retry-after": String(e.retryAfter) } },
      );
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
