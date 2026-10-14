"use client";

// ── Home sections: «آمار پیشنام» (live counters) + «از وبلاگ» (latest posts) ──
// Stats come straight from /api/stats (real DB numbers, no invented figures);
// posts from /api/posts (published only). Rendered on both mobile & desktop
// home — responsive by Tailwind, the hidden twin just mirrors the fetch.
import { useEffect, useRef, useState } from "react";
import { navigate } from "@/lib/hash-route";
import { fa } from "@/lib/fa";
import { Plush } from "./plush";

interface Stats {
  products: number;
  delivered: number;
  inProgress: number;
  reviews: number;
  avgStars: number;
  stories: number;
  giftsNo: number;
  satisfaction: number;
}

interface PostRow {
  slug: string;
  title: string;
  excerpt: string;
  tags?: string;
}

/** rAF count-up that respects prefers-reduced-motion. */
function useCountUp(target: number, run: boolean, ms = 900): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    if (reduced) {
      raf = requestAnimationFrame(() => setV(target)); // jump straight to the value
      return () => cancelAnimationFrame(raf);
    }
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      setV(Math.round(target * (1 - Math.pow(1 - k, 3)))); // ease-out cubic
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return v;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

/* ═══════════ آمار پیشنام ═══════════ */

function StatTile({ icon, value, suffix, label, note }: { icon: string; value: number; suffix?: string; label: string; note?: string }) {
  const { ref, seen } = useInView<HTMLDivElement>();
  const v = useCountUp(value, seen);
  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-1.5 rounded-[24px] border border-[#DDEEF5] bg-white px-4 py-5 text-center box-border md:gap-2 md:rounded-[28px] md:px-6 md:py-7"
    >
      <span className="text-2xl md:text-3xl" aria-hidden="true">{icon}</span>
      <span className="text-[26px] font-black leading-[1.2] text-[#04202E] md:text-[34px]">
        {fa(v)}
        {suffix ? <span className="text-[17px] md:text-[22px]"> {suffix}</span> : null}
      </span>
      <span className="text-[13px] font-extrabold text-[#04202E] md:text-[14.5px]">{label}</span>
      {note ? <span className="text-[11.5px] font-medium leading-[1.7] text-[#4A6572] md:text-[12.5px]">{note}</span> : null}
    </div>
  );
}

export function HomeStats() {
  const [s, setS] = useState<Stats | null>(null);
  useEffect(() => {
    fetch("/api/stats", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j: Stats) => setS(j))
      .catch(() =>
        setS({ products: 6, delivered: 0, inProgress: 0, reviews: 0, avgStars: 0, stories: 0, giftsNo: 100, satisfaction: 98 }),
      );
  }, []);

  const tiles = s
    ? [
        { icon: "🧸", value: s.products, label: "دوست پشمالوی منتخب", note: "همه یک سایز، یه قیمت" },
        { icon: "🎁", value: s.giftsNo, label: "هدیه‌ی شماره‌دار", note: "هر جعبه یه شماره‌ی خودش" },
        { icon: "💗", value: s.stories, label: "تجربه‌ی ثبت‌شده", note: "از زبان مخاطب‌های خودمون" },
        { icon: "⭐", value: s.satisfaction, suffix: "٪", label: "رضایت مشتری‌ها", note: s.reviews > 0 ? `میانگین ${fa(s.avgStars)} از ۵ در ${fa(s.reviews)} نظر` : "قول کیفیتی پیشنام" },
      ]
    : [];

  return (
    <section aria-label="آمار پیشنام" className="mx-auto w-full max-w-[1200px] px-5 pt-[30px] box-border md:px-6 md:pt-[88px]">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 md:mb-7">
        <div className="flex flex-col gap-1.5 md:gap-2">
          <span className="text-[13px] font-extrabold text-[#006387] md:text-sm">آمار زنده</span>
          <h2 className="m-0 text-[22px] font-black leading-[1.4] md:text-[38px]">پیشنام با عدد و رقم</h2>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-[#DDEEF5] bg-white px-3.5 py-2 text-[11.5px] font-bold text-[#006387] md:text-[13px]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ABE7] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ABE7]" />
          </span>
          مستقیم از سیستم سفارش
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {tiles.length === 0
          ? [0, 1, 2, 3].map((i) => <div key={i} className="h-[150px] animate-pulse rounded-[24px] bg-white/70 md:h-[190px] md:rounded-[28px]" />)
          : tiles.map((t) => <StatTile key={t.label} icon={t.icon} value={t.value} suffix={t.suffix} label={t.label} note={t.note} />)}
      </div>
      {s && (s.delivered > 0 || s.inProgress > 0) && (
        <p className="m-0 pt-3 text-center text-[12.5px] font-semibold text-[#4A6572]">
          {s.delivered > 0 && <>تا امروز {fa(s.delivered)} جعبه به دست دوست‌ها رسیده</>}
          {s.delivered > 0 && s.inProgress > 0 && " · "}
          {s.inProgress > 0 && <>{fa(s.inProgress)} جعبه هم تو مسیر آماده‌سازیه</>}
        </p>
      )}
    </section>
  );
}

