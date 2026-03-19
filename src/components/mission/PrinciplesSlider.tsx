'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * PrinciplesSlider — "What We Stand For" section
 *
 * THE MODERN CLASSIC — "Ink & Paper" Design
 *
 * Desktop (md+): Sticky horizontal scroll-jack with brutalist cards.
 * Mobile (<md):  Vertical stack with per-card fade-in entrances.
 *
 * Cards feature: white bg, 1px Royal Blue border, brutalist hard shadow on hover.
 */

const PRINCIPLES = [
  {
    number: '01',
    title: 'Accuracy First',
    description:
      'We verify before we share. When we are uncertain, we say so. Every claim is traceable, every source cited. In an era of misinformation, rigour is an act of respect.',
  },
  {
    number: '02',
    title: 'Respect for Complexity',
    description:
      'We resist the urge to oversimplify. The world is complicated; our content reflects that. We would rather leave you with a good question than a false certainty.',
  },
  {
    number: '03',
    title: 'No Clickbait',
    description:
      'We refuse to manipulate attention. If something is interesting, we trust it to speak for itself. No sensational headlines, no manufactured outrage, no bait-and-switch.',
  },
  {
    number: '04',
    title: 'Intellectual Honesty',
    description:
      'We distinguish between facts and interpretations, between what we know and what we believe. Changing our position in the face of evidence is not weakness — it is integrity.',
  },
];

/* ═══════════════════════════════════════════════
 * Brutalist Card Component
 * ═══════════════════════════════════════════════ */
function PrincipleCard({
  number,
  title,
  description,
  className = '',
}: {
  number: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={`group relative bg-white border border-royal-800 p-8 rounded-md
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-brutalist
        ${className}`}
    >
      {/* Number */}
      <span className="font-sans text-6xl text-royal-800/10 block mb-4">
        {number}
      </span>

      {/* Title */}
      <h3 className="font-sans text-xl text-royal-800 mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-royal-800/70 text-sm leading-relaxed">{description}</p>

      {/* Hover accent line */}
      <div className="mt-6 h-0.5 w-0 group-hover:w-16 bg-quill-500 transition-all duration-300" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
 * Section header
 * ═══════════════════════════════════════════════ */
function SectionHeader() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-12">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-px bg-royal-800" />
        <span className="text-xs font-sans font-medium text-quill-500 uppercase tracking-[0.25em]">
          Our Standards
        </span>
      </div>
      <h2 className="font-sans text-3xl md:text-4xl text-royal-800 tracking-tight">
        What We Stand For
      </h2>
    </div>
  );
}

/* ═══════════════════════════════════════════════
 * Desktop: Horizontal scroll-jack (md+)
 * ═══════════════════════════════════════════════ */
function DesktopSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const xPercent = useTransform(scrollYProgress, [0, 1], [0, -75]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <SectionHeader />

        {/* Horizontal track */}
        <motion.div
          className="flex gap-8 pl-4 sm:pl-6 lg:pl-8 will-change-transform"
          style={{ x: useTransform(xPercent, (v) => `${v}%`) }}
        >
          {PRINCIPLES.map((p) => (
            <PrincipleCard
              key={p.number}
              {...p}
              className="flex-shrink-0 w-[340px] sm:w-[400px]"
            />
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mt-12">
          <div className="h-0.5 bg-royal-800/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-royal-800 to-quill-500 origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
 * Mobile: Vertical stack with whileInView (<md)
 * ═══════════════════════════════════════════════ */
function MobileStack() {
  return (
    <div className="py-20 px-4 sm:px-6">
      <SectionHeader />

      <div className="max-w-lg mx-auto space-y-6">
        {PRINCIPLES.map((p, i) => (
          <motion.div
            key={p.number}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
              delay: i * 0.08,
            }}
          >
            <PrincipleCard {...p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
 * Exported component
 * ═══════════════════════════════════════════════ */
export function PrinciplesSlider() {
  return (
    <section className="relative bg-paper-cool border-t border-royal-800/10">
      {/* Desktop: horizontal scroll-jack */}
      <div className="hidden md:block">
        <DesktopSlider />
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden">
        <MobileStack />
      </div>
    </section>
  );
}
