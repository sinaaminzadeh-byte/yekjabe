"use client";

// ── admin-ui — shared bits for every admin tab (A-02 split, round 35) ──
// Status label maps, chip/stat/spinner primitives and the plush resolver that
// used to live inside the 3500-line admin monolith. Tabs import from here so
// each tab file stays focused on its own screen.

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { PLUSH_MAP, type PlushKind } from "@/lib/pishnam-data";

// ── order status chips (the 11-state machine, Persian) ──
export const STATUS_LABEL: Record<string, { label: string; bg: string }> = {
  awaiting_payment: { label: "در انتظار پرداخت", bg: "#F0F3F5" },
  payment_under_review: { label: "رسید در بررسی", bg: "#FFF3C9" },
  paid: { label: "پرداخت شد", bg: "#FFF3C9" },
  preparing: { label: "بسته‌بندی", bg: "#FFE0EA" },
  shipped: { label: "در راه", bg: "#CDEFFB" },
  delivered: { label: "تحویل شد", bg: "#D7F5E4" },
  failed: { label: "پرداخت ناموفق", bg: "#FFE9F0" },
  cancelled: { label: "لغو شد", bg: "#FFE9F0" },
  expired: { label: "منقضی شد", bg: "#F0F3F5" },
  refund_requested: { label: "درخواست مرجوعی", bg: "#E7E0FA" },
  refunded: { label: "مرجوع شد", bg: "#E7E0FA" },
};

export const NEXT_ACTION: Record<string, string> = {
  paid: "شروع بسته‌بندی",
  preparing: "تحویل به پست",
  shipped: "تحویل داده شد",
  delivered: "",
};

// ── payment attempt statuses (UX-11) — Persian everywhere in the panel ──
export const PAYMENT_STATUS_LABEL: Record<string, { label: string; bg: string; fg: string }> = {
  initiated: { label: "شروع شده", bg: "#F0F3F5", fg: "#4A6572" },
  pending_review: { label: "در انتظار بررسی", bg: "#FFF3C9", fg: "#8A6D1F" },
  verified: { label: "تأیید شد", bg: "#D7F5E4", fg: "#2E7D53" },
  rejected: { label: "رد شد", bg: "#FFE9F0", fg: "#B02A52" },
  failed: { label: "ناموفق", bg: "#FFE9F0", fg: "#B02A52" },
};

export const EVENT_LABEL: Record<string, string> = {
  created: "سفارش ساخته شد",
  status_changed: "تغییر وضعیت",
  payment: "پرداخت",
  gift_opened: "کارت هدیه باز شد",
  note: "یادداشت",
  sms: "پیامک",
};

export function plushOf(kind: string): PlushKind {
  return (PLUSH_MAP[kind as PlushKind] ? kind : "bear") as PlushKind;
}

