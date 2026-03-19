# CLAUDE_QUICKREF.md — Quick Reference Cheatsheet

## Quick Lookups

### Color Values

```css
/* Backgrounds */
--navy-950: #020617    /* Deepest */
--navy-900: #0A1628    /* Primary bg */
--navy-800: #0F2038    /* Cards */
--navy-700: #162A4A    /* Elevated */

/* Text */
--navy-100: #D4E4F0    /* Headings */
--navy-200: #A8C4DD    /* Primary text */
--navy-300: #7A9ABB    /* Secondary text */
--navy-400: #4A6A93    /* Muted */

/* Brand */
--blue-600: #2563EB    /* Primary brand */
--blue-500: #3B82F6    /* Links */
--blue-400: #60A5FA    /* Hover/focus */
--gold-500: #D4A84B    /* Accent */
```

### Fonts

```typescript
// Headings
font-family: 'Crimson Pro', Georgia, serif;

// Body
font-family: 'Inter', system-ui, sans-serif;
```

### Spacing Quick Reference

```
p-4  = 1rem = 16px
p-6  = 1.5rem = 24px
p-8  = 2rem = 32px
py-16 = 4rem = 64px (sections)
py-24 = 6rem = 96px (hero sections)
gap-6 = 1.5rem (card grids)
max-w-4xl = ~56rem (content)
max-w-7xl = ~80rem (page)
```

### Common Tailwind Patterns

```tsx
// Card
className="bg-navy-800 rounded-lg border border-navy-600 p-6"

// Interactive card
className="bg-navy-800 rounded-lg border border-navy-600 p-6 transition-all duration-300 hover:border-navy-500 hover:bg-navy-700 cursor-pointer"

// Page section
className="py-16 md:py-24"

// Page container
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"

// Content container
className="max-w-4xl mx-auto"

// Heading 1
className="font-serif text-4xl md:text-5xl font-bold text-navy-100 tracking-tight"

// Body text
className="text-navy-300 leading-relaxed"

// Link
className="text-blue-500 hover:text-blue-400 underline underline-offset-4"

// Button primary
className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"

// Badge
className="px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider bg-navy-700 text-navy-300 border border-navy-600"

// Focus ring
className="focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-navy-900"
```

---

## File Structure Cheatsheet

```
src/
├── app/
│   ├── (main)/
│   │   ├── page.tsx              # Homepage
│   │   ├── about/
│   │   │   ├── mission/page.tsx
│   │   │   └── registration/page.tsx
│   │   ├── work/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── vault/
│   │   │   ├── page.tsx
│   │   │   ├── [category]/page.tsx
│   │   │   └── [category]/[slug]/page.tsx
│   │   ├── timeline/page.tsx
│   │   └── contact/page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   └── error.tsx
├── components/
│   ├── ui/           # Button, Card, Badge, Input, Link
│   ├── layout/       # Navigation, Footer, PageHeader
│   ├── content/      # VaultCard, TimelineNode, MDXContent
│   └── icons/        # Logo, LogoMark, LogoFull
├── lib/
│   ├── content.ts    # Content fetching
│   ├── utils.ts      # cn(), formatDate()
│   └── search.ts     # Search utilities
└── types/
    └── index.ts      # All TypeScript types

content/
├── vault/
│   ├── history/
│   ├── culture/
│   ├── bizarre-facts/
│   └── true-crime/
├── pages/
└── data/
    ├── projects.json
    ├── timeline.json
    └── social-platforms.json
```

---

## Route Quick Reference

| Path | Component | Data Source |
|------|-----------|-------------|
| `/` | Homepage | Featured entries, projects |
| `/about/mission` | Mission page | MDX: pages/mission.mdx |
| `/about/registration` | CAC certificate | Static |
| `/work` | Projects list | JSON: projects.json |
| `/work/[slug]` | Project detail | JSON: projects.json |
| `/vault` | Vault landing | All entries |
| `/vault/[category]` | Category list | Filtered entries |
| `/vault/[category]/[slug]` | Entry detail | MDX file |
| `/timeline` | Timeline | JSON: timeline.json |
| `/contact` | Contact form | Static |

---

## Import Cheatsheet

