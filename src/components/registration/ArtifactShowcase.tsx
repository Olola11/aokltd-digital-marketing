'use client';

import { useState, useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { X, ZoomIn, FileText, ExternalLink } from 'lucide-react';

// Certificate PDF path
const CERTIFICATE_PDF = '/images/certificate/CERTIFICATE - APOTHEOSIS OF KNOWLEDGE LIMITED (3).pdf';

/**
 * ArtifactShowcase — 3D holographic certificate display.
 *
 * Desktop: Physics-based tilt following mouse position with glare layer
 * that moves opposite to simulate light reflection.
 *
 * Mobile: Automated ambient sway simulating gyroscope effect.
 *
 * Click expands to full-screen inspection mode with embedded PDF viewer.
 */
export function ArtifactShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Detect touch device
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Raw mouse position (0-1 normalized)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring-smoothed values for buttery motion
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform to rotation (±15 degrees)
  const rotateX = useTransform(smoothY, [0, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [0, 1], [-15, 15]);

  // Glare position (moves opposite to tilt)
  const glareX = useTransform(smoothX, [0, 1], ['80%', '20%']);
  const glareY = useTransform(smoothY, [0, 1], ['80%', '20%']);

  // Shadow offset based on tilt
  const shadowX = useTransform(smoothX, [0, 1], [-20, 20]);
  const shadowY = useTransform(smoothY, [0, 1], [-20, 20]);

  // Ambient sway for mobile (gyroscope simulation)
  const ambientPhase = useMotionValue(0);
  useEffect(() => {
    if (!isTouch) return;

    let frame: number;
    const animate = (time: number) => {
      ambientPhase.set(time / 1000);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isTouch, ambientPhase]);

  const ambientRotateX = useTransform(ambientPhase, (t) =>
    Math.sin(t * 0.5) * 5
  );
  const ambientRotateY = useTransform(ambientPhase, (t) =>
    Math.cos(t * 0.7) * 5
  );

  // Mouse tracking handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || isExpanded) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Lock body scroll when expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  // Escape to close
  useEffect(() => {
    if (!isExpanded) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isExpanded]);

  return (
    <>
      {/* 3D Certificate Card */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsExpanded(true)}
        className="relative cursor-pointer group"
        style={{
          perspective: '1200px',
          perspectiveOrigin: 'center center',
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Card container with 3D transforms */}
        <motion.div
          className="relative w-full max-w-lg mx-auto"
          style={{
            transformStyle: 'preserve-3d',
            rotateX: isTouch ? ambientRotateX : rotateX,
            rotateY: isTouch ? ambientRotateY : rotateY,
          }}
        >
          {/* Dynamic shadow */}
          <motion.div
            className="absolute inset-4 rounded-xl bg-navy-950/80 blur-2xl"
            style={{
              x: isTouch ? 0 : shadowX,
              y: isTouch ? 0 : shadowY,
              transform: 'translateZ(-50px)',
            }}
          />

          {/* Main card surface */}
          <div
            className="relative rounded-xl overflow-hidden border border-white/10 bg-navy-900/90 backdrop-blur-sm"
            style={{ transform: 'translateZ(0px)' }}
          >
            {/* Certificate preview — PDF thumbnail representation */}
            <div className="aspect-[4/3] relative bg-navy-800 flex items-center justify-center">
              {/* Embedded PDF preview (first page) */}
              <object
                data={`${CERTIFICATE_PDF}#page=1&view=FitH&toolbar=0&navpanes=0`}
                type="application/pdf"
                className="absolute inset-0 w-full h-full"
                aria-label="Certificate of Incorporation preview"
              >
                {/* Fallback for browsers that can't embed PDF */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-800">
                  <FileText className="w-16 h-16 text-gold-500/60 mb-4" />
                  <p className="text-navy-300 text-sm font-medium">Certificate of Incorporation</p>
                  <p className="text-navy-500 text-xs mt-1">PDF Document</p>
                </div>
              </object>

              {/* Glare layer — moves opposite to tilt */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: useTransform(
                    [glareX, glareY],
                    ([x, y]) =>
                      `radial-gradient(ellipse 50% 50% at ${x} ${y}, rgba(255,255,255,0.12) 0%, transparent 60%)`
                  ),
                }}
              />

              {/* Holographic shimmer edge */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    'linear-gradient(135deg, transparent 40%, rgba(212,168,75,0.08) 50%, transparent 60%)',
                }}
              />
            </div>

            {/* Credential label bar */}
            <div className="px-6 py-4 bg-navy-950/60 border-t border-white/5">
              <p className="text-[10px] font-sans text-navy-500 uppercase tracking-[0.2em] mb-1">
                Certificate of Incorporation
              </p>
              <p className="font-serif text-lg text-navy-100 font-medium">
                RC 1956161
              </p>
            </div>

            {/* Hover state indicator */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-950/80 border border-white/10">
                <ZoomIn className="w-3.5 h-3.5 text-gold-500" />
                <span className="text-[10px] font-sans text-navy-300 uppercase tracking-wider">
                  Inspect
                </span>
              </div>
            </div>
          </div>

          {/* Floating edge accents (3D depth) */}
          <div
            className="absolute -left-1 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent"
            style={{ transform: 'translateZ(20px)' }}
          />
          <div
            className="absolute -right-1 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
            style={{ transform: 'translateZ(20px)' }}
          />
        </motion.div>

        {/* Caption */}
        <p className="text-center text-xs text-navy-500 mt-6 font-sans uppercase tracking-[0.15em]">
          {isTouch ? 'Tap to inspect' : 'Hover to interact • Click to inspect'}
        </p>
      </motion.div>

      {/* Full-screen inspection mode — PDF viewer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setIsExpanded(false)}
          >
            {/* Controls */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              {/* Open in new tab */}
              <a
                href={CERTIFICATE_PDF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-navy-800/80 text-navy-300 hover:text-navy-100 hover:bg-navy-700/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-xs font-sans uppercase tracking-wider hidden sm:inline">
                  Open PDF
                </span>
              </a>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded-full bg-navy-800/80 text-navy-300 hover:text-navy-100 hover:bg-navy-700/80 transition-colors"
                aria-label="Close inspection"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document title */}
            <div className="absolute top-4 left-4 z-10">
              <p className="text-xs font-sans text-navy-500 uppercase tracking-wider">
                Certificate of Incorporation
              </p>
              <p className="text-sm font-medium text-navy-300 mt-1">
                Apotheosis of Knowledge Limited — RC 1956161
              </p>
            </div>

            {/* PDF viewer container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl h-[80vh] rounded-xl overflow-hidden border border-white/10 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Embedded PDF with full viewer controls */}
              <iframe
                src={`${CERTIFICATE_PDF}#view=FitH`}
                className="w-full h-full"
                title="Certificate of Incorporation — Apotheosis of Knowledge Limited"
              />
            </motion.div>

            {/* Bottom hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-navy-800/60 border border-white/5">
              <FileText className="w-4 h-4 text-navy-400" />
              <span className="text-xs font-sans text-navy-400">
                Use PDF controls to zoom and navigate
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
