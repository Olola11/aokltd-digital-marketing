'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
