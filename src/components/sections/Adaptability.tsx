"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Highlight } from "@/components/ui/Highlight";
import { useT } from "@/lib/i18n/provider";

export function Adaptability() {
  const t = useT();
  return (
    <Section>
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionTitle
            kicker={t.adaptability.kicker}
            title={
              <>
                {t.adaptability.titleA}
                <Highlight>{t.adaptability.titleHl}</Highlight>
              </>
            }
            lead={t.adaptability.lead}
          />

          <Reveal>
            <div className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-line-strong)]">
              <div className="brand-glow pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <p className="mb-4 text-sm font-semibold text-[var(--color-fg)]">
                  {t.adaptability.needLabel}
                </p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {t.adaptability.variables.map((v) => (
                    <li
                      key={v}
                      className="flex items-center gap-2.5 text-sm text-[var(--color-muted)]"
                    >
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-primary)]/15 text-[10px] text-[var(--color-primary-soft)]">
                        ✓
                      </span>
                      {v}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-[13px] text-[var(--color-faint)]">
                  {t.adaptability.note}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
