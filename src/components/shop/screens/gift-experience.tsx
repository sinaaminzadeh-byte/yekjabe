"use client";

// ── Receiver experience (gift lock → open) — ported from design pages
//    06-قفل کارت پستال / 07-پیام تو (mobile) and 18-پیام تو (desktop) ──
import { useState } from "react";
import { Logo } from "../logo";
import { Plush } from "../plush";
import { ForwardIcon, HeartSticker } from "../icons";
import { navigate } from "@/lib/hash-route";
import { usePishnam, type GiftOrder } from "@/lib/pishnam-store";
import {
  BOX_PRICE,
  CHARM_PRICE,
  GIFT_OPEN_DEFAULT_PASSWORD,
  OCCASIONS,
  plushLabel,
} from "@/lib/pishnam-data";
import { fa } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";

// Built-in demo order used when the store has no received gift (kind panda, رمز «بهار»)
const DEMO_ORDER: GiftOrder = {
  id: "demo-recv",
  no: 96,
  kind: "panda",
  to: "تو",
  city: "تهران",
  address: "",
  phone: "",
  message:
    "سلام رفیق! شنیدم این روزا حال و هوات خوب نیست. بامبو رو برات فرستادم که هر شب بغلش کنی و یادت باشه یکی این‌ور شهر دعا‌ت می‌کنه. زودتر بیا دیدنی.",
  occasion: 1,
  password: GIFT_OPEN_DEFAULT_PASSWORD,
  anonymous: true,
  senderName: "",
  hearts: 2,
  paws: 1,
  total: BOX_PRICE + 3 * CHARM_PRICE,
  date: "۱۲ مهر",
  status: "delivered",
  opened: false,
  dir: "recv",
};

function useReceivedOrder(): GiftOrder {
  return usePishnam((s) => s.orders.find((o) => o.dir === "recv")) ?? DEMO_ORDER;
}

/* ═══════════════ shared bits ═══════════════ */

function GiftChip({ no, big = false }: { no: number; big?: boolean }) {
  return (
    <div
      className={`rotate-3 rounded-[14px] border-[2.5px] border-[#04202E] bg-white text-center ${
        big ? "px-3.5 pb-1 pt-1.5" : "px-3 pb-[3px] pt-[5px]"
      }`}
    >
      <div className={`font-bold text-[#4A6572] ${big ? "text-[11px]" : "text-[10px]"}`}>
        هدیه‌ی شماره
      </div>
      <div className={`font-black leading-[1.1] text-[#04202E] text-[22px]`}>
        {fa(no)}
      </div>
    </div>
  );
}

function LockBadge({ size = 70 }: { size?: number }) {
  const s = size;
  return (
    <span
      className="flex items-center justify-center rounded-full bg-[#04202E]"
      style={
        s === 70
          ? { width: 70, height: 70, border: "4px solid #fff" }
          : { width: 84, height: 84 }
      }
    >
      <svg
        width={s === 70 ? 30 : 36}
        height={s === 70 ? 30 : 36}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="5" y="11" width="14" height="9" rx="2.5" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    </span>
  );
}

function EyeToggle({ show, onClick }: { show: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="نمایش یا پنهان کردن رمز"
      onClick={onClick}
      className="absolute left-2 top-2 flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#E3F6FD]"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#04202E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
        {show && <path d="M4 4l16 16" />}
      </svg>
    </button>
  );
}

function UnlockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="9" rx="2.5" />
      <path d="M8 11V8a4 4 0 0 1 7.4-2" />
    </svg>
  );
}

