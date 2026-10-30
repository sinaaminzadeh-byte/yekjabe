"use client";

// ═══ رهگیری هدیه — order journey timeline (mobile + desktop) ═══
// Entry: click any order card in «هدیه‌هام» → selectOrder(id) → navigate("track")
import { navigate } from "@/lib/hash-route";
import { useState, type CSSProperties } from "react";
import { MobileTopBar } from "@/components/shop/nav";
import { Plush } from "@/components/shop/plush";
import { ForwardIcon, CheckIcon, QrCode } from "@/components/shop/icons";
import {
  useSelectedOrder,
  statusToStep,
  TRACK_STEPS,
  type BoardOrder,
} from "@/lib/pishnam-store";
import { PLUSH_MAP, OCCASIONS } from "@/lib/pishnam-data";
import { fa, faPrice } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";
import { downloadGiftCard } from "@/lib/gift-card";
import { orderChip, isOnJourney } from "@/lib/orders/order-view";
import { CountdownBadge } from "../manual-payment";
import { PaymentBlock, useHold } from "./dashboards";

/* ── local helpers ── */

/** Honest one-liner for v2 orders outside the classic 4-step journey. */
function bannerNote(status2?: string): string {
  switch (status2) {
    case "awaiting_payment":
      return "هدیه‌ت ساخته شده و ۱۰ دقیقه برات رزرو شده؛ پرداخت که تموم شد، جعبه‌چینی شروع می‌شه.";
    case "payment_under_review":
      return "رسیدت رسید و تو نوبت بررسیه؛ تا ۱۲ ساعت نتیجه رو پیامک می‌کنیم.";
    case "failed":
      return "پرداخت این سفارش ناتموم موند. اگه مبلغ کم شده با پشتیبانی در تماس باش.";
    case "cancelled":
      return "این سفارش لغو شده؛ اگه فکر می‌کنی اشتباهه با ما در تماس باش.";
    case "expired":
      return "مهلت ۱۰ دقیقه‌ای رزرو تموم شد و موجودی آزاد شد؛ می‌تونی یه هدیه‌ی تازه بسازی.";
    default:
      return "وضعیت سفارش به‌روزه.";
  }
}

function who(o: BoardOrder): string {
  return o.dir === "sent" ? `برای ${o.to}` : `از ${o.senderName || "یه دوست ناشناس"}`;
}

function extras(o: BoardOrder): string {
  const parts: string[] = [];
  if (o.anonymous) parts.push("ناشناس");
  if (o.hearts > 0) parts.push(`${fa(o.hearts)} قلب`);
  if (o.paws > 0) parts.push(`${fa(o.paws)} پنجه`);
  return parts.length ? parts.join(" · ") : "بدون آپشن";
}

