"use client";

// ── Favorite heart toggle (پشمالوی محبوب) — shared by home + pick screens ──
import { useState } from "react";
import { usePishnam, useIsFavorite } from "@/lib/pishnam-store";
import type { PlushKind } from "@/lib/pishnam-data";
import { HeartSticker } from "@/components/shop/icons";

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
