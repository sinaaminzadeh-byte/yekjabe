"use client";

// ── Shared SVG icons for the Pishnam app (ported from design) ──

type IP = { size?: number; className?: string };

export function HeartIcon({ size = 22, className }: IP) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 20C5 15 3 11.5 3 8.7A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 9 1.7C21 11.5 19 15 12 20z" />
    </svg>
  );
}

export function HeartSticker({ size = 34, fill = "#F0426B", stroke = "#fff", strokeWidth = 3.6 }: { size?: number; fill?: string; stroke?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="-17 -17 34 34" aria-hidden="true">
      <path
        d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PawIcon({ size = 22, fill = "#00ABE7", stroke = "#04202E", className }: { size?: number; fill?: string; stroke?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="1.4" className={className} aria-hidden="true">
      <ellipse cx="12" cy="16" rx="5.5" ry="4.2" />
      <circle cx="5.5" cy="11" r="2.3" />
      <circle cx="9.5" cy="6.5" r="2.3" />
      <circle cx="14.5" cy="6.5" r="2.3" />
      <circle cx="18.5" cy="11" r="2.3" />
    </svg>
  );
}

export function PawSticker({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11.5" fill="#fff" />
      <g fill="#04202E" transform="translate(12 12) scale(.62) translate(-12 -12)">
        <ellipse cx="12" cy="16" rx="5.5" ry="4.2" />
        <circle cx="5.5" cy="11" r="2.3" />
        <circle cx="9.5" cy="6.5" r="2.3" />
        <circle cx="14.5" cy="6.5" r="2.3" />
        <circle cx="18.5" cy="11" r="2.3" />
      </g>
    </svg>
  );
}

export function CartIcon({ size = 22, className }: IP) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.1L20 8H6" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </svg>
  );
}

export function BackIcon({ size = 22, className }: IP) {
  // RTL back arrow — points right
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function ForwardIcon({ size = 18, stroke = "#04202E", className }: { size?: number; stroke?: string; className?: string }) {
  // RTL forward arrow — points left
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function HomeIcon({ size = 26, className }: IP) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z" />
    </svg>
  );
}

export const PlusIcon = ({ size = 26, stroke = "currentColor", className }: { size?: number; stroke?: string; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" className={className} aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = ({ size = 20, stroke = "#04202E" }: { size?: number; stroke?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" aria-hidden="true">
    <path d="M6 12h12" />
  </svg>
);

export const PlusSmall = ({ size = 20, stroke = "#fff" }: { size?: number; stroke?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const GiftBoxIcon = ({ size = 26, className }: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M12 10v10M3 7h18v3H3zM12 7c-3 0-5-1-4.5-2.5S11 4 12 7zm0 0c3 0 5-1 4.5-2.5S13 4 12 7z" />
  </svg>
);

export const MailIcon = ({ size = 26, className }: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

/** User silhouette — «حساب کاربری» nav item. */
export const UserIcon = ({ size = 26, className }: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c1.8-3.6 4.6-5 8-5s6.2 1.4 8 5" />
  </svg>
);

/** Open storybook — «قصه‌ی شما» nav item (customer stories). */
export const BookIcon = ({ size = 26, className }: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 6.5C10.4 5 8 4.5 5.5 4.5c-.8 0-1.5.7-1.5 1.5v11c0 .8.7 1.5 1.5 1.5 2.5 0 4.9.5 6.5 2 1.6-1.5 4-2 6.5-2 .8 0 1.5-.7 1.5-1.5v-11c0-.8-.7-1.5-1.5-1.5C16 4.5 13.6 5 12 6.5z" />
    <path d="M12 6.5v14" />
  </svg>
);

export const PhotoIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <circle cx="9" cy="11" r="1.8" />
    <path d="M4 17l5-4 4 3 3-2 4 3" />
  </svg>
);

export const VideoIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#04202E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="6" width="13" height="12" rx="3" />
    <path d="M16 11l5-3v8l-5-3" />
  </svg>
);

export const CheckIcon = ({ size = 20, stroke = "currentColor", className }: { size?: number; stroke?: string; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

// Simple fake-QR SVG matching the design's QR style
export function QrCode({ size = 72, color = "#04202E" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 25 25" aria-hidden="true">
      <g fill={color}>
        <path fillRule="evenodd" d="M0 0h7v7H0zM1 1v5h5V1z" />
        <rect x="2" y="2" width="3" height="3" />
        <path fillRule="evenodd" transform="translate(18 0)" d="M0 0h7v7H0zM1 1v5h5V1z" />
        <rect x="20" y="2" width="3" height="3" />
        <path fillRule="evenodd" transform="translate(0 18)" d="M0 0h7v7H0zM1 1v5h5V1z" />
        <rect x="2" y="20" width="3" height="3" />
        <rect x="9" y="0" width="2" height="2" />
        <rect x="12" y="2" width="2" height="2" />
        <rect x="9" y="5" width="3" height="2" />
        <rect x="14" y="6" width="2" height="2" />
        <rect x="0" y="9" width="2" height="2" />
        <rect x="4" y="10" width="3" height="2" />
        <rect x="9" y="9" width="2" height="2" />
        <rect x="13" y="10" width="3" height="3" />
        <rect x="18" y="9" width="2" height="2" />
        <rect x="22" y="11" width="3" height="2" />
        <rect x="2" y="13" width="2" height="2" />
        <rect x="7" y="14" width="2" height="3" />
        <rect x="11" y="14" width="2" height="2" />
        <rect x="16" y="15" width="3" height="2" />
        <rect x="21" y="15" width="2" height="2" />
        <rect x="9" y="18" width="3" height="2" />
        <rect x="14" y="19" width="2" height="3" />
        <rect x="18" y="20" width="2" height="2" />
        <rect x="22" y="21" width="3" height="2" />
        <rect x="10" y="22" width="2" height="3" />
      </g>
    </svg>
  );
}
