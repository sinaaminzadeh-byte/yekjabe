"use client";

// ── Success screen: mobile + desktop — ACK/poll per guide §4.7/§B4 ──
// Polls GET /api/checkout/{key}/status until the server confirms payment;
// shows honest per-state cards (paid / receipt-under-review / retry).
import { useEffect, useRef, useState } from "react";
import { Logo } from "../logo";
import { Plush } from "../plush";
import { HeartSticker, ForwardIcon } from "../icons";
import { navigate } from "@/lib/hash-route";
import { usePishnam } from "@/lib/pishnam-store";
import { fa, money } from "@/lib/fa";
import { DownloadGiftButton } from "@/components/shop/screens/track";
import { ManualPaymentPanel } from "../manual-payment";

const STEP_BGS = ["#CDEFFB", "#FFE0EA", "#FFF3C9", "#E7E0FA"];

type SuccessState = "loading" | "paid" | "under_review" | "awaiting" | "failed" | "cancelled" | "expired" | "none";

interface StatusPayload {
  code: string;
  status: string;
  total: number;
  paid: boolean;
  payment?: { method: string; status: string };
  paymentMethod?: string;
  expiresAt?: string;
}

function stateFromStatus(s: string): SuccessState {
  switch (s) {
    case "paid":
    case "preparing":
    case "shipped":
    case "delivered":
    case "refund_requested":
    case "refunded":
      return "paid";
    case "payment_under_review":
      return "under_review";
    case "failed":
      return "failed";
    case "cancelled":
      return "cancelled";
    case "expired":
      return "expired";
    default:
      return "awaiting";
  }
}

/** Polls the ACK endpoint every 3s (max ~90s) while the order is unpaid. */
function useOrderStatus(): { st: SuccessState; data: StatusPayload | null } {
  const pendingOrder = usePishnam((s) => s.pendingOrder);
  const setPendingStatus = usePishnam((s) => s.setPendingStatus);
  const [st, setSt] = useState<SuccessState>("loading");
  const [data, setData] = useState<StatusPayload | null>(null);
  const polls = useRef(0);

  useEffect(() => {
    if (!pendingOrder?.key) {
      setSt("none");
      return;
    }
    let alive = true;
    const tick = async () => {
      try {
        const res = await fetch(`/api/checkout/${pendingOrder.key}/status`, { cache: "no-store" });
        if (!res.ok) throw new Error("bad");
        const body = (await res.json()) as StatusPayload;
        if (!alive) return;
        setData(body);
        const next = stateFromStatus(body.status);
        setSt(next);
        setPendingStatus(body.status);
        if (next === "paid" || next === "cancelled" || next === "expired") return; // terminal
      } catch {
        if (alive && polls.current === 0) setSt("awaiting");
      }
      polls.current += 1;
      if (alive && polls.current < 30) window.setTimeout(tick, 3000);
    };
    void tick();
    return () => {
      alive = false;
    };
  }, [pendingOrder?.key, setPendingStatus]);

  return { st, data };
}

/** «بررسی مجدد پرداخت» — guide §4.9.6 (timeout path + re-arm). */
function useRecheck() {
  const pendingOrder = usePishnam((s) => s.pendingOrder);
  const [busy, setBusy] = useState(false);
  const recheck = async (): Promise<{ ok: boolean; paid?: boolean; redirectUrl?: string }> => {
    if (!pendingOrder?.code || !pendingOrder?.key) return { ok: false };
    setBusy(true);
    try {
      const res = await fetch("/api/payment/zarinpal/recheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: pendingOrder.code, key: pendingOrder.key }),
      });
      if (!res.ok) return { ok: false };
      const body = (await res.json()) as { paid?: boolean; payment?: { redirectUrl?: string }; status?: string };
      if (body.paid) return { ok: true, paid: true };
      if (body.payment?.redirectUrl) return { ok: true, redirectUrl: body.payment.redirectUrl };
      return { ok: true };
    } catch {
      return { ok: false };
    } finally {
      setBusy(false);
    }
  };
  return { recheck, busy };
}

function useOrderData() {
  const pendingOrder = usePishnam((s) => s.pendingOrder);
  const orders = usePishnam((s) => s.orders);
  const server = orders.find((o) => o.code && o.code === pendingOrder?.code);
  const fallback = orders.find((o) => o.dir === "sent");
  return { pendingOrder, order: server ?? fallback ?? null };
}

