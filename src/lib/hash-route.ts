"use client";

// ── Tiny History-API router (SEO owner-request: NO «#/» in URLs) ──
// The app is a single-route SPA: src/middleware.ts rewrites every page path
// to /, and this router reads window.location.pathname to pick the screen.
// Supports in-page anchors: `/home#friends` scrolls to element#friends after
// render. Deep links (/verify, /track?code=…) work on dev, sandbox AND Netlify
// because the middleware rewrite serves the SPA shell for every page path.
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
  | "verify"
  | "gift-view"
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
  | "design-hero" // DESIGN PROTOTYPE — easy to delete
  | "design-checkout" // DESIGN PROTOTYPE — easy to delete
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
  "verify",
  "gift-view",
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
  "design-hero", // DESIGN PROTOTYPE — easy to delete
  "design-checkout", // DESIGN PROTOTYPE — easy to delete
  "not-found",
];

/** Legacy «#/route?query@anchor» links (printed QRs, old SMS, shared chats)
 * are silently upgraded to clean paths so nothing breaks after the SEO move. */
function upgradeLegacyHash(): void {
  const h = window.location.hash;
  if (!h.startsWith("#/")) return;
  const [pathAndAnchor, qs] = h.slice(2).split("?");
  const [path, anchorPart] = pathAndAnchor.split("@");
  const clean = `/${path === "home" ? "" : path}${qs ? `?${qs}` : ""}${anchorPart ? `#${anchorPart}` : ""}`;
  history.replaceState({}, "", clean);
}

function parseLocation(): { route: Route; query: URLSearchParams; anchor: string | null } {
  upgradeLegacyHash();
  // "" or "/" → home; known path → its screen; anything else → Persian 404
  const p = window.location.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  const route: Route =
    p === "" ? "home" : (ROUTES as string[]).includes(p) ? (p as Route) : "not-found";
  const anchor = window.location.hash.length > 1 ? window.location.hash.slice(1) : null;
  return {
    route,
    query: new URLSearchParams(window.location.search),
    anchor: anchor && anchor.length > 0 ? anchor : null,
  };
}

/** Router-internal re-render event — pushState/replaceState fire no events. */
const NAV_EVENT = "pnroute:navigate";

export function navigate(route: Route, query?: Record<string, string>, anchor?: string) {
  const qs = query ? "?" + new URLSearchParams(query).toString() : "";
  const at = anchor ? `#${anchor}` : "";
  // home lives on the clean root path — no "/home" in the address bar
  const path = route === "home" ? "/" : `/${route}`;
  const url = `${path}${qs}${at}`;
  const now = window.location.pathname + window.location.search + window.location.hash;
  if (now !== url) {
    history.pushState({}, "", url);
  }
  window.dispatchEvent(new Event(NAV_EVENT));
}

export function useHashRoute(): {
  route: Route;
  query: URLSearchParams;
  anchor: string | null;
} {
  // SSR-safe: always start at "home", sync the real location after mount
  // (reading location during first client render causes hydration mismatch)
  const [state, setState] = useState<{
    route: Route;
    query: URLSearchParams;
    anchor: string | null;
  }>({ route: "home", query: new URLSearchParams(), anchor: null });

  useEffect(() => {
    const onChange = () => {
      const next = parseLocation();
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
    window.addEventListener("popstate", onChange);
    window.addEventListener(NAV_EVENT, onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener(NAV_EVENT, onChange);
    };
  }, []);

  return state;
}

export function useNav() {
  return useCallback((r: Route, q?: Record<string, string>) => navigate(r, q), []);
}
