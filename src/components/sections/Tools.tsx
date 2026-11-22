"use client";

import { ArrowDownRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Highlight } from "@/components/ui/Highlight";
import { CardIcon } from "@/components/ui/Card";
import { tools, type ToolId } from "@/data/tools";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * Les outils, en neuf cartes. Chacune porte une micro-maquette — pas une
 * icône de plus, mais un fragment de l'écran réel, réduit à son geste — qui
 * bouge au survol. Les quatre outils approfondis plus bas mènent à leur bloc.
 */
export function Tools() {
  const t = useT();
  return (
    <Section id="outils">
      <Container size="wide">
        <SectionTitle
          kicker={t.tools.kicker}
          title={
            <>
              {t.tools.titleA}
              <Highlight>{t.tools.titleHl}</Highlight>
            </>
          }
          lead={t.tools.lead}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map(({ id, icon, anchor }, i) => {
            const item = t.tools.items[id];
            const Tag = anchor ? "a" : "div";
            return (
              <Reveal key={id} delay={(i % 3) * 0.06}>
                <Tag
                  href={anchor}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-line-strong)] hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)]",
                    anchor && "cursor-pointer",
                  )}
                >
                  <div className="brand-glow pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* La micro-maquette */}
                  <div className="relative h-36 overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-bg)] px-5 pt-5">
                    <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
                    <ToolGlyph id={id} />
                  </div>

                  <div className="relative flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3">
                      <CardIcon icon={icon} size={17} className="h-9 w-9" />
                      <h3 className="text-[1.02rem] font-bold">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                      {item.description}
                    </p>
                    {anchor && (
                      <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-primary-soft)] opacity-70 transition-opacity group-hover:opacity-100">
                        {t.tools.more}
                        <ArrowDownRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                      </span>
                    )}
                  </div>
                </Tag>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Micro-maquettes                                                    */
/* ------------------------------------------------------------------ */

const box = "rounded-md border border-[var(--color-line)] bg-[var(--color-surface)]";
const line = "h-1.5 rounded-full bg-[var(--color-line-strong)]";
const tr = "transition-all duration-500 ease-[var(--ease-out-expo)]";

