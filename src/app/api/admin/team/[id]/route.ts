// ── PATCH/DELETE /api/admin/team/{id} — edit or remove a seat (owner-only) ──
// Guards: cannot touch yourself; cannot demote/deactivate the LAST active owner.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";

async function guardLastOwner(seatId: string, nextRole?: string, nextActive?: boolean) {
  const seat = await db.adminUser.findUnique({ where: { id: seatId } });
  if (!seat) throw new AppError(404, "not_found");
  if (seat.role === "owner" && seat.isActive && ((nextRole && nextRole !== "owner") || nextActive === false)) {
    const activeOwners = await db.adminUser.count({ where: { role: "owner", isActive: true } });
    if (activeOwners <= 1) throw new AppError(409, "last_owner");
  }
  return seat;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    assertSameOrigin(req);
    const admin = await requireAdmin("owner");
    if (id === admin.id) throw new AppError(409, "self_edit");
    const body = (await req.json().catch(() => ({}))) as { name?: string; role?: string; isActive?: boolean };
    const data: { name?: string; role?: string; isActive?: boolean } = {};
    if (typeof body.name === "string") data.name = body.name.trim().slice(0, 60);
    if (body.role === "owner" || body.role === "operator") data.role = body.role;
    if (typeof body.isActive === "boolean") data.isActive = body.isActive;
    await guardLastOwner(id, data.role, data.isActive);
    const seat = await db.adminUser.update({ where: { id }, data });
    return NextResponse.json({ ok: true, seat });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    assertSameOrigin(req);
    const admin = await requireAdmin("owner");
    if (id === admin.id) throw new AppError(409, "self_edit");
    const seat = await guardLastOwner(id);
    if (seat.role === "owner" && seat.isActive) {
      // guardLastOwner already throws when last owner; safe-delete = deactivate instead
      await db.adminUser.update({ where: { id }, data: { isActive: false } });
      return NextResponse.json({ ok: true, deactivated: true });
    }
    await db.adminUser.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
