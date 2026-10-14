'use client';

import { useMemo, useState } from 'react';
import { CATEGORIES, PAGES, type PageDef } from '@/data/pages';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Gift, Unlock, Smartphone, Monitor, Puzzle, Printer, Heart, Clock, Star, StickyNote } from 'lucide-react';
import { cn } from '@/lib/utils';

const CAT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  gift: Gift,
  unlock: Unlock,
  smartphone: Smartphone,
  monitor: Monitor,
  puzzle: Puzzle,
  printer: Printer,
};

const CAT_COLORS: Record<string, string> = {
  flow: 'bg-[#00ABE7]/12 text-[#006387] border-[#00ABE7]/25',
  receiver: 'bg-[#FF9DB8]/15 text-[#B4435F] border-[#FF9DB8]/30',
  'info-m': 'bg-[#FFE8D1]/60 text-[#8A5A2B] border-[#F4C9A1]/50',
  web: 'bg-[#DDF3EA]/70 text-[#1F6E52] border-[#B8E4D2]/70',
  comp: 'bg-[#E7E0FA]/50 text-[#5B4A8A] border-[#D5CBF0]/60',
  print: 'bg-[#FFF3C9]/70 text-[#8A6D1F] border-[#F0DE9A]/70',
};

interface SidebarProps {
  activeSlug: string | null;
  onOpen: (slug: string, hash?: string | null) => void;
  recent?: string[];
  favs?: string[];
  onToggleFav?: (slug: string) => boolean;
  notes?: Record<string, string>;
  className?: string;
}

