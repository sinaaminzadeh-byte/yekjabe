"use client";

// ── Wave-0 client-side document metadata for the hash-router SPA ──
// The sandbox renders everything under "/", so per-screen titles/descriptions
// are set on document directly. This hook is DELETED at the deploy wave when
// real App Router routes + generateMetadata take over (see docs/13-f).
// Round 34-h: backward-compatible `options` object adds Open-Graph tags,
// canonical link and the blog-post bundle (usePostSeo) — screens that don't
// pass options behave exactly as before.

import { useEffect } from "react";
import { SITE } from "./site";

/** Build a <title> from the site template; no argument → brand default. */
export function buildTitle(title?: string): string {
  if (!title) return `${SITE.nameFa} — ${SITE.tagline}`;
  return SITE.titleTemplate.replace("%s", title);
}

export interface DocMetaOg {
  title?: string;
  description?: string;
  /** Absolute or site-relative; site-relative is prefixed with SITE.url. */
  image?: string | null;
  type?: string;
  url?: string;
}

export interface DocMetaOptions {
  og?: DocMetaOg;
  /** Canonical URL (absolute or site-relative; relative is prefixed). */
  canonical?: string;
}

const absolute = (u: string) => (/^https?:\/\//i.test(u) ? u : `${SITE.url}${u}`);

function upsertMeta(attr: "property" | "name", key: string, content: string): void {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

/**
 * Set document.title (via SITE.titleTemplate) and upsert
 * meta[name="description"] on every change. No restore-on-cleanup: in the
 * hash-router SPA the last-set screen metadata simply wins (screens without
 * the hook keep the previous screen's title — harmless, and this hook is
 * deleted at the deploy wave when generateMetadata takes over).
 * `options.og` additionally upserts og:* tags; `options.canonical` upserts
 * <link rel="canonical"> (value stays until another screen overrides it).
 */
export function useDocumentMeta(
  { title, description }: { title?: string; description?: string },
  options?: DocMetaOptions,
) {
  // destructure to primitives so the effect doesn't run on every render
  const ogTitle = options?.og?.title;
  const ogDesc = options?.og?.description;
  const ogImage = options?.og?.image;
  const ogType = options?.og?.type;
  const ogUrl = options?.og?.url;
  const canonical = options?.canonical;

  useEffect(() => {
    document.title = buildTitle(title);

    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    if (description) meta.setAttribute("content", description);

    if (ogTitle !== undefined) upsertMeta("property", "og:title", ogTitle);
    if (ogDesc !== undefined) upsertMeta("property", "og:description", ogDesc);
    if (ogImage) upsertMeta("property", "og:image", absolute(ogImage));
    if (ogType !== undefined) upsertMeta("property", "og:type", ogType);
    if (ogUrl !== undefined) upsertMeta("property", "og:url", absolute(ogUrl));

    if (canonical) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", absolute(canonical));
    }
  }, [title, description, ogTitle, ogDesc, ogImage, ogType, ogUrl, canonical]);
}

/** Input shape for usePostSeo — the public fields of GET /api/posts/[slug]. */
export interface PostSeoInput {
  slug: string;
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  excerpt?: string | null;
  cover?: string | null;
}

/**
 * Blog-post SEO bundle (round 34-h): document title = metaTitle||title,
 * description = metaDescription||excerpt, og:type=article + og:image (cover)
 * + og:url, and canonical /post?slug=… — one call from PostScreen.
 */
export function usePostSeo(post: PostSeoInput | null): void {
  useDocumentMeta(
    {
      title: post ? (post.metaTitle || post.title) : undefined,
      description: post ? (post.metaDescription || post.excerpt || undefined) : undefined,
    },
    post
      ? {
          og: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt || undefined,
            image: post.cover ?? undefined,
            type: "article",
            url: `/post?slug=${encodeURIComponent(post.slug)}`,
          },
          canonical: `/post?slug=${encodeURIComponent(post.slug)}`,
        }
      : undefined,
  );
}
