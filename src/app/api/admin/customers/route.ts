// ── GET /api/admin/customers — مشتریان aggregation (round 33) ──
// Groups real orders by the buyer phone (ordererPhone, fallback userPhone)
// and merges AppUser account info. Privacy: phones masked like /admin/orders.
// ?q= filters by name/phone fragments.
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

    const [orders, accounts] = await Promise.all([
      db.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 800,
        select: {
          ordererPhone: true,
          userPhone: true,
          ordererFirstName: true,
          ordererLastName: true,
          status: true,
          totalToman: true,
          province: true,
          city: true,
          giftOpened: true,
          createdAt: true,
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

    for (const o of orders) {
      const phone = o.ordererPhone || o.userPhone;
      if (!phone) continue;
      let row = map.get(phone);
      if (!row) {
        row = {
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
        map.set(phone, row);
      }
      row.ordersCount += 1;
      if (PAID_LIKE.includes(o.status)) {
        row.paidCount += 1;
        row.totalSpent += o.totalToman;
      }
      if (!row.name && o.ordererFirstName) row.name = [o.ordererFirstName, o.ordererLastName].filter(Boolean).join(" ");
      if (!row.lastStatus) row.lastStatus = o.status;
      if (!row.lastOrderAt || o.createdAt > row.lastOrderAt) row.lastOrderAt = o.createdAt;
      if (!row.firstOrderAt || o.createdAt < row.firstOrderAt) row.firstOrderAt = o.createdAt;
      if (o.city) row.cities.add(o.city);
      if (o.giftOpened) row.giftOpens += 1;
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