export function Sidebar({
  activeSlug,
  onOpen,
  recent = [],
  favs = [],
  onToggleFav,
  notes = {},
  className,
}: SidebarProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return PAGES;
    return PAGES.filter(
      (p) =>
        p.title.includes(q) ||
        p.label.includes(q) ||
        p.desc.includes(q) ||
        p.dc.toLowerCase().includes(q.toLowerCase()) ||
        p.slug.toLowerCase().includes(q.toLowerCase()),
    );
  }, [query]);

  const byCat = useMemo(() => {
    const map = new Map<string, PageDef[]>();
    for (const c of CATEGORIES) map.set(c.id, []);
    for (const p of filtered) {
      if (!map.has(p.cat)) map.set(p.cat, []);
      map.get(p.cat)!.push(p);
    }
    return map;
  }, [filtered]);

  const favPages = useMemo(
    () => favs.map((s) => PAGES.find((p) => p.slug === s)).filter((p): p is PageDef => Boolean(p)),
    [favs],
  );

  const starBtn = (p: PageDef, active: boolean) =>
    onToggleFav && !query.trim() ? (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFav(p.slug);
        }}
        className={cn(
          'shrink-0 size-6 grid place-items-center rounded-lg transition-all duration-200 hover:scale-110',
          favs.includes(p.slug)
            ? 'text-[#F5B301] hover:text-[#D99A00]'
            : active
              ? 'text-white/60 hover:text-white'
              : 'text-[#4A6572]/30 hover:text-[#F5B301]',
        )}
        aria-label={favs.includes(p.slug) ? `حذف ${p.label} از علاقه‌مندی‌ها` : `افزودن ${p.label} به علاقه‌مندی‌ها`}
        title={favs.includes(p.slug) ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
      >
        <Star className={cn('size-3.5', favs.includes(p.slug) && 'fill-[#F5B301]')} aria-hidden />
      </button>
    ) : null;

  return (
    <aside
      className={cn('flex flex-col h-full bg-white/85 backdrop-blur border-l border-[#D3E8F0]', className)}
      aria-label="فهرست صفحه‌های طراحی"
    >
      <div className="p-4 pb-2 space-y-3">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#4A6572]" aria-hidden />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جست‌وجو در صفحه‌ها…"
            className="pr-9 h-10 rounded-2xl bg-[#F2FAFD] border-[#D3E8F0] text-sm placeholder:text-[#4A6572]/60 focus-visible:ring-[#00ABE7]/40"
            aria-label="جست‌وجوی صفحه"
          />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#4A6572]">
          <Heart className="size-3 text-[#FF9DB8]" aria-hidden />
          <span>{PAGES.length} صفحه‌ی طراحی‌شده · به‌هم لینک‌شده</span>
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0 px-3 pb-4">
        <nav className="space-y-4">
          {favPages.length > 0 && !query.trim() && (
            <section aria-label="علاقه‌مندی‌ها">
              <div className="flex items-center gap-2 px-1 mb-2">
                <span className="flex items-center justify-center size-6 rounded-lg border bg-[#FFF3C9] text-[#D99A00] border-[#F0DE9A]">
                  <Star className="size-3.5 fill-[#F5B301] text-[#D99A00]" aria-hidden />
                </span>
                <h3 className="text-[12.5px] font-extrabold text-[#04202E]">علاقه‌مندی‌ها</h3>
                <span className="text-[10.5px] font-bold text-[#4A6572]/70 ms-auto">{favPages.length}</span>
              </div>
              <ul className="space-y-1">
                {favPages.map((p) => {
                  const active = p.slug === activeSlug;
                  return (
                    <li key={`fav-${p.slug}`}>
                      <button
                        type="button"
                        onClick={() => onOpen(p.slug)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'group w-full text-right rounded-2xl px-3 py-2 transition-all duration-200 border flex items-center gap-2',
                          active
                            ? 'bg-[#F5B301]/15 border-[#F0DE9A]'
                            : 'bg-transparent border-transparent hover:bg-[#FFF9E5] hover:border-[#F0DE9A]/60',
                        )}
                      >
                        <Star className="size-3 fill-[#F5B301] text-[#D99A00] shrink-0" aria-hidden />
                        <span className="text-[12.5px] font-bold text-[#04202E] truncate">{p.label}</span>
                        <span className="ms-auto flex items-center gap-1 shrink-0">
                          {notes[p.slug] && <StickyNote className="size-3 text-[#00ABE7]" aria-label="یادداشت دارد" />}
                          {starBtn(p, active)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {recent.length > 0 && !query.trim() && (
            <section aria-label="بازدید اخیر">
              <div className="flex items-center gap-2 px-1 mb-2">
                <span className="flex items-center justify-center size-6 rounded-lg border bg-[#FFF3C9]/70 text-[#8A6D1F] border-[#F0DE9A]/70">
                  <Clock className="size-3.5" aria-hidden />
                </span>
                <h3 className="text-[12.5px] font-extrabold text-[#04202E]">بازدید اخیر</h3>
              </div>
              <ul className="space-y-1">
                {recent
                  .map((s) => PAGES.find((p) => p.slug === s))
                  .filter((p): p is PageDef => Boolean(p))
                  .map((p) => (
                    <li key={`recent-${p.slug}`}>
                      <button
                        type="button"
                        onClick={() => onOpen(p.slug)}
                        className={cn(
                          'group w-full text-right rounded-2xl px-3 py-2 transition-all duration-200 border flex items-center gap-2',
                          p.slug === activeSlug
                            ? 'bg-[#00ABE7]/10 border-[#00ABE7]/30'
                            : 'bg-transparent border-transparent hover:bg-[#F2FAFD] hover:border-[#D3E8F0]',
                        )}
                      >
                        <Clock className="size-3 text-[#8A6D1F]/70 shrink-0" aria-hidden />
                        <span className="text-[12.5px] font-bold text-[#04202E] truncate">{p.label}</span>
                        <span className="ms-auto flex items-center gap-1 shrink-0">
                          {notes[p.slug] && <StickyNote className="size-3 text-[#00ABE7]" aria-label="یادداشت دارد" />}
                          <span className="text-[9.5px] font-bold tabular-nums text-[#4A6572]/50">
                            {p.w}×{p.h}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
              </ul>
            </section>
          )}

          {CATEGORIES.map((cat) => {
            const items = byCat.get(cat.id) ?? [];
            if (items.length === 0) return null;
            const Icon = CAT_ICONS[cat.icon] ?? Puzzle;
            return (
              <section key={cat.id} aria-label={cat.fa}>
                <div className="flex items-center gap-2 px-1 mb-2">
                  <span className={cn('flex items-center justify-center size-6 rounded-lg border', CAT_COLORS[cat.id])}>
                    <Icon className="size-3.5" aria-hidden />
                  </span>
                  <h3 className="text-[12.5px] font-extrabold text-[#04202E]">{cat.fa}</h3>
                  <span className="text-[10.5px] font-bold text-[#4A6572]/70 ms-auto">{items.length}</span>
                </div>
                <ul className="space-y-1">
                  {items.map((p) => {
                    const active = p.slug === activeSlug;
                    return (
                      <li key={p.slug}>
                        <button
                          type="button"
                          onClick={() => onOpen(p.slug)}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'group w-full text-right rounded-2xl px-3 py-2.5 transition-all duration-200 border',
                            active
                              ? 'bg-[#00ABE7] border-[#00ABE7] shadow-[0_6px_16px_rgba(0,171,231,0.35)]'
                              : 'bg-transparent border-transparent hover:bg-[#F2FAFD] hover:border-[#D3E8F0]',
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                'text-[10px] font-black w-5 h-5 shrink-0 rounded-full grid place-items-center',
                                active ? 'bg-white text-[#006387]' : 'bg-[#F2FAFD] text-[#4A6572] group-hover:bg-white',
                              )}
                            >
                              {PAGES.indexOf(p) + 1}
                            </span>
                            <span
                              className={cn(
                                'text-[13px] font-bold truncate',
                                active ? 'text-white' : 'text-[#04202E]',
                              )}
                            >
                              {p.label}
                            </span>
                            <span className="ms-auto flex items-center gap-1 shrink-0">
                              {notes[p.slug] && (
                                <StickyNote
                                  className={cn('size-3', active ? 'text-white/85' : 'text-[#00ABE7]')}
                                  aria-label="یادداشت دارد"
                                />
                              )}
                              <span
                                className={cn(
                                  'text-[10px] font-bold tabular-nums',
                                  active ? 'text-white/85' : 'text-[#4A6572]/60',
                                )}
                              >
                                {p.w}×{p.h}
                              </span>
                              {starBtn(p, active)}
                            </span>
                          </div>
                          <p
                            className={cn(
                              'mt-1 text-[11px] leading-5 font-medium line-clamp-1',
                              active ? 'text-white/85' : 'text-[#4A6572]',
                            )}
                          >
                            {p.desc}
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-center text-sm text-[#4A6572] py-10">چیزی پیدا نشد؛ یه چیز دیگه امتحان کن 🧸</p>
          )}
        </nav>
      </ScrollArea>
    </aside>
  );
}

export { CAT_COLORS };
