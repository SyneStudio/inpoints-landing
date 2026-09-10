"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultLocale, locales, STORAGE_KEY, type Locale } from "./config";
import { fr, type Dict } from "./fr";
import { en } from "./en";
import { de } from "./de";
import { nl } from "./nl";

const dictionaries: Record<Locale, Dict> = { fr, en, de, nl };

type I18nValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Server + first client render both use the default locale (matches
  // <html lang="fr">), so there is no hydration mismatch; the stored/browser
  // locale is applied right after mount.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && locales.includes(saved)) {
        setLocaleState(saved);
        return;
      }
      const nav = navigator.language?.slice(0, 2).toLowerCase() as Locale;
      if (nav && locales.includes(nav) && dictionaries[nav]) {
        setLocaleState(nav);
      }
    } catch {
      /* localStorage / navigator unavailable — keep default */
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.lang = locale;
    } catch {
      /* noop */
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* noop */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale, t: dictionaries[locale] ?? fr }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}

/** Convenience hook returning just the active dictionary. */
export function useT(): Dict {
  return useI18n().t;
}
