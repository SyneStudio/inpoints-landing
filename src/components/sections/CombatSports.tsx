"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { combatSports, type CombatSport } from "@/data/combatSports";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

const COUNT = combatSports.length;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * « Pour tous les sports de combat » — un arc de cartes. Le centre du cercle
 * est sous la section : la discipline choisie est au sommet, les autres
 * descendent de part et d'autre le long de la courbe, penchées comme des
 * cartes en éventail. Changer de sport fait tourner tout l'arc.
 *
 * Aucune carte ne prétend connaître une règle : elles disent toutes la même
 * chose — le règlement se décrit — et c'est le propos de la section.
 */
export function CombatSports() {
  const t = useT();
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [touched, setTouched] = useState(false);
  const [hover, setHover] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1000);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + COUNT) % COUNT);
    setTouched(true);
  }, []);

  // Le manège avance seul tant que personne n'y a touché — et s'arrête pour
  // de bon au premier geste, parce qu'une roue qui reprend sous la main agace.
  useEffect(() => {
    if (reduced || touched || hover) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % COUNT), 3600);
    return () => clearInterval(id);
  }, [reduced, touched, hover]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  }

  // Géométrie : rayon et pas angulaire suivent la largeur disponible. Sur un
  // téléphone, l'arc est plus serré et montre trois cartes ; sur un grand
  // écran, sept.
  const mobile = width < 640;
  const tablet = width < 1024;
  const radius = Math.max(300, Math.min(760, width * 0.62));
  const step = mobile ? 30 : tablet ? 20 : 14;
  const maxAngle = mobile ? 34 : tablet ? 42 : 46;
  const cardW = mobile ? 128 : tablet ? 150 : 168;
  const cardH = mobile ? 168 : tablet ? 196 : 220;
  // La hauteur de la scène suit la géométrie : la carte la plus basse est
  // celle qui est à l'angle maximal.
  const drop = radius * (1 - Math.cos((maxAngle * Math.PI) / 180));
  const stageHeight = Math.round(24 + cardH + drop + 12);

  const selected = combatSports[index];

  return (
    <Section id="sports" band className="overflow-hidden">
      <Container size="wide">
        <SectionTitle
          align="center"
          kicker={t.sports.kicker}
          title={t.sports.title}
          lead={t.sports.lead}
        />
      </Container>

      {/* L'arc */}
      <Reveal>
        <div
          ref={stageRef}
          role="group"
          aria-roledescription="carousel"
          aria-label={t.sports.kicker}
          tabIndex={0}
          onKeyDown={onKey}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          className="relative mx-auto mt-12 w-full max-w-[1400px] select-none outline-none focus-visible:[&>div:first-child]:ring-1 focus-visible:[&>div:first-child]:ring-[var(--color-primary-soft)]"
          style={{ height: stageHeight }}
        >
          {/* Le cercle lui-même, tracé finement : c'est lui qui donne la
              lecture « arc » même quand seules trois cartes sont visibles. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 rounded-full border border-[var(--color-line)]/70"
            style={{
              width: radius * 2,
              height: radius * 2,
              top: cardH / 2 + 24,
              transform: "translateX(-50%)",
              maskImage: "linear-gradient(to bottom, black 0%, transparent 28%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 28%)",
            }}
          />

          <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.06}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40 || info.velocity.x < -300) go(1);
              else if (info.offset.x > 40 || info.velocity.x > 300) go(-1);
            }}
          >
            {combatSports.map((s, i) => {
              // Distance angulaire la plus courte vers la carte choisie.
              let d = i - index;
              if (d > COUNT / 2) d -= COUNT;
              if (d < -COUNT / 2) d += COUNT;
              const angle = d * step;
              const visible = Math.abs(angle) <= maxAngle;
              const rad = (angle * Math.PI) / 180;
              const x = radius * Math.sin(rad);
              const y = radius * (1 - Math.cos(rad));
              const dist = Math.abs(d);
              const scale = d === 0 ? 1 : Math.max(0.72, 0.9 - dist * 0.06);
              const opacity = visible ? (d === 0 ? 1 : Math.max(0.35, 0.85 - dist * 0.16)) : 0;

              return (
                <motion.button
                  key={s.key}
                  type="button"
                  tabIndex={-1}
                  aria-label={t.sports.names[s.key]}
                  aria-current={d === 0 ? "true" : undefined}
                  onClick={() => {
                    if (d !== 0) go(d);
                  }}
                  initial={false}
                  animate={{ x, y, rotate: angle, scale, opacity }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 170, damping: 24, mass: 0.9 }
                  }
                  style={{
                    width: cardW,
                    height: cardH,
                    left: `calc(50% - ${cardW / 2}px)`,
                    top: 24,
                    zIndex: 20 - dist,
                    pointerEvents: visible ? "auto" : "none",
                    transformOrigin: "50% 50%",
                  }}
                  className="absolute"
                >
                  <SportCard sport={s} name={t.sports.names[s.key]} active={d === 0} />
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </Reveal>

      {/* La discipline choisie, et la navigation */}
      <Container>
        <div className="mx-auto mt-2 flex max-w-2xl items-center justify-between gap-4">
          <NavButton dir="prev" label={t.sports.prev} onClick={() => go(-1)} />

          <div className="min-h-[92px] flex-1 text-center" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <p className="text-kicker">{t.sports.selected}</p>
                <h3 className="mt-2 text-h3 font-extrabold">{t.sports.names[selected.key]}</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[var(--color-muted)]">
                  {t.sports.common}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <NavButton dir="next" label={t.sports.next} onClick={() => go(1)} />
        </div>

        {/* Les points, un par discipline */}
        <div className="mt-6 flex justify-center gap-1.5" aria-hidden>
          {combatSports.map((s, i) => (
            <button
              key={s.key}
              type="button"
              tabIndex={-1}
              onClick={() => {
                setIndex(i);
                setTouched(true);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-6 bg-[var(--color-primary-soft)]"
                  : "w-1.5 bg-[var(--color-line-strong)] hover:bg-[var(--color-faint)]",
              )}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--color-faint)]">{t.sports.footnote}</p>
      </Container>
    </Section>
  );
}

