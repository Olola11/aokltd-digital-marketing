'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { STUDIO_PROJECTS } from '@/data/studio/projects';
import { useStudioMotion } from '../motion/studio-motion';
import { StudioCard } from './studio-card';

const COUNT_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

/**
 * ClientsCard — a logo wall. Every client's logo is inked in one colour, the
 * brand navy, so no mark shouts louder than another; each tile opens its case
 * study. Tiles rise into place one after another the first time the card is
 * seen. New clients join by adding a logo (scripts/studio/prepare-client-logo.mjs)
 * and a project entry.
 */
export function ClientsCard() {
  const { reduced } = useStudioMotion();
  const count = STUDIO_PROJECTS.length;

  return (
    <StudioCard label="Clients" className="bg-[rgb(219,234,250)]">
      <ul className="grid flex-1 grid-cols-1 content-center gap-3 py-8 sm:grid-cols-2">
        {STUDIO_PROJECTS.map((project, i) => (
          <motion.li
            key={project.slug}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/studio/work/${project.slug}`}
              aria-label={`${project.name} case study`}
              className="group relative flex aspect-[3/2] items-center justify-center rounded-2xl bg-white/55 px-6 transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--studio-ink)]"
            >
              <span
                className="relative block h-[42%] w-[78%]"
                style={project.logoScale ? { transform: `scale(${project.logoScale})` } : undefined}
              >
                <Image
                  src={project.logo}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 70vw, 240px"
                  className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 grid h-7 w-7 place-items-center rounded-full border border-[var(--studio-ink)]/25 text-[var(--studio-ink)] transition-colors duration-300 group-hover:border-transparent group-hover:bg-[var(--studio-ink)] group-hover:text-white"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
      <p className="text-center font-serif text-sm text-[var(--studio-ink-soft)] lg:text-base">
        {COUNT_WORDS[count] ?? count} {count === 1 ? 'site' : 'sites'} launched. More in progress.
      </p>
    </StudioCard>
  );
}
