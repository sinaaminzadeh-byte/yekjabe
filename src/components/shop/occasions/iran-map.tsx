"use client";

// ── نقشه‌ی تعاملی ایران — هر استان یک بستر قابل‌کلیک با تعداد بسته‌ها ──
// دو پوسته: pastel (سبک ۱) و dark (سبک ۲ — آبی برند روی پس‌زمینه‌ی سرمه‌ای)
// centroid ها از قبل در iran-paths.ts تولید شده‌اند؛ نیازی به اندازه‌گیری DOM نیست.
import { useMemo, useState } from "react";
import {
  IRAN_MAP_H,
  IRAN_MAP_W,
  IRAN_PROVINCES,
  type IranProvinceShape,
} from "./iran-paths";
import { PROVINCE_COUNTS } from "@/lib/occasions-demo";
import { fa, money } from "@/lib/fa";

export const RANK_COLORS = ["#F0426B", "#00ABE7", "#2FB77F", "#F5B301", "#8B6CE7", "#17B3A6"];
const PASTEL_CYCLE = [
  "#D6F1FB",
  "#FFE0EA",
  "#E7E0FA",
  "#FFF3C9",
  "#DDF3EA",
  "#FDE9D9",
  "#D7F1FB",
  "#E3F6FD",
];

export interface IranMapBoxProps {
  skin: "pastel" | "dark";
  selected: string | null;
  onSelect: (key: string | null) => void;
}

interface Tip {
  x: number;
  y: number;
}

