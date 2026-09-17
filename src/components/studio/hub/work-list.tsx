'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { STUDIO_PROJECTS } from '@/data/studio/projects';
import { useStudioMotion } from '../motion/studio-motion';
import { Knot, UNTIE_MS } from '../ui/knot';

/**
 * WorkList — the case studies, each marked with a knot instead of an arrow.
 *
 * Following one pulls its knot out into a straight rope, and the page turns
 * as the last of it comes undone. Keyboard and modified clicks (new tab,
 * new window) are left alone, and visitors who prefer reduced motion go
 * straight through.
 */
export function WorkList() {
  const router = useRouter();
  const { reduced } = useStudioMotion();
  const [marked, setMarked] = useState<string | null>(null);
  const [leaving, setLeaving] = useState<string | null>(null);

  return (
    <ul className="divide-y divide-[var(--studio-ink-faint)] border-b border-[var(--studio-ink-faint)]">
      {STUDIO_PROJECTS.map((project) => {
        const href = `/studio/work/${project.slug}`;

        return (
          <li key={project.slug}>
            <Link
              href={href}
              className="group flex items-start justify-between gap-6 py-5 transition-colors duration-200 hover:text-[var(--studio-ink)]"
              onPointerEnter={() => setMarked(project.slug)}
              onPointerLeave={() => setMarked(null)}
              onFocus={() => setMarked(project.slug)}
              onBlur={() => setMarked(null)}
              onClick={(event) => {
                if (reduced || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                setLeaving(project.slug);
                window.setTimeout(() => router.push(href), UNTIE_MS);
              }}
            >
              <span>
                <span className="block font-sans text-2xl tracking-[-0.01em] lg:text-3xl">{project.name}</span>
                <span className="mt-1 block font-serif text-base text-[var(--studio-ink-soft)] lg:text-lg">
                  {project.summary}
                </span>
              </span>
              <Knot untied={leaving === project.slug} active={marked === project.slug} size={34} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
