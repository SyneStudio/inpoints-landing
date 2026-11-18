"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ConsoleMockup } from "@/components/mockups/ConsoleMockup";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Le hero. Le message tient en une phrase, et l'image est la console du jour,
 * posée à plat. Deux cartes seulement s'y accrochent, chacune sur un coin :
 * un score qui tombe, une inscription validée. Aucun halo, aucune
 * inclinaison : un fond uni, des filets, et le produit.
 */
export function Hero() {
  const t = useT();

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:min-h-[100svh] lg:pt-40 lg:pb-24"
    >
      <Container size="wide" className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          {/* Le message */}
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-display"
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
              className="mt-9 flex flex-col gap-3 sm:flex-row"
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

            {/* Les sept mots de la compétition : une ligne, pas des pastilles */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--color-line)] pt-5"
              aria-label={t.nav.features}
            >
              {t.hero.keywords.map((k) => (
                <li
                  key={k}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-faint)]"
                >
                  {k}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* La scène */}
          <HeroStage />
        </div>
      </Container>
    </section>
  );
}

function HeroStage() {
  const t = useT();
  const c = t.hero.cards;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.25, ease: EASE }}
      className="relative mx-auto w-full max-w-[640px] px-4 py-8 sm:px-10 sm:py-10 lg:max-w-none"
    >
      {/* La console */}
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)]">
        <ConsoleMockup className="h-full" />
      </div>

      {/* Un score qui tombe — posé sur le coin bas-gauche, hors du contenu */}
      <Floating className="bottom-0 left-0 w-[46%] sm:bottom-3 sm:left-2 sm:w-[32%]" delay={0.15}>
        <MiniScore round={c.score.round} live={c.score.live} />
      </Floating>

      {/* Une inscription validée — sur le coin haut-droit */}
      <Floating className="right-0 top-2 w-[54%] sm:right-2 sm:top-4 sm:w-[34%]" delay={0.3}>
        <Chip
          icon={<Check size={13} />}
          title={c.registration.title}
          sub={c.registration.sub}
        />
      </Floating>
    </motion.div>
  );
}

/** Une carte posée sur la scène : elle entre, puis ne bouge plus. */
function Floating({
  className,
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={cn("absolute", className)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 + delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function MiniScore({ round, live }: { round: string; live: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-surface)] p-3">
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
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-surface)] p-2.5">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--color-primary)] text-white">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[10px] font-bold">{title}</span>
        <span className="block truncate text-[9px] text-[var(--color-faint)]">{sub}</span>
      </span>
    </div>
  );
}
