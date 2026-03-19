# CLAUDE_COMPONENTS.md — Component Specifications

## Overview

This document defines the component library for the Apotheosis of Knowledge website. Each component includes its purpose, props interface, usage examples, and implementation notes.

---

## Component Organization

```
src/components/
├── ui/                     # Atomic UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Input.tsx
│   ├── Textarea.tsx
│   ├── Link.tsx
│   └── index.ts            # Barrel export
├── layout/                 # Layout components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── PageHeader.tsx
│   ├── Breadcrumbs.tsx
│   └── index.ts
├── content/                # Content-specific components
│   ├── VaultCard.tsx
│   ├── ProjectCard.tsx
│   ├── TimelineNode.tsx
│   ├── MDXContent.tsx
│   ├── InsightBox.tsx
│   ├── SourceCitation.tsx
│   ├── CategoryBadge.tsx
│   └── index.ts
├── icons/                  # Custom icons
│   ├── Logo.tsx
│   ├── LogoMark.tsx
│   ├── LogoFull.tsx
│   └── index.ts
└── search/                 # Search components
    ├── SearchModal.tsx
    ├── SearchInput.tsx
    ├── SearchResults.tsx
    └── index.ts
```

---

## UI Components

### Button

Primary interactive element for actions.

```typescript
// src/components/ui/Button.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-navy-900 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700',
      secondary: 'bg-transparent text-navy-200 border border-navy-500 hover:bg-navy-800 hover:border-navy-400',
      ghost: 'bg-transparent text-blue-500 hover:text-blue-400 hover:bg-navy-800/50',
    };
    
    const sizes = {
      sm: 'px-4 py-1.5 text-sm rounded',
      md: 'px-6 py-2.5 text-sm rounded-md',
      lg: 'px-8 py-3 text-base rounded-md',
    };
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading...
          </>
        ) : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

**Usage:**
```tsx
<Button variant="primary" size="md">Explore the Vault</Button>
<Button variant="secondary">Learn More</Button>
<Button variant="ghost" size="sm">View All →</Button>
```

---

### Card

Container for grouped content.

```typescript
// src/components/ui/Card.tsx
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'featured';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ 
  className, 
  variant = 'default', 
  padding = 'md',
  children, 
  ...props 
}: CardProps) {
  const baseStyles = 'bg-navy-800 rounded-lg border border-navy-600 overflow-hidden';
  
  const variants = {
    default: '',
    interactive: 'cursor-pointer transition-all duration-300 hover:border-navy-500 hover:bg-navy-700 hover:shadow-lg hover:shadow-navy-950/50 hover:translate-y-[-2px]',
    featured: 'border-gold-500/30 bg-gradient-to-br from-navy-800 to-navy-900',
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div className={cn(baseStyles, variants[variant], paddings[padding], className)} {...props}>
      {children}
    </div>
  );
}

// Sub-components
export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('font-serif text-xl font-semibold text-navy-100', className)} {...props}>{children}</h3>;
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-navy-300 text-sm mt-1', className)} {...props}>{children}</p>;
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-4 pt-4 border-t border-navy-700', className)} {...props}>{children}</div>;
}
```

**Usage:**
```tsx
<Card variant="interactive">
  <CardHeader>
    <CardTitle>The Legacy of Benin Bronzes</CardTitle>
    <CardDescription>History • 5 min read</CardDescription>
  </CardHeader>
  <CardContent>
    <p>The Benin Bronzes represent one of the most significant...</p>
  </CardContent>
  <CardFooter>
    <span className="text-xs text-navy-400">Published Jan 15, 2024</span>
  </CardFooter>
</Card>
```

---

### Badge

Small status or category indicator.

```typescript
// src/components/ui/Badge.tsx
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'category' | 'status' | 'accent';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider';
  
  const variants = {
    default: 'bg-navy-700 text-navy-300 border border-navy-600',
    category: 'bg-navy-700 text-navy-300 border border-navy-600',
    status: 'bg-blue-900/50 text-blue-300 border border-blue-700',
    accent: 'bg-gold-500/20 text-gold-400 border border-gold-500/30',
  };
  
  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
```

**Usage:**
```tsx
<Badge variant="category">History</Badge>
<Badge variant="status">Active</Badge>
<Badge variant="accent">Featured</Badge>
```

---

### CustomLink

Styled link component with external link handling.

```typescript
// src/components/ui/Link.tsx
import NextLink from 'next/link';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'default' | 'subtle' | 'nav';
  showExternalIcon?: boolean;
}