function stepNote(i: number, current: number, o: BoardOrder): string {
  if (i < current) return `${o.date} · انجام شد ✓`;
  if (i === current) return o.dir === "recv" ? "الان همین‌جا" : "الان اینجاییم";
  return "هنوز نه";
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "0";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    const sel = document.getSelection();
    const saved = sel && sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    if (saved && sel) {
      sel.removeAllRanges();
      sel.addRange(saved);
    }
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function PlushTile({ o, size, box }: { o: BoardOrder; size: number; box: number }) {
  return (
    <div
      data-giftcard-plush
      className="flex shrink-0 items-center justify-center rounded-[22px]"
      style={{ width: box, height: box, background: PLUSH_MAP[o.kind].bg }}
    >
      <Plush kind={o.kind} size={size} />
    </div>
  );
}

/* ── timeline row (shared visual language, mobile & desktop use it) ── */
function TimelineRow({
  i,
  current,
  o,
  big = false,
}: {
  i: number;
  current: number;
  o: BoardOrder;
  big?: boolean;
}) {
  const { toast } = useToast();
  const done = i < current;
  const isNow = i === current;
  const dot = big ? 46 : 40;
  return (
    <li className="relative flex gap-4 pb-6 last:pb-0">
      {/* connector */}
      {i < TRACK_STEPS.length - 1 && (
        <span
          aria-hidden
          className="absolute w-[2px] rounded"
          style={{
            insetInlineStart: dot / 2 - 1,
            top: dot,
            bottom: -2,
            background: done
              ? "#00ABE7"
              : "repeating-linear-gradient(to bottom, #BFE4F2 0 5px, transparent 5px 10px)",
          }}
        />
      )}
      {/* dot */}
      <span
        className={`relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 ${
          done
            ? "border-[#00ABE7] bg-[#00ABE7] text-white"
            : isNow
              ? "border-[#00ABE7] bg-white text-[#00ABE7] pishnam-pulse-ring"
              : "border-dashed border-[#9CC9DA] bg-white text-[#4A6572]"
        }`}
        style={{ width: dot, height: dot }}
      >
        {done ? (
          <CheckIcon size={18} stroke="#fff" />
        ) : (
          <span className={`font-black ${big ? "text-[17px]" : "text-[15px]"}`}>{fa(i + 1)}</span>
        )}
      </span>
      {/* text */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`font-extrabold ${big ? "text-[17px]" : "text-[15.5px]"} ${isNow ? "text-[#00779F]" : ""}`}>
            {TRACK_STEPS[i].label}
          </span>
          <span
            className={`rounded-[10px] px-2 py-[3px] text-[11px] font-bold ${
              done ? "bg-[#D7F5E4] text-[#04202E]" : isNow ? "bg-[#E3F6FD] text-[#006387]" : "bg-[#F2F7F9] text-[#4A6572]"
            }`}
          >
            {stepNote(i, current, o)}
          </span>
        </div>
        <p className="m-0 text-[13px] font-medium leading-[1.85] text-[#4A6572]">{TRACK_STEPS[i].body}</p>
        {isNow && o.status === "shipped" && (
          // UX-12 — the REAL postal tracking code (set by the shop) with a
          // copy button. The old hardcoded «۹۱۲۳۴۵۶۷۸۹۰» demo number was
          // misleading; until the code is logged we say so honestly.
          (() => {
            const tc = (o as { postTrackingCode?: string }).postTrackingCode ?? "";
            return tc ? (
              <span className="mt-1 flex w-fit flex-wrap items-center gap-2 rounded-[10px] bg-[#CDEFFB] px-2.5 py-1 text-[11.5px] font-bold text-[#04202E]">
                کد رهگیری پست: <span dir="ltr" className="font-black">{tc}</span>
                <button
                  type="button"
                  onClick={() => {
                    void copyText(tc).then((okc) => {
                      if (!okc) toast({ title: "کپی نشد — دستی انتخاب کن" });
                    });
                  }}
                  className="rounded-full bg-white px-2 py-0.5 text-[10.5px] font-extrabold text-[#006387]"
                >
                  کپی
                </button>
              </span>
            ) : (
              <span className="mt-1 w-fit rounded-[10px] bg-[#CDEFFB] px-2.5 py-1 text-[11.5px] font-bold text-[#04202E]">
                کد رهگیری پست به‌زودی همین‌جا ثبت می‌شه.
              </span>
            );
          })()
        )}
        {isNow && o.status === "delivered" && (
          <span className="mt-1 w-fit rounded-[10px] bg-[#D7F5E4] px-2.5 py-1 text-[11.5px] font-bold text-[#04202E]">
            "شماره‌ت رو تأیید کن و پیامت رو ببین!"
          </span>
        )}
      </div>
    </li>
  );
}

/* ── order info card (shared) ── */
function InfoRow({ k, v, dir = "rtl" }: { k: string; v: string; dir?: "rtl" | "ltr" }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[#EDF6FA] py-2.5 last:border-0">
      <span className="shrink-0 text-[12.5px] font-semibold text-[#4A6572]">{k}</span>
      <span className="text-left text-[13px] font-bold" dir={dir}>
        {v}
      </span>
    </div>
  );
}

function PostcardCard({ o, compact = false }: { o: BoardOrder; compact?: boolean }) {
  return (
    <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[15px] font-extrabold">کارت پستالت</span>
        <QrCode size={34} />
      </div>
      <p
        className={`m-0 rounded-[16px] bg-[#F2FAFD] p-3.5 text-[13.5px] font-medium leading-[2] text-[#1F3E4D] ${
          compact ? "line-clamp-3" : ""
        }`}
      >
        {o.message || "پیامی نوشته نشده بود."}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-[#E3F6FD] px-3 py-1 text-[12px] font-bold text-[#006387]">
          {OCCASIONS[o.occasion] ?? "همین‌طوری"}
        </span>
        <span className="rounded-full bg-[#E5F8EC] px-3 py-1 text-[12px] font-extrabold text-[#177A3D]">
          نمایش امن با وریفای شماره
        </span>
        {o.anonymous && (
          <span className="rounded-full bg-[#FFE0EA] px-3 py-1 text-[12px] font-bold text-[#B02A52]">ناشناس</span>
        )}
      </div>
    </div>
  );
}

function EmptyTrack() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-5 rounded-[28px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-14 text-center">
        <span className="text-[44px]">📦</span>
        <p className="m-0 text-[15.5px] font-bold leading-[2]">
          هنوز هدیه‌ای برای رهگیری انتخاب نشده.
          <br />
          از «هدیه‌هام» یه سفارش رو انتخاب کن.
        </p>
        <button
          type="button"
          onClick={() => navigate("my-gifts")}
          className="flex h-12 items-center gap-2 rounded-full bg-[#00ABE7] px-6 text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95"
        >
          رفتن به هدیه‌هام
          <ForwardIcon size={16} />
        </button>
      </div>
      <TrackByCode />
    </div>
  );
}

/* ── رهگیری با کد سفارش + موبایل (guide §B4 fallback: /track code+phone) ── */
interface TrackHit {
  code: string;
  status: string;
  stepLabel: string;
  stepBody: string;
  postTrackingCode?: string; // UX-12 — filled once the box is with the post
}

function TrackByCode() {
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [hit, setHit] = useState<TrackHit | null>(null);
  const [err, setErr] = useState("");
  const { toast } = useToast();

  const faDigits = (s: string) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

  const lookup = async () => {
    setBusy(true);
    setErr("");
    setHit(null);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim(), phone }),
      });
      if (!res.ok) {
        setErr(res.status === 404 ? "با این کد و شماره، سفارشی پیدا نشد." : "یه مشکلی پیش اومد؛ دوباره امتحان کن.");
        return;
      }
      const body = (await res.json()) as { code: string; status: string; stepLabel: string; postTrackingCode?: string };
      const stepBody = STEP_FA_SUB[body.status] ?? "وضعیت سفارش به‌روزه.";
      setHit({ code: body.code, status: body.status, stepLabel: body.stepLabel, stepBody, postTrackingCode: body.postTrackingCode || "" });
      toast({ title: "سفارش پیدا شد ✓" });
    } catch {
      setErr("اینترنت قطعه؛ اتصالت رو چک کن.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-[28px] border border-[#DDEEF5] bg-white px-6 py-6">
      <div className="text-[16px] font-extrabold">رهگیری با کد سفارش</div>
      <p className="mb-4 mt-1.5 text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">
        کد PN از صفحه‌ی موفقیت یا پیامکت رو با شماره‌ی موبایلت وارد کن.
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex min-w-[200px] flex-1 flex-col gap-1.5">
          <span className="text-[12px] font-bold text-[#4A6572]">کد سفارش</span>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="PN-251213-0007"
            dir="ltr"
            className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-[15px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
          />
        </label>
        <label className="flex min-w-[200px] flex-1 flex-col gap-1.5">
          <span className="text-[12px] font-bold text-[#4A6572]">شماره‌ی موبایل</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
            inputMode="tel"
            className="h-12 rounded-2xl border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-4 text-[15px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
          />
        </label>
        <button
          type="button"
          disabled={busy || code.trim().length < 8 || phone.trim().length < 8}
          onClick={() => void lookup()}
          className="h-12 rounded-full bg-[#04202E] px-7 text-[14.5px] font-extrabold text-white transition-transform active:scale-95 disabled:opacity-50"
        >
          {busy ? "در حال جست‌وجو…" : "جست‌وجو"}
        </button>
      </div>
      {err && (
        <div className="mt-3 rounded-2xl bg-[#FFE9F0] px-4 py-3 text-[13px] font-bold text-[#B02A52]">{err}</div>
      )}
      {hit && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#E3F6FD] px-4 py-3.5">
          <div className="flex flex-col">
            <span className="text-[13px] font-black" dir="ltr">{faDigits(hit.code)}</span>
            <span className="text-[12.5px] font-medium leading-[1.8] text-[#4A6572]">{hit.stepBody}</span>
            {/* UX-12 — کد رهگیری پست برای مشتری، وقتی مرسوله دست پسته */}
            {hit.postTrackingCode ? (
              <span className="mt-1 flex flex-wrap items-center gap-2 text-[12.5px] font-bold text-[#04202E]">
                کد رهگیری پست:
                <span dir="ltr" className="rounded-[10px] bg-white px-2 py-0.5 font-black">{faDigits(hit.postTrackingCode)}</span>
                <button
                  type="button"
                  onClick={() => {
                    void copyText(hit.postTrackingCode ?? "").then((okc) => toast({ title: okc ? "کد کپی شد ✓" : "کپی نشد" }));
                  }}
                  className="rounded-full border-[1.5px] border-[#BFE0F2] bg-white px-3 py-1 text-[11px] font-extrabold text-[#006387] transition-colors hover:bg-[#F2FAFD]"
                >
                  کپی
                </button>
              </span>
            ) : null}
          </div>
          <span className="rounded-full bg-[#04202E] px-4 py-1.5 text-[12.5px] font-extrabold text-white">{hit.stepLabel}</span>
        </div>
      )}
    </div>
  );
}

