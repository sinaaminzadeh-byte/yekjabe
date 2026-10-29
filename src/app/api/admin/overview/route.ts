// ── GET /api/admin/overview — داشبورد aggregation (round 33) ──
// One round-trip that feeds the whole «داشبورد» tab:
//   KPIs (sales/orders/queue depths) + 14-day revenue series (Tehran days)
//   + status distribution + top products + top provinces + recent activity.
// All money figures are TOMAN, server-authoritative, paid-like statuses only.
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

    // ── raw pulls (bounded: orders of the last 60 days for series + aggregates) ──
    const since = new Date(now.getTime() - 60 * 864e5);
    const [orders60, statusGroup, paidPhones, itemsTop, provinceTop, events, unreadMsgs, renewalPending, variants, lowStockSetting, paymentsPending] =
      await Promise.all([
        db.order.findMany({
          where: { createdAt: { gte: since } },
          select: {
            status: true,
            totalToman: true,
            createdAt: true,
            ordererPhone: true,
            userPhone: true,
            province: true,
            mediaCount: true,
          },
        }),
        db.order.groupBy({ by: ["status"], _count: { _all: true } }),
        db.order.findMany({
          where: { status: { in: PAID_LIKE } },
          select: { ordererPhone: true, userPhone: true, createdAt: true },
          orderBy: { createdAt: "asc" },
        }),
        db.orderItem.findMany({
          where: { order: { status: { in: PAID_LIKE }, createdAt: { gte: since } } },
          select: { titleSnapshot: true, qty: true, unitPriceToman: true },
        }),
        db.order.findMany({
          where: { status: { in: PAID_LIKE }, createdAt: { gte: since } },
          select: { province: true },
        }),
        db.orderEvent.findMany({
          orderBy: { createdAt: "desc" },
          take: 14,
          include: { order: { select: { code: true } } },
        }),
        db.contactMessage.count({ where: { read: false } }),
        db.retentionRenewal.count({ where: { status: { in: ["awaiting_payment", "payment_under_review"] } } }),
        db.productVariant.findMany({
          select: { stock: true, product: { select: { name: true } } },
        }),
        db.setting.findUnique({ where: { key: "low_stock_threshold" } }),
        db.payment.count({ where: { status: "pending_review" } }),
      ]);

    const threshold = Number(lowStockSetting?.value ?? 5) || 5;

    // ── paid-like window aggregates ──
    const paid = orders60.filter((o) => PAID_LIKE.includes(o.status));
    const revenue60 = paid.reduce((a, o) => a + o.totalToman, 0);

    const todayKey = tehranDayKey(now);
    const yesterdayKey = tehranDayKey(new Date(now.getTime() - 864e5));
    const weekAgo = new Date(now.getTime() - 7 * 864e5);
    const monthAgo = new Date(now.getTime() - 30 * 864e5);

    const ordersToday = orders60.filter((o) => tehranDayKey(o.createdAt) === todayKey).length;
    const revenueToday = paid.filter((o) => tehranDayKey(o.createdAt) === todayKey).reduce((a, o) => a + o.totalToman, 0);
    const revenueYesterday = paid.filter((o) => tehranDayKey(o.createdAt) === yesterdayKey).reduce((a, o) => a + o.totalToman, 0);
    const revenueWeek = paid.filter((o) => o.createdAt >= weekAgo).reduce((a, o) => a + o.totalToman, 0);
    const revenueMonth = paid.filter((o) => o.createdAt >= monthAgo).reduce((a, o) => a + o.totalToman, 0);

    // ── customers (distinct orderer phones, paid-like) ──
    const phoneSet = new Set<string>();
    const phoneFirst = new Map<string, number>();
    for (const o of paidPhones) {
      const p = o.ordererPhone || o.userPhone;
      if (!p) continue;
      if (!phoneSet.has(p)) phoneFirst.set(p, o.createdAt.getTime());
      phoneSet.add(p);
    }
    const newCustomersWeek = [...phoneFirst.values()].filter((t) => t >= weekAgo.getTime()).length;

    // ── 14-day series (Tehran days, fill empty days with zero) ──
    const byDay = new Map<string, { orders: number; revenue: number }>();
    for (const o of orders60) {
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

    // ── top products (60d paid-like) ──
    const prodMap = new Map<string, { qty: number; revenue: number }>();
    for (const it of itemsTop) {
      const cur = prodMap.get(it.titleSnapshot) ?? { qty: 0, revenue: 0 };
      cur.qty += it.qty;
      cur.revenue += it.qty * it.unitPriceToman;
      prodMap.set(it.titleSnapshot, cur);
    }
    const topProducts = [...prodMap.entries()]
      .map(([title, v]) => ({ title, ...v }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // ── top provinces (60d paid-like) ──
    const provMap = new Map<string, number>();
    for (const o of provinceTop) {
      const p = o.province || "—";
      provMap.set(p, (provMap.get(p) ?? 0) + 1);
    }
    const topProvinces = [...provMap.entries()]
      .map(([province, count]) => ({ province, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // ── low stock ──
    const lowStock = variants
      .filter((v) => v.stock <= threshold)
      .map((v) => ({ title: v.product.name, stock: v.stock }))
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 6);

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
        customersCount: phoneSet.size,
        newCustomersWeek,
        mediaAttachments: orders60.reduce((a, o) => a + o.mediaCount, 0),
        deliveredRate: totalPaidLike > 0 ? Math.round((deliveredAll / totalPaidLike) * 100) : 0,
      },
      queue,
      daily,
      statuses: [...statusMap.entries()].map(([status, count]) => ({ status, count })),
      topProducts,
      topProvinces,
      lowStock,
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
