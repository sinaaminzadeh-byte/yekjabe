// ── Server sync — session-scoped bootstrap (Phase A of the launch guide) ──
// The old global pull (GET /api/orders without a session) is gone. Everything
// now flows through ONE endpoint: GET /api/me/bootstrap → { user, admin,
// orders(≤50), favorites }. Guests get empty payloads; the UI keeps working
// local-first either way.
import { usePishnam, type GiftOrder, type GiftStatus } from "./pishnam-store";
import type { PlushKind } from "./pishnam-data";

const STATUS_RANK: Record<string, number> = { paid: 0, packing: 1, shipped: 2, delivered: 3 };

interface ServerOrder {
  id: string;
  no: number;
  kind: GiftOrder["kind"];
  to: string;
  city: string;
  address: string;
  phone: string;
  message: string;
  occasion: number;
  password: string;
  anonymous: boolean;
  senderName: string;
  hearts: number;
  paws: number;
  total: number;
  date: string;
  status: string;
  opened: boolean;
  dir: string;
  userPhone?: string;
}

interface BootstrapPayload {
  user?: { phone: string; name: string } | null;
  admin?: boolean;
  orders?: ServerOrder[];
  favorites?: string[];
}

/**
 * Merges remote orders into the persisted store. Returns how many local
 * rows were added/updated (0 = nothing new).
 * Merge policy (last-writer-wins by progress):
 *  - ids only on server → added
 *  - ids on both → take the more-advanced status, opened = local || server
 *  - local-only ids stay untouched (offline-made orders keep theirs until pushed)
 * Also keeps nextNo ahead of the highest seen gift number.
 */
function mergeRemote(remote: ServerOrder[], adoptPhone?: string): number {
  const st = usePishnam.getState();
  const byId = new Map(st.orders.map((o) => [o.id, o]));
  let changed = 0;
  let maxNo = st.nextNo - 1;

  for (const r of remote) {
    if (!r || typeof r.id !== "string" || typeof r.no !== "number") continue;
    maxNo = Math.max(maxNo, r.no);
    const local = byId.get(r.id);
    if (!local) {
      byId.set(r.id, {
        ...r,
        userPhone: r.userPhone ?? adoptPhone ?? "",
        dir: r.dir === "recv" ? "recv" : "sent",
        status: (STATUS_RANK[r.status] !== undefined ? r.status : "paid") as GiftStatus,
      });
      changed++;
    } else {
      const lr = STATUS_RANK[local.status] ?? 0;
      const rr = STATUS_RANK[r.status] ?? 0;
      const status: GiftStatus = rr > lr ? (r.status as GiftStatus) : local.status;
      const opened = local.opened || r.opened;
      const adopted = r.userPhone || (adoptPhone ?? "");
      const userPhone = !local.userPhone && adopted ? adopted : local.userPhone;
      if (status !== local.status || opened !== local.opened || userPhone !== local.userPhone) {
        byId.set(r.id, { ...local, status, opened, userPhone });
        changed++;
      }
    }
  }

  if (changed > 0) {
    const orders = [...byId.values()].sort((a, b) => b.no - a.no);
    usePishnam.setState({ orders, nextNo: Math.max(st.nextNo, maxNo + 1) });
  }
  return changed;
}

/** One session-scoped fetch: user + orders + favorites (cookie carries identity). */
async function fetchBootstrap(): Promise<BootstrapPayload | null> {
  try {
    const res = await fetch("/api/me/bootstrap", { cache: "no-store" });
    if (!res.ok) return null; // 401 / offline → local-only mode, UI keeps working
    return (await res.json()) as BootstrapPayload;
  } catch {
    return null;
  }
}

/**
 * Pulls the session's orders (and merges them). Identity = HttpOnly cookie;
 * the `phone` parameter is accepted for call-site compatibility and ignored.
 */
export async function pullOrders(_phone?: string): Promise<number> {
  const data = await fetchBootstrap();
  if (!data || !Array.isArray(data.orders)) return 0;
  return mergeRemote(data.orders, data.user?.phone);
}

/** Alias kept for the «هدیه‌هام» post-login pull — now session-scoped. */
export async function pullOrdersForPhone(_phone?: string): Promise<number> {
  return pullOrders();
}

/**
 * Pulls the account's server-side favorites and merges them (union) into the
 * local list. Returns how many NEW kinds landed (0 = nothing new / offline).
 */
const KNOWN_KINDS = new Set(["bear", "bunny", "cat", "duck", "panda", "sheep"]);

export async function pullFavorites(_phone?: string): Promise<number> {
  const data = await fetchBootstrap();
  if (!data || !Array.isArray(data.favorites)) return 0;
  const remote = data.favorites.filter(
    (k): k is PlushKind => typeof k === "string" && (KNOWN_KINDS as Set<string>).has(k),
  );
  const st = usePishnam.getState();
  const fresh = remote.filter((k) => !st.favorites.includes(k));
  if (fresh.length > 0) {
    usePishnam.setState({ favorites: [...st.favorites, ...fresh] });
  }
  return fresh.length;
}

/** Boot-time sync: single bootstrap fetch covers orders + favorites. */
export async function bootSync(): Promise<void> {
  await pullOrders();
}

/**
 * Manual sync (my-gifts «همگام‌سازی» button): reports whether the server is
 * reachable and how many rows changed, so the UI can show honest toasts.
 */
export async function syncStatus(
  userPhone?: string | null,
): Promise<{ ok: boolean; changed: number }> {
  const data = await fetchBootstrap();
  if (!data) return { ok: false, changed: 0 };
  const changed = Array.isArray(data.orders) ? mergeRemote(data.orders, data.user?.phone) : 0;
  return { ok: true, changed };
}
