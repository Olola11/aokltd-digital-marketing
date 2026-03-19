# CLAUDE_CONTENT.md — Content Structure & Data Models

## Overview

This document defines the content structure, data models, MDX schemas, and content management patterns for the Apotheosis of Knowledge website.

---

## TypeScript Type Definitions

### Core Types

```typescript
// src/types/index.ts

// ============================================
// VAULT CONTENT
// ============================================

export type VaultCategory = 'history' | 'culture' | 'bizarre-facts' | 'true-crime';

export interface VaultEntry {
  // Identifiers
  slug: string;
  category: VaultCategory;
  
  // Content
  title: string;
  excerpt: string;           // 150-200 characters
  content: string;           // Raw MDX content
  
  // Metadata
  publishedAt: string;       // ISO date string
  updatedAt?: string;        // ISO date string
  readingTime: number;       // Minutes
  
  // Taxonomy
  tags: string[];            // Lowercase, hyphenated
  relatedEntries?: string[]; // Array of slugs
  
  // Media
  featuredImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
  ogImage?: string;          // Open Graph image URL
  
  // Display
  featured?: boolean;        // Show on homepage
  pinned?: boolean;          // Pin to top of category
}

// ============================================
// PROJECTS / WORK
// ============================================

export type ProjectStatus = 'active' | 'coming-soon' | 'archived';

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;        // For navigation
  description: string;       // 100-150 characters
  longDescription?: string;  // Full MDX content
  status: ProjectStatus;
  icon?: string;             // Lucide icon name
  
  // Links
  primaryLink?: {
    label: string;
    href: string;
  };
  secondaryLinks?: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
  
  // Timeline
  launchDate?: string;       // ISO date or "Q1 2025" format
  
  // Display
  order: number;             // Sort order on /work page
  featured?: boolean;
}

// ============================================
// TIMELINE
// ============================================

export type TimelineEventStatus = 'completed' | 'current' | 'upcoming';

export interface TimelineEvent {
  id: string;
  date: string;              // Display format: "July 2022" or "Q1 2025"
  sortDate: string;          // ISO date for sorting
  title: string;
  description: string;       // 100-150 characters
  details?: string;          // Expandable content
  status: TimelineEventStatus;
  category?: 'milestone' | 'launch' | 'achievement' | 'goal';
  icon?: string;             // Lucide icon name
}

// ============================================
// SOCIAL PLATFORMS
// ============================================

export interface SocialPlatform {
  name: string;
  handle: string;
  url: string;
  icon: string;              // Lucide icon name or custom
  followers?: number;
  description: string;
  contentType: string[];     // e.g., ['short-form video', 'facts']
  order: number;
}

// ============================================
// TEAM (FUTURE)
// ============================================

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;               // 200-300 characters
  longBio?: string;          // Full MDX content
  image?: string;
  links?: Array<{
    platform: string;
    url: string;
  }>;
  order: number;
}

// ============================================
// NAVIGATION
// ============================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ============================================
// METADATA
// ============================================

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  noIndex?: boolean;
}

// ============================================
// SEARCH
// ============================================

export interface SearchResult {
  type: 'vault' | 'project' | 'page';
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  score?: number;
}

export interface SearchIndex {
  vault: Array<{
    slug: string;
    category: VaultCategory;
    title: string;
    excerpt: string;
    tags: string[];
  }>;
  projects: Array<{
    slug: string;
    title: string;
    description: string;
  }>;
}
```

---

## MDX Frontmatter Schemas

### Vault Entry Schema

```yaml
# content/vault/history/queen-amina-of-zazzau.mdx
---
title: "Queen Amina of Zazzau: Warrior Queen of the Hausa"
slug: queen-amina-of-zazzau
category: history
excerpt: "The legendary 16th-century warrior queen who expanded the Zazzau kingdom and built fortified walls that still bear her name across Nigeria."
publishedAt: 2024-01-15
updatedAt: 2024-02-01
readingTime: 8
tags:
  - nigeria
  - hausa
  - women-in-history
  - pre-colonial-africa
  - military-history
relatedEntries:
  - benin-bronze-legacy
  - nok-terracotta-civilization
featuredImage:
  src: /images/content/queen-amina.jpg
  alt: Artistic depiction of Queen Amina of Zazzau
  caption: Artist's interpretation of Queen Amina in traditional Hausa warrior attire
ogImage: /images/og/queen-amina.jpg
featured: true
pinned: false
---
```

