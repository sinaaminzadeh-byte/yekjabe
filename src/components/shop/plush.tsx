"use client";

// ── Plush component — 6 SVG variants ported 1:1 from the design system ──
import type { PlushKind } from "@/lib/pishnam-data";
import { plushLabel } from "@/lib/pishnam-data";

export function Plush({
  kind,
  size = 200,
  className,
}: {
  kind: PlushKind;
  size?: number;
  className?: string;
}) {
  const px = size;
  const label = plushLabel(kind);
  return (
    <div style={{ width: px, height: px }} className={className}>
      {kind === "bear" && <Bear px={px} label={label} />}
      {kind === "bunny" && <Bunny px={px} label={label} />}
      {kind === "cat" && <Cat px={px} label={label} />}
      {kind === "panda" && <Panda px={px} label={label} />}
      {kind === "sheep" && <Sheep px={px} label={label} />}
      {kind === "duck" && <Duck px={px} label={label} />}
    </div>
  );
}

const SVG_PROPS = {
  viewBox: "0 0 200 200",
  role: "img" as const,
};

function Bear({ px, label }: { px: number; label: string }) {
  return (
    <svg {...SVG_PROPS} width={px} height={px} aria-label={label}>
      <ellipse cx="100" cy="188" rx="56" ry="7" fill="#04202E" opacity=".08" />
      <g stroke="#04202E" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="56" cy="50" r="21" fill="#F4C9A1" />
        <circle cx="56" cy="50" r="10" fill="#FF9DB8" stroke="none" />
        <circle cx="144" cy="50" r="21" fill="#F4C9A1" />
        <circle cx="144" cy="50" r="10" fill="#FF9DB8" stroke="none" />
        <ellipse cx="72" cy="176" rx="17" ry="12" fill="#F4C9A1" />
        <ellipse cx="128" cy="176" rx="17" ry="12" fill="#F4C9A1" />
        <ellipse cx="100" cy="140" rx="48" ry="44" fill="#F4C9A1" />
        <ellipse cx="100" cy="148" rx="29" ry="28" fill="#FFE8D1" stroke="none" />
        <path
          transform="translate(100 150)"
          d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z"
          fill="#00ABE7"
          strokeWidth="3"
        />
        <ellipse cx="54" cy="136" rx="13" ry="18" fill="#F4C9A1" transform="rotate(20 54 136)" />
        <ellipse cx="146" cy="136" rx="13" ry="18" fill="#F4C9A1" transform="rotate(-20 146 136)" />
        <ellipse cx="100" cy="84" rx="56" ry="46" fill="#F4C9A1" />
        <ellipse cx="100" cy="98" rx="21" ry="16" fill="#FFE8D1" />
        <ellipse cx="100" cy="91" rx="7" ry="5" fill="#04202E" stroke="none" />
        <path d="M100 96v5M92 104q8 6 16 0" fill="none" />
      </g>
      <circle cx="76" cy="80" r="5.5" fill="#04202E" />
      <circle cx="124" cy="80" r="5.5" fill="#04202E" />
      <circle cx="78" cy="78" r="1.8" fill="#fff" />
      <circle cx="126" cy="78" r="1.8" fill="#fff" />
      <circle cx="64" cy="98" r="8" fill="#FF9DB8" opacity=".75" />
      <circle cx="136" cy="98" r="8" fill="#FF9DB8" opacity=".75" />
    </svg>
  );
}

function Bunny({ px, label }: { px: number; label: string }) {
  return (
    <svg {...SVG_PROPS} width={px} height={px} aria-label={label}>
      <ellipse cx="100" cy="188" rx="52" ry="7" fill="#04202E" opacity=".08" />
      <g stroke="#04202E" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="72" cy="38" rx="15" ry="36" fill="#FDF1EE" transform="rotate(-8 72 38)" />
        <ellipse cx="72" cy="40" rx="7" ry="24" fill="#FFB3C6" stroke="none" transform="rotate(-8 72 40)" />
        <ellipse cx="128" cy="38" rx="15" ry="36" fill="#FDF1EE" transform="rotate(8 128 38)" />
        <ellipse cx="128" cy="40" rx="7" ry="24" fill="#FFB3C6" stroke="none" transform="rotate(8 128 40)" />
        <ellipse cx="74" cy="178" rx="17" ry="11" fill="#FDF1EE" />
        <ellipse cx="126" cy="178" rx="17" ry="11" fill="#FDF1EE" />
        <ellipse cx="100" cy="150" rx="42" ry="36" fill="#FDF1EE" />
        <path
          transform="translate(100 152) scale(.9)"
          d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z"
          fill="#00ABE7"
          strokeWidth="3.4"
        />
        <ellipse cx="60" cy="148" rx="11" ry="17" fill="#FDF1EE" transform="rotate(18 60 148)" />
        <ellipse cx="140" cy="148" rx="11" ry="17" fill="#FDF1EE" transform="rotate(-18 140 148)" />
        <ellipse cx="100" cy="100" rx="54" ry="42" fill="#FDF1EE" />
        <path d="M94 99h12l-6 6z" fill="#FF8FB1" />
        <path d="M100 105v4M92 112q8 5 16 0" fill="none" />
      </g>
      <circle cx="76" cy="92" r="5.5" fill="#04202E" />
      <circle cx="124" cy="92" r="5.5" fill="#04202E" />
      <circle cx="78" cy="90" r="1.8" fill="#fff" />
      <circle cx="126" cy="90" r="1.8" fill="#fff" />
      <circle cx="63" cy="108" r="8" fill="#FF9DB8" opacity=".75" />
      <circle cx="137" cy="108" r="8" fill="#FF9DB8" opacity=".75" />
    </svg>
  );
}

