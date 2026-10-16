// ── /api/gifts/{code}/renew — message-retention renewal (mission §۴) ──
// POST: a sender OR recipient of the order requests a paid extension (6m/12m).
//   • price is snapshotted SERVER-side from Setting (never from the browser)
//   • one live renewal per order at a time (existing awaiting/under-review is
//     returned instead of duplicated — replay-safe)
//   • purged content can NOT be renewed (no fake recovery, honest 409)
// GET : the caller's renewals for this order (status of «تمدید» in the UI).
// Approval happens ONLY in the admin payments queue after receipt review.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, getSession } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { nextRenewalCode } from "@/lib/orders/code";
import { isRetentionPlan, messageState } from "@/lib/orders/retention";

async function loadAuthorizedOrder(code: string, phone: string) {
  const order = await db.order.findUnique({
    where: { code },
    select: {
      id: true,
      code: true,
      status: true,
      recipientPhone: true,
      userPhone: true,
      senderPhone: true,
      retentionPlan: true,
      messageShownAt: true,
      messageExpiresAt: true,
      messagePurgeStatus: true,
    },
  });
  // same generic 404 for "not found" and "not yours" — no enumeration
  if (!order) throw new AppError(404, "not_found");
  const mine = order.recipientPhone === phone || order.userPhone === phone || order.senderPhone === phone;
  if (!mine) throw new AppError(404, "not_found");
  return order;
}

export async function POST(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code: rawCode } = await params;
  try {
    assertSameOrigin(req);
    await rateLimit("gift_renew", clientIp(req), 10, 3600);
    const code = decodeURIComponent(rawCode).trim().toUpperCase();
    if (!/^PN-\d{6}-\d{4}$/.test(code)) throw new AppError(404, "not_found");

    const session = await getSession("customer");
    if (!session) throw new AppError(401, "unauthenticated");
    const order = await loadAuthorizedOrder(code, session.phone);

    const body = (await req.json().catch(() => ({}))) as { plan?: string };
    const plan = String(body.plan ?? "");
    if (!isRetentionPlan(plan) || plan === "1m") throw new AppError(400, "bad_input", { fields: ["plan: 6m|12m"] });

    // a purged message can NOT be renewed — the content is genuinely gone
    if (order.messagePurgeStatus === "purged") throw new AppError(409, "purged_not_renewable");
    const st = messageState(order);
    if (st === "unopened") throw new AppError(409, "not_displayed_yet"); // clock never started → nothing to extend

    // replay-safe: return the live renewal instead of creating a duplicate
    const live = await db.retentionRenewal.findFirst({
      where: { orderId: order.id, status: { in: ["awaiting_payment", "payment_under_review"] } },
      orderBy: { createdAt: "desc" },
    });
    if (live) {
      return NextResponse.json(renewalPublic(live, order.code), { status: 200 });
    }

    // price from Setting — snapshot at request time
    const settings = await db.setting.findMany({
      where: { key: { in: [`retention_${plan}_price_toman`, "manual_card_number", "manual_card_sheba", "manual_card_name"] } },
    });
    const smap: Record<string, string> = {};
    for (const s of settings) smap[s.key] = s.value;
    const price = Number(smap[`retention_${plan}_price_toman`] ?? 0);
    if (!Number.isFinite(price) || price <= 0) throw new AppError(500, "price_not_configured");

    const renewal = await db.$transaction(async (tx) => {
      const rcode = await nextRenewalCode(tx);
      return tx.retentionRenewal.create({
        data: { code: rcode, orderId: order.id, plan, priceToman: price, requestedByPhone: session.phone },
      });
    });
    await db.orderEvent
      .create({
        data: {
          orderId: order.id,
          type: "note",
          note: "retention_renewal_requested",
          actor: "customer",
          meta: JSON.stringify({ renewalCode: renewal.code, plan, priceToman: price }),
        },
      })
      .catch(() => {});

    return NextResponse.json(
      {
        ...renewalPublic(renewal, order.code),
        instructions: {
          cardNumber: smap.manual_card_number ?? "",
          sheba: smap.manual_card_sheba ?? "",
          cardName: smap.manual_card_name ?? "",
          amount: String(price),
          code: renewal.code,
        },
      },
      { status: 201 },
    );
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code: rawCode } = await params;
  try {
    const code = decodeURIComponent(rawCode).trim().toUpperCase();
    if (!/^PN-\d{6}-\d{4}$/.test(code)) throw new AppError(404, "not_found");
    const session = await getSession("customer");
    if (!session) throw new AppError(401, "unauthenticated");
    const order = await loadAuthorizedOrder(code, session.phone);
    const rows = await db.retentionRenewal.findMany({
      where: { orderId: order.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return NextResponse.json({ renewals: rows.map((r) => renewalPublic(r, order.code)) });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

function renewalPublic(
  r: { id: string; code: string; plan: string; priceToman: number; status: string; cancelReason: string; createdAt: Date; appliedAt: Date | null },
  orderCode: string,
) {
  return {
    id: r.id,
    code: r.code,
    orderCode,
    plan: r.plan,
    priceToman: r.priceToman,
    status: r.status, // awaiting_payment | payment_under_review | paid | cancelled
    cancelReason: r.cancelReason,
    createdAt: r.createdAt.toISOString(),
    appliedAt: r.appliedAt ? r.appliedAt.toISOString() : null,
  };
}