### Project Schema

```yaml
# content/data/projects.json structure
{
  "projects": [
    {
      "slug": "social",
      "title": "Social Media Presence",
      "shortTitle": "Social",
      "description": "Sharing curiosity-driven content across platforms — facts, history, culture, and the wonderfully bizarre.",
      "status": "active",
      "icon": "Share2",
      "primaryLink": null,
      "secondaryLinks": [
        { "label": "Facebook", "href": "https://facebook.com/...", "external": true },
        { "label": "TikTok", "href": "https://tiktok.com/...", "external": true }
      ],
      "order": 1,
      "featured": true
    }
  ]
}
```

### Timeline Schema

```yaml
# content/data/timeline.json structure
{
  "events": [
    {
      "id": "incorporation",
      "date": "July 2022",
      "sortDate": "2022-07-27",
      "title": "Apotheosis of Knowledge Limited Incorporated",
      "description": "Officially registered as a private limited company with the Corporate Affairs Commission of Nigeria.",
      "details": "Registration number RC 1956161. This marked the formal establishment of AOK as a legitimate knowledge institution, not just a social media presence.",
      "status": "completed",
      "category": "milestone",
      "icon": "Building"
    }
  ]
}
```

---

## Content Directory Structure

```
content/
├── vault/
│   ├── history/
│   │   ├── queen-amina-of-zazzau.mdx
│   │   ├── benin-bronze-legacy.mdx
│   │   ├── nok-terracotta-civilization.mdx
│   │   ├── sokoto-caliphate-rise.mdx
│   │   └── ...
│   ├── culture/
│   │   ├── nigerian-naming-traditions.mdx
│   │   ├── yoruba-orisha-pantheon.mdx
│   │   └── ...
│   ├── bizarre-facts/
│   │   ├── lake-natron-stone-animals.mdx
│   │   ├── synchronous-fireflies.mdx
│   │   └── ...
│   └── true-crime/
│       ├── ...
│       └── ...
├── pages/
│   ├── mission.mdx              # /about/mission content
│   └── contact-info.mdx         # /contact content
└── data/
    ├── projects.json            # Work/projects data
    ├── timeline.json            # Timeline events
    ├── social-platforms.json    # Social media links
    ├── navigation.json          # Site navigation
    └── site-config.json         # Global site configuration
```

---

## Content Fetching Functions

