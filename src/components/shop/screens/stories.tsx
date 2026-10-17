"use client";

// ── «تجربه مخاطب» — published UGC stories + submit form (Phase C, guide 13-f) ──
// Read: GET /api/stories (published only). Write: POST /api/experiences —
// JSON or multipart (+ optional photo ≤5MB jpeg/png/webp). Every submission
// lands as "pending" and only appears here after a manual admin publish.
// Photos have no public GET in the sandbox — a story with a photoKey shows a
// soft heart placeholder (the key is kept for the deploy-wave S3 swap).
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Plush } from "../plush";
import { BackIcon, HeartSticker } from "../icons";
import { navigate } from "@/lib/hash-route";
import { OCCASIONS } from "@/lib/pishnam-data";
import { fa } from "@/lib/fa";
import { useDocumentMeta } from "@/lib/seo/metadata";

interface Story {
  id: string;
  name: string;
  city: string;
  occasion: number;
  body: string;
  photoKey: string;
  publishedAt: string;
}

const MAX_BODY = 1500;
const MIN_BODY = 20;
const MAX_PHOTO = 5 * 1024 * 1024;
const OK_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

const CLAMP_6: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 6,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const INPUT_CLS =
  "w-full rounded-[18px] border-[1.5px] border-[#CFE6EF] bg-white px-4 text-[15px] font-semibold text-[#04202E] outline-none transition-shadow placeholder:font-normal placeholder:text-[#8FA8B5] focus:border-[#00ABE7] focus:shadow-[0_0_0_4px_rgba(0,171,231,0.12)]";

function occasionLabel(i: number): string {
  return OCCASIONS[i] ?? OCCASIONS[0];
}

/* ── one published story card ── */
function StoryCard({ s }: { s: Story }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3 rounded-[24px] border border-[#DDEEF5] bg-white p-5 transition-shadow hover:shadow-[0_8px_22px_rgba(4,32,46,0.06)]">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFE0EA] text-[17px]">
          {s.name.trim().slice(0, 1)}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate text-[15px] font-extrabold text-[#04202E]">
            {s.name}
            {s.city ? <span className="font-semibold text-[#4A6572]"> · {s.city}</span> : null}
          </span>
          <span className="self-start rounded-full bg-[#FFF3C9] px-2.5 py-0.5 text-[11.5px] font-extrabold text-[#8A6D1F]">
            {occasionLabel(s.occasion)}
          </span>
        </div>
        <span aria-hidden="true" className="shrink-0 text-[18px]">🎁</span>
      </div>

      {s.photoKey ? (
        <div
          aria-label="این تجربه با عکس همراه بوده"
          className="flex h-[92px] items-center justify-center gap-2.5 rounded-[18px] bg-[#FFE9F0]"
        >
          <HeartSticker size={30} fill="#F0426B" stroke="#04202E" strokeWidth={2.4} />
          <HeartSticker size={20} fill="#fff" stroke="#04202E" strokeWidth={2.4} />
        </div>
      ) : null}

      <p
        className="m-0 whitespace-pre-line text-[14px] font-medium leading-[2] text-[#1F3E4D]"
        style={open ? undefined : CLAMP_6}
      >
        {s.body}
      </p>
      {s.body.length > 220 && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="self-start text-[12.5px] font-extrabold text-[#00779F] underline underline-offset-4 transition-colors hover:text-[#04202E]"
        >
          {open ? "بستن" : "ادامه‌ی متن"}
        </button>
      )}
    </div>
  );
}

