"use client";

// ── use-media-query — synchronous matchMedia hook (P-10, audit wave 38) ──
// The home screen used to mount BOTH shells (mobile + desktop) and hide one
// with CSS. This hook picks the branch AFTER mount but WITHOUT a flash: the
// initial state is read synchronously from window.matchMedia (the app is a
// client-only shell — there is no SSR HTML to mismatch), then follows changes.
// Breakpoint contract: md = 768px, same as the CSS it replaces.
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.matchMedia(query).matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** The one breakpoint the whole shop uses for mobile/desktop split. */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 768px)");
}
