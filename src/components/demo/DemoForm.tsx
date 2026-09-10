"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { demoRequestSchema } from "@/lib/validation";
import { ButtonEl } from "@/components/ui/Button";
import { useT } from "@/lib/i18n/provider";

type Status = "idle" | "submitting" | "success" | "error";
type Fields = {
  name: string;
  email: string;
  federation: string;
  role: string;
  message: string;
  company: string; // honeypot
};

const empty: Fields = {
  name: "",
  email: "",
  federation: "",
  role: "",
  message: "",
  company: "",
};

export function DemoForm() {
  const t = useT();
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  function set<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = demoRequestSchema.safeParse(fields);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next: Record<string, string> = {};
      for (const [k, v] of Object.entries(flat)) if (v?.[0]) next[k] = v[0];
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setFields(empty);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-success)]/40 bg-[var(--color-surface)] px-6 py-12 text-center">
        <CheckCircle2 className="text-[var(--color-success)]" size={40} />
        <h3 className="text-h3">{t.form.successTitle}</h3>
        <p className="max-w-sm text-sm text-[var(--color-muted)]">
          {t.form.successText}
        </p>
        <ButtonEl
          variant="secondary"
          className="mt-2"
          onClick={() => setStatus("idle")}
        >
          {t.form.another}
        </ButtonEl>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={t.form.name}
          value={fields.name}
          onChange={(v) => set("name", v)}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          label={t.form.email}
          type="email"
          value={fields.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          label={t.form.federation}
          value={fields.federation}
          onChange={(v) => set("federation", v)}
          error={errors.federation}
        />
        <Field
          label={t.form.role}
          value={fields.role}
          onChange={(v) => set("role", v)}
          error={errors.role}
          optional
        />
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium">
          {t.form.message}{" "}
          <span className="text-[var(--color-faint)]">{t.form.optional}</span>
        </label>
        <textarea
          value={fields.message}
          onChange={(e) => set("message", e.target.value)}
          rows={4}
          className="w-full resize-none rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-fg)] outline-none transition-colors placeholder:text-[var(--color-faint)] focus:border-[var(--color-primary)]"
          placeholder={t.form.messagePlaceholder}
        />
      </div>

      {/* honeypot (hidden from users & AT) */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Ne pas remplir
          <input
            tabIndex={-1}
            autoComplete="off"
            value={fields.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </label>
      </div>

      {status === "error" && (
        <p className="mt-4 flex items-center gap-2 text-sm text-[var(--color-primary-soft)]">
          <AlertCircle size={15} />
          {t.form.error}
        </p>
      )}

      <ButtonEl
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-6 w-full"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={17} className="animate-spin" /> {t.form.submitting}
          </>
        ) : (
          t.form.submit
        )}
      </ButtonEl>
      <p className="mt-3 text-center text-xs text-[var(--color-faint)]">
        {t.form.privacy}
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  optional,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  optional?: boolean;
  autoComplete?: string;
}) {
  const t = useT();
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">
        {label}{" "}
        {optional && (
          <span className="text-[var(--color-faint)]">{t.form.optional}</span>
        )}
      </label>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className="w-full rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-fg)] outline-none transition-colors placeholder:text-[var(--color-faint)] focus:border-[var(--color-primary)] aria-[invalid=true]:border-[var(--color-primary)]"
      />
      {error && (
        <p className="mt-1 text-xs text-[var(--color-primary-soft)]">{error}</p>
      )}
    </div>
  );
}
