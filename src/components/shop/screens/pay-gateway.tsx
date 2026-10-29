"use client";

// ── pay-gateway — the SANDBOX PSP (stands in for Zarinpal StartPay) ──
// The redirect from the pay modal lands here with ?authority=SIM…; pressing
// pay/cancel navigates to the REAL /api/payment/zarinpal/callback endpoint,
// which verifies against the DB amount, transitions the order and 302s back
// to #/success. At deploy this screen is never mounted (real StartPay used).
import { useEffect, useState } from "react";
import { usePishnam } from "@/lib/pishnam-store";
import { money } from "@/lib/fa";
import { Logo } from "../logo";
import { LockIcon } from "lucide-react";

export function PayGateway({ authority }: { authority: string }) {
  const pendingOrder = usePishnam((s) => s.pendingOrder);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const go = (status: "OK" | "NOK") => {
    setBusy(true);
    // full page navigation → API GET → 302 → #/success?code=…
    window.location.href = `/api/payment/zarinpal/callback?Authority=${encodeURIComponent(authority)}&Status=${status}`;
  };

  const code = pendingOrder?.code ?? "";
  const total = pendingOrder?.total ?? 0;

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#0E2A35] px-4 py-10 text-white md:justify-center">
      <div className="w-full max-w-[420px] rounded-[24px] bg-white p-7 text-[#04202E] shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between border-b border-[#E3F0F5] pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#04202E]">
              <LockIcon size={16} color="#00ABE7" />
            </span>
            <span className="text-[15px] font-black">درگاه پرداخت اینترنتی</span>
          </div>
          <span className="rounded-lg bg-[#F2FAFD] px-2 py-1 text-[11px] font-extrabold text-[#006387]">
            شبیه‌ساز زرین‌پال
          </span>
        </div>

        <div className="flex flex-col gap-3 pt-5">
          <div className="flex items-center justify-between rounded-2xl bg-[#E3F6FD] px-4 py-3">
            <span className="text-[13px] font-bold text-[#4A6572]">پذیرنده</span>
            <span className="text-[13.5px] font-extrabold">جعبه آبی — جعبه هدیه عروسک پولیشی</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-[#F8FDFF] px-4 py-3">
            <span className="text-[13px] font-bold text-[#4A6572]">مبلغ</span>
            <span className="text-[15px] font-black">{total ? `${money(total)} تومان` : "—"}</span>
          </div>
          {code && (
            <div className="flex items-center justify-between rounded-2xl bg-[#F8FDFF] px-4 py-3">
              <span className="text-[13px] font-bold text-[#4A6572]">کد سفارش</span>
              <span className="text-[13.5px] font-extrabold" dir="ltr">{code}</span>
            </div>
          )}
          <div className="flex items-center justify-between rounded-2xl bg-[#F8FDFF] px-4 py-3">
            <span className="text-[13px] font-bold text-[#4A6572]">شناسه تراکنش</span>
            <span className="max-w-[180px] truncate text-[12px] font-bold text-[#4A6572]" dir="ltr">
              {authority || "—"}
            </span>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#4A6572]">شماره کارت</span>
              <span className="flex h-11 items-center rounded-xl border border-[#DDEEF5] bg-white px-3 text-[13px] font-semibold" dir="ltr">
                ۶۰۳۷ ▪▪▪▪ ▪▪▪▪ ۴۵۶۷
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#4A6572]">رمز پویا</span>
              <span className="flex h-11 items-center rounded-xl border border-[#DDEEF5] bg-white px-3 text-[13px] font-semibold" dir="ltr">
                ▪▪▪▪▪▪
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={busy}
            onClick={() => go("OK")}
            className="mt-3 flex h-[52px] items-center justify-center rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60"
          >
            {busy ? "در حال انتقال…" : "پرداخت (شبیه‌سازی موفق)"}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => go("NOK")}
            className="flex h-[48px] items-center justify-center rounded-full border-2 border-[#DDEEF5] text-[14px] font-extrabold text-[#4A6572] transition-colors hover:border-[#F7C5D3] disabled:opacity-60"
          >
            انصراف از پرداخت
          </button>
          <p className="pt-1 text-center text-[11px] leading-[1.9] text-[#4A6572]">
            این صفحه فقط تو محیط آزمایشی نشون داده می‌شه؛ تو لانچ واقعی، کاربر مستقیم به
            درگاه زرین‌پال می‌ره و بعد از پرداخت با همین مسیر برمی‌گرده.
          </p>
        </div>
      </div>

      <div className="pt-6 opacity-40">
        <Logo size={26} />
      </div>
    </div>
  );
}
