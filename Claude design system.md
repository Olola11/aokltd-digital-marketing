# CLAUDE_DESIGN_SYSTEM.md — Visual Design System

## Overview

This document defines the complete visual design system for the Apotheosis of Knowledge website. All styling decisions should reference these specifications to maintain consistency.

---

## Brand Philosophy

The visual identity of AOK is derived from two sources:

1. **The Logo** — A deep blue "A" with integrated quill, set within a precise circle against black
2. **The Name** — "Apotheosis" (elevation to divine status) suggests upward movement, light from darkness, transcendence

The design should evoke: **a well-curated research library's reading room — serious but inviting, dense but navigable, institutional but not bureaucratic.**

---

## Color System

### Primary Palette

```css
/* Tailwind Config Extension */
colors: {
  navy: {
    950: '#020617',    /* Deepest background */
    900: '#0A1628',    /* Primary background */
    800: '#0F2038',    /* Card backgrounds */
    700: '#162A4A',    /* Elevated surfaces */
    600: '#1E3A5F',    /* Active states */
    500: '#2A4A73',    /* Borders */
    400: '#4A6A93',    /* Muted text */
    300: '#7A9ABB',    /* Secondary text */
    200: '#A8C4DD',    /* Primary text */
    100: '#D4E4F0',    /* Headings */
    50:  '#EDF4F8',    /* Brightest text (rare) */
  },
  blue: {
    700: '#1D4ED8',    /* Primary brand blue */
    600: '#2563EB',    /* Links, primary actions */
    500: '#3B82F6',    /* Hover states */
    400: '#60A5FA',    /* Active/focus states */
    300: '#93C5FD',    /* Light accents */
  },
  gold: {
    500: '#D4A84B',    /* Accent - "light of knowledge" */
    400: '#E4B85B',    /* Accent hover */
    300: '#F0C96B',    /* Accent light */
  },
}
```

### Semantic Colors

```css
/* Usage-based color assignments */
--color-background: var(--navy-900);
--color-surface: var(--navy-800);
--color-surface-elevated: var(--navy-700);
--color-border: var(--navy-500);
--color-border-subtle: var(--navy-600);

--color-text-primary: var(--navy-100);
--color-text-secondary: var(--navy-300);
--color-text-muted: var(--navy-400);

--color-link: var(--blue-500);
--color-link-hover: var(--blue-400);

--color-accent: var(--gold-500);
--color-accent-hover: var(--gold-400);
```

### Color Usage Guidelines

| Element | Color | Notes |
|---------|-------|-------|
| Page background | `navy-900` | Never pure black |
| Card background | `navy-800` | Subtle elevation |
| Modal overlay | `navy-950/80` | 80% opacity |
| Primary text | `navy-100` | High contrast |
| Secondary text | `navy-300` | Reduced emphasis |
| Muted text | `navy-400` | Captions, metadata |
| Links | `blue-500` | Consistent throughout |
| Link hover | `blue-400` | Lighter on hover |
| Accent (sparingly) | `gold-500` | CTAs, highlights |
| Borders | `navy-500` | Subtle definition |
| Focus rings | `blue-400` | Accessibility |

### Gradients

```css
/* Hero background gradient */
.gradient-hero {
  background: linear-gradient(
    180deg,
    var(--navy-950) 0%,
    var(--navy-900) 50%,
    var(--navy-800) 100%
  );
}

/* Card hover effect */
.gradient-card-hover {
  background: linear-gradient(
    135deg,
    var(--navy-700) 0%,
    var(--navy-800) 100%
  );
}

/* Logo glow effect */
.gradient-logo-glow {
  background: radial-gradient(
    circle,
    var(--blue-600) 0%,
    transparent 70%
  );
  opacity: 0.15;
}
```

---

## Typography

### Font Stack

```typescript
// src/app/layout.tsx
import { Crimson_Pro, Inter } from 'next/font/google';

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});
```

### Type Scale

