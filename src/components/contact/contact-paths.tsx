'use client';

import { FadeIn } from '@/components/ui/fade-in';
import { MobileCardStack } from '@/components/ui/mobile-card-stack';

const CONTACT_PATHS = [
  {
    label: 'Partnerships',
    title: 'Strategic Partnerships',
    description:
      'For investment enquiries, institutional collaborations, and media partnerships.',
    email: 'partnerships@aokltd.org',
  },
  {
    label: 'Editorial',
    title: 'Editorial & Content',
    description:
      'For content submissions, story suggestions, corrections, and research collaborations.',
    email: 'editorial@aokltd.org',
  },
  {
    label: 'General',
    title: 'General Enquiries',
    description:
      'For everything else — questions, feedback, press requests, or just to say hello.',
    email: 'hello@aokltd.org',
  },
];

function ContactCard({ path }: { path: (typeof CONTACT_PATHS)[number] }) {
  return (
    <div className="h-full bg-white border border-[#00008B] p-6 sm:p-8 rounded-md">
      <span className="font-sans text-xs md:text-sm font-medium text-[#4A90E2] uppercase tracking-[0.2em]">
        {path.label}
      </span>
      <h3 className="font-sans text-lg md:text-xl font-semibold text-[#00008B] mt-3 mb-3">
        {path.title}
      </h3>
      <p className="font-serif text-base text-[#00008B]/70 leading-relaxed mb-6">
        {path.description}
      </p>
      <a
        href={`mailto:${path.email}`}
        className="font-sans text-sm font-medium text-[#00008B] underline-offset-4 hover:underline transition-colors"
      >
        {path.email}
      </a>
    </div>
  );
}

export function ContactPaths() {
  return (
    <>
      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
        {CONTACT_PATHS.map((path, i) => (
          <FadeIn key={path.label} delay={i * 0.1}>
            <div className="h-full bg-white border border-[#00008B] p-6 sm:p-8 rounded-md transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-brutalist">
              <span className="font-sans text-xs md:text-sm font-medium text-[#4A90E2] uppercase tracking-[0.2em]">
                {path.label}
              </span>
              <h3 className="font-sans text-lg md:text-xl font-semibold text-[#00008B] mt-3 mb-3">
                {path.title}
              </h3>
              <p className="font-serif text-base text-[#00008B]/70 leading-relaxed mb-6">
                {path.description}
              </p>
              <a
                href={`mailto:${path.email}`}
                className="font-sans text-sm font-medium text-[#00008B] underline-offset-4 hover:underline transition-colors"
              >
                {path.email}
              </a>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Mobile: sticky stack */}
      <div className="md:hidden">
        <MobileCardStack label="Three Channels">
          {CONTACT_PATHS.map((path) => (
            <ContactCard key={path.label} path={path} />
          ))}
        </MobileCardStack>
      </div>
    </>
  );
}
