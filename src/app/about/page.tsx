import { Metadata } from 'next';
import { QuillHero, PrinciplesCards } from '@/components/about';
import { InkCursor } from '@/components/ui/ink-cursor';
import { MobilePhysicsWrapper } from './mobile-physics-wrapper';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Apotheosis of Knowledge — a Nigerian knowledge institution dedicated to elevating curiosity through research-driven, intellectually stimulating content.',
  openGraph: {
    title: 'About | Apotheosis of Knowledge',
    description:
      'Discover who we are and why we exist. A knowledge institution built for permanence.',
  },
};

/**
 * About Page — "The Modern Classic" Editorial Design
 *
 * Features the QuillHero SVG writing animation and custom InkCursor.
 * Designed with the "Ink & Paper" aesthetic — high contrast,
 * authoritative typography, and physics-based interactions.
 *
 * MOBILE SIGNATURE PHYSICS:
 * - Touch Ripple: Ink ripples spawn at touch points
 * - Card Stack: Principles cards physically stack like a deck
 */
export default function AboutPage() {
  return (
    <MobilePhysicsWrapper>
      {/* Custom Quill Cursor (desktop only) */}
      <InkCursor />

      {/* § 1 — Hero: SVG Writing Animation */}
      <QuillHero />

      {/* § 2 — The Name */}
      <section className="relative py-12 md:py-32 px-4 sm:px-6 bg-white border-t border-royal-800/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6 md:mb-12">
            <div className="w-16 h-px bg-royal-800" />
            <span className="text-xs font-sans font-medium text-quill-500 uppercase tracking-[0.25em]">
              The Name
            </span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl text-royal-800 tracking-tight mb-8">
            Why <span className="text-quill-500">Apotheosis</span>
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg md:text-xl text-royal-800 leading-relaxed mb-6">
              <em className="font-serif">Apotheosis</em> means elevation to divine status — the highest
              form something can achieve.
            </p>
            <p className="text-royal-800/70 leading-relaxed mb-6">
              We chose this name not out of arrogance, but aspiration. We believe
              knowledge deserves to be elevated, celebrated, and shared with the
              reverence it warrants.
            </p>
            <p className="text-royal-800/70 leading-relaxed">
              In a world that too often treats information as disposable, we aim
              for something more enduring. Not perfection — pursuit. The
              never-finished work of understanding the world a little more clearly
              than we did yesterday.
            </p>
          </div>
        </div>
      </section>

      {/* § 3 — Who We Are */}
      <section className="relative py-12 md:py-32 px-4 sm:px-6 bg-paper-cream">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6 md:mb-12">
            <div className="w-16 h-px bg-royal-800" />
            <span className="text-xs font-sans font-medium text-quill-500 uppercase tracking-[0.25em]">
              Who We Are
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl text-royal-800 tracking-tight mb-8">
            A Knowledge Institution
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-royal-800/70 leading-relaxed mb-6">
              We exist because we believe the internet has a content problem. Not a shortage
              of content — an overabundance of shallow, sensational, and algorithmically-optimized
              noise that treats attention as a resource to be extracted rather than a trust to be honored.
            </p>
            <p className="text-royal-800/70 leading-relaxed">
              Our response is deliberate: we create intellectually stimulating, research-driven content
              for people who are endlessly curious. We are not a blog. We are not a content farm.
              We are building something designed to last.
            </p>
          </div>
        </div>
      </section>

      {/* § 3 — The Principles (Mobile: Stack / Desktop: Grid) */}
      <PrinciplesCards />

      {/* § 4 — Registration Details */}
      <section className="relative py-12 md:py-32 px-4 sm:px-6 bg-paper-cool border-t border-royal-800/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-sans font-medium text-quill-500 uppercase tracking-[0.25em]">
            Legal Entity
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl text-royal-800 tracking-tight mt-4 mb-8">
            Corporate Registration
          </h2>

          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 py-6 px-8 border border-royal-800 bg-white rounded-md">
            <div className="text-center sm:text-left">
              <p className="font-sans text-xs text-royal-800/50 uppercase tracking-wider mb-1">
                Company Name
              </p>
              <p className="font-serif text-lg text-royal-800">
                Apotheosis of Knowledge Limited
              </p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-royal-800/20" />
            <div className="text-center sm:text-left">
              <p className="font-sans text-xs text-royal-800/50 uppercase tracking-wider mb-1">
                RC Number
              </p>
              <p className="font-serif text-lg text-royal-800">
                1956161
              </p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-royal-800/20" />
            <div className="text-center sm:text-left">
              <p className="font-sans text-xs text-royal-800/50 uppercase tracking-wider mb-1">
                Date Registered
              </p>
              <p className="font-serif text-lg text-royal-800">
                July 27, 2022
              </p>
            </div>
          </div>

          <p className="mt-8 text-sm text-royal-800/60 max-w-lg mx-auto">
            Registered with the Corporate Affairs Commission of Nigeria.
            TIN: 31050803-0001
          </p>
        </div>
      </section>

      {/* § 5 — Closing */}
      <section className="relative py-12 md:py-32 px-4 sm:px-6 bg-royal-800">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-sans text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-snug">
            Knowledge deserves to be elevated, celebrated, and shared with the reverence it warrants.
          </p>
          <div className="mt-8 md:mt-12 flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-quill-500/60" />
            <span className="text-xs font-sans text-quill-400 uppercase tracking-[0.2em]">
              Apotheosis of Knowledge
            </span>
            <div className="w-8 h-px bg-quill-500/60" />
          </div>
        </div>
      </section>
    </MobilePhysicsWrapper>
  );
}
