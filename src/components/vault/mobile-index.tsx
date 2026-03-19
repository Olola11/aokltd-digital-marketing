'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VaultEntry, VaultCategory } from '@/types';

// Brand Colors
const BRAND = {
  deep: '#00008B',     // rgb(0, 0, 139) — Headers, borders, primary text
  quill: '#58AEFE',    // rgb(88, 174, 254) — Active states, highlights
};

interface MobileIndexProps {
  entries: VaultEntry[];
}

const CATEGORY_ORDER: VaultCategory[] = ['history', 'culture', 'bizarre-facts', 'true-crime'];

const CATEGORY_LABELS: Record<VaultCategory, string> = {
  history: 'HISTORY',
  culture: 'CULTURE',
  'bizarre-facts': 'BIZARRE FACTS',
  'true-crime': 'TRUE CRIME',
};

interface CategoryGroup {
  category: VaultCategory;
  entries: VaultEntry[];
}

function StickyHeader({
  category,
  count,
  entries,
}: {
  category: VaultCategory;
  count: number;
  entries: VaultEntry[];
}) {
  // Pick a random featured image from this category's entries
  const imageEntry = entries.find((e) => e.featuredImage);

  return (
    <div
      className={cn(
        'sticky top-[120px] z-10',
        'bg-white border-b-2 border-[#00008B]/10'
      )}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Folder icon with image mask */}
          <div className="relative w-8 h-8 flex-shrink-0">
            {imageEntry?.featuredImage ? (
              <div
                className="w-8 h-8"
                style={{
                  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'/%3E%3C/svg%3E")`,
                  WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'/%3E%3C/svg%3E")`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              >
                <Image
                  src={imageEntry.featuredImage.src}
                  alt=""
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#00008B]">
                <path d="M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            )}
            {/* Folder outline stroke */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00008B"
              strokeWidth="1.5"
              className="absolute inset-0 w-8 h-8"
            >
              <path d="M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            {/* Count badge */}
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#00008B] font-sans text-[9px] font-medium text-white px-1">
              {count}
            </span>
          </div>
          <h2 className="font-sans text-sm font-bold text-[#00008B] tracking-wider">
            {CATEGORY_LABELS[category]}
          </h2>
        </div>
      </div>
    </div>
  );
}

function EntryRow({ entry, index }: { entry: VaultEntry; index: number }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Link href={`/vault/${entry.category}/${entry.slug}`} className="block">
    <motion.article
      initial={{ borderLeftColor: 'rgba(0, 0, 139, 0)' }}
      whileInView={{ borderLeftColor: 'rgba(0, 0, 139, 0.15)' }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
      className={cn(
        'border-b border-[#58AEFE]/10 border-l-2',
        'transition-colors duration-100',
        isPressed && 'bg-[#58AEFE]/5'
      )}
    >
      <div className="flex items-start gap-4 px-4 py-5">
        {/* Index */}
        <span className="font-sans text-[13px] text-[#00008B]/20 pt-1 w-5 flex-shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-sans text-base font-semibold text-[#00008B] leading-snug mb-1">
            {entry.title}
          </h3>
          <p className="text-sm text-[#00008B]/50 line-clamp-2 mb-2">
            {entry.excerpt}
          </p>
          <div className="font-sans text-[9px] text-[#00008B]/30 uppercase tracking-wider">
            {new Date(entry.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
            {' · '}
            {entry.readingTime} MIN
          </div>
        </div>

        {/* Chevron */}
        <ChevronRight className="w-4 h-4 text-[#00008B]/20 flex-shrink-0 mt-1" />
      </div>
    </motion.article>
    </Link>
  );
}

export function MobileIndex({ entries }: MobileIndexProps) {
  // Group entries by category
  const groups: CategoryGroup[] = CATEGORY_ORDER
    .map((category) => ({
      category,
      entries: entries.filter((e) => e.category === category),
    }))
    .filter((g) => g.entries.length > 0);

  if (entries.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-sans text-sm text-[#00008B]/40 tracking-wider">
          NO RESULTS
        </p>
      </div>
    );
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {groups.map((group, groupIndex) => (
          <div key={group.category}>
            <StickyHeader
              category={group.category}
              count={group.entries.length}
              entries={group.entries}
            />

            {group.entries.map((entry, i) => (
              <EntryRow key={entry.slug} entry={entry} index={i} />
            ))}

            {/* Gradient divider between categories */}
            {groupIndex < groups.length - 1 && (
              <div className="h-2 bg-gradient-to-r from-[#00008B]/30 to-transparent" />
            )}
          </div>
        ))}
      </AnimatePresence>

      {/* End marker */}
      <div className="py-8 text-center border-t border-[#58AEFE]/10">
        <span className="font-sans text-[10px] text-[#00008B]/20 tracking-[0.3em]">
          END
        </span>
      </div>
    </div>
  );
}
