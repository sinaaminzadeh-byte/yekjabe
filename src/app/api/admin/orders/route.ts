// ── GET /api/admin/orders — admin console list (admin session required) ──
// A-10/UX-07: real server-side pagination + server-side search + status
// filter. The old shape returned at most 60 recent orders and the UI searched
// only inside them; now page/pageSize/status/q are first-class params and the
// response carries { total, page, pages, stats } so the KPI cards stay honest
// regardless of the visible page. Bounded queries only.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";
import { ORDER_STATUSES } from "@/lib/orders/status";

// statuses that count as real money (matches the dashboard rule)
const PAID_LIKE = ["paid", "preparing", "shipped", "delivered", "refund_requested", "refunded"];

const PAGE_SIZE_DEFAULT = 20;
const PAGE_SIZE_MAX = 60;

export async function GET(req: Request) {
  try {
    await requireAdmin();
    const url = new URL(req.url);
    const status = url.searchParams.get("status") ?? "";
    const q = (url.searchParams.get("q") ?? "").trim().slice(0, 40);
    // UX-13 — داشبورد KPI «پیوست رسانه‌ای» jumps here with hasMedia=1 so the
    // owner sees exactly the orders that carry customer attachments
    const hasMedia = url.searchParams.get("hasMedia") === "1";
    const page = Math.max(1, Math.min(500, Number(url.searchParams.get("page") ?? "1") || 1));
    const pageSize = Math.max(5, Math.min(PAGE_SIZE_MAX, Number(url.searchParams.get("pageSize") ?? String(PAGE_SIZE_DEFAULT)) || PAGE_SIZE_DEFAULT));

    const where: {
      status?: string;
      mediaCount?: { gt: number };
      OR?: { code?: { contains: string }; recipientName?: { contains: string }; recipientPhone?: { contains: string }; ordererPhone?: { contains: string }; ordererFirstName?: { contains: string } }[];
    } = {};
    if (ORDER_STATUSES.includes(status as never)) where.status = status;
    if (hasMedia) where.mediaCount = { gt: 0 };
    if (q)
      where.OR = [
        { code: { contains: q } },
        { recipientName: { contains: q } },
        { recipientPhone: { contains: q } },
        { ordererPhone: { contains: q } },
        { ordererFirstName: { contains: q } },
      ];

    const [orders, total, allCount, revenueAgg, pendingReview, delivered] = await Promise.all([
      db.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          items: { select: { titleSnapshot: true, qty: true } },
          payments: { orderBy: { createdAt: "desc" }, take: 1, select: { method: true, status: true, attemptNo: true } },
        },
      }),
      db.order.count({ where }),
      db.order.count(),
      db.order.aggregate({ where: { status: { in: PAID_LIKE } }, _sum: { totalToman: true } }),
      db.order.count({ where: { status: "payment_under_review" } }),
      db.order.count({ where: { status: "delivered" } }),
    ]);

    return NextResponse.json({
      orders: orders.map((o) => ({
        id: o.id,
        code: o.code,
        status: o.status,
        paymentMethod: o.paymentMethod,
        recipientName: o.recipientName,
        recipientPhone: o.recipientPhone.replace(/^(\d{4})(\d{3})(\d{4})$/, "$1 *** $3"),
        ordererName: [o.ordererFirstName, o.ordererLastName].filter(Boolean).join(" "),
        ordererPhone: o.ordererPhone.replace(/^(\d{4})(\d{3})(\d{4})$/, "$1 *** $3"),
        province: o.province,
        city: o.city,
        totalToman: o.totalToman,
        items: o.items.map((i) => `${i.titleSnapshot} ×${i.qty}`),
        payment: o.payments[0] ?? null,
        giftOpened: o.giftOpened,
        createdAt: o.createdAt,
        expiresAt: o.expiresAt,
        // new-flow payload (owner round 30): media studio + retention + sender display
        mediaCount: o.mediaCount,
        retentionPlan: o.retentionPlan,
        senderDisplay: o.senderDisplay,
        senderPhrase: o.senderPhrase,
      })),
      // pager + honest totals (UX-07/A-10)
      total,
      page,
      pageSize,
      pages: Math.max(1, Math.ceil(total / pageSize)),
      // whole-shop stats so the top cards don't lie while paging/filtering
      stats: {
        count: allCount,
        revenue: revenueAgg._sum.totalToman ?? 0,
        pendingReview,
        delivered,
      },
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e, "/api/admin/orders");
    return NextResponse.json(body, { status });
  }
}
