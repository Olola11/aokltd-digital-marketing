'use client';

import { useState } from 'react';
import { ArrowRight, Check, Compass, Palette } from 'lucide-react';
import { SHOWCASE_SERVICES, ServiceItem } from '@/data/showcase-data';

interface ServicesSpotlightProps {
  onSelectServiceToEnquire: (serviceName: string) => void;
}

export function ServicesSpotlight({
  onSelectServiceToEnquire,
}: ServicesSpotlightProps) {
  const [activeCluster, setActiveCluster] = useState<'All' | 'Craft' | 'Strategy'>('All');
  const [activeServiceId, setActiveServiceId] = useState<string>('web-design');

  const filteredServices =
    activeCluster === 'All'
      ? SHOWCASE_SERVICES
      : SHOWCASE_SERVICES.filter((s) => s.cluster === activeCluster);

  const activeService =
    SHOWCASE_SERVICES.find((s) => s.id === activeServiceId) || SHOWCASE_SERVICES[0];

  return (
    <section
      id="services-section"
      aria-labelledby="services-heading"
      className="py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-[#EEF0FB]/50 border-t border-b border-[#00008A]/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#4A8FE1] uppercase">
              Capabilities
            </span>
          </div>
          <h2
            id="services-heading"
            className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-[#00008A] tracking-tight leading-[1.15]"
          >
            Capabilities designed to make brands impossible to ignore.
          </h2>
          <p className="font-serif text-base sm:text-lg text-[#00008A]/70 mt-4 leading-relaxed">
            We operate at the intersection of brand identity, high-performance web systems, and moving imagery. Every engagement combines aesthetic discipline with strategic business intent.
          </p>

          {/* Cluster Filter Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 mt-8">
            <button
              onClick={() => setActiveCluster('All')}
              className={`font-sans text-xs sm:text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCluster === 'All'
                  ? 'bg-[#00008A] text-white shadow-sm'
                  : 'bg-white text-[#00008A]/70 border border-[#00008A]/10 hover:border-[#4A8FE1]'
              }`}
            >
              All Capabilities (10)
            </button>
            <button
              onClick={() => setActiveCluster('Craft')}
              className={`inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCluster === 'Craft'
                  ? 'bg-[#00008A] text-white shadow-sm'
                  : 'bg-white text-[#00008A]/70 border border-[#00008A]/10 hover:border-[#4A8FE1]'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-[#4A8FE1]" />
              <span>Craft (8)</span>
            </button>
            <button
              onClick={() => setActiveCluster('Strategy')}
              className={`inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCluster === 'Strategy'
                  ? 'bg-[#00008A] text-white shadow-sm'
                  : 'bg-white text-[#00008A]/70 border border-[#00008A]/10 hover:border-[#4A8FE1]'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#4A8FE1]" />
              <span>Strategy (2)</span>
            </button>
          </div>
        </div>

        {/* Services Index + Visual Spotlight Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Service Index */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            {filteredServices.map((service: ServiceItem) => {
              const isActive = service.id === activeServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 flex items-center justify-between group ${
                    isActive
                      ? 'bg-white shadow-[0_8px_30px_rgba(0,0,138,0.06)] border border-[#4A8FE1]/40 translate-x-1'
                      : 'bg-white/60 hover:bg-white/90 border border-transparent hover:border-[#00008A]/10'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        isActive
                          ? 'bg-[#4A8FE1] scale-125'
                          : 'bg-[#00008A]/20 group-hover:bg-[#00008A]/50'
                      }`}
                    />
                    <div>
                      <h3
                        className={`font-sans text-base sm:text-lg font-semibold transition-colors duration-200 ${
                          isActive ? 'text-[#00008A]' : 'text-[#00008A]/75 group-hover:text-[#00008A]'
                        }`}
                      >
                        {service.name}
                      </h3>
                      <span className="font-sans text-[11px] text-[#6666B8] tracking-wider uppercase">
                        {service.cluster}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-all duration-200 ${
                      isActive
                        ? 'text-[#4A8FE1] opacity-100 translate-x-0'
                        : 'text-[#00008A]/30 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Anchored Visual Spotlight Panel */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#00008A]/10 shadow-[0_12px_40px_rgba(0,0,138,0.04)] overflow-hidden relative">
              {/* Subtle ambient lighting accent corresponding to service */}
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-20 -mr-20 -mt-20 blur-3xl transition-colors duration-500"
                style={{ backgroundColor: activeService.visualAccent }}
              />

              {/* Cluster badge & ID */}
              <div className="flex items-center justify-between pb-6 border-b border-[#00008A]/10">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EEF0FB] text-[#00008A] font-sans text-xs font-semibold uppercase tracking-wider">
                  {activeService.cluster} Pillar
                </span>
                <span className="font-sans text-xs text-[#6666B8] tracking-widest uppercase">
                  Service 0{SHOWCASE_SERVICES.findIndex((s) => s.id === activeService.id) + 1}
                </span>
              </div>

              {/* Anchored Title & Dynamic Tagline */}
              <div className="pt-6 min-h-[140px]">
                <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#00008A] tracking-tight">
                  {activeService.name}
                </h3>
                <p className="font-serif italic text-base sm:text-lg text-[#4A8FE1] mt-1.5 font-medium">
                  &ldquo;{activeService.tagline}&rdquo;
                </p>
                <p className="font-serif text-sm sm:text-base text-[#00008A]/75 mt-4 leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              {/* Core Deliverables Matrix */}
              <div className="mt-8 pt-6 border-t border-[#00008A]/10">
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#00008A]/60 mb-4">
                  Standard Studio Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#EEF0FB]/60 border border-[#00008A]/5 font-sans text-xs sm:text-sm text-[#00008A]/85"
                    >
                      <Check className="w-3.5 h-3.5 text-[#4A8FE1] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action row */}
              <div className="mt-10 pt-6 border-t border-[#00008A]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="font-serif text-xs text-[#6666B8]">
                  Available as standalone engagement or full product suite.
                </div>
                <button
                  onClick={() => onSelectServiceToEnquire(activeService.name)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#00008A] text-white font-sans text-xs sm:text-sm font-semibold hover:bg-[#000066] active:scale-[0.98] transition-all duration-200"
                >
                  <span>Enquire for {activeService.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#4A8FE1]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
