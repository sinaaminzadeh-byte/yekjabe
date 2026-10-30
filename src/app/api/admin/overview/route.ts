// ── GET /api/admin/overview — داشبورد aggregation (round 33, P-01 rewrite) ──
// One round-trip that feeds the whole «داشبورد» tab:
//   KPIs (sales/orders/queue depths) + 14-day revenue series (Tehran days)
//   + status distribution + top products + top provinces + recent activity.
// All money figures are TOMAN, server-authoritative, paid-like statuses only.
//
// P-01 (Wave 2): the heavy lifting moved INTO the database (groupBy/aggregate
// for status mix, revenue windows and provinces).
// P-06 (round 42): the three $queryRaw calls used SQLite-only SQL (rowid,
// epoch-millis vs timestamp) — the tab 500-ed on PostgreSQL deploys (Vercel)
// and the panel showed «اتصال به سرور برقرار نشد» ONLY on پیشخوان while every
// other tab worked. They are now portable Prisma calls that run identically on
// SQLite and PostgreSQL; the row-level pulls are bounded (60-day window for
// items, phone+createdAt-only projection for buyers, small shop volumes).
// The JSON shape is IDENTICAL to the previous contract (additive-only policy).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";
import { g2j, JALALI_MONTHS } from "@/lib/jalali";

// statuses that count as real money (matches the orders tab rule)
const PAID_LIKE = ["paid", "preparing", "shipped", "delivered", "refund_requested", "refunded"];

// Tehran is fixed UTC+3:30 (no DST since 2022) — deterministic day windows.
const TEHRAN_OFFSET_MS = 3.5 * 3600_000;

function tehranDayKey(d: Date): string {
  const t = new Date(d.getTime() + TEHRAN_OFFSET_MS);
  return `${t.getUTCFullYear()}${String(t.getUTCMonth() + 1).padStart(2, "0")}${String(t.getUTCDate()).padStart(2, "0")}`;
}

function dayKeyToDate(key: string): Date {
  // start-of-day in Tehran = start-of-day UTC minus 3:30
  const y = Number(key.slice(0, 4));
  const m = Number(key.slice(4, 6));
  const d = Number(key.slice(6, 8));
  return new Date(Date.UTC(y, m - 1, d) - TEHRAN_OFFSET_MS);
}

