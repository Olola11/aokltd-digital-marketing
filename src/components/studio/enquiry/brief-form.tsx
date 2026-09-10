'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { STUDIO_SERVICES, type StudioServiceSlug } from '@/data/studio/services';
import {
  briefSchema,
  TIMELINES,
  TIMELINE_LABELS,
  type Brief,
  type BriefInput,
} from '@/lib/studio/brief-schema';
import type { BriefDraftStore } from '@/lib/studio/brief-draft';
import { cn } from '@/lib/utils';
import { useStudioMotion } from '../motion/studio-motion';

type Status = { state: 'idle' } | { state: 'sent'; name: string } | { state: 'error'; message: string };

/** How each service reads inside the sentence "I need ___ for …" */
const SERVICE_PHRASES: Record<StudioServiceSlug, string> = {
  'web-design': 'a website',
  'brand-identity': 'a brand identity',
  'motion-video': 'motion or video',
  copywriting: 'copywriting',
  ghostwriting: 'a ghostwriter',
};

const inlineField =
  'min-w-0 rounded-none border-0 border-b-2 border-[var(--studio-ink)]/30 bg-transparent px-1 pb-0.5 font-sans [font-size:inherit] leading-tight text-[var(--studio-ink)] placeholder:text-[var(--studio-ink)]/45 transition-colors duration-200 focus:border-[var(--studio-ink)] focus:outline-none aria-[invalid=true]:border-red-700';

const FALLBACK_ERROR = 'Something went wrong. Please try again, or email hello@aokltd.org.';

export function BriefForm({
  preselect,
  draft,
}: {
  preselect?: StudioServiceSlug;
  draft: BriefDraftStore;
}) {
  const { reduced } = useStudioMotion();
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  const {
    register,
    handleSubmit,
    subscribe,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BriefInput, unknown, Brief>({
    resolver: zodResolver(briefSchema),
    defaultValues: {
      timeline: 'quarter',
      ...draft.read(),
      service: preselect ?? draft.read().service ?? 'web-design',
    },
  });

  // Keep the draft outside the sheet, which unmounts when closed.
  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: ({ values }) => {
          draft.write(values);
        },
      }),
    [subscribe, draft]
  );

  async function onSubmit(values: Brief) {
    setStatus({ state: 'idle' });
    try {
      const res = await fetch('/api/studio-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data: { error?: string } = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ state: 'error', message: data.error ?? FALLBACK_ERROR });
        return;
      }
      draft.clear();
      reset();
      setStatus({ state: 'sent', name: values.name.split(' ')[0] });
    } catch {
      setStatus({
        state: 'error',
        message: 'We could not reach the server. Check your connection and try again, or email hello@aokltd.org.',
      });
    }
  }

  // The sentence arrives a beat after the sheet, line by line.
  const rise = (step: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.22 + step * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
        };

  if (status.state === 'sent') {
    return (
      <div role="status" className="mt-10 max-w-2xl">
        <p className="font-sans text-3xl leading-tight lg:text-5xl">Thank you, {status.name}.</p>
        <p className="mt-4 font-serif text-lg text-[var(--studio-ink-soft)] lg:text-xl">
          Your brief has reached hello@aokltd.org. We will reply by email.
        </p>
      </div>
    );
  }

  const fieldErrors = (['service', 'organisation', 'timeline', 'name', 'email', 'details'] as const)
    .map((key) => errors[key]?.message)
    .filter((message): message is string => Boolean(message));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative mt-10">
      <div className="space-y-4 font-sans text-2xl leading-[1.7] sm:text-3xl lg:text-[44px] lg:leading-[1.5]">
        <motion.p {...rise(0)}>
          I need{' '}
          <label htmlFor="brief-service" className="sr-only">
            What you need
          </label>
          <select
            id="brief-service"
            {...register('service')}
            aria-invalid={!!errors.service}
            className={cn(inlineField, 'cursor-pointer appearance-none')}
          >
            {STUDIO_SERVICES.map((service) => (
              <option key={service.slug} value={service.slug}>
                {SERVICE_PHRASES[service.slug]}
              </option>
            ))}
          </select>{' '}
          for{' '}
          <label htmlFor="brief-organisation" className="sr-only">
            Who the work is for
          </label>
          <input
            id="brief-organisation"
            {...register('organisation')}
            placeholder="your company"
            autoComplete="organization"
            aria-invalid={!!errors.organisation}
            className={cn(inlineField, 'w-[8.5em]')}
          />{' '}
          <label htmlFor="brief-timeline" className="sr-only">
            When you need it
          </label>
          <select
            id="brief-timeline"
            {...register('timeline')}
            aria-invalid={!!errors.timeline}
            className={cn(inlineField, 'cursor-pointer appearance-none')}
          >
            {TIMELINES.map((timeline) => (
              <option key={timeline} value={timeline}>
                {TIMELINE_LABELS[timeline]}
              </option>
            ))}
          </select>
          .
        </motion.p>

        <motion.p {...rise(1)}>
          I’m{' '}
          <label htmlFor="brief-name" className="sr-only">
            Your name
          </label>
          <input
            id="brief-name"
            {...register('name')}
            placeholder="your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={cn(inlineField, 'w-[7em]')}
          />
          , and you can reach me at{' '}
          <label htmlFor="brief-email" className="sr-only">
            Your email
          </label>
          <input
            id="brief-email"
            type="email"
            inputMode="email"
            {...register('email')}
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={cn(inlineField, 'w-[10em]')}
          />
          .
        </motion.p>
      </div>

      <motion.div {...rise(2)} className="mt-10">
        <label htmlFor="brief-details" className="font-sans text-base lg:text-lg">
          Anything else we should know?{' '}
          <span className="text-[var(--studio-ink-soft)]">(optional)</span>
        </label>
        <textarea
          id="brief-details"
          rows={3}
          {...register('details')}
          placeholder="Links, references, a budget range, or the problem you want solved"
          aria-invalid={!!errors.details}
          className="mt-3 w-full resize-y rounded-2xl border border-[var(--studio-ink)]/20 bg-white/70 px-4 py-3 font-serif text-base leading-relaxed text-[var(--studio-ink)] placeholder:text-[var(--studio-ink)]/45 focus:border-[var(--studio-ink)] focus:outline-none lg:text-lg"
        />
      </motion.div>

      {/* Honeypot: invisible to people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="brief-website">Website</label>
        <input id="brief-website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      {fieldErrors.length > 0 && (
        <ul role="alert" className="mt-6 space-y-1 font-sans text-sm text-red-800 lg:text-base">
          {fieldErrors.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
      {status.state === 'error' && (
        <p role="alert" className="mt-6 font-sans text-sm text-red-800 lg:text-base">
          {status.message}
        </p>
      )}

      <motion.div {...rise(3)} className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          href="mailto:hello@aokltd.org"
          className="font-sans text-sm text-[var(--studio-ink-soft)] underline-offset-4 hover:underline lg:text-base"
        >
          Prefer email? hello@aokltd.org
        </a>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--studio-ink)] px-7 py-3.5 font-sans text-base font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? 'Sending…' : 'Send brief'}
          {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
      </motion.div>
    </form>
  );
}
