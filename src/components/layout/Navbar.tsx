"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useT } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

const NAV = [
  { key: "features", href: "#fonctionnalites" },
  { key: "federations", href: "#federations" },
  { key: "application", href: "#application" },
  { key: "security", href: "#securite" },
  { key: "pricing", href: "#tarifs" },
] as const;

export function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy: highlight the nav item whose section crosses the viewport middle
  useEffect(() => {
    const els = NAV.map((i) => document.getElementById(i.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-line)] bg-[rgba(10,17,32,0.82)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container size="wide">
        <nav className="flex h-16 items-center justify-between gap-4">
          <a href="#top" aria-label="Inpoints">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "text-[var(--color-fg)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-fg)]",
                    )}
                  >
                    {t.nav[item.key]}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 bottom-1 h-px origin-left bg-[var(--color-primary)] transition-transform duration-300 ease-[var(--ease-out-expo)]",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <Button href="#contact" variant="ghost" size="md">
              {t.nav.contact}
            </Button>
            <Button href="#demo" variant="primary" size="md">
              {t.nav.demo}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-md border border-[var(--color-line)] text-[var(--color-fg)]"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile panel */}
      <div
        className={cn(
          "overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-bg)] transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container>
          <ul className="flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-[15px] text-[var(--color-fg)] hover:bg-[var(--color-surface)]"
                >
                  {t.nav[item.key]}
                </a>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-2">
              <Button href="#demo" variant="primary" size="lg" onClick={() => setOpen(false)}>
                {t.nav.demo}
              </Button>
              <Button href="#contact" variant="secondary" size="lg" onClick={() => setOpen(false)}>
                {t.nav.contact}
              </Button>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
}
