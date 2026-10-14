"use client";

// ── Pishnam global store: builder state, orders, auth, charity ──
// Phase B: server-authoritative money. The client NEVER computes a payable
// total — `fetchQuote()` renders the server quote and `submitCheckout()` posts
// with an Idempotency-Key. (guide §4.5–4.7 / §B4)
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  BOX_PRICE,
  CHARM_PRICE,
  FIRST_GIFT_NO,
  CHARITY_BASE,
  type PlushKind,
} from "./pishnam-data";

export type TrackStep = 0 | 1 | 2 | 3; // index into TRACK_STEPS
export const TRACK_STEPS = [
  { key: "paid", label: "پرداخت شد", body: "هدیه‌ت ثبت شد و جعبه‌ش رو گرفتیم." },
  { key: "packing", label: "بسته‌بندی", body: "کارت پستال، قلب و پنجه‌ها رو جعبه می‌چسبونیم." },
  { key: "shipped", label: "در راه", body: "جعبه تحویل پست شد؛ به‌زودی می‌رسه." },
  { key: "delivered", label: "تحویل شد", body: "جعبه رسید! حالا نوبت رمز کارته." },
] as const;

export function statusToStep(s: GiftStatus): TrackStep {
  return s === "paid" ? 0 : s === "packing" ? 1 : s === "shipped" ? 2 : 3;
}

export type GiftStatus = "paid" | "packing" | "shipped" | "delivered";

export interface GiftOrder {
  id: string;
  no: number; // gift number (۱۰۱… or the #### tail of a PN- code)
  kind: PlushKind;
  to: string; // receiver name
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
  status: GiftStatus;
  opened: boolean;
  dir: "sent" | "recv";
  userPhone?: string; // logged-in sender's phone (server-synced)
  code?: string; // PN-YYMMDD-#### for Phase-B server orders
  status2?: string; // raw 11-state status (server orders)
  v2?: boolean; // true = lives in the new Order table
}

export interface Receiver {
  name: string;
  province: string;
  city: string;
  address: string;
  phone: string;
}

export type PaymentMethod = "zarinpal" | "manual_transfer";

export interface Quote {
  subtotal: number;
  charms: number;
  shipping: number;
  discount: number;
  total: number;
}

export interface CatalogEntry {
  slug: PlushKind;
  name: string;
  variantId: string;
  priceToman: number;
  inStock: boolean;
}

export interface CheckoutAck {
  code: string;
  status: string;
  total: number;
  replayed: boolean;
  payment: {
    method: string;
    provider: string;
    status: string;
    redirectUrl?: string;
    expiresAt?: string; // ISO — end of the payment/reservation window (10min manual)
    windowMinutes?: number;
    instructions?: Record<string, string>;
  };
}

interface PishnamState {
  // builder
  kind: PlushKind;
  occasion: number;
  message: string;
  cardPassword: string;
  anonymous: boolean;
  senderName: string;
  hearts: number;
  paws: number;
  receiver: Receiver;
  photoAdded: boolean;
  videoAdded: boolean;

  // auth
  user: { phone: string; name: string } | null;

  // orders
  orders: GiftOrder[];
  nextNo: number;
  selectedId: string | null;

  // favorites (پشمالوهای محبوب)
  favorites: PlushKind[];

  // commerce (Phase B)
  catalog: Record<string, CatalogEntry>;
  catalogLoaded: boolean;
  quote: Quote | null;
  quoteStatus: "idle" | "loading" | "ready" | "error";
  paymentMethod: PaymentMethod;
  setPaymentMethod: (m: PaymentMethod) => void;
  pendingOrder: { key: string; code?: string; status?: string; total?: number; expiresAt?: string; method?: string } | null;
  checkoutBusy: boolean;

  setKind: (k: PlushKind) => void;
  setOccasion: (i: number) => void;
  setMessage: (m: string) => void;
  setCardPassword: (p: string) => void;
  setAnonymous: (a: boolean) => void;
  setSenderName: (n: string) => void;
  setHearts: (n: number) => void;
  setPaws: (n: number) => void;
  setReceiver: (r: Partial<Receiver>) => void;
  addPhoto: () => void;
  addVideo: () => void;

