'use client';

import { motion } from 'framer-motion';
import { MobileCardStack } from '@/components/ui/mobile-card-stack';

const SERVICES = [
  {
    number: '01',
    label: 'AI-Powered Marketing',
    title: 'AI Marketing Strategy',
    description:
      'We deploy AI tools to identify high-converting audiences, automate campaign optimisation, and generate data-backed content strategies. Not AI for the sake of AI — AI because it finds patterns humans miss.',
    includes: [
      'AI-driven audience research and segmentation',
      'Automated campaign optimisation and A/B testing',
      'Predictive content performance modelling',
      'AI-assisted copywriting and creative generation',
    ],
  },
  {
    number: '02',
    label: 'Viral Content Creation',
    title: 'Viral Content Engineering',
    description:
      'We study what makes content spread — not through tricks or manipulation, but through genuine resonance. Every piece is engineered for shareability without sacrificing substance.',
    includes: [
      'Short-form video production (TikTok, Reels, Shorts)',
      'Trend analysis and cultural moment mapping',
      'Hook writing and thumbnail strategy',
      'Platform-native format adaptation',
    ],
  },
  {
    number: '03',
    label: 'Writing & Editing',
    title: 'Blog Articles & Content Scripts',
    description:
      'Long-form writing that ranks, reads well, and builds authority. From SEO-optimised blog posts to YouTube scripts and podcast outlines — we write content that makes your audience smarter.',
    includes: [
      'SEO blog articles and thought leadership pieces',
      'YouTube and documentary script writing',
      'Podcast show notes and episode outlines',
      'Content editing, fact-checking, and proofreading',
    ],
  },
  {
    number: '04',
    label: 'Meta Ads',
    title: 'Meta Advertising',
    description:
      'Facebook and Instagram advertising managed with the discipline of a media buying desk. We build full-funnel campaigns — awareness to conversion — with transparent reporting at every stage.',
    includes: [
      'Campaign strategy and audience architecture',
      'Ad creative production and testing',
      'Budget allocation and bid management',
      'Weekly performance reporting and optimisation',
    ],
  },
  {
    number: '05',
    label: 'Data & Analytics',
    title: 'Data Analysis & Interpretation',
    description:
      'Numbers without narrative are noise. We turn your analytics into actionable intelligence — clear reports that tell you what happened, why it happened, and what to do next.',
    includes: [
      'Google Analytics and platform analytics audits',
      'Custom dashboard creation and KPI tracking',
      'Audience behaviour analysis and segmentation',
      'Monthly insight reports with strategic recommendations',
    ],
  },
  {
    number: '06',
    label: 'Content Strategy',
    title: 'Content Strategy & Planning',
    description:
      'Before creating anything, we map the territory. Content calendars, platform strategies, audience personas, and competitive analysis — the architecture that makes everything else work.',
    includes: [
      'Content audit and gap analysis',
      'Editorial calendar development',
      'Platform-specific strategy (YouTube, TikTok, Facebook, X)',
      'Competitor content benchmarking',
    ],
  },
] as const;

function ServiceCard({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <div className="h-full bg-white border border-[#00008B] p-6 md:p-8 rounded-md">
      {/* Number watermark */}
      <span className="font-sans text-5xl md:text-6xl font-bold text-[#00008B]/10 block mb-3">
        {service.number}
      </span>

      {/* Category label */}
      <span className="font-sans text-xs md:text-sm uppercase tracking-widest text-quill-500">
        {service.label}
      </span>

      {/* Title */}
      <h3 className="font-sans text-xl md:text-2xl font-semibold text-[#00008B] mt-2 mb-3">
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-serif text-base text-[#00008B]/60 leading-relaxed mb-5">
        {service.description}
      </p>

      {/* What this includes */}
      <div className="border-t border-[#00008B]/10 pt-4">
        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#00008B]/40 block mb-3">
          What this includes
        </span>
        <ul className="space-y-1.5">
          {service.includes.map((item) => (
            <li
              key={item}
              className="font-sans text-sm text-[#00008B]/50 pl-3 relative"
            >
              <span className="absolute left-0 top-0 text-[#00008B]/30">
                &mdash;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ServiceGrid() {
  return (
    <>
      {/* Desktop: 2-column grid */}
      <div className="hidden md:grid grid-cols-2 gap-8">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 0.5,
              delay: Math.min(i * 0.1, 0.5),
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="h-full transition-all duration-300 ease-out rounded-md hover:-translate-y-2 hover:shadow-brutalist">
              <ServiceCard service={service} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile: sticky card stack */}
      <div className="md:hidden">
        <MobileCardStack label="Six Capabilities" itemHeight={480}>
          {SERVICES.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </MobileCardStack>
      </div>
    </>
  );
}
