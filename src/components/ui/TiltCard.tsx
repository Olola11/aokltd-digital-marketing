'use client';

import { type ReactNode } from 'react';
import { useMouseTilt } from '@/hooks/useMouseTilt';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Disable tilt (e.g. on touch devices) */
  disabled?: boolean;
  /** Max tilt angle in degrees */
  maxTilt?: number;
}

/**
 * TiltCard — Glassmorphism card with CSS-transform perspective tilt.
 *
 * On desktop, follows the cursor with smooth spring-like easing via
 * CSS transition on `transform`. On mobile (disabled=true), renders
 * as a static card with no transform overhead.
 */
export function TiltCard({
  children,
  className,
  disabled = false,
  maxTilt = 8,
}: TiltCardProps) {
  const { tilt, ref, handlers } = useMouseTilt({
    maxTilt,
    hoverScale: 1.02,
    disabled,
  });

  return (
    <div
      ref={ref}
      {...handlers}
      className={cn(
        'relative rounded-xl overflow-hidden',
        'bg-navy-800/60 backdrop-blur-md',
        'border border-white/[0.08]',
        !disabled && 'hover:border-white/[0.15]',
        className,
      )}
      style={{
        transform: disabled
          ? undefined
          : `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${tilt.scale}, ${tilt.scale}, 1)`,
        transition: 'transform 0.35s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
        willChange: disabled ? undefined : 'transform',
      }}
    >
      {/* Subtle gradient sheen that shifts with tilt */}
      {!disabled && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.rotateY * 4}% ${50 - tilt.rotateX * 4}%, rgba(212,168,75,0.06) 0%, transparent 60%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
