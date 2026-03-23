import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

/* eslint-disable @typescript-eslint/no-explicit-any */

const components = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || ''}
          width={800}
          height={450}
          className="rounded-xl w-full"
        />
        {(value.caption || value.credit) && (
          <figcaption className="font-sans text-sm text-gray-400 mt-2 text-center">
            {value.caption}
            {value.caption && value.credit && ' — '}
            {value.credit && (
              <span className="text-gray-300">{value.credit}</span>
            )}
          </figcaption>
        )}
      </figure>
    ),

    pullQuote: ({ value }: any) => (
      <figure className="my-10 py-8 border-t border-b border-[#00008B]/10">
        <blockquote className="font-serif text-xl md:text-2xl text-[#00008B] text-center leading-relaxed italic">
          &ldquo;{value.text}&rdquo;
        </blockquote>
        {value.attribution && (
          <figcaption className="font-sans text-sm text-gray-400 text-center mt-4">
            — {value.attribution}
          </figcaption>
        )}
      </figure>
    ),

    callout: ({ value }: any) => {
      const styles: Record<string, string> = {
        info: 'bg-[#4A90E2]/5 border-[#4A90E2]',
        warning: 'bg-amber-50 border-amber-400',
        note: 'bg-gray-50 border-gray-300',
        editor: 'bg-[#00008B]/5 border-[#00008B]',
      };
      return (
        <aside className={`my-8 p-5 rounded-xl border-l-4 ${styles[value.type] || styles.note}`}>
          {value.heading && (
            <p className="font-sans text-sm font-semibold text-[#00008B] uppercase tracking-wider mb-2">
              {value.heading}
            </p>
          )}
          <p className="font-serif text-base text-gray-700 leading-relaxed">
            {value.body}
          </p>
        </aside>
      );
    },

    divider: ({ value }: any) => {
      if (value.style === 'dots') {
        return (
          <div className="my-10 text-center font-serif text-2xl text-gray-300 tracking-[0.5em]" aria-hidden="true">
            · · ·
          </div>
        );
      }
      if (value.style === 'space') {
        return <div className="my-12" />;
      }
      return <hr className="my-10 border-gray-200" />;
    },
  },

  block: {
    h2: ({ children }: any) => {
      const text = children?.toString() || '';
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return (
        <h2 id={id} className="font-sans text-2xl md:text-3xl font-semibold text-[#00008B] mt-10 mb-4 scroll-mt-20">
          {children}
        </h2>
      );
    },
    h3: ({ children }: any) => {
      const text = children?.toString() || '';
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return (
        <h3 id={id} className="font-sans text-xl md:text-2xl font-medium text-[#00008B] mt-8 mb-3 scroll-mt-20">
          {children}
        </h3>
      );
    },
    h4: ({ children }: any) => (
      <h4 className="font-sans text-lg md:text-xl font-medium text-[#00008B] mt-6 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-[#4A90E2] pl-6 my-6 font-serif text-lg italic text-gray-600">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="font-serif text-base md:text-lg leading-relaxed text-gray-700 mb-5">
        {children}
      </p>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="font-serif text-base md:text-lg text-gray-700 leading-relaxed mb-5 ml-6 list-disc space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="font-serif text-base md:text-lg text-gray-700 leading-relaxed mb-5 ml-6 list-decimal space-y-2">
        {children}
      </ol>
    ),
  },

  marks: {
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    underline: ({ children }: any) => <span className="underline decoration-[#4A90E2]/30">{children}</span>,
    'strike-through': ({ children }: any) => <del className="text-gray-400">{children}</del>,
    sup: ({ children }: any) => <sup className="text-[#4A90E2] text-xs font-sans cursor-help">{children}</sup>,

    link: ({ children, value }: any) => {
      const rel = value.rel
        ? `${value.rel} noopener noreferrer`
        : 'noopener noreferrer';
      return (
        <a
          href={value.href}
          target={value.openInNewTab ? '_blank' : '_self'}
          rel={rel}
          className="text-[#4A90E2] underline decoration-[#4A90E2]/30 hover:decoration-[#4A90E2] transition-colors"
        >
          {children}
        </a>
      );
    },

    internalLink: ({ children, value }: any) => {
      const href = value.reference
        ? `/vault/${value.reference.categorySlug}/${value.reference.slug}`
        : '#';
      return (
        <a href={href} className="text-[#00008B] underline decoration-[#00008B]/30 hover:decoration-[#00008B] transition-colors">
          {children}
        </a>
      );
    },

    footnote: ({ children, value }: any) => (
      <span className="relative group">
        {children}
        <sup className="text-[#4A90E2] text-xs font-sans cursor-help ml-0.5">[*]</sup>
        <span className="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-72 p-3 bg-white border border-gray-200 rounded-lg shadow-lg text-sm font-serif text-gray-600 z-50">
          {value.noteText}
          {value.sourceUrl && (
            <a
              href={value.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 text-[#4A90E2] text-xs underline"
            >
              View source
            </a>
          )}
        </span>
      </span>
    ),
  },
};

export function ArticleBody({ body }: { body: any[] }) {
  return <PortableText value={body} components={components} />;
}
