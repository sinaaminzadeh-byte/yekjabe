// ── /api/admin/team — کارکنان: managing AdminUser seats (round 33, owner-only) ──
// GET    list every seat (owner needs full phones to manage).
// POST   { phone, name, role } — invite/reactivate a seat (operator|owner).
// Guards: last active owner can never be demoted/deactivated (enforced here
// and in the [id] route); owner-only everywhere.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";

export async function GET() {
  try {
    await requireAdmin("owner");
    const rows = await db.adminUser.findMany({ orderBy: [{ isActive: "desc" }, { role: "asc" }, { phone: "asc" }] });
    return NextResponse.json({
      seats: rows.map((a) => ({
        id: a.id,
        phone: a.phone,
        name: a.name,
        role: a.role,
        isActive: a.isActive,
        lastLoginAt: a.lastLoginAt,
      })),
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    await requireAdmin("owner");
    const body = (await req.json().catch(() => ({}))) as { phone?: string; name?: string; role?: string };
    const phone = String(body.phone ?? "").replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).trim();
    if (!/^09\d{9}$/.test(phone)) throw new AppError(400, "bad_phone");
    const role = body.role === "owner" ? "owner" : "operator";
    const name = String(body.name ?? "").trim().slice(0, 60);

    const existing = await db.adminUser.findUnique({ where: { phone } });
    if (existing) {
      const updated = await db.adminUser.update({ where: { phone }, data: { name, role, isActive: true } });
      return NextResponse.json({ ok: true, seat: updated, reactivated: true });
    }
    const seat = await db.adminUser.create({ data: { phone, name, role } });
    return NextResponse.json({ ok: true, seat });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
