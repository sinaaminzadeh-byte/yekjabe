"use client";

// ── Recipient verification (#/verify) + message viewer (#/gift-view) ──
// mission §۱/§۲: the postcard QR lands on #/verify → the recipient proves
// ownership of THEIR mobile via OTP (same auth system as login) → the server
// matches the phone against the order's recipientPhone → gifts appear in
// حساب کاربری → «دریافتی‌ها». The viewer navigates ONLY between gifts the
// session is actually authorized to see, and every first successful render of
// content is what starts the retention clock (server-side, atomic).

import { useEffect, useRef, useState } from "react";
import { Logo } from "../logo";
import { Plush } from "../plush";
import { ForwardIcon, HeartSticker, PawIcon } from "../icons";
import { navigate } from "@/lib/hash-route";
import { usePishnam, type ReceivedGift } from "@/lib/pishnam-store";
import { fa, money } from "@/lib/fa";
import { OCCASIONS, plushLabel } from "@/lib/pishnam-data";

/** Persian/Arabic digits → Latin (mirror of the dashboards helper). */
function toEnDigits(s: string): string {
  return s
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

type VerifyStep = "intro" | "phone" | "otp" | "checking" | "empty";

const RESend_SECONDS = 90;

export function VerifyScreen() {
  const [step, setStep] = useState<VerifyStep>("intro");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const user = usePishnam((s) => s.user);
  const login = usePishnam((s) => s.login);
  const fetchReceived = usePishnam((s) => s.fetchReceived);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // already signed in → go straight to the received-gifts check
  useEffect(() => {
    if (user && step === "intro") {
      setStep("checking");
      void afterAuth();
    }
  }, [user, step]);

  const startResend = () => {
    setResendIn(RESend_SECONDS);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendIn((s) => {
        if (s <= 1 && timerRef.current) clearInterval(timerRef.current);
        return Math.max(0, s - 1);
      });
    }, 1000);
  };

  /** post-auth: how many gifts are waiting for THIS phone? */
  async function afterAuth() {
    const gifts = await fetchReceived();
    if (gifts.length > 0) {
      navigate("my-gifts", { tab: "recv" });
    } else {
      setStep("empty");
    }
  }

  async function requestCode() {
    const p = toEnDigits(phone).replace(/\D/g, "");
    if (!/^09\d{9}$/.test(p)) {
      setErr("شماره موبایل رو با ۰۹ وارد کن");
      return;
    }
    setErr("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: p }),
      });
      const body = (await res.json().catch(() => ({}))) as { devCode?: string };
      if (!res.ok) {
        setErr(res.status === 429 ? "کمی صبر کن و دوباره امتحان کن" : "ارسال کد ناموفق بود");
        return;
      }
      setPhone(p);
      setDevCode(body.devCode ?? "");
      setStep("otp");
      startResend();
    } catch {
      setErr("اینترنت قطعه؛ دوباره امتحان کن");
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode() {
    const c = toEnDigits(code).replace(/\D/g, "");
    if (!/^\d{6}$/.test(c)) {
      setErr("کد ۶ رقمی رو کامل وارد کن");
      return;
    }
    setErr("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: c }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setErr(
          body.error === "rate_limited"
            ? "تلاش‌هایت زیاد شد؛ کمی صبر کن"
            : body.error === "invalid_code"
              ? "کد درست نیست"
              : "کد منقضی شده؛ دوباره بگیر",
        );
        return;
      }
      login(phone, "");
      setStep("checking");
      await afterAuth();
    } catch {
      setErr("اینترنت قطعه؛ دوباره امتحان کن");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F2FAFD] px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-10">
      <div className="pishnam-glow mb-4">
        <Logo size={56} />
      </div>

      {step === "intro" && (
        <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
          <span className="text-6xl" aria-hidden="true">📮</span>
          <h1 className="m-0 text-[26px] font-black leading-[1.5]">هدیه‌ات رسید؟ پیامت اینجاست!</h1>
          <p className="m-0 text-[14.5px] font-medium leading-[2] text-[#1F3E4D]">
            روی کارت‌پستال داخل جعبه یک QR هست که اینجا رو باز کرده. برای دیدن پیام اختصاصی
            فرستنده، شماره موبایل خودت رو وارد کن و با کد پیامکی تأییدش کن. اگه حساب نداشته باشی،
            خودکار برات ساخته می‌شه و هدیه‌هات همیشه همین‌جا می‌مونه.
          </p>
          <div className="mt-2 flex w-full flex-col gap-2 rounded-[22px] border border-[#DDEEF5] bg-white p-4 text-right">
            {[
              { icon: "📱", text: "شماره موبایلت رو وارد کن" },
              { icon: "🔐", text: "کد پیامکی رو بزن" },
              { icon: "💖", text: "پیام، عکس و ویس فرستنده رو ببین" },
            ].map((r) => (
              <div key={r.text} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E3F6FD] text-lg" aria-hidden="true">{r.icon}</span>
                <span className="text-[13.5px] font-bold text-[#04202E]">{r.text}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep("phone")}
            className="mt-3 flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95"
          >
            شروع تأیید شماره
            <ForwardIcon />
          </button>
          <button
            type="button"
            onClick={() => navigate("home")}
            className="text-[12.5px] font-bold text-[#006387] underline underline-offset-4"
          >
            فعلاً نه — رفتن به فروشگاه
          </button>
        </div>
      )}

      {step === "phone" && (
        <div className="flex w-full max-w-md flex-col gap-3 text-center">
          <h1 className="m-0 text-[24px] font-black">شماره موبایلت چیه؟</h1>
          <p className="m-0 text-[13.5px] font-medium leading-[1.9] text-[#4A6572]">
            فقط هدیه‌هایی که به این شماره فرستاده شدن رو می‌بینی — نه بیشتر، نه کمتر.
          </p>
          <input
            type="tel"
            inputMode="numeric"
            autoFocus
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
            aria-label="شماره موبایل گیرنده"
            className="box-border h-[58px] rounded-[20px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-center text-xl font-black tracking-widest text-[#04202E] outline-none focus:border-[#00ABE7]"
          />
          {err && <p className="m-0 text-[12.5px] font-bold text-[#B02A52]">{err}</p>}
          <button
            type="button"
            disabled={busy}
            onClick={() => void requestCode()}
            className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60"
          >
            {busy ? "داریم کد رو می‌فرستیم…" : "بفرست کد تأیید"}
            {!busy && <ForwardIcon />}
          </button>
          <button type="button" onClick={() => setStep("intro")} className="text-[12px] font-bold text-[#006387] underline underline-offset-4">
            برگشت
          </button>
        </div>
      )}

      {step === "otp" && (
        <div className="flex w-full max-w-md flex-col gap-3 text-center">
          <h1 className="m-0 text-[24px] font-black">کد ۶ رقمی رو وارد کن</h1>
          <p className="m-0 text-[13.5px] font-medium leading-[1.9] text-[#4A6572]">
            به <b dir="ltr">{fa(phone)}</b> پیامک شد
          </p>
          {devCode && (
            <div className="rounded-2xl bg-[#FFF3C9] px-4 py-2.5 text-[12.5px] font-bold text-[#7A5C00]">
              حالت آزمایشی — کد تو: <b dir="ltr">{fa(devCode)}</b>
            </div>
          )}
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="――――――"
            aria-label="کد تأیید ۶ رقمی"
            className="box-border h-[58px] rounded-[20px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-center text-2xl font-black tracking-[0.4em] text-[#04202E] outline-none focus:border-[#00ABE7]"
          />
          {err && <p className="m-0 text-[12.5px] font-bold text-[#B02A52]">{err}</p>}
          <button
            type="button"
            disabled={busy}
            onClick={() => void verifyCode()}
            className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60"
          >
            {busy ? "داریم چک می‌کنیم…" : "تأیید و دیدن هدیه‌ها"}
            {!busy && <HeartSticker size={20} fill="#04202E" stroke="none" />}
          </button>
          <button
            type="button"
            disabled={resendIn > 0 || busy}
            onClick={() => void requestCode()}
            className="text-[12px] font-bold text-[#006387] underline underline-offset-4 disabled:no-underline disabled:opacity-50"
          >
            {resendIn > 0 ? `ارسال دوباره تا ${fa(resendIn)} ثانیه دیگر` : "ارسال دوباره‌ی کد"}
          </button>
        </div>
      )}

      {step === "checking" && (
        <div className="flex flex-col items-center gap-4 pt-16">
          <span className="h-12 w-12 animate-spin rounded-full border-4 border-[#CFE6EF] border-t-[#00ABE7]" />
          <span className="text-[15px] font-bold text-[#04202E]">داریم هدیه‌هایت را پیدا می‌کنیم…</span>
        </div>
      )}

      {step === "empty" && (
        <div className="flex w-full max-w-md flex-col items-center gap-4 pt-8 text-center">
          <span className="text-6xl" aria-hidden="true">🍃</span>
          <h1 className="m-0 text-[22px] font-black">هنوز هدیه‌ای برای این شماره نیومده</h1>
          <p className="m-0 text-[13.5px] font-medium leading-[2] text-[#4A6572]">
            وقتی کسی با این شماره برات هدیه بفرسته و بسته‌ت برسه، همین‌جا پیامش رو می‌بینی. حساب
            کاربریت هم از الان ساخته شد.
          </p>
          <button
            type="button"
            onClick={() => navigate("my-gifts")}
            className="mt-2 flex h-[50px] w-full items-center justify-center rounded-full bg-[#04202E] text-[15px] font-extrabold text-white"
          >
            رفتن به حساب کاربری
          </button>
          <button type="button" onClick={() => navigate("home")} className="text-[12px] font-bold text-[#006387] underline underline-offset-4">
            صفحه‌ی اصلی
          </button>
        </div>
      )}

      <p className="mt-auto pt-8 text-center text-[11.5px] font-medium leading-[1.9] text-[#4A6572]">
        تأیید شماره فقط ورود به حساب کاربری خودت است؛ هیچ هدیه‌ای از دیگران دیده نمی‌شود.
      </p>
    </div>
  );
}

