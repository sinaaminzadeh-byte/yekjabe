"use client";

// ── Tiny safe Markdown renderer (Phase C blog) ──
// Escape ALL HTML first, then parse a small friendly subset into React nodes:
//   # / ## / ### headings · **bold** · *italic* · - lists · [text](https://…) links
//   blank-line paragraphs. NO dangerouslySetInnerHTML — the output is built
//   entirely from React elements, so user/admin content can never inject markup.
// Only http(s) links are allowed; everything else renders as plain text.

import type { ReactNode } from "react";

/** Escape every HTML-significant character before any parsing happens. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Inline pass over ALREADY-ESCAPED text: links (http/https only) → bold →
 * italic. Returns React nodes; nothing is ever interpreted as markup.
 */
function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  // token scan: link | bold | italic (bold matched before italic)
  const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|\*([^*\n]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyBase}-${i++}`;
    if (m[1] !== undefined && m[2] !== undefined) {
      out.push(
        <a
          key={key}
          href={m[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[#006387] underline underline-offset-4 transition-colors hover:text-[#04202E]"
        >
          {m[1]}
        </a>,
      );
    } else if (m[3] !== undefined) {
      out.push(
        <strong key={key} className="font-black text-[#04202E]">
          {m[3]}
        </strong>,
      );
    } else if (m[4] !== undefined) {
      out.push(
        <em key={key} className="italic">
          {m[4]}
        </em>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/**
 * Renders a Markdown subset as styled RTL prose. Wrap it in a width-bounded
 * container; every element carries its own spacing/typography classes.
 *
 * Line rules (all text escaped BEFORE parsing):
 *   blank line      → closes the current paragraph/list
 *   #/##/### +space → heading (starts immediately, no blank line needed)
 *   "- " at line    → list item (consecutive items group into one list)
 *   anything else   → paragraph text (single newlines join with a space)
 */
export function Markdown({ text }: { text: string }) {
  const safe = escapeHtml(text ?? "");
  const lines = safe.split("\n");

  const out: ReactNode[] = [];
  let para: string[] = [];
  let list: string[] = [];
  let k = 0;

  const flushPara = () => {
    if (para.length === 0) return;
    const content = para.join(" ").trim();
    if (content) out.push(<p key={`p${k++}`} className="m-0">{inline(content, `p${k}`)}</p>);
    para = [];
  };
  const flushList = () => {
    if (list.length === 0) return;
    const items = list;
    out.push(
      <ul key={`ul${k++}`} className="m-0 flex list-disc flex-col gap-1.5 ps-6">
        {items.map((li, i) => (
          <li key={i}>{inline(li, `ul${k}-i${i}`)}</li>
        ))}
      </ul>,
    );
    list = [];
  };
  const flushAll = () => {
    flushPara();
    flushList();
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushAll();
      continue;
    }
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      flushAll();
      const content = inline(h[2], `h${k}`);
      out.push(
        h[1].length === 1 ? (
          <h2 key={`h${k++}`} className="m-0 text-[26px] font-black leading-[1.6] text-[#04202E]">{content}</h2>
        ) : h[1].length === 2 ? (
          <h3 key={`h${k++}`} className="m-0 text-[21px] font-black leading-[1.65] text-[#04202E]">{content}</h3>
        ) : (
          <h4 key={`h${k++}`} className="m-0 text-[17.5px] font-extrabold leading-[1.7] text-[#04202E]">{content}</h4>
        ),
      );
      continue;
    }
    if (/^-\s+/.test(line)) {
      flushPara();
      list.push(line.replace(/^-\s+/, ""));
      continue;
    }
    flushList();
    para.push(line);
  }
  flushAll();

  return (
    <article className="flex flex-col gap-4 text-[15.5px] font-medium leading-[2.05] text-[#1F3E4D]">
      {out}
    </article>
  );
}
