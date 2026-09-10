'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { STUDIO_SERVICES } from '@/data/studio/services';
import { ScrollTrigger, useGSAP } from '@/lib/studio/gsap';
import { useStudioMotion } from '../motion/studio-motion';
import { StudioCard } from './studio-card';

const WORDS = STUDIO_SERVICES.map((service) => ({
  word: service.scrubWord,
  href: `/studio/services/${service.slug}`,
}));

/**
 * Maps scroll progress through the card to [word index, visible characters].
 * Each word types in, holds, then deletes; the last word stays. Nothing
 * moves unless the visitor scrolls.
 */
function typedState(progress: number): [number, number] {
  const segment = 1 / WORDS.length;
  const index = Math.min(WORDS.length - 1, Math.floor(progress / segment));
  const local = (progress - index * segment) / segment;
  const length = WORDS[index].word.length;

  if (local < 0.45) return [index, Math.round((local / 0.45) * length)];
  if (index === WORDS.length - 1 || local < 0.7) return [index, length];
  return [index, Math.round((1 - (local - 0.7) / 0.3) * length)];
}

export function ServicesCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  const { reduced } = useStudioMotion();

  useGSAP(
    () => {
      const el = wordRef.current;
      if (!el) return;

      const render = (progress: number) => {
        const [index, chars] = typedState(progress);
        el.textContent = WORDS[index].word.slice(0, chars);
        el.setAttribute('href', WORDS[index].href);
      };

      if (reduced) {
        render(0.3);
        return;
      }

      const trigger = ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 92%',
        end: 'bottom 8%',
        onUpdate: (self) => render(self.progress),
      });
      render(trigger.progress);
    },
    { scope: cardRef, dependencies: [reduced] }
  );

  return (
    <div ref={cardRef} className="h-full">
      <StudioCard label="Services" className="min-h-[300px] lg:min-h-[360px]">
        <div className="flex flex-1 items-center justify-center py-8">
          {/* Decorative echo of the list below, which carries the real links */}
          <p aria-hidden="true" className="font-sans text-4xl tracking-[-0.02em] lg:text-5xl">
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
            <span className="studio-caret" />
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
