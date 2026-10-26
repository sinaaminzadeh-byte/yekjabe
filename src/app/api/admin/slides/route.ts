// ── /api/admin/slides — hero slider editor (owner round 30) ──
// GET : sanitized saved slides (or the defaults) — any admin seat may read.
// PATCH: save the whole list as JSON into Setting `home_slides`. Any admin
//        seat may save (site-content editing, like products/blog — the
//        pricing «تنظیمات» tab stays owner-only). Everything is re-sanitized
//        server-side: safe routes only, hex colors, length caps, max 6 rows.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AppError, toErrorResponse } from "@/lib/errors";
import { assertSameOrigin, requireAdmin } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import {
  HOME_SLIDES_SETTING_KEY,
  MAX_HOME_SLIDES,
  sanitizeSlides,
} from "@/lib/home-slides";

export async function GET() {
  try {
    await requireAdmin();
    const row = await db.setting.findUnique({ where: { key: HOME_SLIDES_SETTING_KEY } });
    let saved: unknown = null;
    if (row?.value) {
      try {
        saved = JSON.parse(row.value);
      } catch {
        saved = null;
      }
    }
    return NextResponse.json({ ok: true, slides: sanitizeSlides(saved), saved: Boolean(row) });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function PATCH(req: Request) {
  try {
    const admin = await requireAdmin();
    assertSameOrigin(req);
    await rateLimit("admin_slides", clientIp(req), 40, 600);
    const body = (await req.json().catch(() => null)) as { slides?: unknown } | null;
    if (!body || !Array.isArray(body.slides)) throw new AppError(400, "bad_input");
    if (body.slides.length > MAX_HOME_SLIDES) throw new AppError(400, "bad_input");
    if (!body.slides.some((s) => (s as { enabled?: unknown })?.enabled !== false)) {
      throw new AppError(400, "no_active_slide");
    }
    const clean = sanitizeSlides(body.slides);
    const value = JSON.stringify(clean);
    await db.setting.upsert({
      where: { key: HOME_SLIDES_SETTING_KEY },
      create: { key: HOME_SLIDES_SETTING_KEY, value },
      update: { value },
    });
    return NextResponse.json({ ok: true, slides: clean, by: admin.phone });
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
