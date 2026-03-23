import type { Metadata } from 'next';
import {
  VaultSubdomainShell,
  VaultSubdomainFooter,
} from '@/components/vault/vault-subdomain-shell';

export const metadata: Metadata = {
  title: 'The Vault',
  description:
    'A searchable archive of deeply researched articles on African history, culture, true crime, and bizarre facts. Every fact verified. Every source cited.',
  alternates: {
    canonical: 'https://vault.aokltd.org',
  },
};

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <VaultSubdomainShell />
      {children}
      <VaultSubdomainFooter />
    </>
  );
}
