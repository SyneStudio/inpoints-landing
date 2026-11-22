"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Un fil cyan sous la barre de navigation, qui mesure la page parcourue. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-16 z-50 h-px origin-left bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-soft)]"
    />
  );
}
