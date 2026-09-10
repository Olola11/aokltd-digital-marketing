'use client';

import { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface ElevationHeroProps {
  onOpenEnquiry: () => void;
  onExploreWork: () => void;
}

export function ElevationHero({ onOpenEnquiry, onExploreWork }: ElevationHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Bespoke Elevation Generative Visual:
  // Luminous geometric arcs and points gently ascending and resolving into harmonic structure
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Harmonic elevation arcs
    const layers = [
      { radius: 180, speed: 0.0008, angle: 0, color: 'rgba(74, 143, 225, 0.28)', width: 1.5 },
      { radius: 260, speed: -0.0006, angle: 1.2, color: 'rgba(102, 102, 184, 0.22)', width: 1.2 },
      { radius: 340, speed: 0.0005, angle: 2.4, color: 'rgba(0, 0, 138, 0.15)', width: 1.0 },
      { radius: 420, speed: -0.0003, angle: 3.6, color: 'rgba(74, 143, 225, 0.12)', width: 0.8 },
      { radius: 500, speed: 0.0002, angle: 4.8, color: 'rgba(238, 240, 251, 0.65)', width: 0.8 },
    ];

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.72;
      const centerY = height * 0.48;

      // Draw subtle ambient luminous gradient behind the elevation apex
      const radialGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        width * 0.5
      );
      radialGrad.addColorStop(0, 'rgba(74, 143, 225, 0.14)');
      radialGrad.addColorStop(0.4, 'rgba(102, 102, 184, 0.06)');
      radialGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Render ascending geometric arcs that form a mathematical elevation horizon
      layers.forEach((layer, idx) => {
        if (!prefersReducedMotion) {
          layer.angle += layer.speed;
        }

        ctx.beginPath();
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = layer.width;

        const startAngle = layer.angle;
        const endAngle = startAngle + Math.PI * 1.35;

        // Subtle vertical undulating elevation wave
        const yOffset = Math.sin(t * 0.0015 + idx) * 8;

        ctx.arc(centerX, centerY + yOffset, layer.radius, startAngle, endAngle);
        ctx.stroke();

        // Apex coordinate dot
        const dotX = centerX + Math.cos(endAngle) * layer.radius;
        const dotY = centerY + yOffset + Math.sin(endAngle) * layer.radius;

        ctx.beginPath();
        ctx.fillStyle = idx === 0 ? '#4A8FE1' : 'rgba(102, 102, 184, 0.5)';
        ctx.arc(dotX, dotY, idx === 0 ? 3 : 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle upward ascending alignment line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(74, 143, 225, 0.2)';
      ctx.setLineDash([4, 6]);
      ctx.moveTo(centerX, height * 0.9);
      ctx.lineTo(centerX, height * 0.1);
      ctx.stroke();
      ctx.setLineDash([]);

      t++;
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      aria-label="Hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 px-5 sm:px-8 md:px-12 overflow-hidden"
    >
      {/* Background Generative Elevation Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full opacity-90 transition-opacity duration-1000"
        />
        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-3/5" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        {/* Editorial Subhead / Position Indicator */}
        <div className="inline-flex items-center gap-2 mb-6 sm:mb-8">
          <div className="w-6 h-[1.5px] bg-[#4A8FE1]" />
          <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.28em] text-[#6666B8] uppercase">
            Apotheosis of Knowledge &middot; Creative Services
          </span>
        </div>

        {/* Primary Positioning Statement */}
        <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#00008A] leading-[1.08] max-w-4xl">
          We create brands, digital experiences, and visual stories that{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00008A] via-[#4A8FE1] to-[#6666B8]">
            make people pay attention.
          </span>
        </h1>

        {/* Subtitle / Philosophy */}
        <p className="mt-6 sm:mt-8 font-serif text-lg sm:text-xl md:text-2xl text-[#00008A]/75 max-w-2xl leading-relaxed">
          AOK Ltd does not merely tell clients that it can build compelling digital experiences. It lets the experience demonstrate that capability.
        </p>

        {/* Actions Row */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
          <button
            onClick={onOpenEnquiry}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#00008A] text-white font-sans text-sm sm:text-base font-semibold hover:bg-[#000066] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[#4A8FE1]" />
            <span>Start a Project</span>
          </button>

          <button
            onClick={onExploreWork}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#EEF0FB] text-[#00008A] font-sans text-sm sm:text-base font-medium hover:bg-[#E0E4F8] active:scale-[0.98] transition-all duration-200"
          >
            <span>Explore The Reel</span>
            <ArrowDown className="w-4 h-4 text-[#4A8FE1]" />
          </button>
        </div>

        {/* Quick capability proof tags */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#00008A]/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <span className="block font-sans text-xs text-[#6666B8] uppercase tracking-wider">
              Discipline
            </span>
            <span className="font-sans text-sm font-semibold text-[#00008A] mt-1 block">
              Editorial Art Direction
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs text-[#6666B8] uppercase tracking-wider">
              Engineering
            </span>
            <span className="font-sans text-sm font-semibold text-[#00008A] mt-1 block">
              High-Performance Web
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs text-[#6666B8] uppercase tracking-wider">
              Storytelling
            </span>
            <span className="font-sans text-sm font-semibold text-[#00008A] mt-1 block">
              Motion &amp; Video Cinema
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs text-[#6666B8] uppercase tracking-wider">
              Delivery
            </span>
            <span className="font-sans text-sm font-semibold text-[#00008A] mt-1 block">
              Lagos &middot; London &middot; Global
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between pt-6 text-[11px] font-sans text-[#6666B8] uppercase tracking-widest">
        <span>Curated Works 2024–2026</span>
        <button
          onClick={onExploreWork}
          className="flex items-center gap-1.5 hover:text-[#00008A] transition-colors focus:outline-none"
        >
          <span>Scroll to Discover</span>
          <ArrowDown className="w-3 h-3 text-[#4A8FE1] animate-bounce" />
        </button>
      </div>
    </section>
  );
}
