import type { StudioServiceSlug } from './services';

/**
 * Studio projects — real, shipped client work only.
 *
 * To add a project:
 *   1. node scripts/studio/capture-preview.mjs <slug> <url>
 *   2. Run Lighthouse (mobile + desktop) and record the scores below
 *   3. Add an entry here — the hub grid, case study page, sitemap and
 *      structured data all read from this list.
 */

export interface LighthouseScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface StudioProject {
  slug: string;
  name: string;
  url: string;
  displayUrl: string;
  sector: string;
  summary: string;
  services: StudioServiceSlug[];
  platform: string;
  brief: string;
  approach: string[];
  scope: string[];
  preview: {
    /** The page that was recorded, shown in captions */
    source: string;
    /** 1920×1200 card rendition, keyframes every 12 frames for smooth scrubbing */
    mp4: string;
    /** 3840×2400 rendition for the case study's full-width player */
    mp4Uhd: string;
    poster: string;
    width: number;
    height: number;
  };
  measured: {
    tool: string;
    /** ISO date of the Lighthouse run */
    measuredAt: string;
    mobile: LighthouseScores;
    desktop: LighthouseScores;
  };
  seo: {
    title: string;
    description: string;
  };
}

export const STUDIO_PROJECTS: StudioProject[] = [
  {
    slug: 'gorille-and-co',
    name: 'Gorille x Co',
    url: 'https://gorilleandco.com/',
    displayUrl: 'gorilleandco.com',
    sector: 'Sports, entertainment and culture partnerships',
    summary:
      'The website for a partnerships firm that brings brands into sport, music and culture, and shows the commercial results.',
    services: ['web-design'],
    platform: 'WordPress',
    brief:
      'Gorille x Co needed a website that makes a creative business legible to the people who sign off budgets: brand managers who want to see what a partnership delivered, not just how it looked.',
    approach: [
      'Proof first. Six case studies sit at the centre of the site, each led by the single result that mattered most.',
      'A clear route for every visitor: capabilities for those comparing agencies, insights for those researching, and a direct path to start a partnership.',
      'Built on WordPress so the Gorille x Co team can publish new case studies and insights without a developer.',
    ],
    scope: ['Information architecture', 'Website design', 'WordPress build', 'Case study templates', 'Insights section'],
    preview: {
      source: 'gorilleandco.com',
      source: 'gorilleandco.com',
      mp4: '/studio/work/gorille-and-co/preview.mp4',
      mp4Uhd: '/studio/work/gorille-and-co/preview-uhd.mp4',
      poster: '/studio/work/gorille-and-co/poster.jpg',
      width: 3840,
      height: 2400,
    },
    measured: {
      tool: 'Lighthouse 12.8',
      measuredAt: '2026-09-10',
      mobile: { performance: 87, accessibility: 96, bestPractices: 96, seo: 92 },
      desktop: { performance: 71, accessibility: 96, bestPractices: 100, seo: 92 },
    },
    seo: {
      title: 'Gorille x Co Website — Case Study',
      description:
        'How AOK Studio designed and built the Gorille x Co website: a WordPress site for a sports, entertainment and culture partnerships firm, organised around proof.',
    },
  },
  {
    slug: 'aokltd',
    name: 'Apotheosis of Knowledge',
    url: 'https://aokltd.org/',
    displayUrl: 'aokltd.org',
    sector: 'Research publishing and education',
    summary:
      'The institutional home of a Lagos research publisher, with a long-form archive on its own subdomain.',
    services: ['web-design', 'brand-identity', 'motion-video', 'copywriting'],
    platform: 'Next.js',
    brief:
      'A publisher that exists to counter shallow content online cannot have a shallow website. The site had to feel permanent and credible, carry long-form research comfortably, and show the company’s registration and standing to partners and investors.',
    approach: [
      'An editorial system in two typefaces, Space Grotesk and Source Serif 4, with a restrained navy and quill-blue palette.',
      'A logo that constructs itself on arrival: the ring draws, the A rises and the quill lands, then steps aside as the visitor scrolls.',
      'The Vault at vault.aokltd.org: a research archive with category indexes, reading progress and a random Nigerian fact generator you can drive from the keyboard.',
      'An investor prospectus and a verifiable registration page, because credibility is part of the product.',
      'Built with Next.js and generated statically, so pages arrive quickly and are easy for search engines to read.',
    ],
    scope: ['Brand identity', 'Website design', 'Next.js build', 'Motion design', 'Editorial content'],
    preview: {
      // A Vault article: large type and a hero illustration read clearly at
      // card size, where the homepage's pinned hero and the Vault index's
      // fine grey type do not.
      source: 'vault.aokltd.org/history/geometry-of-dahomey',
      mp4: '/studio/work/aokltd/preview.mp4',
      mp4Uhd: '/studio/work/aokltd/preview-uhd.mp4',
      poster: '/studio/work/aokltd/poster.jpg',
      width: 3840,
      height: 2400,
    },
    measured: {
      tool: 'Lighthouse 12.8',
      measuredAt: '2026-09-10',
      mobile: { performance: 63, accessibility: 96, bestPractices: 96, seo: 100 },
      desktop: { performance: 81, accessibility: 96, bestPractices: 96, seo: 100 },
    },
    seo: {
      title: 'Apotheosis of Knowledge Website — Case Study',
      description:
        'How AOK Studio designed and built aokltd.org and the Vault: an editorial Next.js site with a self-constructing logo, a research archive and a random fact engine.',
    },
  },
];

export function getStudioProject(slug: string): StudioProject | undefined {
  return STUDIO_PROJECTS.find((project) => project.slug === slug);
}
