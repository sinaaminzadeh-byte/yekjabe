"use client";

// ── «سفارش‌ها» tab (A-02 split + Wave-2 UX) — order list + detail modal ──
// UX-06/P-05: shared client cache (adminFetch) + 60s auto-refresh paused when
// the tab is hidden. UX-07/A-10: server-side pagination + search + full status
// chip row. UX-01: real media gallery for gift attachments (streams through
// the admin branch of /api/gifts/media). UX-02: details button always visible.
// UX-03: destructive transitions (لغو/مرجوع) need a confirm. UX-08: retention
// deadline rendered in the modal. UX-11: Persian payment-status labels.
// UX-16: mobile sticky action bar; backdrop tap no longer closes the modal.
// Wave 38: UX-05 (jump to the receipts queue scoped to this order), UX-12
// (post tracking code input saved via PATCH), UX-13 (hasMedia filter fed by
// the dashboard KPI), UX-14 (status filter fed by the dashboard donut),
// A-12 («داده دمو» chip on seeded rows), A-14 (stable React keys).
import { useEffect, useMemo, useState } from "react";
import { fa, money } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";
import { ForwardIcon } from "@/components/shop/icons";
import { TRANSITIONS, STEP_LABELS, type OrderStatus } from "@/lib/orders/status";
import { jalaliDate, jalaliDateTime } from "@/components/shop/admin/admin-shared";
import { adminFetch, invalidateAdminCache } from "@/components/shop/admin/admin-cache";
import { requestFocus, type FocusRequest } from "@/components/shop/admin/admin-focus";
import {
  ConfirmButton,
  EVENT_LABEL,
  PAYMENT_STATUS_LABEL,
  ReceiptPreview,
  STATUS_LABEL,
  StatusChip,
  StatCard,
} from "@/components/shop/admin/admin-ui";

// ── server shapes ──
interface AdminOrder {
  id: string;
  code: string;
  status: string;
  paymentMethod: string;
  recipientName: string;
  recipientPhone: string;
  ordererName: string;
  ordererPhone: string;
  province: string;
  city: string;
  totalToman: number;
  items: string[];
  payment: { method: string; status: string; attemptNo: number } | null;
  giftOpened: boolean;
  createdAt: string;
  expiresAt: string;
  // new-flow (owner round 30): استودیو رسانه + نگهداری پیام + نمایش فرستنده
  mediaCount?: number;
  retentionPlan?: string;
  senderDisplay?: string;
  senderPhrase?: string;
}

interface OrdersResponse {
  orders: AdminOrder[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  stats: { count: number; revenue: number; pendingReview: number; delivered: number };
}

// UX-07/A-10 — the full 11-state row, not just the "happy path" chips
const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "همه" },
  { key: "awaiting_payment", label: "در انتظار پرداخت" },
  { key: "payment_under_review", label: "رسید در بررسی" },
  { key: "paid", label: "پرداخت شد" },
  { key: "preparing", label: "بسته‌بندی" },
  { key: "shipped", label: "در راه" },
  { key: "delivered", label: "تحویل شد" },
  { key: "failed", label: "ناموفق" },
  { key: "cancelled", label: "لغو شد" },
  { key: "expired", label: "منقضی شد" },
  { key: "refund_requested", label: "درخواست مرجوعی" },
  { key: "refunded", label: "مرجوع شد" },
];

/** transitions that must not fire on one click (UX-03) */
const NEEDS_CONFIRM: OrderStatus[] = ["cancelled", "refunded", "refund_requested"];

/** A-12 — seeded demo rows are labeled so the owner never mistakes them for real sales */
const isDemoCode = (code: string): boolean => code.startsWith("PN-DEMO");

/** UX-12 — the postal tracking input appears from «تحویل به پست» onward */
const TRACKING_STATUSES = new Set(["shipped", "delivered", "refund_requested", "refunded"]);

const ACTION_LABEL: Record<string, string> = {
  preparing: "شروع بسته‌بندی",
  shipped: "تحویل به پست",
  delivered: "تحویل داده شد",
  paid: "تأیید پرداخت",
  cancelled: "لغو سفارش",
  awaiting_payment: "بازگشت به انتظار پرداخت",
  refunded: "تأیید مرجوعی",
  refund_requested: "ثبت درخواست مرجوعی",
};

// ── UX-01 helpers: client-side kind/urls for private gift media ──
function mediaKindOf(key: string): "image" | "video" | "audio" {
  const ext = key.split(".").pop() ?? "";
  if (ext === "jpg" || ext === "png" || ext === "webp") return "image";
  if (ext === "mp3" || ext === "wav" || ext === "ogg" || ext === "m4a") return "audio";
  return "video";
}
// streams through the admin-authorized route (key is validated against the
// order's own stored list server-side); works for every stored key format
const mediaUrl = (orderId: string, key: string) => `/api/admin/orders/${orderId}/media?key=${encodeURIComponent(key)}`;
const MEDIA_KIND_FA = { image: "عکس", video: "ویدیو", audio: "ویس" } as const;