function stepsFor(status: string) {
  const step = (() => {
    if (["paid", "preparing", "shipped", "delivered", "refund_requested", "refunded"].includes(status)) {
      if (["shipped", "delivered"].includes(status)) return 3;
      if (status === "preparing") return 1;
      return 1;
    }
    return 0;
  })();
  return [
    { n: "۱", title: "پرداخت شد", sub: "همین حالا", done: step >= 1 },
    { n: "۲", title: "بسته‌بندی", sub: "حدود ۲ روز کاری", done: step >= 2 },
    { n: "۳", title: "تحویل پست", sub: "کد رهگیری رو بعداً برات می‌فرستیم", done: step >= 3 },
    { n: "۴", title: "رسیدن به دوستت", sub: "با کارت QR و رمز کارت", done: step >= 4 },
  ];
}

/* ═══════════════ status banners ═══════════════ */

function StatusBanner({ st, data, onRecheck, busy, pendingKey }: { st: SuccessState; data: StatusPayload | null; onRecheck: () => void; busy: boolean; pendingKey?: string }) {
  const code = data?.code;
  if (st === "paid") {
    return (
      <div className="flex items-center gap-3 rounded-[22px] bg-[#E3F6FD] px-4 py-3.5">
        <span className="text-xl">✅</span>
        <div className="text-[13px] font-bold leading-[1.9] text-[#04202E]">
          پرداخت تأیید شد{code ? <> — کد پیگیری: <b dir="ltr">{code}</b></> : null}. از این‌جا به بعد هر تغییری با پیامک خبرت می‌کنیم.
        </div>
      </div>
    );
  }
  if (st === "under_review") {
    return (
      <div className="flex items-center gap-3 rounded-[22px] bg-[#FFF3C9] px-4 py-3.5">
        <span className="text-xl">🧾</span>
        <div className="text-[13px] font-bold leading-[1.9] text-[#7A5C00]">
          رسیدت ثبت شد؛ تا <b>۱۲ ساعت</b> بررسی می‌شه. نتیجه‌ش رو با پیامک خبرت می‌کنیم.
        </div>
      </div>
    );
  }
  if (st === "failed" || st === "awaiting") {
    // کارت‌به‌کارت: پنل رزرو ۱۰ دقیقه‌ای + آپلود رسید (بعد از رفرش هم زنده می‌مونه)
    if (st === "awaiting" && data?.paymentMethod === "manual_transfer" && pendingKey && data?.code) {
      return (
        <ManualPaymentPanel
          code={data.code}
          idempotencyKey={pendingKey}
          total={data.total}
          expiresAt={data.expiresAt}
        />
      );
    }
    return (
      <div className="flex flex-col gap-2.5 rounded-[22px] bg-[#FFE9F0] px-4 py-3.5">
        <div className="flex items-center gap-3">
          <span className="text-xl">⏳</span>
          <div className="text-[13px] font-bold leading-[1.9] text-[#B02A52]">
            {st === "failed" ? "پرداخت ناموفق بود یا لغو شد." : "سفارش منتظر پرداخته."} می‌تونی دوباره درگاه رو امتحان کنی.
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={onRecheck}
            className="h-11 rounded-full bg-[#04202E] px-5 text-[13px] font-extrabold text-white disabled:opacity-60"
          >
            {busy ? "در حال بررسی…" : "بررسی مجدد پرداخت"}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => navigate("checkout")}
            className="h-11 rounded-full border-2 border-[#B02A52] px-5 text-[13px] font-extrabold text-[#B02A52]"
          >
            بازگشت به پرداخت
          </button>
        </div>
      </div>
    );
  }
  if (st === "cancelled" || st === "expired") {
    return (
      <div className="flex items-center gap-3 rounded-[22px] bg-[#FFE9F0] px-4 py-3.5">
        <span className="text-xl">😟</span>
        <div className="text-[13px] font-bold leading-[1.9] text-[#B02A52]">
          این سفارش {st === "cancelled" ? "لغو" : "منقضی"} شده. می‌تونی یه هدیه‌ی تازه بسازی.
        </div>
      </div>
    );
  }
  if (st === "loading") {
    return (
      <div className="flex items-center gap-3 rounded-[22px] bg-[#F8FDFF] px-4 py-3.5">
        <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-[#CFE6EF] border-t-[#00ABE7]" />
        <div className="text-[13px] font-bold text-[#4A6572]">داریم وضعیت پرداخت رو چک می‌کنیم…</div>
      </div>
    );
  }
  return null;
}

