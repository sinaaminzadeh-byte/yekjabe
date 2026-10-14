// ── /api/orders/[id] — narrow, session-guarded patches (guide #9) ──
// opened  → own order only (session phone matches sender or recipient)
// status  → forward-only via the fixed map; customer on own orders, admin on any
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { assertSameOrigin, getSession } from "@/lib/auth/session";

const FORWARD: Record<string, string | null> = {
  paid: "packing",
  packing: "shipped",
  shipped: "delivered",
  delivered: null,
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const session = await getSession("customer");
    if (!session) throw new AppError(401, "unauthenticated");
    const order = await db.giftOrder.findFirst({
      where: {
        id,
        OR: [{ userPhone: session.phone }, { phone: session.phone }],
      },
    });
    if (!order) return NextResponse.json({ error: "not_found" }, { status: 404 });
    return NextResponse.json({ order });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    assertSameOrigin(req);
    const session = await getSession("customer");
    const admin = await getSession("admin");
    if (!session && !admin) throw new AppError(401, "unauthenticated");

    const order = await db.giftOrder.findUnique({ where: { id } });
    if (!order) return NextResponse.json({ error: "not_found" }, { status: 404 });

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const data: { status?: string; opened?: boolean } = {};

    if (typeof body.opened === "boolean") {
      if (!admin && !session) throw new AppError(403, "forbidden");
      const own =
        admin && admin.phone
          ? order.userPhone === admin.phone || order.phone === admin.phone
          : session
            ? order.userPhone === session.phone || order.phone === session.phone
            : false;
      if (!own) throw new AppError(403, "not_yours");
      data.opened = body.opened;
    }

    if (typeof body.status === "string" && body.status !== order.status) {
      const next = FORWARD[order.status] ?? null;
      if (next !== body.status) throw new AppError(409, "invalid_transition");
      if (!admin) {
        if (!session) throw new AppError(403, "forbidden");
        const own = order.userPhone === session.phone || order.phone === session.phone;
        if (!own) throw new AppError(403, "not_yours");
      }
      data.status = body.status;
    }

    if (Object.keys(data).length === 0) throw new AppError(400, "nothing_to_update");
    const updated = await db.giftOrder.update({ where: { id }, data });
    return NextResponse.json({ order: updated });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
