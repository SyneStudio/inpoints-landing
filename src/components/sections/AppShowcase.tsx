"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ShieldCheck, ScrollText, WifiOff, Server, type LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Highlight } from "@/components/ui/Highlight";
import { AppShot } from "@/components/ui/AppShot";
import { DashboardShot } from "@/components/mockups/DashboardShot";
import competitions from "@/assets/app/competitions.webp";
import { RegistrationsShot } from "@/components/mockups/RegistrationsShot";
import desk from "@/assets/app/desk.webp";
import organisation from "@/assets/app/organisation-top.webp";
import draws from "@/assets/app/draws.webp";
import matches from "@/assets/app/matches-top.webp";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type Kind = "dashboard" | "registrations";

const trustIcons: LucideIcon[] = [ShieldCheck, ScrollText, WifiOff, Server];

/**
 * L'application dans son ensemble, en captures réelles. Le tableau de bord au
 * centre, et de part et d'autre, en léger retrait, deux outils par aile. Au
 * défilement, les ailes s'ouvrent et le centre s'avance. Aucun écran n'en
 * recouvre un autre : chaque capture se lit en entier, avec son nom dessous.
 *
 * Sous 1024 px, la table devient une piste horizontale à crans : un écran
 * par vue.
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
  const track: { label: string; src?: StaticImageData; kind?: Kind }[] = [
    { label: s.dashboard, kind: "dashboard" },
    { label: s.competitions, src: competitions },
    { label: s.registrations, kind: "registrations" },
    { label: s.desk, src: desk },
    { label: s.organisation, src: organisation },
    { label: s.draws, src: draws },
    { label: s.matches, src: matches },
  ];

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
      <div ref={ref} className="relative mx-auto mt-16 hidden max-w-[1760px] px-8 lg:block">
        <div className="brand-glow pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70" />
        <div className="relative grid grid-cols-[1.1fr_1.45fr_1.1fr] items-center gap-8 [perspective:2200px]">
          {/* Aile gauche : ce qui prépare la journée */}
          <motion.div
            style={{ x: leftX, opacity: wingsOpacity, rotateY: 16, transformStyle: "preserve-3d" }}
            className="origin-right space-y-10"
          >
            <Screen label={s.registrations} kind="registrations" sizes="30vw" />
            <Screen label={s.organisation} src={organisation} sizes="30vw" />
          </motion.div>

          {/* Le centre : le tableau de bord, seul */}
          <motion.div style={{ scale: centerScale, y: centerY }} className="relative z-10">
            <Screen
              label={s.dashboard}
              kind="dashboard"
              sizes="40vw"
              className="shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
            />
          </motion.div>

          {/* Aile droite : ce qui se passe sur le tapis */}
          <motion.div
            style={{ x: rightX, opacity: wingsOpacity, rotateY: -16, transformStyle: "preserve-3d" }}
            className="origin-left space-y-10"
          >
            <Screen label={s.draws} src={draws} sizes="30vw" />
            <Screen label={s.matches} src={matches} sizes="30vw" />
          </motion.div>
        </div>
      </div>

      {/* La piste, sous 1024 px */}
      <div className="mt-12 lg:hidden">
        <div className="flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {track.map((item) => (
            <div key={item.label} className="w-[82vw] max-w-[560px] shrink-0 snap-center sm:w-[70vw]">
              <Screen label={item.label} src={item.src} kind={item.kind} sizes="82vw" />
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

/** Une capture dans son cadre, et son nom posé dessous, hors de l'image. */
function Screen({
  label,
  src,
  kind,
  sizes,
  aspect,
  className,
}: {
  label: string;
  /** Une capture telle quelle… */
  src?: StaticImageData;
  /** …ou l'un des deux écrans dont des textes sont réécrits. */
  kind?: Kind;
  sizes: string;
  /** Proportions fixes (la capture est alors rognée) ; sinon celles de l'image. */
  aspect?: string;
  className?: string;
}) {
  return (
    <figure className="group">
      <div
        className={cn(
          "shadow-card relative w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] edge-light transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1",
          aspect,
          className,
        )}
      >
        {src ? (
          <AppShot src={src} alt={label} sizes={sizes} cover={Boolean(aspect)} />
        ) : kind === "dashboard" ? (
          <DashboardShot alt={label} sizes={sizes} />
        ) : (
          <RegistrationsShot alt={label} sizes={sizes} />
        )}
      </div>
      <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
        {label}
      </figcaption>
    </figure>
  );
}
