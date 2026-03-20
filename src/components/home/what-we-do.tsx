'use client';

import { MobileCardStack } from '@/components/ui/mobile-card-stack';

const PILLARS = [
  {
    number: '01',
    title: 'Research & Share',
    description:
      'Daily facts, historical insights, and cultural analysis shared across our platforms.',
  },
  {
    number: '02',
    title: 'Document & Explain',
    description:
      'Deeply researched essays and documentaries exploring history, culture, and ideas.',
  },
  {
    number: '03',
    title: 'Preserve & Archive',
    description:
      'Building a searchable vault of knowledge — facts, stories, and cultural artifacts.',
  },
];

// Dark card shadow for navy background context
const DARK_SHADOW = `
  0 -8px 25px -5px rgba(0, 0, 0, 0.3),
  0 -4px 10px -5px rgba(0, 0, 0, 0.2),
  6px 6px 0px rgba(0, 0, 0, 0.4)
`;

function PillarCard({
  pillar,
}: {
  pillar: (typeof PILLARS)[number];
}) {
  return (
    <div className="bg-[#00008B] border border-white/10 p-6 rounded-md">
      <div className="font-sans text-[13px] text-[#4A90E2] tracking-wider mb-3">
        {pillar.number}
      </div>
      <h3 className="font-sans text-xl font-bold text-white mb-3">
        {pillar.title}
      </h3>
      <p className="font-sans text-sm text-white/50 leading-relaxed">
        {pillar.description}
      </p>
    </div>
  );
}

export function WhatWeDo() {
  return (
    <section className="py-10 sm:py-24 px-4 sm:px-6 bg-[#00008B]">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-sans text-xs md:text-sm tracking-[0.3em] text-white/30 uppercase mb-6 sm:mb-16">
          What We Do
        </h2>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 sm:gap-12">
          {PILLARS.map((pillar) => (
            <div key={pillar.number}>
              <div className="font-sans text-[13px] md:text-[15px] text-[#4A90E2] tracking-wider mb-3">
                {pillar.number}
              </div>
              <h3 className="font-sans text-xl font-bold text-white mb-3">
                {pillar.title}
              </h3>
              <p className="font-sans text-sm text-white/50 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: sticky card stack */}
        <div className="md:hidden">
          <MobileCardStack shadowStyle={DARK_SHADOW} label="Three Pillars">
            {PILLARS.map((pillar) => (
              <PillarCard key={pillar.number} pillar={pillar} />
            ))}
          </MobileCardStack>
        </div>
      </div>
    </section>
  );
}
