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
// A-03 (audit wave 4): the OTP half runs on the shared useOtp machine
// (purpose "gift_recv") — steps/visuals/empty-state stay exactly as they were.
import { useOtp } from "@/hooks/use-otp";

type VerifyStep = "intro" | "phone" | "otp" | "checking" | "gifts" | "coming" | "empty";

export function VerifyScreen() {
  // owner round 29 law: NO card password anywhere — the display page takes the
  // recipient's phone, the server first CHECKS a package is registered for it,
  // then SMSes a 4-digit code (otp_gift pattern). After verify, the UNREAD
  // messages of their latest orders appear right here; tapping one opens its
  // full gift page (gift-view).
  const [step, setStep] = useState<VerifyStep>("intro");
  const user = usePishnam((s) => s.user);
  const login = usePishnam((s) => s.login);
  const receivedGifts = usePishnam((s) => s.receivedGifts);
  const receivedStatus = usePishnam((s) => s.receivedStatus);
  const fetchReceived = usePishnam((s) => s.fetchReceived);

  /** post-auth: unread gifts of THIS phone → show them right here */
  async function afterAuth() {
    const gifts = await fetchReceived();
    if (gifts.length > 0) {
      setStep("gifts");
    } else {
      // a package may exist but not be viewable yet (paid/packing) — the
      // probe only sent a code when SOMETHING was registered for this phone
      setStep("coming");
    }
  }

  // A-03: shared OTP machine — phone/code/busy/err/resend/devCode live there;
  // this screen keeps only its own step choreography.
  const otp = useOtp({
    purpose: "gift_recv",
    onSuccess: (res) => {
      login(res.user.phone, "");
      setStep("checking");
      void afterAuth();
    },
  });

  // The two shortcut views are DERIVED during render (official react.dev
  // adjust-during-render pattern — the house lint forbids setState-in-effect):
  //  • signed-in visitor landing here → straight to the received-gifts check
  //  • gift_recv probe said «no package for this number» → friendly empty state
  const viewStep: VerifyStep = otp.noGifts ? "empty" : user && step === "intro" ? "checking" : step;

  // the signed-in shortcut still needs its fetch kicked off (once — a failed
  // probe must not loop); the result lands via the async callback, not the
  // effect body itself (house lint: no synchronous setState inside effects)
  const autoCheckStarted = useRef(false);
  useEffect(() => {
    if (user && step === "intro" && !autoCheckStarted.current) {
      autoCheckStarted.current = true;
      void fetchReceived().then((gifts) => {
        if (gifts.length > 0) setStep("gifts");
        else setStep("coming");
      });
    }
  }, [user, step, fetchReceived]);

  async function requestCode() {
    if (await otp.request()) setStep("otp");
  }

  async function verifyCode() {
    // onSuccess (above) does the login + step transition when it returns true
    await otp.verify();
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F2FAFD] px-5 pb-6 pt-10">
      <div className="pishnam-glow mb-4">
        <Logo size={56} />
      </div>

      {viewStep === "intro" && (
        <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
          <span className="text-6xl" aria-hidden="true">📮</span>
          <h1 className="m-0 text-[26px] font-black leading-[1.5]">هدیه‌ات رسید؟ پیامت اینجاست!</h1>
          <p className="m-0 text-[14.5px] font-medium leading-[2] text-[#1F3E4D]">
            روی کارت‌پستال داخل جعبه یک QR هست که اینجا رو باز کرده. شماره موبایل خودت رو وارد
            کن؛ اگه بسته‌ای به اسمت ثبت شده باشه، یه کد ۴ رقمی برات پیامک می‌شه و پیام‌های
            اختصاصی فرستنده رو می‌بینی. هیچ رمزی لازم نیست — حساب هم خودکار برات ساخته می‌شه.
          </p>
          <div className="mt-2 flex w-full flex-col gap-2 rounded-[22px] border border-[#DDEEF5] bg-white p-4 text-right">
            {[
              { icon: "📱", text: "شماره موبایلت رو وارد کن" },
              { icon: "🔐", text: "کد پیامکی رو بزن" },
              { icon: "💖", text: "پیام، ویس، عکس و ویدیو فرستنده رو ببین" },
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

      {viewStep === "phone" && (
        <div className="flex w-full max-w-md flex-col gap-3 text-center">
          <h1 className="m-0 text-[24px] font-black">شماره موبایلت چیه؟</h1>
          <p className="m-0 text-[13.5px] font-medium leading-[1.9] text-[#4A6572]">
            اول چک می‌کنیم بسته‌ای به این شماره ثبت شده یا نه — بعد کد رو می‌فرستیم.
          </p>
          <input
            type="tel"
            inputMode="numeric"
            autoFocus
            value={fa(otp.phone)}
            onChange={(e) => otp.setPhone(e.target.value)}
            placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
            aria-label="شماره موبایل گیرنده"
            className="box-border h-[58px] rounded-[20px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-center text-xl font-black tracking-widest text-[#04202E] outline-none focus:border-[#00ABE7]"
          />
          {otp.err && <p className="m-0 text-[12.5px] font-bold text-[#B02A52]">{otp.err}</p>}
          <button
            type="button"
            disabled={otp.busy}
            onClick={() => void requestCode()}
            className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60"
          >
            {otp.busy ? "داریم چک می‌کنیم…" : "بفرست کد تأیید"}
            {!otp.busy && <ForwardIcon />}
          </button>
          <button type="button" onClick={() => setStep("intro")} className="text-[12px] font-bold text-[#006387] underline underline-offset-4">
            برگشت
          </button>
        </div>
      )}

      {viewStep === "otp" && (
        <div className="flex w-full max-w-md flex-col gap-3 text-center">
          <h1 className="m-0 text-[24px] font-black">کد ۴ رقمی رو وارد کن</h1>
          <p className="m-0 text-[13.5px] font-medium leading-[1.9] text-[#4A6572]">
            به <b dir="ltr">{fa(otp.phone)}</b> پیامک شد
          </p>
          {otp.devCode && (
            <div className="rounded-2xl bg-[#FFF3C9] px-4 py-2.5 text-[12.5px] font-bold text-[#7A5C00]">
              حالت آزمایشی — کد تو: <b dir="ltr">{fa(otp.devCode)}</b>
            </div>
          )}
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            autoFocus
            value={fa(otp.code)}
            onChange={(e) => otp.setCode(e.target.value)}
            placeholder="――――"
            aria-label="کد تأیید ۴ رقمی"
            className="box-border h-[58px] rounded-[20px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-center text-2xl font-black tracking-[0.4em] text-[#04202E] outline-none focus:border-[#00ABE7]"
          />
          {otp.err && <p className="m-0 text-[12.5px] font-bold text-[#B02A52]">{otp.err}</p>}
          <button
            type="button"
            disabled={otp.busy}
            onClick={() => void verifyCode()}
            className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60"
          >
            {otp.busy ? "داریم چک می‌کنیم…" : "تأیید و دیدن پیام‌ها"}
            {!otp.busy && <HeartSticker size={20} fill="#04202E" stroke="none" />}
          </button>
          <button
            type="button"
            disabled={otp.resendIn > 0 || otp.busy}
            onClick={() => void requestCode()}
            className="text-[12px] font-bold text-[#006387] underline underline-offset-4 disabled:no-underline disabled:opacity-50"
          >
            {otp.resendIn > 0 ? `ارسال دوباره تا ${fa(otp.resendIn)} ثانیه دیگر` : "ارسال دوباره‌ی کد"}
          </button>
        </div>
      )}

      {viewStep === "checking" && (
        <div className="flex flex-col items-center gap-4 pt-16">
          <span className="h-12 w-12 animate-spin rounded-full border-4 border-[#CFE6EF] border-t-[#00ABE7]" />
          <span className="text-[15px] font-bold text-[#04202E]">داریم هدیه‌هایت را پیدا می‌کنیم…</span>
        </div>
      )}

      {viewStep === "gifts" && (
        <div className="flex w-full max-w-md flex-col gap-3 pt-4">
          <div className="text-center">
            <span className="text-5xl" aria-hidden="true">💝</span>
            <h1 className="m-0 mt-2 text-[24px] font-black leading-[1.5]">برات پیام دارن!</h1>
            <p className="m-0 text-[13.5px] font-medium leading-[1.9] text-[#4A6572]">
              {receivedGifts.filter((g) => !g.opened).length > 0
                ? `${fa(receivedGifts.filter((g) => !g.opened).length)} تا پیام نخونده داری — روی هرکدوم بزنی، صفحه اصلیش باز می‌شه.`
                : "روی هر هدیه بزنی تا پیامش رو ببینی."}
            </p>
          </div>
          {receivedStatus === "loading" && (
            <div className="flex justify-center py-8">
              <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#CFE6EF] border-t-[#00ABE7]" />
            </div>
          )}
          {[...receivedGifts].sort((a, b) => Number(a.opened) - Number(b.opened)).map((g) => (
            <button
              key={g.code}
              type="button"
              onClick={() => navigate("gift-view", { code: g.code })}
              className="relative flex items-center gap-3.5 rounded-[24px] border-2 bg-white p-3.5 text-right transition-transform active:scale-[0.98]"
              style={{ borderColor: g.opened ? "#DDEEF5" : "#00ABE7" }}
              aria-label={`باز کردن پیام هدیه شماره ${fa(g.no)}${g.opened ? " (دیده‌شده)" : " (جدید)"}`}
            >
              <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[18px] bg-[#F2FAFD]">
                <Plush kind={g.kind} size={54} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[16px] font-black text-[#04202E]">هدیه‌ی شماره {fa(g.no)}</span>
                  {!g.opened && (
                    <span className="rounded-full bg-[#00ABE7] px-2 py-0.5 text-[9.5px] font-black text-[#04202E]">پیام جدید</span>
                  )}
                </span>
                <span className="text-[12px] font-bold text-[#006387]">از طرف: {g.senderLabel}</span>
                <span className="text-[11.5px] font-medium text-[#4A6572]">
                  {g.hasMessage ? "متن و رسانه‌های خصوصی منتظرتن" : "جعبه‌ی مهربونی"}
                  {g.mediaCount > 0 ? ` · ${fa(g.mediaCount)} فایل` : ""}
                </span>
              </span>
              <ForwardIcon />
            </button>
          ))}
          <button
            type="button"
            onClick={() => navigate("my-gifts", { tab: "recv" })}
            className="mt-2 flex h-[50px] w-full items-center justify-center rounded-full border-2 border-[#04202E] text-[14.5px] font-extrabold text-[#04202E]"
          >
            رفتن به حساب کاربری
          </button>
        </div>
      )}

      {viewStep === "coming" && (
        <div className="flex w-full max-w-md flex-col items-center gap-4 pt-8 text-center">
          <span className="text-6xl" aria-hidden="true">📦</span>
          <h1 className="m-0 text-[22px] font-black">هدیه‌ات داره میاد!</h1>
          <p className="m-0 text-[13.5px] font-medium leading-[2] text-[#4A6572]">
            بسته‌ای به اسم این شماره ثبت شده ولی هنوز به دستت نرسیده. وقتی جعبه رسید، همین صفحه
            پیام‌هاش رو نشونت می‌ده.
          </p>
          <button
            type="button"
            onClick={() => navigate("track")}
            className="mt-2 flex h-[50px] w-full items-center justify-center rounded-full bg-[#04202E] text-[15px] font-extrabold text-white"
          >
            پیگیری مرسوله
          </button>
          <button type="button" onClick={() => navigate("home")} className="text-[12px] font-bold text-[#006387] underline underline-offset-4">
            صفحه‌ی اصلی
          </button>
        </div>
      )}

      {viewStep === "empty" && (
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
