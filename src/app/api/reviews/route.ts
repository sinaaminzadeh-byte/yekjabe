// ── /api/reviews — moderated customer reviews (guide A9) ──
// GET  → approved reviews only (newest first, take 60)
// POST → stored with approved=false until an admin publishes it; rate-limited.
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse, AppError } from "@/lib/errors";
import { getSession } from "@/lib/auth/session";
import { clientIp, isRateLimited, rateLimit } from "@/lib/rate-limit";

const KINDS = new Set(["bear", "bunny", "cat", "duck", "panda", "sheep"]);

function clampInt(v: unknown, min: number, max: number, dflt = 0): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return dflt;
  return Math.max(min, Math.min(max, Math.round(n)));
}

function str(v: unknown, max = 500): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function GET() {
  try {
    const reviews = await db.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 60,
    });
    return NextResponse.json({ reviews });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession("customer");
    await rateLimit("review", session?.phone ?? clientIp(req), 2, 3600);
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const who = str(body.who, 30);
    const text = str(body.text, 400);
    if (!who || who.length < 2) throw new AppError(400, "who_required");
    if (text.length < 5) throw new AppError(400, "text_too_short");
    const kindRaw = str(body.kind, 20);
    const review = await db.review.create({
      data: {
        who,
        role: str(body.role, 10) === "receiver" ? "receiver" : "sender",
        stars: clampInt(body.stars, 1, 5, 5),
        kind: KINDS.has(kindRaw) ? kindRaw : "bear",
        title: str(body.title, 60),
        text,
        approved: false, // moderation queue — nothing goes public unreviewed
      },
    });
    return NextResponse.json({ review: { ...review, pending: true } }, { status: 201 });
  } catch (e) {
    if (isRateLimited(e)) {
      return NextResponse.json(
        { error: "rate_limited", details: { retryAfter: e.retryAfter } },
        { status: 429, headers: { "retry-after": String(e.retryAfter) } },
      );
    }
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
