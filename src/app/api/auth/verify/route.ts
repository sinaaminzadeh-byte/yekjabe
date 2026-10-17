// ── /api/auth/verify — consume the OTP, mint DB-backed sessions ──
// Customer cookie always on success; when the phone is in ADMIN_SEED_PHONES
// an admin session is minted too (AdminUser upserted, role owner).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { toErrorResponse, AppError } from "@/lib/errors";
import { validPhone, normCode } from "@/lib/auth/phone";
import { verifyOtp } from "@/lib/auth/otp";
import { createSession } from "@/lib/auth/session";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const phone = validPhone(body.phone);
    const code = normCode(body.code);
    if (!phone || !/^\d{4}$/.test(code)) throw new AppError(400, "invalid_input");

    await verifyOtp(phone, code);

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
