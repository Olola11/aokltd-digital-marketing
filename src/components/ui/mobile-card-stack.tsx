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
 * Replicates the About page's "Our Principles" mobile stacking pattern:
 * - Cards stick to the top of the viewport as user scrolls
 * - Each subsequent card stacks on top of the previous one
 * - Spring-based "haptic thud" on landing
 * - Dot indicators show position in the deck
 * - Always-visible shadow for depth separation
 *
 * Usage:
 *   <MobileCardStack>
 *     <div className="bg-white border ...">Card 1</div>
 *     <div className="bg-white border ...">Card 2</div>
 *   </MobileCardStack>
 *
 * Cards MUST have a solid background (bg-white or similar).
 * Shadow is applied via the wrapper — do not add mobile shadows to cards.
 */

const STACK_OFFSET = 56;
const STICKY_TOP = 100;

function StackingCard({
  children,
  index,
  totalCards,
  containerRef,
  shadowStyle,
}: {
  children: ReactNode;
  index: number;
  totalCards: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  shadowStyle?: string;
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

  const stickyTop = STICKY_TOP + index * STACK_OFFSET;

  return (
    <motion.div
      ref={cardRef}
      className="sticky will-change-transform"
      style={{
        top: stickyTop,
        zIndex: index + 1,
        scale,
      }}
    >
      <div
        className="relative mx-4 rounded-md overflow-visible"
        style={{
          boxShadow:
            shadowStyle ??
            `0 -8px 25px -5px rgba(0, 0, 139, 0.15),
             0 -4px 10px -5px rgba(0, 0, 139, 0.1),
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
}

export function MobileCardStack({
  children,
  shadowStyle,
  label,
}: MobileCardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const totalCards = items.length;

  return (
    <div className="py-4 px-0">
      <div
        ref={containerRef}
        className="relative"
        style={{ minHeight: totalCards * 220 + 150 }}
      >
        <div className="space-y-4">
          {items.map((child, index) => (
            <StackingCard
              key={index}
              index={index}
              totalCards={totalCards}
              containerRef={containerRef}
              shadowStyle={shadowStyle}
            >
              {child}
            </StackingCard>
          ))}
        </div>
        <div style={{ height: 100 }} />
      </div>

      {/* Stack complete indicator */}
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 px-4 text-center"
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
