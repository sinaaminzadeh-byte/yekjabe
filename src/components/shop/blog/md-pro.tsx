"use client";

// ═══ MarkdownPro — hand-rolled XSS-safe renderer for «جعبه آبی» blog (round 34-h) ═══
// Same guarantee class as ../md.tsx: NO dangerouslySetInnerHTML anywhere —
// every text node goes through React (auto-escaped) and every URL attribute
// is scheme-validated (http(s): or site-relative "/" only; javascript:/data:
// can never reach the DOM). Content is parsed from the RAW text because
// escaping-then-parsing would corrupt hrefs containing "&".
//
// ── Implemented markdown spec ──
//   ## H2 / ### H3          headings (font-black navy + light-blue gradient
//                           underline; `#` alone also renders as H2 so the
//                           post title stays the page's single <h1>)
//   **bold**  *italic*      inline emphasis
//   [text](url)             url starting with "/" → plain internal <a>;
//                           http(s) → <a target=_blank rel=noopener>;
//                           anything else → plain text (link dropped)
//   ![alt](url "caption")   <figure>: rounded bordered img + <figcaption>;
//                           empty alt falls back to «تصویر نوشته»
//   - item                  bullet lists (consecutive lines group)
//   ---                     branded gradient divider (<hr>)
//   :::quote … :::          RTL quote box (big decorative ” glyph)
//   :::info … :::           sky chip box, ℹ️ header
//   :::tip … :::            green tint box, ✨ header
//   :::love … :::           pink tint box, ♥ header, #B02A52 accents
//   :::warn … :::           soft yellow box, ⚠️ header
//   → first line of a box starting with **…** becomes the box header.
//     Box content supports bold/italic/links/lists (recursively parsed).
//   blank lines separate paragraphs; single newlines inside a paragraph join.

import type { CSSProperties, ReactNode } from "react";

/* ── URL safety: the ONLY gate for href/src attributes ── */
function urlKind(u: string): "ext" | "int" | null {
  const t = u.trim();
  if (/^https?:\/\//i.test(t)) return "ext";
  if (/^\//.test(t) && !t.startsWith("//")) return "int";
  return null; // javascript:, data:, anything weird → not a URL
}

/* ── public SEO helpers (used by blog-studio + reading time) ── */

/** Whitespace word count of the markdown body, syntax stripped. */
export function countWords(text: string): number {
  const stripped = (text ?? "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*\n]+)\*/g, "$1")
    .replace(/^-{3,}\s*$/gm, " ")
    .replace(/^:::[a-z]*\s*$/gm, " ")
    .replace(/^-\s+/gm, "");
  return stripped.trim().split(/\s+/).filter(Boolean).length;
}

/** Does the body contain at least one `## ` heading? */
export function hasH2(text: string): boolean {
  return /^##\s+\S/m.test(text ?? "");
}

/** How many `![…](…)` images are missing an alt text? */
export function imagesMissingAlt(text: string): number {
  const list = (text ?? "").match(/!\[([^\]]*)\]\([^)]*\)/g) ?? [];
  return list.filter((s) => /^!\[\s*\]\(/.test(s)).length;
}

/** Does the body link at least one internal (site-relative "/…") URL? */
export function hasInternalLink(text: string): boolean {
  return /\[[^\]]+\]\((\/[^)\s]*)\)/.test(text ?? "");
}

/* ── inline pass: image | link | bold | italic ── */
const INLINE_RE =
  /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)|\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)|\*\*([^*]+)\*\*|\*([^*\n]+)\*/g;

