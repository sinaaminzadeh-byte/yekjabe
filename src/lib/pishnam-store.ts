"use client";

// ── Pishnam global store: builder state, orders, auth, charity ──
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
  { key: "paid", label: "پرداخت شد", body: "هدیه‌ت ثبت شد و جعبه‌ش رو گرفتمیم." },
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
  no: number; // gift number (۱۰۱…)
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
}

export interface Receiver {
  name: string;
  city: string;
  address: string;
  phone: string;
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

  placeOrder: () => GiftOrder;
  advanceStatus: (id: string) => void;
  markOpened: (id: string) => void;
  resetBuilder: () => void;
  selectOrder: (id: string | null) => void;
  toggleFavorite: (k: PlushKind) => void;
}

const DEFAULT_RECEIVER: Receiver = { name: "", city: "", address: "", phone: "" };

/**
 * Fire-and-forget server sync (UI keeps working offline).
 * PATCH first; if the server doesn't know the row yet (order made before the
 * backend existed / offline), fall back to pushing the full order (upsert).
 */
function syncOrderPatch(get: () => PishnamState, id: string, body: Record<string, unknown>) {
  void fetch(`/api/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (!res.ok) throw new Error("patch failed");
    })
    .catch(() => {
      const o = get().orders.find((x) => x.id === id);
      if (o) {
        void fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(o),
        }).catch(() => {});
      }
    });
}

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
      orders: [
        {
          id: "seed-1",
          no: 96,
          kind: "panda",
          to: "تو",
          city: "تهران",
          address: "",
          phone: "",
          message:
            "سلام رفیق! شنیدم این روزا حال و هوات خوب نیست. بامبو رو برات فرستادم که هر شب بغلش کنی و یادت باشه یکی این‌ور شهر دعا‌ت می‌کنه. زودتر بیا دیدنی.",
          occasion: 1,
          password: "بهار",
          anonymous: true,
          senderName: "",
          hearts: 2,
          paws: 1,
          total: BOX_PRICE + 3 * CHARM_PRICE,
          date: "۱۲ مهر",
          status: "delivered",
          opened: false,
          dir: "recv",
        },
      ],
      nextNo: FIRST_GIFT_NO,

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

      placeOrder: () => {
        const s = get();
        const no = s.nextNo;
        const total = BOX_PRICE + (s.hearts + s.paws) * CHARM_PRICE;
        const order: GiftOrder = {
          id: `g-${no}-${Date.now()}`,
          no,
          kind: s.kind,
          to: s.receiver.name || "دوست گلم",
          city: s.receiver.city || "تهران",
          address: s.receiver.address,
          phone: s.receiver.phone,
          message: s.message,
          occasion: s.occasion,
          password: s.cardPassword || "بهار",
          anonymous: s.anonymous,
          senderName: s.anonymous ? "" : s.senderName || (s.user?.name ?? ""),
          hearts: s.hearts,
          paws: s.paws,
          total,
          date: todayFa(),
          status: "paid",
          opened: false,
          dir: "sent",
        };
        set({ orders: [order, ...s.orders], nextNo: no + 1 });
        // direct upsert POST (server may not know this brand-new row yet)
        void fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        }).catch(() => {});
        return order;
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
        if (next) {
          syncOrderPatch(get, id, { status: next });
        }
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
        }),

      selectOrder: (id) => set({ selectedId: id }),
      toggleFavorite: (k) =>
        set({
          favorites: get().favorites.includes(k)
            ? get().favorites.filter((f) => f !== k)
            : [...get().favorites, k],
        }),
    }),
    {
      name: "pishnam-app",
      storage: createJSONStorage(() => localStorage),
      version: 1,
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

export function useBuilderTotal(): number {
  return usePishnam((s) => BOX_PRICE + (s.hearts + s.paws) * CHARM_PRICE);
}
