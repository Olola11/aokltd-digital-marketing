import { Metadata } from 'next';
import { FadeIn } from '@/components/ui/fade-in';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactPaths } from '@/components/contact/contact-paths';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Apotheosis of Knowledge — partnerships, editorial submissions, or general enquiries.',
  openGraph: {
    title: 'Contact | Apotheosis of Knowledge',
    description:
      'Reach out for partnerships, editorial collaborations, press enquiries, or general questions.',
  },
};

const SOCIAL_LINKS = [
  { name: 'YouTube', href: '#' }, // TODO: Add YouTube URL when channel is public
  { name: 'Facebook', href: 'https://facebook.com/apotheosisofknowledge' },
  { name: 'TikTok', href: 'https://tiktok.com/@apotheosisofknowledge' },
  { name: 'X (Twitter)', href: 'https://x.com/aok_ltd' },
];

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* § 1 — Header */}
      <section className="pt-12 sm:pt-32 pb-10 sm:pb-20 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <span className="font-sans text-xs sm:text-sm font-medium text-quill-500 uppercase tracking-[0.25em]">
              Contact
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-[#00008B] tracking-tight mt-4 mb-6 text-center md:text-left">
              We&rsquo;d like to hear from you.
            </h1>
            <p className="font-serif text-lg text-[#00008B]/60 leading-relaxed max-w-[640px] text-center md:text-left">
              Whether you&rsquo;re a potential partner, a fellow knowledge enthusiast,
              or a creator looking to collaborate — this is where the conversation
              begins.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* § 2 — Contact Paths */}
      <section className="pb-10 sm:pb-24 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ContactPaths />
        </div>
      </section>

      {/* § 3 — Form */}
      <section className="py-10 md:py-24 px-5 sm:px-6 border-t border-gray-100">
        <div className="max-w-[600px] mx-auto">
          <FadeIn>
            <span className="font-sans text-xs sm:text-sm font-medium text-quill-500 uppercase tracking-[0.25em]">
              Send a Message
            </span>
            <div className="mt-8">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* § 4 — Company Information */}
      <section className="py-10 md:py-16 px-5 sm:px-6">
        <FadeIn>
          <div className="max-w-[500px] mx-auto bg-gray-50 rounded-lg py-8 md:py-10 px-8 text-center">
            <div className="space-y-1 font-sans text-sm text-gray-500">
              <p>Apotheosis of Knowledge Limited</p>
              <p>RC 1956161</p>
              <p>Lagos, Nigeria</p>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
              {SOCIAL_LINKS.map((link, i) => (
                <span key={link.name} className="flex items-center gap-3">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-gray-500 hover:text-[#00008B] transition-colors"
                  >
                    {link.name}
                  </a>
                  {i < SOCIAL_LINKS.length - 1 && (
                    <span className="text-gray-300" aria-hidden="true">
                      &middot;
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* § 5 — Closing */}
      <section className="py-10 md:py-16 px-5 sm:px-6 border-t border-gray-100">
        <FadeIn>
          <p className="font-serif italic text-lg text-gray-500 text-center max-w-xl mx-auto">
            Knowledge deserves better. So does your attention.
          </p>
        </FadeIn>
      </section>
    </main>
  );
}
