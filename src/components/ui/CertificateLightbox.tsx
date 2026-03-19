'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

interface CertificateLightboxProps {
  /** Path to the certificate image */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Display width of the thumbnail */
  width: number;
  /** Display height of the thumbnail */
  height: number;
  className?: string;
}

/**
 * CertificateLightbox — Lazy-loaded certificate image with tap-to-zoom.
 *
 * Thumbnail renders with `loading="lazy"` via Next.js Image. On click/tap,
 * opens a full-viewport lightbox with the certificate centred and scrollable
 * on small screens. Closes on backdrop click, X button, or Escape key.
 */
export function CertificateLightbox({
  src,
  alt,
  width,
  height,
  className,
}: CertificateLightboxProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, close]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative cursor-zoom-in rounded-lg overflow-hidden border border-white/[0.08] hover:border-white/[0.15] transition-colors duration-300 ${className ?? ''}`}
        aria-label={`View ${alt} full size`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          className="w-full h-auto"
        />
        {/* Zoom overlay on hover */}
        <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/40 transition-colors duration-300 flex items-center justify-center">
          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
        </div>
      </button>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 backdrop-blur-sm p-4 sm:p-8"
            onClick={close}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-navy-800/80 text-navy-300 hover:text-navy-100 hover:bg-navy-700/80 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Certificate image */}
            <motion.div
              key="lightbox-image"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.03, 0.98, 0.52, 0.99] }}
              className="relative max-w-4xl max-h-[90vh] overflow-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={width * 2}
                height={height * 2}
                quality={95}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