export function CustomLink({ 
  href, 
  className, 
  variant = 'default',
  showExternalIcon = true,
  children, 
  ...props 
}: CustomLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('//');
  
  const variants = {
    default: 'text-blue-500 hover:text-blue-400 underline underline-offset-4 decoration-blue-500/50 hover:decoration-blue-400 transition-colors duration-200',
    subtle: 'text-navy-300 hover:text-navy-100 no-underline transition-colors duration-200',
    nav: 'text-navy-200 hover:text-navy-50 no-underline font-medium transition-colors duration-200',
  };
  
  const linkClass = cn(variants[variant], className);
  
  if (isExternal) {
    return (
      <a 
        href={href} 
        className={cn(linkClass, 'inline-flex items-center gap-1')}
        target="_blank" 
        rel="noopener noreferrer"
        {...props}
      >
        {children}
        {showExternalIcon && <ExternalLink className="w-3 h-3" />}
      </a>
    );
  }
  
  return (
    <NextLink href={href} className={linkClass} {...props}>
      {children}
    </NextLink>
  );
}
```

---

### Input

Form input field.

```typescript
// src/components/ui/Input.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-');
    
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-navy-200">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 rounded-md',
            'bg-navy-800 border border-navy-600',
            'text-navy-100 placeholder-navy-500',
            'focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
            'transition-colors duration-200',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

---

### Textarea

Multi-line text input.

```typescript
// src/components/ui/Textarea.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, rows = 4, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s/g, '-');
    
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-navy-200">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'w-full px-4 py-3 rounded-md resize-none',
            'bg-navy-800 border border-navy-600',
            'text-navy-100 placeholder-navy-500',
            'focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
            'transition-colors duration-200',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
```

---

## Layout Components

### Navigation

Main site navigation with mobile support.

```typescript
// src/components/layout/Navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';
import { LogoFull, LogoMark } from '@/components/icons';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'About', href: '/about/mission' },
  { label: 'Work', href: '/work' },
  { label: 'Vault', href: '/vault' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Contact', href: '/contact' },
];

interface NavigationProps {
  onSearchOpen?: () => void;
}

export function Navigation({ onSearchOpen }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-sm border-b border-navy-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <LogoMark className="h-8 w-8 md:hidden" />
            <LogoFull className="hidden md:block h-8 w-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  isActive(item.href)
                    ? 'text-navy-50'
                    : 'text-navy-300 hover:text-navy-100'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Search & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {onSearchOpen && (
              <button
                onClick={onSearchOpen}
                className="p-2 text-navy-400 hover:text-navy-200 transition-colors"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-navy-400 hover:text-navy-200 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-navy-800">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'text-sm font-medium py-2 transition-colors duration-200',
                    isActive(item.href)
                      ? 'text-navy-50'
                      : 'text-navy-300 hover:text-navy-100'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
```

---

### Footer

Site footer with institutional information.

