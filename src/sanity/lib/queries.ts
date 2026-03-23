import { defineQuery } from 'next-sanity';

export const ALL_ARTICLES_QUERY = defineQuery(`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt,
      caption,
      credit
    },
    readingTime,
    sourceCount,
    depthTier,
    tags,
    featured,
    publishedAt,
    updatedAt,
    seoTitle,
    seoDescription
  }
`);

export const LATEST_ARTICLES_QUERY = defineQuery(`
  *[_type == "article"] | order(publishedAt desc) [0...$count] {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt
    },
    readingTime,
    sourceCount,
    depthTier,
    tags,
    featured,
    publishedAt
  }
`);

export const FEATURED_ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt
    },
    readingTime,
    sourceCount,
    publishedAt
  }
`);

export const ARTICLES_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "article" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt
    },
    readingTime,
    sourceCount,
    depthTier,
    tags,
    publishedAt,
    updatedAt
  }
`);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug && category->slug.current == $categorySlug][0] {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    excerpt,
    body,
    featuredImage {
      asset-> { _id, url },
      alt,
      caption,
      credit
    },
    author-> {
      name,
      role,
      avatar { asset-> { url } },
      bio
    },
    readingTime,
    sourceCount,
    depthTier,
    tags,
    featured,
    publishedAt,
    updatedAt,
    seoTitle,
    seoDescription,
    ogTitle,
    ogDescription,
    ogImage { asset-> { url } },
    canonicalUrl,
    noIndex,
    relatedArticles[] {
      connectionReason,
      article-> {
        _id,
        title,
        "slug": slug.current,
        "category": category->title,
        "categorySlug": category->slug.current,
        excerpt,
        readingTime,
        featuredImage {
          asset-> { _id, url },
          alt
        }
      }
    }
  }
`);
