'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap, useGSAP } from '@/lib/studio/gsap';
import { useStudioMotion } from '../motion/studio-motion';

export interface GridItem {
  id: string;
  node: React.ReactNode;
  /** Position in the single-column mobile stack (1–12) */
  mobileOrder: number;
}

// Literal class names so Tailwind generates them.
const ORDER = [
  'order-1', 'order-2', 'order-3', 'order-4', 'order-5', 'order-6',
  'order-7', 'order-8', 'order-9', 'order-10', 'order-11', 'order-12',
];

/** Where each column starts, as a fraction of the viewport height. */
const COLUMN_OFFSETS = [0, 0.18, 0.09];

/**
 * ResolveGrid — noise into order.
 *
 * On desktop the three columns begin out of step and every card sits at a
 * slight tilt. Scrolling pulls them into register: by the time the grid's
 * bottom edge reaches the viewport, the columns are level, the cards are
 * square, and the grid is perfectly flush. Scroll back and the noise returns.
 * Below desktop each card resolves on its own as it scrolls in (two columns
 * on tablets, one on phones). Reduced-motion visitors get the ordered grid
 * from the start.
 */
export function ResolveGrid({ columns, className }: { columns: GridItem[][]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useStudioMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const scrollTrigger = {
          trigger: ref.current,
          start: 'top 75%',
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
        };

        gsap.utils.toArray<HTMLElement>('[data-resolve-col]').forEach((column, i) => {
          gsap.fromTo(
            column,
            { y: () => window.innerHeight * (COLUMN_OFFSETS[i] ?? 0) },
            { y: 0, ease: 'none', scrollTrigger: { ...scrollTrigger } }
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-resolve-card]').forEach((card, i) => {
          // Deterministic tilt between -0.9° and 0.9°
          const tilt = (((i * 5) % 7) - 3) * 0.3;
          gsap.fromTo(
            card,
            { rotate: tilt },
            { rotate: 0, ease: 'none', scrollTrigger: { ...scrollTrigger, end: 'center 60%' } }
          );
        });
      });

      // Phones and tablets: one stack, so each card resolves on its own —
      // it arrives tilted and low, and squares up as it scrolls into place.
      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-resolve-card]').forEach((card, i) => {
          const tilt = (((i * 5) % 7) - 3) * 0.6;
          gsap.fromTo(
            card,
            { rotate: tilt, y: 48, scale: 0.96 },
            {
              rotate: 0,
              y: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top 100%', end: 'top 65%', scrub: 0.5 },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:items-stretch',
        className
      )}
    >
      {columns.map((column, c) => (
        <div key={c} data-resolve-col className="contents lg:flex lg:flex-col lg:gap-5">
          {column.map((item, i) => (
            <div
              key={item.id}
              data-resolve-card
              className={cn(
                ORDER[item.mobileOrder - 1],
                'lg:order-none',
                i === column.length - 1 && 'lg:flex-1 [&>*]:h-full'
              )}
            >
              {item.node}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