```typescript
// src/lib/content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { VaultEntry, VaultCategory, Project, TimelineEvent } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const VAULT_DIR = path.join(CONTENT_DIR, 'vault');
const DATA_DIR = path.join(CONTENT_DIR, 'data');

// ============================================
// VAULT ENTRIES
// ============================================

export async function getVaultEntries(): Promise<VaultEntry[]> {
  const categories: VaultCategory[] = ['history', 'culture', 'bizarre-facts', 'true-crime'];
  const entries: VaultEntry[] = [];
  
  for (const category of categories) {
    const categoryDir = path.join(VAULT_DIR, category);
    
    if (!fs.existsSync(categoryDir)) continue;
    
    const files = fs.readdirSync(categoryDir).filter(f => f.endsWith('.mdx'));
    
    for (const file of files) {
      const filePath = path.join(categoryDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      entries.push({
        slug: data.slug || file.replace('.mdx', ''),
        category,
        title: data.title,
        excerpt: data.excerpt,
        content,
        publishedAt: data.publishedAt,
        updatedAt: data.updatedAt,
        readingTime: data.readingTime,
        tags: data.tags || [],
        relatedEntries: data.relatedEntries,
        featuredImage: data.featuredImage,
        ogImage: data.ogImage,
        featured: data.featured || false,
        pinned: data.pinned || false,
      });
    }
  }
  
  // Sort by publishedAt descending
  return entries.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getVaultEntry(
  category: VaultCategory, 
  slug: string
): Promise<VaultEntry | null> {
  const filePath = path.join(VAULT_DIR, category, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) return null;
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    slug,
    category,
    title: data.title,
    excerpt: data.excerpt,
    content,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    readingTime: data.readingTime,
    tags: data.tags || [],
    relatedEntries: data.relatedEntries,
    featuredImage: data.featuredImage,
    ogImage: data.ogImage,
    featured: data.featured || false,
    pinned: data.pinned || false,
  };
}

export async function getVaultEntriesByCategory(
  category: VaultCategory
): Promise<VaultEntry[]> {
  const entries = await getVaultEntries();
  return entries.filter(e => e.category === category);
}

export async function getFeaturedVaultEntries(limit = 4): Promise<VaultEntry[]> {
  const entries = await getVaultEntries();
  return entries.filter(e => e.featured).slice(0, limit);
}

export async function getRelatedEntries(
  entry: VaultEntry, 
  limit = 3
): Promise<VaultEntry[]> {
  if (!entry.relatedEntries?.length) {
    // Fallback: get entries from same category
    const categoryEntries = await getVaultEntriesByCategory(entry.category);
    return categoryEntries
      .filter(e => e.slug !== entry.slug)
      .slice(0, limit);
  }
  
  const entries = await getVaultEntries();
  return entries
    .filter(e => entry.relatedEntries?.includes(e.slug))
    .slice(0, limit);
}

// ============================================
// PROJECTS
// ============================================

export async function getProjects(): Promise<Project[]> {
  const filePath = path.join(DATA_DIR, 'projects.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { projects } = JSON.parse(fileContent);
  
  return projects.sort((a: Project, b: Project) => a.order - b.order);
}

export async function getProject(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(p => p.slug === slug) || null;
}

// ============================================
// TIMELINE
// ============================================

export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  const filePath = path.join(DATA_DIR, 'timeline.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { events } = JSON.parse(fileContent);
  
  // Sort by sortDate descending (most recent first)
  return events.sort((a: TimelineEvent, b: TimelineEvent) => 
    new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime()
  );
}

// ============================================
// SOCIAL PLATFORMS
// ============================================

export async function getSocialPlatforms(): Promise<SocialPlatform[]> {
  const filePath = path.join(DATA_DIR, 'social-platforms.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { platforms } = JSON.parse(fileContent);
  
  return platforms.sort((a: SocialPlatform, b: SocialPlatform) => a.order - b.order);
}

// ============================================
// MDX PAGES
// ============================================

export async function getPageContent(slug: string): Promise<{ content: string; meta: any } | null> {
  const filePath = path.join(CONTENT_DIR, 'pages', `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) return null;
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return { content, meta: data };
}
```

---

## JSON Data File Examples

### projects.json

```json
{
  "projects": [
    {
      "slug": "social",
      "title": "Social Media Presence",
      "shortTitle": "Social",
      "description": "Sharing curiosity-driven content across platforms — facts, history, culture, and the wonderfully bizarre.",
      "status": "active",
      "icon": "Share2",
      "order": 1,
      "featured": true
    },
    {
      "slug": "documentaries",
      "title": "YouTube Documentaries",
      "shortTitle": "Documentaries",
      "description": "Deeply researched, visually compelling video essays exploring history, culture, and ideas.",
      "status": "coming-soon",
      "icon": "Video",
      "launchDate": "Q3 2025",
      "order": 2,
      "featured": true
    },
    {
      "slug": "publications",
      "title": "Books & Publications",
      "shortTitle": "Publications",
      "description": "Trivia compilations, bathroom readers, and accessible popular history books.",
      "status": "coming-soon",
      "icon": "BookOpen",
      "launchDate": "2026",
      "order": 3,
      "featured": false
    },
    {
      "slug": "trivia-app",
      "title": "Nigeria Trivia App",
      "shortTitle": "Trivia App",
      "description": "A quiz app celebrating Nigerian history, culture, politics, geography, and national memory.",
      "status": "coming-soon",
      "icon": "Smartphone",
      "launchDate": "2026",
      "order": 4,
      "featured": false
    }
  ]
}
```

### timeline.json

```json
{
  "events": [
    {
      "id": "incorporation",
      "date": "July 2022",
      "sortDate": "2022-07-27",
      "title": "Apotheosis of Knowledge Limited Incorporated",
      "description": "Officially registered as a private limited company with Nigeria's Corporate Affairs Commission.",
      "details": "Registration number RC 1956161. Tax Identification Number 31050803-0001. This marked the formal establishment of AOK as a legitimate knowledge institution.",
      "status": "completed",
      "category": "milestone",
      "icon": "Building"
    },
    {
      "id": "facebook-launch",
      "date": "August 2022",
      "sortDate": "2022-08-15",
      "title": "Facebook Page & Group Launched",
      "description": "Began sharing daily facts, historical insights, and curiosity-driven content.",
      "status": "completed",
      "category": "launch",
      "icon": "Users"
    },
    {
      "id": "multi-platform",
      "date": "2023",
      "sortDate": "2023-06-01",
      "title": "Multi-Platform Expansion",
      "description": "Expanded to TikTok, Instagram, X/Twitter, and WhatsApp Channel.",
      "status": "completed",
      "category": "milestone",
      "icon": "Globe"
    },
    {
      "id": "website-launch",
      "date": "2024",
      "sortDate": "2024-01-01",
      "title": "Official Website Launch",
      "description": "Launched aokltd.org as the digital headquarters of the knowledge initiative.",
      "status": "current",
      "category": "launch",
      "icon": "Monitor"
    },
    {
      "id": "youtube-launch",
      "date": "Q3 2025",
      "sortDate": "2025-07-01",
      "title": "YouTube Documentary Channel",
      "description": "Launch of long-form video essays and documentary content.",
      "status": "upcoming",
      "category": "goal",
      "icon": "Video"
    },
    {
      "id": "first-book",
      "date": "2026",
      "sortDate": "2026-01-01",
      "title": "First Book Publication",
      "description": "Publication of first trivia compilation or popular history book.",
      "status": "upcoming",
      "category": "goal",
      "icon": "BookOpen"
    },
    {
      "id": "trivia-app-launch",
      "date": "2026",
      "sortDate": "2026-06-01",
      "title": "Nigeria Trivia App Launch",
      "description": "Release of the Nigeria-focused quiz and trivia mobile application.",
      "status": "upcoming",
      "category": "goal",
      "icon": "Smartphone"
    }
  ]
}
```

### social-platforms.json

```json
{
  "platforms": [
    {
      "name": "Facebook",
      "handle": "Apotheosis of Knowledge",
      "url": "https://facebook.com/apotheosisofknowledge",
      "icon": "Facebook",
      "description": "Our primary community hub for facts, discussions, and knowledge sharing.",
      "contentType": ["facts", "history", "discussions"],
      "order": 1
    },
    {
      "name": "TikTok",
      "handle": "@apotheosisofknowledge",
      "url": "https://tiktok.com/@apotheosisofknowledge",
      "icon": "Video",
      "description": "Short-form video content — quick facts and historical moments.",
      "contentType": ["short-form video", "facts"],
      "order": 2
    },
    {
      "name": "Instagram",
      "handle": "@apotheosisofknowledge",
      "url": "https://instagram.com/apotheosisofknowledge",
      "icon": "Instagram",
      "description": "Visual content, infographics, and story-driven posts.",
      "contentType": ["images", "infographics", "stories"],
      "order": 3
    },
    {
      "name": "X (Twitter)",
      "handle": "@aok_ltd",
      "url": "https://x.com/aok_ltd",
      "icon": "Twitter",
      "description": "Quick facts, threads, and real-time engagement.",
      "contentType": ["threads", "facts", "commentary"],
      "order": 4
    },
    {
      "name": "WhatsApp Channel",
      "handle": "Apotheosis of Knowledge",
      "url": "https://whatsapp.com/channel/...",
      "icon": "MessageCircle",
      "description": "Daily knowledge drops delivered directly to your WhatsApp.",
      "contentType": ["daily facts", "updates"],
      "order": 5
    }
  ]
}
```

---

## Sample MDX Content

### Vault Entry Example

```mdx
---
title: "The Benin Bronzes: Art, Empire, and Colonial Theft"
slug: benin-bronze-legacy
category: history
excerpt: "The Benin Bronzes are among the most significant artworks in human history — and their story is one of both artistic brilliance and colonial violence."
publishedAt: 2024-01-20
readingTime: 12
tags:
  - nigeria
  - benin-kingdom
  - colonial-history
  - art-history
  - repatriation
