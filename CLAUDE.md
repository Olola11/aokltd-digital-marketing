# CLAUDE.md — Apotheosis of Knowledge Website

## Project Identity

**Project Name:** Apotheosis of Knowledge (AOK) Website  
**Domain:** aokltd.org  
**Organization:** Apotheosis of Knowledge Limited  
**Registration:** RC 1956161 (Nigeria CAC, July 27, 2022)  
**TIN:** 31050803-0001

---

## Mission Statement

Apotheosis of Knowledge exists to counter the dominance of low-value, shallow, and sensational content online by producing intellectually stimulating, curiosity-driven, and educational material. The website serves as the **digital headquarters** of this knowledge initiative — not a blog, not a content farm, but an institutional presence.

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS with custom theme |
| Content | MDX files initially, Sanity CMS at scale |
| Hosting | Vercel |
| Analytics | Plausible (privacy-first) |
| Fonts | Crimson Pro (headings) + Inter (body) via next/font |

---

## Core Design Principles

### 1. Intellectual Seriousness
- The site should feel like a well-curated research library's reading room
- Prioritize depth over breadth in content presentation
- Never use clickbait language or engagement-bait patterns

### 2. Visual Restraint
- Generous whitespace — let ideas breathe
- Minimal animation — purposeful, not decorative
- No stock photos — better to use no images than generic ones

### 3. Institutional Permanence
- Design for 10+ year longevity
- Avoid trendy patterns that will date quickly
- The CAC registration is a credibility anchor — display it prominently

### 4. Accessibility First
- WCAG 2.1 AA compliance minimum
- Semantic HTML throughout
- Keyboard navigation support
- Screen reader optimization

---

## Project Structure

```
aok-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (main)/            # Main site layout group
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── about/
│   │   │   ├── work/
│   │   │   ├── vault/
│   │   │   ├── timeline/
│   │   │   └── contact/
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Layout components (Nav, Footer)
│   │   ├── content/           # Content-specific components
│   │   └── icons/             # Custom icons
│   ├── lib/
│   │   ├── content.ts         # Content fetching utilities
│   │   ├── mdx.ts             # MDX processing
│   │   └── utils.ts           # General utilities
│   └── types/
│       └── index.ts           # TypeScript type definitions
├── content/
│   ├── vault/                 # Vault entries (MDX)
│   ├── pages/                 # Static page content (MDX)
│   └── data/                  # JSON data files
│       ├── timeline.json
│       └── projects.json
├── public/
│   ├── images/
│   │   ├── logo/              # Logo variations
│   │   └── content/           # Content images
│   └── fonts/                 # Self-hosted fonts (if needed)
├── CLAUDE.md                  # This file
├── CLAUDE_ARCHITECTURE.md     # Technical architecture details
├── CLAUDE_DESIGN_SYSTEM.md    # Design tokens and specifications
├── CLAUDE_COMPONENTS.md       # Component patterns
└── CLAUDE_CONTENT.md          # Content structure and data models
```

---

## Key Commands

```bash
# Development
npm run dev                    # Start development server
npm run build                  # Production build
npm run lint                   # Run ESLint
npm run type-check             # TypeScript checking

# Content
npm run content:validate       # Validate MDX frontmatter
npm run content:generate       # Generate content indexes
```

