// ── Jalali (Persian) calendar helpers — no dependencies, ICU via Intl ──
// All conversions use the Asia/Tehran timezone so day boundaries match Iran.

export interface JalaliDate {
  y: number;
  m: number; // 1..12 (1=فروردین … 12=اسفند)
  d: number; // 1..31
}

const J_FORMAT = new Intl.DateTimeFormat("en-US-u-ca-persian", {
  timeZone: "Asia/Tehran",
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

const DAY_MS = 86_400_000;

/** Gregorian Date → Jalali date (by Tehran calendar). */
export function g2j(date: Date): JalaliDate {
  const parts = J_FORMAT.formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  // some ICU builds append era; numeric month/day/year are stable
  return { y: get("year"), m: get("month"), d: get("day") };
}

/** Jalali date → Gregorian Date (UTC midnight of the matching Tehran day). */
export function j2g(j: JalaliDate): Date {
  // first guess: Jalali 1st month ≈ March (index 2); shift by year offset 621
  let t = Date.UTC(j.y + 621, j.m + 1, j.d);
  for (let i = 0; i < 24; i++) {
    const c = g2j(new Date(t));
    const cmp = c.y !== j.y ? c.y - j.y : c.m !== j.m ? c.m - j.m : c.d - j.d;
    if (cmp === 0) return new Date(t);
    t += cmp > 0 ? -DAY_MS : DAY_MS;
  }
  return new Date(t);
}

export function jalaliToday(): JalaliDate {
  return g2j(new Date());
}

export function nextJalaliMonth(y: number, m: number): { y: number; m: number } {
  return m === 12 ? { y: y + 1, m: 1 } : { y, m: m + 1 };
}

export function prevJalaliMonth(y: number, m: number): { y: number; m: number } {
  return m === 1 ? { y: y - 1, m: 12 } : { y, m: m - 1 };
}

/** Days in a Jalali month (29..31) — computed, so leap years are handled. */
export function jalaliMonthLength(y: number, m: number): number {
  const a = j2g({ y, m, d: 1 });
  const n = nextJalaliMonth(y, m);
  const b = j2g({ y: n.y, m: n.m, d: 1 });
  return Math.round((b.getTime() - a.getTime()) / DAY_MS);
}

/** Column (0..6, Saturday first) of the 1st day of the month. */
export function jalaliMonthStartCol(y: number, m: number): number {
  // JS getUTCDay(): Sun=0..Sat=6 → Persian week starts Saturday
  return (j2g({ y, m, d: 1 }).getUTCDay() + 1) % 7;
}

/** Whole days between two Jalali dates (b - a), sign preserved. */
export function jalaliDaysBetween(a: JalaliDate, b: JalaliDate): number {
  return Math.round((j2g(b).getTime() - j2g(a).getTime()) / DAY_MS);
}

export const JALALI_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;

export const WEEKDAYS_SHORT = ["ش", "ی", "د", "س", "چ", "پ", "ج"] as const;
export const WEEKDAYS_FULL = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
] as const;