/* ── submit form ── */
function StoryForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [occasion, setOccasion] = useState(0);
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoErr, setPhotoErr] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentErr, setConsentErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const tooShort = body.trim().length > 0 && body.trim().length < MIN_BODY;

  const pickPhoto = (f: File | null) => {
    setPhotoErr("");
    if (!f) {
      setPhoto(null);
      return;
    }
    if (!(OK_PHOTO_TYPES as string[]).includes(f.type)) {
      setPhotoErr("عکس باید JPG، PNG یا WebP باشه.");
      return;
    }
    if (f.size > MAX_PHOTO) {
      setPhotoErr("حجم عکس باید کمتر از ۵ مگابایت باشه.");
      return;
    }
    setPhoto(f);
  };

  const submit = async () => {
    if (busy) return;
    setServerErr("");
    if (name.trim().length < 2) {
      setServerErr("اسمت رو بنویس (حداقل ۲ حرف).");
      return;
    }
    if (body.trim().length < MIN_BODY) {
      setServerErr(`متن تجربه باید حداقل ${fa(MIN_BODY)} حرف باشه.`);
      return;
    }
    if (!consent) {
      setConsentErr(true);
      setServerErr("برای فرستادن، اول کادر اجازه‌ی انتشار رو تیک بزن.");
      return;
    }
    setConsentErr(false);
    setBusy(true);
    try {
      let res: Response;
      if (photo) {
        const fd = new FormData();
        fd.append("name", name.trim());
        fd.append("city", city.trim());
        fd.append("occasion", String(occasion));
        fd.append("body", body.trim());
        fd.append("consent", "true");
        fd.append("photo", photo);
        res = await fetch("/api/experiences", { method: "POST", body: fd });
      } else {
        res = await fetch("/api/experiences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            city: city.trim(),
            occasion,
            body: body.trim(),
            consent: true,
          }),
        });
      }
      if (res.status === 201) {
        setDone(true);
        return;
      }
      if (res.status === 429) {
        setServerErr("امروز قبلاً ثبت کردی، فردا دوباره 🙂");
        return;
      }
      if (res.status === 400) {
        setServerErr("چیزی از فرم درست نیست — اسم و متن تجربه رو یک بار دیگه چک کن (متن حداقل ۲۰ حرف).");
        return;
      }
      setServerErr("ارسال نشد — دوباره تلاش کن.");
    } catch {
      setServerErr("اینترنت در دسترس نیست؛ کمی بعد دوباره امتحان کن.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-[#BFE5D3] bg-[#F2FBF6] px-6 py-12 text-center">
        <Plush kind="bunny" size={120} />
        <span className="text-[20px] font-black text-[#04202E]">دریافت شد! بعد از تأیید منتشر می‌شه 💚</span>
        <span className="max-w-[420px] text-[13.5px] font-medium leading-[1.95] text-[#4A6572]">
          تجربه‌ات اول دست تیم یک دوست می‌رسه؛ به محض تأیید، همین صفحه با اسم و شهری که نوشتی پُر می‌شه.
        </span>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setName("");
            setCity("");
            setOccasion(0);
            setBody("");
            setPhoto(null);
            setConsent(false);
          }}
          className="flex h-11 items-center rounded-full bg-[#00ABE7] px-6 text-[13.5px] font-extrabold text-[#04202E] transition-transform active:scale-95"
        >
          یه تجربه‌ی دیگه بنویس
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-[#DDEEF5] bg-white p-5 md:p-7">
      <div className="flex items-center gap-2.5">
        <span aria-hidden="true" className="text-[22px]">✍️</span>
        <h2 className="m-0 text-[20px] font-black text-[#04202E] md:text-[24px]">تجربه‌ات رو بنویس</h2>
      </div>
      <p className="m-0 text-[13.5px] font-medium leading-[1.95] text-[#4A6572]">
        اگه تا حالا برات یه جعبه‌ی یک دوست اومده، حس اون لحظه رو برامون بنویس. قشنگ‌ترین‌ها با اسم و
        شهرت همین‌جا منتشر می‌شن.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-[13.5px] font-extrabold text-[#04202E]">اسم تو *</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 40))}
            placeholder="مثلاً: سارا"
            className={`${INPUT_CLS} h-12`}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[13.5px] font-extrabold text-[#04202E]">شهر (اختیاری)</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value.slice(0, 40))}
            placeholder="مثلاً: تهران"
            className={`${INPUT_CLS} h-12`}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[13.5px] font-extrabold text-[#04202E]">بهانه‌ی هدیه</span>
          <select
            value={occasion}
            onChange={(e) => setOccasion(Number(e.target.value))}
            className={`${INPUT_CLS} h-12`}
          >
            {OCCASIONS.map((o, i) => (
              <option key={o} value={i}>{o}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[13.5px] font-extrabold text-[#04202E]">عکس (اختیاری)</span>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => pickPhoto(e.target.files?.[0] ?? null)}
            className="h-12 w-full cursor-pointer rounded-[18px] border-[1.5px] border-dashed border-[#CFE6EF] bg-[#F8FDFF] px-3.5 pt-2.5 text-[12.5px] font-semibold text-[#4A6572] file:mr-3 file:rounded-full file:border-0 file:bg-[#E3F6FD] file:px-3 file:py-1 file:text-[12px] file:font-extrabold file:text-[#006387]"
          />
        </label>
      </div>
      {photoErr ? (
        <span className="text-[12.5px] font-bold text-[#F0426B]">{photoErr}</span>
      ) : photo ? (
        <span className="text-[12.5px] font-bold text-[#2E7D53]">عکس انتخاب شد: {photo.name}</span>
      ) : (
        <span className="text-[12px] font-medium text-[#8FA8B5]">JPG / PNG / WebP — حداکثر ۵ مگابایت</span>
      )}

      <label className="flex flex-col gap-1.5">
        <span className="text-[13.5px] font-extrabold text-[#04202E]">تجربه‌ات *</span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value.slice(0, MAX_BODY))}
          rows={5}
          placeholder="مثلاً: جعبه که باز شد، اول عکس‌ها رو دید و بعد کارت رو… از اون روز، عروسک جاش تو مبل خونمه."
          className={`${INPUT_CLS} resize-y py-3 leading-[2]`}
        />
        <span className="flex items-center justify-between gap-2">
          <span className={`text-[12px] font-bold ${tooShort ? "text-[#F0426B]" : "text-[#8FA8B5]"}`}>
            {tooShort ? `از ${fa(MIN_BODY)} حرف بیشتر بنویس` : `حداقل ${fa(MIN_BODY)} حرف`}
          </span>
          <span className={`text-[12px] font-extrabold ${body.length >= MAX_BODY ? "text-[#F0426B]" : "text-[#4A6572]"}`} dir="ltr">
            {fa(body.length)} / {fa(MAX_BODY)}
          </span>
        </span>
      </label>

      <label
        className={`flex cursor-pointer items-start gap-3 rounded-[18px] border-[1.5px] p-3.5 transition-colors ${
          consentErr ? "border-[#F7C5D3] bg-[#FFF7FA]" : "border-[#CFE6EF] bg-[#F8FDFF]"
        }`}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (e.target.checked) setConsentErr(false);
          }}
          className="mt-1 h-5 w-5 shrink-0 accent-[#00ABE7]"
        />
        <span className="text-[13px] font-semibold leading-[1.95] text-[#1F3E4D]">
          با تأیید این کادر قبول می‌کنم که تجربه‌ام بعد از تأیید دستی تیم یک دوست، همراه با اسم و شهری
          که نوشتم تو صفحه‌ی «تجربه مخاطب» منتشر بشه.
        </span>
      </label>

      {serverErr && (
        <span className="rounded-[14px] bg-[#FFF7FA] px-4 py-2.5 text-[13px] font-bold text-[#B02A52]">
          {serverErr}
        </span>
      )}

      <button
        type="button"
        onClick={() => void submit()}
        disabled={busy}
        className="flex h-[54px] items-center justify-center rounded-full bg-[#00ABE7] text-[16px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60"
      >
        {busy ? "در حال فرستادن…" : "فرستادن قصه‌ات"}
      </button>
    </div>
  );
}

/* ── screen ── */
export function StoriesScreen() {
  useDocumentMeta({
    title: "قصه‌ی شما — تجربه‌های یک دوستی",
    description: "قصه‌ی کسانی که با یک دوست برای عزیزشون یه بغل پشمالو فرستادن — و جای نوشتن قصه‌ی تو.",
  });

  const [stories, setStories] = useState<Story[] | null>(null);
  const [loadErr, setLoadErr] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/stories", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: { stories?: Story[] }) => {
        setStories(j.stories ?? []);
        setLoadErr(false);
      })
      .catch(() => setLoadErr(true));
  }, []);

  const goForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD]">
      {/* mobile top bar */}
      <div className="flex items-center justify-between px-5 pb-1.5 pt-4 md:hidden">
        <button
          type="button"
          aria-label="برگشت"
          onClick={() => navigate("home")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]"
        >
          <BackIcon size={22} />
        </button>
        <span aria-hidden="true" className="text-[22px]">🎁</span>
      </div>

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 pb-12 pt-3 md:px-6 md:pt-8">
        {/* hero */}
        <section className="flex flex-col items-start gap-3">
          <span className="rounded-[14px] bg-[#04202E] px-3.5 py-[7px] text-[13px] font-bold text-white">
            قصه‌ی شما
          </span>
          <h1 className="m-0 text-[30px] font-black leading-[1.45] text-[#04202E] md:text-[40px]">
            قصه‌ی بغل‌هایی که رسیدن
          </h1>
          <p className="m-0 max-w-[640px] text-[15px] font-medium leading-[2] text-[#1F3E4D] md:text-[16.5px]">
            این‌جا قصه‌های واقعی گیرنده‌ها و فرستنده‌هاست؛ از لحظه‌ای که جعبه‌ی یک دوست باز شد و یه بغل
            از راه رسید. قصه‌ی تو هم می‌تونه این‌جا بشینه — پایین بنویسش، بعد از تأیید منتشرش می‌کنیم.
          </p>
        </section>

        {/* stories grid */}
        <section className="flex flex-col gap-4 pt-7">
          <div className="flex items-center justify-between gap-3">
            <h2 className="m-0 text-[20px] font-black text-[#04202E] md:text-[26px]">تجربه‌های منتشرشده</h2>
            <span className="rounded-full bg-[#E3F6FD] px-3 py-1 text-[12px] font-extrabold text-[#006387]">
              {stories ? `${fa(stories.length)} تجربه` : "…"}
            </span>
          </div>

          {loadErr ? (
            <div className="rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]">
              تجربه‌ها لود نشدن — صفحه رو یک بار دیگه باز کن.
            </div>
          ) : stories === null ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[220px] animate-pulse rounded-[24px] bg-white/70" />
              ))}
            </div>
          ) : stories.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
              <Plush kind="bunny" size={130} />
              <span className="text-[17px] font-black text-[#04202E]">هنوز اولین تجربه منتشر نشده</span>
              <span className="max-w-[400px] text-[13.5px] font-medium leading-[1.95] text-[#4A6572]">
                شاید تو اولین نفر باشی! تجربه‌ات رو بنویس تا بعد از تأیید، اولین قصه‌ی این صفحه باشه.
              </span>
              <button
                type="button"
                onClick={goForm}
                className="flex h-12 items-center rounded-full bg-[#00ABE7] px-6 text-[14.5px] font-extrabold text-[#04202E] transition-transform hover:scale-[1.03] active:scale-95"
              >
                نوشتن تجربه
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {stories.map((s) => (
                <StoryCard key={s.id} s={s} />
              ))}
            </div>
          )}
        </section>

        {/* submit form */}
        <section ref={formRef} className="scroll-mt-6 pt-9">
          <StoryForm />
        </section>
      </main>

      {/* keeps the mobile nav pinned to the bottom on short pages */}
      <div className="mt-auto" aria-hidden="true" />
    </div>
  );
}
