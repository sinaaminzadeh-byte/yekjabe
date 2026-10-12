"use client";

// ── Dashboards: MyGifts / Impact (دفتر مهربونی) / Login — mobile + desktop ──
// Ported 1:1 from the design system files:
//   02-هدیه‌هام (mobile) · 16-هدیه‌هام (desktop)
//   08-دفتر مهربونی (mobile) · 14-دفتر مهربونی (desktop)
//   03-ورود یا ثبت‌نام (mobile) · 15-ورود یا ثبت‌نام (desktop)
// with REAL store wiring (orders, charity counter, OTP login flow).
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Plush } from "../plush";
import { Logo } from "../logo";
import {
  BackIcon,
  ForwardIcon,
  GiftBoxIcon,
  HeartIcon,
  HeartSticker,
  MailIcon,
  PawIcon,
} from "../icons";
import { navigate, type Route } from "@/lib/hash-route";
import {
  usePishnam,
  useCharityDone,
  type GiftOrder,
  type GiftStatus,
} from "@/lib/pishnam-store";
import { CHARITY_TARGET, PLUSH_MAP } from "@/lib/pishnam-data";
import { fa } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";

/* ═══════════════ shared constants & helpers ═══════════════ */

const STATUS_MAP: Record<GiftStatus, { label: string; bg: string }> = {
  paid: { label: "بسته‌بندی", bg: "#FFF3C9" },
  packing: { label: "بسته‌بندی", bg: "#FFF3C9" },
  shipped: { label: "در راه", bg: "#CDEFFB" },
  delivered: { label: "تحویل شد", bg: "#D7F5E4" },
};

const NEXT_LABEL: Record<GiftStatus, string> = {
  paid: "بسته‌بندی",
  packing: "تحویل به پست",
  shipped: "تحویل به دوستت",
  delivered: "تمام شد",
};

function recvStatus(o: GiftOrder) {
  return o.opened
    ? { label: "پیام رو دیدی", bg: "#D7F5E4" }
    : { label: "پیام منتظرته", bg: "#CDEFFB" };
}

function sentExtra(o: GiftOrder): string {
  const parts: string[] = [];
  if (o.anonymous) parts.push("ناشناس");
  if (o.hearts > 0) parts.push(`${fa(o.hearts)} قلب`);
  if (o.paws > 0) parts.push(`${fa(o.paws)} پنجه`);
  return parts.length ? parts.join(" · ") : "بدون آپشن";
}

function recvExtra(o: GiftOrder): string {
  return o.opened ? "کارت باز شده" : "کارت رمزدار";
}

function orderWho(o: GiftOrder): string {
  return o.dir === "sent"
    ? `برای ${o.to}`
    : `از ${o.senderName || "یه دوست ناشناس"}`;
}

function orderExtra(o: GiftOrder): string {
  return o.dir === "sent" ? sentExtra(o) : recvExtra(o);
}

function toEnDigits(s: string): string {
  return s.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

/* ── impact: receipts + steps + badges ── */

interface ReceiptRow {
  bg: string;
  name: string;
  meta: string;
  tag: string;
  mine?: boolean;
}

// padded placeholders from design FILE 14 script (keeps layout full)
const CHARITY_RECEIPTS: ReceiptRow[] = [
  { bg: "#D6F1FB", name: "ارسال هدیه به خیریه‌ی همت", meta: "۵ آبان · ۱۲ هدیه", tag: "رسید و عکس تحویل" },
  { bg: "#FFE9F0", name: "ارسال هدیه به پناهگاه حیوونا", meta: "۲۱ آبان · ۱۵ هدیه", tag: "رسید و عکس تحویل" },
  { bg: "#FFF3C9", name: "ارسال هدیه به خیریه‌ی نیکوکاری رأفت", meta: "۹ آذر · ۱۸ هدیه", tag: "رسید و عکس تحویل" },
];

function buildReceipts(sent: GiftOrder[]): ReceiptRow[] {
  const mine: ReceiptRow[] = sent.map((o) => ({
    bg: "#DDF3EA",
    name: `ارسال هدیه برای ${o.to}`,
    meta: `${o.date} · ${fa(o.hearts + o.paws)} قلب و پنجه`,
    tag: "سهم تو",
    mine: true,
  }));
  const rows = [...mine];
  for (const r of CHARITY_RECEIPTS) {
    if (rows.length >= 3) break;
    rows.push(r);
  }
  return rows;
}

const IMPACT_STEPS = [
  { n: "۱", bg: "#FFE9F0", text: "پولِ قلب‌ها و پنجه‌ها جدا از فروش جعبه‌ها نگه داشته می‌شه." },
  { n: "۲", bg: "#D6F1FB", text: "با پول جمع‌شده هدیه می‌خریم و خودمون به خیریه می‌رسونیم." },
  { n: "۳", bg: "#FFF3C9", text: "رسید، عکس و تأییدیه‌ی تحویل رو همین‌جا برات می‌ذاریم." },
];

interface Badge {
  key: string;
  done: boolean;
  bg: string;
  icon: ReactNode;
  label: string;
  hint: string;
}

function useBadges(): Badge[] {
  const orders = usePishnam((s) => s.orders);
  return useMemo(() => {
    const sent = orders.filter((o) => o.dir === "sent");
    const recv = orders.filter((o) => o.dir === "recv");
    const hearts = sent.reduce((a, o) => a + o.hearts, 0);
    const paws = sent.reduce((a, o) => a + o.paws, 0);
    return [
      { key: "first", done: sent.length >= 1, bg: "#CDEFFB", icon: <GiftBoxIcon size={17} className="text-[#00779F]" />, label: "اولین قدم", hint: "اولین هدیه‌ات رو بفرست" },
      { key: "hearts", done: hearts >= 5, bg: "#FFE9F0", icon: <HeartIcon size={16} className="text-[#F0426B]" />, label: "قلب‌بارون", hint: "۵ قلب یا بیشتر بفرست" },
      { key: "paws", done: paws >= 3, bg: "#FFF3C9", icon: <PawIcon size={16} />, label: "پنجه‌ی مهربون", hint: "۳ پنجه یا بیشتر بفرست" },
      { key: "anon", done: sent.some((o) => o.anonymous), bg: "#E7E0FA", icon: <MailIcon size={16} className="text-[#00779F]" />, label: "ناشناسِ خوش‌نیت", hint: "یه هدیه‌ی ناشناس بفرست" },
      { key: "recv", done: recv.length >= 1, bg: "#DDF3EA", icon: <HeartSticker size={20} />, label: "بغل‌گیرنده", hint: "یه هدیه دریافت کن" },
    ];
  }, [orders]);
}

/* ── small building blocks ── */

function DocIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </svg>
  );
}