  login: (phone: string, name: string) => void;
  logout: () => void;

  loadCatalog: () => Promise<void>;
  fetchQuote: () => Promise<void>;
  submitCheckout: () => Promise<{ ok: boolean; ack?: CheckoutAck; error?: string; details?: Record<string, unknown> }>;
  clearPendingOrder: () => void;
  setPendingStatus: (status: string) => void;
  advanceStatus: (id: string) => void;
  markOpened: (id: string) => void;
  resetBuilder: () => void;
  selectOrder: (id: string | null) => void;
  toggleFavorite: (k: PlushKind) => void;
}

const DEFAULT_RECEIVER: Receiver = { name: "", province: "تهران", city: "", address: "", phone: "" };

function todayFa(): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      day: "numeric",
      month: "long",
    }).format(new Date());
  } catch {
    return "امروز";
  }
}

/** Server sync for LEGACY demo rows only — v2 orders live on the server. */
function syncOrderPatch(get: () => PishnamState, id: string, body: Record<string, unknown>) {
  const o = get().orders.find((x) => x.id === id);
  if (!o || o.v2) return; // v2 orders are moved by the admin console, not the client
  void fetch(`/api/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => {});
}

export const usePishnam = create<PishnamState>()(
  persist(
    (set, get) => ({
      kind: "bear",
      occasion: 0,
      message: "",
      cardPassword: "",
      anonymous: false,
      senderName: "",
      hearts: 5,
      paws: 3,
      receiver: DEFAULT_RECEIVER,
      photoAdded: false,
      videoAdded: false,

      user: null,

      selectedId: null,
      favorites: ["panda"],
      orders: [],
      nextNo: FIRST_GIFT_NO,

      catalog: {},
      catalogLoaded: false,
      quote: null,
      quoteStatus: "idle",
      paymentMethod: "zarinpal",
      setPaymentMethod: (m) => set({ paymentMethod: m }),
      pendingOrder: null,
      checkoutBusy: false,

      setKind: (k) => set({ kind: k }),
      setOccasion: (i) => set({ occasion: i }),
      setMessage: (m) => set({ message: m }),
      setCardPassword: (p) => set({ cardPassword: p }),
      setAnonymous: (a) => set({ anonymous: a }),
      setSenderName: (n) => set({ senderName: n }),
      setHearts: (n) => set({ hearts: Math.max(0, Math.min(99, n)) }),
      setPaws: (n) => set({ paws: Math.max(0, Math.min(99, n)) }),
      setReceiver: (r) => set({ receiver: { ...get().receiver, ...r } }),
      addPhoto: () => set({ photoAdded: true }),
      addVideo: () => set({ videoAdded: true }),

      login: (phone, name) => set({ user: { phone, name: name || "دوست مهربون" } }),
      logout: () => set({ user: null }),

      // ── catalog (variantIds come from the server; never hardcode) ──
      loadCatalog: async () => {
        if (get().catalogLoaded) return;
        try {
          const res = await fetch("/api/catalog", { cache: "no-store" });
          if (!res.ok) return;
          const data = (await res.json()) as { products: CatalogEntry[] };
          const map: Record<string, CatalogEntry> = {};
          for (const p of data.products) map[p.slug] = p;
          set({ catalog: map, catalogLoaded: true });
        } catch {
          /* offline → retry on next call */
        }
      },

      // ── server quote — THE only money source (guide §4.5) ──
      fetchQuote: async () => {
        const s = get();
        if (s.quoteStatus === "loading") return;
        set({ quoteStatus: "loading" });
        try {
          const entry = s.catalog[s.kind];
          if (!entry) {
            await get().loadCatalog();
            if (!get().catalog[s.kind]) {
              set({ quoteStatus: "error" });
              return;
            }
          }
          const e = get().catalog[s.kind];
          const payload = {
            items: [{ variantId: e!.variantId, qty: 1 }],
            addons: { charmHearts: s.hearts, charmPaws: s.paws },
            sender: { name: s.senderName || s.user?.name || "مهمان", phone: s.user?.phone ?? "" },
            recipient: {
              name: s.receiver.name || "دوست گلم",
              phone: s.receiver.phone || "09120000000",
              province: s.receiver.province || "تهران",
              city: s.receiver.city || "تهران",
              address: s.receiver.address || "تهران، خیابان نمونه",
              postalCode: "",
            },
            gift: {
              message: s.message || " ",
              password: s.cardPassword.length >= 4 ? s.cardPassword : "0000",
              occasion: s.occasion,
              anonymous: s.anonymous,
            },
            paymentMethod: s.paymentMethod,
          };
          const res = await fetch("/api/checkout/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) {
            set({ quoteStatus: "error" });
            return;
          }
          const q = (await res.json()) as Quote;
          set({ quote: q, quoteStatus: "ready" });
        } catch {
          set({ quoteStatus: "error" });
        }
      },

      // ── the real checkout (idempotent; guide §4.7) ──
      submitCheckout: async () => {
        const s = get();
        if (s.checkoutBusy) return { ok: false, error: "busy" };
        set({ checkoutBusy: true });
        try {
          await get().loadCatalog();
          const e = get().catalog[s.kind];
          if (!e) return { ok: false, error: "catalog_unavailable" };
          if (!e.inStock) return { ok: false, error: "sold_out" };

          // one idempotency key per checkout attempt (kept for ACK polling)
          let pending = get().pendingOrder;
          if (!pending?.key || pending.status === "paid") {
            const key = crypto.randomUUID();
            pending = { key };
            set({ pendingOrder: pending });
          }

          const payload = {
            items: [{ variantId: e.variantId, qty: 1 }],
            addons: { charmHearts: s.hearts, charmPaws: s.paws },
            sender: { name: s.senderName || s.user?.name || "مهمان", phone: s.user?.phone ?? "" },
            recipient: {
              name: s.receiver.name,
              phone: s.receiver.phone,
              province: s.receiver.province || "تهران",
              city: s.receiver.city,
              address: s.receiver.address,
              postalCode: "",
            },
            gift: {
              message: s.message,
              password: s.cardPassword,
              occasion: s.occasion,
              anonymous: s.anonymous,
            },
            paymentMethod: s.paymentMethod,
          };
          const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Idempotency-Key": pending.key },
            body: JSON.stringify(payload),
          });
          if (!res.ok) {
            const body = (await res.json().catch(() => ({}))) as { error?: string; details?: Record<string, unknown> };
            return { ok: false, error: body.error ?? `http_${res.status}`, details: body.details };
          }
          const ack = (await res.json()) as CheckoutAck;
          set({
            pendingOrder: {
              key: pending.key,
              code: ack.code,
              status: ack.status,
              total: ack.total,
              expiresAt: ack.payment?.expiresAt,
              method: ack.payment?.method,
            },
          });

          // local mirror so «هدیه‌هام»/موفقیت work even before the next bootstrap
          const mirrored: GiftOrder = {
            id: `o-local-${ack.code}`,
            no: Number(ack.code.slice(-4)) || get().nextNo,
            kind: s.kind,
            to: s.receiver.name || "دوست گلم",
            city: s.receiver.city,
            address: s.receiver.address,
            phone: s.receiver.phone,
            message: s.message,
            occasion: s.occasion,
            password: s.cardPassword, // kept locally only — server stores a hash
            anonymous: s.anonymous,
            senderName: s.anonymous ? "" : s.senderName || (s.user?.name ?? ""),
            hearts: s.hearts,
            paws: s.paws,
            total: ack.total,
            date: todayFa(),
            status: "paid",
            opened: false,
            dir: "sent",
            userPhone: s.user?.phone ?? "",
            code: ack.code,
            status2: ack.status,
            v2: true,
          };
          const rest = get().orders.filter((o) => o.id !== mirrored.id);
          set({ orders: [mirrored, ...rest], nextNo: Math.max(get().nextNo, mirrored.no + 1) });
          return { ok: true, ack };
        } catch {
          return { ok: false, error: "network" };
        } finally {
          set({ checkoutBusy: false });
        }
      },

      clearPendingOrder: () => set({ pendingOrder: null }),

      setPendingStatus: (status) => {
        const p = get().pendingOrder;
        if (!p) return;
        set({
          pendingOrder: { ...p, status },
          orders: get().orders.map((o) => (o.code === p.code ? { ...o, status2: status } : o)),
        });
      },

      advanceStatus: (id) => {
        const cur = get().orders.find((o) => o.id === id);
        const next: GiftStatus | null = !cur
          ? null
          : cur.status === "paid"
            ? "packing"
            : cur.status === "packing"
              ? "shipped"
              : "delivered";
        set({
          orders: get().orders.map((o) =>
            o.id === id && next ? { ...o, status: next } : o,
          ),
        });
        if (next) syncOrderPatch(get, id, { status: next });
      },

      markOpened: (id) => {
        set({
          orders: get().orders.map((o) => (o.id === id ? { ...o, opened: true } : o)),
        });
        syncOrderPatch(get, id, { opened: true });
      },

      resetBuilder: () =>
        set({
          kind: "bear",
          occasion: 0,
          message: "",
          cardPassword: "",
          anonymous: false,
          senderName: "",
          hearts: 5,
          paws: 3,
          receiver: DEFAULT_RECEIVER,
          photoAdded: false,
          videoAdded: false,
          quote: null,
          quoteStatus: "idle",
        }),

      selectOrder: (id) => set({ selectedId: id }),
      toggleFavorite: (k) => {
        const favorites = get().favorites.includes(k)
          ? get().favorites.filter((f) => f !== k)
          : [...get().favorites, k];
        set({ favorites });
        // account-bound favorites follow the user across devices (offline-safe:
        // the local toggle always lands first, the PUT is fire-and-forget).
        // Identity = HttpOnly session cookie; no phone in the body (Phase A).
        if (get().user?.phone) {
          void fetch("/api/favorites", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ kinds: favorites }),
          }).catch(() => {});
        }
      },
    }),
    {
      name: "pishnam-app",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      // v1→v2: receiver gained `province`; transient commerce fields stay out of storage
      migrate: (state) => {
        const s = state as Partial<PishnamState>;
        return {
          ...s,
          receiver: { ...DEFAULT_RECEIVER, ...(s.receiver ?? {}) },
          catalog: s.catalog ?? {},
          catalogLoaded: false,
          quote: null,
          quoteStatus: "idle",
          paymentMethod: s.paymentMethod ?? "zarinpal",
          pendingOrder: null,
          checkoutBusy: false,
        } as PishnamState;
      },
      partialize: (state) => {
        // pendingOrder IS persisted (guide §4.7: the key lives in localStorage so
        // the success page can ACK-poll after the PSP redirect reload).
        const { quote: _q, quoteStatus: _qs, checkoutBusy: _b, catalog: _c, catalogLoaded: _cl, ...rest } = state;
        return rest;
      },
    },
  ),
);

// ── Derived selectors ──
export function useCharityDone(): number {
  return usePishnam(
    (s) => CHARITY_BASE + s.orders.reduce((acc, o) => acc + o.hearts + o.paws, 0),
  );
}

export function useCharmsTotal(): number {
  return usePishnam((s) => s.hearts + s.paws);
}

export function useSelectedOrder(): GiftOrder | null {
  return usePishnam(
    (s) => s.orders.find((o) => o.id === s.selectedId) ?? s.orders.find((o) => o.dir === "sent") ?? null,
  );
}

export function useIsFavorite(kind: PlushKind): boolean {
  return usePishnam((s) => s.favorites.includes(kind));
}

/**
 * Builder-rail estimate. NOT the payable price — the server quote is the only
 * payable number (guide §B4). Used as a display fallback while the quote loads.
 */
export function useBuilderTotal(): number {
  const quote = usePishnam((s) => s.quote);
  const hearts = usePishnam((s) => s.hearts);
  const paws = usePishnam((s) => s.paws);
  return quote ? quote.total : BOX_PRICE + (hearts + paws) * CHARM_PRICE;
}
