'use client';

import { useEffect } from 'react';
import { useStudioMotion } from '../motion/studio-motion';

const SOURCE = '/studio/mark/favicon-source.png';
const SIZE = 32; // the size browsers actually draw in the tab strip
const FRAMES = 22;
const FRAME_MS = 60; // ~1.3s from noise to mark
const SCATTER = 11; // how far a particle starts from where it belongs

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface Particle {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
  dx: number;
  dy: number;
  delay: number;
}

/**
 * AnimatedFavicon — the tab icon assembles itself.
 *
 * The AOK mark is sampled pixel by pixel, scattered, and drawn back together
 * frame by frame into the favicon: the same noise-to-order idea the page is
 * built on, at 32 pixels square. It runs once on arrival and again whenever
 * the visitor comes back to the tab.
 *
 * The static icon (src/app/studio/icon.png) is what shows before this runs,
 * for visitors who prefer reduced motion, while motion is paused, and if
 * scripts never arrive — so the mark is always the mark.
 */
export function AnimatedFavicon() {
  const { motionEnabled } = useStudioMotion();

  useEffect(() => {
    if (!motionEnabled) return;

    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) return;
    const restingHref = link.href;

    const canvas = document.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let timer: number | undefined;
    let frame: number | undefined;
    let cancelled = false;

    const image = new Image();

    const settle = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.drawImage(image, 0, 0, SIZE, SIZE);
      link.href = canvas.toDataURL('image/png');
    };

    const draw = (step: number) => {
      const progress = step / (FRAMES - 1);
      const buffer = ctx.createImageData(SIZE, SIZE);
      const data = buffer.data;

      for (const particle of particles) {
        const local = Math.max(0, Math.min(1, (progress - particle.delay) / (1 - particle.delay)));
        const t = easeOut(local);
        const x = Math.round(particle.x + particle.dx * (1 - t));
        const y = Math.round(particle.y + particle.dy * (1 - t));
        if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) continue;

        const i = (y * SIZE + x) * 4;
        data[i] = particle.r;
        data[i + 1] = particle.g;
        data[i + 2] = particle.b;
        data[i + 3] = particle.a * (0.3 + 0.7 * t);
      }

      ctx.putImageData(buffer, 0, 0);
      link.href = canvas.toDataURL('image/png');
    };

    const play = () => {
      if (cancelled || particles.length === 0) return;
      window.clearTimeout(timer);
      let step = 0;
      const tick = () => {
        if (cancelled) return;
        if (step >= FRAMES) {
          settle();
          return;
        }
        draw(step);
        step += 1;
        timer = window.setTimeout(tick, FRAME_MS);
      };
      tick();
    };

    const onVisible = () => {
      if (!document.hidden) play();
    };

    image.onload = () => {
      if (cancelled) return;
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.drawImage(image, 0, 0, SIZE, SIZE);
      const { data } = ctx.getImageData(0, 0, SIZE, SIZE);

      for (let y = 0; y < SIZE; y += 1) {
        for (let x = 0; x < SIZE; x += 1) {
          const i = (y * SIZE + x) * 4;
          const alpha = data[i + 3];
          if (alpha < 24) continue;
          const angle = Math.random() * Math.PI * 2;
          const distance = SCATTER * (0.35 + Math.random() * 0.65);
          particles.push({
            x,
            y,
            r: data[i],
            g: data[i + 1],
            b: data[i + 2],
            a: alpha,
            dx: Math.cos(angle) * distance,
            dy: Math.sin(angle) * distance,
            delay: Math.random() * 0.35,
          });
        }
      }

      // One paint after the browser is done with the page itself.
      frame = window.requestAnimationFrame(play);
      document.addEventListener('visibilitychange', onVisible);
    };

    image.src = SOURCE;

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', onVisible);
      particles = [];
      // Hand the tab back the file-based icon.
      link.href = restingHref;
    };
  }, [motionEnabled]);

  return null;
}
