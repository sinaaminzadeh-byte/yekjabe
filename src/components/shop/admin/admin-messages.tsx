"use client";

// ── پیام‌ها tab (round 33) — «تماس با ما» inbox ──
// Two-pane: list (unread first) + reading pane with internal note + mark read.
import { useEffect, useState } from "react";
import { fa } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";
import { jalaliDateTime, timeAgoFa } from "./admin-shared";
import { adminFetch, invalidateAdminCache } from "./admin-cache";

interface Msg {
  id: string;
  name: string;
  email: string;
  subject: string;
  orderNo: string;
  message: string;
  read: boolean;
  replyNote: string;
  handledAt: string | null;
  createdAt: string;
}

export function MessagesTab({ onChanged }: { onChanged?: () => void }) {
  const [msgs, setMsgs] = useState<Msg[] | null>(null);
  const [sel, setSel] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  const load = () =>
    adminFetch<{ messages: Msg[] }>("/api/admin/messages")
      .then((j) => {
        setMsgs(j.messages);
        setSel((cur) => cur ?? j.messages.find((m) => !m.read)?.id ?? j.messages[0]?.id ?? null);
      })
      .catch(() => setMsgs([]));

  useEffect(() => {
    const t = setTimeout(load, 0);
    return () => clearTimeout(t);
     
  }, []);

  const current = msgs?.find((m) => m.id === sel) ?? null;

  const openMsg = async (m: Msg) => {
    setSel(m.id);
    setNote(m.replyNote ?? "");
    if (!m.read) {
      setMsgs((prev) => prev?.map((x) => (x.id === m.id ? { ...x, read: true } : x)) ?? prev);
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: m.id, read: true }),
      }).catch(() => {});
      invalidateAdminCache();
      onChanged?.();
    }
  };

  const saveNote = async () => {
    if (!current) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: current.id, replyNote: note, read: true }),
      });
      if (!res.ok) throw new Error();
      setMsgs((prev) => prev?.map((x) => (x.id === current.id ? { ...x, replyNote: note, read: true } : x)) ?? prev);
      toast({ title: "یادداشت ذخیره شد ✓" });
      onChanged?.();
    } catch {
      toast({ title: "ذخیره نشد!", description: "دوباره تلاش کن." });
    }
    setBusy(false);
  };

  const unread = msgs?.filter((m) => !m.read).length ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="m-0 text-[13px] font-bold text-[#4A6572]">
          پیام‌های فرم «تماس با ما» — {fa(unread)} خوانده‌نشده
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* list */}
        <div className="flex max-h-[560px] flex-col gap-2 overflow-y-auto pe-1 lg:col-span-2" role="list" aria-label="فهرست پیام‌ها">
          {msgs === null && [0, 1, 2].map((i) => <div key={i} className="h-[86px] animate-pulse rounded-[18px] bg-white/70" />)}
          {msgs?.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-10 text-center">
              <span className="text-[36px]">📭</span>
              <p className="m-0 text-[13.5px] font-bold">صندوق خالی است.</p>
            </div>
          )}
          {msgs?.map((m) => {
            const on = m.id === sel;
            return (
              <button
                key={m.id}
                type="button"
                role="listitem"
                onClick={() => void openMsg(m)}
                className={`rounded-[18px] border p-3.5 text-right transition-all ${
                  on ? "border-[#00ABE7] bg-[#F2FAFD] shadow-[0_6px_16px_rgba(0,171,231,0.12)]" : "border-[#DDEEF5] bg-white hover:bg-[#F5FBFD]"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[13px] font-black text-[#04202E]">
                    {!m.read && <span className="me-1.5 inline-block h-2 w-2 rounded-full bg-[#F0426B]" aria-label="خوانده‌نشده" />}
                    {m.subject}
                  </span>
                  <span className="shrink-0 text-[10px] font-bold text-[#7C99A6]">{timeAgoFa(m.createdAt)}</span>
                </div>
                <p className="m-0 mt-1 truncate text-[11.5px] font-semibold text-[#4A6572]">
                  {m.name} · <span dir="ltr">{m.email}</span>
                </p>
                {m.orderNo && <span className="mt-1 inline-block rounded-full bg-[#E7E0FA] px-2 py-0.5 text-[10px] font-bold text-[#5B4A8A]" dir="ltr">{m.orderNo}</span>}
              </button>
            );
          })}
        </div>

        {/* reading pane */}
        <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5 lg:col-span-3">
          {!current ? (
            <p className="m-0 py-16 text-center text-[13.5px] font-bold text-[#4A6572]">یک پیام از فهرست انتخاب کن.</p>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="m-0 text-[16px] font-black text-[#04202E]">{current.subject}</h3>
                  <p className="m-0 mt-1 text-[12px] font-bold text-[#4A6572]">
                    {current.name} — <span dir="ltr">{current.email}</span> · {jalaliDateTime(current.createdAt)}
                  </p>
                </div>
                <span
                  className="shrink-0 rounded-full px-3 py-1 text-[11px] font-extrabold"
                  style={current.read ? { background: "#F0F3F5", color: "#4A6572" } : { background: "#FFE0EA", color: "#B03A5B" }}
                >
                  {current.read ? "خوانده شد" : "جدید"}
                </span>
              </div>

              {current.orderNo && (
                <div className="rounded-[16px] bg-[#F3EDFB] px-4 py-2.5 text-[12.5px] font-bold text-[#5B4A8A]">
                  مرتبط با سفارش <span dir="ltr">{current.orderNo}</span>
                </div>
              )}

              <div className="max-h-[240px] overflow-y-auto whitespace-pre-wrap rounded-[18px] bg-[#F5FBFD] p-4 text-[13.5px] font-medium leading-[2] text-[#04202E]">
                {current.message}
              </div>

              <div>
                <label htmlFor="admin-reply-note" className="mb-1.5 block text-[12.5px] font-extrabold text-[#04202E]">
                  یادداشت داخلی (پاسخ داده شد؟)
                </label>
                <textarea
                  id="admin-reply-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="مثلاً: جواب داده شد — ایمیل ارسال شد در تاریخ…"
                  className="w-full rounded-[16px] border-[1.5px] border-[#CFE6EF] bg-white p-3.5 text-[13px] leading-[1.9] text-[#04202E] outline-none focus:border-[#00ABE7]"
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10.5px] font-semibold text-[#7C99A6]">{fa(note.length)}/۵۰۰</span>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void saveNote()}
                    className="h-10 rounded-full bg-[#00ABE7] px-5 text-[12.5px] font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60"
                  >
                    ذخیره یادداشت
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
