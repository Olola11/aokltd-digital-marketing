import { Metadata } from 'next';
import { SecurityWatermark } from '@/components/registration/SecurityWatermark';
import { ArtifactShowcase } from '@/components/registration/ArtifactShowcase';
import { CredentialVerification } from '@/components/registration/CredentialVerification';
import { LegalMatte } from '@/components/registration/LegalMatte';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

export const metadata: Metadata = {
  title: 'Registration Credentials',
  description:
    'Apotheosis of Knowledge Limited — RC 1956161. Verified credentials and certificate of incorporation from the Corporate Affairs Commission of Nigeria.',
  openGraph: {
    title: 'Registration Credentials | Apotheosis of Knowledge',
    description:
      'Institutional credentials, verification status, and certificate of incorporation for Apotheosis of Knowledge Limited.',
  },
};

/**
 * Registration Page — "The Digital Museum"
 *
 * A showcase of institutional trust, treating legal documents as museum-grade
 * artifacts. Features:
 *
 * - SecurityWatermark: Animated guilloche background with parallax
 * - Hero: Institutional identity statement
 * - ArtifactShowcase: 3D holographic certificate with glare physics
 * - CredentialVerification: System check dashboard with slot machine counters
 * - LegalMatte: Gold foil company name with legal metadata
 *
 * All animations use framer-motion for 60fps performance.
 * Touch devices receive adapted experiences (gyroscope simulation, etc.)
 */
export default function RegistrationPage() {
  return (
    <main className="relative bg-navy-950 min-h-screen">
      {/* Background layers */}
      <SecurityWatermark />
      <NoiseOverlay />

      {/* § 1 — Hero */}
      <HeroSection />

      {/* § 2 — Certificate artifact display */}
      <section className="relative py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ArtifactShowcase />
        </div>
      </section>

      {/* § 3 — Credential verification dashboard */}
      <CredentialVerification />

      {/* § 4 — Legal metadata card */}
      <LegalMatte />

      {/* § 5 — Institutional closing */}
      <InstitutionalClosing />
    </main>
  );
}

/**
 * HeroSection — Restrained institutional header.
 */
function HeroSection() {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 px-4 sm:px-6 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Security badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-800/50 border border-white/[0.06] mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-sans text-navy-400 uppercase tracking-wider">
            Verified Institution
          </span>
        </div>

        <p className="text-sm font-medium text-blue-400 uppercase tracking-[0.25em] mb-6">
          Corporate Registration
        </p>

        <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold text-navy-100 tracking-tight leading-[1.1] mb-8">
          The Digital
          <br />
          <span className="text-gold-500">Museum</span>
        </h1>

        <p className="text-lg md:text-xl text-navy-300 leading-relaxed max-w-2xl mx-auto">
          Our credentials are not just documents — they are artifacts of
          institutional trust. Explore the verified records of Apotheosis of
          Knowledge Limited.
        </p>
      </div>
    </section>
  );
}

/**
 * InstitutionalClosing — Contemplative footer with legal standing.
 */
function InstitutionalClosing() {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 bg-navy-950">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mb-12" />

        <p className="font-serif text-xl md:text-2xl text-navy-200 leading-relaxed mb-8">
          Registration is not bureaucracy. It is a declaration of
          permanence — a commitment to exist within the bounds of law and
          accountability.
        </p>

        <p className="text-navy-400 leading-relaxed mb-12">
          Apotheosis of Knowledge Limited was incorporated on the 27th day of
          July, 2022, with the Corporate Affairs Commission of the Federal
          Republic of Nigeria. We operate in full compliance with the Companies
          and Allied Matters Act (CAMA) 2020.
        </p>

        {/* Credential summary */}
        <div className="flex flex-wrap justify-center gap-4 text-xs font-sans text-navy-500 uppercase tracking-[0.15em]">
          <span>RC 1956161</span>
          <span className="text-navy-700">•</span>
          <span>TIN 31050803-0001</span>
          <span className="text-navy-700">•</span>
          <span>EST. 2022</span>
        </div>

        {/* Final border */}
        <div className="mt-16 pt-8 border-t border-navy-800">
          <p className="text-[10px] text-navy-600 uppercase tracking-[0.2em]">
            Apotheosis of Knowledge Limited — A Nigerian Institution
          </p>
        </div>
      </div>
    </section>
  );
}
