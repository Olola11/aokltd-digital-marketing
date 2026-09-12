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

/**
 * ServicesCard — each service resolves out of noise, holds in order, then
 * dissolves back into noise as the next one resolves. Scroll drives it, so
 * scrolling back runs it in reverse and nothing moves while the page is still.
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
      const setWord = (index: number) => el.setAttribute('href', WORDS[index].href);

      if (reduced) {
        el.textContent = WORDS[0].word;
        setWord(0);
        return;
      }

      el.textContent = noiseOf(WORDS[0].word.length);
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: cardRef.current, start: 'top 92%', end: 'bottom 8%', scrub: 0.5 },
        onUpdate() {
          setWord(Math.min(WORDS.length - 1, Math.floor(this.progress() * WORDS.length)));
        },
      });

      WORDS.forEach(({ word }) => {
        timeline.to(el, {
          duration: 1,
          scrambleText: { text: word, chars: NOISE_CHARS, revealDelay: 0.35, speed: 0.8, tweenLength: true },
        });
        // Hold: the word sits in order before the next one breaks it up.
        timeline.to({}, { duration: 0.9 });
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
