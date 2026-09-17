import { STUDIO_SERVICES } from '@/data/studio/services';
import { StartBriefButton } from '../enquiry/enquiry-provider';
import { ParticleMark } from '../particle/particle-mark';
import { accentButton } from '../ui/buttons';
import { LagosClockInline } from './lagos-clock-inline';

const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com/apotheosisofknowledge' },
  { label: 'TikTok', href: 'https://tiktok.com/@apotheosisofknowledge' },
  { label: 'Facebook', href: 'https://facebook.com/apotheosisofknowledge' },
  { label: 'X', href: 'https://x.com/aok_ltd' },
];

// Padded to comfortable touch targets without changing the visual rhythm.
const link = 'inline-block py-2 underline-offset-4 hover:underline';

/**
 * StudioFooter — a full-height closing panel. The AOK mark assembles from
 * scattered particles as it scrolls into view; the cursor disturbs it and
 * it settles again.
 */
export function StudioFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden rounded-[28px] bg-[var(--studio-card)] px-5 py-5 lg:px-8 lg:py-7">
        <div className="flex items-start justify-between gap-6 font-sans text-sm lg:text-[15px]">
          <p>Elevating curiosity. Countering noise.</p>
          <LagosClockInline />
        </div>

        <ParticleMark className="my-6 min-h-[300px] flex-1 lg:min-h-[440px]" />

        <div className="grid gap-6 font-sans text-sm lg:grid-cols-12 lg:items-end lg:gap-8 lg:text-[15px]">
          {/* The services are named, not linked: they live on this page. */}
          <ul aria-label="What the studio does" className="flex flex-wrap gap-x-5 gap-y-2 lg:col-span-6">
            {STUDIO_SERVICES.map((service) => (
              <li key={service.slug} className="py-2 text-[var(--studio-ink-soft)]">
                {service.name}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 lg:col-span-6 lg:justify-end">
            <StartBriefButton className={accentButton}>Start a brief</StartBriefButton>
            <a href="mailto:hello@aokltd.org" className={link}>
              hello@aokltd.org
            </a>
            {SOCIAL.map((item) => (
              // min-w-11: "X" is a single letter, too narrow to tap on its own.
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link} min-w-11 text-center`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <p className="text-[var(--studio-ink-soft)] lg:col-span-12">
            © {year} Apotheosis of Knowledge Limited · RC 1956161 · Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
