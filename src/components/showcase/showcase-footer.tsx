'use client';

import { Sparkles, Mail, ShieldCheck } from 'lucide-react';

interface ShowcaseFooterProps {
  onOpenEnquiry: () => void;
}

export function ShowcaseFooter({ onOpenEnquiry }: ShowcaseFooterProps) {
  return (
    <footer
      aria-label="Footer"
      className="relative bg-gradient-to-b from-[#00008A] to-[#000066] text-white pt-24 sm:pt-32 pb-16 px-5 sm:px-8 md:px-12 overflow-hidden"
    >
      {/* Background radial accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#4A8FE1]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Subhead indicator */}
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-sans font-semibold tracking-[0.25em] text-[#C9CFF2] uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#4A8FE1]" />
          <span>Start a Project</span>
        </span>

        {/* Closing Pitch Headline */}
        <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] max-w-3xl mx-auto">
          If this is how we present our own work, imagine what we will do for your brand.
        </h2>

        {/* Pitch Body */}
        <p className="font-serif text-lg sm:text-xl text-[#C9CFF2] mt-6 max-w-2xl mx-auto leading-relaxed">
          We take on a limited number of creative engagements each quarter to preserve our standard of craft. Let’s talk about your vision.
        </p>

        {/* Primary Conversion Button: Let's Talk */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenEnquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-white text-[#00008A] font-sans text-sm sm:text-base font-bold hover:bg-[#EEF0FB] active:scale-[0.98] transition-all duration-200 shadow-xl"
          >
            <span>Let’s Talk</span>
            <Sparkles className="w-4 h-4 text-[#4A8FE1]" />
          </button>

          <a
            href="mailto:hello@aokltd.org?subject=Creative%20Services%20Enquiry"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 text-white border border-white/20 font-sans text-sm sm:text-base font-medium hover:bg-white/20 active:scale-[0.98] transition-all duration-200"
          >
            <Mail className="w-4 h-4 text-[#4A8FE1]" />
            <span>hello@aokltd.org</span>
          </a>
        </div>

        {/* Studio Legal Anchor & Permanence (No Sitemap, No Internal Doors) */}
        <div className="mt-24 pt-10 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-sans text-[#C9CFF2]/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#4A8FE1]" />
            <span>
              Apotheosis of Knowledge Limited &middot; Registered Company RC 1956161
            </span>
          </div>

          <div>
            <span>Lagos &middot; London &middot; Global Digital Presence</span>
          </div>

          <div>
            <span>&copy; {new Date().getFullYear()} AOK Ltd. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
