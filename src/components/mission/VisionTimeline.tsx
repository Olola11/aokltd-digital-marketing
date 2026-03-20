'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * VisionTimeline — Animated vertical timeline with Today / Tomorrow / Future.
 *
 * THE MODERN CLASSIC — "Ink & Paper" Design
 *
 * A progress line fills downward as the user scrolls. Each node fades in
 * and scales up when it enters the viewport. Brutalist card styling with
 * Royal Blue borders and hard shadows.
 */

const NODES = [
  {
    era: 'Today',
    badge: 'Active',
    badgeClass: 'bg-quill-50 text-quill-600 border-quill-200',
    dotClass: 'bg-quill-500',
    title: 'Social Media Presence',
    items: [
      'Daily facts and historical insights across Facebook, TikTok, Instagram, X, and WhatsApp',
      'Carefully researched content that prioritises accuracy over virality',
      'A growing community of curious minds who value depth over distraction',
    ],
  },
  {
    era: 'Tomorrow',
    badge: 'In Progress',
    badgeClass: 'bg-royal-50 text-royal-700 border-royal-200',
    dotClass: 'bg-royal-600',
    title: 'Documentaries & Publications',
    items: [
      'Long-form YouTube documentaries exploring history, culture, and ideas',
      'Published books — trivia compilations, popular histories, bathroom readers',
      'The official knowledge vault: a searchable archive of researched content',
    ],
  },
  {
    era: 'The Future',
    badge: 'On the Horizon',
    badgeClass: 'bg-paper-muted text-royal-800 border-royal-200',
    dotClass: 'bg-royal-800',
    title: 'Institution & Impact',
    items: [
      'A Nigeria-focused quiz app celebrating national memory and knowledge',
      'Educational partnerships and institutional collaborations',
      'An enduring knowledge institution built for generations, not news cycles',
    ],
  },
];

function TimelineNode({
  node,
}: {
  node: (typeof NODES)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.45'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className="relative pl-12 sm:pl-16 pb-10 sm:pb-20 last:pb-0"
    >
      {/* Dot on the line */}
      <div
        className={`absolute left-0 top-1 w-4 h-4 rounded-full border-4 border-white ${node.dotClass} z-10`}
      />

      {/* Era and badge */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-sans text-2xl text-royal-800">
          {node.era}
        </span>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium uppercase tracking-wider border ${node.badgeClass}`}
        >
          {node.badge}
        </span>
      </div>

      {/* Card */}
      <div className="bg-white border border-royal-800 p-6 sm:p-8 rounded-md transition-all duration-300 hover:-translate-y-1 hover:shadow-brutalist-sm">
        <h4 className="font-sans text-lg text-royal-800 mb-4">
          {node.title}
        </h4>
        <ul className="space-y-3">
          {node.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-royal-800/70 text-sm leading-relaxed"
            >
              <span className="text-quill-500 mt-0.5 flex-shrink-0">&mdash;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function VisionTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.6', 'end 0.8'],
  });

  // The line fills from 0 to 100% height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative bg-white py-12 md:py-32 px-4 sm:px-6 border-t border-royal-800/10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-20">
          <span className="text-xs font-sans font-medium text-quill-500 uppercase tracking-[0.25em]">
            Our Vision
          </span>
          <h2 className="font-sans text-3xl md:text-4xl text-royal-800 tracking-tight mt-4">
            What We&apos;re Building
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Background track */}
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-royal-800/20" />

          {/* Animated progress fill */}
          <motion.div
            className="absolute left-[7px] top-0 w-px bg-gradient-to-b from-quill-500 via-royal-600 to-royal-800 origin-top"
            style={{ height: lineHeight }}
          />

          {/* Nodes */}
          {NODES.map((node) => (
            <TimelineNode key={node.era} node={node} />
          ))}
        </div>
      </div>
    </section>
  );
}
