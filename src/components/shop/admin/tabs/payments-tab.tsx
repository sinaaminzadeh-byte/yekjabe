"use client";

// ── «رسیدها» tab (A-02 split + Wave-2 UX) — manual card-to-card queue ──
// UX-04: receipt opens INLINE in the panel (lightbox) with a separate دانلود;
// a missing file shows a friendly Persian message. UX-03: «رد رسید» requires a
// confirm. UX-06: reads go through the shared cache, mutations invalidate it.
// UX-10 (audit wave 38): payments WITHOUT an uploaded receipt file are
// visually flagged («بدون رسید») and grouped first, the age label is
// normalized (never negative, days past 48h), and the queue keeps the
// server's oldest-first order. UX-05: the order modal jumps here scoped to a
// single order (?code= — server-side filter, banner + خروج از حالت دامنه).
// A-12: seeded demo rows get a «داده دمو» chip.
import { useEffect, useMemo, useState } from "react";
import { fa, money } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";
import { adminFetch, invalidateAdminCache } from "@/components/shop/admin/admin-cache";
import { ConfirmButton, ReceiptPreview, STATUS_LABEL } from "@/components/shop/admin/admin-ui";

interface AdminPayment {
  id: string;
  code: string;
  orderStatus: string;
  recipientName: string;
  amountToman: number;
  method: string;
  status: string;
  attemptNo: number;
  paymentAttempts: number;
  hasReceipt: boolean;
  ageMinutes: number;
  createdAt: string;
}

/** UX-10 — honest, clamped age label: never negative, never absurd. */
function ageLabel(min: number): string {
  const m = Number.isFinite(min) ? Math.max(0, Math.floor(min)) : 0;
  if (m < 1) return "همین حالا";
  if (m < 60) return `${fa(m)} دقیقه پیش`;
  const h = Math.floor(m / 60);
  if (h < 48) return `${fa(h)} ساعت پیش`;
  const d = Math.floor(h / 24);
  return d < 60 ? `${fa(d)} روز پیش` : "بیش از دو ماه";
}

