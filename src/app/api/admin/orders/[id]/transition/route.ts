// ── POST /api/admin/orders/{id}/transition — admin state moves (guide §4.8) ──
// Forward-only via transitionOrder; cancel after payment = owner only.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { transitionOrder } from "@/lib/orders/transition";
import { ORDER_STATUSES, TRANSITIONS, type OrderStatus } from "@/lib/orders/status";

const OWNER_ONLY_FROM: OrderStatus[] = ["paid", "preparing"];

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    assertSameOrigin(req);
    const admin = await requireAdmin();
    const body = (await req.json().catch(() => ({}))) as { to?: string; note?: string; tracking?: string };
    const to = String(body.to ?? "") as OrderStatus;
    if (!ORDER_STATUSES.includes(to)) throw new AppError(400, "bad_status");

    const order = await db.order.findUnique({ where: { id } });
    if (!order) throw new AppError(404, "not_found");
    const from = order.status as OrderStatus;
    if (!TRANSITIONS[from].includes(to)) throw new AppError(409, "invalid_transition", { from, to });
    if (OWNER_ONLY_FROM.includes(from) && to === "cancelled" && admin.role !== "owner") {
      throw new AppError(403, "owner_only");
    }

    await transitionOrder(order.id, to, {
      actor: admin.role === "owner" ? "owner" : "admin",
      actorId: admin.phone,
      note: body.note ?? "",
      meta: body.tracking ? { tracking: body.tracking } : undefined,
    });
    const updated = await db.order.findUnique({ where: { id }, select: { code: true, status: true } });
    return NextResponse.json({ ok: true, ...updated });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
