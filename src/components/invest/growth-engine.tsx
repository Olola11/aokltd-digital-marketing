'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

const NODES = ['Research', 'Content', 'Audience', 'Revenue', 'Reinvestment'];
const NODE_SPACING = 72;
const START_Y = 40;
const CX = 140;

function FlywheelSVG({ animate }: { animate: boolean }) {
  const lineRef = useRef<SVGLineElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const [lineLength, setLineLength] = useState(1000);
  const [arcLength, setArcLength] = useState(1000);

  useEffect(() => {
    if (lineRef.current) {
      const y1 = START_Y;
      const y2 = START_Y + (NODES.length - 1) * NODE_SPACING;
      setLineLength(y2 - y1);
    }
    if (arcRef.current) {
      setArcLength(arcRef.current.getTotalLength());
    }
  }, []);

  const lastY = START_Y + (NODES.length - 1) * NODE_SPACING;

  return (
    <svg
      viewBox="0 0 300 380"
      className="w-full max-w-[300px]"
      role="img"
      aria-label="Flywheel diagram: Research flows to Content, to Audience, to Revenue, to Reinvestment, which cycles back to Research"
    >
      {/* Connecting vertical line through all nodes */}
      <line
        ref={lineRef}
        x1={CX}
        y1={START_Y}
        x2={CX}
        y2={lastY}
        stroke="#00008B"
        strokeWidth="1"
        strokeDasharray={lineLength}
        strokeDashoffset={animate ? 0 : lineLength}
        style={{
          transition: animate ? 'stroke-dashoffset 1.5s ease-in-out' : 'none',
        }}
      />

      {/* Return arc from bottom back to top */}
      <path
        ref={arcRef}
        d={`M ${CX} ${lastY} C ${CX - 90} ${lastY - 60}, ${CX - 90} ${START_Y + 60}, ${CX} ${START_Y}`}
        fill="none"
        stroke="#4AA8FF"
        strokeWidth="1"
        strokeDasharray={arcLength}
        strokeDashoffset={animate ? 0 : arcLength}
        style={{
          transition: animate
            ? 'stroke-dashoffset 1.5s ease-in-out 0.4s'
            : 'none',
        }}
      />

      {/* Small arrowhead at the top of the return arc */}
      <polygon
        points={`${CX},${START_Y - 4} ${CX - 4},${START_Y + 4} ${CX + 4},${START_Y + 4}`}
        fill="#4AA8FF"
        className={animate ? 'opacity-100' : 'opacity-0'}
        style={{
          transition: 'opacity 0.3s ease-in-out 1.8s',
        }}
      />

      {/* Nodes and labels */}
      {NODES.map((label, i) => {
        const cy = START_Y + i * NODE_SPACING;
        return (
          <g key={label}>
            <circle
              cx={CX}
              cy={cy}
              r="5"
              fill="white"
              stroke="#00008B"
              strokeWidth="1.5"
              className={animate ? 'opacity-100' : 'opacity-0'}
              style={{
                transition: `opacity 0.3s ease-in-out ${0.25 * i}s`,
              }}
            />
            <text
              x={CX + 16}
              y={cy + 4}
              fill="#00008B"
              style={{
                fontSize: '13px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                opacity: animate ? 1 : 0,
                transition: `opacity 0.3s ease-in-out ${0.25 * i + 0.15}s`,
              }}
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function GrowthEngine() {
  const svgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(svgRef, { once: true, margin: '-100px' });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
      {/* Text block */}
      <div>
        <h2 className="font-sans text-2xl md:text-3xl font-semibold text-royal-800 mb-4">
          The Cycle
        </h2>
        <p className="font-serif text-base text-royal-800/60 leading-relaxed mb-3">
          Every piece of content begins with research and ends with reinvestment.
          Audience growth funds deeper investigation, which produces better content,
          which attracts a larger audience.
        </p>
        <p className="font-serif text-base text-royal-800/60 leading-relaxed">
          This is not a growth hack. It is a flywheel — designed to compound
          institutional knowledge over years, not quarters.
        </p>
      </div>

      {/* SVG diagram */}
      <div ref={svgRef} className="flex justify-center">
        <FlywheelSVG animate={isInView} />
      </div>
    </div>
  );
}
