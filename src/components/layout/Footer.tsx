"use client";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site";
import { useT } from "@/lib/i18n/provider";

// Hrefs parallel the dictionary link arrays (t.footer.columns.*.links).
const hrefs = {
  platform: ["#fonctionnalites", "#application", "#securite", "#tarifs"],
  resources: ["#", "#contact", "#"],
  company: ["#", "#contact"],
  legal: ["#", "#", "#"],
} as const;

export function Footer() {
  const t = useT();
  const columns = [
    { ...t.footer.columns.platform, hrefs: hrefs.platform },
    { ...t.footer.columns.resources, hrefs: hrefs.resources },
    { ...t.footer.columns.company, hrefs: hrefs.company },
    { ...t.footer.columns.legal, hrefs: hrefs.legal },
  ];

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg-subtle)]">
      <Container size="wide" className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
              {t.footer.description}
            </p>
            {/* Le lien croisé vers l'application sœur : les deux produits
                partagent le même socle fédéral, et le dire ici évite de le
                faire deviner. */}
            <p className="mt-5 text-xs text-[var(--color-faint)]">
              {t.footer.siblingLabel}{" "}
              <a
                href={siteConfig.siblingUrl}
                className="font-medium text-[var(--color-primary-soft)] underline-offset-4 hover:underline"
              >
                {siteConfig.siblingName}
              </a>
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-faint)]">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((label, i) => (
                  <li key={label}>
                    <a
                      href={col.hrefs[i] ?? "#"}
                      className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-faint)] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. {t.footer.rights}
          </p>
          <p>{t.footer.madeFor}</p>
        </div>
      </Container>
    </footer>
  );
}
