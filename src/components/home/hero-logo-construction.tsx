'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

// ─── SVG Geometry (100×100 viewBox) ─────────────────────────────

const CIRCLE_R = 42;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;

const A_FILL =
  'M 50 16 L 23 82 L 33 82 L 42 56 L 58 56 L 67 82 L 77 82 Z M 46 50 L 50 32 L 54 50 Z';

const QUILL_BODY =
  'M 36 74 C 42 62 52 46 64 30 C 58 44 46 60 36 74 Z';
const QUILL_SHAFT = 'M 37 73 L 63 31';

// ─── Timing Constants ───────────────────────────────────────────

const CIRCLE_DRAW = 0.6;        // 0 – 0.6s
const A_DELAY = 0.4;            // starts at 0.4s
const A_DURATION = 0.45;        // 0.4 – 0.85s
const QUILL_DELAY = 0.75;       // starts at 0.75s (finale)

// ─── Inner SVG (desktop only) ───────────────────────────────────

function ConstructedLogo({
  quillOpacity,
  quillScale,
  ringOpacity,
  ringScale,
}: {
  quillOpacity: MotionValue<number>;
  quillScale: MotionValue<number>;
  ringOpacity: MotionValue<number>;
  ringScale: MotionValue<number>;
}) {
  return (
    <svg viewBox="0 0 100 100" className="w-[72px] h-[72px]">
      <defs>
        {/* Clipping mask — rect slides upward to reveal the A */}
        <clipPath id="a-reveal-mask">
          <motion.rect
            x="15"
            y="10"
            width="70"
            height="80"
            initial={{ y: 90 }}
            animate={{ y: 10 }}
            transition={{
              duration: A_DURATION,
              delay: A_DELAY,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </clipPath>
      </defs>

      {/* ── Circle + A group: fades & shrinks on scroll ── */}
      <motion.g
        style={{
          opacity: ringOpacity,
          scale: ringScale,
          transformOrigin: '50px 50px',
        }}
      >
        {/* Circle draws via strokeDasharray */}
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
            duration: CIRCLE_DRAW,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* A rises from invisible baseline mask */}
        <motion.path
          d={A_FILL}
          fill="#00008B"
          fillRule="evenodd"
          clipPath="url(#a-reveal-mask)"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            y: {
              duration: A_DURATION,
              delay: A_DELAY,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: { duration: 0.2, delay: A_DELAY },
          }}
        />
      </motion.g>

      {/* ── Quill: slashes in, then lifts & vanishes on scroll ── */}
      <motion.g
        style={{
          opacity: quillOpacity,
          scale: quillScale,
          transformOrigin: '50px 52px',
        }}
      >
        {/* Inner group handles the entry "slash" animation */}
        <motion.g
          initial={{ scale: 0, x: -20, opacity: 0 }}
          animate={{ scale: 1, x: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            bounce: 0.5,
            duration: 0.6,
            delay: QUILL_DELAY,
            opacity: { duration: 0.15, delay: QUILL_DELAY },
          }}
          style={{ transformOrigin: '50px 52px' }}
        >
          <path d={QUILL_BODY} fill="#4AA8FF" />
          <path
            d={QUILL_SHAFT}
            fill="none"
            stroke="#2B8AD9"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </motion.g>
      </motion.g>
    </svg>
  );
}

// ─── Exported Component ─────────────────────────────────────────

export function HeroLogoConstruction() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const { scrollY } = useScroll();

  // Quill: lifts (scale 1 → 1.2) then vanishes
  const quillScale = useTransform(scrollY, [20, 60], [1, 1.2]);
  const quillOpacity = useTransform(scrollY, [30, 80], [1, 0]);

  // Ring + A: fade and shrink once quill starts leaving
  const ringOpacity = useTransform(scrollY, [50, 150], [1, 0]);
  const ringScale = useTransform(scrollY, [50, 150], [1, 0.92]);

  useEffect(() => {
    setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
    setMounted(true);
  }, []);

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
    <div className="mx-auto mb-6 sm:mb-8 w-[72px] h-[72px]">
      <ConstructedLogo
        quillOpacity={quillOpacity}
        quillScale={quillScale}
        ringOpacity={ringOpacity}
        ringScale={ringScale}
      />
    </div>
  );
}
