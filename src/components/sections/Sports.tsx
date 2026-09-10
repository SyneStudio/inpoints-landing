"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { sports } from "@/data/sports";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useT } from "@/lib/i18n/provider";

/**
 * "Pour tous les sports" — a 3D ring of disciplines that rotates slowly and can
 * be dragged. Falls back to a calm static grid for reduced-motion users.
 */
export function Sports() {
  const t = useT();
  const reduced = usePrefersReducedMotion();

  return (
    <Section band>
      <Container size="wide">
        <SectionTitle
          align="center"
          kicker={t.sports.kicker}
          title={t.sports.title}
          lead={t.sports.lead}
        />

        {reduced ? <SportsGrid /> : <SportsRing />}

        <p className="mt-10 text-center text-sm text-[var(--color-faint)]">
          {t.sports.footnote}
        </p>
      </Container>
    </Section>
  );
}

function SportsRing() {
  const t = useT();
  const [angle, setAngle] = useState(0);
  const [radius, setRadius] = useState(320);
  const wrapRef = useRef<HTMLDivElement>(null);
  const count = sports.length;

  // Ring radius adapts to the available width so the 3D carousel never spills
  // past the viewport on small screens (kept clipped by overflow-hidden too).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () =>
      setRadius(Math.max(150, Math.min(320, el.clientWidth * 0.42)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setAngle((a) => a + dt * 0.006);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mt-16 h-[260px] overflow-hidden [perspective:1100px]"
      role="list"
      aria-label="Sports pris en charge"
    >
      <div
        className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
        style={{ transform: `translate(-50%,-50%) rotateY(${angle}deg)` }}
      >
        {sports.map((s, i) => {
          const a = (360 / count) * i;
          return (
            <div
              key={s.key}
              role="listitem"
              className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-surface)] text-center backdrop-blur-sm"
              style={{
                transform: `rotateY(${a}deg) translateZ(${radius}px)`,
              }}
            >
              <span className="text-2xl" aria-hidden>
                {s.glyph}
              </span>
              <span className="px-1 text-[11px] font-medium text-[var(--color-muted)]">
                {t.sports.names[s.key]}
              </span>
            </div>
          );
        })}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-bg-subtle)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-bg-subtle)] to-transparent" />
    </div>
  );
}

function SportsGrid() {
  const t = useT();
  return (
    <ul className="mt-14 flex flex-wrap justify-center gap-2.5">
      {sports.map((s) => (
        <li
          key={s.key}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-muted)]"
        >
          <span aria-hidden>{s.glyph}</span>
          {t.sports.names[s.key]}
        </li>
      ))}
    </ul>
  );
}