relatedEntries:
  - queen-amina-of-zazzau
  - nok-terracotta-civilization
featured: true
---

In 1897, British forces launched a punitive expedition against the Kingdom of Benin in what is now southern Nigeria. What they found astonished them: a sophisticated court culture with a tradition of bronze casting that rivaled anything in Renaissance Europe.

<InsightBox variant="insight">
The Benin Bronzes were not actually bronze at all — most were brass, made using a sophisticated lost-wax casting technique that Benin artisans had perfected over centuries.
</InsightBox>

## The Kingdom of Benin

The Kingdom of Benin (not to be confused with the modern Republic of Benin) was one of the most powerful states in West African history. At its height in the 16th century, the kingdom controlled a vast territory and maintained complex diplomatic relations with European powers.

The Oba (king) of Benin commanded an administration that Portuguese visitors compared favorably to European courts. The capital city, Benin City, was described by Dutch visitors in 1602 as larger than Amsterdam, with wide streets and houses in good order.

## The Art of the Court

The bronzes — plaques, heads, figures, and ceremonial objects — were created exclusively for the Oba's court. They served multiple purposes:

- Recording historical events and court ceremonies
- Commemorating past Obas and queen mothers
- Demonstrating the wealth and power of the kingdom
- Serving ritual and spiritual functions

