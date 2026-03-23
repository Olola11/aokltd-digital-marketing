import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { VaultLink } from '@/components/vault/vault-link';
import {
  VAULT_DATA,
  CATEGORY_LABELS,
  getVaultEntry,
  getVaultEntriesByCategory,
  isValidCategory,
  getWordCount,
} from '@/lib/vault-data';
import { VAULT_URL } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import type { VaultCategory } from '@/types';
import { ReadTracker } from '@/components/vault/read-tracker';
import { ArticleSourceDisplay } from '@/components/vault/source-badge';
import { ArticleThread } from '@/components/vault/article-thread';
import { ArticleSchema } from '@/components/vault/article-schema';
import { BreadcrumbSchema } from '@/components/vault/breadcrumb-schema';
import { SocialShare } from '@/components/vault/social-share';
import { ArticleProgressBar } from '@/components/vault/article-progress-bar';
import { TableOfContents } from '@/components/vault/table-of-contents';

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

  const description = entry.excerpt.length > 155
    ? entry.excerpt.slice(0, 155) + '...'
    : entry.excerpt;

  const articleUrl = `${VAULT_URL}/${category}/${slug}`;

  return {
    title: entry.title,
    description,
    keywords: entry.tags,
    authors: [{ name: 'Apotheosis of Knowledge' }],
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: entry.title,
      description,
      url: articleUrl,
      siteName: 'Apotheosis of Knowledge',
      type: 'article',
      publishedTime: entry.publishedAt,
      ...(entry.updatedAt && { modifiedTime: entry.updatedAt }),
      authors: ['Apotheosis of Knowledge'],
      section: CATEGORY_LABELS[category as VaultCategory] || category,
      tags: entry.tags,
      ...(entry.featuredImage && {
        images: [{ url: entry.featuredImage.src, width: 1200, height: 630, alt: entry.featuredImage.alt }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@aaborishade',
      creator: '@aaborishade',
      title: entry.title,
      description,
      ...(entry.featuredImage && {
        images: [{ url: entry.featuredImage.src, alt: entry.featuredImage.alt }],
      }),
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
  const articleUrl = `${VAULT_URL}/${category}/${slug}`;
  const wordCount = getWordCount(entry.content);

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

  // Extract headings for table of contents (from paragraph text that starts with heading markers)
  // For now, generate TOC from content sections — articles use paragraphs, not markdown headings,
  // so we derive sections from the first sentence of each major paragraph block
  const tocItems = contentBlocks
    .filter((b): b is { type: 'paragraph'; text: string } => b.type === 'paragraph')
    .reduce<{ id: string; text: string; level: number }[]>((acc, block, index) => {
      // Use every 3rd paragraph as a section marker to create meaningful TOC entries
      if (index > 0 && index % 3 === 0) {
        const firstSentence = block.text.split(/\.\s/)[0];
        const truncated = firstSentence.length > 60
          ? firstSentence.slice(0, 57) + '...'
          : firstSentence;
        acc.push({
          id: `section-${index}`,
          text: truncated,
          level: 2,
        });
      }
      return acc;
    }, []);

  return (
    <>
    <ArticleSchema
      title={entry.title}
      excerpt={entry.excerpt}
      category={categoryLabel}
      publishedAt={entry.publishedAt}
      updatedAt={entry.updatedAt}
      readingTime={entry.readingTime}
      slug={slug}
      categorySlug={category}
      featuredImage={entry.featuredImage?.src}
      sourceCount={entry.sourceCount}
      tags={entry.tags}
      wordCount={wordCount}
      content={entry.content}
    />
    <BreadcrumbSchema items={[
      { name: 'Home', url: '/' },
      { name: 'The Vault', url: '/vault' },
      { name: categoryLabel, url: `/vault/${category}` },
      { name: entry.title, url: `/vault/${category}/${slug}` },
    ]} />
    <ArticleProgressBar />
    <div className="min-h-screen bg-white">
      <ReadTracker slug={slug} />

      {/* Article Header */}
      <header className="relative border-b border-quill-500/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#00008B]/30 mb-6 sm:mb-8">
            <VaultLink
              href="/vault"
              className="hover:text-[#00008B]/60 transition-colors py-1"
            >
              Vault
            </VaultLink>
            <span aria-hidden="true">/</span>
            <VaultLink
              href={`/vault/${category}`}
              className="hover:text-[#00008B]/60 transition-colors py-1"
            >
              {categoryLabel}
            </VaultLink>
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
            <time dateTime={entry.publishedAt}>Published {formatDate(entry.publishedAt)}</time>
            {entry.updatedAt && (
              <time dateTime={entry.updatedAt}>Updated {formatDate(entry.updatedAt)}</time>
            )}
            <span>{entry.readingTime} MIN READ</span>
            <span>{wordCount.toLocaleString()} WORDS</span>
          </div>

          {/* Source count */}
          {entry.sourceCount ? (
            <ArticleSourceDisplay sourceCount={entry.sourceCount} />
          ) : null}
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
        {/* Table of Contents */}
        <TableOfContents items={tocItems} />

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

            // Check if this paragraph is a TOC anchor point
            const paragraphIndex = contentBlocks
              .filter((b): b is { type: 'paragraph'; text: string } => b.type === 'paragraph')
              .indexOf(block as { type: 'paragraph'; text: string });
            const sectionId = paragraphIndex > 0 && paragraphIndex % 3 === 0
              ? `section-${paragraphIndex}`
              : undefined;

            return (
              <p
                key={index}
                id={sectionId}
                className="font-serif text-[15px] sm:text-base md:text-[17px] text-[#00008B]/80 leading-[1.75] sm:leading-[1.85] mb-5 sm:mb-6 last:mb-0"
                style={{ overflowWrap: 'anywhere' }}
              >
                {block.text}
              </p>
            );
          })}
        </article>

        {/* Tags */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-quill-500/10">
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

        {/* Social Share */}
        <SocialShare
          title={entry.title}
          url={articleUrl}
          excerpt={entry.excerpt}
        />
      </main>

      {/* Related Entries */}
      {related.length > 0 && (
        <section className="border-t border-quill-500/10">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            <h2 className="font-sans text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#00008B]/30 mb-6 sm:mb-8">
              More in {categoryLabel}
            </h2>
            <div className="space-y-0">
              {related.map((rel) => (
                <VaultLink
                  key={rel.slug}
                  href={`/vault/${rel.category}/${rel.slug}`}
                  className="group block border-b border-quill-500/10 py-5 sm:py-6 first:pt-0 last:border-b-0"
                >
                  <h3 className="font-sans text-base sm:text-lg font-bold text-[#00008B] mb-1 group-hover:text-[#00008B]/70 transition-colors">
                    {rel.title}
                  </h3>
                  <p className="font-serif text-sm text-[#00008B]/40 line-clamp-2 sm:line-clamp-1">
                    {rel.excerpt}
                  </p>
                </VaultLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The Thread — connected articles */}
      {entry.relatedArticles && entry.relatedArticles.length > 0 && (
        <ArticleThread relatedArticles={entry.relatedArticles} />
      )}

      {/* Back to Vault */}
      <div className="border-t border-quill-500/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <VaultLink
            href="/vault"
            className="inline-flex items-center gap-2 font-sans text-xs text-[#00008B]/40 hover:text-[#00008B] transition-colors tracking-wider py-2"
          >
            <span aria-hidden="true">&larr;</span> BACK TO VAULT
          </VaultLink>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-quill-500/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
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
