'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  Film,
  Sparkles,
} from 'lucide-react';
import { SHOWCASE_PROJECTS, Project } from '@/data/showcase-data';

interface WorkReelProps {
  onOpenProjectModal: (project: Project) => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

export function WorkReel({
  onOpenProjectModal,
  onOpenEnquiry,
}: WorkReelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const activeProject = SHOWCASE_PROJECTS[activeIndex];

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % SHOWCASE_PROJECTS.length);
    setTimeout(() => setIsTransitioning(false), 550);
  }, []);

  const goToPrev = useCallback(() => {
    setIsTransitioning(true);
    setActiveIndex(
      (prev) => (prev - 1 + SHOWCASE_PROJECTS.length) % SHOWCASE_PROJECTS.length
    );
    setTimeout(() => setIsTransitioning(false), 550);
  }, []);

  const selectProject = useCallback((idx: number) => {
    setIsTransitioning(true);
    setActiveIndex(idx);
    setTimeout(() => setIsTransitioning(false), 550);
  }, []);

  // Keyboard navigation: Left/Right arrows, 1-5 keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const num = parseInt(e.key, 10) - 1;
        if (num < SHOWCASE_PROJECTS.length) {
          selectProject(num);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, selectProject]);

  // Autoplay handler (Default OFF)
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      goToNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying, goToNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  return (
    <section
      id="the-reel"
      aria-labelledby="reel-heading"
      className="py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <Film className="w-3.5 h-3.5 text-[#4A8FE1]" />
              <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#4A8FE1] uppercase">
                The AOK Reel
              </span>
            </div>
            <h2
              id="reel-heading"
              className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-[#00008A] tracking-tight leading-[1.1]"
            >
              The work is the proof.
            </h2>
            <p className="font-serif text-base sm:text-lg text-[#00008A]/70 mt-3 leading-relaxed">
              Step through our cinematic reel of actual client platforms and bespoke digital environments. Each project is crafted with genuine production assets.
            </p>
          </div>

          {/* Autoplay & Keyboard Controls Hint */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause reel autoplay' : 'Start reel autoplay'}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs font-semibold transition-all duration-200 ${
                isPlaying
                  ? 'bg-[#4A8FE1] text-white shadow-sm'
                  : 'bg-[#EEF0FB] text-[#00008A] hover:bg-[#E0E4F8]'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Autoplay Active</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Reel</span>
                </>
              )}
            </button>

            <span className="hidden lg:inline text-[11px] font-sans text-[#6666B8]">
              Use &larr; &rarr; or keys 1–5
            </span>
          </div>
        </div>

        {/* Central Cinematic Screen Container */}
        <div
          className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-[0_25px_60px_rgba(0,0,138,0.12)] border border-[#00008A]/15"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Ambient Lighting Backdrop */}
          <div
            className="ambient-glow absolute -inset-20 rounded-full"
            style={{ backgroundColor: activeProject.brandColor }}
          />

          {/* Grain texture */}
          <div className="absolute inset-0 cinema-grain z-10" />

          {/* Cinema Frame (16:9 on desktop, responsive height on mobile) */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            {/* Active Project Screenshot with Trailer Cut Transition */}
            <div
              key={activeProject.slug}
              className={`relative w-full h-full ${
                isTransitioning ? 'opacity-80 scale-[1.02]' : 'opacity-100 scale-100'
              } transition-all duration-500 ease-out`}
            >
              <Image
                src={activeProject.image}
                alt={`${activeProject.name} — ${activeProject.category}`}
                fill
                priority
                className="object-cover object-center filter brightness-[0.92] contrast-[1.05]"
                sizes="(max-width: 1400px) 100vw, 1400px"
              />

              {/* Cinema vignette gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/50 pointer-events-none" />
            </div>

            {/* Anchored Project Details Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 md:p-14 pointer-events-none">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-[#4A8FE1] uppercase">
                    Project 0{activeIndex + 1}
                  </span>
                  <span className="text-white/40">&middot;</span>
                  <span className="font-sans text-xs sm:text-sm font-medium tracking-wide text-white/80">
                    {activeProject.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeProject.brandColor }}
                  />
                  <span className="font-sans text-xs text-white/70 tracking-widest uppercase hidden sm:inline">
                    {activeProject.year}
                  </span>
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="max-w-3xl pointer-events-auto">
                <h3 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  {activeProject.name}
                </h3>
                <p className="font-serif italic text-sm sm:text-lg text-white/85 mt-2 max-w-2xl leading-relaxed">
                  &ldquo;{activeProject.tagline}&rdquo;
                </p>

                {/* Primary project actions */}
                <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => onOpenProjectModal(activeProject)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#00008A] font-sans text-xs sm:text-sm font-bold hover:bg-[#EEF0FB] active:scale-[0.98] transition-all duration-200 shadow-md"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#4A8FE1]" />
                    <span>View Case Study</span>
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(activeProject.name)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 font-sans text-xs sm:text-sm font-medium hover:bg-white/25 active:scale-[0.98] transition-all duration-200"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#4A8FE1]" />
                    <span>Start Similar Project</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Left/Right Floating Navigation Arrows */}
            <button
              onClick={goToPrev}
              aria-label="Previous reel project"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all duration-200 active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next reel project"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all duration-200 active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Film Reel Scrubber & Index */}
          <div className="border-t border-white/10 bg-black/60 backdrop-blur-md p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {SHOWCASE_PROJECTS.map((proj: Project, idx: number) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={proj.slug}
                    onClick={() => selectProject(idx)}
                    className={`text-left p-3 rounded-2xl transition-all duration-200 flex flex-col justify-between border ${
                      isActive
                        ? 'bg-white/15 border-[#4A8FE1] shadow-sm'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span
                        className={`font-sans text-xs font-bold tracking-widest ${
                          isActive ? 'text-[#4A8FE1]' : 'text-white/40'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: proj.brandColor }}
                      />
                    </div>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-white truncate block">
                      {proj.name}
                    </span>
                    <span className="font-sans text-[10px] text-white/50 truncate block mt-0.5">
                      {proj.category.split('·')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
