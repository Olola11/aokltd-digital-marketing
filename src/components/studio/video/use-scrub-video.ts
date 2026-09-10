'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useStudioMotion } from '../motion/studio-motion';

/**
 * useScrubVideo — a recording the visitor can drive.
 *
 * - Mouse: the horizontal pointer position becomes the playhead.
 * - Touch (no hover): plays while at least half visible.
 * - `autoplayWithMouse`: also plays in view on desktop (case study pages,
 *   which carry a visible pause control).
 * Autoplay stops when the visitor pauses motion or prefers reduced motion.
 */
export function useScrubVideo({ autoplayWithMouse = false }: { autoplayWithMouse?: boolean } = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [playing, setPlaying] = useState(false);

  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const { motionEnabled } = useStudioMotion();
  const autoplay = motionEnabled && (!finePointer || autoplayWithMouse);

  useEffect(() => {
    const video = videoRef.current;
    const area = areaRef.current;
    if (!video || !area) return;
    if (!autoplay) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 }
    );
    observer.observe(area);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [autoplay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const sync = () => {
      if (barRef.current && video.duration) {
        barRef.current.style.transform = `scaleX(${video.currentTime / video.duration})`;
      }
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener('timeupdate', sync);
    video.addEventListener('seeked', sync);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('timeupdate', sync);
      video.removeEventListener('seeked', sync);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const onPointerEnter = useCallback((event: React.PointerEvent) => {
    if (event.pointerType === 'mouse' && videoRef.current) videoRef.current.preload = 'auto';
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      video.pause();
      video.currentTime = progress * Math.max(0, video.duration - 0.05);
      // Move the playhead with the pointer; seeking can lag behind it.
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    });
  }, []);

  const onFocus = useCallback(() => {
    if (motionEnabled) videoRef.current?.play().catch(() => {});
  }, [motionEnabled]);

  const onBlur = useCallback(() => videoRef.current?.pause(), []);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }, []);

  return {
    videoRef,
    barRef,
    areaRef,
    playing,
    toggle,
    pointerHandlers: { onPointerEnter, onPointerMove },
    focusHandlers: { onFocus, onBlur },
  };
}
