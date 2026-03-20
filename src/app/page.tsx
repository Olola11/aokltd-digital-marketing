import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Apotheosis of Knowledge — Elevating curiosity. Countering noise.',
  description: 'A Nigerian knowledge initiative producing research-driven, curiosity-fuelled content across history, culture, true crime, and bizarre facts.',
};
import { CurtainHero } from '@/components/home/curtain-hero';
import { LatestDeck } from '@/components/home/latest-deck';
import { MobileVaultStack } from '@/components/home/mobile-vault-stack';
import { InfiniteTicker } from '@/components/ui/infinite-ticker';
import { WhatWeDo } from '@/components/home/what-we-do';

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* 1. The Digital Broadsheet — Scroll-Linked Curtain Reveal */}
      <CurtainHero>
        <div className="h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            {/* Desktop: full card grid revealed by curtain */}
            <div className="hidden md:block w-full">
              <LatestDeck />
            </div>
            {/* Mobile: vault teaser (stacking cards are below CurtainHero) */}
            <div className="md:hidden w-full max-w-6xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-sans text-[10px] sm:text-xs tracking-[0.3em] text-[#00008B]/30 uppercase">
                  Latest from the Vault
                </h2>
                <Link
                  href="/vault"
                  className="font-sans text-[10px] sm:text-xs tracking-[0.2em] text-[#00008B]/50 hover:text-[#00008B] transition-colors duration-300 uppercase"
                >
                  View All &rarr;
                </Link>
              </div>
              <p className="font-serif text-sm text-[#00008B]/25 text-center mt-4" aria-hidden="true">
                Scroll to explore
              </p>
            </div>
          </div>
          <InfiniteTicker />
        </div>
      </CurtainHero>

      {/* 1b. Mobile: Vault cards with sticky stacking (outside CurtainHero for sticky to work) */}
      <MobileVaultStack />

      {/* 2. What We Do — Dark Contrast Section */}
      <WhatWeDo />

      {/* 3. Manifesto */}
      <section className="py-10 sm:py-24 px-4 sm:px-6 border-t border-[#00008B]/5">
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
