"use client";

import { Check, X, Pencil, Send, Inbox, Globe } from "lucide-react";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type Request = {
  name: string;
  club: string;
  category: string;
  state: "pending" | "validated" | "fix";
};

/**
 * L'inscription, des deux côtés du guichet. À gauche, le formulaire PUBLIC
 * que remplit le club — sans compte, sur les catégories de la compétition.
 * À droite, la boîte de réception de l'organisateur : chaque demande se
 * valide, se refuse ou se renvoie pour correction, et une demande validée
 * devient un engagé — elle n'est pas recopiée dans une liste.
 */
export function RegistrationMockup({ className }: { className?: string }) {
  const t = useT();
  const r = t.mock.registration;
  const st = t.mock.status;

  const requests: Request[] = [
    { name: "Léa Dubois", club: "Étoile Sportive", category: "Junior · B", state: "validated" },
    { name: "Lucas Petit", club: "Union Sportive Nord", category: "Junior · B", state: "pending" },
    { name: "Nathan Roux", club: "Club Olympique", category: "Senior · A", state: "pending" },
    { name: "Inès Marchal", club: "Racing Club Sud", category: "Senior · C", state: "fix" },
    { name: "Adam Costa", club: "Union Sportive Nord", category: "Senior · A", state: "validated" },
  ];

  return (
    <div
      className={cn(
        "grid h-full w-full grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-bg)] text-[11px] text-[var(--color-fg)]",
        className,
      )}
      aria-hidden
    >
      {/* Le formulaire public, tel que le club le voit */}
      <div className="flex min-w-0 flex-col border-r border-[var(--color-line)] bg-[var(--color-bg-subtle)]">
        <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-3.5 py-2.5">
          <Globe size={11} className="text-[var(--color-primary-soft)]" />
          <span className="text-[10px] font-semibold">{r.form}</span>
          <span className="ml-auto truncate rounded-full border border-[var(--color-line)] px-2 py-0.5 font-mono text-[8px] text-[var(--color-faint)]">
            /c/nat-2026
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-3.5">
          <p className="text-[12px] font-extrabold tracking-tight">{t.mock.console.competition}</p>
          {r.fields.map((f, i) => (
            <div key={f}>
              <p className="mb-1 text-[8.5px] font-medium uppercase tracking-wider text-[var(--color-faint)]">
                {f}
              </p>
              <div
                className={cn(
                  "h-6 rounded-md border bg-[var(--color-bg)] px-2 text-[9.5px] leading-6",
                  i === 2
                    ? "border-[var(--color-primary)]/60 text-[var(--color-fg)] shadow-[0_0_0_2px_rgba(79,209,232,0.12)]"
                    : "border-[var(--color-line)] text-[var(--color-muted)]",
                )}
              >
                {["Lucas Petit", "Union Sportive Nord", "Junior · B", "BE-24-01187"][i]}
              </div>
            </div>
          ))}
          <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-md bg-[var(--color-primary)] py-1.5 text-[10px] font-semibold text-white">
            <Send size={10} /> {r.submit}
          </span>
        </div>
      </div>

      {/* La boîte de réception de l'organisateur */}
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center justify-between border-b border-[var(--color-line)] px-3.5 py-2.5">
          <span className="flex items-center gap-2">
            <Inbox size={11} className="text-[var(--color-primary-soft)]" />
            <span className="text-[10px] font-semibold">{r.inbox}</span>
          </span>
          <span className="rounded-full bg-[var(--color-warn)]/15 px-2 py-0.5 text-[8.5px] font-medium text-[var(--color-warn)]">
            {r.count}
          </span>
        </div>
        <div className="min-h-0 flex-1 divide-y divide-[var(--color-line)]/70 overflow-hidden">
          {requests.map((q) => (
            <div key={q.name} className="flex items-center gap-2.5 px-3.5 py-2">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-surface-2)] text-[8px] font-bold text-[var(--color-muted)]">
                {q.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[10px] font-medium">{q.name}</span>
                <span className="block truncate text-[8.5px] text-[var(--color-faint)]">
                  {q.club} · {q.category}
                </span>
              </span>
              {q.state === "pending" ? (
                <span className="flex shrink-0 items-center gap-1">
                  <Action tone="success" icon={Check} label={r.actions.validate} />
                  <Action tone="muted" icon={Pencil} label={r.actions.fix} />
                  <Action tone="muted" icon={X} label={r.actions.refuse} />
                </span>
              ) : q.state === "validated" ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--color-success)]/15 px-2 py-0.5 text-[8.5px] font-medium text-[var(--color-success)]">
                  <Check size={9} /> {st.validated}
                </span>
              ) : (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--color-warn)]/15 px-2 py-0.5 text-[8.5px] font-medium text-[var(--color-warn)]">
                  <Pencil size={9} /> {r.actions.fix}
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="flex items-center gap-1.5 border-t border-[var(--color-line)] bg-[var(--color-success)]/8 px-3.5 py-2 text-[9px] text-[var(--color-success)]">
          <Check size={10} />
          Léa Dubois — {r.validated}
        </p>
      </div>
    </div>
  );
}

function Action({
  tone,
  icon: Icon,
  label,
}: {
  tone: "success" | "muted";
  icon: typeof Check;
  label: string;
}) {
  return (
    <span
      title={label}
      className={cn(
        "grid h-6 w-6 place-items-center rounded-md border",
        tone === "success"
          ? "border-[var(--color-success)]/40 bg-[var(--color-success)]/10 text-[var(--color-success)]"
          : "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)]",
      )}
    >
      <Icon size={10} />
    </span>
  );
}