function faDigits(s: string | number): string {
  return String(s).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

export async function GET() {
  try {
    await requireAdmin();
    const now = new Date();

    const since60 = new Date(now.getTime() - 60 * 864e5);
    const todayKey = tehranDayKey(now);
    const todayStart = dayKeyToDate(todayKey);
    const yesterdayKey = tehranDayKey(new Date(now.getTime() - 864e5));
    const yesterdayStart = dayKeyToDate(yesterdayKey);
    const weekAgo = new Date(now.getTime() - 7 * 864e5);
    const monthAgo = new Date(now.getTime() - 30 * 864e5);
    // 14-day series window = start of the Tehran day 13 days ago
    const seriesStart = dayKeyToDate(tehranDayKey(new Date(now.getTime() - 13 * 864e5)));

    // threshold first — the bounded low-stock query depends on it
    const lowStockSetting = await db.setting.findUnique({ where: { key: "low_stock_threshold" } });
    const threshold = Number(lowStockSetting?.value ?? 5) || 5;

    const [
      statusGroup,
      revenue60Agg,
      revenueTodayAgg,
      revenueYesterdayAgg,
      revenueWeekAgg,
      revenueMonthAgg,
      ordersToday,
      mediaSum,
      seriesRows,
      buyerRows,
      itemsTopRows,
      provinceGroup,
      variantsLow,
      events,
      unreadMsgs,
      renewalPending,
      paymentsPending,
    ] = await Promise.all([
      // ── status distribution (all-time) — grouped in the DB ──
      db.order.groupBy({ by: ["status"], _count: { _all: true } }),

      // ── revenue windows — SUM aggregates, no row loading ──
      db.order.aggregate({ where: { status: { in: PAID_LIKE }, createdAt: { gte: since60 } }, _sum: { totalToman: true } }),
      db.order.aggregate({ where: { status: { in: PAID_LIKE }, createdAt: { gte: todayStart } }, _sum: { totalToman: true } }),
      db.order.aggregate({
        where: { status: { in: PAID_LIKE }, createdAt: { gte: yesterdayStart, lt: todayStart } },
        _sum: { totalToman: true },
      }),
      db.order.aggregate({ where: { status: { in: PAID_LIKE }, createdAt: { gte: weekAgo } }, _sum: { totalToman: true } }),
      db.order.aggregate({ where: { status: { in: PAID_LIKE }, createdAt: { gte: monthAgo } }, _sum: { totalToman: true } }),
      db.order.count({ where: { createdAt: { gte: todayStart } } }),
      db.order.aggregate({ where: { createdAt: { gte: since60 } }, _sum: { mediaCount: true } }),

      // ── 14-day series — the ONLY row-level pull (bounded to 14 days) ──
      db.order.findMany({
        where: { createdAt: { gte: seriesStart } },
        select: { status: true, totalToman: true, createdAt: true },
      }),

      // ── distinct buyers (paid-like) — phone+createdAt projection only;
      // orderer→user fallback grouped in JS (portable, P-06) ──
      db.order.findMany({
        where: { status: { in: PAID_LIKE } },
        select: { ordererPhone: true, userPhone: true, createdAt: true },
      }),

      // ── top products (60d paid-like) — bounded item pull + JS aggregate
      // (portable, P-06: SUM(qty*price) raw SQL was SQLite-only) ──
      db.orderItem.findMany({
        where: { order: { status: { in: PAID_LIKE }, createdAt: { gte: since60 } } },
        select: { titleSnapshot: true, qty: true, unitPriceToman: true },
      }),

      // ── top provinces (60d paid-like) — grouped in the DB (portable, P-06;
      // the old MIN(rowid) tie-break was SQLite-only → province-name tie-break) ──
      db.order.groupBy({
        by: ["province"],
        where: { status: { in: PAID_LIKE }, createdAt: { gte: since60 } },
        _count: { _all: true },
      }),

      // ── critical inventory — DB-filtered + bounded (no whole-shelf load) ──
      db.productVariant.findMany({
        where: { stock: { lte: threshold } },
        orderBy: { stock: "asc" },
        take: 6,
        select: { stock: true, product: { select: { name: true } } },
      }),

      // ── activity + queue depths (all bounded counts / take-14) ──
      db.orderEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: 14,
        include: { order: { select: { code: true } } },
      }),
      db.contactMessage.count({ where: { read: false } }),
      db.retentionRenewal.count({ where: { status: { in: ["awaiting_payment", "payment_under_review"] } } }),
      db.payment.count({ where: { status: "pending_review" } }),
    ]);

    // ── paid-like window aggregates (from the DB sums) ──
    const revenue60 = revenue60Agg._sum.totalToman ?? 0;
    const revenueToday = revenueTodayAgg._sum.totalToman ?? 0;
    const revenueYesterday = revenueYesterdayAgg._sum.totalToman ?? 0;
    const revenueWeek = revenueWeekAgg._sum.totalToman ?? 0;
    const revenueMonth = revenueMonthAgg._sum.totalToman ?? 0;

    // ── customers (distinct orderer phones, paid-like — orderer→user fallback) ──
    const phoneFirst = new Map<string, number>();
    for (const o of buyerRows) {
      const phone = (o.ordererPhone || "").trim() || (o.userPhone || "").trim();
      if (!phone) continue;
      const t = o.createdAt.getTime();
      const prev = phoneFirst.get(phone);
      if (prev === undefined || t < prev) phoneFirst.set(phone, t);
    }
    const newCustomersWeek = [...phoneFirst.values()].filter((t) => t >= weekAgo.getTime()).length;

    // ── 14-day series (Tehran days, fill empty days with zero) ──
    const byDay = new Map<string, { orders: number; revenue: number }>();
    for (const o of seriesRows) {
      const k = tehranDayKey(o.createdAt);
      const cur = byDay.get(k) ?? { orders: 0, revenue: 0 };
      cur.orders += 1;
      if (PAID_LIKE.includes(o.status)) cur.revenue += o.totalToman;
      byDay.set(k, cur);
    }
    const daily: { day: string; label: string; orders: number; revenue: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const k = tehranDayKey(new Date(now.getTime() - i * 864e5));
      const v = byDay.get(k) ?? { orders: 0, revenue: 0 };
      const j = g2j(new Date(dayKeyToDate(k).getTime() + 12 * 3600_000));
      daily.push({ day: k, label: `${faDigits(j.d)} ${JALALI_MONTHS[j.m - 1]}`, ...v });
    }

    // ── status distribution (all-time) ──
    const statusMap = new Map<string, number>(statusGroup.map((g) => [g.status, g._count._all]));

    // ── top products (JS aggregate over the bounded 60d item pull) ──
    const itemAgg = new Map<string, { qty: number; revenue: number }>();
    for (const it of itemsTopRows) {
      const cur = itemAgg.get(it.titleSnapshot) ?? { qty: 0, revenue: 0 };
      cur.qty += it.qty;
      cur.revenue += it.qty * it.unitPriceToman;
      itemAgg.set(it.titleSnapshot, cur);
    }
    const topProducts = [...itemAgg.entries()]
      .map(([title, v]) => ({ title, qty: v.qty, revenue: v.revenue }))
      .sort((a, b) => b.revenue - a.revenue || b.qty - a.qty || a.title.localeCompare(b.title, "fa"))
      .slice(0, 5);

    // ── top provinces (DB-grouped, deterministic name tie-break) ──
    const topProvinces = provinceGroup
      .map((g) => ({ province: g.province || "—", count: g._count._all }))
      .sort((a, b) => b.count - a.count || a.province.localeCompare(b.province, "fa"))
      .slice(0, 6);

    // ── low stock (bounded, DB-filtered) ──
    const lowStockList = variantsLow.map((v) => ({ title: v.product.name, stock: v.stock }));

    // ── queue depths ──
    const queue = {
      receipts: paymentsPending,
      packing: statusMap.get("paid") ?? 0,
      inTransit: statusMap.get("shipped") ?? 0,
      underReview: statusMap.get("payment_under_review") ?? 0,
      refundRequests: statusMap.get("refund_requested") ?? 0,
      expiringSoon: await db.order.count({
        where: { status: "awaiting_payment", expiresAt: { gt: now, lte: new Date(now.getTime() + 864e5) } },
      }),
    };

    const totalAll = [...statusMap.values()].reduce((a, b) => a + b, 0);
    const totalPaidLike = [...statusMap.entries()].filter(([s]) => PAID_LIKE.includes(s)).reduce((a, [, c]) => a + c, 0);
    const deliveredAll = statusMap.get("delivered") ?? 0;

    return NextResponse.json({
      generatedAt: now.toISOString(),
      kpis: {
        ordersTotal: totalAll,
        ordersToday,
        revenueToday,
        revenueYesterday,
        revenueWeek,
        revenueMonth,
        revenue60,
        avgOrder: totalPaidLike > 0 ? Math.round(revenue60 / totalPaidLike) : 0,
        customersCount: phoneFirst.size,
        newCustomersWeek,
        mediaAttachments: mediaSum._sum.mediaCount ?? 0,
        deliveredRate: totalPaidLike > 0 ? Math.round((deliveredAll / totalPaidLike) * 100) : 0,
      },
      queue,
      daily,
      statuses: [...statusMap.entries()].map(([status, count]) => ({ status, count })),
      topProducts,
      topProvinces,
      lowStock: lowStockList,
      unreadMessages: unreadMsgs,
      renewalPending,
      recentEvents: events.map((e) => ({
        id: e.id,
        orderCode: e.order.code,
        type: e.type,
        fromStatus: e.fromStatus,
        toStatus: e.toStatus,
        actor: e.actor,
        note: e.note,
        createdAt: e.createdAt,
      })),
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
