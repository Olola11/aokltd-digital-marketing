'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { Geometry, Mesh, Program, Renderer } from 'ogl';
import { cn } from '@/lib/utils';
import { ScrollTrigger } from '@/lib/studio/gsap';
import { useStudioMotion } from '../motion/studio-motion';

const LOGO_SRC = '/images/logo/Apotheosis of Knowledge LOGO PNG-15.png';
const LOGO_WIDTH = 624;
const LOGO_HEIGHT = 632;

const vertex = /* glsl */ `
attribute vec2 position;
attribute vec2 scatter;
attribute vec3 color;
attribute float delay;
attribute float size;

uniform float uProgress;
uniform float uFade;
uniform vec2 uScale;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uRadius;
uniform float uPointSize;

varying vec3 vColor;
varying float vAlpha;

void main() {
  // Each particle leaves its scattered position after its own delay.
  float t = clamp((uProgress - delay) / 0.65, 0.0, 1.0);
  float eased = 1.0 - pow(1.0 - t, 3.0);
  vec2 pos = mix(scatter / uScale, position, eased);

  // The cursor pushes nearby particles aside.
  vec2 away = pos - uMouse;
  float dist = length(away);
  float push = smoothstep(uRadius, 0.0, dist) * uRadius * 0.55 * uMouseStrength;
  if (dist > 0.0001) pos += (away / dist) * push;

  gl_Position = vec4(pos * uScale, 0.0, 1.0);
  gl_PointSize = uPointSize * size;
  vColor = color;
  vAlpha = mix(0.35, 1.0, eased) * uFade;
}
`;

const fragment = /* glsl */ `
precision highp float;
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(vColor, smoothstep(0.5, 0.36, d) * vAlpha);
}
`;

interface Sample {
  position: Float32Array;
  scatter: Float32Array;
  color: Float32Array;
  delay: Float32Array;
  size: Float32Array;
}

/**
 * Samples the real logo: it is drawn centred in a square (as the overlay
 * image is, with object-contain) and every filled pixel becomes a candidate
 * particle carrying that pixel's colour.
 */
