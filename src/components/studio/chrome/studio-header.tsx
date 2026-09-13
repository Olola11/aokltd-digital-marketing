'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEnquiry } from '../enquiry/enquiry-provider';
import { useStudioMotion } from '../motion/studio-motion';
import { StudioBrand } from './studio-brand';

const NAV = [
  { id: 'work', label: 'Work', href: '/studio#work' },
  { id: 'services', label: 'Services', href: '/studio#services' },
  { id: 'about', label: 'About', href: '/studio#about' },
];

// min-h-11: 44px touch targets on every control.
const item =
  'relative inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 font-sans text-sm focus-visible:outline-none lg:px-5 lg:text-[15px]';

/**
 * The pill glides between links: one layoutId per nav, so Motion morphs it
 * from item to item. Brand navy, with the label it sits behind turning white.
 */
function NavPill({ layoutId }: { layoutId: string }) {
  return (
    <motion.span
      layoutId={layoutId}
      aria-hidden="true"
      className="absolute inset-0 rounded-full bg-[var(--studio-ink)]"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 520, damping: 40, mass: 0.8 }}
    />
  );
}

/**
 * StudioHeader — scrolls away with the page. Links rest as plain text; a pill
 * springs in behind whichever one is hovered, focused or last tapped.
 * "Start a brief" keeps the only accent colour, outlined while the sheet is open.
 *
 * Phones get the section links on a row of their own beneath the brand, so
 * the mobile page carries the same navigation as desktop (Google indexes the
 * mobile version first).
 */
export function StudioHeader() {
  const { open, isOpen } = useEnquiry();
  const { reduced, paused, togglePaused } = useStudioMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);
  const highlight = hovered ?? pressed;
  const motionLabel = paused ? 'Resume motion' : 'Pause motion';

  const track = (id: string) => ({
    onMouseEnter: () => setHovered(id),
    onFocus: () => setHovered(id),
    onBlur: () => setHovered(null),
  });

  const sectionLinks = (layoutId: string, className?: string) =>
    NAV.map((link) => (
      <Link
        key={link.id}
        href={link.href}
        {...track(link.id)}
        onClick={() => setPressed(link.id)}
        className={cn(item, 'transition-colors duration-200', highlight === link.id && 'text-white', className)}
      >
        <AnimatePresence>{highlight === link.id && <NavPill layoutId={layoutId} />}</AnimatePresence>
        <span className="relative">{link.label}</span>
      </Link>
    ));

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 pb-6 pt-3 sm:px-6 md:pb-8 md:pt-4 lg:px-8 lg:pb-14 lg:pt-6">
      <StudioBrand />

      <MotionConfig reducedMotion="user">
        <nav aria-label="Studio" className="flex items-center gap-1.5 lg:gap-2">
          <div className="flex items-center" onMouseLeave={() => setHovered(null)}>
            {sectionLinks('studio-nav-pill', 'hidden md:inline-flex')}
            {!reduced && (
              <button
                type="button"
                {...track('motion')}
                onClick={() => {
                  togglePaused();
                  setPressed('motion');
                }}
                aria-pressed={paused}
                aria-label={motionLabel}
                className={cn(
                  item,
                  'min-w-11 justify-center px-3 transition-colors duration-200 lg:px-4',
                  highlight === 'motion' && 'text-white'
                )}
              >
                <AnimatePresence>{highlight === 'motion' && <NavPill layoutId="studio-nav-pill" />}</AnimatePresence>
                {paused ? (
                  <Play className="relative h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Pause className="relative h-3.5 w-3.5" aria-hidden="true" />
                )}
                <span className="relative hidden xl:inline">{motionLabel}</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => open()}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            className={cn(
              item,
              'font-medium transition-colors duration-200',
              isOpen
                ? 'bg-transparent ring-1 ring-inset ring-[var(--studio-ink)]'
                : 'bg-[var(--studio-accent-soft)] hover:bg-[#cde2f9]'
            )}
          >
            Start a brief
          </button>
        </nav>

        {/* Phones: the section links on their own row. */}
        <nav aria-label="Studio sections" className="-ml-4 flex w-full items-center md:hidden">
          {sectionLinks('studio-nav-pill-mobile')}
        </nav>
      </MotionConfig>
    </header>
  );
}
