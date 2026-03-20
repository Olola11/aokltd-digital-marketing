'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useIsDesktop, useMounted } from '@/hooks/useMediaQuery';

// ─── SVG Geometry (100×100 viewBox) ─────────────────────────────

const CIRCLE_R = 42;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;

// A letterform — filled version (rises from mask)
const A_FILL =
  'M 50 16 L 23 82 L 33 82 L 42 56 L 58 56 L 67 82 L 77 82 Z M 46 50 L 50 32 L 54 50 Z';

// Quill feather — body + shaft
const QUILL_BODY =
  'M 36 74 C 42 62 52 46 64 30 C 58 44 46 60 36 74 Z';
const QUILL_SHAFT = 'M 37 73 L 63 31';

// ─── Animation Timing ───────────────────────────────────────────

// Phase 1a: Circle draws (0–0.6s)
const CIRCLE_DRAW_DURATION = 0.6;
// Phase 1b: Circle fills (0.5–0.7s) — overlaps slightly
const CIRCLE_FILL_DELAY = 0.5;
const CIRCLE_FILL_DURATION = 0.2;
// Phase 1c: A rises (0.5–0.9s)
const A_RISE_DELAY = 0.5;
const A_RISE_DURATION = 0.4;
// Phase 1d: Quill slashes in (0.8–1.3s)
const QUILL_DELAY = 0.8;

function AnimatedLogo({ quillOpacity }: { quillOpacity: MotionValue<number> }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-[72px] h-[72px]"
    >
      <defs>
        {/* Clip path for A letterform mask — rect slides up to reveal */}
        <clipPath id="a-mask">
          <motion.rect
            x="20"
            y="10"
            width="60"
            height="80"
            initial={{ y: 80 }}
            animate={{ y: 10 }}
            transition={{
              duration: A_RISE_DURATION,
              delay: A_RISE_DELAY,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </clipPath>
      </defs>

      {/* Phase 1a: Circle draws via strokeDasharray */}
      <motion.circle
        cx="50"
        cy="50"
        r={CIRCLE_R}
        fill="none"
        stroke="#00008B"
        strokeWidth="4.5"
        transform="rotate(-90 50 50)"
        strokeDasharray={CIRCLE_CIRCUMFERENCE}
        initial={{ strokeDashoffset: CIRCLE_CIRCUMFERENCE }}
        animate={{ strokeDashoffset: 0 }}
        transition={{
          duration: CIRCLE_DRAW_DURATION,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* Phase 1b: Circle fills after stroke completes */}
      <motion.circle
        cx="50"
        cy="50"
        r={CIRCLE_R}
        fill="#00008B"
        stroke="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{
          duration: CIRCLE_FILL_DURATION,
          delay: CIRCLE_FILL_DELAY,
          ease: 'easeOut',
        }}
      />

      {/* Phase 1c: A rises from clipPath mask */}
      <motion.path
        d={A_FILL}
        fill="#00008B"
        fillRule="evenodd"
        clipPath="url(#a-mask)"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          y: {
            duration: A_RISE_DURATION,
            delay: A_RISE_DELAY,
            ease: [0.22, 1, 0.36, 1],
          },
          opacity: {
            duration: 0.2,
            delay: A_RISE_DELAY,
          },
        }}
      />

      {/* Phase 1d: Quill slashes in with elastic spring */}
      <motion.g
        data-logo-quill
        initial={{ opacity: 0, x: 15, y: -15, rotate: -25 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
        transition={{
          type: 'spring',
          bounce: 0.5,
          duration: 0.5,
          delay: QUILL_DELAY,
          opacity: { duration: 0.15, delay: QUILL_DELAY },
        }}
        style={{ originX: '50%', originY: '50%', opacity: quillOpacity }}
      >
        <path d={QUILL_BODY} fill="#4A90E2" />
        <path
          d={QUILL_SHAFT}
          fill="none"
          stroke="#2B8AD9"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </motion.g>
    </motion.svg>
  );
}

export function BrandConstruction() {
  const mounted = useMounted();
  const isDesktop = useIsDesktop();
  const logoRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  // Quill lifts (scale) then vanishes (opacity) as user scrolls
  const quillOpacity = useTransform(scrollY, [20, 80], [1, 0]);

  if (!mounted) {
    return <div className="w-[72px] h-[72px] mx-auto mb-6 sm:mb-8" />;
  }

  if (!isDesktop) {
    return (
      <Image
        src="/images/logo/Apotheosis of Knowledge LOGO PNG-15.png"
        alt="Apotheosis of Knowledge"
        width={72}
        height={72}
        className="mx-auto mb-6 sm:mb-8"
        priority
      />
    );
  }

  return (
    <div ref={logoRef} className="mx-auto mb-6 sm:mb-8 w-[72px] h-[72px]">
      <AnimatedLogo quillOpacity={quillOpacity} />
    </div>
  );
}