export function OrdersTab({ focus }: { focus?: FocusRequest | null }) {
  const [data, setData] = useState<OrdersResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("all");
  const [hasMedia, setHasMedia] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [qInput, setQInput] = useState("");
  const [q, setQ] = useState(""); // debounced — drives the server search
  const { toast } = useToast();

  // UX-13/14 — a dashboard KPI / donut slice jumps here with prefilled filters.
  // Applied with the React-documented «adjust state when a prop changes»
  // pattern (setState during render, batched) — no effect cascades.
  const [lastSeq, setLastSeq] = useState<number | null>(null);
  if (focus && focus.tab === "orders" && focus.seq !== lastSeq) {
    setLastSeq(focus.seq);
    setStatus(typeof focus.status === "string" ? focus.status : "all");
    setHasMedia(Boolean(focus.hasMedia));
    if (focus.orderCode) {
      setQInput(focus.orderCode);
      setQ(focus.orderCode);
    }
    setPage(1);
  }

  const url = useMemo(() => {
    const sp = new URLSearchParams({ page: String(page), pageSize: "20" });
    if (status !== "all") sp.set("status", status);
    if (hasMedia) sp.set("hasMedia", "1");
    if (q.trim()) sp.set("q", q.trim());
    return `/api/admin/orders?${sp.toString()}`;
  }, [page, status, hasMedia, q]);

  const load = (silent = false, fresh = false) => {
    if (!silent) setRefreshing(true);
    adminFetch<OrdersResponse>(url, { fresh })
      .then((j) => {
        setData(j);
        setPages(j.pages ?? 1);
        setTotal(j.total ?? (j.orders?.length ?? 0));
        setError(null);
      })
      .catch(() => setError("اتصال به سرور برقرار نشد. دوباره تلاش کن."))
      .finally(() => setRefreshing(false));
  };

  // deferred first paint + refetch whenever the query changes
  useEffect(() => {
    const t = setTimeout(() => load(true), 0);
    return () => clearTimeout(t);
  }, [url]);

  // debounced search box → server-side q
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setQ(qInput);
    }, 250);
    return () => clearTimeout(t);
  }, [qInput]);

  // UX-06/P-05 — slow auto-refresh every 60s, paused while the tab is hidden
  useEffect(() => {
    const iv = setInterval(() => {
      if (document.visibilityState === "visible") load(true, true);
    }, 60_000);
    return () => clearInterval(iv);
  }, [url]);

  const transition = async (o: { id: string; code: string }, to: OrderStatus, tracking?: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${o.id}/transition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, tracking }),
      });
      if (!res.ok) {
        const b = (await res.json().catch(() => ({}))) as { error?: string };
        toast({
          title: "ثبت نشد!",
          description: b.error === "owner_only" ? "این کار فقط با حساب مالک انجام می‌شه." : "خطای سرور — دوباره تلاش کن.",
        });
        return false;
      }
      // mutation → the shared cache must forget everything (UX-06 rule)
      invalidateAdminCache();
      setData((prev) =>
        prev ? { ...prev, orders: prev.orders.map((x) => (x.id === o.id ? { ...x, status: to } : x)) } : prev,
      );
      toast({ title: "وضعیت به‌روز شد ✓", description: `${o.code} → ${STEP_LABELS[to]}` });
      return true;
    } catch {
      toast({ title: "ثبت روی سرور نشد!", description: "دوباره تلاش کن." });
      return false;
    }
  };

  const orders = data?.orders ?? null;
  const stats = data?.stats;

  return (
    <>
      {/* stats + refresh */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <StatCard n={fa(stats?.count ?? 0)} label="کل سفارش‌ها" bg="#E3F6FD" />
          <StatCard n={money(stats?.revenue ?? 0)} label="فروش تأییدشده (تومان)" bg="#FFF3C9" />
          <StatCard n={fa(stats?.pendingReview ?? 0)} label="رسید منتظر بررسی" bg="#FFE0EA" />
          <StatCard n={fa(stats?.delivered ?? 0)} label="تحویل‌شده" bg="#DDF3EA" />
        </div>
        <button
          type="button"
          onClick={() => load(false, true)}
          disabled={refreshing}
          className="flex h-11 items-center gap-2 rounded-full border-2 border-[#04202E] bg-white px-5 text-[13.5px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={refreshing ? "animate-spin" : ""}
          >
            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
            <path d="M21 3v6h-6" />
          </svg>
          {refreshing ? "…" : "تازه‌سازی"}
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {FILTERS.map((f) => {
            const on = status === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setPage(1);
                  setStatus(f.key);
                }}
                className="h-10 shrink-0 rounded-full px-4 text-[13px] font-bold transition-all"
                style={{
                  background: on ? "#04202E" : "#fff",
                  border: `1.5px solid ${on ? "#04202E" : "#CFE6EF"}`,
                  color: on ? "#fff" : "#04202E",
                }}
              >
                {f.label}
              </button>
            );
          })}
          {/* UX-13 — «دارای پیوست» filter (fed by the dashboard media KPI too) */}
          <button
            type="button"
            aria-pressed={hasMedia}
            onClick={() => {
              setPage(1);
              setHasMedia((v) => !v);
            }}
            className="h-10 shrink-0 rounded-full px-4 text-[13px] font-bold transition-all"
            style={{
              background: hasMedia ? "#5B4A8A" : "#fff",
              border: `1.5px solid ${hasMedia ? "#5B4A8A" : "#CFE6EF"}`,
              color: hasMedia ? "#fff" : "#5B4A8A",
            }}
          >
            دارای پیوست رسانه‌ای
          </button>
        </div>
        <input
          type="text"
          value={qInput}
          onChange={(e) => setQInput(e.target.value)}
          placeholder="جست‌وجو: کد، اسم، موبایل…"
          aria-label="جست‌وجوی سفارش"
          className="h-11 flex-1 rounded-[16px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[14px] text-[#04202E] outline-none focus:border-[#00ABE7] md:min-w-[260px]"
        />
      </div>

      {error ? (
        <div className="flex flex-col items-center gap-4 rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-12 text-center">
          <span className="text-[40px]">🔌</span>
          <p className="m-0 text-[14.5px] font-bold">{error}</p>
          <button type="button" onClick={() => load()} className="flex h-11 items-center rounded-full bg-[#00ABE7] px-6 text-[13.5px] font-extrabold text-[#04202E]">
            تلاش دوباره
          </button>
        </div>
      ) : orders === null ? (
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[74px] animate-pulse rounded-[20px] bg-white/70" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
          <span className="text-[40px]">🗂️</span>
          <p className="m-0 text-[14.5px] font-bold">چیزی مطابق این فیلتر پیدا نشد.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((o) => {
            const allowed = (TRANSITIONS[o.status as OrderStatus] ?? []) as OrderStatus[];
            const actionables = allowed.filter((s) => s !== "expired" && s !== "failed");
            return (
              <div key={o.id} className="rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-[12px] bg-[#04202E] px-2.5 py-1 text-[12px] font-extrabold text-white" dir="ltr">
                      {o.code}
                    </span>
                    <StatusChip s={o.status} />
                    {isDemoCode(o.code) && (
                      <span title="این ردیف با اسکریپت دمو ساخته شده — فروش واقعی نیست" className="rounded-full bg-[#F0F3F5] px-2 py-0.5 text-[10.5px] font-bold text-[#7C99A6]">داده دمو</span>
                    )}
                    {o.paymentMethod === "manual_transfer" && (
                      <span className="rounded-full bg-[#E7E0FA] px-2 py-0.5 text-[10.5px] font-bold text-[#5B4A8A]">کارت‌به‌کارت</span>
                    )}
                    {o.giftOpened && <span className="rounded-full bg-[#D7F5E4] px-2 py-0.5 text-[10.5px] font-bold text-[#2E7D53]">کارت باز شد 🎉</span>}
                  </div>
                  <span className="text-[13.5px] font-black">{money(o.totalToman)} تومان</span>
                </div>
                {/* new-flow chips — استودیو رسانه، نگهداری پیام، نمایش فرستنده */}
                {(o.mediaCount || o.retentionPlan || o.senderDisplay) && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(o.mediaCount ?? 0) > 0 && (
                      <span className="rounded-full bg-[#E3F6FD] px-2.5 py-1 text-[10.5px] font-extrabold text-[#006387]">🎙️ پیوست رسانه‌ای: {fa(o.mediaCount ?? 0)}</span>
                    )}
                    {o.retentionPlan && o.retentionPlan !== "1m" && (
                      <span className="rounded-full bg-[#E7E0FA] px-2.5 py-1 text-[10.5px] font-extrabold text-[#5B4A8A]">⏳ نگهداری {o.retentionPlan === "12m" ? "۱ ساله" : "۶ ماهه"}</span>
                    )}
                    {o.senderDisplay === "anon" && (
                      <span className="rounded-full bg-[#F0F3F5] px-2.5 py-1 text-[10.5px] font-extrabold text-[#4A6572]">🕶️ هدیه‌ی ناشناس</span>
                    )}
                    {o.senderDisplay === "phrase" && o.senderPhrase && (
                      <span className="rounded-full bg-[#FFF3C9] px-2.5 py-1 text-[10.5px] font-extrabold text-[#8A6D1F]">✍️ {o.senderPhrase}</span>
                    )}
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] font-semibold text-[#4A6572]">
                  <span>سفارش‌دهنده: {o.ordererName || "—"}{o.ordererPhone ? <span dir="ltr"> ({fa(o.ordererPhone)})</span> : null}</span>
                  <span>گیرنده: {o.recipientName}</span>
                  <span dir="ltr">{fa(o.recipientPhone)}</span>
                  <span>{o.province}، {o.city}</span>
                  <span>{o.items.join(" + ")}</span>
                  <span>{jalaliDateTime(o.createdAt)}</span>
                  {o.payment && (
                    <span>
                      پرداخت: {o.payment.method === "zarinpal" ? "زرین‌پال" : "دستی"} ({PAYMENT_STATUS_LABEL[o.payment.status]?.label ?? o.payment.status})
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 border-t border-[#EDF6FA] pt-3">
                  {/* UX-02 — details/timeline button renders for EVERY status */}
                  <button
                    type="button"
                    onClick={() => setDetailId(o.id)}
                    className="flex h-10 items-center gap-1.5 rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[12.5px] font-extrabold text-[#006387] transition-all hover:bg-[#F2FAFD] active:scale-95"
                  >
                    جزئیات و تایم‌لاین
                  </button>
                  {actionables.map((s) =>
                    NEEDS_CONFIRM.includes(s) ? (
                      <ConfirmButton
                        key={s}
                        onConfirm={() => void transition(o, s)}
                        confirmTitle={s === "cancelled" ? "لغو شود؟" : "مرجوع شود؟"}
                        confirmLabel={s === "cancelled" ? "بله، لغو کن" : "بله، ثبت کن"}
                        className="flex h-10 items-center gap-1.5 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] transition-all hover:bg-[#FFDCE7] active:scale-95"
                      >
                        {ACTION_LABEL[s] ?? STEP_LABELS[s]}
                        <ForwardIcon size={14} stroke="#B02A52" />
                      </ConfirmButton>
                    ) : (
                      <button
                        key={s}
                        type="button"
                        onClick={() => void transition(o, s)}
                        className="flex h-10 items-center gap-1.5 rounded-full bg-[#FFF3C9] px-4 text-[12.5px] font-extrabold text-[#04202E] transition-all hover:bg-[#F7E7A9] active:scale-95"
                      >
                        {ACTION_LABEL[s] ?? STEP_LABELS[s]}
                        <ForwardIcon size={14} stroke="#04202E" />
                      </button>
                    ),
                  )}
                </div>
              </div>
            );
          })}

          {/* UX-07 — pager: honest totals + prev/next */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[12.5px] font-bold text-[#006387]">
            <button
              type="button"
              disabled={page <= 1 || refreshing}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-full border border-[#CFE6EF] px-4 py-2 disabled:opacity-40"
            >
              قبلی
            </button>
            <span>
              صفحه {fa(page)} از {fa(Math.max(pages, 1))} — {fa(total)} سفارش
            </span>
            <button
              type="button"
              disabled={page >= pages || refreshing}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className="rounded-full border border-[#CFE6EF] px-4 py-2 disabled:opacity-40"
            >
              بیشتر (صفحه بعد)
            </button>
          </div>
        </div>
      )}
      {detailId && (
        <OrderDetailModal
          id={detailId}
          onClose={() => setDetailId(null)}
          onTransition={transition}
        />
      )}
    </>
  );
}

/* ═══════════ ORDER DETAIL MODAL (round 33 + Wave-2) ═══════════ */
interface DetailOrder {
  id: string;
  code: string;
  status: string;
  paymentMethod: string;
  senderName: string;
  senderDisplay: string;
  senderPhrase: string;
  recipientName: string;
  recipientPhone: string;
  ordererName: string;
  ordererPhone: string;
  userPhone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  message: string;
  occasion: number;
  charmHearts: number;
  charmPaws: number;
  mediaCount: number;
  mediaKeys: string[];
  postTrackingCode: string;
  retentionPlan: string;
  messageExpiresAt: string | null;
  messagePurgeStatus: string;
  subtotalToman: number;
  shippingToman: number;
  discountToman: number;
  totalToman: number;
  giftOpened: boolean;
  giftOpenedAt: string | null;
  refundReason: string;
  refundRequestedAt: string | null;
  paymentAttempts: number;
  expiresAt: string;
  createdAt: string;
  items: { titleSnapshot: string; unitPriceToman: number; qty: number }[];
  payments: { id: string; method: string; status: string; attemptNo: number; amountToman: number; refId: string; hasReceipt: boolean; createdAt: string }[];
  renewals: { code: string; plan: string; priceToman: number; status: string; createdAt: string }[];
  events: { id: string; type: string; fromStatus: string; toStatus: string; actor: string; note: string; createdAt: string }[];
}

function OrderDetailModal({
  id,
  onClose,
  onTransition,
}: {
  id: string;
  onClose: () => void;
  onTransition: (o: { id: string; code: string }, to: OrderStatus) => Promise<boolean>;
}) {
  const [o, setO] = useState<DetailOrder | null>(null);
  const [err, setErr] = useState(false);
  const [busyTo, setBusyTo] = useState<OrderStatus | null>(null);
  const [receiptOf, setReceiptOf] = useState<string | null>(null); // UX-04 inline receipt
  const [lightbox, setLightbox] = useState<{ orderId: string; key: string } | null>(null); // UX-01 full image preview
  // UX-12 — کد رهگیری پست: local draft + save via PATCH + copy-friendly
  const [trackDraft, setTrackDraft] = useState<string>("");
  const [trackBusy, setTrackBusy] = useState(false);
  const { toast } = useToast();

  const load = (fresh = false) => {
    adminFetch<{ order: DetailOrder }>(`/api/admin/orders/${id}`, { fresh })
      .then((j) => {
        setO(j.order);
        setTrackDraft(j.order.postTrackingCode ?? "");
        setErr(false);
      })
      .catch(() => setErr(true));
  };

  useEffect(() => {
    load();
    // load() depends only on `id` (cache handles the rest)
  }, [id]);

  // UX-16 — Escape closes; clicking the dark backdrop does NOT (mis-taps were
  // throwing the modal away mid-review on phones). Only ✕ / Escape close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const move = async (to: OrderStatus) => {
    if (!o) return;
    setBusyTo(to);
    const ok = await onTransition({ id: o.id, code: o.code }, to);
    setBusyTo(null);
    if (ok) load(true); // re-pull timeline + status so the modal stays honest
  };

  // UX-12 — ثبت کد رهگیری پست (PATCH /api/admin/orders/{id})
  const saveTracking = async () => {
    if (!o) return;
    const code = trackDraft.trim();
    if (!code) return;
    setTrackBusy(true);
    try {
      const res = await fetch(`/api/admin/orders/${o.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postTrackingCode: code.slice(0, 40) }),
      });
      if (!res.ok) {
        const b = (await res.json().catch(() => ({}))) as { error?: string };
        toast({ title: "ثبت نشد!", description: b.error === "bad_tracking_code" ? "کد رهگیری حداکثر ۴۰ نویسه است." : "خطای سرور — دوباره تلاش کن." });
        return;
      }
      invalidateAdminCache();
      setO((prev) => (prev ? { ...prev, postTrackingCode: code } : prev));
      toast({ title: "کد رهگیری ذخیره شد ✓", description: "در تایم‌لاین سفارش و صفحه رهگیری مشتری می‌بینند." });
      load(true); // the event lands in the timeline
    } catch {
      toast({ title: "خطای شبکه", description: "دوباره تلاش کن." });
    } finally {
      setTrackBusy(false);
    }
  };

  // UX-12 — copy-friendly: one click puts the code on the clipboard
  const copyTracking = async () => {
    const code = (o?.postTrackingCode || trackDraft).trim();
    if (!code) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
        toast({ title: "کپی شد ✓" });
        return;
      }
      throw new Error("legacy");
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = code;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        toast({ title: "کپی شد ✓" });
      } catch {
        toast({ title: "کپی نشد — دستی انتخاب کن" });
      }
    }
  };

  const allowed = o ? ((TRANSITIONS[o.status as OrderStatus] ?? []) as OrderStatus[]).filter((s) => s !== "expired" && s !== "failed") : [];

  const ActionBar = (
    <div className="flex flex-wrap items-center gap-2 border-t border-[#EDF6FA] bg-white/95 pt-3 pb-1 md:pb-0">
      {allowed.map((s) =>
        NEEDS_CONFIRM.includes(s) ? (
          <ConfirmButton
            key={s}
            onConfirm={() => void move(s)}
            busy={busyTo === s}
            confirmTitle={s === "cancelled" ? "لغو شود؟" : "مرجوع شود؟"}
            confirmLabel={s === "cancelled" ? "بله، لغو کن" : "بله، ثبت کن"}
            className="flex h-10 items-center gap-1.5 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] transition-all hover:bg-[#FFDCE7] active:scale-95"
          >
            {ACTION_LABEL[s] ?? STEP_LABELS[s]}
          </ConfirmButton>
        ) : (
          <button
            key={s}
            type="button"
            disabled={busyTo !== null}
            onClick={() => void move(s)}
            className="flex h-10 items-center gap-1.5 rounded-full bg-[#FFF3C9] px-4 text-[12.5px] font-extrabold text-[#04202E] transition-all hover:bg-[#F7E7A9] active:scale-95 disabled:opacity-60"
          >
            {busyTo === s ? "…" : ACTION_LABEL[s] ?? STEP_LABELS[s]}
            <ForwardIcon size={14} stroke="#04202E" />
          </button>
        ),
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#04202E]/45 p-0 backdrop-blur-[2px] md:items-center md:p-6" role="dialog" aria-modal="true" aria-label="جزئیات سفارش">
      <div className="relative max-h-[92vh] w-full max-w-[720px] overflow-y-auto rounded-t-[28px] bg-white p-5 shadow-[0_24px_60px_rgba(4,32,46,0.3)] md:rounded-[28px] md:p-6">
        {err ? (
          <p className="m-0 py-10 text-center text-[14px] font-bold text-[#B03A5B]">جزئیات بارگذاری نشد.</p>
        ) : !o ? (
          <div className="flex flex-col gap-3 py-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-[18px] bg-[#F2FAFD]" />
            ))}
          </div>
        ) : (
          <>
            {/* header */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-[12px] bg-[#04202E] px-3 py-1.5 text-[13px] font-extrabold text-white" dir="ltr">{o.code}</span>
                <StatusChip s={o.status} />
                {isDemoCode(o.code) && (
                  <span title="این ردیف با اسکریپت دمو ساخته شده — فروش واقعی نیست" className="rounded-full bg-[#F0F3F5] px-2.5 py-1 text-[11px] font-bold text-[#7C99A6]">داده دمو</span>
                )}
                {o.giftOpened && <span className="rounded-full bg-[#D7F5E4] px-2.5 py-1 text-[11px] font-bold text-[#2E7D53]">کارت باز شد 🎉</span>}
                {/* UX-05 — پرش به صف رسیدها محدود به همین سفارش */}
                <button
                  type="button"
                  onClick={() => requestFocus({ tab: "payments", paymentOrderCode: o.code })}
                  className="rounded-full bg-[#E3F6FD] px-3 py-1.5 text-[11.5px] font-extrabold text-[#006387] transition-colors hover:bg-[#D6F1FB]"
                >
                  صف رسیدها ↰
                </button>
              </div>
              <button type="button" onClick={onClose} aria-label="بستن" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]">
                ✕
              </button>
            </div>

            {/* money breakdown */}
            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { l: "جمع اقلام", v: money(o.subtotalToman) },
                { l: "ارسال", v: money(o.shippingToman) },
                ...(o.discountToman > 0 ? [{ l: "تخفیف", v: `−${money(o.discountToman)}` }] : []),
                { l: "مبلغ کل", v: money(o.totalToman) },
              ].map((x) => (
                <div key={x.l} className="rounded-[16px] bg-[#F5FBFD] p-3 text-center">
                  <span className="block text-[13.5px] font-black text-[#04202E]">{x.v}</span>
                  <span className="text-[10px] font-bold text-[#4A6572]">{x.l} (تومان)</span>
                </div>
              ))}
            </div>

            {/* parties + address */}
            <div className="mb-4 rounded-[18px] border border-[#EDF6FA] p-4">
              <h4 className="m-0 mb-2 text-[13px] font-black text-[#04202E]">طرفین و آدرس</h4>
              <div className="grid gap-x-6 gap-y-1.5 text-[12.5px] font-semibold text-[#4A6572] sm:grid-cols-2">
                <span>سفارش‌دهنده: <b className="text-[#04202E]">{o.ordererName || "—"}</b> {o.ordererPhone && <span dir="ltr">({fa(o.ordererPhone)})</span>}</span>
                <span>گیرنده: <b className="text-[#04202E]">{o.recipientName}</b> <span dir="ltr">({fa(o.recipientPhone)})</span></span>
                <span>ارسال از طرف: {o.senderDisplay === "anon" ? "ناشناس 🕶️" : o.senderDisplay === "phrase" ? o.senderPhrase : o.senderName || "—"}</span>
                <span>حساب خریدار: <span dir="ltr">{fa(o.userPhone || o.ordererPhone || "—")}</span></span>
                <span className="sm:col-span-2">آدرس: {o.province}، {o.city} — {o.address || "—"} {o.postalCode && <span dir="ltr">({fa(o.postalCode)})</span>}</span>
              </div>
            </div>

            {/* gift payload */}
            <div className="mb-4 rounded-[18px] border border-[#EDF6FA] p-4">
              <h4 className="m-0 mb-2 text-[13px] font-black text-[#04202E]">هدیه</h4>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {o.items.map((it) => (
                  <span key={`${it.titleSnapshot}×${it.qty}`} className="rounded-full bg-[#E3F6FD] px-2.5 py-1 text-[11px] font-extrabold text-[#006387]">{it.titleSnapshot} ×{fa(it.qty)}</span>
                ))}
                {(o.charmHearts > 0 || o.charmPaws > 0) && (
                  <span className="rounded-full bg-[#FFE0EA] px-2.5 py-1 text-[11px] font-extrabold text-[#B03A5B]">❤️ {fa(o.charmHearts)} · 🐾 {fa(o.charmPaws)}</span>
                )}
                {o.mediaCount > 0 && <span className="rounded-full bg-[#E7E0FA] px-2.5 py-1 text-[11px] font-extrabold text-[#5B4A8A]">🎙️ {fa(o.mediaCount)} پیوست</span>}
                {o.retentionPlan !== "1m" && (
                  <span className="rounded-full bg-[#FFF3C9] px-2.5 py-1 text-[11px] font-extrabold text-[#8A6D1F]">⏳ نگهداری {o.retentionPlan === "12m" ? "۱ساله" : "۶ماهه"}</span>
                )}
                {/* UX-08 — مهلت نگهداری پیام، با تقویم جلالی */}
                {o.messageExpiresAt && (
                  <span className="rounded-full bg-[#E3F6FD] px-2.5 py-1 text-[11px] font-extrabold text-[#006387]" title="مهلت نگهداری پیام و پیوست‌ها">
                    🗓️ مهلت نگهداری: {jalaliDate(o.messageExpiresAt)}
                  </span>
                )}
                {o.messagePurgeStatus !== "active" && <span className="rounded-full bg-[#F0F3F5] px-2.5 py-1 text-[11px] font-extrabold text-[#4A6572]">پیام پاک شده</span>}
              </div>
              {o.message && (
                <p className="m-0 whitespace-pre-wrap rounded-[14px] bg-[#F5FBFD] p-3 text-[12.5px] font-medium leading-[2] text-[#04202E]">{o.message}</p>
              )}
              {o.refundReason && (
                <p className="m-0 mt-2 rounded-[14px] bg-[#FFF7FA] p-3 text-[12.5px] font-bold text-[#B03A5B]">مرجوعی: {o.refundReason}</p>
              )}

              {/* UX-01 — گالری پیوست‌های مشتری: عکس/ویس/ویدیو + دانلود */}
              {o.mediaKeys.length > 0 && (
                <div className="mt-3">
                  <span className="mb-2 block text-[12px] font-black text-[#04202E]">پیوست‌های مشتری (استودیو رسانه)</span>
                  <div className="flex flex-wrap gap-3">
                    {o.mediaKeys.map((key, i) => {
                      const kind = mediaKindOf(key);
                      return (
                        <span key={key} className="flex flex-col gap-1.5 rounded-[16px] border border-[#EDF6FA] bg-white p-2">
                          {kind === "image" && (
                            <button
                              type="button"
                              onClick={() => setLightbox({ orderId: o.id, key })}
                              aria-label={`بزرگ‌نمایی ${MEDIA_KIND_FA[kind]} ${i + 1}`}
                              className="block h-[96px] w-[96px] overflow-hidden rounded-[12px] bg-[#F5FBFD]"
                            >
                              <img src={mediaUrl(o.id, key)} alt={`${MEDIA_KIND_FA[kind]} ${i + 1}`} className="h-full w-full cursor-zoom-in object-cover" />
                            </button>
                          )}
                          {kind === "audio" && <audio controls preload="metadata" src={mediaUrl(o.id, key)} className="h-10 w-[220px]" aria-label={`ویس ${i + 1}`} />}
                          {kind === "video" && <video controls preload="metadata" src={mediaUrl(o.id, key)} className="h-[150px] w-[200px] rounded-[12px] bg-black/5" aria-label={`ویدیو ${i + 1}`} />}
                          <span className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold text-[#4A6572]">{MEDIA_KIND_FA[kind]} {fa(i + 1)}</span>
                            <a
                              href={`${mediaUrl(o.id, key)}&download=1`}
                              className="rounded-full bg-[#E3F6FD] px-2.5 py-1 text-[10px] font-extrabold text-[#006387] hover:bg-[#D6F1FB]"
                            >
                              دانلود ⤓
                            </a>
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* payments */}
            {o.payments.length > 0 && (
              <div className="mb-4 rounded-[18px] border border-[#EDF6FA] p-4">
                <h4 className="m-0 mb-2 text-[13px] font-black text-[#04202E]">تلاش‌های پرداخت</h4>
                <div className="flex flex-col gap-1.5">
                  {o.payments.map((p) => (
                    <div key={p.id} className="flex flex-wrap items-center justify-between gap-2 rounded-[14px] bg-[#F5FBFD] px-3 py-2 text-[12px] font-bold text-[#4A6572]">
                      <span>#{fa(p.attemptNo)} — {p.method === "zarinpal" ? "زرین‌پال" : "کارت‌به‌کارت"}</span>
                      <span>{money(p.amountToman)} تومان</span>
                      {/* UX-11 — Persian payment status, not raw English */}
                      <span
                        className="rounded-[10px] px-2.5 py-1 text-[11px] font-extrabold"
                        style={{
                          background: PAYMENT_STATUS_LABEL[p.status]?.bg ?? "#F0F3F5",
                          color: PAYMENT_STATUS_LABEL[p.status]?.fg ?? "#4A6572",
                        }}
                      >
                        {PAYMENT_STATUS_LABEL[p.status]?.label ?? p.status}
                      </span>
                      <span className="text-[10.5px]">{jalaliDateTime(p.createdAt)}</span>
                      {p.refId && <span dir="ltr" className="text-[10.5px]">ref: {p.refId}</span>}
                      {/* UX-04 — receipt inline in the panel, not a downloading tab */}
                      {p.hasReceipt && (
                        <button
                          type="button"
                          onClick={() => setReceiptOf(`/api/admin/payments/${p.id}/receipt`)}
                          className="rounded-full bg-[#E3F6FD] px-3 py-1.5 text-[10.5px] font-extrabold text-[#006387] hover:bg-[#D6F1FB]"
                        >
                          دیدن رسید
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* UX-12 — کد رهگیری پست: input from «تحویل به پست» onward, shown
                in the detail + timeline, copy-friendly for the post receipt */}
            {TRACKING_STATUSES.has(o.status) && (
              <div className="mb-4 rounded-[18px] border border-[#EDF6FA] p-4">
                <h4 className="m-0 mb-2 text-[13px] font-black text-[#04202E]">کد رهگیری پست</h4>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={trackDraft}
                    maxLength={40}
                    dir="ltr"
                    onChange={(e) => setTrackDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") void saveTracking();
                    }}
                    placeholder="مثلاً ۲۴ رقمی پست یا بارکد مرسوله"
                    aria-label="کد رهگیری پست"
                    className="h-10 min-w-[220px] flex-1 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 text-[13px] text-[#04202E] outline-none focus:border-[#00ABE7]"
                  />
                  <button
                    type="button"
                    disabled={trackBusy || trackDraft.trim().length === 0}
                    onClick={() => void saveTracking()}
                    className="flex h-10 items-center rounded-full bg-[#04202E] px-4 text-[12.5px] font-extrabold text-white transition-transform active:scale-95 disabled:opacity-50"
                  >
                    {trackBusy ? "…" : "ذخیره کد رهگیری"}
                  </button>
                  {(o.postTrackingCode || trackDraft.trim()) && (
                    <button
                      type="button"
                      onClick={() => void copyTracking()}
                      className="flex h-10 items-center rounded-full border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[12.5px] font-extrabold text-[#006387] transition-colors hover:bg-[#F2FAFD]"
                    >
                      کپی
                    </button>
                  )}
                </div>
                {o.postTrackingCode ? (
                  <p className="m-0 mt-2 text-[11.5px] font-bold text-[#4A6572]">
                    ثبت‌شده: <span dir="ltr" className="font-black text-[#04202E]">{o.postTrackingCode}</span>
                    {" "}— مشتری آن را در صفحه رهگیری می‌بیند.
                  </p>
                ) : (
                  <p className="m-0 mt-2 text-[11.5px] font-semibold text-[#7C99A6]">هنوز ثبت نشده — بعد از تحویل مرسوله به پست، بارکد را همین‌جا ذخیره کن.</p>
                )}
              </div>
            )}

            {/* timeline */}
            <div className="rounded-[18px] border border-[#EDF6FA] p-4">
              <h4 className="m-0 mb-3 text-[13px] font-black text-[#04202E]">تایم‌لاین رویدادها</h4>
              <ol className="m-0 flex list-none flex-col gap-0 p-0">
                {o.events.map((e, i) => (
                  <li key={e.id} className="relative flex gap-3 pb-4 last:pb-0">
                    {/* connector */}
                    {i < o.events.length - 1 && <span className="absolute right-[11px] top-6 h-[calc(100%-16px)] w-[2px] bg-[#DDEEF5]" aria-hidden="true" />}
                    <span className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E3F6FD] text-[11px]" aria-hidden="true">
                      {e.type === "status_changed" ? "🔄" : e.type === "payment" ? "💳" : e.type === "gift_opened" ? "🎁" : e.type === "created" ? "✨" : "📋"}
                    </span>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="m-0 text-[12.5px] font-bold text-[#04202E]">
                        {EVENT_LABEL[e.type] ?? e.type}
                        {e.type === "status_changed" && e.toStatus ? ` → ${STATUS_LABEL[e.toStatus]?.label ?? e.toStatus}` : ""}
                      </p>
                      <p className="m-0 text-[10.5px] font-semibold text-[#7C99A6]">
                        {e.actor === "admin" ? "مدیر" : e.actor === "owner" ? "ادمین" : e.actor === "customer" ? "مشتری" : "سیستم"}
                        {" · "}
                        {jalaliDateTime(e.createdAt)}
                        {e.note ? ` — ${e.note}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* UX-16 — sticky action bar: same transitions as the card, always
                reachable inside the modal (no close-first dance on phones) */}
            <div className="sticky bottom-0 -mx-5 mt-4 bg-white/95 px-5 pb-3 pt-1 backdrop-blur-sm md:-mx-6 md:px-6 md:pb-1">
              {ActionBar}
            </div>
          </>
        )}

        {/* UX-01 full image preview */}
        {lightbox && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#04202E]/80 p-6" role="dialog" aria-modal="true" aria-label="پیش‌نمایش عکس" onClick={() => setLightbox(null)}>
            <div className="flex max-h-full flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
                <img src={mediaUrl(lightbox.orderId, lightbox.key)} alt="پیش‌نمایش کامل پیوست" className="max-h-[80vh] max-w-full rounded-[16px]" />
              <span className="flex items-center gap-2">
                <a href={`${mediaUrl(lightbox.orderId, lightbox.key)}&download=1`} className="flex h-10 items-center rounded-full bg-white px-4 text-[12.5px] font-extrabold text-[#04202E]">
                  دانلود ⤓
                </a>
                <button type="button" onClick={() => setLightbox(null)} className="flex h-10 items-center rounded-full border border-white/50 px-4 text-[12.5px] font-extrabold text-white">
                  بستن
                </button>
              </span>
            </div>
          </div>
        )}

        {/* UX-04 receipt lightbox */}
        {receiptOf && <ReceiptPreview src={receiptOf} onClose={() => setReceiptOf(null)} />}
      </div>
    </div>
  );
}
