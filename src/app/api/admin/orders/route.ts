// ── GET /api/admin/orders — admin console list (admin session required) ──
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth/session";
import { ORDER_STATUSES } from "@/lib/orders/status";

export async function GET(req: Request) {
  try {
    await requireAdmin();
    const url = new URL(req.url);
    const status = url.searchParams.get("status") ?? "";
    const q = (url.searchParams.get("q") ?? "").trim().slice(0, 40);

    const where: {
      status?: string;
      OR?: { code?: { contains: string }; recipientName?: { contains: string }; recipientPhone?: { contains: string }; ordererPhone?: { contains: string }; ordererFirstName?: { contains: string } }[];
    } = {};
    if (ORDER_STATUSES.includes(status as never)) where.status = status;
    if (q)
      where.OR = [
        { code: { contains: q } },
        { recipientName: { contains: q } },
        { recipientPhone: { contains: q } },
        { ordererPhone: { contains: q } },
        { ordererFirstName: { contains: q } },
      ];

    const orders = await db.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 60,
      include: {
        items: { select: { titleSnapshot: true, qty: true } },
        payments: { orderBy: { createdAt: "desc" }, take: 1, select: { method: true, status: true, attemptNo: true } },
      },
    });
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
      })),
    });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
