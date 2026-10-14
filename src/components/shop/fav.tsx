"use client";

// ── Favorite heart toggle (پشمالوی محبوب) — shared by home + pick screens ──
import { useState } from "react";
import { usePishnam, useIsFavorite } from "@/lib/pishnam-store";
import { PLUSHES, PLUSH_MAP, type PlushKind } from "@/lib/pishnam-data";
import { HeartSticker } from "@/components/shop/icons";
import { Plush } from "@/components/shop/plush";
import { navigate } from "@/lib/hash-route";
import { fa } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";

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

/* ── FavFilterChips — «همه / محبوب‌هام» filter pills for pick screens ── */
export function FavFilterChips({
  favOnly,
  onToggle,
  desktop = false,
}: {
  favOnly: boolean;
  onToggle: (v: boolean) => void;
  desktop?: boolean;
}) {
  const favorites = usePishnam((s) => s.favorites);
  const h = desktop ? "h-11" : "h-10";

  const base = `flex ${h} items-center gap-1.5 rounded-full px-4 text-[13.5px] font-extrabold transition-all active:scale-95`;
  const chip = (on: boolean) =>
    ({
      background: on ? "#04202E" : "#FFFFFF",
      border: `1.5px solid ${on ? "#04202E" : "#CFE6EF"}`,
      color: on ? "#FFFFFF" : "#04202E",
      boxShadow: on ? "0 4px 10px rgba(4,32,46,0.16)" : undefined,
    }) as const;

  return (
    <div className="flex items-center gap-2" role="group" aria-label="فیلتر دوست‌های پشمالو">
      <button type="button" aria-pressed={!favOnly} onClick={() => onToggle(false)} className={base} style={chip(!favOnly)}>
        همه
      </button>
      <button
        type="button"
        aria-pressed={favOnly}
        onClick={() => onToggle(!favOnly)}
        className={`${base} ${favorites.length === 0 && !favOnly ? "opacity-70" : ""}`}
        style={chip(favOnly)}
      >
        <HeartSticker size={15} fill={favOnly ? "#FF89AC" : "#F0426B"} stroke={favOnly ? "#FFFFFF" : "#04202E"} strokeWidth={2.4} />
        محبوب‌هام
        <span
          className="flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-black"
          style={{ background: favOnly ? "#F0426B" : "#FFE9F0", color: favOnly ? "#FFFFFF" : "#B02A52" }}
        >
          {fa(favorites.length)}
        </span>
      </button>
    </div>
  );
}

/* ── SurpriseButton — «یه سورپرایزم کن» random plush picker ── */
export function SurpriseButton({ desktop = false, onPick }: { desktop?: boolean; onPick?: () => void }) {
  const setKind = usePishnam((s) => s.setKind);
  const kind = usePishnam((s) => s.kind);
  const { toast } = useToast();
  const [roll, setRoll] = useState(0);

  const pick = () => {
    const others = PLUSHES.filter((p) => p.kind !== kind);
    const p = others[Math.floor(Math.random() * others.length)];
    setKind(p.kind);
    setRoll((n) => n + 1);
    onPick?.();
    toast({ title: `${p.name} رسید! 🎲`, description: p.blurb });
  };

  return (
    <button
      type="button"
      onClick={pick}
      title="نمی‌دونی کدوم؟ بذار شانس انتخاب کنه!"
      className={`flex items-center gap-2 rounded-full border-[1.5px] border-dashed border-[#9CC9DA] bg-white font-extrabold text-[#006387] transition-all active:scale-95 hover:border-[#00ABE7] hover:text-[#04202E] ${
        desktop ? "h-11 px-4 text-[13.5px]" : "h-10 px-3.5 text-[13px]"
      }`}
    >
      <span key={roll} className={roll > 0 ? "pishnam-dice-roll flex" : "flex"} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4.5" />
          <circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      </span>
      سورپرایزم کن
    </button>
  );
}
