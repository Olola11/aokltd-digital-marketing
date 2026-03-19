import type { Metadata } from 'next';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';
import {
  AssetPillars,
  GrowthEngine,
  ProspectusContact,
  ScrollProgress,
} from '@/components/invest';

export const metadata: Metadata = {
  title: 'Invest',
  description:
    'Strategic prospectus for Apotheosis of Knowledge — media, product, and publishing asset classes built for long-term knowledge infrastructure.',
};

export default function InvestPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Section A: Hero — "The Blueprint for Scale" */}
      <section className="relative px-6 md:px-12 lg:px-24 pt-20 md:pt-32 pb-16 md:pb-24">
        {/* Section marker — desktop only */}
        <span className="hidden lg:block absolute left-3 top-24 max-w-[72px] font-sans text-[11px] uppercase tracking-[0.15em] text-royal-800/50 leading-tight">
          01 / Proposition
        </span>

        <FadeIn>
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-royal-800/40 block mb-6">
            Strategic Prospectus
          </span>
        </FadeIn>

        <TextReveal className="mb-6">
          <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold text-royal-800 tracking-tight">
            The Blueprint for Scale
          </h1>
        </TextReveal>

        <FadeIn delay={0.15}>
          <p className="font-serif text-base md:text-lg text-royal-800/60 max-w-[640px] leading-relaxed">
            Apotheosis of Knowledge is seeking strategic partners to capitalise
            the next generation of African knowledge products. This is an
            invitation to build alongside us.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div
            className="mt-8 bg-quill-500"
            style={{ width: 60, height: 2 }}
            aria-hidden="true"
          />
        </FadeIn>
      </section>

      {/* Separator */}
      <div className="mx-6 md:mx-12 lg:mx-24 border-t border-royal-800/10" />

      {/* Section B: The Pillars — "The Asset Classes" */}
      <section className="relative px-6 md:px-12 lg:px-24 pt-16 md:pt-20 pb-20 md:pb-32">
        {/* Section marker — desktop only */}
        <span className="hidden lg:block absolute left-3 top-16 md:top-20 max-w-[72px] font-sans text-[11px] uppercase tracking-[0.15em] text-royal-800/50 leading-tight">
          02 / Asset Classes
        </span>

        <AssetPillars />
      </section>

      {/* Separator */}
      <div className="mx-6 md:mx-12 lg:mx-24 border-t border-royal-800/10" />

      {/* Section C: Growth Engine — The Flywheel */}
      <section className="relative px-6 md:px-12 lg:px-24 pt-16 md:pt-20 pb-20 md:pb-32">
        {/* Section marker — desktop only */}
        <span className="hidden lg:block absolute left-3 top-16 md:top-20 max-w-[72px] font-sans text-[11px] uppercase tracking-[0.15em] text-royal-800/50 leading-tight">
          03 / Growth Engine
        </span>

        <FadeIn>
          <GrowthEngine />
        </FadeIn>
      </section>

      {/* Separator */}
      <div className="mx-6 md:mx-12 lg:mx-24 border-t border-royal-800/10" />

      {/* Section D: Contact — "Request the Full Prospectus" */}
      <section className="relative px-6 md:px-12 lg:px-24 pt-16 md:pt-20 pb-20 md:pb-32">
        {/* Section marker — desktop only */}
        <span className="hidden lg:block absolute left-3 top-16 md:top-20 max-w-[72px] font-sans text-[11px] uppercase tracking-[0.15em] text-royal-800/50 leading-tight">
          04 / Dialogue
        </span>

        <FadeIn>
          <ProspectusContact />
        </FadeIn>
      </section>
    </main>
  );
}
