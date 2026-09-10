"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ScreenMockup } from "@/components/mockups/ScreenMockup";
import { Highlight } from "@/components/ui/Highlight";
import { screens, type ScreenId } from "@/data/screens";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

export function AppScreens() {
  const t = useT();
  const [active, setActive] = useState<ScreenId>("dashboard");

  return (
    <Section>
      <Container size="wide">
        <SectionTitle
          kicker={t.appScreens.kicker}
          title={
            <>
              {t.appScreens.titleA}
              <Highlight>{t.appScreens.titleHl}</Highlight>
            </>
          }
          lead={t.appScreens.lead}
        />

        {/* Tabs */}
        <Reveal className="mt-10 flex flex-wrap gap-2">
          {screens.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              aria-pressed={active === s.id}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active === s.id
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                  : "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-line-strong)] hover:text-[var(--color-fg)]",
              )}
            >
              {t.appScreens.tabs[s.id]}
            </button>
          ))}
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
          <Reveal>
            <div className="shadow-card overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] edge-light">
              <div className="aspect-[16/10] w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="h-full"
                  >
                    <ScreenMockup id={active} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                <span className="text-kicker">{t.appScreens.tabs[active]}</span>
                <h3 className="mt-3 text-h3">{t.appScreens.detail[active].title}</h3>
                <p className="mt-3 text-lead">{t.appScreens.detail[active].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
