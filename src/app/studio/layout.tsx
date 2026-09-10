import type { Metadata } from 'next';
import { StudioMotionProvider } from '@/components/studio/motion/studio-motion';
import { EnquiryProvider } from '@/components/studio/enquiry/enquiry-provider';
import { StudioHeader } from '@/components/studio/chrome/studio-header';
import { StudioFooter } from '@/components/studio/chrome/studio-footer';
import './studio.css';

export const metadata: Metadata = {
  title: {
    template: '%s | AOK Studio',
    default: 'AOK Studio',
  },
  openGraph: {
    type: 'website',
    siteName: 'AOK Studio',
    locale: 'en_NG',
  },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudioMotionProvider>
      <EnquiryProvider>
        <div className="studio min-h-screen">
          <StudioHeader />
          <main id="main-content" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <StudioFooter />
        </div>
      </EnquiryProvider>
    </StudioMotionProvider>
  );
}
