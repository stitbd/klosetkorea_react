import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Scroll-triggered fade/slide-in. Respects prefers-reduced-motion.
 */
const RevealSection = ({
  children,
  className = '',
  delay = 0,
  /** Fraction of element visible before animating (0–1) */
  amount = 0.18,
  /** Vertical offset in px when reduced motion is off */
  y = 32,
}) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -48px 0px' }}
      transition={{
        duration: 0.58,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default RevealSection;
