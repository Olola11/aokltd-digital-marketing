import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  VALID_CATEGORIES,
  CATEGORY_LABELS,
  getVaultEntriesByCategory,
  isValidCategory,
} from '@/lib/vault-data';
import { formatDate } from '@/lib/utils';
import type { VaultCategory } from '@/types';
import { ReadCheckmark } from '@/components/vault/vault-progress';
import { BreadcrumbSchema } from '@/components/vault/breadcrumb-schema';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isValidCategory(category)) return {};

  const label = CATEGORY_LABELS[category];
  const categoryDescriptions: Record<string, string> = {
    'history': 'Explore deeply researched articles on African and world history.',
    'culture': 'Cultural phenomena, traditions, identity, and the stories that shape societies.',
    'bizarre-facts': 'Strange true stories, unexplained events, and the facts too bizarre to believe.',
    'true-crime': 'Historical and contemporary crime cases investigated with rigour and depth.',
  };

  return {
    title: `${label} — The Vault`,
    description: categoryDescriptions[category] || `Explore ${label} articles in the Apotheosis of Knowledge vault.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const entries = getVaultEntriesByCategory(category);
  const label = CATEGORY_LABELS[category as VaultCategory];

  return (
    <>
    <BreadcrumbSchema items={[
      { name: 'Home', url: '/' },
      { name: 'The Vault', url: '/vault' },
      { name: label, url: `/vault/${category}` },
    ]} />
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative border-b border-quill-500/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-28">
          <Link
            href="/vault"
            className="inline-flex items-center gap-2 font-sans text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#00008B]/30 mb-4 hover:text-[#00008B]/60 transition-colors py-1"
          >
            <span aria-hidden="true">&larr;</span> The Vault
          </Link>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#00008B] tracking-tight mb-3 sm:mb-4">
            {label}
          </h1>
          <p className="font-sans text-xs md:text-sm text-[#00008B]/40 tracking-wider">
            {entries.length} {entries.length === 1 ? 'ENTRY' : 'ENTRIES'}
          </p>
        </div>
      </header>

      {/* Entry List */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="space-y-0">
          {entries.map((entry, index) => (
            <div key={entry.slug} className="relative group">
              {/* Image shadow — desktop only, revealed on hover */}
              {entry.featuredImage ? (
                <div
                  className="hidden md:block absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-md overflow-hidden
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
                  aria-hidden="true"
                >
                  <Image
                    src={entry.featuredImage.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#00008B]/40" />
                </div>
              ) : (
                <div
                  className="hidden md:block absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-md bg-[#00008B]
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
                  aria-hidden="true"
                />
              )}

              <Link
                href={`/vault/${category}/${entry.slug}`}
                className="relative block bg-white border-b border-quill-500/10 py-6 sm:py-8 first:pt-0 transition-all duration-300 ease-out md:group-hover:-translate-y-1 active:scale-[0.98]"
              >
                <div className="flex items-start gap-3 sm:gap-6">
                  <span className="font-sans text-[13px] md:text-[15px] text-[#00008B]/20 pt-1.5 sm:pt-2 w-5 sm:w-6 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-[#00008B] leading-tight mb-1.5 sm:mb-2 group-hover:text-[#00008B]/80 transition-colors">
                      {entry.title}
                    </h2>
                    <p className="font-serif text-sm text-[#00008B]/50 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                      {entry.excerpt}
                    </p>
                    <div className="flex items-center gap-3 sm:gap-4 font-sans text-[9px] sm:text-[10px] text-[#00008B]/30 uppercase tracking-wider">
                      <span>{formatDate(entry.publishedAt, { month: 'short', year: 'numeric' })}</span>
                      <span>{entry.readingTime} MIN READ</span>
                      {entry.sourceCount ? <span>{entry.sourceCount} SOURCES</span> : null}
                      <ReadCheckmark slug={entry.slug} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-quill-500/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center justify-between font-sans text-[9px] sm:text-[10px] text-[#00008B]/30 tracking-wider">
            <span>APOTHEOSIS OF KNOWLEDGE</span>
            <span>RC 1956161</span>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
