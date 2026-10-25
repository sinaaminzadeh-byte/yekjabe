"use client";

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN PROTOTYPE — /design-hero : 3 hero-slider concepts for owner review.
// Pure presentational (local state only, no store/API). Each concept is a
// real working slider: autoplay, RTL swipe, dots/arrows, pause on hover.
// Delete together with design-kit.tsx + design-checkout.tsx (see kit header).
// ═══════════════════════════════════════════════════════════════════════════
import { useState } from "react";
import { Plush } from "../plush";
import { HeartSticker } from "../icons";
import { navigate, type Route } from "@/lib/hash-route";
import { fa } from "@/lib/fa";
import {
  DesignShell,
  DesktopFrame,
  PhoneFrame,
  SpecCard,
  AutoProgress,
  useAutoCycle,
  useRtlSwipe,
} from "./design-kit";
import type { PlushKind } from "@/lib/pishnam-data";

/* ── shared slide content (4 slides = 4 shop stories) ── */
interface Slide {
  kind: PlushKind;
  bg: string;
  blob: string;
  dark?: boolean;
  badge: string;
  title: string;
  sub: string;
  cta: string;
  ctaGo: Route;
  cta2: string;
  cta2Go: () => void;
  tab: string;
  tag: string;
}

const goHow = () => navigate("home", undefined, "how");
const goFaq = () => navigate("home", undefined, "faq");

const SLIDES: Slide[] = [
  {
    kind: "bear",
    bg: "#00ABE7",
    blob: "#66CDF1",
    badge: "ویژه‌ی دخترای مهربون",
    title: "می‌خوای یکی رو خوشحال کنی؟",
    sub: "یه دوست پشمالو، یه کارت پستال با پیام قشنگ خودت و یه عالمه مهربونی؛ درست می‌فرستیمش دم در خونه‌ی دوستت.",
    cta: "بساز و بفرست",
    ctaGo: "pick",
    cta2: "چطوری کار می‌کنه؟",
    cta2Go: goHow,
    tab: "هدیه‌ی پشمالو",
    tag: "جعبه + کارت پستال QR",
  },
  {
    kind: "bunny",
    bg: "#FFE0EA",
    blob: "#FFC9DA",
    badge: "پیام خودت، با صدای خودت",
    title: "یه بغل، تو یه جعبه",
    sub: "پیام صوتی و کارت پستال با کد QR رمزدار؛ فقط گیرنده می‌تونه بازش کنه و ارسال کاملاً ناشناسه.",
    cta: "پیامت رو بساز",
    ctaGo: "card",
    cta2: "قصه‌ی شما",
    cta2Go: () => navigate("stories"),
    tab: "پیام صوتی و QR",
    tag: "سورپرایز باز شدن هدیه",
  },
  {
    kind: "duck",
    bg: "#FFF3C9",
    blob: "#FFE79F",
    badge: "یه قیمت برای همه",
    title: "همه‌ی جعبه‌ها ۸۹۰ هزار تومان",
    sub: "بدون قیمت‌های گیج‌کننده. هر هدیه شماره‌ی مخصوص خودش رو داره و دم در خونه‌ی دوستت تحویل داده می‌شه.",
    cta: "دوستتو انتخاب کن",
    ctaGo: "friends",
    cta2: "سؤال‌های رایج",
    cta2Go: goFaq,
    tab: "ارسال و قیمت",
    tag: "یه قیمت، بدون سردرد",
  },
  {
    kind: "sheep",
    bg: "#04202E",
    blob: "#0E3C52",
    dark: true,
    badge: "دفتر مهربونی",
    title: "با هر قلب، یه هدیه می‌ره پیش یه بچه",
    sub: "قلب و پنجه‌ها می‌شن هدیه برای بچه‌های بی‌سرپرست و پناهگاه حیوونا؛ رسیدش همیشه همین‌جا ثبت می‌شه.",
    cta: "دفتر مهربونی رو ببین",
    ctaGo: "impact",
    cta2: "بیشتر بدون",
    cta2Go: () => navigate("mission"),
    tab: "قلب قرمز و پنجه",
    tag: "گزارش شفاف خیریه",
  },
];

