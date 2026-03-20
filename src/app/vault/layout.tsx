import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Vault — Apotheosis of Knowledge',
  description: 'Intellectual curiosities extracted from the margins of recorded history. Explore articles across history, culture, bizarre facts, and true crime.',
};

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
