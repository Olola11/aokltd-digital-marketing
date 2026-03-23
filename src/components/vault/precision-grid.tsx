'use client';

import { useState } from 'react';
import Image from 'next/image';
import { VaultLink } from './vault-link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { VaultEntry } from '@/types';
import { DepthIndicator } from './source-badge';
import { ReadCheckmark } from './vault-progress';

interface PrecisionGridProps {
  entries: VaultEntry[];
}

// Critically damped spring for architectural precision
const SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 40,
};

function VaultCard({
  entry,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave,
}: {
  entry: VaultEntry;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const isDimmed = isAnyHovered && !isHovered;

  return (
    <VaultLink href={`/vault/${entry.category}/${entry.slug}`} className="block relative">
      {/* Image shadow — revealed on hover behind the card */}
      {entry.featuredImage ? (
        <motion.div
          className="absolute inset-0 translate-x-[8px] translate-y-[8px] rounded-md overflow-hidden"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <Image
            src={entry.featuredImage.src}
            alt=""
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#00008B]/40" />
        </motion.div>
      ) : (
        <motion.div
          className="absolute inset-0 translate-x-[8px] translate-y-[8px] rounded-md bg-[#00008B]"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          aria-hidden="true"
        />
      )}

      <motion.article
        layout
        layoutId={entry.slug}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isDimmed ? 0.3 : 1,
          scale: 1,
          y: isHovered ? -8 : 0,
          filter: isDimmed ? 'grayscale(100%)' : 'grayscale(0%)',
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          layout: SPRING_CONFIG,
          opacity: { duration: 0.2 },
          y: SPRING_CONFIG,
          filter: { duration: 0.3 },
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="relative cursor-pointer bg-white rounded-md border border-[#00008B]/10 p-6 pb-8"
      >
        {/* Category Label + Read indicator */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-sans text-xs md:text-[13px] uppercase tracking-[0.25em] text-[#00008B]/40">
            {entry.category.replace('-', ' ')}
          </span>
          <ReadCheckmark slug={entry.slug} />
        </div>

        {/* Title */}
        <h3 className="font-sans text-2xl font-bold text-[#00008B] leading-tight mb-3">
          {entry.title}
        </h3>

        {/* Excerpt */}
        <p className="font-serif text-sm text-[#00008B]/60 leading-relaxed mb-6 line-clamp-3">
          {entry.excerpt}
        </p>

        {/* Metadata Footer */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 font-sans text-[10px] text-[#00008B]/40 uppercase tracking-wider">
              <span>
                {new Date(entry.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
              <span>{entry.readingTime} MIN</span>
              {entry.sourceCount ? (
                <>
                  <span>&middot;</span>
                  <span>{entry.sourceCount} SOURCES</span>
                </>
              ) : null}
            </div>

            {/* Arrow */}
            <motion.div
              animate={{
                x: isHovered ? 4 : 0,
                opacity: isHovered ? 1 : 0.3,
              }}
              transition={{ duration: 0.15 }}
            >
              <ArrowUpRight className="w-4 h-4 text-[#00008B]" />
            </motion.div>
          </div>
          {entry.sourceCount ? <DepthIndicator sourceCount={entry.sourceCount} /> : null}
        </div>

        {/* Hover Accent Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-[#00008B]"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </motion.article>
    </VaultLink>
  );
}

export function PrecisionGrid({ entries }: PrecisionGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isAnyHovered = hoveredId !== null;

  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-8 md:py-24 text-center"
      >
        <p className="font-sans text-sm text-[#00008B]/40 tracking-wider">
          NO RESULTS
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12"
    >
      <AnimatePresence mode="popLayout">
        {entries.map((entry) => (
          <VaultCard
            key={entry.slug}
            entry={entry}
            isHovered={hoveredId === entry.slug}
            isAnyHovered={isAnyHovered}
            onHover={() => setHoveredId(entry.slug)}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
