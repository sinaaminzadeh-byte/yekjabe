// ── orders/order-view.ts — customer-facing view of an order (client-safe) ──
// One honest mapping from the 11-state machine to Persian chips + intent
// helpers, shared by the dashboard (هدیه‌هام) and the track screen.
// Legacy demo orders (no status2) fall back to the classic 4-step chip.
import type { OrderStatus } from "./status";

export interface OrderChip {
  label: string;
  bg: string;
  fg?: string;
}

/** The classic 4-step legacy chip (demo orders + fallback). */
const LEGACY_CHIP: Record<string, OrderChip> = {
  paid: { label: "بسته‌بندی", bg: "#FFF3C9" },
  packing: { label: "بسته‌بندی", bg: "#FFF3C9" },
  shipped: { label: "در راه", bg: "#CDEFFB" },
  delivered: { label: "تحویل شد", bg: "#D7F5E4" },
};

/** Honest chips for every raw state of the 11-state machine (v2 orders). */
export const V2_CHIP: Record<OrderStatus, OrderChip> = {
  awaiting_payment: { label: "در انتظار پرداخت", bg: "#FFF3C9", fg: "#7A5C00" },
  payment_under_review: { label: "در انتظار تأیید پرداخت", bg: "#FFF3C9", fg: "#7A5C00" },
  paid: { label: "پرداخت شد", bg: "#FFF3C9" },
  preparing: { label: "در حال آماده‌سازی", bg: "#FFF3C9" },
  shipped: { label: "در راهه", bg: "#CDEFFB" },
  delivered: { label: "تحویل شد", bg: "#D7F5E4" },
  failed: { label: "پرداخت ناموفق", bg: "#FFE9F0", fg: "#B02A52" },
  cancelled: { label: "لغو شد", bg: "#F2F7F9", fg: "#4A6572" },
  expired: { label: "منقضی شد", bg: "#F2F7F9", fg: "#4A6572" },
  refund_requested: { label: "در جریان مرجوعی", bg: "#E7E0FA" },
  refunded: { label: "مرجوع شد", bg: "#E7E0FA" },
};

const REFUND_STATES: OrderStatus[] = ["refund_requested", "refunded"];

/** Minimal shape both dashboards and track already have. */
export interface OrderViewInput {
  dir: "sent" | "recv";
  v2?: boolean;
  status: string; // legacy 4-step for demo orders
  status2?: string; // raw 11-state
  opened?: boolean;
}

/**
 * The chip shown on cards:
 *  - v2 orders → the honest 11-state chip (the server wins; no fake «بسته‌بندی»
 *    for unpaid orders — legacyStep collapsed awaiting_payment into paid).
 *  - received gifts keep the message chip (پیام منتظرته / پیام رو دیدی).
 *  - legacy demo orders → classic 4-step chip.
 */
export function orderChip(o: OrderViewInput): OrderChip {
  if (o.v2 && o.dir === "recv") {
    return o.opened
      ? { label: "پیام رو دیدی", bg: "#D7F5E4" }
      : { label: "پیام منتظرته", bg: "#CDEFFB" };
  }
  if (o.v2 && o.status2) {
    const s = o.status2 as OrderStatus;
    if (V2_CHIP[s]) return V2_CHIP[s];
  }
  if (o.dir === "recv") {
    return o.opened
      ? { label: "پیام رو دیدی", bg: "#D7F5E4" }
      : { label: "پیام منتظرته", bg: "#CDEFFB" };
  }
  return LEGACY_CHIP[o.status] ?? { label: o.status, bg: "#F2F7F9" };
}

/** States where the customer still owes us money (or is between receipt review). */
export function isAwaitingPayment(o: OrderViewInput): boolean {
  return Boolean(o.v2) && o.dir === "sent" && o.status2 === "awaiting_payment";
}

/** Receipt uploaded, waiting for the owner to confirm (honest amber state). */
export function isUnderReview(o: OrderViewInput): boolean {
  return Boolean(o.v2) && o.dir === "sent" && o.status2 === "payment_under_review";
}

/** Dead orders — nothing left to do but build a new gift. */
export function isDeadOrder(o: OrderViewInput): boolean {
  return (
    Boolean(o.v2) &&
    o.dir === "sent" &&
    (o.status2 === "expired" || o.status2 === "cancelled" || o.status2 === "failed")
  );
}

/** Sent orders that are on the physical journey (preparing → delivered). */
export function isOnJourney(o: OrderViewInput): boolean {
  return (
    Boolean(o.v2) &&
    o.dir === "sent" &&
    (o.status2 === "paid" ||
      o.status2 === "preparing" ||
      o.status2 === "shipped" ||
      o.status2 === "delivered" ||
      REFUND_STATES.includes(o.status2 as OrderStatus))
  );
}