function Cat({ px, label }: { px: number; label: string }) {
  return (
    <svg {...SVG_PROPS} width={px} height={px} aria-label={label}>
      <ellipse cx="100" cy="188" rx="56" ry="7" fill="#04202E" opacity=".08" />
      <g stroke="#04202E" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M146 156c30-4 36-34 16-46" fill="none" strokeWidth="17" />
        <path d="M146 156c30-4 36-34 16-46" fill="none" stroke="#D9CCF5" strokeWidth="10" />
        <path d="M50 68L54 24L90 46Z" fill="#D9CCF5" />
        <path d="M58 56L60 36L76 47Z" fill="#FFB3C6" stroke="none" />
        <path d="M150 68L146 24L110 46Z" fill="#D9CCF5" />
        <path d="M142 56L140 36L124 47Z" fill="#FFB3C6" stroke="none" />
        <ellipse cx="74" cy="178" rx="17" ry="11" fill="#D9CCF5" />
        <ellipse cx="126" cy="178" rx="17" ry="11" fill="#D9CCF5" />
        <ellipse cx="100" cy="142" rx="44" ry="40" fill="#D9CCF5" />
        <ellipse cx="100" cy="150" rx="26" ry="26" fill="#F1EBFC" stroke="none" />
        <path
          transform="translate(100 152)"
          d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z"
          fill="#00ABE7"
          strokeWidth="3"
        />
        <ellipse cx="58" cy="140" rx="12" ry="17" fill="#D9CCF5" transform="rotate(18 58 140)" />
        <ellipse cx="142" cy="140" rx="12" ry="17" fill="#D9CCF5" transform="rotate(-18 142 140)" />
        <ellipse cx="100" cy="90" rx="56" ry="44" fill="#D9CCF5" />
        <path d="M100 48v12M84 50l3 11M116 50l-3 11" fill="none" />
        <path d="M95 96h10l-5 6z" fill="#FF8FB1" />
        <path d="M100 102q-8 9-16 4M100 102q8 9 16 4" fill="none" />
        <path d="M56 100h-16M57 108l-15 5M144 100h16M143 108l15 5" fill="none" strokeWidth="2.5" />
      </g>
      <circle cx="76" cy="86" r="5.5" fill="#04202E" />
      <circle cx="124" cy="86" r="5.5" fill="#04202E" />
      <circle cx="78" cy="84" r="1.8" fill="#fff" />
      <circle cx="126" cy="84" r="1.8" fill="#fff" />
      <circle cx="66" cy="102" r="7.5" fill="#FF9DB8" opacity=".75" />
      <circle cx="134" cy="102" r="7.5" fill="#FF9DB8" opacity=".75" />
    </svg>
  );
}

function Panda({ px, label }: { px: number; label: string }) {
  return (
    <svg {...SVG_PROPS} width={px} height={px} aria-label={label}>
      <ellipse cx="100" cy="188" rx="56" ry="7" fill="#04202E" opacity=".08" />
      <g stroke="#04202E" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="54" cy="50" r="21" fill="#04202E" />
        <circle cx="146" cy="50" r="21" fill="#04202E" />
        <ellipse cx="72" cy="176" rx="17" ry="12" fill="#04202E" />
        <ellipse cx="128" cy="176" rx="17" ry="12" fill="#04202E" />
        <ellipse cx="100" cy="142" rx="48" ry="44" fill="#FFFFFF" />
        <path
          transform="translate(100 150)"
          d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z"
          fill="#00ABE7"
          strokeWidth="3"
        />
        <ellipse cx="54" cy="138" rx="13" ry="18" fill="#04202E" transform="rotate(20 54 138)" />
        <ellipse cx="146" cy="138" rx="13" ry="18" fill="#04202E" transform="rotate(-20 146 138)" />
        <ellipse cx="100" cy="86" rx="56" ry="46" fill="#FFFFFF" />
        <ellipse cx="76" cy="84" rx="13" ry="16" fill="#04202E" transform="rotate(-20 76 84)" />
        <ellipse cx="124" cy="84" rx="13" ry="16" fill="#04202E" transform="rotate(20 124 84)" />
        <ellipse cx="100" cy="99" rx="7" ry="5" fill="#04202E" />
        <path d="M100 104q-6 8-12 3M100 104q6 8 12 3" fill="none" />
      </g>
      <circle cx="77" cy="83" r="5" fill="#fff" />
      <circle cx="123" cy="83" r="5" fill="#fff" />
      <circle cx="78" cy="84" r="2.4" fill="#04202E" />
      <circle cx="122" cy="84" r="2.4" fill="#04202E" />
      <circle cx="62" cy="106" r="8" fill="#FF9DB8" opacity=".8" />
      <circle cx="138" cy="106" r="8" fill="#FF9DB8" opacity=".8" />
    </svg>
  );
}

