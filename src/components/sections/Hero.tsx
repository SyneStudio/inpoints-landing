"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CalendarCheck, Check, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonEl } from "@/components/ui/Button";
import { DemoBooking } from "@/components/demo/DemoBooking";
import { siteConfig } from "@/lib/site";
import { VideoDialog } from "@/components/ui/VideoDialog";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { DashboardShot } from "@/components/mockups/DashboardShot";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useT } from "@/lib/i18n/provider";

/**
 * L'accueil : la phrase de bienvenue, la promesse (moins de paperasse, plus
 * de sport), ce qui distingue le logiciel, et deux gestes — réserver une
 * démonstration ou regarder la vidéo. À droite, le tableau de bord de
 * l'application s'incline en suivant la souris.
 */
export function Hero() {
  const t = useT();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [video, setVideo] = useState(false);
  const [booking, setBooking] = useState(false);

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
          {/* Le message */}
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-hero"
            >
              {t.hero.titleA}
              <span className="text-gradient">{t.hero.titleHl}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="text-lead mt-6 max-w-xl"
            >
              {t.hero.lead}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-6 space-y-2.5"
            >
              {t.hero.values.map((v) => (
                <li key={v} className="flex items-start gap-3 text-[15px] font-medium">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary-soft)]">
                    <Check size={12} aria-hidden />
                  </span>
                  {v}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <ButtonEl type="button" variant="primary" size="lg" className="whitespace-nowrap" onClick={() => setBooking(true)}>
                <CalendarCheck size={17} aria-hidden />
                {t.hero.ctaPrimary}
              </ButtonEl>
              <ButtonEl type="button" variant="secondary" size="lg" className="whitespace-nowrap" onClick={() => setVideo(true)}>
                <PlayCircle size={17} aria-hidden />
                {t.hero.ctaSecondary}
              </ButtonEl>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 text-sm text-[var(--color-faint)]"
            >
              {t.hero.siblingA}
              <a
                href={siteConfig.siblingUrl}
                className="font-semibold text-[var(--color-primary-soft)] underline-offset-4 hover:underline"
              >
                {siteConfig.siblingName}
              </a>
              {t.hero.siblingB}
            </motion.p>

            <DemoBooking open={booking} onClose={() => setBooking(false)} />
            <VideoDialog
              open={video}
              onClose={() => setVideo(false)}
              src="/video/presentation-inpoints.mp4"
              title={t.hero.videoTitle}
              closeLabel={t.hero.videoClose}
            />
          </div>

          {/* L'écran incliné */}
          <HeroConsole
            ref={ref}
            onMove={onMove}
            onLeave={onLeave}
            rx={rx}
            ry={ry}
            alt={t.app.screens.dashboard}
          />
        </div>
      </Container>
    </section>
  );
}

function HeroConsole({
  ref,
  onMove,
  onLeave,
  rx,
  ry,
  alt,
}: {
  ref: React.Ref<HTMLDivElement>;
  alt: string;
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
        {/* l'ombre au sol */}
        <div className="absolute -inset-x-6 -bottom-8 h-16 rounded-full bg-black/40 blur-2xl" />
        <div className="shadow-card relative w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] edge-light">
          <DashboardShot alt={alt} eager sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </motion.div>
    </motion.div>
  );
}
