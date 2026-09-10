'use client';

import { usePathname } from 'next/navigation';

function isStudioPath(pathname: string | null): boolean {
  return pathname === '/studio' || !!pathname?.startsWith('/studio/');
}

/**
 * SiteChrome — wraps pages in the institutional navigation and footer,
 * except for /studio, which renders its own client-facing chrome.
 *
 * Navigation and footer arrive as elements so the footer stays a
 * server component.
 */
export function SiteChrome({
  navigation,
  footer,
  children,
}: {
  navigation: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (isStudioPath(pathname)) return <>{children}</>;

  return (
    <>
      {navigation}
      <div id="site-chrome" className="pt-16 flex flex-col min-h-screen">
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        {footer}
      </div>
    </>
  );
}