function sampleLogo(image: HTMLImageElement, maxPoints: number): Sample | null {
  const px = 400;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = px;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  const fit = px / Math.max(LOGO_WIDTH, LOGO_HEIGHT);
  const w = LOGO_WIDTH * fit;
  const h = LOGO_HEIGHT * fit;
  ctx.drawImage(image, (px - w) / 2, (px - h) / 2, w, h);

  const { data } = ctx.getImageData(0, 0, px, px);
  const found: number[] = [];
  for (let y = 0; y < px; y += 2) {
    for (let x = 0; x < px; x += 2) {
      const i = (y * px + x) * 4;
      if (data[i + 3] > 140) found.push(x, y, data[i], data[i + 1], data[i + 2]);
    }
  }

  // Seeded shuffle: the same scatter every visit.
  let seed = 7;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const total = found.length / 5;
  const order = Array.from({ length: total }, (_, i) => i);
  for (let i = total - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const count = Math.min(maxPoints, total);
  const sample: Sample = {
    position: new Float32Array(count * 2),
    scatter: new Float32Array(count * 2),
    color: new Float32Array(count * 3),
    delay: new Float32Array(count),
    size: new Float32Array(count),
  };
  for (let k = 0; k < count; k++) {
    const idx = order[k] * 5;
    sample.position[k * 2] = (found[idx] / px) * 2 - 1;
    sample.position[k * 2 + 1] = 1 - (found[idx + 1] / px) * 2;
    sample.scatter[k * 2] = random() * 2 - 1;
    sample.scatter[k * 2 + 1] = random() * 2 - 1;
    sample.color[k * 3] = found[idx + 2] / 255;
    sample.color[k * 3 + 1] = found[idx + 3] / 255;
    sample.color[k * 3 + 2] = found[idx + 4] / 255;
    sample.delay[k] = random() * 0.35;
    sample.size[k] = 0.75 + random() * 0.5;
  }
  return sample;
}

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

/** Builds the particle field inside `container`; returns its cleanup. */
function mountParticles(container: HTMLDivElement, logo: HTMLDivElement, image: HTMLImageElement): () => void {
  const sample = sampleLogo(image, container.clientWidth < 640 ? 3200 : 6400);
  if (!sample) {
    logo.style.opacity = '1';
    return () => {};
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const renderer = new Renderer({ dpr, alpha: true, antialias: false, premultipliedAlpha: false });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);
  const canvas = gl.canvas as HTMLCanvasElement;
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' });
  container.appendChild(canvas);

  const program = new Program(gl, {
    vertex,
    fragment,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uProgress: { value: 0 },
      uFade: { value: 1 },
      uScale: { value: [1, 1] },
      uMouse: { value: [10, 10] },
      uMouseStrength: { value: 0 },
      uRadius: { value: 0.3 },
      uPointSize: { value: 3 },
    },
  });
  const geometry = new Geometry(gl, {
    position: { size: 2, data: sample.position },
    scatter: { size: 2, data: sample.scatter },
    color: { size: 3, data: sample.color },
    delay: { size: 1, data: sample.delay },
    size: { size: 1, data: sample.size },
  });
  const mesh = new Mesh(gl, { geometry, program, mode: gl.POINTS });

  let progress = 0;
  const mouse = { x: 10, y: 10, tx: 10, ty: 10, s: 0, ts: 0 };

  // Once assembled, the real logo takes over at full colour; the cursor
  // dissolves it back into particles, and it re-forms when the cursor leaves.
  const draw = () => {
    const shown = smoothstep(0.82, 1, progress) * (1 - mouse.s);
    program.uniforms.uProgress.value = progress;
    program.uniforms.uFade.value = 1 - shown;
    program.uniforms.uMouse.value = [mouse.x, mouse.y];
    program.uniforms.uMouseStrength.value = mouse.s;
    logo.style.opacity = String(shown);
    renderer.render({ scene: mesh });
  };

  const resize = () => {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    renderer.setSize(width, height);
    // The mark fills 80% of the height, or of the width on narrow screens —
    // the same box the overlay image occupies.
    let scaleY = 0.8;
    let scaleX = scaleY * (height / width);
    if (scaleX > 0.8) {
      scaleY *= 0.8 / scaleX;
      scaleX = 0.8;
    }
    program.uniforms.uScale.value = [scaleX, scaleY];
    program.uniforms.uPointSize.value = Math.max(1.6, Math.min(width, height) / 200) * dpr;
    draw();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  // Pointer: eased toward its target, rendering only until it settles.
  let raf = 0;
  const step = () => {
    mouse.x += (mouse.tx - mouse.x) * 0.2;
    mouse.y += (mouse.ty - mouse.y) * 0.2;
    mouse.s += (mouse.ts - mouse.s) * 0.1;
    draw();
    const settled =
      Math.abs(mouse.tx - mouse.x) < 0.001 &&
      Math.abs(mouse.ty - mouse.y) < 0.001 &&
      Math.abs(mouse.ts - mouse.s) < 0.002;
    raf = settled ? 0 : requestAnimationFrame(step);
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(step);
  };
  const onMove = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect();
    const [sx, sy] = program.uniforms.uScale.value as number[];
    mouse.tx = (((event.clientX - rect.left) / rect.width) * 2 - 1) / sx;
    mouse.ty = (1 - ((event.clientY - rect.top) / rect.height) * 2) / sy;
    if (mouse.s < 0.01) {
      mouse.x = mouse.tx;
      mouse.y = mouse.ty;
    }
    mouse.ts = 1;
    kick();
  };
  const onLeave = () => {
    mouse.ts = 0;
    kick();
  };
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);

  const trigger = ScrollTrigger.create({
    trigger: container,
    start: 'top bottom',
    end: 'center 55%',
    onUpdate: (self) => {
      progress = self.progress;
      draw();
    },
  });
  progress = trigger.progress;
  draw();

  return () => {
    trigger.kill();
    resizeObserver.disconnect();
    cancelAnimationFrame(raf);
    container.removeEventListener('pointermove', onMove);
    container.removeEventListener('pointerleave', onLeave);
    canvas.remove();
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
}

let webglSupport: boolean | undefined;
function detectWebGL(): boolean {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement('canvas');
      webglSupport = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}
const noopSubscribe = () => () => {};

/**
 * ParticleMark — the AOK logo as a few thousand particles sampled from the
 * logo itself. They gather from scattered noise as the footer scrolls into
 * view, then the real logo resolves in full colour. There is no idle
 * animation loop: it renders only on scroll and pointer movement.
 */
export function ParticleMark({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const webgl = useSyncExternalStore(noopSubscribe, detectWebGL, () => true);
  const { reduced } = useStudioMotion();

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    if (!container || !logo) return;

    if (reduced || !webgl) {
      logo.style.opacity = '1';
      return;
    }
    logo.style.opacity = '0';

    let disposed = false;
    let teardown: (() => void) | undefined;
    const image = new window.Image();
    image.src = LOGO_SRC;
    image
      .decode()
      .then(() => {
        if (!disposed) teardown = mountParticles(container, logo, image);
      })
      .catch(() => {
        logo.style.opacity = '1';
      });

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [webgl, reduced]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="The Apotheosis of Knowledge logo, drawn in particles"
      className={cn('relative touch-pan-y', className)}
    >
      <div
        ref={logoRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <Image
          src={LOGO_SRC}
          alt=""
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          sizes="(max-width: 768px) 80vw, 600px"
          className="h-[80%] w-auto max-w-[80%] object-contain"
        />
      </div>
    </div>
  );
}
