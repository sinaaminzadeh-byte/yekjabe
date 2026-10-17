// ── proxy.ts — single-shell rewrite (SEO: real paths, no «#/») ──
// The app is one SPA screen (src/app/page.tsx). Every page-like path
// (/verify, /track?code=…, /admin, /blog…) is rewritten to / so the shell
// renders and src/lib/hash-route.ts picks the screen from location.pathname.
// API routes, Next internals and files with extensions are left untouched.
// (Next.js 16: the old middleware.ts convention was renamed to proxy.ts.)
import { NextResponse, type NextRequest } from "next/server";

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/") return NextResponse.next();
  return NextResponse.rewrite(new URL("/", req.url));
}

export const config = {
  // exclude: /api/*, /_next/* internals, and any path with a file extension
  matcher: ["/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|robots.txt|sitemap.xml|[^?]*\\.[\\w]+$).*)"],
};
