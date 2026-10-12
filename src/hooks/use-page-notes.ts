'use client';

import { useCallback, useEffect, useState } from 'react';
import { PAGES } from '@/data/pages';

const KEY = 'pishnam:notes';

export type NoteMap = Record<string, string>;

/** Per-page review notes persisted in localStorage (client only). */
export function usePageNotes() {
  const [notes, setNotes] = useState<NoteMap>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(KEY);
        if (raw) {
          const parsed: unknown = JSON.parse(raw);
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            const clean: NoteMap = {};
            for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
              if (typeof v === 'string' && v.trim() && PAGES.some((p) => p.slug === k)) {
                clean[k] = v;
              }
            }
            setNotes(clean);
          }
        }
      } catch {
        /* ignore corrupt storage */
      }
      setHydrated(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const setNote = useCallback((slug: string, text: string) => {
    setNotes((prev) => {
      const trimmed = text.trim();
      const next = { ...prev };
      if (trimmed) next[slug] = trimmed;
      else delete next[slug];
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const getNote = useCallback((slug: string) => notes[slug] ?? '', [notes]);

  return { notes, setNote, getNote, hydrated };
}
