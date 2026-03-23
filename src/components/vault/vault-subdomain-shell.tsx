'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { VaultHeader } from './vault-header';

const emptySubscribe = () => () => {};

function getIsSubdomain(): boolean {
  const hostname = window.location.hostname;
  return hostname.startsWith('vault.') || hostname === 'vault.localhost';
}

/**
 * VaultSubdomainShell — Client component that detects the vault subdomain
 * and replaces the main site's Navigation/Footer with vault-specific chrome.
 *
 * This approach keeps vault pages statically generated (no headers() call)
 * while still providing the subdomain experience.
 */
export function VaultSubdomainShell() {
  const isSubdomain = useSyncExternalStore(
    emptySubscribe,
    getIsSubdomain,
    () => false
  );

  useEffect(() => {
    if (!isSubdomain) return;

    // Hide main site chrome
    const nav = document.getElementById('site-navigation');
    const footer = document.getElementById('site-footer');
    const chrome = document.getElementById('site-chrome');

    if (nav) nav.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (chrome) chrome.style.paddingTop = '0';
  }, [isSubdomain]);

  if (!isSubdomain) return null;

  return <VaultHeader />;
}

export function VaultSubdomainFooter() {
  const isSubdomain = useSyncExternalStore(
    emptySubscribe,
    getIsSubdomain,
    () => false
  );

  if (!isSubdomain) return null;

  return (
    <footer className="border-t border-gray-100 py-8 px-5 md:px-8 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-serif text-sm text-gray-400 italic">
          Knowledge deserves better. So does your attention.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://aokltd.org"
            className="font-sans text-xs uppercase tracking-wider text-gray-400 hover:text-[#00008B] transition-colors"
          >
            Apotheosis of Knowledge
          </a>
          <span className="text-gray-300" aria-hidden="true">
            &middot;
          </span>
          <a
            href="https://aokltd.org/contact"
            className="font-sans text-xs uppercase tracking-wider text-gray-400 hover:text-[#00008B] transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
