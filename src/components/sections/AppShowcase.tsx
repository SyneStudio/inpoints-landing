"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ShieldCheck, ScrollText, WifiOff, Server, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Highlight } from "@/components/ui/Highlight";
import { ConsoleMockup } from "@/components/mockups/ConsoleMockup";
import { ParticipantsMockup } from "@/components/mockups/ParticipantsMockup";
import { BracketMockup } from "@/components/mockups/BracketMockup";
import { PlanningMockup } from "@/components/mockups/PlanningMockup";
import { ScoringMockup } from "@/components/mockups/ScoringMockup";
import { ResultsMockup } from "@/components/mockups/ResultsMockup";
import { ScoreboardMockup } from "@/components/mockups/ScoreboardMockup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

const trustIcons: LucideIcon[] = [ShieldCheck, ScrollText, WifiOff, Server];

/**
 * L'application dans son ensemble. Sept écrans, posés dans l'espace comme sur
 * une table : la console au centre, et de part et d'autre, en léger retrait,
 * ce qui la nourrit et ce qu'elle produit. Au défilement, les ailes s'ouvrent
 * et le centre s'avance — on entre dans le logiciel, on ne le feuillette pas.
 *
 * Sous 1024 px, la table devient une piste horizontale à crans : même écrans,
 * même ordre, un par vue.
 */
export function AppShowcase() {
  const t = useT();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });
  const leftX = useTransform(p, [0, 1], reduced ? [0, 0] : [140, 0]);
  const rightX = useTransform(p, [0, 1], reduced ? [0, 0] : [-140, 0]);
  const wingsOpacity = useTransform(p, [0.2, 1], reduced ? [1, 1] : [0, 1]);
  const centerScale = useTransform(p, [0, 1], reduced ? [1, 1] : [0.9, 1]);
  const centerY = useTransform(p, [0, 1], reduced ? [0, 0] : [40, 0]);

  const s = t.app.screens;

  return (
    <Section id="application" className="overflow-hidden">
      <Container size="wide">
        <SectionTitle
          align="center"
          kicker={t.app.kicker}
          title={
            <>
              {t.app.titleA}
              <Highlight>{t.app.titleHl}</Highlight>
            </>
          }
          lead={t.app.lead}
        />
      </Container>

      {/* La table, à partir de 1024 px */}
      <div ref={ref} className="relative mx-auto mt-16 hidden max-w-[1500px] px-8 lg:block">
        <div className="brand-glow pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70" />
        <div className="relative grid grid-cols-[1.1fr_1.45fr_1.1fr] items-center gap-6 [perspective:2200px]">
          {/* Aile gauche : ce qui nourrit la journée */}
          <motion.div
            style={{ x: leftX, opacity: wingsOpacity, rotateY: 16, transformStyle: "preserve-3d" }}
            className="space-y-6 origin-right"
          >
            <Screen label={s.participants} aspect="aspect-[16/11]">
              <ParticipantsMockup className="h-full" />
            </Screen>
            <Screen label={s.planning} aspect="aspect-[16/11]">
              <PlanningMockup className="h-full" />
            </Screen>
          </motion.div>

          {/* Le centre : l'écran géant derrière, la console devant, la
              console d'arbitrage qui déborde en bas */}
          <motion.div style={{ scale: centerScale, y: centerY }} className="relative z-10 pt-16 pb-20">
            <div className="absolute inset-x-[12%] top-0 z-0">
              <Screen label={s.scoreboard} aspect="aspect-[16/7]" className="bg-[var(--color-surface)] p-1.5 opacity-90">
                <div className="h-full overflow-hidden rounded-[6px]">
                  <ScoreboardMockup className="h-full" />
                </div>
              </Screen>
            </div>
            <div className="relative z-10">
              <Screen label={s.console} aspect="aspect-[16/11]" className="shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
                <ConsoleMockup className="h-full" />
              </Screen>
            </div>
            <div className="absolute inset-x-[18%] bottom-0 z-20">
              <Screen label={s.scoring} aspect="aspect-[16/7]" className="rounded-[18px] border-[4px] border-[#06090f]">
                <ScoringMockup className="h-full rounded-[12px]" />
              </Screen>
            </div>
          </motion.div>

          {/* Aile droite : ce que la journée produit */}
          <motion.div
            style={{ x: rightX, opacity: wingsOpacity, rotateY: -16, transformStyle: "preserve-3d" }}
            className="space-y-6 origin-left"
          >
            <Screen label={s.draws} aspect="aspect-[16/11]">
              <BracketMockup className="h-full" />
            </Screen>
            <Screen label={s.results} aspect="aspect-[16/11]">
              <ResultsMockup className="h-full" />
            </Screen>
          </motion.div>
        </div>
      </div>

      {/* La piste, sous 1024 px */}
      <div className="mt-12 lg:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { label: s.console, node: <ConsoleMockup className="h-full" /> },
            { label: s.participants, node: <ParticipantsMockup className="h-full" /> },
            { label: s.draws, node: <BracketMockup className="h-full" /> },
            { label: s.planning, node: <PlanningMockup className="h-full" /> },
            { label: s.scoring, node: <ScoringMockup className="h-full" /> },
            { label: s.results, node: <ResultsMockup className="h-full" /> },
          ].map((item) => (
            <div key={item.label} className="w-[82vw] max-w-[560px] shrink-0 snap-center sm:w-[70vw]">
              <Screen label={item.label} aspect="aspect-[16/11]">
                {item.node}
              </Screen>
            </div>
          ))}
        </div>
      </div>

      {/* Ce qui tient tout cela : quatre garanties, en une ligne */}
      <Container size="wide">
        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {t.app.trust.map((item, i) => {
            const Icon = trustIcons[i];
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="flex h-full gap-3.5 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-surface)]/60 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--radius)] border border-[var(--color-line-strong)] bg-[var(--color-bg)] text-[var(--color-primary-soft)]">
                    <Icon size={16} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">{item.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-muted)]">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function Screen({
  label,
  aspect,
  className,
  children,
}: {
  label: string;
  aspect: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <div
        className={cn(
          "shadow-card relative w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] edge-light transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1",
          aspect,
          className,
        )}
      >
        {children}
      </div>
      <span className="absolute -bottom-3 left-4 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-bg)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
        {label}
      </span>
    </div>
  );
}
