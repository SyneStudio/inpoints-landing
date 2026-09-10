"use client";

import {
  Building2,
  Users,
  Trophy,
  GraduationCap,
  CreditCard,
  IdCard,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Card, CardIcon } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { useT } from "@/lib/i18n/provider";

const sourceIcons = [Building2, Users, Trophy, GraduationCap, CreditCard, IdCard];

/**
 * A convergence diagram: six data sources feeding a single central platform.
 * Built with inline SVG connectors so it stays crisp, light and accessible.
 */
export function Centralization() {
  const t = useT();
  return (
    <Section band>
      <Container>
        <SectionTitle
          align="center"
          kicker={t.centralization.kicker}
          title={t.centralization.title}
        />

        <Reveal className="relative mx-auto mt-16 max-w-3xl">
          {/* Sources grid */}
          <div className="grid grid-cols-3 gap-3">
            {sourceIcons.map((Icon, i) => (
              <Card key={i} className="px-3 py-4">
                <div className="flex flex-col items-center gap-2 text-center">
                  <CardIcon icon={Icon} size={17} className="h-9 w-9" />
                  <span className="text-xs font-medium text-[var(--color-muted)]">
                    {t.centralization.sources[i]}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Connector */}
          <div className="relative flex justify-center py-2" aria-hidden>
            <svg
              viewBox="0 0 200 60"
              className="h-14 w-40 text-[var(--color-line-strong)]"
              fill="none"
            >
              <path
                d="M20 0 C 20 30, 100 30, 100 55 M100 0 L100 55 M180 0 C 180 30, 100 30, 100 55"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="100" cy="55" r="3" className="fill-[var(--color-primary)]" />
            </svg>
          </div>

          {/* Central platform */}
          <div className="relative mx-auto flex max-w-md items-center justify-center gap-3 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-primary)]/40 bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-surface)] px-6 py-6 edge-light">
            <div className="brand-glow absolute inset-0" />
            <div className="relative flex items-center gap-3">
              <Logo showWordmark={false} className="scale-125" />
              <div>
                <p className="text-h3 font-extrabold">{t.centralization.platform}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
