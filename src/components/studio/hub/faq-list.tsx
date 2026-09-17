'use client';

import { useState } from 'react';
import { STUDIO_FAQS } from '@/data/studio/services';
import { Knot } from '../ui/knot';

/**
 * FaqList — the studio's answers to what people actually ask.
 *
 * Instead of a chevron, each question is marked with a knot that unties
 * itself as the answer opens. The questions and answers are plain <details>
 * in the markup, so they open, and are read by search engines, with no script
 * at all.
 */
export function FaqList() {
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="border-b border-[var(--studio-ink-faint)]">
      {STUDIO_FAQS.map((faq) => (
        <details
          key={faq.q}
          className="studio-faq border-t border-[var(--studio-ink-faint)]"
          open={open === faq.q}
          onToggle={(event) => {
            const isOpen = event.currentTarget.open;
            setOpen((current) => (isOpen ? faq.q : current === faq.q ? null : current));
          }}
        >
          <summary
            className="flex cursor-pointer items-center justify-between gap-6 py-5"
            onPointerEnter={() => setHovered(faq.q)}
            onPointerLeave={() => setHovered(null)}
          >
            <span>
              <span className="block font-sans text-[13px] uppercase tracking-[0.08em] text-[var(--studio-ink-soft)]">
                {faq.service}
              </span>
              <span className="mt-1 block font-sans text-lg lg:text-xl">{faq.q}</span>
            </span>
            <Knot untied={open === faq.q} active={hovered === faq.q} />
          </summary>
          <p className="max-w-[68ch] pb-6 font-serif text-base leading-relaxed text-[var(--studio-ink-soft)] lg:text-lg">
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  );
}
