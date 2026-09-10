"use client";

import { Check, MonitorPlay, TriangleAlert, Timer } from "lucide-react";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * La console d'arbitrage. Deux colonnes, une par coin : le geste du juge
 * compte le point, et le journal en dessous garde tout — une correction s'y
 * AJOUTE, elle n'efface pas la ligne d'origine. C'est ce qui permet, un mois
 * plus tard, de dire d'où venait un point.
 */
export function ScoringMockup({ className }: { className?: string }) {
  const t = useT();
  const s = t.mock.scoring;

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-bg)] text-[11px] text-[var(--color-fg)]",
        className,
      )}
      aria-hidden
    >
      <div className="flex items-center justify-between border-b border-[var(--color-line)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <h3 className="text-[13px] font-extrabold tracking-tight">{s.title}</h3>
          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--color-muted)]">
            <Timer size={9} /> 01:52
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2 py-1 text-[9px] text-[var(--color-muted)]">
            <MonitorPlay size={10} /> {s.screen}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-[var(--color-success)]/40 bg-[var(--color-success)]/10 px-2 py-1 text-[9px] font-semibold text-[var(--color-success)]">
            <Check size={10} /> {s.confirmed}
          </span>
        </div>
      </div>

      {/* Les deux coins */}
      <div className="grid grid-cols-2 gap-3 p-4 pb-2">
        <Corner
          side="red"
          label={s.red}
          name="M. Laurent"
          score="4"
          rounds="1"
          roundsLabel={s.roundsWon}
          actions={[s.actions[0], s.actions[1]]}
        />
        <Corner
          side="blue"
          label={s.blue}
          name="A. Costa"
          score="2"
          rounds="1"
          roundsLabel={s.roundsWon}
          actions={[s.actions[2], s.actions[3]]}
        />
      </div>

      {/* Round + gestes du chef arbitre */}
      <div className="mx-4 flex items-center justify-between rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-faint)]">
          {s.round} 2 / 3
        </span>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-md border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/10 px-2 py-1 text-[9px] font-medium text-[var(--color-warn)]">
            <TriangleAlert size={10} /> {s.warning}
          </span>
          <span className="rounded-md border border-[var(--color-line-strong)] bg-[var(--color-surface-2)] px-2 py-1 text-[9px] text-[var(--color-muted)]">
            {s.endRound}
          </span>
        </div>
      </div>

      {/* Journal */}
      <div className="min-h-0 flex-1 p-4 pt-2.5">
        <div className="flex h-full flex-col overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-surface)]">
          <p className="border-b border-[var(--color-line)] px-3 py-1.5 text-[10px] font-bold">
            {s.journal}
          </p>
          <div className="min-h-0 flex-1 divide-y divide-[var(--color-line)]/60 overflow-hidden">
            {s.journalRows.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-2 px-3 py-1.5">
                <span className="flex min-w-0 items-center gap-1.5">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full",
                      i === 0
                        ? "bg-[var(--color-corner-red)]"
                        : i === 1
                          ? "bg-[var(--color-warn)]"
                          : i === 2
                            ? "bg-[var(--color-corner-blue)]"
                            : "bg-[var(--color-faint)]",
                    )}
                  />
                  <span className="truncate text-[9.5px] text-[var(--color-muted)]">{r.text}</span>
                </span>
                <span className="shrink-0 font-mono text-[8.5px] text-[var(--color-faint)]">
                  {r.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Corner({
  side,
  label,
  name,
  score,
  rounds,
  roundsLabel,
  actions,
}: {
  side: "red" | "blue";
  label: string;
  name: string;
  score: string;
  rounds: string;
  roundsLabel: string;
  actions: string[];
}) {
  const tone =
    side === "red"
      ? {
          text: "text-[var(--color-corner-red)]",
          ring: "border-[var(--color-corner-red)]/45",
          soft: "bg-[var(--color-corner-red)]/10",
        }
      : {
          text: "text-[var(--color-corner-blue)]",
          ring: "border-[var(--color-corner-blue)]/45",
          soft: "bg-[var(--color-corner-blue)]/10",
        };

  return (
    <div className={cn("overflow-hidden rounded-md border bg-[var(--color-surface)]", tone.ring)}>
      <div className={cn("flex items-center justify-between px-2.5 py-1", tone.soft)}>
        <span className={cn("text-[9px] font-bold uppercase tracking-widest", tone.text)}>
          {label}
        </span>
        <span className="truncate text-[9px] text-[var(--color-muted)]">{name}</span>
      </div>
      <div className="flex items-end justify-between px-2.5 pt-1.5">
        <span className={cn("font-display text-[38px] font-extrabold leading-none", tone.text)}>
          {score}
        </span>
        <span className="pb-1 text-right text-[8px] leading-tight text-[var(--color-faint)]">
          {roundsLabel}
          <br />
          <span className="font-mono text-[11px] text-[var(--color-fg)]">{rounds}</span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1.5 p-2.5">
        {actions.map((a) => (
          <span
            key={a}
            className={cn(
              "rounded-md border border-[var(--color-line-strong)] bg-[var(--color-bg)] py-1.5 text-center text-[9px] font-semibold",
              tone.text,
            )}
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}
