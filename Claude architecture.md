# CLAUDE_ARCHITECTURE.md — Technical Architecture

## Overview

This document defines the technical architecture for the Apotheosis of Knowledge website. It covers routing structure, data flow, state management, and integration patterns.

---

## Routing Architecture (Next.js App Router)

### Route Map

```
/                           → Homepage
/about                      → About landing (redirects to /about/mission)
/about/mission              → Mission statement and manifesto
/about/registration         → CAC certificate and institutional credentials
/about/team                 → Team members (future)

/work                       → Work/projects landing page
/work/social                → Social media presence overview
/work/documentaries         → YouTube documentaries (future-ready)
/work/documentaries/[slug]  → Individual documentary page
/work/publications          → Books and publications (future-ready)
/work/publications/[slug]   → Individual publication page
/work/trivia-app            → Nigeria quiz app (future-ready)

/vault                      → Knowledge vault landing
/vault/[category]           → Category listing (history, culture, bizarre-facts, true-crime)
/vault/[category]/[slug]    → Individual vault entry

/timeline                   → Institutional timeline

/contact                    → Contact form and information

/api/search                 → Search API endpoint
/api/revalidate             → On-demand ISR revalidation (future)
```

### Route Groups

```
src/app/
├── (main)/                 # Main site with standard layout
│   ├── layout.tsx          # Includes Nav + Footer
│   ├── page.tsx            # Homepage
│   ├── about/
│   ├── work/
│   ├── vault/
│   ├── timeline/
│   └── contact/
├── api/                    # API routes
├── layout.tsx              # Root layout (fonts, metadata)
├── globals.css
├── not-found.tsx           # Custom 404
└── error.tsx               # Global error boundary
```

---

## Data Layer Architecture

### Content Sources

```
┌─────────────────────────────────────────────────────────┐
│                    Content Sources                       │
├─────────────────┬─────────────────┬─────────────────────┤
│   MDX Files     │   JSON Files    │   Sanity CMS        │
│   /content/     │   /content/     │   (Future)          │
│                 │   data/         │                     │
├─────────────────┴─────────────────┴─────────────────────┤
│                 Content Processing Layer                 │
│   - MDX compilation (next-mdx-remote)                   │
│   - Frontmatter parsing (gray-matter)                   │
│   - Search index generation                             │
├─────────────────────────────────────────────────────────┤
│                    Data Access Layer                     │
│   src/lib/content.ts                                    │
│   - getVaultEntries()                                   │
│   - getVaultEntry(category, slug)                       │
│   - getTimelineEvents()                                 │
│   - getProjects()                                       │
│   - searchContent(query)                                │
└─────────────────────────────────────────────────────────┘
```

### File-Based Content Structure

```
content/
├── vault/
│   ├── history/
│   │   ├── queen-amina-of-zazzau.mdx
│   │   ├── benin-bronze-legacy.mdx
│   │   └── ...
│   ├── culture/
│   │   ├── nigerian-naming-traditions.mdx
│   │   └── ...
│   ├── bizarre-facts/
│   │   └── ...
│   └── true-crime/
│       └── ...
├── pages/
│   ├── mission.mdx
│   └── ...
└── data/
    ├── timeline.json
    ├── projects.json
    ├── social-platforms.json
    └── navigation.json
```

---

## Data Fetching Patterns

### Static Generation (Default)

Most pages use static generation with ISR (Incremental Static Regeneration):

```typescript
// src/app/vault/[category]/[slug]/page.tsx
import { getVaultEntry, getVaultEntries } from '@/lib/content';

export async function generateStaticParams() {
  const entries = await getVaultEntries();
  return entries.map((entry) => ({
    category: entry.category,
    slug: entry.slug,
  }));
}

export default async function VaultEntryPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const entry = await getVaultEntry(params.category, params.slug);
  return <VaultEntryContent entry={entry} />;
}
```

### Revalidation Strategy

```typescript
// For content that changes infrequently
export const revalidate = 86400; // 24 hours

// For pages that should always be fresh
export const revalidate = 0; // No caching

// For most content pages
export const revalidate = 3600; // 1 hour
```

---

## Component Architecture

### Component Hierarchy

```
Layout Components
├── RootLayout              # Font loading, metadata, providers
├── MainLayout              # Nav + Footer wrapper
├── PageLayout              # Standard page container with max-width
└── VaultLayout             # Vault-specific with sidebar

UI Components (Atomic)
├── Button
├── Card
├── Badge
├── Input
├── Textarea
├── Link (custom)
└── Icon

Content Components
├── MDXContent              # MDX renderer with custom components
├── VaultCard               # Vault entry preview card
├── ProjectCard             # Work/project card
├── TimelineNode            # Timeline milestone
├── CategoryBadge           # Category indicator
├── SourceCitation          # Academic-style citation
└── InsightBox              # Highlighted insight/quote

Layout-Specific Components
├── Navigation              # Main nav with mobile menu
├── Footer                  # Site footer
├── Breadcrumbs             # Navigation breadcrumbs
├── TableOfContents         # In-page navigation (long content)
└── SearchModal             # Global search overlay
```

### Component Import Conventions

```typescript
// UI components from barrel export
import { Button, Card, Badge } from '@/components/ui';

// Layout components
import { Navigation, Footer } from '@/components/layout';

// Content components
import { VaultCard, TimelineNode } from '@/components/content';

// Icons
import { Logo, LogoMark, Quill } from '@/components/icons';
```

---

## State Management

### Principles

