"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ArrowDown, Check, Medal } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { ConsoleMockup } from "@/components/mockups/ConsoleMockup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Le hero. Le message tient en une phrase, et l'image n'est pas une capture
 * posée au milieu de la page : c'est la console du jour, inclinée dans
 * l'espace, entourée des quatre moments qu'elle relie — un tableau, un score
 * qui tombe, une inscription validée, des résultats publiés. Les cartes
 * flottent à des profondeurs différentes et suivent la souris, chacune à son
 * rythme ; sous « réduire les animations », tout se pose et reste lisible.
 */
export function Hero() {
  const t = useT();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 90, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 90, damping: 20 });

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
      className="relative overflow-hidden pt-28 pb-14 sm:pt-32 lg:min-h-[100svh] lg:pt-36 lg:pb-20"
    >
      <HeroBackground />
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_50%_35%,black,transparent_70%)]" />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          {/* Le message */}
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-display text-gradient pb-1"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
              className="text-lead mt-6 max-w-xl"
            >
              {t.hero.lead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="#devis" variant="primary" size="lg">
                {t.hero.ctaPrimary}
                <ArrowRight size={17} aria-hidden />
              </Button>
              <Button href="#sports" variant="secondary" size="lg">
                {t.hero.ctaSecondary}
                <ArrowDown size={17} aria-hidden />
              </Button>
            </motion.div>

            {/* Les sept mots de la compétition */}
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } } }}
              className="mt-10 flex flex-wrap gap-2"
              aria-label={t.nav.features}
            >
              {t.hero.keywords.map((k) => (
                <motion.li
                  key={k}
                  variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)] backdrop-blur-sm"
                >
                  {k}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* La scène */}
          <HeroStage ref={ref} onMove={onMove} onLeave={onLeave} rx={rx} ry={ry} reduced={reduced} />
        </div>
      </Container>
    </section>
  );
}

function HeroStage({
  ref,
  onMove,
  onLeave,
  rx,
  ry,
  reduced,
}: {
  ref: React.Ref<HTMLDivElement>;
  onMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onLeave: () => void;
  rx: MotionValue<number>;
  ry: MotionValue<number>;
  reduced: boolean;
}) {
  const t = useT();
  const c = t.hero.cards;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.25, ease: EASE }}
      className="relative mx-auto w-full max-w-[640px] [perspective:1800px] lg:max-w-none"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative px-4 py-8 sm:px-10 sm:py-10"
      >
        {/* Le sol : une ombre douce sous la scène */}
        <div className="absolute inset-x-10 -bottom-2 h-20 rounded-full bg-black/50 blur-3xl" />

        {/* La console, inclinée dans l'espace */}
        <div className="shadow-card relative aspect-[16/11] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] edge-light">
          <ConsoleMockup className="h-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.03]" />
        </div>

        {/* Un tableau qui avance */}
        <Floating depth={70} className="hidden sm:block sm:-left-3 sm:top-1 sm:w-[38%]" reduced={reduced} period={7}>
          <MiniBracket title={c.bracket.title} sub={c.bracket.sub} />
        </Floating>

        {/* Un score qui tombe */}
        <Floating depth={90} className="-bottom-1 left-0 w-[50%] sm:-left-6 sm:-bottom-1 sm:w-[40%]" reduced={reduced} period={8.5} delay={0.6}>
          <MiniScore round={c.score.round} live={c.score.live} />
        </Floating>

        {/* Une inscription validée */}
        <Floating depth={50} className="-right-1 top-1 w-[56%] sm:-right-8 sm:top-[22%] sm:w-[36%]" reduced={reduced} period={9} delay={0.3}>
          <Chip
            icon={<Check size={13} />}
            tone="success"
            title={c.registration.title}
            sub={c.registration.sub}
          />
        </Floating>

        {/* Des résultats publiés */}
        <Floating depth={110} className="hidden sm:block sm:-right-5 sm:bottom-3 sm:w-[34%]" reduced={reduced} period={7.5} delay={1}>
          <Chip
            icon={<Medal size={13} />}
            tone="accent"
            title={c.results.title}
            sub={c.results.sub}
          />
        </Floating>
      </motion.div>
    </motion.div>
  );
}

