import { SITE_URL } from '@/lib/constants';
import { STUDIO_SERVICES, type StudioService } from '@/data/studio/services';
import type { StudioProject } from '@/data/studio/projects';

export const STUDIO_URL = `${SITE_URL}/studio`;
const STUDIO_ID = `${STUDIO_URL}#studio`;

const AREA_SERVED = [
  { '@type': 'Country', name: 'Nigeria' },
  { '@type': 'Place', name: 'Worldwide' },
];

const studioReference = { '@type': 'ProfessionalService', '@id': STUDIO_ID, name: 'AOK Studio', url: STUDIO_URL };

export function studioSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': STUDIO_ID,
    name: 'AOK Studio',
    url: STUDIO_URL,
    description:
      'A Lagos creative studio for website design and development, brand identity, motion graphics, copywriting and ghostwriting.',
    logo: `${SITE_URL}/images/logo/Apotheosis of Knowledge LOGO PNG-15.png`,
    image: `${STUDIO_URL}/opengraph-image`,
    email: 'hello@aokltd.org',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressRegion: 'Lagos',
      addressCountry: 'NG',
    },
    areaServed: AREA_SERVED,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Apotheosis of Knowledge Limited',
      url: SITE_URL,
      foundingDate: '2022-07-27',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AOK Studio services',
      itemListElement: STUDIO_SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          url: `${STUDIO_URL}/services/${service.slug}`,
        },
      })),
    },
  };
}

export function serviceSchema(service: StudioService) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.name,
    description: service.seo.description,
    url: `${STUDIO_URL}/services/${service.slug}`,
    provider: studioReference,
    areaServed: AREA_SERVED,
  };
}

export function faqSchema(service: StudioService) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

export function caseStudySchema(project: StudioProject) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${project.name} website`,
    headline: project.seo.title,
    description: project.seo.description,
    url: `${STUDIO_URL}/work/${project.slug}`,
    about: project.sector,
    creator: studioReference,
    workExample: { '@type': 'WebSite', name: project.name, url: project.url },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
