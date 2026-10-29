"use client";

// ── Blog: index (/blog) + post (/post?slug=…) — round 34-h «جعبه آبی» ──
// Index reads GET /api/posts (published only, cover included). PostScreen reads
// GET /api/posts/[slug] (cover + metaTitle + metaDescription) and renders the
// body through <MarkdownPro> — the hand-rolled XSS-safe renderer (no raw HTML
// ever reaches the DOM). SEO: usePostSeo (title/desc/OG/canonical) + JSON-LD
// BlogPosting + BreadcrumbList.
import { useEffect, useState } from "react";
import { Plush } from "../plush";
import { BackIcon, ForwardIcon } from "../icons";
import { navigate } from "@/lib/hash-route";
import { MarkdownPro, countWords } from "../blog/md-pro";
import { useDocumentMeta, usePostSeo } from "@/lib/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { SITE } from "@/lib/seo/site";
import { JsonLd } from "../jsonld";
import { fa } from "@/lib/fa";

interface PostRow {
  slug: string;
  title: string;
  excerpt: string;
  tags: string;
  cover: string | null;
  publishedAt: string;
}

const faDate = (iso: string) =>
  new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(new Date(iso));

const tagList = (tags: string) =>
  tags.split(/[،,]/).map((t) => t.trim()).filter(Boolean);

function TagChips({ tags, max = 3 }: { tags: string; max?: number }) {
  const list = tagList(tags);
  if (list.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {list.slice(0, max).map((t) => (
        <span key={t} className="rounded-full bg-[#E3F6FD] px-2.5 py-1 text-[11.5px] font-extrabold text-[#006387]">
          {t}
        </span>
      ))}
    </div>
  );
}

