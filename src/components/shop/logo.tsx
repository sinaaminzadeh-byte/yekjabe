"use client";

// ── Pishnam logo — ported 1:1 from the design system ──
export function Logo({ size = 48, showName = true }: { size?: number; showName?: boolean }) {
  const wordSize = Math.round(size * 0.62);
  return (
    <div className="flex items-center" style={{ gap: size * 0.14 }}>
      <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label="لوگوی پیشنام">
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
          پیشنام
        </span>
      )}
    </div>
  );
}
