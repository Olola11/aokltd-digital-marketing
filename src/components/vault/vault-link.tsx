'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';

type VaultLinkProps = ComponentProps<typeof Link>;

/**
 * VaultLink — A link component that strips the /vault prefix on the subdomain.
 *
 * On vault.aokltd.org, /vault/history becomes /history.
 * On aokltd.org, links remain unchanged.
 *
 * Even if stripping doesn't happen (SSR, pre-hydration), the middleware
 * catches /vault/* on the subdomain and redirects, so links always resolve.
 */
export function VaultLink({ href, ...props }: VaultLinkProps) {
  const isSubdomain =
    typeof window !== 'undefined' &&
    (window.location.hostname.startsWith('vault.') ||
      window.location.hostname === 'vault.localhost');

  let resolvedHref = href;
  if (isSubdomain && typeof href === 'string' && href.startsWith('/vault')) {
    resolvedHref = href.replace('/vault', '') || '/';
  }

  return <Link href={resolvedHref} {...props} />;
}