function inline(text: string, keyBase: string, accent = "#006387"): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyBase}-${i++}`;
    if (m[2] !== undefined) {
      // image (inline-in-paragraph variant — standalone lines become <figure>)
      if (urlKind(m[2])) {
        out.push(
          <img
            key={key}
            src={m[2]}
            alt={m[1] || "تصویر نوشته"}
            loading="lazy"
            className="my-1 inline-block h-auto max-w-full rounded-[14px] border border-[#DDEEF5]"
          />,
        );
      }
    } else if (m[5] !== undefined) {
      const kind = urlKind(m[5]);
      if (kind === "ext") {
        out.push(
          <a
            key={key}
            href={m[5]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-4 transition-colors hover:text-[#04202E]"
            style={{ color: accent }}
          >
            {m[4]}
          </a>,
        );
      } else if (kind === "int") {
        // internal → plain <a href> so crawlers see the link
        out.push(
          <a
            key={key}
            href={m[5]}
            className="font-bold underline underline-offset-4 transition-colors hover:text-[#04202E]"
            style={{ color: accent }}
          >
            {m[4]}
          </a>,
        );
      } else {
        out.push(m[4]);
      }
    } else if (m[7] !== undefined) {
      out.push(
        <strong key={key} className="font-black text-[#04202E]">
          {m[7]}
        </strong>,
      );
    } else if (m[8] !== undefined) {
      out.push(
        <em key={key} className="italic">
          {m[8]}
        </em>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/* ── the 5 branded directive boxes ── */

type BoxType = "quote" | "info" | "tip" | "love" | "warn";

const BOXES: Record<
  BoxType,
  { icon: string; titleColor: string; style: CSSProperties; glyph?: boolean }
> = {
  quote: {
    icon: "”",
    titleColor: "#006387",
    style: { background: "#F2FAFD", borderInlineStart: "4px solid #00ABE7", borderRadius: 18 },
    glyph: true,
  },
  info: {
    icon: "ℹ️",
    titleColor: "#006387",
    style: { background: "#E3F6FD", border: "1.5px solid #99D6EE", borderRadius: 18 },
  },
  tip: {
    icon: "✨",
    titleColor: "#2E7D53",
    style: { background: "#DDF3EA", border: "1.5px solid #B7E4D2", borderRadius: 18 },
  },
  love: {
    icon: "♥",
    titleColor: "#B02A52",
    style: { background: "#FFE9F1", border: "1.5px solid #F7C5D3", borderRadius: 18 },
  },
  warn: {
    icon: "⚠️",
    titleColor: "#8A6D1F",
    style: { background: "#FFF3C9", border: "1.5px solid #F0E0A0", borderRadius: 18 },
  },
};

function Box({
  type,
  title,
  lines,
  keyBase,
}: {
  type: BoxType;
  title: string | null;
  lines: string[];
  keyBase: string;
}) {
  const box = BOXES[type];
  const accent = type === "love" ? "#B02A52" : "#006387";
  return (
    <div
      className="relative overflow-hidden px-[18px] py-3.5"
      style={{ ...box.style, padding: "14px 18px" }}
    >
      {box.glyph && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-7 font-black leading-none"
          style={{ insetInlineStart: 8, fontSize: 90, color: "rgba(0,171,231,0.14)" }}
        >
          ”
        </span>
      )}
      {title && (
        <p className="m-0 flex items-center gap-2 text-[14.5px] font-black" style={{ color: box.titleColor }}>
          <span aria-hidden="true">{box.icon}</span>
          <span>{inline(title, `${keyBase}-t`, box.titleColor)}</span>
        </p>
      )}
      {!title && (
        <p className="m-0 flex items-center gap-2 text-[14.5px] font-black" style={{ color: box.titleColor }}>
          <span aria-hidden="true">{box.icon}</span>
        </p>
      )}
      <div
        className={`relative flex flex-col gap-2 text-[14.5px] font-medium leading-[2.05] ${type === "quote" ? "italic" : ""}`}
        style={{ color: type === "love" ? "#B02A52" : "#1F3E4D" }}
      >
        {parseBlocks(lines, `${keyBase}-c`, accent)}
      </div>
    </div>
  );
}

/* ── block pass ── */

function parseBlocks(lines: string[], keyBase: string, accent = "#006387"): ReactNode[] {
  const out: ReactNode[] = [];
  let para: string[] = [];
  let list: string[] = [];
  let k = 0;

  const flushPara = () => {
    if (para.length === 0) return;
    const content = para.join(" ").trim();
    if (content) out.push(<p key={`${keyBase}-p${k++}`} className="m-0">{inline(content, `${keyBase}-p${k}`, accent)}</p>);
    para = [];
  };
  const flushList = () => {
    if (list.length === 0) return;
    const items = list;
    out.push(
      <ul key={`${keyBase}-ul${k++}`} className="m-0 flex list-disc flex-col gap-1.5 ps-6">
        {items.map((li, i) => (
          <li key={i}>{inline(li, `${keyBase}-ul${k}-i${i}`, accent)}</li>
        ))}
      </ul>,
    );
    list = [];
  };
  const flushAll = () => {
    flushPara();
    flushList();
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      flushAll();
      i++;
      continue;
    }

    // :::type … ::: container
    const dir = line.match(/^:::(quote|info|tip|love|warn)\s*$/);
    if (dir) {
      flushAll();
      let j = i + 1;
      const inner: string[] = [];
      while (j < lines.length && !/^:::\s*$/.test(lines[j].trim())) {
        inner.push(lines[j]);
        j++;
      }
      i = j + 1; // past the closing :::
      // optional header: first line that is entirely **bold**
      let title: string | null = null;
      let body = inner;
      const t = inner[0]?.trim().match(/^\*\*(.+)\*\*:?$/) ?? null;
      if (t) {
        title = t[1];
        body = inner.slice(1);
      }
      out.push(<Box key={`${keyBase}-box${k++}`} type={dir[1] as BoxType} title={title} lines={body} keyBase={`${keyBase}-box${k}`} />);
      continue;
    }
    if (/^:::\s*$/.test(line)) {
      i++; // stray closer — ignore
      continue;
    }

    // divider: --- (3+ dashes)
    if (/^-{3,}$/.test(line)) {
      flushAll();
      out.push(
        <hr
          key={`${keyBase}-hr${k++}`}
          className="h-[3px] w-full rounded-full border-0"
          style={{ backgroundImage: "linear-gradient(to left, transparent, #7FD4F2 30%, #E3F6FD 72%, transparent)" }}
        />,
      );
      i++;
      continue;
    }

    // headings: ## → h2 (with underline), ### → h3 (shorter underline)
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      flushAll();
      const level = h[1].length;
      const content = inline(h[2], `${keyBase}-h${k}`, accent);
      out.push(
        level === 3 ? (
          <h3
            key={`${keyBase}-h${k++}`}
            className="m-0 text-[20px] font-black leading-[1.65] text-[#04202E] after:mt-1.5 after:block after:h-[5px] after:w-[42%] after:rounded-full after:opacity-80 after:bg-[linear-gradient(to_left,#7FD4F2,#E3F6FD_70%,transparent)] after:content-['']"
          >
            {content}
          </h3>
        ) : (
          // `#` and `##` both render H2 — the post title keeps the single <h1>
          <h2
            key={`${keyBase}-h${k++}`}
            className="m-0 text-[24px] font-black leading-[1.6] text-[#04202E] after:mt-2 after:block after:h-[7px] after:w-[62%] after:rounded-full after:bg-[linear-gradient(to_left,#7FD4F2,#E3F6FD_70%,transparent)] after:content-['']"
          >
            {content}
          </h2>
        ),
      );
      i++;
      continue;
    }

    // standalone image line → semantic <figure> with optional caption
    const img = line.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/);
    if (img && urlKind(img[2])) {
      flushAll();
      out.push(
        <figure key={`${keyBase}-fig${k++}`} className="m-0">
          <img
            src={img[2]}
            alt={img[1] || "تصویر نوشته"}
            loading="lazy"
            className="w-full rounded-[20px] border border-[#DDEEF5]"
          />
          {img[3] && (
            <figcaption className="mt-2 text-center text-[12.5px] font-medium leading-[1.9] text-[#4A6572]">
              {img[3]}
            </figcaption>
          )}
        </figure>,
      );
      i++;
      continue;
    }

    // list item
    if (/^-\s+/.test(line)) {
      flushPara();
      list.push(line.replace(/^-\s+/, ""));
      i++;
      continue;
    }

    flushList();
    para.push(line);
    i++;
  }
  flushAll();
  return out;
}

/* ── public component ── */

export function MarkdownPro({ text }: { text: string }) {
  const nodes = parseBlocks((text ?? "").split("\n"), "md");
  return (
    <article className="flex flex-col gap-4 text-[15.5px] font-medium leading-[2.05] text-[#1F3E4D]">
      {nodes}
    </article>
  );
}
