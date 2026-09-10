"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Highlight } from "@/components/ui/Highlight";
import { Card, CardIcon } from "@/components/ui/Card";
import { benefitIcons } from "@/data/benefits";
import { useT } from "@/lib/i18n/provider";

export function TimeSaving() {
  const t = useT();
  const last = benefitIcons.length - 1;
  return (
    <Section>
      <Container size="wide">
        <SectionTitle
          kicker={t.timeSaving.kicker}
          title={
            <>
              {t.timeSaving.titleA}
              <Highlight>{t.timeSaving.titleHl}</Highlight>
            </>
          }
          lead={t.timeSaving.lead}
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {benefitIcons.map((Icon, i) => (
            <Reveal
              key={i}
              delay={(i % 3) * 0.05}
              className={i === last ? "lg:col-start-2" : undefined}
            >
              <Card className="p-5">
                <div className="flex items-start gap-3.5">
                  <CardIcon icon={Icon} className="h-11 w-11" />
                  <div>
                    <h3 className="text-[1.05rem] font-bold">
                      {t.timeSaving.benefits[i].title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                      {t.timeSaving.benefits[i].description}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
