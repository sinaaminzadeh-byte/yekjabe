'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PageDef } from '@/data/pages';
import { CATEGORIES, PAGES } from '@/data/pages';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  ExternalLink,
  LayoutGrid,
  Loader2,
  Maximize,
  Minus,
  Plus,
  Pause,
  Play,
  Smartphone,
  Star,
  StickyNote,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CAT_COLORS } from './sidebar';

interface ViewerProps {
  page: PageDef;
  index: number;
  total: number;
  anchorHash?: string | null;
  isFav: boolean;
  onToggleFav: (slug: string) => boolean;
  note: string;
  onNoteChange: (text: string) => void;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const TOUR_MS = 4500;
const isMobileCat = (cat: string) => cat === 'flow' || cat === 'receiver' || cat === 'info-m';
const FLOW_IDS = PAGES.filter((p) => p.cat === 'flow').map((p) => p.slug);

export function Viewer({
  page,
  index,
  total,
  anchorHash,
  isFav,
  onToggleFav,
  note,
  onNoteChange,
  onBack,
  onPrev,
  onNext,
}: ViewerProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<'fit' | number>('fit');
  const [autoScale, setAutoScale] = useState(1);
  const [loadedSlug, setLoadedSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [starPop, setStarPop] = useState(0);
  const [anchorHit, setAnchorHit] = useState<string | null>(null);
  const loaded = loadedSlug === page.slug;
  const { toast } = useToast();

  const mobile = isMobileCat(page.cat);
  const cat = CATEGORIES.find((c) => c.id === page.cat);
  const flowPos = FLOW_IDS.indexOf(page.slug); // -1 for non-flow pages

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
      else if (e.key === 'Escape') {
        if (notesOpen) setNotesOpen(false);
        else onBack();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onNext, onPrev, onBack, notesOpen]);

  // auto-play tour
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => {
      if (index >= total - 1) {
        setPlaying(false);
        toast({ title: 'تور تمام شد! 🎉', description: 'همه‌ی صفحه‌ها را دیدی.' });
      } else {
        onNext();
      }
    }, TOUR_MS);
    return () => window.clearTimeout(t);
  }, [playing, index, total, onNext, toast]);

  // ── hash-anchor scrolling inside the design iframe ──
  useEffect(() => {
    if (!anchorHash || !loaded) return;
    let cancelled = false;
    let attempts = 0;
    const tryScroll = () => {
      if (cancelled) return;
      const frame = canvasRef.current?.querySelector('iframe');
      try {
        const doc = frame?.contentDocument;
        const el = doc?.getElementById(anchorHash) ?? doc?.querySelector(`[name="${anchorHash}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setAnchorHit(anchorHash);
          // flash highlight ring on the target element
          const h = el as HTMLElement;
          h.style.outline = '3px solid #00ABE7';
          h.style.outlineOffset = '4px';
          h.style.borderRadius = '10px';
          h.style.transition = 'outline-color 1.6s ease 1s, outline-offset 1.6s ease 1s';
          window.setTimeout(() => {
            h.style.outlineColor = 'transparent';
            h.style.outlineOffset = '14px';
          }, 1200);
          window.setTimeout(() => {
            h.style.outline = '';
            h.style.outlineOffset = '';
            h.style.borderRadius = '';
            h.style.transition = '';
          }, 3200);
          toast({ title: `مستقیم رفتیم به «${anchorHash}» 🎯`, description: `بخش موردنظر در «${page.title}»` });
          return; // stop polling
        }
      } catch {
        /* cross-origin or doc not ready */
      }
      if (attempts++ < 14) window.setTimeout(tryScroll, 280);
    };
    const t = window.setTimeout(tryScroll, 350);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [anchorHash, loaded, page.title, toast]);

  // clear anchor banner when page changes
  useEffect(() => {
    setAnchorHit(null);
  }, [page.slug]);

  const copyLink = useCallback(async () => {
    const url =
      `${window.location.origin}/?page=${page.slug}` + (anchorHash ? `&h=${anchorHash}` : '');
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // fallback for non-secure contexts
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
      toast({ title: 'لینک صفحه کپی شد ✓', description: url });
    } catch {
      toast({ title: 'کپی نشد', description: url });
    }
  }, [page.slug, anchorHash, toast]);

  const handleFav = useCallback(() => {
    const added = onToggleFav(page.slug);
    if (added) {
      setStarPop((n) => n + 1);
      toast({ title: 'به علاقه‌مندی‌ها اضافه شد ⭐', description: page.label });
    }
  }, [onToggleFav, page.slug, page.label, toast]);

  const zoomPct = Math.round(scale * 100);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* flow stepper for the gift-building journey */}
      {flowPos > -1 && (
        <div className="shrink-0 flex items-center gap-1.5 px-4 pt-2.5 pb-1 bg-white/60" aria-hidden>
          {FLOW_IDS.map((s, i) => (
            <div
              key={s}
              className={cn(
                'h-[5px] flex-1 rounded-full transition-colors duration-500',
                i < flowPos ? 'bg-[#00ABE7]/35' : i === flowPos ? 'bg-[#00ABE7]' : 'bg-[#D3E8F0]',
              )}
            />
          ))}
          <span className="ms-2 text-[10px] font-black text-[#006387] shrink-0 leading-none">
            مسیر {flowPos + 1} از {FLOW_IDS.length}
          </span>
        </div>
      )}

      {/* tour progress bar */}
      {playing && (
        <div className="h-[3px] shrink-0 bg-[#00ABE7]/15 overflow-hidden" aria-hidden>
          <div
            key={page.slug}
            className="h-full bg-gradient-to-l from-[#00ABE7] to-[#7FD8F7] pishnam-tour-bar"
            style={{ animationDuration: `${TOUR_MS}ms` }}
          />
        </div>
      )}

      {/* anchor-jump banner */}
      <AnimatePresence>
        {anchorHit && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="shrink-0 flex items-center gap-2 px-4 py-1.5 bg-[#00ABE7]/10 border-b border-[#00ABE7]/20 text-[11.5px] font-extrabold text-[#006387]"
          >
            <Target className="size-3.5" aria-hidden />
            پرش مستقیم به بخش «{anchorHit}» انجام شد
            <button
              type="button"
              onClick={() => setAnchorHit(null)}
              className="ms-auto text-[10px] font-black text-[#4A6572] hover:text-[#04202E] rounded-full px-2 py-0.5 hover:bg-white/70 transition-colors"
            >
              بستن ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* toolbar */}
      <div className="flex items-center gap-2 px-3 sm:px-4 h-14 shrink-0 border-b border-[#D3E8F0] bg-white/80 backdrop-blur">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setPlaying(false);
            onBack();
          }}
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
                  onClick={() => {
                    setPlaying(false);
                    onPrev();
                  }}
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
                  onClick={() => {
                    setPlaying(false);
                    onNext();
                  }}
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

        {/* favorite star */}
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleFav}
                className={cn(
                  'size-9 rounded-xl shrink-0 transition-colors',
                  isFav
                    ? 'bg-[#FFF3C9] border-[#F0DE9A] hover:bg-[#FFEDB0]'
                    : 'border-[#D3E8F0] hover:border-[#F0DE9A] hover:bg-[#FFFDF2]',
                )}
                aria-label={isFav ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                aria-pressed={isFav}
                title={isFav ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها (⭐)'}
              >
                <motion.span
                  key={starPop}
                  initial={starPop ? { scale: 0.4, rotate: -18 } : false}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="grid place-items-center"
                >
                  <Star
                    className={cn('size-4', isFav ? 'fill-[#F5B301] text-[#D99A00]' : 'text-[#4A6572]')}
                    aria-hidden
                  />
                </motion.span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isFav ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* notes popover */}
        <Popover open={notesOpen} onOpenChange={setNotesOpen}>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      'relative size-9 rounded-xl shrink-0',
                      note
                        ? 'bg-[#E7F6FD] border-[#00ABE7]/40 text-[#006387] hover:bg-[#D8F0FA]'
                        : 'border-[#D3E8F0] hover:border-[#00ABE7]/40',
                    )}
                    aria-label="یادداشت این صفحه"
                    title="یادداشت این صفحه"
                  >
                    <StickyNote className="size-4" aria-hidden />
                    {note && (
                      <span
                        className="absolute -top-1 -left-1 size-2.5 rounded-full bg-[#00ABE7] ring-2 ring-white"
                        aria-hidden
                      />
                    )}
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>یادداشت این صفحه</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <PopoverContent side="bottom" align="end" className="w-80 p-3.5 rounded-2xl border-[#D3E8F0]">
            <div className="flex items-center gap-2 mb-2">
              <StickyNote className="size-4 text-[#00ABE7]" aria-hidden />
              <p className="text-[13px] font-black text-[#04202E]">یادداشت روی «{page.label}»</p>
            </div>
            <Textarea
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="هر نکته‌ای درباره‌ی این صفحه… (خودکار ذخیره می‌شود)"
              className="min-h-28 bg-[#F2FAFD] border-[#D3E8F0] rounded-xl text-[12.5px] leading-6 font-medium resize-none focus-visible:ring-[#00ABE7]/40 placeholder:text-[#4A6572]/50"
              aria-label="متن یادداشت"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] font-bold text-[#4A6572]/60">
                {note ? `${note.length} نویسه` : 'خالی'}
              </span>
              <span className="text-[10px] font-bold text-[#1F9D55] flex items-center gap-1">
                <Check className="size-3" aria-hidden />
                ذخیره‌ی خودکار
              </span>
            </div>
          </PopoverContent>
        </Popover>

        {/* tour play/pause */}
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={playing ? 'default' : 'outline'}
                size="icon"
                onClick={() => setPlaying((p) => !p)}
                className={cn(
                  'size-9 rounded-xl shrink-0',
                  playing
                    ? 'bg-[#00ABE7] hover:bg-[#009BD1] text-[#04202E] border-[#00ABE7] shadow-[0_4px_12px_rgba(0,171,231,0.4)]'
                    : 'border-[#D3E8F0]',
                )}
                aria-label={playing ? 'توقف تور خودکار' : 'پخش خودکار تور صفحه‌ها'}
                title={playing ? 'توقف تور' : 'پخش خودکار تور (هر صفحه ۴.۵ ثانیه)'}
              >
                {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{playing ? 'توقف تور خودکار' : 'پخش خودکار همه‌ی صفحه‌ها'}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="min-w-0 flex-1">
          <h2 className="text-[14px] sm:text-[15px] font-black text-[#04202E] truncate">
            {page.label}
            {isFav && <Star className="inline size-3.5 fill-[#F5B301] text-[#D99A00] ms-1.5 -mt-0.5" aria-hidden />}
            {playing && <span className="text-[10.5px] font-bold text-[#00ABE7] ms-2">· در حال پخش…</span>}
          </h2>
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

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={copyLink}
                className="size-9 rounded-xl border-[#D3E8F0] shrink-0 hidden sm:inline-flex"
                aria-label="کپی لینک صفحه"
                title="کپی لینک این صفحه"
              >
                {copied ? <Check className="size-4 text-[#1F9D55]" aria-hidden /> : <Copy className="size-4" aria-hidden />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>کپی لینک صفحه</TooltipContent>
          </Tooltip>
        </TooltipProvider>

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
        <motion.div
          key={page.slug}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="min-h-full w-max min-w-full flex justify-center py-8 px-6"
        >
          <div className="relative" style={{ width: page.w * scale, height: page.h * scale }}>
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
        </motion.div>
      </div>

      {/* status bar */}
      <footer className="h-9 shrink-0 flex items-center gap-3 px-4 border-t border-[#D3E8F0] bg-white/80 backdrop-blur text-[11px] font-bold text-[#4A6572]">
        <span className="flex items-center gap-1.5">
          <span className={cn('size-2 rounded-full', playing ? 'bg-[#FF9DB8] shadow-[0_0_6px_rgba(255,157,184,0.8)] animate-pulse' : 'bg-[#2BD97C] shadow-[0_0_6px_rgba(43,217,124,0.7)]')} aria-hidden />
          {playing ? 'پخش خودکار' : 'اجرای زنده'}
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
