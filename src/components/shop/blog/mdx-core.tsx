"use client";

// ═══ mdx-core.tsx — the actual MDXEditor instance (dynamically imported) ═══
// This module is the ONLY place that touches @mdxeditor/editor so the ~1MB
// editor chunk is paid exclusively by the blog studio tab (loaded via
// next/dynamic ssr:false from blog-studio.tsx — admin.tsx never imports it).
// Bundles: brand font + heading underlines + the 5 directive boxes, shared
// with the public renderer through blog-prose.css.

import React from "react";
// package.json exports map exposes the stylesheet at the package root
import "@mdxeditor/editor/style.css";
import "./blog-prose.css";
import {
  MDXEditor,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  linkPlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  imagePlugin,
  directivesPlugin,
  toolbarPlugin,
  diffSourcePlugin,
  codeMirrorPlugin,
  UndoRedo,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertThematicBreak,
  ButtonOrDropdownButton,
  DiffSourceToggleWrapper,
  usePublisher,
  insertDirective$,
  NestedLexicalEditor,
  type DirectiveDescriptor,
  type DirectiveEditorProps,
} from "@mdxeditor/editor";
// `Directives` isn't re-exported from the editor root; the underlying mdast
// directive types ship with the editor itself (hoisted transitive dep).
import type { ContainerDirective } from "mdast-util-directive";

/* ── inline image upload → /api/admin/posts/image (slot=inline) ── */
async function uploadInlineImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("slot", "inline");
  const res = await fetch("/api/admin/posts/image", { method: "POST", body: form });
  if (!res.ok) throw new Error("upload_failed");
  const j = (await res.json()) as { url?: string };
  if (!j.url) throw new Error("upload_failed");
  return j.url;
}

/* ── the 5 brand boxes as container directives (:::quote|info|tip|love|warn) ── */

const BOX_CLASSES: Record<string, string> = {
  quote: "bp-box-quote",
  info: "bp-box-info",
  tip: "bp-box-tip",
  love: "bp-box-love",
  warn: "bp-box-warn",
};

function brandBoxDescriptor(name: string): DirectiveDescriptor {
  return {
    name,
    attributes: [],
    hasChildren: true,
    testNode: (node) => node.type === "containerDirective" && node.name === name,
    Editor: ({ mdastNode }: DirectiveEditorProps) => (
      <div className={`bp-box ${BOX_CLASSES[name] ?? ""}`}>
        <NestedLexicalEditor<ContainerDirective>
          block
          getContent={(node) => node.children}
          getUpdatedMdastNode={(node, children) => ({
            ...node,
            children: children as ContainerDirective["children"],
          })}
        />
      </div>
    ),
  };
}

/* ── custom toolbar dropdown: insert one of the 5 brand boxes ── */

const BOX_ITEMS = [
  { value: "quote", label: "نقل قول" },
  { value: "info", label: "نکته (آبی)" },
  { value: "tip", label: "ترفند (سبز)" },
  { value: "love", label: "حس خوب (صورتی)" },
  { value: "warn", label: "هشدار (زرد)" },
];

function InsertBrandBox() {
  const insertDirective = usePublisher(insertDirective$);
  return (
    <ButtonOrDropdownButton
      title="درج باکس برند"
      items={BOX_ITEMS}
      onChoose={(name) => {
        // mirrors the built-in InsertAdmonition — empty node, user types inside
        insertDirective({ type: "containerDirective", name });
      }}
    >
      <span aria-hidden="true">🧩</span>
    </ButtonOrDropdownButton>
  );
}

/* ── the editor core ── */

export interface MdxCoreProps {
  markdown: string;
  onChange: (md: string) => void;
}

export default function MdxEditorCore({ markdown, onChange }: MdxCoreProps) {
  return (
    <div dir="rtl" className="bp-editor-wrap">
      <style>{`
        .bp-editor-wrap .mdxeditor { --base-bg: #F8FDFF; border-radius: 0 0 24px 24px; font-family: Vazirmatn, sans-serif; }
        .bp-editor-wrap .mdxeditor [data-lexical-editor] { direction: rtl; text-align: right; font-family: Vazirmatn, sans-serif; }
        .bp-editor-wrap .mdxeditor select, .bp-editor-wrap .mdxeditor input, .bp-editor-wrap .mdxeditor textarea { font-family: Vazirmatn, sans-serif; }
        /* keep the source-mode CodeMirror LTR mono — markdown source is latin-ish */
        .bp-editor-wrap .mdxeditor [role="textbox"][data-markdown-source-editor="true"],
        .bp-editor-wrap .mdxeditor .cm-editor { direction: ltr; text-align: left; }
      `}</style>
      <MDXEditor
        className="bp-editor"
        markdown={markdown}
        onChange={(md) => onChange(md)}
        onError={(p) => console.error("mdxeditor", p)}
        contentEditableClassName="bp-content"
        plugins={[
          headingsPlugin(),
          quotePlugin(),
          listsPlugin(),
          linkPlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          imagePlugin({ imageUploadHandler: uploadInlineImage }),
          directivesPlugin({
            directiveDescriptors: [
              brandBoxDescriptor("quote"),
              brandBoxDescriptor("info"),
              brandBoxDescriptor("tip"),
              brandBoxDescriptor("love"),
              brandBoxDescriptor("warn"),
            ],
          }),
          codeMirrorPlugin({ codeBlockLanguages: { js: "JavaScript", text: "Text" } }),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: markdown, readOnlyDiff: true }),
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper options={["rich-text", "source"]}>
                <UndoRedo />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <CreateLink />
                <InsertImage />
                <InsertThematicBreak />
                <InsertBrandBox />
              </DiffSourceToggleWrapper>
            ),
          }),
        ]}
      />
    </div>
  );
}
