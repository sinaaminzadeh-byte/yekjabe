"use client";

// ── Manual (card-to-card) payment panel — shared by pay-modal & success page ──
// The order reserves stock for 10 minutes (رزرو ۱۰ دقیقه‌ای): a live countdown,
// copyable card number + sheba, receipt upload, and an honest expired state
// (stock goes back to the shelf automatically — server-side lazy + cron sweep).
import { useCallback, useEffect, useRef, useState } from "react";
import { usePishnam } from "@/lib/pishnam-store";
import { money, fa } from "@/lib/fa";
import { navigate } from "@/lib/hash-route";
import { useToast } from "@/hooks/use-toast";
import { HeartSticker } from "./icons";

const ERROR_FA: Record<string, string> = {
  payment_window_expired: "مهلت ۱۰ دقیقه‌ای رزرو تموم شد و موجودی آزاد شد.",
  bad_order_status: "وضعیت سفارش اجازه‌ی آپلود رسید نمی‌ده.",
  too_many_attempts: "سه بار رسید رد شده؛ این سفارش قابل پیگیری تلفنی است.",
  duplicate_receipt: "این رسید قبلاً ثبت شده! عکس جدیدی از رسید بفرست.",
  file_too_large: "حجم عکس رسید بیشتر از ۵ مگابایته.",
  bad_file_type: "فقط عکس با فرمت JPG یا PNG یا WebP قبوله.",
  rate_limited: "چند دقیقه صبر کن و دوباره امتحان کن.",
  network: "اینترنت قطعه؛ اتصالت رو چک کن و دوباره بزن.",
};

/** Live seconds-left for the reservation window; ticks every second. */
export function useCountdown(expiresAt?: string): { left: number; expired: boolean } {
  const end = expiresAt ? new Date(expiresAt).getTime() : 0;
  const calc = useCallback(() => (end ? Math.max(0, Math.ceil((end - Date.now()) / 1000)) : 0), [end]);
  const [left, setLeft] = useState(calc);
  const expired = end > 0 && left <= 0;
  useEffect(() => {
    if (!end) return;
    // re-sync on prop change + tick every second (async callbacks keep lint happy)
    const sync = requestAnimationFrame(() => setLeft(calc()));
    const t = setInterval(() => setLeft(calc()), 1000);
    return () => {
      cancelAnimationFrame(sync);
      clearInterval(t);
    };
  }, [end, calc]);
  return { left, expired };
}

