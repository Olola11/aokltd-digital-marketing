'use client';

import { useLagosTime } from '../hooks/use-lagos-time';
import { StudioCard } from './studio-card';

/** Lagos time, and how far it is from the visitor's own clock. */
export function ClockCard() {
  const lagos = useLagosTime();

  return (
    <StudioCard label="Studio" className="min-h-[240px]">
      <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
        <p className="font-sans text-4xl tabular-nums tracking-[-0.02em] lg:text-5xl">{lagos ? lagos.time : 'Lagos'}</p>
        <p className="mt-2 font-sans text-sm lg:text-[15px]">{lagos ? 'in Lagos, Nigeria' : 'Nigeria'}</p>
        <p className="mt-4 font-serif text-base text-[var(--studio-ink-soft)] lg:text-lg">
          {lagos ? lagos.gap : 'West Africa Time, UTC+1.'}
        </p>
      </div>
    </StudioCard>
  );
}
