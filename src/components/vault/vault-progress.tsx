'use client';

import { useSyncExternalStore } from 'react';
import { getReadArticles, getCategoryReadCount } from '@/lib/reading-progress';

// Reading progress is cookie-based. We use useSyncExternalStore with a no-op subscribe
// since cookies don't change during a single page view (reads happen on navigation).
const emptySubscribe = () => () => {};

function useReadArticles(): string[] {
  return useSyncExternalStore(
    emptySubscribe,
    () => getReadArticles(),
    () => [] as string[]
  );
}

interface VaultProgressBarProps {
  totalCount: number;
}

export function VaultProgressBar({ totalCount }: VaultProgressBarProps) {
  const readArticles = useReadArticles();
  const readCount = readArticles.length;

  if (readCount === 0) {
    return (
      <div className="mb-6">
        <p className="font-sans text-sm text-[#00008B]/50">
          Begin your exploration.
        </p>
      </div>
    );
  }

  const percentage = Math.round((readCount / totalCount) * 100);

  return (
    <div className="mb-6 max-w-[300px] md:max-w-[300px] mx-auto md:mx-0">
      <p className="font-sans text-sm text-[#00008B]/50 mb-2">
        You&rsquo;ve explored {readCount} of {totalCount} entries.
      </p>
      <div className="h-1 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-[#00008B] rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface CategoryProgressRingProps {
  articleSlugs: string[];
}

export function CategoryProgressRing({ articleSlugs }: CategoryProgressRingProps) {
  const readCount = useSyncExternalStore(
    emptySubscribe,
    () => getCategoryReadCount(articleSlugs),
    () => 0
  );

  if (readCount === 0) return null;

  const totalCount = articleSlugs.length;
  const circumference = 2 * Math.PI * 10; // r=10
  const progress = (readCount / totalCount) * circumference;

  return (
    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" stroke="#e5e7eb" strokeWidth="2" />
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="#00008B"
        strokeWidth="2"
        strokeDasharray={`${progress} ${circumference}`}
        strokeLinecap="round"
        transform="rotate(-90 12 12)"
      />
      <text
        x="12"
        y="12"
        textAnchor="middle"
        dy=".35em"
        className="fill-[#00008B] font-sans font-medium"
        style={{ fontSize: '7px' }}
      >
        {readCount}/{totalCount}
      </text>
    </svg>
  );
}

export function ReadCheckmark({ slug }: { slug: string }) {
  const readArticles = useReadArticles();
  const read = readArticles.includes(slug);

  if (!read) return null;

  return (
    <div className="w-5 h-5 rounded-full border border-[#4A90E2]/40 flex items-center justify-center flex-shrink-0">
      <svg className="w-3 h-3 text-[#4A90E2]/60" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}
