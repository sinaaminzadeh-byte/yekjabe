"use client";

// ── Wave-0 client-side document metadata for the hash-router SPA ──
// The sandbox renders everything under "/", so per-screen titles/descriptions
// are set on document directly. This hook is DELETED at the deploy wave when
// real App Router routes + generateMetadata take over (see docs/13-f).

import { useEffect } from "react";
import { SITE } from "./site";

/** Build a <title> from the site template; no argument → brand default. */
export function buildTitle(title?: string): string {
  if (!title) return `${SITE.nameFa} — ${SITE.tagline}`;
  return SITE.titleTemplate.replace("%s", title);
}

/**
 * Set document.title (via SITE.titleTemplate) and upsert
 * meta[name="description"] on every change. No restore-on-cleanup: in the
 * hash-router SPA the last-set screen metadata simply wins (screens without
 * the hook keep the previous screen's title — harmless, and this hook is
 * deleted at the deploy wave when generateMetadata takes over).
 */
export function useDocumentMeta({ title, description }: { title?: string; description?: string }) {
  useEffect(() => {
    document.title = buildTitle(title);

    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    if (description) meta.setAttribute("content", description);
  }, [title, description]);
}
