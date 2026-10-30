// ── POST /api/auth/admin-login — password door to the admin panel ──
// The footer's «ورود مدیر» leads here → pn_admin session cookie (same
// DB-backed session as the OTP path). Rate-limited 5/15min per IP,
// constant-time compare, session TTL 8h.
// Round 41: the door is DB-backed when the owner rotated the password inside
// the panel (Setting admin_password_hash, scrypt+salt) — the env var
// ADMIN_PANEL_PASSWORD stays the fallback for first boot / after DELETE.
// Submitted input is trimmed (stray-space-proof on mobile keyboards).
import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { env } from "@/lib/env";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin } from "@/lib/auth/session";
import { createSession } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { PANEL_PASSWORD_KEY, verifyPanelPassword } from "@/lib/auth/panel-password";

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    const body = (await req.json().catch(() => ({}))) as { password?: unknown };
    const password = typeof body.password === "string" ? body.password.trim() : "";
    if (!password) throw new AppError(400, "invalid_input");
    await rateLimit("admin_login", clientIp(req), 5, 900); // ۵ تلاش / ۱۵ دقیقه

    // درِ فعلی: هش پنلی (اگر مالک رمز را داخل پنل عوض کرده) وگرنه env سرور
    const { db } = await import("@/lib/db");
    const stored = await db.setting.findUnique({ where: { key: PANEL_PASSWORD_KEY } });
    const ok = stored?.value
      ? verifyPanelPassword(password, stored.value)
      : (() => {
          const a = Buffer.from(password.slice(0, 128));
          const b = Buffer.from(env.ADMIN_PANEL_PASSWORD.slice(0, 128));
          return a.length === b.length && timingSafeEqual(a, b);
        })();
    if (!ok) throw new AppError(401, "wrong_password");

    // The seat identity for password logins is the owner mobile when pinned,
    // otherwise a synthetic seat — AdminUser row keeps the panel's queries happy.
    const phone = env.OWNER_MOBILE ?? "owner@password";
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
