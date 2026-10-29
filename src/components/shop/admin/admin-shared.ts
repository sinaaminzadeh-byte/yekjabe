"use client";

// ── admin shared helpers (round 33) ──
export function jalaliDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Tehran",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

export function jalaliDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Tehran",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

export function timeAgoFa(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "همین حالا";
  if (mins < 60) return `${mins.toLocaleString("fa-IR")} دقیقه پیش`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs.toLocaleString("fa-IR")} ساعت پیش`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days.toLocaleString("fa-IR")} روز پیش`;
  return jalaliDate(iso);
}