function TabsPill({
  tab,
  onChange,
  className = "",
  height = 42,
  fontSize = "14.5px",
}: {
  tab: "sent" | "recv";
  onChange: (t: "sent" | "recv") => void;
  className?: string;
  height?: number;
  fontSize?: string;
}) {
  return (
    <div className={`flex gap-1.5 rounded-[22px] bg-[#E3F0F5] p-[5px] ${className}`}>
      {(["sent", "recv"] as const).map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={tab === t}
          onClick={() => onChange(t)}
          className="flex-1 rounded-[17px] font-extrabold text-[#04202E] transition-colors"
          style={{ height, fontSize, background: tab === t ? "#fff" : "transparent" }}
        >
          {t === "sent" ? "فرستاده‌ها" : "دریافتی‌ها"}
        </button>
      ))}
    </div>
  );
}

function CharmChips({
  hearts,
  paws,
  anonymous,
  className = "",
}: {
  hearts: number;
  paws: number;
  anonymous: number;
  className?: string;
}) {
  if (hearts + paws + anonymous === 0) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {hearts > 0 && (
        <span className="flex items-center gap-1.5 rounded-full border border-[#F7C5D3] bg-[#FFE9F0] px-3 py-1.5 text-[12px] font-extrabold text-[#04202E]">
          <HeartIcon size={14} className="text-[#F0426B]" />
          {fa(hearts)} قلب
        </span>
      )}
      {paws > 0 && (
        <span className="flex items-center gap-1.5 rounded-full border border-[#BFE5D3] bg-[#DDF3EA] px-3 py-1.5 text-[12px] font-extrabold text-[#04202E]">
          <PawIcon size={14} />
          {fa(paws)} پنجه
        </span>
      )}
      {anonymous > 0 && (
        <span className="flex items-center gap-1.5 rounded-full border border-[#DDEEF5] bg-white px-3 py-1.5 text-[12px] font-extrabold text-[#04202E]">
          <MailIcon size={14} className="text-[#00779F]" />
          ناشناس × {fa(anonymous)}
        </span>
      )}
    </div>
  );
}

function PlushThumb({ o, size, box }: { o: GiftOrder; size: number; box: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center"
      style={{ width: box, height: box, borderRadius: box >= 88 ? 22 : 18, background: PLUSH_MAP[o.kind].bg }}
    >
      <Plush kind={o.kind} size={size} />
    </div>
  );
}

function EmptyPanel({ tab, desktop = false }: { tab: "sent" | "recv"; desktop?: boolean }) {
  const isSent = tab === "sent";
  return (
    <div
      className={`flex flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-[#99D6EE] bg-white/60 text-center ${
        desktop ? "w-full px-8 py-14" : "px-6 py-10"
      }`}
    >
      <Plush kind={isSent ? "duck" : "bunny"} size={desktop ? 150 : 110} />
      <div className="flex flex-col gap-2">
        <span className={`${desktop ? "text-[20px]" : "text-[17px]"} font-black`}>
          {isSent ? "هنوز هیچ هدیه‌ای نفرستادی" : "هنوز هدیه‌ای دریافت نکردی"}
        </span>
        <span className={`${desktop ? "text-[14.5px]" : "text-[13px]"} max-w-[420px] font-medium leading-[1.9] text-[#4A6572]`}>
          {isSent
            ? "اولین بغل پشمالوت رو برای یه دوست بساز؛ هر هدیه یه شماره‌ی مخصوص خودش رو می‌گیره و همین‌جا می‌مونه."
            : "وقتی یکی برات هدیه بفرسته، کارت و پیامش همین‌جا می‌افته. فعلاً تو غافلگیری پیش‌دستی کن!"}
        </span>
      </div>
      <button
        type="button"
        onClick={() => navigate("pick")}
        className={`flex items-center justify-center rounded-full bg-[#00ABE7] font-extrabold text-[#04202E] transition-transform hover:scale-[1.03] active:scale-95 ${
          desktop ? "h-[50px] px-7 text-[15px]" : "h-12 px-6 text-[14.5px]"
        }`}
      >
        بساز و بفرست
      </button>
    </div>
  );
}

function ReceiptCard({ r, desktop = false }: { r: ReceiptRow; desktop?: boolean }) {
  return (
    <div className={`flex items-center gap-4 rounded-[26px] border border-[#DDEEF5] bg-white ${desktop ? "px-5 py-[18px]" : "p-4"}`}>
      <div
        className={`flex shrink-0 items-center justify-center rounded-[14px] border-2 border-[#04202E] ${desktop ? "h-[68px] w-[60px]" : "h-16 w-14"}`}
        style={{ background: r.bg }}
      >
        <DocIcon />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className={`${desktop ? "text-[16px]" : "text-[15.5px]"} font-extrabold`}>{r.name}</span>
        <span className={`${desktop ? "text-[13px]" : "text-[12.5px]"} font-medium text-[#4A6572]`}>{r.meta}</span>
        <span className="self-start rounded-[10px] px-2.5 py-1 text-[12px] font-bold" style={{ background: r.mine ? "#FFE9F0" : "#D6F1FB" }}>
          {r.tag}
        </span>
      </div>
      <ForwardIcon size={desktop ? 22 : 20} stroke="#5B7482" />
    </div>
  );
}

function NextDeliveryBox({ desktop = false }: { desktop?: boolean }) {
  return (
    <div className={`flex items-center gap-4 rounded-[26px] border-2 border-dashed border-[#99D6EE] ${desktop ? "px-5 py-5" : "px-4 py-[18px]"}`}>
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E3F6FD]">
        <GiftBoxIcon size={26} className="text-[#006387]" />
      </span>
      <div className="flex flex-col gap-1">
        <span className={`${desktop ? "text-[16px]" : "text-[15px]"} font-extrabold`}>ارسال بعدی</span>
        <span className={`${desktop ? "text-[13.5px]" : "text-[12.5px]"} font-medium leading-[1.8] text-[#4A6572]`}>
          وقتی بسته‌ی جاری کامل شد، مدرکش همین‌جا اضافه می‌شه.
        </span>
      </div>
    </div>
  );
}

