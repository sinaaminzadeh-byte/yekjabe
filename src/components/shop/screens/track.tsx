"use client";

// ═══ رهگیری هدیه — order journey timeline (mobile + desktop) ═══
// Entry: click any order card in «هدیه‌هام» → selectOrder(id) → navigate("track")
import { navigate } from "@/lib/hash-route";
import { MobileTopBar } from "@/components/shop/nav";
import { Plush } from "@/components/shop/plush";
import { ForwardIcon, CheckIcon, QrCode } from "@/components/shop/icons";
import {
  usePishnam,
  useSelectedOrder,
  statusToStep,
  TRACK_STEPS,
  type GiftOrder,
} from "@/lib/pishnam-store";
import { PLUSH_MAP, OCCASIONS } from "@/lib/pishnam-data";
import { fa, faPrice } from "@/lib/fa";
import { useToast } from "@/hooks/use-toast";

/* ── local helpers ── */
const STATUS_CHIP: Record<string, { label: string; bg: string }> = {
  paid: { label: "بسته‌بندی", bg: "#FFF3C9" },
  packing: { label: "بسته‌بندی", bg: "#FFF3C9" },
  shipped: { label: "در راه", bg: "#CDEFFB" },
  delivered: { label: "تحویل شد", bg: "#D7F5E4" },
};

const NEXT_LABEL: Record<string, string> = {
  paid: "بسته‌بندی",
  packing: "تحویل به پست",
  shipped: "تحویل به دوستت",
  delivered: "",
};

function who(o: GiftOrder): string {
  return o.dir === "sent" ? `برای ${o.to}` : `از ${o.senderName || "یه دوست ناشناس"}`;
}

function extras(o: GiftOrder): string {
  const parts: string[] = [];
  if (o.anonymous) parts.push("ناشناس");
  if (o.hearts > 0) parts.push(`${fa(o.hearts)} قلب`);
  if (o.paws > 0) parts.push(`${fa(o.paws)} پنجه`);
  return parts.length ? parts.join(" · ") : "بدون آپشن";
}

