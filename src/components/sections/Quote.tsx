"use client";

import { Check, Clock, Video, Handshake, Mail, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";
import { DemoForm } from "@/components/demo/DemoForm";
import { siteConfig } from "@/lib/site";
import { useT } from "@/lib/i18n/provider";

const reassuranceIcons: LucideIcon[] = [Clock, Video, Handshake];

/**
 * Le devis. La page a montré le logiciel ; ici, elle demande une seule chose :
 * la journée type de l'organisateur. Le formulaire est celui qui existait —
 * même table, même route — et le bloc « sur devis » remplace l'ancienne
 * section tarifs, sans en inventer un chiffre.
 */
export function Quote() {
  const t = useT();
  const q = t.quote;

  return (
    <Section id="devis" className="relative overflow-hidden">
      <div className="brand-glow pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-80" />
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_50%_0%,black,transparent_60%)]" />

      <Container size="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
          <div id="contact" className="scroll-mt-24">
            <Reveal>
              <Kicker>{q.kicker}</Kicker>
              <h2 className="text-h2 mt-4">{q.title}</h2>
              <p className="text-lead mt-5 max-w-lg">{q.lead}</p>
            </Reveal>

            {/* Sur devis */}
            <Reveal delay={0.1}>
              <div className="relative mt-8 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-primary)]/35 bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-surface)] p-6 edge-light">
                <div className="brand-glow absolute -right-16 -top-16 h-48 w-48 rounded-full" />
                <div className="relative">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-3xl font-extrabold tracking-tight">{q.price}</p>
                    <span className="text-kicker">{q.badge}</span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">{q.priceSub}</p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {q.included.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary-soft)]">
                          <Check size={12} aria-hidden />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {q.reassurance.map((r, i) => {
                  const Icon = reassuranceIcons[i];
                  return (
                    <li key={r} className="flex items-center gap-2.5 text-sm text-[var(--color-muted)]">
                      <span className="grid h-8 w-8 place-items-center rounded-[var(--radius)] bg-[var(--color-surface)] text-[var(--color-primary-soft)]">
                        <Icon size={15} aria-hidden />
                      </span>
                      {r}
                    </li>
                  );
                })}
              </ul>

              <p className="mt-8 flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <Mail size={15} aria-hidden className="text-[var(--color-faint)]" />
                {q.orWrite}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-[var(--color-primary-soft)] underline-offset-4 hover:underline"
                >
                  {siteConfig.email}
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <DemoForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
