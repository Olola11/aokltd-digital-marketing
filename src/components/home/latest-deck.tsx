import Link from 'next/link';
import Image from 'next/image';
import { VAULT_DATA, CATEGORY_LABELS } from '@/lib/vault-data';

export function LatestDeck() {
  const latest = [...VAULT_DATA]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="font-sans text-[10px] sm:text-xs tracking-[0.3em] text-[#00008B]/30 uppercase">
          Latest from the Vault
        </h2>
        <Link
          href="/vault"
          className="font-sans text-[10px] sm:text-xs tracking-[0.2em] text-[#00008B]/30 hover:text-[#00008B] transition-colors uppercase"
        >
          View All &rarr;
        </Link>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
        {latest.map((entry, index) => (
          <Link
            key={entry.slug}
            href={`/vault/${entry.category}/${entry.slug}`}
            className="group block relative"
          >
            {/* Image "shadow" — revealed on desktop hover behind the card */}
            {entry.featuredImage ? (
              <div
                className="absolute inset-0 translate-x-[8px] translate-y-[8px] rounded-md overflow-hidden
                  opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ease-out"
                aria-hidden="true"
              >
                <Image
                  src={entry.featuredImage.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                {/* Dark overlay to prevent image from overpowering the card */}
                <div className="absolute inset-0 bg-[#00008B]/40" />
              </div>
            ) : (
              /* Fallback: navy brutalist shadow for entries without images */
              <div
                className="absolute inset-0 translate-x-[8px] translate-y-[8px] rounded-md bg-[#00008B]
                  opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ease-out"
                aria-hidden="true"
              />
            )}

            {/* Card — rises on desktop hover */}
            <article className="relative border border-[#00008B] bg-white p-4 sm:p-5 md:p-6 rounded-md transition-transform duration-300 ease-out md:group-hover:-translate-y-1.5">
              {/* Category + Index */}
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="font-sans text-[11px] md:text-xs text-[#4A90E2] tracking-wider uppercase">
                  {CATEGORY_LABELS[entry.category]}
                </span>
                <span className="font-sans text-xs md:text-[13px] text-[#00008B]/20">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-sans text-base sm:text-lg md:text-xl font-bold text-[#00008B] leading-snug mb-2 md:mb-3 group-hover:text-[#00008B]/80 transition-colors">
                {entry.title}
              </h3>

              {/* Excerpt */}
              <p className="font-serif text-xs sm:text-sm text-[#00008B]/50 leading-relaxed line-clamp-2 md:line-clamp-3 mb-3 md:mb-4">
                {entry.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-3 font-sans text-[8px] sm:text-[9px] md:text-[10px] text-[#00008B]/25 tracking-wider uppercase">
                <span>{entry.readingTime} min read</span>
                <span>&middot;</span>
                <span>
                  {new Date(entry.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
