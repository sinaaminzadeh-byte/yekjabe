// ── /api/home-content — PUBLIC site-content (owner round 30) ──
// GET: the saved hero slides (Setting `home_slides`) — falls back to the
// built-in defaults when nothing is saved yet / JSON is corrupt. Light rate
// limit; no auth; response is small and cache-friendly.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";
import { HOME_SLIDES_SETTING_KEY, sanitizeSlides } from "@/lib/home-slides";

export async function GET(req: Request) {
  try {
    await rateLimit("home_content", clientIp(req), 120, 60);
    const row = await db.setting.findUnique({ where: { key: HOME_SLIDES_SETTING_KEY } });
    let slides: unknown = null;
    if (row?.value) {
      try {
        slides = JSON.parse(row.value);
      } catch {
        slides = null; // corrupt JSON → defaults
      }
    }
    return NextResponse.json(
      { ok: true, slides: sanitizeSlides(slides) },
      { headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=300" } },
    );
  } catch (e) {
    if (isRateLimited(e)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
