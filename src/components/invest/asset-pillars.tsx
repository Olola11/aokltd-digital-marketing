'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileCardStack } from '@/components/ui/mobile-card-stack';

const PILLARS = [
  {
    number: '01',
    title: 'MEDIA',
    summary: 'Visualising history for the YouTube generation.',
    details: [
      'Deeply researched documentary content spanning history, science, and culture',
      'Short-form educational series designed for platform-native consumption',
      'Cinematic production values with rigorous editorial standards',
    ],
    status: 'TARGET: 2028',
  },
  {
    number: '02',
    title: 'PRODUCT',
    summary: 'Gamifying African knowledge and civic memory.',
    details: [
      'Nigeria-focused trivia and quiz application for mobile platforms',
      'Categories spanning history, culture, geography, and politics',
      'Designed for deployment in schools and for general public engagement',
    ],
    status: 'IN DEVELOPMENT',
  },
  {
    number: '03',
    title: 'PUBLISHING',
    summary: 'Codifying oral history into permanent records.',
    details: [
      'Trivia compilations and bathroom readers for mainstream audiences',
      'Popular history publications drawing from Nigerian and African archives',
      'Long-term academic publication pipeline for institutional credibility',
    ],
    status: 'TARGET: 2026',
  },
] as const;

function PillarCard({
  pillar,
  isExpanded,
  onToggle,
}: {
  pillar: (typeof PILLARS)[number];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      layout
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      className="bg-white border border-royal-800 p-6 md:p-8 rounded-md cursor-pointer"
      transition={{ layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
    >
      {/* Number index */}
      <motion.span
        layout="position"
        className="font-sans text-[13px] md:text-[15px] text-quill-500 tracking-wider block mb-3"
      >
        {pillar.number}
      </motion.span>

      {/* Title */}
      <motion.h3 layout="position" className="font-sans text-lg font-semibold text-royal-800 mb-2">
        {pillar.title}
      </motion.h3>

      {/* One-line summary */}
      <motion.p layout="position" className="font-serif text-[15px] md:text-base text-royal-800/70 leading-relaxed">
        {pillar.summary}
      </motion.p>

      {/* Expandable detail section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-royal-800/10 mt-4 pt-4">
              <ul className="space-y-2">
                {pillar.details.map((detail, j) => (
                  <li
                    key={j}
                    className="font-serif text-sm md:text-[15px] text-royal-800/70 leading-relaxed pl-3 relative"
                  >
                    <span className="absolute left-0 top-0 text-royal-800/50">
                      &mdash;
                    </span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status line — always visible */}
      <motion.div layout="position" className="mt-4 pt-3 border-t border-royal-800/5">
        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-royal-800/50">
          [ {pillar.status} ]
        </span>
      </motion.div>

      {/* Expand CTA — visible on mobile always, on desktop on hover only */}
      {!isExpanded && (
        <div className="flex items-center gap-1.5 mt-4 text-quill-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-sans text-xs tracking-wider uppercase">Tap to explore</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </motion.article>
  );
}

export function AssetPillars() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Desktop: grid with hover effects */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-8">
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="group transition-all duration-300 ease-out rounded-md hover:-translate-y-2 hover:shadow-brutalist">
              <PillarCard
                pillar={pillar}
                isExpanded={expandedIndex === i}
                onToggle={() => toggle(i)}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile: sticky card stack */}
      <div className="md:hidden">
        <MobileCardStack label="Three Asset Classes">
          {PILLARS.map((pillar, i) => (
            <PillarCard
              key={pillar.number}
              pillar={pillar}
              isExpanded={expandedIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </MobileCardStack>
      </div>
    </>
  );
}