function SenderPhoto({ rounded = "12px" }: { rounded?: string }) {
  return (
    <svg
      viewBox="0 0 140 112"
      width="100%"
      role="img"
      aria-label="عکس فرستنده"
      style={{ display: "block", borderRadius: rounded, background: "#BFE9F8" }}
    >
      <circle cx="104" cy="30" r="15" fill="#FFE08A" />
      <path d="M0 86C26 56 50 56 76 80S120 92 140 76V112H0z" fill="#FFB3C6" />
      <path d="M0 98C30 78 60 82 90 96 110 104 126 100 140 94V112H0z" fill="#00ABE7" />
      <path
        transform="translate(40 52) scale(.9)"
        d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z"
        fill="#F0426B"
        stroke="#04202E"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═══════════════ main component ═══════════════ */

export function GiftExperience() {
  const order = useReceivedOrder();
  const markOpened = usePishnam((s) => s.markOpened);
  const { toast } = useToast();

  const [phase, setPhase] = useState<"locked" | "open">(order.opened ? "open" : "locked");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [shakeN, setShakeN] = useState(0);
  // server-order unlock (guide §4.11): code + password → POST /api/gifts/{code}/open
  const [code, setCode] = useState("");
  const [remote, setRemote] = useState<GiftOrder | null>(null);
  const [lockErr, setLockErr] = useState("");

  const active: GiftOrder = remote ?? order;

  const sender = active.anonymous || !active.senderName ? "یه دوست ناشناس" : active.senderName;
  const occasion = OCCASIONS[active.occasion] ?? "همین‌طوری";

  const openRemote = async (c: string, password: string) => {
    setLockErr("");
    try {
      const res = await fetch(`/api/gifts/${encodeURIComponent(c)}/open`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const b = (await res.json().catch(() => ({}))) as { error?: string };
        const map: Record<string, string> = {
          wrong_password: "رمز درست نیست! یه بار دیگه امتحان کن یا از کسی که فرستاده بپرس.",
          gift_locked: "به‌خاطر تلاش‌های زیاد، این کارت موقتاً قفل شده.",
          rate_limited: "چند دقیقه صبر کن و دوباره امتحان کن.",
          not_found: "با این کد، سفارشی پیدا نشد.",
        };
        setWrong(true);
        setShakeN((n) => n + 1);
        setLockErr(map[b.error ?? ""] ?? "باز کردن انجام نشد؛ دوباره امتحان کن.");
        return;
      }
      const g = (await res.json()) as { to: string; senderName: string; anonymous: boolean; message: string; occasion: number; kind: string; hearts: number; paws: number };
      const mapped: GiftOrder = {
        id: `o-remote-${c}`,
        no: Number(c.slice(-4)) || 0,
        kind: (g.kind as GiftOrder["kind"]) ?? "bear",
        to: g.to || "دوست گلم",
        city: "",
        address: "",
        phone: "",
        message: g.message,
        occasion: g.occasion,
        password: "",
        anonymous: g.anonymous,
        senderName: g.senderName,
        hearts: g.hearts,
        paws: g.paws,
        total: 0,
        date: "",
        status: "delivered",
        opened: true,
        dir: "recv",
        code: c,
        v2: true,
      };
      setRemote(mapped);
      setWrong(false);
      setPhase("open");
      toast({ title: "هدیه‌ت باز شد 🎉" });
    } catch {
      setWrong(true);
      setShakeN((n) => n + 1);
      setLockErr("اینترنت قطعه؛ اتصالت رو چک کن.");
    }
  };

  const tryUnlock = () => {
    const v = pw.trim();
    const c = code.trim().toUpperCase();
    if (/^PN-\d{6}-\d{4}$/.test(c)) {
      void openRemote(c, v);
      return;
    }
    if (v === active.password) {
      markOpened(active.id);
      setWrong(false);
      setPhase("open");
    } else {
      setWrong(true);
      setShakeN((n) => n + 1);
    }
  };

  return (
    <>
      {/* ══════════ MOBILE ══════════ */}
      {phase === "locked" ? (
        /* ---- mobile · locked (06-قفل کارت پستال) ---- */
        <div className="flex min-h-screen flex-col bg-[#00ABE7] text-[#04202E] md:hidden">
          <div className="flex items-center justify-between px-6 pt-[22px]">
            <button type="button" aria-label="پیشنام" onClick={() => navigate("home")}>
              <Logo size={34} />
            </button>
            <button
              type="button"
              onClick={() => navigate("home")}
              className="rounded-full border-2 border-[#04202E] bg-white px-3.5 py-1.5 text-[12.5px] font-extrabold"
            >
              خانه
            </button>
            <GiftChip no={active.no} />
          </div>

          <div className="relative mx-auto mt-[26px] h-[290px] w-[290px] shrink-0">
            <div className="absolute inset-0 rounded-full bg-[#66CDF1]" />
            <div className="absolute left-[35px] top-[40px]">
              <Plush kind={active.kind} size={220} />
            </div>
            <span className="absolute right-[28px] top-[18px] rotate-12">
              <HeartSticker size={30} fill="#fff" stroke="#04202E" strokeWidth={2.4} />
            </span>
            <span className="absolute left-2 top-20 rotate-[-14deg]">
              <HeartSticker size={20} fill="#F0426B" stroke="#04202E" strokeWidth={3} />
            </span>
            <span className="absolute bottom-3 right-[18px]">
              <LockBadge />
            </span>
          </div>

          <h1 className="m-0 px-7 pt-6 text-center text-[30px] font-black leading-[1.5]">
            یکی برات یه چیزی فرستاده
          </h1>
          <p className="m-0 px-7 pt-2 text-center text-[15px] font-medium leading-[1.9]">
            رمزی که فرستنده بهت داده رو بزن تا پیامت باز بشه.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              tryUnlock();
            }}
            className="mt-5 flex flex-col gap-3 px-6"
          >
            <div>
              <label htmlFor="gc-m" className="mb-1 block px-1 text-[12px] font-bold text-[#04202E]/80">
                کد سفارش (روی کارت پستال نوشته شده — اختیاری)
              </label>
              <input
                id="gc-m"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="PN-251213-0007"
                dir="ltr"
                autoCapitalize="characters"
                className="h-[54px] w-full box-border rounded-[22px] border-[3px] border-[#04202E]/85 bg-white/95 px-5 text-[16px] font-bold text-[#04202E] outline-none placeholder:text-[#9DB6C2]"
              />
            </div>
            <div key={shakeN} className={wrong ? "pishnam-shake" : ""}>
              <div className="relative">
                <label htmlFor="gp-m" className="absolute -left-[9999px]">
                  رمز کارت
                </label>
                <input
                  id="gp-m"
                  type={show ? "text" : "password"}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="رمز کارت"
                  autoComplete="off"
                  className="h-[60px] w-full box-border rounded-[22px] border-[3px] border-[#04202E] bg-white pl-14 pr-5 text-[18px] font-semibold text-[#04202E] outline-none placeholder:text-[#9DB6C2]"
                />
                <EyeToggle show={show} onClick={() => setShow((v) => !v)} />
              </div>
            </div>
            {wrong && (
              <div className="rounded-2xl bg-[#FFE9F0] px-4 py-2.5 text-center text-[13.5px] font-bold text-[#C2274B]">
                {lockErr || "رمز درست نیست! یه بار دیگه امتحان کن یا از کسی که فرستاده بپرس."}
              </div>
            )}
            <button
              type="submit"
              className="flex h-[58px] items-center justify-center gap-2 rounded-full bg-[#04202E] text-[17px] font-extrabold text-white transition-transform active:scale-[0.98]"
            >
              باز کن
              <UnlockIcon />
            </button>
            <div className="text-center text-sm font-bold">رمز رو نمی‌دونی؟ از کسی که فرستاده بپرس.</div>
          </form>

          <div className="mt-auto pb-7 pt-4 text-center text-[12.5px] font-bold">
            پیشنام · یه بغل، تو یه جعبه
          </div>
        </div>
      ) : (
        /* ---- mobile · opened (07-پیام تو) ---- */
        <div className="pishnam-reveal flex min-h-screen flex-col bg-[#F2FAFD] text-[#04202E] md:hidden">
          {/* cyan header */}
          <div className="relative h-[340px] shrink-0 overflow-hidden rounded-b-[40px] bg-[#00ABE7] px-6 pt-5">
            <div className="absolute -bottom-[70px] -left-[50px] h-[260px] w-[260px] rounded-full bg-[#66CDF1]" />
            <span className="absolute left-10 top-[120px] h-3 w-3 rounded-full bg-white" />
            <span className="absolute left-[120px] top-[70px] h-1.5 w-4 rotate-[35deg] rounded-full bg-[#04202E]" />
            <span className="absolute left-[190px] top-[150px] h-3.5 w-3.5 rounded-full border-2 border-[#04202E] bg-[#FFE08A]" />
            <span className="absolute right-[90px] top-[60px] h-1.5 w-[18px] rotate-[-30deg] rounded-full bg-white" />
            <span className="absolute right-10 top-[200px] h-3 w-3 rounded-full border-2 border-[#04202E] bg-[#FFB3C6]" />
            <span className="absolute right-[150px] top-[96px] rotate-[-14deg]">
              <HeartSticker size={26} fill="#F0426B" stroke="#04202E" strokeWidth={3} />
            </span>

            <div className="relative flex items-center justify-between">
              <button
                type="button"
                aria-label="بستن"
                onClick={() => navigate("home")}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#04202E] bg-white"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
              <GiftChip no={active.no} />
            </div>

            <div className="relative flex flex-col items-start gap-1.5 pt-[22px]">
              <span className="rounded-[14px] bg-[#04202E] px-3.5 py-1.5 text-[12.5px] font-bold text-white">
                از طرف {sender}
              </span>
              <h1 className="m-0 text-[34px] font-black leading-[1.4]">یه بغل برات رسید</h1>
            </div>

            <div className="absolute -bottom-2 left-3.5">
              <Plush kind={active.kind} size={168} />
            </div>
          </div>

          {/* message card */}
          <div className="relative z-10 -mt-[26px] mx-5 flex flex-col gap-3 rounded-[30px] border border-[#DDEEF5] bg-white p-5 pb-[22px] shadow-[0_8px_24px_rgba(4,32,46,0.07)]">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-extrabold text-[#006387]">پیام برای تو</span>
              <span className="rounded-[12px] bg-[#D6F1FB] px-3 py-[5px] text-[12px] font-bold">
                {occasion}
              </span>
            </div>
            <p className="m-0 whitespace-pre-line text-[17px] font-medium leading-[2.1]">
              {active.message}
            </p>
          </div>

          {/* photo + video */}
          <div className="mx-5 mt-4 flex gap-3">
            <div className="flex-1 rotate-[-2deg] rounded-[22px] border border-[#DDEEF5] bg-white p-2.5 pb-2">
              <SenderPhoto />
              <div className="pt-2 text-center text-[12.5px] font-bold">عکس فرستنده</div>
            </div>
            <div className="flex flex-1 flex-col">
              <button
                type="button"
                aria-label="پخش ویدیو"
                onClick={() =>
                  toast({
                    title: "ویدیوی فرستنده",
                    description: "تو نسخه‌ی نمایشی، ویدیو فقط یه پیش‌نمایش قشنگه.",
                  })
                }
                className="relative min-h-[150px] flex-1 cursor-pointer overflow-hidden rounded-[22px] bg-[#04202E] p-0"
              >
                <span className="absolute -bottom-[30px] -left-5 h-[120px] w-[120px] rounded-full bg-[#0A3B52]" />
                <span className="absolute left-1/2 top-1/2 -ml-7 -mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#00ABE7]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#04202E" aria-hidden="true">
                    <path d="M8 5l11 7-11 7z" />
                  </svg>
                </span>
                <span className="absolute bottom-2.5 right-3 text-[12.5px] font-bold text-white">
                  ویدیوی فرستنده
                </span>
              </button>
            </div>
          </div>

          {/* hearts & paws */}
          <div className="mx-5 mt-4 flex items-center gap-3.5 rounded-[26px] border-[1.5px] border-[#F7C5D3] bg-[#FFE9F0] p-4">
            <span className="shrink-0">
              <HeartSticker size={40} fill="#F0426B" stroke="#04202E" strokeWidth={2.4} />
            </span>
            <div className="text-[14px] font-semibold leading-[1.9] text-[#1F3E4D]">
              فرستنده‌ت با <b className="text-[#04202E]">{fa(active.hearts)} قلب</b> و{" "}
              <b className="text-[#04202E]">{fa(active.paws)} پنجه</b> به بچه‌های بی‌سرپرست و
              حیوونا هدیه داده. این هدیه، مهربونی رو دو برابر کرد.
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2.5 px-5 pt-[18px]">
            <button
              type="button"
              onClick={() => navigate("pick")}
              className="flex h-[56px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-[0.98]"
            >
              تو هم برای یکی بفرست
              <ForwardIcon />
            </button>
            <button
              type="button"
              onClick={() =>
                toast({
                  title: "پیامت ذخیره شد",
                  description: "هر وقت خواستی از «هدیه‌هام» دوباره ببینیش.",
                })
              }
              className="h-[52px] rounded-[26px] border-2 border-[#04202E] bg-transparent text-[15px] font-extrabold text-[#04202E]"
            >
              پیامت رو ذخیره کن
            </button>
            <button
              type="button"
              onClick={() =>
                toast({
                  title: "یه قلب رفت برای فرستنده",
                  description: "قلبت ثبت شد؛ ممنون که مهربونی رو دو برابر می‌کنی.",
                })
              }
              className="h-[52px] rounded-[26px] border-2 border-[#04202E] bg-transparent text-[15px] font-extrabold text-[#04202E]"
            >
              یه قلب برای فرستنده بفرست
            </button>
          </div>

          <div className="mt-auto pb-7 pt-[18px] text-center text-[12.5px] font-semibold text-[#4A6572]">
            پیشنام · یه بغل، تو یه جعبه
          </div>
        </div>
      )}

      {/* ══════════ DESKTOP (18-پیام تو) ══════════ */}
      <div className="hidden min-h-screen flex-col bg-[#F2FAFD] text-[#04202E] md:flex">
        {/* header */}
        <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-6 py-[18px]">
          <button type="button" onClick={() => navigate("home")} aria-label="پیشنام — خانه">
            <Logo size={46} />
          </button>
          <button
            type="button"
            onClick={() => navigate("home")}
            className="text-[15px] font-extrabold text-[#00779F] transition-colors hover:text-[#00ABE7]"
          >
            برو به خانه
          </button>
        </header>

        <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-wrap items-stretch gap-7 px-6 pt-4 pb-2 box-border">
          {/* left: cyan panel (lock form / opened title) */}
          <section className="relative flex min-h-[640px] flex-1 basis-[460px] flex-col gap-6 overflow-hidden rounded-[40px] bg-[#00ABE7] p-12 box-border">
            <div className="absolute -bottom-[150px] -left-[120px] h-[380px] w-[380px] rounded-full bg-[#66CDF1]" />
            <span className="absolute left-[50px] top-[90px] h-3.5 w-3.5 rounded-full bg-white" />
            <span className="absolute right-[120px] top-[60px] h-1.5 w-[18px] rotate-[-30deg] rounded-full bg-white" />

            <div className="relative flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-extrabold">پیشنام · یه بغل، تو یه جعبه</span>
              <GiftChip no={active.no} big />
            </div>

            <div className="relative mx-auto h-[300px] w-[300px] shrink-0 self-center">
              <div className="absolute inset-0 rounded-full bg-[#66CDF1]" />
              <div className="absolute left-[36px] top-[42px]">
                <Plush kind={active.kind} size={228} />
              </div>
              <span className="absolute right-[28px] top-[18px] rotate-12">
                <HeartSticker size={32} fill="#fff" stroke="#04202E" strokeWidth={2.4} />
              </span>
              <span className="absolute left-1.5 top-[84px] rotate-[-14deg]">
                <HeartSticker size={22} fill="#F0426B" stroke="#04202E" strokeWidth={3} />
              </span>
            </div>

            <div className="relative flex flex-col gap-2.5 text-center">
              <h1 className="m-0 text-[34px] font-black leading-[1.5]">
                {phase === "open" ? "هدیه‌ت باز شد" : "یکی برات یه چیزی فرستاده"}
              </h1>
              {phase === "locked" && (
                <p className="m-0 text-base font-medium leading-[1.9]">
                  رمزی که فرستنده بهت داده رو بزن تا پیامت باز بشه.
                </p>
              )}
            </div>

            {phase === "locked" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  tryUnlock();
                }}
                className="relative flex flex-col gap-3.5"
              >
                <label htmlFor="gc-d" className="text-sm font-extrabold">
                  کد سفارش (اختیاری)
                </label>
                <input
                  id="gc-d"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="PN-251213-0007"
                  dir="ltr"
                  autoCapitalize="characters"
                  className="h-[58px] w-full box-border rounded-[22px] border-[3px] border-[#04202E]/85 bg-white/95 px-[22px] text-[16px] font-bold text-[#04202E] outline-none placeholder:text-[#9DB6C2]"
                />
                <label htmlFor="gp-d" className="text-sm font-extrabold">
                  رمز کارت
                </label>
                <div key={shakeN} className={wrong ? "pishnam-shake" : ""}>
                  <div className="relative">
                    <input
                      id="gp-d"
                      type={show ? "text" : "password"}
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      placeholder="رمز کارت"
                      autoComplete="off"
                      className="h-[62px] w-full box-border rounded-[22px] border-[3px] border-[#04202E] bg-white pl-[60px] pr-[22px] text-[18px] font-semibold text-[#04202E] outline-none placeholder:text-[#9DB6C2]"
                    />
                    <EyeToggle show={show} onClick={() => setShow((v) => !v)} />
                  </div>
                </div>
                {wrong && (
                  <div className="rounded-2xl bg-[#FFE9F0] px-4 py-2.5 text-center text-[13.5px] font-bold text-[#C2274B]">
                    {lockErr || "رمز درست نیست! یه بار دیگه امتحان کن یا از کسی که فرستاده بپرس."}
                  </div>
                )}
                <button
                  type="submit"
                  className="flex h-[58px] items-center justify-center gap-2 rounded-[29px] bg-[#04202E] text-[17px] font-extrabold text-white transition-transform active:scale-[0.98]"
                >
                  باز کن
                  <UnlockIcon />
                </button>
                <div className="rounded-[16px] bg-white/55 px-3.5 py-2.5 text-[12.5px] font-semibold leading-[1.8]">
                  رمز رو نمی‌دونی؟ از کسی که فرستاده بپرس.
                </div>
              </form>
            )}
          </section>

          {/* right: placeholder while locked / message when opened */}
          <section className="flex flex-1 basis-[560px] flex-col gap-[18px] box-border">
            {phase === "locked" ? (
              <div className="flex min-h-[640px] flex-1 flex-col items-center justify-center gap-4 rounded-[40px] border-2 border-dashed border-[#99D6EE] bg-white p-12 text-center">
                <LockBadge size={84} />
                <h2 className="m-0 text-[26px] font-black">پیامت بعد از باز کردن رمز اینجا میاد</h2>
                <p className="m-0 max-w-[420px] text-[15px] font-medium leading-[1.9] text-[#4A6572]">
                  متن، عکس و ویدیوی فرستنده همین‌جا نشون داده می‌شه.
                </p>
              </div>
            ) : (
              <div className="pishnam-reveal flex flex-col gap-[18px]">
                {/* dark hero */}
                <div className="relative flex flex-col gap-2.5 overflow-hidden rounded-[36px] bg-[#04202E] p-8 text-white">
                  <span className="self-start rounded-[14px] bg-[#00ABE7] px-3.5 py-1.5 text-[13px] font-extrabold text-[#04202E]">
                    از طرف {sender}
                  </span>
                  <h2 className="m-0 mt-1 text-[36px] font-black leading-[1.4]">یه بغل برات رسید</h2>
                  <span className="text-[13px] font-semibold text-[#BFE9F8]">
                    {plushLabel(active.kind)} الان کنارته؛ بغلت کن.
                  </span>
                </div>

                {/* message */}
                <div className="flex flex-col gap-3 rounded-[30px] border border-[#DDEEF5] bg-white p-[26px_28px]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-[#00779F]">پیام برای تو</span>
                    <span className="rounded-[12px] bg-[#D6F1FB] px-3 py-[5px] text-[12.5px] font-bold">
                      {occasion}
                    </span>
                  </div>
                  <p className="m-0 whitespace-pre-line text-lg font-medium leading-[2.1]">
                    {active.message}
                  </p>
                </div>

                {/* photo + video */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex-[1_1_220px] rotate-[-2deg] rounded-[26px] border border-[#DDEEF5] bg-white p-3 pb-2.5 box-border">
                    <SenderPhoto rounded="16px" />
                    <div className="pt-2.5 text-center text-[13px] font-bold">عکس فرستنده</div>
                  </div>
                  <button
                    type="button"
                    aria-label="پخش ویدیو"
                    onClick={() =>
                      toast({
                        title: "ویدیوی فرستنده",
                        description: "تو نسخه‌ی نمایشی، ویدیو فقط یه پیش‌نمایش قشنگه.",
                      })
                    }
                    className="relative min-h-[190px] flex-[1_1_220px] cursor-pointer overflow-hidden rounded-[26px] bg-[#04202E] p-0"
                  >
                    <span className="absolute -bottom-[30px] -left-5 h-[130px] w-[130px] rounded-full bg-[#0A3B52]" />
                    <span className="absolute left-1/2 top-1/2 -ml-[30px] -mt-[30px] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#00ABE7]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#04202E" aria-hidden="true">
                        <path d="M8 5l11 7-11 7z" />
                      </svg>
                    </span>
                    <span className="absolute bottom-3.5 right-4 text-[13px] font-bold text-white">
                      ویدیوی فرستنده
                    </span>
                  </button>
                </div>

                {/* hearts & paws */}
                <div className="flex items-center gap-3.5 rounded-[26px] border-[1.5px] border-[#F7C5D3] bg-[#FFE9F0] p-[18px_20px]">
                  <span className="shrink-0">
                    <HeartSticker size={40} fill="#F0426B" stroke="#04202E" strokeWidth={2.4} />
                  </span>
                  <div className="text-[14.5px] font-semibold leading-[1.9] text-[#1F3E4D]">
                    فرستنده‌ت با <b className="text-[#04202E]">{fa(active.hearts)} قلب</b> و{" "}
                    <b className="text-[#04202E]">{fa(active.paws)} پنجه</b> به بچه‌های بی‌سرپرست و
                    حیوونا هدیه داده. این هدیه، مهربونی رو دو برابر کرد.
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("pick")}
                    className="flex h-14 flex-[1_1_240px] items-center justify-center gap-2 rounded-[28px] bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform hover:scale-[1.02]"
                  >
                    تو هم برای یکی بفرست
                    <ForwardIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      toast({
                        title: "پیامت ذخیره شد",
                        description: "هر وقت خواستی از «هدیه‌هام» دوباره ببینیش.",
                      })
                    }
                    className="h-14 flex-[1_1_240px] rounded-[28px] border-2 border-[#04202E] bg-transparent text-[15px] font-extrabold text-[#04202E] transition-colors hover:bg-white"
                  >
                    پیامت رو ذخیره کن
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      toast({
                        title: "یه قلب رفت برای فرستنده",
                        description: "قلبت ثبت شد؛ ممنون که مهربونی رو دو برابر می‌کنی.",
                      })
                    }
                    className="h-14 flex-[1_1_240px] rounded-[28px] border-2 border-[#04202E] bg-transparent text-[15px] font-extrabold text-[#04202E] transition-colors hover:bg-white"
                  >
                    یه قلب برای فرستنده بفرست
                  </button>
                </div>
              </div>
            )}
          </section>
        </main>

        <footer className="mt-10 px-6 pb-7 pt-[18px] text-center text-[13px] font-bold text-[#4A6572]">
          پیشنام · یه بغل، تو یه جعبه
        </footer>
      </div>
    </>
  );
}
