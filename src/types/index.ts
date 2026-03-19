export type VaultCategory = 'history' | 'culture' | 'bizarre-facts' | 'true-crime';

export interface VaultEntry {
  slug: string;
  category: VaultCategory;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  tags: string[];
  relatedEntries?: string[];
  featuredImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
  ogImage?: string;
  featured?: boolean;
  pinned?: boolean;
}

export type ProjectStatus = 'active' | 'coming-soon' | 'archived';

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription?: string;
  status: ProjectStatus;
  icon?: string;
  primaryLink?: {
    label: string;
    href: string;
  };
  secondaryLinks?: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
  launchDate?: string;
  order: number;
  featured?: boolean;
}

export type TimelineEventStatus = 'completed' | 'current' | 'upcoming';

export interface TimelineEvent {
  id: string;
  date: string;
  sortDate: string;
  title: string;
  description: string;
  details?: string;
  status: TimelineEventStatus;
  category?: 'milestone' | 'launch' | 'achievement' | 'goal';
  icon?: string;
}