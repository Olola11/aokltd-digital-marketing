'use client';

import { useEffect, useRef } from 'react';
import { APPROACH_PILLARS } from '@/data/showcase-data';
import { gsap, isReducedMotion } from '@/lib/gsap-utils';

export function ApproachSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.approach-card');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-white"
    >
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#4A8FE1] uppercase">
            Our Method
          </span>
          <h2
            id="approach-heading"
            className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-[#00008A] tracking-tight mt-2 leading-[1.15]"
          >
            How we approach creative direction.
          </h2>
          <p className="font-serif text-base sm:text-lg text-[#00008A]/70 mt-4 leading-relaxed">
            We operate as strategic partners, not task executors. Our creative philosophy combines rigorous inquiry with meticulous technical execution.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {APPROACH_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="approach-card p-6 sm:p-8 rounded-3xl bg-[#EEF0FB]/50 border border-[#00008A]/8 flex flex-col justify-between hover:bg-[#EEF0FB]/80 transition-colors duration-200"
            >
              <div>
                <span className="font-sans text-xs font-bold tracking-widest text-[#4A8FE1] uppercase block mb-6">
                  {pillar.number}
                </span>

                <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#00008A] tracking-tight mb-3">
                  {pillar.title}
                </h3>

                <p className="font-serif text-sm sm:text-base text-[#00008A]/75 leading-relaxed">
                  {pillar.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#00008A]/10">
                <span className="font-serif italic text-xs font-medium text-[#6666B8]">
                  &ldquo;{pillar.principle}&rdquo;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