function SportCard({
  sport,
  name,
  active,
}: {
  sport: CombatSport;
  name: string;
  active: boolean;
}) {
  const tint = `hsl(${sport.hue} 70% 60% / 0.16)`;
  return (
    <span
      className={cn(
        "relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] border p-4 text-left transition-colors duration-300 edge-light",
        active
          ? "border-[var(--color-primary)]/60 bg-[var(--color-surface-2)] shadow-[0_24px_60px_-20px_rgba(79,209,232,0.35)]"
          : "border-[var(--color-line)] bg-[var(--color-surface)] shadow-card",
      )}
    >
      {/* Un halo teinté, propre à chaque carte */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl"
        style={{ background: tint }}
      />
      {/* Un tatami stylisé : deux traits, un point */}
      <svg viewBox="0 0 40 40" className="h-8 w-8 text-[var(--color-primary-soft)]" aria-hidden>
        <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
        <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
      </svg>
      <span className="relative">
        <span
          className={cn(
            "block font-mono font-semibold leading-none tracking-tight",
            active ? "text-[44px] text-[var(--color-fg)]" : "text-[36px] text-[var(--color-muted)]",
          )}
        >
          {sport.code}
        </span>
        <span
          className={cn(
            "mt-2 block text-[13px] font-semibold",
            active ? "text-[var(--color-primary-soft)]" : "text-[var(--color-faint)]",
          )}
        >
          {name}
        </span>
      </span>
    </span>
  );
}

function NavButton({
  dir,
  label,
  onClick,
}: {
  dir: "prev" | "next";
  label: string;
  onClick: () => void;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface)] text-[var(--color-fg)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-primary)]/60 hover:bg-[var(--color-surface-2)] active:scale-95"
    >
      <Icon size={20} aria-hidden />
    </button>
  );
}
