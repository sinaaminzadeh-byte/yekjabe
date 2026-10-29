// ── GET /api/admin/badges — nav badge counts (round 33) ──
// Tiny response polled by the sidebar/pills so actionable queues stay visible
// without loading any tab data. Any admin seat.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";

export async function GET() {
  try {
    await requireAdmin();
    const [receipts, unread, renewals, packing] = await Promise.all([
      db.payment.count({ where: { status: "pending_review" } }),
      db.contactMessage.count({ where: { read: false } }),
      db.retentionRenewal.count({ where: { status: { in: ["awaiting_payment", "payment_under_review"] } } }),
      db.order.count({ where: { status: "paid" } }),
    ]);
    return NextResponse.json({ receipts, unread, renewals, packing });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
