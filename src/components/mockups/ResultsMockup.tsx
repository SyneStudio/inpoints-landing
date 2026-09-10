"use client";

import { FileDown, Medal, Trophy, Swords, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type MedalKey = "gold" | "silver" | "bronze";

const medalTone: Record<MedalKey, string> = {
  gold: "bg-[#b08d2b]/18 text-[#e0c46a]",
  silver: "bg-[var(--color-surface-2)] text-[var(--color-muted)]",
  bronze: "bg-[#8a5a2b]/18 text-[#d09a63]",
};

/**
 * Les résultats. Ils ne sont pas saisis le soir : ils sont CALCULÉS depuis les
 * rencontres, ce qui est la seule façon qu'un classement et un tableau des
 * médailles ne se contredisent jamais.
 */
export function ResultsMockup({ className }: { className?: string }) {
  const t = useT();
  const r = t.mock.results;

  const rows: { rank: string; athlete: string; club: string; medal?: MedalKey }[] = [
    { rank: "1", athlete: "M. Laurent", club: "Club Olympique", medal: "gold" },
    { rank: "2", athlete: "A. Costa", club: "Union Sportive Nord", medal: "silver" },
    { rank: "3", athlete: "E. Girard", club: "Cercle Athlétique", medal: "bronze" },
    { rank: "3", athlete: "L. Petit", club: "Élan Régional", medal: "bronze" },
    { rank: "5", athlete: "S. Moreau", club: "Académie des Sports" },
    { rank: "5", athlete: "T. Bernard", club: "Racing Club Sud" },
  ];

  const cols = [r.columns.rank, r.columns.athlete, r.columns.club, r.columns.medal];
  const gridCols = "34px 1.2fr 1.4fr 66px";

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-bg)] text-[11px] text-[var(--color-fg)]",
        className,
      )}
      aria-hidden
    >
      <div className="px-4 pt-3">
        <h3 className="text-[15px] font-extrabold tracking-tight">{r.title}</h3>
        <p className="text-[9.5px] text-[var(--color-faint)]">{r.subtitle}</p>
      </div>

      <div className="grid grid-cols-4 gap-2.5 px-4 pt-2.5">
        <Kpi icon={Trophy} label={r.kpis.categories} value="8 / 12" />
        <Kpi icon={Medal} label={r.kpis.medals} value="32" />
        <Kpi icon={Swords} label={r.kpis.matches} value="64" />
        <Kpi icon={CheckCircle2} label={r.kpis.published} value="09:58" tone="accent" />
      </div>

      <div className="mx-4 mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)]/50 px-3 py-2 text-[9px] text-[var(--color-muted)]">
        <span className="font-semibold uppercase tracking-wide text-[var(--color-faint)]">
          {r.exportsLabel}
        </span>
        {r.exports.map((e) => (
          <span
            key={e}
            className="inline-flex items-center gap-1 rounded border border-[var(--color-line)] bg-[var(--color-bg)] px-1.5 py-0.5"
          >
            <FileDown size={9} />
            {e}
          </span>
        ))}
        <span className="text-[var(--color-faint)]">{r.exportsNote}</span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-4 pb-4 pt-2.5">
        <div className="overflow-hidden rounded-md border border-[var(--color-line)]">
          <div
            className="grid gap-2 border-b border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-[var(--color-faint)]"
            style={{ gridTemplateColumns: gridCols }}
          >
            {cols.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          {rows.map((row, i) => (
            <div
              key={i}
              className={cn(
                "grid items-center gap-2 px-3 py-2 text-[10px]",
                i % 2 === 1 && "bg-[var(--color-surface)]/40",
              )}
              style={{ gridTemplateColumns: gridCols }}
            >
              <span className="font-mono font-semibold text-[var(--color-primary-soft)]">
                {row.rank}
              </span>
              <span className="truncate font-medium">{row.athlete}</span>
              <span className="truncate text-[var(--color-muted)]">{row.club}</span>
              <span>
                {row.medal && (
                  <span
                    className={cn(
                      "inline-block rounded-full px-2 py-0.5 text-[9px] font-medium",
                      medalTone[row.medal],
                    )}
                  >
                    {r.medals[row.medal]}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: "default" | "accent";
}) {
  return (
    <div className="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] p-2.5 edge-light">
      <Icon size={13} className="mb-1.5 text-[var(--color-faint)]" />
      <p className="text-[15px] font-extrabold leading-none">{value}</p>
      <p
        className={cn(
          "mt-1 text-[9px]",
          tone === "accent" ? "text-[var(--color-primary-soft)]" : "text-[var(--color-muted)]",
        )}
      >
        {label}
      </p>
    </div>
  );
}
