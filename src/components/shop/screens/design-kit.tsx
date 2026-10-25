"use client";

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN PROTOTYPE KIT — owner review scaffolding (easy to delete).
// Delete this file + design-hero.tsx + design-checkout.tsx, then remove the
// 2 route cases in src/app/page.tsx, the 2 Route/ROUTES entries in
// src/lib/hash-route.ts and the DESIGN block in site-footer.tsx. Nothing
// else in the app references these files. No store / API / cart mutation.
// ═══════════════════════════════════════════════════════════════════════════
import { useEffect, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from "react";
import { navigate, type Route } from "@/lib/hash-route";
import { fa } from "@/lib/fa";

/* ── sticky studio top bar: back to site, title, page switcher, temp chip ── */
export function DesignShell({
  page,
  title,
  tabs,
  children,
}: {
  page: "hero" | "checkout";
  title: string;
  tabs: { id: string; label: string }[];
  children: ReactNode;
}) {
  const other: Route = page === "hero" ? "design-checkout" : "design-hero";
  const otherLabel = page === "hero" ? "پرداخت" : "هیرو";

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pishnam-canvas min-h-screen">
      {/* top bar */}
      <div className="sticky top-0 z-40 border-b border-[#D3E8F0] bg-[#F2FAFD]/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5 md:px-6">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="flex h-9 items-center gap-1.5 rounded-full border border-[#C4DFEB] bg-white px-3.5 text-[12.5px] font-extrabold text-[#04202E] transition-colors hover:border-[#00ABE7]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
            برگشت به سایت
          </button>
          <span className="text-[15px] font-black text-[#04202E]">{title}</span>
          <span className="hidden rounded-full bg-[#FFF3C9] px-2.5 py-1 text-[10.5px] font-bold text-[#7A5C00] sm:inline">
            صفحه‌ی نمونه — هر طرحی خوشت اومد جایگزین می‌شه
          </span>
          <div className="ms-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(other)}
              className="flex h-9 items-center rounded-full bg-[#04202E] px-4 text-[12.5px] font-extrabold text-white transition-transform hover:scale-[1.04] active:scale-95"
            >
              پیشنهادهای {otherLabel} ←
            </button>
          </div>
        </div>
        {/* variant anchor tabs */}
        <div className="no-scrollbar mx-auto flex w-full max-w-[1200px] gap-2 overflow-x-auto px-4 pb-2.5 md:px-6">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => jump(t.id)}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#C4DFEB] bg-white px-3.5 py-1.5 text-[12px] font-bold text-[#1F3E4D] transition-colors hover:border-[#00ABE7] hover:text-[#006387]"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00ABE7] text-[10px] font-black text-[#04202E]">
                {fa(i + 1)}
              </span>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ── section heading + spec bullets («چرا این طرح؟») ── */
export function SpecCard({
  no,
  title,
  idea,
  points,
}: {
  no: string;
  title: string;
  idea: string;
  points: string[];
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4 pb-4 pt-9 md:px-6 md:pt-12">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="flex h-9 min-w-9 items-center justify-center rounded-[13px] bg-[#04202E] px-2 text-base font-black text-white">
          {no}
        </span>
        <h2 className="m-0 text-[21px] font-black leading-[1.4] text-[#04202E] md:text-[26px]">{title}</h2>
        <span className="rounded-full bg-[#E3F6FD] px-3 py-1 text-[11.5px] font-bold text-[#006387]">
          ایده: {idea}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {points.map((p) => (
          <span
            key={p}
            className="flex items-center gap-1.5 rounded-full border border-[#DDEEF5] bg-white px-3 py-1.5 text-[11.5px] font-semibold text-[#4A6572]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00ABE7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── section label for desktop / mobile previews ── */
function ViewLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 pb-2.5 pt-6">
      <span className="h-2 w-2 rounded-full bg-[#00ABE7]" />
      <span className="text-[12.5px] font-extrabold tracking-wide text-[#4A6572]">{text}</span>
      <span className="h-px flex-1 bg-[#D3E8F0]" />
    </div>
  );
}

/* ── desktop demo inside a fake browser chrome ── */
export function DesktopFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="hidden md:block">
      <ViewLabel text="نسخه‌ی دسکتاپ" />
      <div className="overflow-hidden rounded-[26px] border-[3px] border-[#04202E] bg-white shadow-[0_26px_50px_-24px_rgba(4,32,46,0.35)]">
        <div className="flex items-center gap-2 border-b-2 border-[#04202E] bg-[#EAF6FB] px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#F0426B]" />
          <span className="h-3 w-3 rounded-full bg-[#FFD456]" />
          <span className="h-3 w-3 rounded-full bg-[#3BD07C]" />
          <span dir="ltr" className="mx-auto flex h-7 w-[300px] items-center justify-center rounded-full border border-[#C4DFEB] bg-white text-[11px] font-bold text-[#4A6572]">
            {url}
          </span>
        </div>
        <div dir="rtl" className="relative overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── mobile demo inside a phone bezel (desktop review only) ──
 * On real phones the same demo renders raw full-width (md:hidden wrapper
 * in each page file); this frame exists so desktop viewers see it 1:1. */
export function PhoneFrame({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="hidden md:flex flex-col items-center gap-2.5 pt-2">
      <ViewLabel text={label ?? "نسخه‌ی موبایل (۳۹۰px)"} />
      <div className="relative w-[392px] max-w-full rounded-[52px] border-[9px] border-[#04202E] bg-[#04202E] shadow-[0_30px_60px_-24px_rgba(4,32,46,0.45)]">
        <div dir="rtl" className="h-[740px] w-full overflow-y-auto rounded-[43px] bg-[#F2FAFD]">
          {/* fake status bar */}
          <div className="sticky top-0 z-30 flex items-center justify-between bg-inherit px-6 pb-1 pt-2.5 text-[11px] font-black text-[#04202E]" dir="ltr">
            <span>۹:۴۱</span>
            <span className="absolute left-1/2 top-2 h-[20px] w-[96px] -translate-x-1/2 rounded-full bg-[#04202E]" />
            <span className="flex items-center gap-1" aria-hidden="true">
              <svg width="15" height="11" viewBox="0 0 16 12" fill="#04202E"><rect x="0" y="7" width="3" height="5" rx="1" /><rect x="4.5" y="4.5" width="3" height="7.5" rx="1" /><rect x="9" y="2" width="3" height="10" rx="1" /><rect x="13" y="0" width="3" height="12" rx="1" opacity=".3" /></svg>
              <svg width="22" height="11" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#04202E" /><rect x="2" y="2" width="15" height="8" rx="2" fill="#04202E" /><path d="M23.5 4v4a2.2 2.2 0 0 0 0-4z" fill="#04202E" /></svg>
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── cyclic autoplay: pause-aware timer + a re-sync id for progress bars ── */
export function useAutoCycle(n: number, delayMs: number, paused: boolean) {
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
  return { index, go, next, prev, runId, setPausedRun: () => setRunId((r) => r + 1) };
}

/* ── RTL swipe helper: swipe right → next, swipe left → prev ──
 * dx lives in a ref (logic) + state (visual follow) so pointerup always
 * sees the final delta even for very fast flicks / synthetic events. */
export function useRtlSwipe(onNext: () => void, onPrev: () => void, threshold = 55) {
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
export function AutoProgress({
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
