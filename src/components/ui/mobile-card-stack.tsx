'use client';

import { useRef, Children, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion';

/**
 * MobileCardStack — Reusable "Tactile Depth" sticky card stacking.
 *
 * Cards stick to the top of the viewport as the user scrolls. Each subsequent
 * card stacks on top of the previous one, leaving only a thin "peek" sliver
 * visible so the user can see how many cards are in the deck.
 *
 * The container's height is sized to give the user enough scroll distance to
 * read each card's full content before the next card arrives to cover it.
 *
 * Props:
 *  - peekHeight: px of previous card visible when stacked (default 16)
 *  - stickyStart: top offset for the first card (default 68, below 64px nav)
 *  - itemHeight: estimated card height in px for scroll sizing (default 300)
 *  - shadowStyle: custom box-shadow override
 *  - label: text shown after all cards have been scrolled through
 *
 * Cards MUST have a solid background (bg-white or similar).
 */

const DEFAULT_PEEK = 16;
const DEFAULT_STICKY_START = 68;
const DEFAULT_ITEM_HEIGHT = 220;

function StackingCard({
  children,
  index,
  totalCards,
  containerRef,
  shadowStyle,
  stickyTop,
}: {
  children: ReactNode;
  index: number;
  totalCards: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  shadowStyle?: string;
  stickyTop: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    offset: ['start end', 'start start'],
  });

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

  return (
    <motion.div
      ref={cardRef}
      className="sticky will-change-transform"
      style={{
        top: stickyTop,
        zIndex: (index + 1) * 10,
        scale,
      }}
    >
      <div
        className="relative mx-4 rounded-md overflow-visible"
        style={{
          boxShadow:
            shadowStyle ??
            `0 -4px 16px -4px rgba(0, 0, 139, 0.12),
             0 -2px 6px -2px rgba(0, 0, 139, 0.08),
             6px 6px 0px #00008B`,
        }}
      >
        {children}
        {/* Dot indicators */}
        <div className="absolute top-4 right-4 flex gap-1 z-10">
          {Array.from({ length: totalCards }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i === index ? 'bg-quill-500' : 'bg-royal-800/20'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface MobileCardStackProps {
  children: ReactNode;
  shadowStyle?: string;
  label?: string;
  /** Pixels of the previous card visible when stacked. Default 16. */
  peekHeight?: number;
  /** Top offset for the first card (below nav). Default 68. */
  stickyStart?: number;
  /** Estimated card height in px, used to size the scroll container. Default 300. */
  itemHeight?: number;
}

export function MobileCardStack({
  children,
  shadowStyle,
  label,
  peekHeight = DEFAULT_PEEK,
  stickyStart = DEFAULT_STICKY_START,
  itemHeight = DEFAULT_ITEM_HEIGHT,
}: MobileCardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const totalCards = items.length;

  // Each card needs enough scroll distance to be fully read before the next arrives.
  // The scroll distance per card ≈ itemHeight. Tight buffer to avoid mobile whitespace gaps.
  const containerHeight = totalCards * itemHeight + itemHeight * 0.1;

  return (
    <div className="py-4 px-0">
      <div
        ref={containerRef}
        className="relative"
        style={{ minHeight: containerHeight }}
      >
        <div className="space-y-4">
          {items.map((child, index) => (
            <StackingCard
              key={index}
              index={index}
              totalCards={totalCards}
              containerRef={containerRef}
              shadowStyle={shadowStyle}
              stickyTop={stickyStart + index * peekHeight}
            >
              {child}
            </StackingCard>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* Stack complete indicator */}
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-4 px-4 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs font-sans text-royal-800/50 uppercase tracking-wider">
            <div className="w-6 h-px bg-royal-800/20" />
            <span>{label}</span>
            <div className="w-6 h-px bg-royal-800/20" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
