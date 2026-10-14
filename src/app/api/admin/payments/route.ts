// ── GET /api/admin/payments — the manual receipt queue (guide §4.9) ──
// ?status=pending_review (default) — oldest first so the SLA age is visible.
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
    const where = allowed.includes(status) ? { status } : {};

    const rows = await db.payment.findMany({
      where,
      orderBy: { createdAt: "asc" },
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
        ageMinutes: Math.floor((now - p.createdAt.getTime()) / 60000),
        createdAt: p.createdAt,
        refId: p.refId,
      })),
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
