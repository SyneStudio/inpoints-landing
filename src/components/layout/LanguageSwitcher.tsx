"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n/provider";
import { localeMeta, locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = localeMeta[locale];

  function choose(l: Locale) {
    if (!localeMeta[l].enabled) return;
    setLocale(l);
    setOpen(false);
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={localeMeta[locale].label}
        className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] px-2.5 py-2 text-sm text-[var(--color-muted)] transition-colors hover:border-[var(--color-line-strong)] hover:text-[var(--color-fg)]"
      >
        <Globe size={15} aria-hidden />
        <span className="font-medium">{current.short}</span>
        <ChevronDown
          size={13}
          aria-hidden
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      <div
        role="listbox"
        className={cn(
          "absolute right-0 top-[calc(100%+8px)] z-50 w-52 origin-top-right overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-surface)] p-1 shadow-card transition-all duration-150",
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
        )}
      >
        {locales.map((l) => {
          const m = localeMeta[l];
          const active = l === locale;
          return (
            <button
              key={l}
              type="button"
              role="option"
              aria-selected={active}
              disabled={!m.enabled}
              onClick={() => choose(l)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-[var(--radius)] px-2.5 py-2 text-left text-sm transition-colors",
                m.enabled
                  ? active
                    ? "bg-[var(--color-surface-2)] text-[var(--color-fg)]"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-fg)]"
                  : "cursor-not-allowed text-[var(--color-faint)]",
              )}
            >
              <span aria-hidden className="text-base leading-none">
                {m.flag}
              </span>
              <span className="flex-1">{m.label}</span>
              {active && <Check size={14} className="text-[var(--color-primary-soft)]" />}
              {!m.enabled && (
                <span className="rounded-full bg-[var(--color-bg)] px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-[var(--color-faint)]">
                  {t.lang.soon}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
