import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  VAULT_DATA,
  CATEGORY_LABELS,
  getVaultEntry,
  getVaultEntriesByCategory,
  isValidCategory,
} from '@/lib/vault-data';
import { formatDate } from '@/lib/utils';
import type { VaultCategory } from '@/types';

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return VAULT_DATA.map((entry) => ({
    category: entry.category,
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const entry = getVaultEntry(category, slug);
  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.excerpt,
    openGraph: {
      title: entry.title,
      description: entry.excerpt,
      type: 'article',
      publishedTime: entry.publishedAt,
      tags: entry.tags,
      ...(entry.ogImage && { images: [{ url: entry.ogImage }] }),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const entry = getVaultEntry(category, slug);
  if (!entry) {
    notFound();
  }

  const categoryLabel = CATEGORY_LABELS[category as VaultCategory];

  // Get related entries from same category (excluding current)
  const related = getVaultEntriesByCategory(category)
    .filter((e) => e.slug !== slug)
    .slice(0, 3);

  // Split content into blocks — paragraphs or inline images
  // Inline image syntax: [IMAGE: /path/to/image.jpg | Alt text | Optional caption]
  const IMAGE_PATTERN = /^\[IMAGE:\s*([^|]+)\|\s*([^|\]]+)(?:\|\s*([^\]]+))?\]$/;

  const contentBlocks = entry.content
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((block) => {
      const match = block.match(IMAGE_PATTERN);
      if (match) {
        return {
          type: 'image' as const,
          src: match[1].trim(),
          alt: match[2].trim(),
          caption: match[3]?.trim(),
        };
      }
      return { type: 'paragraph' as const, text: block };
    });

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <header className="relative border-b border-[#58AEFE]/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#00008B]/30 mb-6 sm:mb-8">
            <Link
              href="/vault"
              className="hover:text-[#00008B]/60 transition-colors py-1"
            >
              Vault
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/vault/${category}`}
              className="hover:text-[#00008B]/60 transition-colors py-1"
            >
              {categoryLabel}
            </Link>
          </nav>

          {/* Title */}
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#00008B] tracking-tight leading-tight mb-4 sm:mb-6">
            {entry.title}
          </h1>

          {/* Excerpt */}
          <p className="font-serif text-base sm:text-lg text-[#00008B]/50 leading-relaxed mb-6 sm:mb-8">
            {entry.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-sans text-[10px] text-[#00008B]/40 uppercase tracking-wider">
            <span>{formatDate(entry.publishedAt)}</span>
            <span>{entry.readingTime} MIN READ</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {entry.featuredImage && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
          <figure>
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#00008B]/5">
              <Image
                src={entry.featuredImage.src}
                alt={entry.featuredImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 672px) 100vw, 672px"
                priority
              />
            </div>
            {entry.featuredImage.caption && (
              <figcaption className="mt-2 font-sans text-[10px] text-[#00008B]/35 tracking-wider">
                {entry.featuredImage.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}

      {/* Article Body */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <article className="prose-aok">
          {contentBlocks.map((block, index) => {
            if (block.type === 'image') {
              return (
                <figure key={index} className="my-8 sm:my-10">
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#00008B]/5">
                    <Image
                      src={block.src}
                      alt={block.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 672px) 100vw, 672px"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="mt-2 font-sans text-[10px] text-[#00008B]/35 tracking-wider">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
            return (
              <p
                key={index}
                className="font-serif text-[15px] sm:text-base md:text-[17px] text-[#00008B]/80 leading-[1.75] sm:leading-[1.85] mb-5 sm:mb-6 last:mb-0"
                style={{ overflowWrap: 'anywhere' }}
              >
                {block.text}
              </p>
            );
          })}
        </article>

        {/* Tags */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-[#58AEFE]/10">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 sm:px-3 py-1 font-sans text-[9px] sm:text-[10px] text-[#00008B]/40 border border-[#00008B]/10 tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Related Entries */}
      {related.length > 0 && (
        <section className="border-t border-[#58AEFE]/10">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            <h2 className="font-sans text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#00008B]/30 mb-6 sm:mb-8">
              More in {categoryLabel}
            </h2>
            <div className="space-y-0">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/vault/${rel.category}/${rel.slug}`}
                  className="group block border-b border-[#58AEFE]/10 py-5 sm:py-6 first:pt-0 last:border-b-0"
                >
                  <h3 className="font-sans text-base sm:text-lg font-bold text-[#00008B] mb-1 group-hover:text-[#00008B]/70 transition-colors">
                    {rel.title}
                  </h3>
                  <p className="font-serif text-sm text-[#00008B]/40 line-clamp-2 sm:line-clamp-1">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Vault */}
      <div className="border-t border-[#58AEFE]/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Link
            href="/vault"
            className="inline-flex items-center gap-2 font-sans text-xs text-[#00008B]/40 hover:text-[#00008B] transition-colors tracking-wider py-2"
          >
            <span aria-hidden="true">&larr;</span> BACK TO VAULT
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-[#58AEFE]/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center justify-between font-sans text-[9px] sm:text-[10px] text-[#00008B]/30 tracking-wider">
            <span>APOTHEOSIS OF KNOWLEDGE</span>
            <span>RC 1956161</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
