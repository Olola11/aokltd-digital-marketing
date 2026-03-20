import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Vault',
  description: 'A searchable archive of deeply researched articles on African history, culture, true crime, and bizarre facts. Every fact verified. Every source cited.',
};

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
