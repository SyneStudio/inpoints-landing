"use client";

import { RefreshCw, Network } from "lucide-react";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type Side = { name: string; score?: string; winner?: boolean; seed?: number };
type Bout = { a: Side; b: Side; live?: boolean };

/**
 * Le tableau. Il n'est pas dessiné depuis le tirage mais depuis les
 * RENCONTRES : c'est ce qui le rend exact en permanence — un tableau tiré du
 * tirage est juste le matin et faux à midi. Le vainqueur d'une rencontre
 * apparaît donc au tour suivant sans que rien ne soit recalculé.
 */
export function BracketMockup({ className }: { className?: string }) {
  const t = useT();
  const d = t.mock.draws;

  const rounds: Bout[][] = [
    [
      { a: { name: "M. Laurent", score: "6", winner: true, seed: 1 }, b: { name: "T. Bernard", score: "3" } },
      { a: { name: "S. Moreau", score: "2" }, b: { name: "L. Petit", score: "5", winner: true } },
      { a: { name: "E. Girard", score: "4", winner: true }, b: { name: "H. Fabre", score: "1" } },
      { a: { name: "N. Roux", score: "3" }, b: { name: "A. Costa", score: "7", winner: true, seed: 2 } },
    ],
    [
      { a: { name: "M. Laurent", score: "5", winner: true, seed: 1 }, b: { name: "L. Petit", score: "2" } },
      { a: { name: "E. Girard", score: "3" }, b: { name: "A. Costa", score: "3" }, live: true },
    ],
    [{ a: { name: "M. Laurent", seed: 1 }, b: { name: "—" } }],
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
        <div>
          <h3 className="text-[15px] font-extrabold tracking-tight">{d.title}</h3>
          <p className="text-[9.5px] text-[var(--color-faint)]">{d.category}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-primary)] px-2.5 py-1.5 text-[10px] font-semibold text-white">
          <RefreshCw size={11} /> {d.primary}
        </span>
      </div>

      <div className="min-h-0 flex-1 px-4 py-3">
        <div className="grid h-full grid-cols-3 gap-3">
          {rounds.map((bouts, ri) => (
            <div key={ri} className="flex min-w-0 flex-col">
              <p className="mb-1.5 text-[8.5px] font-semibold uppercase tracking-wider text-[var(--color-faint)]">
                {d.rounds[ri]}
              </p>
              <div className="flex flex-1 flex-col justify-around gap-2">
                {bouts.map((bout, bi) => (
                  <div
                    key={bi}
                    className={cn(
                      "overflow-hidden rounded-md border bg-[var(--color-surface)]",
                      bout.live
                        ? "border-[var(--color-primary)]/60 shadow-[0_0_0_1px_rgba(79,209,232,0.15)]"
                        : "border-[var(--color-line)]",
                    )}
                  >
                    {bout.live && (
                      <p className="flex items-center gap-1 bg-[var(--color-primary)]/12 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-[var(--color-primary-soft)]">
                        <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--color-primary-soft)]" />
                        {d.live}
                      </p>
                    )}
                    <SideRow side={bout.a} corner="red" seedLabel={d.seed} />
                    <div className="h-px bg-[var(--color-line)]" />
                    <SideRow side={bout.b} corner="blue" seedLabel={d.seed} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="flex items-center gap-1.5 border-t border-[var(--color-line)] px-4 py-2 text-[9px] text-[var(--color-faint)]">
        <Network size={10} />
        {d.note}
      </p>
    </div>
  );
}

function SideRow({
  side,
  corner,
  seedLabel,
}: {
  side: Side;
  corner: "red" | "blue";
  seedLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 px-2 py-1.5">
      <span className="flex min-w-0 items-center gap-1.5">
        <span
          className={cn(
            "h-2.5 w-0.5 shrink-0 rounded-full",
            corner === "red"
              ? "bg-[var(--color-corner-red)]"
              : "bg-[var(--color-corner-blue)]",
          )}
        />
        <span
          className={cn(
            "truncate text-[10px]",
            side.winner ? "font-semibold text-[var(--color-fg)]" : "text-[var(--color-muted)]",
          )}
        >
          {side.name}
        </span>
        {side.seed && (
          <span
            title={seedLabel}
            className="shrink-0 rounded bg-[var(--color-surface-2)] px-1 font-mono text-[8px] text-[var(--color-faint)]"
          >
            {side.seed}
          </span>
        )}
      </span>
      {side.score && (
        <span
          className={cn(
            "shrink-0 font-mono text-[11px]",
            side.winner
              ? "font-bold text-[var(--color-primary-soft)]"
              : "text-[var(--color-faint)]",
          )}
        >
          {side.score}
        </span>
      )}
    </div>
  );
}
