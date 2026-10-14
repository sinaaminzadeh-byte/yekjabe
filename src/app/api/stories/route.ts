// ── /api/stories — published «تجربه مخاطب» stories (public read) ──
// ONLY the public columns ever leave the server — no phone/email/status/
// consent/admin fields, ever (PII contract of guide 13-f).
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toErrorResponse } from "@/lib/errors";

export async function GET() {
  try {
    const stories = await db.experience.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      take: 50,
      select: {
        id: true,
        name: true,
        city: true,
        occasion: true,
        body: true,
        photoKey: true,
        publishedAt: true,
      },
    });
    return NextResponse.json({ stories });
  } catch (e) {
    const { body, status } = toErrorResponse(e);
    return NextResponse.json(body, { status });
  }
}
