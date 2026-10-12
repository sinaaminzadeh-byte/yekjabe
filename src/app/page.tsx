'use client';

import { useCallback, useEffect, useState } from 'react';
import { PAGES, pageBySlug } from '@/data/pages';
import { Header } from '@/components/pishnam/header';
import { Sidebar } from '@/components/pishnam/sidebar';
import { Viewer } from '@/components/pishnam/viewer';
import { Gallery } from '@/components/pishnam/gallery';
import { CommandPalette } from '@/components/pishnam/command-palette';
import { useRecentPages } from '@/hooks/use-recent-pages';
import { useToast } from '@/hooks/use-toast';

type View = 'gallery' | 'viewer';

export default function Home() {
  const [view, setView] = useState<View>('gallery');
  const [slug, setSlug] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { recent, push } = useRecentPages();
  const { toast } = useToast();

  // read ?page=slug from URL on first mount (supports /?page=..., /?m-pick, /#m-pick)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const fromQuery = new URLSearchParams(window.location.search).get('page');
      const fromHash = window.location.hash.replace(/^#\/?/, '');
      const initial = fromQuery || fromHash;
      if (initial && pageBySlug(initial)) {
        setSlug(initial);
        setView('viewer');
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const syncUrl = useCallback((s: string | null) => {
    const url = s ? `/?page=${s}` : '/';
    window.history.replaceState(null, '', url);
  }, []);

  const openPage = useCallback(
    (s: string) => {
      setSlug(s);
      setView('viewer');
      syncUrl(s);
      setDrawerOpen(false);
      push(s);
    },
    [syncUrl, push],
  );

  const goGallery = useCallback(() => {
    setView('gallery');
    syncUrl(null);
  }, [syncUrl]);

  const step = useCallback(
    (dir: -1 | 1) => {
      const i = PAGES.findIndex((p) => p.slug === slug);
      if (i < 0) return;
      const next = PAGES[i + dir];
      if (next) openPage(next.slug);
    },
    [openPage, slug],
  );

  // cross-page navigation from inside design pages (postMessage shim)
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const d = e.data as { type?: string; slug?: string | null; name?: string };
      if (!d || d.type !== 'pishnam-nav') return;
      const target = d.slug ?? null;
      if (target && pageBySlug(target)) {
        openPage(target);
      } else {
        toast({
          title: 'این لینک هنوز به صفحه‌ای وصل نیست',
          description: `مقصده: ${d.name ?? 'نامشخص'} — احتمالاً صفحه‌ای که طراحی نشده.`,
        });
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [openPage, toast]);

  const page = slug ? pageBySlug(slug) : undefined;
  const index = slug ? PAGES.findIndex((p) => p.slug === slug) : -1;

  return (
    <div className="h-screen flex flex-col bg-[#F6FBFD] vazirmatn overflow-hidden">
      <Header
        view={view}
        onGallery={goGallery}
        drawerOpen={drawerOpen}
        onDrawerOpenChange={setDrawerOpen}
        onOpenPalette={() => setPaletteOpen(true)}
        sidebarSlot={<Sidebar activeSlug={slug} onOpen={openPage} recent={recent} className="h-full" />}
      />
      <div className="flex flex-1 min-h-0">
        <Sidebar
          activeSlug={slug}
          onOpen={openPage}
          recent={recent}
          className="hidden lg:flex w-[292px] shrink-0"
        />
        <main className="flex-1 min-w-0 flex flex-col min-h-0" aria-live="polite">
          {view === 'viewer' && page ? (
            <Viewer
              page={page}
              index={index}
              total={PAGES.length}
              onBack={goGallery}
              onPrev={() => step(-1)}
              onNext={() => step(1)}
            />
          ) : (
            <Gallery activeSlug={slug} onOpen={openPage} recent={recent} />
          )}
        </main>
      </div>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onOpenPage={openPage}
        onGallery={goGallery}
        recent={recent}
        activeSlug={slug}
      />
    </div>
  );
}
