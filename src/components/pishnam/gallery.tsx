'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CATEGORIES, PAGES, type PageDef } from '@/data/pages';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Gift,
  Unlock,
  Smartphone,
  Monitor,
  Puzzle,
  Printer,
  ArrowLeft,
  Link2,
  Sparkles,
  MousePointerClick,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CAT_COLORS } from './sidebar';

const CAT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  gift: Gift,
  unlock: Unlock,
  smartphone: Smartphone,
  monitor: Monitor,
  puzzle: Puzzle,
  printer: Printer,
};

const CAT_BLURB: Record<string, string> = {
  flow: 'از انتخاب عروسک تا پرداخت؛ قلب وب‌اپ',
  receiver: 'چیزی که دوستت می‌بینه وقتی هدیه باز می‌شه',
  'info-m': 'درباره، ماموریت، تماس، نظرها و ارسال',
  web: 'همه‌چیز در اندازه‌ی مانیتور ۱۴۴۰ پیکسلی',
  comp: 'عروسک‌ها و لوگو به‌عنوان کامپوننت مستقل',
  print: 'هویت برند روی کاغذ',
};

/** Scales an iframe preview to the card width using a ResizeObserver. */
function ScaledPreview({ page, eager }: { page: PageDef; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setScale(el.clientWidth / page.w);
  }, [page.w]);

  useEffect(() => {
    measure();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const height = Math.round(page.h * scale);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-2xl bg-white ring-1 ring-[#04202E]/8"
      style={{ height: height || 240 }}
      aria-hidden
    >
      {scale > 0 && (
        <iframe
          src={page.src}
          title=""
          tabIndex={-1}
          loading={eager ? 'eager' : 'lazy'}
          width={page.w}
          height={page.h}
          className="absolute top-0 right-0 border-0 bg-white pointer-events-none select-none"
          style={{
            width: page.w,
            height: page.h,
            transform: `scale(${scale})`,
            transformOrigin: 'top right',
          }}
        />
      )}
    </div>
  );
}

interface GalleryProps {
  activeSlug: string | null;
  onOpen: (slug: string) => void;
}

export function Gallery({ activeSlug, onOpen }: GalleryProps) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto pishnam-canvas">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* hero */}
        <section className="relative overflow-hidden rounded-[28px] bg-[#04202E] text-white p-6 sm:p-9">
          <div
            className="absolute -left-20 -top-24 size-72 rounded-full bg-[#00ABE7]/30 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute right-1/3 -bottom-28 size-64 rounded-full bg-[#FF9DB8]/25 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <Badge className="rounded-full bg-[#00ABE7] text-[#04202E] font-black text-[11px] gap-1 hover:bg-[#00ABE7]">
              <Sparkles className="size-3" aria-hidden />
              دیزاین‌سیستم کامل
            </Badge>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black leading-relaxed">
              پیشتم — وب‌اپ هدیه‌ی دوستانه
            </h1>
            <p className="mt-2 text-[13.5px] sm:text-[15px] leading-8 text-white/80 max-w-2xl font-medium">
              همه‌ی {PAGES.length} صفحه‌ای که کلود کد توی سیستم دیزاین طراحی کرده، از هم جدا شدن، مرتب شدن و دوباره
              به‌هم لینک شدن. از گالری انتخاب کن یا بری توی صفحه‌ها و مستقیم از توی خود طراحی، بین صفحه‌ها جابه‌جا بشی.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Button
                size="lg"
                onClick={() => onOpen('main')}
                className="rounded-2xl bg-[#00ABE7] hover:bg-[#009BD1] text-[#04202E] font-black h-12 px-6 gap-2 shadow-[0_10px_24px_rgba(0,171,231,0.4)]"
              >
                <Gift className="size-4.5" aria-hidden />
                شروع از صفحه‌ی اصلی
              </Button>
              <div className="flex items-center gap-1.5 text-[12px] font-bold text-white/70">
                <MousePointerClick className="size-4" aria-hidden />
                ۶ دسته · موبایل + وب · اجرای زنده
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl">
              {[
                { n: '۹', t: 'مسیر موبایل' },
                { n: '۱۱', t: 'صفحه‌ی وب' },
                { n: '۲', t: 'جزء طراحی' },
                { n: '۲', t: 'هویت چاپی' },
              ].map((s) => (
                <div key={s.t} className="rounded-2xl bg-white/8 border border-white/12 px-3.5 py-2.5">
                  <div className="text-lg font-black text-[#00ABE7]">{s.n}</div>
                  <div className="text-[11px] font-bold text-white/70">{s.t}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* hint bar */}
        <div className="flex items-center gap-2.5 rounded-2xl border border-[#00ABE7]/25 bg-[#00ABE7]/8 px-4 py-3 text-[12.5px] font-bold text-[#006387]">
          <Link2 className="size-4 shrink-0" aria-hidden />
          <span>
            داخل هر صفحه، دکمه‌ها و لینک‌ها واقعاً به صفحه‌های دیگه وصلن؛ مثلاً «ادامه، کارت پستال» می‌برتت به قدم بعد.
          </span>
        </div>

        {/* categories */}
        {CATEGORIES.map((cat, ci) => {
          const items = PAGES.filter((p) => p.cat === cat.id);
          if (!items.length) return null;
          const Icon = CAT_ICONS[cat.icon] ?? Puzzle;
          const wide = cat.id === 'web' || cat.id === 'print';
          return (
            <section key={cat.id} aria-label={cat.fa} className="space-y-3.5">
              <div className="flex items-center gap-2.5">
                <span className={cn('flex items-center justify-center size-8 rounded-xl border', CAT_COLORS[cat.id])}>
                  <Icon className="size-4" aria-hidden />
                </span>
                <div>
                  <h2 className="text-[16px] font-black text-[#04202E] leading-6">{cat.fa}</h2>
                  <p className="text-[11.5px] font-medium text-[#4A6572]">{CAT_BLURB[cat.id]}</p>
                </div>
                <span className="ms-auto text-[11px] font-black text-[#4A6572]/60 tabular-nums">
                  {items.length} صفحه
                </span>
              </div>
              <div
                className={cn(
                  'grid gap-4',
                  wide ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-5',
                )}
              >
                {items.map((p) => {
                  const active = p.slug === activeSlug;
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => onOpen(p.slug)}
                      aria-label={`باز کردن صفحه‌ی ${p.label}`}
                      className={cn(
                        'group text-right rounded-[22px] border p-2.5 pb-3 transition-all duration-200 bg-white/70 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ABE7]',
                        active
                          ? 'border-[#00ABE7] shadow-[0_10px_28px_rgba(0,171,231,0.25)]'
                          : 'border-[#D3E8F0] hover:border-[#00ABE7]/50 hover:shadow-[0_10px_28px_rgba(4,32,46,0.10)]',
                      )}
                    >
                      <div className="relative">
                        <ScaledPreview page={p} eager={ci === 0 && items.indexOf(p) < 4} />
                        <div className="absolute inset-0 rounded-2xl bg-[#04202E]/0 group-hover:bg-[#00ABE7]/10 transition-colors duration-200 grid place-items-center opacity-0 group-hover:opacity-100">
                          <span className="rounded-full bg-[#04202E] text-white text-[12px] font-black px-4 py-2 flex items-center gap-1.5 shadow-lg">
                            اجرای صفحه
                            <ArrowLeft className="size-3.5" aria-hidden />
                          </span>
                        </div>
                      </div>
                      <div className="px-1 pt-2.5 flex items-start gap-2">
                        <div className="min-w-0">
                          <div className="text-[13px] font-extrabold text-[#04202E] truncate group-hover:text-[#006387] transition-colors">
                            {p.label}
                          </div>
                          <div className="text-[11px] font-medium text-[#4A6572] truncate">{p.desc}</div>
                        </div>
                        <span className="ms-auto text-[9.5px] font-black tabular-nums text-[#4A6572]/60 bg-[#F2FAFD] rounded-full px-2 py-0.5 shrink-0 mt-0.5">
                          {p.w}×{p.h}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}

        <footer className="pt-4 pb-8 text-center text-[11.5px] font-bold text-[#4A6572]/70">
          پیشتم 🧸 — {PAGES.length} صفحه، یک داستان: «می‌خوای یه رو دو تا هدیه بگیری؟»
        </footer>
      </div>
    </div>
  );
}
