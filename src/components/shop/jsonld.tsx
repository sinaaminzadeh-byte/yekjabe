"use client";

// ── Inline JSON-LD script tag (wave-0) ──
// Renders schema.org structured data inside the hash-router SPA. At the deploy
// wave the same <JsonLd data={...}/> tag is dropped into server components.

import { toJsonLdScript } from "@/lib/seo/jsonld";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLdScript(data) }}
    />
  );
}
