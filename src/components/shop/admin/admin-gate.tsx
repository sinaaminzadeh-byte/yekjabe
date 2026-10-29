"use client";

// ── admin gate (A-02 split) — OTP + server-side admin session (guide A7) ──
// Two ways in: SMS OTP for registered admin seats, or the panel password
// (.env ADMIN_PANEL_PASSWORD) compared constant-time on the server.
import { useState } from "react";
import { Plush } from "@/components/shop/plush";

export const UNLOCK_KEY = "pishnam-admin-ok";

function toEnDigits(s: string): string {
  return s.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

export function AdminOtpGate({ onOk }: { onOk: () => void }) {
  const [mode, setMode] = useState<"otp" | "password">("otp");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const fail = (msg?: string) => {
    setErrMsg(msg ?? "");
    setErr(true);
    setTimeout(() => setErr(false), 1200);
  };

  const sendCode = async () => {
    const p = toEnDigits(phone.trim());
    if (!/^09\d{9}$/.test(p)) {
      fail();
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: p }),
      });
      if (!res.ok) throw new Error("request failed");
      setStep("code");
    } catch {
      fail();
    }
    setBusy(false);
  };

  const submit = async () => {
    const p = toEnDigits(phone.trim());
    const c = toEnDigits(code.trim());
    if (!/^09\d{9}$/.test(p) || !/^\d{4}$/.test(c)) {
      fail();
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: p, code: c }),
      });
      const json = (await res.json()) as { ok?: boolean; admin?: boolean };
      if (res.ok && json.ok && json.admin) {
        try {
          sessionStorage.setItem(UNLOCK_KEY, "1");
        } catch {}
        onOk();
        return;
      }
      fail();
    } catch {
      fail();
    }
    setBusy(false);
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
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d۰-۹]/g, "").slice(0, 11))}
            onKeyDown={(e) => e.key === "Enter" && !busy && void sendCode()}
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
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^\d۰-۹]/g, "").slice(0, 4))}
            onKeyDown={(e) => e.key === "Enter" && !busy && void submit()}
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
          disabled={busy}
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
              setCode("");
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
