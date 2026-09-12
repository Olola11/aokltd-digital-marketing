'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { gsap, useGSAP } from '@/lib/studio/gsap';
import { NOISE_CHARS } from '@/lib/studio/noise';
import { useStudioMotion } from '../motion/studio-motion';

/** "AOK" unfolds into what it stands for. */
const PARTS = [
  { initial: 'A', tail: 'potheosis ' },
  { initial: 'O', tail: 'f ', lower: 'o' },
  { initial: 'K', tail: 'nowledge' },
];

const INTRO_DELAY = 0.9;
const INTRO_HOLD = 1.8;

/**
 * StudioBrand — the mark and a wordmark that explains itself.
 *
 * At rest it reads "AOK Studio". On arrival, and whenever the visitor hovers
 * or focuses it, each initial opens into its word — the letters pass through
 * noise before settling — so the acronym resolves into Apotheosis of
 * Knowledge, then folds away again. Desktop only; smaller screens and
 * reduced-motion visitors see the resting form.
 */
export function StudioBrand() {
  const rootRef = useRef<HTMLAnchorElement>(null);
  const { reduced } = useStudioMotion();
  const canUnfold = useMediaQuery('(min-width: 1024px) and (hover: hover)');

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || reduced || !canUnfold) return;

      const tails = gsap.utils.toArray<HTMLElement>('[data-tail]', root);
      const swap = root.querySelector<HTMLElement>('[data-swap]');
      let timeline: gsap.core.Timeline | undefined;
      let hovering = false;
      let cancelled = false;

      const build = () => {
        // Measure each word's finished width, then fold it shut.
        const widths = tails.map((tail) => {
          tail.textContent = tail.dataset.text ?? '';
          tail.style.width = 'auto';
          const width = tail.getBoundingClientRect().width;
          tail.textContent = '';
          tail.style.width = '0px';
          return width;
        });

        const tl = gsap.timeline({ paused: true });
        tails.forEach((tail, i) => {
          const at = i * 0.09;
          tl.to(tail, { width: widths[i], duration: 0.8, ease: 'power3.inOut' }, at);
          tl.to(
            tail,
            {
              duration: 0.8,
              ease: 'none',
              scrambleText: { text: tail.dataset.text ?? '', chars: NOISE_CHARS, revealDelay: 0.3, speed: 0.6 },
            },
            at
          );
        });
        if (swap) {
          tl.to(swap, { duration: 0.3, ease: 'none', scrambleText: { text: 'o', chars: NOISE_CHARS } }, 0.12);
        }
        return tl;
      };

      const expand = () => {
        hovering = true;
        timeline?.timeScale(1).play();
      };
      const collapse = () => {
        hovering = false;
        timeline?.timeScale(1.3).reverse();
      };

      document.fonts.ready.then(() => {
        if (cancelled) return;
        timeline = build();
        // Introduce the name once per visit.
        gsap.delayedCall(INTRO_DELAY, () => {
          timeline?.play();
          gsap.delayedCall((timeline?.duration() ?? 0) + INTRO_HOLD, () => {
            if (!hovering) timeline?.reverse();
          });
        });
      });

      root.addEventListener('pointerenter', expand);
      root.addEventListener('pointerleave', collapse);
      root.addEventListener('focus', expand);
      root.addEventListener('blur', collapse);

      return () => {
        cancelled = true;
        root.removeEventListener('pointerenter', expand);
        root.removeEventListener('pointerleave', collapse);
        root.removeEventListener('focus', expand);
        root.removeEventListener('blur', collapse);
      };
    },
    { scope: rootRef, dependencies: [reduced, canUnfold] }
  );

  return (
    <Link
      ref={rootRef}
      href="/studio"
      aria-label="AOK Studio, by Apotheosis of Knowledge. Home"
      className="flex shrink-0 items-center gap-3 rounded-md"
    >
      <Image
        src="/images/logo/Apotheosis of Knowledge LOGO PNG-15.png"
        alt=""
        width={40}
        height={40}
        priority
        className="h-9 w-9 lg:h-10 lg:w-10"
      />
      <span
        aria-hidden="true"
        className="inline-flex items-baseline whitespace-nowrap text-[26px] leading-none sm:text-[28px] lg:text-[30px]"
      >
        {PARTS.map((part) => (
          <span key={part.initial} className="inline-flex items-baseline">
            <span
              data-swap={part.lower ? '' : undefined}
              className="font-sans font-semibold tracking-[-0.04em]"
            >
              {part.initial}
            </span>
            <span
              data-tail
              data-text={part.tail}
              style={{ width: 0 }}
              className="inline-block overflow-hidden whitespace-pre font-sans font-normal tracking-[-0.02em] text-[var(--studio-ink-soft)]"
            />
          </span>
        ))}
        <span className="ml-[0.3em] font-serif italic text-[#3A78C2]">Studio</span>
      </span>
    </Link>
  );
}
