"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Calm, premium hero backdrop: layered brand glows that breathe slowly and
 * respond to the pointer with a gentle parallax (nearer glow moves more than
 * the deeper one → subtle 3D depth), finished with film grain + a vignette.
 * No WebGL scene — deliberately light and fully reduced-motion aware.
 */
export function HeroBackground() {
  const reduced = usePrefersReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 22 });
  const sy = useSpring(py, { stiffness: 40, damping: 22 });

  // near glow drifts more than the deeper one → parallax depth
  const nearX = useTransform(sx, (v) => v * 28);
  const nearY = useTransform(sy, (v) => v * 22);
  const farX = useTransform(sx, (v) => v * -16);
  const farY = useTransform(sy, (v) => v * -12);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, px, py]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* near brand glow — breathes + follows pointer */}
      <motion.div
        style={reduced ? undefined : { x: nearX, y: nearY }}
        animate={
          reduced ? undefined : { opacity: [0.72, 0.92, 0.72], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="brand-glow absolute left-1/2 top-1/3 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />

      {/* deeper secondary glow — parallax opposite, offset to the right */}
      <motion.div
        style={reduced ? undefined : { x: farX, y: farY }}
        className="absolute left-[70%] top-[62%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(106,169,255,0.16) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* film grain + vignette for depth */}
      <div className="grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      <div className="vignette absolute inset-0" />
    </div>
  );
}
