import { VAULT_DATA } from '@/lib/vault-data';
import { SITE_URL, VAULT_URL } from '@/lib/constants';

export async function GET() {
  const sortedArticles = [...VAULT_DATA].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const escapeXml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const items = sortedArticles
    .map(
      (entry) => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${VAULT_URL}/${entry.category}/${entry.slug}</link>
      <guid isPermaLink="true">${VAULT_URL}/${entry.category}/${entry.slug}</guid>
      <description>${escapeXml(entry.excerpt)}</description>
      <pubDate>${new Date(entry.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(entry.category)}</category>
    </item>`
    )
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Vault — Apotheosis of Knowledge</title>
    <link>${VAULT_URL}</link>
    <description>Deeply researched articles on African history, culture, true crime, and bizarre facts. Every fact verified. Every source cited.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${VAULT_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/images/logo/Apotheosis of Knowledge LOGO PNG-15.png</url>
      <title>The Vault — Apotheosis of Knowledge</title>
      <link>${VAULT_URL}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
