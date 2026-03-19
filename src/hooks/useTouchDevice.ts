'use client';

import { useEffect, useState } from 'react';

/**
 * useTouchDevice — Detects touch-primary devices via `(pointer: coarse)`.
 *
 * Uses useEffect to avoid hydration mismatches (SSR always returns false).
 * Listens for media query changes (e.g. desktop ↔ tablet mode on Surface).
 */
export function useTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouch(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isTouch;
}
