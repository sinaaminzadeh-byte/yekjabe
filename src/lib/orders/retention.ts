// ── orders/retention.ts — message-retention core (mission §۴) ──
// The retention clock starts ONLY at the first successful authorized display
// of the message to the recipient (never at order/payment/ship/QR/OTP time).
// Expiry is calendar-month based, computed once, stored server-side, and
// enforced on EVERY content read — purging files later is hygiene, the block
// itself is the guarantee. Purge is idempotent, retry-safe and never touches
// other orders' files.

export type RetentionPlan = "1m" | "6m" | "12m";

export const RETENTION_MONTHS: Record<RetentionPlan, number> = { "1m": 1, "6m": 6, "12m": 12 };

export function isRetentionPlan(v: string): v is RetentionPlan {
  return v === "1m" || v === "6m" || v === "12m";
}

/**
 * Calendar-month addition in UTC (SQLite stores UTC; every consumer uses the
 * same clock so no TZ drift). Month-end clamps: Jan 31 + 1m → Feb 28/29.
 */
export function addCalendarMonths(from: Date, months: number): Date {
  const y = from.getUTCFullYear();
  const m = from.getUTCMonth();
  const d = from.getUTCDate();
  const hh = from.getUTCHours();
  const mm = from.getUTCMinutes();
  const ss = from.getUTCSeconds();
  const total = (y * 12 + m) + months;
  const ny = Math.floor(total / 12);
  const nm = total % 12;
  // days in target month
  const dim = new Date(Date.UTC(ny, nm + 1, 0)).getUTCDate();
  const nd = Math.min(d, dim);
  return new Date(Date.UTC(ny, nm, nd, hh, mm, ss));
}

export interface RetentionRow {
  id: string;
  retentionPlan: string;
  messageShownAt: Date | null;
  messageExpiresAt: Date | null;
  messagePurgeStatus: string;
}

/**
 * Atomically records the FIRST successful display and derives the expiry from
 * the order's plan. Concurrency-safe: `updateMany({messageShownAt: null})` is
 * a single conditional UPDATE — when two requests race, exactly one wins
 * (count === 1) and the loser reads back the winner's timestamps. Re-viewing
 * never moves the clock.
 */
export async function markFirstDisplay(
  orderId: string,
): Promise<{ shownAt: Date; expiresAt: Date } | null> {
  const { db } = await import("../db");
  const now = new Date();
  const row = await db.order.findUnique({
    where: { id: orderId },
    select: { id: true, retentionPlan: true, messageShownAt: true, messageExpiresAt: true, messagePurgeStatus: true },
  });
  if (!row) return null;
  if (!isRetentionPlan(row.retentionPlan)) return null;
  if (row.messagePurgeStatus === "purged") return null; // content is gone — nothing to start
  if (row.messageShownAt) {
    return row.messageExpiresAt
      ? { shownAt: row.messageShownAt, expiresAt: row.messageExpiresAt }
      : null;
  }
  const expiresAt = addCalendarMonths(now, RETENTION_MONTHS[row.retentionPlan]);
  const upd = await db.order.updateMany({
    where: { id: orderId, messageShownAt: null, messagePurgeStatus: { not: "purged" } },
    data: { messageShownAt: now, messageExpiresAt: expiresAt },
  });
  if (upd.count === 1) return { shownAt: now, expiresAt };
  // lost the race → re-read the winner's clock
  const fresh = await db.order.findUnique({
    where: { id: orderId },
    select: { messageShownAt: true, messageExpiresAt: true, messagePurgeStatus: true },
  });
  if (fresh?.messageShownAt && fresh.messageExpiresAt) {
    return { shownAt: fresh.messageShownAt, expiresAt: fresh.messageExpiresAt };
  }
  return null;
}

/** Server-side expiry check — the real gate, independent of purge having run. */
export function isMessageExpired(o: {
  messageExpiresAt: Date | null;
  messagePurgeStatus: string;
}): boolean {
  if (o.messagePurgeStatus === "purged") return true;
  return Boolean(o.messageExpiresAt && o.messageExpiresAt.getTime() <= Date.now());
}

/** UI-facing state machine (mission: «منقضی‌شده» vs «در انتظار حذف» vs «حذف‌شده»). */
export function messageState(o: {
  messageShownAt: Date | null;
  messageExpiresAt: Date | null;
  messagePurgeStatus: string;
}): "unopened" | "active" | "expired" | "purged" {
  if (o.messagePurgeStatus === "purged") return "purged";
  if (!o.messageShownAt) return "unopened";
  if (isMessageExpired(o)) return "expired";
  return "active";
}

// ── purge ──

async function deleteMessageMedia(keys: string[]): Promise<string[]> {
  const { deleteMessageFile, readMessageFile } = await import("./message-media");
  const failed: string[] = [];
  for (const key of keys) {
    try {
      await deleteMessageFile(key);
      // confirm the real file is gone — key removal alone is not deletion
      const still = await readMessageFile(key);
      if (still) failed.push(key);
    } catch {
      failed.push(key);
    }
  }
  return failed;
}

