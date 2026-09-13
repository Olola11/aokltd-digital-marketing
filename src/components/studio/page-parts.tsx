import Link from 'next/link';
import type { StudioServiceSlug } from '@/data/studio/services';
import { cn } from '@/lib/utils';
import { StartBriefButton } from './enquiry/enquiry-provider';
import { primaryButton } from './ui/buttons';

/** Shared building blocks for studio service and case study pages. */

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 font-sans text-sm text-[var(--studio-ink-soft)] lg:text-[15px]">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-[var(--studio-ink)]">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="inline-block py-2 underline-offset-4 hover:underline">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageSection({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('scroll-mt-8 border-t border-[var(--studio-ink-faint)] py-14 lg:py-20', className)}
    >
      <h2 id={`${id}-heading`} className="mb-8 font-sans text-2xl lg:mb-12 lg:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function CtaBand({
  heading,
  body,
  service,
}: {
  heading: string;
  body: string;
  service?: StudioServiceSlug;
}) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="my-16 rounded-[28px] bg-[var(--studio-accent-soft)] px-6 py-14 text-center lg:my-24 lg:py-20"
    >
      <h2 id="cta-heading" className="mx-auto max-w-[20ch] font-sans text-3xl leading-[1.1] lg:text-5xl">
        {heading}
      </h2>
      <p className="mx-auto mt-4 max-w-xl font-serif text-lg text-[var(--studio-ink-soft)] lg:text-xl">{body}</p>
      <StartBriefButton service={service} className={cn(primaryButton, 'mt-8')}>
        Start a brief
      </StartBriefButton>
    </section>
  );
}
