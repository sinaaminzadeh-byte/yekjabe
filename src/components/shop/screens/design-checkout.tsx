"use client";

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN PROTOTYPE — /design-checkout : 3 checkout-UX concepts for owner
// review. 100% presentational: mock cart/receiver/orderer state is LOCAL to
// each component, no store writes, no API calls, no OTP requests (the «کد
// نمونه» flow is a visual simulation). Delete together with design-kit.tsx +
// design-hero.tsx (see kit header). Style 3 records voice/video/photo via
// the browser MediaRecorder API — blobs stay in page memory, nothing uploads.
// ═══════════════════════════════════════════════════════════════════════════
import { useEffect, useRef, useState } from "react";
import { Plush } from "../plush";
import { HeartSticker } from "../icons";
import { fa, money } from "@/lib/fa";
import {
  DesignShell,
  DesktopFrame,
  PhoneFrame,
  SpecCard,
} from "./design-kit";

/* ── mock order (prices match the real shop) ── */
const GIFT_NO = 247;
const TOTAL = 1_209_000;
const LINES = [
  { title: "جعبه‌ی هدیه + کرِمی", sub: "جعبه‌ی کادویی + کارت پستال QR", amount: 890_000, emoji: "🧸", plush: true as const },
  { title: "شکلات تلخ ۷۰٪", sub: "افزودنی × ۱", amount: 120_000, emoji: "🍫" },
  { title: "قلب و پنجه × ۳", sub: "هدیه به بچه‌های بی‌سرپرست و حیوونا", amount: 150_000, emoji: "❤️" },
];
const RECEIVER0 = {
  name: "آرمان رفیقی",
  phone: "۰۹۱۲ ۱۲۳ ۴۵۶۷",
  province: "تهران",
  city: "تهران",
  address: "خیابان انقلاب، کوچه‌ی مهر، پلاک ۱۲، واحد ۳",
};
const ORDERER0 = { name: "سارا محمدی", phone: "۰۹۳۵ ۰۰۰ ۱۲۳۴" };

/* ── tiny inline icon set (self-contained) ── */
function Ico({ d, size = 16, className = "" }: { d: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
const PATHS = {
  back: "M9 6l6 6-6 6",
  check: "M20 6L9 17l-5-5",
  lock: "M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z",
  pin: "M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  card: "M2 7h20v12H2zM2 11h20M6 15.5h4",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  gift: "M4 10h16v11H4zM12 10v11M4 7h16v3H4zM12 7s-4 .2-4-2 3-2.5 4 0c1-2.5 4-2 4 0s-4 2-4 2z",
  edit: "M4 20h4L19 9l-4-4L4 16v4z",
  chevD: "M6 9l6 6 6-6",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4",
};

/* status chip for folded cards */
function StatusChip({ state }: { state: "done" | "next" | "locked" }) {
  if (state === "done")
    return (
      <span className="flex items-center gap-1 rounded-full bg-[#E5F8EC] px-2.5 py-1 text-[10.5px] font-extrabold text-[#177A3D]">
        <Ico d={PATHS.check} size={11} />
        کامل شد
      </span>
    );
  if (state === "next")
    return (
      <span className="flex items-center gap-1 rounded-full bg-[#E3F6FD] px-2.5 py-1 text-[10.5px] font-extrabold text-[#006387]">
        قدم بعدی
      </span>
    );
  return (
    <span className="flex items-center gap-1 rounded-full bg-[#EEF4F7] px-2.5 py-1 text-[10.5px] font-extrabold text-[#7FA9BC]">
      <Ico d={PATHS.lock} size={10} />
      قفل
    </span>
  );
}

/* 4 code boxes (dir-ltr) — visual only, accepts any 4 digits */
function CodeBoxes({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const digits = value.slice(0, 4).split("");
  return (
    <div dir="ltr" className="relative flex justify-center gap-2">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`flex h-[52px] w-[46px] items-center justify-center rounded-[14px] border-2 bg-white text-xl font-black text-[#04202E] ${
            digits[i] ? "border-[#00ABE7]" : "border-[#D3E8F0]"
          }`}
        >
          {digits[i] ?? ""}
        </span>
      ))}
      {/* transparent input on top so typing/clicking anywhere fills the boxes */}
      <input
        aria-label="کد تأیید"
        inputMode="numeric"
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 4))}
        className="absolute inset-0 cursor-text opacity-0"
      />
    </div>
  );
}

/* mock fields */
function MockField({
  label,
  value,
  onChange,
  ltr,
  placeholder,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  ltr?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11.5px] font-extrabold text-[#4A6572]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        dir={ltr ? "ltr" : undefined}
        className={`h-[46px] rounded-[14px] border-2 border-[#E3F0F5] bg-[#FAFDFF] px-3.5 text-[14px] font-bold text-[#04202E] outline-none transition-colors placeholder:font-medium placeholder:text-[#9DBAC6] focus:border-[#00ABE7] ${
          ltr ? "text-right" : ""
        }`}
      />
    </label>
  );
}

function MockTextarea({ label, value, onChange }: { label: string; value: string; onChange?: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11.5px] font-extrabold text-[#4A6572]">{label}</span>
      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="resize-none rounded-[14px] border-2 border-[#E3F0F5] bg-[#FAFDFF] p-3.5 text-[14px] font-bold leading-[1.9] text-[#04202E] outline-none transition-colors focus:border-[#00ABE7]"
      />
    </label>
  );
}

function MockSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange?: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11.5px] font-extrabold text-[#4A6572]">{label}</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="h-[46px] w-full appearance-none rounded-[14px] border-2 border-[#E3F0F5] bg-[#FAFDFF] px-3.5 text-[14px] font-bold text-[#04202E] outline-none focus:border-[#00ABE7]"
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7FA9BC]">
          <Ico d={PATHS.chevD} size={14} />
        </span>
      </span>
    </label>
  );
}