function Sheep({ px, label }: { px: number; label: string }) {
  return (
    <svg {...SVG_PROPS} width={px} height={px} aria-label={label}>
      <ellipse cx="100" cy="188" rx="56" ry="7" fill="#04202E" opacity=".08" />
      <g stroke="#04202E" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <rect x="70" y="164" width="14" height="22" rx="7" fill="#04202E" />
        <rect x="116" y="164" width="14" height="22" rx="7" fill="#04202E" />
        <circle cx="62" cy="138" r="26" fill="#fff" />
        <circle cx="138" cy="138" r="26" fill="#fff" />
        <circle cx="100" cy="150" r="30" fill="#fff" />
        <circle cx="100" cy="126" r="32" fill="#fff" />
      </g>
      <g fill="#fff">
        <circle cx="62" cy="138" r="24" />
        <circle cx="138" cy="138" r="24" />
        <circle cx="100" cy="150" r="28" />
        <circle cx="100" cy="126" r="30" />
      </g>
      <g stroke="#04202E" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <path
          transform="translate(100 152)"
          d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z"
          fill="#00ABE7"
          strokeWidth="3"
        />
        <ellipse cx="54" cy="92" rx="17" ry="9" fill="#F4D3BF" transform="rotate(-25 54 92)" />
        <ellipse cx="146" cy="92" rx="17" ry="9" fill="#F4D3BF" transform="rotate(25 146 92)" />
        <ellipse cx="100" cy="92" rx="40" ry="36" fill="#F4D3BF" />
        <circle cx="78" cy="58" r="17" fill="#fff" />
        <circle cx="100" cy="52" r="18" fill="#fff" />
        <circle cx="122" cy="58" r="17" fill="#fff" />
      </g>
      <g fill="#fff">
        <circle cx="78" cy="58" r="15" />
        <circle cx="100" cy="52" r="16" />
        <circle cx="122" cy="58" r="15" />
      </g>
      <path
        d="M95 100h10l-5 5zM100 105v3M92 111q8 5 16 0"
        fill="#04202E"
        stroke="#04202E"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="82" cy="90" r="5" fill="#04202E" />
      <circle cx="118" cy="90" r="5" fill="#04202E" />
      <circle cx="84" cy="88" r="1.7" fill="#fff" />
      <circle cx="120" cy="88" r="1.7" fill="#fff" />
      <circle cx="72" cy="102" r="7" fill="#FF9DB8" opacity=".8" />
      <circle cx="128" cy="102" r="7" fill="#FF9DB8" opacity=".8" />
    </svg>
  );
}

function Duck({ px, label }: { px: number; label: string }) {
  return (
    <svg {...SVG_PROPS} width={px} height={px} aria-label={label}>
      <ellipse cx="100" cy="188" rx="56" ry="7" fill="#04202E" opacity=".08" />
      <g stroke="#04202E" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="74" cy="182" rx="17" ry="7" fill="#FF9F5A" />
        <ellipse cx="126" cy="182" rx="17" ry="7" fill="#FF9F5A" />
        <ellipse cx="100" cy="142" rx="50" ry="42" fill="#FFE08A" />
        <ellipse cx="100" cy="150" rx="28" ry="26" fill="#FFF0BE" stroke="none" />
        <path
          transform="translate(100 152)"
          d="M0 12C-10 5-15 0-15-5a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 5-5 10-15 17z"
          fill="#00ABE7"
          strokeWidth="3"
        />
        <ellipse cx="52" cy="140" rx="12" ry="19" fill="#FFE08A" transform="rotate(22 52 140)" />
        <ellipse cx="148" cy="140" rx="12" ry="19" fill="#FFE08A" transform="rotate(-22 148 140)" />
        <circle cx="100" cy="84" r="48" fill="#FFE08A" />
        <path d="M94 38q4-16 14-8" fill="none" />
        <ellipse cx="100" cy="98" rx="21" ry="12" fill="#FF9F5A" />
        <path d="M82 98h36" fill="none" strokeWidth="2.5" />
      </g>
      <circle cx="76" cy="80" r="5.5" fill="#04202E" />
      <circle cx="124" cy="80" r="5.5" fill="#04202E" />
      <circle cx="78" cy="78" r="1.8" fill="#fff" />
      <circle cx="126" cy="78" r="1.8" fill="#fff" />
      <circle cx="62" cy="98" r="8" fill="#FF9DB8" opacity=".75" />
      <circle cx="138" cy="98" r="8" fill="#FF9DB8" opacity=".75" />
    </svg>
  );
}
