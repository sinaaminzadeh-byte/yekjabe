// ── /api/admin/password — panel door password (owner-only, round 41) ──
// GET    → { source: "panel" | "env" }  (no secret ever leaves the server)
// POST   { currentPassword, newPassword } → rotate; the new hash lives in
//          Setting admin_password_hash so future changes need NO redeploy.
// DELETE → remove the stored hash; the server env password is the door again.
// The currentPassword check reuses the exact same door logic as admin-login
// (panel hash first, env fallback) so rotation can never bypass the door.
import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { isRateLimited, clientIp, rateLimit } from "@/lib/rate-limit";
import { env } from "@/lib/env";
import {
  PANEL_PASSWORD_KEY,
  hashPanelPassword,
  verifyPanelPassword,
} from "@/lib/auth/panel-password";

/** آیا رمزِ واردشده با «درِ فعلی» می‌خواند؟ (هش پنلی اول، وگرنه env) */
async function matchesCurrentDoor(submitted: string): Promise<boolean> {
  const stored = await db.setting.findUnique({ where: { key: PANEL_PASSWORD_KEY } });
  if (stored?.value) return verifyPanelPassword(submitted, stored.value);
  const a = Buffer.from(submitted.slice(0, 128));
  const b = Buffer.from(env.ADMIN_PANEL_PASSWORD.slice(0, 128));
  return a.length === b.length && timingSafeEqual(a, b);
}

async function source(): Promise<"panel" | "env"> {
  const stored = await db.setting.findUnique({ where: { key: PANEL_PASSWORD_KEY } });
  return stored?.value ? "panel" : "env";
}

export async function GET() {
  try {
    await requireAdmin("owner");
    return NextResponse.json({ source: await source() });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin("owner");
    assertSameOrigin(req);
    await rateLimit("admin_password", clientIp(req), 5, 600);

    const body = (await req.json().catch(() => ({}))) as {
      currentPassword?: unknown;
      newPassword?: unknown;
    };
    const current = typeof body.currentPassword === "string" ? body.currentPassword.trim() : "";
    const next = typeof body.newPassword === "string" ? body.newPassword.trim() : "";
    if (!current || next.length < 8 || next.length > 128) throw new AppError(400, "bad_input");

    if (!(await matchesCurrentDoor(current))) throw new AppError(401, "wrong_password");

    await db.setting.upsert({
      where: { key: PANEL_PASSWORD_KEY },
      create: { key: PANEL_PASSWORD_KEY, value: hashPanelPassword(next) },
      update: { value: hashPanelPassword(next) },
    });
    return NextResponse.json({ ok: true, source: "panel" }, { status: 201 });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function DELETE(req: Request) {
  try {
    await requireAdmin("owner");
    assertSameOrigin(req);
    await rateLimit("admin_password", clientIp(req), 5, 600);
    await db.setting.deleteMany({ where: { key: PANEL_PASSWORD_KEY } });
    return NextResponse.json({ ok: true, source: "env" });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
