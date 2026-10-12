"use client";

// ── Success screen: mobile + desktop ──
import { Logo } from "../logo";
import { Plush } from "../plush";
import { HeartSticker, ForwardIcon } from "../icons";
import { navigate } from "@/lib/hash-route";
import { usePishnam } from "@/lib/pishnam-store";
import { fa, orderNo, money } from "@/lib/fa";
import { CHARM_PRICE, BOX_PRICE } from "@/lib/pishnam-data";
import { useEffect } from "react";

const STEP_BGS = ["#CDEFFB", "#FFE0EA", "#FFF3C9", "#E7E0FA"];

function useLastSentOrder() {
  const orders = usePishnam((s) => s.orders);
  return orders.find((o) => o.dir === "sent");
}

/* ═══════════════ MOBILE ═══════════════ */
export function MobileSuccess() {
  const order = useLastSentOrder();
  const selectOrder = usePishnam((s) => s.selectOrder);
  const no = order?.no ?? 101;
  const charmLine = order
    ? `با این سفارش ${fa(order.hearts)} قلب و ${fa(order.paws)} پنجه هم برای بچه‌های بی‌سرپرست و حیوونا ثبت شد. رسیدش تو دفتر مهربونی می‌مونه.`
    : "اینجا بعد از اولین سفارش، گزارش قلب و پنجه‌هات رو می‌بینی.";

  const steps = [
    { n: "۱", title: "پرداخت شد", sub: "همین حالا", done: true },
    { n: "۲", title: "بسته‌بندی", sub: "حدود ۲ روز کاری", done: false },
    { n: "۳", title: "تحویل پست", sub: "کد رهگیری رو بعداً برات می‌فرستیم", done: false },
    { n: "۴", title: "رسیدن به دوستت", sub: `با کارت QR و شماره‌ی ${fa(no)}`, done: false },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] md:hidden">
      <Confetti />
      <div className="relative overflow-hidden rounded-b-[36px] bg-[#00ABE7] px-6 pb-[30px] pt-[22px]">
        <div className="absolute -bottom-20 -left-[60px] h-[220px] w-[220px] rounded-full bg-[#66CDF1]" />
        <div className="relative flex items-center justify-between">
          <Logo size={32} />
          <span className="rounded-[14px] border-2 border-[#04202E] bg-white px-2.5 py-1 text-xs font-extrabold">
            شماره‌ی سفارش {orderNo(no)}
          </span>
        </div>
        <div className="relative flex flex-col items-center gap-3 pb-2 pt-[22px] text-center">
          <span className="flex h-[70px] w-[70px] items-center justify-center rounded-full border-[3px] border-[#04202E] bg-white">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7" />
            </svg>
          </span>
          <h1 className="m-0 text-[30px] font-black leading-[1.5]">سفارشت ثبت شد!</h1>
          <p className="m-0 text-[15px] font-semibold leading-[1.9]">
            هدیه‌ی شماره‌ی <b>{fa(no)}</b> داره آماده می‌شه.
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
      </div>

      <div className="mx-5 mt-4 flex items-center gap-3.5 rounded-[26px] bg-[#04202E] p-[18px] text-white">
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
  const order = useLastSentOrder();
  const selectOrder = usePishnam((s) => s.selectOrder);
  const no = order?.no ?? 101;
  const total = order ? order.total : BOX_PRICE + 8 * CHARM_PRICE;
  const steps = [
    { n: "۱", title: "پرداخت شد", sub: "همین حالا", done: true },
    { n: "۲", title: "بسته‌بندی", sub: "حدود ۲ روز کاری", done: false },
    { n: "۳", title: "تحویل پست", sub: "کد رهگیری رو بعداً برات می‌فرستیم", done: false },
    { n: "۴", title: "رسیدن به دوستت", sub: `با کارت QR و شماره‌ی ${fa(no)}`, done: false },
  ];

  return (
    <div className="hidden min-h-screen flex-col bg-[#F2FAFD] md:flex">
      <Confetti />
      <div className="relative overflow-hidden bg-[#00ABE7]">
        <div className="absolute -bottom-24 -left-16 h-[280px] w-[280px] rounded-full bg-[#66CDF1]" />
        <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-4 px-6 pb-14 pt-10 text-center">
          <Logo size={40} />
          <span className="rounded-[14px] border-2 border-[#04202E] bg-white px-3 py-1.5 text-sm font-extrabold">
            شماره‌ی سفارش {orderNo(no)}
          </span>
          <span className="flex h-[84px] w-[84px] items-center justify-center rounded-full border-[3px] border-[#04202E] bg-white">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7" />
            </svg>
          </span>
          <h1 className="m-0 text-[42px] font-black leading-[1.4]">سفارشت ثبت شد!</h1>
          <p className="m-0 max-w-[520px] text-[17px] font-semibold leading-[1.9]">
            هدیه‌ی شماره‌ی <b>{fa(no)}</b> داره آماده می‌شه؛ جعبه با استیکرهای قلب و پنجه، کارت
            پستال QR و یه عالمه مهربونی.
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-8 flex w-full max-w-[900px] flex-col gap-6 rounded-[30px] border border-[#DDEEF5] bg-white p-8 shadow-[0_10px_30px_rgba(4,32,46,0.08)] box-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-lg font-extrabold">مسیر هدیه تا دست دوستت</div>
          <div className="rounded-full bg-[#E3F6FD] px-4 py-1.5 text-sm font-bold text-[#006387]">
            مبلغ پرداخت‌شده: {money(total)} تومان
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="flex flex-col gap-3 rounded-[22px] p-4" style={{ background: i === 0 ? "#E3F6FD" : "#F8FDFF", border: "1px solid #DDEEF5" }}>
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
        <div className="flex flex-wrap items-center gap-5 rounded-[24px] bg-[#04202E] p-5 text-white">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white">
            <QrGlyph />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <span className="text-lg font-black">کارت پستالت آماده‌ست</span>
            <span className="text-[13.5px] font-medium leading-[1.9] text-[#D3EEF9]">
              رمزی که نوشتی همراه کارته. فقط دوستت می‌تونه باهاش پیامت رو ببینه. می‌تونی همین
              حالا نسخه‌ی نمایشی کارت رو باز کنی و ببینی گیرنده چه حسی داره.
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

// keep Plush import used (may be used in future gift preview)
void Plush;
