'use client';

import { usePathname } from 'next/navigation';
import { Navigation, Footer } from '@/components/layout';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isShowcase = pathname === '/work' || pathname?.startsWith('/work');

  // Standalone showcase route isolation
  if (isShowcase) {
    return (
      <div id="showcase-root" className="w-full min-h-screen bg-white">
        {children}
      </div>
    );
  }

  // Main website layout shell
  return (
    <>
      <Navigation />
      <div id="site-chrome" className="pt-16 flex flex-col min-h-screen">
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
