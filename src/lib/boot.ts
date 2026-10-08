/**
 * Tiny boot signal: the loader calls `markBooted()` when it starts fading,
 * and hero entrance animations wait for it. Never blocks rendering — the page
 * underneath is already mounted.
 */
import { useEffect, useState } from "react";

let booted = false;
const listeners = new Set<() => void>();

export function markBooted() {
  if (booted) return;
  booted = true;
  listeners.forEach((l) => l());
  listeners.clear();
}

export function useBooted() {
  const [ready, setReady] = useState(booted);
  useEffect(() => {
    if (booted) {
      setReady(true);
      return;
    }
    const l = () => setReady(true);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return ready;
}
