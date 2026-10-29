// ── POST /api/admin/posts/image — blog image upload (round 34, admin) ──
// multipart/form-data { file, slot: "cover"|"inline", postId? }:
//   cover  + postId → sets Post.coverKey, returns { url, key }
//   inline          → just stores, returns { url } for embedding in the body
// Stored under .data/posts/<uuid>.<ext>, streamed publicly via /api/media/posts/<file>.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { isRateLimited, clientIp, rateLimit } from "@/lib/rate-limit";
import { sniffImageMime } from "@/lib/payments/manual";
import { UPLOAD_MAX_BYTES, storeMediaFile, deleteMediaFile, publicMediaUrl } from "@/lib/media";

const IMAGE_MIME: Record<string, string> = {
  "image/jpeg": "image/jpeg",
  "image/png": "image/png",
  "image/webp": "image/webp",
};

export async function POST(req: Request) {
  try {
    await requireAdmin();
    assertSameOrigin(req);
    await rateLimit("admin_post_images", clientIp(req), 60, 600);

    const form = await req.formData().catch(() => null);
    const f = form?.get("file");
    const slot = String(form?.get("slot") ?? "inline");
    const postId = String(form?.get("postId") ?? "");
    if (!(f instanceof File) || f.size === 0) throw new AppError(400, "bad_file");
    if (f.size > UPLOAD_MAX_BYTES) throw new AppError(400, "file_too_large", { max: UPLOAD_MAX_BYTES });
    if (slot !== "cover" && slot !== "inline") throw new AppError(400, "bad_input");

    const buf = Buffer.from(await f.arrayBuffer());
    const mime = IMAGE_MIME[sniffImageMime(buf) ?? ""];
    if (!mime) throw new AppError(400, "bad_file_type");

    const key = await storeMediaFile("posts", `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`, buf, mime);

    if (slot === "cover") {
      if (!postId) throw new AppError(400, "bad_input");
      const post = await db.post.findUnique({ where: { id: postId }, select: { id: true, coverKey: true } });
      if (!post) {
        await deleteMediaFile(key);
        throw new AppError(404, "not_found");
      }
      await db.post.update({ where: { id: post.id }, data: { coverKey: key } });
      if (post.coverKey && post.coverKey !== key) await deleteMediaFile(post.coverKey); // replace, not accumulate
    }

    return NextResponse.json({ ok: true, key, url: publicMediaUrl(key) }, { status: 201 });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
