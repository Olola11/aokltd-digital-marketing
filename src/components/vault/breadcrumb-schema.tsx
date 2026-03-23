import { SITE_URL, VAULT_URL } from '@/lib/constants';

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      // Map vault URLs to the vault subdomain
      let fullUrl: string;
      if (item.url === '/') {
        fullUrl = SITE_URL;
      } else if (item.url === '/vault') {
        fullUrl = VAULT_URL;
      } else if (item.url.startsWith('/vault/')) {
        fullUrl = `${VAULT_URL}${item.url.replace('/vault', '')}`;
      } else {
        fullUrl = `${SITE_URL}${item.url}`;
      }

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