export function PaymentsTab({ focusOrderCode }: { focusOrderCode?: string | null }) {
  const [payments, setPayments] = useState<AdminPayment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState<Record<string, string>>({});
  const [previewId, setPreviewId] = useState<string | null>(null);
  const { toast } = useToast();

  const queueUrl = useMemo(() => {
    const sp = new URLSearchParams({ status: "pending_review" });
    if (focusOrderCode) sp.set("code", focusOrderCode);
    return `/api/admin/payments?${sp.toString()}`;
  }, [focusOrderCode]);

  const load = (fresh = false) => {
    adminFetch<{ payments?: AdminPayment[] }>(queueUrl, { fresh })
      .then((j) => {
        setPayments(j.payments ?? []);
        setError(null);
      })
      .catch(() => setError("اتصال به سرور برقرار نشد."));
  };

  useEffect(() => {
    load();
    // reload whenever the scoped scope changes (jump from the order modal)
  }, [queueUrl]);

  const act = async (p: AdminPayment, action: "approve" | "reject") => {
    try {
      const res = await fetch(`/api/admin/payments/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, reason: reason[p.id] ?? "" }),
      });
      if (!res.ok) {
        const b = (await res.json().catch(() => ({}))) as { error?: string };
        toast({ title: "انجام نشد!", description: b.error ?? "خطای سرور" });
        return;
      }
      invalidateAdminCache();
      toast({
        title: action === "approve" ? "رسید تأیید شد ✓" : "رسید رد شد",
        description: `${p.code} — ${action === "approve" ? "سفارش پرداخت‌شده شد." : "به مشتری پیامک می‌شه."}`,
      });
      load(true);
    } catch {
      toast({ title: "خطای شبکه", description: "دوباره تلاش کن." });
    }
  };

  // UX-10 — no-receipt rows first (they need the owner's phone call, not just
  // a click), the rest stay oldest-first as the server returned them
  const sorted = useMemo(() => {
    if (!payments) return null;
    return [...payments].sort((a, b) => Number(a.hasReceipt) - Number(b.hasReceipt));
  }, [payments]);

  const scoped = Boolean(focusOrderCode);

  if (error) {
    return (
      <div className="rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]">
        {error}
      </div>
    );
  }
  if (sorted === null) {
    return (
      <div className="flex flex-col gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="h-[110px] animate-pulse rounded-[20px] bg-white/70" />
        ))}
      </div>
    );
  }
  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
        <span className="text-[40px]">🧾</span>
        <p className="m-0 text-[14.5px] font-bold">
          {scoped ? "برای این سفارش رسیدی در صف نیست." : "صف رسیدها خالیه — دستت درد نکنه!"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* UX-05 — scoped banner when jumped from an order modal */}
      {scoped && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-[18px] border border-[#BFE0F2] bg-[#F2FAFD] px-4 py-3">
          <span className="text-[12.5px] font-extrabold text-[#006387]">
            نمایش صف رسیدها فقط برای سفارش <span dir="ltr" className="font-black">{focusOrderCode}</span>
          </span>
          <span className="text-[11.5px] font-bold text-[#4A6572]">{fa(sorted.length)} ردیف</span>
        </div>
      )}

      {sorted.map((p) => (
        <div
          key={p.id}
          className="rounded-[20px] border bg-white p-4 md:p-5"
          style={{
            // UX-10 — a missing receipt file is a DIFFERENT kind of problem:
            // the customer never uploaded it (or it was lost) → amber frame
            borderColor: p.hasReceipt ? "#DDEEF5" : "#F2D9A4",
            borderRightWidth: p.hasReceipt ? 1 : 4,
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-[12px] bg-[#04202E] px-2.5 py-1 text-[12px] font-extrabold text-white" dir="ltr">
                {p.code}
              </span>
              <span className="text-[13.5px] font-black">{money(p.amountToman)} تومان</span>
              {p.code.startsWith("PN-DEMO") && (
                <span title="این ردیف با اسکریپت دمو ساخته شده" className="rounded-full bg-[#F0F3F5] px-2 py-0.5 text-[10.5px] font-bold text-[#7C99A6]">داده دمو</span>
              )}
              {/* UX-10 — no file attached: explicit, actionable flag */}
              {!p.hasReceipt && (
                <span title="هیچ فایل رسیدی برای این تلاش پرداخت ذخیره نشده" className="rounded-full bg-[#FFF3C9] px-2.5 py-0.5 text-[10.5px] font-extrabold text-[#8A6D1F]">
                  بدون رسید
                </span>
              )}
            </div>
            <span
              className="rounded-full px-3 py-1 text-[11.5px] font-extrabold"
              style={{ background: p.ageMinutes > 120 ? "#FFE9F0" : "#E3F6FD", color: p.ageMinutes > 120 ? "#B02A52" : "#006387" }}
            >
              {ageLabel(p.ageMinutes)}
              {p.ageMinutes > 120 ? " — از SLA گذشته!" : ""}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] font-semibold text-[#4A6572]">
            <span>گیرنده: {p.recipientName}</span>
            <span>تلاش {fa(p.attemptNo)} از ۳</span>
            <span>وضعیت سفارش: {STATUS_LABEL[p.orderStatus]?.label ?? p.orderStatus}</span>
          </div>
          {p.hasReceipt && (
            <button
              type="button"
              onClick={() => setPreviewId(p.id)}
              className="mt-2 inline-flex h-10 items-center gap-1.5 rounded-full bg-[#E3F6FD] px-4 text-[12.5px] font-extrabold text-[#006387] hover:bg-[#D6F1FB]"
            >
              دیدن رسید 🔍
            </button>
          )}
          {!p.hasReceipt && (
            <p className="mb-0 mt-2 text-[11.5px] font-semibold leading-[1.9] text-[#8A6D1F]">
              فایل رسیدی روی سرور نیست — از مشتری بخواه دوباره آپلود کند یا بعد از چک دستی واریز، تأیید کن.
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#EDF6FA] pt-3">
            <button
              type="button"
              onClick={() => void act(p, "approve")}
              className="flex h-10 items-center gap-1.5 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] transition-all hover:bg-[#C4EED6] active:scale-95"
            >
              تأیید — پرداخت شد
            </button>
            {/* UX-03 — رد رسید پیامک می‌رود و شمارش تلاش بالا می‌رود؛ باید تأیید بخواهد */}
            <ConfirmButton
              onConfirm={() => void act(p, "reject")}
              confirmTitle="رد شود؟"
              confirmLabel="بله، رد کن"
              className="flex h-10 items-center gap-1.5 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] transition-all hover:bg-[#FFDCE7] active:scale-95"
            >
              رد رسید
            </ConfirmButton>
            <input
              type="text"
              value={reason[p.id] ?? ""}
              onChange={(e) => setReason((prev) => ({ ...prev, [p.id]: e.target.value.slice(0, 120) }))}
              placeholder="دلیل رد (برای پیامک مشتری)…"
              className="h-10 min-w-[220px] flex-1 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-[#F8FDFF] px-3.5 text-[12.5px] text-[#04202E] outline-none focus:border-[#00ABE7]"
            />
          </div>
        </div>
      ))}

      {/* UX-04 — inline receipt preview (no new tab, no forced download) */}
      {previewId && <ReceiptPreview src={`/api/admin/payments/${previewId}/receipt`} onClose={() => setPreviewId(null)} />}
    </div>
  );
}
