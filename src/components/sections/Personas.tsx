"use client";

import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  LandPlot,
  Scale,
  Mail,
  Gavel,
  EyeOff,
  ScrollText,
  WifiOff,
  Clock,
  MapPin,
  Medal,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n/provider";

// Trois versants, et la coupure est assumée : organiser, arbitrer, suivre ne
// sont pas trois droits sur le même écran, ce sont trois produits dans un.
const organiserIcons = [ClipboardList, LandPlot, Scale, Mail];
const officialIcons = [Gavel, EyeOff, ScrollText, WifiOff];
const athleteIcons = [Clock, MapPin, Medal, Users];

export function Personas() {
  const t = useT();
  return (
    <Section id="federations" band>
      <Container size="wide">
        <div className="grid gap-6 lg:grid-cols-3">
          <PersonaCard
            kicker={t.personas.organiser.kicker}
            title={t.personas.organiser.title}
            lead={t.personas.organiser.lead}
            points={t.personas.organiser.points}
            icons={organiserIcons}
          />
          <PersonaCard
            kicker={t.personas.official.kicker}
            title={t.personas.official.title}
            lead={t.personas.official.lead}
            points={t.personas.official.points}
            icons={officialIcons}
          />
          <PersonaCard
            kicker={t.personas.athlete.kicker}
            title={t.personas.athlete.title}
            lead={t.personas.athlete.lead}
            points={t.personas.athlete.points}
            icons={athleteIcons}
          />
        </div>
      </Container>
    </Section>
  );
}

function PersonaCard({
  kicker,
  title,
  lead,
  points,
  icons,
}: {
  kicker: string;
  title: string;
  lead: string;
  points: string[];
  icons: LucideIcon[];
}) {
  return (
    <Reveal>
      <div className="group relative h-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-line-strong)]">
        <div className="brand-glow pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative">
          <span className="text-kicker">{kicker}</span>
          <h3 className="mt-3 text-[1.35rem] font-bold leading-tight tracking-tight">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{lead}</p>
          <ul className="mt-6 space-y-2.5">
            {points.map((p, i) => {
              const Icon = icons[i];
              return (
                <li
                  key={p}
                  className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 text-[13px] text-[var(--color-fg)]"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[var(--color-line-strong)] bg-[var(--color-surface-2)] text-[var(--color-primary-soft)]">
                    <Icon size={15} aria-hidden />
                  </span>
                  {p}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
