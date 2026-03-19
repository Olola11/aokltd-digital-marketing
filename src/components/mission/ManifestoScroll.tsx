'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ManifestoScroll — "Ink Bleed" Sticky Scrollytelling
 *
 * THE MODERN CLASSIC — "Ink & Paper" Design
 *
 * Left column: Sticky headline that starts as an OUTLINE (Royal Blue stroke,
 * transparent fill) and progressively "fills up" with solid color as the user
 * scrolls, acting as a visual progress indicator for the section.
 *
 * Right column: White cards with 1px Royal Blue borders and brutalist
 * hard shadows on hover (-translate-y-2, shadow-[6px_6px_0px_#00008B]).
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
        <span className="text-quill-500" style={{ WebkitTextStroke: '1.5px #4AA8FF' }}>
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

export function ManifestoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map overall scroll to ink fill progress
  const inkFillProgress = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-white min-h-[300vh] border-t border-royal-800/10"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ── Left: Sticky "Ink Fill" Headline ── */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex items-center py-32 lg:py-0">
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

          {/* ── Right: Scrolling Brutalist Cards ── */}
          <div className="py-32 lg:py-[50vh] space-y-12 lg:space-y-16">
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
    </section>
  );
}