function StepRow({ s, desktop = false }: { s: (typeof IMPACT_STEPS)[number]; desktop?: boolean }) {
  return (
    <div className={`flex items-center gap-4 border border-[#DDEEF5] bg-white ${desktop ? "rounded-[24px] px-5 py-[18px]" : "rounded-[22px] px-4 py-[14px]"}`}>
      <span
        className={`flex shrink-0 items-center justify-center rounded-full border-2 border-[#04202E] font-black ${desktop ? "h-[42px] w-[42px] text-[17px]" : "h-[38px] w-[38px] text-[16px]"}`}
        style={{ background: s.bg }}
      >
        {s.n}
      </span>
      <span className={`${desktop ? "text-[15px] leading-[1.9]" : "text-[14px] leading-[1.85]"} font-semibold text-[#1F3E4D]`}>{s.text}</span>
    </div>
  );
}

function CharityProgressCard({ done, pct, desktop = false }: { done: number; pct: number; desktop?: boolean }) {
  return (
    <div
      className={
        desktop
          ? "flex min-w-0 flex-[1_1_460px] max-w-[560px] flex-col gap-4 rounded-[32px] bg-[#04202E] p-[30px] text-white"
          : "mx-5 mt-3.5 flex flex-col gap-3 rounded-[30px] bg-[#04202E] p-[22px] text-white"
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className={`${desktop ? "text-[16px] font-extrabold" : "text-[14px] font-bold"} text-[#BFE9F8]`}>اولین بسته‌ی خیریه</span>
        <span className={`${desktop ? "text-[13px] font-bold" : "text-[12.5px] font-semibold"} text-[#BFE9F8]`}>در حال جمع شدن</span>
      </div>
      <div className="flex flex-wrap items-baseline gap-2.5">
        <span className={`${desktop ? "text-[56px]" : "text-[52px]"} font-black leading-[1.1] text-[#00ABE7]`}>{fa(done)}</span>
        <span className={`${desktop ? "text-[19px]" : "text-[18px]"} font-bold`}>از {fa(CHARITY_TARGET)} هدیه</span>
      </div>
      <div className={`overflow-hidden bg-[#0E3C52] ${desktop ? "h-4 rounded-[8px]" : "h-[14px] rounded-[7px]"}`}>
        <div
          className={`h-full bg-[#00ABE7] transition-[width] duration-700 ease-out ${desktop ? "rounded-[8px]" : "rounded-[7px]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`${desktop ? "text-[13.5px]" : "text-[13px]"} font-medium leading-[1.9] text-[#D3EEF9]`}>
        {desktop
          ? `${fa(pct)}٪ کامل شده. وقتی به ${fa(CHARITY_TARGET)} تا برسیم، هدیه‌ها رو می‌خریم و می‌فرستیم؛ رسید و عکس تحویلش رو همین‌جا می‌بینی.`
          : `وقتی به ${fa(CHARITY_TARGET)} تا برسیم، هدیه‌ها رو می‌خریم و می‌فرستیم. بعدش رسید و عکس تحویلش رو همین پایین می‌بینی.`}
      </span>
      {!desktop && (
        <button
          type="button"
          onClick={() => navigate("extras")}
          className="flex h-11 items-center gap-1.5 self-start rounded-full bg-[#00ABE7] px-5 text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95"
        >
          تو هم قلب اضافه کن
        </button>
      )}
    </div>
  );
}

function BadgesRow({ className = "" }: { className?: string }) {
  const badges = useBadges();
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map((b) => (
        <div
          key={b.key}
          title={b.hint}
          className="flex items-center gap-2 rounded-full border py-1.5 pe-3.5 ps-1.5 transition-all"
          style={{
            background: b.done ? b.bg : "#F2F7F9",
            borderColor: b.done ? "#D3E8F0" : "#E2EEF3",
            opacity: b.done ? 1 : 0.6,
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#04202E] bg-white">{b.icon}</span>
          <span className="text-[13px] font-extrabold text-[#04202E]">{b.label}</span>
          {!b.done && <span className="text-[11px] font-bold text-[#4A6572]">قفل</span>}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════ 1 · MOBILE MY GIFTS (02-هدیه‌هام) ═══════════════ */

function MobileOrderCard({ o }: { o: GiftOrder }) {
  const advanceStatus = usePishnam((s) => s.advanceStatus);
  const selectOrder = usePishnam((s) => s.selectOrder);
  const st = o.dir === "sent" ? STATUS_MAP[o.status] : recvStatus(o);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`رهگیری هدیه ${fa(o.no)}`}
      onClick={() => {
        selectOrder(o.id);
        navigate("track");
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectOrder(o.id);
          navigate("track");
        }
      }}
      className="cursor-pointer rounded-[24px] border border-[#DDEEF5] bg-white p-[14px] outline-none transition-all hover:border-[#00ABE7] hover:shadow-[0_6px_18px_rgba(4,32,46,0.06)] focus-visible:ring-2 focus-visible:ring-[#00ABE7]"
    >
      <div className="flex items-center gap-[14px]">
        <PlushThumb o={o} size={54} box={64} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[15.5px] font-extrabold">{orderWho(o)}</span>
            <span className="shrink-0 rounded-[12px] bg-[#04202E] px-2.5 py-[3px] text-[12px] font-extrabold text-white">{fa(o.no)}</span>
          </div>
          <span className="text-[12.5px] font-medium text-[#4A6572]">
            {o.date} · {orderExtra(o)}
          </span>
          <span className="self-start rounded-[10px] px-2.5 py-1 text-[12px] font-bold" style={{ background: st.bg }}>
            {st.label}
          </span>
        </div>
      </div>

      {o.dir === "recv" && (
        <div className="mt-3 flex border-t border-[#EDF6FA] pt-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate("gift");
            }}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#E3F6FD] text-[13px] font-extrabold text-[#006387] transition-transform active:scale-95"
          >
            مشاهده‌ی پیام
            <ForwardIcon size={16} stroke="#006387" />
          </button>
        </div>
      )}

      {o.dir === "sent" && o.status !== "delivered" && (
        <div className="mt-3 flex items-center gap-3 border-t border-[#EDF6FA] pt-3">
          <span className="shrink-0 text-[11.5px] font-semibold text-[#4A6572]">شبیه‌سازی مسیر</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              advanceStatus(o.id);
            }}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#FFF3C9] text-[13px] font-extrabold text-[#04202E] transition-transform active:scale-95"
          >
            قدم بعدی: {NEXT_LABEL[o.status]}
            <ForwardIcon size={16} stroke="#04202E" />
          </button>
        </div>
      )}
    </div>
  );
}

export function MobileMyGifts() {
  const orders = usePishnam((s) => s.orders);
  const [tab, setTab] = useState<"sent" | "recv">("sent");
  const list = orders.filter((o) => o.dir === tab);
  const charms = list.reduce((a, o) => a + o.hearts + o.paws, 0);
  const hearts = list.reduce((a, o) => a + o.hearts, 0);
  const paws = list.reduce((a, o) => a + o.paws, 0);
  const anon = list.filter((o) => o.anonymous).length;

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] pb-6 md:hidden">
      {/* title row */}
      <div className="flex items-center justify-between px-5 pb-1.5 pt-4">
        <h1 className="m-0 text-[30px] font-black leading-[1.4]">هدیه‌هام</h1>
        <button
          type="button"
          onClick={() => navigate("pick")}
          className="flex h-[42px] items-center rounded-full bg-[#00ABE7] px-4 text-[14px] font-extrabold text-[#04202E] transition-transform active:scale-95"
        >
          + هدیه‌ی جدید
        </button>
      </div>

      {/* tabs */}
      <TabsPill tab={tab} onChange={setTab} className="mx-5 mt-2.5" />

      {/* stats */}
      <div className="flex gap-2.5 px-5 pt-3.5">
        <div className="flex flex-1 flex-col gap-0.5 rounded-[20px] border border-[#DDEEF5] bg-white p-3">
          <span className="text-[12px] font-semibold text-[#4A6572]">تعداد هدیه‌ها</span>
          <span className="text-[22px] font-black">{fa(list.length)}</span>
        </div>
        <div className="flex flex-1 flex-col gap-0.5 rounded-[20px] border border-[#F7C5D3] bg-[#FFE9F0] p-3">
          <span className="text-[12px] font-semibold text-[#4A6572]">قلب و پنجه‌ی تو</span>
          <span className="text-[22px] font-black">{fa(charms)}</span>
        </div>
      </div>

      {/* charms summary chips */}
      {list.length > 0 && <CharmChips hearts={hearts} paws={paws} anonymous={anon} className="px-5 pt-3" />}

      {/* orders list */}
      <div className="flex flex-col gap-3 px-5 pt-3.5">
        {list.length === 0 ? <EmptyPanel tab={tab} /> : list.map((o) => <MobileOrderCard key={o.id} o={o} />)}
      </div>

      {/* dashed info box */}
      <div className="mx-5 mt-4 flex items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] p-4">
        <HeartSticker size={26} fill="#F0426B" stroke="#04202E" strokeWidth={2.4} />
        <span className="text-[13px] font-semibold leading-[1.9] text-[#1F3E4D]">
          برای هر هدیه‌ای که می‌فرستی، یه شماره‌ی تازه می‌گیری. هدیه‌هات همیشه همین‌جا می‌مونن.
        </span>
      </div>
    </div>
  );
}

