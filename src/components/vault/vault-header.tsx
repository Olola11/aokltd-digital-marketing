'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { label: 'History', href: '/history' },
  { label: 'Culture', href: '/culture' },
  { label: 'Bizarre Facts', href: '/bizarre-facts' },
  { label: 'True Crime', href: '/true-crime' },
];

export function VaultHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [mobileMenuOpen]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileMenuOpen]);

  // Close mobile menu on route change (adjusting state during render)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between h-16">
        {/* Brand — links back to main site */}
        <div className="flex items-center gap-3">
          <a href="https://aokltd.org" className="flex items-center gap-2">
            <Image
              src="/images/logo/Apotheosis of Knowledge LOGO PNG-15.png"
              alt="Apotheosis of Knowledge"
              width={32}
              height={32}
            />
          </a>
          <span className="text-gray-300" aria-hidden="true">|</span>
          <Link
            href="/"
            className="font-sans text-lg font-semibold text-[#00008B] tracking-tight"
          >
            The Vault
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={cn(
                'font-sans text-sm transition-colors duration-200',
                isActive(cat.href)
                  ? 'text-[#00008B] font-medium'
                  : 'text-gray-600 hover:text-[#00008B]'
              )}
            >
              {cat.label}
            </Link>
          ))}
          <a
            href="https://aokltd.org"
            className="font-sans text-xs uppercase tracking-wider text-gray-400 hover:text-[#00008B] transition-colors"
          >
            Main Site &rarr;
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          ref={menuButtonRef}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-[#00008B] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="vault-mobile-nav"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div
          id="vault-mobile-nav"
          className="md:hidden py-4 border-t border-gray-100 bg-white"
        >
          <div className="flex flex-col space-y-4 px-5">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={cn(
                  'font-sans text-sm py-1 transition-colors',
                  isActive(cat.href)
                    ? 'text-[#00008B] font-medium'
                    : 'text-gray-600'
                )}
              >
                {cat.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <a
                href="https://aokltd.org"
                className="font-sans text-xs uppercase tracking-wider text-gray-400 hover:text-[#00008B] transition-colors"
              >
                Main Site &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
