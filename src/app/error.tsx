'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <h1 className="font-sans text-4xl font-bold text-[#00008B] mb-4">
        Something went wrong
      </h1>
      <p className="font-serif text-lg text-gray-600 mb-8 text-center">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="font-sans text-sm uppercase tracking-wider text-[#00008B] border border-[#00008B] px-6 py-3 rounded-md hover:bg-[#00008B] hover:text-white transition-colors"
      >
        Try Again
      </button>
    </main>
  );
}
