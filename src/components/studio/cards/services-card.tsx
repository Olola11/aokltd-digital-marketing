'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { STUDIO_SERVICES } from '@/data/studio/services';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/studio/gsap';
import { NOISE_CHARS, noiseOf } from '@/lib/studio/noise';
import { useStudioMotion } from '../motion/studio-motion';
import { StudioCard } from './studio-card';

const WORDS = STUDIO_SERVICES.map((service) => ({
  word: service.scrubWord,
  href: `/studio/services/${service.slug}`,
}));

/**
 * ServicesCard — scrolling through the card steps through the services. At
 * each step the current word breaks up into noise and the next one resolves
 * out of it. Scroll chooses the word; a short tween always finishes the
 * resolve, so the card never rests half-scrambled. Scrolling back steps back.
 */
export function ServicesCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  const { reduced } = useStudioMotion();

  useGSAP(
    () => {
      const el = wordRef.current;
      if (!el) return;

      if (reduced) {
        el.textContent = WORDS[0].word;
        el.setAttribute('href', WORDS[0].href);
        return;
      }

      let current = -1;
      const show = (index: number) => {
        if (index === current) return;
        current = index;
        el.setAttribute('href', WORDS[index].href);
        gsap.to(el, {
          duration: 0.7,
          ease: 'none',
          overwrite: true,
          scrambleText: { text: WORDS[index].word, chars: NOISE_CHARS, revealDelay: 0.2, speed: 0.6 },
        });
      };
      const indexAt = (progress: number) => Math.min(WORDS.length - 1, Math.floor(progress * WORDS.length));

      el.textContent = noiseOf(WORDS[0].word.length);
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 92%',
        end: 'bottom 8%',
        onUpdate: (self) => show(indexAt(self.progress)),
        // Positions are only known after ScrollTrigger measures the page, so
        // the first word resolves then, wherever the visitor happens to be.
        onRefresh: (self) => show(indexAt(self.progress)),
      });
    },
    { scope: cardRef, dependencies: [reduced] }
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
                className="underline-offset-4 transition-colors duration-200 hover:text-[var(--studio-ink)] hover:underline"
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
