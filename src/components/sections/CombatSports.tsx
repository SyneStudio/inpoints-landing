"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { combatSports, type CombatSport } from "@/data/combatSports";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useT } from "@/lib/i18n/provider";

/** Vitesse du défilement, en pixels par seconde. */
const SPEED = 38;

/**
 * Les sports, en grandes cases qui défilent d'un bord à l'autre de l'écran.
 * La piste est une zone de défilement native : le doigt et le pavé tactile
 * la font glisser sans rien de plus. Elle avance seule, s'arrête au survol,
 * au toucher et au focus, et les flèches la décalent d'une case. La liste
 * est posée deux fois : arrivée à la moitié, la piste revient au début sans
 * que rien ne bouge à l'écran.
 */
export function CombatSports() {
  const t = useT();
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  // Le défilement natif ne garde que des pixels entiers : la fraction est
  // tenue ici, sinon une vitesse lente n'avancerait jamais.
  const pos = useRef(0);
  // Après un clic sur une flèche, la piste glisse seule : on la laisse finir.
  const resumeAt = useRef(0);

  /** La longueur d'une copie de la liste : l'écart entre une case et sa jumelle. */
  const period = useCallback(() => {
    const cards = trackRef.current?.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards || cards.length < 2) return 0;
    return cards[cards.length / 2].offsetLeft - cards[0].offsetLeft;
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const half = period();
      if (!paused.current && now >= resumeAt.current && half > 0) {
        // Si la piste a été déplacée à la main, on repart de là où elle est.
        if (Math.abs(el.scrollLeft - pos.current) > 2) pos.current = el.scrollLeft;
        pos.current += (SPEED * dt) / 1000;
        if (pos.current >= half) pos.current -= half;
        el.scrollLeft = pos.current;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, period]);

  const step = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const half = period();
    const width = half / combatSports.length;
    // Aux deux bouts, on saute d'abord à la copie jumelle, invisible.
    if (dir === -1 && el.scrollLeft < width) el.scrollLeft += half;
    if (dir === 1 && el.scrollLeft >= half) el.scrollLeft -= half;
    resumeAt.current = performance.now() + 900;
    el.scrollBy({ left: dir * width, behavior: reduced ? "auto" : "smooth" });
  }, [reduced, period]);

  const pause = useCallback(() => {
    paused.current = true;
  }, []);
  const resume = useCallback(() => {
    paused.current = false;
  }, []);

  return (
    <Section id="sports" className="overflow-hidden">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle kicker={t.sports.kicker} title={t.sports.title} lead={t.sports.lead} />
          <div className="flex gap-2">
            <NavButton dir="prev" label={t.sports.prev} onClick={() => step(-1)} />
            <NavButton dir="next" label={t.sports.next} onClick={() => step(1)} />
          </div>
        </div>
      </Container>

      <Reveal>
        <div
          ref={trackRef}
          role="group"
          aria-roledescription="carousel"
          aria-label={t.sports.kicker}
          tabIndex={0}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              step(-1);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              step(1);
            }
          }}
          className="mt-12 overflow-x-auto outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex w-max gap-4 px-5 sm:gap-5 sm:px-8 xl:px-12">
            {[0, 1].map((copy) =>
              combatSports.map((s) => (
                <li key={`${copy}-${s.key}`} aria-hidden={copy === 1 || undefined} data-card>
                  <SportCard sport={s} name={t.sports.names[s.key]} />
                </li>
              )),
            )}
          </ul>
        </div>
      </Reveal>

      <Container>
        <p className="mt-8 text-center text-sm text-[var(--color-faint)]">{t.sports.footnote}</p>
      </Container>
    </Section>
  );
}

function SportCard({ sport, name }: { sport: CombatSport; name: string }) {
  return (
    <div className="group relative aspect-[3/4] w-[68vw] max-w-[300px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] bg-[var(--color-surface)] shadow-card sm:w-[300px] sm:max-w-none lg:w-[340px] 2xl:w-[380px]">
      {sport.photo ? (
        <Image
          src={sport.photo}
          alt=""
          fill
          sizes="(min-width: 1536px) 380px, (min-width: 1024px) 340px, 300px"
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
        />
      ) : (
        // En attendant la photo : un fond à la teinte du sport et son emblème.
        <div
          aria-hidden
          className="absolute inset-0 grid place-items-center"
          style={{
            background: `radial-gradient(120% 90% at 30% 15%, ${sport.tint}66, transparent 60%), linear-gradient(160deg, ${sport.tint}33, var(--color-surface) 70%)`,
          }}
        >
          <div className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
          <span className="relative text-7xl opacity-90 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 lg:text-8xl">
            {sport.glyph}
          </span>
        </div>
      )}

      {/* Le voile qui porte le nom, lisible sur n'importe quelle photo */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-5 pb-5 pt-16">
        <span className="mb-2 block h-1 w-8 rounded-full" style={{ background: sport.tint }} />
        <h3 className="text-2xl font-extrabold tracking-tight text-white lg:text-[1.7rem]">{name}</h3>
      </div>
    </div>
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
