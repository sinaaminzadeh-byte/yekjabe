// ── /api/admin/branding/logo — site logo upload (round 34, owner-only) ──
// POST   multipart/form-data { file } → .data/branding/logo.<ext> + Setting
//        site_logo=<key>; the previous file is replaced (never accumulates).
// DELETE → removes file + setting (the default SVG mark + wordmark returns).
// Every <Logo/> in the app renders the uploaded image when the setting exists.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { isRateLimited, clientIp, rateLimit } from "@/lib/rate-limit";
import { sniffImageMime } from "@/lib/payments/manual";
import { UPLOAD_MAX_BYTES, storeMediaFile, deleteMediaFile } from "@/lib/media";
import { bustBrandingCache } from "@/lib/branding";

const IMAGE_MIME: Record<string, string> = {
  "image/jpeg": "image/jpeg",
  "image/png": "image/png",
  "image/webp": "image/webp",
};

export async function POST(req: Request) {
  try {
    await requireAdmin("owner");
    assertSameOrigin(req);
    await rateLimit("admin_branding", clientIp(req), 20, 600);

    const form = await req.formData().catch(() => null);
    const f = form?.get("file");
    if (!(f instanceof File) || f.size === 0) throw new AppError(400, "bad_file");
    if (f.size > UPLOAD_MAX_BYTES) throw new AppError(400, "file_too_large", { max: UPLOAD_MAX_BYTES });

    const buf = Buffer.from(await f.arrayBuffer());
    const mime = IMAGE_MIME[sniffImageMime(buf) ?? ""];
    if (!mime) throw new AppError(400, "bad_file_type");

    const prev = await db.setting.findUnique({ where: { key: "site_logo" } });
    const key = await storeMediaFile("branding", "logo", buf, mime);
    if (prev?.value && prev.value !== key) await deleteMediaFile(prev.value);
    await db.setting.upsert({ where: { key: "site_logo" }, create: { key: "site_logo", value: key }, update: { value: key } });
    bustBrandingCache();

    return NextResponse.json({ ok: true, logoUrl: `/api/media/${key}?v=${Date.now()}` }, { status: 201 });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function DELETE(req: Request) {
  try {
    await requireAdmin("owner");
    assertSameOrigin(req);
    await rateLimit("admin_branding", clientIp(req), 20, 600);
    const prev = await db.setting.findUnique({ where: { key: "site_logo" } });
    if (prev?.value) await deleteMediaFile(prev.value);
    await db.setting.deleteMany({ where: { key: "site_logo" } });
    bustBrandingCache();
    return NextResponse.json({ ok: true, logoUrl: null });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
