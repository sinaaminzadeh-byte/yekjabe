"use client";

// ── Site logo (round 34) ──
// Default: the hand-drawn SVG mark + Persian wordmark.
// When the owner uploads a logo in admin «تنظیمات» (Setting site_logo), the
// uploaded image REPLACES mark+wordmark entirely (owner request: uploaded logo
// = no fallback text). State is module-cached + shared across every <Logo/>
// instance; the admin uploader calls refreshBranding() for an instant swap.
import { useEffect, useState } from "react";

export type BrandingState = { logoUrl: string | null };

let cached: BrandingState | null = null;
let pending: Promise<BrandingState> | null = null;
const subs = new Set<(s: BrandingState) => void>();

async function loadBranding(): Promise<BrandingState> {
  if (cached) return cached;
  pending ??= fetch("/api/branding", { cache: "no-store" })
    .then((r) => r.json())
    .then((j: unknown) => {
      const logoUrl = typeof (j as { logoUrl?: unknown })?.logoUrl === "string" ? (j as { logoUrl: string }).logoUrl : null;
      cached = { logoUrl };
      return cached;
    })
    .catch(() => {
      cached = { logoUrl: null };
      return cached;
    })
    .finally(() => {
      pending = null;
    });
  return pending;
}

/** Admin uploader hook: push the new state to every mounted <Logo/>. */
export function refreshBranding(next: BrandingState) {
  cached = next;
  subs.forEach((fn) => fn(next));
}

export function Logo({ size = 48, showName = true }: { size?: number; showName?: boolean }) {
  const [branding, setBranding] = useState<BrandingState | null>(cached);

  useEffect(() => {
    let alive = true;
    const fn = (s: BrandingState) => {
      if (alive) setBranding(s);
    };
    subs.add(fn);
    void loadBranding().then((s) => {
      if (alive) setBranding(s);
    });
    return () => {
      alive = false;
      subs.delete(fn);
    };
  }, []);

  // uploaded logo → image only (no wordmark, per owner request)
  if (branding?.logoUrl) {
    return (
      <img
        src={branding.logoUrl}
        alt="لوگوی جعبه آبی"
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: "contain" }}
        className="rounded-[18px]"
      />
    );
  }

  const wordSize = Math.round(size * 0.62);
  return (
    <div className="flex items-center" style={{ gap: size * 0.14 }}>
      <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label="لوگوی جعبه آبی">
        <rect x="2" y="2" width="60" height="60" rx="18" fill="#00ABE7" />
        <path
          d="M32 51C17 41 10 33 10 26a11 11 0 0 1 22-3 11 11 0 0 1 22 3c0 7-7 15-22 25z"
          fill="#FFFFFF"
          stroke="#04202E"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <ellipse
          cx="24.5"
          cy="20.5"
          rx="8.5"
          ry="4.8"
          transform="rotate(-24 24.5 20.5)"
          fill="#00ABE7"
          stroke="#04202E"
          strokeWidth="2.6"
        />
        <ellipse
          cx="39.5"
          cy="20.5"
          rx="8.5"
          ry="4.8"
          transform="rotate(24 39.5 20.5)"
          fill="#00ABE7"
          stroke="#04202E"
          strokeWidth="2.6"
        />
        <circle cx="32" cy="23" r="3.4" fill="#04202E" />
      </svg>
      {showName && (
        <span
          className="font-black text-[#04202E]"
          style={{ fontSize: wordSize, lineHeight: 1 }}
        >
          جعبه آبی
        </span>
      )}
    </div>
  );
}
