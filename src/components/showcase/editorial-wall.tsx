'use client';

import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { SHOWCASE_PROJECTS, Project } from '@/data/showcase-data';

interface EditorialWallProps {
  onOpenProjectModal: (project: Project) => void;
}

export function EditorialWall({ onOpenProjectModal }: EditorialWallProps) {
  const directRent = SHOWCASE_PROJECTS.find((p) => p.slug === 'directrent')!;
  const theVault = SHOWCASE_PROJECTS.find((p) => p.slug === 'the-vault')!;
  const aokHq = SHOWCASE_PROJECTS.find((p) => p.slug === 'aok-hq')!;
  const motionEngine = SHOWCASE_PROJECTS.find((p) => p.slug === 'motion-engine')!;
  const directRentMobile = SHOWCASE_PROJECTS.find((p) => p.slug === 'directrent-mobile')!;

  return (
    <section
      id="editorial-wall"
      aria-labelledby="wall-heading"
      className="py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-[#EEF0FB]/40 border-t border-[#00008A]/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#4A8FE1]" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#4A8FE1] uppercase">
              Exhibition Wall
            </span>
          </div>
          <h2
            id="wall-heading"
            className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-[#00008A] tracking-tight leading-[1.15]"
          >
            Curated Works &amp; Case Studies
          </h2>
          <p className="font-serif text-base sm:text-lg text-[#00008A]/70 mt-3 leading-relaxed">
            Every project exhibited below represents production-ready architecture designed, built, and directed by AOK Ltd. Tap any work to view in-depth case study notes.
          </p>
        </div>

        {/* Editorial Masonry Grid (Art-directed scale, rhythm, and weight) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: DirectRent.ng (Large 7-col Wide Feature) */}
          <div
            onClick={() => onOpenProjectModal(directRent)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenProjectModal(directRent)}
            className="md:col-span-7 group relative min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_30px_rgba(0,0,138,0.06)] border border-[#00008A]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <Image
              src={directRent.image}
              alt={directRent.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                {/* Reference style pill badge */}
                <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-xs font-sans font-medium text-white tracking-wider">
                  PropTech &middot; Marketplace
                </span>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-[#D4A853] transition-colors">
                  {directRent.name}
                </h3>
                <p className="font-serif italic text-sm sm:text-base text-white/80 mt-2 max-w-md line-clamp-2">
                  &ldquo;{directRent.tagline}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs font-sans text-white/60">
                  <span>{directRent.category}</span>
                  <span>&middot;</span>
                  <span>{directRent.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: The Vault at AOK (5-col Editorial Pillar) */}
          <div
            onClick={() => onOpenProjectModal(theVault)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenProjectModal(theVault)}
            className="md:col-span-5 group relative min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_30px_rgba(0,0,138,0.06)] border border-[#00008A]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <Image
              src={theVault.image}
              alt={theVault.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-xs font-sans font-medium text-white tracking-wider">
                  Knowledge Platform
                </span>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#4A8FE1] transition-colors">
                  {theVault.name}
                </h3>
                <p className="font-serif italic text-sm text-white/80 mt-1.5 max-w-sm line-clamp-2">
                  &ldquo;{theVault.tagline}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs font-sans text-white/60">
                  <span>UI/UX &middot; Architecture</span>
                  <span>&middot;</span>
                  <span>{theVault.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: AOK HQ (5-col Broadsheet Exhibition) */}
          <div
            onClick={() => onOpenProjectModal(aokHq)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenProjectModal(aokHq)}
            className="md:col-span-5 group relative min-h-[360px] sm:min-h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_30px_rgba(0,0,138,0.06)] border border-[#00008A]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <Image
              src={aokHq.image}
              alt={aokHq.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00008A]/90 via-[#00008A]/50 to-transparent" />

            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-xs font-sans font-medium text-white tracking-wider">
                  Institutional Platform
                </span>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#4A8FE1] transition-colors">
                  {aokHq.name}
                </h3>
                <p className="font-serif italic text-sm text-white/80 mt-1.5 line-clamp-2">
                  &ldquo;{aokHq.tagline}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs font-sans text-white/60">
                  <span>Web Architecture</span>
                  <span>&middot;</span>
                  <span>{aokHq.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: AOK Motion Engine (4-col Cinema Card) */}
          <div
            onClick={() => onOpenProjectModal(motionEngine)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenProjectModal(motionEngine)}
            className="md:col-span-4 group relative min-h-[360px] sm:min-h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_30px_rgba(0,0,138,0.06)] border border-[#00008A]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <Image
              src={motionEngine.image}
              alt={motionEngine.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 35vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B]/90 via-black/40 to-transparent" />

            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-xs font-sans font-medium text-white tracking-wider">
                  Motion Cinema
                </span>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                  {motionEngine.name}
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-white/80 mt-1.5 line-clamp-2">
                  &ldquo;{motionEngine.tagline}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-sans text-white/60">
                  <span>Remotion &middot; 4K Output</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: DirectRent Mobile (3-col Native App Card) */}
          <div
            onClick={() => onOpenProjectModal(directRentMobile)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenProjectModal(directRentMobile)}
            className="md:col-span-3 group relative min-h-[360px] sm:min-h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_30px_rgba(0,0,138,0.06)] border border-[#00008A]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <Image
              src={directRentMobile.image}
              alt={directRentMobile.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-xs font-sans font-medium text-white tracking-wider">
                  Mobile App
                </span>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  {directRentMobile.name}
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-white/80 mt-1 line-clamp-2">
                  &ldquo;{directRentMobile.tagline}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-sans text-white/60">
                  <span>iOS &middot; Android</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
