"use client";

// ── Message ideas: tap-to-fill suggestion chips for the postcard step ──
// Shared by MobileCard (flow.tsx) and DesktopBuilder step 2 (builder.tsx).
import { useState } from "react";
import { OCCASION_IDEAS, OCCASIONS } from "@/lib/pishnam-data";
import { useToast } from "@/hooks/use-toast";

export function MessageIdeas({
  occ,
  onPick,
  desktop = false,
}: {
  occ: number;
  onPick: (text: string) => void;
  desktop?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const ideas = OCCASION_IDEAS[occ] ?? OCCASION_IDEAS[0];

  return (
    <div
      className={desktop ? "rounded-[22px] border border-[#CDEFFB] bg-[#F2FAFD] p-4" : "rounded-3xl border border-[#CDEFFB] bg-[#F2FAFD] p-3.5"}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 border-none bg-transparent p-0"
      >
        <span className={`flex items-center gap-1.5 font-extrabold text-[#04202E] ${desktop ? "text-[15px]" : "text-sm"}`}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00ABE7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
            <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />
          </svg>
          نمی‌دونی چی بنویسی؟ یه ایده بردار
        </span>
        <span
          aria-hidden
          className={`text-[#4A6572] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {open && (
        <div className={`pishnam-reveal mt-3 flex flex-col gap-2 ${desktop ? "" : ""}`}>
          <p className={`m-0 font-semibold text-[#4A6572] ${desktop ? "text-[12.5px]" : "text-[12px]"}`}>
            برای «{OCCASIONS[occ] ?? "همین‌طوری"}» این‌ها رو پیشنهاد می‌کنیم — بزنش، پیامت پر می‌شه:
          </p>
          {ideas.map((idea, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onPick(idea);
                toast({ title: "ایده اضافه شد ✨", description: "میتونی همون‌طور نگهش داری یا به سلیقه‌ت عوضش کنی." });
              }}
              className={`w-full rounded-[16px] border bg-white text-right font-medium leading-[2] text-[#1F3E4D] transition-all hover:border-[#00ABE7] hover:shadow-[0_2px_10px_rgba(0,171,231,0.15)] active:scale-[0.98] ${
                desktop ? "px-4 py-2.5 text-[13.5px]" : "px-3.5 py-2.5 text-[13px]"
              }`}
              style={{ borderColor: "#DDEEF5" }}
            >
              {idea}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