const STEP_FA_SUB: Record<string, string> = {
  awaiting_payment: "سفارش منتظر پرداخته.",
  payment_under_review: "رسید ثبت شده و در حال بررسیه.",
  paid: "پرداخت تأیید شد؛ به‌زودی بسته‌بندی می‌شه.",
  preparing: "جعبه داره با دلسوزی بسته‌بندی می‌شه.",
  shipped: "جعبه تحویل پست شده و در راهه.",
  delivered: "جعبه تحویل داده شد؛ نوبت باز کردن پیام‌هاست!",
  failed: "پرداخت ناموفق بوده؛ می‌تونی دوباره امتحان کنی.",
  cancelled: "این سفارش لغو شده.",
  expired: "این سفارش منقضی شده.",
  refund_requested: "درخواست مرجوعیت در جریانه.",
  refunded: "مرجوعیت انجام شد.",
};

/* ── share/copy gift info button (shared logic, two looks) + success micro-burst ── */
const BURST_COLORS = ["#F0426B", "#00ABE7", "#FFF3C9", "#66CDF1", "#FFE0EA"];

function CopyGiftButton({ o, dark = false }: { o: BoardOrder; dark?: boolean }) {
  const { toast } = useToast();
  const [burst, setBurst] = useState(0);

  return (
    <button
      type="button"
      onClick={async () => {
        const link = `${window.location.origin}/gift`;
        const text = `یه جعبه آبی رسید ♥\nهدیه‌ی شماره‌ی ${fa(o.no)} برای ${o.to}\nپیامش فقط با تأیید شماره موبایلش باز می‌شه\n${link}`;
        const ok = await copyText(text);
        if (ok) setBurst((n) => n + 1);
        toast(
          ok
            ? { title: "کپی شد ✓", description: "اطلاعات هدیه تو حافظه‌ست؛ براش بفرستش." }
            : {
                title: "کپی نشد؛ دستی بردار:",
                description: `هدیه‌ی ${fa(o.no)} برای ${o.to} · yekdoost.ir/gift`,
              },
        );
      }}
      className={`relative flex h-[52px] w-full items-center justify-center gap-2 overflow-visible rounded-full text-[14.5px] font-extrabold transition-transform active:scale-95 md:h-[54px] md:text-[15px] md:active:scale-100 md:hover:scale-[1.02] ${
        dark ? "border-2 border-[#04202E] text-[#04202E]" : "border-2 border-dashed border-[#9CC9DA] bg-white text-[#006387]"
      }`}
    >
      {burst > 0 && (
        <span key={burst} aria-hidden="true" className="pointer-events-none absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => {
            const ang = (i / 12) * Math.PI * 2 + Math.random() * 0.4;
            const dist = 34 + Math.random() * 30;
            return (
              <span
                key={i}
                className="pishnam-burst-piece block"
                style={
                  {
                    "--bx": `${Math.cos(ang) * dist}px`,
                    "--by": `${Math.sin(ang) * dist - 12}px`,
                    "--br": `${(Math.random() * 2 - 1) * 220}deg`,
                    width: i % 3 === 0 ? 9 : 6,
                    height: i % 3 === 0 ? 9 : 11,
                    borderRadius: i % 4 === 0 ? "50%" : 2.5,
                    background: BURST_COLORS[i % BURST_COLORS.length],
                    animationDelay: `${(i % 4) * 0.04}s`,
                  } as CSSProperties
                }
              />
            );
          })}
        </span>
      )}
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="12" height="12" rx="2.5" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      کپی اطلاعات هدیه
    </button>
  );
}

