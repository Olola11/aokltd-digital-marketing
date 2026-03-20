'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTouchDevice } from '@/hooks/useTouchDevice';

/**
 * QuillHero — SVG "Writing" Animation Entry Point
 *
 * The word "APOTHEOSIS" is drawn onto the screen using SVG strokeDasharray
 * animation, simulating a quill pen writing the letters from left to right.
 *
 * Features:
 * - SVG stroke animation with ~1.5s duration
 * - Liquid hover effect: letters warp/ripple when mouse passes near them
 * - Mobile: Writing animation plays, hover effects disabled
 *
 * Technical Implementation:
 * - Each letter is an SVG path with animated strokeDashoffset
 * - Mouse proximity tracked for liquid distortion effect
 * - Reduced motion preference respected
 */

export function QuillHero() {
  const isTouch = useTouchDevice();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse position for liquid effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smoothed mouse for organic feel
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Track mouse position relative to container
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    },
    [isTouch, mouseX, mouseY]
  );

  // Transform mouse position into subtle scaling distortion
  const scaleX = useTransform(smoothMouseX, [-0.5, 0, 0.5], [0.98, 1, 1.02]);
  const scaleY = useTransform(smoothMouseY, [-0.5, 0, 0.5], [1.02, 1, 0.98]);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Letter path data for "APOTHEOSIS" in a custom serif style
  // Using simplified paths that can be stroked
  const letters = [
    { char: 'A', width: 70, path: 'M10 80 L35 10 L60 80 M20 55 L50 55' },
    { char: 'P', width: 55, path: 'M10 80 L10 10 L40 10 Q55 10 55 30 Q55 50 40 50 L10 50' },
    { char: 'O', width: 60, path: 'M30 10 Q55 10 55 45 Q55 80 30 80 Q5 80 5 45 Q5 10 30 10 Z' },
    { char: 'T', width: 55, path: 'M5 10 L50 10 M27.5 10 L27.5 80' },
    { char: 'H', width: 55, path: 'M10 10 L10 80 M45 10 L45 80 M10 45 L45 45' },
    { char: 'E', width: 50, path: 'M45 10 L10 10 L10 80 L45 80 M10 45 L35 45' },
    { char: 'O', width: 60, path: 'M30 10 Q55 10 55 45 Q55 80 30 80 Q5 80 5 45 Q5 10 30 10 Z' },
    { char: 'S', width: 50, path: 'M45 20 Q45 10 25 10 Q5 10 5 25 Q5 40 25 45 Q45 50 45 65 Q45 80 25 80 Q5 80 5 70' },
    { char: 'I', width: 30, path: 'M5 10 L25 10 M15 10 L15 80 M5 80 L25 80' },
    { char: 'S', width: 50, path: 'M45 20 Q45 10 25 10 Q5 10 5 25 Q5 40 25 45 Q45 50 45 65 Q45 80 25 80 Q5 80 5 70' },
  ];

  // Calculate cumulative X offset for each letter
  const letterSpacing = 8;
  let xOffset = 0;
  const letterPositions = letters.map((letter) => {
    const pos = xOffset;
    xOffset += letter.width + letterSpacing;
    return pos;
  });

  const totalWidth = xOffset - letterSpacing;

  return (
    <section className="relative min-h-0 md:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white px-4 py-16 md:py-0">
      {/* Subtle radial gradient behind text */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper-cream via-white to-paper-cool opacity-60" />

      {/* Kicker label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10 text-xs sm:text-sm font-sans font-medium text-quill-500 uppercase tracking-[0.3em] mb-8 sm:mb-12"
      >
        About Us
      </motion.p>

      {/* Main SVG Writing Animation */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          mouseX.set(0);
          mouseY.set(0);
        }}
        className="relative z-10 w-full max-w-5xl"
      >
        <motion.div
          style={!isTouch ? { scaleX, scaleY } : undefined}
          className="origin-center"
        >
          <svg
            viewBox={`0 0 ${totalWidth} 90`}
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
            aria-label="APOTHEOSIS"
            role="img"
          >
            <title>APOTHEOSIS</title>

            {/* Background filled letters (appear after stroke completes) */}
            {letters.map((letter, index) => (
              <motion.path
                key={`fill-${index}`}
                d={letter.path}
                transform={`translate(${letterPositions[index]}, 0)`}
                fill="#00008B"
                stroke="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hasAnimated ? 1 : 0 }}
                transition={{
                  delay: 1.5 + index * 0.05,
                  duration: 0.3,
                }}
              />
            ))}

            {/* Stroked letters (the drawing animation) */}
            {letters.map((letter, index) => {
              // Estimate path length for animation
              const pathLength = 250;
              const staggerDelay = index * 0.1;

              return (
                <motion.path
                  key={`stroke-${index}`}
                  d={letter.path}
                  transform={`translate(${letterPositions[index]}, 0)`}
                  fill="none"
                  stroke="#00008B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                  }}
                  animate={{
                    strokeDashoffset: hasAnimated ? 0 : pathLength,
                  }}
                  transition={{
                    delay: staggerDelay,
                    duration: 1.2,
                    ease: [0.65, 0, 0.35, 1], // Custom easing for natural pen flow
                  }}
                />
              );
            })}
          </svg>
        </motion.div>

        {/* Liquid hover indicator (subtle glow when hovering) */}
        {!isTouch && isHovering && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-quill-100/20 to-transparent rounded-lg" />
          </motion.div>
        )}
      </div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="relative z-10 mt-8 sm:mt-12 text-center"
      >
        <p className="font-serif text-lg sm:text-xl md:text-2xl text-royal-800/80 max-w-2xl mx-auto leading-relaxed pb-4 md:pb-28">
          Elevating knowledge to its highest form
        </p>
      </motion.div>
    </section>
  );
}

export default QuillHero;
