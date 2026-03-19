'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from 'framer-motion';

/**
 * SecurityWatermark — Animated guilloche pattern background.
 *
 * Creates a currency-grade security pattern using SVG that:
 * - "Breathes" with a subtle scale pulse (1.0 → 1.05)
 * - Shifts parallax-style against content on scroll
 * - Uses framer-motion's optimized animation frame for the breathing effect
 */
export function SecurityWatermark() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const smoothParallaxY = useSpring(parallaxY, { stiffness: 50, damping: 30 });

  // Breathing scale animation via motion value
  const breatheScale = useMotionValue(1);
  const breathePhase = useMotionValue(0);

  useAnimationFrame((time) => {
    // Slow breathing: 8-second cycle
    const phase = (time / 8000) % (Math.PI * 2);
    breathePhase.set(phase);
    // Scale oscillates between 1.0 and 1.05
    breatheScale.set(1 + Math.sin(phase) * 0.025);
  });

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.04]"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-[-20%] w-[140%] h-[140%]"
        style={{
          y: smoothParallaxY,
          scale: breatheScale,
        }}
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gold-500"
        >
          <defs>
            {/* Guilloche pattern — interlocking wave lines */}
            <pattern
              id="guilloche-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              {/* Primary wave */}
              <path
                d="M0 50 Q25 0, 50 50 T100 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.6"
              />
              <path
                d="M0 50 Q25 100, 50 50 T100 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.6"
              />
              {/* Secondary offset wave */}
              <path
                d="M0 25 Q25 -25, 50 25 T100 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                opacity="0.4"
              />
              <path
                d="M0 75 Q25 125, 50 75 T100 75"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                opacity="0.4"
              />
              {/* Rosette center */}
              <circle
                cx="50"
                cy="50"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                opacity="0.5"
              />
              <circle
                cx="50"
                cy="50"
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                opacity="0.3"
              />
              {/* Crosshatch fine lines */}
              <line
                x1="0"
                y1="0"
                x2="100"
                y2="100"
                stroke="currentColor"
                strokeWidth="0.15"
                opacity="0.2"
              />
              <line
                x1="100"
                y1="0"
                x2="0"
                y2="100"
                stroke="currentColor"
                strokeWidth="0.15"
                opacity="0.2"
              />
            </pattern>

            {/* Secondary fine mesh pattern */}
            <pattern
              id="mesh-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="10"
                cy="10"
                r="0.5"
                fill="currentColor"
                opacity="0.3"
              />
            </pattern>
          </defs>

          {/* Layer 1: Guilloche */}
          <rect width="100%" height="100%" fill="url(#guilloche-pattern)" />

          {/* Layer 2: Fine mesh overlay */}
          <rect
            width="100%"
            height="100%"
            fill="url(#mesh-pattern)"
            opacity="0.5"
          />
        </svg>
      </motion.div>
    </div>
  );
}
