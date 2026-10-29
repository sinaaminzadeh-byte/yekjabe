// ── proxy.ts — single-shell rewrite + dynamic rendering for bots (audit wave 38) ──
// 1) HUMANS: every page-like path (/verify, /track?code=…, /admin, /blog/…) is
//    rewritten to / so the SPA shell renders and src/lib/hash-route.ts picks
//    the screen from location.pathname (client-only — zero bundle changes).
// 2) CRAWLERS/SOCIAL BOTS (A-01/SEO-01..11): the SPA server HTML is an empty
//    div, so bots get a rewrite to /bot-view<path> instead — a route handler
//    that renders complete static HTML (meta + JSON-LD + visible content)
//    straight from the DB. Google's supported "dynamic rendering" pattern.
// 3) LEGACY /post URLs (SEO-10): /post and /post?slug=x are permanently 301'd
//    to /blog and /blog/<slug> — for humans AND bots alike, so the old URL's
//    ranking signals consolidate onto the clean path.
// API routes, Next internals and files with extensions are left untouched.
// (Next.js 16: the old middleware.ts convention was renamed to proxy.ts.)
import { NextResponse, type NextRequest } from "next/server";

/** Crawler / social-bot UA fragments — matched case-insensitively. */
const BOT_UA_PARTS = [
  "Googlebot", // Google (incl. Googlebot-Image/News via substring)
  "Google-InspectionTool", // Search Console live test
  "Bingbot",
  "DuckDuckBot",
  "YandexBot",
  "Baiduspider",
  "facebookexternalhit", // Facebook/WhatsApp link unfurler (meta crawler)
  "Twitterbot",
  "TelegramBot",
  "WhatsApp", // older WhatsApp preview agents
  "Slackbot", // incl. Slackbot-ImgExp
  "LinkedInBot",
  "Pinterestbot",
  "vkShare",
  "embedly",
  "Discordbot",
  "Applebot",
];

const BOT_UA_RE = new RegExp(BOT_UA_PARTS.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "i");

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const search = req.nextUrl.search;

  // defense in depth: never re-enter the bot renderer itself
  if (pathname === "/bot-view" || pathname.startsWith("/bot-view/")) {
    return NextResponse.next();
  }

  // ── legacy /post URLs → clean /blog paths (301 permanent, SEO-10) ──
  // Runs BEFORE the bot split so crawler signals consolidate on /blog/<slug>.
  if (pathname === "/post" || pathname.startsWith("/post/")) {
    const slug = req.nextUrl.searchParams.get("slug");
    const target = slug
      ? `/blog/${encodeURIComponent(slug.trim()).slice(0, 120)}`
      : "/blog";
    return NextResponse.redirect(new URL(target, req.url), 301);
  }

  // ── dynamic rendering: bots → fully server-rendered HTML ──
  if (BOT_UA_RE.test(req.headers.get("user-agent") ?? "")) {
    // keep the original path + query so the renderer sees ?slug=… intact
    // (home keeps the bare /bot-view — the optional catch-all serves it)
    const rest = pathname === "/" ? "" : pathname;
    return NextResponse.rewrite(new URL(`/bot-view${rest}${search}`, req.url));
  }

  // ── humans: the untouched SPA shell ──
  if (pathname === "/") return NextResponse.next();
  return NextResponse.rewrite(new URL("/", req.url));
}

export const config = {
  // exclude: /api/*, the bot renderer, /_next/* internals, and any path with
  // a file extension (bot-view stays matcher-excluded so direct hits reach
  // the handler; rewrites from here bypass the matcher either way)
  matcher: ["/((?!api|bot-view|_next/static|_next/image|_next/webpack-hmr|favicon.ico|robots.txt|sitemap.xml|[^?]*\\.[\\w]+$).*)"],
};
