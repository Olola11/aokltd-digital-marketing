'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useStudioMotion } from '../motion/studio-motion';

const noopSubscribe = () => () => {};
/** The browser's Data Saver (Chrome, Android): honour it by not autoplaying. */
const getSaveData = () =>
  Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

/**
 * useScrubVideo — a recording the visitor can drive.
 *
 * - Mouse: the horizontal pointer position becomes the playhead.
 * - Touch: a sideways drag scrubs (vertical drags still scroll the page), and
 *   a drag never counts as a tap on the card's link. Plays while at least
 *   half visible.
 * - `autoplayWithMouse`: also plays in view on desktop (case study pages,
 *   which carry a visible pause control).
 * Autoplay stops when the visitor pauses motion, prefers reduced motion, or
 * has Data Saver on.
 */
export function useScrubVideo({ autoplayWithMouse = false }: { autoplayWithMouse?: boolean } = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const touch = useRef<{ x: number; y: number; scrubbing: boolean } | null>(null);
  const dragged = useRef(false);
  const [playing, setPlaying] = useState(false);

  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const saveData = useSyncExternalStore(noopSubscribe, getSaveData, () => false);
  const { motionEnabled } = useStudioMotion();
  const autoplay = motionEnabled && !saveData && (!finePointer || autoplayWithMouse);

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

  const seek = useCallback((target: HTMLElement, clientX: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = target.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      video.pause();
      video.currentTime = progress * Math.max(0, video.duration - 0.05);
      // Move the playhead with the pointer; seeking can lag behind it.
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    });
  }, []);

  const onPointerEnter = useCallback((event: React.PointerEvent) => {
    if (event.pointerType === 'mouse' && videoRef.current) videoRef.current.preload = 'auto';
  }, []);

  const onPointerDown = useCallback((event: React.PointerEvent) => {
    if (event.pointerType === 'mouse') return;
    touch.current = { x: event.clientX, y: event.clientY, scrubbing: false };
    dragged.current = false;
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType === 'mouse') {
        seek(event.currentTarget, event.clientX);
        return;
      }
      const start = touch.current;
      if (!start) return;
      if (!start.scrubbing) {
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        // Commit to scrubbing only for a clearly sideways drag.
        if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy)) return;
        start.scrubbing = true;
        dragged.current = true;
        if (videoRef.current) videoRef.current.preload = 'auto';
      }
      seek(event.currentTarget, event.clientX);
    },
    [seek]
  );

  const onPointerEnd = useCallback(() => {
    touch.current = null;
  }, []);

  /** Swallows the click that ends a scrub, so dragging never opens the case study. */
  const onClickCapture = useCallback((event: React.MouseEvent) => {
    if (!dragged.current) return;
    dragged.current = false;
    event.preventDefault();
    event.stopPropagation();
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
    pointerHandlers: {
      onPointerEnter,
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
      onClickCapture,
    },
    focusHandlers: { onFocus, onBlur },
  };
}