---

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://aokltd.org
NEXT_PUBLIC_GA_ID=                    # Optional: Plausible ID
SANITY_PROJECT_ID=                    # Future: Sanity CMS
SANITY_DATASET=production             # Future: Sanity CMS
```

---

## Critical Constraints

### DO:
- Use TypeScript strict mode throughout
- Implement proper loading states and error boundaries
- Optimize images with Next.js Image component
- Use semantic HTML elements
- Write descriptive commit messages
- Follow the established component patterns
- Reference design system tokens for all styling

### DO NOT:
- Add monetization features (ads, paywalls, donation buttons)
- Use aggressive CTAs or marketing language
- Implement infinite scroll on any page
- Display social engagement metrics (likes, shares)
- Use emoji in professional content areas
- Add third-party tracking scripts (except Plausible)
- Use stock photography
- Implement dark mode (brand colors are designed for dark theme only)

---

## Content Guidelines

### Voice & Tone
- Academic-lite: Rigorous but accessible
- Confident but not arrogant
- Curiosity as the organizing principle
- Write as if addressing intelligent non-specialists

### Forbidden Language Patterns
- "You won't believe..."
- "Mind-blowing"
- "Epic"
- "Ultimate guide to..."
- Any clickbait formulations
- Excessive exclamation marks

---

## Related Documentation

- `CLAUDE_ARCHITECTURE.md` — Technical architecture, routing, data flow
- `CLAUDE_DESIGN_SYSTEM.md` — Colors, typography, spacing, animations
- `CLAUDE_COMPONENTS.md` — Component specifications and patterns
- `CLAUDE_CONTENT.md` — Content models, MDX schemas, data structures

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-XX-XX | Initial architecture and design system |

---

## Contact

For questions about this project's direction or brand guidelines, refer to the founding documents and certificate of incorporation uploaded with this project.
# CLAUDE.md — Apotheosis of Knowledge (AOK) Website

> This file is the single source of truth for every Claude Code session working on this project.
> Read this ENTIRE file before making any changes to any file.

---

## Project Identity

**Company:** Apotheosis of Knowledge Limited (RC: 1956161)
**Domain:** aokltd.org
**Tagline:** "Elevating curiosity. Countering noise."
**Mission:** A Nigerian knowledge initiative producing research-driven content for the endlessly curious. We create educational content to counter shallow, ad-driven online material.
**Content Focus:** African history & culture, true crime, bitesize knowledge, random/bizarre facts, trivia — delivered via YouTube, Facebook, TikTok, and the website itself.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Hosting:** Vercel (custom domain via Namecheap DNS)
- **Version Control:** Git / GitHub
- **Package Manager:** npm

---

## Typography System (CURRENT — Space Grotesk + Source Serif 4)

The site uses TWO fonts only. Do NOT introduce any other fonts.

| Role | Font | Tailwind Class | Weight |
|---|---|---|---|
| Display / Page titles | Space Grotesk | `font-sans` | Bold (700) |
| H1 | Space Grotesk | `font-sans` | SemiBold (600) |
| H2 | Space Grotesk | `font-sans` | SemiBold (600) |
| H3–H4, Subheadings | Space Grotesk | `font-sans` | Medium (500) |
| Body text, paragraphs, articles | Source Serif 4 | `font-serif` | Regular (400) |
| Navigation links | Space Grotesk | `font-sans` | Regular (400) |
| Labels, captions, metadata, categories | Space Grotesk | `font-sans` | Medium (500) |
| Buttons | Space Grotesk | `font-sans` | Medium (500) |
| Card titles | Space Grotesk | `font-sans` | SemiBold (600) |
| Card description/preview text | Source Serif 4 | `font-serif` | Regular (400) |
| Financial data / numbers on Invest page | Space Grotesk with `tabular-nums` | `font-sans` | Medium (500) |

**Font imports in layout.tsx:**
```tsx
import { Source_Serif_4, Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});
```

**Tailwind config:**
```ts
fontFamily: {
  sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
  serif: ['var(--font-serif)', 'Georgia', 'serif'],
}
```

---

## Brand Colors

| Name | Hex | Usage |
|---|---|---|
| Deep Navy (Primary) | `#001F5B` | Headings, borders, card shadows, primary backgrounds |
| Quill Cyan (Accent) | `#4A90E2` | Accent elements, links, category labels, interactive highlights |
| White (Canvas) | `#FFFFFF` | Page backgrounds, card backgrounds |
| Muted text | Use Tailwind `text-gray-600` on light backgrounds | Body text, descriptions |
| Faint metadata | Use Tailwind `text-gray-400` minimum | Timestamps, read times, status labels |

---

