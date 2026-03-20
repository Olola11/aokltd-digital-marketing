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

/**
 * ManifestoScroll — "Ink Bleed" Sticky Scrollytelling
 *
 * THE MODERN CLASSIC — "Ink & Paper" Design
 *
 * Desktop (lg+): Two-column layout. Left column is a sticky headline with
 * ink-fill scroll effect. Right column has brutalist cards that scroll past.
 *
 * Mobile (below lg): Single-column layout. Headline is sticky at the top
 * with the ink-fill scroll effect visible on mobile. Cards below use
 * sticky stacking (overlapping deck effect) matching the About page pattern.
 */

const PARAGRAPHS = [
  {
    title: 'Against the Algorithm',
    body: 'Every day, billions of people scroll through feeds optimised for engagement, not enlightenment. Algorithms reward outrage over insight, simplicity over depth, reaction over reflection. The currency of attention has been debased. We believe the antidote is not less technology, but better intent — content created to inform, not to addict.',
  },
  {
    title: 'Depth Over Virality',
    body: 'We believe that the strange, the historical, and the true deserve as much attention as the trending. That there is an audience — perhaps a large one — hungry for content that treats their intelligence with respect. We would rather publish one rigorously researched piece than a hundred shallow takes.',
  },
  {
    title: 'Built to Last',
    body: 'We are not a blog. We are not a content farm. We are a knowledge institution — registered in Nigeria, deliberate in purpose, and built for permanence. Every piece of content we produce is an argument that depth still matters, that curiosity is its own reward, and that the pursuit of knowledge is one of the most human things we can do.',
  },
];

// Mobile stacking constants (matches About page PrinciplesCards pattern)
const MOBILE_STACK_OFFSET = 16;
const MOBILE_HEADLINE_TOP = 80; // Clears nav bar
const MOBILE_CARD_START = 300; // Below sticky headline

function InkFillHeadline({
  progress,
}: {
  progress: ReturnType<typeof useTransform<number, number>>;
}) {
  // Transform scroll progress to clip-path percentage
  const clipPath = useTransform(
    progress,
    [0, 1],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  );

  return (
    <div className="relative">
      {/* Outline text (always visible) */}
      <h2
        className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
        style={{
          color: 'transparent',
          WebkitTextStroke: '1.5px #00008B',
        }}
      >
        We refuse to let
        <br />
        algorithms dictate
        <br />
        what deserves
        <br />
        <span className="text-quill-500" style={{ WebkitTextStroke: '1.5px #4A90E2' }}>
          attention
        </span>
      </h2>

      {/* Filled text (clips in as scroll progresses) */}
      <motion.h2
        className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight absolute inset-0"
        style={{
          color: '#00008B',
          clipPath,
          WebkitClipPath: clipPath,
        }}
      >
        We refuse to let
        <br />
        algorithms dictate
        <br />
        what deserves
        <br />
        <span className="text-quill-500">attention</span>
      </motion.h2>

      {/* Progress indicator line */}
      <motion.div
        className="mt-8 h-0.5 bg-quill-500 origin-left"
        style={{
          scaleX: progress,
        }}
      />
    </div>
  );
}

/**
 * Desktop paragraph card with scroll-driven fade-in
 */
function ParagraphCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.3'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.article
      ref={ref}
      style={{ opacity, y }}
      className="group bg-white border border-royal-800 p-8 md:p-10 rounded-md transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-brutalist"
    >
      {/* Card number */}
      <span className="font-sans text-6xl md:text-7xl text-royal-800/10 block mb-4">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Card title */}
      <h3 className="font-sans text-xl md:text-2xl text-royal-800 mb-4">
        {title}
      </h3>

      {/* Card body */}
      <p className="font-serif text-royal-800/70 leading-relaxed">{body}</p>

      {/* Accent line (appears on hover) */}
      <div className="mt-6 h-0.5 w-0 group-hover:w-16 bg-quill-500 transition-all duration-300" />
    </motion.article>
  );
}

