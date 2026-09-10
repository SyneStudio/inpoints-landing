"use client";

import { Mail, Clock, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";
import { DemoForm } from "@/components/demo/DemoForm";
import { siteConfig } from "@/lib/site";
import { useT } from "@/lib/i18n/provider";

const reassuranceIcons = [Clock, CheckCircle2, Mail];

export function FinalCTA() {
  const t = useT();
  return (
    <Section id="demo" className="relative overflow-hidden">
      <div className="brand-glow pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-70" />
      <Container size="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div id="contact">
            <Kicker>{t.finalCta.kicker}</Kicker>
            <h2 className="text-h2 mt-4">{t.finalCta.title}</h2>
            <p className="text-lead mt-5 max-w-lg">{t.finalCta.lead}</p>

            <ul className="mt-8 space-y-3">
              {reassuranceIcons.map((Icon, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                  <span className="grid h-8 w-8 place-items-center rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-primary-soft)]">
                    <Icon size={15} aria-hidden />
                  </span>
                  {t.finalCta.reassurance[i]}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-[var(--color-muted)]">
              {t.finalCta.orWrite}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-[var(--color-primary-soft)] underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>

          <Reveal>
            <DemoForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
