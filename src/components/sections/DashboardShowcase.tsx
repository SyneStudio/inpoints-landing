"use client";

import { Zap, Activity, CalendarClock, TriangleAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Card, CardIcon } from "@/components/ui/Card";
import { ConsoleMockup } from "@/components/mockups/ConsoleMockup";
import { useT } from "@/lib/i18n/provider";

const calloutIcons = [Zap, Activity, CalendarClock, TriangleAlert];

export function DashboardShowcase() {
  const t = useT();
  return (
    <Section id="application" band>
      <Container size="wide">
        <SectionTitle
          kicker={t.dashboard.kicker}
          title={t.dashboard.title}
          lead={t.dashboard.lead}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <Reveal>
            <div className="shadow-card overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] edge-light">
              <div className="aspect-[16/11] w-full">
                <ConsoleMockup className="h-full" />
              </div>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {calloutIcons.map((Icon, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <Card className="p-4">
                  <div className="flex gap-3.5">
                    <CardIcon icon={Icon} size={18} className="h-10 w-10" />
                    <div>
                      <h3 className="text-sm font-bold">
                        {t.dashboard.callouts[i].title}
                      </h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-muted)]">
                        {t.dashboard.callouts[i].text}
                      </p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
