"use client";

// ── کارکنان tab (round 33, owner-only) — AdminUser seat management ──
// Invite by phone, toggle active, change role, remove. Server enforces
// owner-only + last-owner protection; the UI mirrors the same guards.
import { useEffect, useState } from "react";
import { fa } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";
import { jalaliDateTime } from "./admin-shared";

interface Seat {
  id: string;
  phone: string;
  name: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
}

export function TeamTab() {
  const [seats, setSeats] = useState<Seat[] | null>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"operator" | "owner">("operator");
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  const load = () =>
    fetch("/api/admin/team", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j: { seats: Seat[] }) => setSeats(j.seats))
      .catch(() => setSeats([]));

  useEffect(() => {
    const t = setTimeout(load, 0);
    return () => clearTimeout(t);
     
  }, []);

  const invite = async () => {
    const p = phone.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).trim();
    if (!/^09\d{9}$/.test(p)) {
      toast({ title: "شماره درست نیست", description: "مثل ۰۹۱۲۱۲۳۴۵۶۷ وارد کن." });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: p, name, role }),
      });
      const j = (await res.json()) as { ok?: boolean; reactivated?: boolean; error?: string };
      if (!res.ok || !j.ok) {
        toast({ title: "ثبت نشد!", description: j.error === "owner_only" ? "فقط ادمین اجازه دارد." : "خطای سرور." });
      } else {
        toast({ title: j.reactivated ? "صندلی دوباره فعال شد ✓" : "عضو جدید اضافه شد ✓", description: `${name || p} — ${role === "owner" ? "ادمین" : "مدیر فروشگاه"}` });
        setPhone("");
        setName("");
        setRole("operator");
        await load();
      }
    } catch {
      toast({ title: "خطای شبکه" });
    }
    setBusy(false);
  };

  const patch = async (id: string, data: { name?: string; role?: string; isActive?: boolean }) => {
    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !j.ok) {
        toast({
          title: "اعمال نشد!",
          description: j.error === "last_owner" ? "آخرین ادمین فعال را نمی‌توان غیرفعال کرد." : j.error === "self_edit" ? "صندلی خودت را اینجا نمی‌توانی عوض کنی." : "خطای سرور.",
        });
        return;
      }
      await load();
      toast({ title: "ثبت شد ✓" });
    } catch {
      toast({ title: "خطای شبکه" });
    }
  };

  const remove = async (s: Seat) => {
    try {
      const res = await fetch(`/api/admin/team/${s.id}`, { method: "DELETE" });
      const j = (await res.json()) as { ok?: boolean; deactivated?: boolean; error?: string };
      if (!res.ok || !j.ok) {
        toast({ title: "حذف نشد!", description: j.error === "last_owner" ? "آخرین ادمین فعال را نمی‌توان حذف کرد." : "خطای سرور." });
        return;
      }
      toast({ title: j.deactivated ? "به‌جای حذف، غیرفعال شد (آخرین ادمین)" : "حذف شد ✓" });
      await load();
    } catch {
      toast({ title: "خطای شبکه" });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* invite card */}
      <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
        <h3 className="mb-1 mt-0 text-[15px] font-black text-[#04202E]">افزودن صندلی جدید</h3>
        <p className="mb-3 mt-0 text-[12px] font-semibold text-[#4A6572]">
          شماره‌ای که اینجا ثبت شود، با «ورود با کد پیامکی» یا رمز پنل می‌تواند وارد شود. ادمین = دسترسی کامل، مدیر فروشگاه = عملیات روزانه.
        </p>
        <div className="flex flex-col gap-2 md:flex-row md:items-end">
          <div className="flex flex-col gap-1 md:w-[190px]">
            <label htmlFor="team-phone" className="text-[11.5px] font-extrabold text-[#04202E]">موبایل</label>
            <input
              id="team-phone"
              type="tel"
              inputMode="numeric"
              dir="ltr"
              maxLength={11}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^\d۰-۹]/g, "").slice(0, 11))}
              placeholder="09xxxxxxxxx"
              className="h-11 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-center text-[14px] font-black text-[#04202E] outline-none focus:border-[#00ABE7]"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label htmlFor="team-name" className="text-[11.5px] font-extrabold text-[#04202E]">نام (اختیاری)</label>
            <input
              id="team-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلاً سارا — بسته‌بندی"
              className="h-11 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3.5 text-[13.5px] text-[#04202E] outline-none focus:border-[#00ABE7]"
            />
          </div>
          <div className="flex flex-col gap-1 md:w-[170px]">
            <label htmlFor="team-role" className="text-[11.5px] font-extrabold text-[#04202E]">نقش</label>
            <select
              id="team-role"
              value={role}
              onChange={(e) => setRole(e.target.value as "operator" | "owner")}
              className="h-11 rounded-[14px] border-[1.5px] border-[#CFE6EF] bg-white px-3 text-[13.5px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
            >
              <option value="operator">مدیر فروشگاه</option>
              <option value="owner">ادمین (مالک)</option>
            </select>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={() => void invite()}
            className="h-11 shrink-0 rounded-full bg-[#00ABE7] px-6 text-[13.5px] font-extrabold text-[#04202E] transition-transform active:scale-95 disabled:opacity-60"
          >
            افزودن
          </button>
        </div>
      </div>

      {/* seats list */}
      {seats === null ? (
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[76px] animate-pulse rounded-[20px] bg-white/70" />
          ))}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {seats.map((s) => (
            <div key={s.id} className={`rounded-[20px] border p-4 ${s.isActive ? "border-[#DDEEF5] bg-white" : "border-dashed border-[#B9CBD4] bg-[#F8FAFB]"}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3F6FD] text-[16px]" aria-hidden="true">
                    {s.role === "owner" ? "👑" : "🧑‍💼"}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[13.5px] font-black text-[#04202E]">{s.name || "بدون نام"}</span>
                    <span className="text-[11.5px] font-bold text-[#4A6572]" dir="ltr">{s.phone}</span>
                  </div>
                </div>
                <span
                  className="shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-extrabold"
                  style={
                    s.role === "owner"
                      ? { background: "#04202E", color: "#fff" }
                      : { background: "#E3F6FD", color: "#006387" }
                  }
                >
                  {s.role === "owner" ? "ادمین" : "مدیر فروشگاه"}
                </span>
              </div>
              <p className="m-0 mt-2 text-[11px] font-semibold text-[#7C99A6]">
                آخرین ورود: {s.lastLoginAt ? jalaliDateTime(s.lastLoginAt) : "هرگز"}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#EDF6FA] pt-3">
                <button
                  type="button"
                  onClick={() => void patch(s.id, { isActive: !s.isActive })}
                  className={`h-9 rounded-full px-4 text-[12px] font-extrabold transition-all active:scale-95 ${
                    s.isActive ? "bg-[#FFF3C9] text-[#8A6D1F]" : "bg-[#DDF3EA] text-[#2E7D53]"
                  }`}
                >
                  {s.isActive ? "غیرفعال کن" : "فعال کن"}
                </button>
                <button
                  type="button"
                  onClick={() => void patch(s.id, { role: s.role === "owner" ? "operator" : "owner" })}
                  className="h-9 rounded-full bg-[#E7E0FA] px-4 text-[12px] font-extrabold text-[#5B4A8A] transition-all active:scale-95"
                >
                  {s.role === "owner" ? "تبدیل به مدیر" : "ارتقا به ادمین"}
                </button>
                <button
                  type="button"
                  onClick={() => void remove(s)}
                  className="ms-auto h-9 rounded-full bg-[#FFE9F0] px-4 text-[12px] font-extrabold text-[#B03A5B] transition-all active:scale-95"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {seats && (
        <p className="m-0 text-center text-[11.5px] font-bold text-[#7C99A6]">{fa(seats.length)} صندلی ثبت شده — آخرین ادمین فعال قابل حذف یا غیرفعال‌سازی نیست.</p>
      )}
    </div>
  );
}
