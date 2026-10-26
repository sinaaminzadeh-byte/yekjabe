"use client";

// ── /gift — receiver landing (owner round 29) ──
// The old password-lock experience is retired by the owner's new law: the
// buyer never sets a card password anymore, so there is nothing to type here.
// ONE gate remains — phone verification on /verify (the printed QR's target).
// Old shared links / old SMS texts pointing at /gift land on this friendly
// bridge and are walked to the display page. (Legacy /api/gifts/{code}/open
// stays server-side for old data, but no UI offers it anymore.)
import { useEffect } from "react";
import { Logo } from "../logo";
import { Plush } from "../plush";
import { ForwardIcon, HeartSticker } from "../icons";
import { navigate } from "@/lib/hash-route";
import { usePishnam } from "@/lib/pishnam-store";
import { fa } from "@/lib/fa";

export function GiftExperience() {
  const user = usePishnam((s) => s.user);
  const receivedGifts = usePishnam((s) => s.receivedGifts);
  const receivedStatus = usePishnam((s) => s.receivedStatus);
  const fetchReceived = usePishnam((s) => s.fetchReceived);

  useEffect(() => {
    if (receivedStatus === "idle") void fetchReceived();
  }, [receivedStatus, fetchReceived]);

  const viewable = receivedGifts.length > 0 ? receivedGifts[0] : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#F2FAFD] px-5 py-10 text-center">
      <div className="pishnam-glow">
        <Logo size={60} />
      </div>

      <div className="relative">
        <span className="pishnam-pop-in flex">
          <Plush kind="panda" size={170} className="pishnam-float" />
        </span>
        <span className="absolute -left-4 top-2 pishnam-float" style={{ animationDelay: "-1.4s" }}>
          <HeartSticker size={30} fill="#fff" stroke="#04202E" strokeWidth={2.6} />
        </span>
      </div>

      <h1 className="m-0 max-w-md text-[26px] font-black leading-[1.5] text-[#04202E]">
        پیام هدیه‌ات با شماره‌ی خودت باز می‌شه!
      </h1>
      <p className="m-0 max-w-md text-[14.5px] font-medium leading-[2] text-[#1F3E4D]">
        دیگه رمز کارت وجود نداره — فقط کافیه شماره موبایلت رو تأیید کنی. اگه بسته‌ای به اسمت
        ثبت شده باشه، یه کد ۴ رقمی همین لحظه برات پیامک می‌شه و پیام‌هات باز می‌شن.
      </p>

      {user && viewable ? (
        <button
          type="button"
          onClick={() => navigate("gift-view", { code: viewable.code })}
          className="mt-2 flex h-[56px] items-center gap-2 rounded-full bg-[#00ABE7] px-8 text-base font-extrabold text-[#04202E] transition-transform active:scale-95"
        >
          دیدن پیام هدیه‌ی شماره {fa(viewable.no)}
          <ForwardIcon />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => navigate("verify")}
          className="mt-2 flex h-[56px] items-center gap-2 rounded-full bg-[#00ABE7] px-8 text-base font-extrabold text-[#04202E] transition-transform active:scale-95"
        >
          تأیید شماره و دیدن پیام‌ها
          <ForwardIcon />
        </button>
      )}

      <button
        type="button"
        onClick={() => navigate("home")}
        className="text-[12.5px] font-bold text-[#006387] underline underline-offset-4"
      >
        رفتن به فروشگاه
      </button>
    </div>
  );
}
