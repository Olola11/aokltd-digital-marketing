'use client';

import { useState, useMemo } from 'react';
import { PrecisionGrid, MobileIndex } from '@/components/vault';
import { VaultSearch } from '@/components/vault/vault-search';
import { VaultProgressBar } from '@/components/vault/vault-progress';
import { ThreadExplorer } from '@/components/vault/thread-explorer';
import { VAULT_DATA } from '@/lib/vault-data';
import type { VaultCategory } from '@/types';

export default function VaultPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<VaultCategory | null>(null);

  // Filter entries
  const filteredEntries = useMemo(() => {
    return VAULT_DATA.filter((entry) => {
      if (activeCategory && entry.category !== activeCategory) {
        return false;
      }
      if (query) {
        const q = query.toLowerCase();
        return (
          entry.title.toLowerCase().includes(q) ||
          entry.excerpt.toLowerCase().includes(q) ||
          entry.tags.some((t) => t.toLowerCase().includes(q)) ||
          entry.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative border-b border-quill-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-28">
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-[#00008B]/30 mb-3 md:mb-4">
            Archive
          </p>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#00008B] tracking-tight mb-4 md:mb-6">
            The Vault
          </h1>
          <p className="font-serif text-base sm:text-lg text-[#00008B]/50 max-w-lg leading-relaxed">
            Intellectual curiosities extracted from the margins of recorded history.
          </p>
        </div>
      </header>

      {/* Search & Filters */}
      <section className="relative sticky top-16 z-20 bg-white/95 backdrop-blur-sm border-b border-quill-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <VaultSearch
            query={query}
            onQueryChange={setQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            resultCount={filteredEntries.length}
            totalCount={VAULT_DATA.length}
          />
        </div>
      </section>

      {/* Progress & Threads */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <VaultProgressBar totalCount={VAULT_DATA.length} />
      </section>

      {/* Thread Explorer */}
      <ThreadExplorer />

      {/* Main Content */}
      <main className="relative">
        {/* Desktop: Precision Grid */}
        <section className="hidden lg:block">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
            <PrecisionGrid entries={filteredEntries} />
          </div>
        </section>

        {/* Mobile/Tablet: Index */}
        <section className="lg:hidden">
          <MobileIndex entries={filteredEntries} />
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-quill-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center justify-between font-sans text-[9px] sm:text-[10px] text-[#00008B]/30 tracking-wider">
            <span>APOTHEOSIS OF KNOWLEDGE</span>
            <span>RC 1956161</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
