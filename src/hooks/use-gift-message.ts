"use client";

// ── use-gift-message — debounced store write for the gift message (P-09) ──
// The textarea used to push EVERY keystroke into the zustand store, and the
// persist middleware rewrote the WHOLE localStorage record on every keystroke
// (a full JSON serialize per character). The hook keeps typing instant in a
// local draft and lands the value in the store at most once per 500 ms — plus
// immediate flush on blur and on unmount so nothing is ever lost.
// External store writes (MessageIdeas pick, resetBuilder, order submit) are
// mirrored into the draft with the React-documented «adjust state during
// render» pattern (setState-in-render, batched) while the ref sync and the
// pending-keystroke cancellation happen in an effect — no setState cascades,
// no ref access during render (react-hooks/refs & set-state-in-effect clean).
import { useEffect, useRef, useState } from "react";
import { usePishnam } from "@/lib/pishnam-store";

const DEBOUNCE_MS = 500;

export function useGiftMessage() {
  const storeMessage = usePishnam((s) => s.message);
  const [draft, setDraft] = useState(storeMessage);
  const [prevStore, setPrevStore] = useState(storeMessage);
  const pushedRef = useRef(storeMessage);
  const draftRef = useRef(storeMessage);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // external store write arrived → replace the draft immediately (the store
  // stays the single truth). Refs are NOT touched here (refs in render are
  // forbidden); the matching effect below cancels the pending keystroke push.
  if (storeMessage !== prevStore) {
    setPrevStore(storeMessage);
    setDraft(storeMessage);
  }

  useEffect(() => {
    if (storeMessage === pushedRef.current) return;
    // a pending keystroke push would clobber the external write — drop it
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    pushedRef.current = storeMessage;
    draftRef.current = storeMessage;
  }, [storeMessage]);

  const push = (v: string) => {
    pushedRef.current = v;
    usePishnam.setState({ message: v });
  };

  const flush = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (draftRef.current !== pushedRef.current) push(draftRef.current);
  };

  const setMessage = (v: string) => {
    draftRef.current = v;
    setDraft(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    // push the LATEST draft (not the captured keystroke) so a value already
    // superseded by an external pick can never clobber it
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      if (draftRef.current !== pushedRef.current) push(draftRef.current);
    }, DEBOUNCE_MS);
  };

  // leaving the screen with pending keystrokes must not lose them — the
  // cleanup only writes to the EXTERNAL store (allowed), never local setState
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (draftRef.current !== pushedRef.current) {
        usePishnam.setState({ message: draftRef.current });
      }
    };
  }, []);

  return { message: draft, setMessage, onBlur: flush };
}
