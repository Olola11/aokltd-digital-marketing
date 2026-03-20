'use client';

import { motion } from 'framer-motion';

export function ScrollCue() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <span className="font-sans text-[9px] sm:text-[10px] text-[#00008B]/25 tracking-[0.3em]">
        SCROLL
      </span>
      <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-[#00008B]/20 to-transparent" />
    </motion.div>
  );
}