```css
/* Tailwind fontSize extension */
fontSize: {
  'xs':   ['0.75rem', { lineHeight: '1rem' }],       /* 12px */
  'sm':   ['0.875rem', { lineHeight: '1.25rem' }],   /* 14px */
  'base': ['1rem', { lineHeight: '1.625rem' }],      /* 16px - body */
  'lg':   ['1.125rem', { lineHeight: '1.75rem' }],   /* 18px */
  'xl':   ['1.25rem', { lineHeight: '1.875rem' }],   /* 20px */
  '2xl':  ['1.5rem', { lineHeight: '2rem' }],        /* 24px */
  '3xl':  ['1.875rem', { lineHeight: '2.25rem' }],   /* 30px */
  '4xl':  ['2.25rem', { lineHeight: '2.5rem' }],     /* 36px */
  '5xl':  ['3rem', { lineHeight: '1.1' }],           /* 48px */
  '6xl':  ['3.75rem', { lineHeight: '1.1' }],        /* 60px */
  '7xl':  ['4.5rem', { lineHeight: '1.05' }],        /* 72px */
}
```

### Typography Classes

```css
/* Heading styles - always use Crimson Pro */
.heading-1 {
  @apply font-serif text-5xl md:text-6xl font-bold text-navy-100 tracking-tight;
}

.heading-2 {
  @apply font-serif text-3xl md:text-4xl font-bold text-navy-100 tracking-tight;
}

.heading-3 {
  @apply font-serif text-2xl md:text-3xl font-semibold text-navy-100;
}

.heading-4 {
  @apply font-serif text-xl md:text-2xl font-semibold text-navy-100;
}

.heading-5 {
  @apply font-serif text-lg md:text-xl font-semibold text-navy-200;
}

/* Body styles - always use Inter */
.body-large {
  @apply font-sans text-lg text-navy-200 leading-relaxed;
}

.body-base {
  @apply font-sans text-base text-navy-300 leading-relaxed;
}

.body-small {
  @apply font-sans text-sm text-navy-400;
}

/* Special text styles */
.tagline {
  @apply font-serif text-xl md:text-2xl text-navy-300 italic;
}

.caption {
  @apply font-sans text-xs text-navy-400 uppercase tracking-wider;
}

.label {
  @apply font-sans text-sm font-medium text-navy-200;
}
```

### Typography Usage

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Page title | Crimson Pro | 5xl-6xl | Bold | navy-100 |
| Section title | Crimson Pro | 3xl-4xl | Bold | navy-100 |
| Card title | Crimson Pro | xl-2xl | Semibold | navy-100 |
| Body text | Inter | base | Regular | navy-300 |
| Lead paragraph | Inter | lg | Regular | navy-200 |
| Captions | Inter | xs | Regular | navy-400 |
| Navigation | Inter | sm | Medium | navy-200 |
| Buttons | Inter | sm | Medium | varies |

---

## Spacing System

### Spacing Scale

```css
/* Use Tailwind's default scale, extended */
spacing: {
  'px': '1px',
  '0': '0',
  '0.5': '0.125rem',  /* 2px */
  '1': '0.25rem',     /* 4px */
  '2': '0.5rem',      /* 8px */
  '3': '0.75rem',     /* 12px */
  '4': '1rem',        /* 16px - base unit */
  '5': '1.25rem',     /* 20px */
  '6': '1.5rem',      /* 24px */
  '8': '2rem',        /* 32px */
  '10': '2.5rem',     /* 40px */
  '12': '3rem',       /* 48px */
  '16': '4rem',       /* 64px */
  '20': '5rem',       /* 80px */
  '24': '6rem',       /* 96px */
  '32': '8rem',       /* 128px */
}
```

### Spacing Guidelines

| Context | Spacing | Example |
|---------|---------|---------|
| Inside buttons | `px-6 py-2` | Horizontal emphasis |
| Card padding | `p-6` | Comfortable content |
| Card gap | `gap-4` | Between card elements |
| Section padding | `py-16 md:py-24` | Generous breathing room |
| Content max-width | `max-w-4xl` | ~56rem for readability |
| Page max-width | `max-w-7xl` | ~80rem for layouts |
| Paragraph spacing | `space-y-6` | Between paragraphs |
| Grid gap | `gap-6 md:gap-8` | Card grids |

---

## Layout System

### Container

```css
.container-page {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.container-content {
  @apply max-w-4xl mx-auto px-4 sm:px-6;
}

.container-narrow {
  @apply max-w-2xl mx-auto px-4 sm:px-6;
}
```

### Grid Patterns

