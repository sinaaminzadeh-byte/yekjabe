// ── orders/code.ts — collision-free order codes (guide §4.6, SQLite form) ──
// DailyCounter(day, value) with INSERT .. ON CONFLICT DO UPDATE .. RETURNING.
// The upsert row-locks the counter; two concurrent transactions can never get
// the same number. `code @unique` is only a backstop.
import type { Prisma } from "@prisma/client";

/** YYYYMMDD in Asia/Tehran — the ONLY timezone used by schedules/codes. */
export function tehranYYYYMMDD(d: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(d)
    .replace(/-/g, "");
}

/** PN-YYMMDD-#### e.g. PN-251213-0007 */
export async function nextOrderCode(tx: Prisma.TransactionClient): Promise<string> {
  const day = tehranYYYYMMDD();
  const rows = await tx.$queryRaw<{ value: number }[]>`
    INSERT INTO DailyCounter (day, value)
    VALUES (${day}, 1)
    ON CONFLICT(day) DO UPDATE SET value = DailyCounter.value + 1
    RETURNING value`;
  const v = rows[0]?.value ?? 1;
  return `PN-${day.slice(2)}-${String(v).padStart(4, "0")}`;
}

/** 251213-0007 → 7 (display helper; 0 when unparseable) */
export function codeSuffixNo(code: string): number {
  const m = /(\d{4})$/.exec(code);
  return m ? Number(m[1]) : 0;
}
