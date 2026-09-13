import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { STUDIO_PROJECTS, getStudioProject, type LighthouseScores } from '@/data/studio/projects';
import { getStudioService, type StudioService } from '@/data/studio/services';
import { CaseVideo } from '@/components/studio/case/case-video';
import { Breadcrumbs, CtaBand, PageSection } from '@/components/studio/page-parts';
import { formatMeasuredDate } from '@/lib/studio/format';
import { JsonLd } from '@/components/studio/json-ld';
import { breadcrumbSchema, caseStudySchema } from '@/lib/studio/structured-data';
import { getProjectHighlights } from '@/lib/studio/highlights';

export const dynamicParams = false;

export function generateStaticParams() {
  return STUDIO_PROJECTS.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getStudioProject(slug);
  if (!project) return {};

  const path = `/studio/work/${project.slug}`;
  const fullTitle = `${project.seo.title} | AOK Studio`;
  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      siteName: 'AOK Studio',
      locale: 'en_NG',
      title: fullTitle,
      description: project.seo.description,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description: project.seo.description },
  };
}

const SCORE_ROWS: { key: keyof LighthouseScores; label: string }[] = [
  { key: 'performance', label: 'Performance' },
  { key: 'accessibility', label: 'Accessibility' },
  { key: 'bestPractices', label: 'Best practices' },
  { key: 'seo', label: 'SEO' },
];

const metaLabel = 'font-sans text-sm text-[var(--studio-ink-soft)] lg:text-[15px]';
const metaValue = 'mt-1 font-sans text-lg lg:text-xl';

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getStudioProject(slug);
  if (!project) notFound();

  const services = project.services
    .map(getStudioService)
    .filter((service): service is StudioService => Boolean(service));
  const highlights = getProjectHighlights(project.slug);
  const index = STUDIO_PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = STUDIO_PROJECTS[(index + 1) % STUDIO_PROJECTS.length];
  const crumbs = [
    { name: 'Studio', path: '/studio' },
    { name: 'Work', path: '/studio#work' },
    { name: project.name, path: `/studio/work/${project.slug}` },
  ];

  return (
    <>
      <JsonLd data={[caseStudySchema(project), breadcrumbSchema(crumbs)]} />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={crumbs} />

        <header className="pb-12 pt-10 lg:pb-16 lg:pt-14">
          <span className="studio-pill">Case study</span>
          <h1 className="mt-6 font-sans text-5xl leading-[1.02] sm:text-6xl lg:text-8xl">{project.name}</h1>
          <p className="mt-6 max-w-3xl font-serif text-lg leading-relaxed text-[var(--studio-ink-soft)] lg:text-2xl">
            {project.summary}
          </p>

          <dl className="mt-12 grid gap-6 border-t border-[var(--studio-ink-faint)] pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className={metaLabel}>Sector</dt>
              <dd className={metaValue}>{project.sector}</dd>
            </div>
            <div>
              <dt className={metaLabel}>Platform</dt>
              <dd className={metaValue}>{project.platform}</dd>
            </div>
            <div>
              <dt className={metaLabel}>Services</dt>
              <dd className={metaValue}>
                {services.map((service, i) => (
                  <span key={service.slug}>
                    {i > 0 && ', '}
                    <Link
                      href={`/studio/services/${service.slug}`}
                      className="inline-block py-1 underline-offset-4 hover:underline"
                    >
                      {service.name}
                    </Link>
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className={metaLabel}>Live site</dt>
              <dd className={metaValue}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 underline underline-offset-4"
                >
                  {project.displayUrl}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
        </header>

        <CaseVideo project={project} />

        <PageSection id="brief" title="The brief" className="mt-16 lg:mt-24">
          <p className="max-w-4xl font-serif text-2xl leading-[1.35] lg:text-[32px]">{project.brief}</p>
        </PageSection>

        <PageSection id="approach" title="What we did">
          <ol className="max-w-4xl space-y-6">
            {project.approach.map((step, i) => (
              <li key={step} className="grid grid-cols-[3rem_1fr] gap-4 lg:grid-cols-[4rem_1fr]">
                <span className="pt-1 font-sans text-[15px] tabular-nums text-[var(--studio-ink-soft)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-serif text-lg leading-relaxed lg:text-2xl lg:leading-snug">{step}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-10 flex flex-wrap gap-2">
            {project.scope.map((item) => (
              <li key={item} className="studio-pill">
                {item}
              </li>
            ))}
          </ul>
        </PageSection>

        {highlights.length > 0 && (
          <PageSection id="highlights" title="In numbers">
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-[var(--studio-radius)] bg-[var(--studio-card)] p-6 lg:p-8">
                  <dd className="font-sans text-5xl tabular-nums tracking-[-0.02em] lg:text-6xl">{item.value}</dd>
                  <dt className="mt-3 font-serif text-base text-[var(--studio-ink-soft)] lg:text-lg">{item.label}</dt>
                </div>
              ))}
            </dl>
          </PageSection>
        )}

        <PageSection id="measured" title="Measured">
          <div className="max-w-3xl overflow-x-auto">
            <table className="w-full border-collapse font-sans">
              <caption className="mb-4 text-left font-serif text-base text-[var(--studio-ink-soft)] lg:text-lg">
                {project.measured.tool} on {project.displayUrl}, measured {formatMeasuredDate(project.measured.measuredAt)}.
                Scores out of 100.
              </caption>
              <thead>
                <tr className="border-b border-[var(--studio-ink)] text-left text-sm lg:text-[15px]">
                  <th scope="col" className="py-3 pr-4 font-medium">Category</th>
                  <th scope="col" className="py-3 pr-4 text-right font-medium">Mobile</th>
                  <th scope="col" className="py-3 text-right font-medium">Desktop</th>
                </tr>
              </thead>
              <tbody>
                {SCORE_ROWS.map((row) => (
                  <tr key={row.key} className="border-b border-[var(--studio-ink-faint)] text-lg lg:text-xl">
                    <th scope="row" className="py-4 pr-4 text-left font-normal">{row.label}</th>
                    <td className="py-4 pr-4 text-right tabular-nums">{project.measured.mobile[row.key]}</td>
                    <td className="py-4 text-right tabular-nums">{project.measured.desktop[row.key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>

        {next && next.slug !== project.slug && (
          <nav aria-label="Next case study" className="border-t border-[var(--studio-ink-faint)] py-14 lg:py-20">
            <Link href={`/studio/work/${next.slug}`} className="group inline-flex flex-col gap-2">
              <span className="font-sans text-sm text-[var(--studio-ink-soft)] lg:text-[15px]">Next case study</span>
              <span className="inline-flex items-center gap-3 font-sans text-4xl tracking-[-0.02em] lg:text-6xl">
                {next.name}
                <ArrowRight
                  className="h-8 w-8 transition-transform duration-200 group-hover:translate-x-1 lg:h-12 lg:w-12"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </nav>
        )}

        <CtaBand
          heading="Want a site built to this standard?"
          body="Tell us what you’re working on. We reply by email with the questions that matter and, where it fits, a fixed proposal."
          service={project.services[0]}
        />
      </div>
    </>
  );
}
