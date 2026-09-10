'use client';

import Link from 'next/link';
import type { StudioProject } from '@/data/studio/projects';
import { cn } from '@/lib/utils';
import { useScrubVideo } from '../video/use-scrub-video';

/**
 * WorkCard — the live site, recorded, sitting in a screen that rises from
 * the bottom of the card. Moving the mouse across the card scrubs the
 * recording; the accent rule along the screen's edge is the playhead.
 */
export function WorkCard({
  project,
  headingLevel = 'h2',
  className,
}: {
  project: StudioProject;
  headingLevel?: 'h2' | 'h3';
  className?: string;
}) {
  const { videoRef, barRef, areaRef, pointerHandlers, focusHandlers } = useScrubVideo();
  const Heading = headingLevel;

  return (
    <div
      ref={areaRef}
      {...pointerHandlers}
      {...focusHandlers}
      className={cn(
        'group relative flex aspect-[4/5] flex-col overflow-hidden rounded-[var(--studio-radius)] bg-[var(--studio-screen)] text-white',
        'has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-[var(--studio-accent)] has-[a:focus-visible]:ring-offset-2',
        className
      )}
    >
      <div className="relative z-20 flex justify-center pt-5 lg:pt-6">
        <span className="studio-pill border-white/60">Work</span>
      </div>

      <div className="relative z-20 px-6 pt-5 text-center lg:px-8 lg:pt-7">
        <Heading className="font-sans text-3xl leading-[1.05] tracking-[-0.02em] lg:text-[40px]">
          <Link
            href={`/studio/work/${project.slug}`}
            className="after:absolute after:inset-0 after:z-30 after:content-[''] focus-visible:outline-none"
          >
            {project.name}
          </Link>
        </Heading>
        <p className="mt-2 font-sans text-sm text-white/70 lg:text-[15px]">{project.sector}</p>
      </div>

      <div className="absolute inset-x-5 bottom-0 top-[40%] overflow-hidden rounded-t-xl bg-black ring-1 ring-white/10 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 lg:inset-x-7">
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="metadata"
          poster={project.preview.poster}
          aria-hidden="true"
          tabIndex={-1}
          className="h-full w-full object-cover object-top"
        >
          <source src={project.preview.mp4} type="video/mp4" />
        </video>
        <span
          ref={barRef}
          aria-hidden="true"
          style={{ transform: 'scaleX(0)' }}
          className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-[var(--studio-accent)]"
        />
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-6 z-20 hidden font-sans text-[13px] text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 xl:block"
      >
        Move across to scrub
      </span>
    </div>
  );
}
