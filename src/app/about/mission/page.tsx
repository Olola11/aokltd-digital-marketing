import { Metadata } from 'next';
import Link from 'next/link';
import { InkCursor } from '@/components/ui/ink-cursor';
import {
  ManifestoScroll,
  VisionTimeline,
} from '@/components/mission';
import { MobilePhysicsWrapper } from './mobile-physics-wrapper';

export const metadata: Metadata = {
  title: 'Our Mission',
  description:
    'Why Apotheosis of Knowledge exists — countering shallow content with depth, curiosity, and intellectual honesty.',
  openGraph: {
    title: 'Our Mission | Apotheosis of Knowledge',
    description:
      'We believe curiosity is a virtue worth cultivating. Discover the principles behind AOK.',
  },
};

/**
 * Mission Page — "The Modern Classic" Editorial Design
 *
 * A manifesto-style journey through our purpose and principles.
 * Features the "Ink Bleed" effect where sticky headlines fill with color
 * as the user scrolls, brutalist card shadows, and high-contrast editorial typography.
 *
 * MOBILE SIGNATURE PHYSICS:
 * - Touch Ripple: Ink ripples spawn at touch points
 * - Card Stack: Principles cards physically stack like a deck
 */
export default function MissionPage() {
  return (
    <MobilePhysicsWrapper>
      {/* Custom Quill Cursor (desktop only) */}
      <InkCursor />

      {/* § 1 — Hero: Mission Statement */}
      <section className="relative min-h-0 md:min-h-[80vh] flex items-center justify-center px-4 sm:px-6 bg-white py-16 md:py-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-paper-cream via-white to-white opacity-60" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Kicker */}
          <p className="text-xs sm:text-sm font-sans font-medium text-quill-500 uppercase tracking-[0.3em] mb-4 md:mb-8">
            Our Mission
          </p>

          {/* Main headline */}
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-royal-800 tracking-tight leading-[1.1] mb-4 md:mb-8">
            Signal in
            <br />
            <span
              className="relative inline-block"
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px #00008B',
              }}
            >
              the Noise
              {/* Filled version on hover */}
              <span
                className="absolute inset-0 text-royal-800 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  WebkitTextStroke: '0px',
                }}
                aria-hidden="true"
              >
                the Noise
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-royal-800/70 max-w-2xl mx-auto leading-relaxed">
            The internet is drowning in noise. We exist to surface what matters.
          </p>

          {/* Decorative element */}
          <div className="mt-6 md:mt-12 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-royal-800/20" />
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-quill-500"
            >
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="w-12 h-px bg-royal-800/20" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-[10px] font-sans text-royal-800/40 uppercase tracking-[0.3em] mb-3">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-royal-800/30 to-transparent" />
        </div>
      </section>

      {/* § 2 — Manifesto: Ink Bleed Sticky Scroll */}
      <ManifestoScroll />

      {/* § 3 — Vision: Timeline */}
      <VisionTimeline />

      {/* § 5 — Final CTA: Dark Section */}
      <section className="relative py-12 md:py-32 px-4 sm:px-6 bg-royal-800">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-snug">
            Knowledge is not just power.
            <br />
            <span className="text-quill-400">It is purpose.</span>
          </p>

          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-royal-800 font-sans font-medium text-sm uppercase tracking-wider hover:bg-paper-cream transition-colors"
            >
              Learn About Us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/vault"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-sans font-medium text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Explore The Vault
            </Link>
          </div>
        </div>
      </section>
    </MobilePhysicsWrapper>
  );
}
