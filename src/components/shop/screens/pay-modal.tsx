"use client";

// ── Simulated bank gateway modal — listens for 'pishnam:pay' ──
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { usePishnam } from "@/lib/pishnam-store";
import { money } from "@/lib/fa";
import { BOX_PRICE, CHARM_PRICE } from "@/lib/pishnam-data";
import { navigate } from "@/lib/hash-route";
import { useToast } from "@/hooks/use-toast";
import { HeartSticker } from "../icons";

type Phase = "form" | "processing" | "done";

export function PayModal() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("form");
  const hearts = usePishnam((s) => s.hearts);
  const paws = usePishnam((s) => s.paws);
  const placeOrder = usePishnam((s) => s.placeOrder);
  const resetBuilder = usePishnam((s) => s.resetBuilder);
  const { toast } = useToast();
  const total = BOX_PRICE + (hearts + paws) * CHARM_PRICE;

  useEffect(() => {
    const onPay = () => {
      setPhase("form");
      setOpen(true);
    };
    window.addEventListener("pishnam:pay", onPay);
    return () => window.removeEventListener("pishnam:pay", onPay);
  }, []);

  const pay = () => {
    setPhase("processing");
    window.setTimeout(() => {
      placeOrder();
      setPhase("done");
      window.setTimeout(() => {
        setOpen(false);
        resetBuilder();
        navigate("success");
        toast({
          title: "پرداخت موفق بود 🎉",
          description: "سفارشت ثبت شد و مسیرش رو تو «هدیه‌هام» می‌بینی.",
        });
      }, 1400);
    }, 1800);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[400px] rounded-[28px] border-[1.5px] border-[#CFE6EF] bg-white p-6" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-lg font-black text-[#04202E]">
            <span>درگاه پرداخت امن</span>
            <span className="rounded-xl border border-[#CFE6EF] bg-[#F2FAFD] px-2 py-1 text-[11px] font-bold text-[#006387]">
              شبان‌پی
            </span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            پرداخت سفارش هدیه پیشتم
          </DialogDescription>
        </DialogHeader>

        {phase === "form" && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-2xl bg-[#E3F6FD] px-4 py-3">
              <span className="text-sm font-bold text-[#04202E]">مبلغ قابل پرداخت</span>
              <span className="text-base font-black text-[#04202E]">{money(total)} تومان</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <MockField label="شماره کارت" value="۶۲۱۹ ۸۶۱۰ ▪▪▪▪ ۴۵۶۷" />
              <MockField label="CVV2" value="▪▪▪" />
              <MockField label="تاریخ انقضا" value="۰۶/۰۸" />
              <MockField label="رمز پویا" value="▪▪▪▪▪▪" />
            </div>
            <button
              type="button"
              onClick={pay}
              className="mt-1 flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95"
            >
              پرداخت
              <HeartSticker size={20} fill="#04202E" stroke="none" />
            </button>
            <p className="text-center text-[11.5px] leading-[1.8] text-[#4A6572]">
              این یه درگاه نمایشیه؛ چیزی واقعاً پرداخت نمی‌شه.
            </p>
          </div>
        )}

        {phase === "processing" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <span className="h-12 w-12 animate-spin rounded-full border-4 border-[#CFE6EF] border-t-[#00ABE7]" />
            <span className="text-[15px] font-bold text-[#04202E]">در حال اتصال به بانک…</span>
            <span className="text-xs text-[#4A6572]">لطفاً صفحه رو نبند.</span>
          </div>
        )}

        {phase === "done" && (
          <div className="flex flex-col items-center gap-3 py-8">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#04202E] bg-[#00ABE7]">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
            </span>
            <span className="text-lg font-black text-[#04202E]">پرداخت شد!</span>
            <span className="text-sm text-[#4A6572]">داریم سفارشت رو ثبت می‌کنیم…</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function MockField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-bold text-[#4A6572]">{label}</span>
      <span className="flex h-10 items-center rounded-xl border border-[#CFE6EF] bg-[#F8FDFF] px-3 text-[13px] font-semibold text-[#04202E]">
        {value}
      </span>
    </div>
  );
}
