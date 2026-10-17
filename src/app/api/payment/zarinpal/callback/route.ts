// ── GET /api/payment/zarinpal/callback — the PSP round trip (guide §4.9) ──
// Redirects (302) back to the SPA success page; all state changes here are real.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { transitionOrder } from "@/lib/orders/transition";
import { zarinpalVerify } from "@/lib/orders/checkout";

function redirect(url: string): NextResponse {
  return new NextResponse(null, { status: 302, headers: { Location: url } });
}

function successUrl(code: string): string {
  return `${process.env.SITE_URL ?? "http://localhost:3000"}/success?code=${encodeURIComponent(code)}`;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const authority = (url.searchParams.get("Authority") ?? "").slice(0, 80);
    const status = url.searchParams.get("Status") ?? "";
    if (!authority) return redirect(successUrl(""));

    const payment = await db.payment.findFirst({ where: { authority }, include: { order: true } });
    if (!payment) return redirect(successUrl(""));
    const order = payment.order;
    const failRedirect = redirect(successUrl(order.code));

    // user hit «انصراف» on the gateway
    if (status !== "OK") {
      if (order.status === "awaiting_payment" && payment.status === "initiated") {
        await db.payment.update({ where: { id: payment.id }, data: { status: "failed" } }).catch(() => {});
        await transitionOrder(order.id, "failed", { actor: "psp", note: "gateway_cancelled" }).catch(() => {});
      }
      return failRedirect;
    }

    // idempotent: already verified → straight to success
    if (payment.status === "verified") return redirect(successUrl(order.code));
    if (order.status !== "awaiting_payment") return redirect(successUrl(order.code));

    // verify with the DB amount (never the returned one) — IRR ×10 inside
    const v = await zarinpalVerify(authority, payment.amountToman);
    if (!v.ok) {
      await db.payment.update({ where: { id: payment.id }, data: { status: "failed", refId: v.reason ?? "" } }).catch(() => {});
      await transitionOrder(order.id, "failed", { actor: "psp", note: v.reason ?? "verify_failed" }).catch(() => {});
      return failRedirect;
    }

    // mark paid with a status guard, then transition (one tx)
    const upd = await db.payment.updateMany({
      where: { id: payment.id, status: "initiated" },
      data: { status: "verified", refId: v.refId ?? "" },
    });
    if (upd.count === 1) {
      await transitionOrder(order.id, "paid", { actor: "psp", actorId: "zarinpal", meta: { refId: v.refId ?? "", authority } });
    }
    return redirect(successUrl(order.code));
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
