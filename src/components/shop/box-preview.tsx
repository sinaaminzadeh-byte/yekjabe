"use client";

// ── پیش‌نمایش پستی جعبه — «روی جعبه‌ت این‌جوری می‌شینه» ──
// Owner round 29: the mobile extras-step box preview moves to the TOP of the
// cart (step 3) and gains a desktop twin in the builder sidebar. The UI is
// pushed toward a real PARCEL look: kraft cardboard, packing tape, a post
// stamp, a shipping-label sticker for the gift number, fragile sticker and a
// barcode strip — everything still live from the store (number + charms).
import { usePishnam } from "@/lib/pishnam-store";
import { fa } from "@/lib/fa";
import { HeartSticker, PawSticker } from "./icons";

export function BoxPreview({ compact = false }: { compact?: boolean }) {
  const nextNo = usePishnam((s) => s.nextNo);
  const hearts = usePishnam((s) => s.hearts);
  const paws = usePishnam((s) => s.paws);
  const charmsEnabled = usePishnam((s) => s.charmsEnabled);

  // sticker layout: alternate h/p like the old preview, cap for tight spaces
  const all: ("h" | "p")[] = [];
  let hi = 0;
  let pi = 0;
  while (hi < hearts || pi < paws) {
    if (hi < hearts) {
      all.push("h");
      hi++;
    }
    if (pi < paws) {
      all.push("p");
      pi++;
    }
  }
  const cap = compact ? 12 : 26;
  const shown = all.slice(0, cap);
  const more = all.length - cap;

  return (
    <div
      className="relative overflow-hidden rounded-[22px] border-[2.5px] border-[#7A5B36] shadow-[0_10px_24px_-14px_rgba(74,52,24,0.55)]"
      style={{ background: "linear-gradient(180deg,#EBD9BC 0%,#E2C9A4 55%,#D9BE96 100%)" }}
      role="img"
      aria-label={`پیش‌نمایش جعبه‌ی پستی هدیه شماره ${fa(nextNo)}`}
    >
      {/* cardboard corrugation — two subtle horizontal folds */}
      <div className="pointer-events-none absolute inset-x-0 top-[38%] h-px bg-[#C9AE85]/70" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-[70%] h-px bg-[#C9AE85]/50" aria-hidden="true" />

      {/* packing tape across the top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[14px] opacity-80"
        style={{ background: "repeating-linear-gradient(90deg, rgba(255,255,255,.75) 0 26px, rgba(214,196,164,.75) 26px 52px)" }}
        aria-hidden="true"
      />

      {/* post stamp (top-left, rotated) */}
      <div className="absolute left-3 top-5 rotate-[-6deg] rounded-[6px] border-[2px] border-dashed border-[#7A5B36] bg-[#F6EEDD] px-2 py-1 text-center leading-none">
        <HeartSticker size={compact ? 14 : 18} fill="#F0426B" stroke="#7A5B36" strokeWidth={2.4} />
        <div className="mt-0.5 text-[7.5px] font-black text-[#7A5B36]">یک دوست</div>
      </div>

      {/* shipping label sticker — the gift number */}
      <div className="absolute right-3 top-4 rotate-[2deg] rounded-[10px] border-[2px] border-[#04202E] bg-white px-3 pb-1 pt-1.5 text-center shadow-[0_3px_0_rgba(4,32,46,0.25)]">
        <div className="text-[9.5px] font-bold text-[#4A6572]">هدیه‌ی شماره</div>
        <div className={`font-black leading-[1.1] text-[#04202E] ${compact ? "text-[20px]" : "text-[26px]"}`}>{fa(nextNo)}</div>
      </div>

      {/* fragile sticker */}
      <div className="absolute bottom-[52px] left-3 hidden rotate-[8deg] rounded-[8px] border-[1.5px] border-[#B02A52] bg-[#FFF3C9] px-1.5 py-0.5 text-[8px] font-black text-[#B02A52] sm:block">
        با مهربونی حمل شود ♥
      </div>

      {/* charms + barcode row */}
      <div className="relative flex min-h-[104px] flex-col justify-end px-3 pb-2.5 pt-[54px]">
        {charmsEnabled && all.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 pb-1.5">
            {shown.map((k, i) => (
              <span key={i} className="inline-flex" style={{ transform: `rotate(${((i * 37) % 28) - 14}deg)` }}>
                {k === "h" ? (
                  <HeartSticker size={compact ? 26 : 32} fill="#F0426B" stroke="#fff" strokeWidth={3.4} />
                ) : (
                  <PawSticker size={compact ? 26 : 32} />
                )}
              </span>
            ))}
            {more > 0 && (
              <span className="rounded-[12px] bg-[#04202E] px-2 py-1 text-[11.5px] font-extrabold text-white">+{fa(more)}</span>
            )}
          </div>
        )}
        {charmsEnabled && all.length === 0 && (
          <div className="pb-1.5 text-[10.5px] font-bold text-[#7A5B36]">
            قلب و پنجه‌ها رو از قدم ۲ انتخاب کن، همین‌جا روی جعبه می‌شینن
          </div>
        )}
        {/* barcode + routing line — the postal vibe */}
        <div className="flex items-end justify-between gap-2">
          <div className="flex items-end gap-[2px]" aria-hidden="true">
            {[3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1, 3].map((w, i) => (
              <span key={i} className="inline-block w-[2px] bg-[#3B2C17]/80" style={{ height: `${8 + w * 3}px` }} />
            ))}
          </div>
          <div className="text-[9px] font-black leading-[1.5] text-[#7A5B36]">پست پیشتاز یک دوست · یه بغل، تو یه جعبه</div>
        </div>
      </div>
    </div>
  );
}