```typescript
// src/components/layout/Footer.tsx
import Link from 'next/link';
import { LogoMark } from '@/components/icons';
import { CustomLink } from '@/components/ui';

const footerLinks = {
  explore: [
    { label: 'Vault', href: '/vault' },
    { label: 'Timeline', href: '/timeline' },
    { label: 'Work', href: '/work' },
  ],
  about: [
    { label: 'Mission', href: '/about/mission' },
    { label: 'Registration', href: '/about/registration' },
    { label: 'Contact', href: '/contact' },
  ],
  social: [
    { label: 'Facebook', href: 'https://facebook.com/apotheosisofknowledge' },
    { label: 'Twitter/X', href: 'https://x.com/aok_ltd' },
    { label: 'Instagram', href: 'https://instagram.com/apotheosisofknowledge' },
    { label: 'TikTok', href: 'https://tiktok.com/@apotheosisofknowledge' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy-950 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <LogoMark className="h-10 w-10" />
            </Link>
            <p className="text-sm text-navy-400 mb-4">
              Elevating curiosity. Countering noise.
            </p>
            <p className="text-xs text-navy-500">
              RC: 1956161 • TIN: 31050803-0001
            </p>
          </div>
          
          {/* Explore Column */}
          <div>
            <h4 className="font-medium text-navy-200 mb-4">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-navy-400 hover:text-navy-200 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* About Column */}
          <div>
            <h4 className="font-medium text-navy-200 mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-navy-400 hover:text-navy-200 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Column */}
          <div>
            <h4 className="font-medium text-navy-200 mb-4">Connect</h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <CustomLink 
                    href={link.href} 
                    variant="subtle" 
                    className="text-sm text-navy-400 hover:text-navy-200"
                    showExternalIcon={false}
                  >
                    {link.label}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-navy-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-navy-500">
              © {currentYear} Apotheosis of Knowledge Limited. All rights reserved.
            </p>
            <p className="text-xs text-navy-500">
              Incorporated in Nigeria, 2022
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

### PageHeader

Reusable page header with title and optional subtitle.

```typescript
// src/components/layout/PageHeader.tsx
import { cn } from '@/lib/utils';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  align?: 'left' | 'center';
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  description,
  breadcrumbs,
  align = 'left',
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('py-12 md:py-16', className)}>
      <div className={cn(
        'max-w-4xl',
        align === 'center' ? 'mx-auto text-center' : ''
      )}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
        )}
        
        {subtitle && (
          <p className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-2">
            {subtitle}
          </p>
        )}
        
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy-100 tracking-tight">
          {title}
        </h1>
        
        {description && (
          <p className="mt-4 text-lg text-navy-300 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
```

---

### Breadcrumbs

Navigation breadcrumbs.

```typescript
// src/components/layout/Breadcrumbs.tsx
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-2', className)}>
      <Link href="/" className="text-sm text-navy-400 hover:text-navy-200 transition-colors">
        Home
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-navy-600" />
          {item.href ? (
            <Link href={item.href} className="text-sm text-navy-400 hover:text-navy-200 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-sm text-navy-200">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
```

---

## Content Components

### VaultCard

Card for displaying vault entry previews.

```typescript
// src/components/content/VaultCard.tsx
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { VaultEntry } from '@/types';

interface VaultCardProps {
  entry: VaultEntry;
  featured?: boolean;
}

export function VaultCard({ entry, featured = false }: VaultCardProps) {
  const { slug, category, title, excerpt, publishedAt, readingTime } = entry;
  
  return (
    <Link href={`/vault/${category}/${slug}`}>
      <Card 
        variant="interactive" 
        className={cn(
          'h-full flex flex-col',
          featured && 'border-gold-500/30'
        )}
      >
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="category">{category}</Badge>
            {featured && <Badge variant="accent">Featured</Badge>}
          </div>
          
          <h3 className="font-serif text-xl font-semibold text-navy-100 mb-2 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-navy-300 text-sm line-clamp-3 flex-grow">
            {excerpt}
          </p>
          
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-navy-700 text-xs text-navy-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(publishedAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            {readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {readingTime} min read
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
```

---

### ProjectCard

Card for displaying work/project items.

```typescript
// src/components/content/ProjectCard.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, title, description, status, icon: Icon } = project;
  
  const statusColors = {
    active: 'status',
    'coming-soon': 'default',
    archived: 'default',
  } as const;
  
  const statusLabels = {
    active: 'Active',
    'coming-soon': 'Coming Soon',
    archived: 'Archived',
  };
  
  return (
    <Link href={`/work/${slug}`}>
      <Card variant="interactive" className="h-full">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            {Icon && (
              <div className="p-3 bg-navy-700 rounded-lg">
                <Icon className="w-6 h-6 text-blue-400" />
              </div>
            )}
            <Badge variant={statusColors[status]}>{statusLabels[status]}</Badge>
          </div>
          
          <h3 className="font-serif text-xl font-semibold text-navy-100 mb-2">
            {title}
          </h3>
          
          <p className="text-navy-300 text-sm mb-4">
            {description}
          </p>
          
          <span className="inline-flex items-center text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors">
            Learn more
            <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
```

---

### TimelineNode

Individual milestone in the timeline.

```typescript
// src/components/content/TimelineNode.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TimelineEvent } from '@/types';

interface TimelineNodeProps {
  event: TimelineEvent;
  isLast?: boolean;
}

export function TimelineNode({ event, isLast = false }: TimelineNodeProps) {
  const [expanded, setExpanded] = useState(false);
  const { date, title, description, details, status } = event;
  
  const StatusIcon = {
    completed: CheckCircle,
    current: Clock,
    upcoming: Circle,
  }[status];
  
  const statusColors = {
    completed: 'text-green-500',
    current: 'text-blue-400',
    upcoming: 'text-navy-500',
  };
  
  return (
    <div className="relative flex gap-6">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-navy-700" />
      )}
      
      {/* Status icon */}
      <div className="relative z-10 flex-shrink-0">
        <StatusIcon className={cn('w-6 h-6', statusColors[status])} />
      </div>
      
      {/* Content */}
      <div className="flex-grow pb-8">
        <div className="flex items-start justify-between">
          <div>
            <time className="text-xs text-navy-400 uppercase tracking-wider">
              {date}
            </time>
            <h3 className="font-serif text-lg font-semibold text-navy-100 mt-1">
              {title}
            </h3>
            <p className="text-sm text-navy-300 mt-1">
              {description}
            </p>
          </div>
          
          {details && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1 text-navy-400 hover:text-navy-200 transition-colors"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
        
        {expanded && details && (
          <div className="mt-3 p-4 bg-navy-800 rounded-lg border border-navy-700">
            <p className="text-sm text-navy-300">{details}</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

### InsightBox

Highlighted insight or quote block for MDX content.

```typescript
// src/components/content/InsightBox.tsx
import { Lightbulb, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightBoxProps {
  variant?: 'insight' | 'quote';
  children: React.ReactNode;
  source?: string;
  className?: string;
}

export function InsightBox({ 
  variant = 'insight', 
  children, 
  source,
  className 
}: InsightBoxProps) {
  const Icon = variant === 'quote' ? Quote : Lightbulb;
  
  return (
    <aside className={cn(
      'my-8 p-6 rounded-lg border-l-4',
      variant === 'insight' 
        ? 'bg-blue-900/20 border-blue-500' 
        : 'bg-navy-800 border-gold-500',
      className
    )}>
      <div className="flex gap-4">
        <Icon className={cn(
          'w-5 h-5 flex-shrink-0 mt-0.5',
          variant === 'insight' ? 'text-blue-400' : 'text-gold-400'
        )} />
        <div>
          <div className={cn(
            'text-base leading-relaxed',
            variant === 'quote' ? 'font-serif italic text-navy-200' : 'text-navy-300'
          )}>
            {children}
          </div>
          {source && (
            <p className="mt-3 text-sm text-navy-400">
              — {source}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
```

---

### SourceCitation

Academic-style source citation for MDX content.

```typescript
// src/components/content/SourceCitation.tsx
import { ExternalLink } from 'lucide-react';

interface SourceCitationProps {
  number: number;
  author?: string;
  title: string;
  source: string;
  year?: string;
  url?: string;
}

export function SourceCitation({
  number,
  author,
  title,
  source,
  year,
  url,
}: SourceCitationProps) {
  return (
    <div id={`citation-${number}`} className="flex gap-3 text-sm py-2">
      <span className="text-navy-500 font-mono">[{number}]</span>
      <div className="text-navy-400">
        {author && <span>{author}. </span>}
        <span className="text-navy-300">"{title}."</span>
        <span> {source}</span>
        {year && <span>, {year}</span>}.
        {url && (
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center ml-2 text-blue-500 hover:text-blue-400"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
```

---

### CategoryBadge

Enhanced badge specifically for vault categories.

```typescript
// src/components/content/CategoryBadge.tsx
import Link from 'next/link';
import { BookOpen, Globe, Skull, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VaultCategory } from '@/types';

const categoryConfig: Record<VaultCategory, { icon: typeof BookOpen; color: string }> = {
  history: { icon: BookOpen, color: 'bg-amber-900/30 text-amber-400 border-amber-700' },
  culture: { icon: Globe, color: 'bg-emerald-900/30 text-emerald-400 border-emerald-700' },
  'bizarre-facts': { icon: Sparkles, color: 'bg-purple-900/30 text-purple-400 border-purple-700' },
  'true-crime': { icon: Skull, color: 'bg-red-900/30 text-red-400 border-red-700' },
};

interface CategoryBadgeProps {
  category: VaultCategory;
  asLink?: boolean;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, asLink = false, size = 'sm' }: CategoryBadgeProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;
  
  const content = (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full border',
      config.color,
      size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
    )}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      <span className="capitalize font-medium">{category.replace('-', ' ')}</span>
    </span>
  );
  
  if (asLink) {
    return (
      <Link href={`/vault/${category}`} className="hover:opacity-80 transition-opacity">
        {content}
      </Link>
    );
  }
  
  return content;
}
```

---

## MDX Components

### MDXContent

MDX renderer with custom components.

```typescript
// src/components/content/MDXContent.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { InsightBox } from './InsightBox';
import { SourceCitation } from './SourceCitation';
import { CustomLink } from '@/components/ui';

const mdxComponents = {
  // Override default elements
  h1: (props: any) => <h1 className="font-serif text-4xl font-bold text-navy-100 mt-12 mb-6" {...props} />,
  h2: (props: any) => <h2 className="font-serif text-3xl font-bold text-navy-100 mt-10 mb-4" {...props} />,
  h3: (props: any) => <h3 className="font-serif text-2xl font-semibold text-navy-100 mt-8 mb-3" {...props} />,
  h4: (props: any) => <h4 className="font-serif text-xl font-semibold text-navy-100 mt-6 mb-2" {...props} />,
  
  p: (props: any) => <p className="text-navy-300 leading-relaxed mb-6" {...props} />,
  
  a: (props: any) => <CustomLink {...props} />,
  
  ul: (props: any) => <ul className="list-disc list-inside text-navy-300 mb-6 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside text-navy-300 mb-6 space-y-2" {...props} />,
  li: (props: any) => <li className="text-navy-300" {...props} />,
  
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gold-500 pl-6 my-6 italic text-navy-200" {...props} />
  ),
  
  code: (props: any) => (
    <code className="bg-navy-800 px-1.5 py-0.5 rounded text-sm font-mono text-blue-300" {...props} />
  ),
  
  pre: (props: any) => (
    <pre className="bg-navy-800 border border-navy-700 rounded-lg p-4 overflow-x-auto mb-6" {...props} />
  ),
  
  hr: () => <hr className="border-navy-700 my-8" />,
  
  // Custom components
  InsightBox,
  SourceCitation,
};

interface MDXContentProps {
  source: string;
}

export async function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose-aok">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
```

---

## Icon Components

### LogoMark

Circled A with quill — standalone mark.

```typescript
// src/components/icons/LogoMark.tsx
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="46" 
        stroke="#1E3A8A" 
        strokeWidth="4" 
        fill="none"
      />
      
      {/* Letter A */}
      <path
        d="M50 20L25 75H35L40 62H60L65 75H75L50 20Z M45 52L50 38L55 52H45Z"
        fill="#1E3A8A"
      />
      
      {/* Quill */}
      <path
        d="M55 55C55 55 70 70 75 80C70 75 60 65 55 55Z"
        fill="url(#quill-gradient)"
      />
      
      <defs>
        <linearGradient id="quill-gradient" x1="55" y1="55" x2="75" y2="80">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
    </svg>
  );
}
```

### LogoFull

Full horizontal logo with wordmark.

```typescript
// src/components/icons/LogoFull.tsx
import { LogoMark } from './LogoMark';

export function LogoFull({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-8 w-8" />
      <div className="flex flex-col">
        <span className="font-serif text-lg font-bold text-blue-600 tracking-tight leading-none">
          APOTHEOSIS
        </span>
        <span className="font-serif text-sm text-blue-400 tracking-widest leading-none">
          OF KNOWLEDGE
        </span>
      </div>
    </div>
  );
}
```

---

## Utility Functions

### cn (Class Name Merger)

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Format Date

```typescript
// src/lib/utils.ts
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  
  return new Date(date).toLocaleDateString('en-US', options || defaultOptions);
}
```

### Calculate Reading Time

```typescript
// src/lib/utils.ts
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
```

---

## Component Export Patterns

```typescript
// src/components/ui/index.ts
export { Button } from './Button';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
export { Badge } from './Badge';
export { CustomLink } from './Link';
export { Input } from './Input';
export { Textarea } from './Textarea';

// src/components/layout/index.ts
export { Navigation } from './Navigation';
export { Footer } from './Footer';
export { PageHeader } from './PageHeader';
export { Breadcrumbs } from './Breadcrumbs';

// src/components/content/index.ts
export { VaultCard } from './VaultCard';
export { ProjectCard } from './ProjectCard';
export { TimelineNode } from './TimelineNode';
export { MDXContent } from './MDXContent';
export { InsightBox } from './InsightBox';
export { SourceCitation } from './SourceCitation';
export { CategoryBadge } from './CategoryBadge';

// src/components/icons/index.ts
export { LogoMark } from './LogoMark';
export { LogoFull } from './LogoFull';
```