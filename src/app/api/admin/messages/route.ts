// ── /api/admin/messages — پیام‌های «تماس با ما» inbox (round 33) ──
// GET  list newest-first (+unread count). Any admin seat.
// PATCH { id, read?, replyNote? } — mark seen / add internal note. Any admin seat.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";

export async function GET() {
  try {
    await requireAdmin();
    const [rows, unread] = await Promise.all([
      db.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
      db.contactMessage.count({ where: { read: false } }),
    ]);
    return NextResponse.json({
      messages: rows.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        subject: m.subject,
        orderNo: m.orderNo,
        message: m.message,
        read: m.read,
        replyNote: m.replyNote,
        handledAt: m.handledAt,
        createdAt: m.createdAt,
      })),
      unread,
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function PATCH(req: Request) {
  try {
    assertSameOrigin(req);
    await requireAdmin();
    const body = (await req.json().catch(() => ({}))) as { id?: string; read?: boolean; replyNote?: string };
    if (!body.id) throw new AppError(400, "missing_id");
    const data: { read?: boolean; handledAt?: Date | null; replyNote?: string } = {};
    if (typeof body.read === "boolean") {
      data.read = body.read;
      data.handledAt = body.read ? new Date() : null;
    }
    if (typeof body.replyNote === "string") data.replyNote = body.replyNote.slice(0, 500);
    const updated = await db.contactMessage.update({ where: { id: body.id }, data });
    return NextResponse.json({ ok: true, id: updated.id, read: updated.read, replyNote: updated.replyNote });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