```typescript
// UI Components
import { Button, Card, Badge, Input, CustomLink } from '@/components/ui';

// Layout Components
import { Navigation, Footer, PageHeader, Breadcrumbs } from '@/components/layout';

// Content Components
import { VaultCard, ProjectCard, TimelineNode, MDXContent } from '@/components/content';

// Icons
import { LogoMark, LogoFull } from '@/components/icons';

// Lucide Icons
import { ArrowRight, ExternalLink, Search, Menu, X } from 'lucide-react';

// Content Functions
import { 
  getVaultEntries, 
  getVaultEntry, 
  getProjects, 
  getTimelineEvents 
} from '@/lib/content';

// Utils
import { cn, formatDate } from '@/lib/utils';

// Types
import type { VaultEntry, Project, TimelineEvent } from '@/types';
```

---

## MDX Frontmatter Template

```yaml
---
title: "Title Here (10-100 chars)"
slug: slug-here
category: history  # history | culture | bizarre-facts | true-crime
excerpt: "150-200 character excerpt describing the content."
publishedAt: 2024-01-15
updatedAt: 2024-02-01  # optional
readingTime: 8
tags:
  - tag-one
  - tag-two
relatedEntries:  # optional
  - other-entry-slug
featuredImage:  # optional
  src: /images/content/image.jpg
  alt: Alt text here
  caption: Optional caption
featured: false
pinned: false
---
```

---

## Metadata Template

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | Apotheosis of Knowledge',
  description: 'Page description here (150-160 chars)',
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    type: 'website',
    url: 'https://aokltd.org/page',
    images: [{ url: '/images/og/page.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title',
    description: 'Page description',
  },
};
```

---

## Component Skeleton Templates

### Page Component

```typescript
// src/app/(main)/example/page.tsx
import { Metadata } from 'next';
import { PageHeader } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Page Title | Apotheosis of Knowledge',
  description: 'Description here',
};

export default function ExamplePage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader 
          title="Page Title"
          description="Page description text"
        />
        
        <section className="py-12">
          {/* Content */}
        </section>
      </div>
    </main>
  );
}
```

### Dynamic Page Component

```typescript
// src/app/(main)/vault/[category]/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getVaultEntry, getVaultEntries } from '@/lib/content';

interface PageProps {
  params: { category: string; slug: string };
}

export async function generateStaticParams() {
  const entries = await getVaultEntries();
  return entries.map((entry) => ({
    category: entry.category,
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const entry = await getVaultEntry(params.category, params.slug);
  if (!entry) return { title: 'Not Found' };
  
  return {
    title: `${entry.title} | Apotheosis of Knowledge`,
    description: entry.excerpt,
  };
}

export default async function VaultEntryPage({ params }: PageProps) {
  const entry = await getVaultEntry(params.category, params.slug);
  
  if (!entry) notFound();
  
  return (
    <main className="min-h-screen">
      {/* Content */}
    </main>
  );
}
```

### Client Component

```typescript
// src/components/example/ClientComponent.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ClientComponentProps {
  initialValue?: string;
  className?: string;
}

export function ClientComponent({ initialValue = '', className }: ClientComponentProps) {
  const [value, setValue] = useState(initialValue);
  
  return (
    <div className={cn('', className)}>
      {/* Interactive content */}
    </div>
  );
}
```

---

## Common Gotchas

1. **Always use `'use client'`** for components with useState, useEffect, or event handlers

2. **Images**: Always use next/image with width/height or fill

3. **Links**: Use next/link for internal, CustomLink for external

4. **Fonts**: Must be in layout.tsx with next/font

5. **Metadata**: Must be in page.tsx or layout.tsx, not client components

6. **Content functions**: Only work in Server Components

7. **cn() utility**: Requires clsx and tailwind-merge installed

8. **Focus states**: Always include for accessibility

---

## NPM Commands

```bash
# Development
npm run dev                    # Start dev server (port 3000)

# Build
npm run build                  # Production build
npm run start                  # Start production server

# Quality
npm run lint                   # ESLint
npm run type-check             # TypeScript checking

# Content
npm run content:validate       # Validate MDX frontmatter
npm run content:generate       # Generate search index
```

---

## Key Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next-mdx-remote": "^4.4.1",
    "gray-matter": "^4.0.3",
    "lucide-react": "^0.263.1",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "fuse.js": "^7.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0",
    "zod": "^3.22.0"
  }
}
```

---

## Brand Quick Reference

**Company:** Apotheosis of Knowledge Limited  
**RC Number:** 1956161  
**TIN:** 31050803-0001  
**Incorporated:** July 27, 2022  
**Domain:** aokltd.org  

**Taglines:**
- "Elevating curiosity. Countering noise."
- "Where knowledge finds its highest form."

**Social Handles:**
- Facebook: /apotheosisofknowledge
- TikTok: @apotheosisofknowledge
- Instagram: @apotheosisofknowledge
- X/Twitter: @aok_ltd