```css
/* Two-column grid */
.grid-two {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8;
}

/* Three-column grid */
.grid-three {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8;
}

/* Four-column grid */
.grid-four {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6;
}

/* Vault entry grid */
.grid-vault {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8;
}
```

### Page Sections

```css
.section {
  @apply py-16 md:py-24;
}

.section-hero {
  @apply py-24 md:py-32 lg:py-40;
}

.section-compact {
  @apply py-12 md:py-16;
}
```

---

## Component Patterns

### Cards

```css
.card {
  @apply bg-navy-800 rounded-lg border border-navy-600 overflow-hidden;
  @apply transition-all duration-300;
}

.card-hover {
  @apply hover:border-navy-500 hover:bg-navy-700;
  @apply hover:shadow-lg hover:shadow-navy-950/50;
}

.card-interactive {
  @apply cursor-pointer;
  @apply hover:translate-y-[-2px];
}
```

### Buttons

```css
/* Primary button */
.btn-primary {
  @apply inline-flex items-center justify-center;
  @apply px-6 py-2.5 rounded-md;
  @apply bg-blue-600 text-white font-medium;
  @apply hover:bg-blue-500 active:bg-blue-700;
  @apply transition-colors duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-navy-900;
}

/* Secondary button */
.btn-secondary {
  @apply inline-flex items-center justify-center;
  @apply px-6 py-2.5 rounded-md;
  @apply bg-transparent text-navy-200 font-medium;
  @apply border border-navy-500;
  @apply hover:bg-navy-800 hover:border-navy-400;
  @apply transition-colors duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-navy-900;
}

/* Ghost button (links styled as buttons) */
.btn-ghost {
  @apply inline-flex items-center;
  @apply text-blue-500 font-medium;
  @apply hover:text-blue-400;
  @apply transition-colors duration-200;
}
```

### Links

```css
.link {
  @apply text-blue-500 hover:text-blue-400;
  @apply underline underline-offset-4 decoration-blue-500/50;
  @apply hover:decoration-blue-400;
  @apply transition-colors duration-200;
}

.link-subtle {
  @apply text-navy-300 hover:text-navy-100;
  @apply no-underline;
  @apply transition-colors duration-200;
}
```

### Badges

```css
.badge {
  @apply inline-flex items-center;
  @apply px-2.5 py-0.5 rounded-full;
  @apply text-xs font-medium uppercase tracking-wider;
}

.badge-category {
  @apply bg-navy-700 text-navy-300 border border-navy-600;
}

.badge-status {
  @apply bg-blue-900/50 text-blue-300 border border-blue-700;
}

.badge-accent {
  @apply bg-gold-500/20 text-gold-400 border border-gold-500/30;
}
```

### Form Elements

```css
.input {
  @apply w-full px-4 py-3 rounded-md;
  @apply bg-navy-800 border border-navy-600;
  @apply text-navy-100 placeholder-navy-500;
  @apply focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500;
  @apply transition-colors duration-200;
}

.textarea {
  @apply w-full px-4 py-3 rounded-md resize-none;
  @apply bg-navy-800 border border-navy-600;
  @apply text-navy-100 placeholder-navy-500;
  @apply focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500;
  @apply transition-colors duration-200;
}

.label {
  @apply block text-sm font-medium text-navy-200 mb-2;
}
```

---

## Animation System

### Timing

```css
/* Duration scale */
--duration-instant: 0ms;
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;

/* Easing functions */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Standard Transitions

```css
/* Default transition for interactive elements */
.transition-base {
  @apply transition-all duration-300 ease-out;
}

/* Fast transition for hover states */
.transition-fast {
  @apply transition-colors duration-150 ease-out;
}

/* Slow transition for major state changes */
.transition-slow {
  @apply transition-all duration-500 ease-in-out;
}
```

### Animation Keyframes

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

### Animation Classes

```css
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.3s ease-out forwards;
}

/* Stagger animation for lists */
.animate-stagger > * {
  animation: fadeInUp 0.4s ease-out forwards;
  opacity: 0;
}

