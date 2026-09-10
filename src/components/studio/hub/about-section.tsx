import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_SERVICES } from '@/data/studio/services';
import { STUDIO_PROJECTS } from '@/data/studio/projects';

function Row({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="grid scroll-mt-8 gap-4 border-t border-[var(--studio-ink-faint)] py-12 lg:grid-cols-12 lg:gap-10 lg:py-16"
    >
      <h2 id={`${id}-heading`} className="font-sans text-xl lg:col-span-4 lg:text-2xl">
        {title}
      </h2>
      <div className="lg:col-span-8">{children}</div>
    </section>
  );
}

const listLink =
  'group flex items-start justify-between gap-6 py-5 transition-colors duration-200 hover:text-[var(--studio-ink)]';

/** Editorial two-column close to the hub: label on the left, substance on the right. */
export function AboutSection() {
  return (
    <div id="about" className="mx-auto max-w-[1400px] scroll-mt-8 px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pb-36 lg:pt-32">
      <Row id="studio" title="About the studio">
        <div className="space-y-6 font-serif text-2xl leading-[1.35] lg:text-[32px]">
          <p>
            AOK Studio is the client practice of Apotheosis of Knowledge Limited, a research publisher registered in
            Lagos in 2022.
          </p>
          <p className="text-[var(--studio-ink-soft)]">
            We build for other companies to the standard we hold our own work to: research first, nothing
            decorative, and results we can measure. We work with clients across Nigeria and abroad.
          </p>
        </div>
      </Row>

      <Row id="services" title="Services">
        <ul className="divide-y divide-[var(--studio-ink-faint)] border-b border-[var(--studio-ink-faint)]">
          {STUDIO_SERVICES.map((service) => (
            <li key={service.slug}>
              <Link href={`/studio/services/${service.slug}`} className={listLink}>
                <span>
                  <span className="block font-sans text-2xl tracking-[-0.01em] lg:text-3xl">{service.name}</span>
                  <span className="mt-1 block font-serif text-base text-[var(--studio-ink-soft)] lg:text-lg">
                    {service.summary}
                  </span>
                </span>
                <ArrowUpRight
                  className="mt-1 h-6 w-6 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Row>

      <Row id="selected-work" title="Selected work">
        <ul className="divide-y divide-[var(--studio-ink-faint)] border-b border-[var(--studio-ink-faint)]">
          {STUDIO_PROJECTS.map((project) => (
            <li key={project.slug}>
              <Link href={`/studio/work/${project.slug}`} className={listLink}>
                <span>
                  <span className="block font-sans text-2xl tracking-[-0.01em] lg:text-3xl">{project.name}</span>
                  <span className="mt-1 block font-serif text-base text-[var(--studio-ink-soft)] lg:text-lg">
                    {project.summary}
                  </span>
                </span>
                <ArrowUpRight
                  className="mt-1 h-6 w-6 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Row>

      <Row id="how-we-work" title="How we work">
        <p className="font-serif text-2xl leading-[1.35] lg:text-[32px]">
          Every project follows the same order: brief, structure, design, build, launch. You receive a fixed proposal
          before any work begins, and you can check our results, because we publish how we measure them.
        </p>
      </Row>
    </div>
  );
}
