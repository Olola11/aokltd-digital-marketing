'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion';


/**
 * PrinciplesCards — "The Card Deck" for About Page
 *
 * THE MOBILE SIGNATURE — "Tactile Depth" Effect
 *
 * Desktop: Standard grid layout with brutalist hover shadows
 * Mobile: Sticky stacking cards with haptic landing animation
 */

const PRINCIPLES = [
  {
    number: '01',
    title: 'Depth Over Virality',
    description:
      'We would rather publish one rigorously researched piece than a hundred shallow takes. Quality is not negotiable.',
  },
  {
    number: '02',
    title: 'Curiosity as Virtue',
    description:
      'We believe curiosity is its own reward. The desire to understand — for its own sake — is one of the most human things we can cultivate.',
  },
  {
    number: '03',
    title: 'Built for Permanence',
    description:
      'We design for the long term. No engagement hacks, no dark patterns, no compromises that trade trust for metrics.',
  },
];

const PEEK_HEIGHT = 16; // Thin sliver of previous card visible when stacked
const STICKY_TOP = 68; // Just below 64px nav

/**
 * Individual stacking card with haptic landing effect
 */
function StackingCard({
  number,
  title,
  description,
  index,
  totalCards,
  containerRef,
}: {
  number: string;
  title: string;
  description: string;
  index: number;
  totalCards: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track this card's scroll progress
  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    offset: ['start end', 'start start'],
  });

  // Scale spring for "landing thud" haptic effect
  const rawScale = useMotionValue(1);
  const scale = useSpring(rawScale, {
    stiffness: 500,
    damping: 25,
    mass: 0.3,
  });

  // Trigger haptic scale when card reaches sticky position
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.9 && latest < 0.98) {
      rawScale.set(0.98);
    } else if (latest >= 0.98) {
      rawScale.set(1);
    }
  });

  const zIndex = (index + 1) * 10;
  const stickyTop = STICKY_TOP + index * PEEK_HEIGHT;

  return (
    <motion.div
      ref={cardRef}
      className="sticky will-change-transform"
      style={{
        top: stickyTop,
        zIndex,
        scale,
      }}
    >
      <article
        className="relative bg-white border border-royal-800 p-6 sm:p-8 mx-4 rounded-md"
        style={{
          boxShadow: `
            0 -8px 25px -5px rgba(0, 0, 139, 0.15),
            0 -4px 10px -5px rgba(0, 0, 139, 0.1),
            6px 6px 0px #00008B
          `,
        }}
      >
        {/* Number watermark */}
        <span className="font-sans text-5xl text-royal-800/8 block mb-3">
          {number}
        </span>

        {/* Title */}
        <h3 className="font-sans text-lg text-royal-800 mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-royal-800/70 leading-relaxed text-sm">
          {description}
        </p>

        {/* Stack indicator */}
        <div className="absolute top-4 right-4 flex gap-1">
          {Array.from({ length: totalCards }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === index ? 'bg-quill-500' : 'bg-royal-800/20'
              }`}
            />
          ))}
        </div>
      </article>
    </motion.div>
  );
}

/**
 * Mobile: Sticky stacking cards
 */
function MobileStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalCards = PRINCIPLES.length;

  return (
    <div className="py-10 px-0">
      {/* Header */}
      <div className="text-center mb-6 px-4">
        <span className="text-xs font-sans font-medium text-quill-500 uppercase tracking-[0.25em]">
          Our Principles
        </span>
        <h2 className="font-sans text-2xl sm:text-3xl text-royal-800 tracking-tight mt-4">
          What We Stand For
        </h2>
      </div>

      {/* Stacking container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ minHeight: totalCards * 220 + 40 }}
      >
        <div className="space-y-4">
          {PRINCIPLES.map((principle, index) => (
            <StackingCard
              key={principle.number}
              {...principle}
              index={index}
              totalCards={totalCards}
              containerRef={containerRef}
            />
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>

      {/* Stack complete indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-4 px-4 text-center"
      >
        <div className="inline-flex items-center gap-2 text-xs font-sans text-royal-800/50 uppercase tracking-wider">
          <div className="w-6 h-px bg-royal-800/20" />
          <span>Three Principles</span>
          <div className="w-6 h-px bg-royal-800/20" />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Desktop: Grid layout with hover effects
 */
function DesktopGrid() {
  return (
    <div className="py-12 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <span className="text-xs font-sans font-medium text-quill-500 uppercase tracking-[0.25em]">
            Our Principles
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl text-royal-800 tracking-tight mt-4">
            What We Stand For
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRINCIPLES.map((p) => (
            <article
              key={p.number}
              className="group bg-white border border-royal-800 p-8 rounded-md
                transition-all duration-300 ease-out
                hover:-translate-y-2 hover:shadow-brutalist"
            >
              <span className="font-sans text-6xl text-royal-800/10 block mb-4">
                {p.number}
              </span>
              <h3 className="font-sans text-xl text-royal-800 mb-4">
                {p.title}
              </h3>
              <p className="text-royal-800/70 leading-relaxed text-sm">
                {p.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Exported component — switches between mobile stack and desktop grid
 */
export function PrinciplesCards() {
  return (
    <section className="relative bg-white">
      {/* Desktop: grid */}
      <div className="hidden md:block">
        <DesktopGrid />
      </div>

      {/* Mobile: sticky stack */}
      <div className="md:hidden">
        <MobileStack />
      </div>
    </section>
  );
}
