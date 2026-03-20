'use client';

import { useSyncExternalStore } from 'react';

/**
 * useTouchDevice — Detects touch-primary devices via `(pointer: coarse)`.
 *
 * Uses useSyncExternalStore to avoid hydration mismatches and lint warnings.
 * Listens for media query changes (e.g. desktop ↔ tablet mode on Surface).
 */

function subscribeTouchDevice(callback: () => void) {
  const mq = window.matchMedia('(pointer: coarse)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getTouchSnapshot() {
  return window.matchMedia('(pointer: coarse)').matches;
}

function getTouchServerSnapshot() {
  return false;
}

export function useTouchDevice(): boolean {
  return useSyncExternalStore(
    subscribeTouchDevice,
    getTouchSnapshot,
    getTouchServerSnapshot
  );
}
