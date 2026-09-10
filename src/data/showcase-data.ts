export interface Project {
  name: string;
  slug: string;
  logo: string;
  brandColor: string;
  accentColor: string;
  category: string;
  year: string;
  description: string;
  tagline: string;
  image: string;
  secondaryImages: string[];
  featured?: boolean;
  aspectRatio?: 'landscape' | 'portrait' | 'wide';
  challenge: string;
  solution: string;
  deliverables: string[];
  stats?: { label: string; value: string }[];
}

export interface ServiceItem {
  id: string;
  name: string;
  cluster: 'Craft' | 'Strategy';
  tagline: string;
  description: string;
  deliverables: string[];
  visualAccent: string;
}

export const SHOWCASE_PROJECTS: Project[] = [
  {
    name: 'DirectRent.ng',
    slug: 'directrent',
    logo: '/images/projects/directrent/logo.svg',
    brandColor: '#D4A853',
    accentColor: '#1A0A0A',
    category: 'PropTech Marketplace · Brand & Web',
    year: '2025–2026',
    description:
      'A Lagos-based rental marketplace ending traditional agent markups through verified landlord-tenant connections, digital escrow, and transparent lease management.',
    tagline: 'Ending the mandatory middleman in Lagos real estate.',
    image: '/images/projects/directrent/hero-remix.webp',
    secondaryImages: [
      '/images/projects/directrent/minimalist-apartment-luxury-grey.webp',
      '/images/projects/directrent/couples-moving.webp',
      '/images/projects/directrent/ai-ambassador.webp',
      '/images/projects/directrent/young-man-new-home-1.webp',
    ],
    featured: true,
    aspectRatio: 'landscape',
    challenge:
      'Lagos renters routinely forfeit up to 30% in non-negotiable agency and legal commissions. DirectRent required a digital platform with institutional gravity to convince landlords and tenants to transact directly without intermediaries.',
    solution:
      'Architected an editorial, high-trust web platform featuring automated BVN/NIN identity verification, digital escrow workflows with Paystack, an interactive fee comparison calculator, and bespoke onboarding journeys.',
    deliverables: [
      'Brand Identity & Design System',
      'Next.js 14 Web Application',
      'Interactive Savings Calculator',
      'Landlord Verification Workflows',
      'Paystack Escrow Architecture',
    ],
    stats: [
      { label: 'Agency Fee Reduction', value: '30% → 2%' },
      { label: 'Avg. Tenant Savings', value: '₦300,000+' },
      { label: 'Identity Verification', value: 'BVN / NIN' },
    ],
  },
  {
    name: 'The Vault at AOK',
    slug: 'the-vault',
    logo: '/images/logo/Apotheosis of Knowledge LOGO PNG-15.png',
    brandColor: '#4A8FE1',
    accentColor: '#00008A',
    category: 'Knowledge Repository · UI/UX & Motion',
    year: '2025–2026',
    description:
      'An archival research repository and fact discovery engine featuring 20 deep investigations, real-time keyboard fact generator, reading tracking, and bespoke typography.',
    tagline: 'A research-driven digital broadsheet for the endlessly curious.',
    image: '/images/content/yoruba-cosmology-hero.jpg',
    secondaryImages: [
      '/images/content/adinkra-lexicon-in-cloth-hero.jpg',
      '/images/content/lost-benin-bronzes-hero.jpg',
      '/images/content/geometry-of-dahomey-hero.jpg',
    ],
    featured: true,
    aspectRatio: 'portrait',
    challenge:
      'Online knowledge spaces are saturated with shallow sensationalism. AOK needed a digital sanctuary that elevates historical and cultural research into an enduring reading room experience that encourages sustained contemplation.',
    solution:
      'Constructed a specialized dual-subdomain system (vault.aokltd.org) with instant taxonomy filtering, a spacebar-triggered random Nigerian fact engine, reading progress synchronization, and strict WCAG AA contrast.',
    deliverables: [
      'Information Architecture & Taxonomy',
      'Editorial Design System & Typography',
      'Subdomain Routing & Edge Middleware',
      'Keyboard-Driven Fact Engine',
      'Reading Progress Persistence Engine',
    ],
    stats: [
      { label: 'Deep Inquiries Published', value: '20 Entries' },
      { label: 'Verified Nigerian Facts', value: '50+ Verified' },
      { label: 'Accessibility Standard', value: 'WCAG 2.1 AA' },
    ],
  },
  {
    name: 'AOK Digital Headquarters',
    slug: 'aok-hq',
    logo: '/images/logo/Apotheosis of Knowledge LOGO PNG-15.png',
    brandColor: '#00008A',
    accentColor: '#6666B8',
    category: 'Institutional Platform · Web Design & Art Direction',
    year: '2024–2026',
    description:
      'The institutional digital headquarters of Apotheosis of Knowledge Ltd. Engineered with a scroll-linked broadsheet curtain reveal, dark contrast manifesto, and CAC legal verification.',
    tagline: 'Elevating curiosity. Countering noise.',
    image: '/og/default.png',
    secondaryImages: [
      '/images/content/mansa-musa-inflation-hero.jpg',
      '/images/content/walls-of-great-zimbabwe-hero.jpg',
    ],
    featured: true,
    aspectRatio: 'wide',
    challenge:
      'Communicating intellectual permanence and institutional legitimacy without relying on generic agency layouts, decorative gimmicks, or hollow corporate jargon.',
    solution:
      'Engineered a scroll-linked curtain reveal that unwraps the digital broadsheet like a morning paper, balanced by mixed-weight typographic rhythm and cryptographic corporate verification.',
    deliverables: [
      'Institutional Brand Positioning',
      'Scroll-Linked Curtain Reveal Engine',
      'Corporate Affairs Verification Lightbox',
      'Content Copy Protection Shield',
      'Static-Generation Performance Pipeline',
    ],
    stats: [
      { label: 'Incorporation Anchor', value: 'RC 1956161' },
      { label: 'Typography Pairing', value: 'Grotesk + Serif' },
      { label: 'Performance Score', value: '99/100' },
    ],
  },
  {
    name: 'AOK Video & Motion Engine',
    slug: 'motion-engine',
    logo: '/images/logo/Apotheosis of Knowledge LOGO PNG-15.png',
    brandColor: '#7C3AED',
    accentColor: '#1E1B4B',
    category: 'Motion Design · Video Synthesis & Code',
    year: '2025–2026',
    description:
      'A programmatic video animation pipeline converting research scripts into cinema-grade countdowns and video essays using Remotion and custom motion systems.',
    tagline: 'Code-driven cinematic motion for historical narratives.',
    image: '/images/content/db-cooper-physics-hero.jpg',
    secondaryImages: [
      '/images/content/cipher-of-zodiac-hero.jpg',
      '/images/content/dancing-plague-hero.jpg',
    ],
    featured: false,
    aspectRatio: 'portrait',
    challenge:
      'Manual motion graphics production for research-intensive YouTube video essays is slow and inconsistent across episodes.',
    solution:
      'Developed a React-based programmatic video engine using Remotion that renders responsive title cards, kinetic typography, and historical artifact pans directly from JSON datasets.',
    deliverables: [
      'Remotion Programmatic Video System',
      'Kinetic Typography Modules',
      'Dynamic Audio-Sync Scrubbing',
      'Batch Video Rendering CLI',
      '4K Editorial Motion Templates',
    ],
    stats: [
      { label: 'Video Output Resolution', value: '4K Ultra HD' },
      { label: 'Rendering Automation', value: '100% Code-Driven' },
      { label: 'Turnaround Reduction', value: '70% Faster' },
    ],
  },
  {
    name: 'DirectRent Mobile Application',
    slug: 'directrent-mobile',
    logo: '/images/projects/directrent/logo.svg',
    brandColor: '#10B981',
    accentColor: '#064E3B',
    category: 'Product Design · Mobile UI/UX',
    year: '2026',
    description:
      'A dual-sided native application for Lagos tenants and landlords featuring real-time messaging, biometric identity checks, and in-app lease signing.',
    tagline: 'Mobile-first tenancy infrastructure for emerging markets.',
    image: '/images/projects/directrent/minimalist-luxury-apartment-maroon.webp',
    secondaryImages: [
      '/images/projects/directrent/young-man-new-home-1.webp',
      '/images/projects/directrent/couples-moving.webp',
    ],
    featured: false,
    aspectRatio: 'landscape',
    challenge:
      'Creating a unified mobile experience that meets the distinct psychological needs of traditional Nigerian landlords and young urban professionals.',
    solution:
      'Built a dual-experience mobile flow with biometrics, direct secure messaging, automated rent schedule tracking, and offline-resilient document viewing.',
    deliverables: [
      'Two-Sided Persona Journey Mapping',
      'React Native Mobile Design System',
      'Biometric Verification Integration',
      'In-App Tenancy Agreement Flow',
      'Real-Time Landlord Chat Interface',
    ],
    stats: [
      { label: 'Supported Platforms', value: 'iOS & Android' },
      { label: 'Signing Flow Time', value: '< 3 Minutes' },
      { label: 'Security Layer', value: 'Biometric + BVN' },
    ],
  },
];

