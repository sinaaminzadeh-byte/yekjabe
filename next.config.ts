import type { NextConfig } from "next";

// ── S-03 (audit wave 38): security headers on every response ──
// Each header documented below. HSTS ships ONLY in production — the sandbox
// preview runs plain http and a forced HSTS policy would poison the browser
// for that host.
const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
  // nosniff: browsers must trust our content-type (blocks MIME-confusion XSS)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // clickjacking guard. NOTE: the sandbox preview iframe loads this app from
  // a different origin — if the preview ever breaks, drop to an env-gated
  // value here; production (Coolify/Traefik) sets the same header anyway.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // cross-origin navigation referrer keeps only the origin (privacy)
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // no camera/mic; geolocation only for first-party (shipping address helper);
  // payment API delegated to the PSP's own origin
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), payment=()",
  },
  // HSTS — production only (max-age 1 year + subdomains)
  ...(isProd
    ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }]
    : []),
  // ── CSP in Report-Only mode ──
  // A full enforcing CSP breaks Next's inline bootstrap/hydration scripts,
  // so first we OBSERVE: violations are reported (console / future collector)
  // but nothing is blocked. Policy covers: self + inline/eval scripts (Next
  // hydration), inline styles (Tailwind runtime + bot-view), images from
  // self/data/https (user covers), blob: workers (Next dev), no object/frame
  // sources, base-uri + form-action locked to self.
  {
    key: "Content-Security-Policy-Report-Only",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "media-src 'self' blob:",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

// @netlify/plugin-nextjs v5 packages the server from Next's own
// `output: "standalone"` tree (.next/standalone) — it MUST stay enabled for
// Netlify builds too, otherwise the plugin falls back to copying the whole
// project root and blows through the 250MB function cap.
// Vercel is the exception: it packages the app itself and must NOT get a
// standalone tree (scripts/post-build.mjs skips there for the same reason).
const isVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  output: isVercel ? undefined : "standalone",
  // Ship the seeded SQLite db + Prisma client/engine inside the server bundle —
  // the serverless cold start copies the db to /tmp (see instrumentation.ts).
  outputFileTracingIncludes: {
    "/**": [
      "./db/**",
      "./prisma/schema.prisma",
      "./node_modules/.prisma/**",
    ],
  },
  // Netlify functions cap at 250MB unzipped. The file tracer cannot resolve
  // `process.cwd()` paths, so it over-copies sandbox dirs and build-time-only
  // packages — everything below is dead weight inside the SSR function.
  outputFileTracingExcludes: {
    "/**": [
      "./node_modules/@prisma/engines/**", // CLI/schema engines — runtime needs only .prisma query engine
      "./node_modules/typescript/**", // build-time only
      "./node_modules/@img/**", // sharp/vips — Netlify image CDN handles /_next/image
      "./node_modules/sharp/**",
      "./skills/**", // sandbox-only dirs, never part of the app
      "./extracted/**",
      "./upload/**",
      "./tool-results/**",
      "./design-ref/**",
      "./docs/**",
      "./agent-ctx/**",
      "./examples/**",
      "./mini-services/**",
      "./.zscripts/**",
      "./scripts/**",
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
