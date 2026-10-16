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
  senderMode?: "name" | "phrase" | "anon"; // privacy-computed label mode (server)
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
  // payment reservation (bootstrap): lets the dashboard rebuild the
  // «تکمیل پرداخت» panel (countdown + copyable card + receipt upload)
  paymentHoldUntil?: string | null; // ISO deadline of the 10-min window
  paymentKey?: string; // idempotency key — the order owner may reuse it
  paymentMethod?: string; // zarinpal | manual_transfer
  // retention snapshot (mission §۴) — panel chips only, NEVER the content
  retentionPlan?: string; // 1m | 6m | 12m
  messageState?: "unopened" | "active" | "expired" | "purged";
  messageExpiresAt?: string | null; // ISO
  mediaCount?: number;
  viewable?: boolean; // status ∈ shipped|delivered (recipient may view)
}

/** A server-authorized received gift (GET /api/gifts/received). */
export interface ReceivedGift {
  code: string;
  no: number;
  kind: PlushKind;
  to: string;
  status: string;
  opened: boolean;
  occasion: number;
  hearts: number;
  paws: number;
  senderMode: "name" | "phrase" | "anon";
  senderLabel: string; // «یک هدیه برای تو» in anon — real name NEVER arrives
  hasMessage: boolean;
  mediaCount: number;
  retention: { state: "unopened" | "active" | "expired" | "purged"; shownAt: string | null; expiresAt: string | null; purgeStatus: string };
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
  retention: number;
  retentionPlan?: string;
  shipping: number;
  discount: number;
  total: number;
  lines?: { variantId: string; sku: string; productSlug: string; productName: string; unitPriceToman: number; qty: number; lineToman: number }[];
}

export interface CatalogEntry {
  slug: PlushKind;
  name: string;
  kind?: "main_gift" | "addon";
  emoji?: string;
  variantId: string;
  priceToman: number;
  inStock: boolean;
}

export type SenderDisplayMode = "name" | "phrase" | "anon";
export type RetentionPlanKey = "1m" | "6m" | "12m";

export interface MediaFileMeta {
  id: string;
  name: string;
  size: number;
  type: string;
  kind: "image" | "video" | "audio";
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
  // sender privacy (mission §۳) — per-order choice
  senderDisplay: SenderDisplayMode;
  senderPhrase: string;
  // نگهداری پیام (mission §۴)
  retention: RetentionPlanKey;
  // «افزودنی‌ها» (mission §۵) — companion products as extra cart lines
  addonLines: { variantId: string; qty: number }[];
  // message media (mission §۱/§۴) — meta only; File objects stay in memory
  mediaFiles: MediaFileMeta[];
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

  // received gifts (mission §۲) — session-scoped, server-authorized
  receivedGifts: ReceivedGift[];
  receivedStatus: "idle" | "loading" | "ready" | "error";
  fetchReceived: () => Promise<ReceivedGift[]>;

  // favorites (پشمالوهای محبوب)
  favorites: PlushKind[];

  // commerce (Phase B)
  catalog: Record<string, CatalogEntry>;
  catalogAddons: CatalogEntry[];
  retentionPrices: { m6: number; m12: number };
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
  setSenderDisplay: (m: SenderDisplayMode) => void;
  setSenderPhrase: (p: string) => void;
  setRetention: (r: RetentionPlanKey) => void;
  addAddon: (variantId: string) => void;
  removeAddon: (variantId: string) => void;
  setAddonQty: (variantId: string, qty: number) => void;
  addMediaFile: (file: File) => { ok: boolean; error?: string };
  removeMediaFile: (id: string) => void;
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
  /** Flip the raw status of a SPECIFIC order (by its PN code) — used by the
   * manual payment panel, which may be opened for an order that is NOT the
   * globally-pending one (dashboard/track rebuild the panel from bootstrap). */
  setOrderStatusByCode: (code: string, status: string) => void;
  advanceStatus: (id: string) => void;
  markOpened: (id: string) => void;
  resetBuilder: () => void;
  selectOrder: (id: string | null) => void;
  toggleFavorite: (k: PlushKind) => void;
}

/** File objects can't be serialized — they live here, keyed by meta id. */
const mediaFileMap = new Map<string, File>();
export function getMediaFile(id: string): File | undefined {
  return mediaFileMap.get(id);
}
export function clearMediaFiles(): void {
  mediaFileMap.clear();
}

