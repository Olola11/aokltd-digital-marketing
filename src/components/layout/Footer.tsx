import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  explore: [
    { label: 'Vault', href: '/vault' },
    { label: 'Work', href: '/work' },
  ],
  about: [
    { label: 'About', href: '/about' },
    { label: 'Mission', href: '/about/mission' },
    { label: 'Contact', href: '/contact' },
  ],
  social: [
    { label: 'Facebook', href: 'https://facebook.com/apotheosisofknowledge' },
    { label: 'TikTok', href: 'https://tiktok.com/@apotheosisofknowledge' },
    { label: 'Instagram', href: 'https://instagram.com/apotheosisofknowledge' },
    { label: 'X / Twitter', href: 'https://x.com/aok_ltd' },
    { label: 'WhatsApp', href: 'https://whatsapp.com/channel/apotheosisofknowledge' },
  ],
};

/**
 * Footer — "The Modern Classic" Editorial Design
 *
 * Clean, institutional footer with Royal Blue accent on white.
 * Maintains the high-contrast editorial aesthetic.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-royal-800 border-t border-royal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo/Apotheosis of Knowledge LOGO PNG-15.png"
                alt="Apotheosis of Knowledge"
                width={40}
                height={40}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/70 mb-4">
              Elevating curiosity. Countering noise.
            </p>
            <p className="text-xs text-white/50">
              RC: 1956161 &middot; TIN: 31050803-0001
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="font-sans font-medium text-white mb-4 text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="font-sans font-medium text-white mb-4 text-sm uppercase tracking-wider">
              About
            </h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-sans font-medium text-white mb-4 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/50">
              &copy; {currentYear} Apotheosis of Knowledge Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/50">
                Incorporated in Nigeria, 2022
              </span>
              <span className="text-white/30 text-xs font-sans uppercase tracking-wider">
                Built in Lagos
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