The technical sophistication of these works stunned European observers. The lost-wax casting technique used by Benin artisans produced works of extraordinary detail and naturalism.

<InsightBox variant="quote" source="Mary Kingsley, British explorer, 1897">
The bronzes of Benin are of such excellence that in many respects they surpass the work of modern European artists.
</InsightBox>

## The 1897 Expedition

The British punitive expedition of 1897 was ostensibly a response to the killing of a British diplomatic party. In reality, it was part of a broader colonial strategy to dominate the region and control the lucrative palm oil trade.

British forces burned Benin City and looted approximately 3,000 to 4,000 bronzes, ivories, and other artworks. These were shipped to Britain where they were sold to museums and private collectors to pay for the expedition's costs.

## The Question of Repatriation

Today, Benin Bronzes are held in over 160 museums worldwide. The British Museum alone holds more than 900 objects from Benin. For decades, Nigeria has called for their return.

In recent years, momentum has shifted. Germany announced in 2021 that it would return hundreds of Benin Bronzes. The Horniman Museum in London followed. The debate continues in institutions across Europe and North America.

---

## Sources

<SourceCitation 
  number={1}
  author="Plankensteiner, Barbara"
  title="Benin: Kings and Rituals: Court Arts from Nigeria"
  source="Museum für Völkerkunde"
  year="2007"
/>

<SourceCitation 
  number={2}
  title="The Benin Bronzes: A Tragic Story of Colonialism"
  source="The Guardian"
  year="2021"
  url="https://theguardian.com/..."
/>
```

### Mission Page Example

```mdx
---
title: Our Mission
description: Why Apotheosis of Knowledge exists and what we're building.
---

# Why We Exist

The internet is drowning in noise.

Every day, billions of people scroll through feeds optimized for engagement, not enlightenment. Algorithms reward outrage over insight, simplicity over depth, reaction over reflection. The currency of attention has been debased.

**Apotheosis of Knowledge exists to offer an alternative.**

We believe that curiosity is a virtue worth cultivating. That the strange, the historical, and the true deserve as much attention as the trending. That there is an audience — perhaps a large one — hungry for content that treats their intelligence with respect.

## What We Do

We create intellectually stimulating, curiosity-driven content across multiple platforms and formats:

**Today:**
- Daily facts, historical insights, and cultural analysis shared across Facebook, TikTok, Instagram, X, and WhatsApp
- Carefully researched content that prioritizes accuracy over virality
- A community of curious minds who value depth over distraction

**Tomorrow:**
- Long-form YouTube documentaries exploring history and ideas
- Published books — trivia compilations, bathroom readers, popular histories
- A Nigeria-focused quiz app celebrating national memory and knowledge

## Our Standards

Every piece of content we produce adheres to these principles:

1. **Accuracy First** — We verify before we share. When we're uncertain, we say so.
2. **Respect for Complexity** — We resist the urge to oversimplify. The world is complicated; our content reflects that.
3. **No Clickbait** — We refuse to manipulate attention. If something is interesting, we trust it to speak for itself.
4. **Intellectual Honesty** — We distinguish between facts and interpretations, between what we know and what we believe.

## The Name

"Apotheosis" means elevation to divine status — the highest form something can achieve.

