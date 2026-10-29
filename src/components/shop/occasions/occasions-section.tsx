"use client";

// ── «تقویم مناسبت‌ها + نقشه‌ی مهربونی» — پیش‌نمایش UI با دو سبک ──
// سبک ۱: پاستلی نرم (بر اساس طرح مرجع مالک) · سبک ۲: آبی برند روی سرمه‌ای
// همه‌ی داده‌ها نمایشی است (src/lib/occasions-demo.ts)؛ بعد از تأیید مالک به DB وصل می‌شود.
import { useEffect, useMemo, useState } from "react";
import { Plush } from "../plush";
import { HeartSticker } from "../icons";
import { navigate } from "@/lib/hash-route";
import { fa, money } from "@/lib/fa";
import {
  JALALI_MONTHS,
  WEEKDAYS_SHORT,
  jalaliDaysBetween,
  jalaliMonthLength,
  jalaliMonthStartCol,
  jalaliToday,
  nextJalaliMonth,
  prevJalaliMonth,
  type JalaliDate,
} from "@/lib/jalali";
import {
  DEMO_MONTH_SPAN,
  DEMO_OCCASIONS,
  PROVINCE_TOTAL,
  TONE_COLORS,
  daysLeftLabel,
  nextOccasion,
  occasionsOfMonth,
  provinceRows,
  type DemoOccasion,
} from "@/lib/occasions-demo";
import { IranMapBox, RANK_COLORS } from "./iran-map";
import { GiftRail } from "./gift-rail";

type UiStyle = "pastel" | "brand";
type Month = { y: number; m: number };

const monthLe = (a: Month, b: Month) => a.y < b.y || (a.y === b.y && a.m <= b.m);
const monthGe = (a: Month, b: Month) => a.y > b.y || (a.y === b.y && a.m >= b.m);
const monthEq = (a: Month, b: Month) => a.y === b.y && a.m === b.m;

function faDate(d: DemoOccasion): string {
  return `${fa(d.d)} ${JALALI_MONTHS[d.m - 1]} ${fa(d.y)}`;
}

// ── شمارنده‌ی نرم برای عدد کل نقشه (سبک ۲) ──
function useCountUp(target: number, ms = 900): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

