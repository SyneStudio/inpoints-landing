"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site";
import { useT } from "@/lib/i18n/provider";

// Les ancres suivent t.footer.nav, dans le même ordre.
const navHrefs = ["#sports", "#outils", "#fonctionnalites", "#application", "#devis"];

// Les documents juridiques vivent dans l'application, lisibles sans compte :
// une seule source, et la vitrine n'en garde pas une copie qui vieillirait.
const legalHrefs = [
  siteConfig.appUrl + "/legal/confidentialite",
  siteConfig.appUrl + "/legal/mentions-legales",
  siteConfig.appUrl + "/legal/cgu",
  siteConfig.appUrl + "/legal/cookies",
];

/**
 * Le pied de page : la marque et ce qu'elle fait, un contact direct, la
 * navigation de la page, les documents juridiques. Rien qui mène à une page
 * qui n'existe pas.
 */
export function Footer() {
  const t = useT();
  const f = t.footer;

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg-subtle)]">
      <Container size="wide" className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">{f.description}</p>
            <p className="mt-5 text-xs text-[var(--color-faint)]">
              {f.siblingLabel}{" "}
              <a
                href={siteConfig.siblingUrl}
                className="inline-flex items-center gap-0.5 font-medium text-[var(--color-primary-soft)] underline-offset-4 hover:underline"
              >
                {siteConfig.siblingName}
                <ArrowUpRight size={12} aria-hidden />
              </a>
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-faint)]">
              {f.contactTitle}
            </h3>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm text-[var(--color-fg)] transition-colors hover:text-[var(--color-primary-soft)]"
            >
              <Mail size={15} aria-hidden className="text-[var(--color-faint)]" />
              {siteConfig.email}
            </a>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{siteConfig.legalName}</p>
          </div>

          <nav aria-label={f.navTitle}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-faint)]">
              {f.navTitle}
            </h3>
            <ul className="space-y-2.5">
              {f.nav.map((label, i) => (
                <li key={label}>
                  <a
                    href={navHrefs[i]}
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={f.legalTitle}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-faint)]">
              {f.legalTitle}
            </h3>
            <ul className="space-y-2.5">
              {f.legal.map((label, i) => (
                <li key={label}>
                  <a
                    href={legalHrefs[i]}
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-faint)] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. {f.rights}
          </p>
          <p>{f.madeFor}</p>
        </div>
      </Container>
    </footer>
  );
}
