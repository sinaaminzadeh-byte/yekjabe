// ── /api/reviews — real customer reviews (SQLite via Prisma) ──
// GET  → { reviews: [...] }            (newest first, take 60)
// POST { who, role, stars, kind, title, text } → created review
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
      orderBy: { createdAt: "desc" },
      take: 60,
    });
    return NextResponse.json({ reviews });
  } catch (e) {
    console.error("GET /api/reviews failed:", e);
    return NextResponse.json({ error: "db unavailable" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const who = str(body.who, 30);
    const text = str(body.text, 400);
    if (!who || who.length < 2) {
      return NextResponse.json({ error: "who is required" }, { status: 400 });
    }
    if (text.length < 5) {
      return NextResponse.json({ error: "text too short" }, { status: 400 });
    }
    const kindRaw = str(body.kind, 20);
    const review = await db.review.create({
      data: {
        who,
        role: str(body.role, 10) === "receiver" ? "receiver" : "sender",
        stars: clampInt(body.stars, 1, 5, 5),
        kind: KINDS.has(kindRaw) ? kindRaw : "bear",
        title: str(body.title, 60),
        text,
      },
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch (e) {
    console.error("POST /api/reviews failed:", e);
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