export interface PurgeReport {
  purged: number;
  failed: number;
  scanned: number;
}

// ── renewal (mission §۴ — تمدید) ──

export type RenewalResult =
  | { ok: true; expiresAt: Date }
  | { ok: false; reason: "purged" | "not_renewable" };

/**
 * Applies a PAID renewal inside one transaction: re-checks the purge state,
 * extends the clock from the LATER of (now, current expiry) and revives the
 * purge gate. Concurrent-safe: SQLite serializes writes and every decision is
 * re-read inside the transaction, so a purge that lands first still wins and
 * the renewal is honestly cancelled instead of faking recovery.
 */
export async function applyPaidRenewal(
  renewalId: string,
): Promise<RenewalResult> {
  const { db } = await import("../db");
  return db.$transaction(async (tx) => {
    const renewal = await tx.retentionRenewal.findUnique({ where: { id: renewalId } });
    if (!renewal || renewal.status !== "payment_under_review") {
      return { ok: false, reason: "not_renewable" as const };
    }
    const order = await tx.order.findUnique({
      where: { id: renewal.orderId },
      select: { id: true, messagePurgeStatus: true, messageExpiresAt: true },
    });
    // the RENEWAL's plan must be a paid one — the order itself may well be on
    // the free 1m plan (that's exactly the case a renewal exists for)
    if (!order || !isRetentionPlan(renewal.plan) || renewal.plan === "1m") {
      return { ok: false, reason: "not_renewable" as const };
    }
    // content already gone → honest cancellation, NEVER pretend recovery
    if (order.messagePurgeStatus === "purged") {
      await tx.retentionRenewal.update({
        where: { id: renewalId },
        data: { status: "cancelled", cancelReason: "purged_before_approval" },
      });
      return { ok: false, reason: "purged" as const };
    }
    const now = new Date();
    const base =
      order.messageExpiresAt && order.messageExpiresAt.getTime() > now.getTime()
        ? order.messageExpiresAt
        : now;
    const newExpires = addCalendarMonths(base, RETENTION_MONTHS[renewal.plan as RetentionPlan]);
    await tx.order.update({
      where: { id: order.id },
      data: { messageExpiresAt: newExpires, messagePurgeStatus: "active", messagePurgeAttempts: 0 },
    });
    await tx.retentionRenewal.update({
      where: { id: renewalId },
      data: { status: "paid", paidAt: now, appliedAt: now, cancelReason: "" },
    });
    await tx.orderEvent.create({
      data: {
        orderId: order.id,
        type: "note",
        note: "retention_renewed",
        actor: "admin",
        meta: JSON.stringify({ renewalCode: renewal.code, plan: renewal.plan, newExpiresAt: newExpires.toISOString() }),
      },
    });
    return { ok: true, expiresAt: newExpires };
  });
}

/**
 * Purges expired message content (text + private media files). Repeatable:
 * failed file deletions are recorded (`purge_failed`) and retried next run;
 * a successful pass never damages the order row itself (money/status/events
 * stay — only the message payload and media die).
 */
export async function purgeExpiredMessages(limit = 50): Promise<PurgeReport> {
  const { db } = await import("../db");
  const { parseMessageMediaKeys } = await import("./message-media");
  const now = new Date();
  const rows = await db.order.findMany({
    where: { messageExpiresAt: { lt: now }, messagePurgeStatus: { in: ["active", "purge_failed"] } },
    select: { id: true, mediaKeys: true, messagePurgeStatus: true },
    take: limit,
    orderBy: { messageExpiresAt: "asc" },
  });
  const report: PurgeReport = { purged: 0, failed: 0, scanned: rows.length };
  for (const row of rows) {
    const keys = parseMessageMediaKeys(row.mediaKeys);
    const failedKeys = keys.length > 0 ? await deleteMessageMedia(keys) : [];
    const ok = failedKeys.length === 0;
    await db
      .$transaction([
        db.order.update({
          where: { id: row.id },
          data: {
            message: "", // متن پیام هم مشمول نگهداری است
            mediaKeys: JSON.stringify(failedKeys), // فقط فایل‌های شکسته برای تلاش مجدد
            mediaCount: failedKeys.length,
            messagePurgeStatus: ok ? "purged" : "purge_failed",
            messagePurgedAt: now,
            messagePurgeAttempts: { increment: 1 },
          },
        }),
        db.orderEvent.create({
          data: {
            orderId: row.id,
            type: "note",
            note: ok ? "message_purged_expired" : "message_purge_partial_failure",
            actor: "system",
            meta: JSON.stringify({ attempts: row.messagePurgeStatus === "purge_failed" ? 2 : 1, failedFiles: failedKeys.length }),
          },
        }),
      ])
      .catch(() => {
        report.failed += 1;
        return null;
      });
    if (ok) report.purged += 1;
    else report.failed += 1;
  }
  return report;
}
