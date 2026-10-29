"use client";

// ── admin-focus — cross-tab navigation with context (UX-05/13/14/15, wave 38) ──
// The panel is one screen with 14 tabs; several flows need to JUMP to another
// tab AND carry context («دیدن رسید» → رسێدها scoped to one order, a donut
// slice → سفارش‌ها with that status filter, a PN code inside a message →
// سفارش‌ها searched by code, the media KPI → سفارش‌ها with hasMedia=1).
// A tiny module-level store + hook keeps admin.tsx the only place that owns
// the active tab, while every tab can request a focused navigation.

export type FocusRequest = {
  /** monotonically increasing — lets the shell re-act on identical requests */
  seq: number;
  tab: "orders" | "payments";
  /** سفارش‌ها: prefill the search box with an order code */
  orderCode?: string;
  /** سفارش‌ها: prefill the status filter */
  status?: string;
  /** سفارش‌ها: filter to orders with media attached */
  hasMedia?: boolean;
  /** رسیدها: scope the queue to one order's code */
  paymentOrderCode?: string;
};

let seq = 0;
let current: FocusRequest | null = null;
const listeners = new Set<(f: FocusRequest) => void>();

/** Fire-and-forget from ANY tab component. */
export function requestFocus(part: Omit<FocusRequest, "seq">): void {
  seq += 1;
  current = { ...part, seq };
  for (const l of listeners) l(current);
}

/** Subscribe (admin shell). Returns the unsubscribe fn. */
export function subscribeFocus(fn: (f: FocusRequest) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
