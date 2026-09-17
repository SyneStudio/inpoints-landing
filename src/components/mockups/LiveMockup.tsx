"use client";

import { Radio, Clock, Users, ChevronRight } from "lucide-react";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * La page publique, vue depuis un téléphone. Elle s'ouvre sans compte et
 * montre la même journée que la console : les rencontres en cours par aire,
 * ce qui suit, les derniers résultats — et, pour l'athlète, sa prochaine
 * rencontre avec un horaire ESTIMÉ, qui bouge si la journée prend du retard.
 */
export function LiveMockup({ className }: { className?: string }) {
  const t = useT();
  const l = t.mock.live;
  const sb = t.mock.scoreboard;

  const now = [
    { court: 1, red: "M. Laurent", blue: "A. Costa", rs: 4, bs: 2, round: 2 },
    { court: 2, red: "E. Girard", blue: "L. Petit", rs: 1, bs: 3, round: 1 },
    { court: 3, red: "S. Moreau", blue: "H. Fabre", rs: 0, bs: 0, round: 1 },
  ];
  const next = [
    { court: 1, label: "Senior · A — Finale", eta: "11:40" },
    { court: 2, label: "Junior · B — Demies", eta: "11:25" },
  ];
  const results = [
    { label: "Junior · B — Quarts", a: "N. Roux", b: "T. Bernard", s: "5 – 3" },
    { label: "Senior · C — Quarts", a: "E. Girard", b: "H. Fabre", s: "4 – 1" },
  ];

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden bg-[var(--color-bg)] text-[10px] text-[var(--color-fg)]",
        className,
      )}
      aria-hidden
    >
      {/* En-tête de la page publique */}
      <div className="border-b border-[var(--color-line)] px-3.5 pb-2.5 pt-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 px-2 py-0.5 text-[8.5px] font-semibold text-[var(--color-primary-soft)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-primary-soft)]" />
            {sb.live}
          </span>
          <span className="inline-flex items-center gap-1 text-[8.5px] text-[var(--color-faint)]">
            <Users size={9} /> 214 {l.followers}
          </span>
        </div>
        <p className="mt-2 text-[12px] font-extrabold tracking-tight">{t.mock.console.competition}</p>
        <p className="text-[8.5px] text-[var(--color-faint)]">{t.mock.console.subtitle}</p>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-hidden px-3.5 py-3">
        {/* Ma prochaine rencontre */}
        <div className="relative overflow-hidden rounded-lg border border-[var(--color-primary)]/40 bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-surface)] p-2.5">
          <div className="brand-glow absolute -right-8 -top-8 h-24 w-24 rounded-full" />
          <p className="text-[8px] font-semibold uppercase tracking-wider text-[var(--color-primary-soft)]">
            {l.mine}
          </p>
          <div className="mt-1 flex items-end justify-between">
            <span>
              <span className="block text-[11px] font-bold">Senior · A — Finale</span>
              <span className="text-[8.5px] text-[var(--color-muted)]">
                {l.court} 1 · vs A. Costa
              </span>
            </span>
            <span className="text-right">
              <span className="block text-[8px] text-[var(--color-faint)]">{l.eta}</span>
              <span className="inline-flex items-center gap-1 font-mono text-[12px] font-semibold">
                <Clock size={10} className="text-[var(--color-warn)]" /> 11:40
              </span>
            </span>
          </div>
        </div>

        {/* En ce moment */}
        <Block title={l.now} icon={Radio}>
          {now.map((m) => (
            <div key={m.court} className="flex items-center gap-2 py-1.5">
              <span className="w-9 shrink-0 font-mono text-[8px] uppercase text-[var(--color-faint)]">
                {l.court} {m.court}
              </span>
              <span className="flex min-w-0 flex-1 items-center justify-between gap-1">
                <span className="truncate text-[var(--color-corner-red)]">{m.red}</span>
                <span className="shrink-0 rounded bg-[var(--color-surface-2)] px-1.5 font-mono text-[10px] font-bold">
                  {m.rs}–{m.bs}
                </span>
                <span className="truncate text-right text-[var(--color-corner-blue)]">{m.blue}</span>
              </span>
              <span className="w-6 shrink-0 text-right font-mono text-[8px] text-[var(--color-faint)]">
                R{m.round}
              </span>
            </div>
          ))}
        </Block>

        {/* À suivre */}
        <Block title={l.next} icon={Clock}>
          {next.map((n) => (
            <div key={n.label} className="flex items-center gap-2 py-1.5">
              <span className="w-9 shrink-0 font-mono text-[8px] uppercase text-[var(--color-faint)]">
                {l.court} {n.court}
              </span>
              <span className="min-w-0 flex-1 truncate text-[var(--color-muted)]">{n.label}</span>
              <span className="shrink-0 font-mono text-[9px]">{n.eta}</span>
              <ChevronRight size={10} className="shrink-0 text-[var(--color-faint)]" />
            </div>
          ))}
        </Block>

        {/* Derniers résultats */}
        <Block title={l.results}>
          {results.map((r) => (
            <div key={r.label} className="flex items-center gap-2 py-1.5">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[8px] text-[var(--color-faint)]">{r.label}</span>
                <span className="block truncate">
                  <span className="font-semibold">{r.a}</span>
                  <span className="text-[var(--color-faint)]"> · {r.b}</span>
                </span>
              </span>
              <span className="shrink-0 font-mono text-[10px] font-bold text-[var(--color-primary-soft)]">
                {r.s}
              </span>
            </div>
          ))}
        </Block>
      </div>
    </div>
  );
}

function Block({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: typeof Radio;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-0.5 flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-wider text-[var(--color-faint)]">
        {Icon && <Icon size={9} />}
        {title}
      </p>
      <div className="divide-y divide-[var(--color-line)]/70 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5">
        {children}
      </div>
    </div>
  );
}

/** Un cadre de téléphone, sobre : une dalle, un rayon, une encoche. */
export function PhoneFrame({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] w-full overflow-hidden rounded-[30px] border border-[var(--color-line-strong)] bg-[#06090f] p-2 shadow-card edge-light",
        className,
      )}
    >
      <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-[#06090f]" />
      <div className="h-full w-full overflow-hidden rounded-[22px] border border-[var(--color-line)]">
        {children}
      </div>
    </div>
  );
}