/* ═══════════════ 2 · DESKTOP MY GIFTS (16-هدیه‌هام) ═══════════════ */

function DesktopOrderCard({ o }: { o: GiftOrder }) {
  const advanceStatus = usePishnam((s) => s.advanceStatus);
  const selectOrder = usePishnam((s) => s.selectOrder);
  const st = o.dir === "sent" ? STATUS_MAP[o.status] : recvStatus(o);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`رهگیری هدیه ${fa(o.no)}`}
      onClick={() => {
        selectOrder(o.id);
        navigate("track");
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectOrder(o.id);
          navigate("track");
        }
      }}
      className="flex min-w-0 flex-[1_1_340px] max-w-[400px] cursor-pointer items-center gap-[18px] rounded-[28px] border border-[#DDEEF5] bg-white p-5 outline-none transition-all hover:border-[#00ABE7] hover:shadow-[0_10px_26px_rgba(4,32,46,0.08)] focus-visible:ring-2 focus-visible:ring-[#00ABE7]"
    >
      <PlushThumb o={o} size={66} box={88} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[16px] font-extrabold">{orderWho(o)}</span>
          <span className="shrink-0 rounded-[12px] bg-[#04202E] px-2.5 py-[3px] text-[12.5px] font-extrabold text-white">{fa(o.no)}</span>
        </div>
        <span className="text-[13px] font-medium text-[#4A6572]">
          {o.date} · {orderExtra(o)}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-[10px] px-2.5 py-1 text-[12.5px] font-bold" style={{ background: st.bg }}>
            {st.label}
          </span>
          {o.dir === "sent" && o.status !== "delivered" && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                advanceStatus(o.id);
              }}
              title="شبیه‌سازی مسیر ارسال"
              className="rounded-[10px] bg-[#F2F7F9] px-2.5 py-1 text-[11.5px] font-extrabold text-[#006387] transition-colors hover:bg-[#E3F6FD]"
            >
              قدم بعدی: {NEXT_LABEL[o.status]}
            </button>
          )}
          {o.dir === "recv" && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate("gift");
              }}
              className="rounded-[10px] bg-[#E3F6FD] px-2.5 py-1 text-[11.5px] font-extrabold text-[#006387] transition-colors hover:bg-[#CDEFFB]"
            >
              مشاهده‌ی پیام
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              selectOrder(o.id);
              navigate("track");
            }}
            className="ms-auto rounded-[10px] px-2.5 py-1 text-[11.5px] font-extrabold text-[#00779F] transition-colors hover:bg-[#E3F6FD]"
          >
            رهگیری ›
          </button>
        </div>
      </div>
    </div>
  );
}

