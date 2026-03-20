'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VaultCategory } from '@/types';



interface CommandCenterProps {
  query: string;
  onQueryChange: (query: string) => void;
  activeCategory: VaultCategory | null;
  onCategoryChange: (category: VaultCategory | null) => void;
  resultCount: number;
  totalCount: number;
}

const CATEGORIES: { id: VaultCategory; label: string }[] = [
  { id: 'history', label: 'History' },
  { id: 'culture', label: 'Culture' },
  { id: 'bizarre-facts', label: 'Bizarre' },
  { id: 'true-crime', label: 'Crime' },
];

export function CommandCenter({
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
  resultCount,
  totalCount,
}: CommandCenterProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const isFiltered = query || activeCategory;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className={cn(
          'flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4',
          'border-2 rounded-full bg-white transition-colors duration-200',
          'border-[#00008B]/20 focus-within:border-[#00008B]'
        )}>
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#00008B]/40 flex-shrink-0" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Search vault articles"
            placeholder="SEARCH ARCHIVE..."
            className={cn(
              'flex-1 bg-transparent outline-none min-w-0',
              'font-sans text-xs sm:text-sm tracking-wider text-[#00008B]',
              'placeholder:text-[#00008B]/30 placeholder:tracking-[0.15em] sm:placeholder:tracking-[0.2em]'
            )}
          />

          {/* Result Counter */}
          <span className="font-sans text-[10px] sm:text-xs text-[#00008B]/40 tabular-nums flex-shrink-0">
            {resultCount}/{totalCount}
          </span>

          {/* Clear Button */}
          {query && (
            <button
              onClick={() => onQueryChange('')}
              aria-label="Clear search"
              className="p-1 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#00008B]/40 hover:text-[#00008B] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Keyboard Hint */}
          <div className="hidden md:flex items-center gap-1 pl-4 border-l border-[#00008B]/10">
            <kbd className="font-sans text-[10px] text-[#00008B]/30 px-1.5 py-0.5 border border-[#00008B]/10">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => onCategoryChange(isActive ? null : cat.id)}
              className={cn(
                'px-3 sm:px-4 py-1.5 sm:py-2 font-sans text-[10px] sm:text-xs tracking-wider transition-all duration-200 flex-shrink-0',
                'border-2 rounded-full',
                isActive
                  ? 'border-[#00008B] bg-[#00008B] text-white'
                  : 'border-[#00008B]/20 text-[#00008B]/60 hover:border-[#00008B]/40 hover:text-[#00008B]'
              )}
              whileTap={{ scale: 0.97 }}
            >
              {cat.label.toUpperCase()}
            </motion.button>
          );
        })}

        {/* Clear All */}
        {isFiltered && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={() => {
              onQueryChange('');
              onCategoryChange(null);
            }}
            className="px-2 sm:px-3 py-1.5 sm:py-2 font-sans text-[10px] sm:text-xs text-[#00008B]/40 hover:text-[#00008B] transition-colors flex-shrink-0"
          >
            CLEAR
          </motion.button>
        )}
      </div>
    </div>
  );
}
