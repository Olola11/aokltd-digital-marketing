import { CurtainHero } from '@/components/home/curtain-hero';
import { LatestDeck } from '@/components/home/latest-deck';
import { InfiniteTicker } from '@/components/ui/infinite-ticker';
import { WhatWeDo } from '@/components/home/what-we-do';

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* 1. The Digital Broadsheet — Scroll-Linked Curtain Reveal */}
      <CurtainHero>
        <div className="h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <LatestDeck />
          </div>
          <InfiniteTicker />
        </div>
      </CurtainHero>

      {/* 2. What We Do — Dark Contrast Section */}
      <WhatWeDo />

      {/* 3. Manifesto */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#00008B]/5">
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-[#00008B]/70 leading-relaxed">
            &ldquo;We exist to counter the dominance of low-value, shallow, and
            sensational content&mdash;by producing work that rewards the curious
            mind.&rdquo;
          </blockquote>
        </div>
      </section>
    </main>
  );
}