export function DesktopMyGifts() {
  const orders = usePishnam((s) => s.orders);
  const [tab, setTab] = useState<"sent" | "recv">("sent");
  const list = orders.filter((o) => o.dir === tab);
  const charms = list.reduce((a, o) => a + o.hearts + o.paws, 0);
  const hearts = list.reduce((a, o) => a + o.hearts, 0);
  const paws = list.reduce((a, o) => a + o.paws, 0);
  const anon = list.filter((o) => o.anonymous).length;

  return (
    <div className="hidden min-h-screen flex-col bg-[#F2FAFD] md:flex">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-7 px-6 pt-10">
        {/* heading */}
        <section className="flex flex-wrap items-center justify-between gap-[18px]">
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-extrabold text-[#00779F]">حساب تو</span>
            <h1 className="m-0 text-[44px] font-black leading-[1.35]">هدیه‌هام</h1>
          </div>
          <button
            type="button"
            onClick={() => navigate("pick")}
            className="flex h-[50px] items-center rounded-full bg-[#00ABE7] px-6 text-[15px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.03]"
          >
            + هدیه‌ی جدید
          </button>
        </section>

        {/* tabs + stat cards */}
        <section className="flex flex-wrap items-center gap-4">
          <TabsPill tab={tab} onChange={setTab} className="w-[380px] max-w-full" height={44} fontSize="15px" />
          <div className="ms-auto flex flex-wrap gap-4">
            <div className="flex min-w-[190px] flex-col gap-0.5 rounded-[22px] border border-[#DDEEF5] bg-white px-[18px] py-[14px]">
              <span className="text-[13px] font-semibold text-[#4A6572]">تعداد هدیه‌ها</span>
              <span className="text-[26px] font-black">{fa(list.length)}</span>
            </div>
            <div className="flex min-w-[190px] flex-col gap-0.5 rounded-[22px] border border-[#F7C5D3] bg-[#FFE9F0] px-[18px] py-[14px]">
              <span className="text-[13px] font-semibold text-[#4A6572]">قلب و پنجه‌ی تو</span>
              <span className="text-[26px] font-black">{fa(charms)}</span>
            </div>
          </div>
          {list.length > 0 && <CharmChips hearts={hearts} paws={paws} anonymous={anon} className="w-full" />}
        </section>

        {/* orders grid */}
        {list.length === 0 ? (
          <section>
            <EmptyPanel tab={tab} desktop />
          </section>
        ) : (
          <section className="flex flex-wrap gap-[18px]">
            {list.map((o) => (
              <DesktopOrderCard key={o.id} o={o} />
            ))}
          </section>
        )}

        {/* dashed note + impact link */}
        <section className="mb-4 mt-2 flex flex-wrap items-center gap-4 rounded-[28px] border-2 border-dashed border-[#99D6EE] px-[26px] py-[22px]">
          <HeartSticker size={34} fill="#F0426B" stroke="#04202E" strokeWidth={2.4} />
          <span className="flex-[1_1_420px] text-[15px] font-semibold leading-[1.9] text-[#1F3E4D]">
            برای هر هدیه‌ای که می‌فرستی، یه شماره‌ی تازه می‌گیری. هدیه‌هات همیشه همین‌جا می‌مونن.
          </span>
          <button
            type="button"
            onClick={() => navigate("impact")}
            className="box-border flex h-12 items-center rounded-full border-2 border-[#04202E] px-[22px] text-[15px] font-extrabold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white"
          >
            برو به دفتر مهربونی
          </button>
        </section>
      </main>
      <DesktopFooter />
    </div>
  );
}

/* ═══════════════ 3 · MOBILE IMPACT (08-دفتر مهربونی) ═══════════════ */

export function MobileImpact() {
  const done = useCharityDone();
  const orders = usePishnam((s) => s.orders);
  const sent = orders.filter((o) => o.dir === "sent");
  const pct = Math.min(100, Math.round((done / CHARITY_TARGET) * 100));
  const receipts = buildReceipts(sent);

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] pb-6 md:hidden">
      {/* top row: back + heart/paw */}
      <div className="flex items-center justify-between px-5 pb-1.5 pt-4">
        <button
          type="button"
          aria-label="برگشت"
          onClick={() => navigate("home")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]"
        >
          <BackIcon size={22} />
        </button>
        <div className="flex items-center gap-1.5">
          <HeartSticker size={26} fill="#F0426B" stroke="#04202E" strokeWidth={2.4} />
          <PawIcon size={26} />
        </div>
      </div>

      {/* heading */}
      <div className="px-5 pb-1 pt-4">
        <h1 className="m-0 text-[34px] font-black leading-[1.4]">دفتر مهربونی</h1>
        <p className="mb-0 mt-2 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]">
          هر قلب و پنجه‌ای که خریده می‌شه، این‌جا ثبت می‌شه. مدرک همه‌ی ارسال‌ها رو هم همین‌جا می‌ذاریم تا خودت ببینی.
        </p>
      </div>

      {/* charity progress */}
      <CharityProgressCard done={done} pct={pct} />

      {/* receipts */}
      <div className="px-5 pb-2.5 pt-6 text-[20px] font-extrabold">مدارک ارسال</div>
      <div className="mx-5 flex flex-col gap-2.5">
        {receipts.map((r, i) => (
          <ReceiptCard key={`${r.name}-${i}`} r={r} />
        ))}
        <NextDeliveryBox />
      </div>

      {/* transparency steps */}
      <div className="px-5 pb-2.5 pt-[26px] text-[20px] font-extrabold">چطوری شفاف می‌مونیم؟</div>
      <div className="mx-5 flex flex-col gap-2.5">
        {IMPACT_STEPS.map((s) => (
          <StepRow key={s.n} s={s} />
        ))}
      </div>

      {/* badges */}
      <div className="px-5 pb-2.5 pt-[26px] text-[20px] font-extrabold">نشان‌های مهربونی</div>
      <BadgesRow className="mx-5" />
    </div>
  );
}

/* ═══════════════ 4 · DESKTOP IMPACT (14-دفتر مهربونی) ═══════════════ */

