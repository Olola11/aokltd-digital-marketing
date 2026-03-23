import { SITE_URL, VAULT_URL } from '@/lib/constants';

interface ArticleSchemaProps {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  slug: string;
  categorySlug: string;
  featuredImage?: string;
  sourceCount?: number;
  tags?: string[];
  wordCount?: number;
  content?: string;
}

export function ArticleSchema({
  title,
  excerpt,
  category,
  publishedAt,
  updatedAt,
  readingTime,
  slug,
  categorySlug,
  featuredImage,
  sourceCount,
  tags,
  wordCount,
  content,
}: ArticleSchemaProps) {
  const articleUrl = `${VAULT_URL}/${categorySlug}/${slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: excerpt.slice(0, 155),
    url: articleUrl,
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
    ...(updatedAt && { dateModified: updatedAt }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: category,
    ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
    ...(wordCount && { wordCount }),
    ...(readingTime && {
      timeRequired: `PT${readingTime}M`,
    }),
    ...(featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${featuredImage}`,
      },
    }),
    ...(sourceCount && {
      citation: `${sourceCount} sources cited`,
    }),
    ...(content && {
      articleBody: content.replace(/\[IMAGE:[^\]]+\]/g, '').slice(0, 500),
    }),
    inLanguage: 'en',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