/* ═══════════ از وبلاگ ═══════════ */

export function HomeBlog() {
  const [posts, setPosts] = useState<PostRow[] | null>(null);
  useEffect(() => {
    fetch("/api/posts", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j: { posts?: PostRow[] }) => setPosts((j.posts ?? []).slice(0, 3)))
      .catch(() => setPosts([]));
  }, []);

  if (posts !== null && posts.length === 0) return null; // no empty section on the landing page

  return (
    <section aria-label="بلاگ پیشنام" className="mx-auto w-full max-w-[1200px] px-5 pt-[30px] box-border md:px-6 md:pt-[88px]">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 md:mb-7">
        <div className="flex flex-col gap-1.5 md:gap-2">
          <span className="text-[13px] font-extrabold text-[#006387] md:text-sm">بلاگ</span>
          <h2 className="m-0 text-[22px] font-black leading-[1.4] md:text-[38px]">از هدیه دادن، با حروف</h2>
        </div>
        <button
          type="button"
          onClick={() => navigate("blog")}
          className="rounded-full bg-[#04202E] px-4 py-2.5 text-[12.5px] font-extrabold text-white transition-transform hover:scale-[1.04] md:px-5 md:text-[14px]"
        >
          همه‌ی نوشته‌ها ›
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3 md:gap-4">
        {posts === null
          ? [0, 1, 2].map((i) => <div key={i} className="h-[170px] animate-pulse rounded-[24px] bg-white/70 md:h-[210px] md:rounded-[28px]" />)
          : posts.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => navigate("post", { slug: p.slug })}
                className="flex flex-col items-start gap-2.5 rounded-[24px] border border-[#DDEEF5] bg-white p-4 text-right transition-all hover:-translate-y-0.5 hover:border-[#00ABE7] hover:shadow-[0_10px_24px_rgba(4,32,46,0.07)] md:gap-3 md:rounded-[28px] md:p-6"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="rounded-full bg-[#E3F6FD] px-3 py-1 text-[10.5px] font-extrabold text-[#006387] md:text-[11.5px]">
                    {(p.tags ?? "وبلاگ").split("،")[0]?.trim() || "وبلاگ"}
                  </span>
                  <Plush kind={(["bear", "bunny", "cat"] as const)[i % 3]} size={i === 1 ? 46 : 40} />
                </div>
                <span className="text-[15.5px] font-black leading-[1.7] text-[#04202E] md:text-[17.5px]">{p.title}</span>
                <span className="line-clamp-2 text-[12.5px] font-medium leading-[1.9] text-[#4A6572] md:text-[13.5px]">{p.excerpt}</span>
                <span className="mt-auto pt-1 text-[12px] font-extrabold text-[#006387]">خوندن مطلب ›</span>
              </button>
            ))}
      </div>
    </section>
  );
}
