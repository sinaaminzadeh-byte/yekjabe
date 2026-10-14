// ── db-write.ts — withWriteRetry (prescription P0 / critic MUST-FIX #5) ──
// SQLite single-node: concurrent writers can hit BUSY / pool timeouts.
// Retries ONLY the retryable write errors, 3 attempts, 25–75ms jitter.
// Idempotent call sites only (checkout replays safely via Idempotency-Key).
import type { Prisma } from "@prisma/client";
import { db } from "./db";

const ATTEMPTS = 3;

function isRetryable(e: unknown): boolean {
  if (typeof e !== "object" || e === null) return false;
  const err = e as { code?: string; message?: string };
  // P2024 = connection pool timeout; P2010 = raw query failed (SQLITE_BUSY);
  // P2028 = transaction already closed/expired; message catches socket timeout
  if (err.code && ["P2024", "P2010", "P2028"].includes(err.code)) return true;
  const msg = err.message ?? "";
  return (
    msg.includes("Socket timeout") ||
    msg.includes("SQLITE_BUSY") ||
    msg.includes("database is locked") ||
    msg.includes("Transaction already closed")
  );
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function withWriteRetry<T>(fn: () => Promise<T>): Promise<T> {
  let last: unknown;
  for (let i = 0; i < ATTEMPTS; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      if (!isRetryable(e) || i === ATTEMPTS - 1) throw e;
      const jitter = 25 + Math.floor(Math.random() * 50); // 25–75ms
      await sleep(jitter * (i + 1));
    }
  }
  throw last;
}

/** Transaction with retry — the checkout path (guide §4.7). */
export async function retriedTransaction<T>(
  fn: (tx: Prisma.TransactionClient) => Promise<T>,
  options?: { timeout?: number },
): Promise<T> {
  return withWriteRetry(() => db.$transaction(fn, { timeout: options?.timeout ?? 10_000 }));
}
