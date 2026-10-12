// ── Server sync: pull server orders into the local store on boot ──
// Push-side happens inside store actions (placeOrder / advanceStatus / markOpened)
// to avoid an import cycle. This module is pull + merge only.
import { usePishnam, type GiftOrder, type GiftStatus } from "./pishnam-store";

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
}

/**
 * Fetches orders from /api/orders and merges them into the persisted store.
 * Merge policy (last-writer-wins by progress):
 *  - ids only on server → added
 *  - ids on both → take the more-advanced status, opened = local || server
 *  - local-only ids stay untouched (offline-made orders keep theirs until pushed)
 * Also keeps nextNo ahead of the highest seen gift number.
 */
export async function pullOrders(): Promise<number> {
  try {
    const res = await fetch("/api/orders", { cache: "no-store" });
    if (!res.ok) return 0;
    const json = (await res.json()) as { orders?: ServerOrder[] };
    const remote = Array.isArray(json.orders) ? json.orders : [];
    if (remote.length === 0) return 0;

    const st = usePishnam.getState();
    const byId = new Map(st.orders.map((o) => [o.id, o]));
    let changed = false;
    let maxNo = st.nextNo - 1;

    for (const r of remote) {
      if (!r || typeof r.id !== "string" || typeof r.no !== "number") continue;
      maxNo = Math.max(maxNo, r.no);
      const local = byId.get(r.id);
      if (!local) {
        byId.set(r.id, {
          ...r,
          dir: r.dir === "recv" ? "recv" : "sent",
          status: (STATUS_RANK[r.status] !== undefined ? r.status : "paid") as GiftStatus,
        });
        changed = true;
      } else {
        const lr = STATUS_RANK[local.status] ?? 0;
        const rr = STATUS_RANK[r.status] ?? 0;
        const status: GiftStatus = rr > lr ? (r.status as GiftStatus) : local.status;
        const opened = local.opened || r.opened;
        if (status !== local.status || opened !== local.opened) {
          byId.set(r.id, { ...local, status, opened });
          changed = true;
        }
      }
    }

    if (changed) {
      const orders = [...byId.values()].sort((a, b) => b.no - a.no);
      usePishnam.setState({ orders, nextNo: Math.max(st.nextNo, maxNo + 1) });
    }
    return remote.length;
  } catch {
    return 0; // offline / API down → local-only mode, UI keeps working
  }
}
