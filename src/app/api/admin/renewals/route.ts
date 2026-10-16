// ── GET /api/admin/renewals — retention-renewal queue (mission §۴) ──
// ?status=payment_under_review (default) | awaiting_payment | paid | cancelled | all
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";

export async function GET(req: Request) {
  try {
    await requireAdmin();
    const url = new URL(req.url);
    const status = url.searchParams.get("status") ?? "payment_under_review";
    const allowed = ["awaiting_payment", "payment_under_review", "paid", "cancelled"];
    const where = allowed.includes(status) ? { status } : {};

    const rows = await db.retentionRenewal.findMany({
      where,
      orderBy: { createdAt: "asc" }, // oldest first — SLA age visible
      take: 50,
      include: {
        order: {
          select: {
            code: true,
            recipientName: true,
            recipientPhone: true,
            senderName: true,
            userPhone: true,
            retentionPlan: true,
            messageExpiresAt: true,
            messagePurgeStatus: true,
            status: true,
          },
        },
      },
    });

    return NextResponse.json({
      renewals: rows.map((r) => ({
        id: r.id,
        code: r.code,
        orderCode: r.order.code,
        plan: r.plan,
        priceToman: r.priceToman,
        status: r.status,
        requestedByPhone: r.requestedByPhone,
        receiptKey: r.receiptKey,
        cancelReason: r.cancelReason,
        createdAt: r.createdAt.toISOString(),
        order: {
          recipientName: r.order.recipientName,
          recipientPhone: r.order.recipientPhone,
          retentionPlan: r.order.retentionPlan,
          messageExpiresAt: r.order.messageExpiresAt ? r.order.messageExpiresAt.toISOString() : null,
          messagePurgeStatus: r.order.messagePurgeStatus,
          orderStatus: r.order.status,
        },
      })),
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
