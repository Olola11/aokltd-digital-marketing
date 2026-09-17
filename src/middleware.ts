import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // studio.aokltd.org is the studio's own address. Its pages are served from
  // it directly, so a visitor never leaves the studio's domain.
  if (hostname === 'studio.aokltd.org' || hostname.startsWith('studio.localhost')) {
    // Assets, API routes and framework internals are served as they are.
    if (
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/images/') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    // Links written as /studio/... belong at the root of this domain.
    if (pathname === '/studio' || pathname.startsWith('/studio/')) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(/^\/studio/, '') || '/';
      return NextResponse.redirect(url, 301);
    }

    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? '/studio' : `/studio${pathname}`;
    return NextResponse.rewrite(url);
  }

  // The studio has one home. Anything that still asks aokltd.org for it is
  // sent to the studio's own domain, the way the vault is. Icons and share
  // images stay where they are, so nothing has to follow a redirect for them.
  if (
    (hostname === 'aokltd.org' || hostname === 'www.aokltd.org') &&
    (pathname === '/studio' || pathname.startsWith('/studio/')) &&
    !pathname.includes('.') &&
    !pathname.endsWith('/opengraph-image')
  ) {
    const url = new URL(`https://studio.aokltd.org${pathname.replace(/^\/studio/, '') || '/'}`);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 301);
  }

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
  // Only redirect on production domains — NEVER on localhost or local network IPs
  if (
    pathname.startsWith('/vault') &&
    (hostname === 'aokltd.org' || hostname === 'www.aokltd.org') &&
    !hostname.includes('localhost') &&
    !hostname.includes('127.0.0.1') &&
    !hostname.includes('10.') &&
    !hostname.includes('192.168.')
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
