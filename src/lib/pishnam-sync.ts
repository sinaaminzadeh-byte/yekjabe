// ── Server sync: pull server orders into the local store ──
// Push-side happens inside store actions (placeOrder / advanceStatus / markOpened)
// to avoid an import cycle. This module is pull + merge only.
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

/**
 * Merges remote orders into the persisted store. Returns how many local
 * rows were added/updated (0 = nothing new).
 * Merge policy (last-writer-wins by progress):
 *  - ids only on server → added
 *  - ids on both → take the more-advanced status, opened = local || server;
 *    a locally-unbound row adopts the server's userPhone (self-healing)
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

/**
 * Fetches ALL orders from /api/orders and merges them into the store.
 * Returns the number of rows added/updated (0 also covers offline/API-down).
 */
export async function pullOrders(): Promise<number> {
  try {
    const res = await fetch("/api/orders", { cache: "no-store" });
    if (!res.ok) return 0;
    const json = (await res.json()) as { orders?: ServerOrder[] };
    const remote = Array.isArray(json.orders) ? json.orders : [];
    return mergeRemote(remote);
  } catch {
    return 0; // offline / API down → local-only mode, UI keeps working
  }
}

/**
 * Pulls only the orders bound to the given account phone and merges them,
 * adopting userPhone onto matching local rows. Powers «هدیه‌هام» sync after
 * login: gifts made on another device (bound server-side) appear here.
 */
export async function pullOrdersForPhone(phone: string): Promise<number> {
  if (!phone) return 0;
  try {
    const res = await fetch(`/api/orders?phone=${encodeURIComponent(phone)}`, { cache: "no-store" });
    if (!res.ok) return 0;
    const json = (await res.json()) as { orders?: ServerOrder[] };
    const remote = Array.isArray(json.orders) ? json.orders : [];
    return mergeRemote(remote, phone);
  } catch {
    return 0;
  }
}

/**
 * Pulls the account's server-side favorites and merges them (union) into the
 * local list — favorites are hearts, so union is the friendly policy.
 * Returns how many NEW kinds landed (0 = nothing new / offline / guest).
 */
const KNOWN_KINDS = new Set(["bear", "bunny", "cat", "duck", "panda", "sheep"]);

export async function pullFavorites(phone: string): Promise<number> {
  if (!phone) return 0;
  try {
    const res = await fetch(`/api/favorites?phone=${encodeURIComponent(phone)}`, { cache: "no-store" });
    if (!res.ok) return 0;
    const json = (await res.json()) as { kinds?: unknown };
    if (!Array.isArray(json.kinds)) return 0;
    const remote = json.kinds.filter(
      (k): k is PlushKind => typeof k === "string" && (KNOWN_KINDS as Set<string>).has(k),
    );
    const st = usePishnam.getState();
    const fresh = remote.filter((k) => !st.favorites.includes(k));
    if (fresh.length > 0) {
      usePishnam.setState({ favorites: [...st.favorites, ...fresh] });
    }
    return fresh.length;
  } catch {
    return 0; // offline → local-only favorites, UI keeps working
  }
}

/** Boot-time sync: global board pull first, then the account-bound pull. */
export async function bootSync(): Promise<void> {
  await pullOrders();
  const u = usePishnam.getState().user;
  if (u?.phone) {
    await pullOrdersForPhone(u.phone);
    await pullFavorites(u.phone);
  }
}

/**
 * Manual sync (my-gifts «همگام‌سازی» button): reports whether the server is
 * reachable and how many rows changed, so the UI can show honest toasts.
 */
export async function syncStatus(
  userPhone?: string | null,
): Promise<{ ok: boolean; changed: number }> {
  try {
    const res = await fetch("/api/orders", { cache: "no-store" });
    if (!res.ok) return { ok: false, changed: 0 };
    const json = (await res.json()) as { orders?: ServerOrder[] };
    const remote = Array.isArray(json.orders) ? json.orders : [];
    let changed = mergeRemote(remote);
    if (userPhone) {
      const r2 = await fetch(`/api/orders?phone=${encodeURIComponent(userPhone)}`, {
        cache: "no-store",
      });
      if (r2.ok) {
        const j2 = (await r2.json()) as { orders?: ServerOrder[] };
        const remote2 = Array.isArray(j2.orders) ? j2.orders : [];
        changed += mergeRemote(remote2, userPhone);
      }
    }
    return { ok: true, changed };
  } catch {
    return { ok: false, changed: 0 };
  }
}
