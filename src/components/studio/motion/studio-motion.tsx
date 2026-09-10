'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '@/lib/studio/gsap';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface StudioMotionValue {
  /** Operating-system reduced-motion preference */
  reduced: boolean;
  /** Visitor pressed "Pause motion" in the header */
  paused: boolean;
  /** True when ambient motion (autoplaying previews, particles) may run */
  motionEnabled: boolean;
  togglePaused: () => void;
  stopScroll: () => void;
  startScroll: () => void;
}

const StudioMotionContext = createContext<StudioMotionValue | null>(null);

/**
 * StudioMotionProvider — Lenis smooth scrolling driven by GSAP's ticker so
 * ScrollTrigger and Lenis share one clock, plus the page-wide pause control
 * (WCAG 2.2.2: anything that moves on its own for more than five seconds
 * must be pausable).
 */
export function StudioMotionProvider({ children }: { children: React.ReactNode }) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [paused, setPaused] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.12, anchors: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const togglePaused = useCallback(() => setPaused((value) => !value), []);
  const stopScroll = useCallback(() => lenisRef.current?.stop(), []);
  const startScroll = useCallback(() => lenisRef.current?.start(), []);

  const value = useMemo(
    () => ({
      reduced,
      paused,
      motionEnabled: !reduced && !paused,
      togglePaused,
      stopScroll,
      startScroll,
    }),
    [reduced, paused, togglePaused, stopScroll, startScroll]
  );

  return <StudioMotionContext.Provider value={value}>{children}</StudioMotionContext.Provider>;
}

export function useStudioMotion(): StudioMotionValue {
  const value = useContext(StudioMotionContext);
  if (!value) throw new Error('useStudioMotion must be used inside StudioMotionProvider');
  return value;
}
