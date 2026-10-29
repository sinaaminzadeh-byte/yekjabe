// ── GET /api/admin/customers — مشتریان aggregation (round 33, P-02 rewrite) ──
// Groups real orders by the buyer phone (ordererPhone, fallback userPhone)
// and merges AppUser account info. Privacy: phones masked like /admin/orders.
// ?q= filters by name/phone fragments.
//
// P-02 (Wave 2): the old version loaded the newest 800 orders + 400 users raw
// and grouped them in JS ON EVERY KEYSTROKE. Now the grouping happens in the
// database (groupBy _count/_sum/_min/_max per phone) and only one bounded
// "details overlay" query (newest 500 rows, slim columns) fills name/last
// status/cities. The response shape and visible behavior (ranking, medals,
// masked phones, stats) are unchanged.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";

const PAID_LIKE = ["paid", "preparing", "shipped", "delivered", "refund_requested", "refunded"];

function maskPhone(p: string): string {
  return p.replace(/^(\d{4})(\d{3})(\d{4})$/, "$1 *** $3");
}

export async function GET(req: Request) {
  try {
    await requireAdmin();
    const q = (new URL(req.url).searchParams.get("q") ?? "").trim().slice(0, 40);

    const [allByOrderer, allByUser, paidByOrderer, paidByUser, giftsByOrderer, giftsByUser, overlay, accounts] =
      await Promise.all([
        // per-phone lifetime grouping — done by the DB, one row per phone
        db.order.groupBy({ by: ["ordererPhone"], _count: { _all: true }, _min: { createdAt: true }, _max: { createdAt: true } }),
        // fallback phone (ordererPhone empty) groups to the same per-phone space
        db.order.groupBy({ by: ["userPhone"], where: { ordererPhone: "" }, _count: { _all: true }, _min: { createdAt: true }, _max: { createdAt: true } }),
        db.order.groupBy({ by: ["ordererPhone"], where: { status: { in: PAID_LIKE } }, _count: { _all: true }, _sum: { totalToman: true } }),
        db.order.groupBy({ by: ["userPhone"], where: { ordererPhone: "", status: { in: PAID_LIKE } }, _count: { _all: true }, _sum: { totalToman: true } }),
        db.order.groupBy({ by: ["ordererPhone"], where: { giftOpened: true }, _count: { _all: true } }),
        db.order.groupBy({ by: ["userPhone"], where: { giftOpened: true, ordererPhone: "" }, _count: { _all: true } }),
        // bounded details overlay: newest rows only, slim columns
        db.order.findMany({
          orderBy: { createdAt: "desc" },
          take: 500,
          select: {
            ordererPhone: true,
            userPhone: true,
            ordererFirstName: true,
            ordererLastName: true,
            status: true,
            city: true,
            giftOpened: true,
          },
        }),
        db.appUser.findMany({
          orderBy: { createdAt: "desc" },
          take: 400,
          select: { phone: true, name: true, createdAt: true, lastLoginAt: true },
        }),
      ]);

    type Row = {
      phone: string;
      name: string;
      ordersCount: number;
      paidCount: number;
      totalSpent: number;
      firstOrderAt: Date | null;
      lastOrderAt: Date | null;
      lastStatus: string;
      cities: Set<string>;
      giftOpens: number;
      accountCreatedAt: Date | null;
      lastLoginAt: Date | null;
    };
    const map = new Map<string, Row>();
    const rowOf = (phone: string): Row => {
      let r = map.get(phone);
      if (!r) {
        r = {
          phone,
          name: "",
          ordersCount: 0,
          paidCount: 0,
          totalSpent: 0,
          firstOrderAt: null,
          lastOrderAt: null,
          lastStatus: "",
          cities: new Set(),
          giftOpens: 0,
          accountCreatedAt: null,
          lastLoginAt: null,
        };
        map.set(phone, r);
      }
      return r;
    };

    // merge the DB groups into the per-phone space (orderer first, user fallback)
    for (const g of allByOrderer) {
      if (!g.ordererPhone) continue;
      const r = rowOf(g.ordererPhone);
      r.ordersCount += g._count._all;
      r.firstOrderAt = r.firstOrderAt ? minDate(r.firstOrderAt, g._min.createdAt) : g._min.createdAt;
      r.lastOrderAt = r.lastOrderAt ? maxDate(r.lastOrderAt, g._max.createdAt) : g._max.createdAt;
    }
    for (const g of allByUser) {
      if (!g.userPhone) continue;
      const r = rowOf(g.userPhone);
      r.ordersCount += g._count._all;
      r.firstOrderAt = r.firstOrderAt ? minDate(r.firstOrderAt, g._min.createdAt) : g._min.createdAt;
      r.lastOrderAt = r.lastOrderAt ? maxDate(r.lastOrderAt, g._max.createdAt) : g._max.createdAt;
    }
    for (const g of paidByOrderer) {
      if (!g.ordererPhone) continue;
      const r = rowOf(g.ordererPhone);
      r.paidCount += g._count._all;
      r.totalSpent += g._sum.totalToman ?? 0;
    }
    for (const g of paidByUser) {
      if (!g.userPhone) continue;
      const r = rowOf(g.userPhone);
      r.paidCount += g._count._all;
      r.totalSpent += g._sum.totalToman ?? 0;
    }
    for (const g of giftsByOrderer) {
      if (!g.ordererPhone) continue;
      rowOf(g.ordererPhone).giftOpens += g._count._all;
    }
    for (const g of giftsByUser) {
      if (!g.userPhone) continue;
      rowOf(g.userPhone).giftOpens += g._count._all;
    }

    // details overlay (bounded newest rows): name / last status / cities
    for (const o of overlay) {
      const phone = o.ordererPhone || o.userPhone;
      if (!phone) continue;
      const r = rowOf(phone);
      if (!r.name && o.ordererFirstName) r.name = [o.ordererFirstName, o.ordererLastName].filter(Boolean).join(" ");
      if (!r.lastStatus) r.lastStatus = o.status;
      if (o.city) r.cities.add(o.city);
    }

    // merge account info (registered users)
    const accByPhone = new Map(accounts.map((a) => [a.phone, a]));
    for (const [phone, row] of map) {
      const acc = accByPhone.get(phone);
      if (acc) {
        if (!row.name) row.name = acc.name ?? "";
        row.accountCreatedAt = acc.createdAt;
        row.lastLoginAt = acc.lastLoginAt;
      }
    }

    let rows = [...map.values()].map((r) => ({
      phone: r.phone,
      phoneMasked: maskPhone(r.phone),
      name: r.name,
      ordersCount: r.ordersCount,
      paidCount: r.paidCount,
      totalSpent: r.totalSpent,
      firstOrderAt: r.firstOrderAt,
      lastOrderAt: r.lastOrderAt,
      lastStatus: r.lastStatus,
      cities: [...r.cities].slice(0, 3).join("، "),
      giftOpens: r.giftOpens,
      accountCreatedAt: r.accountCreatedAt,
      lastLoginAt: r.lastLoginAt,
    }));

    if (q) {
      const n = q.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
      rows = rows.filter((r) => r.phone.includes(n) || r.name.includes(q));
    }

    rows.sort((a, b) => b.totalSpent - a.totalSpent || b.ordersCount - a.ordersCount);

    return NextResponse.json({
      customers: rows.slice(0, 200),
      total: rows.length,
      totalSpent: rows.reduce((a, r) => a + r.totalSpent, 0),
      registered: rows.filter((r) => r.accountCreatedAt).length,
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

function minDate(a: Date | null, b: Date | null): Date | null {
  if (!a) return b;
  if (!b) return a;
  return a.getTime() <= b.getTime() ? a : b;
}
function maxDate(a: Date | null, b: Date | null): Date | null {
  if (!a) return b;
  if (!b) return a;
  return a.getTime() >= b.getTime() ? a : b;
}
