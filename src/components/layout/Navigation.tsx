'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Mission', href: '/about/mission' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Invest', href: '/invest' },
  { label: 'Vault', href: '/vault' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Navigation — "The Modern Classic" Editorial Design
 *
 * High-contrast navigation bar with Royal Blue on white.
 * Clean, authoritative typography with subtle hover states.
 */
export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/about') return pathname === '/about';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-royal-800/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo/Apotheosis of Knowledge LOGO PNG-15.png"
              alt="Apotheosis of Knowledge"
              width={40}
              height={40}
              className="md:hidden"
              priority
            />
            <Image
              src="/images/logo/Apotheosis of Knowledge LOGO PNG-16.png"
              alt="Apotheosis of Knowledge"
              width={160}
              height={40}
              className="hidden md:block"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-[15px] font-sans font-medium transition-colors duration-200 relative',
                  isActive(item.href)
                    ? 'text-royal-800'
                    : 'text-royal-800/60 hover:text-royal-800'
                )}
              >
                {item.label}
                {/* Active indicator */}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-quill-500" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-royal-800/60 hover:text-royal-800 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-royal-800/10">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'text-lg font-sans font-medium py-2 transition-colors duration-200',
                    isActive(item.href)
                      ? 'text-royal-800'
                      : 'text-royal-800/60 hover:text-royal-800'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
