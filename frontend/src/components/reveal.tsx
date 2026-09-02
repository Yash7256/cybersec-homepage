/**
 * Reveal — subtle fade-up when the block scrolls into view.
 * Single trigger per mount (once: true). Respects prefers-reduced-motion
 * by skipping the animation entirely and showing content immediately.
 */

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
