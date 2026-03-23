import type { Metadata } from 'next';
import { Source_Serif_4, Space_Grotesk } from 'next/font/google';
import { Navigation, Footer } from '@/components/layout';
import { ContentProtection } from '@/components/layout/content-protection';
import { SITE_URL } from '@/lib/constants';
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Apotheosis of Knowledge — Elevating curiosity. Countering noise.',
    template: '%s — Apotheosis of Knowledge',
  },
  description: 'A Nigerian knowledge initiative producing research-driven content for the endlessly curious. African history, culture, true crime, and the stories the internet forgot.',
  keywords: [
    'Apotheosis of Knowledge',
    'African history',
    'Nigerian education',
    'knowledge platform',
    'research-driven content',
    'cultural analysis',
    'true crime',
    'bizarre facts',
    'digital marketing Nigeria',
  ],
  authors: [{ name: 'Apotheosis of Knowledge Limited' }],
  creator: 'Apotheosis of Knowledge Limited',
  publisher: 'Apotheosis of Knowledge Limited',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: SITE_URL,
    siteName: 'Apotheosis of Knowledge',
    title: 'Apotheosis of Knowledge — Elevating curiosity. Countering noise.',
    description: 'A Nigerian knowledge initiative producing research-driven content for the endlessly curious.',
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: 'Apotheosis of Knowledge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apotheosis of Knowledge',
    description: 'A Nigerian knowledge initiative producing research-driven content for the endlessly curious.',
    images: ['/og/default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Apotheosis of Knowledge Limited',
              alternateName: 'AOK',
              url: SITE_URL,
              logo: `${SITE_URL}/images/logo/Apotheosis of Knowledge LOGO PNG-15.png`,
              description: 'A Nigerian knowledge initiative producing research-driven content for the endlessly curious.',
              foundingDate: '2022-07-27',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lagos',
                addressCountry: 'NG',
              },
              sameAs: [
                'https://facebook.com/apotheosisofknowledge',
                'https://tiktok.com/@apotheosisofknowledge',
                'https://instagram.com/apotheosisofknowledge',
                'https://x.com/aok_ltd',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'hello@aokltd.org',
                contactType: 'general enquiry',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Apotheosis of Knowledge',
              url: SITE_URL,
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${SITE_URL}/vault?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <ContentProtection />
        <Navigation />
        <div id="site-chrome" className="pt-16 flex flex-col min-h-screen">
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}