/* ═══════════════ MOBILE ═══════════════ */
export function MobileSuccess() {
  const { st, data } = useOrderStatus();
  const { recheck, busy } = useRecheck();
  const { pendingOrder, order } = useOrderData();
  const selectOrder = usePishnam((s) => s.selectOrder);
  const no = order?.no ?? 101;
  const code = data?.code ?? order?.code;
  const total = data?.total ?? order?.total ?? 0;
  const charmLine = order
    ? `با این سفارش ${fa(order.hearts)} قلب و ${fa(order.paws)} پنجه هم برای بچه‌های بی‌سرپرست و حیوونا ثبت شد. رسیدش تو دفتر مهربونی می‌مونه.`
    : "اینجا بعد از اولین سفارش، گزارش قلب و پنجه‌هات رو می‌بینی.";

  const steps = stepsFor(data?.status ?? (st === "paid" ? "paid" : "awaiting_payment"));

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] md:hidden">
      {st === "paid" && <Confetti />}
      <div className="relative overflow-hidden rounded-b-[36px] bg-[#00ABE7] px-6 pb-[30px] pt-[22px]">
        <div className="absolute -bottom-20 -left-[60px] h-[220px] w-[220px] rounded-full bg-[#66CDF1]" />
        <div className="relative flex items-center justify-between">
          <Logo size={32} />
          <span className="rounded-[14px] border-2 border-[#04202E] bg-white px-2.5 py-1 text-xs font-extrabold" dir="ltr">
            {code ?? `هدیه‌ی ${fa(no)}`}
          </span>
        </div>
        <div className="relative flex flex-col items-center gap-3 pb-2 pt-[22px] text-center">
          <span className="flex h-[70px] w-[70px] items-center justify-center rounded-full border-[3px] border-[#04202E] bg-white">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7" />
            </svg>
          </span>
          <h1 className="m-0 text-[30px] font-black leading-[1.5]">
            {st === "paid" ? "سفارشت ثبت شد!" : "سفارش تو صفحه‌ست"}
          </h1>
          <p className="m-0 text-[15px] font-semibold leading-[1.9]">
            {st === "paid" ? (
              <>هدیه‌ی <b>{fa(no)}</b> داره آماده می‌شه.</>
            ) : st === "under_review" ? (
              "رسیدت رسید؛ تا ۱۲ ساعت بررسی می‌شه."
            ) : (
              "وقتی پرداخت تأیید بشه، مسیر هدیه‌ت این‌جا فعال می‌شه."
            )}
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-5 -mt-[18px] flex flex-col gap-3.5 rounded-[26px] border border-[#DDEEF5] bg-white p-[18px] shadow-[0_8px_22px_rgba(4,32,46,0.07)]">
        <div className="text-[15px] font-extrabold">مسیر هدیه تا دست دوستت</div>
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <span
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-[#04202E] text-[13px] font-black"
                style={{ background: s.done ? "#00ABE7" : STEP_BGS[i] }}
              >
                {s.done ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
                ) : (
                  s.n
                )}
              </span>
              {i < steps.length - 1 && <span className="h-[22px] w-0.5 bg-[#CFE6EF]" />}
            </div>
            <div className="flex flex-col gap-0.5 pt-[3px]">
              <span className="text-[14.5px] font-extrabold">{s.title}</span>
              <span className="text-[12.5px] font-medium text-[#4A6572]">{s.sub}</span>
            </div>
          </div>
        ))}
        <StatusBanner st={st} data={data} pendingKey={pendingOrder?.key} onRecheck={() => void recheck().then((r) => { if (r.redirectUrl) window.location.href = r.redirectUrl; })} busy={busy} />
      </div>

      <div className="mx-5 mt-4 flex items-center gap-3 rounded-[22px] bg-[#04202E] p-[18px] text-white">
        {order && (
          <div
            data-giftcard-plush
            className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-2xl bg-white"
          >
            <Plush kind={order.kind} size={52} />
          </div>
        )}
        <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-2xl bg-white">
          <QrGlyph />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-base font-black">کارت پستالت آماده‌ست</span>
          <span className="text-[12.5px] font-medium leading-[1.85] text-[#D3EEF9]">
            رمزی که نوشتی همراه کارته. فقط دوستت می‌تونه باهاش پیامت رو ببینه.
          </span>
        </div>
      </div>

      <div className="mx-5 mt-4 flex items-center gap-3 rounded-[22px] border-[1.5px] border-[#F7C5D3] bg-[#FFE9F0] px-4 py-3.5">
        <HeartSticker size={30} fill="#F0426B" stroke="#04202E" strokeWidth={2.4} />
        <div className="text-[13px] font-semibold leading-[1.9]">{charmLine}</div>
      </div>
      {total > 0 && (
        <div className="mx-5 mt-3 flex items-center justify-between rounded-[22px] bg-white px-4 py-3">
          <span className="text-[13px] font-bold text-[#4A6572]">مبلغ سفارش</span>
          <span className="text-[14px] font-black">{money(total)} تومان</span>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2.5 px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-4">
        <button
          type="button"
          onClick={() => {
            if (order) selectOrder(order.id);
            navigate("track");
          }}
          className="flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-base font-extrabold text-[#04202E] transition-transform active:scale-95"
        >
          رهگیری سفارش
          <ForwardIcon size={16} />
        </button>
        <button
          type="button"
          onClick={() => navigate("my-gifts")}
          className="flex h-[54px] items-center justify-center rounded-full bg-[#04202E] text-base font-extrabold text-white transition-transform active:scale-95"
        >
          هدیه‌هام رو ببین
        </button>
        {order && <DownloadGiftButton o={order} />}
        <button
          type="button"
          onClick={() => navigate("home")}
          className="box-border flex h-[50px] items-center justify-center rounded-full border-2 border-[#04202E] text-[15px] font-extrabold text-[#04202E] transition-transform active:scale-95"
        >
          برگرد به خانه
        </button>
      </div>
    </div>
  );
}

