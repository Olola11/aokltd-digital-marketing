'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { FadeIn } from '@/components/ui/fade-in';
import { cn } from '@/lib/utils';

const projects = [
  {
    index: '001',
    title: 'YouTube Channel',
    description: 'Long-form video essays exploring history, science, and cultural phenomena. Research-driven scripts with cinematic production.',
    status: 'IN DEVELOPMENT',
    target: '2028\u20132029',
    gridClass: 'md:col-start-1 md:col-span-5',
    offsetClass: '',
  },
  {
    index: '002',
    title: 'Publications',
    description: 'Written research, essays, and serialized investigations. A digital press for ideas that demand more than a social post.',
    status: 'IN DEVELOPMENT',
    target: '2027',
    gridClass: 'md:col-start-5 md:col-span-6',
    offsetClass: 'md:mt-24',
  },
  {
    index: '003',
    title: 'Knowledge Application',
    description: 'A dedicated platform for structured learning and curated knowledge pathways. The long-term infrastructure play.',
    status: 'IN DEVELOPMENT',
    target: '2027\u20132028',
    gridClass: 'md:col-start-2 md:col-span-5',
    offsetClass: 'md:mt-16',
  },
];

function TimelineNode({ project, delayIndex }: { project: typeof projects[number]; delayIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-50% 0px -50% 0px' });

  return (
    <div
      ref={ref}
      className={cn(
        'pl-8 md:pl-0',
        project.gridClass,
        project.offsetClass,
        'mb-12 md:mb-0',
      )}
    >
      <FadeIn delay={delayIndex * 0.15}>
        <div className="border-t border-[#00008B]/10 pt-6">
          {/* Index — mobile: scroll-spy driven / desktop: always cyan */}
          <span
            className={cn(
              'font-sans text-sm tracking-wider transition-all duration-500 motion-reduce:transition-none',
              'md:text-[#4A90E2]',
              isInView ? 'text-[#4A90E2]' : 'text-slate-300',
            )}
            style={{ textShadow: isInView ? '0 0 12px rgba(74,144,226,0.4)' : 'none' }}
          >
            {project.index}
          </span>

          <h3 className="font-sans text-2xl md:text-3xl text-[#00008B] mt-3 mb-4 leading-tight">
            {project.title}
          </h3>

          <p className="font-serif text-sm text-[#00008B]/60 leading-relaxed mb-6 max-w-md">
            {project.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="font-sans text-xs md:text-sm tracking-[0.15em] uppercase text-[#00008B]/40">
              [ STATUS: {project.status} ]
            </span>
            <span className="font-sans text-xs md:text-sm tracking-[0.15em] uppercase text-[#00008B]/30">
              TARGET: {project.target}
            </span>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export function ProjectTimeline() {
  return (
    <div>
      <FadeIn>
        <h2 className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-[#00008B]/30 mb-12 md:mb-16">
          Forthcoming Projects
        </h2>
      </FadeIn>

      <div className="relative">
        {/* Mobile thread line — hairline connecting project nodes */}
        <div
          className="absolute left-0 top-0 bottom-0 border-l border-slate-200 md:hidden"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {projects.map((project, i) => (
            <TimelineNode key={project.index} project={project} delayIndex={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
