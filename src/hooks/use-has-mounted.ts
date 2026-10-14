"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * SSR-safe "are we on the client yet" flag.
 * Returns false during SSR + hydration, true after mount — without setState.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
