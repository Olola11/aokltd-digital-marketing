'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTouchDevice } from '@/hooks/useTouchDevice';

/**
 * TouchRipple — "Ink Ripple" Touch Feedback for Mobile
 *
 * THE MOBILE SIGNATURE — "Touch Presence" Effect
 *
 * Concept: Since mobile lacks hover states, we need visual feedback for
 * touch presence. Anywhere the user touches the screen, a translucent
 * Cyan/Blue ink ripple expands and fades out.
 *
 * Animation:
 * - Scale: 0 → 1.5
 * - Opacity: 0.4 → 0
 * - Duration: 600ms with ease-out
 *
 * Implementation: Global event listener spawns SVG ripples at touch point.
 */

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface TouchRippleProps {
  /** Color of the ripple (default: quill-500 cyan) */
  color?: string;
  /** Maximum ripple size in pixels (default: 150) */
  maxSize?: number;
  /** Duration of ripple animation in ms (default: 600) */
  duration?: number;
  /** Enable/disable the effect (default: true) */
  enabled?: boolean;
}

/**
 * Individual ripple component
 */
function RippleEffect({
  x,
  y,
  color,
  size,
  duration,
  onComplete,
}: {
  x: number;
  y: number;
  color: string;
  size: number;
  duration: number;
  onComplete: () => void;
}) {
  return (
    <motion.div
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
      }}
      initial={{ scale: 0, opacity: 0.5 }}
      animate={{ scale: 1.5, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: duration / 1000,
        ease: [0.4, 0, 0.2, 1], // ease-out
      }}
      onAnimationComplete={onComplete}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {/* Outer ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.6"
        />
        {/* Inner filled circle */}
        <circle cx="50" cy="50" r="30" fill={color} opacity="0.3" />
        {/* Center dot */}
        <circle cx="50" cy="50" r="8" fill={color} opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/**
 * Global touch ripple provider component.
 * Place this once at the top level of your app (e.g., in layout.tsx or page).
 */
export function TouchRippleProvider({
  color = '#4AA8FF', // quill-500
  maxSize = 150,
  duration = 600,
  enabled = true,
}: TouchRippleProps) {
  const isTouch = useTouchDevice();
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enabled || !isTouch) return;

      // Get touch coordinates
      const touch = e.touches[0];
      if (!touch) return;

      const newRipple: Ripple = {
        id: nextId.current++,
        x: touch.clientX,
        y: touch.clientY,
      };

      setRipples((prev) => [...prev, newRipple]);
    },
    [enabled, isTouch]
  );

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  // Attach global touch listener
  useEffect(() => {
    if (!isTouch || !enabled) return;

    // Use passive listener for better scroll performance
    document.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isTouch, enabled, handleTouchStart]);

  // Don't render anything on desktop
  if (!isTouch || !enabled) return null;

  return (
    <AnimatePresence>
      {ripples.map((ripple) => (
        <RippleEffect
          key={ripple.id}
          x={ripple.x}
          y={ripple.y}
          color={color}
          size={maxSize}
          duration={duration}
          onComplete={() => removeRipple(ripple.id)}
        />
      ))}
    </AnimatePresence>
  );
}

/**
 * Hook for components that want to trigger ripples programmatically.
 * Returns a function to spawn a ripple at given coordinates.
 */
export function useTouchRipple(containerRef: React.RefObject<HTMLElement | null>) {
  const isTouch = useTouchDevice();
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);

  const createRipple = useCallback(
    (x: number, y: number) => {
      if (!isTouch) return;

      const newRipple: Ripple = {
        id: nextId.current++,
        x,
        y,
      };

      setRipples((prev) => [...prev, newRipple]);
    },
    [isTouch]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (!touch || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      createRipple(touch.clientX - rect.left, touch.clientY - rect.top);
    },
    [containerRef, createRipple]
  );

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return {
    ripples,
    handleTouchStart,
    removeRipple,
    isTouch,
  };
}
