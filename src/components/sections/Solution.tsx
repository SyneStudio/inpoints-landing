"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Highlight } from "@/components/ui/Highlight";
import { Card, CardIcon } from "@/components/ui/Card";
import { featureIcons } from "@/data/features";
import { useT } from "@/lib/i18n/provider";

export function Solution() {
  const t = useT();
  return (
    <Section id="fonctionnalites">
      <Container size="wide">
        <SectionTitle
          kicker={t.solution.kicker}
          title={
            <>
              {t.solution.titleA}
              <Highlight>{t.solution.titleHl}</Highlight>
            </>
          }
          lead={t.solution.lead}
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featureIcons.map((Icon, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05}>
              <Card className="p-5">
                <CardIcon icon={Icon} className="h-11 w-11" />
                <h3 className="mt-4 text-[1.05rem] font-bold">
                  {t.solution.features[i].title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                  {t.solution.features[i].description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
