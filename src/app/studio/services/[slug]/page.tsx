import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Plus } from 'lucide-react';
import { STUDIO_SERVICES, getStudioService } from '@/data/studio/services';
import { getStudioProject, type StudioProject } from '@/data/studio/projects';
import { StartBriefButton } from '@/components/studio/enquiry/enquiry-provider';
import { WorkCard } from '@/components/studio/cards/work-card';
import { Breadcrumbs, CtaBand, PageSection } from '@/components/studio/page-parts';
import { primaryButton, secondaryButton } from '@/components/studio/ui/buttons';
import { JsonLd } from '@/components/studio/json-ld';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/studio/structured-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return STUDIO_SERVICES.map((service) => ({ slug: service.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getStudioService(slug);
  if (!service) return {};

  const path = `/studio/services/${service.slug}`;
  const fullTitle = `${service.seo.title} | AOK Studio`;
  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      siteName: 'AOK Studio',
      locale: 'en_NG',
      title: fullTitle,
      description: service.seo.description,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description: service.seo.description },
  };
}

const bodyText = 'font-serif text-base leading-relaxed text-[var(--studio-ink-soft)] lg:text-lg';

export default async function StudioServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getStudioService(slug);
  if (!service) notFound();

  const work = service.relatedWork
    .map(getStudioProject)
    .filter((project): project is StudioProject => Boolean(project));
  const others = STUDIO_SERVICES.filter((other) => other.slug !== service.slug);
  const crumbs = [
    { name: 'Studio', path: '/studio' },
    { name: 'Services', path: '/studio#services' },
    { name: service.name, path: `/studio/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd data={[serviceSchema(service), faqSchema(service), breadcrumbSchema(crumbs)]} />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={crumbs} />

        <header className="pb-16 pt-10 lg:pb-24 lg:pt-14">
          <span className="studio-pill">Service</span>
          <h1 className="mt-6 max-w-[18ch] font-sans text-4xl leading-[1.05] sm:text-5xl lg:text-7xl">{service.h1}</h1>
          <p className="mt-6 max-w-3xl font-serif text-lg leading-relaxed text-[var(--studio-ink-soft)] lg:text-2xl">
            {service.lede}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <StartBriefButton service={service.slug} className={primaryButton}>
              Start a brief
            </StartBriefButton>
            {work.length > 0 && (
              <a href="#work" className={secondaryButton}>
                See the work
              </a>
            )}
          </div>
        </header>

        <PageSection id="includes" title="What you get">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item) => (
              <li key={item.title} className="rounded-[var(--studio-radius)] bg-[var(--studio-card)] p-6 lg:p-8">
                <h3 className="font-sans text-xl lg:text-2xl">{item.title}</h3>
                <p className={`mt-3 ${bodyText}`}>{item.body}</p>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection id="process" title="How it works">
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {service.process.map((step, i) => (
              <li key={step.title} className="border-t-2 border-[var(--studio-ink)] pt-4">
                <span className="font-sans text-[15px] tabular-nums text-[var(--studio-ink-soft)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-sans text-xl">{step.title}</h3>
                <p className={`mt-2 ${bodyText}`}>{step.body}</p>
              </li>
            ))}
          </ol>
        </PageSection>

        <PageSection id="fit" title="Who it’s for">
          <ul className="max-w-4xl space-y-4 font-serif text-xl leading-snug lg:text-2xl">
            {service.fit.map((line) => (
              <li key={line} className="flex gap-4">
                <span aria-hidden="true" className="text-[var(--studio-ink-soft)]">
                  —
                </span>
                {line}
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection id="work" title="Related work">
          {work.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {work.map((project) => (
                <WorkCard key={project.slug} project={project} headingLevel="h3" />
              ))}
            </div>
          ) : (
            <p className="max-w-3xl font-serif text-xl leading-snug lg:text-2xl">{service.workNote}</p>
          )}
        </PageSection>

        <PageSection id="faq" title="Questions">
          <div className="max-w-4xl divide-y divide-[var(--studio-ink-faint)] border-y border-[var(--studio-ink-faint)]">
            {service.faqs.map((faq) => (
              <details key={faq.q} className="studio-faq py-5">
                <summary className="flex cursor-pointer items-start justify-between gap-6">
                  <h3 className="font-sans text-lg lg:text-2xl">{faq.q}</h3>
                  <Plus
                    className="studio-faq-icon mt-1 h-5 w-5 shrink-0 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </summary>
                <p className={`mt-4 max-w-3xl ${bodyText}`}>{faq.a}</p>
              </details>
            ))}
          </div>
        </PageSection>

        {service.seeAlso && (
          <aside className="mb-14 rounded-[var(--studio-radius)] border border-[var(--studio-ink-faint)] p-6 lg:p-8">
            <p className="max-w-3xl font-serif text-lg leading-relaxed lg:text-xl">{service.seeAlso.note}</p>
            <Link
              href={service.seeAlso.href}
              className="mt-4 inline-flex items-center gap-1.5 font-sans text-[15px] font-medium underline underline-offset-4"
            >
              {service.seeAlso.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </aside>
        )}

        <PageSection id="other-services" title="Other services">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/studio/services/${other.slug}`}
                  className="flex h-full flex-col justify-between gap-6 rounded-[var(--studio-radius)] bg-[var(--studio-card)] p-6 transition-colors duration-200 hover:bg-[var(--studio-card-strong)]"
                >
                  <span className="font-sans text-xl">{other.name}</span>
                  <span className="font-serif text-base text-[var(--studio-ink-soft)]">{other.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </PageSection>

        <CtaBand
          heading="Tell us what you’re working on."
          body="One sentence is enough to start. We reply by email with the questions that matter and, where it fits, a fixed proposal."
          service={service.slug}
        />
      </div>
    </>
  );
}
