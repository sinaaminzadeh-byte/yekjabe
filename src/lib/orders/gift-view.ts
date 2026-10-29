// ── orders/gift-view.ts — recipient-facing serialization (mission §۱/§۳) ──
// ONE source of truth for what a recipient may see. Anonymous is NOT a CSS
// trick: senderName/senderPhrase/senderPhone never leave the server in anon
// mode, on ANY surface (list, view, open, bootstrap).
import { messageState } from "./retention";

export type GiftPrivacyRow = {
  anonymous: boolean;
  senderDisplay: string;
  senderName: string;
  senderPhrase: string;
};

export interface SenderLabel {
  mode: "name" | "phrase" | "anon";
  label: string;
}

export const ANON_LABEL = "یه هدیه برای تو";

/**
 * Legacy rows (pre-privacy) only have `anonymous` — they map to anon. Real
 * name is returned only when the sender chose «نمایش نام».
 */
export function senderLabelFor(o: GiftPrivacyRow): SenderLabel {
  if (o.anonymous || o.senderDisplay === "anon") return { mode: "anon", label: ANON_LABEL };
  if (o.senderDisplay === "phrase" && o.senderPhrase.trim().length >= 2) {
    return { mode: "phrase", label: o.senderPhrase.trim() };
  }
  const name = o.senderName.trim();
  return name.length > 0 ? { mode: "name", label: name } : { mode: "anon", label: ANON_LABEL };
}

/** A viewable order = the gift box is physically on its way / arrived. */
export function isViewableStatus(status: string): boolean {
  return status === "shipped" || status === "delivered";
}

/**
 * Owner round 29 law — «سیستم چک می‌کنه این شماره اصلاً به‌عنوان مشتری بسته‌ای
 * براش ثبت شده یا نه»: the display page asks this BEFORE spending an SMS.
 * Counts only (no PII, no content):
 *  - viewable: shipped | delivered  → پیام‌ها الان قابل باز شدن‌اند
 *  - pending : paid | packing       → جعبه آماده/در حال ارسال است
 * awaiting_payment / expired / cancelled never count — an unpaid or dead
 * order must not reveal that a gift was ever drafted for this phone.
 */
export async function recipientPackageCounts(phone: string): Promise<{ viewable: number; pending: number }> {
  const { db } = await import("../db");
  const [viewable, pending] = await Promise.all([
    db.order.count({ where: { recipientPhone: phone, status: { in: ["shipped", "delivered"] } } }),
    db.order.count({ where: { recipientPhone: phone, status: { in: ["paid", "packing"] } } }),
  ]);
  return { viewable, pending };
}

export interface RetentionPublic {
  state: "unopened" | "active" | "expired" | "purged";
  shownAt: string | null;
  expiresAt: string | null;
  purgeStatus: string;
}

export function retentionPublic(o: {
  messageShownAt: Date | null;
  messageExpiresAt: Date | null;
  messagePurgeStatus: string;
}): RetentionPublic {
  const st = messageState(o);
  return {
    state: st,
    shownAt: o.messageShownAt ? o.messageShownAt.toISOString() : null,
    expiresAt: o.messageExpiresAt ? o.messageExpiresAt.toISOString() : null,
    purgeStatus: o.messagePurgeStatus,
  };
}
