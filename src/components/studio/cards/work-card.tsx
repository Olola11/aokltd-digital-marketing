'use client';

import Link from 'next/link';
import type { StudioProject } from '@/data/studio/projects';
import { cn } from '@/lib/utils';
import { useScrubVideo } from '../video/use-scrub-video';

/** Shown only on touch screens, where there is no hover to discover scrubbing. */
function TouchHint() {
  return (
    <span
      aria-hidden="true"
      className="mt-1.5 block font-sans text-xs text-white/55 [@media(hover:hover)]:hidden"
    >
      Drag sideways to scrub
    </span>
  );
}

/**
 * WorkCard — the live site, recorded, shown whole in a 16:10 screen (the
 * recording's own shape, so nothing is cropped). Moving the mouse, or
 * dragging a finger sideways, scrubs the recording; the accent rule is the
 * playhead. Phones get a 960px rendition; larger screens the 1920px one.
 */
export function WorkCard({
  project,
  headingLevel = 'h2',
  showName = true,
  className,
}: {
  project: StudioProject;
  headingLevel?: 'h2' | 'h3';
  /** Off on the hub, where the clients logo wall already names each client */
  showName?: boolean;
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
        'group relative flex touch-pan-y flex-col overflow-hidden rounded-[var(--studio-radius)] bg-[var(--studio-screen)] px-4 pb-4 pt-5 text-white lg:px-6 lg:pb-6 lg:pt-6',
        'has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-[var(--studio-accent)] has-[a:focus-visible]:ring-offset-2',
        className
      )}
    >
      <div className="relative z-20 flex justify-center">
        <span className="studio-pill border-white/60">Work</span>
      </div>

      {showName ? (
        <div className="relative z-20 px-2 pb-6 pt-5 text-center lg:pb-8 lg:pt-7">
          <Heading className="font-sans text-3xl leading-[1.05] tracking-[-0.02em] lg:text-[40px]">
            <Link
              href={`/studio/work/${project.slug}`}
              className="after:absolute after:inset-0 after:z-30 after:content-[''] focus-visible:outline-none"
            >
              {project.name}
            </Link>
          </Heading>
          <p className="mt-2 font-sans text-sm text-white/70 lg:text-[15px]">{project.sector}</p>
          <TouchHint />
        </div>
      ) : (
        <div className="relative z-20 px-2 pb-5 pt-4 text-center lg:pb-6 lg:pt-5">
          <p className="font-sans text-sm text-white/70 lg:text-[15px]">
            {/* The accessible name begins with the visible text (WCAG 2.5.3, so voice
                control users can say what they see) and adds the client's name. */}
            <Link
              href={`/studio/work/${project.slug}`}
              aria-label={`${project.sector}: ${project.name} case study`}
              className="after:absolute after:inset-0 after:z-30 after:content-[''] focus-visible:outline-none"
            >
              {project.sector}
            </Link>
          </p>
          <TouchHint />
        </div>
      )}

      <div
        style={{ aspectRatio: `${project.preview.width} / ${project.preview.height}` }}
        className="relative mt-auto w-full overflow-hidden rounded-xl bg-black ring-1 ring-white/10 transition-transform duration-500 ease-out group-hover:-translate-y-1"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="metadata"
          poster={project.preview.poster}
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-contain"
        >
          <source src={project.preview.mp4Sm} type="video/mp4" media="(max-width: 767px)" />
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