We chose this name not out of arrogance, but aspiration. We believe knowledge deserves to be elevated, celebrated, and shared with the reverence it warrants. In a world that too often treats information as disposable, we aim for something more enduring.

## Join Us

Whether you follow us for a daily fact or spend hours exploring our archives, you're part of something larger: a community that believes learning should never stop, that curiosity is its own reward, and that the pursuit of knowledge is one of the most human things we can do.

Welcome to Apotheosis of Knowledge.
```

---

## Content Validation

### Frontmatter Validation Script

```typescript
// scripts/validate-content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const VaultEntrySchema = z.object({
  title: z.string().min(10).max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: z.enum(['history', 'culture', 'bizarre-facts', 'true-crime']),
  excerpt: z.string().min(100).max(250),
  publishedAt: z.string().datetime(),
  readingTime: z.number().min(1).max(30),
  tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1).max(10),
  relatedEntries: z.array(z.string()).optional(),
  featuredImage: z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  }).optional(),
  ogImage: z.string().optional(),
  featured: z.boolean().optional(),
  pinned: z.boolean().optional(),
});

async function validateVaultEntries() {
  const VAULT_DIR = path.join(process.cwd(), 'content', 'vault');
  const categories = ['history', 'culture', 'bizarre-facts', 'true-crime'];
  const errors: string[] = [];
  
  for (const category of categories) {
    const categoryDir = path.join(VAULT_DIR, category);
    if (!fs.existsSync(categoryDir)) continue;
    
    const files = fs.readdirSync(categoryDir).filter(f => f.endsWith('.mdx'));
    
    for (const file of files) {
      const filePath = path.join(categoryDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);
      
      const result = VaultEntrySchema.safeParse(data);
      
      if (!result.success) {
        errors.push(`\n${category}/${file}:`);
        result.error.issues.forEach(issue => {
          errors.push(`  - ${issue.path.join('.')}: ${issue.message}`);
        });
      }
    }
  }
  
  if (errors.length > 0) {
    console.error('Validation errors found:');
    console.error(errors.join('\n'));
    process.exit(1);
  }
  
  console.log('All content validated successfully!');
}

validateVaultEntries();
```

---

## Search Index Generation

```typescript
// scripts/generate-search-index.ts
import fs from 'fs';
import path from 'path';
import { getVaultEntries, getProjects } from '../src/lib/content';
import type { SearchIndex } from '../src/types';

async function generateSearchIndex() {
  const vaultEntries = await getVaultEntries();
  const projects = await getProjects();
  
  const searchIndex: SearchIndex = {
    vault: vaultEntries.map(entry => ({
      slug: entry.slug,
      category: entry.category,
      title: entry.title,
      excerpt: entry.excerpt,
      tags: entry.tags,
    })),
    projects: projects.map(project => ({
      slug: project.slug,
      title: project.title,
      description: project.description,
    })),
  };
  
  const outputPath = path.join(process.cwd(), 'public', 'search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
  
  console.log(`Search index generated: ${outputPath}`);
  console.log(`  - ${searchIndex.vault.length} vault entries`);
  console.log(`  - ${searchIndex.projects.length} projects`);
}

generateSearchIndex();
```

---

## Content Guidelines Reference

### Writing Voice

| Attribute | Description |
|-----------|-------------|
| Tone | Academic-lite — rigorous but accessible |
| Audience | Intelligent non-specialists |
| Length | Vault entries: 800-2000 words |
| Structure | Clear sections, but not formulaic |

### Excerpt Guidelines

- 150-200 characters
- No clickbait
- Convey the core insight or hook
- Complete sentence(s)
- End with intrigue, not a cliffhanger

**Good:** "The Benin Bronzes are among the most significant artworks in human history — and their story is one of both artistic brilliance and colonial violence."

**Bad:** "You won't believe what the British did to these amazing bronzes!"

### Tag Conventions

- All lowercase
- Use hyphens for multi-word tags
- Be specific but not overly narrow
- Maximum 10 tags per entry
- Examples: `pre-colonial-africa`, `military-history`, `women-in-history`

### Image Guidelines

- Prefer original or properly licensed images
- No stock photos
- All images need alt text for accessibility
- Featured images should be 1200x630 for OG compatibility
- Use WebP format where possible
