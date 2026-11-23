"use client";

import {
  Clock,
  Sparkles,
  Gauge,
  Timer,
  FileCheck2,
  MapPinned,
  Radio,
  Shuffle,
  Route,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Highlight } from "@/components/ui/Highlight";
import { Kicker } from "@/components/ui/Kicker";
import { RegistrationsShot } from "@/components/mockups/RegistrationsShot";
import { ScoreboardMockup } from "@/components/mockups/ScoreboardMockup";
import { LiveMockup, PhoneFrame } from "@/components/mockups/LiveMockup";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

const promiseIcons: LucideIcon[] = [Clock, Sparkles, Gauge];
const organiserIcons: LucideIcon[] = [Timer, FileCheck2, MapPinned];
const athleteIcons: LucideIcon[] = [Radio, Shuffle, Route];

/**
 * Les avantages : ce qu'on gagne à organiser sa compétition avec Inpoints.
 * Trois promesses en tête — temps, simplicité, efficacité — puis ce que cela
 * règle, public par public : les organisateurs d'abord, les athlètes ensuite.
 */
export function Benefits() {
  const t = useT();
  const b = t.benefits;

  return (
    <Section id="avantages" band className="overflow-hidden">
      <Container size="wide">
        <SectionTitle
          align="center"
          kicker={b.kicker}
          title={
            <>
              {b.titleA}
              <Highlight>{b.titleHl}</Highlight>
            </>
          }
          lead={b.lead}
        />

        {/* Les trois promesses */}
        <ul className="mt-14 grid gap-4 md:grid-cols-3 xl:gap-5">
          {b.promises.map((p, i) => {
            const Icon = promiseIcons[i];
            return (
              <Reveal as="li" key={p.title} delay={i * 0.1}>
                <div className="relative h-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-7 edge-light">
                  <div className="brand-glow pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-70" />
                  <span className="relative grid h-12 w-12 place-items-center rounded-[var(--radius)] bg-[var(--color-primary)]/15 text-[var(--color-primary-soft)]">
                    <Icon size={22} aria-hidden />
                  </span>
                  <h3 className="relative mt-5 text-[1.45rem] font-extrabold tracking-tight">{p.title}</h3>
                  <p className="relative mt-2.5 leading-relaxed text-[var(--color-muted)]">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-32">
          <Audience copy={b.organisers} icons={organiserIcons} side="left">
            <div className="shadow-card relative w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] edge-light">
              <RegistrationsShot alt={b.organisers.kicker} sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
          </Audience>

          <Audience copy={b.athletes} icons={athleteIcons} side="right">
            <div className="relative pr-[30%] pb-24 sm:pt-6 sm:pr-[22%] sm:pb-14">
              <div className="shadow-card relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] bg-[var(--color-surface)] p-2 edge-light">
                <div className="h-full overflow-hidden rounded-[var(--radius)]">
                  <ScoreboardMockup className="h-full" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-[38%] sm:w-[26%]">
                <Reveal delay={0.15}>
                  <PhoneFrame>
                    <LiveMockup />
                  </PhoneFrame>
                </Reveal>
              </div>
            </div>
          </Audience>
        </div>
      </Container>
    </Section>
  );
}

function Audience({
  copy,
  icons,
  side,
  children,
}: {
  copy: { kicker: string; title: string; text: string; points: { title: string; text: string }[] };
  icons: LucideIcon[];
  /** Le côté du visuel sur grand écran. */
  side: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 xl:gap-24",
        side === "right" && "lg:grid-cols-[1fr_1.2fr]",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "brand-glow pointer-events-none absolute top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-60",
          side === "left" ? "left-0 -translate-x-1/4" : "right-0 translate-x-1/4",
        )}
      />

      <Reveal className={cn("relative", side === "right" && "lg:order-2")}>{children}</Reveal>

      <div className={cn("relative", side === "right" && "lg:order-1")}>
        <Reveal>
          <Kicker>{copy.kicker}</Kicker>
          <h3 className="text-h2 mt-4">{copy.title}</h3>
          <p className="text-lead mt-5">{copy.text}</p>
        </Reveal>
        <ul className="mt-8 space-y-5">
          {copy.points.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={p.title} delay={0.1 + i * 0.1} className="flex gap-4">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-primary-soft)]">
                  <Icon size={18} aria-hidden />
                </span>
                <div>
                  <p className="font-bold">{p.title}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-[var(--color-muted)]">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