1. **Minimize client state** — Most data is server-rendered
2. **URL as state** — Use URL params for filters, search, pagination
3. **Local state only for UI** — Modals, dropdowns, form inputs

### Patterns

```typescript
// Search state in URL
// /vault?q=nigeria&category=history

// Client component for interactive features
'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export function VaultFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const category = searchParams.get('category') || 'all';
  
  const setCategory = (newCategory: string) => {
    const params = new URLSearchParams(searchParams);
    if (newCategory === 'all') {
      params.delete('category');
    } else {
      params.set('category', newCategory);
    }
    router.push(`/vault?${params.toString()}`);
  };
  
  return (/* ... */);
}
```

---

## Search Architecture

### Client-Side Search (Initial Implementation)

```typescript
// src/lib/search.ts
import Fuse from 'fuse.js';
import { VaultEntry } from '@/types';

let fuseInstance: Fuse<VaultEntry> | null = null;

export async function initializeSearch(entries: VaultEntry[]) {
  fuseInstance = new Fuse(entries, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'excerpt', weight: 1 },
      { name: 'tags', weight: 1.5 },
      { name: 'category', weight: 0.5 },
    ],
    threshold: 0.3,
    includeScore: true,
  });
}

export function search(query: string): VaultEntry[] {
  if (!fuseInstance) return [];
  return fuseInstance.search(query).map((result) => result.item);
}
```

### Search Index Generation

```typescript
// scripts/generate-search-index.ts
// Run during build: npm run content:generate

import { getVaultEntries } from '../src/lib/content';
import fs from 'fs';

async function generateSearchIndex() {
  const entries = await getVaultEntries();
  
  const searchIndex = entries.map((entry) => ({
    slug: entry.slug,
    category: entry.category,
    title: entry.title,
    excerpt: entry.excerpt,
    tags: entry.tags,
  }));
  
  fs.writeFileSync(
    'public/search-index.json',
    JSON.stringify(searchIndex)
  );
}

generateSearchIndex();
```

---

## SEO & Metadata

### Metadata Pattern

```typescript
// src/app/vault/[category]/[slug]/page.tsx
import { Metadata } from 'next';
import { getVaultEntry } from '@/lib/content';

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const entry = await getVaultEntry(params.category, params.slug);
  
  return {
    title: `${entry.title} | Apotheosis of Knowledge`,
    description: entry.excerpt,
    openGraph: {
      title: entry.title,
      description: entry.excerpt,
      type: 'article',
      publishedTime: entry.publishedAt,
      authors: ['Apotheosis of Knowledge'],
      images: entry.ogImage ? [entry.ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.excerpt,
    },
  };
}
```

### Structured Data

```typescript
// src/components/content/VaultEntryStructuredData.tsx
export function VaultEntryStructuredData({ entry }: { entry: VaultEntry }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.title,
    description: entry.excerpt,
    author: {
      '@type': 'Organization',
      name: 'Apotheosis of Knowledge Limited',
      url: 'https://aokltd.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Apotheosis of Knowledge Limited',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aokltd.org/images/logo/logo-full.png',
      },
    },
    datePublished: entry.publishedAt,
    dateModified: entry.updatedAt || entry.publishedAt,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 95 |
| Lighthouse Accessibility | 100 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.5s |

### Performance Strategies

1. **Image Optimization**
   - Use Next.js Image component exclusively
   - WebP format with fallbacks
   - Lazy loading for below-fold images
   - Blur placeholder for hero images

2. **Code Splitting**
   - Dynamic imports for modals and heavy components
   - Route-based code splitting (automatic with App Router)

3. **Font Loading**
   - Use next/font for optimal loading
   - Preload critical fonts
   - Font-display: swap

4. **Caching**
   - Static pages with ISR
   - Immutable assets with long cache
   - Search index cached in browser

---

## Error Handling

### Error Boundary Pattern

```typescript
// src/app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-serif text-navy-100 mb-4">
          Something went wrong
        </h1>
        <p className="text-navy-300 mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

### 404 Pattern

```typescript
// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-serif text-navy-100 mb-4">404</h1>
        <p className="text-xl text-navy-300 mb-6">
          This page doesn't exist in our archives.
        </p>
        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          Return to homepage
        </Link>
      </div>
    </div>
  );
}
```

---

## Future Architecture Considerations

### Sanity CMS Migration Path

When migrating from MDX to Sanity:

1. Create Sanity schemas matching MDX frontmatter
2. Import existing content via migration script
3. Update data fetching functions to use Sanity client
4. Keep MDX components for rich text rendering
5. Enable preview mode for draft content

### API Layer (Future)

If/when a public API is needed:

```
/api/v1/
├── /vault                  # List vault entries
├── /vault/[slug]           # Single vault entry
├── /search                 # Search endpoint
└── /timeline               # Timeline events
```

### Multi-Language Support (Future)

Next.js App Router i18n structure:

```
src/app/
├── [locale]/
│   ├── (main)/
│   │   ├── page.tsx
│   │   └── ...
│   └── layout.tsx
└── middleware.ts           # Locale detection/redirect
```

---

## Deployment Configuration

### Vercel Settings

```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/about",
      "destination": "/about/mission",
      "permanent": false
    }
  ]
}
```

### Environment Variables (Vercel)

```
NEXT_PUBLIC_SITE_URL=https://aokltd.org
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=aokltd.org
```

---

## Security Considerations

1. **Content Security Policy** — Configured in middleware
2. **No user-generated content** — Eliminates XSS surface
3. **Form submissions** — Rate limited, honeypot fields
4. **API routes** — CORS configured for own domain only
5. **Dependencies** — Regular audits via `npm audit`