export function DesktopImpact() {
  const done = useCharityDone();
  const orders = usePishnam((s) => s.orders);
  const sent = orders.filter((o) => o.dir === "sent");
  const hearts = sent.reduce((a, o) => a + o.hearts, 0);
  const paws = sent.reduce((a, o) => a + o.paws, 0);
  const pct = Math.min(100, Math.round((done / CHARITY_TARGET) * 100));
  const receipts = buildReceipts(sent);

  return (
    <div className="hidden min-h-screen flex-col bg-[#F2FAFD] md:flex">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-9 px-6 pt-10">
        {/* hero: text + dark progress card */}
        <section className="flex flex-wrap items-stretch gap-9">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col justify-center gap-3.5">
            <span className="text-[14px] font-extrabold text-[#00779F]">هر قلب و پنجه، این‌جا ثبت می‌شه</span>
            <h1 className="m-0 text-[46px] font-black leading-[1.35]">دفتر مهربونی</h1>
            <p className="m-0 text-[16px] font-medium leading-[2] text-[#1F3E4D]">
              هر قلب و پنجه‌ای که خریده می‌شه، این‌جا ثبت می‌شه. مدرک همه‌ی ارسال‌ها رو هم همین‌جا می‌ذاریم تا خودت ببینی.
            </p>
            <div className="mt-1.5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("extras")}
                className="flex h-[50px] items-center gap-1.5 rounded-full bg-[#00ABE7] px-[22px] text-[15px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.03]"
              >
                تو هم قلب اضافه کن
              </button>
              <button
                type="button"
                onClick={() => navigate("shipping")}
                className="box-border flex h-[50px] items-center rounded-full border-2 border-[#04202E] px-[22px] text-[15px] font-extrabold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white"
              >
                ارسال و بازگشت
              </button>
            </div>
          </div>
          <CharityProgressCard done={done} pct={pct} desktop />
        </section>

        {/* stat cards */}
        <section className="flex flex-wrap gap-4">
          <div className="flex flex-[1_1_220px] flex-col gap-1.5 rounded-[24px] border border-[#DDEEF5] bg-white px-6 py-[22px]">
            <span className="text-[14px] font-semibold text-[#4A6572]">هدیه‌های فرستاده‌شده</span>
            <span className="text-[36px] font-black">{fa(sent.length)}</span>
          </div>
          <div className="flex flex-[1_1_220px] flex-col gap-1.5 rounded-[24px] border border-[#F7C5D3] bg-[#FFE9F0] px-6 py-[22px]">
            <span className="text-[14px] font-semibold text-[#4A6572]">قلب‌های ثبت‌شده</span>
            <span className="text-[36px] font-black">{fa(hearts)}</span>
          </div>
          <div className="flex flex-[1_1_220px] flex-col gap-1.5 rounded-[24px] border border-[#F2E3A0] bg-[#FFF3C9] px-6 py-[22px]">
            <span className="text-[14px] font-semibold text-[#4A6572]">پنجه‌های ثبت‌شده</span>
            <span className="text-[36px] font-black">{fa(paws)}</span>
          </div>
          <div className="flex flex-[1_1_220px] flex-col gap-1.5 rounded-[24px] border border-[#BFE5D3] bg-[#DDF3EA] px-6 py-[22px]">
            <span className="text-[14px] font-semibold text-[#4A6572]">خیریه‌های همکار</span>
            <span className="text-[36px] font-black">{fa(receipts.length)}</span>
          </div>
        </section>

        {/* receipts + transparency */}
        <section className="flex flex-wrap items-start gap-7">
          <div className="flex min-w-0 flex-[1.4_1_540px] flex-col gap-3.5">
            <h2 className="m-0 text-[26px] font-black">مدارک ارسال</h2>
            {receipts.map((r, i) => (
              <ReceiptCard key={`${r.name}-${i}`} r={r} desktop />
            ))}
            <NextDeliveryBox desktop />
          </div>
          <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-3.5">
            <h2 className="m-0 text-[26px] font-black">چطوری شفاف می‌مونیم؟</h2>
            {IMPACT_STEPS.map((s) => (
              <StepRow key={s.n} s={s} desktop />
            ))}
            <div className="mt-1.5 rounded-[24px] border-[1.5px] border-[#F7C5D3] bg-[#FFE9F0] px-5 py-[18px] text-[14px] font-semibold leading-[1.9]">
              هر قلب و پنجه‌ای که با سفارش‌های تو جمع می‌شه، همون لحظه به شمارش بالا اضافه می‌شه؛ این عدد حدسی نیست، حساب‌شده‌ست.
            </div>
          </div>
        </section>

        {/* badges */}
        <section className="flex flex-col gap-3.5">
          <h2 className="m-0 text-[26px] font-black">نشان‌های مهربونی</h2>
          <BadgesRow />
        </section>
      </main>
      <DesktopFooter />
    </div>
  );
}

/* ═══════════════ 5 · LOGIN — shared OTP flow ═══════════════ */

const RESEND_SECONDS = 30;

const INPUT_CLS =
  "h-[58px] w-full rounded-[20px] border-2 border-[#04202E] bg-white px-[18px] text-[18px] font-semibold text-[#04202E] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,171,231,0.15)]";

const PRIMARY_BTN_CLS =
  "flex h-14 w-full items-center justify-center rounded-full bg-[#00ABE7] text-[17px] font-extrabold text-[#04202E] transition-transform active:scale-95";

const GHOST_BTN_CLS =
  "flex h-[52px] w-full items-center justify-center rounded-full border-2 border-[#04202E] bg-transparent text-[15px] font-extrabold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white";

interface OtpFlow {
  step: "phone" | "otp" | "name";
  phone: string;
  otp: string;
  name: string;
  error: string;
  timer: number;
  devCode: string | null;
  busy: boolean;
  setPhone: (v: string) => void;
  setOtp: (v: string) => void;
  setName: (v: string) => void;
  submitPhone: () => void;
  submitOtp: () => void;
  resend: () => void;
  submitLogin: () => void;
  restart: () => void;
}

function useOtpFlow(): OtpFlow {
  const login = usePishnam((s) => s.login);
  const { toast } = useToast();
  const [step, setStep] = useState<"phone" | "otp" | "name">("phone");
  const [phone, setPhoneRaw] = useState("");
  const [otp, setOtpRaw] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [devCode, setDevCode] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const norm = (s: string) => toEnDigits(s).replace(/\s/g, "");
  const setPhone = (v: string) => setPhoneRaw(fa(v.replace(/[^\d۰-۹]/g, "").slice(0, 11)));
  const setOtp = (v: string) => setOtpRaw(fa(v.replace(/[^\d۰-۹]/g, "").slice(0, 4)));

  useEffect(() => {
    if (step !== "otp" || timer <= 0) return;
    const t = setInterval(() => setTimer((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [step, timer]);

  /**
   * Asks the server for a real OTP. If the API is unreachable, the flow
   * falls back to demo mode (fixed ۱۲۳۴) so the UI always works offline.
   * Returns the code to display as a hint (devCode).
   */
  const requestOtp = async (p: string): Promise<string> => {
    try {
      const res = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: p }),
      });
      const json = (await res.json()) as { devCode?: string };
      if (res.ok && json.devCode) return json.devCode;
      throw new Error("bad response");
    } catch {
      return "1234"; // demo fallback
    }
  };

  const submitPhone = () => {
    const p = norm(phone);
    if (!/^09\d{9}$/.test(p)) {
      setError("شماره باید ۱۱ رقم باشه و با ۰۹ شروع بشه.");
      return;
    }
    if (busy) return;
    setError("");
    setPhoneRaw(fa(p));
    setBusy(true);
    void requestOtp(p).then((code) => {
      setDevCode(code);
      setBusy(false);
      setStep("otp");
      setTimer(RESEND_SECONDS);
    });
  };

  const submitOtp = () => {
    const c = norm(otp);
    if (!/^\d{4}$/.test(c)) {
      setError("کد چهار رقمی رو کامل بزن.");
      return;
    }
    if (busy) return;
    setError("");
    setBusy(true);
    const p = norm(phone);
    void (async () => {
      let ok = false;
      let serverError = "";
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: p, code: c }),
        });
        if (res.ok) ok = true;
        else serverError = "کد اشتباهه یا منقضی شده؛ دوباره امتحان کن.";
      } catch {
        // offline → compare against the demo/dev code
        ok = devCode ? c === devCode : false;
        if (!ok) serverError = "کد اشتباهه.";
      }
      setBusy(false);
      if (ok) setStep("name");
      else setError(serverError || "کد اشتباهه.");
    })();
  };

  const resend = () => {
    if (timer > 0 || busy) return;
    setTimer(RESEND_SECONDS);
    setOtpRaw("");
    void requestOtp(norm(phone)).then((code) => {
      setDevCode(code);
      toast({ title: "کد دوباره فرستاده شد", description: `کد نمایشی: ${fa(code)}` });
    });
  };

  const submitLogin = () => {
    const p = norm(phone);
    const trimmed = name.trim();
    login(p, trimmed);
    if (trimmed) {
      void fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: p, name: trimmed }),
      }).catch(() => {});
    }
    toast({
      title: "وارد شدی!",
      description: trimmed ? `خوش اومدی ${trimmed}! هدیه‌هات همین‌جاست.` : "خوش اومدی! هدیه‌هات همین‌جاست.",
    });
    navigate("my-gifts");
  };

  const restart = () => {
    setStep("phone");
    setOtpRaw("");
    setError("");
  };

  return {
    step,
    phone,
    otp,
    name,
    error,
    timer,
    devCode,
    busy,
    setPhone,
    setOtp,
    setName,
    submitPhone,
    submitOtp,
    resend,
    submitLogin,
    restart,
  };
}

