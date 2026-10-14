"use client";

// ── Pay modal v2 — real checkout + dual payment (guide §4.9 / §B5–B6) ──
// zarinpal → POST /api/checkout → redirect to the PSP (simulated #/pay-gateway
// in the sandbox, real StartPay at deploy). manual_transfer → instructions +
// receipt upload (≤5MB, jpeg/png/webp) → payment_under_review.
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { usePishnam, type CheckoutAck } from "@/lib/pishnam-store";
import { money } from "@/lib/fa";
import { navigate } from "@/lib/hash-route";
import { useToast } from "@/hooks/use-toast";
import { HeartSticker } from "../icons";
import { CountdownBadge, useCountdown } from "../manual-payment";

type Phase = "form" | "processing" | "manual" | "uploading" | "expired" | "error";

const ERROR_FA: Record<string, string> = {
  sold_out: "ایم عروسک همین الان تموم شد! یه دوست پشمالوی دیگه انتخاب کن.",
  rate_limited: "چند دقیقه صبر کن و دوباره امتحان کن.",
  bad_input: "اطلاعات سفارش کامل نیست؛ یه نگاه به فرم بنداز.",
  idempotency_key_reuse: "این سفارش قبلاً با اطلاعات دیگه‌ای ثبت شده؛ صفحه رو رفرش کن.",
  network: "اینترنت قطعه؛ اتصالت رو چک کن و دوباره بزن.",
  busy: "یه لحظه، داریم سفارش قبلی رو ثبت می‌کنیم…",
  file_too_large: "حجم عکس رسید بیشتر از ۵ مگابایته.",
  bad_file_type: "فقط عکس با فرمت JPG یا PNG یا WebP قبوله.",
  duplicate_receipt: "این رسید قبلاً ثبت شده! عکس جدیدی از رسید بفرست.",
  too_many_attempts: "سه بار رسید رد شده؛ این سفارش قابل پیگیری تلفنی است.",
  bad_order_status: "وضعیت سفارش اجازه‌ی آپلود رسید نمی‌ده.",
  payment_window_expired: "مهلت ۱۰ دقیقه‌ای رزرو تموم شد و موجودی آزاد شد.",
};

