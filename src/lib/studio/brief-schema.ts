import { z } from 'zod';
import { STUDIO_SERVICES, type StudioServiceSlug } from '@/data/studio/services';

/** Shared by the brief form (client) and /api/studio-brief (server). */

const SERVICE_SLUGS = STUDIO_SERVICES.map((service) => service.slug) as [
  StudioServiceSlug,
  ...StudioServiceSlug[],
];

export const TIMELINES = ['soon', 'quarter', 'flexible'] as const;
export type Timeline = (typeof TIMELINES)[number];

export const TIMELINE_LABELS: Record<Timeline, string> = {
  soon: 'as soon as possible',
  quarter: 'within the next three months',
  flexible: 'when the time is right',
};

export const briefSchema = z.object({
  service: z.enum(SERVICE_SLUGS, { error: 'Choose what you need.' }),
  organisation: z.string().trim().min(2, 'Tell us who the work is for.').max(200),
  timeline: z.enum(TIMELINES, { error: 'Choose a timeline.' }),
  name: z.string().trim().min(2, 'Please enter your name.').max(200),
  email: z.string().trim().toLowerCase().pipe(z.email('Please enter a valid email address.')),
  details: z.string().trim().max(5000, 'Please keep this under 5,000 characters.').optional(),
  /** Honeypot — hidden from people, filled in by bots */
  website: z.string().optional(),
});

export type BriefInput = z.input<typeof briefSchema>;
export type Brief = z.output<typeof briefSchema>;