function LoginHeading({ flow }: { flow: OtpFlow }) {
  const t =
    flow.step === "phone"
      ? { h: "خوش اومدی", p: "با شماره‌ت وارد شو تا هدیه‌هات رو ببینی." }
      : flow.step === "otp"
        ? { h: "کد تایید", p: `کد چهار رقمی به شماره‌ی ${flow.phone} فرستاده شد.` }
        : { h: "آخرین قدم", p: "اگه اسمت رو بگی، قشنگ‌تر خوش‌اومد می‌گیم! (اختیاری)" };
  return (
    <div className="flex flex-col gap-2.5">
      <h1 className="m-0 text-[30px] font-black leading-[1.45]">{t.h}</h1>
      <p className="m-0 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]">{t.p}</p>
    </div>
  );
}

function OrDivider() {
  return (
    <div className="flex items-center gap-3 text-[13px] font-bold text-[#4A6572]">
      <span className="h-[1.5px] flex-1 bg-[#CFE6EF]" />
      یا
      <span className="h-[1.5px] flex-1 bg-[#CFE6EF]" />
    </div>
  );
}

function LoginFlowBlock({ flow }: { flow: OtpFlow }) {
  return (
    <>
      {flow.step === "phone" && (
        <div className="flex flex-col gap-3">
          <label htmlFor="pishnam-phone" className="text-[14px] font-extrabold">
            شماره‌ی موبایلت
          </label>
          <input
            id="pishnam-phone"
            type="tel"
            inputMode="numeric"
            dir="ltr"
            maxLength={11}
            placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹"
            className={INPUT_CLS}
            style={{ textAlign: "right" }}
            value={flow.phone}
            onChange={(e) => flow.setPhone(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && flow.submitPhone()}
          />
          {flow.error && <span className="text-[12.5px] font-bold text-[#F0426B]">{flow.error}</span>}
          <button type="button" onClick={flow.submitPhone} disabled={flow.busy} className={`${PRIMARY_BTN_CLS} disabled:opacity-60`}>
            {flow.busy ? "در حال فرستادن کد…" : "ادامه"}
          </button>
        </div>
      )}

      {flow.step === "otp" && (
        <div className="flex flex-col gap-3">
          <label htmlFor="pishnam-otp" className="text-[14px] font-extrabold">
            کد تایید
          </label>
          <input
            id="pishnam-otp"
            type="tel"
            inputMode="numeric"
            dir="ltr"
            maxLength={4}
            placeholder="●●●●"
            className={INPUT_CLS}
            style={{ textAlign: "right", letterSpacing: "0.35em" }}
            value={flow.otp}
            onChange={(e) => flow.setOtp(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && flow.submitOtp()}
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-[#E3F6FD] px-3 py-1.5 text-[12px] font-extrabold text-[#006387]">
              {flow.devCode ? `کد نمایشی: ${fa(flow.devCode)}` : "در حال فرستادن کد…"}
            </span>
            {flow.timer > 0 ? (
              <span className="text-[12px] font-bold text-[#4A6572]">ارسال دوباره تا {fa(flow.timer)} ثانیه</span>
            ) : (
              <button
                type="button"
                onClick={flow.resend}
                className="text-[12px] font-extrabold text-[#00779F] underline underline-offset-4 transition-colors hover:text-[#04202E]"
              >
                ارسال دوباره‌ی کد
              </button>
            )}
          </div>
          {flow.error && <span className="text-[12.5px] font-bold text-[#F0426B]">{flow.error}</span>}
          <button type="button" onClick={flow.submitOtp} disabled={flow.busy} className={`${PRIMARY_BTN_CLS} disabled:opacity-60`}>
            {flow.busy ? "در حال بررسی…" : "تایید و ادامه"}
          </button>
          <button
            type="button"
            onClick={flow.restart}
            className="self-start text-[12.5px] font-bold text-[#4A6572] underline underline-offset-4 transition-colors hover:text-[#04202E]"
          >
            تغییر شماره
          </button>
        </div>
      )}

      {flow.step === "name" && (
        <div className="flex flex-col gap-3">
          <label htmlFor="pishnam-name" className="text-[14px] font-extrabold">
            اسمت چیه؟ (اختیاری)
          </label>
          <input
            id="pishnam-name"
            type="text"
            placeholder="مثلاً: سارا"
            className={INPUT_CLS}
            value={flow.name}
            onChange={(e) => flow.setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && flow.submitLogin()}
          />
          <button type="button" onClick={flow.submitLogin} className={PRIMARY_BTN_CLS}>
            ورود به پیشتم
          </button>
        </div>
      )}

      <OrDivider />

      <button
        type="button"
        onClick={() => navigate("home")}
        className={GHOST_BTN_CLS}
      >
        ورود به‌عنوان مهمان
      </button>

      <div className="text-center text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">
        با ادامه، <span className="font-extrabold text-[#006387]">قوانین و حریم خصوصی</span> رو قبول می‌کنی.
      </div>
    </>
  );
}

function LoggedInBlock() {
  const user = usePishnam((s) => s.user);
  const logout = usePishnam((s) => s.logout);
  const { toast } = useToast();
  if (!user) return null;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2.5">
        <h1 className="m-0 text-[30px] font-black leading-[1.45]">خوش اومدی!</h1>
        <p className="m-0 text-[15px] font-medium leading-[1.9] text-[#1F3E4D]">
          حسابت فعاله؛ هدیه‌هات و کارت‌هات همیشه همین‌جان.
        </p>
      </div>
      <div className="flex items-center gap-4 rounded-[26px] border border-[#DDEEF5] bg-white p-5">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#00ABE7] text-2xl font-black text-[#04202E]">
          {user.name.slice(0, 1)}
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-[17px] font-extrabold">{user.name}</span>
          <span dir="ltr" className="text-[13.5px] font-semibold text-[#4A6572]">
            {fa(user.phone)}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => navigate("my-gifts")}
        className={PRIMARY_BTN_CLS}
      >
        هدیه‌هام رو ببین
      </button>
      <button
        type="button"
        onClick={() => {
          logout();
          toast({ title: "از حساب خارج شدی", description: "هر وقت خواستی دوباره بیا." });
        }}
        className={GHOST_BTN_CLS}
      >
        خروج از حساب
      </button>
    </div>
  );
}

/* ═══════════════ 5a · MOBILE LOGIN (03-ورود یا ثبت‌نام) ═══════════════ */

export function MobileLogin() {
  const user = usePishnam((s) => s.user);
  const flow = useOtpFlow();

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] px-6 pb-7 pt-4 md:hidden">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="برگشت"
          onClick={() => navigate("home")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]"
        >
          <BackIcon size={22} />
        </button>
        <Logo size={32} />
      </div>

      <div className={`flex flex-1 flex-col ${user ? "justify-center gap-6 py-8" : ""}`}>
        {!user && (
          <>
            <div className="mt-[26px]">
              <LoginHeading flow={flow} />
            </div>
            <div className="mt-[26px] flex flex-col gap-4">
              <LoginFlowBlock flow={flow} />
            </div>
          </>
        )}
        {user && <LoggedInBlock />}
      </div>
    </div>
  );
}