// ═══════════════ GIFT VIEWER (#/gift-view?code=…) ═══════════════

interface ViewPayload {
  state: "ok" | "expired" | "purged";
  to?: string;
  occasion?: number;
  kind?: string;
  hearts?: number;
  paws?: number;
  senderMode?: "name" | "phrase" | "anon";
  senderLabel?: string;
  message?: string;
  media?: { key: string; url: string }[];
  opened?: boolean;
  retention?: { state: string; shownAt: string | null; expiresAt: string | null; purgeStatus: string };
}

export function GiftViewScreen({ code }: { code: string }) {
  const receivedGifts = usePishnam((s) => s.receivedGifts);
  const receivedStatus = usePishnam((s) => s.receivedStatus);
  const fetchReceived = usePishnam((s) => s.fetchReceived);
  const user = usePishnam((s) => s.user);
  const [data, setData] = useState<ViewPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // authorized list defines the navigation set (mission §۲)
  useEffect(() => {
    if (receivedStatus === "idle") void fetchReceived();
  }, [receivedStatus, fetchReceived]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr("");
    fetch(`/api/gifts/${encodeURIComponent(code)}/view`, { method: "POST" })
      .then(async (res) => {
        const body = (await res.json().catch(() => ({}))) as ViewPayload & { error?: string };
        if (!alive) return;
        if (!res.ok) {
          setErr(body.error === "unauthenticated" ? "اول شماره‌ات رو تأیید کن" : "این هدیه پیدا نشد یا مال تو نیست");
          setData(null);
        } else {
          setData(body);
        }
      })
      .catch(() => alive && setErr("اینترنت قطعه؛ دوباره امتحان کن"))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [code]);

  // nav set = ONLY the gifts this session is authorized to view
  const navList = receivedGifts.filter((g) => g.retention.state !== "expired" && g.retention.state !== "purged");
  const idx = navList.findIndex((g) => g.code === code);
  const prev = idx > 0 ? navList[idx - 1] : null;
  const next = idx >= 0 && idx < navList.length - 1 ? navList[idx + 1] : null;

  if (!user) {
    return (
      <Centered>
        <span className="text-6xl" aria-hidden="true">🔒</span>
        <h1 className="m-0 text-[22px] font-black">اول شماره‌ات رو تأیید کن</h1>
        <p className="m-0 text-[13.5px] leading-[2] text-[#4A6572]">برای دیدن پیام، لازمه با شماره موبایلت وارد شی.</p>
        <button
          type="button"
          onClick={() => navigate("verify")}
          className="mt-2 flex h-[50px] w-full max-w-xs items-center justify-center rounded-full bg-[#00ABE7] text-[15px] font-extrabold text-[#04202E]"
        >
          تأیید شماره موبایل
        </button>
      </Centered>
    );
  }

  if (loading) {
    return (
      <Centered>
        <span className="h-12 w-12 animate-spin rounded-full border-4 border-[#CFE6EF] border-t-[#00ABE7]" />
        <span className="text-[14px] font-bold text-[#04202E]">داریم پیامت رو باز می‌کنیم…</span>
      </Centered>
    );
  }

  if (err || !data) {
    return (
      <Centered>
        <span className="text-6xl" aria-hidden="true">😟</span>
        <h1 className="m-0 text-[20px] font-black">{err || "پیام پیدا نشد"}</h1>
        <button
          type="button"
          onClick={() => navigate("my-gifts", { tab: "recv" })}
          className="mt-2 flex h-[48px] w-full max-w-xs items-center justify-center rounded-full bg-[#04202E] text-[14px] font-extrabold text-white"
        >
          برگشت به دریافتی‌ها
        </button>
      </Centered>
    );
  }

  if (data.state === "expired" || data.state === "purged") {
    return (
      <Centered>
        <span className="text-6xl" aria-hidden="true">{data.state === "purged" ? "🗑️" : "⌛"}</span>
        <h1 className="m-0 text-[20px] font-black">{data.state === "purged" ? "این پیام حذف شده" : "مهلت نگهداری این پیام تموم شده"}</h1>
        <p className="m-0 max-w-sm text-[13px] leading-[2] text-[#4A6572]">
          محتوای پیام‌ها بعد از پایان پلن نگهداری، به‌صورت خودکار و کامل حذف می‌شه. سفارش و سوابقش
          سر جاش هست، ولی متن و فایل‌های پیام دیگه در دسترس نیستن.
        </p>
        {data.state === "expired" && (
          <div className="w-full max-w-md text-right">
            <RenewCard code={code} state={data.state} />
          </div>
        )}
        <button
          type="button"
          onClick={() => navigate("my-gifts", { tab: "recv" })}
          className="mt-2 flex h-[48px] w-full max-w-xs items-center justify-center rounded-full bg-[#04202E] text-[14px] font-extrabold text-white"
        >
          برگشت به دریافتی‌ها
        </button>
      </Centered>
    );
  }

  const kind = (data.kind ?? "bear") as Parameters<typeof Plush>[0]["kind"];
  const occIdx = data.occasion ?? 0;
  const expiresAt = data.retention?.expiresAt ? new Date(data.retention.expiresAt) : null;
  const daysLeft = expiresAt ? Math.max(0, Math.ceil((expiresAt.getTime() - Date.now()) / 864e5)) : null;

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F2FAFD] px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-8">
      <div className="flex w-full max-w-md items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("my-gifts", { tab: "recv" })}
          className="rounded-full border border-[#CFE6EF] bg-white px-4 py-2 text-[12.5px] font-extrabold text-[#04202E]"
        >
          ← دریافتی‌ها
        </button>
        {idx >= 0 && navList.length > 0 && (
          <span className="rounded-full bg-[#04202E] px-3.5 py-2 text-[12px] font-extrabold text-white">
            هدیه {fa(idx + 1)} از {fa(navList.length)}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-col items-center gap-2 text-center">
        <div className="pishnam-glow rounded-full">
          <Plush kind={kind} size={96} />
        </div>
        <span className="text-[15px] font-extrabold text-[#04202E]">
          برای {data.to ?? "تو"} {OCCASIONS[occIdx] ? `· ${OCCASIONS[occIdx]}` : ""}
        </span>
        <span className="text-[12px] font-bold text-[#4A6572]">
          {plushLabel(kind)} · هدیه {fa(data.hearts ?? 0)} قلب و {fa(data.paws ?? 0)} پنجه داره
        </span>
      </div>

      {/* sender card — the ONLY sender surface the recipient ever sees */}
      <div className="mt-4 flex w-full max-w-md items-center gap-3 rounded-[22px] border-[1.5px] border-[#DDEEF5] bg-white px-4 py-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFE9F0] text-xl" aria-hidden="true">
          {data.senderMode === "anon" ? "🎁" : data.senderMode === "phrase" ? "✍️" : "🙂"}
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-[13px] font-extrabold text-[#04202E]">
            {data.senderMode === "anon" ? "فرستنده ناشناس" : "فرستنده"}
          </span>
          <span className="truncate text-[14px] font-black text-[#B02A52]">{data.senderLabel}</span>
        </div>
        {data.senderMode === "anon" && (
          <span className="rounded-full bg-[#F2FAFD] px-2.5 py-1 text-[10px] font-extrabold text-[#006387]">هویت محفوظ است</span>
        )}
      </div>

      {/* THE message — first successful render starts the retention clock */}
      {data.message && data.message.trim() && (
        <div className="mt-3 w-full max-w-md rounded-[26px] border-[2.5px] border-[#04202E] bg-white px-5 py-5">
          <p className="m-0 whitespace-pre-wrap text-[15.5px] font-medium leading-[2.1] text-[#04202E]">
            {data.message}
          </p>
        </div>
      )}

      {/* private media — streamed only through the authorized endpoint */}
      {data.media && data.media.length > 0 && (
        <div className="mt-3 flex w-full max-w-md flex-col gap-3">
          {data.media.map((m) => {
            const ext = m.key.split(".").pop() ?? "";
            const isImg = ["jpg", "png", "webp"].includes(ext);
            const isVid = ["mp4", "webm"].includes(ext);
            return isImg ? (
              <img key={m.key} src={m.url} alt="عکس پیام فرستنده" className="w-full rounded-[22px] border-[2.5px] border-[#04202E] bg-white" />
            ) : isVid ? (
              <video key={m.key} src={m.url} controls playsInline className="w-full rounded-[22px] border-[2.5px] border-[#04202E] bg-black" />
            ) : (
              <audio key={m.key} src={m.url} controls className="w-full" />
            );
          })}
        </div>
      )}

      {!data.message?.trim() && (!data.media || data.media.length === 0) && (
        <div className="mt-3 w-full max-w-md rounded-[22px] bg-[#FFF3C9] px-4 py-3 text-center text-[12.5px] font-bold text-[#7A5C00]">
          این هدیه پیام متنی نداره
        </div>
      )}

      {/* retention chip */}
      {expiresAt && (
        <div className="mt-4 flex w-full max-w-md items-center justify-between rounded-[18px] bg-[#E3F6FD] px-4 py-3">
          <span className="flex items-center gap-2 text-[12.5px] font-extrabold text-[#04202E]">
            <PawIcon size={18} /> نگهداری این پیام
          </span>
          <span className="text-[12px] font-bold text-[#006387]">
            تا {fa(daysLeft ?? 0)} روز دیگر ({new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long", year: "numeric" }).format(expiresAt)})
          </span>
        </div>
      )}

      {/* تمدید نگهداری (mission §۴) — paid plans, admin-approved */}
      <RenewCard code={code} state={data.state} />

      {/* prev / next — only between AUTHORIZED, valid gifts */}
      {(prev || next) && (
        <div className="mt-6 flex w-full max-w-md items-stretch justify-between gap-3">
          {prev ? (
            <button
              type="button"
              onClick={() => navigate("gift-view", { code: prev.code })}
              className="flex flex-1 flex-col items-center gap-1 rounded-[20px] border-[1.5px] border-[#CFE6EF] bg-white px-3 py-3 transition-transform active:scale-95"
            >
              <span className="text-[10.5px] font-bold text-[#4A6572]">هدیه قبلی</span>
              <span className="text-[12.5px] font-extrabold text-[#04202E]">برای {prev.to}</span>
            </button>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <button
              type="button"
              onClick={() => navigate("gift-view", { code: next.code })}
              className="flex flex-1 flex-col items-center gap-1 rounded-[20px] border-[1.5px] border-[#CFE6EF] bg-white px-3 py-3 transition-transform active:scale-95"
            >
              <span className="text-[10.5px] font-bold text-[#4A6572]">هدیه بعدی</span>
              <span className="text-[12.5px] font-extrabold text-[#04202E]">برای {next.to}</span>
            </button>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      )}

      <p className="mt-8 text-center text-[11px] font-medium leading-[1.9] text-[#4A6572]">
        این پیام خصوصی است و فقط برای گیرنده‌ی تأییدشده نمایش داده می‌شود.
      </p>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#F2FAFD] px-6 py-14 text-center">
      {children}
    </div>
  );
}

// ═══════════════ RENEW CARD («تمدید نگهداری پیام» — mission §۴) ═══════════════

interface RenewalPayload {
  id: string;
  code: string;
  plan: string;
  priceToman: number;
  status: "awaiting_payment" | "payment_under_review" | "paid" | "cancelled";
  cancelReason?: string;
  instructions?: { cardNumber: string; sheba: string; cardName: string; amount: string; code: string };
}

function RenewCard({ code, state }: { code: string; state: string }) {
  const retentionPrices = usePishnam((s) => s.retentionPrices);
  const catalogLoaded = usePishnam((s) => s.catalogLoaded);
  const loadCatalog = usePishnam((s) => s.loadCatalog);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [renewal, setRenewal] = useState<RenewalPayload | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // standalone screens skip the dashboard bootstrap — prices ride the catalog
  useEffect(() => {
    if (!catalogLoaded) void loadCatalog();
  }, [catalogLoaded, loadCatalog]);

  const plans = [
    { key: "6m", title: "۶ ماهه", price: retentionPrices.m6 },
    { key: "12m", title: "۱ ساله", price: retentionPrices.m12 },
  ].filter((p) => p.price > 0);

  async function requestRenewal(plan: string) {
    setBusy(true);
    setErr("");
    try {
      const res = await fetch(`/api/gifts/${encodeURIComponent(code)}/renew`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const body = (await res.json().catch(() => ({}))) as RenewalPayload & { error?: string };
      if (!res.ok) {
        setErr(
          body.error === "purged_not_renewable"
            ? "محتوای این پیام حذف شده و قابل تمدید نیست"
            : body.error === "not_displayed_yet"
              ? "اول پیام را یک‌بار ببین؛ بعد می‌توانی تمدید کنی"
              : body.error === "unauthenticated"
                ? "اول شماره‌ات را تأیید کن"
                : "الان نمی‌شود؛ کمی بعد دوباره امتحان کن",
        );
        return;
      }
      setRenewal(body);
    } catch {
      setErr("اینترنت قطعه؛ دوباره امتحان کن");
    } finally {
      setBusy(false);
    }
  }

  async function uploadReceipt(file: File) {
    setUploading(true);
    setErr("");
    try {
      const form = new FormData();
      form.set("file", file);
      const res = await fetch(`/api/gifts/${encodeURIComponent(code)}/renew/receipt`, { method: "POST", body: form });
      const body = (await res.json().catch(() => ({}))) as { status?: string; error?: string };
      if (!res.ok) {
        setErr(
          body.error === "duplicate_receipt"
            ? "این رسید قبلاً استفاده شده"
            : body.error === "bad_file_type"
              ? "فقط عکس (JPG/PNG/WebP) قبول می‌شود"
              : "آپلود ناموفق بود؛ دوباره امتحان کن",
        );
        return;
      }
      setRenewal((r) => (r ? { ...r, status: "payment_under_review" } : r));
    } catch {
      setErr("اینترنت قطعه؛ دوباره امتحان کن");
    } finally {
      setUploading(false);
    }
  }

  // purged content can never be renewed — don't even show the card
  if (state === "purged") return null;
  const paid = renewal?.status === "paid";
  const underReview = renewal?.status === "payment_under_review";

  return (
    <div className="mt-3 w-full max-w-md rounded-[22px] border-[1.5px] border-[#DDEEF5] bg-white px-4 py-4">
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between" aria-expanded={open}>
        <span className="flex items-center gap-2 text-[13.5px] font-extrabold text-[#04202E]">
          ⏳ تمدید نگهداری این پیام
        </span>
        <span className="text-[11px] font-bold text-[#006387]">{open ? "بستن" : "چطور؟"}</span>
      </button>

      {open && !renewal && (
        <div className="mt-3 flex flex-col gap-2">
          <p className="m-0 text-[12px] font-medium leading-[1.9] text-[#4A6572]">
            وقتی مهلت تمام شود، متن و فایل‌های پیام برای همیشه حذف می‌شوند. با تمدید، همان پیام و فایل‌ها حفظ می‌شوند.
          </p>
          {plans.map((p) => (
            <button
              key={p.key}
              type="button"
              disabled={busy}
              onClick={() => void requestRenewal(p.key)}
              className="flex items-center justify-between rounded-[16px] border-[1.5px] border-[#CFE6EF] bg-[#F2FAFD] px-4 py-3 transition-transform active:scale-95 disabled:opacity-60"
            >
              <span className="text-[13px] font-extrabold text-[#04202E]">پلن {p.title}</span>
              <span className="text-[12.5px] font-black text-[#006387]">{money(p.price)} تومان</span>
            </button>
          ))}
        </div>
      )}

      {renewal && (
        <div className="mt-3 flex flex-col gap-2 text-right">
          {paid && (
            <div className="rounded-[14px] bg-[#EAFBF1] px-4 py-3 text-[12.5px] font-extrabold text-[#0B7A3B]">
              ✓ تمدید تأیید شد — نگهداری پیام تمدید شد. ممنون!
            </div>
          )}
          {underReview && (
            <div className="rounded-[14px] bg-[#E3F6FD] px-4 py-3 text-[12.5px] font-extrabold text-[#006387]">
              رسیدت ثبت شد ✓ تا ۱۲ ساعت بررسی می‌شود؛ بعد از تأیید، مهلت جدید اعمال می‌شود.
            </div>
          )}
          {renewal.status === "awaiting_payment" && renewal.instructions && (
            <>
              <div className="rounded-[14px] bg-[#FFF3C9] px-4 py-3 text-[12px] font-bold leading-[2] text-[#7A5C00]">
                مبلغ <b>{money(Number(renewal.instructions.amount))}</b> تومان را کارت به کارت کن و عکس رسید را همین‌جا بفرست:
                <div className="mt-2 flex flex-col gap-1">
                  <span>کارت: <b dir="ltr">{renewal.instructions.cardNumber}</b></span>
                  <span>به نام: <b>{renewal.instructions.cardName}</b></span>
                  <span>کد پیگیری: <b dir="ltr">{renewal.instructions.code}</b></span>
                </div>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void uploadReceipt(f);
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileRef.current?.click()}
                className="flex h-[46px] w-full items-center justify-center rounded-full bg-[#00ABE7] text-[13.5px] font-extrabold text-[#04202E] disabled:opacity-60"
              >
                {uploading ? "داریم می‌فرستیم…" : "فرستادن عکس رسید"}
              </button>
            </>
          )}
          {renewal.status === "cancelled" && (
            <div className="rounded-[14px] bg-[#FFF7FA] px-4 py-3 text-[12px] font-bold text-[#B02A52]">
              این تمدید لغو شد. دوباره امتحان کن یا با پشتیبانی تماس بگیر.
            </div>
          )}
        </div>
      )}

      {err && <p className="mb-0 mt-2 text-[12px] font-bold text-[#B02A52]">{err}</p>}
    </div>
  );
}
