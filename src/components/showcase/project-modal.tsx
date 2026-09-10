'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';
import { Project } from '@/data/showcase-data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

export function ProjectModal({
  project,
  onClose,
  onOpenEnquiry,
}: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#000066]/70 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#00008A]/10 text-[#00008A] showcase-scroll"
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-10 py-5 bg-white/95 backdrop-blur-md border-b border-[#00008A]/10">
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.brandColor }}
            />
            <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#00008A] uppercase">
              {project.category}
            </span>
            <span className="text-[#6666B8]">&middot;</span>
            <span className="font-sans text-xs text-[#6666B8]">{project.year}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project details"
            className="p-2 rounded-full text-[#00008A]/60 hover:text-[#00008A] hover:bg-[#EEF0FB] transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-12">
          {/* Title & Tagline */}
          <div>
            <h2
              id="project-modal-title"
              className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#00008A]"
            >
              {project.name}
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-[#4A8FE1] mt-2 font-medium">
              &ldquo;{project.tagline}&rdquo;
            </p>
          </div>

          {/* Primary High-Resolution Hero Visual */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-[#00008A]/10 bg-slate-900">
            <Image
              src={project.image}
              alt={`${project.name} case study overview`}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white text-xs font-sans">
              <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                Primary Architecture &middot; {project.year}
              </span>
              <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 hidden sm:inline">
                Verified Production Work
              </span>
            </div>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="p-6 rounded-2xl bg-[#EEF0FB]/60 border border-[#00008A]/5">
              <span className="font-sans text-xs font-bold tracking-widest text-[#00008A]/60 uppercase block mb-2">
                01. The Challenge
              </span>
              <p className="font-serif text-sm sm:text-base text-[#00008A]/80 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#EEF0FB]/60 border border-[#00008A]/5">
              <span className="font-sans text-xs font-bold tracking-widest text-[#4A8FE1] uppercase block mb-2">
                02. The Creative Solution
              </span>
              <p className="font-serif text-sm sm:text-base text-[#00008A]/80 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Stats Bar */}
          {project.stats && project.stats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {project.stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border border-[#00008A]/10 bg-white shadow-sm"
                >
                  <span className="font-sans text-2xl sm:text-3xl font-bold text-[#00008A] block tracking-tight">
                    {stat.value}
                  </span>
                  <span className="font-sans text-xs text-[#6666B8] uppercase tracking-wider mt-1 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Deliverables Suite */}
          <div className="pt-2">
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-[#00008A]/70 mb-4">
              Scope of Delivery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#00008A]/10 text-xs sm:text-sm font-sans font-medium text-[#00008A]"
                >
                  <CheckCircle className="w-4 h-4 text-[#4A8FE1] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Project Gallery Images */}
          {project.secondaryImages && project.secondaryImages.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-[#00008A]/70">
                Production Artifacts &amp; Stills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.secondaryImages.map((imgSrc, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#00008A]/10 shadow-sm bg-slate-100"
                  >
                    <Image
                      src={imgSrc}
                      alt={`${project.name} preview still ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Conversion Action */}
          <div className="pt-8 border-t border-[#00008A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-sans text-[#6666B8]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct AOK Ltd Studio Engagement</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenEnquiry(project.name);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#00008A] text-white font-sans text-sm font-semibold rounded-full hover:bg-[#000066] active:scale-[0.98] transition-all duration-200 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#4A8FE1]" />
                <span>Enquire About Similar Work</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
