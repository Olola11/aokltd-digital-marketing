import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/fade-in';

export const metadata: Metadata = {
  title: 'Social Platforms',
  description: 'Active social media channels of Apotheosis of Knowledge and their strategic purpose.',
};

const channels = [
  {
    platform: 'Facebook Page',
    handle: '@AoKForReal',
    purpose: 'Historical Insights',
    description: 'The primary page for long-form historical and cultural content distribution.',
  },
  {
    platform: 'Facebook Group',
    handle: 'Community',
    purpose: 'Engagement',
    description: 'A moderated community space for discussion, feedback, and collaborative curiosity.',
  },
  {
    platform: 'TikTok',
    handle: '@aok20191',
    purpose: 'Micro-Learning',
    description: 'Short-form video content distilling complex ideas into accessible formats.',
  },
  {
    platform: 'Instagram',
    handle: '@apotheosisofknowledge',
    purpose: 'Visual Facts',
    description: 'Visually driven factual content — infographics, quote cards, and visual essays.',
  },
  {
    platform: 'X / Twitter',
    handle: '@aokfacts',
    purpose: 'Cultural Commentary',
    description: 'Real-time commentary on history, culture, and ideas in the public discourse.',
  },
  {
    platform: 'WhatsApp',
    handle: '\u2014',
    purpose: 'Direct Channel',
    description: 'Direct subscriber communication for updates and curated content drops.',
  },
];

export default function SocialPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="px-6 md:px-12 lg:px-24 pt-12 md:pt-32 pb-10 md:pb-24">
        {/* Breadcrumb */}
        <nav className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#00008B]/30 mb-12">
          <Link
            href="/work"
            className="hover:text-[#00008B]/60 transition-colors"
          >
            Work
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#00008B]/60">Social</span>
        </nav>

        <FadeIn>
          <h1 className="font-sans text-4xl md:text-6xl text-[#00008B] leading-[1.1] mb-8">
            Social Platforms
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="font-serif text-base text-[#00008B]/60 max-w-prose leading-relaxed mb-8 md:mb-16">
            Our social media channels function as distribution infrastructure for knowledge
            content. Each platform serves a specific pedagogical purpose within the broader
            initiative.
          </p>
        </FadeIn>
      </section>

      {/* Channel breakdown */}
      <section className="px-6 md:px-12 lg:px-24 pb-12 md:pb-32">
        <div className="border-t border-[#00008B]/10">
          {channels.map((channel, i) => (
            <FadeIn key={channel.platform} delay={i * 0.08}>
              <div
                className={
                  i < channels.length - 1
                    ? 'border-b border-[#00008B]/5 py-8'
                    : 'py-8'
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                  <div className="md:col-span-3">
                    <span className="font-sans text-sm font-medium text-[#00008B]">
                      {channel.platform}
                    </span>
                    <span className="block font-sans text-xs text-[#4A90E2] mt-1">
                      {channel.handle}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#00008B]/40">
                      {channel.purpose}
                    </span>
                  </div>
                  <div className="md:col-span-7">
                    <p className="font-serif text-sm text-[#00008B]/60 leading-relaxed">
                      {channel.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* The Quiet Close */}
      <section className="px-6 md:px-12 lg:px-24 pb-12 md:pb-32">
        <FadeIn>
          <p className="text-center text-sm font-serif italic text-[#00008B]/40 max-w-xl mx-auto">
            This is a long-term institutional project. We build slowly and deliberately.
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