/** Une carte qui flotte à une profondeur donnée, et respire lentement. */
function Floating({
  depth,
  className,
  reduced,
  period,
  delay = 0,
  children,
}: {
  depth: number;
  className?: string;
  reduced: boolean;
  period: number;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={cn("absolute", className)}
      style={{ transform: `translateZ(${depth}px)`, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.7 + delay, ease: EASE }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: period, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function MiniBracket({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="shadow-card rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-surface)]/95 p-3 backdrop-blur-md edge-light">
      <p className="text-[10px] font-bold">{title}</p>
      <p className="text-[9px] text-[var(--color-faint)]">{sub}</p>
      <div className="mt-2.5 grid grid-cols-[1fr_14px_1fr] items-center gap-1">
        <div className="space-y-1">
          <Row name="M. Laurent" score="5" win corner="red" />
          <Row name="L. Petit" score="2" corner="blue" />
        </div>
        <svg viewBox="0 0 14 40" className="h-10 w-3.5 text-[var(--color-line-strong)]" aria-hidden>
          <path d="M0 8 H7 V32 H0 M7 20 H14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <div className="rounded-md border border-[var(--color-primary)]/50 bg-[var(--color-primary)]/10 px-2 py-1.5 text-[9.5px] font-semibold text-[var(--color-primary-soft)]">
          M. Laurent
        </div>
      </div>
    </div>
  );
}

function Row({
  name,
  score,
  win,
  corner,
}: {
  name: string;
  score: string;
  win?: boolean;
  corner: "red" | "blue";
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-md border border-[var(--color-line)] bg-[var(--color-bg)] px-2 py-1">
      <span className="flex min-w-0 items-center gap-1.5">
        <span
          className={cn(
            "h-2.5 w-0.5 shrink-0 rounded-full",
            corner === "red" ? "bg-[var(--color-corner-red)]" : "bg-[var(--color-corner-blue)]",
          )}
        />
        <span className={cn("truncate text-[9.5px]", win ? "font-semibold" : "text-[var(--color-muted)]")}>
          {name}
        </span>
      </span>
      <span className={cn("font-mono text-[10px]", win ? "font-bold text-[var(--color-primary-soft)]" : "text-[var(--color-faint)]")}>
        {score}
      </span>
    </div>
  );
}

function MiniScore({ round, live }: { round: string; live: string }) {
  return (
    <div className="shadow-card rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-surface)]/95 p-3 backdrop-blur-md edge-light">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[var(--color-primary-soft)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-primary-soft)]" />
          {live}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-faint)]">{round}</span>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <span className="font-display text-[34px] font-extrabold leading-none text-[var(--color-corner-red)]">4</span>
        <span className="font-mono text-[11px] text-[var(--color-faint)]">01:52</span>
        <span className="text-right font-display text-[34px] font-extrabold leading-none text-[var(--color-corner-blue)]">2</span>
      </div>
      <div className="mt-1.5 flex justify-between text-[9px] text-[var(--color-muted)]">
        <span className="truncate">M. Laurent</span>
        <span className="truncate text-right">A. Costa</span>
      </div>
    </div>
  );
}

function Chip({
  icon,
  tone,
  title,
  sub,
}: {
  icon: React.ReactNode;
  tone: "success" | "accent";
  title: string;
  sub: string;
}) {
  return (
    <div className="shadow-card flex items-center gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-surface)]/95 p-2.5 backdrop-blur-md edge-light">
      <span
        className={cn(
          "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
          tone === "success"
            ? "bg-[var(--color-success)]/15 text-[var(--color-success)]"
            : "bg-[var(--color-primary)]/15 text-[var(--color-primary-soft)]",
        )}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[10px] font-bold">{title}</span>
        <span className="block truncate text-[9px] text-[var(--color-faint)]">{sub}</span>
      </span>
    </div>
  );
}
