// ── POST /api/auth/admin-login — password door to the admin panel ──
// The footer's «ورود مدیر» leads here: one shared secret (ADMIN_PANEL_PASSWORD)
// → pn_admin session cookie (same DB-backed session as the OTP path).
// Rate-limited 5/15min per IP, constant-time compare, session TTL 8h.
import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { env } from "@/lib/env";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/auth/session";
import { createSession } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    const body = (await req.json().catch(() => ({}))) as { password?: unknown };
    const password = typeof body.password === "string" ? body.password : "";
    if (!password) throw new AppError(400, "invalid_input");
    await rateLimit("admin_login", clientIp(req), 5, 900); // ۵ تلاش / ۱۵ دقیقه

    const a = Buffer.from(password.slice(0, 128));
    const b = Buffer.from(env.ADMIN_PANEL_PASSWORD.slice(0, 128));
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      throw new AppError(401, "wrong_password");
    }

    // The seat identity for password logins is the owner mobile when pinned,
    // otherwise a synthetic seat — AdminUser row keeps the panel's queries happy.
    const phone = env.OWNER_MOBILE ?? "owner@password";
    const { db } = await import("@/lib/db");
    await db.adminUser.upsert({
      where: { phone },
      create: { phone, role: "owner", lastLoginAt: new Date() },
      update: { lastLoginAt: new Date(), isActive: true },
    });
    await createSession(phone, "admin");
    return NextResponse.json({ ok: true, admin: true });
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