/** «۰۹۱۲…» → "0912…" — inputs that must reach the server as ASCII digits. */
export function toEnDigits(s: string): string {
  return s.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

export function StatusChip({ s }: { s: string }) {
  const meta = STATUS_LABEL[s] ?? STATUS_LABEL.awaiting_payment;
  return (
    <span
      className="inline-block shrink-0 rounded-[10px] px-2.5 py-1 text-[11.5px] font-extrabold"
      style={{ background: meta.bg }}
    >
      {meta.label}
    </span>
  );
}

export function PaymentStatusChip({ s }: { s: string }) {
  const meta = PAYMENT_STATUS_LABEL[s] ?? PAYMENT_STATUS_LABEL.initiated;
  return (
    <span
      className="inline-block shrink-0 rounded-[10px] px-2.5 py-1 text-[11px] font-extrabold"
      style={{ background: meta.bg, color: meta.fg }}
    >
      {meta.label}
    </span>
  );
}

export function StatCard({ n, label, bg }: { n: string; label: string; bg: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-[20px] border border-[#DDEEF5] p-4" style={{ background: bg }}>
      <span className="text-[22px] font-black leading-none">{n}</span>
      <span className="text-[12.5px] font-bold text-[#4A6572]">{label}</span>
    </div>
  );
}

export function GallerySpinner({ size = 20 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block animate-spin rounded-full border-2 border-[#00ABE7] border-t-transparent"
      style={{ width: size, height: size }}
    />
  );
}

export const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" rx="20" fill="#F2FAFD"/><text x="48" y="60" font-size="40" text-anchor="middle">🎁</text></svg>`,
  );

/**
 * UX-04 — receipt lightbox used by رسیدها / تمدید / سفارش‌ها tabs.
 * Fetches the (admin-only) receipt URL as a blob and renders it INLINE in the
 * panel instead of a new tab that downloads. A missing file shows a friendly
 * Persian message, never raw JSON. دانلود uses the ?download=1 variant.
 */
export function ReceiptPreview({ src, onClose }: { src: string; onClose: () => void }) {
  const [url, setUrl] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "missing">("loading");
  // reset synchronously during render when a new receipt is opened (no setState
  // inside the effect — react-hooks/set-state-in-effect)
  const [prevSrc, setPrevSrc] = useState(src);
  if (prevSrc !== src) {
    setPrevSrc(src);
    setState("loading");
    setUrl(null);
  }

  useEffect(() => {
    let alive = true;
    let objectUrl: string | null = null;
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.blob();
      })
      .then((blob) => {
        if (!alive) return;
        objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
        setState("ok");
      })
      .catch(() => {
        if (alive) setState("missing");
      });
    return () => {
      alive = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#04202E]/60 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-label="پیش‌نمایش رسید">
      <div className="flex max-h-[92vh] w-full max-w-[560px] flex-col gap-3 rounded-[24px] bg-white p-4 shadow-[0_24px_60px_rgba(4,32,46,0.3)]">
        <div className="flex items-center justify-between">
          <h4 className="m-0 text-[14px] font-black text-[#04202E]">رسید کارت‌به‌کارت</h4>
          <span className="flex items-center gap-2">
            {state === "ok" && (
              <a
                href={`${src}${src.includes("?") ? "&" : "?"}download=1`}
                className="flex h-9 items-center rounded-full bg-[#E3F6FD] px-4 text-[12px] font-extrabold text-[#006387] hover:bg-[#D6F1FB]"
              >
                دانلود رسید ⤓
              </a>
            )}
            <button type="button" onClick={onClose} aria-label="بستن" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]">
              ✕
            </button>
          </span>
        </div>
        <div className="flex min-h-[240px] flex-1 items-center justify-center overflow-auto rounded-[16px] bg-[#F5FBFD] p-2">
          {state === "loading" && <GallerySpinner size={26} />}
          {state === "ok" && url && (
            <img src={url} alt="رسید واریز" className="max-h-[70vh] w-auto max-w-full rounded-[12px]" />
          )}
          {state === "missing" && (
            <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
              <span className="text-[36px]">🧾</span>
              <p className="m-0 text-[13.5px] font-black text-[#B03A5B]">رسید یافت نشد…</p>
              <p className="m-0 max-w-[340px] text-[12px] font-semibold leading-[1.9] text-[#4A6572]">
                فایل رسید روی سرور نیست (حذف شده یا آپلود ناقص). از مشتری بخواه دوباره بفرستد یا رسید را دستی چک کن.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * UX-03 — destructive actions (لغو سفارش، رد رسید، تأیید مرجوعی…) must not fire
 * on a single accidental click. Two-step inline confirm in the panel's own
 * visual language: first click arms it, second click (within 6s) executes.
 */
export function ConfirmButton({
  onConfirm,
  children,
  confirmTitle = "مطمئنی؟",
  confirmLabel = "بله، انجام بده",
  disabled,
  className,
  style,
  busy,
}: {
  onConfirm: () => void;
  children: ReactNode;
  confirmTitle?: string;
  confirmLabel?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  busy?: boolean;
}) {
  const [armed, setArmed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const arm = () => {
    setArmed(true);
    timer.current = setTimeout(() => setArmed(false), 6000);
  };

  if (!armed) {
    return (
      <button type="button" disabled={disabled || busy} onClick={arm} className={className} style={style}>
        {children}
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7FA] px-2 py-1.5">
      <span className="text-[11px] font-black text-[#B02A52]">{confirmTitle}</span>
      <button
        type="button"
        disabled={busy}
        onClick={() => {
          setArmed(false);
          onConfirm();
        }}
        className="flex h-8 items-center rounded-full bg-[#B02A52] px-3 text-[11.5px] font-extrabold text-white transition-transform active:scale-95 disabled:opacity-60"
      >
        {busy ? "…" : confirmLabel}
      </button>
      <button
        type="button"
        onClick={() => setArmed(false)}
        className="flex h-8 items-center rounded-full border border-[#CFE6EF] bg-white px-3 text-[11.5px] font-extrabold text-[#4A6572]"
      >
        بی‌خیال
      </button>
    </span>
  );
}
