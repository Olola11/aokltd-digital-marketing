'use client';

import { ReactNode } from 'react';
import { TouchRippleProvider } from '@/components/ui/touch-ripple';

/**
 * MobilePhysicsWrapper — Combines mobile-exclusive physics features
 *
 * This wrapper provides:
 * - Touch Ripple: Ink ripples spawn at touch points globally
 *
 * These features only activate on touch devices (pointer: coarse),
 * ensuring desktop users get the standard experience while mobile
 * users get the "bespoke" signature feel.
 */

interface MobilePhysicsWrapperProps {
  children: ReactNode;
}

export function MobilePhysicsWrapper({ children }: MobilePhysicsWrapperProps) {
  return (
    <>
      {/* Global touch ripple effect (spawns at touch coordinates) */}
      <TouchRippleProvider
        color="#4A90E2" // quill-500
        maxSize={150}
        duration={600}
      />

      <main className="relative bg-white">
        {children}
      </main>
    </>
  );
}