.animate-stagger > *:nth-child(1) { animation-delay: 0ms; }
.animate-stagger > *:nth-child(2) { animation-delay: 100ms; }
.animate-stagger > *:nth-child(3) { animation-delay: 200ms; }
.animate-stagger > *:nth-child(4) { animation-delay: 300ms; }
```

### Animation Guidelines

| Context | Animation | Duration |
|---------|-----------|----------|
| Hover states | Color/opacity change | 150-200ms |
| Card elevation | Transform + shadow | 300ms |
| Page transitions | Fade in | 300ms |
| Modal open | Scale + fade | 300ms |
| Modal close | Fade out | 200ms |
| Content loading | Fade in up | 400ms |
| Scroll reveal | Fade in up | 500ms |

**Never animate:**
- Text content itself
- Navigation elements (except mobile menu)
- Form inputs while typing
- Anything that could induce motion sickness

---

## Iconography

### Icon System

Use Lucide React for consistent icons:

```typescript
import { 
  ArrowRight, 
  ExternalLink, 
  Search, 
  Menu, 
  X,
  ChevronDown,
  ChevronRight,
  Calendar,
  Clock,
  Tag,
  BookOpen,
  FileText,
  Video,
  Smartphone,
  Mail,
  MapPin,
} from 'lucide-react';
```

### Icon Sizes

```css
/* Icon size scale */
.icon-xs { @apply w-3 h-3; }    /* 12px - inline with small text */
.icon-sm { @apply w-4 h-4; }    /* 16px - inline with body text */
.icon-base { @apply w-5 h-5; }  /* 20px - default */
.icon-lg { @apply w-6 h-6; }    /* 24px - emphasis */
.icon-xl { @apply w-8 h-8; }    /* 32px - hero/feature */
```

### Custom Icons

The logo and quill icons are custom SVGs stored in `src/components/icons/`:

```typescript
// src/components/icons/Logo.tsx
export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200">
      {/* Logo SVG path */}
    </svg>
  );
}

// src/components/icons/LogoMark.tsx
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      {/* Circled A with quill */}
    </svg>
  );
}
```

---

## Responsive Breakpoints

```css
/* Tailwind default breakpoints */
screens: {
  'sm': '640px',   /* Small devices */
  'md': '768px',   /* Tablets */
  'lg': '1024px',  /* Laptops */
  'xl': '1280px',  /* Desktops */
  '2xl': '1536px', /* Large screens */
}
```

### Mobile-First Approach

Always write mobile styles first, then layer on larger screens:

```css
/* Example: Card grid */
.grid-cards {
  @apply grid grid-cols-1;           /* Mobile: 1 column */
  @apply md:grid-cols-2;             /* Tablet: 2 columns */
  @apply lg:grid-cols-3;             /* Desktop: 3 columns */
}

/* Example: Typography */
.page-title {
  @apply text-3xl;                   /* Mobile */
  @apply md:text-4xl;                /* Tablet */
  @apply lg:text-5xl;                /* Desktop */
}
```

---

## Accessibility Standards

### Color Contrast

All text must meet WCAG 2.1 AA standards:
- Normal text: 4.5:1 minimum contrast ratio
- Large text (18px+): 3:1 minimum contrast ratio

| Text Color | Background | Ratio | Pass? |
|------------|------------|-------|-------|
| navy-100 | navy-900 | 12.4:1 | ✓ |
| navy-200 | navy-900 | 9.2:1 | ✓ |
| navy-300 | navy-900 | 6.1:1 | ✓ |
| navy-400 | navy-900 | 4.0:1 | ✓ (large only) |
| blue-500 | navy-900 | 5.8:1 | ✓ |

### Focus States

All interactive elements must have visible focus states:

```css
.focus-ring {
  @apply focus:outline-none;
  @apply focus:ring-2 focus:ring-blue-400;
  @apply focus:ring-offset-2 focus:ring-offset-navy-900;
}
```

### Reduced Motion

Respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Dark Mode Note

This site is designed exclusively for dark mode. The brand colors (deep navy, royal blue) are optimized for dark backgrounds. **Do not implement a light mode toggle.** The dark theme is integral to the brand identity.

---

## Tailwind Configuration Reference

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020617',
          900: '#0A1628',
          800: '#0F2038',
          700: '#162A4A',
          600: '#1E3A5F',
          500: '#2A4A73',
          400: '#4A6A93',
          300: '#7A9ABB',
          200: '#A8C4DD',
          100: '#D4E4F0',
          50: '#EDF4F8',
        },
        gold: {
          500: '#D4A84B',
          400: '#E4B85B',
          300: '#F0C96B',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```