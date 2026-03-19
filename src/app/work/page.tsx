import type { Metadata } from 'next';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';
import { SocialMonitor } from '@/components/work/social-monitor';
import { ProjectTimeline } from '@/components/work/project-timeline';

export const metadata: Metadata = {
  title: 'Work',
  description: 'An operations log of what Apotheosis of Knowledge is building — active platforms, ongoing projects, and long-term infrastructure.',
};

export default function WorkPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* ═══ Section A: The Opening ═══ */}
      <section className="relative px-6 md:px-12 lg:px-24 pt-20 md:pt-32 pb-16 md:pb-24">
        {/* Timestamp */}
        <div className="absolute top-6 right-6 md:right-12 lg:right-24">
          <span className="font-sans text-xs md:text-sm tracking-[0.2em] text-[#00008B]/30 uppercase">
            Last Updated: Feb 2026
          </span>
        </div>

        <TextReveal className="mb-8">
          <h1 className="font-sans text-5xl md:text-7xl text-[#00008B] leading-[1.1]">
            What we are building.
          </h1>
        </TextReveal>

        <FadeIn delay={0.15}>
          <p className="font-serif text-base md:text-lg text-[#00008B]/60 max-w-prose leading-relaxed">
            This page is our operations log — a transparent record of active platforms,
            ongoing projects, and the infrastructure we are constructing for long-form
            knowledge work.
          </p>
        </FadeIn>
      </section>

      {/* ═══ Section B: The Operations Board ═══ */}
      <section className="px-6 md:px-12 lg:px-24 pb-20 md:pb-32">
        <FadeIn delay={0.1}>
          <SocialMonitor />
        </FadeIn>
      </section>

      {/* ═══ Section C: Future Projects ═══ */}
      <section className="px-6 md:px-12 lg:px-24 pb-20 md:pb-32">
        <ProjectTimeline />
      </section>

      {/* ═══ Section D: The Quiet Close ═══ */}
      <section className="px-6 md:px-12 lg:px-24 pb-20 md:pb-32">
        <FadeIn>
          <p className="text-center text-sm font-serif italic text-[#00008B]/40 max-w-xl mx-auto">
            This is a long-term institutional project. We build slowly and deliberately.
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
