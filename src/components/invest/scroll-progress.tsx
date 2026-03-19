'use client';

import { motion, useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 z-40 h-[2px] bg-quill-500 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
