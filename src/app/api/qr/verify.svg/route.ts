// ── /api/qr/verify.svg — THE static postcard QR (mission §۱) ──
// ONE QR for every box: it encodes `${SITE_URL}/verify` — the fixed entry
// page of the recipient verification flow. The QR is only the door; it grants
// nothing by itself (identity = the recipient's own mobile + OTP).
import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { env } from "@/lib/env";

export async function GET() {
  const target = `${env.SITE_URL}/verify`;
  const svg = await QRCode.toString(target, {
    type: "svg",
    margin: 1,
    width: 240,
    color: { dark: "#04202E", light: "#FFFFFF" },
    errorCorrectionLevel: "M",
  });
  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
