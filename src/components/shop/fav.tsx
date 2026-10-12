"use client";

// ── Favorite heart toggle (پشمالوی محبوب) — shared by home + pick screens ──
import { useState } from "react";
import { usePishnam, useIsFavorite } from "@/lib/pishnam-store";
import { PLUSH_MAP, type PlushKind } from "@/lib/pishnam-data";
import { HeartSticker } from "@/components/shop/icons";
import { Plush } from "@/components/shop/plush";
import { navigate } from "@/lib/hash-route";
import { fa } from "@/lib/fa";

export function FavHeart({
  kind,
  name,
  size = 26,
  box = 38,
  className = "",
}: {
  kind: PlushKind;
  name: string;
  size?: number;
  box?: number;
  className?: string;
}) {
  const fav = useIsFavorite(kind);
  const toggleFavorite = usePishnam((s) => s.toggleFavorite);
  const [pop, setPop] = useState(0);

  return (
    <button
      type="button"
      aria-pressed={fav}
      aria-label={fav ? `حذف ${name} از محبوب‌ها` : `اضافه‌کردن ${name} به محبوب‌ها`}
      title={fav ? "از محبوب‌هاته ♥" : "بذارش تو محبوب‌هات"}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(kind);
        setPop((n) => n + 1);
      }}
      className={`flex items-center justify-center rounded-full border-2 transition-all active:scale-90 ${className}`}
      style={{
        width: box,
        height: box,
        background: fav ? "#FFE9F0" : "#FFFFFFCC",
        borderColor: fav ? "#F7C5D3" : "#FFFFFF",
        boxShadow: "0 2px 6px rgba(4,32,46,0.10)",
      }}
    >
      <span key={pop} className={pop > 0 ? "pishnam-heart-pop flex" : "flex"}>
        <HeartSticker
          size={size}
          fill={fav ? "#F0426B" : "#FFFFFF"}
          stroke={fav ? "#B02A52" : "#04202E"}
          strokeWidth={fav ? 2.6 : 2.2}
        />
      </span>
    </button>
  );
}

/* ── محبوب‌های تو — favorites strip for the home page (mobile + desktop) ── */
export function FavoritesStrip({ desktop = false }: { desktop?: boolean }) {
  const favorites = usePishnam((s) => s.favorites);
  const toggleFavorite = usePishnam((s) => s.toggleFavorite);
  if (favorites.length === 0) return null;
  const list = favorites.map((k) => PLUSH_MAP[k]);

  return (
    <div
      className={
        desktop
          ? "mt-7 flex flex-wrap items-center gap-5 rounded-[28px] border border-[#F7C5D3] bg-[#FFF7FA] p-5"
          : "mx-5 mt-4 flex flex-wrap items-center gap-4 rounded-[26px] border border-[#F7C5D3] bg-[#FFF7FA] p-4"
      }
    >
      <div className="flex items-center gap-2.5">
        <HeartSticker size={desktop ? 30 : 26} fill="#F0426B" stroke="#04202E" strokeWidth={2.4} />
        <div className="flex flex-col">
          <span className={`${desktop ? "text-[16px]" : "text-[15px]"} font-extrabold text-[#04202E]`}>
            محبوب‌های تو
          </span>
          <span className="text-[12px] font-semibold text-[#4A6572]">
            {favorites.length === 1 ? "یه رفیق پشمالو" : `${fa(favorites.length)} تا رفیق پشمالو`} تو قلبت مونده
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-wrap items-center gap-2">
        {list.map((p) => (
          <span
            key={p.kind}
            className="flex items-center gap-2 rounded-full border border-[#F7C5D3] bg-white py-1 pe-3 ps-1"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: p.bg }}
            >
              <Plush kind={p.kind} size={26} />
            </span>
            <span className="text-[13px] font-extrabold text-[#04202E]">{p.name}</span>
            <button
              type="button"
              aria-label={`حذف ${p.name} از محبوب‌ها`}
              onClick={() => toggleFavorite(p.kind)}
              className="text-[15px] font-black leading-none text-[#B02A52] transition-transform hover:scale-125"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate("pick")}
        className={`${
          desktop
            ? "h-[50px] px-6 text-[15px] transition-transform hover:scale-[1.03]"
            : "h-12 px-5 text-[14px] transition-transform active:scale-95"
        } flex items-center rounded-full bg-[#F0426B] font-extrabold text-white`}
      >
        برای محبوبت بفرست ♥
      </button>
    </div>
  );
}
