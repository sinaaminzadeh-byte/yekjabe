'use client';

import { useEffect } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { CATEGORIES, PAGES, type PageDef } from '@/data/pages';
import {
  Gift,
  Unlock,
  Smartphone,
  Monitor,
  Puzzle,
  Printer,
  ArrowLeft,
  LayoutGrid,
  Clock,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CAT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  gift: Gift,
  unlock: Unlock,
  smartphone: Smartphone,
  monitor: Monitor,
  puzzle: Puzzle,
  printer: Printer,
};

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenPage: (slug: string, hash?: string | null) => void;
  onGallery: () => void;
  recent: string[];
  favs?: string[];
  activeSlug: string | null;
}

export function CommandPalette({
  open,
  onOpenChange,
  onOpenPage,
  onGallery,
  recent,
  favs = [],
  activeSlug,
}: CommandPaletteProps) {
  // ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  const run = (fn: () => void) => {
    onOpenChange(false);
    fn();
  };

  const recentPages = recent
    .map((s) => PAGES.find((p) => p.slug === s))
    .filter((p): p is PageDef => Boolean(p));

  const favPages = favs
    .map((s) => PAGES.find((p) => p.slug === s))
    .filter((p): p is PageDef => Boolean(p));

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="جست‌وجوی سریع یک دوست"
      description="جست‌وجو و پرش به هر صفحه‌ای از دیزاین‌سیستم"
    >
      <CommandInput placeholder="برو به صفحه… (نام، شماره یا دسته)" />
      <CommandList className="text-right">
        <CommandEmpty>چیزی پیدا نشد؛ اسم دیگه‌ای امتحان کن 🧸</CommandEmpty>

        {favPages.length > 0 && (
          <CommandGroup heading="علاقه‌مندی‌ها">
            {favPages.map((p) => (
              <CommandItem
                key={`fav-${p.slug}`}
                value={`fav star ${p.label} ${p.title} ${p.slug} ${p.dc}`}
                onSelect={() => run(() => onOpenPage(p.slug))}
                className="gap-2"
              >
                <Star className="size-3.5 fill-[#F5B301] text-[#D99A00]" aria-hidden />
                <span className="font-bold text-[13px]">{p.label}</span>
                {p.slug === activeSlug && (
                  <span className="mr-auto text-[10px] font-black text-[#00ABE7]">فعلی</span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {recentPages.length > 0 && (
          <CommandGroup heading="بازدید اخیر">
            {recentPages.map((p, i) => (
              <CommandItem
                key={`recent-${p.slug}`}
                value={`recent ${i + 1} ${p.label} ${p.title} ${p.slug} ${p.dc}`}
                onSelect={() => run(() => onOpenPage(p.slug))}
                className="gap-2"
              >
                <Clock className="size-3.5 text-[#4A6572]" aria-hidden />
                <span className="font-bold text-[13px]">{p.label}</span>
                {p.slug === activeSlug && (
                  <span className="mr-auto text-[10px] font-black text-[#00ABE7]">فعلی</span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {CATEGORIES.map((cat) => {
          const items = PAGES.filter((p) => p.cat === cat.id);
          if (!items.length) return null;
          const Icon = CAT_ICONS[cat.icon] ?? Puzzle;
          return (
            <CommandGroup key={cat.id} heading={`${cat.fa} · ${items.length}`}>
              {items.map((p) => (
                <CommandItem
                  key={p.slug}
                  value={`${PAGES.indexOf(p) + 1} ${p.label} ${p.title} ${p.desc} ${p.slug} ${p.dc} ${cat.fa}`}
                  onSelect={() => run(() => onOpenPage(p.slug))}
                  className="gap-2"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#F2FAFD] text-[10px] font-black text-[#4A6572]">
                    {PAGES.indexOf(p) + 1}
                  </span>
                  <Icon className="size-3.5 text-[#4A6572]" aria-hidden />
                  <span className="font-bold text-[13px]">{p.label}</span>
                  <span className="mr-auto text-[10px] font-bold tabular-nums text-[#4A6572]/60">
                    {p.w}×{p.h}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}

        <CommandSeparator />
        <CommandGroup heading="کارها">
          <CommandItem onSelect={() => run(onGallery)} className="gap-2">
            <LayoutGrid className="size-3.5 text-[#00ABE7]" aria-hidden />
            <span className="font-bold text-[13px]">گالری همه‌ی صفحه‌ها</span>
          </CommandItem>
          {recent.length > 0 && (
            <CommandItem
              onSelect={() => run(() => {
                const last = recent[0];
                if (last) onOpenPage(last);
              })}
              className="gap-2"
            >
              <ArrowLeft className="size-3.5 text-[#00ABE7]" aria-hidden />
              <span className={cn('font-bold text-[13px]')}>ادامه‌ی آخرین صفحه‌ی دیده‌شده</span>
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
      <div
        className="flex items-center gap-3 border-t border-[#D3E8F0] px-4 py-2.5 text-[10.5px] font-bold text-[#4A6572]"
        aria-hidden
      >
        <span>↑↓ حرکت</span>
        <span>Enter باز کردن</span>
        <span>Esc بستن</span>
        <span className="mr-auto">یک دوست ⌘K</span>
      </div>
    </CommandDialog>
  );
}
