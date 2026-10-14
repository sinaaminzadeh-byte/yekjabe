'use client';

import { useCallback, useEffect, useState } from 'react';
import { PAGES } from '@/data/pages';

const KEY = 'pishnam:favs';

/** Pinned/favorite pages persisted in localStorage (client only). */
export function useFavoritePages() {
  const [favs, setFavs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(KEY);
        if (raw) {
          const parsed: unknown = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            const valid = parsed.filter(
              (s): s is string => typeof s === 'string' && PAGES.some((p) => p.slug === s),
            );
            setFavs(valid);
          }
        }
      } catch {
        /* ignore corrupt storage */
      }
      setHydrated(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const persist = useCallback((next: string[]) => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggle = useCallback(
    (slug: string) => {
      let added = false;
      setFavs((prev) => {
        const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug, ...prev];
        added = next.length > prev.length;
        persist(next);
        return next;
      });
      return added;
    },
    [persist],
  );

  const has = useCallback((slug: string) => favs.includes(slug), [favs]);

  return { favs, toggle, has, hydrated };
}
