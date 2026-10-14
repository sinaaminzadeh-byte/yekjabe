// ── orders/status.ts — the 11-state machine (guide §4.8, critic MUST-FIX #6) ──
// Lowercase, forward-only. Shared between server and client (no server imports).

export type OrderStatus =
  | "awaiting_payment"
  | "payment_under_review"
  | "paid"
  | "preparing"
  | "shipped"
  | "delivered"
  | "failed"
  | "cancelled"
  | "expired"
  | "refund_requested"
  | "refunded";

export const ORDER_STATUSES: OrderStatus[] = [
  "awaiting_payment",
  "payment_under_review",
  "paid",
  "preparing",
  "shipped",
  "delivered",
  "failed",
  "cancelled",
  "expired",
  "refund_requested",
  "refunded",
];

export const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  awaiting_payment: ["paid", "payment_under_review", "failed", "cancelled", "expired"],
  payment_under_review: ["paid", "awaiting_payment", "cancelled"],
  failed: ["awaiting_payment", "expired"],
  paid: ["preparing", "cancelled"], // cancel after payment = owner only
  preparing: ["shipped", "cancelled"], // cancel after payment = owner only
  shipped: ["delivered", "refund_requested"],
  delivered: ["refund_requested"],
  refund_requested: ["refunded", "delivered"],
  cancelled: [],
  expired: [],
  refunded: [],
};

/** Unpaid states — stock must be released when leaving them to cancelled/expired. */
export const UNPAID_STATUSES: OrderStatus[] = ["awaiting_payment", "payment_under_review", "failed"];

/** Terminus states — nothing moves out of these. */
export function isTerminal(s: OrderStatus): boolean {
  return TRANSITIONS[s].length === 0;
}

// ── Customer view: 11 states → 5 Persian steps (+ terminal chips) ──
// payment_under_review NEVER leaks as a distinct state to customers (guide §4.8).

export type CustomerStep = "awaiting_payment" | "preparing" | "shipped" | "delivered" | "cancelled" | "expired" | "refund";

export function customerStep(s: OrderStatus): CustomerStep {
  switch (s) {
    case "awaiting_payment":
    case "failed":
      return "awaiting_payment";
    case "payment_under_review":
      return "awaiting_payment"; // displayed as «در انتظار پرداخت»
    case "paid":
    case "preparing":
      return "preparing";
    case "shipped":
      return "shipped";
    case "delivered":
      return "delivered";
    case "cancelled":
      return "cancelled";
    case "expired":
      return "expired";
    case "refund_requested":
    case "refunded":
      return "refund";
  }
}

export const STEP_LABELS: Record<CustomerStep, string> = {
  awaiting_payment: "در انتظار پرداخت",
  preparing: "در حال آماده‌سازی",
  shipped: "در راهه",
  delivered: "تحویل شد",
  cancelled: "لغو شد",
  expired: "منقضی شد",
  refund: "در جریان مرجوعی",
};

export const STEP_SUBTITLES: Record<CustomerStep, string> = {
  awaiting_payment: "هدیه‌ت منتظر پرداخته.",
  preparing: "پرداخت شد! داریم جعبه رو با دلسوزی می‌چینیم.",
  shipped: "جعبه تحویل پست شد؛ به‌زودی می‌رسه.",
  delivered: "جعبه رسید! حالا نوبت رمز کارته.",
  cancelled: "این سفارش لغو شده. اگه اشتباهه با ما در تماس باش.",
  expired: "این سفارش منقضی شد؛ می‌تونی دوباره سفارش بدی.",
  refund: "درخواست مرجوعیت در جریانه.",
};

/** The 4 classic display steps (paid/packing/shipped/delivered) for legacy UI parts. */
export function legacyStep(s: OrderStatus): "paid" | "packing" | "shipped" | "delivered" {
  const cs = customerStep(s);
  return cs === "shipped" ? "shipped" : cs === "delivered" ? "delivered" : cs === "preparing" ? "packing" : "paid";
}
