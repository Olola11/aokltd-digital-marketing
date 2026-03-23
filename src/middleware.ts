import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Handle vault.aokltd.org subdomain
  if (hostname === 'vault.aokltd.org' || hostname.startsWith('vault.localhost')) {
    // Don't rewrite API routes, static files, or Next.js internals
    if (
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/images/') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    // If path starts with /vault, strip the prefix and redirect
    // (catches links that still use /vault/... on the subdomain)
    if (pathname.startsWith('/vault')) {
      const stripped = pathname.replace(/^\/vault/, '') || '/';
      const url = request.nextUrl.clone();
      url.pathname = stripped;
      return NextResponse.redirect(url, 301);
    }

    // Rewrite the URL internally to /vault/[path]
    const url = request.nextUrl.clone();

    if (pathname === '/') {
      url.pathname = '/vault';
    } else {
      url.pathname = `/vault${pathname}`;
    }

    return NextResponse.rewrite(url);
  }

  // Handle redirects from aokltd.org/vault to vault.aokltd.org
  if (
    (hostname === 'aokltd.org' ||
      hostname === 'www.aokltd.org' ||
      hostname === 'localhost:3000') &&
    pathname.startsWith('/vault')
  ) {
    const vaultPath = pathname.replace('/vault', '') || '/';
    const url = new URL(`https://vault.aokltd.org${vaultPath}`);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)',
  ],
};
