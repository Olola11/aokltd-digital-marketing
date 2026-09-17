/**
 * Studio services — the single source for the hub, service pages,
 * enquiry form options, sitemap and structured data.
 *
 * Keyword phrasing leads with Lagos / Nigeria (primary market) while the
 * copy stays readable for international clients.
 */

export type StudioServiceSlug =
  | 'web-design'
  | 'brand-identity'
  | 'motion-video'
  | 'copywriting'
  | 'ghostwriting';

export interface StudioService {
  slug: StudioServiceSlug;
  name: string;
  /** Word typed into the hub's services card */
  scrubWord: string;
  /** One line used in lists and cards */
  summary: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  h1: string;
  lede: string;
  includes: { title: string; body: string }[];
  process: { title: string; body: string }[];
  fit: string[];
  faqs: { q: string; a: string }[];
  /** Project slugs that demonstrate this service */
  relatedWork: string[];
  /** Shown when relatedWork is empty */
  workNote?: string;
}

export const STUDIO_SERVICES: StudioService[] = [
  {
    slug: 'web-design',
    name: 'Website design & build',
    scrubWord: 'Websites',
    summary: 'Custom websites designed and engineered for speed, search and trust.',
    seo: {
      title: 'Website Design Company in Lagos, Nigeria',
      description:
        'Custom website design and development from Lagos. Fast, accessible, search-ready sites on Next.js or WordPress for Nigerian and international brands.',
      keywords: [
        'website design company in Lagos',
        'web design Nigeria',
        'website development Lagos',
        'Next.js developer Nigeria',
        'WordPress website design Nigeria',
      ],
    },
    h1: 'Website design and development, built in Lagos',
    lede:
      'We design and build websites that load quickly on Nigerian networks, read clearly on any screen, and give search engines everything they need to rank you. Every site starts from a blank page and is shaped around the business it serves.',
    includes: [
      {
        title: 'Discovery and structure',
        body: 'Before any design, we map what your visitors need to find, in what order, and which searches should lead them to you.',
      },
      {
        title: 'Original design',
        body: 'No templates. Layout, typography and motion are designed around your brand and your content.',
      },
      {
        title: 'The right platform',
        body: 'Next.js where speed and custom interaction matter most. WordPress when your team needs to publish and edit every day.',
      },
      {
        title: 'Search foundations',
        body: 'Structured data, clean URLs, metadata, sitemaps and performance budgets are part of the build, not an afterthought.',
      },
      {
        title: 'Accessibility',
        body: 'Built to WCAG 2.1 AA: keyboard navigation, readable contrast, and respect for reduced-motion settings.',
      },
      {
        title: 'Launch and handover',
        body: 'Hosting, domain and analytics set up, followed by a walkthrough so your team can keep the site current.',
      },
    ],
    process: [
      { title: 'Brief', body: 'A short conversation about your goals, audience and deadline, followed by a fixed proposal.' },
      { title: 'Structure', body: 'Sitemap, page outlines and the search terms each page should answer.' },
      { title: 'Design', body: 'Key pages designed in full, reviewed with you, then extended across the site.' },
      { title: 'Build', body: 'Engineered, tested on real devices and slow connections, and checked for accessibility.' },
      { title: 'Launch', body: 'Deployed, submitted to search engines and handed over with documentation.' },
    ],
    fit: [
      'Companies whose website is the first impression for investors, partners or customers',
      'Agencies and consultancies that need to present their work properly',
      'Organisations moving away from a slow or template-built site',
    ],
    faqs: [
      {
        q: 'How much does a website cost in Nigeria?',
        a: 'It depends on the number of pages, how much custom interaction the site needs, and the platform. After a short brief we send a fixed quote and schedule, so you know the full cost before any work starts.',
      },
      {
        q: 'Should my website be built on WordPress or Next.js?',
        a: 'If your team publishes often and wants a familiar editor, WordPress is usually right. If speed, custom interaction and long-term performance matter most, we recommend Next.js. The proposal explains the trade-off for your case.',
      },
      {
        q: 'Will my website rank on Google?',
        a: 'Every site we build has the technical foundations search engines look for: fast loading, structured data, clean markup and a sensible page structure. Rankings also depend on content and competition, which is why copywriting is part of what we do.',
      },
      {
        q: 'Can you redesign my existing website?',
        a: 'Yes. We start by auditing what already works, including the search traffic you have, so a redesign does not throw away rankings you have already earned.',
      },
      {
        q: 'Do you work with clients outside Nigeria?',
        a: 'Yes. We work remotely and schedule calls to suit your time zone.',
      },
    ],
    relatedWork: ['gorille-and-co', 'aokltd'],
  },
  {
    slug: 'brand-identity',
    name: 'Brand identity',
    scrubWord: 'Identities',
    summary: 'Logos, type and colour systems that hold together everywhere your brand appears.',
    seo: {
      title: 'Brand Identity Design in Lagos, Nigeria',
      description:
        'Brand identity design from Lagos: logos, typography, colour systems and brand guidelines for Nigerian businesses that want to look as serious as they are.',
      keywords: [
        'brand identity designer Nigeria',
        'logo design Lagos',
        'branding agency Lagos',
        'brand guidelines Nigeria',
        'corporate identity design Nigeria',
      ],
    },
    h1: 'Brand identity design for businesses that mean it',
    lede:
      'A brand identity is the set of decisions about how you look, sound and behave wherever someone meets you. We design that system for companies in Lagos and abroad — logo, typography, colour and voice — document every decision, and hand it over so your team can use it without us.',
    includes: [
      {
        title: 'Positioning',
        body: 'A clear statement of who you serve and why you are different. Every visual decision is tested against it.',
      },
      {
        title: 'Logo and marks',
        body: 'A primary logo with the secondary marks and small-size versions real use demands.',
      },
      {
        title: 'Typography and colour',
        body: 'A type pairing and palette chosen for legibility, contrast and character, with accessible combinations defined.',
      },
      {
        title: 'Brand guidelines',
        body: 'A practical guide showing what to do and what to avoid, written for the people who will use it.',
      },
      {
        title: 'Applications',
        body: 'The identity applied where it matters first: website, social templates, presentations and stationery.',
      },
      {
        title: 'Organised files',
        body: 'Every asset exported in the formats your printers, developers and social team will ask for.',
      },
    ],
    process: [
      { title: 'Listen', body: 'Interviews with your team and a look at your market and competitors.' },
      { title: 'Position', body: 'A short positioning statement agreed before any drawing begins.' },
      { title: 'Explore', body: 'Distinct directions presented with their reasoning, not just their looks.' },
      { title: 'Refine', body: 'One direction developed in detail and tested in real applications.' },
      { title: 'Systemise', body: 'Guidelines and files prepared so the identity survives without us.' },
    ],
    fit: [
      'New companies preparing to launch',
      'Established businesses whose look no longer matches the quality of their work',
      'Organisations preparing to raise investment or enter new markets',
    ],
    faqs: [
      {
        q: 'What is included in a brand identity project?',
        a: 'Positioning, a logo system, typography, colour, brand guidelines and the first set of applications. The proposal lists every deliverable for your project.',
      },
      {
        q: 'How long does a branding project take?',
        a: 'It depends on scope and how quickly decisions can be made on your side. You receive a fixed schedule with the proposal, before any work starts.',
      },
      {
        q: 'Can you design just a logo?',
        a: 'We can, though a logo alone rarely fixes how a brand is perceived. We will recommend the smallest scope that solves your actual problem.',
      },
      {
        q: 'Can you refresh our existing brand instead of starting over?',
        a: 'Often that is the better choice. We keep the parts of your identity that people already recognise and fix what is not working.',
      },
    ],
    relatedWork: ['aokltd'],
  },
  {
    slug: 'motion-video',
    name: 'Motion & video',
    scrubWord: 'Motion',
    summary: 'Animation, motion graphics and edited video that explain rather than decorate.',
    seo: {
      title: 'Motion Graphics & Video Production in Lagos',
      description:
        'Motion graphics, animated explainers and video editing from Lagos. Clear, well-paced motion for brands, websites, social media and product launches.',
      keywords: [
        'motion graphics studio Lagos',
        'animation company Nigeria',
        'video editing services Nigeria',
        'explainer video Nigeria',
        'social media video production Lagos',
      ],
    },
    h1: 'Motion graphics and video that make ideas clear',
    lede:
      'Good motion shows how something works, what changed or why it matters, faster than text can. We design animation and motion graphics and edit video with that purpose, for websites, social channels and presentations.',
    includes: [
      {
        title: 'Motion graphics and explainers',
        body: 'Animated sequences that walk your audience through a product, a process or an argument.',
      },
      {
        title: 'Website and interface motion',
        body: 'The kind of motion on this page: scroll choreography, transitions and small interactions, engineered to stay fast.',
      },
      {
        title: 'Short-form social video',
        body: 'Vertical video for TikTok, Instagram and YouTube Shorts, paced for the first three seconds.',
      },
      {
        title: 'Editing and finishing',
        body: 'Cutting, captioning, sound and colour for footage you have already shot.',
      },
      {
        title: 'Programmatic video',
        body: 'Templates rendered from data with Remotion, so a series of fifty videos stays as consistent as the first.',
      },
    ],
    process: [
      { title: 'Script', body: 'What the piece must say, in the fewest words.' },
      { title: 'Storyboard', body: 'The sequence sketched frame by frame and agreed before production.' },
      { title: 'Style frames', body: 'A few finished stills that fix the look.' },
      { title: 'Animate and edit', body: 'Production, with reviews at agreed points.' },
      { title: 'Deliver', body: 'Exports sized and compressed for every channel you use.' },
    ],
    fit: [
      'Brands launching a product that needs explaining',
      'Teams publishing regular video on social channels',
      'Websites that need motion to guide attention without slowing down',
    ],
    faqs: [
      {
        q: 'What formats do you deliver?',
        a: 'Whatever your channels need: vertical and horizontal video, looping web animation, and lightweight formats for websites.',
      },
      {
        q: 'Can you edit footage we have already shot?',
        a: 'Yes. Send us the raw footage and a short brief, and we will handle the edit, captions, sound and colour.',
      },
      {
        q: 'Do you make videos for TikTok and Instagram?',
        a: 'Yes. AOK publishes its own short-form video across TikTok, Instagram and Facebook, so we plan for how each platform is actually watched.',
      },
      {
        q: 'Will animation slow down my website?',
        a: 'Not if it is engineered properly. We animate only what the browser can move cheaply, load motion when it is needed, and switch it off for visitors who prefer reduced motion.',
      },
    ],
    relatedWork: ['aokltd'],
  },
  {
    slug: 'copywriting',
    name: 'Content & copywriting',
    scrubWord: 'Copy',
    summary: 'Website copy, positioning and research-led content that earns attention honestly.',
    seo: {
      title: 'Copywriting & Content Writing Services in Nigeria',
      description:
        'Website copy, brand messaging and research-led articles written in Lagos for Nigerian and international businesses. Clear, accurate and built for search.',
      keywords: [
        'copywriting services Nigeria',
        'content writing agency Lagos',
        'website copywriter Nigeria',
        'SEO content writing Nigeria',
        'brand messaging Nigeria',
      ],
    },
    h1: 'Copywriting and content, researched before it is written',
    lede:
      'AOK began as a research-driven publisher, so we write the way we publish: check the facts, find the clearest structure, then choose every word on purpose. Website copy, landing pages, articles and scripts that people finish reading and search engines understand.',
    includes: [
      {
        title: 'Website copy',
        body: 'Every page written to answer what its visitor came to find, in the order they need it.',
      },
      {
        title: 'Positioning and messaging',
        body: 'The few sentences that explain what you do and why it matters, agreed before anything else is written.',
      },
      {
        title: 'Articles and long-form content',
        body: 'Researched, sourced articles in the standard of the AOK Vault.',
      },
      {
        title: 'Search content planning',
        body: 'Keyword research, topic clusters and briefs, so each piece targets a search people actually make.',
      },
      {
        title: 'Tone of voice',
        body: 'A short guide that helps everyone on your team write like the same company.',
      },
      {
        title: 'Editing',
        body: 'Structural editing and proofreading for writing your team has already drafted.',
      },
    ],
    process: [
      { title: 'Research', body: 'Your market, your audience and what they are searching for.' },
      { title: 'Outline', body: 'Structure agreed before drafting, so revisions stay small.' },
      { title: 'Draft', body: 'Written for your reader, checked for accuracy.' },
      { title: 'Edit', body: 'Tightened, fact-checked and optimised for search.' },
      { title: 'Publish', body: 'Delivered ready to publish, with metadata written.' },
    ],
    fit: [
      'Businesses launching or rebuilding a website',
      'Companies that need to explain something complex simply',
      'Brands building search traffic through regular articles',
    ],
    faqs: [
      {
        q: 'Do you write SEO content?',
        a: 'Yes. Each piece starts from keyword research and is written to answer the search behind it, with titles, headings and metadata to match.',
      },
      {
        q: 'Can you write for a Nigerian audience?',
        a: 'Yes. We are based in Lagos and write for Nigerian readers every day, and we adjust tone and references for international audiences when needed.',
      },
      {
        q: 'Is the content original?',
        a: 'Every piece is researched and written for your brand, and checked for accuracy before delivery.',
      },
      {
        q: 'Can you run a monthly content calendar?',
        a: 'Yes. We plan a calendar around the searches and questions your audience already has, then write to it at whatever cadence the brief agrees.',
      },
    ],
    relatedWork: ['aokltd'],
  },
  {
    slug: 'ghostwriting',
    name: 'Ghostwriting',
    scrubWord: 'Ghostwriting',
    summary: 'Books, articles, speeches and thought leadership written in your voice, under your name.',
    seo: {
      title: 'Ghostwriters in Nigeria for Books & Articles',
      description:
        'Professional ghostwriting from Lagos: books, memoirs, articles, speeches and LinkedIn content written in your voice, researched carefully and kept confidential.',
      keywords: [
        'ghostwriting services Nigeria',
        'ghostwriters in Nigeria',
        'book ghostwriter Lagos',
        'memoir ghostwriter Nigeria',
        'LinkedIn ghostwriting Nigeria',
      ],
    },
    h1: 'Ghostwriting in your voice, under your name',
    lede:
      'You have the knowledge, the story or the argument. We supply the time, structure and craft to put it on the page — books, articles, speeches and thought leadership — so it sounds like you on your best day. Our name never appears on the work.',
    includes: [
      { title: 'Books and memoirs', body: 'From first interview to finished manuscript, chapter by chapter.' },
      { title: 'Articles and op-eds', body: 'Researched opinion pieces for publications and your own channels.' },
      { title: 'Speeches and talks', body: 'Written to be spoken, timed and paced for the room.' },
      { title: 'LinkedIn and thought leadership', body: 'A steady stream of posts that sound like you and say something.' },
      { title: 'Research and interviews', body: 'We do the reading and the interviewing so your hours go into the ideas.' },
      { title: 'Confidential by default', body: 'The work, and the fact that we wrote it, stays between us.' },
    ],
    process: [
      { title: 'Interview', body: 'Recorded conversations to capture your voice, stories and views.' },
      { title: 'Outline', body: 'The structure agreed before a single chapter or article is drafted.' },
      { title: 'Draft in stages', body: 'Written in sections so you can steer as it develops.' },
      { title: 'Revise', body: 'Rounds of revision until every line sounds like you.' },
      { title: 'Deliver', body: 'A final manuscript or article set, ready for publication.' },
    ],
    fit: [
      'Founders and executives with expertise but no time to write',
      'Public figures preparing a memoir or book',
      'Professionals building a reputation through regular writing',
    ],
    faqs: [
      {
        q: 'How does ghostwriting work?',
        a: 'We interview you, agree an outline, then write in stages while you review. You approve every word before anything is published under your name.',
      },
      {
        q: 'Will it sound like me?',
        a: 'That is the whole job. We study how you speak and write, and revise until the draft reads as yours.',
      },
      {
        q: 'Is ghostwriting confidential?',
        a: 'Yes. The work is published under your name only, and we do not show it in our portfolio.',
      },
      {
        q: 'How long does it take to ghostwrite a book?',
        a: 'It depends on length, research and how often we can meet. The proposal includes a chapter-by-chapter schedule.',
      },
    ],
    relatedWork: [],
    workNote: 'Ghostwritten work belongs to the people whose names are on it, so it never appears in our portfolio.',
  },
];

export function getStudioService(slug: string): StudioService | undefined {
  return STUDIO_SERVICES.find((service) => service.slug === slug);
}

/**
 * The questions people actually search for, two per service, in the order a
 * visitor meets the services on the page. Answered on the hub itself, since
 * the services no longer have pages of their own.
 */
export const STUDIO_FAQS = STUDIO_SERVICES.flatMap((service) =>
  service.faqs.slice(0, 2).map((faq) => ({ ...faq, service: service.name }))
);