/**
 * Mobile stacking card with haptic landing effect
 * (mirrors About page StackingCard pattern)
 */
function MobileStackingCard({
  index,
  title,
  body,
  totalCards,
  containerRef,
}: {
  index: number;
  title: string;
  body: string;
  totalCards: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    offset: ['start end', 'start start'],
  });

  // Scale spring for haptic landing effect
  const rawScale = useMotionValue(1);
  const scale = useSpring(rawScale, {
    stiffness: 500,
    damping: 25,
    mass: 0.3,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.9 && latest < 0.98) {
      rawScale.set(0.98);
    } else if (latest >= 0.98) {
      rawScale.set(1);
    }
  });

  const zIndex = index + 1;
  const stickyTop = MOBILE_CARD_START + index * MOBILE_STACK_OFFSET;

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
        className="relative bg-white border border-royal-800 p-6 sm:p-8 mx-0 rounded-md"
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
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title */}
        <h3 className="font-sans text-lg text-royal-800 mb-3">
          {title}
        </h3>

        {/* Body */}
        <p className="font-serif text-royal-800/70 leading-relaxed text-sm">
          {body}
        </p>

        {/* Stack indicator dots */}
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

export function ManifestoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileCardContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map overall scroll to ink fill progress
  const inkFillProgress = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  const totalCards = PARAGRAPHS.length;

  return (
    <section
      ref={containerRef}
      className="relative bg-white min-h-0 lg:min-h-[300vh] border-t border-royal-800/10"
    >
      {/* Section label */}
      <div className="absolute top-0 left-0 right-0 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-16 h-px bg-royal-800" />
          <span className="text-xs font-sans font-medium text-quill-500 uppercase tracking-[0.25em]">
            The Manifesto
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Desktop layout (lg+): Two-column sticky scroll
          ══════════════════════════════════════════════ */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 lg:gap-20">
          {/* Left: Sticky headline */}
          <div className="sticky top-0 h-screen flex items-center">
            <div className="max-w-lg">
              <InkFillHeadline progress={inkFillProgress} />

              {/* Decorative quill mark */}
              <div className="mt-12 flex items-center gap-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-quill-500"
                >
                  <path
                    d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 8L2 22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-xs font-sans text-royal-800/50 uppercase tracking-wider">
                  Scroll to reveal
                </span>
              </div>
            </div>
          </div>

          {/* Right: Scrolling cards */}
          <div className="py-[50vh] space-y-8 lg:space-y-16">
            {PARAGRAPHS.map((para, i) => (
              <ParagraphCard
                key={i}
                index={i}
                title={para.title}
                body={para.body}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Mobile layout (below lg): Sticky headline + stacking cards
          ══════════════════════════════════════════════ */}
      <div className="lg:hidden px-4 sm:px-6">
        {/* Sticky ink-fill headline */}
        <div
          className="sticky z-20 bg-white pb-4 pt-12 md:pt-24"
          style={{ top: MOBILE_HEADLINE_TOP }}
        >
          <InkFillHeadline progress={inkFillProgress} />
        </div>

        {/* Stacking cards container */}
        <div
          ref={mobileCardContainerRef}
          className="relative mt-8"
          style={{ minHeight: totalCards * 220 + 40 }}
        >
          <div className="space-y-4">
            {PARAGRAPHS.map((para, i) => (
              <MobileStackingCard
                key={i}
                index={i}
                title={para.title}
                body={para.body}
                totalCards={totalCards}
                containerRef={mobileCardContainerRef}
              />
            ))}
          </div>

          {/* Spacer for scroll room */}
          <div style={{ height: 20 }} />
        </div>

        {/* Stack complete indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-center pb-6 md:pb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-sans text-royal-800/50 uppercase tracking-wider">
            <div className="w-6 h-px bg-royal-800/20" />
            <span>Three Tenets</span>
            <div className="w-6 h-px bg-royal-800/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
