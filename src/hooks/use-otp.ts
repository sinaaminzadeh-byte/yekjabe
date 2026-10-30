"use client";

// ── use-otp — THE shared OTP state machine (A-03: was 5 separate copies) ──
// One implementation, four consumers with distinct visual shells:
//   • screens/flow.tsx + screens/builder.tsx  → purpose "checkout_orderer"
//   • screens/verify.tsx                      → purpose "gift_recv"
//   • admin/admin-gate.tsx                    → purpose "login"
//   • screens/dashboards.tsx                  → purpose "login" (agent 39-a)
// CONTRACT (frozen — 39-a integrates dashboards.tsx against this signature):
//   request()   POST /api/auth/request {phone, purpose}
//               · validates 09xxxxxxxxx after FA→EN normalization
//               · 429 → err «کمی صبر کن و دوباره امتحان کن» + resendIn=retryAfter
//               · noGifts:true (gift_recv probe) → noGifts=true, returns false,
//                 NO error and NO SMS was spent
//               · success → resendIn=120 auto-ticking countdown + devCode capture
//   verify(n?)  POST /api/auth/verify {phone, code, purpose, name?}
//               · code normalized to 4 EN digits before posting
//               · success → onSuccess({user, admin}) then returns true
//               · error bodies (invalid_code/expired/rate_limited/…) → short
//                 Persian messages (wording reused from the original screens)
//   reset()     clears code/err/busy/devCode
// Timers live in one effect-owned interval (stops at 0, cleaned on unmount);
// every state change happens in handlers/effects — never during render.
import { useCallback, useEffect, useRef, useState } from "react";
import { digitsOnly } from "@/lib/shop/checkout-submit";

export type OtpPurpose = "login" | "checkout_orderer" | "gift_recv";

export interface OtpSuccess {
  user: { phone: string; name: string };
  admin: boolean;
}

/** default resend cooldown («ارسال دوباره تا …» label) — screens may override */
const DEFAULT_RESEND_SECONDS = 120;

export function useOtp(opts: {
  purpose: OtpPurpose;
  onSuccess?: (res: OtpSuccess) => void;
  /** visual-shell resend cooldown override (dashboards login = 30s) */
  resendSeconds?: number;
}): {
  phone: string;
  setPhone: (v: string) => void;
  code: string;
  setCode: (v: string) => void;
  devCode: string;
  busy: boolean;
  err: string;
  resendIn: number;
  noGifts: boolean;
  request: () => Promise<boolean>;
  verify: (name?: string) => Promise<boolean>;
  reset: () => void;
} {
  const [phone, setPhoneState] = useState("");
  const [code, setCodeState] = useState("");
  const [devCode, setDevCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [noGifts, setNoGifts] = useState(false);

  const resendSeconds = opts.resendSeconds ?? DEFAULT_RESEND_SECONDS;
  const resendRef = useRef(resendSeconds);
  useEffect(() => {
    resendRef.current = resendSeconds;
  });

  // latest opts without stale onSuccess closures (handlers always run after commit)
  const optsRef = useRef(opts);
  useEffect(() => {
    optsRef.current = opts;
  });

  /** FA/AR digits → EN, non-digits stripped — inputs stay clean for the API */
  const setPhone = useCallback((v: string) => setPhoneState(digitsOnly(v)), []);
  const setCode = useCallback((v: string) => setCodeState(digitsOnly(v).slice(0, 4)), []);

  // single auto-ticking countdown — interval exists only while it should run
  const ticking = resendIn > 0;
  useEffect(() => {
    if (!ticking) return;
    const t = setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [ticking]);

  const request = useCallback(async (): Promise<boolean> => {
    if (busy) return false;
    const p = digitsOnly(phone);
    if (!/^09\d{9}$/.test(p)) {
      setErr("شماره موبایل معتبر نیست");
      return false;
    }
    setErr("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: p, purpose: optsRef.current.purpose }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        devCode?: string;
        noGifts?: boolean;
        error?: string;
        details?: { retryAfter?: number };
      };
      if (res.status === 429 || body.error === "rate_limited") {
        setResendIn(body.details?.retryAfter ?? 60);
        setErr("کمی صبر کن و دوباره امتحان کن");
        return false;
      }
      if (!res.ok) {
        setErr("ارسال کد نشد؛ شماره رو چک کن و دوباره بزن.");
        return false;
      }
      // owner law (gift page): no package registered for this number →
      // the server sent NO SMS; the screen shows its friendly empty state
      if (body.noGifts) {
        setNoGifts(true);
        return false;
      }
      setNoGifts(false);
      setCodeState("");
      setDevCode(body.devCode ?? "");
      setResendIn(resendRef.current);
      return true;
    } catch {
      setErr("اینترنت قطعه؛ اتصالت رو چک کن.");
      return false;
    } finally {
      setBusy(false);
    }
  }, [busy, phone]);

  const verify = useCallback(
    async (name?: string): Promise<boolean> => {
      if (busy) return false;
      const p = digitsOnly(phone);
      const c = digitsOnly(code);
      if (!/^09\d{9}$/.test(p)) {
        setErr("شماره موبایل معتبر نیست");
        return false;
      }
      if (!/^\d{4}$/.test(c)) {
        setErr("کد ۴ رقمی پیامک‌شده رو کامل وارد کن.");
        return false;
      }
      setErr("");
      setBusy(true);
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: p,
            code: c,
            purpose: optsRef.current.purpose,
            ...(name ? { name } : {}),
          }),
        });
        const body = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          user?: { phone: string; name: string };
          admin?: boolean;
          error?: string;
        };
        if (!res.ok || !body.ok) {
          if (res.status === 429 || body.error === "rate_limited") setErr("تلاش‌هایت زیاد شد؛ کمی صبر کن");
          else if (body.error === "invalid_code") setErr("کد اشتباهه یا منقضی شده؛ دوباره چک کن.");
          else if (body.error === "expired") setErr("کد منقضی شده؛ دوباره بگیر");
          else setErr("تأیید نشد؛ چند لحظه بعد دوباره امتحان کن.");
          return false;
        }
        optsRef.current.onSuccess?.({
          user: { phone: body.user?.phone || p, name: body.user?.name ?? "" },
          admin: Boolean(body.admin),
        });
        return true;
      } catch {
        setErr("اینترنت قطعه؛ اتصالت رو چک کن.");
        return false;
      } finally {
        setBusy(false);
      }
    },
    [busy, phone, code],
  );

  const reset = useCallback(() => {
    setCodeState("");
    setErr("");
    setBusy(false);
    setDevCode("");
  }, []);

  return { phone, setPhone, code, setCode, devCode, busy, err, resendIn, noGifts, request, verify, reset };
}
