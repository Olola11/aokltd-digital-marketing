'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ShowcaseHeaderProps {
  onOpenEnquiry: () => void;
}

export function ShowcaseHeader({ onOpenEnquiry }: ShowcaseHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-[#00008A]/10 shadow-[0_4px_20px_rgba(0,0,138,0.03)] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
        {/* Studio Logo Mark (Self-contained, NO link to homepage) */}
        <div
          className="flex items-center gap-3 cursor-default select-none group"
          title="Apotheosis of Knowledge Studio Portfolio"
        >
          {/* Custom geometric AOK insignia mark */}
          <div className="relative w-8 h-8 rounded-lg bg-[#00008A] flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Ascending elevation diamond & triangle mark */}
              <path
                d="M12 2L20 10L12 18L4 10L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 7L16 11L12 15L8 11L12 7Z"
                fill="#4A8FE1"
              />
              <circle cx="12" cy="11" r="1.5" fill="white" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-sans text-xs font-bold tracking-[0.18em] text-[#00008A] uppercase">
              AOK Studio
            </span>
            <span className="font-sans text-[10px] tracking-[0.14em] text-[#6666B8] uppercase">
              Exhibition &middot; Reel
            </span>
          </div>
        </div>

        {/* Center Pill: Curated Status / Mode */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF0FB]/80 border border-[#00008A]/8 text-[11px] font-sans text-[#00008A]/70">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#4A8FE1] animate-pulse"
            aria-hidden="true"
          />
          <span className="font-medium tracking-wide">Creative Services Portfolio</span>
        </div>

        {/* Single Primary CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenEnquiry}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00008A] text-white font-sans text-xs sm:text-sm font-semibold hover:bg-[#000066] active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#4A8FE1] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Thin Cornflower Accent Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[#4A8FE1] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
    </header>
  );
}
