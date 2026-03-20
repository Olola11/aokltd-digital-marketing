'use client';

import { useRef, useEffect, useState, useCallback, useMemo, type ReactNode } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VAULT_DATA, CATEGORY_LABELS } from '@/lib/vault-data';
import type { VaultEntry, VaultCategory } from '@/types';

function highlightMatch(text: string, query: string): ReactNode {
  if (!query || query.length < 2) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-quill-500/15 text-[#00008B] rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

interface SearchResult {
  entry: VaultEntry;
  titleMatch: boolean;
}

function searchEntries(
  query: string,
  activeCategory: VaultCategory | null
): SearchResult[] {
  if (query.length < 2) return [];
  const q = query.toLowerCase();

  const results: SearchResult[] = [];

  for (const entry of VAULT_DATA) {
    if (activeCategory && entry.category !== activeCategory) continue;

    const titleMatch = entry.title.toLowerCase().includes(q);
    const excerptMatch = entry.excerpt.toLowerCase().includes(q);
    const categoryMatch = entry.category.toLowerCase().includes(q) ||
      CATEGORY_LABELS[entry.category].toLowerCase().includes(q);

    if (titleMatch || excerptMatch || categoryMatch) {
      results.push({ entry, titleMatch });
    }
  }

  // Sort: title matches first
  results.sort((a, b) => {
    if (a.titleMatch && !b.titleMatch) return -1;
    if (!a.titleMatch && b.titleMatch) return 1;
    return 0;
  });

  return results;
}

interface VaultSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  activeCategory: VaultCategory | null;
  onCategoryChange: (category: VaultCategory | null) => void;
  resultCount: number;
  totalCount: number;
}

export function VaultSearch({
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
  resultCount,
  totalCount,
}: VaultSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(
    () => searchEntries(debouncedQuery, activeCategory),
    [debouncedQuery, activeCategory]
  );

  // Reset focused index when results change (adjusting state during render)
  const [prevDebouncedQuery, setPrevDebouncedQuery] = useState(debouncedQuery);
  if (prevDebouncedQuery !== debouncedQuery) {
    setPrevDebouncedQuery(debouncedQuery);
    setFocusedIndex(-1);
  }

  const showDropdown = isOpen && debouncedQuery.length >= 2;

  // "/" shortcut to focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showDropdown) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, -1));
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        e.preventDefault();
        resultRefs.current[focusedIndex]?.click();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        onQueryChange('');
        inputRef.current?.blur();
      }
    },
    [showDropdown, results.length, focusedIndex, onQueryChange]
  );

  const isFiltered = query || activeCategory;

  const CATEGORIES: { id: VaultCategory; label: string }[] = [
    { id: 'history', label: 'History' },
    { id: 'culture', label: 'Culture' },
    { id: 'bizarre-facts', label: 'Bizarre' },
    { id: 'true-crime', label: 'Crime' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div ref={containerRef} className="relative">
        {/* Search Input */}
        <div
          className={cn(
            'flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4',
            'border-2 rounded-full bg-white transition-colors duration-200',
            'border-[#00008B]/20 focus-within:border-[#00008B]'
          )}
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#00008B]/40 flex-shrink-0" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              onQueryChange(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
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

          {/* Clear */}
          {query && (
            <button
              onClick={() => {
                onQueryChange('');
                setIsOpen(false);
              }}
              className="p-1 text-[#00008B]/40 hover:text-[#00008B] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Keyboard hint: "/" */}
          <div className="hidden md:flex items-center gap-1 pl-4 border-l border-[#00008B]/10">
            <kbd className="font-mono text-[10px] text-[#00008B]/30 px-1.5 py-0.5 border border-[#00008B]/10 rounded">
              /
            </kbd>
          </div>
        </div>

        {/* Results Dropdown */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#00008B]/10 rounded-xl shadow-lg z-30 max-h-[400px] overflow-y-auto">
            {results.length > 0 ? (
              <>
                {results.map((result, i) => (
                  <Link
                    key={result.entry.slug}
                    ref={(el) => { resultRefs.current[i] = el; }}
                    href={`/vault/${result.entry.category}/${result.entry.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block px-4 py-3 transition-colors border-b border-gray-100 last:border-0',
                      i === focusedIndex ? 'bg-gray-50' : 'hover:bg-gray-50'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-quill-500">
                        {CATEGORY_LABELS[result.entry.category]}
                      </span>
                      <span className="font-sans text-[10px] text-gray-400">
                        {result.entry.readingTime} min
                      </span>
                    </div>
                    <h4 className="font-sans text-sm font-semibold text-[#00008B] mb-1">
                      {highlightMatch(result.entry.title, debouncedQuery)}
                    </h4>
                    <p className="font-serif text-xs text-[#00008B]/50 line-clamp-2">
                      {highlightMatch(result.entry.excerpt, debouncedQuery)}
                    </p>
                  </Link>
                ))}
                <div className="px-4 py-2 border-t border-gray-100">
                  <span className="font-sans text-[10px] text-gray-400">
                    {results.length} {results.length === 1 ? 'result' : 'results'}
                  </span>
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <p className="font-sans text-sm text-gray-400 mb-1">
                  No articles found for &ldquo;{debouncedQuery}&rdquo;
                </p>
                <p className="font-sans text-xs text-gray-300">
                  Try a different search term.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(isActive ? null : cat.id)}
              className={cn(
                'px-3 sm:px-4 py-1.5 sm:py-2 font-sans text-[10px] sm:text-xs tracking-wider transition-all duration-200 flex-shrink-0',
                'border-2 rounded-full',
                isActive
                  ? 'border-[#00008B] bg-[#00008B] text-white'
                  : 'border-[#00008B]/20 text-[#00008B]/60 hover:border-[#00008B]/40 hover:text-[#00008B]'
              )}
            >
              {cat.label.toUpperCase()}
            </button>
          );
        })}

        {isFiltered && (
          <button
            onClick={() => {
              onQueryChange('');
              onCategoryChange(null);
              setIsOpen(false);
            }}
            className="px-2 sm:px-3 py-1.5 sm:py-2 font-sans text-[10px] sm:text-xs text-[#00008B]/40 hover:text-[#00008B] transition-colors flex-shrink-0"
          >
            CLEAR
          </button>
        )}
      </div>
    </div>
  );
}
