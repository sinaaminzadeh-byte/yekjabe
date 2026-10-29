"use client";

// ── admin charts — hand-rolled SVG primitives (round 33) ──
// Zero chart libs: a 14-day revenue bar chart, a status donut, and horizontal
// bar lists. RTL-safe, pastel brand palette only.

import { useState } from "react";
import { fa, money } from "@/lib/fa";

export function RevenueBars({ data }: { data: { label: string; orders: number; revenue: number }[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...data.map((d) => d.revenue));
  const W = 640;
  const H = 190;
  const PAD = 8;
  const bw = (W - PAD * 2) / data.length;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="نمودار فروش ۱۴ روز گذشته">
        <line x1={PAD} y1={H - 26} x2={W - PAD} y2={H - 26} stroke="#DDEEF5" strokeWidth="1.5" />
        {data.map((d, i) => {
          const h = Math.round(((H - 26 - 14) * d.revenue) / max);
          const x = PAD + i * bw + bw * 0.18;
          const w = bw * 0.64;
          const y = H - 26 - h;
          const on = hover === i;
          return (
            <g key={d.label + i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <rect x={PAD + i * bw} y={0} width={bw} height={H} fill="transparent" />
              {h > 0 && (
                <rect x={x} y={y} width={w} height={h} rx={Math.min(7, w / 2)} fill={on ? "#00ABE7" : "#9ADFF6"} opacity={hover === null || on ? 1 : 0.45} className="transition-all" />
              )}
              {h === 0 && <rect x={x} y={H - 28} width={w} height={2.5} rx={1.25} fill="#DDEEF5" />}
              <text x={PAD + i * bw + bw / 2} y={H - 9} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={on ? "#04202E" : "#7C99A6"}>
                {d.label.split(" ")[0]}
              </text>
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute -top-1 z-10 rounded-[14px] border border-[#DDEEF5] bg-white px-3.5 py-2 shadow-[0_8px_22px_rgba(4,32,46,0.12)]"
          style={{ right: `${Math.min(88, Math.max(12, ((hover + 0.5) / data.length) * 100))}%`, transform: "translateX(50%)" }}
        >
          <div className="whitespace-nowrap text-[11.5px] font-black text-[#04202E]">{data[hover].label}</div>
          <div className="whitespace-nowrap text-[11px] font-bold text-[#006387]">{money(data[hover].revenue)} تومان</div>
          <div className="whitespace-nowrap text-[10.5px] font-semibold text-[#4A6572]">{fa(data[hover].orders)} سفارش</div>
        </div>
      )}
    </div>
  );
}

// ── status donut — distribution of the 11-state machine ──
const DONUT_COLORS: Record<string, string> = {
  delivered: "#7BE3B4",
  shipped: "#00ABE7",
  preparing: "#F7A8C4",
  paid: "#F7D774",
  payment_under_review: "#C9B6F2",
  awaiting_payment: "#B9CBD4",
  failed: "#F38BA0",
  cancelled: "#F38BA0",
  expired: "#B9CBD4",
  refund_requested: "#C9B6F2",
  refunded: "#C9B6F2",
};

export function StatusDonut({ data }: { data: { status: string; count: number; label: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  const total = data.reduce((a, d) => a + d.count, 0);
  if (total === 0) {
    return <p className="m-0 py-8 text-center text-[13px] font-bold text-[#4A6572]">هنوز سفارشی ثبت نشده.</p>;
  }
  const R = 56;
  const C = 2 * Math.PI * R;
  // segment geometry — prefix sums (no outer mutation, react-hooks safe)
  const segs = data.map((d, i) => {
    const frac = d.count / total;
    return { ...d, i, dash: frac * C };
  });
  const segsWithOffset = segs.map((s, i) => ({
    ...s,
    offset: segs.slice(0, i).reduce((a, p) => a + p.dash, 0),
  }));
  const shown = active !== null ? segsWithOffset[active] : null;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="relative shrink-0">
        <svg viewBox="0 0 140 140" className="h-[150px] w-[150px]" role="img" aria-label="توزیع وضعیت سفارش‌ها">
          {segsWithOffset.map((s) => (
            <circle
              key={s.status}
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke={DONUT_COLORS[s.status] ?? "#B9CBD4"}
              strokeWidth={active === s.i ? 22 : 16}
              strokeDasharray={`${Math.max(s.dash - 2, 0.5)} ${C}`}
              strokeDashoffset={-s.offset}
              transform="rotate(-90 70 70)"
              strokeLinecap="butt"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setActive(s.i)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[20px] font-black leading-none text-[#04202E]">{fa(shown ? shown.count : total)}</span>
          <span className="mt-1 max-w-[80px] text-center text-[10px] font-bold leading-tight text-[#4A6572]">{shown ? shown.label : "کل سفارش‌ها"}</span>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-1.5">
        {segsWithOffset.map((s) => (
          <button
            key={s.status}
            type="button"
            onMouseEnter={() => setActive(s.i)}
            onMouseLeave={() => setActive(null)}
            className={`flex items-center gap-1.5 text-right transition-opacity ${active !== null && active !== s.i ? "opacity-45" : ""}`}
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: DONUT_COLORS[s.status] ?? "#B9CBD4" }} aria-hidden="true" />
            <span className="truncate text-[11px] font-bold text-[#04202E]">{s.label}</span>
            <span className="ms-auto text-[11px] font-black text-[#4A6572]">{fa(s.count)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── horizontal bar list — top products / provinces ──
export function HBars({ rows, unit }: { rows: { label: string; value: number; sub?: string }[]; unit?: string }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((r, i) => (
        <div key={r.label + i} className="flex items-center gap-3">
          <span className="w-[34%] truncate text-[12px] font-bold text-[#04202E]" title={r.label}>
            {r.label}
          </span>
          <div className="h-[14px] flex-1 overflow-hidden rounded-full bg-[#EDF6FA]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.max(6, (r.value / max) * 100)}%`,
                background: `linear-gradient(90deg, #9ADFF6, #00ABE7)`,
              }}
            />
          </div>
          <span className="w-[74px] shrink-0 text-left text-[11.5px] font-black text-[#006387]">
            {fa(r.value)}
            {unit ? ` ${unit}` : ""}
          </span>
        </div>
      ))}
      {rows.length === 0 && <p className="m-0 py-4 text-center text-[12.5px] font-bold text-[#4A6572]">داده‌ای نیست.</p>}
    </div>
  );
}
