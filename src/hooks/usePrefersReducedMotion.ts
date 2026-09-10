"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Returns true when the user has requested reduced motion.
 * Used to disable heavy 3D / large animations for accessibility & performance.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
