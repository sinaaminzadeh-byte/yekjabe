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

export async function getSession(kind: SessionKind): Promise<Session | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE[kind])?.value;
  if (!token) return null;
  const s = await db.session.findUnique({ where: { id: sha(token) } });
  if (!s || s.kind !== kind || s.expiresAt.getTime() < Date.now()) return null;
  // touch lastSeenAt (best-effort; keep reads cheap)
  void db.session.update({ where: { id: s.id }, data: { lastSeenAt: new Date() } }).catch(() => {});
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

/** CSRF: for mutating requests, reject a mismatched Origin header (guide §4.2). */
export function assertSameOrigin(req: Request): void {
  const origin = req.headers.get("origin");
  if (!origin) return; // curl / server-to-server — cookie-less callers anyway
  try {
    const o = new URL(origin);
    const site = new URL(env.SITE_URL);
    if (o.host !== site.host && o.host !== new URL(req.url).host) {
      throw new AppError(403, "cross_origin");
    }
  } catch (e) {
    if (e instanceof AppError) throw e;
    throw new AppError(403, "bad_origin");
  }
}
