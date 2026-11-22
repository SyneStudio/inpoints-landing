"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Highlight } from "@/components/ui/Highlight";
import { Kicker } from "@/components/ui/Kicker";
import { BracketMockup } from "@/components/mockups/BracketMockup";
import { RegistrationMockup } from "@/components/mockups/RegistrationMockup";
import { ScoringMockup } from "@/components/mockups/ScoringMockup";
import { ScoreboardMockup } from "@/components/mockups/ScoreboardMockup";
import { LiveMockup, PhoneFrame } from "@/components/mockups/LiveMockup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * Les quatre outils primordiaux, en quatre grands blocs qui alternent le côté
 * du visuel. Les maquettes sont ici à leur taille réelle de lecture — assez
 * grandes pour qu'on lise un nom, un score, une heure — parce que c'est ce
 * qu'un organisateur veut vérifier avant de demander un devis.
 */
export function DeepDives() {
  const t = useT();
  const d = t.deep;

  return (
    <Section id="fonctionnalites" band className="overflow-hidden">
      <Container size="wide">
        <SectionTitle
          align="center"
          kicker={d.kicker}
          title={
            <>
              {d.titleA}
              <Highlight>{d.titleHl}</Highlight>
            </>
          }
          lead={d.lead}
        />

        <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-36">
          <Block id="bracket" index="01" copy={d.bracket} side="left">
            <Frame aspect="aspect-[16/10]">
              <BracketMockup className="h-full" />
            </Frame>
          </Block>

          <Block id="inscriptions" index="02" copy={d.registration} side="right">
            <Frame aspect="aspect-[16/10]">
              <RegistrationMockup className="h-full" />
            </Frame>
          </Block>

          <Block id="arbitrage" index="03" copy={d.scoring} side="left">
            {/* La console sur tablette : un cadre plus épais, et rien d'autre. */}
            <Frame aspect="aspect-[4/3]" className="rounded-[26px] border-[6px] border-[#06090f] p-0 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
              <ScoringMockup className="h-full rounded-[18px]" />
            </Frame>
          </Block>

          <Block id="direct" index="04" copy={d.live} side="right">
            <div className="relative pr-[30%] pb-24 sm:pt-6 sm:pr-[22%] sm:pb-14">
              <Frame aspect="aspect-[16/9]" className="bg-[var(--color-surface)] p-2">
                <div className="h-full overflow-hidden rounded-[var(--radius)]">
                  <ScoreboardMockup className="h-full" />
                </div>
              </Frame>
              <div className="absolute bottom-0 right-0 w-[38%] sm:w-[26%]">
                <Reveal delay={0.15}>
                  <PhoneFrame>
                    <LiveMockup />
                  </PhoneFrame>
                </Reveal>
              </div>
            </div>
          </Block>
        </div>
      </Container>
    </Section>
  );
}

function Block({
  id,
  index,
  copy,
  side,
  children,
}: {
  id: string;
  index: string;
  copy: { kicker: string; title: string; text: string; points: string[] };
  side: "left" | "right";
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Le visuel monte un peu plus vite que le texte au défilement : une
  // parallaxe légère, qui donne de la profondeur sans distraire.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [36, -36]);

  return (
    <div
      id={id}
      ref={ref}
      className={cn(
        "relative grid scroll-mt-24 items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16",
        side === "right" && "lg:grid-cols-[1fr_1.25fr]",
      )}
    >
      {/* Le halo, derrière le visuel */}
      <div
        aria-hidden
        className={cn(
          "brand-glow pointer-events-none absolute top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-60",
          side === "left" ? "left-0 -translate-x-1/4" : "right-0 translate-x-1/4",
        )}
      />

      <motion.div
        style={{ y }}
        className={cn("relative", side === "right" && "lg:order-2")}
      >
        <Reveal>{children}</Reveal>
      </motion.div>

      <Reveal className={cn("relative", side === "right" && "lg:order-1")} delay={0.1}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-[var(--color-faint)]">{index}</span>
          <Kicker>{copy.kicker}</Kicker>
        </div>
        <h3 className="text-h2 mt-4">{copy.title}</h3>
        <p className="text-lead mt-5">{copy.text}</p>
        <ul className="mt-7 space-y-3">
          {copy.points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--color-fg)]">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary-soft)]">
                <Check size={12} aria-hidden />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

function Frame({
  aspect,
  className,
  children,
}: {
  aspect: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "shadow-card relative w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] edge-light",
        aspect,
        className,
      )}
    >
      {children}
    </div>
  );
}
