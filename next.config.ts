import type { NextConfig } from "next";

// Security headers (guide A8). X-Frame-Options / HSTS are set at the reverse
// proxy (Coolify/Traefik) in production — the sandbox preview frames this app
// from a different origin, so a blanket XFO here would break the preview UI.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(self), microphone=(self), geolocation=()" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
