"use client";

// ── «رسیدها» tab (A-02 split + Wave-2 UX) — manual card-to-card queue ──
// UX-04: receipt opens INLINE in the panel (lightbox) with a separate دانلود;
// a missing file shows a friendly Persian message. UX-03: «رد رسید» requires a
// confirm. UX-06: reads go through the shared cache, mutations invalidate it.
import { useEffect, useState } from "react";
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

export function PaymentsTab() {
  const [payments, setPayments] = useState<AdminPayment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState<Record<string, string>>({});
  const [previewId, setPreviewId] = useState<string | null>(null);
  const { toast } = useToast();

  const load = (fresh = false) => {
    adminFetch<{ payments?: AdminPayment[] }>("/api/admin/payments?status=pending_review", { fresh })
      .then((j) => {
        setPayments(j.payments ?? []);
        setError(null);
      })
      .catch(() => setError("اتصال به سرور برقرار نشد."));
  };

  useEffect(() => {
    load();
  }, []);

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

  if (error) {
    return (
      <div className="rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]">
        {error}
      </div>
    );
  }
  if (payments === null) {
    return (
      <div className="flex flex-col gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="h-[110px] animate-pulse rounded-[20px] bg-white/70" />
        ))}
      </div>
    );
  }
  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
        <span className="text-[40px]">🧾</span>
        <p className="m-0 text-[14.5px] font-bold">صف رسیدها خالیه — دستت درد نکنه!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {payments.map((p) => (
        <div key={p.id} className="rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="rounded-[12px] bg-[#04202E] px-2.5 py-1 text-[12px] font-extrabold text-white" dir="ltr">
                {p.code}
              </span>
              <span className="text-[13.5px] font-black">{money(p.amountToman)} تومان</span>
            </div>
            <span
              className="rounded-full px-3 py-1 text-[11.5px] font-extrabold"
              style={{ background: p.ageMinutes > 120 ? "#FFE9F0" : "#E3F6FD", color: p.ageMinutes > 120 ? "#B02A52" : "#006387" }}
            >
              {p.ageMinutes < 60 ? `${fa(p.ageMinutes)} دقیقه پیش` : `${fa(Math.floor(p.ageMinutes / 60))} ساعت پیش`}
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
