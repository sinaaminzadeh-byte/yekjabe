"use client";

// ── نقشه‌ی تعاملی ایران — هر استان یک بستر قابل‌کلیک با تعداد بسته‌ها ──
// دو پوسته: pastel (سبک ۱) و dark (سبک ۲ — آبی برند روی پس‌زمینه‌ی سرمه‌ای)
// centroid ها از قبل در iran-paths.ts تولید شده‌اند؛ نیازی به اندازه‌گیری DOM نیست.
//
// P-11 (audit wave 38): قبلاً هر pixelِ حرکت موس یک setState می‌کرد و کل SVG
// (۳۱ path + برچسب‌ها + پین) دوباره رندر می‌شد. الان:
//   ۱) هر استان یک memo component است — تغییر hover فقط دو path رندر می‌کند؛
//   ۲) هایلایت هاور با CSS (hover:[stroke:…]) — بدون state؛
//   ۳) تول‌تیپ دنبال‌کننده‌ی موس با DOM mutation روی ref جابه‌جا می‌شود
//      (position به‌روزرسانی می‌شود بدون هیچ re-render ای).
// State فقط برای «ورود/خروج» و انتخاب استان تغییر می‌کند.
import { memo, useMemo, useRef, useState } from "react";
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

// ── memoized path — re-renders ONLY when its own visual props change ──
interface ProvincePathProps {
  shape: IranProvinceShape;
  fill: string;
  stroke: string;
  strokeWidth: number;
  selected: boolean;
  skin: "pastel" | "dark";
  count: number;
  onSelect: (key: string | null) => void;
  onEnter: (key: string) => void;
  onLeave: () => void;
  onMove: (e: React.MouseEvent) => void;
}

const ProvincePath = memo(function ProvincePath({
  shape,
  fill,
  stroke,
  strokeWidth,
  selected,
  skin,
  count,
  onSelect,
  onEnter,
  onLeave,
  onMove,
}: ProvincePathProps) {
  return (
    <path
      d={shape.d}
      fill={selected && skin === "dark" ? "#5FD4FF" : fill}
      stroke={selected ? (skin === "pastel" ? "#04202E" : "#FFFFFF") : stroke}
      strokeWidth={selected ? 1.8 : strokeWidth}
      className={`cursor-pointer outline-none transition-[stroke-width] duration-150 ${
        skin === "pastel" ? "hover:[stroke:#04202E] hover:[stroke-width:1.8px]" : "hover:[stroke:#FFFFFF] hover:[stroke-width:1.6px]"
      }`}
      style={
        selected && skin === "dark"
          ? { filter: "drop-shadow(0 0 6px rgba(0,171,231,0.8))" }
          : undefined
      }
      tabIndex={0}
      role="button"
      aria-label={`${shape.fa}: ${fa(count)} بسته`}
      onMouseEnter={() => onEnter(shape.key)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(shape.key)}
      onBlur={onLeave}
      onClick={() => onSelect(shape.key)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(shape.key);
        }
      }}
    />
  );
});

export function IranMapBox({ skin, selected, onSelect }: IranMapBoxProps) {
  // hover state changes on ENTER/LEAVE only — never per mousemove
  const [hover, setHover] = useState<string | null>(null);
  // the tooltip element is moved via ref (direct style writes) — zero re-renders
  const tipRef = useRef<HTMLDivElement | null>(null);
  const tipBoxRef = useRef<HTMLDivElement | null>(null);

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

  // ── tooltip position: written straight to the DOM node (no setState) ──
  const moveTip = (e: React.MouseEvent) => {
    const tip = tipRef.current;
    const box = tipBoxRef.current;
    if (!tip || !box) return;
    const r = box.getBoundingClientRect();
    // clamp به همان قانون قبلی — فقط این‌بار بدون رندر
    const x = Math.min(Math.max(e.clientX - r.left, 72), r.width - 72);
    tip.style.left = `${x}px`;
    tip.style.top = `${e.clientY - r.top}px`;
  };

  const onLeave = () => {
    setHover(null);
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
    <div ref={tipBoxRef} data-mapbox className="relative select-none">
      <svg
        viewBox={`0 0 ${IRAN_MAP_W} ${IRAN_MAP_H}`}
        role="img"
        aria-label="نقشه‌ی ایران — تعداد بسته‌های ارسالی هر استان"
        className="h-auto w-full"
        onMouseLeave={onLeave}
      >
        {IRAN_PROVINCES.map((p) => {
          const { fill, stroke, width } = fillFor(p);
          return (
            <ProvincePath
              key={p.key}
              shape={p}
              fill={fill}
              stroke={stroke}
              strokeWidth={width}
              selected={selected === p.key}
              skin={skin}
              count={PROVINCE_COUNTS[p.key] ?? 0}
              onSelect={(k) => onSelect(selected === k ? null : k)}
              onEnter={setHover}
              onLeave={onLeave}
              onMove={moveTip}
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

      {/* تول‌تیپ دنبال‌کننده‌ی موس — position با ref به‌روز می‌شود (P-11) */}
      {active && (
        <div
          ref={tipRef}
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-2xl px-3.5 py-2 shadow-lg"
          style={{
            left: 0,
            top: 0,
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
