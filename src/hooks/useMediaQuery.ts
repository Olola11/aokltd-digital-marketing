'use client';

import { useSyncExternalStore } from 'react';

/**
 * useMediaQuery — SSR-safe media query hook using useSyncExternalStore.
 *
 * Returns false on the server, then syncs with the actual match state on the client.
 * Automatically updates when the media query match changes.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', callback);
      return () => mq.removeEventListener('change', callback);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/**
 * useIsDesktop — Shorthand for min-width: 1024px check.
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

/**
 * useMounted — Returns true after client-side hydration is complete.
 */
const emptySubscribe = () => () => {};

export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
