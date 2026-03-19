'use client';

import { useCallback, useRef, useState } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
}

interface UseMouseTiltOptions {
  /** Maximum tilt angle in degrees (default: 8) */
  maxTilt?: number;
  /** Scale on hover (default: 1.02) */
  hoverScale?: number;
  /** Whether tilt is disabled (e.g. on touch devices) */
  disabled?: boolean;
}

/**
 * useMouseTilt — rAF-throttled mouse tracking for CSS transform tilt.
 *
 * Uses requestAnimationFrame to coalesce mouse events and avoid
 * layout thrashing. Returns tilt state + event handlers.
 */
export function useMouseTilt({
  maxTilt = 8,
  hoverScale = 1.02,
  disabled = false,
}: UseMouseTiltOptions = {}) {
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const rafRef = useRef<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;

      // Cancel any pending rAF to throttle to one update per frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const el = elementRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalise to -1 … 1
        const normalX = (e.clientX - centerX) / (rect.width / 2);
        const normalY = (e.clientY - centerY) / (rect.height / 2);

        setTilt({
          rotateX: -normalY * maxTilt, // negative so card tilts toward cursor
          rotateY: normalX * maxTilt,
          scale: hoverScale,
        });
      });
    },
    [disabled, maxTilt, hoverScale],
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  return {
    tilt,
    ref: elementRef,
    handlers: disabled
      ? {}
      : {
          onMouseMove: handleMouseMove,
          onMouseLeave: handleMouseLeave,
        },
  };
}