function stepNote(i: number, current: number, o: GiftOrder): string {
  if (i < current) return `${o.date} · انجام شد ✓`;
  if (i === current) return o.dir === "recv" ? "الان همین‌جا" : "الان اینجاییم";
  return "هنوز نه";
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "0";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    const sel = document.getSelection();
    const saved = sel && sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    if (saved && sel) {
      sel.removeAllRanges();
      sel.addRange(saved);
    }
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function PlushTile({ o, size, box }: { o: GiftOrder; size: number; box: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-[22px]"
      style={{ width: box, height: box, background: PLUSH_MAP[o.kind].bg }}
    >
      <Plush kind={o.kind} size={size} />
    </div>
  );
}

/* ── timeline row (shared visual language, mobile & desktop use it) ── */
function TimelineRow({
  i,
  current,
  o,
  big = false,
}: {
  i: number;
  current: number;
  o: GiftOrder;
  big?: boolean;
}) {
  const done = i < current;
  const isNow = i === current;
  const dot = big ? 46 : 40;
  return (
    <li className="relative flex gap-4 pb-6 last:pb-0">
      {/* connector */}
      {i < TRACK_STEPS.length - 1 && (
        <span
          aria-hidden
          className="absolute w-[2px] rounded"
          style={{
            insetInlineStart: dot / 2 - 1,
            top: dot,
            bottom: -2,
            background: done
              ? "#00ABE7"
              : "repeating-linear-gradient(to bottom, #BFE4F2 0 5px, transparent 5px 10px)",
          }}
        />
      )}
      {/* dot */}
      <span
        className={`relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 ${
          done
            ? "border-[#00ABE7] bg-[#00ABE7] text-white"
            : isNow
              ? "border-[#00ABE7] bg-white text-[#00ABE7] pishnam-pulse-ring"
              : "border-dashed border-[#9CC9DA] bg-white text-[#4A6572]"
        }`}
        style={{ width: dot, height: dot }}
      >
        {done ? (
          <CheckIcon size={18} stroke="#fff" />
        ) : (
          <span className={`font-black ${big ? "text-[17px]" : "text-[15px]"}`}>{fa(i + 1)}</span>
        )}
      </span>
      {/* text */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`font-extrabold ${big ? "text-[17px]" : "text-[15.5px]"} ${isNow ? "text-[#00779F]" : ""}`}>
            {TRACK_STEPS[i].label}
          </span>
          <span
            className={`rounded-[10px] px-2 py-[3px] text-[11px] font-bold ${
              done ? "bg-[#D7F5E4] text-[#04202E]" : isNow ? "bg-[#E3F6FD] text-[#006387]" : "bg-[#F2F7F9] text-[#4A6572]"
            }`}
          >
            {stepNote(i, current, o)}
          </span>
        </div>
        <p className="m-0 text-[13px] font-medium leading-[1.85] text-[#4A6572]">{TRACK_STEPS[i].body}</p>
        {isNow && o.status === "shipped" && (
          <span className="mt-1 w-fit rounded-[10px] bg-[#CDEFFB] px-2.5 py-1 text-[11.5px] font-bold text-[#04202E]">
            پست: کد رهگیری {fa(912)}{fa(34)}{fa(56)}{fa(78)}{fa(90)}
          </span>
        )}
        {isNow && o.status === "delivered" && (
          <span className="mt-1 w-fit rounded-[10px] bg-[#D7F5E4] px-2.5 py-1 text-[11.5px] font-bold text-[#04202E]">
            {o.dir === "recv" ? "رمز کارت رو بزن و پیامت رو ببین!" : `رمز کارت: ${o.password || "بهار"}`}
          </span>
        )}
      </div>
    </li>
  );
}

/* ── order info card (shared) ── */
function InfoRow({ k, v, dir = "rtl" }: { k: string; v: string; dir?: "rtl" | "ltr" }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[#EDF6FA] py-2.5 last:border-0">
      <span className="shrink-0 text-[12.5px] font-semibold text-[#4A6572]">{k}</span>
      <span className="text-left text-[13px] font-bold" dir={dir}>
        {v}
      </span>
    </div>
  );
}

function PostcardCard({ o, compact = false }: { o: GiftOrder; compact?: boolean }) {
  return (
    <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[15px] font-extrabold">کارت پستالت</span>
        <QrCode size={34} />
      </div>
      <p
        className={`m-0 rounded-[16px] bg-[#F2FAFD] p-3.5 text-[13.5px] font-medium leading-[2] text-[#1F3E4D] ${
          compact ? "line-clamp-3" : ""
        }`}
      >
        {o.message || "پیامی نوشته نشده بود."}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-[#E3F6FD] px-3 py-1 text-[12px] font-bold text-[#006387]">
          {OCCASIONS[o.occasion] ?? "همین‌طوری"}
        </span>
        <span className="rounded-full bg-[#04202E] px-3 py-1 text-[12px] font-extrabold text-white">
          رمز: {o.password || "بهار"}
        </span>
        {o.anonymous && (
          <span className="rounded-full bg-[#FFE0EA] px-3 py-1 text-[12px] font-bold text-[#B02A52]">ناشناس</span>
        )}
      </div>
    </div>
  );
}

function EmptyTrack() {
  return (
    <div className="flex flex-col items-center gap-5 rounded-[28px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-14 text-center">
      <span className="text-[44px]">📦</span>
      <p className="m-0 text-[15.5px] font-bold leading-[2]">
        هنوز هدیه‌ای برای رهگیری انتخاب نشده.
        <br />
        از «هدیه‌هام» یه سفارش رو انتخاب کن.
      </p>
      <button
        type="button"
        onClick={() => navigate("my-gifts")}
        className="flex h-12 items-center gap-2 rounded-full bg-[#00ABE7] px-6 text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95"
      >
        رفتن به هدیه‌هام
        <ForwardIcon size={16} />
      </button>
    </div>
  );
}

/* ── share/copy gift info button (shared logic, two looks) ── */
function CopyGiftButton({ o, dark = false }: { o: GiftOrder; dark?: boolean }) {
  const { toast } = useToast();
  return (
    <button
      type="button"
      onClick={async () => {
        const link = `${window.location.origin}/#/gift`;
        const text = `یه بغل از پیشتم ♥\nهدیه‌ی شماره‌ی ${fa(o.no)} برای ${o.to}\nرمز کارت: ${o.password || "بهار"}\n${link}`;
        const ok = await copyText(text);
        toast(
          ok
            ? { title: "کپی شد ✓", description: "اطلاعات هدیه تو حافظه‌ست؛ براش بفرستش." }
            : {
                title: "کپی نشد؛ دستی بردار:",
                description: `هدیه‌ی ${fa(o.no)} برای ${o.to} · رمز: ${o.password || "بهار"}`,
              },
        );
      }}
      className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-full text-[14.5px] font-extrabold transition-transform active:scale-95 md:h-[54px] md:text-[15px] md:active:scale-100 md:hover:scale-[1.02] ${
        dark ? "border-2 border-[#04202E] text-[#04202E]" : "border-2 border-dashed border-[#9CC9DA] bg-white text-[#006387]"
      }`}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="12" height="12" rx="2.5" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      کپی اطلاعات هدیه
    </button>
  );
}

/* ═══ MOBILE ═══ */
export function MobileTrack() {
  const o = useSelectedOrder();
  const advanceStatus = usePishnam((s) => s.advanceStatus);
  const { toast } = useToast();

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD] md:hidden">
      <MobileTopBar title="رهگیری هدیه" back="my-gifts" />
      {!o ? (
        <div className="px-5 py-8">
          <EmptyTrack />
        </div>
      ) : (
        <>
          {/* header */}
          <div className="px-5 pb-1 pt-[18px]">
            <div className="flex items-center gap-3.5">
              <PlushTile o={o} size={64} box={76} />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <h1 className="m-0 truncate text-[24px] font-black leading-[1.4]">{who(o)}</h1>
                  <span className="shrink-0 rounded-[12px] bg-[#04202E] px-2.5 py-[3px] text-[12px] font-extrabold text-white">
                    {fa(o.no)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-[10px] px-2.5 py-1 text-[12px] font-bold"
                    style={{ background: STATUS_CHIP[o.status].bg }}
                  >
                    {STATUS_CHIP[o.status].label}
                  </span>
                  <span className="text-[12.5px] font-medium text-[#4A6572]">{o.date}</span>
                </div>
              </div>
            </div>
            {/* mini progress */}
            <div className="mt-4 flex items-center gap-3">
              <div className="h-[10px] flex-1 overflow-hidden rounded-full bg-[#E1EFF5]">
                <div
                  className="h-full rounded-full bg-[#00ABE7] transition-[width] duration-700 ease-out"
                  style={{ width: `${((statusToStep(o.status) + 1) / 4) * 100}%` }}
                />
              </div>
              <span className="shrink-0 text-[12px] font-extrabold text-[#006387]">
                {fa(statusToStep(o.status) + 1)} از {fa(4)} قدم
              </span>
            </div>
          </div>

          {/* timeline */}
          <div className="mt-4 px-5">
            <div className="rounded-[24px] border border-[#DDEEF5] bg-white p-5">
              <ol className="m-0 list-none p-0">
                {TRACK_STEPS.map((_, i) => (
                  <TimelineRow key={TRACK_STEPS[i].key} i={i} current={statusToStep(o.status)} o={o} />
                ))}
              </ol>
            </div>
          </div>

          {/* details */}
          <div className="mt-4 px-5">
            <div className="rounded-[24px] border border-[#DDEEF5] bg-white px-5 py-2.5">
              <InfoRow k="گیرنده" v={o.dir === "sent" ? o.to : "تو"} />
              <InfoRow k="شهر" v={o.city} />
              {o.address && <InfoRow k="آدرس" v={o.address} />}
              <InfoRow k="قلب و پنجه" v={extras(o)} />
              <InfoRow k="مبلغ پرداختی" v={`${faPrice(o.total)} تومان`} />
            </div>
          </div>

          {/* postcard */}
          <div className="mt-4 px-5">
            <PostcardCard o={o} compact />
          </div>

          {/* actions */}
          <div className="sticky bottom-0 mt-auto flex flex-col gap-2.5 border-t border-[#D3E8F0] bg-white/95 px-5 pb-[max(14px,env(safe-area-inset-bottom))] pt-3.5">
            <div className="flex gap-3">
              {o.dir === "recv" && (
                <button
                  type="button"
                  onClick={() => navigate("gift")}
                  className="flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#E3F6FD] text-[14.5px] font-extrabold text-[#006387] transition-transform active:scale-95"
                >
                  مشاهده‌ی پیام
                  <ForwardIcon size={16} stroke="#006387" />
                </button>
              )}
              {o.dir === "sent" && o.status !== "delivered" && (
                <button
                  type="button"
                  onClick={() => {
                    advanceStatus(o.id);
                    toast({ title: "یه قدم جلوتر رفت! 🚚", description: "مسیر هدیه به‌روز شد." });
                  }}
                  className="flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#00ABE7] text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95"
                >
                  قدم بعدی: {NEXT_LABEL[o.status]}
                  <ForwardIcon size={16} />
                </button>
              )}
              {o.dir === "sent" && o.status === "delivered" && (
                <button
                  type="button"
                  onClick={() => navigate("pick")}
                  className="flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#00ABE7] text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95"
                >
                  یه بغل دیگه بفرست
                  <ForwardIcon size={16} />
                </button>
              )}
            </div>
            <CopyGiftButton o={o} />
          </div>
        </>
      )}
    </div>
  );
}

/* ═══ DESKTOP ═══ */
export function DesktopTrack() {
  const o = useSelectedOrder();
  const advanceStatus = usePishnam((s) => s.advanceStatus);
  const { toast } = useToast();

  if (!o)
    return (
      <div className="hidden min-h-screen flex-col bg-[#F2FAFD] md:flex">
        <main className="mx-auto w-full max-w-[1200px] px-6 pt-12">
          <EmptyTrack />
        </main>
      </div>
    );

  const cur = statusToStep(o.status);

  return (
    <div className="hidden min-h-screen flex-col bg-[#F2FAFD] md:flex">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-7 px-6 pb-14 pt-10">
        {/* breadcrumb + heading */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[13.5px] font-bold text-[#4A6572]">
            <button type="button" onClick={() => navigate("my-gifts")} className="text-[#00779F] hover:underline">
              هدیه‌هام
            </button>
            <span>/</span>
            <span>رهگیری هدیه‌ی {fa(o.no)}</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="m-0 text-[44px] font-black leading-[1.35]">سفر جعبه‌ی {fa(o.no)}</h1>
              <p className="m-0 text-[15px] font-medium text-[#4A6572]">
                {who(o)} · {o.date} · {extras(o)}
              </p>
            </div>
            <span
              className="rounded-[14px] px-4 py-2 text-[14px] font-extrabold"
              style={{ background: STATUS_CHIP[o.status].bg }}
            >
              {STATUS_CHIP[o.status].label}
            </span>
          </div>
        </section>

        {/* horizontal stepper */}
        <section className="rounded-[28px] border border-[#DDEEF5] bg-white p-7">
          <div className="relative flex items-start justify-between">
            <div className="absolute inset-x-[46px] top-[23px] h-[3px] rounded bg-[#E1EFF5]" aria-hidden>
              <div
                className="h-full rounded bg-[#00ABE7] transition-[width] duration-700 ease-out"
                style={{ width: `${(cur / 3) * 100}%` }}
              />
            </div>
            {TRACK_STEPS.map((s, i) => {
              const done = i < cur;
              const isNow = i === cur;
              return (
                <div key={s.key} className="relative z-10 flex w-[130px] flex-col items-center gap-2 text-center">
                  <span
                    className={`flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 ${
                      done
                        ? "border-[#00ABE7] bg-[#00ABE7] text-white"
                        : isNow
                          ? "border-[#00ABE7] bg-white text-[#00ABE7] pishnam-pulse-ring"
                          : "border-dashed border-[#9CC9DA] bg-white text-[#4A6572]"
                    }`}
                  >
                    {done ? <CheckIcon size={18} stroke="#fff" /> : <span className="font-black">{fa(i + 1)}</span>}
                  </span>
                  <span className={`text-[14.5px] font-extrabold ${isNow ? "text-[#00779F]" : ""}`}>{s.label}</span>
                  <span className="text-[11.5px] font-semibold text-[#4A6572]">{stepNote(i, cur, o)}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* two columns */}
        <section className="grid grid-cols-[1fr_400px] gap-7">
          {/* right: vertical timeline + details */}
          <div className="flex flex-col gap-7">
            <div className="rounded-[28px] border border-[#DDEEF5] bg-white p-7">
              <h2 className="mb-5 mt-0 text-[19px] font-extrabold">قدم‌به‌قدم</h2>
              <ol className="m-0 list-none p-0">
                {TRACK_STEPS.map((_, i) => (
                  <TimelineRow key={TRACK_STEPS[i].key} i={i} current={cur} o={o} big />
                ))}
              </ol>
            </div>
            <div className="rounded-[28px] border border-[#DDEEF5] bg-white px-6 py-2.5">
              <h2 className="mb-1 mt-4 text-[19px] font-extrabold">جزئیات سفارش</h2>
              <InfoRow k="گیرنده" v={o.dir === "sent" ? o.to : "تو"} />
              <InfoRow k="شهر" v={o.city} />
              {o.address && <InfoRow k="آدرس" v={o.address} />}
              <InfoRow k="تاریخ" v={o.date} />
              <InfoRow k="قلب و پنجه" v={extras(o)} />
              <InfoRow k="مبلغ پرداختی" v={`${faPrice(o.total)} تومان`} />
              <div className="h-3" />
            </div>
          </div>

          {/* left: plush + postcard + actions */}
          <div className="flex flex-col gap-7">
            <div className="rounded-[28px] border border-[#DDEEF5] bg-white p-6">
              <PlushTile o={o} size={170} box={190} />
              <div className="mt-4 text-center">
                <div className="text-[18px] font-black">{PLUSH_MAP[o.kind].name}</div>
                <div className="mt-1 text-[13px] font-medium text-[#4A6572]">{PLUSH_MAP[o.kind].chips.join(" · ")}</div>
              </div>
            </div>

            <PostcardCard o={o} />

            <div className="flex flex-col gap-3">
              {o.dir === "recv" && (
                <button
                  type="button"
                  onClick={() => navigate("gift")}
                  className="flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#E3F6FD] text-[15px] font-extrabold text-[#006387] transition-transform hover:scale-[1.02]"
                >
                  مشاهده‌ی پیام
                  <ForwardIcon size={16} stroke="#006387" />
                </button>
              )}
              {o.dir === "sent" && o.status !== "delivered" && (
                <button
                  type="button"
                  onClick={() => {
                    advanceStatus(o.id);
                    toast({ title: "یه قدم جلوتر رفت! 🚚", description: "مسیر هدیه به‌روز شد." });
                  }}
                  className="flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-[15px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02]"
                >
                  قدم بعدی: {NEXT_LABEL[o.status]}
                  <ForwardIcon size={16} />
                </button>
              )}
              {o.dir === "sent" && o.status === "delivered" && (
                <button
                  type="button"
                  onClick={() => navigate("pick")}
                  className="flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#00ABE7] text-[15px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02]"
                >
                  یه بغل دیگه بفرست
                  <ForwardIcon size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={() => navigate("my-gifts")}
                className="flex h-[54px] items-center justify-center gap-2 rounded-full border-2 border-[#04202E] text-[15px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.02]"
              >
                برگرد به هدیه‌هام
              </button>
              <CopyGiftButton o={o} dark />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
