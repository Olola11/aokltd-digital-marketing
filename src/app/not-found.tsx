import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <h1 className="font-sans text-6xl font-bold text-[#00008B] mb-4">404</h1>
      <p className="font-serif text-lg text-gray-600 mb-8 text-center">
        This page doesn&rsquo;t exist in the vault — yet.
      </p>
      <Link
        href="/"
        className="font-sans text-sm uppercase tracking-wider text-[#00008B] border border-[#00008B] px-6 py-3 rounded-md hover:bg-[#00008B] hover:text-white transition-colors"
      >
        Return Home
      </Link>
    </main>
  );
}
