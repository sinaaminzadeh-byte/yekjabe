"use client";

// ── Tiny hash router (single-route sandbox constraint: everything lives on /) ──
import { useEffect, useState, useCallback } from "react";

export type Route =
  | "home"
  | "pick"
  | "card"
  | "extras"
  | "checkout"
  | "success"
  | "my-gifts"
  | "impact"
  | "login"
  | "gift"
  | "about"
  | "mission"
  | "contact"
  | "reviews"
  | "shipping"
  | "track";

export const ROUTES: Route[] = [
  "home",
  "pick",
  "card",
  "extras",
  "checkout",
  "success",
  "my-gifts",
  "impact",
  "login",
  "gift",
  "about",
  "mission",
  "contact",
  "reviews",
  "shipping",
  "track",
];

function parseHash(): { route: Route; query: URLSearchParams } {
  const h = window.location.hash.replace(/^#\/?/, "");
  const [path, qs] = h.split("?");
  const route = (ROUTES as string[]).includes(path) ? (path as Route) : "home";
  return { route, query: new URLSearchParams(qs ?? "") };
}

export function navigate(route: Route, query?: Record<string, string>) {
  const qs = query ? "?" + new URLSearchParams(query).toString() : "";
  window.location.hash = `#/${route}${qs}`;
}

export function useHashRoute(): { route: Route; query: URLSearchParams } {
  // SSR-safe: always start at "home", sync the real hash after mount
  // (reading location.hash during first client render causes hydration mismatch)
  const [state, setState] = useState<{ route: Route; query: URLSearchParams }>({
    route: "home",
    query: new URLSearchParams(),
  });

  useEffect(() => {
    const onChange = () => {
      setState(parseHash());
      window.scrollTo({ top: 0 });
    };
    onChange();
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return state;
}

export function useNav() {
  return useCallback((r: Route, q?: Record<string, string>) => navigate(r, q), []);
}
