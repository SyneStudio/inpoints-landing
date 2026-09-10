"use client";

import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useT } from "@/lib/i18n/provider";

export function Pricing() {
  const t = useT();
  return (
    <Section id="tarifs" band>
      <Container>
        <SectionTitle
          align="center"
          kicker={t.pricing.kicker}
          title={t.pricing.title}
          lead={t.pricing.lead}
        />

        <Reveal className="mx-auto mt-12 max-w-lg">
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-primary)]/40 bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-surface)] p-8 text-center edge-light">
            <div className="brand-glow absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full" />
            <div className="relative">
              <p className="text-kicker">{t.pricing.badge}</p>
              <p className="mt-3 text-4xl font-extrabold tracking-tight">
                {t.pricing.price}
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {t.pricing.priceSub}
              </p>

              <ul className="mx-auto mt-7 max-w-xs space-y-2.5 text-left">
                {t.pricing.included.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary-soft)]">
                      <Check size={12} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Button href="#demo" variant="primary" size="lg" className="mt-8 w-full">
                {t.pricing.cta}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