/* ── download gift card as PNG (canvas-drawn, plush lifted from the live SVG) ── */
export function DownloadGiftButton({ o, dark = false }: { o: BoardOrder; dark?: boolean }) {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        if (busy) return;
        setBusy(true);
        const svg = document.querySelector("[data-giftcard-plush] svg");
        const ok = await downloadGiftCard(o, svg as SVGSVGElement | null);
        setBusy(false);
        toast(
          ok
            ? { title: "کارت هدیه ساخته شد 🖼", description: "عکس کارت دانلود شد؛ می‌تونی براش بفرستیش." }
            : { title: "ساختن کارت ممکن نشد", description: "مرورگرت اجازه‌ی دانلود نداد؛ دوباره امتحان کن." },
        );
      }}
      className={`relative flex h-[52px] w-full items-center justify-center gap-2 rounded-full text-[14.5px] font-extrabold transition-transform active:scale-95 disabled:opacity-60 md:h-[54px] md:text-[15px] md:active:scale-100 md:hover:scale-[1.02] ${
        dark ? "border-2 border-[#04202E] text-[#04202E]" : "border-2 border-dashed border-[#F0B7C9] bg-white text-[#B02A52]"
      }`}
    >
      {busy ? (
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="M7 10l5 5 5-5" />
          <path d="M12 15V3" />
        </svg>
      )}
      {busy ? "در حال ساختن کارت…" : "دانلود کارت هدیه (PNG)"}
    </button>
  );
}

