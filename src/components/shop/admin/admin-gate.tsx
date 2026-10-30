"use client";

// ── admin gate (A-02 split) — OTP + server-side admin session (guide A7) ──
// Two ways in: SMS OTP for registered admin seats, or the panel password
// (.env ADMIN_PANEL_PASSWORD) compared constant-time on the server.
// A-03 (audit wave 4): the OTP half now runs on the shared useOtp machine
// (purpose "login"); the password mode + its own /api/auth/admin-login call
// stay exactly as they were. Visuals/copy untouched — including the generic
// per-step failure lines (the gate keeps showing its own fallbacks instead of
// the hook's messages, byte-for-byte like before).
import { useRef, useState } from "react";
import { Plush } from "@/components/shop/plush";
import { useOtp } from "@/hooks/use-otp";

export const UNLOCK_KEY = "pishnam-admin-ok";

export function AdminOtpGate({ onOk }: { onOk: () => void }) {
  const [mode, setMode] = useState<"otp" | "password">("otp");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false); // password mode only — OTP busy comes from the hook
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const fail = (msg?: string) => {
    setErrMsg(msg ?? "");
    setErr(true);
    setTimeout(() => setErr(false), 1200);
  };

  // A-03: shared OTP machine. A verify that succeeds but is NOT an admin seat
  // must fail exactly like before (no enumeration, same generic message).
  const adminOkRef = useRef(false);
  const otp = useOtp({
    purpose: "login",
    onSuccess: (res) => {
      if (!res.admin) return;
      adminOkRef.current = true;
      try {
        sessionStorage.setItem(UNLOCK_KEY, "1");
      } catch {}
      onOk();
    },
  });

  const sendCode = async () => {
    if (await otp.request()) {
      setStep("code");
    } else {
      fail();
    }
  };

  const submit = async () => {
    adminOkRef.current = false;
    const ok = await otp.verify();
    if (!ok || !adminOkRef.current) fail();
  };

  // ورود با رمز — مسیر دوم (فوتر: «ورود مدیر»). سرور رمز را constant-time مقایسه می‌کند.
  const submitPassword = async () => {
    if (password.trim().length < 4) {
      fail();
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        try {
          sessionStorage.setItem(UNLOCK_KEY, "1");
        } catch {}
        onOk();
        return;
      }
      fail(json.error === "rate_limited" ? "چند بار اشتباه زدی؛ ۱۵ دقیقه صبر کن." : "رمز درست نیست.");
    } catch {
      fail();
    }
    setBusy(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F2FAFD] px-5">
      <div className="pishnam-reveal flex w-full max-w-[380px] flex-col items-center gap-4 rounded-[28px] border border-[#DDEEF5] bg-white p-7 text-center shadow-[0_14px_34px_rgba(4,32,46,0.06)]">
        <span className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#E3F6FD]">
          <Plush kind="bear" size={52} />
        </span>
        <div className="flex flex-col gap-1.5">
          <h1 className="m-0 text-[22px] font-black">پنل مدیریت</h1>
          <p className="m-0 text-[13.5px] font-medium leading-[1.9] text-[#4A6572]">
            {mode === "password"
              ? "رمز پنل رو بزن (فایل .env سرور: ADMIN_PANEL_PASSWORD)."
              : step === "phone"
                ? "با شماره‌ی موبایلِ مدیریتت کد ورود بگیر."
                : "کد ۴ رقمی پیامک‌شده رو بزن."}
          </p>
        </div>
        {mode === "password" ? (
          <input
            type="password"
            dir="ltr"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !busy && void submitPassword()}
            placeholder="••••••••"
            aria-label="رمز پنل مدیریت"
            className={`h-[54px] w-full rounded-[18px] border-2 bg-white text-center text-[16px] font-black tracking-[0.2em] text-[#04202E] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,171,231,0.15)] ${
              err ? "pishnam-shake border-[#F0426B]" : "border-[#04202E]"
            }`}
          />
        ) : step === "phone" ? (
          <input
            type="tel"
            inputMode="numeric"
            dir="ltr"
            maxLength={11}
            value={otp.phone}
            onChange={(e) => otp.setPhone(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !otp.busy && void sendCode()}
            placeholder="09xxxxxxxxx"
            aria-label="شماره موبایل مدیریت"
            className={`h-[54px] w-full rounded-[18px] border-2 bg-white text-center text-[18px] font-black text-[#04202E] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,171,231,0.15)] ${
              err ? "pishnam-shake border-[#F0426B]" : "border-[#04202E]"
            }`}
          />
        ) : (
          <input
            type="password"
            inputMode="numeric"
            dir="ltr"
            maxLength={4}
            value={otp.code}
            onChange={(e) => otp.setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !otp.busy && void submit()}
            placeholder="••••"
            aria-label="کد ورود چهاررقمی"
            className={`h-[54px] w-full rounded-[18px] border-2 bg-white text-center text-[20px] font-black tracking-[0.4em] text-[#04202E] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,171,231,0.15)] ${
              err ? "pishnam-shake border-[#F0426B]" : "border-[#04202E]"
            }`}
          />
        )}
        {err && (
          <span className="text-[12.5px] font-bold text-[#F0426B]">
            {errMsg ||
              (mode === "password"
                ? "رمز درست نیست."
                : step === "phone"
                  ? "شماره درست نیست یا سرویس در دسترس نیست."
                  : "کد درست نیست یا منقضی شده.")}
          </span>
        )}
        <button
          type="button"
          disabled={mode === "password" ? busy : otp.busy}
          onClick={() =>
            mode === "password" ? void submitPassword() : step === "phone" ? void sendCode() : void submit()
          }
          className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#00ABE7] text-[16px] font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60"
        >
          {mode === "password" ? "ورود با رمز" : step === "phone" ? "دریافت کد ورود" : "ورود به پنل"}
        </button>
        {mode === "otp" && step === "code" && (
          <button
            type="button"
            onClick={() => {
              setStep("phone");
              otp.reset();
              setErr(false);
            }}
            className="text-[12.5px] font-bold text-[#4A6572] underline"
          >
            تغییر شماره
          </button>
        )}
        <div className="flex items-center gap-2 text-[12px] font-bold text-[#4A6572]">
          <span className="h-px w-8 bg-[#CFE6EF]" aria-hidden="true" />
          یا
          <span className="h-px w-8 bg-[#CFE6EF]" aria-hidden="true" />
        </div>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "otp" ? "password" : "otp");
            setErr(false);
            setErrMsg("");
          }}
          className="text-[12.5px] font-extrabold text-[#006387] underline underline-offset-4"
        >
          {mode === "otp" ? "ورود با رمز عبور" : "ورود با کد پیامکی"}
        </button>
        <span className="rounded-full bg-[#FFF3C9] px-3.5 py-1.5 text-[11.5px] font-extrabold text-[#8A6D1F]">
          ورود: ادمین و مدیر فروشگاه (شماره‌های ثبت‌شده یا رمز)
        </span>
      </div>
    </div>
  );
}
