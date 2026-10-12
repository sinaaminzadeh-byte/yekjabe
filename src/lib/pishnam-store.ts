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
}

const DEFAULT_RECEIVER: Receiver = { name: "", city: "", address: "", phone: "" };

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
        return order;
      },

      advanceStatus: (id) =>
        set({
          orders: get().orders.map((o) =>
            o.id === id
              ? {
                  ...o,
                  status:
                    o.status === "paid"
                      ? "packing"
                      : o.status === "packing"
                        ? "shipped"
                        : "delivered",
                }
              : o,
          ),
        }),

      markOpened: (id) =>
        set({
          orders: get().orders.map((o) => (o.id === id ? { ...o, opened: true } : o)),
        }),

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

export function useBuilderTotal(): number {
  return usePishnam((s) => BOX_PRICE + (s.hearts + s.paws) * CHARM_PRICE);
}
