import type { Metadata } from 'next';
import { Source_Serif_4, Space_Grotesk } from 'next/font/google';
import { Navigation, Footer } from '@/components/layout';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});


export const metadata: Metadata = {
  title: {
    default: 'Apotheosis of Knowledge',
    template: '%s | Apotheosis of Knowledge',
  },
  description: 'Elevating curiosity. Countering noise. A Nigerian knowledge initiative producing research-driven content for the endlessly curious.',
  keywords: ['knowledge', 'history', 'culture', 'Nigeria', 'facts', 'education'],
  authors: [{ name: 'Apotheosis of Knowledge Limited' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aokltd.org',
    siteName: 'Apotheosis of Knowledge',
    title: 'Apotheosis of Knowledge',
    description: 'Elevating curiosity. Countering noise.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apotheosis of Knowledge',
    description: 'Elevating curiosity. Countering noise.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${sourceSerif.variable}`}>
      <body className="paper-grain min-h-screen bg-white text-royal-800 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#00008B] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-sans"
        >
          Skip to main content
        </a>
        <Navigation />
        <div className="pt-16 flex flex-col min-h-screen">
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}