export function PayModal() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("form");
  const [ack, setAck] = useState<CheckoutAck | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const quote = usePishnam((s) => s.quote);
  const quoteStatus = usePishnam((s) => s.quoteStatus);
  const paymentMethod = usePishnam((s) => s.paymentMethod);
  const setPaymentMethod = usePishnam((s) => s.setPaymentMethod);
  const fetchQuote = usePishnam((s) => s.fetchQuote);
  const submitCheckout = usePishnam((s) => s.submitCheckout);
  const { toast } = useToast();

  // رزرو ۱۰ دقیقه‌ای — فاز انقضا در زمان رندر مشتق می‌شه (نه با effect)
  const expiresAt = ack?.payment?.expiresAt;
  const { expired } = useCountdown(expiresAt);
  const showExpired = phase === "manual" && expired;

  useEffect(() => {
    const onPay = () => {
      setPhase("form");
      setError("");
      setAck(null);
      setOpen(true);
      void fetchQuote();
    };
    window.addEventListener("pishnam:pay", onPay);
    return () => window.removeEventListener("pishnam:pay", onPay);
  }, [fetchQuote]);

  const total = quote?.total;

  const fail = (code: string) => {
    setError(ERROR_FA[code] ?? "یه مشکلی پیش اومد؛ دوباره امتحان کن.");
    setPhase("error");
  };

  // ۱) ثبت سفارش (idempotent) و ادامه بر اساس روش پرداخت
  const start = async () => {
    setPhase("processing");
    const r = await submitCheckout();
    if (!r.ok || !r.ack) {
      fail(r.error ?? "unknown");
      return;
    }
    setAck(r.ack);
    if (r.ack.payment.method === "zarinpal") {
      if (r.ack.payment.redirectUrl) {
        // real round trip: #/pay-gateway (sandbox) or Zarinpal StartPay (deploy)
        window.location.href = r.ack.payment.redirectUrl;
        return;
      }
      fail("psp_unavailable");
      return;
    }
    setPhase("manual");
  };

  // ۲) کارت‌به‌کارت: آپلود رسید
  const uploadReceipt = async (file: File) => {
    if (!ack) return;
    setPhase("uploading");
    const form = new FormData();
    form.set("file", file);
    form.set("code", ack.code);
    form.set("key", usePishnam.getState().pendingOrder?.key ?? "");
    try {
      const res = await fetch("/api/payment/manual/receipt", { method: "POST", body: form });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        if (body.error === "payment_window_expired" || body.error === "bad_order_status") {
          setPhase("expired");
          return;
        }
        fail(body.error ?? `http_${res.status}`);
        return;
      }
      setOpen(false);
      resetAndGo();
      toast({
        title: "رسیدت ثبت شد ✓",
        description: "تا ۱۲ ساعت بررسی می‌شه؛ نتیجه‌ش با پیامک میاد.",
      });
      navigate("success");
    } catch {
      fail("network");
    }
  };

  const resetAndGo = () => {
    usePishnam.getState().resetBuilder();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); }}>
      <DialogContent className="max-w-[420px] rounded-[28px] border-[1.5px] border-[#CFE6EF] bg-white p-6" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-lg font-black text-[#04202E]">
            <span>پرداخت سفارش</span>
            <span className="rounded-xl border border-[#CFE6EF] bg-[#F2FAFD] px-2 py-1 text-[11px] font-bold text-[#006387]">
              {paymentMethod === "zarinpal" ? "زرین‌پال" : "کارت به کارت"}
            </span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            پرداخت سفارش هدیه پیشنام
          </DialogDescription>
        </DialogHeader>

        {phase === "form" && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-2xl bg-[#E3F6FD] px-4 py-3">
              <span className="text-sm font-bold text-[#04202E]">مبلغ قابل پرداخت</span>
              <span className="text-base font-black text-[#04202E]">
                {total ? `${money(total)} تومان` : quoteStatus === "loading" ? "در حال محاسبه…" : "—"}
              </span>
            </div>

            {/* method switch — server quote refreshes per method */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setPaymentMethod("zarinpal");
                  void fetchQuote();
                }}
                className="rounded-2xl border-2 px-3 py-2.5 text-right transition-colors"
                style={{
                  borderColor: paymentMethod === "zarinpal" ? "#00ABE7" : "#DDEEF5",
                  background: paymentMethod === "zarinpal" ? "#F2FAFD" : "white",
                }}
              >
                <span className="block text-[13.5px] font-extrabold text-[#04202E]">پرداخت آنلاین</span>
                <span className="block text-[11px] font-medium text-[#4A6572]">زرین‌پال، همه‌ی کارت‌ها</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaymentMethod("manual_transfer");
                  void fetchQuote();
                }}
                className="rounded-2xl border-2 px-3 py-2.5 text-right transition-colors"
                style={{
                  borderColor: paymentMethod === "manual_transfer" ? "#00ABE7" : "#DDEEF5",
                  background: paymentMethod === "manual_transfer" ? "#F2FAFD" : "white",
                }}
              >
                <span className="block text-[13.5px] font-extrabold text-[#04202E]">کارت به کارت</span>
                <span className="block text-[11px] font-medium text-[#4A6572]">با آپلود رسید</span>
              </button>
            </div>

            <button
              type="button"
              disabled={!total || quoteStatus !== "ready"}
              onClick={() => void start()}
              className="mt-1 flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60"
            >
              {paymentMethod === "zarinpal" ? "رفتن به درگاه پرداخت" : "ثبت سفارش و نمایش کارت"}
              <HeartSticker size={20} fill="#04202E" stroke="none" />
            </button>
            <p className="text-center text-[11.5px] leading-[1.8] text-[#4A6572]">
              پرداخت روی یه درگاه آزمایشی انجام می‌شه؛ پولی جابه‌جا نمی‌شه.
            </p>
          </div>
        )}

        {phase === "processing" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <span className="h-12 w-12 animate-spin rounded-full border-4 border-[#CFE6EF] border-t-[#00ABE7]" />
            <span className="text-[15px] font-bold text-[#04202E]">داریم سفارشت رو ثبت می‌کنیم…</span>
            <span className="text-xs text-[#4A6572]">لطفاً صفحه رو نبند.</span>
          </div>
        )}

        {phase === "manual" && ack && !showExpired && (
          <div className="flex flex-col gap-3">
            {/* رزرو ۱۰ دقیقه‌ای */}
            <div className="flex items-center justify-between gap-2.5 rounded-2xl bg-[#E3F6FD] px-4 py-3">
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[12.5px] font-extrabold text-[#04202E]">سفارشت ۱۰ دقیقه رزرو شده</span>
                <span className="text-[10.5px] font-medium leading-[1.7] text-[#4A6572]">موجودی تا پایان تایمر کنار شماست؛ بعدش آزاد می‌شه</span>
              </div>
              <CountdownBadge expiresAt={expiresAt} />
            </div>
            <div className="rounded-2xl bg-[#FFF3C9] px-4 py-3 text-[12.5px] font-bold leading-[1.9] text-[#7A5C00]">
              مبلغ رو با کارت‌به‌کارت بریز و عکس رسید رو آپلود کن. کد سفارش رو تو توضیحات انتقال بنویس.
            </div>
            <ManualRow label="شماره کارت" value={ack.payment.instructions?.cardNumber ?? ""} copyable />
            <ManualRow label="شماره شبا" value={ack.payment.instructions?.sheba ?? ""} copyable />
            <ManualRow label="نام صاحب کارت" value={ack.payment.instructions?.cardName ?? ""} />
            <ManualRow label="مبلغ (تومان)" value={money(Number(ack.payment.instructions?.amount ?? ack.total))} />
            <ManualRow label="کد سفارش" value={ack.code} copyable />
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
              onClick={() => fileRef.current?.click()}
              className="flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95"
            >
              آپلود عکس رسید
              <HeartSticker size={20} fill="#04202E" stroke="none" />
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                resetAndGo();
                navigate("success");
              }}
              className="text-center text-[12px] font-bold text-[#006387] underline underline-offset-4"
            >
              رسید رو بعداً می‌فرستم — برو به صفحه‌ی سفارش
            </button>
          </div>
        )}

        {phase === "uploading" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <span className="h-12 w-12 animate-spin rounded-full border-4 border-[#CFE6EF] border-t-[#00ABE7]" />
            <span className="text-[15px] font-bold text-[#04202E]">داریم رسیدت رو ثبت می‌کنیم…</span>
          </div>
        )}

        {(phase === "expired" || showExpired) && (
          <div className="flex flex-col items-center gap-3 py-5">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE9F0] text-2xl">⌛</span>
            <span className="text-[14.5px] font-extrabold leading-[1.9] text-center text-[#B02A52]">
              مهلت ۱۰ دقیقه‌ای رزرو تموم شد؛ موجودی این سفارش آزاد شده.
            </span>
            <span className="text-[12px] font-medium leading-[1.85] text-center text-[#4A6572]">
              اگه واریز کردی، کد سفارش {ack?.code ? <b dir="ltr">{ack.code}</b> : null} رو بهمون پیام بده تا دستی بررسی کنیم.
            </span>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                resetAndGo();
                navigate("pick");
              }}
              className="mt-1 flex h-[48px] w-full items-center justify-center rounded-full bg-[#04202E] text-[15px] font-extrabold text-white"
            >
              ساختن سفارش تازه
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                resetAndGo();
              }}
              className="text-[12px] font-bold text-[#006387] underline underline-offset-4"
            >
              بستن
            </button>
          </div>
        )}

        {phase === "error" && (
          <div className="flex flex-col items-center gap-3 py-6">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE9F0] text-2xl">😟</span>
            <span className="text-[14.5px] font-bold leading-[1.9] text-center text-[#04202E]">{error}</span>
            <button
              type="button"
              onClick={() => setPhase("form")}
              className="flex h-[48px] w-full items-center justify-center rounded-full bg-[#04202E] text-[15px] font-extrabold text-white"
            >
              دوباره امتحان کن
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ManualRow({ label, value, copyable }: { label: string; value: string; copyable?: boolean }) {
  const { toast } = useToast();
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-[#DDEEF5] bg-[#F8FDFF] px-3 py-2.5">
      <span className="text-[11.5px] font-bold text-[#4A6572]">{label}</span>
      <span className="flex items-center gap-2">
        <span className="text-[13.5px] font-extrabold text-[#04202E]" dir="ltr">{value}</span>
        {copyable && value && (
          <button
            type="button"
            aria-label={`کپی ${label}`}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(value);
                toast({ title: "کپی شد ✓" });
              } catch {
                toast({ title: "کپی نشد — دستی انتخاب کن" });
              }
            }}
            className="rounded-lg bg-[#D6F1FB] px-2 py-1 text-[10.5px] font-extrabold text-[#006387]"
          >
            کپی
          </button>
        )}
      </span>
    </div>
  );
}
