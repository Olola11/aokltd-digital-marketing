'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  animate,
  AnimatePresence,
} from 'framer-motion';

/**
 * HeroSpotlight — "SIGNAL IN THE NOISE"
 *
 * Desktop: Physics-based mouse tracking reveals bright text through a
 *          radial-gradient mask that follows the cursor with spring physics.
 *
 * Mobile:  Automated "lighthouse searchlight" — the spotlight pans
 *          horizontally in a continuous 5s loop, revealing the text
 *          without requiring a cursor.
 *
 * Detection: `(pointer: coarse)` media query via useEffect to avoid
 *            hydration mismatches.
 */
export function HeroSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  // ── Detect touch capability after mount ──
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouch(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── Shared motion values (0–100 range, percentage) ──
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);

  const x = useSpring(rawX, { stiffness: 150, damping: 30, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 150, damping: 30, mass: 0.4 });

  // ── Compose the mask as a live MotionValue string ──
  // Mobile gets a larger radius to compensate for the sweep covering more text
  const maskImage = useMotionTemplate`radial-gradient(circle ${isTouch ? '200px' : '280px'} at ${x}% ${y}%, black 0%, transparent 100%)`;

  // Ambient glow (desktop only — expensive blur kills mobile GPUs)
  const glowX = useSpring(rawX, { stiffness: 80, damping: 35 });
  const glowY = useSpring(rawY, { stiffness: 80, damping: 35 });

  // ── Desktop: mouse tracking ──
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(((e.clientX - rect.left) / rect.width) * 100);
      rawY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [rawX, rawY, isTouch],
  );

  // ── Mobile: automated lighthouse sweep ──
  useEffect(() => {
    if (!isTouch) return;

    // Lock Y to vertical center
    rawY.set(50);

    // Sweep X from 15% → 85% → 15% in a continuous 5s loop
    const controls = animate(rawX, [15, 85, 15], {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    });

    return () => controls.stop();
  }, [isTouch, rawX, rawY]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950 select-none ${
        isTouch ? '' : 'cursor-crosshair'
      }`}
    >
      {/* Deep background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950 to-navy-900" />

      {/* Kicker label */}
      <AnimatePresence>
        <motion.p
          key="kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute top-[18%] left-1/2 -translate-x-1/2 text-sm font-medium text-blue-400 uppercase tracking-[0.25em] z-30"
        >
          Our Mission
        </motion.p>
      </AnimatePresence>

      {/* ── Dim base text ── always visible at low opacity ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-navy-700 tracking-tight leading-[1.08] select-none">
          SIGNAL IN
          <br />
          THE NOISE
        </h1>
      </div>

      {/* ── Spotlight layer ── bright text masked by radial gradient ── */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-navy-50 via-gold-400 to-gold-500 tracking-tight leading-[1.08]">
            SIGNAL IN
            <br />
            THE NOISE
          </h1>
        </div>
      </motion.div>

      {/* ── Ambient glow blob (desktop only — blur is a GPU killer on mobile) ── */}
      {!isTouch && (
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none will-change-transform z-[5] blur-[100px]"
          style={{
            left: useMotionTemplate`${glowX}%`,
            top: useMotionTemplate`${glowY}%`,
            x: '-50%',
            y: '-50%',
            background:
              'radial-gradient(circle, rgba(212,168,75,0.08) 0%, transparent 70%)',
          }}
        />
      )}

      {/* ── Sub-headline ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-[22%] left-1/2 -translate-x-1/2 z-30 text-lg md:text-xl text-navy-400 max-w-xl text-center px-4 leading-relaxed"
      >
        The internet is drowning in noise. We exist to surface what matters.
      </motion.p>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
      >
        <p className="text-[10px] text-navy-500 uppercase tracking-[0.3em] mb-2">
          Scroll
        </p>
        <div className="w-px h-8 bg-gradient-to-b from-navy-500 to-transparent" />
      </motion.div>
    </section>
  );
}
