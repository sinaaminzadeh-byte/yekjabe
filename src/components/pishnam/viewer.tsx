'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PageDef } from '@/data/pages';
import { CATEGORIES } from '@/data/pages';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  LayoutGrid,
  Loader2,
  Maximize,
  Minus,
  Plus,
  Smartphone,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CAT_COLORS } from './sidebar';

interface ViewerProps {
  page: PageDef;
  index: number;
  total: number;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const isMobileCat = (cat: string) => cat === 'flow' || cat === 'receiver' || cat === 'info-m';

export function Viewer({ page, index, total, onBack, onPrev, onNext }: ViewerProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<'fit' | number>('fit');
  const [autoScale, setAutoScale] = useState(1);
  const [loadedSlug, setLoadedSlug] = useState<string | null>(null);
  const loaded = loadedSlug === page.slug;

  const mobile = isMobileCat(page.cat);
  const cat = CATEGORIES.find((c) => c.id === page.cat);

  const measure = useCallback(() => {
    const el = canvasRef.current;
    if (!el) return;
    const pad = 48;
    const w = el.clientWidth - pad;
    const s = Math.min(1, w / page.w);
    setAutoScale(Math.max(0.18, s));
  }, [page.w]);

  useEffect(() => {
    measure();
    const el = canvasRef.current;
    if (!el) return;
    el.scrollTop = 0;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const scale = zoom === 'fit' ? autoScale : zoom;

  // keyboard navigation (RTL: left arrow = next, right arrow = prev)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onNext();
      else if (e.key === 'ArrowRight') onPrev();
      else if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onNext, onPrev, onBack]);

  const zoomPct = Math.round(scale * 100);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* toolbar */}
      <div className="flex items-center gap-2 px-3 sm:px-4 h-14 shrink-0 border-b border-[#D3E8F0] bg-white/80 backdrop-blur">
        <Button
          variant="outline"
          size="icon"
          onClick={onBack}
          className="size-9 rounded-xl border-[#D3E8F0] shrink-0"
          aria-label="بازگشت به گالری"
          title="بازگشت به گالری (Esc)"
        >
          <LayoutGrid className="size-4" aria-hidden />
        </Button>