function ToolGlyph({ id }: { id: ToolId }) {
  switch (id) {
    case "competitions":
      return (
        <div className="relative space-y-2">
          <div className={cn(box, "flex items-center gap-2 px-3 py-2")}>
            <span className="h-5 w-5 rounded bg-[var(--color-primary)]/20" />
            <span className={cn(line, "w-24 bg-[var(--color-fg)]/70")} />
            <span className="ml-auto rounded-full bg-[var(--color-primary)]/15 px-2 py-0.5 font-mono text-[8px] text-[var(--color-primary-soft)]">
              4 · 128
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Senior · A", "Junior · B", "Senior · C"].map((c, i) => (
              <span
                key={c}
                className={cn(box, tr, "px-2 py-1.5 text-center text-[9px] text-[var(--color-muted)] group-hover:border-[var(--color-primary)]/40")}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn(line, "bg-[var(--color-line)]")} />
            ))}
          </div>
        </div>
      );
    case "registrations":
      return (
        <div className="relative grid grid-cols-[1fr_auto] items-end gap-3">
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className={cn(box, "h-6 px-2 py-1.5")}>
                <span className={cn(line, "block", ["w-16", "w-20", "w-12"][i])} />
              </div>
            ))}
            <div className="h-6 rounded-md bg-[var(--color-primary)] text-center text-[9px] font-semibold leading-6 text-white">
              →
            </div>
          </div>
          <div className={cn(box, tr, "grid h-14 w-14 place-items-center text-[var(--color-success)] opacity-40 group-hover:scale-110 group-hover:opacity-100")}>
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      );
    case "participants":
      return (
        <div className={cn(box, "relative overflow-hidden")}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                tr,
                "flex items-center gap-2 border-b border-[var(--color-line)]/70 px-2.5 py-1.5 last:border-0 group-hover:bg-[var(--color-primary)]/8",
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="h-4 w-4 rounded-full bg-[var(--color-surface-2)]" />
              <span className={cn(line, ["w-16", "w-12", "w-20", "w-14"][i], "bg-[var(--color-fg)]/60")} />
              <span className={cn(line, "w-10")} />
              <span className="ml-auto h-3 w-8 rounded-full bg-[var(--color-success)]/20" />
            </div>
          ))}
        </div>
      );
    case "brackets":
      return (
        <div className="relative grid grid-cols-[1fr_16px_1fr_16px_1fr] items-center gap-1">
          <div className="space-y-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn(box, "block h-5")} />
            ))}
          </div>
          <Connector n={2} />
          <div className="space-y-6">
            {[0, 1].map((i) => (
              <span key={i} className={cn(box, tr, "block h-5 group-hover:border-[var(--color-primary)]/50")} style={{ transitionDelay: "120ms" }} />
            ))}
          </div>
          <Connector n={1} />
          <span className={cn(box, tr, "block h-5 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/15")} style={{ transitionDelay: "260ms" }} />
        </div>
      );
    case "scoring":
      return (
        <div className="relative grid grid-cols-2 gap-2">
          <ScoreTile corner="red" value="4" />
          <ScoreTile corner="blue" value="2" />
          <div className="col-span-2 grid grid-cols-4 gap-1.5">
            {["+1", "+2", "+1", "+2"].map((a, i) => (
              <span
                key={i}
                className={cn(
                  box,
                  "py-1 text-center font-mono text-[9px]",
                  i < 2 ? "text-[var(--color-corner-red)]" : "text-[var(--color-corner-blue)]",
                )}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      );
    case "live":
      return (
        <div className="relative">
          <div className={cn(box, "flex items-center gap-2 px-3 py-2")}>
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-primary-soft)]" />
            <span className={cn(line, "w-20 bg-[var(--color-fg)]/60")} />
            <span className="ml-auto font-mono text-[9px] text-[var(--color-faint)]">214</span>
          </div>
          <div className="mt-2 flex h-14 items-end gap-1">
            {[40, 65, 50, 85, 60, 95, 70, 55, 80, 45, 75, 60].map((h, i) => (
              <span
                key={i}
                className={cn(tr, "flex-1 rounded-t bg-[var(--color-primary)]/30 group-hover:bg-[var(--color-primary)]/70")}
                style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }}
              />
            ))}
          </div>
        </div>
      );
    case "results":
      return (
        <div className="relative flex h-24 items-end justify-center gap-2">
          {[
            { h: "60%", label: "2", tone: "bg-[var(--color-surface-2)]" },
            { h: "100%", label: "1", tone: "bg-[#b08d2b]/40" },
            { h: "42%", label: "3", tone: "bg-[#8a5a2b]/40" },
          ].map((p, i) => (
            <div
              key={i}
              className={cn(tr, "flex w-16 origin-bottom flex-col items-center justify-end rounded-t-md border border-b-0 border-[var(--color-line)] group-hover:scale-y-[1.06]", p.tone)}
              style={{ height: p.h, transitionDelay: `${i * 60}ms` }}
            >
              <span className="pb-1 font-mono text-[11px] font-bold text-[var(--color-fg)]">{p.label}</span>
            </div>
          ))}
        </div>
      );
    case "planning":
      return (
        <div className="relative grid grid-cols-4 gap-1.5">
          {[
            ["done", "live", "sched"],
            ["done", "done", "sched"],
            ["live", "sched", "sched"],
            ["done", "break", "sched"],
          ].map((col, ci) => (
            <div key={ci} className="space-y-1.5">
              {col.map((s, ri) => (
                <span
                  key={ri}
                  className={cn(
                    tr,
                    "block h-7 rounded-md border",
                    s === "live" && "border-[var(--color-primary)]/60 bg-[var(--color-primary)]/15",
                    s === "done" && "border-[var(--color-line)] bg-[var(--color-surface)]",
                    s === "sched" && "border-[var(--color-line-strong)] bg-[var(--color-surface-2)] group-hover:translate-y-1",
                    s === "break" && "border-dashed border-[var(--color-line-strong)]",
                  )}
                  style={{ transitionDelay: `${ci * 50}ms` }}
                />
              ))}
            </div>
          ))}
        </div>
      );
    case "desk":
      return (
        <div className="relative grid grid-cols-[auto_1fr] items-center gap-3">
          <div className={cn(box, "flex h-20 w-20 flex-col items-center justify-center gap-1")}>
            <span className="font-mono text-[18px] font-bold">68<span className="text-[10px] text-[var(--color-faint)]">.4</span></span>
            <span className="font-mono text-[8px] uppercase tracking-wider text-[var(--color-faint)]">kg</span>
          </div>
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className={cn(box, "flex items-center gap-2 px-2 py-1.5")}>
                <span
                  className={cn(
                    tr,
                    "grid h-3.5 w-3.5 place-items-center rounded-full border",
                    i < 2
                      ? "border-[var(--color-success)] bg-[var(--color-success)]/20"
                      : "border-[var(--color-line-strong)] group-hover:border-[var(--color-success)] group-hover:bg-[var(--color-success)]/20",
                  )}
                  style={{ transitionDelay: "200ms" }}
                />
                <span className={cn(line, ["w-14", "w-10", "w-16"][i])} />
              </div>
            ))}
          </div>
        </div>
      );
  }
}

function Connector({ n }: { n: number }) {
  return (
    <svg viewBox="0 0 16 100" className="h-full w-4 text-[var(--color-line-strong)]" preserveAspectRatio="none" aria-hidden>
      {n === 2 ? (
        <path d="M0 14 H8 V36 H0 M8 25 H16 M0 64 H8 V86 H0 M8 75 H16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      ) : (
        <path d="M0 25 H8 V75 H0 M8 50 H16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  );
}

function ScoreTile({ corner, value }: { corner: "red" | "blue"; value: string }) {
  const color = corner === "red" ? "text-[var(--color-corner-red)]" : "text-[var(--color-corner-blue)]";
  const ring = corner === "red" ? "border-[var(--color-corner-red)]/40" : "border-[var(--color-corner-blue)]/40";
  return (
    <div className={cn("rounded-md border bg-[var(--color-surface)] px-3 py-2", ring)}>
      <span className={cn("block font-display text-[28px] font-extrabold leading-none", color, tr, "group-hover:scale-110 origin-left")}>
        {value}
      </span>
    </div>
  );
}
