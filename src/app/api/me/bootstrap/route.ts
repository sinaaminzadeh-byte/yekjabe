// ── /api/me/bootstrap — ONE session-scoped fetch replacing the public dump ──
// (guide §4.12: kills GET /api/orders?phone= + the every-visitor bootSync pull)
// Returns the logged-in user, their ≤50 orders and favorites. Guests → empty.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await getSession("customer");
    if (!session) {
      // guests get nothing — no PII without a session (acceptance A)
      return NextResponse.json({ user: null, admin: false, orders: [], favorites: [] });
    }
    const [user, orders, favorites, adminRow] = await Promise.all([
      db.appUser.findUnique({ where: { phone: session.phone } }),
      db.giftOrder.findMany({
        where: { OR: [{ userPhone: session.phone }, { phone: session.phone }] },
        orderBy: { no: "desc" },
        take: 50,
      }),
      db.favorite.findMany({
        where: { userPhone: session.phone },
        orderBy: { createdAt: "asc" },
        take: 50,
      }),
      db.adminUser.findUnique({ where: { phone: session.phone } }),
    ]);
    return NextResponse.json({
      user: { phone: session.phone, name: user?.name ?? "" },
      admin: Boolean(adminRow?.isActive),
      orders,
      favorites: favorites.map((f) => f.kind),
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
