'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { STUDIO_SERVICES, type StudioService } from '@/data/studio/services';
import { cn } from '@/lib/utils';

/** Slow out, no overshoot — the studio's resolving easing. */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The name is masked by its heading, so the heading cannot be what waits for
 * the viewport — a clipped element never reads as visible. The row watches
 * instead and hands the cue down to its parts.
 */
const ROW: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const RISE: Variants = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.75, ease: EASE } },
};

const FADE: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function ServiceRow({
  service,
  marked,
  onMark,
}: {
  service: StudioService;
  marked: boolean;
  onMark: (slug: string | null) => void;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const shown = inView || Boolean(reduced);

  return (
    <motion.li
      ref={ref}
      variants={ROW}
      initial="hidden"
      animate={shown ? 'visible' : 'hidden'}
      onPointerEnter={() => onMark(service.slug)}
      onPointerLeave={() => onMark(null)}
      className="relative border-t border-[var(--studio-ink-faint)] py-7 pl-4 pr-1 lg:py-10 lg:pl-6"
    >
      {marked && (
        <motion.span
          layoutId="studio-service-marker"
          aria-hidden="true"
          transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
          className="absolute left-0 top-0 h-full w-[3px] bg-[var(--studio-ink)]"
        />
      )}

      <h3 className={cn('overflow-hidden pb-[0.12em] transition-transform duration-300', marked && 'translate-x-1')}>
        <motion.span variants={RISE} className="block font-sans text-2xl tracking-[-0.01em] lg:text-4xl">
          {service.name}
        </motion.span>
      </h3>

      <motion.p
        variants={FADE}
        className="mt-3 max-w-[62ch] font-serif text-lg leading-relaxed text-[var(--studio-ink-soft)] lg:text-xl"
      >
        {service.lede}
      </motion.p>

      <motion.ul
        variants={FADE}
        aria-label={`What ${service.name.toLowerCase()} covers`}
        className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 font-sans text-sm text-[var(--studio-ink-soft)] lg:text-[15px]"
      >
        {service.includes.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </motion.ul>
    </motion.li>
  );
}

/**
 * ServicesList — the studio's whole offer, in one place. Each service is a
 * section of this page rather than a page of its own, so nothing about what
 * we do is a click away, and search engines read all of it at once.
 *
 * The names rise out of a mask as the section arrives, what each one covers
 * fades in under it, and a navy marker follows whichever service you are
 * reading.
 */
export function ServicesList() {
  const [marked, setMarked] = useState<string | null>(null);

  return (
    <ul className="border-b border-[var(--studio-ink-faint)]">
      {STUDIO_SERVICES.map((service) => (
        <ServiceRow
          key={service.slug}
          service={service}
          marked={marked === service.slug}
          onMark={setMarked}
        />
      ))}
    </ul>
  );
}
