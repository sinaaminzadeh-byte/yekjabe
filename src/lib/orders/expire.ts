// ── orders/expire.ts — payment-window expiry (reservation release) ──
// Card-to-card orders reserve stock for a 10-minute window (owner decision,
// «رزرو ۱۰ دقیقه‌ای»): expiresAt = createdAt + 10min for manual_transfer,
// 24h for zarinpal. Stock is released by transitionOrder when the order
// reaches expired — the same path works for lazy checks and the cron job.
import { db } from "../db";
import { transitionOrder } from "./transition";
import type { OrderStatus } from "./status";

/** States whose stock is still held (transition releases on expiry). */
const EXPIRABLE: OrderStatus[] = ["awaiting_payment", "failed"];

export const MANUAL_WINDOW_MINUTES = 10;

/** True when the order's payment window has passed. */
export function windowEnded(o: { status: string; expiresAt: Date }): boolean {
  return (
    EXPIRABLE.includes(o.status as OrderStatus) &&
    o.expiresAt.getTime() < Date.now()
  );
}

/**
 * Lazy single-order expiry: called on read/write paths (status ACK, receipt
 * upload, order detail) so a quiet store still releases stock on time even
 * without the cron tick. Idempotent — safe to call on any order.
 */
export async function expireOrderIfDue(orderId: string): Promise<void> {
  const o = await db.order.findUnique({
    where: { id: orderId },
    select: { id: true, status: true, expiresAt: true },
  });
  if (!o || !windowEnded(o)) return;
  try {
    await transitionOrder(o.id, "expired", { actor: "system", note: "payment window ended" });
  } catch {
    /* raced with another check/cron — fine */
  }
}

/**
 * Batch expiry for the internal scheduler + /api/jobs/expire-unpaid.
 * Returns how many orders were expired.
 */
export async function expireDueOrders(take = 100): Promise<number> {
  const stale = await db.order.findMany({
    where: { status: { in: EXPIRABLE }, expiresAt: { lt: new Date() } },
    select: { id: true },
    take,
  });
  let n = 0;
  for (const o of stale) {
    try {
      await transitionOrder(o.id, "expired", { actor: "system", note: "payment window ended (sweep)" });
      n += 1;
    } catch {
      /* raced — next tick */
    }
  }
  return n;
}