export const SHOWCASE_SERVICES: ServiceItem[] = [
  // Craft cluster
  {
    id: 'brand-design',
    name: 'Brand Design',
    cluster: 'Craft',
    tagline: 'Visual identities that command respect before a word is spoken.',
    description:
      'We develop disciplined, enduring visual identities. From logo marks and typographic systems to comprehensive design guidelines, we ensure every touchpoint reflects your brand’s true caliber.',
    deliverables: ['Visual Identity Systems', 'Logo & Wordmark Suites', 'Design Tokens & Guidelines', 'Brand Books', 'Typography Direction'],
    visualAccent: '#00008A',
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    cluster: 'Craft',
    tagline: 'Editorial precision across physical and digital formats.',
    description:
      'Art direction with intellectual weight. We produce annual reports, pitch decks, whitepapers, social editorial suites, and marketing collateral designed with publication-grade craftsmanship.',
    deliverables: ['Investor Decks & Prospectuses', 'Editorial Publications', 'Print & Digital Collateral', 'Social Graphic Systems', 'Iconography'],
    visualAccent: '#4A8FE1',
  },
  {
    id: '3d-design',
    name: '3D Design',
    cluster: 'Craft',
    tagline: 'Dimensional forms that elevate product perception.',
    description:
      'Restrained, photorealistic and stylized 3D assets that communicate physical presence, spatial depth, and material elegance for digital environments and visual campaigns.',
    deliverables: ['Product Visualisation', 'Architectural Renders', 'Interactive 3D Web Assets', 'Material & Lighting Studies', 'Spatial Imagery'],
    visualAccent: '#6666B8',
  },
  {
    id: 'animation',
    name: 'Animation',
    cluster: 'Craft',
    tagline: 'Purposeful kinetic design that guides and clarifies.',
    description:
      'Motion that clarifies structure rather than distracting from it. UI micro-interactions, logo idents, explanatory kinetic sequences, and programmatic video pipelines built for performance.',
    deliverables: ['UI Micro-Interactions', 'Logo Motion Idents', 'Kinetic Typography', 'Remotion Code Animations', 'Lottie & SVG Motion'],
    visualAccent: '#7C3AED',
  },
  {
    id: 'web-design',
    name: 'Web Design',
    cluster: 'Craft',
    tagline: 'Bespoke digital architecture built for longevity and conversion.',
    description:
      'We engineer custom web experiences using Next.js and Tailwind CSS that stand out in crowded categories. Fast, accessible, SEO-optimized, and visually distinctive.',
    deliverables: ['Full-Stack Web Engineering', 'Responsive UI/UX Architecture', 'Interactive Web Applications', 'Design Systems & Component Libraries', 'Core Web Vitals Optimisation'],
    visualAccent: '#00008A',
  },
  {
    id: 'videography',
    name: 'Videography',
    cluster: 'Craft',
    tagline: 'Cinematic storytelling with documentary-level depth.',
    description:
      'High-definition video production for brand documentaries, founder stories, and educational essays. Every shot is framed with narrative intent and colour-graded to match your identity.',
    deliverables: ['Brand Documentaries', 'Executive Spotlights', 'Video Essays & Explaners', 'Post-Production & Grading', 'Audio Mastering'],
    visualAccent: '#D4A853',
  },
  {
    id: 'content-strategy',
    name: 'Content Strategy',
    cluster: 'Craft',
    tagline: 'Transforming expertise into authority through structured publishing.',
    description:
      'We turn institutional knowledge into distribution machines. Multi-channel editorial calendars, research frameworks, and content engines that earn organic audience trust.',
    deliverables: ['Editorial Roadmaps', 'Research Frameworks', 'Channel Distribution Playbooks', 'Audience Segmentation', 'Content Governance'],
    visualAccent: '#10B981',
  },
  {
    id: 'copywriting',
    name: 'Copywriting',
    cluster: 'Craft',
    tagline: 'Sharp, unambiguous language that moves decisions forward.',
    description:
      'Words chosen with precision. We strip away corporate filler to craft clear value propositions, compelling headlines, manifesto copy, and converting commercial proposals.',
    deliverables: ['Positioning Statements', 'Website Copywriting', 'Brand Voice Guidelines', 'Investor & Client Proposals', 'Conversion Messaging'],
    visualAccent: '#000066',
  },
  // Strategy cluster
  {
    id: 'business-consulting',
    name: 'Business Consulting',
    cluster: 'Strategy',
    tagline: 'Aligning business models with modern market realities.',
    description:
      'Strategic advisory for startups and growth enterprises. We analyze unit economics, market positioning, competitive moats, and operational bottlenecks to build sustainable revenue growth.',
    deliverables: ['Market Entry Strategies', 'Value Proposition Design', 'Competitive Positioning Audits', 'Pricing & Packaging Models', 'Operating Frameworks'],
    visualAccent: '#00008A',
  },
  {
    id: 'marketing-consulting',
    name: 'Marketing Consulting',
    cluster: 'Strategy',
    tagline: 'High-signal marketing systems that prioritize trust over noise.',
    description:
      'Data-informed growth consulting that bridges brand strategy with tactical execution. Meta ads, organic content flywheels, search engine strategy, and attribution analytics.',
    deliverables: ['Growth Engine Architecture', 'Paid Acquisition Strategy', 'SEO & Organic Growth Systems', 'Analytics & Attribution', 'Marketing Team Enablement'],
    visualAccent: '#4A8FE1',
  },
];

export const APPROACH_PILLARS = [
  {
    number: '01',
    title: 'Strategic Rigor',
    summary:
      'We do not design in a vacuum. Every layout, typeface, and colour decision starts with deep research into your market, competitors, and the exact psychology of your highest-value clients.',
    principle: 'Insight before aesthetic.',
  },
  {
    number: '02',
    title: 'Editorial Art Direction',
    summary:
      'We reject generic agency templates and trend-chasing patterns. Our design language combines classical typographic harmony, generous whitespace, and intentional hierarchy.',
    principle: 'Distinction through discipline.',
  },
  {
    number: '03',
    title: 'High-Performance Craft',
    summary:
      'Beautiful design is meaningless if it loads slowly or breaks on mobile. We engineer production code with sub-second speeds, WCAG AA accessibility, and seamless responsive behavior.',
    principle: 'Engineering as an aesthetic standard.',
  },
  {
    number: '04',
    title: 'Resonance & Outcomes',
    summary:
      'The objective is not merely applause—it is qualified enquiry, customer trust, and market authority. We measure our creative success by how effectively it moves your business forward.',
    principle: 'Attention that converts to trust.',
  },
];