export function fmtMmSs(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return fa(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
}

/** The mm:ss badge — calm blue → amber under 3min → pulsing red under 1min. */
export function CountdownBadge({ expiresAt, size = "md" }: { expiresAt?: string; size?: "md" | "lg" }) {
  const { left, expired } = useCountdown(expiresAt);
  const urgent = left > 0 && left <= 60;
  const warn = left > 60 && left <= 180;
  const tone = expired ? "#B02A52" : urgent ? "#B02A52" : warn ? "#8A6D1F" : "#006387";
  const bg = expired ? "#FFE9F0" : urgent ? "#FFE9F0" : warn ? "#FFF3C9" : "#E3F6FD";
  return (
    <span
      role="timer"
      aria-label={`زمان باقی‌مانده ${fmtMmSs(left)}`}
      dir="ltr"
      className={`inline-flex items-center justify-center rounded-2xl font-black tabular-nums ${size === "lg" ? "h-[52px] min-w-[104px] px-4 text-[24px]" : "h-9 min-w-[76px] px-3 text-[15px]"} ${urgent ? "pishnam-timer-pulse" : ""}`}
      style={{ background: bg, color: tone }}
    >
      {expired ? "۰۰:۰۰" : fmtMmSs(left)}
    </span>
  );
}

async function copyText(v: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(v);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = v;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

function CopyRow({ label, value, ltr = true }: { label: string; value: string; ltr?: boolean }) {
  const { toast } = useToast();
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-[#DDEEF5] bg-[#F8FDFF] px-3 py-2.5">
      <span className="shrink-0 text-[11.5px] font-bold text-[#4A6572]">{label}</span>
      <span className="flex min-w-0 items-center gap-2">
        <span className="truncate text-[13.5px] font-extrabold text-[#04202E]" dir={ltr ? "ltr" : "rtl"}>{value}</span>
        <button
          type="button"
          aria-label={`کپی ${label}`}
          onClick={async () => {
            const ok = await copyText(value);
            toast(ok ? { title: "کپی شد ✓" } : { title: "کپی نشد — دستی انتخاب کن" });
          }}
          className="shrink-0 rounded-lg bg-[#D6F1FB] px-2 py-1 text-[10.5px] font-extrabold text-[#006387] transition-colors hover:bg-[#B9E8F8]"
        >
          کپی
        </button>
      </span>
    </div>
  );
}

/* ═══════════ the full panel (success screen) ═══════════ */

type PanelPhase = "pay" | "uploading" | "review" | "expired" | "error";

export function ManualPaymentPanel({
  code,
  idempotencyKey,
  total,
  expiresAt,
  onUploaded,
}: {
  code: string;
  idempotencyKey: string;
  total: number;
  expiresAt?: string;
  onUploaded?: () => void;
}) {
  const { expired } = useCountdown(expiresAt);
  const [phase, setPhase] = useState<PanelPhase>("pay");
  const [error, setError] = useState("");
  const [instructions, setInstructions] = useState<{ cardNumber: string; sheba: string; cardName: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const setOrderStatusByCode = usePishnam((s) => s.setOrderStatusByCode);
  // timer ran out while watching → derive the expired view (no effect needed)
  const view: PanelPhase = phase === "pay" && expired ? "expired" : phase;

  // card instructions — tiny public endpoint, so the panel survives reloads
  useEffect(() => {
    if (phase !== "pay") return;
    fetch("/api/payment/manual/instructions", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j: { payment?: { instructions?: { cardNumber: string; sheba: string; cardName: string } } }) => {
        if (j.payment?.instructions) setInstructions(j.payment.instructions);
      })
      .catch(() => {});
  }, [phase]);

  const upload = async (file: File) => {
    setPhase("uploading");
    const form = new FormData();
    form.set("file", file);
    form.set("code", code);
    form.set("key", idempotencyKey);
    try {
      const res = await fetch("/api/payment/manual/receipt", { method: "POST", body: form });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        if (body.error === "payment_window_expired" || body.error === "bad_order_status") {
          setPhase("expired");
          return;
        }
        setError(ERROR_FA[body.error ?? ""] ?? "یه مشکلی پیش اومد؛ دوباره امتحان کن.");
        setPhase("error");
        return;
      }
      // code-scoped flip: the panel may be rendering an order that is NOT the
      // globally-pending one (dashboard/track rebuild it from bootstrap)
      setOrderStatusByCode(code, "payment_under_review");
      setPhase("review");
      toast({ title: "رسیدت ثبت شد ✓", description: "تا ۱۲ ساعت بررسی می‌شه؛ نتیجه‌ش با پیامک میاد." });
      onUploaded?.();
    } catch {
      setError(ERROR_FA.network);
      setPhase("error");
    }
  };

  if (view === "review") {
    return (
      <div className="flex items-center gap-3 rounded-[22px] bg-[#FFF3C9] px-4 py-3.5">
        <span className="text-xl">🧾</span>
        <div className="text-[13px] font-bold leading-[1.9] text-[#7A5C00]">
          رسیدت ثبت شد و سفارش تو صف بررسیه؛ تا <b>۱۲ ساعت</b> نتیجه رو با پیامک خبرت می‌کنیم.
        </div>
      </div>
    );
  }

  if (view === "expired") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[22px] bg-[#FFE9F0] px-4 py-5 text-center">
        <span className="text-2xl">⌛</span>
        <div className="text-[13.5px] font-extrabold leading-[1.9] text-[#B02A52]">
          مهلت ۱۰ دقیقه‌ای این سفارش تموم شد و موجودی‌ش آزاد شده.
        </div>
        <div className="text-[12px] font-medium leading-[1.85] text-[#B02A52]">
          اگه پول رو واریز کردی، با تماس یا پیامک بهمون کد سفارش رو بگو تا دستی بررسی کنیم.
        </div>
        <button
          type="button"
          onClick={() => navigate("pick")}
          className="mt-1 flex h-11 items-center rounded-full bg-[#04202E] px-5 text-[13px] font-extrabold text-white"
        >
          ساختن سفارش تازه
        </button>
      </div>
    );
  }

  if (view === "error") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[22px] bg-[#FFE9F0] px-4 py-5 text-center">
        <span className="text-2xl">😟</span>
        <span className="text-[13.5px] font-bold leading-[1.9] text-[#B02A52]">{error}</span>
        <button
          type="button"
          onClick={() => setPhase("pay")}
          className="flex h-11 items-center rounded-full bg-[#04202E] px-5 text-[13px] font-extrabold text-white"
        >
          دوباره امتحان کن
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* reservation banner */}
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#E3F6FD] px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[12.5px] font-extrabold text-[#04202E]">این سفارش تا پایان تایمر برای شما رزرو شده</span>
          <span className="text-[11px] font-medium leading-[1.7] text-[#4A6572]">
            تا {fa(10)} دقیقه فرصت داری واریز کنی و رسید رو آپلود کنی
          </span>
        </div>
        <CountdownBadge expiresAt={expiresAt} size="lg" />
      </div>

      {/* card info — big, grouped, copyable */}
      {instructions ? (
        <div className="flex flex-col gap-2.5 rounded-[20px] border-[1.5px] border-[#B9E8F8] bg-white p-3.5">
          <div className="flex items-center justify-between rounded-xl bg-[#04202E] px-3.5 py-3" dir="ltr">
            <span className="text-[17px] font-black tracking-[0.14em] text-white">
              {instructions.cardNumber || "----"}
            </span>
            <button
              type="button"
              aria-label="کپی شماره کارت"
              onClick={async () => {
                const ok = await copyText((instructions.cardNumber ?? "").replace(/-/g, ""));
                toast(ok ? { title: "شماره کارت کپی شد ✓" } : { title: "کپی نشد — دستی انتخاب کن" });
              }}
              className="rounded-lg bg-[#00ABE7] px-2.5 py-1 text-[11px] font-extrabold text-[#04202E]"
            >
              کپی
            </button>
          </div>
          <CopyRow label="نام صاحب کارت" value={instructions.cardName ?? ""} ltr={false} />
          <CopyRow label="مبلغ (تومان)" value={money(total)} ltr={false} />
          <CopyRow label="کد سفارش (تو بدهگاه بنویس)" value={code} />
        </div>
      ) : null}

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void upload(f);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        disabled={view === "uploading"}
        onClick={() => fileRef.current?.click()}
        className="flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60"
      >
        {view === "uploading" ? "داریم رسیدت رو ثبت می‌کنیم…" : "آپلود عکس رسید"}
        {view !== "uploading" && <HeartSticker size={20} fill="#04202E" stroke="none" />}
      </button>
      <p className="text-center text-[11px] font-medium leading-[1.8] text-[#4A6572]">
        رسید واضح بگیر؛ مبلغ و ساعت واریز معلوم باشه. تو توضیحات انتقال کد سفارش رو بنویس.
      </p>
    </div>
  );
}
