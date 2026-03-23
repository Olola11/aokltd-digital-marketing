'use client';

import { useScroll, motion } from 'framer-motion';

export function ArticleProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 h-0.5 bg-quill-500 origin-left z-40"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
