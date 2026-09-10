'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEnquiry } from '../enquiry/enquiry-provider';
import { useStudioMotion } from '../motion/studio-motion';

const NAV = [
  { label: 'Work', href: '/studio#work' },
  { label: 'Services', href: '/studio#services' },
  { label: 'About', href: '/studio#about' },
];

const pill =
  'inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-sm transition-colors duration-200 lg:px-5 lg:text-[15px]';

/**
 * StudioHeader — scrolls away with the page. The only coloured element is
 * "Start a brief", which switches to an outlined state while the sheet is open.
 */
export function StudioHeader() {
  const { open, isOpen } = useEnquiry();
  const { reduced, paused, togglePaused } = useStudioMotion();
  const motionLabel = paused ? 'Resume motion' : 'Pause motion';

  return (
    <header className="flex items-center justify-between gap-3 px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pb-14 lg:pt-6">
      <Link href="/studio" aria-label="AOK Studio home" className="flex shrink-0 items-center gap-2.5 rounded-md">
        <Image
          src="/images/logo/Apotheosis of Knowledge LOGO PNG-15.png"
          alt=""
          width={36}
          height={36}
          priority
          className="h-8 w-8 lg:h-9 lg:w-9"
        />
        <span className="font-serif text-[24px] leading-none tracking-[-0.01em] sm:text-[28px] lg:text-[32px]">
          AOK Studio
        </span>
      </Link>

      <nav aria-label="Studio" className="flex items-center gap-1.5 lg:gap-2">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(pill, 'hidden bg-[var(--studio-card)] hover:bg-[var(--studio-card-strong)] md:inline-flex')}
          >
            {item.label}
          </Link>
        ))}
        {!reduced && (
          <button
            type="button"
            onClick={togglePaused}
            aria-pressed={paused}
            aria-label={motionLabel}
            className={cn(pill, 'bg-[var(--studio-card)] px-3 hover:bg-[var(--studio-card-strong)] lg:px-4')}
          >
            {paused ? (
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span className="hidden xl:inline">{motionLabel}</span>
          </button>
        )}
        <button
          type="button"
          onClick={() => open()}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className={cn(
            pill,
            'font-medium',
            isOpen
              ? 'bg-transparent ring-1 ring-inset ring-[var(--studio-ink)]'
              : 'bg-[var(--studio-accent-soft)] hover:bg-[#cde2f9]'
          )}
        >
          Start a brief
        </button>
      </nav>
    </header>
  );
}
