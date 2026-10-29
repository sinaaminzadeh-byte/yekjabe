// ── /api/orders/[id] — narrow, session-guarded patches (guide #9) ──
// opened  → own order only (session phone matches sender or recipient)
// status  → S-06 (audit wave 38): SERVER-AUTHORITATIVE transitions only.
//           The old handler let ANY customer walk their own legacy order
//           forward (paid → packing → shipped → delivered) just by sending a
//           PATCH — a self-service «تحویل شد» with zero proof of delivery.
//           Now: status moves require an ADMIN session, are forward-only,
//           single-step (no skipping) and validated against a fixed map.
//           The legitimate customer flows stay intact: marking a received
//           gift `opened` and reading own orders are untouched.
// S-08 (audit wave 38): the plaintext card code (`password`) of legacy rows
//           NEVER leaves the server — the hash/verify path
//           (cardPasswordHash + POST /api/gifts/{code}/open) is the only gate.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { assertSameOrigin, getSession } from "@/lib/auth/session";

// legacy 4-step ladder (GiftOrder.status) — forward-only, ONE step at a time.
// v2 orders never move through this route at all (the admin console +
// transitionOrder are the only writers for the 11-state machine).
const LEGACY_FORWARD: Record<string, string | null> = {
  paid: "packing",
  packing: "shipped",
  shipped: "delivered",
  delivered: null,
};

/** Rows the client may see — S-08: password is stripped, never serialized. */
function safeOrderRow(o: { password: string } & Record<string, unknown>) {
  const { password: _password, ...rest } = o;
  return rest;
}

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
    return NextResponse.json({ order: safeOrderRow(order) });
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
      // S-06 — customers never advance status themselves; admins do, but the
      // ladder is enforced server-side (forward-only, no skipping)
      if (!admin) throw new AppError(403, "forbidden");
      const next = LEGACY_FORWARD[order.status] ?? null;
      if (next !== body.status) throw new AppError(409, "invalid_transition");
      data.status = body.status;
    }

    if (Object.keys(data).length === 0) throw new AppError(400, "nothing_to_update");
    const updated = await db.giftOrder.update({ where: { id }, data });
    return NextResponse.json({ order: safeOrderRow(updated) });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
