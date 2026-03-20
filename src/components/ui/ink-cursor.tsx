'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTouchDevice } from '@/hooks/useTouchDevice';

/**
 * InkCursor — Custom Quill Cursor with Physics-Based Ink Trail
 *
 * The mouse cursor becomes a "Quill" — an SVG feather pen icon that follows
 * the cursor with spring physics. As it moves, it leaves a temporary fading
 * cyan stroke trail, simulating wet ink drying on paper.
 *
 * Technical Implementation:
 * - Uses framer-motion for spring physics and trail rendering
 * - Trail points stored in array, each fading out independently
 * - Disabled automatically on touch devices
 * - Global cursor: none applied via .cursor-quill class
 */

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  age: number;
}

const TRAIL_LIFETIME_MS = 600;
const TRAIL_MAX_POINTS = 30;
const TRAIL_SAMPLE_DISTANCE = 8; // Min pixels between trail points

export function InkCursor() {
  const isTouch = useTouchDevice();
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const pointIdRef = useRef(0);
  const frameRef = useRef<number>(0);

  // Spring-smoothed cursor position
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const cursorX = useSpring(rawX, { stiffness: 400, damping: 28, mass: 0.3 });
  const cursorY = useSpring(rawY, { stiffness: 400, damping: 28, mass: 0.3 });

  // Calculate distance between two points
  const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      rawX.set(x);
      rawY.set(y);
      setIsVisible(true);

      // Only add trail point if moved far enough from last point
      const lastPoint = lastPointRef.current;
      if (!lastPoint || getDistance(lastPoint.x, lastPoint.y, x, y) > TRAIL_SAMPLE_DISTANCE) {
        const newPoint: TrailPoint = {
          id: pointIdRef.current++,
          x,
          y,
          timestamp: Date.now(),
          age: 0,
        };

        setTrailPoints((prev) => {
          const updated = [...prev, newPoint];
          // Keep only the most recent points
          return updated.slice(-TRAIL_MAX_POINTS);
        });

        lastPointRef.current = { x, y };
      }
    },
    [rawX, rawY]
  );

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const cleanup = () => {
      const now = Date.now();
      setTrailPoints((prev) =>
        prev
          .filter((point) => now - point.timestamp < TRAIL_LIFETIME_MS)
          .map((point) => ({ ...point, age: now - point.timestamp }))
      );
      frameRef.current = requestAnimationFrame(cleanup);
    };

    frameRef.current = requestAnimationFrame(cleanup);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  // Attach global mouse listeners
  useEffect(() => {
    if (isTouch) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.body.classList.add('cursor-quill');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('cursor-quill');
    };
  }, [isTouch, handleMouseMove, handleMouseLeave]);

  // Don't render on touch devices
  if (isTouch) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[10000]"
      aria-hidden="true"
    >
      {/* ── Ink Trail ── */}
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        {trailPoints.map((point) => {
          const age = point.age;
          const progress = Math.min(age / TRAIL_LIFETIME_MS, 1);
          const opacity = 0.6 * (1 - progress);
          const scale = 1 - progress * 0.7;
          const size = 4 * scale;

          return (
            <motion.circle
              key={point.id}
              cx={point.x}
              cy={point.y}
              r={size}
              fill="#4A90E2"
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity, scale }}
              style={{
                transformOrigin: `${point.x}px ${point.y}px`,
              }}
            />
          );
        })}

        {/* ── Trail Line (connecting recent points) ── */}
        {trailPoints.length > 1 && (
          <motion.path
            d={trailPoints
              .slice(-15)
              .map((p, i) =>
                i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
              )
              .join(' ')}
            stroke="#4A90E2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0.4 }}
            animate={{
              opacity: isVisible ? 0.35 : 0,
              pathLength: 1,
            }}
            transition={{ opacity: { duration: 0.15 } }}
          />
        )}
      </svg>

      {/* ── Quill Cursor ── */}
      <motion.div
        className="absolute"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-4px',
          translateY: '-24px',
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { type: 'spring', stiffness: 500, damping: 30 },
        }}
      >
        {/* Quill SVG Icon */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
          style={{
            transform: 'rotate(-45deg)',
          }}
        >
          {/* Feather body */}
          <path
            d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"
            fill="#00008B"
            stroke="#00008B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Quill spine */}
          <path
            d="M16 8L2 22"
            stroke="#4A90E2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Ink nib */}
          <circle cx="2" cy="22" r="1.5" fill="#4A90E2" />
          {/* Feather detail lines */}
          <path
            d="M17.5 6.5L9.5 14.5"
            stroke="white"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M19 9L12 16"
            stroke="white"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.3"
          />
        </svg>
      </motion.div>
    </div>
  );
}

export default InkCursor;