function mediaKind(type: string): "image" | "video" | "audio" | null {
  if (/^image\/(jpeg|png|webp)$/.test(type)) return "image";
  if (/^video\/(mp4|webm)$/.test(type)) return "video";
  if (/^audio\/(mpeg|mp3|wav|ogg|mp4|webm|x-m4a|m4a)$/.test(type) || type === "audio/x-m4a") return "audio";
  return null;
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
      senderDisplay: "name",
      senderPhrase: "",
      retention: "1m",
      addonLines: [],
      mediaFiles: [],
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

      receivedGifts: [],
      receivedStatus: "idle",
      fetchReceived: async () => {
        if (get().receivedStatus === "loading") return get().receivedGifts;
        set({ receivedStatus: "loading" });
        try {
          const res = await fetch("/api/gifts/received", { cache: "no-store" });
          if (!res.ok) {
            set({ receivedStatus: "error" });
            return get().receivedGifts;
          }
          const data = (await res.json()) as { gifts: ReceivedGift[] };
          set({ receivedGifts: Array.isArray(data.gifts) ? data.gifts : [], receivedStatus: "ready" });
          return get().receivedGifts;
        } catch {
          set({ receivedStatus: "error" });
          return get().receivedGifts;
        }
      },

      catalog: {},
      catalogAddons: [],
      retentionPrices: { m6: 0, m12: 0 },
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
      setAnonymous: (a) => set({ anonymous: a, senderDisplay: a ? "anon" : "name" }),
      setSenderName: (n) => set({ senderName: n }),
      setSenderDisplay: (m) => set({ senderDisplay: m, anonymous: m === "anon" }),
      setSenderPhrase: (p) => set({ senderPhrase: p.slice(0, 40) }),
      setRetention: (r) => set({ retention: r }),
      addAddon: (variantId) => {
        const lines = get().addonLines;
        const cur = lines.find((l) => l.variantId === variantId);
        if (cur) {
          set({ addonLines: lines.map((l) => (l.variantId === variantId ? { ...l, qty: Math.min(10, l.qty + 1) } : l)) });
        } else {
          set({ addonLines: [...lines, { variantId, qty: 1 }] });
        }
      },
      removeAddon: (variantId) => set({ addonLines: get().addonLines.filter((l) => l.variantId !== variantId) }),
      setAddonQty: (variantId, qty) => {
        const q = Math.max(0, Math.min(10, qty));
        if (q === 0) {
          set({ addonLines: get().addonLines.filter((l) => l.variantId !== variantId) });
        } else {
          set({ addonLines: get().addonLines.map((l) => (l.variantId === variantId ? { ...l, qty: q } : l)) });
        }
      },
      addMediaFile: (file) => {
        const kind = mediaKind(file.type);
        if (!kind) return { ok: false, error: "bad_file_type" };
        if (file.size > 10 * 1024 * 1024) return { ok: false, error: "file_too_large" };
        if (get().mediaFiles.length >= 3) return { ok: false, error: "too_many_files" };
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        mediaFileMap.set(id, file);
        set({ mediaFiles: [...get().mediaFiles, { id, name: file.name, size: file.size, type: file.type, kind }] });
        return { ok: true };
      },
      removeMediaFile: (id) => {
        mediaFileMap.delete(id);
        set({ mediaFiles: get().mediaFiles.filter((m) => m.id !== id) });
      },
      setHearts: (n) => set({ hearts: Math.max(0, Math.min(99, n)) }),
      setPaws: (n) => set({ paws: Math.max(0, Math.min(99, n)) }),
      setReceiver: (r) => set({ receiver: { ...get().receiver, ...r } }),
      addPhoto: () => set({ photoAdded: true }),
      addVideo: () => set({ videoAdded: true }),

      login: (phone, name) => set({ user: { phone, name: name || "دوست مهربون" } }),
      // logout also drops every local order row AND the pending checkout key:
      // gift data belongs to the logged-in account — nothing may stay visible
      // on a shared device once the session is gone (server rows re-arrive on
      // the next bootstrap). A stale key would 422 the next fresh checkout.
      logout: () => set({ user: null, orders: [], pendingOrder: null }),

      // ── catalog (variantIds come from the server; never hardcode) ──
      loadCatalog: async () => {
        if (get().catalogLoaded) return;
        try {
          const res = await fetch("/api/catalog", { cache: "no-store" });
          if (!res.ok) return;
          const data = (await res.json()) as { products: CatalogEntry[]; retention?: { m6: number; m12: number } };
          const map: Record<string, CatalogEntry> = {};
          const addons: CatalogEntry[] = [];
          for (const p of data.products) {
            map[p.slug] = p;
            if (p.kind === "addon") addons.push(p);
          }
          set({
            catalog: map,
            catalogAddons: addons,
            retentionPrices: data.retention ?? { m6: 0, m12: 0 },
            catalogLoaded: true,
          });
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
          // main gift + «افزودنی‌ها» ride together as server-validated items
          const items = [
            { variantId: e!.variantId, qty: 1 },
            ...s.addonLines.map((l) => ({ variantId: l.variantId, qty: l.qty })),
          ];
          const payload = {
            items,
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
              senderDisplay: s.senderDisplay,
              senderPhrase: s.senderPhrase,
              retention: s.retention,
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

          // one idempotency key per checkout attempt (kept for ACK polling).
          // A stale key from an EARLIER order (logout/restore/shared device)
          // would 422 on submit — we self-heal below by rotating exactly once.
          let pending = get().pendingOrder;
          if (!pending?.key || pending.status === "paid") {
            const key = crypto.randomUUID();
            pending = { key };
            set({ pendingOrder: pending });
          }

          const payload = {
            items: [{ variantId: e.variantId, qty: 1 }, ...s.addonLines.map((l) => ({ variantId: l.variantId, qty: l.qty }))],
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
              senderDisplay: s.senderDisplay,
              senderPhrase: s.senderPhrase,
              retention: s.retention,
            },
            paymentMethod: s.paymentMethod,
          };
          const post = (key: string) =>
            fetch("/api/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json", "Idempotency-Key": key },
              body: JSON.stringify(payload),
            });
          let res = await post(pending.key);
          if (res.status === 422) {
            // server says THIS key already created a different order → the local
            // key is stale (survived a logout / restore). Rotate once and retry:
            // a true replay of the same payload would have returned the prior
            // order instead of this error, so a fresh order is the right move.
            pending = { key: crypto.randomUUID() };
            set({ pendingOrder: pending });
            res = await post(pending.key);
          }
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

          // message media (mission §۱/§۴) — private upload BEFORE any redirect:
          // the zarinpal path navigates away immediately, so files must land first.
          const metas = get().mediaFiles;
          if (metas.length > 0) {
            await Promise.all(
              metas.map(async (m) => {
                const file = getMediaFile(m.id);
                if (!file) return;
                try {
                  const form = new FormData();
                  form.set("code", ack.code);
                  form.set("key", pending.key);
                  form.set("file", file);
                  await fetch("/api/gifts/media", { method: "POST", body: form });
                } catch {
                  /* one file failing must not block the checkout */
                }
              }),
            );
          }

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
            senderName: s.senderDisplay === "anon" ? "" : s.senderName || (s.user?.name ?? ""),
            senderMode: s.senderDisplay,
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
            retentionPlan: s.retention,
            messageState: "unopened",
            mediaCount: metas.length,
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

      setOrderStatusByCode: (code, status) => {
        const p = get().pendingOrder;
        set({
          orders: get().orders.map((o) => (o.code === code ? { ...o, status2: status } : o)),
          // keep the pending ack consistent ONLY when it points at this order
          pendingOrder: p?.code === code ? { ...p, status } : p,
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

      resetBuilder: () => {
        clearMediaFiles();
        set({
          kind: "bear",
          occasion: 0,
          message: "",
          cardPassword: "",
          anonymous: false,
          senderName: "",
          senderDisplay: "name",
          senderPhrase: "",
          retention: "1m",
          addonLines: [],
          mediaFiles: [],
          hearts: 5,
          paws: 3,
          receiver: DEFAULT_RECEIVER,
          photoAdded: false,
          videoAdded: false,
          quote: null,
          quoteStatus: "idle",
        });
      },

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
      version: 3,
      // v2→v3: sender privacy + retention + addons + media meta (fresh defaults)
      migrate: (state) => {
        const s = state as Partial<PishnamState>;
        return {
          ...s,
          receiver: { ...DEFAULT_RECEIVER, ...(s.receiver ?? {}) },
          catalog: s.catalog ?? {},
          catalogAddons: [],
          retentionPrices: { m6: 0, m12: 0 },
          catalogLoaded: false,
          quote: null,
          quoteStatus: "idle",
          paymentMethod: s.paymentMethod ?? "zarinpal",
          pendingOrder: null,
          checkoutBusy: false,
          senderDisplay: s.senderDisplay ?? (s.anonymous ? "anon" : "name"),
          senderPhrase: s.senderPhrase ?? "",
          retention: s.retention ?? "1m",
          addonLines: Array.isArray(s.addonLines) ? s.addonLines : [],
          mediaFiles: [], // File objects never survive a reload
          receivedGifts: [],
          receivedStatus: "idle",
        } as PishnamState;
      },
      partialize: (state) => {
        // pendingOrder IS persisted (guide §4.7: the key lives in localStorage so
        // the success page can ACK-poll after the PSP redirect reload).
        const { quote: _q, quoteStatus: _qs, checkoutBusy: _b, catalog: _c, catalogLoaded: _cl, receivedGifts: _rg, receivedStatus: _rs, ...rest } = state;
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
