import type { MetadataRoute } from 'next';
import { VAULT_DATA, VALID_CATEGORIES } from '@/lib/vault-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aokltd.org';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/about/mission`, lastModified: new Date() },
    { url: `${baseUrl}/about/registration`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/work`, lastModified: new Date() },
    { url: `${baseUrl}/invest`, lastModified: new Date() },
    { url: `${baseUrl}/vault`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  const categoryPages: MetadataRoute.Sitemap = VALID_CATEGORIES.map(
    (category) => ({
      url: `${baseUrl}/vault/${category}`,
      lastModified: new Date(),
    })
  );

  const articlePages: MetadataRoute.Sitemap = VAULT_DATA.map((entry) => ({
    url: `${baseUrl}/vault/${entry.category}/${entry.slug}`,
    lastModified: new Date(entry.publishedAt),
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
