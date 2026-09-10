'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';
import { STUDIO_PROJECTS } from '@/data/studio/projects';
import { formatMeasuredDate } from '@/lib/studio/format';
import { useStudioMotion } from '../motion/studio-motion';
import { StudioCard } from './studio-card';

const METRICS = [
  { key: 'accessibility', label: 'Accessibility' },
  { key: 'bestPractices', label: 'Best practices' },
  { key: 'seo', label: 'SEO' },
] as const;

/**
 * MeasuredCard — real Lighthouse scores for the live sites, with the tool
 * and date, counting up once when the card comes into view. The server HTML
 * carries the final numbers.
 */
export function MeasuredCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const { reduced } = useStudioMotion();

  // Zero the counters before they are seen, so the count-up starts from nothing.
  useEffect(() => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;
    ref.current.querySelectorAll<HTMLElement>('[data-score]').forEach((node) => {
      node.textContent = '0';
    });
  }, [reduced]);

  useEffect(() => {
    if (!inView || reduced || !ref.current) return;
    const nodes = Array.from(ref.current.querySelectorAll<HTMLElement>('[data-score]'));
    const controls = nodes.map((node, i) =>
      animate(Number(node.textContent) || 0, Number(node.dataset.score), {
        duration: 1.1,
        delay: i * 0.05,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (value) => {
          node.textContent = String(Math.round(value));
        },
      })
    );
    return () => controls.forEach((control) => control.stop());
  }, [inView, reduced]);

  const { tool, measuredAt } = STUDIO_PROJECTS[0].measured;

  return (
    <div ref={ref} className="h-full">
      <StudioCard label="Measured, not claimed" tone="accent">
        <p className="mx-auto mt-6 max-w-[30ch] text-center font-serif text-base text-[var(--studio-ink-soft)] lg:text-lg">
          Google Lighthouse scores for the live sites, out of 100.
        </p>
        <div className="mt-6 space-y-6">
          {STUDIO_PROJECTS.map((project) => (
            <div key={project.slug}>
              <p className="font-sans text-sm font-medium lg:text-[15px]">{project.displayUrl}</p>
              <dl className="mt-2 grid grid-cols-3 gap-2">
                {METRICS.map((metric) => (
                  <div key={metric.key} className="flex flex-col rounded-xl bg-white/60 px-3 py-3">
                    <dt className="font-sans text-xs text-[var(--studio-ink-soft)] lg:text-[13px]">{metric.label}</dt>
                    {/* mt-auto keeps the scores level when a label wraps */}
                    <dd
                      data-score={project.measured.mobile[metric.key]}
                      className="mt-auto pt-1 font-sans text-3xl tabular-nums tracking-[-0.02em] lg:text-4xl"
                    >
                      {project.measured.mobile[metric.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-6 font-sans text-xs text-[var(--studio-ink-soft)] lg:text-[13px]">
          {tool}, mobile, measured {formatMeasuredDate(measuredAt)}.
        </p>
      </StudioCard>
    </div>
  );
}
