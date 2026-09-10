"use client";

import { RefreshCw } from "lucide-react";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type Slot = {
  col: number;
  row: number;
  span: number;
  label: string;
  state: "live" | "scheduled" | "done" | "break";
};

const stateClass: Record<Slot["state"], string> = {
  live: "border-[var(--color-primary)]/60 bg-[var(--color-primary)]/15 text-[var(--color-primary-soft)]",
  scheduled: "border-[var(--color-line-strong)] bg-[var(--color-surface-2)] text-[var(--color-muted)]",
  done: "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-faint)]",
  break: "border-dashed border-[var(--color-line-strong)] bg-transparent text-[var(--color-faint)]",
};

const legendState: Slot["state"][] = ["live", "scheduled", "done", "break"];

/**
 * Le planning des aires : les terrains en colonnes, les heures en lignes.
 * Un horaire n'est pas une promesse mais une estimation — d'où le bouton
 * « recalculer », qui propage un retard sur toute la journée au lieu de
 * demander une feuille réimprimée.
 */
export function PlanningMockup({ className }: { className?: string }) {
  const t = useT();
  const p = t.mock.planning;

  const slots: Slot[] = [
    { col: 1, row: 1, span: 2, label: p.events.e1, state: "done" },
    { col: 1, row: 3, span: 2, label: p.events.e5, state: "live" },
    { col: 2, row: 1, span: 3, label: p.events.e2, state: "done" },
    { col: 2, row: 4, span: 1, label: p.events.e6, state: "scheduled" },
    { col: 3, row: 2, span: 2, label: p.events.e3, state: "live" },
    { col: 3, row: 4, span: 1, label: p.events.e6, state: "scheduled" },
    { col: 4, row: 1, span: 2, label: p.events.e4, state: "done" },
    { col: 4, row: 3, span: 1, label: p.legend[3], state: "break" },
    { col: 4, row: 4, span: 1, label: p.events.e6, state: "scheduled" },
  ];

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-bg)] text-[11px] text-[var(--color-fg)]",
        className,
      )}
      aria-hidden
    >
      <div className="flex items-center justify-between px-4 pt-3">
        <h3 className="text-[15px] font-extrabold tracking-tight">{p.title}</h3>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-primary)] px-2.5 py-1.5 text-[10px] font-semibold text-white">
          <RefreshCw size={11} /> {p.primary}
        </span>
      </div>

      <div className="mx-4 mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)]/50 px-3 py-2 text-[9px] text-[var(--color-muted)]">
        <span className="font-semibold uppercase tracking-wide text-[var(--color-faint)]">
          {p.legendLabel}
        </span>
        {p.legend.map((label, i) => (
          <span key={label} className="inline-flex items-center gap-1.5">
            <span className={cn("h-2 w-2 rounded-[3px] border", stateClass[legendState[i]])} />
            {label}
          </span>
        ))}
      </div>

      <div className="min-h-0 flex-1 px-4 py-3">
        <div className="grid h-full grid-cols-[38px_repeat(4,1fr)] grid-rows-[auto_repeat(4,1fr)] gap-1.5">
          {/* en-tête : les aires */}
          <span />
          {p.courts.map((court) => (
            <span
              key={court}
              className="truncate pb-0.5 text-center text-[9px] font-semibold uppercase tracking-wide text-[var(--color-faint)]"
            >
              {court}
            </span>
          ))}

          {/* colonne des heures */}
          {p.hours.slice(0, 4).map((hour, i) => (
            <span
              key={hour}
              className="pt-0.5 font-mono text-[8.5px] text-[var(--color-faint)]"
              style={{ gridColumn: 1, gridRow: i + 2 }}
            >
              {hour}
            </span>
          ))}

          {/* la trame */}
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={`grid-${i}`}
              className="rounded-[5px] border border-[var(--color-line)]/60"
              style={{ gridColumn: (i % 4) + 2, gridRow: Math.floor(i / 4) + 2 }}
            />
          ))}

          {/* les passages */}
          {slots.map((s, i) => (
            <span
              key={i}
              className={cn(
                // Aligné en HAUT : dans un planning, un passage commence à son
                // heure. Un libellé centré dans un créneau de deux heures se
                // lit comme s'il commençait au milieu.
                "z-10 flex items-start rounded-[5px] border px-1.5 pt-1 text-[8.5px] leading-tight",
                stateClass[s.state],
              )}
              style={{
                gridColumn: s.col + 1,
                gridRow: `${s.row + 1} / span ${s.span}`,
              }}
            >
              <span className="line-clamp-2">{s.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
