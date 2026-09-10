"use client";

import {
  LayoutGrid,
  Trophy,
  ScrollText,
  Users,
  ClipboardList,
  FileInput,
  Network,
  LandPlot,
  MapPin,
  CalendarClock,
  UsersRound,
  Gavel,
  Scale,
  Swords,
  Sparkles,
  Radio,
  FileText,
  ShieldAlert,
  Mail,
  Search,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * La console d'une journée de compétition, rendue en DOM pur (net à tout
 * zoom, peu coûteux à peindre). C'est la barre latérale réelle d'Inpoints :
 * le menu du produit, puis les sections de la compétition OUVERTE, groupées
 * par moment de la journée — préparation, organisation, sur le tapis, après.
 *
 * Aucune discipline n'est nommée.
 */
export function ConsoleMockup({ className }: { className?: string }) {
  const t = useT();
  const c = t.mock.console;

  type NavItem = { icon: LucideIcon; label: string; active?: boolean };
  type NavEntry = { group: string } | { competition: string } | NavItem;
  const nav: NavEntry[] = [
    { group: c.groups.main },
    { icon: LayoutGrid, label: c.nav.dashboard },
    { icon: Trophy, label: c.nav.competitions },
    { icon: ScrollText, label: c.nav.rulesets },
    { icon: Users, label: c.nav.people },
    { competition: c.competition },
    { group: c.groups.prepare },
    { icon: ClipboardList, label: c.nav.participants },
    { icon: FileInput, label: c.nav.requests },
    { icon: Network, label: c.nav.draws },
    { group: c.groups.organise },
    { icon: LandPlot, label: c.nav.courts },
    { icon: MapPin, label: c.nav.venue },
    { icon: CalendarClock, label: c.nav.planning },
    { icon: UsersRound, label: c.nav.officials },
    { group: c.groups.mat },
    { icon: Scale, label: c.nav.desk },
    { icon: Swords, label: c.nav.matches, active: true },
    { icon: Sparkles, label: c.nav.performances },
    { icon: Radio, label: c.nav.live },
    { icon: FileText, label: c.nav.sheets },
    { group: c.groups.after },
    { icon: ShieldAlert, label: c.nav.claims },
    { icon: Mail, label: c.nav.mail },
  ];

  return (
    <div
      className={cn(
        "flex h-full w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-bg)] text-[11px] text-[var(--color-fg)]",
        className,
      )}
      aria-hidden
    >
      {/* Barre latérale — la navigation réelle de l'application */}
      <aside className="hidden w-[178px] shrink-0 flex-col gap-0.5 overflow-hidden border-r border-[var(--color-line)] bg-[#08101d] p-3 sm:flex">
        <div className="mb-2 flex items-center gap-2 px-1">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-[var(--color-primary)] text-[9px] font-bold text-white">
            iP
          </span>
          <span className="text-[12px] font-bold">Inpoints</span>
        </div>
        {nav.map((e, i) =>
          "group" in e ? (
            <NavGroup key={i}>{e.group}</NavGroup>
          ) : "competition" in e ? (
            <p
              key={i}
              className="mt-2 truncate rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2 py-1.5 text-[9px] font-semibold text-[var(--color-primary-soft)]"
            >
              {e.competition}
            </p>
          ) : (
            <NavRow key={i} icon={e.icon} label={e.label} active={e.active} />
          ),
        )}
      </aside>

      {/* Corps */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-[var(--color-line)] px-4 py-2.5">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-1.5 text-[var(--color-faint)]">
            <Search size={11} />
            <span className="text-[10px]">{t.mock.searchGlobal}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 px-2 py-1 text-[9px] font-semibold text-[var(--color-primary-soft)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-primary-soft)]" />
            {t.mock.status.live}
          </span>
          <div className="grid h-6 w-6 place-items-center rounded-full bg-[var(--color-primary)] text-[9px] font-bold text-white">
            AF
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-hidden p-4">
          <div>
            <h3 className="text-[15px] font-extrabold tracking-tight">{c.competition}</h3>
            <p className="text-[10px] text-[var(--color-muted)]">{c.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            <Stat icon={ClipboardList} label={c.stats.registered} value="128" />
            <Stat icon={Swords} label={c.stats.matches} value="64" trend="+6" />
            <Stat icon={Radio} label={c.stats.live} value="3" tone="accent" />
            <Stat icon={LandPlot} label={c.stats.courts} value="4" />
          </div>

          <div className="flex items-center justify-between rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2">
            <span className="flex items-center gap-2">
              <ShieldAlert size={11} className="text-[var(--color-warn)]" />
              <span className="text-[10px]">{c.alert}</span>
            </span>
            <span className="text-[10px] font-semibold text-[var(--color-primary-soft)]">
              {c.handle}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
            <Panel title={c.upcoming}>
              <MatchRow
                court={c.matchRows[0].court}
                category={c.matchRows[0].category}
                red="M. Laurent"
                blue="T. Bernard"
                scoreA="4"
                scoreB="2"
                round="R2"
              />
              <MatchRow
                court={c.matchRows[1].court}
                category={c.matchRows[1].category}
                red="S. Moreau"
                blue="L. Petit"
                scoreA="1"
                scoreB="1"
                round="R1"
              />
              <MatchRow
                court={c.matchRows[2].court}
                category={c.matchRows[2].category}
                red="E. Girard"
                blue="H. Fabre"
                scoreA="6"
                scoreB="3"
                round="R3"
              />
            </Panel>
            <Panel title={c.journal}>
              {c.journalRows.map((r, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <p className="truncate text-[10px] text-[var(--color-muted)]">{r.text}</p>
                  <span className="shrink-0 font-mono text-[8.5px] text-[var(--color-faint)]">
                    {r.time}
                  </span>
                </div>
              ))}
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavRow({
  icon: Icon,
  label,
  active,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-[8px] px-2 py-1.5 text-[10px]",
        active
          ? "bg-[var(--color-primary)] font-semibold text-white"
          : "text-[var(--color-muted)]",
      )}
    >
      <Icon size={12} className="shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  );
}

function NavGroup({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-0.5 mt-2 px-1 text-[8px] uppercase tracking-wider text-[var(--color-faint)]">
      {children}
    </p>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  trend,
  tone = "default",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  tone?: "default" | "accent";
}) {
  return (
    <div className="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] p-2.5 edge-light">
      <div className="mb-1.5 flex items-center justify-between text-[var(--color-faint)]">
        <Icon size={13} />
        <ChevronRight size={11} />
      </div>
      <div className="flex items-end gap-1.5">
        <span className="text-[17px] font-extrabold leading-none">{value}</span>
        {trend && (
          <span className="mb-0.5 text-[9px] font-semibold text-[var(--color-success)]">
            {trend}
          </span>
        )}
      </div>
      <p
        className={cn(
          "mt-1 text-[9px]",
          tone === "accent"
            ? "text-[var(--color-primary-soft)]"
            : "text-[var(--color-muted)]",
        )}
      >
        {label}
      </p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] p-3">
      <p className="mb-2 text-[11px] font-bold">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

/**
 * Une rencontre en cours. Le rouge et le bleu désignent un CÔTÉ de l'aire, et
 * non une importance : ils ne s'échangent jamais, et le score prend la couleur
 * du coin qui l'a marqué.
 */
function MatchRow({
  court,
  category,
  red,
  blue,
  scoreA,
  scoreB,
  round,
}: {
  court: string;
  category: string;
  red: string;
  blue: string;
  scoreA: string;
  scoreB: string;
  round: string;
}) {
  return (
    <div className="rounded-md border border-[var(--color-line)] bg-[var(--color-bg)] px-2.5 py-2">
      <div className="mb-1 flex items-center justify-between text-[8.5px] text-[var(--color-faint)]">
        <span className="font-semibold uppercase tracking-wide">{court}</span>
        <span>
          {category} · {round}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="min-w-0 flex-1 truncate text-[10px] text-[var(--color-corner-red)]">
          {red}
        </span>
        <span className="shrink-0 font-mono text-[12px] font-bold">
          <span className="text-[var(--color-corner-red)]">{scoreA}</span>
          <span className="mx-1 text-[var(--color-faint)]">·</span>
          <span className="text-[var(--color-corner-blue)]">{scoreB}</span>
        </span>
        <span className="min-w-0 flex-1 truncate text-right text-[10px] text-[var(--color-corner-blue)]">
          {blue}
        </span>
      </div>
    </div>
  );
}
