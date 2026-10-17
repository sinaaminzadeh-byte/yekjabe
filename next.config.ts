import type { NextConfig } from "next";

// Security headers (guide A8). X-Frame-Options / HSTS are set at the reverse
// proxy (Coolify/Traefik) in production — the sandbox preview frames this app
// from a different origin, so a blanket XFO here would break the preview UI.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(self), microphone=(self), geolocation=()" },
];

// @netlify/plugin-nextjs v5 packages the server from Next's own
// `output: "standalone"` tree (.next/standalone) — it MUST stay enabled for
// Netlify builds too, otherwise the plugin falls back to copying the whole
// project root and blows through the 250MB function cap.
const nextConfig: NextConfig = {
  output: "standalone",
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
