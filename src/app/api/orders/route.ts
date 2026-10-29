// ── /api/orders — session-scoped order read access (Phase A of the launch guide) ──
// GET → ONLY with a customer session; returns ≤50 orders where the session
//       phone is the sender (userPhone) or the recipient (phone). Guests get 401.
//
// S-02 (audit wave 37): the legacy POST handler was REMOVED. It was an
// unauthenticated upsert that let anyone rewrite existing orders (recipient,
// address, message, card code) or create fake rows. It was replaced by the
// session+idempotency-guarded POST /api/checkout in Phase B and — verified by
// grep — no frontend or script calls POST /api/orders anymore. Without the
// exported POST handler Next.js answers 405 Method Not Allowed automatically.
// Narrow writes stay where they belong: PATCH /api/orders/[id] (session-guarded)
// and POST /api/orders/[id]/refund (damage-only, session-guarded).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { requireSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await requireSession();
    const orders = await db.giftOrder.findMany({
      where: { OR: [{ userPhone: session.phone }, { phone: session.phone }] },
      orderBy: { no: "desc" },
      take: 50,
    });
    return NextResponse.json({ orders });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
