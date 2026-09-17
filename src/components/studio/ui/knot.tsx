'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/studio/gsap';
import { useStudioMotion } from '../motion/studio-motion';

/** The slice of the p5 instance API this sketch uses. */
interface Sketch {
  setup: () => void;
  draw: () => void;
  createCanvas(width: number, height: number): unknown;
  pixelDensity(density: number): void;
  noLoop(): void;
  remove(): void;
  clear(): void;
  stroke(r: number, g: number, b: number, a?: number): void;
  strokeWeight(weight: number): void;
  strokeCap(cap: string): void;
  noFill(): void;
  beginShape(): void;
  vertex(x: number, y: number): void;
  endShape(): void;
  ROUND: string;
}
type P5Constructor = new (sketch: (p: Sketch) => void, node: HTMLElement) => Sketch;

const POINTS = 220;
const TAU = Math.PI * 2;

/** How long the knot takes to come undone. Callers wait this out. */
export const UNTIE_MS = 620;

interface KnotState {
  /** 0: tied in a knot · 1: pulled out into one straight rope */
  untied: number;
  /** Rotation of the knot, turned over while a visitor points at it */
  spin: number;
}

/**
 * One continuous line, drawn twice over: as a Lissajous knot (three against
 * two, so it crosses itself) and as a straight rope. Every point sits
 * somewhere between the two, and the crossfade runs ahead at the start of the
 * line, so the knot pulls undone from one end instead of dissolving.
 */
function drawKnot(p: Sketch, state: KnotState, size: number) {
  const centre = size / 2;
  const radius = size * 0.34;
  const span = size * 0.42;

  p.clear();
  p.noFill();
  p.strokeCap(p.ROUND);
  p.stroke(0, 0, 139, 235);
  p.strokeWeight(1.5);
  p.beginShape();
  for (let i = 0; i <= POINTS; i++) {
    const t = i / POINTS;
    const undone = Math.max(0, Math.min(1, state.untied * 1.7 - t * 0.7));
    const eased = undone * undone * (3 - 2 * undone);

    const knotX = centre + radius * Math.sin(3 * TAU * t + state.spin);
    const knotY = centre + radius * Math.sin(2 * TAU * t);
    const ropeX = centre - span + t * span * 2;

    p.vertex(knotX + (ropeX - knotX) * eased, knotY + (centre - knotY) * eased);
  }
  p.endShape();
}

/**
 * Knot — a knot that unties itself.
 *
 * It stands in for the arrows and chevrons this page would otherwise use: a
 * question tied shut, a link not yet followed. Drawn with p5.js, on demand
 * only — the sketch is idle except while it is coming undone or turning over
 * under the pointer.
 *
 * Decorative by definition: whatever the knot marks is always said in words
 * beside it.
 */
export function Knot({ untied, active = false, size = 30 }: { untied: boolean; active?: boolean; size?: number }) {
  const mountRef = useRef<HTMLSpanElement>(null);
  const [render, setRender] = useState<(() => void) | null>(null);
  const stateRef = useRef<KnotState>({ untied: 0, spin: 0 });
  const { reduced } = useStudioMotion();

  useEffect(() => {
    const node = mountRef.current;
    if (!node) return;

    let cancelled = false;
    let sketch: Sketch | undefined;

    import('p5')
      .then(({ default: p5 }) => {
        if (cancelled) return;
        const P5 = p5 as unknown as P5Constructor;
        const state = stateRef.current;

        sketch = new P5((p) => {
          p.setup = () => {
            p.createCanvas(size, size);
            p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
            // p5 never runs a loop of its own here: the drawing is asked for.
            p.noLoop();
            const paint = () => drawKnot(p, state, size);
            paint();
            setRender(() => paint);
          };
          p.draw = () => {};
        }, node);
      })
      .catch(() => {
        // Without the sketch the control still works; it just has no mark.
      });

    return () => {
      cancelled = true;
      sketch?.remove();
      setRender(null);
    };
  }, [size]);

  useEffect(() => {
    if (!render) return;
    const state = stateRef.current;
    const target = untied ? 1 : 0;

    if (reduced) {
      state.untied = target;
      render();
      return;
    }

    const tween = gsap.to(state, {
      untied: target,
      duration: UNTIE_MS / 1000,
      ease: 'power3.inOut',
      onUpdate: render,
    });
    return () => {
      tween.kill();
    };
  }, [untied, reduced, render]);

  useEffect(() => {
    if (!render || reduced || !active || untied) return;
    const state = stateRef.current;
    // Pointing at a knot turns it over, slowly.
    const tween = gsap.to(state, {
      spin: state.spin + TAU / 3,
      duration: 2.4,
      ease: 'power1.inOut',
      onUpdate: render,
    });
    return () => {
      tween.kill();
    };
  }, [active, untied, reduced, render]);

  return <span ref={mountRef} aria-hidden="true" className="shrink-0" style={{ width: size, height: size }} />;
}
