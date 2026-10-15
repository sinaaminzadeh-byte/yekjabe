// ── orders/transition.ts — guarded, atomic, SMS-attached transitions (guide §4.8) ──
import type { Prisma } from "@prisma/client";
import { db } from "../db";
import { withWriteRetry } from "../db-write";
import { AppError } from "../errors";
import { enqueueSms } from "../sms";
import type { OrderStatus } from "./status";
import { TRANSITIONS, UNPAID_STATUSES } from "./status";

export type ActorType = "customer" | "admin" | "owner" | "psp" | "system";

export interface TransitionActor {
  actor: ActorType;
  actorId?: string;
  note?: string;
  meta?: Record<string, unknown>;
  expectFrom?: OrderStatus;
}

type Tx = Prisma.TransactionClient;

export async function transitionOrder(
  orderId: string,
  to: OrderStatus,
  a: TransitionActor,
  outerTx?: Tx,
): Promise<Prisma.BatchPayload | void> {
  const run = async (tx: Tx) => {
    const cur = await tx.order.findUniqueOrThrow({ where: { id: orderId }, include: { items: true } });
    const from = cur.status as OrderStatus;
    if (!TRANSITIONS[from]?.includes(to)) throw new AppError(409, "invalid_transition", { from, to });
    if (a.expectFrom && a.expectFrom !== from) throw new AppError(409, "concurrent_update", { from });

    // conditional write — if the status changed between read and write, count=0
    const r = await tx.order.updateMany({ where: { id: orderId, status: from }, data: { status: to } });
    if (r.count !== 1) throw new AppError(409, "concurrent_update", { from });

    // stock release: only when an UNPAID order is cancelled/expired
    if ((to === "cancelled" || to === "expired") && UNPAID_STATUSES.includes(from)) {
      for (const it of cur.items) {
        await tx.productVariant.update({ where: { id: it.variantId }, data: { stock: { increment: it.qty } } });
      }
    }

    await tx.orderEvent.create({
      data: {
        orderId,
        type: "status_changed",
        fromStatus: from,
        toStatus: to,
        actor: a.actor,
        actorId: a.actorId ?? "",
        note: a.note ?? "",
        meta: a.meta ? JSON.stringify(a.meta) : "{}",
      },
    });

    await enqueueSmsForTransition(tx, cur, from, to, a);
    return r;
  };
  if (outerTx) return run(outerTx);
  return withWriteRetry(() => db.$transaction(run, { timeout: 10_000 }));
}

/** One SMS per transition — to the SENDER (cost policy: ≤2 SMS/order). */
async function enqueueSmsForTransition(tx: Tx, order: { code: string; userPhone: string; senderPhone: string }, _from: OrderStatus, to: OrderStatus, a: TransitionActor): Promise<void> {
  const phone = order.userPhone || order.senderPhone;
  if (!phone) return;
  switch (to) {
    case "paid":
      await enqueueSms(tx, { phone, template: "paid", params: { code: order.code } });
      break;
    case "payment_under_review":
      await enqueueSms(tx, { phone, template: "receipt_received", params: { code: order.code } });
      break;
    case "cancelled":
      await enqueueSms(tx, { phone, template: "cancelled", params: { code: order.code } });
      break;
    case "shipped":
      await enqueueSms(tx, { phone, template: "shipped", params: { code: order.code, tracking: a.meta?.tracking ? String(a.meta.tracking) : "" } });
      break;
    case "delivered":
      await enqueueSms(tx, { phone, template: "delivered", params: { code: order.code } });
      break;
    default:
      break; // awaiting_payment/failed/expired/... → silent (SMS cost law)
  }
}
