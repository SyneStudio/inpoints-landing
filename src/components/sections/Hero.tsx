"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "@/components/three/HeroBackground";
import { ConsoleMockup } from "@/components/mockups/ConsoleMockup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useT } from "@/lib/i18n/provider";

export function Hero() {
  const t = useT();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 18,
  });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24"
    >
      <HeroBackground />
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_50%_35%,black,transparent_70%)]" />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          {/* Copy */}
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-display"
            >
              {t.hero.titleA}
              <span className="text-gradient">{t.hero.titleHl}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="#demo" variant="primary" size="lg">
                {t.hero.ctaPrimary}
                <ArrowRight size={17} aria-hidden />
              </Button>
              <Button href="#fonctionnalites" variant="secondary" size="lg">
                <PlayCircle size={17} aria-hidden />
                {t.hero.ctaSecondary}
              </Button>
            </motion.div>
          </div>

          {/* 3D dashboard frame */}
          <HeroDashboard
            ref={ref}
            onMove={onMove}
            onLeave={onLeave}
            rx={rx}
            ry={ry}
          />
        </div>
      </Container>
    </section>
  );
}

function HeroDashboard({
  ref,
  onMove,
  onLeave,
  rx,
  ry,
}: {
  ref: React.Ref<HTMLDivElement>;
  onMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onLeave: () => void;
  rx: MotionValue<number>;
  ry: MotionValue<number>;
}) {
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative [perspective:1600px]"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* soft floor shadow */}
        <div className="absolute -inset-x-6 -bottom-8 h-16 rounded-full bg-black/40 blur-2xl" />
        <div className="shadow-card relative aspect-[16/11] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] edge-light">
          <ConsoleMockup className="h-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}
