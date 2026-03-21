'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { VAULT_DATA, CATEGORY_LABELS } from '@/lib/vault-data';
import {
  EMPTY_ARTICLES,
  getReadArticlesStable,
  emptySubscribe,
} from '@/lib/reading-progress';

import type { RelatedArticle } from '@/types';

interface ArticleThreadProps {
  relatedArticles: RelatedArticle[];
}

function ThreadCard({
  slug,
  category,
  readSlugs,
}: Omit<RelatedArticle, 'connectionReason'> & { readSlugs: string[] }) {
  const entry = VAULT_DATA.find((e) => e.slug === slug && e.category === category);
  if (!entry) return null;

  const isRead = readSlugs.includes(slug);

  return (
    <Link
      href={`/vault/${entry.category}/${entry.slug}`}
      className="block bg-white border border-[#00008B]/10 rounded-md p-4 hover:-translate-y-1 transition-all duration-300 ease-out relative"
    >
      {isRead && (
        <div className="absolute top-3 right-3 w-4 h-4 rounded-full border border-quill-500/40 flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-quill-500/60" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      <span className="font-sans text-[10px] uppercase tracking-widest text-quill-500 block mb-1.5">
        {CATEGORY_LABELS[entry.category]}
      </span>
      <h4 className="font-sans text-sm font-semibold text-[#00008B] mb-1 leading-snug pr-6">
        {entry.title}
      </h4>
      <p className="font-serif text-xs text-[#00008B]/40 line-clamp-1 mb-2">
        {entry.excerpt}
      </p>
      <span className="font-sans text-[9px] text-[#00008B]/40 uppercase tracking-wider">
        {entry.readingTime} min read
      </span>
    </Link>
  );
}

export function ArticleThread({ relatedArticles }: ArticleThreadProps) {
  const readSlugs = useSyncExternalStore(
    emptySubscribe,
    getReadArticlesStable,
    () => EMPTY_ARTICLES
  );

  // Filter out articles that don't exist in VAULT_DATA
  const validRelated = relatedArticles.filter((ra) =>
    VAULT_DATA.some((e) => e.slug === ra.slug && e.category === ra.category)
  );

  if (validRelated.length === 0) return null;

  return (
    <section className="border-t border-quill-500/10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-px bg-[#00008B]/20" />
          <span className="font-sans text-xs sm:text-sm font-medium text-quill-500 uppercase tracking-[0.25em]">
            Continue the Thread
          </span>
          <div className="w-12 h-px bg-[#00008B]/20" />
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:flex items-stretch gap-4">
          {validRelated.map((ra, i) => (
            <div key={ra.slug} className="flex items-stretch flex-1">
              {i > 0 && (
                <div className="flex flex-col items-center justify-center mx-2 flex-shrink-0">
                  <div className="w-8 h-px bg-gray-300" />
                  <span className="font-sans text-[9px] text-gray-500 uppercase tracking-wider bg-white px-1.5 py-0.5 whitespace-nowrap">
                    {ra.connectionReason}
                  </span>
                  <div className="w-8 h-px bg-gray-300" />
                </div>
              )}
              <div className="flex-1">
                <ThreadCard {...ra} readSlugs={readSlugs} />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-0">
          {validRelated.map((ra, i) => (
            <div key={ra.slug}>
              {i > 0 && (
                <div className="flex items-center gap-2 py-2 pl-4">
                  <div className="w-px h-4 bg-gray-300" />
                  <span className="font-sans text-[9px] text-gray-500 uppercase tracking-wider">
                    {ra.connectionReason}
                  </span>
                </div>
              )}
              <ThreadCard {...ra} readSlugs={readSlugs} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