/* mini cart lines (shared by both styles) */
function CartLines({ compact }: { compact?: boolean }) {
  return (
    <div className="flex flex-col">
      {LINES.map((l, i) => (
        <div key={l.title} className={`flex items-center gap-3 ${i < LINES.length - 1 ? "border-b border-[#EAF4F8]" : ""} ${compact ? "py-2.5" : "py-3.5"}`}>
          <span
            className={`flex shrink-0 items-center justify-center rounded-[14px] ${compact ? "h-11 w-11 text-lg" : "h-14 w-14 text-2xl"}`}
            style={{ background: i === 0 ? "#FFE8D1" : "#F2FAFD" }}
          >
            {i === 0 ? <Plush kind="bear" size={compact ? 36 : 46} /> : <span aria-hidden="true">{l.emoji}</span>}
          </span>
          <span className="min-w-0 flex-1">
            <span className={`block truncate font-extrabold text-[#04202E] ${compact ? "text-[13px]" : "text-[15px]"}`}>{l.title}</span>
            <span className={`block font-medium text-[#4A6572] ${compact ? "text-[10.5px]" : "text-[12px]"}`}>{l.sub}</span>
          </span>
          <span className={`shrink-0 font-extrabold text-[#04202E] ${compact ? "text-[12px]" : "text-[14px]"}`}>
            {money(l.amount)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* the «this is only a design demo» sheet — fixed = real-viewport (raw mobile
 * demo), absolute = inside the phone/browser frames */
function DemoSheet({ open, onClose, fixed }: { open: boolean; onClose: () => void; fixed?: boolean }) {
  if (!open) return null;
  return (
    <div
      className={`inset-0 z-50 flex items-end justify-center bg-[#04202E]/45 backdrop-blur-[2px] ${fixed ? "fixed" : "absolute"}`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] rounded-t-[28px] bg-white p-6 pb-8 text-center shadow-[0_-16px_40px_rgba(4,32,46,0.3)] md:mb-10 md:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E5F8EC] text-[#177A3D]">
          <Ico d={PATHS.check} size={26} />
        </span>
        <div className="text-[17px] font-black text-[#04202E]">این فقط نمونه‌ی طراحی بود!</div>
        <p className="mx-auto mt-2 max-w-[320px] text-[12.5px] font-medium leading-[2] text-[#4A6572]">
          پرداخت واقعی توی خود سایت انجام می‌شه. اینجا فقط می‌خوایم حس قدم آخر رو ببینی — هر لحظه
          برگرد به صفحه‌ی اصلی و خرید کن.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-[#04202E] text-[14px] font-extrabold text-white active:scale-95"
        >
          فهمیدم
        </button>
      </div>
    </div>
  );
}

/* ════════════════════ STYLE 1 — everything on one page ════════════════════ */

function ProgressSegments({ verified, paying }: { verified: boolean; paying: boolean }) {
  const segs = [
    { label: "سبد", state: "done" },
    { label: "گیرنده", state: "done" },
    { label: "تأیید شماره", state: verified ? "done" : "active" },
    { label: "پرداخت", state: paying ? "active" : "idle" },
  ] as const;
  return (
    <div className="flex items-center gap-2">
      {segs.map((s) => (
        <div key={s.label} className="flex min-w-0 flex-1 flex-col gap-1">
          <span
            className={`h-[7px] rounded-full ${
              s.state === "done" ? "bg-[#3BD07C]" : s.state === "active" ? "bg-[#00ABE7]" : "bg-[#D9E9F0]"
            }`}
          />
          <span className={`truncate text-[10px] font-bold ${s.state === "idle" ? "text-[#9DBAC6]" : "text-[#1F3E4D]"}`}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Style1Mobile() {
  const [receiverOpen, setReceiverOpen] = useState(false);
  const [receiver, setReceiver] = useState(RECEIVER0);
  const [verified, setVerified] = useState(false);
  const [codePhase, setCodePhase] = useState<"idle" | "code">("idle");
  const [code, setCode] = useState("");
  const [payOpen, setPayOpen] = useState(false);
  const [method, setMethod] = useState<"zarinpal" | "manual">("zarinpal");

  const verify = () => {
    if (code.length === 4) setVerified(true);
  };

  return (
    <div className="relative flex min-h-full flex-col bg-[#F2FAFD] pb-[92px]">
      {/* app bar */}
      <div className="sticky top-0 z-20 flex items-center gap-2.5 border-b border-[#E3F0F5] bg-white/95 px-4 py-3 backdrop-blur">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E3F0F5] text-[#04202E]">
          <Ico d={PATHS.back} size={15} />
        </span>
        <span className="text-[15.5px] font-black text-[#04202E]">سبد و پرداخت</span>
        <span className="ms-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#E5F8EC] text-[#177A3D]">
          <Ico d={PATHS.shield} size={15} />
        </span>
      </div>

      <div className="px-4 pt-4">
        {/* progress + gift number strip */}
        <div className="flex items-center justify-between pb-2">
          <span className="text-[12.5px] font-extrabold text-[#1F3E4D]">
            {verified ? "۳ از ۴ قدم کامل شده" : "۲ از ۴ قدم کامل شده"}
          </span>
          <span className="text-[11px] font-bold text-[#7FA9BC]">حدود ۲ دقیقه تا پایان</span>
        </div>
        <ProgressSegments verified={verified} paying={payOpen} />
      </div>

      {/* gift ticket — one slim strip */}
      <div className="mx-4 mt-3 flex items-center gap-3 rounded-[18px] bg-[#00ABE7] px-3.5 py-2.5 text-[#04202E]">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 font-black">
          {fa(GIFT_NO)}
        </span>
        <span className="text-[11.5px] font-bold leading-[1.7]">
          هدیه‌ی شماره‌ی {fa(GIFT_NO)} مال توئه — روی جعبه و کارت پستال می‌شینه
        </span>
      </div>

      {/* ۱ — cart */}
      <div className="mx-4 mt-3.5 rounded-[22px] border border-[#DDEEF5] bg-white p-3.5">
        <div className="flex items-center gap-2.5 pb-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#E3F6FD] text-[#006387]">
            <Ico d={PATHS.gift} size={15} />
          </span>
          <span className="text-[14px] font-black text-[#04202E]">هدیه‌ت</span>
          <span className="ms-auto text-[12px] font-extrabold text-[#04202E]">
            {money(TOTAL)} <span className="text-[9.5px] font-bold text-[#7FA9BC]">تومان</span>
          </span>
        </div>
        <CartLines compact />
        <div className="flex justify-between pt-2 text-[11.5px] font-bold text-[#4A6572]">
          <span>هزینه‌ی ارسال دم در</span>
          <span>{money(49_000)} تومان</span>
        </div>
      </div>

      {/* ۲ — receiver (folded, complete) */}
      <div className="mx-4 mt-3 rounded-[22px] border border-[#DDEEF5] bg-white">
        <button
          type="button"
          onClick={() => setReceiverOpen((v) => !v)}
          className="flex w-full items-center gap-2.5 px-3.5 py-3 text-right"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#FFE9F0] text-[#C42B55]">
            <Ico d={PATHS.pin} size={15} />
          </span>
          <span className="text-[14px] font-black text-[#04202E]">گیرنده‌ی هدیه</span>
          <span className="ms-auto flex items-center gap-2">
            <StatusChip state="done" />
            <span className={`text-[#7FA9BC] transition-transform ${receiverOpen ? "rotate-180" : ""}`}>
              <Ico d={PATHS.chevD} size={14} />
            </span>
          </span>
        </button>
        {!receiverOpen ? (
          <div className="flex items-center gap-2 px-3.5 pb-3">
            <span className="min-w-0 flex-1 truncate rounded-[12px] bg-[#F6FBFD] px-3 py-2 text-[11px] font-bold text-[#1F3E4D]">
              {receiver.name} · {receiver.city}، {receiver.address}
            </span>
            <span className="flex shrink-0 items-center gap-1 rounded-full border border-[#D3E8F0] px-2.5 py-1.5 text-[10.5px] font-extrabold text-[#006387]">
              <Ico d={PATHS.edit} size={10} />
              ویرایش
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5 px-3.5 pb-3.5">
            <MockField label="نام و نام خانوادگی گیرنده" value={receiver.name} onChange={(v) => setReceiver({ ...receiver, name: v })} />
            <MockField label="شماره‌ی موبایل گیرنده" value={receiver.phone} ltr onChange={(v) => setReceiver({ ...receiver, phone: v })} />
            <div className="grid grid-cols-2 gap-2.5">
              <MockSelect label="استان" value={receiver.province} options={["تهران", "البرز", "اصفهان", "فارس"]} onChange={(v) => setReceiver({ ...receiver, province: v })} />
              <MockField label="شهر" value={receiver.city} onChange={(v) => setReceiver({ ...receiver, city: v })} />
            </div>
            <MockTextarea label="آدرس کامل" value={receiver.address} onChange={(v) => setReceiver({ ...receiver, address: v })} />
            <button
              type="button"
              onClick={() => setReceiverOpen(false)}
              className="h-11 rounded-full bg-[#04202E] text-[13px] font-extrabold text-white active:scale-95"
            >
              ذخیره و بستن
            </button>
          </div>
        )}
      </div>

      {/* ۳ — orderer verify (the active step) */}
      <div
        id="s1-verify"
        className={`mx-4 mt-3 rounded-[22px] border-2 bg-white p-3.5 transition-colors ${
          verified ? "border-[#3BD07C]" : "border-[#00ABE7] shadow-[0_10px_24px_-14px_rgba(0,171,231,0.55)]"
        }`}
      >
        <div className="flex items-center gap-2.5 pb-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#E3F6FD] text-[#006387]">
            <Ico d={PATHS.phone} size={15} />
          </span>
          <span className="text-[14px] font-black text-[#04202E]">تأیید شماره‌ی خودت</span>
          <span className="ms-auto">
            <StatusChip state={verified ? "done" : "next"} />
          </span>
        </div>
        {!verified ? (
          <div className="flex flex-col gap-2.5 pt-1.5">
            <p className="m-0 text-[11px] font-medium leading-[1.9] text-[#4A6572]">
              برای امنیت هدیه، کد ۴ رقمی به شماره‌ی خودت می‌فرستیم؛ حساب کاربریت هم همین‌جا ساخته می‌شه.
            </p>
            <div className="flex items-center gap-2 rounded-[14px] bg-[#F6FBFD] px-3 py-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#04202E] text-[11px] font-black text-white">
                {ORDERER0.name.trim()[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-extrabold text-[#04202E]">{ORDERER0.name}</span>
                <span className="block text-[10.5px] font-bold text-[#7FA9BC]" dir="ltr">
                  {ORDERER0.phone}
                </span>
              </span>
            </div>
            {codePhase === "idle" ? (
              <button
                type="button"
                onClick={() => setCodePhase("code")}
                className="h-11 rounded-full bg-[#00ABE7] text-[13px] font-extrabold text-[#04202E] active:scale-95"
              >
                فرستادن کد تأیید
              </button>
            ) : (
              <>
                <CodeBoxes value={code} onChange={setCode} />
                <span className="self-center rounded-full bg-[#FFF3C9] px-2.5 py-1 text-[10px] font-bold text-[#7A5C00]">
                  کد نمونه: {fa(1234)}
                </span>
                <button
                  type="button"
                  onClick={verify}
                  disabled={code.length !== 4}
                  className="h-11 rounded-full bg-[#00ABE7] text-[13px] font-extrabold text-[#04202E] transition-opacity active:scale-95 disabled:opacity-40"
                >
                  تأیید کد
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2.5 pt-1.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E5F8EC] text-[#177A3D]">
              <Ico d={PATHS.check} size={16} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-extrabold text-[#04202E]">تأیید شد — {ORDERER0.name}</span>
              <span className="block text-[10.5px] font-bold text-[#7FA9BC]">
                حساب کاربریت ساخته شد و لاگین هستی
              </span>
            </span>
          </div>
        )}
      </div>

      {/* ۴ — payment (locked until verified) */}
      <div className={`mx-4 mt-3 rounded-[22px] border border-[#DDEEF5] bg-white p-3.5 transition-opacity ${verified ? "" : "opacity-60"}`}>
        <div className="flex items-center gap-2.5 pb-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#FFF3C9] text-[#7A5C00]">
            <Ico d={PATHS.card} size={15} />
          </span>
          <span className="text-[14px] font-black text-[#04202E]">روش پرداخت</span>
          <span className="ms-auto">{verified ? <StatusChip state="next" /> : <StatusChip state="locked" />}</span>
        </div>
        <div className={verified ? "" : "pointer-events-none"}>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: "zarinpal" as const, title: "پرداخت آنلاین", sub: "همه‌ی کارت‌های شتاب، درگاه امن بانکی" },
              { id: "manual" as const, title: "کارت به کارت / بله‌پی", sub: "عکس رسید رو آپلود می‌کنی؛ تا ۱۲ ساعت بررسی" },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id)}
                className={`flex items-center gap-2.5 rounded-[16px] border-2 px-3 py-2.5 text-right transition-colors ${
                  method === m.id ? "border-[#00ABE7] bg-[#F5FCFE]" : "border-[#E3F0F5]"
                }`}
              >
                <span
                  className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 border-[#04202E] ${
                    method === m.id ? "bg-[#00ABE7]" : "bg-white"
                  }`}
                >
                  {method === m.id && <Ico d={PATHS.check} size={11} className="text-[#04202E]" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-extrabold text-[#04202E]">{m.title}</span>
                  <span className="block text-[10.5px] font-medium text-[#4A6572]">{m.sub}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-4 mt-3 text-center text-[10.5px] font-medium leading-[1.9] text-[#7FA9BC]">
        با پرداخت، قوانین یک دوست رو قبول می‌کنی — رسید قلب‌ها توی دفتر مهربونی ثبت می‌شه.
      </p>

      {/* sticky bar */}
      <div className="sticky bottom-0 mt-auto border-t border-[#D3E8F0] bg-white/95 px-4 pb-4 pt-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <div className="text-[10px] font-bold text-[#7FA9BC]">جمع کل</div>
            <div className="text-[15px] font-black text-[#04202E]">{money(TOTAL)}</div>
          </div>
          <button
            type="button"
            onClick={() =>
              verified
                ? setPayOpen(true)
                : document.getElementById("s1-verify")?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            className={`flex h-[50px] flex-1 items-center justify-center gap-2 rounded-full text-[14px] font-extrabold transition-all active:scale-95 ${
              verified ? "bg-[#00ABE7] text-[#04202E]" : "bg-[#CFE6EF] text-[#04202E]"
            }`}
          >
            {verified ? (
              <>
                پرداخت و فرستادن
                <HeartSticker size={17} fill="#04202E" stroke="none" />
              </>
            ) : (
              "فقط تأیید شماره مونده"
            )}
          </button>
        </div>
      </div>

      <DemoSheet open={payOpen} onClose={() => setPayOpen(false)} fixed />
    </div>
  );
}

/* desktop — 2 columns: steps right, sticky summary left */
function Style1Desktop() {
  const [receiverOpen, setReceiverOpen] = useState(false);
  const [receiver, setReceiver] = useState(RECEIVER0);
  const [verified, setVerified] = useState(false);
  const [codePhase, setCodePhase] = useState<"idle" | "code">("idle");
  const [code, setCode] = useState("");
  const [payOpen, setPayOpen] = useState(false);
  const [method, setMethod] = useState<"zarinpal" | "manual">("zarinpal");

  return (
    <div className="relative min-h-full bg-white px-8 py-9">
      <div className="mx-auto grid max-w-[1120px] grid-cols-[1fr_360px] items-start gap-8">
        {/* main column */}
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="m-0 text-[30px] font-black text-[#04202E]">سبد و پرداخت</h1>
            <span className="flex items-center gap-1.5 rounded-full bg-[#E3F6FD] px-3 py-1.5 text-[11.5px] font-extrabold text-[#006387]">
              <Ico d={PATHS.shield} size={13} />
              پرداخت امن
            </span>
          </div>
          <div className="mt-4 max-w-[560px]">
            <ProgressSegments verified={verified} paying={payOpen} />
          </div>

          {/* cart card */}
          <div className="mt-6 rounded-[24px] border border-[#DDEEF5] bg-white p-5">
            <div className="flex items-center gap-2.5 pb-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#E3F6FD] text-[#006387]">
                <Ico d={PATHS.gift} size={16} />
              </span>
              <span className="text-[16px] font-black text-[#04202E]">هدیه‌ت</span>
              <span className="ms-auto text-[13px] font-extrabold text-[#4A6572]">
                ۳ قلم + ارسال
              </span>
            </div>
            <CartLines />
            <div className="flex justify-between border-t border-[#EAF4F8] pt-3 text-[13px] font-bold text-[#4A6572]">
              <span>هزینه‌ی ارسال دم در</span>
              <span>{money(49_000)} تومان</span>
            </div>
          </div>

          {/* receiver card */}
          <div className="mt-4 rounded-[24px] border border-[#DDEEF5] bg-white p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#FFE9F0] text-[#C42B55]">
                <Ico d={PATHS.pin} size={16} />
              </span>
              <span className="text-[16px] font-black text-[#04202E]">گیرنده‌ی هدیه</span>
              <span className="ms-auto flex items-center gap-2.5">
                <StatusChip state="done" />
                <button
                  type="button"
                  onClick={() => setReceiverOpen((v) => !v)}
                  className="flex items-center gap-1.5 rounded-full border border-[#D3E8F0] px-3 py-1.5 text-[11.5px] font-extrabold text-[#006387] transition-colors hover:border-[#00ABE7]"
                >
                  <Ico d={PATHS.edit} size={11} />
                  {receiverOpen ? "بستن" : "ویرایش"}
                </button>
              </span>
            </div>
            {!receiverOpen ? (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <SummaryRow label="نام گیرنده" value={receiver.name} />
                <SummaryRow label="موبایل" value={receiver.phone} ltr />
                <SummaryRow label="شهر" value={`${receiver.province}، ${receiver.city}`} />
                <SummaryRow label="آدرس" value={receiver.address} />
              </div>
            ) : (
              <div className="mt-3 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <MockField label="نام و نام خانوادگی گیرنده" value={receiver.name} onChange={(v) => setReceiver({ ...receiver, name: v })} />
                  <MockField label="شماره‌ی موبایل گیرنده" value={receiver.phone} ltr onChange={(v) => setReceiver({ ...receiver, phone: v })} />
                </div>
                <div className="grid grid-cols-[1fr_1.6fr] gap-3">
                  <MockSelect label="استان" value={receiver.province} options={["تهران", "البرز", "اصفهان", "فارس"]} onChange={(v) => setReceiver({ ...receiver, province: v })} />
                  <MockField label="شهر" value={receiver.city} onChange={(v) => setReceiver({ ...receiver, city: v })} />
                </div>
                <MockTextarea label="آدرس کامل" value={receiver.address} onChange={(v) => setReceiver({ ...receiver, address: v })} />
                <button
                  type="button"
                  onClick={() => setReceiverOpen(false)}
                  className="h-12 w-fit rounded-full bg-[#04202E] px-8 text-[13.5px] font-extrabold text-white hover:scale-[1.02]"
                >
                  ذخیره و بستن
                </button>
              </div>
            )}
          </div>

          {/* verify card */}
          <div
            className={`mt-4 rounded-[24px] border-2 bg-white p-5 transition-colors ${
              verified ? "border-[#3BD07C]" : "border-[#00ABE7]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#E3F6FD] text-[#006387]">
                <Ico d={PATHS.phone} size={16} />
              </span>
              <span className="text-[16px] font-black text-[#04202E]">تأیید شماره‌ی خودت</span>
              <span className="ms-auto">
                <StatusChip state={verified ? "done" : "next"} />
              </span>
            </div>
            {!verified ? (
              <div className="mt-3 flex items-center gap-6">
                <div className="flex items-center gap-3 rounded-[16px] bg-[#F6FBFD] px-4 py-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#04202E] text-[14px] font-black text-white">
                    {ORDERER0.name.trim()[0]}
                  </span>
                  <span>
                    <span className="block text-[13.5px] font-extrabold text-[#04202E]">{ORDERER0.name}</span>
                    <span className="block text-[11.5px] font-bold text-[#7FA9BC]" dir="ltr">
                      {ORDERER0.phone}
                    </span>
                  </span>
                </div>
                {codePhase === "idle" ? (
                  <button
                    type="button"
                    onClick={() => setCodePhase("code")}
                    className="h-12 rounded-full bg-[#00ABE7] px-7 text-[14px] font-extrabold text-[#04202E] hover:scale-[1.02]"
                  >
                    فرستادن کد تأیید
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <CodeBoxes value={code} onChange={setCode} />
                    <span className="rounded-full bg-[#FFF3C9] px-3 py-1.5 text-[11px] font-bold text-[#7A5C00]">
                      کد نمونه: {fa(1234)}
                    </span>
                    <button
                      type="button"
                      onClick={() => code.length === 4 && setVerified(true)}
                      disabled={code.length !== 4}
                      className="h-12 rounded-full bg-[#00ABE7] px-7 text-[14px] font-extrabold text-[#04202E] transition-opacity hover:scale-[1.02] disabled:opacity-40"
                    >
                      تأیید کد
                    </button>
                  </div>
                )}
                <span className="max-w-[210px] text-[11px] font-medium leading-[1.9] text-[#7FA9BC]">
                  حساب کاربریت هم همین‌جا ساخته می‌شه و بعد از خرید لاگین هستی.
                </span>
              </div>
            ) : (
              <div className="mt-3 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E5F8EC] text-[#177A3D]">
                  <Ico d={PATHS.check} size={19} />
                </span>
                <span>
                  <span className="block text-[14px] font-extrabold text-[#04202E]">تأیید شد — {ORDERER0.name}</span>
                  <span className="block text-[11.5px] font-bold text-[#7FA9BC]">حساب ساخته شد و لاگین هستی</span>
                </span>
              </div>
            )}
          </div>

          {/* payment */}
          <div className={`mt-4 rounded-[24px] border border-[#DDEEF5] bg-white p-5 ${verified ? "" : "opacity-60"}`}>
            <div className="flex items-center gap-2.5 pb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#FFF3C9] text-[#7A5C00]">
                <Ico d={PATHS.card} size={16} />
              </span>
              <span className="text-[16px] font-black text-[#04202E]">روش پرداخت</span>
              <span className="ms-auto">{verified ? <StatusChip state="next" /> : <StatusChip state="locked" />}</span>
            </div>
            <div className={`grid grid-cols-2 gap-3 ${verified ? "" : "pointer-events-none"}`}>
              {[
                { id: "zarinpal" as const, title: "پرداخت آنلاین", sub: "همه‌ی کارت‌های عضو شتاب، درگاه امن بانکی" },
                { id: "manual" as const, title: "کارت به کارت / بله‌پی", sub: "عکس رسید رو آپلود می‌کنی؛ تا ۱۲ ساعت بررسی می‌شه" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`flex items-center gap-3 rounded-[18px] border-2 px-4 py-3.5 text-right transition-colors ${
                    method === m.id ? "border-[#00ABE7] bg-[#F5FCFE]" : "border-[#E3F0F5] hover:border-[#BFDDE8]"
                  }`}
                >
                  <span
                    className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border-2 border-[#04202E] ${
                      method === m.id ? "bg-[#00ABE7]" : "bg-white"
                    }`}
                  >
                    {method === m.id && <Ico d={PATHS.check} size={12} className="text-[#04202E]" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-extrabold text-[#04202E]">{m.title}</span>
                    <span className="block text-[11.5px] font-medium leading-[1.8] text-[#4A6572]">{m.sub}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* summary aside */}
        <aside className="rounded-[26px] border-2 border-[#04202E] bg-white p-5 shadow-[0_24px_44px_-28px_rgba(4,32,46,0.4)]">
          <div className="flex items-center gap-3 rounded-[18px] bg-[#00ABE7] px-4 py-3 text-[#04202E]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-[15px] font-black">
              {fa(GIFT_NO)}
            </span>
            <span className="text-[12px] font-bold leading-[1.75]">
              هدیه‌ی شماره‌ی {fa(GIFT_NO)}
              <span className="block text-[10.5px] font-semibold opacity-80">روی جعبه و کارت پستال می‌شینه</span>
            </span>
          </div>
          <div className="mt-3">
            <CartLines compact />
          </div>
          <div className="mt-2 flex justify-between border-t border-[#EAF4F8] pt-3 text-[12.5px] font-bold text-[#4A6572]">
            <span>هزینه‌ی ارسال</span>
            <span>{money(49_000)} تومان</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between border-t border-[#EAF4F8] pt-3">
            <span className="text-[14px] font-black text-[#04202E]">جمع کل</span>
            <span className="text-[20px] font-black text-[#04202E]">
              {money(TOTAL)} <span className="text-[11px] font-bold text-[#7FA9BC]">تومان</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => verified && setPayOpen(true)}
            disabled={!verified}
            className={`mt-4 flex h-[54px] w-full items-center justify-center gap-2 rounded-full text-[15px] font-extrabold transition-all active:scale-95 ${
              verified ? "bg-[#00ABE7] text-[#04202E] hover:scale-[1.02]" : "bg-[#CFE6EF] text-[#4A6572]"
            }`}
          >
            {verified ? "پرداخت و فرستادن" : "فقط تأیید شماره مونده"}
            {verified && <HeartSticker size={18} fill="#04202E" stroke="none" />}
          </button>
          <div className="mt-4 flex flex-col gap-2 border-t border-[#EAF4F8] pt-3.5">
            {["ارسال ناشناس و غافلگیرکننده", "کارت QR رمزدار — فقط گیرنده باز می‌کنه", "پشتیبانی واقعی، جواب انسانی"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-[11.5px] font-bold text-[#1F3E4D]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E5F8EC] text-[#177A3D]">
                  <Ico d={PATHS.check} size={10} />
                </span>
                {t}
              </span>
            ))}
          </div>
        </aside>
      </div>
      <DemoSheet open={payOpen} onClose={() => setPayOpen(false)} />
    </div>
  );
}

function SummaryRow({ label, value, ltr }: { label: string; value: string; ltr?: boolean }) {
  return (
    <div className="rounded-[14px] bg-[#F6FBFD] px-3.5 py-2.5">
      <div className="text-[10.5px] font-bold text-[#7FA9BC]">{label}</div>
      <div className="truncate text-[12.5px] font-extrabold text-[#04202E]" dir={ltr ? "ltr" : undefined}>
        {value}
      </div>
    </div>
  );
}

/* ════════════════════ STYLE 2 — one question per screen ════════════════════ */

const STEPS = [
  { n: 1, title: "هدیه به دست کی برسه؟", sub: "اسم و شماره‌ی گیرنده رو بنویس؛ ما همون‌جا دم در خونه‌ش می‌بریمش." },
  { n: 2, title: "کجا ببریمش؟", sub: "آدرس کامل بنویس تا پیک دقیق پیداش کنه." },
  { n: 3, title: "شماره‌ی خودت رو تأیید کن", sub: "کد ۴ رقمی می‌فرستیم؛ حساب کاربریت هم ساخته می‌شه." },
  { n: 4, title: "مرور نهایی", sub: "یه نگاه بنداز، اگه همه‌چیز اوکیه بفرستش." },
];

function StepDots({ step, compact }: { step: number; compact?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {STEPS.map((s) => {
        const done = s.n < step;
        const active = s.n === step;
        return (
          <span
            key={s.n}
            className={`flex items-center justify-center rounded-full transition-all ${
              compact ? "h-2" : "h-2.5"
            } ${active ? "w-8 bg-[#00ABE7]" : done ? "w-2.5 bg-[#3BD07C]" : "w-2.5 bg-[#D9E9F0]"}`}
          />
        );
      })}
    </div>
  );
}

function Style2Mobile() {
  const [step, setStep] = useState(1);
  const [receiver, setReceiver] = useState(RECEIVER0);
  const [codePhase, setCodePhase] = useState<"idle" | "code">("idle");
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [payOpen, setPayOpen] = useState(false);

  const s = STEPS[step - 1];
  const stepReady =
    (step === 1 && receiver.name.trim() !== "" && receiver.phone.trim() !== "") ||
    (step === 2 && receiver.address.trim() !== "") ||
    (step === 3 && verified) ||
    step === 4;

  return (
    <div className="relative flex min-h-full flex-col bg-[#F2FAFD] pb-[92px]">
      {/* app bar */}
      <div className="sticky top-0 z-20 flex items-center gap-2.5 border-b border-[#E3F0F5] bg-white/95 px-4 py-3 backdrop-blur">
        <button
          type="button"
          aria-label="قدم قبل"
          onClick={() => step > 1 && setStep(step - 1)}
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#E3F0F5] text-[#04202E] ${step === 1 ? "opacity-40" : ""}`}
        >
          <Ico d={PATHS.back} size={15} />
        </button>
        <span className="text-[14px] font-black text-[#04202E]">قدم {fa(step)} از {fa(4)}</span>
        <span className="ms-auto">
          <StepDots step={step} compact />
        </span>
      </div>

      {/* step body */}
      <div key={step} className="pishnam-reveal flex flex-1 flex-col px-4 pt-5">
        <h1 className="m-0 text-[24px] font-black leading-[1.5] text-[#04202E]">{s.title}</h1>
        <p className="m-0 mt-1 text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">{s.sub}</p>

        {step === 1 && (
          <div className="mt-5 flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-[18px] border-2 border-[#04202E] bg-[#FFE8D1] p-3">
              <Plush kind="bear" size={64} />
              <div className="text-[12px] font-bold leading-[1.8] text-[#04202E]">
                داریم «کرِمی» رو می‌فرستیم
                <span className="block text-[10.5px] font-semibold text-[#7A5C4A]">جعبه + کارت پستال QR + شکلات + قلب‌ها</span>
              </div>
            </div>
            <MockField label="نام و نام خانوادگی گیرنده" value={receiver.name} onChange={(v) => setReceiver({ ...receiver, name: v })} />
            <MockField label="شماره‌ی موبایل گیرنده" value={receiver.phone} ltr onChange={(v) => setReceiver({ ...receiver, phone: v })} />
            <span className="flex items-center gap-2 rounded-[14px] bg-[#E3F6FD] px-3.5 py-2.5 text-[11px] font-bold leading-[1.8] text-[#006387]">
              🤫 هدیه کاملاً ناشناس می‌مونه — اسم تو هیچ‌جا نمیاد
            </span>
          </div>
        )}

        {step === 2 && (
          <div className="mt-5 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <MockSelect label="استان" value={receiver.province} options={["تهران", "البرز", "اصفهان", "فارس"]} onChange={(v) => setReceiver({ ...receiver, province: v })} />
              <MockField label="شهر" value={receiver.city} onChange={(v) => setReceiver({ ...receiver, city: v })} />
            </div>
            <MockTextarea label="آدرس کامل" value={receiver.address} onChange={(v) => setReceiver({ ...receiver, address: v })} />
            <span className="flex items-center gap-2 rounded-[14px] bg-[#FFF3C9] px-3.5 py-2.5 text-[11px] font-bold leading-[1.8] text-[#7A5C00]">
              🚚 ارسال دم در خونه — {money(49_000)} تومان، بدون هزینه‌ی پنهان
            </span>
          </div>
        )}

        {step === 3 && (
          <div className="mt-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-3 rounded-[18px] bg-white p-3.5 border border-[#DDEEF5]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#04202E] text-[14px] font-black text-white">
                {ORDERER0.name.trim()[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-extrabold text-[#04202E]">{ORDERER0.name}</span>
                <span className="block text-[11px] font-bold text-[#7FA9BC]" dir="ltr">{ORDERER0.phone}</span>
              </span>
              {verified && (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5F8EC] text-[#177A3D]">
                  <Ico d={PATHS.check} size={14} />
                </span>
              )}
            </div>
            {!verified && (
              <>
                {codePhase === "idle" ? (
                  <button
                    type="button"
                    onClick={() => setCodePhase("code")}
                    className="h-12 rounded-full bg-[#00ABE7] text-[13.5px] font-extrabold text-[#04202E] active:scale-95"
                  >
                    فرستادن کد به شماره‌ی من
                  </button>
                ) : (
                  <>
                    <CodeBoxes value={code} onChange={setCode} />
                    <span className="self-center rounded-full bg-[#FFF3C9] px-2.5 py-1 text-[10px] font-bold text-[#7A5C00]">
                      کد نمونه: {fa(1234)}
                    </span>
                    <button
                      type="button"
                      onClick={() => code.length === 4 && setVerified(true)}
                      disabled={code.length !== 4}
                      className="h-12 rounded-full bg-[#00ABE7] text-[13.5px] font-extrabold text-[#04202E] transition-opacity active:scale-95 disabled:opacity-40"
                    >
                      تأیید کد
                    </button>
                  </>
                )}
              </>
            )}
            {verified && (
              <span className="rounded-[14px] bg-[#E5F8EC] px-3.5 py-3 text-center text-[12px] font-extrabold text-[#177A3D]">
                تأیید شد! حساب کاربریت ساخته شد و لاگین هستی ✓
              </span>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="mt-5 flex flex-col gap-2.5">
            <div className="rounded-[20px] border border-[#DDEEF5] bg-white p-3.5">
              <div className="text-[12px] font-black text-[#04202E] pb-1.5">هدیه</div>
              <CartLines compact />
            </div>
            <SummaryRow label="گیرنده" value={`${receiver.name} · ${receiver.phone}`} />
            <SummaryRow label="آدرس" value={`${receiver.province}، ${receiver.city}، ${receiver.address}`} />
            <SummaryRow label="سفارش‌دهنده (تأیید شده)" value={`${ORDERER0.name} · ${ORDERER0.phone}`} />
            <div className="mt-1 flex items-baseline justify-between rounded-[18px] bg-[#04202E] px-4 py-3.5 text-white">
              <span className="text-[13px] font-extrabold">جمع کل با ارسال</span>
              <span className="text-[18px] font-black">{money(TOTAL)} تومان</span>
            </div>
          </div>
        )}
      </div>

      {/* sticky CTA */}
      <div className="sticky bottom-0 mt-auto border-t border-[#D3E8F0] bg-white/95 px-4 pb-4 pt-3 backdrop-blur">
        <button
          type="button"
          onClick={() => {
            if (step < 4) setStep(step + 1);
            else setPayOpen(true);
          }}
          disabled={!stepReady}
          className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-full text-[15px] font-extrabold transition-all active:scale-95 ${
            stepReady ? "bg-[#00ABE7] text-[#04202E]" : "bg-[#CFE6EF] text-[#4A6572]"
          }`}
        >
          {step < 4 ? (
            <>
              ادامه
              <Ico d="M15 6l-6 6 6 6" size={16} className="rotate-180" />
            </>
          ) : (
            <>
              پرداخت و فرستادن
              <HeartSticker size={17} fill="#04202E" stroke="none" />
            </>
          )}
        </button>
      </div>

      <DemoSheet open={payOpen} onClose={() => setPayOpen(false)} fixed />
    </div>
  );
}

/* desktop wizard — wide card + illustration aside */
function Style2Desktop() {
  const [step, setStep] = useState(1);
  const [receiver, setReceiver] = useState(RECEIVER0);
  const [codePhase, setCodePhase] = useState<"idle" | "code">("idle");
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const s = STEPS[step - 1];

  const stepReady =
    (step === 1 && receiver.name.trim() !== "" && receiver.phone.trim() !== "") ||
    (step === 2 && receiver.address.trim() !== "") ||
    (step === 3 && verified) ||
    step === 4;

  return (
    <div className="relative min-h-full bg-[#F2FAFD] px-8 py-9">
      <div className="mx-auto grid max-w-[1120px] grid-cols-[1fr_340px] items-stretch gap-8">
        {/* wizard card */}
        <div className="rounded-[28px] border border-[#DDEEF5] bg-white p-8">
          {/* step chips */}
          <div className="flex items-center gap-2">
            {STEPS.map((st) => {
              const done = st.n < step;
              const active = st.n === step;
              return (
                <button
                  key={st.n}
                  type="button"
                  onClick={() => st.n < step && setStep(st.n)}
                  className={`flex items-center gap-2 rounded-full border-2 px-3.5 py-2 text-[12px] font-extrabold transition-colors ${
                    active
                      ? "border-[#00ABE7] bg-[#E3F6FD] text-[#006387]"
                      : done
                        ? "border-[#BFE9CB] bg-[#E5F8EC] text-[#177A3D]"
                        : "border-[#E3F0F5] text-[#9DBAC6]"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black ${
                      active ? "bg-[#00ABE7] text-[#04202E]" : done ? "bg-[#3BD07C] text-white" : "bg-[#EEF4F7] text-[#7FA9BC]"
                    }`}
                  >
                    {done ? <Ico d={PATHS.check} size={11} /> : fa(st.n)}
                  </span>
                  {["گیرنده", "آدرس", "تأیید", "مرور"][st.n - 1]}
                </button>
              );
            })}
          </div>

          <div key={step} className="pishnam-reveal mt-7">
            <h1 className="m-0 text-[30px] font-black text-[#04202E]">{s.title}</h1>
            <p className="m-0 mt-1.5 text-[14px] font-medium leading-[1.9] text-[#4A6572]">{s.sub}</p>

            {step === 1 && (
              <div className="mt-6 grid max-w-[640px] grid-cols-2 gap-4">
                <MockField label="نام و نام خانوادگی گیرنده" value={receiver.name} onChange={(v) => setReceiver({ ...receiver, name: v })} />
                <MockField label="شماره‌ی موبایل گیرنده" value={receiver.phone} ltr onChange={(v) => setReceiver({ ...receiver, phone: v })} />
                <div className="col-span-2 flex items-center gap-2 rounded-[16px] bg-[#E3F6FD] px-4 py-3 text-[12px] font-bold text-[#006387]">
                  🤫 هدیه کاملاً ناشناس می‌مونه — اسم تو هیچ‌جا نمیاد
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mt-6 grid max-w-[640px] grid-cols-2 gap-4">
                <MockSelect label="استان" value={receiver.province} options={["تهران", "البرز", "اصفهان", "فارس"]} onChange={(v) => setReceiver({ ...receiver, province: v })} />
                <MockField label="شهر" value={receiver.city} onChange={(v) => setReceiver({ ...receiver, city: v })} />
                <div className="col-span-2">
                  <MockTextarea label="آدرس کامل" value={receiver.address} onChange={(v) => setReceiver({ ...receiver, address: v })} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-6 flex max-w-[640px] flex-col gap-4">
                <div className="flex w-fit items-center gap-3 rounded-[18px] border border-[#DDEEF5] bg-[#F6FBFD] px-4 py-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#04202E] text-[15px] font-black text-white">
                    {ORDERER0.name.trim()[0]}
                  </span>
                  <span>
                    <span className="block text-[14px] font-extrabold text-[#04202E]">{ORDERER0.name}</span>
                    <span className="block text-[12px] font-bold text-[#7FA9BC]" dir="ltr">{ORDERER0.phone}</span>
                  </span>
                </div>
                {!verified ? (
                  codePhase === "idle" ? (
                    <button
                      type="button"
                      onClick={() => setCodePhase("code")}
                      className="h-[52px] w-fit rounded-full bg-[#00ABE7] px-8 text-[15px] font-extrabold text-[#04202E] hover:scale-[1.02]"
                    >
                      فرستادن کد به شماره‌ی من
                    </button>
                  ) : (
                    <div className="flex items-center gap-4">
                      <CodeBoxes value={code} onChange={setCode} />
                      <span className="rounded-full bg-[#FFF3C9] px-3 py-1.5 text-[11px] font-bold text-[#7A5C00]">
                        کد نمونه: {fa(1234)}
                      </span>
                      <button
                        type="button"
                        onClick={() => code.length === 4 && setVerified(true)}
                        disabled={code.length !== 4}
                        className="h-[52px] rounded-full bg-[#00ABE7] px-8 text-[15px] font-extrabold text-[#04202E] transition-opacity hover:scale-[1.02] disabled:opacity-40"
                      >
                        تأیید کد
                      </button>
                    </div>
                  )
                ) : (
                  <span className="w-fit rounded-[16px] bg-[#E5F8EC] px-5 py-3.5 text-[13.5px] font-extrabold text-[#177A3D]">
                    تأیید شد! حساب کاربریت ساخته شد و لاگین هستی ✓
                  </span>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="mt-6 grid max-w-[720px] grid-cols-2 gap-4">
                <div className="col-span-2 rounded-[20px] border border-[#DDEEF5] bg-white p-4">
                  <div className="pb-1.5 text-[13px] font-black text-[#04202E]">هدیه</div>
                  <CartLines />
                </div>
                <SummaryRow label="گیرنده" value={`${receiver.name} · ${receiver.phone}`} />
                <SummaryRow label="سفارش‌دهنده (تأیید شده)" value={`${ORDERER0.name} · ${ORDERER0.phone}`} />
                <div className="col-span-2">
                  <SummaryRow label="آدرس" value={`${receiver.province}، ${receiver.city}، ${receiver.address}`} />
                </div>
                <div className="col-span-2 flex items-baseline justify-between rounded-[18px] bg-[#04202E] px-5 py-4 text-white">
                  <span className="text-[14px] font-extrabold">جمع کل با ارسال</span>
                  <span className="text-[20px] font-black">{money(TOTAL)} تومان</span>
                </div>
              </div>
            )}
          </div>

          {/* footer controls */}
          <div className="mt-8 flex items-center justify-between border-t border-[#EAF4F8] pt-5">
            <button
              type="button"
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
              className="flex items-center gap-1.5 text-[13px] font-extrabold text-[#4A6572] transition-colors hover:text-[#04202E] disabled:opacity-40"
            >
              <Ico d={PATHS.back} size={14} />
              قدم قبل
            </button>
            <button
              type="button"
              onClick={() => {
                if (step < 4) setStep(step + 1);
                else setPayOpen(true);
              }}
              disabled={!stepReady}
              className={`flex h-[54px] items-center gap-2 rounded-full px-9 text-[15.5px] font-extrabold transition-all active:scale-95 ${
                stepReady ? "bg-[#00ABE7] text-[#04202E] hover:scale-[1.03]" : "bg-[#CFE6EF] text-[#4A6572]"
              }`}
            >
              {step < 4 ? "ادامه" : "پرداخت و فرستادن"}
              {step === 4 && <HeartSticker size={18} fill="#04202E" stroke="none" />}
            </button>
          </div>
        </div>

        {/* illustration aside */}
        <aside className="relative flex flex-col overflow-hidden rounded-[28px] bg-gradient-to-b from-[#D9F1FA] to-[#F2FAFD] p-6">
          <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-white/60" />
          <div className="relative mt-6 flex justify-center">
            <Plush kind="bear" size={190} className="pishnam-float" />
          </div>
          <div className="relative mt-4 rounded-[20px] bg-white/85 p-4 text-center">
            <div className="text-[14px] font-black text-[#04202E]">«یه بغل، تو یه جعبه»</div>
            <div className="mt-1 text-[11.5px] font-semibold leading-[1.9] text-[#4A6572]">
              سفارشت تا دم در خونه‌ی گیرنده با ماست؛ هر لحظه هم می‌تونی از صفحه‌ی پیگیری دنبالش کنی.
            </div>
          </div>
          <div className="relative mt-4 flex flex-col gap-2.5">
            {["ارسال ناشناس و غافلگیرکننده", "کارت QR رمزدار — فقط گیرنده باز می‌کنه", "پشتیبانی واقعی، جواب انسانی"].map((t) => (
              <span key={t} className="flex items-center gap-2 rounded-[14px] bg-white/70 px-3 py-2.5 text-[11.5px] font-bold text-[#1F3E4D]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E5F8EC] text-[#177A3D]">
                  <Ico d={PATHS.check} size={10} />
                </span>
                {t}
              </span>
            ))}
          </div>
          <div className="relative mt-auto pt-5 text-center">
            <StepDots step={step} />
          </div>
        </aside>
      </div>
      <DemoSheet open={payOpen} onClose={() => setPayOpen(false)} />
    </div>
  );
}

/* ════════════════════ STYLE 3 — استودیو هدیه (ویس/ویدیو/عکس) ════════════════════
 * Owner round-28 brief:
 *  • کاربر همین‌جا و به‌صورت جدا «ویس»، «ویدیو» و «عکس» ضبط می‌کنه (یا از
 *    گالری آپلود می‌کنه) و ذخیره می‌شه — در این نمونه فقط تو حافظه‌ی صفحه.
 *  • رمز کارت موقع خرید وارد نمی‌شه: کد خودکار ساخته و «برای گیرنده» پیامک
 *    می‌شه (نوار سبز پایین).
 *  • بقیه‌ی قدم‌ها مثل خود سایت: گیرنده ← تأیید شماره (کد نمونه ۱۲۳۴) ← پرداخت.
 *  • فقط UI — بدون فروشگاه/API واقعی.
 */

type MediaKind = "voice" | "video" | "photo";
interface MediaSlot {
  id: number;
  kind: MediaKind;
  url?: string; // blob/data url — real capture or upload
  seconds: number;
  simulated: boolean; // camera/mic denied or unsupported → demo placeholder
  name: string;
}

const MEDIA_META: Record<MediaKind, { title: string; sub: string; emoji: string; accentBg: string }> = {
  voice: { title: "ویس صوتی", sub: "یه چند ثانیه حرف از ته دلت", emoji: "🎙️", accentBg: "#FFE9F0" },
  video: { title: "ویدیوی کوتاه", sub: "با چهره‌ی خودت تبریک بگو", emoji: "🎥", accentBg: "#E3F6FD" },
  photo: { title: "عکس", sub: "یه عکس از همین لحظه، یا از گالری", emoji: "📷", accentBg: "#E5F8EC" },
};

function fmtSecs(total: number): string {
  const m = Math.floor(total / 60);
  const r = total % 60;
  return `${fa(m)}:${fa(String(r).padStart(2, "0"))}`;
}

/* real MediaRecorder capture with a graceful simulated fallback so the demo
 * always works — even where camera/mic permission is denied or unsupported. */
function useMediaStudio() {
  const [slots, setSlots] = useState<MediaSlot[]>([]);
  const [recKind, setRecKind] = useState<MediaKind | null>(null);
  const [simulated, setSimulated] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const secondsRef = useRef(0);
  const recRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idRef = useRef(1);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const stopTracks = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  };
  // one slot per kind — re-recording/uploading replaces the previous one
  const save = (kind: MediaKind, patch: Partial<MediaSlot>) => {
    setSlots((prev) => [
      ...prev.filter((s) => s.kind !== kind),
      { id: idRef.current++, kind, seconds: secondsRef.current, simulated, url: undefined, name: "", ...patch },
    ]);
  };

  const start = async (kind: MediaKind) => {
    if (recKind) return;
    secondsRef.current = 0;
    setSeconds(0);
    clearTimer();
    timerRef.current = setInterval(() => {
      secondsRef.current += 1;
      setSeconds(secondsRef.current);
    }, 1000);
    try {
      const md = navigator.mediaDevices;
      if (!md?.getUserMedia || typeof MediaRecorder === "undefined") throw new Error("unsupported");
      const stream =
        kind === "voice"
          ? await md.getUserMedia({ audio: true })
          : await md.getUserMedia({ video: { facingMode: "environment" }, audio: kind === "video" });
      if (kind === "photo") {
        // grab a single frame, then release the camera immediately
        const v = document.createElement("video");
        v.srcObject = stream;
        v.muted = true;
        v.playsInline = true;
        try {
          await v.play();
        } catch {
          /* autoplay policy — frame may still be available */
        }
        await new Promise((r) => setTimeout(r, 400));
        const canvas = document.createElement("canvas");
        canvas.width = v.videoWidth || 640;
        canvas.height = v.videoHeight || 480;
        canvas.getContext("2d")?.drawImage(v, 0, 0, canvas.width, canvas.height);
        stream.getTracks().forEach((t) => t.stop());
        clearTimer();
        save(kind, { url: canvas.toDataURL("image/jpeg", 0.85), seconds: 0, simulated: false, name: "عکس جدید" });
        return;
      }
      streamRef.current = stream;
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        const type = rec.mimeType || (kind === "voice" ? "audio/webm" : "video/webm");
        const blob = new Blob(chunksRef.current, { type });
        save(kind, {
          url: URL.createObjectURL(blob),
          seconds: secondsRef.current,
          simulated: false,
          name: kind === "voice" ? "ویس ضبط‌شده" : "ویدیوی ضبط‌شده",
        });
        stopTracks();
      };
      recRef.current = rec;
      rec.start();
      setSimulated(false);
      setRecKind(kind);
    } catch {
      clearTimer();
      if (kind === "photo") {
        // a photo has no recording phase — save the demo placeholder right away
        save(kind, { seconds: 0, simulated: true, name: "عکس نمایشی" });
        return;
      }
      setSimulated(true);
      setRecKind(kind);
      // permission failed AFTER the pre-timer ran — restart it so the
      // simulated recording shows a live counter from zero
      secondsRef.current = 0;
      setSeconds(0);
      timerRef.current = setInterval(() => {
        secondsRef.current += 1;
        setSeconds(secondsRef.current);
      }, 1000);
    }
  };

  // wire the live camera preview when the <video> mounts (ref callback —
  // keeps refs out of the hook's return value so render never touches .current)
  const attachVideo = (el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el && streamRef.current) {
      el.srcObject = streamRef.current;
      void el.play().catch(() => {});
    }
  };

  const stop = () => {
    clearTimer();
    const kind = recKind;
    if (!kind) return;
    setRecKind(null);
    if (!simulated) {
      try {
        recRef.current?.stop();
      } catch {
        /* already stopped */
      }
      recRef.current = null;
      return;
    }
    save(kind, {
      simulated: true,
      name: kind === "voice" ? "ویس نمایشی" : "ویدیوی نمایشی",
    });
  };

  const upload = (kind: MediaKind, file: File) => {
    clearTimer();
    setRecKind(null);
    save(kind, { url: URL.createObjectURL(file), seconds: 0, simulated: false, name: file.name });
  };

  const remove = (kind: MediaKind) => setSlots((prev) => prev.filter((s) => s.kind !== kind));

  // unmount: release camera/mic and timers
  useEffect(
    () => () => {
      clearTimer();
      try {
        if (recRef.current?.state === "recording") recRef.current.stop();
      } catch {
        /* ignore */
      }
      stopTracks();
    },
    [],
  );

  return { slots, recKind, simulated, seconds, attachVideo, start, stop, upload, remove };
}

type Studio = ReturnType<typeof useMediaStudio>;

/* live camera preview isolated in its own component so the ref callback never
 * mixes with the studio state reads in MediaRow's render */
function CamPreview({ attach }: { attach: (el: HTMLVideoElement | null) => void }) {
  return <video ref={attach} muted playsInline autoPlay className="max-h-[200px] w-full rounded-[12px] bg-black object-contain" />;
}

/* saved media — real blob gets a player, simulated gets a friendly placeholder */
function MediaPreview({ slot, onRemove, onRedo }: { slot: MediaSlot; onRemove: () => void; onRedo: () => void }) {
  return (
    <div className="flex flex-col gap-2 rounded-[16px] bg-[#F6FBFD] p-2.5">
      {slot.kind === "voice" &&
        (slot.url ? (
          <audio key={slot.id} controls src={slot.url} className="h-10 w-full" />
        ) : (
          <div className="flex h-10 items-end justify-center gap-1 px-6" aria-hidden="true">
            {[0.5, 0.9, 0.65, 1, 0.75, 0.55, 0.95, 0.7].map((h, i) => (
              <span
                key={i}
                className="w-1.5 animate-pulse rounded-full bg-[#C42B55]"
                style={{ height: `${h * 100}%`, animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
        ))}
      {slot.kind === "video" &&
        (slot.url ? (
          <video key={slot.id} controls src={slot.url} className="max-h-[220px] w-full rounded-[12px] bg-black object-contain" />
        ) : (
          <div className="flex h-[120px] items-center justify-center rounded-[12px] bg-gradient-to-br from-[#0B3A4D] to-[#04202E] text-3xl" aria-hidden="true">
            🎥
          </div>
        ))}
      {slot.kind === "photo" &&
        (slot.url ? (
          <img src={slot.url} alt={slot.name || "عکس ضبط‌شده"} className="max-h-[220px] w-full rounded-[12px] object-cover" />
        ) : (
          <div className="flex h-[120px] items-center justify-center rounded-[12px] bg-gradient-to-br from-[#D9F1FA] to-[#BFE9CB] text-3xl" aria-hidden="true">
            🖼️
          </div>
        ))}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="flex items-center gap-1 rounded-full bg-[#E5F8EC] px-2 py-1 text-[10px] font-extrabold text-[#177A3D]">
          <Ico d={PATHS.check} size={10} />
          ذخیره شد
        </span>
        {slot.simulated && (
          <span className="rounded-full bg-[#FFF3C9] px-2 py-1 text-[9.5px] font-bold text-[#7A5C00]">
            نمایش آزمایشی — دسترسی دوربین/میکروفون نبود
          </span>
        )}
        {slot.seconds > 0 && (
          <span className="text-[10px] font-bold text-[#7FA9BC]" dir="ltr">
            {fmtSecs(slot.seconds)}
          </span>
        )}
        {!slot.simulated && slot.name && (
          <span className="min-w-0 flex-1 truncate text-left text-[10px] font-medium text-[#7FA9BC]" dir="ltr">
            {slot.name}
          </span>
        )}
        <span className="flex flex-1 items-center justify-end gap-1.5">
          <button type="button" onClick={onRedo} className="rounded-full border border-[#D3E8F0] px-2.5 py-1 text-[10.5px] font-extrabold text-[#006387]">
            از نو
          </button>
          <button type="button" onClick={onRemove} className="rounded-full border border-[#F3C6D3] px-2.5 py-1 text-[10.5px] font-extrabold text-[#C42B55]">
            حذف
          </button>
        </span>
      </div>
    </div>
  );
}

/* one media row: record + upload actions, live recording state, saved preview */
function MediaRow({ kind, studio }: { kind: MediaKind; studio: Studio }) {
  const meta = MEDIA_META[kind];
  const slot = studio.slots.find((s) => s.kind === kind);
  const rec = studio.recKind === kind;
  const fileRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="rounded-[18px] border border-[#EAF4F8] bg-white p-3">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] text-[17px]" style={{ background: meta.accentBg }} aria-hidden="true">
          {meta.emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-black text-[#04202E]">{meta.title}</span>
          <span className="block text-[10.5px] font-medium leading-[1.7] text-[#4A6572]">{meta.sub}</span>
        </span>
        {!slot && !rec && (
          <span className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => void studio.start(kind)}
              className="flex h-9 items-center gap-1 rounded-full px-3.5 text-[12px] font-extrabold text-[#04202E] transition-transform active:scale-95"
              style={{ background: meta.accentBg }}
            >
              {kind === "photo" ? "عکس بگیر" : "ضبط کن"}
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-9 items-center rounded-full border border-[#D3E8F0] px-3 text-[11px] font-extrabold text-[#006387]"
            >
              آپلود
            </button>
          </span>
        )}
      </div>

      {rec && (
        <div className="mt-2.5 flex flex-col gap-2.5 rounded-[14px] bg-[#FFF5F7] p-3">
          {kind === "video" && <CamPreview attach={studio.attachVideo} />}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="relative flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
              <span className="absolute h-4 w-4 animate-ping rounded-full bg-[#F0426B]/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F0426B]" />
            </span>
            <span className="text-[12.5px] font-black text-[#C42B55]">
              {kind === "voice" ? "دارم ضبط می‌کنم…" : kind === "video" ? "ویدیو در حال ضبط…" : "دوربین آماده‌ست…"}
            </span>
            <span className="text-[13px] font-black text-[#04202E]" dir="ltr">
              {fmtSecs(studio.seconds)}
            </span>
            <button
              type="button"
              onClick={studio.stop}
              className="ms-auto flex h-10 items-center gap-1.5 rounded-full bg-[#04202E] px-4 text-[12.5px] font-extrabold text-white transition-transform active:scale-95"
            >
              <span className="h-2.5 w-2.5 rounded-[3px] bg-white" aria-hidden="true" />
              توقف و ذخیره
            </button>
          </div>
          {studio.simulated && (
            <div className="text-[10.5px] font-bold leading-[1.8] text-[#7A5C00]">
              دسترسی میکروفون/دوربین داده نشد — یه نمونه‌ی آزمایشی ضبط می‌شه تا حس طرح رو ببینی.
            </div>
          )}
        </div>
      )}

      {slot && !rec && (
        <div className="mt-2.5">
          <MediaPreview slot={slot} onRemove={() => studio.remove(kind)} onRedo={() => void studio.start(kind)} />
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        hidden
        accept={kind === "voice" ? "audio/*" : kind === "video" ? "video/*" : "image/*"}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) studio.upload(kind, f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/* the «no password at purchase» promise — green dashed strip */
function NoPasswordStrip() {
  return (
    <div className="flex items-start gap-2.5 rounded-[22px] border border-dashed border-[#BFE9CB] bg-[#F3FCF6] px-4 py-3.5">
      <span className="text-lg" aria-hidden="true">
        🔐
      </span>
      <div className="text-[12px] font-semibold leading-[1.9] text-[#177A3D]">
        <b className="font-black">رمز کارت لازم نیست وارد کنی!</b> خودمون یه کد یکتا برای جعبه می‌سازیم و لحظه‌ی تحویل،
        پیامکش می‌کنیم به <b className="font-black">گیرنده</b> — کافیه رمز رو از پیامک بخونه و جعبه رو باز کنه.
      </div>
    </div>
  );
}

function Style3Mobile() {
  const studio = useMediaStudio();
  const [receiver, setReceiver] = useState(RECEIVER0);
  const [verified, setVerified] = useState(false);
  const [codePhase, setCodePhase] = useState<"idle" | "code">("idle");
  const [code, setCode] = useState("");
  const [payOpen, setPayOpen] = useState(false);
  const [method, setMethod] = useState<"zarinpal" | "manual">("zarinpal");

  const verify = () => {
    if (code.length === 4) setVerified(true);
  };

  return (
    <div className="relative flex min-h-full flex-col bg-[#F2FAFD] pb-[92px]">
      {/* app bar */}
      <div className="sticky top-0 z-20 flex items-center gap-2.5 border-b border-[#E3F0F5] bg-white/95 px-4 py-3 backdrop-blur">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E3F0F5] text-[#04202E]">
          <Ico d={PATHS.back} size={15} />
        </span>
        <span className="text-[15.5px] font-black text-[#04202E]">سبد و پرداخت</span>
        <span className="ms-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#FFE9F0] text-[15px]" aria-hidden="true">
          🎙️
        </span>
      </div>

      <div className="px-4 pt-4">
        <div className="flex items-center justify-between pb-2">
          <span className="text-[12.5px] font-extrabold text-[#1F3E4D]">
            {verified ? "۳ از ۴ قدم کامل شده" : "۲ از ۴ قدم کامل شده"}
          </span>
          <span className="text-[11px] font-bold text-[#7FA9BC]">حدود ۲ دقیقه تا پایان</span>
        </div>
        <ProgressSegments verified={verified} paying={payOpen} />
      </div>

      {/* gift ticket slim */}
      <div className="mx-4 mt-3 flex items-center gap-3 rounded-[18px] bg-[#00ABE7] px-3.5 py-2.5 text-[#04202E]">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 font-black">{fa(GIFT_NO)}</span>
        <span className="text-[11.5px] font-bold leading-[1.7]">
          هدیه‌ی شماره‌ی {fa(GIFT_NO)} مال توئه — رسانه‌هات کنار پیام قصه می‌شینن
        </span>
      </div>

      {/* ۱ — gift studio (voice / video / photo) */}
      <div className="mx-4 mt-3.5 rounded-[22px] border border-[#DDEEF5] bg-white p-3.5">
        <div className="flex items-center gap-2.5 pb-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#FFE9F0] text-[14px]" aria-hidden="true">
            🎙️
          </span>
          <span className="text-[14px] font-black text-[#04202E]">برای گیرنده آماده کن</span>
          <span className="ms-auto rounded-full bg-[#E3F6FD] px-2 py-1 text-[9.5px] font-extrabold text-[#006387]">اختیاریه — ولی جادوییه</span>
        </div>
        <div className="flex flex-col gap-2">
          <MediaRow kind="voice" studio={studio} />
          <MediaRow kind="video" studio={studio} />
          <MediaRow kind="photo" studio={studio} />
        </div>
        <p className="m-0 pt-2 text-[10px] font-medium leading-[1.8] text-[#7FA9BC]">
          توی این نمونه، ضبط‌ها فقط تو همین صفحه می‌مونن؛ توی خرید واقعی امن آپلود و کنار پیام قصه ذخیره می‌شن.
        </p>
      </div>

      {/* ۲ — receiver (open card) */}
      <div className="mx-4 mt-3 rounded-[22px] border border-[#DDEEF5] bg-white p-3.5">
        <div className="flex items-center gap-2.5 pb-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#FFE9F0] text-[#C42B55]">
            <Ico d={PATHS.pin} size={15} />
          </span>
          <span className="text-[14px] font-black text-[#04202E]">گیرنده‌ی هدیه</span>
          <span className="ms-auto">
            <StatusChip state="done" />
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          <MockField label="نام و نام خانوادگی گیرنده" value={receiver.name} onChange={(v) => setReceiver({ ...receiver, name: v })} />
          <MockField label="شماره‌ی موبایل گیرنده" value={receiver.phone} ltr onChange={(v) => setReceiver({ ...receiver, phone: v })} />
          <div className="grid grid-cols-2 gap-2.5">
            <MockSelect label="استان" value={receiver.province} options={["تهران", "البرز", "اصفهان", "فارس"]} onChange={(v) => setReceiver({ ...receiver, province: v })} />
            <MockField label="شهر" value={receiver.city} onChange={(v) => setReceiver({ ...receiver, city: v })} />
          </div>
          <MockTextarea label="آدرس کامل" value={receiver.address} onChange={(v) => setReceiver({ ...receiver, address: v })} />
        </div>
      </div>

      {/* ۳ — orderer verify */}
      <div
        id="s3-verify"
        className={`mx-4 mt-3 rounded-[22px] border-2 bg-white p-3.5 transition-colors ${
          verified ? "border-[#3BD07C]" : "border-[#00ABE7] shadow-[0_10px_24px_-14px_rgba(0,171,231,0.55)]"
        }`}
      >
        <div className="flex items-center gap-2.5 pb-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#E3F6FD] text-[#006387]">
            <Ico d={PATHS.phone} size={15} />
          </span>
          <span className="text-[14px] font-black text-[#04202E]">تأیید شماره‌ی خودت</span>
          <span className="ms-auto">
            <StatusChip state={verified ? "done" : "next"} />
          </span>
        </div>
        {!verified ? (
          <div className="flex flex-col gap-2.5 pt-1.5">
            <p className="m-0 text-[11px] font-medium leading-[1.9] text-[#4A6572]">
              برای امنیت هدیه، کد ۴ رقمی به شماره‌ی خودت می‌فرستیم؛ حساب کاربریت هم همین‌جا ساخته می‌شه.
            </p>
            {codePhase === "idle" ? (
              <button
                type="button"
                onClick={() => setCodePhase("code")}
                className="h-11 rounded-full bg-[#00ABE7] text-[13px] font-extrabold text-[#04202E] active:scale-95"
              >
                فرستادن کد تأیید
              </button>
            ) : (
              <>
                <CodeBoxes value={code} onChange={setCode} />
                <span className="self-center rounded-full bg-[#FFF3C9] px-2.5 py-1 text-[10px] font-bold text-[#7A5C00]">
                  کد نمونه: {fa(1234)}
                </span>
                <button
                  type="button"
                  onClick={verify}
                  disabled={code.length !== 4}
                  className="h-11 rounded-full bg-[#00ABE7] text-[13px] font-extrabold text-[#04202E] transition-opacity active:scale-95 disabled:opacity-40"
                >
                  تأیید کد
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2.5 pt-1.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E5F8EC] text-[#177A3D]">
              <Ico d={PATHS.check} size={16} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-extrabold text-[#04202E]">تأیید شد — {ORDERER0.name}</span>
              <span className="block text-[10.5px] font-bold text-[#7FA9BC]">حساب کاربریت ساخته شد و لاگین هستی</span>
            </span>
          </div>
        )}
      </div>

      {/* رمز کارت — پیامکی برای گیرنده، بدون ورود موقع خرید */}
      <div className="mx-4 mt-3">
        <NoPasswordStrip />
      </div>

      {/* ۴ — payment (locked until verified) */}
      <div className={`mx-4 mt-3 rounded-[22px] border border-[#DDEEF5] bg-white p-3.5 transition-opacity ${verified ? "" : "opacity-60"}`}>
        <div className="flex items-center gap-2.5 pb-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#FFF3C9] text-[#7A5C00]">
            <Ico d={PATHS.card} size={15} />
          </span>
          <span className="text-[14px] font-black text-[#04202E]">روش پرداخت</span>
          <span className="ms-auto">{verified ? <StatusChip state="next" /> : <StatusChip state="locked" />}</span>
        </div>
        <div className={verified ? "" : "pointer-events-none"}>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: "zarinpal" as const, title: "پرداخت آنلاین", sub: "همه‌ی کارت‌های شتاب، درگاه امن بانکی" },
              { id: "manual" as const, title: "کارت به کارت / بله‌پی", sub: "عکس رسید رو آپلود می‌کنی؛ تا ۱۲ ساعت بررسی" },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id)}
                className={`flex items-center gap-2.5 rounded-[16px] border-2 px-3 py-2.5 text-right transition-colors ${
                  method === m.id ? "border-[#00ABE7] bg-[#F5FCFE]" : "border-[#E3F0F5]"
                }`}
              >
                <span
                  className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 border-[#04202E] ${
                    method === m.id ? "bg-[#00ABE7]" : "bg-white"
                  }`}
                >
                  {method === m.id && <Ico d={PATHS.check} size={11} className="text-[#04202E]" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-extrabold text-[#04202E]">{m.title}</span>
                  <span className="block text-[10.5px] font-medium text-[#4A6572]">{m.sub}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-4 mt-3 text-center text-[10.5px] font-medium leading-[1.9] text-[#7FA9BC]">
        با پرداخت، قوانین یک دوست رو قبول می‌کنی — رسید قلب‌ها توی دفتر مهربونی ثبت می‌شه.
      </p>

      {/* sticky bar */}
      <div className="sticky bottom-0 mt-auto border-t border-[#D3E8F0] bg-white/95 px-4 pb-4 pt-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <div className="text-[10px] font-bold text-[#7FA9BC]">جمع کل</div>
            <div className="text-[15px] font-black text-[#04202E]">{money(TOTAL)}</div>
          </div>
          <button
            type="button"
            onClick={() =>
              verified
                ? setPayOpen(true)
                : document.getElementById("s3-verify")?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            className={`flex h-[50px] flex-1 items-center justify-center gap-2 rounded-full text-[14px] font-extrabold transition-all active:scale-95 ${
              verified ? "bg-[#00ABE7] text-[#04202E]" : "bg-[#CFE6EF] text-[#04202E]"
            }`}
          >
            {verified ? (
              <>
                پرداخت و فرستادن
                <HeartSticker size={17} fill="#04202E" stroke="none" />
              </>
            ) : (
              "فقط تأیید شماره مونده"
            )}
          </button>
        </div>
      </div>

      <DemoSheet open={payOpen} onClose={() => setPayOpen(false)} fixed />
    </div>
  );
}

/* desktop — media studio + steps on the right, live gift preview aside */
function Style3Desktop() {
  const studio = useMediaStudio();
  const [receiver, setReceiver] = useState(RECEIVER0);
  const [codePhase, setCodePhase] = useState<"idle" | "code">("idle");
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [payOpen, setPayOpen] = useState(false);

  return (
    <div className="relative min-h-full bg-[#F2FAFD] px-8 py-9">
      <div className="mx-auto grid max-w-[1120px] grid-cols-[1fr_340px] items-stretch gap-8">
        {/* main card */}
        <div className="rounded-[28px] border border-[#DDEEF5] bg-white p-8">
          <h1 className="m-0 text-[28px] font-black text-[#04202E]">هدیه‌ت رو شخصی کن</h1>
          <p className="m-0 mt-1.5 text-[14px] font-medium leading-[1.9] text-[#4A6572]">
            همون قدم‌های همیشگی (گیرنده ← تأیید شماره ← پرداخت) با یه استودیوی کوچک برای صدا، ویدیو و عکس — و بدون دردسر رمز کارت.
          </p>

          {/* studio */}
          <div className="mt-6 rounded-[22px] border border-[#EAF4F8] bg-[#FAFDFF] p-4">
            <div className="flex items-center gap-2.5 pb-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#FFE9F0] text-[16px]" aria-hidden="true">
                🎙️
              </span>
              <div>
                <div className="text-[15px] font-black text-[#04202E]">برای گیرنده آماده کن</div>
                <div className="text-[11px] font-medium text-[#4A6572]">هر سه اختیاری‌ان — هرکدوم رو ضبط کن یا از گالری آپلود کن</div>
              </div>
              <span className="ms-auto rounded-full bg-[#E3F6FD] px-2.5 py-1 text-[10px] font-extrabold text-[#006387]">ذخیره‌ی خودکار</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <MediaRow kind="voice" studio={studio} />
              <MediaRow kind="video" studio={studio} />
              <MediaRow kind="photo" studio={studio} />
            </div>
            <p className="m-0 pt-2.5 text-[10.5px] font-medium leading-[1.8] text-[#7FA9BC]">
              توی این نمونه ضبط‌ها فقط تو حافظه‌ی همین صفحه‌ان؛ توی خرید واقعی امن آپلود و کنار پیام قصه ذخیره می‌شن.
            </p>
          </div>

          {/* receiver */}
          <div className="mt-6">
            <div className="flex items-center gap-2.5 pb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#FFE9F0] text-[#C42B55]">
                <Ico d={PATHS.pin} size={16} />
              </span>
              <span className="text-[15px] font-black text-[#04202E]">گیرنده‌ی هدیه</span>
              <span className="ms-auto">
                <StatusChip state="done" />
              </span>
            </div>
            <div className="grid max-w-[640px] grid-cols-2 gap-4">
              <MockField label="نام و نام خانوادگی گیرنده" value={receiver.name} onChange={(v) => setReceiver({ ...receiver, name: v })} />
              <MockField label="شماره‌ی موبایل گیرنده" value={receiver.phone} ltr onChange={(v) => setReceiver({ ...receiver, phone: v })} />
              <MockSelect label="استان" value={receiver.province} options={["تهران", "البرز", "اصفهان", "فارس"]} onChange={(v) => setReceiver({ ...receiver, province: v })} />
              <MockField label="شهر" value={receiver.city} onChange={(v) => setReceiver({ ...receiver, city: v })} />
              <div className="col-span-2">
                <MockTextarea label="آدرس کامل" value={receiver.address} onChange={(v) => setReceiver({ ...receiver, address: v })} />
              </div>
            </div>
          </div>

          {/* verify */}
          <div id="s3-verify" className="mt-6 rounded-[22px] border-2 border-[#00ABE7] bg-[#FAFDFF] p-5">
            <div className="flex items-center gap-2.5 pb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#E3F6FD] text-[#006387]">
                <Ico d={PATHS.phone} size={16} />
              </span>
              <span className="text-[15px] font-black text-[#04202E]">تأیید شماره‌ی خودت</span>
              <span className="ms-auto">
                <StatusChip state={verified ? "done" : "next"} />
              </span>
            </div>
            {!verified ? (
              codePhase === "idle" ? (
                <div className="flex flex-col gap-3">
                  <p className="m-0 text-[12px] font-medium leading-[1.9] text-[#4A6572]">
                    کد ۴ رقمی به شماره‌ی خودت ({ORDERER0.phone}) می‌فرستیم؛ حساب کاربریت هم همین‌جا ساخته می‌شه.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCodePhase("code")}
                    className="h-[50px] w-fit rounded-full bg-[#00ABE7] px-8 text-[14px] font-extrabold text-[#04202E] hover:scale-[1.02]"
                  >
                    فرستادن کد به شماره‌ی من
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-4">
                  <CodeBoxes value={code} onChange={setCode} />
                  <span className="rounded-full bg-[#FFF3C9] px-3 py-1.5 text-[11px] font-bold text-[#7A5C00]">کد نمونه: {fa(1234)}</span>
                  <button
                    type="button"
                    onClick={() => code.length === 4 && setVerified(true)}
                    disabled={code.length !== 4}
                    className="h-[52px] rounded-full bg-[#00ABE7] px-8 text-[15px] font-extrabold text-[#04202E] transition-opacity hover:scale-[1.02] disabled:opacity-40"
                  >
                    تأیید کد
                  </button>
                </div>
              )
            ) : (
              <span className="w-fit rounded-[16px] bg-[#E5F8EC] px-5 py-3.5 text-[13.5px] font-extrabold text-[#177A3D]">
                تأیید شد! حساب کاربریت ساخته شد و لاگین هستی ✓
              </span>
            )}
          </div>

          {/* no-password promise */}
          <div className="mt-5">
            <NoPasswordStrip />
          </div>

          {/* payment */}
          <div className="mt-6">
            <div className="flex items-center gap-2.5 pb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#FFF3C9] text-[#7A5C00]">
                <Ico d={PATHS.card} size={16} />
              </span>
              <span className="text-[15px] font-black text-[#04202E]">روش پرداخت</span>
              <span className="ms-auto">{verified ? <StatusChip state="next" /> : <StatusChip state="locked" />}</span>
            </div>
            <div className={`grid max-w-[640px] grid-cols-2 gap-3 ${verified ? "" : "pointer-events-none opacity-50"}`} aria-disabled={!verified}>
              {[
                { id: "zarinpal" as const, title: "پرداخت آنلاین", sub: "همه‌ی کارت‌های شتاب، درگاه امن بانکی" },
                { id: "manual" as const, title: "کارت به کارت / بله‌پی", sub: "عکس رسید رو آپلود می‌کنی؛ تا ۱۲ ساعت بررسی" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`flex items-center gap-2.5 rounded-[18px] border-2 px-4 py-3 text-right transition-colors ${
                    m.id === "zarinpal" ? "border-[#00ABE7] bg-[#F5FCFE]" : "border-[#E3F0F5]"
                  }`}
                >
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 border-[#04202E] bg-[#00ABE7]">
                    {m.id === "zarinpal" && <Ico d={PATHS.check} size={11} className="text-[#04202E]" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-extrabold text-[#04202E]">{m.title}</span>
                    <span className="block text-[10.5px] font-medium text-[#4A6572]">{m.sub}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* footer CTA */}
          <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#EAF4F8] pt-5">
            <span className="text-[11.5px] font-semibold leading-[1.8] text-[#7FA9BC]">
              همه‌چیز نمونه‌ست؛ پرداخت واقعی توی خود سایت انجام می‌شه.
            </span>
            <button
              type="button"
              onClick={() => (verified ? setPayOpen(true) : document.getElementById("s3-verify")?.scrollIntoView({ behavior: "smooth", block: "center" }))}
              className={`flex h-[54px] shrink-0 items-center gap-2 rounded-full px-9 text-[15.5px] font-extrabold transition-all active:scale-95 ${
                verified ? "bg-[#00ABE7] text-[#04202E] hover:scale-[1.03]" : "bg-[#CFE6EF] text-[#04202E]"
              }`}
            >
              {verified ? (
                <>
                  پرداخت و فرستادن
                  <HeartSticker size={18} fill="#04202E" stroke="none" />
                </>
              ) : (
                "فقط تأیید شماره مونده"
              )}
            </button>
          </div>
        </div>

        {/* aside — live gift preview with media chips */}
        <aside className="relative flex flex-col overflow-hidden rounded-[28px] bg-gradient-to-b from-[#FFE9F0] to-[#F2FAFD] p-6">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/60" />
          <div className="relative flex justify-center">
            <Plush kind="bunny" size={170} className="pishnam-float" />
          </div>
          <div className="relative mt-4 rounded-[20px] bg-white/85 p-4">
            <div className="pb-1 text-[13px] font-black text-[#04202E]">روی جعبه‌ی هدیه‌ی شماره‌ی {fa(GIFT_NO)}</div>
            <CartLines compact />
            <div className="mt-2.5 border-t border-[#EAF4F8] pt-2.5">
              <div className="pb-1.5 text-[11px] font-black text-[#04202E]">پیوست‌های رسانه‌ای</div>
              <div className="flex flex-wrap gap-1.5">
                {studio.slots.length === 0 && (
                  <span className="rounded-full bg-[#F2FAFD] px-2.5 py-1 text-[10.5px] font-bold text-[#7FA9BC]">هنوز پیوستی اضافه نکردی</span>
                )}
                {studio.slots.map((s) => (
                  <span key={s.id} className="flex items-center gap-1 rounded-full bg-[#E3F6FD] px-2.5 py-1 text-[10.5px] font-extrabold text-[#006387]">
                    <span aria-hidden="true">{MEDIA_META[s.kind].emoji}</span>
                    {MEDIA_META[s.kind].title}
                    {s.seconds > 0 ? ` · ${fmtSecs(s.seconds)}` : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="relative mt-4 flex flex-col gap-2.5">
            {[
              "رمز کارت خودکار ساخته و پیامک می‌شه به گیرنده",
              "ارسال ناشناس و غافلگیرکننده",
              "ویس/ویدیو/عکس کنار پیام قصه ذخیره می‌شه",
            ].map((t) => (
              <span key={t} className="flex items-center gap-2 rounded-[14px] bg-white/70 px-3 py-2.5 text-[11.5px] font-bold text-[#1F3E4D]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E5F8EC] text-[#177A3D]">
                  <Ico d={PATHS.check} size={10} />
                </span>
                {t}
              </span>
            ))}
          </div>
          <div className="relative mt-auto pt-5">
            <div className="flex items-baseline justify-between rounded-[18px] bg-[#04202E] px-5 py-4 text-white">
              <span className="text-[13px] font-extrabold">جمع کل با ارسال</span>
              <span className="text-[19px] font-black">{money(TOTAL)} تومان</span>
            </div>
          </div>
        </aside>
      </div>
      <DemoSheet open={payOpen} onClose={() => setPayOpen(false)} />
    </div>
  );
}

/* ══════════════ PAGE ══════════════ */

export function DesignCheckoutPage() {
  return (
    <DesignShell
      page="checkout"
      title="پیشنهادهای سفارش — ۳ سبک"
      tabs={[
        { id: "s1", label: "همه‌چیز تو یه نگاه" },
        { id: "s2", label: "یه سؤال در هر صفحه" },
        { id: "s3", label: "استودیو هدیه — صدا/فیلم/عکس" },
      ]}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-6 md:px-6">
        <p className="m-0 max-w-[820px] text-[13.5px] font-medium leading-[2] text-[#4A6572] md:text-[15px]">
          سه بازطراحی از پروسه‌ی سفارش، با همین قدم‌های فعلی (سبد ← گیرنده ← تأیید شماره ← پرداخت) ولی با
          تجربه‌ی ساده‌تر. همه‌چیز نمونه و آفلاینه — دکمه‌ها واقعاً کار می‌کنن ولی به سبد و حساب واقعی وصل
          نیستن؛ کد تأیید هم شبیه‌سازیه (۱۲۳۴). سبک ۳ ضبط ویس/ویدیو/عکس رو هم امتحان می‌کنه و رمز کارت رو
          برای گیرنده پیامک می‌زنه — چیزی موقع خرید وارد نمی‌شه.
        </p>
      </div>

      {/* style 1 */}
      <section id="s1" className="scroll-mt-28 pb-14">
        <SpecCard
          no="۱"
          title="همه‌چیز تو یه نگاه — کارت‌های تاشو"
          idea="سبد، گیرنده، تأیید و پرداخت روی یه صفحه؛ هر کارت جمع می‌شه و خلاصه نشون می‌ده"
          points={[
            "کارت‌های کامل‌شده جمع می‌شن و فقط خلاصه‌شون می‌مونه — صفحه همیشه کوتاه",
            "تیک سبز + نوار قدم‌ها، حس پیشرفت می‌ده",
            "دکمه‌ی پایین همیشه می‌گه دقیقاً چی مونده («فقط تأیید شماره مونده»)",
          ]}
        />
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <DesktopFrame url="yekdoost.ir/checkout — سبک ۱">
            <Style1Desktop />
          </DesktopFrame>
          <PhoneFrame label="سبک ۱ — موبایل">
            <Style1Mobile />
          </PhoneFrame>
          <div className="md:hidden">
            <Style1Mobile />
          </div>
        </div>
      </section>

      {/* style 2 */}
      <section id="s2" className="scroll-mt-28 border-t border-[#D3E8F0] pb-16">
        <SpecCard
          no="۲"
          title="یه سؤال در هر صفحه — ویزارذ قدم‌به‌قدم"
          idea="مثل اسنپ؛ هر صفحه فقط یه تصمیم، دکمه‌ی بزرگ، بدون ترس و پیچیدگی"
          points={[
            "۴ صفحه‌ی کوچک به‌جای یه فرم بلند — هیچ‌وقت احساس شلوغی نمی‌شه",
            "هر قدم یه توضیح دوستانه داره («هدیه ناشناس می‌مونه»)",
            "مرور نهایی: همه‌چیز جمع‌شده با دکمه‌ی ویرایش برای برگشتن به همون قدم",
          ]}
        />
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <DesktopFrame url="yekdoost.ir/checkout — سبک ۲">
            <Style2Desktop />
          </DesktopFrame>
          <PhoneFrame label="سبک ۲ — موبایل">
            <Style2Mobile />
          </PhoneFrame>
          <div className="md:hidden">
            <Style2Mobile />
          </div>
        </div>
      </section>

      {/* style 3 — gift studio (voice / video / photo) */}
      <section id="s3" className="scroll-mt-28 border-t border-[#D3E8F0] pb-16">
        <SpecCard
          no="۳"
          title="استودیو هدیه — صدا، فیلم، عکس"
          idea="خرید رو جذاب کن؛ گیرنده علاوه بر پیام، صدای و چهره‌ی تو رو هم ببینه"
          points={[
            "ویس، ویدیو و عکس رو همین‌جا ضبط کن — یا هر کدوم رو از گالری آپلود کن",
            "رمز کارت لازم نیست وارد کنی: خودمون می‌سازیم و لحظه‌ی تحویل برای گیرنده پیامک می‌کنیم",
            "بقیه‌ی قدم‌ها مثل خود سایت: گیرنده ← تأیید شماره ← پرداخت",
            "پیش‌نمایش زنده: پیوست‌ها لحظه‌ای روی کارت هدیه (سایدبار) می‌شینن",
          ]}
        />
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <DesktopFrame url="yekdoost.ir/checkout — سبک ۳">
            <Style3Desktop />
          </DesktopFrame>
          <PhoneFrame label="سبک ۳ — موبایل">
            <Style3Mobile />
          </PhoneFrame>
          <div className="md:hidden">
            <Style3Mobile />
          </div>
        </div>
      </section>
    </DesignShell>
  );
}
