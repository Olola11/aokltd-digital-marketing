'use client';

import { useEffect, useState, useRef } from 'react';
import { useMounted } from '@/hooks/useMediaQuery';
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import {
  ShieldCheck,
  Clock,
  Building2,
  FileCheck,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

// Incorporation date
const INCORPORATION_DATE = new Date('2022-07-27T00:00:00Z');

/**
 * CredentialVerification — "System Check" dashboard with theatrical animations.
 *
 * Features:
 * - RC Number: Slot machine counter that spins up before settling
 * - Days Active: Live uptime counter since incorporation
 * - Status Bar: Stepped verification sequence (purely theatrical)
 */
export function CredentialVerification() {
  return (
    <section className="relative py-12 md:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-16"
        >
          <p className="text-sm font-medium text-blue-400 uppercase tracking-[0.2em] mb-3">
            Verification Protocol
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-navy-100 tracking-tight">
            System Authentication
          </h2>
        </motion.div>

        {/* Verification grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
          <RCNumberCard />
          <TINCard />
          <UptimeCard />
          <JurisdictionCard />
        </div>

        {/* Status bar */}
        <StatusVerificationBar />
      </div>
    </section>
  );
}

/**
 * RCNumberCard — Slot machine counter animation for RC number.
 */
function RCNumberCard() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const displayValue = useMotionValue(0);
  const springValue = useSpring(displayValue, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });
  const rounded = useTransform(springValue, (v) =>
    Math.round(v).toString().padStart(7, '0')
  );

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Slot machine effect: spin through random numbers then settle
          const controls = animate(displayValue, 1956161, {
            duration: 2.5,
            ease: [0.32, 0.72, 0, 1],
            onUpdate: (v) => {
              // Add "slot machine" noise in the first half
              if (v < 1000000) {
                displayValue.set(Math.random() * 9999999);
              }
            },
          });

          // After initial chaos, animate to final value
          setTimeout(() => {
            animate(displayValue, 1956161, {
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            });
          }, 800);

          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [hasAnimated, displayValue]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="relative p-6 md:p-8 rounded-xl bg-navy-800/40 border border-white/[0.06] backdrop-blur-sm overflow-hidden"
    >
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-gold-500/10">
          <FileCheck className="w-6 h-6 text-gold-500" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-sans text-navy-500 uppercase tracking-[0.15em] mb-2">
            RC Number
          </p>
          <motion.p className="font-sans text-3xl md:text-4xl font-bold text-navy-100 tracking-wider">
            {rounded}
          </motion.p>
          <p className="text-sm text-navy-400 mt-2">
            Corporate Affairs Commission
          </p>
        </div>
      </div>

      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-sans text-emerald-500 uppercase">
          Verified
        </span>
      </div>
    </motion.div>
  );
}

/**
 * TINCard — Tax Identification Number display.
 */
function TINCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative p-6 md:p-8 rounded-xl bg-navy-800/40 border border-white/[0.06] backdrop-blur-sm"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-blue-500/10">
          <Building2 className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-sans text-navy-500 uppercase tracking-[0.15em] mb-2">
            Tax Identification
          </p>
          <p className="font-sans text-3xl md:text-4xl font-bold text-navy-100 tracking-wider">
            31050803-0001
          </p>
          <p className="text-sm text-navy-400 mt-2">
            Federal Inland Revenue Service
          </p>
        </div>
      </div>

      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-sans text-emerald-500 uppercase">
          Active
        </span>
      </div>
    </motion.div>
  );
}

/**
 * UptimeCard — Live counter of days since incorporation.
 */
function UptimeCard() {
  const mounted = useMounted();

  const calculateDays = () => {
    const now = new Date();
    const diff = now.getTime() - INCORPORATION_DATE.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const [daysActive, setDaysActive] = useState(calculateDays);

  useEffect(() => {
    // Update every minute to catch day changes
    const interval = setInterval(() => {
      setDaysActive(calculateDays());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const displayDays = useSpring(useMotionValue(0), {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    if (mounted && daysActive > 0) {
      animate(displayDays, daysActive, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
      });
    }
  }, [mounted, daysActive, displayDays]);

  const formattedDays = useTransform(displayDays, (v) =>
    Math.round(v).toLocaleString()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative p-6 md:p-8 rounded-xl bg-navy-800/40 border border-white/[0.06] backdrop-blur-sm"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-emerald-500/10">
          <Clock className="w-6 h-6 text-emerald-500" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-sans text-navy-500 uppercase tracking-[0.15em] mb-2">
            Operational Uptime
          </p>
          <div className="flex items-baseline gap-2">
            <motion.p className="font-sans text-3xl md:text-4xl font-bold text-navy-100 tracking-wider">
              {formattedDays}
            </motion.p>
            <span className="text-lg text-navy-400 font-sans">days</span>
          </div>
          <p className="text-sm text-navy-400 mt-2">Since July 27, 2022</p>
        </div>
      </div>

      {/* Live indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <motion.span
          className="w-2 h-2 rounded-full bg-emerald-500"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-[10px] font-sans text-emerald-500 uppercase">
          Live
        </span>
      </div>
    </motion.div>
  );
}

/**
 * JurisdictionCard — Jurisdiction and registration authority.
 */
function JurisdictionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative p-6 md:p-8 rounded-xl bg-navy-800/40 border border-white/[0.06] backdrop-blur-sm"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-purple-500/10">
          <ShieldCheck className="w-6 h-6 text-purple-500" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-sans text-navy-500 uppercase tracking-[0.15em] mb-2">
            Jurisdiction
          </p>
          <p className="font-sans text-2xl md:text-3xl font-bold text-navy-100">
            Federal Republic of Nigeria
          </p>
          <p className="text-sm text-navy-400 mt-2">
            Companies and Allied Matters Act
          </p>
        </div>
      </div>

      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="text-[10px] font-sans text-emerald-500 uppercase">
          Compliant
        </span>
      </div>
    </motion.div>
  );
}

/**
 * StatusVerificationBar — Theatrical stepped verification sequence.
 */
const VERIFICATION_STEPS = [
  { label: 'Initializing secure connection...', duration: 800 },
  { label: 'Handshaking with CAC database...', duration: 1200 },
  { label: 'Verifying RC 1956161...', duration: 1000 },
  { label: 'Cross-referencing TIN records...', duration: 900 },
  { label: 'Validating incorporation date...', duration: 700 },
  { label: 'Authentication complete', duration: 0 },
];

function StatusVerificationBar() {
  const [step, setStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const steps = VERIFICATION_STEPS;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const advanceStep = () => {
      setStep((prev) => {
        if (prev < steps.length - 1) {
          setTimeout(advanceStep, steps[prev + 1].duration);
          return prev + 1;
        }
        return prev;
      });
    };

    setTimeout(advanceStep, steps[0].duration);
  }, [hasStarted, steps]);

  const progress = ((step + 1) / steps.length) * 100;
  const isComplete = step === steps.length - 1;

  return (
    <motion.div
      ref={barRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="p-6 rounded-xl bg-navy-800/30 border border-white/[0.04]"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {isComplete ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
          )}
          <span
            className={`text-sm font-sans ${isComplete ? 'text-emerald-500' : 'text-navy-300'}`}
          >
            {steps[step].label}
          </span>
        </div>
        <span className="text-xs font-sans text-navy-500">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-600 to-blue-400'}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-3">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              i <= step
                ? isComplete
                  ? 'bg-emerald-500'
                  : 'bg-blue-500'
                : 'bg-navy-600'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
