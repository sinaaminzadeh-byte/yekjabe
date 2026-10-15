"use client";

// ── Tiny hash router (single-route sandbox constraint: everything lives on /) ──
// Supports section anchors: `#/home@friends` scrolls to element#friends after render.
import { useEffect, useState, useCallback } from "react";

export type Route =
  | "home"
  | "friends"
  | "product"
  | "pick"
  | "card"
  | "extras"
  | "checkout"
  | "pay-gateway"
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
  | "track"
  | "admin"
  | "stories"
  | "blog"
  | "post"
  | "legal"
  | "not-found";

export const ROUTES: Route[] = [
  "home",
  "friends",
  "product",
  "pick",
  "card",
  "extras",
  "checkout",
  "pay-gateway",
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
  "admin",
  "stories",
  "blog",
  "post",
  "legal",
  "not-found",
];

function parseHash(): { route: Route; query: URLSearchParams; anchor: string | null } {
  const h = window.location.hash.replace(/^#\/?/, "");
  const [pathAndAnchor, qs] = h.split("?");
  const [path, anchorPart] = pathAndAnchor.split("@");
  // empty hash → home; known path → its screen; anything else → Persian 404
  const route: Route =
    path === "" ? "home" : (ROUTES as string[]).includes(path) ? (path as Route) : "not-found";
  return {
    route,
    query: new URLSearchParams(qs ?? ""),
    anchor: anchorPart && anchorPart.length > 0 ? anchorPart : null,
  };
}

export function navigate(route: Route, query?: Record<string, string>, anchor?: string) {
  const qs = query ? "?" + new URLSearchParams(query).toString() : "";
  const at = anchor ? `@${anchor}` : "";
  window.location.hash = `#/${route}${qs}${at}`;
}

export function useHashRoute(): {
  route: Route;
  query: URLSearchParams;
  anchor: string | null;
} {
  // SSR-safe: always start at "home", sync the real hash after mount
  // (reading location.hash during first client render causes hydration mismatch)
  const [state, setState] = useState<{
    route: Route;
    query: URLSearchParams;
    anchor: string | null;
  }>({ route: "home", query: new URLSearchParams(), anchor: null });

  useEffect(() => {
    const onChange = () => {
      const next = parseHash();
      setState(next);
      if (next.anchor) {
        // wait one paint for the screen to mount, then glide to the section
        window.setTimeout(() => {
          document
            .getElementById(next.anchor as string)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 160);
      } else {
        window.scrollTo({ top: 0 });
      }
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
