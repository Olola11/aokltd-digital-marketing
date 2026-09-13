import type { Metadata } from 'next';
import { STUDIO_PROJECTS } from '@/data/studio/projects';
import { ResolveGrid, type GridItem } from '@/components/studio/hub/resolve-grid';
import { AboutSection } from '@/components/studio/hub/about-section';
import { WorkCard } from '@/components/studio/cards/work-card';
import { ServicesCard } from '@/components/studio/cards/services-card';
import { MeasuredCard } from '@/components/studio/cards/measured-card';
import { BriefCard, MethodCard, StatementCard } from '@/components/studio/cards/simple-cards';
import { ClientsCard } from '@/components/studio/cards/clients-card';
import { JsonLd } from '@/components/studio/json-ld';
import { studioSchema } from '@/lib/studio/structured-data';

const TITLE = 'AOK Studio — Website Design, Branding & Content in Lagos';
const DESCRIPTION =
  'AOK Studio is a Lagos creative studio for website design and development, brand identity, motion graphics, copywriting and ghostwriting, for Nigerian and international companies.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'creative studio Lagos',
    'website design company in Lagos',
    'brand identity designer Nigeria',
    'motion graphics studio Lagos',
    'copywriting services Nigeria',
    'ghostwriting services Nigeria',
  ],
  alternates: { canonical: '/studio' },
  openGraph: {
    type: 'website',
    url: '/studio',
    siteName: 'AOK Studio',
    locale: 'en_NG',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function StudioPage() {
  const work: GridItem[] = STUDIO_PROJECTS.map((project) => ({
    id: `work-${project.slug}`,
    // The clients logo wall names each client, so the work cards lead with the industry.
    node: <WorkCard project={project} showName={false} />,
    mobileOrder: 2,
  }));

  const columns: GridItem[][] = [
    [
      { id: 'statement', node: <StatementCard />, mobileOrder: 1 },
      ...(work[0] ? [{ ...work[0], mobileOrder: 2 }] : []),
      { id: 'method', node: <MethodCard />, mobileOrder: 7 },
    ],
    [
      { id: 'services', node: <ServicesCard />, mobileOrder: 4 },
      ...(work[1] ? [{ ...work[1], mobileOrder: 3 }] : []),
      { id: 'clients', node: <ClientsCard />, mobileOrder: 8 },
    ],
    [
      { id: 'measured', node: <MeasuredCard />, mobileOrder: 5 },
      { id: 'brief', node: <BriefCard />, mobileOrder: 6 },
    ],
  ];

  // Future projects slot into the columns in turn, after the first card.
  work.slice(2).forEach((item, i) => {
    columns[(i + 2) % 3].splice(1, 0, { ...item, mobileOrder: 3 });
  });

  return (
    <>
      <JsonLd data={studioSchema()} />
      <section id="work" aria-label="Studio overview" className="scroll-mt-4 px-3 sm:px-5 lg:px-8">
        <ResolveGrid columns={columns} />
      </section>
      <AboutSection />
    </>
  );
}
