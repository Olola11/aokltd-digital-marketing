'use client';

import { useEffect, useRef } from 'react';
import { markAsRead, isRead } from '@/lib/reading-progress';

export function ReadTracker({ slug }: { slug: string }) {
  const marked = useRef(false);

  useEffect(() => {
    if (isRead(slug) || marked.current) return;

    const handleScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrollPercent = window.scrollY / scrollable;
      if (scrollPercent > 0.4 && !marked.current) {
        markAsRead(slug);
        marked.current = true;
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  return null;
}
