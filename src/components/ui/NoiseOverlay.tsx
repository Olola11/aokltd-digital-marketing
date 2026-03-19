'use client';

import { useEffect, useState } from 'react';

/**
 * NoiseOverlay — Subtle film grain texture over the viewport.
 *
 * Desktop:  SVG feTurbulence filter with CSS keyframe animation.
 *           Produces rich, randomised grain at low cost on desktop GPUs.
 *
 * Mobile:   Swaps to a tiny repeating PNG background-image to avoid
 *           the expensive SVG filter repaint on every scroll frame.
 *           Opacity reduced to 0.02, no animation. Hardware-accelerated
 *           via transform: translateZ(0).
 *
 * Both:     pointer-events-none, z-[1], mix-blend-overlay.
 */
export function NoiseOverlay() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouch(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Mobile: lightweight repeating PNG — no SVG filter, no animation
  if (isTouch) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[1] mix-blend-overlay opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: 'url(/images/noise.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      />
    );
  }

  // Desktop: SVG filter with CSS keyframe animation
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-overlay opacity-[0.035]"
      aria-hidden="true"
    >
      <svg className="hidden">
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <div
        className="absolute -inset-[50%] w-[200%] h-[200%] animate-noise"
        style={{
          filter: 'url(#noise-filter)',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
