'use client';

import { motion } from 'framer-motion';

/**
 * LegalMatte — Dark textured card with legal metadata.
 *
 * Features high-contrast typography pairing:
 * - Monospace for labels (technical, institutional)
 * - Serif for values (dignified, readable)
 * - "Gold Foil" gradient text for company name
 */
export function LegalMatte() {
  return (
    <section className="relative py-12 md:py-28 px-4 sm:px-6 bg-navy-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 md:p-12 rounded-2xl bg-navy-800 border border-white/[0.04] overflow-hidden"
        >
          {/* Textured background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Decorative corner flourishes */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-gold-500/20 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-gold-500/20 rounded-br-2xl" />

          {/* Content */}
          <div className="relative z-10">
            {/* Company name with gold foil effect */}
            <div className="text-center mb-12">
              <p className="text-xs font-sans text-navy-500 uppercase tracking-[0.3em] mb-4">
                Registered Entity
              </p>
              <h2
                className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                style={{
                  background:
                    'linear-gradient(135deg, #D4A84B 0%, #F0C96B 25%, #D4A84B 50%, #E4B85B 75%, #D4A84B 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3s ease-in-out infinite',
                }}
              >
                APOTHEOSIS OF KNOWLEDGE LIMITED
              </h2>
            </div>

            {/* Legal metadata grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
              <LegalField
                label="Registration Number"
                value="RC 1956161"
                sublabel="CAC Registry"
              />
              <LegalField
                label="Tax Identification"
                value="31050803-0001"
                sublabel="FIRS Registry"
              />
              <LegalField
                label="Date of Incorporation"
                value="27 July 2022"
                sublabel="Certificate Date"
              />
              <LegalField
                label="Entity Type"
                value="Limited Company"
                sublabel="Private Limited"
              />
            </div>

            {/* Divider */}
            <div className="my-10 h-px bg-gradient-to-r from-transparent via-navy-600 to-transparent" />

            {/* Registered address */}
            <div className="text-center">
              <p className="text-xs font-sans text-navy-500 uppercase tracking-[0.2em] mb-3">
                Registered Office
              </p>
              <p className="font-serif text-lg text-navy-200">
                Federal Republic of Nigeria
              </p>
            </div>
          </div>
        </motion.div>

        {/* Legal disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-xs text-navy-500 mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          This information is provided for verification purposes. Apotheosis of
          Knowledge Limited maintains full compliance with the Companies and
          Allied Matters Act (CAMA) 2020 and all applicable Nigerian corporate
          law.
        </motion.p>
      </div>

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * LegalField — Individual metadata field with label/value pairing.
 */
function LegalField({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-sans text-navy-500 uppercase tracking-[0.2em] mb-1">
        {label}
      </p>
      <p className="font-serif text-xl md:text-2xl text-navy-100 font-medium mb-1">
        {value}
      </p>
      <p className="text-xs text-navy-500">{sublabel}</p>
    </div>
  );
}
