"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CalendarCheck, CheckCircle2, Loader2, MailCheck, PhoneCall, X } from "lucide-react";
import { ButtonEl } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

/** Les créneaux : du lundi au vendredi, de 11 h à 16 h 30, par demi-heure. */
const SLOTS = Array.from({ length: 11 }, (_, i) => {
  const minutes = 11 * 60 + i * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});
/** Nombre de jours ouvrés proposés, à partir de demain. */
const DAYS = 20;

type Fields = { firstName: string; lastName: string; email: string; phone: string; federation: string; company: string };
const empty: Fields = { firstName: "", lastName: "", email: "", phone: "", federation: "", company: "" };
type Status = "idle" | "submitting" | "success" | "error";

function nextWeekdays(): Date[] {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < DAYS) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d));
  }
  return out;
}

/**
 * La prise de rendez-vous pour une démonstration. Le visiteur choisit un jour
 * et une heure — ou demande à être rappelé si rien ne lui convient — puis
 * laisse ses coordonnées. La demande part vers la même route que le devis ;
 * le créneau et le téléphone voyagent dans le message, en français, pour la
 * personne qui confirmera le rendez-vous par e-mail.
 */
export function DemoBooking({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, locale } = useI18n();
  const b = t.booking;
  const ref = useRef<HTMLDialogElement>(null);

  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [callback, setCallback] = useState(false);
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  // Calculés à l'ouverture seulement : la date du jour n'existe pas au rendu
  // serveur, et la fenêtre n'est jamais ouverte à ce moment-là.
  const days = useMemo(() => (open ? nextWeekdays() : []), [open]);
  const fmt = useMemo(
    () => ({
      weekday: new Intl.DateTimeFormat(locale, { weekday: "short" }),
      month: new Intl.DateTimeFormat(locale, { month: "short" }),
      long: new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long" }),
    }),
    [locale],
  );

  function set<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  function close() {
    onClose();
    // Une demande envoyée ne doit pas réapparaître à la réouverture.
    if (status === "success") {
      setStatus("idle");
      setFields(empty);
      setDay(null);
      setTime(null);
      setCallback(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    for (const k of ["firstName", "lastName", "federation"] as const) {
      if (fields[k].trim().length < 2) next[k] = b.required;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = b.invalidEmail;
    if (fields.phone.replace(/\D/g, "").length < 8) next.phone = b.invalidPhone;
    if (!callback && (day === null || time === null)) next.slot = b.pickSlot;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const when =
      callback || day === null
        ? "Aucun créneau ne convient : à rappeler dès que possible."
        : `Créneau souhaité : ${new Intl.DateTimeFormat("fr-BE", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(days[day])} à ${time} (heure de Bruxelles).`;

    setStatus("submitting");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${fields.firstName.trim()} ${fields.lastName.trim()}`,
          email: fields.email.trim(),
          federation: fields.federation.trim(),
          role: "Demande de démonstration",
          message: `[Démonstration] ${when} Téléphone : ${fields.phone.trim()}`,
          company: fields.company,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={ref}
      aria-label={b.title}
      onClose={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="m-auto max-h-[92dvh] w-[min(94vw,720px)] max-w-none overflow-y-auto rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] bg-[var(--color-surface)] p-0 text-[var(--color-fg)] shadow-card backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={close}
            aria-label={b.close}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-fg)]"
          >
            <X size={17} aria-hidden />
          </button>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <CheckCircle2 className="text-[var(--color-success)]" size={44} aria-hidden />
              <h2 className="text-h3">{b.successTitle}</h2>
              <p className="max-w-md text-[var(--color-muted)]">
                {callback || day === null || time === null
                  ? b.successCall
                  : b.successSlot.replace("{date}", fmt.long.format(days[day])).replace("{time}", time)}
              </p>
              <ButtonEl variant="secondary" className="mt-3" onClick={close}>
                {b.close}
              </ButtonEl>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="flex items-start gap-3 pr-10">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius)] bg-[var(--color-primary)]/15 text-[var(--color-primary-soft)]">
                  <CalendarCheck size={20} aria-hidden />
                </span>
                <div>
                  <h2 className="text-h3">{b.title}</h2>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{b.lead}</p>
                </div>
              </div>

              {/* Le créneau */}
              {callback ? (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius)] border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 px-4 py-3.5">
                  <p className="flex items-center gap-2.5 text-sm">
                    <PhoneCall size={16} aria-hidden className="text-[var(--color-primary-soft)]" />
                    {b.noSlotActive}
                  </p>
                  <button
                    type="button"
                    onClick={() => setCallback(false)}
                    className="text-sm font-semibold text-[var(--color-primary-soft)] underline-offset-4 hover:underline"
                  >
                    {b.backToSlots}
                  </button>
                </div>
              ) : (
                <>
                  <p className="mb-2 mt-6 text-sm font-medium">{b.dayLabel}</p>
                  <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
                    {days.map((d, i) => (
                      <button
                        key={d.toISOString()}
                        type="button"
                        aria-pressed={day === i}
                        aria-label={fmt.long.format(d)}
                        onClick={() => setDay(i)}
                        className={cn(
                          "flex w-[62px] shrink-0 flex-col items-center rounded-[var(--radius)] border px-2 py-2 transition-colors",
                          day === i
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                            : "border-[var(--color-line)] bg-[var(--color-bg)] hover:border-[var(--color-line-strong)]",
                        )}
                      >
                        <span className={cn("text-[11px] uppercase", day === i ? "text-white/80" : "text-[var(--color-faint)]")}>
                          {fmt.weekday.format(d).replace(".", "")}
                        </span>
                        <span className="text-lg font-bold leading-tight">{d.getDate()}</span>
                        <span className={cn("text-[11px]", day === i ? "text-white/80" : "text-[var(--color-faint)]")}>
                          {fmt.month.format(d).replace(".", "")}
                        </span>
                      </button>
                    ))}
                  </div>

                  <p className="mb-2 mt-4 text-sm font-medium">
                    {b.timeLabel} <span className="font-normal text-[var(--color-faint)]">({b.timezone})</span>
                  </p>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {SLOTS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={time === s}
                        onClick={() => setTime(s)}
                        className={cn(
                          "rounded-[var(--radius)] border py-2 text-sm font-semibold tabular-nums transition-colors",
                          time === s
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                            : "border-[var(--color-line)] bg-[var(--color-bg)] hover:border-[var(--color-line-strong)]",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCallback(true);
                      setErrors((e) => ({ ...e, slot: "" }));
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-[var(--radius)] border border-dashed border-[var(--color-line-strong)] px-4 py-2.5 text-sm font-medium text-[var(--color-muted)] transition-colors hover:border-[var(--color-primary)]/60 hover:text-[var(--color-fg)]"
                  >
                    <PhoneCall size={15} aria-hidden />
                    {b.noSlot}
                  </button>
                  {errors.slot && (day === null || time === null) && <p className="mt-2 text-xs text-[var(--color-primary-soft)]">{errors.slot}</p>}
                </>
              )}

              {/* Les coordonnées */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label={b.firstName} value={fields.firstName} onChange={(v) => set("firstName", v)} error={errors.firstName} autoComplete="given-name" />
                <Field label={b.lastName} value={fields.lastName} onChange={(v) => set("lastName", v)} error={errors.lastName} autoComplete="family-name" />
                <Field label={b.email} type="email" value={fields.email} onChange={(v) => set("email", v)} error={errors.email} autoComplete="email" />
                <Field label={b.phone} type="tel" value={fields.phone} onChange={(v) => set("phone", v)} error={errors.phone} autoComplete="tel" />
                <div className="sm:col-span-2">
                  <Field label={b.federation} value={fields.federation} onChange={(v) => set("federation", v)} error={errors.federation} autoComplete="organization" />
                </div>
              </div>

              {/* Pot de miel, invisible */}
              <div className="absolute -left-[9999px]" aria-hidden>
                <label>
                  Ne pas remplir
                  <input tabIndex={-1} autoComplete="off" value={fields.company} onChange={(e) => set("company", e.target.value)} />
                </label>
              </div>

              <p className="mt-5 flex items-start gap-2.5 rounded-[var(--radius)] bg-[var(--color-bg)] px-3.5 py-3 text-sm text-[var(--color-muted)]">
                {callback ? (
                  <PhoneCall size={16} aria-hidden className="mt-0.5 shrink-0 text-[var(--color-primary-soft)]" />
                ) : (
                  <MailCheck size={16} aria-hidden className="mt-0.5 shrink-0 text-[var(--color-primary-soft)]" />
                )}
                {callback ? b.noticeCall : b.notice}
              </p>

              {status === "error" && (
                <p className="mt-4 flex items-center gap-2 text-sm text-[var(--color-primary-soft)]">
                  <AlertCircle size={15} aria-hidden />
                  {b.error}
                </p>
              )}

              <ButtonEl type="submit" size="lg" disabled={status === "submitting"} className="mt-5 w-full">
                {status === "submitting" ? (
                  <>
                    <Loader2 size={17} className="animate-spin" aria-hidden /> {b.submitting}
                  </>
                ) : (
                  b.submit
                )}
              </ButtonEl>
              <p className="mt-3 text-center text-xs text-[var(--color-faint)]">{t.form.privacy}</p>
            </form>
          )}
        </div>
      )}
    </dialog>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className="w-full rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-fg)] outline-none transition-colors focus:border-[var(--color-primary)] aria-[invalid=true]:border-[var(--color-primary)]"
      />
      {error && <span className="mt-1 block text-xs text-[var(--color-primary-soft)]">{error}</span>}
    </label>
  );
}
