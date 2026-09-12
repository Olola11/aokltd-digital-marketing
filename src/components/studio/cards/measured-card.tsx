'use client';

import { useEffect, useRef } from 'react';
import { STUDIO_PROJECTS, type LighthouseScores } from '@/data/studio/projects';
import { formatMeasuredDate } from '@/lib/studio/format';
import { gsap, ScrollTrigger } from '@/lib/studio/gsap';
import { useStudioMotion } from '../motion/studio-motion';
import { StudioCard } from './studio-card';

const METRICS: { key: keyof LighthouseScores; label: string }[] = [
  { key: 'accessibility', label: 'Accessibility' },
  { key: 'bestPractices', label: 'Best practices' },
  { key: 'seo', label: 'SEO' },
];

const GAUGES = STUDIO_PROJECTS.flatMap((project) =>
  METRICS.map((metric) => ({
    id: `${project.slug}-${metric.key}`,
    score: project.measured.mobile[metric.key],
  }))
);

/** Lighthouse's own grading: green 90–100, orange 50–89, red 0–49. */
function lighthouseColour(score: number): [number, number, number] {
  if (score >= 90) return [12, 206, 107];
  if (score >= 50) return [255, 164, 0];
  return [255, 78, 66];
}

const TICKS = 64;

/** The slice of the p5 instance API this sketch uses. */
interface Sketch {
  setup: () => void;
  draw: () => void;
  width: number;
  createCanvas(width: number, height: number): unknown;
  resizeCanvas(width: number, height: number): void;
  pixelDensity(density: number): void;
  noLoop(): void;
  redraw(): void;
  remove(): void;
  clear(): void;
  noise(x: number, y?: number): number;
  noiseSeed(seed: number): void;
  stroke(r: number, g: number, b: number, a?: number): void;
  strokeWeight(weight: number): void;
  strokeCap(cap: string): void;
  noStroke(): void;
  fill(r: number, g: number, b: number, a?: number): void;
  circle(x: number, y: number, diameter: number): void;
  line(x1: number, y1: number, x2: number, y2: number): void;
  ROUND: string;
}
type P5Constructor = new (sketch: (p: Sketch) => void, node: HTMLElement) => Sketch;

interface GaugeState {
  /** 0: ticks adrift in noise (the audit running) · 1: locked into the ring */
  settle: number;
  /** Share of the ring lit in the grade colour: the score */
  fill: number;
  /** Position along the Perlin noise field */
  drift: number;
}

function drawGauge(p: Sketch, state: GaugeState, score: number) {
  const [r, g, b] = lighthouseColour(score);
  const size = p.width;
  const centre = size / 2;
  const radius = size * 0.4;
  const tick = size * 0.075;
  const loose = 1 - state.settle;

  p.clear();

  // Lighthouse's pale tinted disc, arriving as the ring forms.
  p.noStroke();
  p.fill(r, g, b, 28 * state.settle);
  p.circle(centre, centre, (radius - tick) * 2);

  p.strokeCap(p.ROUND);
  for (let i = 0; i < TICKS; i++) {
    const fraction = i / TICKS;
    const wanderRadius = (p.noise(i * 0.31, state.drift) - 0.5) * loose * size * 0.7;
    const wanderAngle = (p.noise(i * 0.31 + 40, state.drift) - 0.5) * loose * 2.4;
    const angle = -Math.PI / 2 + fraction * Math.PI * 2 + wanderAngle;
    const distance = radius + wanderRadius;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const inner = distance - tick / 2;
    const outer = distance + tick / 2;

    if (fraction < state.fill) {
      p.stroke(r, g, b, 255);
      p.strokeWeight(size * 0.03);
    } else {
      p.stroke(0, 0, 139, 36 + 34 * state.settle);
      p.strokeWeight(size * 0.02);
    }
    p.line(centre + cos * inner, centre + sin * inner, centre + cos * outer, centre + sin * outer);
  }
}

/**
 * MeasuredCard — real Lighthouse scores, shown the way Lighthouse shows them:
 * as circular gauges in its own grade colours.
 *
 * When the card comes into view, each gauge runs its "audit": its ticks drift
 * through Perlin noise (p5.js), then GSAP pulls them into a ring, sweeps the
 * arc to the score and counts the number up — noise into a measured result.
 * Hovering a gauge audits it again. p5 draws only when GSAP asks, so nothing
 * runs at idle, and the real scores stay in the HTML for everyone.
 */