/* ═══════════════ 5b · DESKTOP LOGIN (15-ورود یا ثبت‌نام) ═══════════════ */

export function DesktopLogin() {
  const user = usePishnam((s) => s.user);
  const flow = useOtpFlow();

  return (
    <div className="hidden min-h-screen flex-col bg-[#F2FAFD] md:flex">
      <main className="mx-auto flex w-full max-w-[1080px] flex-1 flex-wrap items-stretch justify-center gap-8 px-6 pb-14 pt-10">
        {/* brand panel */}
        <div className="relative flex min-h-[520px] min-w-0 flex-[1_1_460px] max-w-[560px] flex-col justify-between gap-6 overflow-hidden rounded-[40px] bg-[#00ABE7] p-12">
          <div className="absolute -bottom-[110px] -left-[90px] h-[320px] w-[320px] rounded-full bg-[#66CDF1]" />
          <span className="absolute left-14 top-[60px] h-3.5 w-3.5 rounded-full bg-white" />
          <span className="absolute right-[60px] top-[120px] h-1.5 w-4 rotate-[35deg] rounded-full bg-[#04202E]" />
          <span className="absolute left-10 top-[200px] h-3.5 w-3.5 rounded-full border-2 border-[#04202E] bg-[#FFE08A]" />
          <div className="relative flex flex-col gap-3.5">
            <Logo size={44} />
            <h2 className="m-0 mt-4 text-[38px] font-black leading-[1.5]">یه بغل، تو یه جعبه</h2>
            <p className="m-0 text-[16px] font-semibold leading-[2]">
              هدیه‌هات رو از همین‌جا بفرست، پیام‌هات رو ببین و هر قلب و پنجه‌ای که جمع می‌شه رو یه جا نگه دار.
            </p>
          </div>
          <div className="relative flex items-end gap-3.5">
            <Plush kind="bunny" size={200} />
            <Plush kind="panda" size={140} />
          </div>
        </div>

        {/* form panel */}
        <div className="flex min-w-0 flex-[1_1_380px] max-w-[460px] flex-col gap-4 self-center rounded-[32px] border border-[#DDEEF5] bg-white p-10">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="self-start text-[14px] font-extrabold text-[#00779F] transition-colors hover:text-[#04202E]"
          >
            برگرد به خانه
          </button>
          {user ? (
            <LoggedInBlock />
          ) : (
            <>
              <div className="mt-1">
                <LoginHeading flow={flow} />
              </div>
              <div className="mt-2 flex flex-col gap-4">
                <LoginFlowBlock flow={flow} />
              </div>
            </>
          )}
        </div>
      </main>
      <DesktopFooter compact />
    </div>
  );
}

/* ═══════════════ shared desktop footer (matches home.tsx footer) ═══════════════ */

function FooterLink({ label, route }: { label: string; route: Route }) {
  return (
    <button
      type="button"
      onClick={() => navigate(route)}
      className="text-right transition-colors hover:text-[#00ABE7]"
    >
      {label}
    </button>
  );
}

function DesktopFooter({ compact = false }: { compact?: boolean }) {
  return (
    <footer className={`${compact ? "mt-10" : "mt-auto pt-16"} bg-[#04202E] text-white`}>
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap justify-between gap-9 px-6 pb-10 pt-14 box-border">
        <div className="flex flex-[1_1_280px] flex-col gap-3.5">
          <Logo size={44} />
          <span className="text-[15px] font-bold text-[#BFE9F8]">یه بغل، تو یه جعبه</span>
        </div>
        <div className="flex flex-col gap-2.5 text-[15px] font-semibold">
          <span className="text-base font-extrabold text-[#00ABE7]">پیشتم</span>
          <FooterLink label="ماموریت" route="mission" />
          <FooterLink label="درباره‌ی ما" route="about" />
          <FooterLink label="دفتر مهربونی" route="impact" />
        </div>
        <div className="flex flex-col gap-2.5 text-[15px] font-semibold">
          <span className="text-base font-extrabold text-[#00ABE7]">کمک</span>
          <FooterLink label="تماس با ما" route="contact" />
          <FooterLink label="ارسال و بازگشت" route="shipping" />
          <FooterLink label="نظرها" route="reviews" />
        </div>
        <div className="flex flex-col gap-2.5 text-[15px] font-semibold">
          <span className="text-base font-extrabold text-[#00ABE7]">ما رو دنبال کن</span>
          <span>پیشتم@ اینستاگرام</span>
          <span>پیشتم@ تلگرام</span>
        </div>
      </div>
      <div className="border-t border-[#0E3C52] px-6 py-[18px] text-center text-[13px] font-medium text-[#BFE9F8]">
        پیشتم · همه‌ی حقوق محفوظ است
      </div>
    </footer>
  );
}
