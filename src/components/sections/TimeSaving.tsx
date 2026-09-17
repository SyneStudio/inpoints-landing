"use client";

import { ArrowRight, FileSpreadsheet, Sparkles, type LucideIcon } from "lucide-react";
import { ListChecks, ShieldCheck, Radio, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Highlight } from "@/components/ui/Highlight";
import { Card, CardIcon } from "@/components/ui/Card";
import { useT } from "@/lib/i18n/provider";

const gainIcons: LucideIcon[] = [ListChecks, ShieldCheck, Radio, Zap];

/**
 * « Gain de temps », placé APRÈS la visite du logiciel : on ne promet pas du
 * temps gagné, on montre où il l'est. Un registre en deux colonnes, moment
 * par moment — ce qu'on faisait, ce qu'on fait — puis les quatre effets.
 */
export function TimeSaving() {
  const t = useT();
  const ts = t.timeSaving;

  return (
    <Section id="gain-de-temps" band>
      <Container size="wide">
        <SectionTitle
          kicker={ts.kicker}
          title={
            <>
              {ts.titleA}
              <Highlight>{ts.titleHl}</Highlight>
            </>
          }
          lead={ts.lead}
        />

        {/* Le registre */}
        <Reveal className="mt-14 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)]/60">
          <div className="hidden grid-cols-[170px_1fr_44px_1fr] items-center gap-4 border-b border-[var(--color-line)] bg-[var(--color-bg)]/60 px-6 py-3.5 md:grid">
            <span />
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-faint)]">
              <FileSpreadsheet size={13} aria-hidden />
              {ts.beforeLabel}
            </span>
            <span />
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-primary-soft)]">
              <Sparkles size={13} aria-hidden />
              {ts.afterLabel}
            </span>
          </div>

          <ul className="divide-y divide-[var(--color-line)]">
            {ts.rows.map((row, i) => (
              <Reveal as="li" key={row.moment} delay={i * 0.05}>
                <div className="group grid gap-3 px-5 py-5 transition-colors duration-300 hover:bg-[var(--color-surface)] md:grid-cols-[170px_1fr_44px_1fr] md:items-center md:gap-4 md:px-6">
                  <span className="flex items-center gap-2.5 text-sm font-bold">
                    <span className="font-mono text-[11px] text-[var(--color-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {row.moment}
                  </span>

                  <p className="text-sm leading-relaxed text-[var(--color-faint)]">
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-wider md:hidden">
                      {ts.beforeLabel} —
                    </span>
                    {row.before}
                  </p>

                  <span className="hidden justify-center text-[var(--color-line-strong)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-primary-soft)] md:flex">
                    <ArrowRight size={18} aria-hidden />
                  </span>

                  <p className="rounded-[var(--radius)] border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/[0.07] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--color-fg)] transition-colors duration-300 group-hover:border-[var(--color-primary)]/50 md:border-transparent md:bg-transparent md:px-0 md:py-0 md:group-hover:border-transparent">
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-[var(--color-primary-soft)] md:hidden">
                      {ts.afterLabel} —
                    </span>
                    {row.after}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Reveal>

        {/* Les quatre effets */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ts.gains.map((g, i) => {
            const Icon = gainIcons[i];
            return (
              <Reveal key={g.title} delay={0.1 + i * 0.05}>
                <Card className="p-5">
                  <CardIcon icon={Icon} size={17} className="h-10 w-10" />
                  <h3 className="mt-4 text-[15px] font-bold">{g.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-muted)]">{g.text}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
