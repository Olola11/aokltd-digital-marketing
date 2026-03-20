'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion';
import { VAULT_DATA, CATEGORY_LABELS } from '@/lib/vault-data';

/**
 * MobileVaultStack — Sticky stacking vault article cards for mobile.
 *
 * Rendered outside CurtainHero so CSS sticky positioning works.
 * Mirrors the About page PrinciplesCards stacking pattern:
 * - Sticky cards with incrementing top/z-index
 * - Haptic landing spring effect
 * - Featured image shadows always visible
 * - Full-card Link wrappers for navigation
 *
 * Hidden on md+ (desktop uses LatestDeck grid inside CurtainHero).
 */

const PEEK_HEIGHT = 16;
const STICKY_TOP = 68;

function StackingVaultCard({
  entry,
  index,
  totalCards,
  containerRef,
}: {
  entry: (typeof VAULT_DATA)[number];
  index: number;
  totalCards: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    offset: ['start end', 'start start'],
  });

  // Haptic landing spring
  const rawScale = useMotionValue(1);
  const scale = useSpring(rawScale, {
    stiffness: 500,
    damping: 25,
    mass: 0.3,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.9 && latest < 0.98) {
      rawScale.set(0.98);
    } else if (latest >= 0.98) {
      rawScale.set(1);
    }
  });

  const zIndex = (index + 1) * 10;
  const stickyTop = STICKY_TOP + index * PEEK_HEIGHT;

  return (
    <motion.div
      ref={cardRef}
      className="sticky will-change-transform"
      style={{ top: stickyTop, zIndex, scale }}
    >
      <Link
        href={`/vault/${entry.category}/${entry.slug}`}
        className="block relative mx-4"
      >
        {/* Image shadow — always visible on mobile, reduced opacity */}
        {entry.featuredImage ? (
          <div
            className="absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-md overflow-hidden pointer-events-none opacity-60"
            aria-hidden="true"
          >
            <Image
              src={entry.featuredImage.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#00008B]/40" />
          </div>
        ) : (
          <div
            className="absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-md bg-[#00008B] pointer-events-none opacity-60"
            aria-hidden="true"
          />
        )}

        {/* Card */}
        <article className="relative bg-white border border-[#00008B] p-4 sm:p-5 rounded-md">
          {/* Category + Index */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-sans text-xs text-quill-500 tracking-wider uppercase">
              {CATEGORY_LABELS[entry.category]}
            </span>
            <span className="font-sans text-xs text-[#00008B]/20">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-sans text-base sm:text-lg font-bold text-[#00008B] leading-snug mb-2">
            {entry.title}
          </h3>

          {/* Excerpt */}
          <p className="font-serif text-sm text-[#00008B]/50 leading-relaxed line-clamp-2 mb-3">
            {entry.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 font-sans text-[10px] sm:text-xs text-[#00008B]/25 tracking-wider uppercase">
            <span>{entry.readingTime} min read</span>
            <span>&middot;</span>
            <span>
              {new Date(entry.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </span>
            {entry.sourceCount ? (
              <>
                <span>&middot;</span>
                <span>{entry.sourceCount} sources</span>
              </>
            ) : null}
          </div>

          {/* Stack indicator dots */}
          <div className="absolute bottom-4 right-4 flex gap-1">
            {Array.from({ length: totalCards }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === index ? 'bg-quill-500' : 'bg-[#00008B]/20'
                }`}
              />
            ))}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export function MobileVaultStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  const latest = [...VAULT_DATA]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3);

  const totalCards = latest.length;

  return (
    <section className="md:hidden bg-white pt-10 pb-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-4 sm:px-6">
        <h2 className="font-sans text-[10px] sm:text-xs tracking-[0.3em] text-[#00008B]/30 uppercase">
          Latest from the Vault
        </h2>
        <Link
          href="/vault"
          className="font-sans text-[10px] sm:text-xs tracking-[0.2em] text-[#00008B]/30 hover:text-[#00008B] transition-colors uppercase"
        >
          View All &rarr;
        </Link>
      </div>

      {/* Stacking container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ minHeight: totalCards * 260 + 100 }}
      >
        <div className="space-y-4">
          {latest.map((entry, index) => (
            <StackingVaultCard
              key={entry.slug}
              entry={entry}
              index={index}
              totalCards={totalCards}
              containerRef={containerRef}
            />
          ))}
        </div>

        {/* Spacer for scroll room */}
        <div style={{ height: 60 }} />
      </div>
    </section>
  );
}
