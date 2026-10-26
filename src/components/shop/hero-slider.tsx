"use client";

// ── Hero slider — سبک ۱ (full-bleed color story) — owner round 29 ──
// Owner round 30: slides now come from the SERVER (admin «اسلایدرها» tab →
// /api/home-content) with the built-in defaults as instant first paint +
// fallback. Shared shape lives in @/lib/home-slides. Self-contained helpers
// (useAutoCycle / useRtlSwipe / AutoProgress) live here since round 29.
import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { Plush } from "./plush";
import { HeartSticker } from "./icons";
import { navigate, type Route } from "@/lib/hash-route";
import { fa } from "@/lib/fa";
import { DEFAULT_HOME_SLIDES, type HeroSlide } from "@/lib/home-slides";
import type { PlushKind } from "@/lib/pishnam-data";

const plushKind = (k: string): PlushKind => k as PlushKind;

/* ── render model — the serializable HeroSlide + wired navigation ── */
interface Slide extends HeroSlide {
  ctaGo: Route;
  cta2Go: () => void;
}

const toRender = (list: HeroSlide[]): Slide[] =>
  list.map((s) => ({
    ...s,
    ctaGo: s.ctaRoute as Route,
    cta2Go: () => navigate(s.cta2Route as Route, undefined, s.cta2Hash || undefined),
  }));

/* one shared request for both desktop + mobile sliders (deduped) */
let slidesPromise: Promise<HeroSlide[]> | null = null;
function fetchSlides(): Promise<HeroSlide[]> {
  if (!slidesPromise) {
    slidesPromise = fetch("/api/home-content", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { slides?: HeroSlide[] } | null) => (j?.slides?.length ? j.slides : DEFAULT_HOME_SLIDES))
      .catch(() => DEFAULT_HOME_SLIDES);
  }
  return slidesPromise;
}

function useHomeSlides(): Slide[] {
  const [slides, setSlides] = useState<Slide[]>(() => toRender(DEFAULT_HOME_SLIDES));
  useEffect(() => {
    let alive = true;
    fetchSlides().then((list) => {
      if (!alive) return;
      const next = toRender(list);
      setSlides((prev) => (JSON.stringify(prev.map(({ ctaGo, cta2Go, ...p }) => p)) === JSON.stringify(next.map(({ ctaGo, cta2Go, ...p }) => p)) ? prev : next));
    });
    return () => {
      alive = false;
    };
  }, []);
  return slides;
}

/* ── cyclic autoplay: pause-aware timer + a re-sync id for progress bars ── */
function useAutoCycle(n: number, delayMs: number, paused: boolean) {
  const [index, setIndex] = useState(0);
  const [runId, setRunId] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused || n <= 1) return;
    timer.current = setTimeout(() => {
      setIndex((i) => (i + 1) % n);
      setRunId((r) => r + 1);
    }, delayMs);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, n, delayMs, runId]);

  const go = (i: number) => {
    setIndex(((i % n) + n) % n);
    setRunId((r) => r + 1);
  };
  const next = () => go(index + 1);
  const prev = () => go(index - 1);
  return { index, go, next, prev, runId };
}

/* ── RTL swipe helper: swipe right → next, swipe left → prev ──
 * dx lives in a ref (logic) + state (visual follow) so pointerup always
 * sees the final delta even for very fast flicks / synthetic events. */
function useRtlSwipe(onNext: () => void, onPrev: () => void, threshold = 55) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const dxRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [dx, setDx] = useState(0);

  const onPointerDown = (e: RPointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    start.current = { x: e.clientX, y: e.clientY };
    dxRef.current = 0;
    setDragging(true);
    setDx(0);
  };
  const onPointerMove = (e: RPointerEvent) => {
    if (!start.current) return;
    const d = e.clientX - start.current.x;
    dxRef.current = d;
    setDx(d);
  };
  const onPointerUp = () => {
    if (!start.current) return;
    const d = dxRef.current;
    if (d > threshold) onNext();
    else if (d < -threshold) onPrev();
    start.current = null;
    dxRef.current = 0;
    setDragging(false);
    setDx(0);
  };
  return {
    dragProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerLeave: onPointerUp,
      onPointerCancel: onPointerUp,
    },
    dragging,
    dx,
  };
}

/* ── autoplay progress bar (reuses the site's pishnam-tour-fill keyframe) ── */
function AutoProgress({
  runId,
  delayMs,
  paused = false,
  className = "",
  barClassName = "bg-white/80",
  height = "h-[3px]",
}: {
  runId: number;
  delayMs: number;
  paused?: boolean;
  className?: string;
  barClassName?: string;
  height?: string;
}) {
  return (
    <div className={`overflow-hidden ${height} ${className}`} aria-hidden="true">
      <div
        key={runId}
        className={`pishnam-tour-bar h-full ${barClassName}`}
        style={{
          animationDuration: `${delayMs}ms`,
          animationPlayState: paused ? "paused" : "running",
        }}
      />
    </div>
  );
}

/* shared: text colors per dark/light slide */
function titleClass(s: Slide) {
  return s.dark ? "text-white" : "text-[#04202E]";
}
function subClass(s: Slide) {
  return s.dark ? "text-[#D3EEF9]" : "text-[#04202E]";
}

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
  slides,
}: {
  index: number;
  go: (i: number) => void;
  onDark?: boolean;
  slides: Slide[];
}) {
  return (
    <div className="flex items-center gap-1.5">
      {slides.map((s, i) => (
        <button
          key={`${s.kind}-${i}`}
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
        {s.image ? (
           
          <img
            src={s.image}
            alt={s.title}
            className="pishnam-float h-full max-h-[92%] w-auto rounded-[28px] object-contain shadow-[0_24px_60px_-30px_rgba(4,32,46,0.5)]"
          />
        ) : (
          <Plush kind={plushKind(s.kind)} size={size} className="pishnam-float" />
        )}
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
export function HeroSliderDesktop() {
  const [paused, setPaused] = useState(false);
  const slides = useHomeSlides();
  const N = slides.length;
  const { index: rawIndex, go, next, prev, runId } = useAutoCycle(N, 6000, paused);
  const index = Math.min(rawIndex, N - 1);
  const s = slides[index];

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
      {slides.map((sl, i) => {
        const d = (i - index + N) % N;
        const comesFromLeft = d !== 0 && d <= N / 2;
        return (
          <div
            key={`${sl.kind}-${i}`}
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
          <DotsRow index={index} go={go} onDark slides={slides} />
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
export function HeroSliderMobile() {
  const [paused, setPaused] = useState(false);
  const [touched, setTouched] = useState(false);
  const slides = useHomeSlides();
  const N = slides.length;
  const { index: rawIndex, go, next, runId } = useAutoCycle(N, 6000, paused);
  const index = Math.min(rawIndex, N - 1);
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
        {slides.map((sl, i) => {
          const d = (i - index + N) % N;
          const comesFromLeft = d !== 0 && d <= N / 2;
          return (
            <div
              key={`${sl.kind}-${i}`}
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
                {sl.image ? (
                   
                  <img
                    src={sl.image}
                    alt={sl.title}
                    className="h-[190px] w-[190px] rounded-[24px] object-cover shadow-[0_18px_40px_-24px_rgba(4,32,46,0.5)]"
                  />
                ) : (
                  <Plush kind={plushKind(sl.kind)} size={190} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* dots + swipe hint */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="flex items-center justify-center gap-2.5 pb-3">
          <DotsRow index={index} go={go} onDark slides={slides} />
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
