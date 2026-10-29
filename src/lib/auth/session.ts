// ── auth/session.ts — DB-backed sessions (guide §4.2 / critic MUST-FIX #2) ──
// The raw token lives ONLY in an HttpOnly cookie; the DB stores sha256(token).
// DB-backed (not JWT) so logout / admin-kill / revocation are possible.
import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";
import { db } from "../db";
import { env } from "../env";
import { AppError } from "../errors";

const sha = (s: string) => createHash("sha256").update(s).digest("hex");

// `__Host-` prefix requires Secure + Path=/ + no Domain → production only.
// In dev (plain http sandbox) we use the bare names.
const COOKIE = {
  customer: env.isProd ? "__Host-pn_session" : "pn_session",
  admin: env.isProd ? "__Host-pn_admin" : "pn_admin",
} as const;

const TTL = { customer: 30 * 864e5, admin: 8 * 36e5 } as const;

export type SessionKind = "customer" | "admin";
export interface Session {
  id: string;
  phone: string;
  kind: SessionKind;
  expiresAt: Date;
}

export async function createSession(phone: string, kind: SessionKind): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  await db.session.create({
    data: { id: sha(token), phone, kind, expiresAt: new Date(Date.now() + TTL[kind]) },
  });
  const jar = await cookies();
  jar.set(COOKIE[kind], token, {
    httpOnly: true,
    secure: env.isProd,
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(TTL[kind] / 1000),
  });
}

// P-04 (audit wave 38): every getSession() used to fire an UPDATE on Session —
// one DB write per admin/customer request, most of them pointless. Throttle:
// the write happens only when the last touch is older than 5 minutes (the
// field is compared FIRST, no write, no round-trip cost beyond the read we
// already do). Best-effort as before — a failed touch never breaks a request.
const LASTSEEN_THROTTLE_MS = 5 * 60_000;

export async function getSession(kind: SessionKind): Promise<Session | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE[kind])?.value;
  if (!token) return null;
  const s = await db.session.findUnique({ where: { id: sha(token) } });
  if (!s || s.kind !== kind || s.expiresAt.getTime() < Date.now()) return null;
  if (Date.now() - s.lastSeenAt.getTime() > LASTSEEN_THROTTLE_MS) {
    void db.session.update({ where: { id: s.id }, data: { lastSeenAt: new Date() } }).catch(() => {});
  }
  return { id: s.id, phone: s.phone, kind: s.kind, expiresAt: s.expiresAt };
}

export async function requireSession(): Promise<Session> {
  const s = await getSession("customer");
  if (!s) throw new AppError(401, "unauthenticated");
  return s;
}

export async function requireAdmin(min: "operator" | "owner" = "operator") {
  const s = await getSession("admin");
  if (!s) throw new AppError(401, "unauthenticated");
  const a = await db.adminUser.findUnique({ where: { phone: s.phone } });
  if (!a || !a.isActive) throw new AppError(403, "forbidden");
  if (min === "owner" && a.role !== "owner") throw new AppError(403, "owner_only");
  return a;
}

export async function destroySession(kind: SessionKind): Promise<void> {
  const jar = await cookies();
  const token = jar.get(COOKIE[kind])?.value;
  if (token) {
    await db.session.deleteMany({ where: { id: sha(token) } }).catch(() => {});
  }
  jar.set(COOKIE[kind], "", { httpOnly: true, path: "/", maxAge: 0 });
}

/**
 * CSRF: for mutating requests, reject a mismatched Origin header (guide §4.2).
 * Proxy-aware: behind a reverse proxy (sandbox gateway / Coolify / Caddy) the
 * browser's public host reaches us via X-Forwarded-Host / Host while req.url
 * keeps the internal bind host — so ALL of those are legitimate matches for
 * the Origin. A cross-site attacker's Origin never equals the site's own
 * public host, so the guard stays meaningful in production.
 */
export function assertSameOrigin(req: Request): void {
  const origin = req.headers.get("origin");
  if (!origin) return; // curl / server-to-server — cookie-less callers anyway
  try {
    const o = new URL(origin);
    const site = new URL(env.SITE_URL);
    const allowed = new Set<string>([site.host.toLowerCase(), new URL(req.url).host.toLowerCase()]);
    // first hop of the proxy chain carries the public host the browser used
    const fwd = (req.headers.get("x-forwarded-host") ?? "").split(",")[0].trim().toLowerCase();
    if (fwd) allowed.add(fwd);
    const host = (req.headers.get("host") ?? "").trim().toLowerCase();
    if (host) allowed.add(host);
    if (!allowed.has(o.host.toLowerCase())) {
      throw new AppError(403, "cross_origin");
    }
  } catch (e) {
    if (e instanceof AppError) throw e;
    throw new AppError(403, "bad_origin");
  }
}
