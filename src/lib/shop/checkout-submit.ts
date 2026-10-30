// ── lib/shop/checkout-submit.ts — the ONE shared checkout-logic module (A-03) ──
// The mobile flow (screens/flow.tsx) and the desktop wizard (screens/builder.tsx)
// are two DELIBERATE UX shells (owner decision — both stay), but their checkout
// LOGIC was written twice. This module is the single home for the pieces both
// shells share; pure functions only — no React imports, no rendering.
//
// Where the actual REQUEST lives (verified during A-03 — do NOT duplicate again):
//   • payload assembly + POST /api/checkout + Idempotency-Key + the optimistic
//     `o-local-<code>` mirror  →  `submitCheckout()` in src/lib/pishnam-store.ts
//     (server-authoritative pricing per AGENTS.md §۲.۵ — the client never
//     builds a payable amount)
//   • ack handling (zarinpal redirect / manual-transfer panel / 10-min
//     countdown)  →  the single PayModal (screens/pay-modal.tsx), mounted once
//     in src/app/page.tsx and opened exclusively through the event below
// Both wizards only DECIDE whether payment may open (evaluateCheckoutGate) and
// TRIGGER it (payNow) — the shells keep their own visuals and copy.
import type { Orderer, Receiver } from "@/lib/pishnam-store";

/** The window event that opens the shared PayModal — the only pay trigger. */
export const PAY_EVENT = "pishnam:pay";

/** Persian (۰-۹) + Arabic (٠-٩) digits → Latin (mirror of lib/auth/phone.ts). */
export function faToEnDigits(s: string): string {
  return s
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

/** Any phone input → bare Latin digits (spaces/dashes/separators stripped). */
export function digitsOnly(s: string): string {
  return faToEnDigits(s).replace(/\D/g, "");
}

/** Strict Iranian-mobile law — the same rule the server enforces (09xxxxxxxxx). */
export function isValidIranMobile(v: string): boolean {
  return /^09\d{9}$/.test(digitsOnly(v));
}

/** Missing receiver fields, in the order the UX surfaces them. */
export type ReceiverGap = "name" | "phone" | "address";

export function receiverGaps(r: Receiver): ReceiverGap[] {
  const gaps: ReceiverGap[] = [];
  if (r.name.trim() === "") gaps.push("name");
  if (r.phone.trim().length < 8) gaps.push("phone");
  if (r.address.trim() === "") gaps.push("address");
  return gaps;
}

export function isReceiverComplete(r: Receiver): boolean {
  return receiverGaps(r).length === 0;
}

export interface CheckoutGate {
  /** receiver block complete (drives the green «کامل شد» chip) */
  receiverOk: boolean;
  /** pay button unlocked: receiver complete AND orderer phone verified */
  canPay: boolean;
  /** first thing to fix — «orderer» = OTP gate still open; null = ready */
  firstGap: ReceiverGap | "orderer" | null;
}

/**
 * The pay gate — was duplicated verbatim in MobileCheckout and DesktopBuilder
 * (`valid`/`canPay` + first-missing-step ordering). Server re-validates the
 * same laws on POST /api/checkout (orderer_not_verified / bad_input).
 */
export function evaluateCheckoutGate(input: { receiver: Receiver; ordererVerified: boolean }): CheckoutGate {
  const gaps = receiverGaps(input.receiver);
  const receiverOk = gaps.length === 0;
  return {
    receiverOk,
    canPay: receiverOk && input.ordererVerified,
    firstGap: gaps[0] ?? (input.ordererVerified ? null : "orderer"),
  };
}

/**
 * Orderer prefill from a live account — was duplicated verbatim in both
 * wizards («اگه قبلاً حساب داری، از همون استفاده کن»). Returns the partial
 * patch to apply, or null when there is nothing to fill.
 */
export function ordererPrefill(orderer: Orderer, user: { phone: string; name: string } | null): Partial<Orderer> | null {
  if (!user || orderer.name) return null;
  return { name: orderer.name || user.name, phone: orderer.phone || user.phone };
}

/** The ONE way any screen opens payment — both wizards call this. */
export function payNow(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(PAY_EVENT));
}
