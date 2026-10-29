"use client";

// ── «بلاگ» tab (A-02 split) — thin wrapper over BlogStudio ──
// The full studio (list + MDXEditor + SEO panel) lives in
// components/shop/blog/blog-studio.tsx and lazily loads the editor so this
// tab's bundle cost is paid only when «بلاگ» is opened.
import { BlogStudio } from "@/components/shop/blog/blog-studio";

export function BlogTab({ role }: { role?: string | null }) {
  return <BlogStudio role={role} />;
}
