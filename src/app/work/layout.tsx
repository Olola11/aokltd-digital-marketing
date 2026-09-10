import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Creative Services & Web Design | Apotheosis of Knowledge',
  description:
    'AOK Ltd creates brands, digital experiences, content, animation, and visual stories that help businesses stand out. Explore our work and start a project.',
  keywords: [
    'creative agency Nigeria',
    'web design studio Lagos',
    'brand design Africa',
    'digital experiences',
    'cinematic motion design',
    'content strategy',
    'Next.js development',
    'Apotheosis of Knowledge',
    'creative services portfolio',
  ],
  alternates: {
    canonical: `${SITE_URL}/work`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/work`,
    siteName: 'Apotheosis of Knowledge',
    title: 'Creative Services & Web Design | Apotheosis of Knowledge',
    description:
      'We create brands, digital experiences, and visual stories that make people pay attention. Explore our work and start a project.',
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: 'Apotheosis of Knowledge — Creative Services & Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Services & Web Design | Apotheosis of Knowledge',
    description:
      'We create brands, digital experiences, and visual stories that make people pay attention. Explore our work and start a project.',
    images: ['/og/default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="showcase-isolated-layout bg-white text-[#00008A] min-h-screen selection:bg-[#4A8FE1]/20 selection:text-[#00008A]">
      {/* Structured Data: ProfessionalService & Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Apotheosis of Knowledge Limited — Creative Services',
            alternateName: 'AOK Ltd Creative Studio',
            url: `${SITE_URL}/work`,
            logo: `${SITE_URL}/images/logo/Apotheosis of Knowledge LOGO PNG-15.png`,
            image: `${SITE_URL}/og/default.png`,
            description:
              'AOK Ltd creates brands, digital experiences, content, animation, and visual stories that help businesses stand out.',
            foundingDate: '2022-07-27',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Lagos',
              addressCountry: 'NG',
            },
            areaServed: [
              {
                '@type': 'Country',
                name: 'Nigeria',
              },
              {
                '@type': 'AdministrativeArea',
                name: 'Global',
              },
            ],
            knowsAbout: [
              'Brand Design',
              'Web Design',
              '3D Design',
              'Animation',
              'Videography',
              'Content Strategy',
              'Copywriting',
              'Business Consulting',
              'Marketing Consulting',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'hello@aokltd.org',
              contactType: 'creative enquiries',
            },
          }),
        }}
      />
      {children}
    </div>
  );
}
