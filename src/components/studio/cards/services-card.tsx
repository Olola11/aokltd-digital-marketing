'use client';

import { useRef } from 'react';
import { STUDIO_SERVICES } from '@/data/studio/services';
import { gsap, useGSAP } from '@/lib/studio/gsap';
import { NOISE_CHARS, noiseOf } from '@/lib/studio/noise';
import { useStudioMotion } from '../motion/studio-motion';
import { StudioCard } from './studio-card';

const WORDS = STUDIO_SERVICES.map((service) => service.scrubWord);

const SCRAMBLE = 0.9; // seconds for a word to break up and resolve
const HOLD = 1.6; // seconds a word sits in order
const STEP = SCRAMBLE + HOLD;

/**
 * ServicesCard — the services cycle on their own: each word breaks up into
 * noise and the next resolves out of it, round and round.
 *
 * Because it moves by itself it answers to the header's Pause motion control
 * (WCAG 2.2.2), stops while off-screen, and stays still for visitors who
 * prefer reduced motion.
 */
export function ServicesCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const { motionEnabled } = useStudioMotion();

  useGSAP(
    () => {
      const el = wordRef.current;
      const card = cardRef.current;
      if (!el || !card) return;

      let index = 0;
      const settle = () => {
        el.textContent = WORDS[index];
      };

      if (!motionEnabled) {
        settle();
        return;
      }

      el.textContent = noiseOf(WORDS[0].length);
      const loop = gsap.timeline({
        repeat: -1,
        paused: true,
        onUpdate() {
          index = Math.min(WORDS.length - 1, Math.floor(this.time() / STEP));
        },
      });
      WORDS.forEach((word) => {
        loop.to(el, {
          duration: SCRAMBLE,
          ease: 'none',
          scrambleText: { text: word, chars: NOISE_CHARS, revealDelay: 0.25, speed: 0.6 },
        });
        loop.to({}, { duration: HOLD });
      });

      // Play only while the card is on screen.
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) loop.play();
        else loop.pause();
      });
      observer.observe(card);

      return () => {
        observer.disconnect();
        loop.kill();
        // Leave a whole word behind, never a half-scrambled one.
        settle();
      };
    },
    { scope: cardRef, dependencies: [motionEnabled] }
  );

  return (
    <div ref={cardRef} className="h-full">
      <StudioCard label="Services" className="min-h-[300px] lg:min-h-[360px]">
        <div className="flex flex-1 items-center justify-center py-8">
          {/* Decorative echo of the list below, which carries the real names */}
          <p
            ref={wordRef}
            aria-hidden="true"
            className="whitespace-nowrap font-sans text-4xl tracking-[-0.02em] lg:text-5xl"
          >
            {WORDS[0]}
          </p>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 font-sans text-sm text-[var(--studio-ink-soft)] lg:text-[15px]">
          {STUDIO_SERVICES.map((service) => (
            <li key={service.slug} className="py-1.5">
              {service.name}
            </li>
          ))}
        </ul>
      </StudioCard>
    </div>
  );
}
