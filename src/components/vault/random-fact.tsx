'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { nigerianFacts, factCategories } from '@/data/nigerian-facts';
import type { FactCategory } from '@/data/nigerian-facts';

const categoryStyles: Record<FactCategory, string> = {
  history: 'bg-amber-50 text-amber-700',
  geography: 'bg-emerald-50 text-emerald-700',
  culture: 'bg-purple-50 text-purple-700',
  language: 'bg-blue-50 text-blue-700',
  science: 'bg-cyan-50 text-cyan-700',
  nature: 'bg-green-50 text-green-700',
  people: 'bg-rose-50 text-rose-700',
  economy: 'bg-orange-50 text-orange-700',
};

export function RandomFact() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * nigerianFacts.length)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [seenIds, setSeenIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    initial.add(nigerianFacts[Math.floor(Math.random() * nigerianFacts.length)]?.id ?? '');
    return initial;
  });
  const [copied, setCopied] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<FactCategory | null>(null);
  const [showScanLine, setShowScanLine] = useState(false);
  const [hasSwipedOnce, setHasSwipedOnce] = useState(false);

  // Touch/swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const fact = nigerianFacts[currentIndex];

  // Filtered pool
  const pool = categoryFilter
    ? nigerianFacts.filter((f) => f.category === categoryFilter)
    : nigerianFacts;

  const seenInPool = pool.filter((f) => seenIds.has(f.id)).length;

  // Initialize seenIds with the first fact
  useEffect(() => {
    setSeenIds(new Set([nigerianFacts[currentIndex].id]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateNewFact = useCallback(() => {
    if (isAnimating) return;

    let available = pool.filter((f) => !seenIds.has(f.id));

    // If all facts in pool seen, reset
    if (available.length === 0) {
      available = pool;
      setSeenIds(new Set());
    }

    // Remove current fact to avoid immediate repeat
    available = available.filter((f) => f.id !== fact.id);
    if (available.length === 0) available = pool.filter((f) => f.id !== fact.id);
    if (available.length === 0) return;

    const newFact = available[Math.floor(Math.random() * available.length)];
    const newIndex = nigerianFacts.indexOf(newFact);

    setSeenIds((prev) => new Set(prev).add(newFact.id));
    setIsAnimating(true);

    if (prefersReducedMotion) {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
      return;
    }

    // Show scan line during the pause
    setTimeout(() => {
      setShowScanLine(true);
      setTimeout(() => setShowScanLine(false), 200);
    }, 200);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 400);
    }, 300);
  }, [isAnimating, pool, seenIds, fact.id, prefersReducedMotion]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'n' || e.key === 'N' || e.key === ' ') {
        // Check if section is in viewport
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          if (inView) {
            e.preventDefault();
            generateNewFact();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [generateNewFact]);

  // Swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setHasSwipedOnce(true);
      generateNewFact();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Share / copy
  const handleShare = async () => {
    if (copied) return;
    const text = `${fact.fact}\n\n— Random Nigerian Fact from vault.aokltd.org`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing silently
    }
  };

  const duration = prefersReducedMotion ? 0 : 0.3;

  const counterLabel = categoryFilter
    ? `${seenInPool} / ${pool.length} ${categoryFilter} facts explored`
    : `${seenInPool} / ${pool.length} explored`;

  return (
    <section
      ref={sectionRef}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12"
      role="region"
      aria-label="Random Nigerian Fact"
    >
      {/* Section label */}
      <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-quill-500 mb-4">
        Random Fact
      </p>

      {/* The card */}
      <div
        className="relative max-w-[720px] mx-auto bg-white border border-gray-200 rounded-lg p-6 md:p-8 lg:p-12 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Scan line */}
        {showScanLine && (
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-[2px] bg-quill-500 origin-left"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        )}

        {/* Animated content */}
        <div aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Row 1: Category badge + counter */}
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <motion.span
                  className={`inline-block font-sans text-[10px] uppercase tracking-wider px-3 py-1 rounded-full ${categoryStyles[fact.category]}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration, delay: prefersReducedMotion ? 0 : 0 }}
                >
                  {fact.category}
                </motion.span>
                <span className="font-sans text-sm text-gray-300">
                  {counterLabel}
                </span>
              </div>

              {/* Row 2: Fact text */}
              <motion.p
                className="font-serif text-lg md:text-xl leading-relaxed text-gray-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration,
                  delay: prefersReducedMotion ? 0 : 0.05,
                }}
              >
                {fact.fact}
              </motion.p>

              {/* Row 3: Source citation */}
              <motion.div
                className="border-t border-gray-100 mt-6 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration,
                  delay: prefersReducedMotion ? 0 : 0.1,
                }}
              >
                <p className="font-sans text-xs text-gray-400">
                  Source:{' '}
                  {fact.sourceUrl ? (
                    <a
                      href={fact.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-quill-500 hover:underline"
                    >
                      {fact.source}
                    </a>
                  ) : (
                    fact.source
                  )}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Row 4: Action bar */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={handleShare}
            className="font-sans text-sm text-gray-400 hover:text-[#00008B] transition-colors"
          >
            {copied ? 'Copied!' : 'Share this fact'}
          </button>

          <button
            type="button"
            onClick={generateNewFact}
            disabled={isAnimating}
            aria-label="Generate another random Nigerian fact"
            className={`font-sans font-medium text-sm uppercase tracking-wider px-6 py-3 rounded-full bg-[#00008B] text-white transition-all duration-200 ease-out hover:bg-[#00008B]/90 hover:scale-105 active:scale-95 ${
              isAnimating ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            Another Fact <span className="ml-1.5">&#8594;</span>
          </button>
        </div>

        {/* Swipe hint (mobile only) */}
        {!hasSwipedOnce && (
          <p className="font-sans text-[10px] text-gray-300 text-right mt-3 md:hidden">
            Swipe left for another &#8594;
          </p>
        )}

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setCategoryFilter(null)}
            className={`font-sans text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border transition-colors ${
              !categoryFilter
                ? 'bg-[#00008B] text-white border-[#00008B]'
                : 'text-gray-400 border-gray-200 hover:border-[#00008B] hover:text-[#00008B]'
            }`}
          >
            All
          </button>
          {factCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`font-sans text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border transition-colors ${
                categoryFilter === cat
                  ? 'bg-[#00008B] text-white border-[#00008B]'
                  : 'text-gray-400 border-gray-200 hover:border-[#00008B] hover:text-[#00008B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
