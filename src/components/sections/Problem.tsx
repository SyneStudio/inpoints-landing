"use client";

import { FileSpreadsheet, Mail, Folder, Boxes, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Highlight } from "@/components/ui/Highlight";
import { useT } from "@/lib/i18n/provider";

const beforeIcons = [FileSpreadsheet, Mail, Folder, Boxes];

export function Problem() {
  const t = useT();
  return (
    <Section band>
      <Container size="wide">
        <SectionTitle
          kicker={t.problem.kicker}
          title={
            <>
              {t.problem.titleA}
              <Highlight>{t.problem.titleHl}</Highlight>
            </>
          }
          lead={t.problem.lead}
        />

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          {/* Pains list */}
          <Reveal className="grid gap-2.5 sm:grid-cols-2">
            {t.problem.pains.map((p) => (
              <div
                key={p}
                className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-muted)]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                {p}
              </div>
            ))}
          </Reveal>

          {/* Transition arrow */}
          <Reveal className="flex justify-center lg:flex-col lg:items-center" delay={0.1}>
            <div className="hidden h-full w-px bg-gradient-to-b from-transparent via-[var(--color-line-strong)] to-transparent lg:block" />
            <span className="my-2 grid h-11 w-11 place-items-center rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface-2)] text-[var(--color-primary-soft)]">
              <ArrowRight size={18} />
            </span>
          </Reveal>

          {/* After card */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-surface)] p-8 edge-light">
              <div className="brand-glow absolute -right-16 -top-16 h-48 w-48 rounded-full" />
              <div className="relative">
                <div className="mb-5 flex flex-wrap gap-2 opacity-70">
                  {beforeIcons.map((Icon, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-line)] bg-[var(--color-bg)] px-2.5 py-1.5 text-xs text-[var(--color-faint)] line-through decoration-[var(--color-primary)]/60"
                    >
                      <Icon size={13} />
                      {t.problem.before[i]}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[var(--color-primary-soft)]">
                  <span className="text-kicker">{t.problem.afterKicker}</span>
                </div>
                <h3 className="mt-3 text-h3">{t.problem.afterTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {t.problem.afterText}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
