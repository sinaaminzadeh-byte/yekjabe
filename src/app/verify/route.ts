// ── /verify — the fixed QR landing route (mission §۱) ──
// Every postcard QR points HERE. The app itself is a hash-route SPA on `/`,
// so this server route simply forwards to the verification screen `#/verify`.
// QR → /verify → /#/verify → (mobile + OTP) → received gifts.
import { redirect } from "next/navigation";

export function GET() {
  redirect("/#/verify");
}