function MobileBar({ back, label }: { back: "home" | "blog"; label?: string }) {
  return (
    <div className="flex items-center justify-between px-5 pb-1.5 pt-4 md:hidden">
      <button
        type="button"
        aria-label="برگشت"
        onClick={() => navigate(back)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D3E8F0] bg-white text-[#04202E]"
      >
        <BackIcon size={22} />
      </button>
      {label && <span className="text-sm font-bold text-[#4A6572]">{label}</span>}
      <span aria-hidden="true" className="text-[22px]">🧸</span>
    </div>
  );
}

/** Pastel empty-state art for cards without a cover. */
function PastelArt() {
  return (
    <div
      className="flex aspect-[16/9] w-full items-center justify-center rounded-[20px] border border-[#DDEEF5]"
      style={{ backgroundImage: "linear-gradient(135deg,#E3F6FD 0%,#F2FAFD 55%,#FFF7FA 100%)" }}
      aria-hidden="true"
    >
      <span className="text-[38px] drop-shadow-sm">🧸</span>
    </div>
  );
}

/* ═══════════ blog index (/blog) ═══════════ */

export function BlogIndex() {
  useDocumentMeta({
    title: "بلاگ جعبه آبی",
    description:
      "ایده‌های هدیه دادن، راهنمای عروسک پولیشی و قصه‌های پشمالوی جعبه آبی — متن‌های کوتاه و گرم برای بهانه‌های قشنگ.",
  });

  const [posts, setPosts] = useState<PostRow[] | null>(null);
  const [loadErr, setLoadErr] = useState(false);

  useEffect(() => {
    fetch("/api/posts", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((j: { posts?: PostRow[] }) => {
        setPosts(j.posts ?? []);
        setLoadErr(false);
      })
      .catch(() => setLoadErr(true));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD]">
      <MobileBar back="home" label="بلاگ" />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 pb-12 pt-3 md:px-6 md:pt-8">
        {/* hero */}
        <section className="flex flex-col items-start gap-3">
          <span className="rounded-[14px] bg-[#04202E] px-3.5 py-[7px] text-[13px] font-bold text-white">
            بلاگ جعبه آبی
          </span>
          <h1 className="m-0 text-[30px] font-black leading-[1.45] text-[#04202E] md:text-[40px]">
            از هدیه دادن، با حروف
          </h1>
          <p className="m-0 max-w-[640px] text-[15px] font-medium leading-[2] text-[#1F3E4D] md:text-[16.5px]">
            ایده‌های هدیه، راهنمای بهانه‌گیری و چیزهایی که درباره‌ی جعبه‌های آبی و عروسک‌های
            پولیشی دوست داریم باهات در میون بذاریم.
          </p>
        </section>

        {/* posts */}
        <section className="flex flex-col gap-4 pt-7">
          {loadErr ? (
            <div className="rounded-[24px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-10 text-center text-[14px] font-bold text-[#B02A52]">
              پست‌ها لود نشدن — صفحه رو یک بار دیگه باز کن.
            </div>
          ) : posts === null ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[300px] animate-pulse rounded-[24px] bg-white/70" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
              <Plush kind="sheep" size={130} />
              <span className="text-[17px] font-black text-[#04202E]">هنوز پستی منتشر نشده</span>
              <span className="max-w-[400px] text-[13.5px] font-medium leading-[1.95] text-[#4A6572]">
                داریم می‌نویسیم! تا اون موقع یه سر به تجربه‌های مخاطب‌ها بزن.
              </span>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => navigate("post", { slug: p.slug })}
                  className="group flex flex-col items-start gap-3 rounded-[24px] border border-[#DDEEF5] bg-white p-4 text-right transition-all duration-200 hover:-translate-y-1 hover:border-[#00ABE7] hover:shadow-[0_14px_30px_rgba(4,32,46,0.10)]"
                >
                  {p.cover ? (
                    <img
                      src={p.cover}
                      alt={p.title}
                      loading="lazy"
                      className="aspect-[16/9] w-full rounded-[20px] border border-[#DDEEF5] object-cover"
                    />
                  ) : (
                    <PastelArt />
                  )}
                  <span className="flex items-center gap-2 text-[12px] font-bold text-[#4A6572]">
                    <time dateTime={p.publishedAt || undefined}>
                      {p.publishedAt ? faDate(p.publishedAt) : ""}
                    </time>
                  </span>
                  <span className="text-[17px] font-black leading-[1.7] text-[#04202E] group-hover:text-[#00779F]">
                    {p.title}
                  </span>
                  {p.excerpt && (
                    <span className="line-clamp-2 text-[13.5px] font-medium leading-[2] text-[#4A6572]">
                      {p.excerpt}
                    </span>
                  )}
                  <TagChips tags={p.tags} max={3} />
                  <span className="mt-auto flex items-center gap-1.5 pt-1 text-[13px] font-extrabold text-[#00779F]">
                    خواندن پست
                    <ForwardIcon size={15} stroke="#00779F" />
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* cross-link: pick */}
        <section className="grid gap-4 pt-8 md:grid-cols-2">
          <button
            type="button"
            onClick={() => navigate("pick")}
            className="flex w-full items-center gap-4 rounded-[24px] bg-[#00ABE7] p-5 text-right transition-transform hover:scale-[1.01]"
          >
            <span aria-hidden="true" className="text-[26px]">🧸</span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-[15.5px] font-black text-[#04202E]">یه جعبه آبی بفرست</span>
              <span className="text-[13px] font-semibold leading-[1.9] text-[#04202E]/80">
                یه دوست پشمالو با پیام خودت — «یکی دوستت داره».
              </span>
            </span>
            <ForwardIcon size={20} stroke="#04202E" />
          </button>

          <button
            type="button"
            onClick={() => navigate("stories")}
            className="flex w-full items-center gap-4 rounded-[24px] border-2 border-dashed border-[#F7C5D3] bg-[#FFF7FA] p-5 text-right transition-transform hover:scale-[1.01]"
          >
            <span aria-hidden="true" className="text-[26px]">🎁</span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-[15px] font-black text-[#04202E]">داستان مخاطب‌ها</span>
              <span className="text-[13px] font-medium leading-[1.9] text-[#4A6572]">
                تجربه‌ی کسانی که جعبه‌شون رسیده — و جای تجربه‌ی تو هم خالیه.
              </span>
            </span>
            <ForwardIcon size={20} stroke="#B02A52" />
          </button>
        </section>
      </main>

      <div className="mt-auto" aria-hidden="true" />
    </div>
  );
}

/* ═══════════ single post (/post?slug=…) ═══════════ */

interface FullPost extends PostRow {
  content: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt: string;
}

const readingMinutes = (content: string) =>
  Math.max(1, Math.ceil(countWords(content) / 200));

export function PostScreen({ slug }: { slug: string }) {
  // fetch result is slug-tagged: a mismatch means a new slug is in flight → loading
  const [res, setRes] = useState<{ slug: string; kind: "ok" | "notfound" | "err"; post?: FullPost } | null>(null);
  const show = res && res.slug === slug ? res : null;

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    fetch(`/api/posts/${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then(async (r) => {
        if (!alive) return;
        if (r.status === 404) {
          setRes({ slug, kind: "notfound" });
          return;
        }
        if (!r.ok) throw new Error();
        const j = (await r.json()) as { post?: FullPost };
        if (!alive) return;
        if (j.post) setRes({ slug, kind: "ok", post: j.post });
        else setRes({ slug, kind: "notfound" });
      })
      .catch(() => {
        if (alive) setRes({ slug, kind: "err" });
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  const post = show?.kind === "ok" ? (show.post as FullPost) : null;

  // SEO: metaTitle/metaDescription + OG article bundle + canonical
  usePostSeo(post);

  if (!slug || show?.kind === "notfound") {
    return (
      <div className="flex min-h-screen flex-col bg-[#F2FAFD]">
        <MobileBar back="blog" />
        <main className="mx-auto flex w-full max-w-[1200px] flex-1 items-center justify-center px-4 pb-12">
          <div className="flex flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-[#99D6EE] bg-white/60 px-6 py-12 text-center">
            <Plush kind="panda" size={130} />
            <span className="text-[18px] font-black text-[#04202E]">پست پیدا نشد</span>
            <span className="max-w-[380px] text-[13.5px] font-medium leading-[1.95] text-[#4A6572]">
              شاید این پست جابه‌جا شده یا منتشر نشده. بقیه‌ی پست‌های جعبه آبی منتظرتن!
            </span>
            <button
              type="button"
              onClick={() => navigate("blog")}
              className="flex h-12 items-center rounded-full bg-[#00ABE7] px-6 text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95"
            >
              بازگشت به بلاگ
            </button>
          </div>
        </main>
        <div className="mt-auto" aria-hidden="true" />
      </div>
    );
  }

  if (!show || show.kind === "err" || !post) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F2FAFD]">
        <MobileBar back="blog" />
        <main className="mx-auto w-full max-w-[760px] flex-1 px-4 pb-12 pt-6">
          {show?.kind === "err" ? (
            <div className="flex flex-col items-center gap-4 rounded-[28px] border-2 border-dashed border-[#F0B7C9] bg-[#FFF7FA] px-6 py-12 text-center">
              <Plush kind="duck" size={110} />
              <span className="text-[16px] font-black text-[#04202E]">پست لود نشد</span>
              <span className="text-[13.5px] font-medium text-[#4A6572]">اینترنت رو چک کن و صفحه رو دوباره باز کن.</span>
              <button
                type="button"
                onClick={() => navigate("blog")}
                className="flex h-12 items-center rounded-full bg-[#00ABE7] px-6 text-[14.5px] font-extrabold text-[#04202E] transition-transform active:scale-95"
              >
                بازگشت به بلاگ
              </button>
            </div>
          ) : (
            <div className="h-[300px] animate-pulse rounded-[28px] bg-white/70" />
          )}
        </main>
        <div className="mt-auto" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F2FAFD]">
      {/* JSON-LD: BlogPosting + BreadcrumbList (خانه ← بلاگ ← پست) */}
      <JsonLd
        data={articleJsonLd({
          slug: post.slug,
          headline: post.metaTitle || post.title,
          description: post.metaDescription || post.excerpt,
          image: post.cover,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt || post.publishedAt,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "خانه", url: `${SITE.url}/` },
          { name: "بلاگ", url: `${SITE.url}/blog` },
          { name: post.title },
        ])}
      />

      <MobileBar back="blog" label="بلاگ" />

      <main className="mx-auto w-full max-w-[760px] flex-1 px-4 pb-12 pt-3 md:px-6 md:pt-8">
        <article className="flex flex-col gap-4 rounded-[28px] border border-[#DDEEF5] bg-white p-5 md:p-9">
          {post.cover ? (
            <img
              src={post.cover}
              alt={post.title}
              className="aspect-[16/9] w-full rounded-[20px] border border-[#DDEEF5] object-cover"
            />
          ) : (
            <PastelArt />
          )}
          <h1 className="m-0 text-[26px] font-black leading-[1.6] text-[#04202E] md:text-[34px]">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-[#E3F6FD] px-3 py-1 text-[12px] font-extrabold text-[#006387]">
              {post.publishedAt ? (
                <time dateTime={post.publishedAt}>{faDate(post.publishedAt)}</time>
              ) : (
                "در انتظار انتشار"
              )}
            </span>
            <span className="rounded-full bg-[#F2FAFD] px-3 py-1 text-[12px] font-extrabold text-[#00779F]">
              ⏱ {fa(readingMinutes(post.content))} دقیقه مطالعه
            </span>
            <TagChips tags={post.tags} max={4} />
          </div>
          <div className="border-t border-[#EDF6FA] pt-5">
            <MarkdownPro text={post.content} />
          </div>
        </article>

        {/* back + cross CTA */}
        <div className="flex flex-col gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate("blog")}
            className="self-start text-[13.5px] font-extrabold text-[#00779F] underline underline-offset-4 transition-colors hover:text-[#04202E]"
          >
            بازگشت به بلاگ
          </button>

          <button
            type="button"
            onClick={() => navigate("pick")}
            className="flex w-full items-center gap-4 rounded-[24px] bg-[#00ABE7] p-5 text-right transition-transform hover:scale-[1.01]"
          >
            <span aria-hidden="true" className="text-[26px]">🧸</span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-[15.5px] font-black text-[#04202E]">یه جعبه آبی بفرست</span>
              <span className="text-[13px] font-semibold leading-[1.9] text-[#04202E]/80">
                یه دوست پشمالو انتخاب کن، پیام خودت رو بذار توش و بغلش رو بفرست — «یکی دوستت داره».
              </span>
            </span>
            <ForwardIcon size={20} stroke="#04202E" />
          </button>

          <button
            type="button"
            onClick={() => navigate("stories")}
            className="flex w-full items-center gap-4 rounded-[24px] border-2 border-dashed border-[#F7C5D3] bg-[#FFF7FA] p-5 text-right transition-transform hover:scale-[1.01]"
          >
            <span aria-hidden="true" className="text-[26px]">🎁</span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-[15px] font-black text-[#04202E]">داستان مخاطب‌ها</span>
              <span className="text-[13px] font-medium leading-[1.9] text-[#4A6572]">
                تجربه‌ی کسانی که جعبه‌شون رسیده — و جای تجربه‌ی تو هم خالیه.
              </span>
            </span>
            <ForwardIcon size={20} stroke="#B02A52" />
          </button>
        </div>
      </main>

      <div className="mt-auto" aria-hidden="true" />
    </div>
  );
}
