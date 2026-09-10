'use client';

import { Pause, Play } from 'lucide-react';
import type { StudioProject } from '@/data/studio/projects';
import { useScrubVideo } from '../video/use-scrub-video';

/** The full-width recording on a case study page, with a visible pause control. */
export function CaseVideo({ project }: { project: StudioProject }) {
  const { videoRef, barRef, areaRef, playing, toggle, pointerHandlers } = useScrubVideo({ autoplayWithMouse: true });

  return (
    <figure>
      <div
        ref={areaRef}
        {...pointerHandlers}
        className="relative overflow-hidden rounded-[var(--studio-radius)] bg-[var(--studio-screen)] p-2 sm:p-3 lg:p-5"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black">
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            preload="metadata"
            poster={project.preview.poster}
            aria-label={`Screen recording of ${project.preview.source}, scrolling down the page`}
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
        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-5 right-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 font-sans text-sm text-[var(--studio-ink)] transition-colors duration-200 hover:bg-white lg:bottom-9 lg:right-9"
        >
          {playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
      <figcaption className="mt-3 font-sans text-sm text-[var(--studio-ink-soft)] lg:text-[15px]">
        Recorded from the live site at {project.preview.source}. Move your pointer across the frame to scrub.
      </figcaption>
    </figure>
  );
}
