'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

// ─── Component ──────────────────────────────────────────────────

export function CurtainHero({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // ── Desktop curtain halves split apart ──
  const topY = useTransform(scrollYProgress, [0, 0.45], ['0%', '-100%']);
  const bottomY = useTransform(scrollYProgress, [0, 0.45], ['0%', '100%']);

  // ── Mobile: simple fade + slide ──
  const mobileOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const mobileSlide = useTransform(scrollYProgress, [0, 0.4], ['0px', '-50px']);

  // ── Revealed content emerges ──
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.1, 0.4], [0.97, 1]);

  // ── Scroll indicator disappears quickly ──
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[150vh] md:h-[250vh]">
      {/* Sticky viewport — below fixed nav (h-16 = 4rem) */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden bg-white">

        {/* ═══ Revealed layer (behind curtain, z-0) ═══ */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: contentOpacity, scale: contentScale }}
        >
          {children}
        </motion.div>

        {/* ═══ DESKTOP: Split curtain — Logo top, Title bottom ═══ */}

        {/* Top curtain — Brand Logo */}
        <motion.div
          className="hidden md:flex absolute top-0 left-0 right-0 h-1/2 bg-white z-10 items-end justify-center"
          style={{
            y: topY,
            boxShadow: '0 4px 30px rgba(0,0,139,0.06)',
          }}
        >
          <motion.div
            className="pb-2 sm:pb-3"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/logo/Apotheosis of Knowledge LOGO PNG-15.png"
              alt="Apotheosis of Knowledge"
              width={160}
              height={160}
              priority
              className="w-[120px] h-[120px] lg:w-[160px] lg:h-[160px]"
            />
          </motion.div>
        </motion.div>

        {/* Bottom curtain — Brand Title */}
        <motion.div
          className="hidden md:flex absolute bottom-0 left-0 right-0 h-1/2 bg-white z-10 flex-col items-center justify-start"
          style={{
            y: bottomY,
            boxShadow: '0 -4px 30px rgba(0,0,139,0.06)',
          }}
        >
          <motion.div
            className="pt-2 text-center px-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h1 className="font-sans text-2xl md:text-3xl lg:text-[2.5rem] font-bold text-[#00008B] tracking-[0.06em] uppercase">
              Apotheosis of Knowledge
            </h1>
            <p className="font-serif text-sm md:text-base text-[#00008B]/45 italic mt-2">
              Elevating curiosity. Countering noise.
            </p>
          </motion.div>
        </motion.div>

        {/* ═══ MOBILE: Unified masthead — fades on scroll ═══ */}
        <motion.div
          className="md:hidden absolute inset-0 z-10 bg-white flex flex-col items-center justify-center px-6 pointer-events-none"
          style={{ opacity: mobileOpacity, y: mobileSlide }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4"
          >
            <Image
              src="/images/logo/Apotheosis of Knowledge LOGO PNG-15.png"
              alt="Apotheosis of Knowledge"
              width={100}
              height={100}
              priority
              className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
            />
          </motion.div>
          <p className="font-sans text-xl sm:text-2xl font-bold text-[#00008B] tracking-[0.06em] uppercase text-center" aria-hidden="true">
            Apotheosis of Knowledge
          </p>
          <p className="font-serif text-sm text-[#00008B]/45 italic mt-2 text-center">
            Elevating curiosity. Countering noise.
          </p>
        </motion.div>

        {/* ═══ Scroll cue ═══ */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
          style={{ opacity: indicatorOpacity }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="font-sans text-[9px] text-[#00008B]/20 tracking-[0.3em]">
              SCROLL
            </span>
            <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-[#00008B]/15 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