/* ═══════════════ DESKTOP ═══════════════ */
export function DesktopSuccess() {
  const { st, data } = useOrderStatus();
  const { recheck, busy } = useRecheck();
  const { pendingOrder, order } = useOrderData();
  const selectOrder = usePishnam((s) => s.selectOrder);
  const no = order?.no ?? 101;
  const code = data?.code ?? order?.code;
  const total = data?.total ?? order?.total ?? 0;
  const steps = stepsFor(data?.status ?? (st === "paid" ? "paid" : "awaiting_payment"));

  return (
    <div className="hidden min-h-screen flex-col bg-[#F2FAFD] md:flex">
      {st === "paid" && <Confetti />}
      <div className="relative overflow-hidden bg-[#00ABE7]">
        <div className="absolute -bottom-24 -left-16 h-[280px] w-[280px] rounded-full bg-[#66CDF1]" />
        <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-4 px-6 pb-14 pt-10 text-center">
          <Logo size={40} />
          <span className="rounded-[14px] border-2 border-[#04202E] bg-white px-3 py-1.5 text-sm font-extrabold" dir="ltr">
            {code ?? `هدیه‌ی ${fa(no)}`}
          </span>
          <span className="flex h-[84px] w-[84px] items-center justify-center rounded-full border-[3px] border-[#04202E] bg-white">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7" />
            </svg>
          </span>
          <h1 className="m-0 text-[42px] font-black leading-[1.4]">
            {st === "paid" ? "سفارشت ثبت شد!" : "سفارش تو صفحه‌ست"}
          </h1>
          <p className="m-0 max-w-[520px] text-[17px] font-semibold leading-[1.9]">
            {st === "paid" ? (
              <>هدیه‌ی <b>{fa(no)}</b> داره آماده می‌شه؛ جعبه با استیکرهای قلب و پنجه، کارت پستال QR و یه عالمه مهربونی.</>
            ) : st === "under_review" ? (
              "رسیدت رسید و تا ۱۲ ساعت بررسی می‌شه؛ نتیجه با پیامک میاد."
            ) : (
              "وقتی پرداخت تأیید بشه مسیر هدیه‌ت کامل می‌شه."
            )}
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-8 flex w-full max-w-[900px] flex-col gap-6 rounded-[30px] border border-[#DDEEF5] bg-white p-8 shadow-[0_10px_30px_rgba(4,32,46,0.08)] box-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-lg font-extrabold">مسیر هدیه تا دست دوستت</div>
          {total > 0 && (
            <div className="rounded-full bg-[#E3F6FD] px-4 py-1.5 text-sm font-bold text-[#006387]">
              مبلغ سفارش: {money(total)} تومان
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="flex flex-col gap-3 rounded-[22px] p-4" style={{ background: s.done ? "#E3F6FD" : "#F8FDFF", border: "1px solid #DDEEF5" }}>
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#04202E] text-sm font-black"
                style={{ background: s.done ? "#00ABE7" : STEP_BGS[i] }}
              >
                {s.done ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
                ) : (
                  s.n
                )}
              </span>
              <span className="text-[15.5px] font-extrabold">{s.title}</span>
              <span className="text-[12.5px] font-medium leading-[1.8] text-[#4A6572]">{s.sub}</span>
            </div>
          ))}
        </div>
        <StatusBanner st={st} data={data} pendingKey={pendingOrder?.key} onRecheck={() => void recheck().then((r) => { if (r.redirectUrl) window.location.href = r.redirectUrl; })} busy={busy} />
        <div className="flex flex-wrap items-center gap-5 rounded-[24px] bg-[#04202E] p-5 text-white">
          {order && (
            <div
              data-giftcard-plush
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white"
            >
              <Plush kind={order.kind} size={80} />
            </div>
          )}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white">
            <QrGlyph />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <span className="text-lg font-black">کارت پستالت آماده‌ست</span>
            <span className="text-[13.5px] font-medium leading-[1.9] text-[#D3EEF9]">
              رمزی که نوشتی همراه کارته. فقط دوستت می‌تونه باهاش پیامت رو ببینه.
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate("gift")}
            className="flex h-12 items-center rounded-full bg-[#00ABE7] px-6 text-[15px] font-extrabold text-[#04202E]"
          >
            دیدن تجربه‌ی گیرنده
          </button>
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="box-border flex h-[52px] items-center rounded-full border-2 border-[#04202E] px-6 text-[15px] font-extrabold text-[#04202E] transition-colors hover:bg-[#04202E] hover:text-white"
          >
            برگرد به خانه
          </button>
          {order && <DownloadGiftButton o={order} dark />}
          <button
            type="button"
            onClick={() => navigate("my-gifts")}
            className="flex h-[52px] items-center rounded-full bg-[#04202E] px-7 text-base font-extrabold text-white transition-transform hover:scale-[1.03]"
          >
            هدیه‌هام رو ببین
          </button>
          <button
            type="button"
            onClick={() => {
              if (order) selectOrder(order.id);
              navigate("track");
            }}
            className="flex h-[52px] items-center gap-2 rounded-full bg-[#00ABE7] px-7 text-base font-extrabold text-[#04202E] transition-transform hover:scale-[1.03]"
          >
            رهگیری سفارش
            <ForwardIcon size={16} />
          </button>
        </div>
      </div>
      <div className="pb-10" />
    </div>
  );
}

