"use client";

// ── Shared product imagery + attributes (round 34) ──
// One Gallery / one AttrsBlock reused by the addon cards (flow + builder),
// the addon detail sheet and the product page. Brand hexes are hardcoded per
// the design language; every no-photo fallback (gradient + emoji) must look
// complete BEFORE any gallery is seeded in the DB.

import { useEffect, useRef, useState } from "react";
import { fa } from "@/lib/fa";
import type { CatalogEntry } from "@/lib/pishnam-store";

/* ── Persian color name → pastel hex (fallback #C9E9F5) ── */
const COLOR_HEX: Record<string, string> = {
  "قهوه‌ای": "#8B5E3C",
  "کرم": "#F2E4C9",
  "خاکستری": "#B9C4CB",
  "زرد": "#F7D154",
  "سفید": "#FFFFFF",
  "صورتی": "#F7C5D3",
  "قرمز": "#E5646E",
  "آبی": "#9FD9F0",
  "سبز": "#BFE9CB",
  "نارنجی": "#F8C39B",
  "بنفش": "#CDB8E8",
  "مشکی": "#37474F",
  "سرمه‌ای": "#3D5A73",
  "بژ": "#EADCC5",
};

export function colorHex(name: string): string {
  return COLOR_HEX[name.trim()] ?? "#C9E9F5";
}

/* ── best cover for a catalog entry: gallery[0] → legacy photo → null ── */
export function entryCover(e?: CatalogEntry | null): string | null {
  return e?.images?.[0] ?? e?.image ?? null;
}

/* ── does the entry have ANY display attribute? (gates the «مشخصات» block) ── */
export function hasAttrs(e?: Pick<CatalogEntry, "sizeLabel" | "colors" | "specs"> | null): boolean {
  if (!e) return false;
  return Boolean(
    (e.sizeLabel && e.sizeLabel.trim() !== "") ||
      (e.colors && e.colors.length > 0) ||
      (e.specs && e.specs.length > 0),
  );
}

/* ── «مشخصات» block — size chip + color dots + zebra specs table ──
 * Renders nothing when the entry has no attributes at all. */
export function AttrsBlock({ entry, heading = "مشخصات" }: { entry: CatalogEntry; heading?: string | null }) {
  const size = entry.sizeLabel?.trim() || "";
  const colors = entry.colors ?? [];
  const specs = entry.specs ?? [];
  if (!hasAttrs(entry)) return null;
  return (
    <div className="flex flex-col gap-2.5">
      {heading && <span className="text-[13px] font-extrabold text-[#04202E]">{heading}</span>}
      {(size || colors.length > 0) && (
        <div className="flex flex-wrap items-center gap-2">
          {size && (
            <span className="flex items-center gap-1.5 rounded-full bg-[#F2FAFD] px-3 py-1.5 text-[12px] font-extrabold text-[#04202E]">
              <span aria-hidden="true">📏</span>
              {size}
            </span>
          )}
          {colors.map((c) => (
            <span key={c} className="flex items-center gap-1.5 rounded-full bg-[#F2FAFD] px-2.5 py-1.5 text-[12px] font-bold text-[#4A6572]">
              <span className="h-3.5 w-3.5 rounded-full border border-[#DDEEF5]" style={{ background: colorHex(c) }} aria-hidden="true" />
              {c}
            </span>
          ))}
        </div>
      )}
      {specs.length > 0 && (
        <div className="overflow-hidden rounded-[16px] border border-[#DDEEF5]">
          {specs.map((s, i) => (
            <div
              key={`${s.label}-${i}`}
              className={`flex items-center justify-between gap-3 px-3.5 py-2.5 text-[12.5px] ${i % 2 === 0 ? "bg-[#F7FBFD]" : "bg-white"}`}
            >
              <span className="shrink-0 font-bold text-[#4A6572]">{s.label}</span>
              <span className="min-w-0 text-end font-extrabold text-[#04202E]">{s.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Gallery — crossfading square main image + thumbnail strip ──
 * No photos → pastel gradient + emoji (complete-looking before seeding).
 * 1 photo → main only; 2–3 → strip; >3 → strip + prev/next arrows. */
export function Gallery({
  images,
  name,
  emoji,
  rounded = "rounded-[20px]",
  thumbClass = "h-14 w-14",
  className = "",
}: {
  images: string[];
  name: string;
  emoji?: string;
  rounded?: string;
  thumbClass?: string;
  className?: string;
}) {
  const [idx, setIdx] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const n = images.length;
  const active = n === 0 ? 0 : Math.min(idx, n - 1);

  // keep the active thumb visible when arrows move the selection
  useEffect(() => {
    const strip = stripRef.current;
    const el = strip?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  if (n === 0) {
    return (
      <div
        className={`flex aspect-square w-full items-center justify-center bg-[linear-gradient(135deg,#E3F6FD_0%,#F7FBFD_55%,#FFF1F5_100%)] ${rounded} ${className}`}
      >
        <span className="text-6xl" aria-hidden="true">
          {emoji || "🎁"}
        </span>
      </div>
    );
  }

  const go = (d: number) => setIdx((i) => (Math.min(i, n - 1) + d + n) % n);

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {/* main 1:1 image — all frames stacked, opacity crossfade on switch.
        P-08 (audit wave 38): explicit intrinsic size + async decoding + a
        background placeholder — the browser reserves the square before the
        file arrives, so the product page never jumps while images load. */}
      <div className={`relative aspect-square w-full overflow-hidden bg-[#F2FAFD] ${rounded}`}>
        {images.map((src, i) => (
          <img
            key={`${i}-${src}`}
            src={src}
            alt={i === active ? name : ""}
            width={640}
            height={640}
            loading={i === 0 ? undefined : "lazy"}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      {n > 1 && (
        <div className="flex items-center justify-center gap-2">
          {n > 3 && (
            <button
              type="button"
              aria-label="عکس قبلی"
              onClick={() => go(-1)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DDEEF5] bg-white text-[#04202E] transition-transform active:scale-90"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          )}
          <div ref={stripRef} className="no-scrollbar flex max-w-full gap-2 overflow-x-auto">
            {images.map((src, i) => (
              <button
                key={`${i}-${src}`}
                type="button"
                aria-label={`عکس ${fa(i + 1)} از ${name}`}
                aria-current={i === active}
                onClick={() => setIdx(i)}
                className={`shrink-0 overflow-hidden rounded-[14px] border-2 transition-all ${thumbClass} ${i === active ? "border-[#00ABE7]" : "border-transparent opacity-75"}`}
              >
                <img src={src} alt="" width={96} height={96} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          {n > 3 && (
            <button
              type="button"
              aria-label="عکس بعدی"
              onClick={() => go(1)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DDEEF5] bg-white text-[#04202E] transition-transform active:scale-90"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