const N = SLIDES.length;

/* shared: text colors per dark/light slide */
function titleClass(s: Slide) {
  return s.dark ? "text-white" : "text-[#04202E]";
}
function subClass(s: Slide) {
  return s.dark ? "text-[#D3EEF9]" : "text-[#04202E]";
}

/* ══════════════ VARIANT 1 — full-bleed story slider ══════════════ */

function ArrowBtn({
  side,
  onClick,
  light,
}: {
  side: "next" | "prev";
  onClick: () => void;
  light?: boolean;
}) {
  // RTL: «next» lives on the LEFT edge, «prev» on the RIGHT edge
  return (
    <button
      type="button"
      aria-label={side === "next" ? "اسلاید بعدی" : "اسلاید قبلی"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute ${side === "next" ? "left-4" : "right-4"} top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 active:scale-95 ${
        light
          ? "border-white/40 bg-white/10 text-white hover:bg-white/20"
          : "border-[#04202E] bg-white/90 text-[#04202E] shadow-[0_4px_10px_rgba(4,32,46,0.15)]"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {side === "next" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}

function DotsRow({
  index,
  go,
  onDark,
}: {
  index: number;
  go: (i: number) => void;
  onDark?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {SLIDES.map((s, i) => (
        <button
          key={s.kind}
          type="button"
          aria-label={`اسلاید ${fa(i + 1)}`}
          aria-current={i === index}
          onClick={() => go(i)}
          className={`h-2.5 rounded-full transition-all duration-300 ${
            i === index
              ? "w-8"
              : `w-2.5 ${onDark ? "bg-white/50 hover:bg-white/80" : "bg-[#04202E]/25 hover:bg-[#04202E]/50"}`
          }`}
          style={i === index ? { background: onDark ? "#fff" : "#04202E" } : undefined}
        />
      ))}
    </div>
  );
}

function SlideCopy({ s, compact }: { s: Slide; compact?: boolean }) {
  return (
    <div className="relative z-10 flex flex-col items-start gap-3 md:gap-5">
      <span
        className={`rounded-[14px] px-3 py-1.5 text-[11px] font-bold md:px-4 md:py-2 md:text-[13.5px] ${
          s.dark ? "bg-[#F0426B] text-white" : "bg-[#04202E] text-white"
        }`}
      >
        {s.badge}
      </span>
      <h1
        className={`m-0 font-black leading-[1.4] ${titleClass(s)} ${
          compact ? "text-[27px]" : "text-[clamp(36px,4.6vw,60px)]"
        }`}
      >
        {s.title}
      </h1>
      <p
        className={`m-0 font-medium ${subClass(s)} ${
          compact ? "max-w-[290px] text-[13px] leading-[1.9]" : "max-w-[540px] text-[17px] leading-[2]"
        }`}
      >
        {s.sub}
      </p>
      <div className="mt-1 flex flex-wrap gap-2.5 md:gap-3">
        <button
          type="button"
          onClick={() => navigate(s.ctaGo)}
          className={`flex items-center rounded-full font-extrabold transition-transform active:scale-95 md:hover:scale-[1.03] ${
            compact ? "h-[46px] px-5 text-[14px]" : "h-[56px] px-8 text-[16px]"
          } ${s.dark ? "bg-[#00ABE7] text-[#04202E]" : "bg-[#04202E] text-white"}`}
        >
          {s.cta}
          <HeartSticker size={compact ? 16 : 19} fill={s.dark ? "#04202E" : "#fff"} stroke="none" />
        </button>
        <button
          type="button"
          onClick={s.cta2Go}
          className={`box-border flex items-center rounded-full border-2 font-bold transition-colors ${
            compact ? "h-[46px] px-4 text-[13px]" : "h-[56px] px-6 text-[15px]"
          } ${
            s.dark
              ? "border-white/70 text-white hover:bg-white hover:text-[#04202E]"
              : "border-[#04202E] text-[#04202E] hover:bg-[#04202E] hover:text-white"
          }`}
        >
          {s.cta2}
        </button>
      </div>
    </div>
  );
}

function SlideStage({ s, index, size }: { s: Slide; index: number; size: number }) {
  return (
    <div className="relative h-full min-w-[220px] flex-1">
      <div
        className="absolute right-1/2 top-1/2 aspect-square w-[112%] translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-700 md:w-[86%]"
        style={{ background: s.blob }}
      />
      <div key={index} className="pishnam-pop-in absolute inset-0 flex items-center justify-center">
        <Plush kind={s.kind} size={size} className="pishnam-float" />
      </div>
      <div className="absolute left-[8%] top-[16%] pishnam-float" style={{ animationDelay: "-1.2s" }}>
        <HeartSticker size={34} fill={s.dark ? "#F0426B" : "#fff"} stroke="#04202E" strokeWidth={2.6} />
      </div>
      <div className="absolute bottom-[18%] right-[6%] pishnam-float" style={{ animationDelay: "-2.4s" }}>
        <HeartSticker size={24} fill="#F0426B" stroke="#04202E" strokeWidth={2.8} />
      </div>
    </div>
  );
}

/* ── desktop full-bleed ── */
function HeroADesktop() {
  const [paused, setPaused] = useState(false);
  const { index, go, next, prev, runId } = useAutoCycle(N, 6000, paused);
  const s = SLIDES[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="بنرهای اصلی"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") next(); // RTL: left arrow = next
        if (e.key === "ArrowRight") prev();
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-[580px] overflow-hidden outline-none focus-visible:ring-4 focus-visible:ring-[#00ABE7]/40"
    >
      {SLIDES.map((sl, i) => {
        const d = (i - index + N) % N;
        const comesFromLeft = d !== 0 && d <= N / 2;
        return (
          <div
            key={sl.kind}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              i === index
                ? "z-10 translate-x-0 opacity-100"
                : comesFromLeft
                  ? "z-0 -translate-x-[5%] opacity-0"
                  : "z-0 translate-x-[5%] opacity-0"
            }`}
            style={{ background: sl.bg }}
          >
            <div
              className="absolute -bottom-24 left-[8%] h-[240px] w-[240px] rounded-full opacity-70"
              style={{ background: sl.blob }}
            />
            <div className="mx-auto flex h-full max-w-[1200px] items-center gap-8 px-14">
              <SlideCopy s={sl} />
              <SlideStage s={sl} index={index} size={330} />
            </div>
          </div>
        );
      })}

      {/* counter chip */}
      <div className="absolute right-6 top-6 z-20 flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 backdrop-blur-sm">
        <span className="text-[12px] font-black text-[#04202E]" dir="ltr">
          {fa(`0${index + 1}`)} / {fa(`0${N}`)}
        </span>
        <span className="h-3.5 w-px bg-[#04202E]/25" />
        <span className="text-[11.5px] font-bold text-[#4A6572]">{s.tab}</span>
      </div>

      <ArrowBtn side="next" onClick={next} light={s.dark} />
      <ArrowBtn side="prev" onClick={prev} light={s.dark} />

      {/* dots + autoplay progress */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="flex justify-center pb-3.5">
          <DotsRow index={index} go={go} onDark />
        </div>
        <AutoProgress
          runId={runId}
          delayMs={6000}
          paused={paused}
          className="w-full bg-white/25"
          barClassName="bg-white/85"
        />
      </div>
    </div>
  );
}

/* ── mobile full-bleed (rounded card, swipe) ── */
function HeroAMobile() {
  const [paused, setPaused] = useState(false);
  const [touched, setTouched] = useState(false);
  const { index, go, next, runId } = useAutoCycle(N, 6000, paused);
  const { dragProps, dragging, dx } = useRtlSwipe(next, () => go(index - 1));

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative mx-4 mt-2 h-[500px] overflow-hidden rounded-[30px]"
    >
      <div
        {...dragProps}
        onPointerDown={(e) => {
          setTouched(true);
          dragProps.onPointerDown(e);
        }}
        style={{ touchAction: "pan-y" }}
        className={`relative h-full ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {SLIDES.map((sl, i) => {
          const d = (i - index + N) % N;
          const comesFromLeft = d !== 0 && d <= N / 2;
          return (
            <div
              key={sl.kind}
              aria-hidden={i !== index}
              className={`absolute inset-0 overflow-hidden rounded-[30px] p-5 pb-0 transition-all duration-500 ease-out ${
                i === index
                  ? "z-10 opacity-100"
                  : comesFromLeft
                    ? "z-0 -translate-x-[18%] opacity-0"
                    : "z-0 translate-x-[18%] opacity-0"
              }`}
              style={{
                background: sl.bg,
                transform: `${i === index ? `translateX(${dx * 0.35}px)` : undefined}`,
              }}
            >
              <div className="absolute -bottom-[46px] -left-8 h-[210px] w-[210px] rounded-full" style={{ background: sl.blob }} />
              <div className="relative z-10">
                <SlideCopy s={sl} compact />
              </div>
              <div className="absolute bottom-2 left-1">
                <Plush kind={sl.kind} size={190} />
              </div>
              <div className="absolute bottom-[86px] right-4 rotate-[-5deg] rounded-2xl border-[2.5px] border-[#04202E] bg-white px-3 pb-1 pt-1.5 text-center">
                <div className="text-[10px] font-bold text-[#4A6572]">هدیه‌ی شماره</div>
                <div className="text-[22px] font-black leading-[1.1] text-[#04202E]">{fa(247)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* dots + swipe hint */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="flex items-center justify-center gap-2.5 pb-3">
          <DotsRow index={index} go={go} onDark />
          {!touched && (
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 animate-pulse rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold text-[#04202E]">
              بکش ⇠
            </span>
          )}
        </div>
        <AutoProgress runId={runId} delayMs={6000} paused={paused} className="w-full bg-white/25" barClassName="bg-white/85" />
      </div>
    </div>
  );
}

/* ══════════════ VARIANT 2 — center peek cards ══════════════ */

function PeekCard({ s, i }: { s: Slide; i: number }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[34px] border-[3px] border-[#04202E] ${
        s.dark ? "" : "shadow-[0_18px_36px_-18px_rgba(4,32,46,0.35)]"
      }`}
      style={{ background: s.bg }}
    >
      <span
        className="pointer-events-none absolute left-4 top-3 select-none text-[64px] font-black leading-none opacity-15 md:text-[86px]"
        aria-hidden="true"
      >
        {fa(`0${i + 1}`)}
      </span>
      <div className={`relative flex h-full flex-col ${s.dark ? "text-white" : ""}`}>
        <div className="flex flex-1 flex-col items-start gap-2.5 p-6 md:gap-3.5 md:p-9">
          <span
            className={`rounded-[13px] px-3 py-1.5 text-[11px] font-bold md:text-[12.5px] ${
              s.dark ? "bg-[#F0426B] text-white" : "bg-[#04202E] text-white"
            }`}
          >
            {s.badge}
          </span>
          <h3 className={`m-0 font-black leading-[1.45] ${titleClass(s)} text-[24px] md:text-[38px]`}>
            {s.title}
          </h3>
          <p className={`m-0 max-w-[330px] font-medium leading-[1.9] ${subClass(s)} text-[12.5px] md:max-w-[400px] md:text-[15px]`}>
            {s.sub}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(s.ctaGo);
            }}
            className={`mt-auto flex h-[44px] items-center gap-2 rounded-full px-6 text-[13.5px] font-extrabold transition-transform active:scale-95 md:h-[50px] md:text-[15px] ${
              s.dark ? "bg-[#00ABE7] text-[#04202E]" : "bg-[#04202E] text-white"
            }`}
          >
            {s.cta}
          </button>
        </div>
        <div className="absolute bottom-0 left-2 md:left-6">
          <Plush kind={s.kind} size={150} className="md:hidden" />
          <Plush kind={s.kind} size={215} className="hidden md:block" />
        </div>
        <div className="absolute bottom-[54%] left-[38%] hidden md:block">
          <HeartSticker size={26} fill="#fff" stroke="#04202E" strokeWidth={2.6} />
        </div>
      </div>
    </div>
  );
}

function HeroBCore({ compact }: { compact?: boolean }) {
  const [paused, setPaused] = useState(false);
  const { index, go, next, prev, runId } = useAutoCycle(N, 6000, paused);
  const { dragProps, dragging, dx } = useRtlSwipe(next, prev);
  const peek = compact ? 58 : 76;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="کارت‌های هدیه"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      {...dragProps}
      style={{ touchAction: "pan-y" }}
      className={`relative select-none overflow-hidden ${compact ? "h-[452px]" : "h-[560px]"} ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* soft ground */}
      <div className="absolute inset-x-6 bottom-0 h-16 rounded-[100%] bg-[#04202E]/5 blur-md" />
      {SLIDES.map((s, i) => {
        let d = (i - index + N) % N;
        if (d > N / 2) d -= N; // → -2..+1 : positive = next (sits LEFT in RTL)
        const live = dragging ? dx * 0.22 : 0;
        return (
          <div
            key={s.kind}
            role={d !== 0 ? "button" : undefined}
            tabIndex={d !== 0 ? 0 : -1}
            aria-label={d !== 0 ? `رفتن به ${s.tab}` : undefined}
            onClick={() => d !== 0 && go(i)}
            onKeyDown={(e) => {
              if (d !== 0 && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                go(i);
              }
            }}
            className="absolute left-1/2 top-1/2 transition-all duration-500 ease-out"
            style={{
              width: compact ? "84%" : "min(640px, 60%)",
              height: compact ? 372 : 430,
              zIndex: 10 - Math.abs(d),
              opacity: d === 0 ? 1 : 0.38,
              transform: `translate(-50%, -50%) translateX(calc(${(-d * peek).toFixed(1)}% + ${live.toFixed(1)}px)) rotate(${d * -1.6}deg) scale(${d === 0 ? 1 : 0.82})`,
            }}
          >
            <div className="h-full">
              <PeekCard s={s} i={i} />
            </div>
          </div>
        );
      })}

      <ArrowBtn side="next" onClick={next} />
      <ArrowBtn side="prev" onClick={prev} />

      {/* colored dots */}
      <div className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.kind}
            type="button"
            aria-label={`اسلاید ${fa(i + 1)}`}
            onClick={() => go(i)}
            className={`h-3 w-3 rounded-full border-2 border-[#04202E] transition-transform ${
              i === index ? "scale-125" : "opacity-70 hover:opacity-100"
            }`}
            style={{ background: s.kind === SLIDES[index].kind ? s.blob : "#fff" }}
          />
        ))}
      </div>
      <AutoProgress
        runId={runId}
        delayMs={6000}
        paused={paused || dragging}
        className="absolute inset-x-0 bottom-0 w-full bg-[#04202E]/10"
        barClassName="bg-[#00ABE7]"
      />
    </div>
  );
}

/* ══════════════ VARIANT 3 — split hero + progress tabs ══════════════ */

function HeroCDesktop() {
  const { index, go, runId } = useAutoCycle(N, 6500, false);
  const s = SLIDES[index];

  return (
    <div className="relative overflow-hidden bg-[#F2FAFD]">
      {/* faint deco */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#D9F1FA]" />
      <div className="absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-[#FFE9F0]" />
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-[1.05fr_1fr] items-center gap-12 px-12 py-12">
        {/* text + tab list */}
        <div className="min-w-0">
          <div key={index} className="pishnam-reveal flex flex-col items-start gap-4">
            <span
              className={`rounded-[14px] px-4 py-2 text-[13px] font-bold ${
                s.dark ? "bg-[#F0426B] text-white" : "bg-[#04202E] text-white"
              }`}
            >
              {s.badge}
            </span>
            <h1 className={`m-0 font-black leading-[1.35] ${titleClass(s)} text-[clamp(34px,3.6vw,52px)]`}>
              {s.title}
            </h1>
            <p className={`m-0 max-w-[520px] font-medium leading-[2] ${subClass(s)} text-[16px]`}>{s.sub}</p>
            <div className="mt-1 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate(s.ctaGo)}
                className={`flex h-[54px] items-center rounded-full px-8 text-[16px] font-extrabold transition-transform hover:scale-[1.03] ${
                  s.dark ? "bg-[#00ABE7] text-[#04202E]" : "bg-[#04202E] text-white"
                }`}
              >
                {s.cta}
              </button>
              <button
                type="button"
                onClick={s.cta2Go}
                className="box-border flex h-[54px] items-center rounded-full border-2 border-[#04202E] px-6 text-[15px] font-bold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white"
              >
                {s.cta2}
              </button>
            </div>
          </div>

          {/* story tabs with autoplay progress */}
          <div className="mt-9 flex flex-col gap-2" role="tablist" aria-label="اسلایدها">
            {SLIDES.map((sl, i) => {
              const active = i === index;
              return (
                <button
                  key={sl.kind}
                  role="tab"
                  aria-selected={active}
                  onClick={() => go(i)}
                  className={`relative flex items-center gap-3 overflow-hidden rounded-[18px] border-2 px-3.5 py-2.5 text-right transition-colors ${
                    active ? "border-[#00ABE7] bg-white" : "border-transparent bg-white/60 hover:bg-white"
                  }`}
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#04202E]"
                    style={{ background: sl.blob }}
                  >
                    <Plush kind={sl.kind} size={40} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[14px] font-extrabold ${active ? "text-[#04202E]" : "text-[#4A6572]"}`}>
                      {sl.tab}
                    </span>
                    <span className="block truncate text-[11.5px] font-medium text-[#7FA9BC]">{sl.tag}</span>
                  </span>
                  <span className="text-[11px] font-black text-[#9DBAC6]" dir="ltr">
                    {fa(`0${i + 1}`)}
                  </span>
                  {active && (
                    <AutoProgress
                      runId={runId}
                      delayMs={6500}
                      className="absolute inset-x-0 bottom-0 h-[3px] bg-transparent"
                      barClassName="bg-[#00ABE7]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* stage */}
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#B7DEED]" />
          <div
            className="absolute inset-8 rounded-full transition-colors duration-700"
            style={{ background: s.blob }}
          />
          <div key={index} className="pishnam-pop-in absolute inset-0 flex items-center justify-center">
            <Plush kind={s.kind} size={300} className="pishnam-float" />
          </div>
          <div className="absolute left-[4%] top-[12%] pishnam-float" style={{ animationDelay: "-1.4s" }}>
            <HeartSticker size={38} fill="#fff" stroke="#04202E" strokeWidth={2.6} />
          </div>
          <div className="absolute bottom-[10%] right-[4%] rotate-[-5deg] rounded-[18px] border-[3px] border-[#04202E] bg-white px-4 pb-1.5 pt-2 text-center shadow-[0_10px_20px_-10px_rgba(4,32,46,0.4)]">
            <div className="text-[11px] font-bold text-[#4A6572]">هدیه‌ی شماره</div>
            <div className="text-[30px] font-black leading-[1.1] text-[#04202E]">{fa(247)}</div>
          </div>
          <div className="absolute right-[8%] top-[38%] pishnam-float" style={{ animationDelay: "-2.6s" }}>
            <HeartSticker size={24} fill="#F0426B" stroke="#04202E" strokeWidth={2.8} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroCMobile() {
  const { index, go, next, prev, runId } = useAutoCycle(N, 6500, false);
  const s = SLIDES[index];
  const { dragProps, dragging } = useRtlSwipe(next, prev);

  return (
    <div className="px-4 pb-2 pt-2">
      {/* stage */}
      <div
        {...dragProps}
        style={{ touchAction: "pan-y" }}
        className={`relative h-[280px] overflow-hidden rounded-[28px] border-[2.5px] border-[#04202E] ${dragging ? "cursor-grabbing" : ""}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 transition-colors duration-700" style={{ background: s.bg }} />
        <div
          className="absolute -bottom-16 left-1/2 h-[220px] w-[220px] -translate-x-1/2 translate-y-1/3 rounded-full transition-colors duration-700"
          style={{ background: s.blob }}
        />
        <div key={index} className="pishnam-pop-in absolute inset-0 flex items-center justify-center">
          <Plush kind={s.kind} size={185} className="pishnam-float" />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10.5px] font-black text-[#04202E]" dir="ltr">
          {fa(`0${index + 1}`)} / {fa(`0${N}`)}
        </span>
        <div className="absolute bottom-2 right-3 rotate-[-5deg] rounded-xl border-2 border-[#04202E] bg-white px-2.5 pb-0.5 pt-1 text-center">
          <div className="text-[9px] font-bold text-[#4A6572]">هدیه‌ی شماره</div>
          <div className="text-[18px] font-black leading-[1.1] text-[#04202E]">{fa(247)}</div>
        </div>
      </div>

      {/* text */}
      <div key={index} className="pishnam-reveal mt-4 flex flex-col items-start gap-2.5">
        <span
          className={`rounded-[13px] px-3 py-1.5 text-[11px] font-bold ${
            s.dark ? "bg-[#F0426B] text-white" : "bg-[#04202E] text-white"
          }`}
        >
          {s.badge}
        </span>
        <h1 className={`m-0 font-black leading-[1.45] ${titleClass(s)} text-[26px]`}>{s.title}</h1>
        <p className={`m-0 font-medium leading-[1.9] ${subClass(s)} text-[13px]`}>{s.sub}</p>
        <button
          type="button"
          onClick={() => navigate(s.ctaGo)}
          className={`mt-1 flex h-[48px] items-center rounded-full px-6 text-[14.5px] font-extrabold active:scale-95 ${
            s.dark ? "bg-[#00ABE7] text-[#04202E]" : "bg-[#04202E] text-white"
          }`}
        >
          {s.cta}
        </button>
      </div>

      {/* mini tabs with progress */}
      <div className="mt-4 flex items-end justify-between gap-2" role="tablist" aria-label="اسلایدها">
        {SLIDES.map((sl, i) => {
          const active = i === index;
          return (
            <button
              key={sl.kind}
              role="tab"
              aria-selected={active}
              onClick={() => go(i)}
              className="flex flex-1 flex-col items-center gap-1.5"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 transition-all ${
                  active ? "scale-110 border-[#00ABE7]" : "border-[#D3E8F0] opacity-70"
                }`}
                style={{ background: sl.blob }}
              >
                <Plush kind={sl.kind} size={44} />
              </span>
              <span className={`text-[9.5px] font-bold leading-tight ${active ? "text-[#04202E]" : "text-[#7FA9BC]"}`}>
                {sl.tab}
              </span>
              <AutoProgress
                runId={runId}
                delayMs={6500}
                className={`h-[3px] w-full rounded-full ${active ? "bg-[#D9F1FA]" : "bg-transparent"}`}
                barClassName="bg-[#00ABE7]"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════ PAGE ══════════════ */

export function DesignHeroPage() {
  return (
    <DesignShell
      page="hero"
      title="پیشنهادهای هیرو — ۳ اسلایدر"
      tabs={[
        { id: "v1", label: "اسلایدر تمام‌صفحه" },
        { id: "v2", label: "کارت‌های وسط‌چین" },
        { id: "v3", label: "دوستونه با تب تصویری" },
      ]}
    >
      {/* intro */}
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-6 md:px-6">
        <p className="m-0 max-w-[760px] text-[13.5px] font-medium leading-[2] text-[#4A6572] md:text-[15px]">
          سه اسلایدر کامل و واقعی (پخش خودکار، سوایپ راست‌چین، دکمه و نقطه‌های ناوبری). هر سه با همون
          محتوای فعلی سایت ساخته شدن؛ هر کدوم رو پسندیدی بگو تا همون جایگزین هیروی صفحه‌ی اصلی بشه —
          بقیه بدون دست‌زدن به سایت حذف می‌شن.
        </p>
      </div>

      {/* ── variant 1 ── */}
      <section id="v1" className="scroll-mt-28 pb-12">
        <SpecCard
          no="۱"
          title="اسلایدر تمام‌صفحه رنگی"
          idea="مثل استوری اینستاگرام؛ هر اسلاید یه دنیای رنگی کامل"
          points={[
            "هر اسلاید یه داستان کامل: بج + تیتر + دو دکمه",
            "پخش خودکار با نوار پیشرفت؛ هاور = توقف",
            "سوایپ راست‌چین + فلش + نقطه‌ها + شماره‌ی اسلاید",
          ]}
        />
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <DesktopFrame url="yekdoost.ir — طرح ۱">
            <HeroADesktop />
          </DesktopFrame>
          <PhoneFrame label="طرح ۱ — موبایل">
            <HeroAMobile />
          </PhoneFrame>
          <div className="md:hidden">
            <HeroAMobile />
          </div>
        </div>
      </section>

      {/* ── variant 2 ── */}
      <section id="v2" className="scroll-mt-28 border-t border-[#D3E8F0] pb-12">
        <SpecCard
          no="۲"
          title="کارت‌های وسط‌چین با پیش‌نمایش کناری"
          idea="مثل اپ‌استور؛ کارت فعال وسط، بقیه از دو طرف پیدان"
          points={[
            "کارت فعال با کادر مشکی و شماره‌ی درشت، حس کارت‌پستال",
            "کارت کناری قابل کلیکه — یا بکش و ول کن",
            "نقطه‌های رنگی به‌جای خاکستری؛ متناسب با شخصیت هر عروسک",
          ]}
        />
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <DesktopFrame url="yekdoost.ir — طرح ۲">
            <HeroBCore />
          </DesktopFrame>
          <PhoneFrame label="طرح ۲ — موبایل">
            <HeroBCore compact />
          </PhoneFrame>
          <div className="md:hidden">
            <HeroBCore compact />
          </div>
        </div>
      </section>

      {/* ── variant 3 ── */}
      <section id="v3" className="scroll-mt-28 border-t border-[#D3E8F0] pb-14">
        <SpecCard
          no="۳"
          title="هیرو دوستونه با تب تصویری و نوار پیشرفت"
          idea="کنترل کامل با کاربر؛ هر اسلاید یه تب با عکس عروسک"
          points={[
            "متن‌ها با انیمیشن نرم عوض می‌شن؛ عکس با پاپ‌این میاد",
            "تب‌ها هم پیشرفت رو نشون می‌دن هم قابل کلیک‌ان",
            "روی موبایل: صحنه بالا، تب‌های دایره‌ای پایین",
          ]}
        />
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <DesktopFrame url="yekdoost.ir — طرح ۳">
            <HeroCDesktop />
          </DesktopFrame>
          <PhoneFrame label="طرح ۳ — موبایل">
            <HeroCMobile />
          </PhoneFrame>
          <div className="md:hidden">
            <HeroCMobile />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1200px] px-4 pb-16 md:px-6">
        <div className="rounded-[22px] border border-dashed border-[#BFDDE8] bg-white/70 p-4 text-center text-[12.5px] font-semibold leading-[1.9] text-[#4A6572]">
          نکته: اعداد و متن‌ها همه با محتوای واقعی سایت پر شدن؛ بعد از انتخابت، طرح انتخابی با همون
          داده‌های زنده (شماره‌ی هدیه، محصولات و…) وصل می‌شه.
        </div>
      </div>
    </DesignShell>
  );
}
