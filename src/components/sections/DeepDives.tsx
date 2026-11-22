"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { StaticImageData } from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Highlight } from "@/components/ui/Highlight";
import { Kicker } from "@/components/ui/Kicker";
import { AppShot } from "@/components/ui/AppShot";
import draws from "@/assets/app/draws.webp";
import { RegistrationsShot } from "@/components/mockups/RegistrationsShot";
import matches from "@/assets/app/matches-top.webp";
import zoomPool from "@/assets/app/zoom-pool.webp";
import zoomLink from "@/assets/app/zoom-link.webp";
import zoomMatch from "@/assets/app/zoom-match.webp";
import { ScoreboardMockup } from "@/components/mockups/ScoreboardMockup";
import { LiveMockup, PhoneFrame } from "@/components/mockups/LiveMockup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

const shotSizes = "(min-width: 1024px) 55vw, 100vw";

/**
 * Les quatre outils primordiaux, en quatre grands blocs qui alternent le côté
 * du visuel. Les visuels sont des captures de l'application, telles quelles ;
 * seul le direct garde sa maquette, en attendant la sienne.
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
            <Spotlight zoom={zoomPool} className="right-0 -bottom-12 w-[82%] sm:w-[62%] lg:-right-8">
              <AppShot src={draws} alt={d.bracket.kicker} sizes={shotSizes} />
            </Spotlight>
          </Block>

          <Block id="inscriptions" index="02" copy={d.registration} side="right">
            <Spotlight zoom={zoomLink} className="right-0 -bottom-10 w-[46%] sm:w-[36%] lg:-right-8">
              <RegistrationsShot alt={d.registration.kicker} sizes={shotSizes} />
            </Spotlight>
          </Block>

          <Block id="arbitrage" index="03" copy={d.scoring} side="left">
            <Spotlight zoom={zoomMatch} className="right-0 -bottom-12 w-[92%] sm:w-[78%] lg:-right-8">
              <AppShot src={matches} alt={d.scoring.kicker} sizes={shotSizes} />
            </Spotlight>
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

/**
 * L'écran entier, et par-dessus, agrandie, la partie qui porte la
 * fonctionnalité : un morceau de la même capture, à une taille où il se lit.
 */
function Spotlight({
  zoom,
  className,
  children,
}: {
  zoom: StaticImageData;
  /** Place et largeur du zoom, relatives au cadre. */
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative mb-12">
      <Frame>{children}</Frame>
      <div className={cn("absolute", className)}>
        <Reveal delay={0.2}>
          <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--color-primary)]/60 bg-[#0e1626] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.75),0_0_0_6px_rgba(59,108,255,0.10)]">
            <AppShot src={zoom} alt="" sizes="(min-width: 1024px) 40vw, 80vw" />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Frame({
  aspect,
  className,
  children,
}: {
  /** Absent pour une capture : c'est l'image qui donne sa hauteur au cadre. */
  aspect?: string;
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