export function QrGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 25 25" className={className} width="66" height="66" aria-hidden="true">
      <g fill="#04202E">
        <path fillRule="evenodd" d="M0 0h7v7H0zM1 1v5h5V1z" />
        <rect x="2" y="2" width="3" height="3" />
        <path fillRule="evenodd" transform="translate(18 0)" d="M0 0h7v7H0zM1 1v5h5V1z" />
        <rect x="20" y="2" width="3" height="3" />
        <path fillRule="evenodd" transform="translate(0 18)" d="M0 0h7v7H0zM1 1v5h5V1z" />
        <rect x="2" y="20" width="3" height="3" />
        <rect x="9" y="0" width="2" height="2" />
        <rect x="12" y="2" width="2" height="2" />
        <rect x="9" y="5" width="3" height="2" />
        <rect x="14" y="6" width="2" height="2" />
        <rect x="0" y="9" width="2" height="2" />
        <rect x="4" y="10" width="3" height="2" />
        <rect x="9" y="9" width="2" height="2" />
        <rect x="13" y="10" width="3" height="3" />
        <rect x="18" y="9" width="2" height="2" />
        <rect x="22" y="11" width="3" height="2" />
        <rect x="2" y="13" width="2" height="2" />
        <rect x="7" y="14" width="2" height="3" />
        <rect x="11" y="14" width="2" height="2" />
        <rect x="16" y="15" width="3" height="2" />
        <rect x="21" y="15" width="2" height="2" />
        <rect x="9" y="18" width="3" height="2" />
        <rect x="14" y="19" width="2" height="3" />
        <rect x="18" y="20" width="2" height="2" />
        <rect x="22" y="21" width="3" height="2" />
        <rect x="10" y="22" width="2" height="3" />
      </g>
    </svg>
  );
}

function Confetti() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {Array.from({ length: 26 }).map((_, i) => (
        <span
          key={i}
          className="pishnam-confetti absolute block"
          style={{
            left: `${(i * 37) % 100}%`,
            background: ["#F0426B", "#00ABE7", "#FFF3C9", "#66CDF1", "#FFE0EA"][i % 5],
            animationDelay: `${(i % 10) * 0.22}s`,
            width: i % 3 === 0 ? 10 : 7,
            height: i % 3 === 0 ? 10 : 12,
            borderRadius: i % 4 === 0 ? "50%" : 3,
          }}
        />
      ))}
    </div>
  );
}
