"use client";

import { Link2, Gauge, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Highlight } from "@/components/ui/Highlight";
import { Card, CardIcon } from "@/components/ui/Card";
import { ScoreboardMockup } from "@/components/mockups/ScoreboardMockup";
import { useT } from "@/lib/i18n/provider";

const pointIcons = [Link2, Gauge, Smartphone];

/**
 * L'écran géant. C'est la seule surface CLAIRE du site : elle l'est parce que
 * l'écran du gymnase l'est. Le montrer en sombre, pour faire joli avec le
 * reste de la page, serait montrer autre chose que le produit.
 */
export function Scoreboard() {
  const t = useT();
  return (
    <Section>
      <Container size="wide">
        <SectionTitle
          kicker={t.scoreboard.kicker}
          title={
            <>
              {t.scoreboard.titleA}
              <Highlight>{t.scoreboard.titleHl}</Highlight>
            </>
          }
          lead={t.scoreboard.lead}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <Reveal>
            {/* Le cadre du vidéoprojecteur : un pied, une dalle, et le blanc
                de l'écran qui ne suit aucun thème. */}
            <div className="shadow-card overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] bg-[var(--color-surface)] p-2.5 edge-light">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-[var(--radius)]">
                <ScoreboardMockup className="h-full" />
              </div>
            </div>
          </Reveal>

          <div className="grid gap-3">
            {pointIcons.map((Icon, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <Card className="p-4">
                  <div className="flex gap-3.5">
                    <CardIcon icon={Icon} size={18} className="h-10 w-10" />
                    <div>
                      <h3 className="text-sm font-bold">{t.scoreboard.points[i].title}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-muted)]">
                        {t.scoreboard.points[i].text}
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
