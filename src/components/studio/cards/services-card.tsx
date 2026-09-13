'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { STUDIO_SERVICES } from '@/data/studio/services';
import { gsap, useGSAP } from '@/lib/studio/gsap';
import { NOISE_CHARS, noiseOf } from '@/lib/studio/noise';
import { useStudioMotion } from '../motion/studio-motion';
import { StudioCard } from './studio-card';

const WORDS = STUDIO_SERVICES.map((service) => ({
  word: service.scrubWord,
  href: `/studio/services/${service.slug}`,
}));

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
  const wordRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  const { motionEnabled } = useStudioMotion();

  useGSAP(
    () => {
      const el = wordRef.current;
      const card = cardRef.current;
      if (!el || !card) return;

      let index = 0;
      const settle = () => {
        el.textContent = WORDS[index].word;
        el.setAttribute('href', WORDS[index].href);
      };

      if (!motionEnabled) {
        settle();
        return;
      }

      el.textContent = noiseOf(WORDS[0].word.length);
      const loop = gsap.timeline({
        repeat: -1,
        paused: true,
        onUpdate() {
          const next = Math.min(WORDS.length - 1, Math.floor(this.time() / STEP));
          if (next !== index) {
            index = next;
            el.setAttribute('href', WORDS[index].href);
          }
        },
      });
      WORDS.forEach(({ word }) => {
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
          {/* Decorative echo of the list below, which carries the real links */}
          <p aria-hidden="true" className="whitespace-nowrap font-sans text-4xl tracking-[-0.02em] lg:text-5xl">
            <a
              ref={wordRef}
              href={WORDS[0].href}
              tabIndex={-1}
              onClick={(event) => {
                event.preventDefault();
                router.push(event.currentTarget.getAttribute('href') ?? WORDS[0].href);
              }}
              className="decoration-2 underline-offset-8 hover:underline"
            >
              {WORDS[0].word}
            </a>
          </p>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 font-sans text-sm text-[var(--studio-ink-soft)] lg:text-[15px]">
          {STUDIO_SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/studio/services/${service.slug}`}
                className="inline-block py-1.5 underline-offset-4 transition-colors duration-200 hover:text-[var(--studio-ink)] hover:underline"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </StudioCard>
    </div>
  );
}