        <div className="hidden sm:flex items-center rounded-xl border border-[#D3E8F0] bg-white overflow-hidden">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPrev}
                  disabled={index === 0}
                  className="size-9 rounded-none"
                  aria-label="صفحه‌ی قبلی"
                >
                  <ChevronRight className="size-4" aria-hidden />
                </Button>
              </TooltipTrigger>
              <TooltipContent>قبلی (→)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-[11px] font-black text-[#4A6572] tabular-nums px-1" aria-live="polite">
            {index + 1}/{total}
          </span>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNext}
                  disabled={index === total - 1}
                  className="size-9 rounded-none"
                  aria-label="صفحه‌ی بعدی"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                </Button>
              </TooltipTrigger>
              <TooltipContent>بعدی (←)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-[14px] sm:text-[15px] font-black text-[#04202E] truncate">{page.label}</h2>
          <p className="hidden md:block text-[11px] font-medium text-[#4A6572] truncate">{page.desc}</p>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 shrink-0">
          {cat && (
            <Badge variant="outline" className={cn('rounded-full font-bold text-[10.5px]', CAT_COLORS[page.cat])}>
              {cat.fa}
            </Badge>
          )}
          <Badge variant="outline" className="rounded-full font-bold text-[10.5px] tabular-nums border-[#D3E8F0] text-[#4A6572] bg-white">
            {page.w}×{page.h}
          </Badge>
          {mobile && (
            <Badge variant="outline" className="rounded-full font-bold text-[10.5px] border-[#D3E8F0] text-[#4A6572] bg-white gap-1">
              <Smartphone className="size-3" aria-hidden />
              موبایل
            </Badge>
          )}
        </div>

        {/* zoom */}
        <div className="hidden md:flex items-center rounded-xl border border-[#D3E8F0] bg-white shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-none"
            onClick={() => setZoom((z) => Math.max(0.25, Math.round(((z === 'fit' ? autoScale : z) - 0.1) * 100) / 100))}
            aria-label="کوچک‌تر"
          >
            <Minus className="size-3.5" aria-hidden />
          </Button>
          <button
            type="button"
            onClick={() => setZoom('fit')}
            className={cn(
              'text-[11px] font-black tabular-nums px-1.5 min-w-12',
              zoom === 'fit' ? 'text-[#00ABE7]' : 'text-[#4A6572] hover:text-[#04202E]',
            )}
            title="بازگشت به اندازه‌ی متناسب"
          >
            {zoom === 'fit' ? `${zoomPct}٪ خودکار` : `${zoomPct}٪`}
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-none"
            onClick={() => setZoom((z) => Math.min(2, Math.round(((z === 'fit' ? autoScale : z) + 0.1) * 100) / 100))}
            aria-label="بزرگ‌تر"
          >
            <Plus className="size-3.5" aria-hidden />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-none border-r border-[#D3E8F0]"
            onClick={() => setZoom(1)}
            aria-label="اندازه‌ی واقعی ۱۰۰٪"
          >
            <Maximize className="size-3.5" aria-hidden />
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(page.src, '_blank')}
          className="size-9 rounded-xl border-[#D3E8F0] shrink-0"
          aria-label="باز کردن در تب جدید"
          title="باز کردن در تب جدید"
        >
          <ExternalLink className="size-4" aria-hidden />
        </Button>
      </div>

      {/* canvas */}
      <div
        ref={canvasRef}
        className="flex-1 min-h-0 overflow-auto pishnam-canvas"
        role="region"
        aria-label={`نمایش صفحه‌ی ${page.title}`}
      >
        <div className="min-h-full w-max min-w-full flex justify-center py-8 px-6">
          <div
            className="relative"
            style={{ width: page.w * scale, height: page.h * scale }}
          >
            <div
              style={{
                width: page.w,
                height: page.h,
                transform: `scale(${scale})`,
                transformOrigin: 'top right',
                position: 'absolute',
                top: 0,
                right: 0,
              }}
              className={cn(
                'bg-white',
                mobile && 'rounded-[28px] overflow-hidden ring-1 ring-[#04202E]/60 shadow-[0_24px_60px_rgba(4,32,46,0.18)]',
                !mobile && 'rounded-lg overflow-hidden shadow-[0_18px_48px_rgba(4,32,46,0.14)] ring-1 ring-[#04202E]/10',
              )}
            >
              {!loaded && (
                <div className="absolute inset-0 grid place-items-center bg-[#F2FAFD] z-10">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="size-7 text-[#00ABE7] animate-spin" aria-hidden />
                    <span className="text-[12px] font-bold text-[#4A6572]">در حال باز شدن «{page.title}»…</span>
                  </div>
                </div>
              )}
              <iframe
                key={page.slug}
                src={page.src}
                title={`پیش‌نمایش صفحه‌ی ${page.title}`}
                width={page.w}
                height={page.h}
                onLoad={() => setLoadedSlug(page.slug)}
                className="block border-0 bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* status bar */}
      <footer className="h-9 shrink-0 flex items-center gap-3 px-4 border-t border-[#D3E8F0] bg-white/80 backdrop-blur text-[11px] font-bold text-[#4A6572]">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#2BD97C] shadow-[0_0_6px_rgba(43,217,124,0.7)]" aria-hidden />
          اجرای زنده
        </span>
        <span className="text-[#4A6572]/50" aria-hidden>·</span>
        <span className="tabular-nums">{page.dc}</span>
        <span className="text-[#4A6572]/50" aria-hidden>·</span>
        <span className="hidden sm:inline">لینک‌های داخل صفحه به صفحه‌های دیگر وصل‌اند؛ امتحانشون کن!</span>
        <span className="ms-auto hidden md:inline">← بعدی · → قبلی · Esc گالری</span>
      </footer>
    </div>
  );
}
