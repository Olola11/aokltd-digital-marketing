'use client';

import { useCallback, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const platforms = [
  { platform: 'Facebook Page', handle: '@AoKForReal', focus: 'Historical Insights', status: 'ACTIVE', href: 'https://www.facebook.com/AoKForReal' },
  { platform: 'Facebook Group', handle: 'Community', focus: 'Engagement', status: 'ACTIVE', href: 'https://www.facebook.com/groups/apotheosisofknowledge' },
  { platform: 'TikTok', handle: '@aok20191', focus: 'Micro-Learning', status: 'ACTIVE', href: 'https://www.tiktok.com/@aok20191' },
  { platform: 'Instagram', handle: '@apotheosisofknowledge', focus: 'Visual Facts', status: 'ACTIVE', href: 'https://www.instagram.com/apotheosisofknowledge' },
  { platform: 'X / Twitter', handle: '@aokfacts', focus: 'Cultural Commentary', status: 'ACTIVE', href: 'https://x.com/aokfacts' },
  { platform: 'WhatsApp', handle: '\u2014', focus: 'Direct Channel', status: 'ACTIVE', href: null },
];

export function SocialMonitor() {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!overlayRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    overlayRef.current.style.opacity = '1';
    overlayRef.current.style.background =
      `radial-gradient(300px circle at ${x}px ${y}px, rgba(74, 144, 226, 0.08), transparent 70%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!overlayRef.current) return;
    overlayRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      className="border-t border-b border-[#00008B]/10 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight overlay — desktop only, follows cursor */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 hidden md:block"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-[#00008B]/10">
        <Link
          href="/work/social"
          className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-[#00008B]/60 hover:text-[#00008B] transition-colors"
        >
          Live Feed
        </Link>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
            style={{ boxShadow: '0 0 8px rgba(16,185,129,0.6)' }}
            aria-hidden="true"
          />
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-emerald-600">
            Operational
          </span>
        </div>
      </div>

      {/* Table header — desktop only */}
      <div className="hidden md:grid grid-cols-4 px-4 md:px-6 py-3 font-sans text-sm tracking-[0.2em] uppercase text-[#00008B]/30 border-b border-[#00008B]/5">
        <span>Platform</span>
        <span>Handle</span>
        <span>Focus</span>
        <span className="text-right">Status</span>
      </div>

      {/* Data rows */}
      {platforms.map((item, i) => (
        <div
          key={item.platform}
          className={cn(
            'grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-0 px-4 md:px-6 py-3 md:py-3.5 transition-colors duration-200 hover:bg-slate-50',
            i < platforms.length - 1 && 'border-b border-[#00008B]/5'
          )}
        >
          <span className="font-sans text-sm text-[#00008B]">
            {item.platform}
          </span>
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs md:text-sm text-quill-500 hover:underline"
            >
              {item.handle}
            </a>
          ) : (
            <span className="font-sans text-xs md:text-sm text-quill-500">
              {item.handle}
            </span>
          )}
          <span className="font-sans text-xs md:text-sm text-[#00008B]/60">
            {item.focus}
          </span>
          <span className="font-sans text-xs md:text-sm tracking-wider uppercase text-emerald-600 md:text-right">
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}
