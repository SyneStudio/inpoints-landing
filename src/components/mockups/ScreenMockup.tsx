"use client";

import { Search, Plus, Download, Upload, ChevronDown } from "lucide-react";
import type { ScreenId } from "@/data/screens";
import { ConsoleMockup } from "./ConsoleMockup";
import { BracketMockup } from "./BracketMockup";
import { PlanningMockup } from "./PlanningMockup";
import { ScoringMockup } from "./ScoringMockup";
import { ResultsMockup } from "./ResultsMockup";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type Tone = "success" | "warn" | "info" | "muted";
type StatusKey =
  | "live"
  | "done"
  | "scheduled"
  | "open"
  | "checked"
  | "pending"
  | "validated";
type Badge = { tone: Tone; key: StatusKey };
type Cell = string | Badge;
type Row = Record<string, Cell>;

const isBadge = (v: Cell): v is Badge =>
  typeof v === "object" && v !== null && "tone" in v;

const toneClass: Record<Tone, string> = {
  success: "bg-[var(--color-success)]/15 text-[var(--color-success)]",
  warn: "bg-[var(--color-warn)]/15 text-[var(--color-warn)]",
  info: "bg-[var(--color-info)]/15 text-[var(--color-info)]",
  muted: "bg-[var(--color-surface-2)] text-[var(--color-muted)]",
};

const S = (tone: Tone, key: StatusKey): Badge => ({ tone, key });

/**
 * Un écran de l'application, rendu comme maquette. Cinq des six écrans ont
 * leur propre composant — un tableau, un planning et une console d'arbitrage
 * ne se réduisent pas à une liste. Reste ici la liste des engagés, qui, elle,
 * en est bien une.
 */
export function ScreenMockup({ id }: { id: ScreenId }) {
  const t = useT();

  if (id === "dashboard") return <ConsoleMockup className="h-full" />;
  if (id === "draws") return <BracketMockup className="h-full" />;
  if (id === "planning") return <PlanningMockup className="h-full" />;
  if (id === "scoring") return <ScoringMockup className="h-full" />;
  if (id === "results") return <ResultsMockup className="h-full" />;

  const m = t.mock.participants;
  const cols = [
    { key: "name", label: m.columns.name },
    { key: "club", label: m.columns.club },
    { key: "category", label: m.columns.category },
    { key: "desk", label: m.columns.desk },
    { key: "status", label: m.columns.status },
  ];
  const rows: Row[] = [
    { name: "Marie Laurent", club: "Club Olympique", category: "Senior · A", desk: S("success", "checked"), status: S("info", "live") },
    { name: "Thomas Bernard", club: "Élan Régional", category: "Senior · A", desk: S("success", "checked"), status: S("muted", "done") },
    { name: "Sofia Moreau", club: "Académie des Sports", category: "Junior · B", desk: S("success", "checked"), status: S("muted", "scheduled") },
    { name: "Lucas Petit", club: "Union Sportive Nord", category: "Junior · B", desk: S("warn", "pending"), status: S("muted", "scheduled") },
    { name: "Emma Girard", club: "Cercle Athlétique", category: "Senior · C", desk: S("success", "checked"), status: S("info", "live") },
    { name: "Hugo Fabre", club: "Racing Club Sud", category: "Senior · C", desk: S("success", "checked"), status: S("muted", "done") },
    { name: "Léa Dubois", club: "Étoile Sportive", category: "Junior · B", desk: S("warn", "pending"), status: S("muted", "scheduled") },
    { name: "Nathan Roux", club: "Club Olympique", category: "Senior · A", desk: S("success", "checked"), status: S("muted", "done") },
  ];
  const gridCols = "1.4fr 1.4fr 1fr 1fr 1fr";

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-bg)] text-[11px] text-[var(--color-fg)]"
      aria-hidden
    >
      <div className="flex items-center justify-between px-4 pt-3">
        <h3 className="text-[15px] font-extrabold tracking-tight">{m.title}</h3>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1.5 text-[10px] text-[var(--color-muted)]">
            <Download size={11} />
            {m.actions.export}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1.5 text-[10px] text-[var(--color-muted)]">
            <Upload size={11} />
            {m.actions.import}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-primary)] px-2.5 py-1.5 text-[10px] font-semibold text-white">
            <Plus size={11} /> {m.primary}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2.5">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1.5 text-[var(--color-faint)]">
          <Search size={11} />
          <span className="text-[10px]">{m.search}</span>
        </div>
        {m.filters.map((f) => (
          <span
            key={f}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1.5 text-[10px] text-[var(--color-muted)]"
          >
            {f}
            <ChevronDown size={10} />
          </span>
        ))}
        <span className="shrink-0 pl-1 text-[10px] text-[var(--color-faint)]">{m.count}</span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-4 pb-4 pt-1">
        <div className="overflow-hidden rounded-md border border-[var(--color-line)]">
          <div
            className="grid gap-2 border-b border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-[var(--color-faint)]"
            style={{ gridTemplateColumns: gridCols }}
          >
            {cols.map((c) => (
              <span key={c.key}>{c.label}</span>
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
              {cols.map((c, ci) => {
                const v = row[c.key];
                return (
                  <span
                    key={c.key}
                    className={cn(
                      "truncate",
                      ci === 0
                        ? "font-medium text-[var(--color-primary-soft)]"
                        : "text-[var(--color-muted)]",
                    )}
                  >
                    {isBadge(v) ? (
                      <span
                        className={cn(
                          "inline-block rounded-full px-2 py-0.5 text-[9px] font-medium",
                          toneClass[v.tone],
                        )}
                      >
                        {t.mock.status[v.key]}
                      </span>
                    ) : (
                      v
                    )}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