## File Architecture

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout (fonts, nav, metadata)
│   ├── globals.css                 # Global styles
│   ├── about/
│   │   ├── page.tsx                # About page
│   │   └── mission/
│   │       └── page.tsx            # Mission page
│   ├── vault/
│   │   ├── page.tsx                # Vault listing page
│   │   └── [category]/
│   │       ├── page.tsx            # Category listing (history, culture, bizarre-facts, true-crime)
│   │       └── [slug]/
│   │           └── page.tsx        # Individual article page
│   ├── invest/
│   │   └── page.tsx                # Strategic Prospectus / Invest page
│   └── work/
│       └── page.tsx                # Work / Services page
├── components/
│   ├── home/
│   │   ├── brand-entrance.tsx      # Logo entrance animation (desktop)
│   │   └── floating-quill.tsx      # Scroll-following quill (desktop)
│   ├── invest/
│   │   ├── asset-pillars.tsx       # Expanding accordion cards
│   │   ├── growth-engine.tsx       # SVG business cycle diagram
│   │   └── prospectus-contact.tsx  # Email input / contact section
│   └── [other shared components]
├── hooks/
├── lib/
└── types/
```

---

## Vault Content Categories

| Category slug | Display name | Content type |
|---|---|---|
| `history` | History | African and world history deep dives |
| `culture` | Culture | Cultural phenomena, traditions, identity |
| `bizarre-facts` | Bizarre Facts | Strange true stories, unexplained events |
| `true-crime` | True Crime | Historical and contemporary crime cases |

---

## Page-Specific Design Notes

### Homepage (`src/app/page.tsx`)
- Hero section with brand logo, "Apotheosis of Knowledge" title, tagline, and description
- Brand entrance animation: quill arrives → A draws on → circle inscribes (desktop only, ~1.8s)
- Floating quill that detaches from logo and follows cursor on scroll (desktop only)
- "What We Do" section: 3-column grid with numbered cards (01, 02, 03)
- "Latest From The Vault" section: article preview cards with hover effect (card rises + navy shadow appears on desktop hover only; flat with no shadow by default)
- No sticky/fixed hero — hero scrolls normally with the page

### About & Mission Pages
- Principle cards with numbered indices and hover shadow effect
- NO Velocity Skew effect (removed) — pages scroll normally on mobile

### Vault Pages
- Category sections with blue folder icons on mobile (replacing old vertical blue line)
- Article cards with category labels, index numbers, reading time, dates
- Consistent text sizing: section labels 14px desktop / 12px mobile, category labels 13px desktop / 12px mobile

### Invest Page (`src/app/invest/page.tsx`)
- "Strategic Prospectus" aesthetic — Investment Banking meets Swiss Design
- Scroll progress bar at top (2px, accent blue, fills left-to-right)
- Numbered section markers in left margin (desktop only, `hidden lg:block`)
- Asset Classes: 3 expandable accordion cards with numbered indices (01, 02, 03)
- Cards hover: rise with navy shadow on desktop, flat on mobile
- Growth Engine: SVG diagram with draw-on-scroll animation (plays once)
- Contact section: clean email input, not terminal-style
- Tone: serious, institutional, no emojis, no hype language

### Work Page (`src/app/work/page.tsx`)
- Anti-WordPress design philosophy
- Status board aesthetic with asymmetric layout

---

## Global Design Rules

1. **Card hover pattern (ALL pages):** Default state = flat with 1px border, no shadow. Desktop hover = card rises (`translateY(-6px)`) + deep navy shadow appears. Mobile = no hover effect, cards stay flat.
2. **No continuous/looping animations.** Scroll-triggered animations play once (`once: true`).
3. **Section labels** (uppercase, letter-spaced) should be minimum 14px desktop / 12px mobile.
4. **Index numbers** on cards should be minimum 15px desktop / 13px mobile.
5. **Body text** should never be smaller than 16px desktop / 15px mobile.
6. **No template aesthetics.** Every feature should feel custom-engineered.
7. **Mobile-first responsiveness.** Test at 375px. No horizontal overflow.

---

## File Ownership Rules (For Agent Teams)

To prevent conflicts, teammates MUST NOT edit the same file simultaneously.

| File/Directory | Owner |
|---|---|
| `src/app/page.tsx` | Homepage teammate only |
| `src/app/invest/`, `src/components/invest/` | Invest teammate only |
| `src/app/vault/`, vault components | Vault teammate only |
| `src/app/about/`, mission page | About teammate only |
| `src/app/layout.tsx` | Team lead only (or designated single teammate) |
| `tailwind.config.ts` | Team lead only (or designated single teammate) |
| `globals.css` | Team lead only (or designated single teammate) |

---

## What NOT to Do

- Do NOT introduce fonts other than Space Grotesk and Source Serif 4
- Do NOT use Crimson Pro, Inter, JetBrains Mono, Geist, or any other font
- Do NOT add parallax, particles, floating decorative elements, or terminal/hacker aesthetics
- Do NOT add pulsing/breathing effects on text
- Do NOT use emojis or exclamation marks in page content
- Do NOT add "Coming Soon" badges or startup hype language
- Do NOT modify files you don't own (see File Ownership Rules above)
- Do NOT use `localStorage` or `sessionStorage` in any component
- Do NOT change layouts, colors, or spacing when tasked with font-only or text-only changes
