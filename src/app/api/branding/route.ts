// ── GET /api/branding — public site-brand metadata (round 34) ──
// { logoUrl: string | null } — null = no uploaded logo, the client renders the
// default SVG mark + wordmark. Cached (see src/lib/branding.ts).
import { NextResponse } from "next/server";
import { getBranding } from "@/lib/branding";

export async function GET() {
  return NextResponse.json(await getBranding());
}
