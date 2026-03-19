'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion';
import { useTouchDevice } from '@/hooks/useTouchDevice';

/**
 * PrinciplesStack — "The Card Deck" Sticky Stacking for Mobile
 *
 * THE MOBILE SIGNATURE — "Tactile Depth" Effect
 *
 * Concept: Instead of scrolling *past* the Principles cards, they physically
 * stack on top of each other like a deck of cards.
 *
 * Interaction:
 * - Card 1 hits the top of the screen and sticks
 * - Card 2 slides up and covers Card 1
 * - Card 3 slides up and covers Card 2
 * - Each card landing triggers a haptic visual: scale 0.98 → 1.0
 *
 * Visual: Top shadow on each card creates deep separation.
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

// Card height for calculating stack positions
const CARD_HEIGHT = 280; // Approximate card height in pixels
const STACK_OFFSET = 64; // How much of each card remains visible when stacked (header area)
const STICKY_TOP = 80; // Distance from top of viewport when stuck (accounts for nav)

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

  // Track this card's scroll progress relative to container
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
    // When card is about to stick (90-100% progress), trigger haptic
    if (latest > 0.9 && latest < 0.98) {
      rawScale.set(0.98);
    } else if (latest >= 0.98) {
      rawScale.set(1);
    }
  });

  // Calculate z-index: later cards stack on top
  const zIndex = index + 1;

  // Calculate the sticky top position for this card
  // Each subsequent card sticks slightly lower to show the stack
  const stickyTop = STICKY_TOP + index * STACK_OFFSET;

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
      <div
        className="relative bg-white border border-royal-800 p-6 sm:p-8 mx-4 rounded-md"
        style={{
          // Top shadow to create deep separation (ink ripple shadow)
          boxShadow: `
            0 -8px 25px -5px rgba(0, 0, 139, 0.15),
            0 -4px 10px -5px rgba(0, 0, 139, 0.1),
            6px 6px 0px #00008B
          `,
        }}
      >
        {/* Card number - large watermark */}
        <span className="font-sans text-5xl sm:text-6xl text-royal-800/8 block mb-3">
          {number}
        </span>

        {/* Title */}
        <h3 className="font-sans text-lg sm:text-xl text-royal-800 mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="font-serif text-royal-800/70 text-sm leading-relaxed">
          {description}
        </p>

        {/* Accent line */}
        <div className="mt-5 h-0.5 w-12 bg-quill-500" />

        {/* Stack indicator dots (shows position in deck) */}
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
      </div>
    </motion.div>
  );
}

/**
 * Desktop slider fallback (horizontal scroll-jack)
 */
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
            <div
              key={p.number}
              className="group relative bg-white border border-royal-800 p-8 rounded-md
                flex-shrink-0 w-[340px] sm:w-[400px]
                transition-all duration-300 ease-out
                hover:-translate-y-2 hover:shadow-brutalist"
            >
              <span className="font-sans text-6xl text-royal-800/10 block mb-4">
                {p.number}
              </span>
              <h3 className="font-sans text-xl text-royal-800 mb-4">
                {p.title}
              </h3>
              <p className="font-serif text-royal-800/70 text-sm leading-relaxed">
                {p.description}
              </p>
              <div className="mt-6 h-0.5 w-0 group-hover:w-16 bg-quill-500 transition-all duration-300" />
            </div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="px-4 sm:px-6 lg:pl-8 max-w-7xl mx-auto w-full mt-12">
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

/**
 * Section header component
 */
function SectionHeader() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-8 md:mb-12">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 md:w-16 h-px bg-royal-800" />
        <span className="text-xs font-sans font-medium text-quill-500 uppercase tracking-[0.25em]">
          Our Standards
        </span>
      </div>
      <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl text-royal-800 tracking-tight">
        What We Stand For
      </h2>
    </div>
  );
}

/**
 * Mobile stack with sticky cards
 */
function MobileStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalCards = PRINCIPLES.length;

  // Calculate total scroll height needed for all cards to stack
  // We need enough scroll distance for each card to reach its sticky position
  const scrollHeight = totalCards * CARD_HEIGHT + 200; // Extra padding

  return (
    <div className="py-16 px-0">
      <SectionHeader />

      {/* Scrollable stack container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ minHeight: scrollHeight }}
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

        {/* Spacer to allow full scrolling */}
        <div style={{ height: CARD_HEIGHT * 0.5 }} />
      </div>

      {/* Stack complete indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 px-4 text-center"
      >
        <div className="inline-flex items-center gap-2 text-xs font-sans text-royal-800/50 uppercase tracking-wider">
          <div className="w-8 h-px bg-royal-800/20" />
          <span>Four Principles</span>
          <div className="w-8 h-px bg-royal-800/20" />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Exported component — switches between mobile stack and desktop slider
 */
export function PrinciplesStack() {
  const isTouch = useTouchDevice();

  return (
    <section className="relative bg-paper-cool border-t border-royal-800/10">
      {/* Desktop: horizontal scroll-jack */}
      <div className="hidden md:block">
        <DesktopSlider />
      </div>

      {/* Mobile: sticky card stack */}
      <div className="md:hidden">
        <MobileStack />
      </div>
    </section>
  );
}