/* ═══ MOBILE ═══ */
export function MobileTrack() {
  const o = useSelectedOrder();
  const hold = useHold(o);
  const chip = o ? orderChip(o) : null;
  const onJourney = o ? (!o.v2 || isOnJourney(o)) : true;

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] md:hidden">
      <MobileTopBar title="رهگیری هدیه" back="my-gifts" />
      {!o ? (
        <div className="px-5 py-8">
          <EmptyTrack />
        </div>
      ) : (
        <>
          {/* header */}
          <div className="px-5 pb-1 pt-[18px]">
            <div className="flex items-center gap-3.5">
              <PlushTile o={o} size={64} box={76} />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <h1 className="m-0 truncate text-[24px] font-black leading-[1.4]">{who(o)}</h1>
                  <span className="shrink-0 rounded-[12px] bg-[#04202E] px-2.5 py-[3px] text-[12px] font-extrabold text-white">
                    {fa(o.no)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-[10px] px-2.5 py-1 text-[12px] font-bold"
                    style={{ background: chip?.bg, color: chip?.fg ?? undefined }}
                  >
                    {chip?.label}
                  </span>
                  {o.v2 && o.status2 === "awaiting_payment" && hold.expiresAt && (
                    <CountdownBadge expiresAt={hold.expiresAt} />
                  )}
                  <span className="text-[12.5px] font-medium text-[#4A6572]">{o.date}</span>
                </div>
              </div>
            </div>
            {/* mini progress — only for orders actually on the 4-step journey */}
            {onJourney && (
            <div className="mt-4 flex items-center gap-3">
              <div className="h-[10px] flex-1 overflow-hidden rounded-full bg-[#E1EFF5]">
                <div
                  className="h-full rounded-full bg-[#00ABE7] transition-[width] duration-700 ease-out"
                  style={{ width: `${((statusToStep(o.status) + 1) / 4) * 100}%` }}
                />
              </div>
              <span className="shrink-0 text-[12px] font-extrabold text-[#006387]">
                {fa(statusToStep(o.status) + 1)} از {fa(4)} قدم
              </span>
            </div>
            )}
            {/* honest status banner for orders outside the journey (unpaid/dead) */}
            {!onJourney && (
              <div className="mt-4 flex flex-col gap-2 rounded-[20px] border border-[#F2E3A0] bg-[#FFFBEC] px-4 py-3.5">
                <span className="text-[13.5px] font-extrabold text-[#04202E]">{bannerNote(o.status2)}</span>
                <PaymentBlock o={o} />
              </div>
            )}
          </div>

          {/* timeline */}
          {onJourney && (
          <div className="mt-4 px-5">
            <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
              <ol className="m-0 list-none p-0">
                {TRACK_STEPS.map((_, i) => (
                  <TimelineRow key={TRACK_STEPS[i].key} i={i} current={statusToStep(o.status)} o={o} />
                ))}
              </ol>
            </div>
          </div>
          )}

          {/* details */}
          <div className="mt-4 px-5">
            <div className="rounded-[24px] border border-[#DDEEF5] bg-white px-5 py-2.5">
              <InfoRow k="گیرنده" v={o.dir === "sent" ? o.to : "تو"} />
              <InfoRow k="شهر" v={o.city} />
              {o.address && <InfoRow k="آدرس" v={o.address} />}
              <InfoRow k="قلب و پنجه" v={extras(o)} />
              <InfoRow k="مبلغ پرداختی" v={faPrice(o.total)} />
            </div>
          </div>

          {/* postcard */}
          <div className="mt-4 px-5">
            <PostcardCard o={o} compact />
          </div>

          {/* actions */}
          <div className="sticky bottom-[var(--pn-mnav-h)] mt-auto flex flex-col gap-2.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5">
            <div className="flex gap-3">
              {o.dir === "recv" && (
                <button
                  type="button"
                  onClick={() => navigate("gift")}
                  className="flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#E3F6FD] text-[14.5px] font-extrabold text-[#006387] transition-transform active:scale-95"
                >
                  مشاهده‌ی پیام
                  <ForwardIcon size={16} stroke="#006387" />
                </button>
              )}
              {o.dir === "sent" && o.status === "delivered" && (
                <button
                  type="button"
                  onClick={() => navigate("pick")}
                  className="flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#00ABE7] text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95"
                >
                  یه بغل دیگه بفرست
                  <ForwardIcon size={16} />
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <CopyGiftButton o={o} />
              <DownloadGiftButton o={o} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ═══ DESKTOP ═══ */
export function DesktopTrack() {
  const o = useSelectedOrder();
  const hold = useHold(o);

  if (!o)
    return (
      <div className="hidden min-h-screen flex-col bg-[#F2FAFD] md:flex">
        <main className="mx-auto flex w-full max-w-[900px] flex-col gap-5 px-6 pb-14 pt-12">
          <EmptyTrack />
        </main>
      </div>
    );

  const cur = statusToStep(o.status);
  const chip = orderChip(o);
  const onJourney = !o.v2 || isOnJourney(o);

  return (
    <div className="hidden min-h-screen flex-col bg-[#F2FAFD] md:flex">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-7 px-6 pb-14 pt-10">
        {/* breadcrumb + heading */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[13.5px] font-bold text-[#4A6572]">
            <button type="button" onClick={() => navigate("my-gifts")} className="text-[#00779F] hover:underline">
              هدیه‌هام
            </button>
            <span>/</span>
            <span>رهگیری هدیه‌ی {fa(o.no)}</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="m-0 text-[44px] font-black leading-[1.35]">سفر جعبه‌ی {fa(o.no)}</h1>
              <p className="m-0 text-[15px] font-medium text-[#4A6572]">
                {who(o)} · {o.date} · {extras(o)}
              </p>
            </div>
            <span
              className="rounded-[14px] px-4 py-2 text-[14px] font-extrabold"
              style={{ background: chip.bg, color: chip.fg ?? undefined }}
            >
              {chip.label}
            </span>
            {o.v2 && o.status2 === "awaiting_payment" && hold.expiresAt && (
              <CountdownBadge expiresAt={hold.expiresAt} />
            )}
          </div>
        </section>

        {/* honest status banner for orders outside the journey (unpaid/dead) */}
        {!onJourney && (
          <section className="flex flex-col gap-3 rounded-[28px] border border-[#F2E3A0] bg-[#FFFBEC] p-7">
            <span className="text-[15px] font-extrabold text-[#04202E]">{bannerNote(o.status2)}</span>
            <div className="max-w-[560px]">
              <PaymentBlock o={o} desktop />
            </div>
          </section>
        )}

        {/* horizontal stepper */}
        {onJourney && (
        <section className="rounded-[28px] border border-[#DDEEF5] bg-white p-7">
          <div className="relative flex items-start justify-between">
            <div className="absolute inset-x-[46px] top-[23px] h-[3px] rounded bg-[#E1EFF5]" aria-hidden>
              <div
                className="h-full rounded bg-[#00ABE7] transition-[width] duration-700 ease-out"
                style={{ width: `${(cur / 3) * 100}%` }}
              />
            </div>
            {TRACK_STEPS.map((s, i) => {
              const done = i < cur;
              const isNow = i === cur;
              return (
                <div key={s.key} className="relative z-10 flex w-[130px] flex-col items-center gap-2 text-center">
                  <span
                    className={`flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 ${
                      done
                        ? "border-[#00ABE7] bg-[#00ABE7] text-white"
                        : isNow
                          ? "border-[#00ABE7] bg-white text-[#00ABE7] pishnam-pulse-ring"
                          : "border-dashed border-[#9CC9DA] bg-white text-[#4A6572]"
                    }`}
                  >
                    {done ? <CheckIcon size={18} stroke="#fff" /> : <span className="font-black">{fa(i + 1)}</span>}
                  </span>
                  <span className={`text-[14.5px] font-extrabold ${isNow ? "text-[#00779F]" : ""}`}>{s.label}</span>
                  <span className="text-[11.5px] font-semibold text-[#4A6572]">{stepNote(i, cur, o)}</span>
                </div>
              );
            })}
          </div>
        </section>
        )}

        {/* two columns */}
        <section className="grid grid-cols-[1fr_400px] gap-7">
          {/* right: vertical timeline + details */}
          <div className="flex flex-col gap-7">
            {onJourney && (
            <div className="rounded-[28px] border border-[#DDEEF5] bg-white p-7">
              <h2 className="mb-5 mt-0 text-[19px] font-extrabold">قدم‌به‌قدم</h2>
              <ol className="m-0 list-none p-0">
                {TRACK_STEPS.map((_, i) => (
                  <TimelineRow key={TRACK_STEPS[i].key} i={i} current={cur} o={o} big />
                ))}
              </ol>
            </div>
            )}
            <div className="rounded-[28px] border border-[#DDEEF5] bg-white px-6 py-2.5">
              <h2 className="mb-1 mt-4 text-[19px] font-extrabold">جزئیات سفارش</h2>
              <InfoRow k="گیرنده" v={o.dir === "sent" ? o.to : "تو"} />
              <InfoRow k="شهر" v={o.city} />
              {o.address && <InfoRow k="آدرس" v={o.address} />}
              <InfoRow k="تاریخ" v={o.date} />
              <InfoRow k="قلب و پنجه" v={extras(o)} />
              <InfoRow k="مبلغ پرداختی" v={faPrice(o.total)} />
              <div className="h-3" />
            </div>
          </div>

          {/* left: plush + postcard + actions */}
          <div className="flex flex-col gap-7">
            <div className="rounded-[28px] border border-[#DDEEF5] bg-white p-6">
              <PlushTile o={o} size={170} box={190} />
              <div className="mt-4 text-center">
                <div className="text-[18px] font-black">{PLUSH_MAP[o.kind].name}</div>
                <div className="mt-1 text-[13px] font-medium text-[#4A6572]">{PLUSH_MAP[o.kind].chips.join(" · ")}</div>
              </div>
            </div>

            <PostcardCard o={o} />

            <div className="flex flex-col gap-3">
              {o.dir === "recv" && (
                <button
                  type="button"
                  onClick={() => navigate("gift")}
                  className="flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#E3F6FD] text-[15px] font-extrabold text-[#006387] transition-transform hover:scale-[1.02]"
                >
                  مشاهده‌ی پیام
                  <ForwardIcon size={16} stroke="#006387" />
                </button>
              )}
              {o.dir === "sent" && o.status === "delivered" && (
                <button
                  type="button"
                  onClick={() => navigate("pick")}
                  className="flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-[15px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02]"
                >
                  یه بغل دیگه بفرست
                  <ForwardIcon size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={() => navigate("my-gifts")}
                className="flex h-[54px] items-center justify-center gap-2 rounded-full border-2 border-[#04202E] text-[15px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02]"
              >
                برگرد به هدیه‌هام
              </button>
              <CopyGiftButton o={o} dark />
              <DownloadGiftButton o={o} dark />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