export function IranMapBox({ skin, selected, onSelect }: IranMapBoxProps) {
  const [hover, setHover] = useState<string | null>(null);
  const [tip, setTip] = useState<Tip | null>(null);

  const ranks = useMemo(() => {
    const sorted = Object.entries(PROVINCE_COUNTS).sort((a, b) => b[1] - a[1]);
    return new Map(sorted.map(([key], i) => [key, i]));
  }, []);
  const shapeBy = useMemo(
    () => new Map(IRAN_PROVINCES.map((p) => [p.key, p])),
    [],
  );
  const maxCount = Math.max(...Object.values(PROVINCE_COUNTS));

  const active = hover ?? selected;

  const fillFor = (p: IranProvinceShape): { fill: string; stroke: string; width: number } => {
    const rank = ranks.get(p.key) ?? 99;
    const count = PROVINCE_COUNTS[p.key] ?? 0;
    if (skin === "pastel") {
      if (rank < RANK_COLORS.length) {
        return { fill: RANK_COLORS[rank], stroke: "#FFFFFF", width: 1.2 };
      }
      return {
        fill: PASTEL_CYCLE[rank % PASTEL_CYCLE.length],
        stroke: "#FFFFFF",
        width: 1.2,
      };
    }
    const t = Math.pow(count / maxCount, 0.55);
    const alpha = 0.1 + 0.85 * t;
    return {
      fill: `rgba(0,171,231,${alpha.toFixed(2)})`,
      stroke: "rgba(255,255,255,0.35)",
      width: 0.8,
    };
  };

  const onMove = (e: React.MouseEvent, key: string | null) => {
    setHover(key);
    if (!key) {
      setTip(null);
      return;
    }
    const box = (e.currentTarget.closest("div[data-mapbox]") as HTMLElement) ?? null;
    if (!box) return;
    const r = box.getBoundingClientRect();
    // clamp همون‌جا (در event handler) تا رندر به DOM دسترسی نداشته باشد
    const x = Math.min(Math.max(e.clientX - r.left, 72), r.width - 72);
    setTip({ x, y: e.clientY - r.top });
  };

  const onLeave = () => {
    setHover(null);
    setTip(null);
  };

  const activeShape = active ? shapeBy.get(active) : undefined;
  const activeCount = activeShape ? PROVINCE_COUNTS[activeShape.key] ?? 0 : 0;
  const topKeys = useMemo(
    () =>
      Object.entries(PROVINCE_COUNTS)
        .sort((a, b) => b[1] - a[1])
        .slice(0, skin === "pastel" ? 8 : 5)
        .map(([k]) => k),
    [skin],
  );

  return (
    <div data-mapbox className="relative select-none">
      <svg
        viewBox={`0 0 ${IRAN_MAP_W} ${IRAN_MAP_H}`}
        role="img"
        aria-label="نقشه‌ی ایران — تعداد بسته‌های ارسالی هر استان"
        className="h-auto w-full"
        onMouseLeave={onLeave}
      >
        {IRAN_PROVINCES.map((p) => {
          const { fill, stroke, width } = fillFor(p);
          const isActive = active === p.key;
          const isSel = selected === p.key;
          const f = isActive && skin === "dark" ? "#00ABE7" : fill;
          return (
            <path
              key={p.key}
              d={p.d}
              fill={isSel && skin === "dark" ? "#5FD4FF" : f}
              stroke={isActive || isSel ? (skin === "pastel" ? "#04202E" : "#FFFFFF") : stroke}
              strokeWidth={isActive || isSel ? 1.8 : width}
              className="cursor-pointer transition-[fill,stroke-width] duration-150 outline-none"
              style={
                isSel && skin === "dark"
                  ? { filter: "drop-shadow(0 0 6px rgba(0,171,231,0.8))" }
                  : undefined
              }
              tabIndex={0}
              role="button"
              aria-label={`${p.fa}: ${fa(PROVINCE_COUNTS[p.key] ?? 0)} بسته`}
              onMouseMove={(e) => onMove(e, p.key)}
              onFocus={() => setHover(p.key)}
              onBlur={onLeave}
              onClick={() => onSelect(selected === p.key ? null : p.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(selected === p.key ? null : p.key);
                }
              }}
            />
          );
        })}

        {/* پین تهران — مثل تصویر مرجع */}
        {(() => {
          const t = shapeBy.get("Tehran");
          if (!t) return null;
          return (
            <g transform={`translate(${t.cx},${t.cy - 6})`} pointerEvents="none">
              {skin === "pastel" ? (
                <>
                  <circle cx="0" cy="0" r="10" fill="#F0426B" opacity="0.25">
                    <animate attributeName="r" values="8;14;8" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  <path
                    d="M0 2C-5 -3 -7 -7 -4.5 -10.2C-2.6 -12.6 2.6 -12.6 4.5 -10.2C7 -7 5 -3 0 2Z"
                    transform="translate(0,-8) scale(1.15)"
                    fill="#F0426B"
                    stroke="#fff"
                    strokeWidth="1.6"
                  />
                  <circle cx="0" cy="-15.5" r="2.1" fill="#fff" />
                </>
              ) : (
                <circle cx="0" cy="0" r="4.5" fill="#5FD4FF" stroke="#04202E" strokeWidth="1.4">
                  <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })()}

        {/* برچسب تعداد روی استان‌های برتر (مثل اعداد روی نقشه‌ی مرجع) */}
        {topKeys.map((k) => {
          const s = shapeBy.get(k);
          if (!s) return null;
          const isTop1 = k === topKeys[0];
          const activeHere = active === k || selected === k;
          return (
            <g key={k} pointerEvents="none" transform={`translate(${s.cx},${s.cy})`}>
              <rect
                x={-23}
                y={-11}
                width={46}
                height={22}
                rx={11}
                fill={skin === "pastel" ? "#FFFFFF" : "rgba(4,32,46,0.85)"}
                stroke={activeHere ? (skin === "pastel" ? "#00ABE7" : "#5FD4FF") : "none"}
                strokeWidth={activeHere ? 1.6 : 0}
                opacity={0.96}
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={isTop1 ? 10.5 : 9.5}
                fontWeight="800"
                fill={skin === "pastel" ? "#04202E" : "#BFE9F8"}
              >
                {fa(money(PROVINCE_COUNTS[k] ?? 0))}
              </text>
            </g>
          );
        })}
      </svg>

      {/* تول‌تیپ دنبال‌کننده‌ی موس */}
      {active && tip && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-2xl px-3.5 py-2 shadow-lg"
          style={{
            left: tip.x,
            top: tip.y,
            background: skin === "pastel" ? "#04202E" : "#FFFFFF",
          }}
          role="status"
        >
          <div className={`text-[13px] font-extrabold ${skin === "pastel" ? "text-white" : "text-[#04202E]"}`}>
            {activeShape?.fa}
          </div>
          <div className={`text-[11.5px] font-bold ${skin === "pastel" ? "text-[#8FD8F2]" : "text-[#006387]"}`}>
            {fa(money(activeCount))} بسته‌ی مهربونی
          </div>
        </div>
      )}
    </div>
  );
}
