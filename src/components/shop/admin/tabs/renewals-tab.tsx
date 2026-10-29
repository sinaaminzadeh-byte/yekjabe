"use client";

// ── «تمدید نگهداری» tab (A-02 split) — paid message-retention renewals queue ──
import { useEffect, useState } from "react";
import { fa, money } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";
import { adminFetch, invalidateAdminCache } from "@/components/shop/admin/admin-cache";
import { ConfirmButton, ReceiptPreview } from "@/components/shop/admin/admin-ui";

interface AdminRenewal {
  id: string;
  code: string;
  orderCode: string;
  plan: string;
  priceToman: number;
  status: string;
  requestedByPhone: string;
  receiptKey: string;
  cancelReason: string;
  createdAt: string;
  order: {
    recipientName: string;
    recipientPhone: string;
    retentionPlan: string;
    messageExpiresAt: string | null;
    messagePurgeStatus: string;
    orderStatus: string;
  };
}

export function RenewalsTab() {
  const [renewals, setRenewals] = useState<AdminRenewal[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"payment_under_review" | "paid" | "cancelled" | "awaiting_payment">("payment_under_review");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const { toast } = useToast();

  const load = (fresh = false) => {
    adminFetch<{ renewals?: AdminRenewal[] }>(`/api/admin/renewals?status=${filter}`, { fresh })
      .then((j) => {
        setRenewals(j.renewals ?? []);
        setError(null);
      })
      .catch(() => setError("اتصال به سرور برقرار نشد."));
  };

  useEffect(() => {
    load();
  }, [filter]);

  const act = async (r: AdminRenewal, action: "approve" | "reject") => {
    try {
      const res = await fetch(`/api/admin/renewals/${r.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, reason: action === "reject" ? "رد توسط مدیر" : "" }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; expiresAt?: string };
      if (!res.ok) {
        toast({ title: "انجام نشد!", description: body.error === "purged_not_renewable" ? "محتوا قبل از تأیید حذف شده؛ تمدید لغو شد." : body.error ?? "خطای سرور" });
        load(true);
        return;
      }
      invalidateAdminCache();
      toast({
        title: action === "approve" ? "تمدید تأیید شد ✓" : "تمدید رد شد",
        description: action === "approve" ? `${r.code} — مهلت تا ${new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(body.expiresAt ?? Date.now()))} تمدید شد.` : `${r.code} لغو شد.`,
      });
      load(true);
    } catch {
      toast({ title: "خطای شبکه", description: "دوباره تلاش کن." });
    }
  };

  const FILTERS = [
    { key: "payment_under_review", label: "در انتظار بررسی" },
    { key: "awaiting_payment", label: "منتظر واریز" },
    { key: "paid", label: "تأییدشده" },
    { key: "cancelled", label: "لغوشده" },
  ] as const;

  return (
    <div className="flex flex-col gap-4">
      <p className="m-0 text-[13px] font-semibold leading-[2] text-[#4A6572]">
        تمدیدهای پولی نگهداری پیام — فقط بعد از چکِ واریز واقعی، «تأیید» بزن. تأیید یعنی مهلت پیام همان‌جا تمدید می‌شود.
      </p>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className="h-10 rounded-full px-4 text-[12.5px] font-extrabold transition-all"
            style={{
              background: filter === f.key ? "#04202E" : "#fff",
              border: `1.5px solid ${filter === f.key ? "#04202E" : "#CFE6EF"}`,
              color: filter === f.key ? "#fff" : "#04202E",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]">
          {error}
        </div>
      )}
      {!error && renewals === null && (
        <div className="flex flex-col gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="h-[100px] animate-pulse rounded-[20px] bg-white/70" />
          ))}
        </div>
      )}
      {!error && renewals?.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
          <span className="text-[40px]">⏳</span>
          <p className="m-0 text-[14.5px] font-bold">چیزی در این وضعیت نیست.</p>
        </div>
      )}
      {renewals?.map((r) => {
        const purged = r.order.messagePurgeStatus === "purged";
        return (
          <div key={r.id} className="rounded-[20px] border border-[#DDEEF5] bg-white p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="rounded-[12px] bg-[#04202E] px-2.5 py-1 text-[12px] font-extrabold text-white" dir="ltr">
                  {r.code}
                </span>
                <span className="text-[13.5px] font-black">{money(r.priceToman)} تومان</span>
                <span className="rounded-full bg-[#E3F6FD] px-2.5 py-1 text-[11px] font-extrabold text-[#006387]">
                  پلن {r.plan === "12m" ? "۱ ساله" : "۶ ماهه"}
                </span>
              </div>
              <span className="text-[11.5px] font-bold text-[#4A6572]" dir="ltr">
                {new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(r.createdAt))}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] font-semibold text-[#4A6572]">
              <span>سفارش: <b dir="ltr">{r.orderCode}</b></span>
              <span>گیرنده: {r.order.recipientName}</span>
              <span dir="ltr">{r.requestedByPhone}</span>
              <span>پلن فعلی سفارش: {r.order.retentionPlan === "1m" ? "۱ ماه" : r.order.retentionPlan === "6m" ? "۶ ماه" : "۱ سال"}</span>
              {r.order.messageExpiresAt && <span>انقضای فعلی: {new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(r.order.messageExpiresAt))}</span>}
              {purged && <span className="font-extrabold text-[#B02A52]">⚠️ محتوا حذف شده — تأیید بدون اثر است</span>}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#EDF6FA] pt-3">
              {["payment_under_review", "awaiting_payment"].includes(r.status) && (
                <>
                  <button
                    type="button"
                    onClick={() => void act(r, "approve")}
                    className="flex h-10 items-center gap-1.5 rounded-full bg-[#D7F5E4] px-4 text-[12.5px] font-extrabold text-[#2E7D53] transition-all hover:bg-[#C4EED6] active:scale-95"
                  >
                    تأیید — تمدید اعمال شود
                  </button>
                  <ConfirmButton
                    onConfirm={() => void act(r, "reject")}
                    confirmTitle="رد شود؟"
                    confirmLabel="بله، رد کن"
                    className="flex h-10 items-center gap-1.5 rounded-full bg-[#FFE9F0] px-4 text-[12.5px] font-extrabold text-[#B02A52] transition-all hover:bg-[#FFDCE7] active:scale-95"
                  >
                    رد
                  </ConfirmButton>
                </>
              )}
              {r.receiptKey && (
                <button
                  type="button"
                  onClick={() => setPreviewId(r.id)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#E3F6FD] px-4 text-[12.5px] font-extrabold text-[#006387] hover:bg-[#D6F1FB]"
                >
                  دیدن رسید 🔍
                </button>
              )}
              {r.status === "cancelled" && r.cancelReason && (
                <span className="text-[11.5px] font-bold text-[#B02A52]">لغو: {r.cancelReason}</span>
              )}
            </div>
          </div>
        );
      })}

      {/* UX-04 — receipt preview inline */}
      {previewId && <ReceiptPreview src={`/api/admin/renewals/${previewId}/receipt`} onClose={() => setPreviewId(null)} />}
    </div>
  );
}
