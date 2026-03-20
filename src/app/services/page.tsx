import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';
import { ServiceGrid } from '@/components/services/service-grid';
import { ProcessTimeline } from '@/components/services/process-timeline';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Digital marketing services from Apotheosis of Knowledge — AI strategy, viral content, writing, Meta ads, analytics, and content planning.',
};

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* § 1 — Header */}
      <section className="px-6 md:px-12 lg:px-24 pt-12 md:pt-32 pb-10 md:pb-20">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <FadeIn>
            <span className="font-sans text-xs sm:text-sm font-medium text-[#4A90E2] uppercase tracking-[0.25em]">
              Services
            </span>
          </FadeIn>

          <TextReveal className="mt-4 mb-6">
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#00008B] tracking-tight">
              What we do for clients.
            </h1>
          </TextReveal>

          <FadeIn delay={0.15}>
            <p className="font-serif text-lg md:text-xl text-[#00008B]/60 max-w-[680px] leading-relaxed mx-auto md:mx-0">
              We combine research-driven content strategy with modern digital
              marketing to build audiences that actually care.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div
              className="mt-8 bg-[#4A90E2] mx-auto md:mx-0"
              style={{ width: 60, height: 2 }}
              aria-hidden="true"
            />
          </FadeIn>
        </div>
      </section>

      {/* § 2 — Philosophy Bar */}
      <section className="bg-[#00008B] py-12 md:py-16 px-6">
        <FadeIn>
          <blockquote className="font-serif italic text-xl md:text-2xl text-white text-center max-w-[600px] mx-auto leading-relaxed">
            &ldquo;Most marketing optimises for attention. We optimise for
            trust.&rdquo;
          </blockquote>
        </FadeIn>
      </section>

      {/* § 3 — Service Grid */}
      <section className="px-6 md:px-12 lg:px-24 pt-10 md:pt-24 pb-6 md:pb-32">
        <ServiceGrid />
      </section>

      {/* § 4 — Process Timeline */}
      <section className="px-6 md:px-12 lg:px-24 pb-8 md:pb-32">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <span className="font-sans text-xs sm:text-sm font-medium text-[#4A90E2] uppercase tracking-[0.25em]">
              How We Work
            </span>
            <h2 className="font-sans text-2xl md:text-3xl font-semibold text-[#00008B] mt-4 mb-6 md:mb-12">
              From brief to delivery.
            </h2>
          </FadeIn>

          <ProcessTimeline />
        </div>
      </section>

      {/* Separator */}
      <div className="mx-6 md:mx-12 lg:mx-24 border-t border-[#00008B]/10" />

      {/* § 5 — CTA */}
      <section className="bg-gray-50 py-10 md:py-24 px-6">
        <FadeIn>
          <div className="max-w-[540px] mx-auto text-center">
            <h2 className="font-sans text-2xl md:text-3xl font-semibold text-[#00008B] mb-4">
              Ready to work with us?
            </h2>
            <p className="font-serif text-base text-[#00008B]/60 leading-relaxed mb-8">
              Tell us what you need. We will tell you honestly whether we can
              help.
            </p>
            <Link
              href="/contact"
              className="inline-block font-sans text-sm font-medium uppercase tracking-[0.1em] py-3.5 px-8 bg-[#00008B] text-white rounded-md hover:bg-[#00008B]/90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* § 6 — Closing */}
      <section className="py-10 md:py-16 px-6 border-t border-gray-100">
        <FadeIn>
          <p className="font-serif italic text-lg text-gray-400 text-center max-w-xl mx-auto">
            Strategy without substance is noise. We build both.
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
