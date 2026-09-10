"use client";

import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * L'écran géant du gymnase — le seul endroit CLAIR de ce site, et c'est voulu.
 *
 * Un vidéoprojecteur de gymnase projette de la lumière : sur un fond noir il
 * ne projette presque rien. Un fond blanc lui fait porter toute sa puissance,
 * et l'encre noire se lit du fond de la salle même quand le jour entre par les
 * verrières. C'est l'inverse d'un écran de bureau — d'où des valeurs fixes,
 * qui ne suivent ni thème ni préférence.
 */
export function ScoreboardMockup({ className }: { className?: string }) {
  const t = useT();
  const s = t.mock.scoreboard;

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col bg-[var(--color-screen-bg)] text-[var(--color-screen-ink)]",
        className,
      )}
      aria-hidden
    >
      {/* bandeau : la catégorie et le tour */}
      <div className="flex items-center justify-between border-b border-[var(--color-screen-line)] px-4 py-2 sm:px-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-screen-muted)] sm:text-xs">
          {s.category}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-screen-red)] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white sm:text-[10px]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          {s.live}
        </span>
      </div>

      {/* les deux scores */}
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:px-6">
        <Side
          corner="red"
          label={s.redCorner}
          name="M. LAURENT"
          club="Club Olympique"
          score="4"
          warnings={0}
          warningLabel={s.warning}
        />

        <div className="flex flex-col items-center gap-1 px-1">
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--color-screen-muted)]">
            {s.round}
          </span>
          <span className="font-display text-3xl font-extrabold leading-none sm:text-7xl">2</span>
          <span className="font-mono text-[10px] text-[var(--color-screen-muted)] sm:text-xs">
            01:52
          </span>
        </div>

        <Side
          corner="blue"
          label={s.blueCorner}
          name="A. COSTA"
          club="Union Sportive Nord"
          score="2"
          warnings={1}
          warningLabel={s.warning}
        />
      </div>
    </div>
  );
}

function Side({
  corner,
  label,
  name,
  club,
  score,
  warnings,
  warningLabel,
}: {
  corner: "red" | "blue";
  label: string;
  name: string;
  club: string;
  score: string;
  warnings: number;
  warningLabel: string;
}) {
  const color =
    corner === "red" ? "var(--color-screen-red)" : "var(--color-screen-blue)";
  return (
    <div className="flex min-w-0 flex-col items-center gap-1 py-3">
      <span
        className="rounded px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-white sm:text-[10px]"
        style={{ background: color }}
      >
        {label}
      </span>
      <span
        className="font-display text-[58px] font-extrabold leading-none sm:text-[140px]"
        style={{ color }}
      >
        {score}
      </span>
      <span className="max-w-full truncate text-[11px] font-bold uppercase tracking-wide sm:text-lg">
        {name}
      </span>
      <span className="max-w-full truncate text-[9px] text-[var(--color-screen-muted)] sm:text-[13px]">
        {club}
      </span>
      {/* Les avertissements portés par CE côté. Un rond vide n'est pas une
          absence d'information : c'est un compteur qu'on lit de loin. */}
      <span className="mt-0.5 flex items-center gap-1" title={warningLabel}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full border sm:h-2.5 sm:w-2.5"
            style={{
              borderColor: "var(--color-screen-line)",
              background: i < warnings ? "var(--color-screen-muted)" : "transparent",
            }}
          />
        ))}
      </span>
    </div>
  );
}
