"use client";

import {
  LockKeyhole,
  UserCog,
  Users,
  KeySquare,
  Database,
  DatabaseBackup,
  ServerCog,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Card, CardIcon } from "@/components/ui/Card";
import { Highlight } from "@/components/ui/Highlight";
import { useT } from "@/lib/i18n/provider";

const itemIcons = [LockKeyhole, UserCog, Users, KeySquare, Database, DatabaseBackup];

export function Security() {
  const t = useT();
  return (
    <Section id="securite" band>
      <Container size="wide">
        <SectionTitle
          kicker={t.security.kicker}
          title={
            <>
              {t.security.titleA}
              <Highlight>{t.security.titleHl}</Highlight>
            </>
          }
          lead={t.security.lead}
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {itemIcons.map((Icon, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05}>
              <Card className="p-5">
                <div className="flex items-start gap-3.5">
                  <CardIcon icon={Icon} size={18} className="h-10 w-10" />
                  <div>
                    <h3 className="text-sm font-bold">
                      {t.security.items[i].title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-muted)]">
                      {t.security.items[i].text}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <p className="flex items-center justify-center gap-2 text-center text-xs text-[var(--color-faint)]">
            <ServerCog size={14} />
            {t.security.footnote}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
