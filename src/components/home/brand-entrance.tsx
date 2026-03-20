'use client';

import { useIsDesktop, useMounted } from '@/hooks/useMediaQuery';
import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

// ─── SVG Geometry (100×100 viewBox) ─────────────────────────────

const CIRCLE_R = 42;

// A letterform — stroke version (for draw-on animation)
const A_STROKE = 'M 26 80 L 50 18 L 74 80 M 38 57 L 62 57';

// A letterform — filled version (for final state)
const A_FILL =
  'M 50 16 L 23 82 L 33 82 L 42 56 L 58 56 L 67 82 L 77 82 Z M 46 50 L 50 32 L 54 50 Z';

// Quill feather — body + shaft
const QUILL_BODY =
  'M 36 74 C 42 62 52 46 64 30 C 58 44 46 60 36 74 Z';
const QUILL_SHAFT = 'M 37 73 L 63 31';

// ─── Animation Timing ───────────────────────────────────────────

const SMOOTH_DECEL: [number, number, number, number] = [0.22, 1, 0.36, 1];
const INK_FLOW: [number, number, number, number] = [0.4, 0, 0.2, 1];

function AnimatedLogo({ quillOpacity }: { quillOpacity: MotionValue<number> }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-[72px] h-[72px]"
      // Beat 4 — settle pulse (1.4s–1.8s)
      animate={{ scale: [1, 1, 1.02, 1] }}
      transition={{
        scale: {
          duration: 1.8,
          times: [0, 0.78, 0.89, 1],
          ease: 'easeInOut',
        },
      }}
    >
      {/* Beat 1 — Quill arrives (0–600ms) */}
      <motion.g
        initial={{ opacity: 0, y: -30, rotate: -15 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.6, ease: SMOOTH_DECEL }}
        style={{ originX: '50%', originY: '50%', opacity: quillOpacity }}
      >
        {/* Subtle positional shift during Beat 2 (authorship nudge) */}
        <motion.g
          animate={{ x: [0, 0, 2, 0] }}
          transition={{
            duration: 1.0,
            times: [0, 0.4, 0.7, 1],
            ease: 'easeInOut',
          }}
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

      {/* Beat 2 — A draws on (400ms–1000ms) */}
      {/* Stroke version — draws then fades */}
      <motion.path
        d={A_STROKE}
        fill="none"
        stroke="#00008B"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, strokeOpacity: [1, 1, 1, 0] }}
        transition={{
          pathLength: { duration: 0.6, delay: 0.4, ease: INK_FLOW },
          strokeOpacity: {
            duration: 1.3,
            delay: 0.4,
            times: [0, 0.46, 0.69, 1],
          },
        }}
      />
      {/* Fill version — crossfade in */}
      <motion.path
        d={A_FILL}
        fill="#00008B"
        fillRule="evenodd"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.0, ease: INK_FLOW }}
      />

      {/* Beat 3 — Circle inscribes (800ms–1400ms) */}
      <motion.circle
        cx="50"
        cy="50"
        r={CIRCLE_R}
        fill="none"
        stroke="#00008B"
        strokeWidth="4.5"
        transform="rotate(-90 50 50)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: INK_FLOW }}
      />
    </motion.svg>
  );
}

export function BrandEntrance() {
  const mounted = useMounted();
  const isDesktop = useIsDesktop();

  const { scrollY } = useScroll();
  // Fade logo quill out as user scrolls past hero (for floating quill handoff)
  const quillOpacity = useTransform(scrollY, [50, 100], [1, 0]);

  if (!mounted) {
    // Placeholder during SSR — avoids layout shift
    return <div className="w-[72px] h-[72px] mx-auto mb-6 sm:mb-8" />;
  }

  if (!isDesktop) {
    // Mobile: static PNG, no animation
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

  // Desktop: animated SVG logo
  return (
    <div className="mx-auto mb-6 sm:mb-8 w-[72px] h-[72px]">
      <AnimatedLogo quillOpacity={quillOpacity} />
    </div>
  );
}
