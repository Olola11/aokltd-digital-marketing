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
      url: 'https://aokltd.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Apotheosis of Knowledge',
      url: 'https://aokltd.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aokltd.org/images/logo/Apotheosis of Knowledge LOGO PNG-15.png',
      },
    },
    datePublished: publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://aokltd.org/vault/${categorySlug}/${slug}`,
    },
    articleSection: category,
    ...(featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: `https://aokltd.org${featuredImage}`,
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
