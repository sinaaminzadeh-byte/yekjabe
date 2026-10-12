'use client';

import { useCallback, useEffect, useState } from 'react';
import { PAGES } from '@/data/pages';

const KEY = 'pishnam:recent';
const MAX = 6;

/** Tracks recently viewed page slugs in localStorage (client only). */
export function useRecentPages() {
  const [recent, setRecent] = useState<string[]>([]);
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
            setRecent(valid.slice(0, MAX));
          }
        }
      } catch {
        /* ignore corrupt storage */
      }
      setHydrated(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const push = useCallback((slug: string) => {
    setRecent((prev) => {
      const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX);
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setRecent([]);
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return { recent, push, clear, hydrated };
}
