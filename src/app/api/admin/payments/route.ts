// ── GET /api/admin/payments — the manual receipt queue (guide §4.9) ──
// ?status=pending_review (default) — OLDEST FIRST so the SLA age is visible
// (UX-10: the queue must never silently re-sort; the client renders this order).
// ?code=PN-… (UX-05) — scope the queue to a single order (the «صف رسیدها»
// jump from the order modal). ?withoutReceipt=1 (UX-10) — only payments that
// have NO uploaded file yet.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";

export async function GET(req: Request) {
  try {
    await requireAdmin();
    const url = new URL(req.url);
    const status = url.searchParams.get("status") ?? "pending_review";
    const allowed = ["pending_review", "verified", "rejected", "failed", "initiated"];
    const code = (url.searchParams.get("code") ?? "").trim().slice(0, 40);
    const withoutReceipt = url.searchParams.get("withoutReceipt") === "1";

    const where: {
      status?: string;
      receiptKey?: string;
      order?: { code?: { contains: string } };
    } = allowed.includes(status) ? { status } : {};
    if (code) where.order = { code: { contains: code } };
    if (withoutReceipt) where.receiptKey = "";

    const rows = await db.payment.findMany({
      where,
      orderBy: { createdAt: "asc" }, // oldest first — the SLA view is the default
      take: 50,
      include: {
        order: {
          select: {
            code: true,
            recipientName: true,
            totalToman: true,
            paymentAttempts: true,
            status: true,
            userPhone: true,
            senderPhone: true,
          },
        },
      },
    });
    const now = Date.now();
    return NextResponse.json({
      payments: rows.map((p) => ({
        id: p.id,
        code: p.order.code,
        orderStatus: p.order.status,
        recipientName: p.order.recipientName,
        amountToman: p.amountToman,
        method: p.method,
        status: p.status,
        attemptNo: p.attemptNo,
        paymentAttempts: p.order.paymentAttempts,
        hasReceipt: Boolean(p.receiptKey),
        // UX-10 — age is clamped: clock skew between app servers (or a
        // hand-edited row) must never render «منفی دقیقه پیش» or an absurd
        // number of days. Negative → 0, nonsense-future → 0.
        ageMinutes: Math.max(0, Math.floor((now - p.createdAt.getTime()) / 60000)),
        createdAt: p.createdAt,
        refId: p.refId,
      })),
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e, "/api/admin/payments");
    return NextResponse.json(body, { status });
  }
}
