import { SITE_URL } from '@/lib/constants';

interface ArticleSchemaProps {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  slug: string;
  categorySlug: string;
  featuredImage?: string;
  sourceCount?: number;
}

export function ArticleSchema({
  title,
  excerpt,
  category,
  publishedAt,
  slug,
  categorySlug,
  featuredImage,
  sourceCount,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: excerpt.slice(0, 155),
    author: {
      '@type': 'Organization',
      name: 'Apotheosis of Knowledge',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Apotheosis of Knowledge',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo/Apotheosis of Knowledge LOGO PNG-15.png`,
      },
    },
    datePublished: publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/vault/${categorySlug}/${slug}`,
    },
    articleSection: category,
    ...(featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${featuredImage}`,
      },
    }),
    ...(sourceCount && {
      citation: `${sourceCount} sources cited`,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