export function MeasuredCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mounts = useRef(new Map<string, HTMLDivElement>());
  const counters = useRef(new Map<string, HTMLSpanElement>());
  const replays = useRef(new Map<string, () => void>());
  const { reduced } = useStudioMotion();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const replayMap = replays.current;
    let cancelled = false;
    const sketches: Sketch[] = [];
    const timelines: gsap.core.Timeline[] = [];
    const observers: ResizeObserver[] = [];
    let trigger: ScrollTrigger | undefined;

    // p5 is large, so it loads only on the client, once this card mounts.
    // If it fails to load, the scores are already in the HTML: nothing is lost.
    import('p5')
      .then(({ default: p5 }) => {
      if (cancelled) return;
      const P5 = p5 as unknown as P5Constructor;

      GAUGES.forEach((gauge, i) => {
        const node = mounts.current.get(gauge.id);
        const counter = counters.current.get(gauge.id);
        if (!node || !counter) return;

        const state: GaugeState = reduced
          ? { settle: 1, fill: gauge.score / 100, drift: 0 }
          : { settle: 0, fill: 0, drift: 0 };
        let ready = false;

        const sketch = new P5((p) => {
          p.setup = () => {
            const size = Math.max(1, node.clientWidth);
            p.createCanvas(size, size);
            p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
            p.noiseSeed(i + 1);
            p.noLoop();
            ready = true;
          };
          p.draw = () => drawGauge(p, state, gauge.score);
        }, node);
        sketches.push(sketch);

        const resize = new ResizeObserver(() => {
          if (!ready) return;
          const size = Math.max(1, node.clientWidth);
          sketch.resizeCanvas(size, size);
          sketch.redraw();
        });
        resize.observe(node);
        observers.push(resize);

        if (reduced) return;

        counter.textContent = '0';
        const count = { value: 0 };
        const redraw = () => {
          if (ready) sketch.redraw();
        };
        const timeline = gsap.timeline({ paused: true, onUpdate: redraw });
        timeline
          .fromTo(state, { drift: 0 }, { drift: 2.6, duration: 2.6, ease: 'none' }, 0)
          .fromTo(state, { settle: 0 }, { settle: 1, duration: 1.3, ease: 'power3.inOut' }, 0.5)
          .fromTo(state, { fill: 0 }, { fill: gauge.score / 100, duration: 1.1, ease: 'power2.out' }, 1.5)
          .fromTo(
            count,
            { value: 0 },
            {
              value: gauge.score,
              duration: 1.1,
              ease: 'power2.out',
              onUpdate: () => {
                counter.textContent = String(Math.round(count.value));
              },
            },
            1.5
          );
        timelines.push(timeline);
        replayMap.set(gauge.id, () => {
          if (!timeline.isActive()) timeline.restart();
        });
      });

      if (reduced) return;
      trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          timelines.forEach((timeline, i) => gsap.delayedCall(i * 0.12, () => timeline.play()));
        },
      });
      })
      .catch((error) => {
        console.error('MeasuredCard: p5 failed to load', error);
        counters.current.forEach((counter, id) => {
          const gauge = GAUGES.find((g) => g.id === id);
          if (gauge) counter.textContent = String(gauge.score);
        });
      });

    return () => {
      cancelled = true;
      trigger?.kill();
      timelines.forEach((timeline) => timeline.kill());
      observers.forEach((observer) => observer.disconnect());
      sketches.forEach((sketch) => sketch.remove());
      replayMap.clear();
    };
  }, [reduced]);

  const { tool, measuredAt } = STUDIO_PROJECTS[0].measured;

  return (
    <div ref={cardRef} className="h-full">
      <StudioCard label="Measured, not claimed" tone="accent">
        <p className="mx-auto mt-6 max-w-[30ch] text-center font-serif text-base text-[var(--studio-ink-soft)] lg:text-lg">
          Google Lighthouse scores for the live sites, out of 100.
        </p>
        <div className="mt-6 space-y-6">
          {STUDIO_PROJECTS.map((project) => (
            <div key={project.slug}>
              <p className="font-sans text-sm font-medium lg:text-[15px]">{project.displayUrl}</p>
              <dl className="mt-3 grid grid-cols-3 gap-3">
                {METRICS.map((metric) => {
                  const id = `${project.slug}-${metric.key}`;
                  const score = project.measured.mobile[metric.key];
                  return (
                    <div
                      key={id}
                      className="flex flex-col items-center gap-2"
                      onMouseEnter={() => replays.current.get(id)?.()}
                    >
                      <dt className="order-2 text-center font-sans text-xs text-[var(--studio-ink-soft)] lg:text-[13px]">
                        {metric.label}
                      </dt>
                      <dd className="relative order-1 aspect-square w-full max-w-[112px]">
                        <div
                          ref={(el) => {
                            if (el) mounts.current.set(id, el);
                            else mounts.current.delete(id);
                          }}
                          aria-hidden="true"
                          className="absolute inset-0 [&>canvas]:block"
                        />
                        <span
                          ref={(el) => {
                            if (el) counters.current.set(id, el);
                            else counters.current.delete(id);
                          }}
                          className="absolute inset-0 grid place-items-center font-sans text-2xl tabular-nums tracking-[-0.02em] lg:text-[28px]"
                        >
                          {score}
                        </span>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-6 font-sans text-xs text-[var(--studio-ink-soft)] lg:text-[13px]">
          {tool}, mobile, measured {formatMeasuredDate(measuredAt)}. Graded as Lighthouse grades: green 90–100,
          orange 50–89, red 0–49.
        </p>
      </StudioCard>
    </div>
  );
}