/* ═════════════ exported entry — با سوییچر پیش‌نمایش ═════════════ */
export function OccasionsDemo({ platform = "d" }: { platform?: "m" | "d" }) {
  const [uiStyle, setUiStyle] = useState<UiStyle>(() => {
    // lazy init — کامپوننت فقط بعد از mount کلاینت رندر می‌شود، پس localStorage امن است
    try {
      const s = localStorage.getItem("occasions-ui-style");
      if (s === "pastel" || s === "brand") return s;
    } catch {
      /* private mode */
    }
    return "pastel";
  });
  const today = useMemo(() => jalaliToday(), []);
  const [month, setMonth] = useState<Month>({ y: today.y, m: today.m });
  const [selId, setSelId] = useState<string | null>(null);
  const [selProv, setSelProv] = useState<string | null>("Tehran");
  const [reminded, setReminded] = useState<Record<string, boolean>>({});

  // یادآوری ترجیح سبک (فقط UI) — خواندن اولیه بالا (lazy initializer) انجام شده
  const pickStyle = (s: UiStyle) => {
    setUiStyle(s);
    try {
      localStorage.setItem("occasions-ui-style", s);
    } catch {
      /* ignore */
    }
  };

  const sel = DEMO_OCCASIONS.find((o) => o.id === selId) ?? null;
  const next = useMemo(() => nextOccasion(today), [today]);

  const selectOccasion = (id: string) => {
    const o = DEMO_OCCASIONS.find((x) => x.id === id);
    setSelId(id);
    if (o) setMonth({ y: o.y, m: o.m });
  };

  const toggleRemind = (id: string) => setReminded((r) => ({ ...r, [id]: !r[id] }));

  const scrollToRail = () => {
    document.getElementById(`occasions-rail-${platform}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const shared = {
    today,
    month,
    setMonth,
    sel,
    selectOccasion,
    selProv,
    setSelProv,
    reminded,
    toggleRemind,
    next,
    scrollToRail,
  };

  return (
    <section
      id={`occasions-${platform}`}
      aria-label="تقویم مناسبت‌ها و نقشه‌ی مهربونی"
      className="w-full"
    >
      {/* نوار پیش‌نمایش دمو — بعد از تأیید مالک حذف می‌شود */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-3 px-5 pt-12 md:px-6 md:pt-[88px]">
        <span className="rounded-full border border-dashed border-[#00ABE7]/70 bg-white px-4 py-1.5 text-[12px] font-bold text-[#4A6572]">
          🎛️ پیش‌نمایش UI — داده‌ها نمایشی است
        </span>
        <div className="flex gap-1 rounded-full bg-white p-1 shadow-sm" role="tablist" aria-label="انتخاب سبک پیش‌نمایش">
          {(
            [
              ["pastel", "سبک ۱ · پاستلی نرم"],
              ["brand", "سبک ۲ · آبی برند"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={uiStyle === key}
              onClick={() => pickStyle(key)}
              className={`h-9 rounded-full px-4 text-[12.5px] font-extrabold transition-colors ${
                uiStyle === key ? "bg-[#00ABE7] text-white" : "text-[#4A6572] hover:bg-[#E3F6FD]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {uiStyle === "pastel" ? <StyleOne {...shared} platform={platform} /> : <StyleTwo {...shared} platform={platform} />}
    </section>
  );
}

interface Shared {
  platform: "m" | "d";
  today: JalaliDate;
  month: Month;
  setMonth: (m: Month) => void;
  sel: DemoOccasion | null;
  selectOccasion: (id: string) => void;
  selProv: string | null;
  setSelProv: (k: string | null) => void;
  reminded: Record<string, boolean>;
  toggleRemind: (id: string) => void;
  next: { occasion: DemoOccasion; days: number } | null;
  scrollToRail: () => void;
}

/* ═════════════ shared: تقویم ماه جلالی ═════════════ */
function MonthCalendar({
  month,
  setMonth,
  today,
  sel,
  selectOccasion,
  dark,
}: {
  month: Month;
  setMonth: (m: Month) => void;
  today: JalaliDate;
  sel: DemoOccasion | null;
  selectOccasion: (id: string) => void;
  dark: boolean;
}) {
  const len = jalaliMonthLength(month.y, month.m);
  const startCol = jalaliMonthStartCol(month.y, month.m);
  const occs = occasionsOfMonth(month.y, month.m);
  const byDay = new Map(occs.map((o) => [o.d, o]));
  const canPrev = !monthLe(DEMO_MONTH_SPAN.start, month);
  const canNext = !monthGe(month, DEMO_MONTH_SPAN.end);

  const cells: (number | null)[] = [];
  for (let i = 0; i < startCol; i++) cells.push(null);
  for (let d = 1; d <= len; d++) cells.push(d);

  return (
    <div className="flex flex-col gap-3">
      {/* هدر ماه */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="ماه قبل"
            disabled={!canNext}
            onClick={() => setMonth(prevJalaliMonth(month.y, month.m))}
            className={`flex h-9 w-9 items-center justify-center rounded-full border text-[15px] font-black transition-colors disabled:opacity-30 ${
              dark ? "border-white/20 text-white hover:bg-white/10" : "border-[#DDEEF5] bg-white text-[#04202E] hover:bg-[#E3F6FD]"
            }`}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="ماه بعد"
            disabled={!canPrev}
            onClick={() => setMonth(nextJalaliMonth(month.y, month.m))}
            className={`flex h-9 w-9 items-center justify-center rounded-full border text-[15px] font-black transition-colors disabled:opacity-30 ${
              dark ? "border-white/20 text-white hover:bg-white/10" : "border-[#DDEEF5] bg-white text-[#04202E] hover:bg-[#E3F6FD]"
            }`}
          >
            ›
          </button>
        </div>
        <div className={`text-[17px] font-black ${dark ? "text-white" : "text-[#04202E]"}`}>
          {JALALI_MONTHS[month.m - 1]} <span className={dark ? "text-[#8FD8F2]" : "text-[#4A6572]"}>{fa(month.y)}</span>
        </div>
      </div>

      {/* روزهای هفته */}
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS_SHORT.map((w) => (
          <div key={w} className={`py-1 text-center text-[11px] font-bold ${dark ? "text-[#8FD8F2]" : "text-[#4A6572]"}`}>
            {w}
          </div>
        ))}
      </div>

      {/* سلول‌ها */}
      <div className="grid grid-cols-7 gap-1" role="grid" aria-label={`تقویم ${JALALI_MONTHS[month.m - 1]} ${fa(month.y)}`}>
        {cells.map((d, i) => {
          if (d === null) return <div key={`e${i}`} aria-hidden="true" />;
          const o = byDay.get(d);
          const isToday = today.y === month.y && today.m === month.m && today.d === d;
          const isSel = o && sel?.id === o.id;
          const tone = o ? TONE_COLORS[o.tone] : null;
          const base = "relative flex h-[56px] md:h-[62px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ABE7]";
          const skin = dark
            ? isSel
              ? "border-[#00ABE7] bg-[#00ABE7]/25"
              : "border-transparent hover:border-white/25 hover:bg-white/10"
            : isSel
              ? "bg-white"
              : "border-transparent hover:bg-[#F2FAFD]";
          const todayCls = isToday ? (dark ? "ring-2 ring-[#00ABE7]" : "ring-2 ring-[#00ABE7] bg-white") : "";
          return (
            <button
              key={d}
              type="button"
              role="gridcell"
              aria-label={`${fa(d)} ${JALALI_MONTHS[month.m - 1]}${o ? ` — ${o.title}` : ""}${isToday ? " — امروز" : ""}`}
              aria-selected={!!isSel}
              onClick={() => o && selectOccasion(o.id)}
              className={`${base} ${skin} ${todayCls} ${!o ? (dark ? "cursor-default" : "cursor-default") : ""}`}
              style={
                !dark && isSel && tone
                  ? { borderColor: tone.bg, boxShadow: `0 6px 16px ${tone.soft}` }
                  : undefined
              }
            >
              <span
                className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-[13.5px] font-extrabold ${
                  o
                    ? dark
                      ? "text-white"
                      : "text-white"
                    : dark
                      ? "text-white/85"
                      : "text-[#04202E]"
                }`}
                style={o && !dark ? { background: tone!.bg } : o && dark ? { background: `${tone!.bg}CC` } : undefined}
              >
                {fa(d)}
              </span>
              {o && (
                <span
                  className="max-w-full truncate px-1 text-[8.5px] font-bold leading-[14px]"
                  style={{ color: dark ? "#BFE9F8" : tone!.deep }}
                >
                  {o.title}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {occs.length === 0 && (
        <div className={`rounded-2xl px-4 py-3 text-center text-[12.5px] font-bold ${dark ? "bg-white/5 text-[#8FD8F2]" : "bg-[#F2FAFD] text-[#4A6572]"}`}>
          این ماه مناسبت خاصی در تقویم نمایشی نداره؛ ماه‌های کنارش رو ببین 👀
        </div>
      )}
    </div>
  );
}

/* ═════════════ shared: پنل جزئیات مناسبت انتخاب‌شده ═════════════ */
function OccasionDetail({
  o,
  today,
  dark,
  reminded,
  onRemind,
  onClose,
}: {
  o: DemoOccasion;
  today: JalaliDate;
  dark: boolean;
  reminded: boolean;
  onRemind: () => void;
  onClose: () => void;
}) {
  const tone = TONE_COLORS[o.tone];
  const days = jalaliDaysBetween(today, o);
  return (
    <div
      className="relative mt-3 flex flex-col gap-2.5 rounded-[22px] p-4"
      style={
        dark
          ? { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }
          : { background: tone.soft }
      }
      role="region"
      aria-label={`جزئیات ${o.title}`}
    >
      <button
        type="button"
        aria-label="بستن جزئیات"
        onClick={onClose}
        className={`absolute end-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-black transition-colors ${
          dark ? "bg-white/10 text-white hover:bg-white/25" : "bg-white/80 text-[#4A6572] hover:bg-white"
        }`}
      >
        ✕
      </button>

      <div className="flex flex-wrap items-center gap-2 pe-8">
        <span className="text-[17px] font-black" style={{ color: dark ? "#fff" : tone.deep }}>
          {o.emoji} {o.title}
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-extrabold ${dark ? "bg-white/10 text-[#BFE9F8]" : "bg-white/80 text-[#4A6572]"}`}>
          {faDate(o)}
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 text-[10.5px] font-extrabold"
          style={{ background: tone.bg, color: tone.text }}
        >
          {days >= 0 ? daysLeftLabel(days) : "گذشته"}
        </span>
      </div>

      <p className={`m-0 text-[13px] font-medium leading-[2] ${dark ? "text-[#D3EEF9]" : "text-[#1F3E4D]"}`}>{o.body}</p>

      <div className="flex items-center gap-2">
        {o.picks.map((k) => (
          <button
            key={k}
            type="button"
            aria-label={`دیدن ${k}`}
            onClick={() => navigate("product", { slug: k })}
            className={`flex items-center gap-1.5 rounded-full px-2 py-1 transition-transform hover:scale-105 ${
              dark ? "bg-white/10" : "bg-white/80"
            }`}
          >
            <Plush kind={k} size={30} />
          </button>
        ))}
        <span className={`text-[11px] font-bold ${dark ? "text-[#8FD8F2]" : "text-[#4A6572]"}`}>
          دوست‌های پیشنهادی برای این مناسبت
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => navigate("product", { slug: o.picks[0] })}
          className={`flex h-10 items-center rounded-full px-5 text-[13px] font-extrabold transition-transform hover:scale-[1.03] active:scale-95 ${
            dark ? "bg-[#00ABE7] text-[#04202E]" : "bg-[#04202E] text-white"
          }`}
        >
          همین هدیه رو ببین ←
        </button>
        <button
          type="button"
          onClick={onRemind}
          aria-pressed={reminded}
          className={`flex h-10 items-center gap-1.5 rounded-full border-2 px-4 text-[13px] font-extrabold transition-colors ${
            dark
              ? reminded
                ? "border-[#00ABE7] bg-[#00ABE7]/20 text-[#BFE9F8]"
                : "border-white/30 text-white hover:border-white/60"
              : reminded
                ? "border-[#00ABE7] bg-white text-[#006387]"
                : "border-[#04202E]/25 text-[#04202E] hover:border-[#04202E]"
          }`}
        >
          {reminded ? "🔔 یادآوری روشنه" : "🔕 یادآوری بذار"}
        </button>
      </div>
    </div>
  );
}

/* ═════════════ سبک ۱ — پاستلی نرم ═════════════ */
function StyleOne(p: Shared) {
  const [showAllOcc, setShowAllOcc] = useState(false);
  const [showAllProv, setShowAllProv] = useState(false);
  const rows = useMemo(() => provinceRows(), []);
  const next = p.next;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 pb-2 md:px-6">
      {/* ── سربرگ + تصویرسازی ── */}
      <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between md:pt-10">
        <div className="flex max-w-[560px] flex-col items-start gap-3">
          <span className="flex items-center gap-2 rounded-full bg-[#FFE0EA] px-4 py-1.5 text-[12.5px] font-extrabold text-[#C22553]">
            🗓️ تقویم جعبه آبی
          </span>
          <h2 className="m-0 text-[30px] font-black leading-[1.4] text-[#04202E] md:text-[38px]">
            این ماه، بهونه‌های قشنگی برای هدیه دادن داریم
          </h2>
          <p className="m-0 text-[14px] font-medium leading-[2.1] text-[#1F3E4D] md:text-[15.5px]">
            تولدها، روزهای خاص و مناسبت‌هایی که می‌تونن یه فرصت باشن برای خوشحال کردن یکی که
            برات مهمه. اینجا می‌تونی مناسبت‌های نزدیک رو ببینی، هدیه‌ی همون روز رو انتخاب کنی
            و یه نگاه بندازی که جعبه‌های آبی توی کدوم شهرهای ایران پخش شدن.
          </p>
          {next && (
            <button
              type="button"
              onClick={() => {
                p.selectOccasion(next.occasion.id);
                p.scrollToRail();
              }}
              className="mt-1 flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-extrabold transition-transform hover:scale-[1.04]"
              style={{ background: TONE_COLORS[next.occasion.tone].soft, color: TONE_COLORS[next.occasion.tone].deep }}
            >
              <span className="text-base" aria-hidden="true">
                {next.occasion.emoji}
              </span>
              {next.days === 0
                ? `امروز ${next.occasion.title}ه!`
                : `${daysLeftLabel(next.days)} تا ${next.occasion.title}`}
              <span aria-hidden="true">←</span>
            </button>
          )}
        </div>

        {/* تصویرسازی: عروسک + تقویم رومیزی (فقط دسکتاپ) */}
        <div className="relative hidden shrink-0 items-end gap-5 md:flex" aria-hidden="true">
          <span className="animate-bounce self-start text-2xl text-[#F0426B]">♥</span>
          <Plush kind="bunny" size={140} />
          <div className="rotate-[-6deg] rounded-[18px] border-[3px] border-[#04202E] bg-white px-5 pb-3 pt-4 text-center shadow-[6px_8px_0_rgba(4,32,46,0.08)]">
            <div className="mx-auto -mt-7 mb-2 flex w-fit gap-2">
              <span className="h-4 w-4 rounded-full border-[2.5px] border-[#04202E] bg-[#FFE0EA]" />
              <span className="h-4 w-4 rounded-full border-[2.5px] border-[#04202E] bg-[#D6F1FB]" />
            </div>
            <div className="text-[11px] font-bold text-[#4A6572]">آبان ۱۴۰۵</div>
            <div className="mx-auto my-1.5 flex justify-center">
              <HeartSticker size={44} fill="#F0426B" stroke="none" />
            </div>
            <div className="text-[26px] font-black leading-none text-[#04202E]">{fa(p.today.d)}</div>
          </div>
          <span className="animate-bounce self-end text-xl text-[#00ABE7] [animation-delay:0.4s]">♥</span>
        </div>
      </div>

      {/* ── دو کارت: تقویم + نقشه ── */}
      <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* کارت آمار استان‌ها (دسکتاپ: سمت راست مثل طرح مرجع) */}
        <div className="order-2 flex flex-col gap-3 rounded-[30px] border border-[#DDEEF5] bg-white p-5 md:p-7 lg:order-1">
          <div className="flex flex-col gap-1">
            <h3 className="m-0 flex items-center gap-2 text-[19px] font-black text-[#04202E]">
              📍 جعبه‌های آبی به کجاها رسیدن؟
            </h3>
            <p className="m-0 text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">
              هر نقطه روی نقشه، یه هدیه‌ست که به دست کسی رسیده. اینجا می‌تونی ببینی جعبه‌های
              آبی تا امروز مهمون کدوم شهرها شدن. روی استان‌ها بزن یا هاور کن!
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <IranMapBox skin="pastel" selected={p.selProv} onSelect={p.setSelProv} />
            </div>
            {/* لیست پرارسال‌ترین‌ها */}
            <div className="w-full shrink-0 lg:w-[210px]">
              <div className="mb-2 text-[13px] font-black text-[#04202E]">پرارسال‌ترین‌ها</div>
              <div className="flex flex-col gap-1.5">
                {rows.slice(0, 5).map((r, i) => {
                  const activeHere = p.selProv === r.key;
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => p.setSelProv(activeHere ? null : r.key)}
                      className={`flex items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-[12.5px] transition-colors ${
                        activeHere ? "bg-[#E3F6FD]" : "hover:bg-[#F2FAFD]"
                      }`}
                      aria-pressed={activeHere}
                    >
                      <span className="flex items-center gap-2 font-bold text-[#1F3E4D]">
                        <span className="h-3 w-3 rounded-full" style={{ background: RANK_COLORS[i] }} aria-hidden="true" />
                        {r.fa}
                      </span>
                      <span className="font-black text-[#04202E]">{fa(money(r.count))}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-2.5 rounded-xl bg-[#F2FAFD] px-3 py-2 text-center text-[11.5px] font-bold text-[#4A6572]">
                مجموع: <b className="text-[#04202E]">{fa(money(PROVINCE_TOTAL))}</b> بسته‌ی مهربونی
              </div>
              <button
                type="button"
                onClick={() => setShowAllProv((v) => !v)}
                aria-expanded={showAllProv}
                className="mt-2 text-[12.5px] font-extrabold text-[#006387]"
              >
                {showAllProv ? "بستن لیست کامل ˄" : "مشاهده‌ی آمار کامل استان‌ها ›"}
              </button>
            </div>
          </div>

          {showAllProv && (
            <div className="grid max-h-56 grid-cols-2 gap-x-4 gap-y-1 overflow-y-auto rounded-2xl bg-[#F2FAFD] p-3 md:grid-cols-3" style={{ scrollbarWidth: "thin" }}>
              {rows.map((r) => (
                <div key={r.key} className="flex items-center justify-between gap-2 text-[11.5px]">
                  <span className="truncate font-bold text-[#1F3E4D]">{r.fa}</span>
                  <span className="shrink-0 font-black text-[#04202E]">{fa(money(r.count))}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* کارت تقویم ماه */}
        <div className="order-1 flex flex-col gap-3 rounded-[30px] border border-[#DDEEF5] bg-white p-5 md:p-7 lg:order-2">
          <MonthCalendar
            month={p.month}
            setMonth={p.setMonth}
            today={p.today}
            sel={p.sel}
            selectOccasion={p.selectOccasion}
            dark={false}
          />

          {p.sel && p.sel.y === p.month.y && p.sel.m === p.month.m && (
            <OccasionDetail
              o={p.sel}
              today={p.today}
              dark={false}
              reminded={!!p.reminded[p.sel.id]}
              onRemind={() => p.toggleRemind(p.sel!.id)}
              onClose={() => p.selectOccasion("")}
            />
          )}

          <button
            type="button"
            onClick={() => setShowAllOcc((v) => !v)}
            aria-expanded={showAllOcc}
            className="mt-1 self-start text-[12.5px] font-extrabold text-[#006387]"
          >
            {showAllOcc ? "بستن فهرست ˄" : "مشاهده‌ی همه‌ی مناسبت‌ها ›"}
          </button>

          {showAllOcc && (
            <div className="flex max-h-52 flex-col gap-1 overflow-y-auto rounded-2xl bg-[#F2FAFD] p-2" style={{ scrollbarWidth: "thin" }}>
              {DEMO_OCCASIONS.map((o) => {
                const days = jalaliDaysBetween(p.today, o);
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => p.selectOccasion(o.id)}
                    className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-right text-[12px] transition-colors ${
                      p.sel?.id === o.id ? "bg-white ring-1 ring-[#00ABE7]" : "hover:bg-white"
                    }`}
                  >
                    <span className="flex items-center gap-1.5 font-extrabold text-[#04202E]">
                      <span aria-hidden="true">{o.emoji}</span>
                      {o.title}
                      <span className="font-medium text-[#4A6572]">· {faDate(o)}</span>
                    </span>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                      style={{ background: TONE_COLORS[o.tone].soft, color: TONE_COLORS[o.tone].deep }}
                    >
                      {days >= 0 ? daysLeftLabel(days) : "گذشته"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── ریل پیشنهاد هدیه ── */}
      <div id={`occasions-rail-${p.platform}`} className="mt-9 flex scroll-mt-24 flex-col gap-3 rounded-[30px] border border-[#DDEEF5] bg-white p-5 md:p-7">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="m-0 text-[19px] font-black text-[#04202E]">🎁 برای این مناسبت چی بفرستم؟</h3>
            <p className="m-0 text-[12.5px] font-medium text-[#4A6572]">
              اگه نمی‌دونی چی انتخاب کنی، از اینجا شروع کن؛ برای هر مناسبت یه دوست پشمالو
              پیشنهاد دادیم
              {p.sel ? ` — الان: ${p.sel.title}` : ""}.
            </p>
          </div>
          {p.sel && (
            <button
              type="button"
              onClick={() => p.selectOccasion("")}
              className="rounded-full bg-[#F2FAFD] px-3.5 py-1.5 text-[11.5px] font-bold text-[#4A6572] hover:bg-[#E3F6FD]"
            >
              برداشتن فیلتر ✕
            </button>
          )}
        </div>
        <GiftRail
          occasions={DEMO_OCCASIONS}
          today={p.today}
          highlightId={p.sel?.id ?? null}
          skin="pastel"
          onPickOccasion={p.selectOccasion}
        />
      </div>
    </div>
  );
}

/* ═════════════ سبک ۲ — آبی برند روی سرمه‌ای ═════════════ */
function StyleTwo(p: Shared) {
  const rows = useMemo(() => provinceRows(), []);
  const total = useCountUp(PROVINCE_TOTAL);
  const next = p.next;

  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 pb-2 md:px-6">
      <div className="relative mt-8 overflow-hidden rounded-[34px] bg-[#04202E] p-5 text-white md:mt-10 md:rounded-[44px] md:p-11">
        {/* هاله‌های نوری برند */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#00ABE7]/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-[#00ABE7]/15 blur-3xl" />

        {/* سربرگ */}
        <div className="relative flex flex-col gap-3 md:max-w-[640px]">
          <span className="w-fit rounded-full bg-[#00ABE7]/15 px-4 py-1.5 text-[12.5px] font-extrabold text-[#5FD4FF] ring-1 ring-inset ring-[#00ABE7]/40">
            🗓️ تقویم مهربونی جعبه آبی
          </span>
          <h2 className="m-0 text-[30px] font-black leading-[1.4] md:text-[40px]">این ماه، بهونه‌های قشنگی برای هدیه دادن داریم</h2>
          <p className="m-0 text-[14px] font-medium leading-[2.1] text-[#D3EEF9] md:text-[15.5px]">
            مناسبت‌های نزدیک رو از تقویم بردار و هدیه‌ش رو انتخاب کن. هر نقطه‌ی روشن روی
            نقشه، یه جعبه‌ی باز شده‌ست.
          </p>
          {next && (
            <button
              type="button"
              onClick={() => {
                p.selectOccasion(next.occasion.id);
                p.scrollToRail();
              }}
              className="mt-1 flex w-fit items-center gap-2.5 rounded-full bg-[#00ABE7] px-5 py-2.5 text-[13.5px] font-black text-[#04202E] shadow-[0_0_28px_rgba(0,171,231,0.45)] transition-transform hover:scale-[1.04]"
            >
              <span className="text-base" aria-hidden="true">{next.occasion.emoji}</span>
              {next.days === 0 ? `امروز ${next.occasion.title}ه!` : `${daysLeftLabel(next.days)} تا ${next.occasion.title}`}
              <span aria-hidden="true">←</span>
            </button>
          )}
        </div>

        {/* بدنه: تقویم + نقشه */}
        <div className="relative mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* تقویم شیشه‌ای */}
          <div className="rounded-[28px] border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm md:p-7">
            <MonthCalendar
              month={p.month}
              setMonth={p.setMonth}
              today={p.today}
              sel={p.sel}
              selectOccasion={p.selectOccasion}
              dark
            />
            {p.sel && p.sel.y === p.month.y && p.sel.m === p.month.m && (
              <OccasionDetail
                o={p.sel}
                today={p.today}
                dark
                reminded={!!p.reminded[p.sel.id]}
                onRemind={() => p.toggleRemind(p.sel!.id)}
                onClose={() => p.selectOccasion("")}
              />
            )}
          </div>

          {/* نقشه + آمار */}
          <div className="flex flex-col rounded-[28px] border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm md:p-7">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div className="flex flex-col">
                <h3 className="m-0 text-[19px] font-black">📍 جعبه‌های آبی به کجاها رسیدن؟</h3>
                <p className="m-0 text-[12px] font-medium text-[#8FD8F2]">
                  هر لکه‌ی آبی، یه هدیه‌ست که به دست کسی رسیده
                </p>
              </div>
              <div className="rounded-2xl bg-white/[0.07] px-4 py-2 text-center ring-1 ring-inset ring-white/10">
                <div className="text-[22px] font-black leading-none text-[#5FD4FF]">{fa(money(total))}</div>
                <div className="text-[10.5px] font-bold text-[#8FD8F2]">بسته‌ی مهربونی</div>
              </div>
            </div>

            <div className="mt-2">
              <IranMapBox skin="dark" selected={p.selProv} onSelect={p.setSelProv} />
            </div>

            {/* میله‌ای پرارسال‌ترین‌ها */}
            <div className="mt-3 flex flex-col gap-2">
              {rows.slice(0, 5).map((r, i) => {
                const activeHere = p.selProv === r.key;
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => p.setSelProv(activeHere ? null : r.key)}
                    aria-pressed={activeHere}
                    className={`flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors ${
                      activeHere ? "bg-white/10" : "hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="w-4 text-center text-[12px] font-black text-[#5FD4FF]">{fa(i + 1)}</span>
                    <span className="w-[104px] shrink-0 truncate text-right text-[12.5px] font-bold">{r.fa}</span>
                    <span className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10">
                      <span
                        className="block h-full rounded-full bg-gradient-to-l from-[#00ABE7] to-[#5FD4FF] transition-all duration-500"
                        style={{ width: `${Math.max(6, r.pct)}%` }}
                      />
                    </span>
                    <span className="w-[52px] shrink-0 text-left text-[12.5px] font-black text-[#BFE9F8]">
                      {fa(money(r.count))}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ریل پیشنهاد */}
        <div id={`occasions-rail-${p.platform}`} className="relative mt-8 scroll-mt-24">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <div className="flex flex-col gap-1">
              <h3 className="m-0 text-[19px] font-black">🎁 برای این مناسبت چی بفرستم؟</h3>
              <p className="m-0 text-[12.5px] font-medium text-[#8FD8F2]">
                {p.sel ? `پیشنهادهای ${p.sel.title} جلوتر از بقیه‌ست` : "اگه نمی‌دونی چی انتخاب کنی، از اینجا شروع کن"}
              </p>
            </div>
            {p.sel && (
              <button
                type="button"
                onClick={() => p.selectOccasion("")}
                className="rounded-full bg-white/10 px-3.5 py-1.5 text-[11.5px] font-bold text-[#BFE9F8] hover:bg-white/20"
              >
                برداشتن فیلتر ✕
              </button>
            )}
          </div>
          <GiftRail
            occasions={DEMO_OCCASIONS}
            today={p.today}
            highlightId={p.sel?.id === "" ? null : p.sel?.id ?? null}
            skin="dark"
            onPickOccasion={p.selectOccasion}
          />
        </div>
      </div>
    </div>
  );
}
