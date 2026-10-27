"use client";

// ── ریل «پیشنهاد هدیه برای مناسبت‌های پیش رو» — یک کارت برای هر مناسبت ──
import { useRef } from "react";
import { Plush } from "../plush";
import { navigate } from "@/lib/hash-route";
import {
  TONE_COLORS,
  type DemoOccasion,
  daysLeftLabel,
} from "@/lib/occasions-demo";
import { jalaliDaysBetween } from "@/lib/jalali";
import type { JalaliDate } from "@/lib/jalali";

export interface GiftRailProps {
  occasions: DemoOccasion[];
  today: JalaliDate;
  highlightId: string | null;
  skin: "pastel" | "dark";
  onPickOccasion: (id: string) => void;
}

export function GiftRail({ occasions, today, highlightId, skin, onPickOccasion }: GiftRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const ordered = [...occasions].sort((a, b) => {
    const ah = a.id === highlightId ? 0 : 1;
    const bh = b.id === highlightId ? 0 : 1;
    if (ah !== bh) return ah - bh;
    return jalaliDaysBetween(today, a) - jalaliDaysBetween(today, b);
  });

  const dark = skin === "dark";

  return (
    <div className="relative">
      {/* فلش‌های اسکرول — دسکتاپ */}
      <div className="mb-3 hidden justify-start gap-2 md:flex">
        <button
          type="button"
          aria-label="کارت‌های قبلی"
          onClick={() => scroll(1)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg font-black transition-colors ${
            dark
              ? "border-white/20 text-white hover:bg-white/10"
              : "border-[#DDEEF5] bg-white text-[#04202E] hover:bg-[#E3F6FD]"
          }`}
        >
          ›
        </button>
        <button
          type="button"
          aria-label="کارت‌های بعدی"
          onClick={() => scroll(-1)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg font-black transition-colors ${
            dark
              ? "border-white/20 text-white hover:bg-white/10"
              : "border-[#DDEEF5] bg-white text-[#04202E] hover:bg-[#E3F6FD]"
          }`}
        >
          ‹
        </button>
      </div>

      <div
        ref={railRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-2"
        role="list"
        aria-label="پیشنهاد هدیه برای مناسبت‌ها"
      >
        {ordered.map((o) => {
          const tone = TONE_COLORS[o.tone];
          const days = jalaliDaysBetween(today, o);
          const gone = days < 0;
          const hl = o.id === highlightId;
          return (
            <article
              key={o.id}
              role="listitem"
              className={`flex w-[248px] shrink-0 snap-start flex-col gap-2 rounded-[26px] p-4 transition-all duration-200 ${
                dark
                  ? `border ${hl ? "border-[#00ABE7] bg-[#00ABE7]/15" : "border-white/12 bg-white/[0.06]"}`
                  : `border ${hl ? "border-[#00ABE7] shadow-[0_10px_26px_rgba(0,171,231,0.18)]" : "border-[#DDEEF5]"} bg-white`
              } ${gone ? "opacity-60" : ""}`}
            >
              <div
                className="flex h-[132px] items-center justify-center rounded-[20px]"
                style={{ background: dark ? `${tone.bg}22` : tone.soft }}
              >
                <Plush kind={o.picks[0]} size={104} />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className="rounded-full px-2.5 py-1 text-[10.5px] font-extrabold"
                  style={{ background: dark ? tone.bg : tone.soft, color: dark ? tone.text : tone.deep }}
                >
                  {o.emoji} {o.title}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold ${
                    dark ? "bg-white/10 text-[#BFE9F8]" : "bg-[#F2FAFD] text-[#4A6572]"
                  }`}
                >
                  {gone ? "گذشته" : daysLeftLabel(days)}
                </span>
              </div>

              <p className={`m-0 text-[12.5px] font-medium leading-[1.9] ${dark ? "text-[#D3EEF9]" : "text-[#1F3E4D]"}`}>
                {o.tagline}
              </p>

              <button
                type="button"
                onClick={() => {
                  onPickOccasion(o.id);
                  navigate("product", { slug: o.picks[0] });
                }}
                className={`mt-0.5 flex h-10 w-fit items-center gap-1.5 self-start rounded-full px-4 text-[12.5px] font-extrabold transition-transform hover:scale-[1.04] active:scale-95 ${
                  dark ? "bg-[#00ABE7] text-[#04202E]" : "text-[#006387] underline decoration-2 underline-offset-4"
                }`}
                aria-label={`دیدن پیشنهاد هدیه برای ${o.title}`}
              >
                دیدن هدیه
                <span aria-hidden="true">←</span>
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
