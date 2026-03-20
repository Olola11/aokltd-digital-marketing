'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We learn your business, audience, and goals.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We build a tailored plan with clear deliverables.',
  },
  {
    number: '03',
    title: 'Execution',
    description: 'We produce, publish, and manage with precision.',
  },
  {
    number: '04',
    title: 'Reporting',
    description: 'We measure, learn, and refine every cycle.',
  },
] as const;

/**
 * Desktop: Horizontal 4-column layout with a connecting line that draws on scroll.
 */
function DesktopProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const lineRef = useRef<SVGLineElement>(null);
  const [lineLength, setLineLength] = useState(800);

  useEffect(() => {
    if (lineRef.current) {
      setLineLength(lineRef.current.getTotalLength());
    }
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Connecting horizontal line (behind the step nodes) */}
      <div className="absolute top-[13px] left-0 right-0 h-px">
        <svg className="w-full h-[2px]" preserveAspectRatio="none">
          {/* Background track */}
          <line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="#00008B"
            strokeWidth="1"
            strokeOpacity="0.1"
          />
          {/* Animated fill line */}
          <line
            ref={lineRef}
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="#4A90E2"
            strokeWidth="1"
            strokeDasharray={lineLength}
            strokeDashoffset={isInView ? 0 : lineLength}
            style={{
              transition: isInView
                ? 'stroke-dashoffset 1.5s ease-in-out'
                : 'none',
            }}
          />
        </svg>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-4 gap-8">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 0.5,
              delay: 0.3 + i * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Node dot */}
            <div className="w-[26px] h-[26px] rounded-full bg-white border-2 border-quill-500 flex items-center justify-center mb-5">
              <div className="w-2 h-2 rounded-full bg-quill-500" />
            </div>

            {/* Step number */}
            <span className="font-sans text-lg font-bold text-quill-500 block mb-1">
              {step.number}
            </span>

            {/* Title */}
            <h4 className="font-sans text-base md:text-lg font-semibold text-[#00008B] mb-2">
              {step.title}
            </h4>

            {/* Description */}
            <p className="font-serif text-sm text-[#00008B]/50">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * Mobile: Vertical timeline with a connecting line on the left that draws on scroll.
 */
function MobileProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const lineRef = useRef<SVGLineElement>(null);
  const [lineLength, setLineLength] = useState(400);

  useEffect(() => {
    if (lineRef.current) {
      setLineLength(lineRef.current.getTotalLength());
    }
  }, []);

  return (
    <div ref={containerRef} className="relative pl-10">
      {/* Vertical connecting line */}
      <div className="absolute left-[12px] top-0 bottom-0 w-px">
        <svg className="w-[2px] h-full" preserveAspectRatio="none">
          {/* Background track */}
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="#00008B"
            strokeWidth="1"
            strokeOpacity="0.1"
          />
          {/* Animated fill line */}
          <line
            ref={lineRef}
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="#4A90E2"
            strokeWidth="1"
            strokeDasharray={lineLength}
            strokeDashoffset={isInView ? 0 : lineLength}
            style={{
              transition: isInView
                ? 'stroke-dashoffset 1.5s ease-in-out'
                : 'none',
            }}
          />
        </svg>
      </div>

      {/* Steps */}
      <div className="space-y-10">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 0.5,
              delay: 0.2 + i * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative"
          >
            {/* Node dot (on the line) */}
            <div className="absolute -left-10 top-0.5 w-[26px] h-[26px] rounded-full bg-white border-2 border-quill-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-quill-500" />
            </div>

            {/* Step number */}
            <span className="font-sans text-lg font-bold text-quill-500 block mb-1">
              {step.number}
            </span>

            {/* Title */}
            <h4 className="font-sans text-base font-semibold text-[#00008B] mb-1">
              {step.title}
            </h4>

            {/* Description */}
            <p className="font-serif text-sm text-[#00008B]/50">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ProcessTimeline() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopProcess />
      </div>
      <div className="md:hidden">
        <MobileProcess />
      </div>
    </>
  );
}
