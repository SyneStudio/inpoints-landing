/** Supported UI locales. FR + EN are live; DE + NL are declared but disabled
 *  in the switcher until their dictionaries are translated. */
export const locales = ["fr", "en", "de", "nl"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeMeta: Record<
  Locale,
  { label: string; short: string; flag: string; enabled: boolean }
> = {
  fr: { label: "Français", short: "FR", flag: "🇫🇷", enabled: true },
  en: { label: "English", short: "EN", flag: "🇬🇧", enabled: true },
  de: { label: "Deutsch", short: "DE", flag: "🇩🇪", enabled: true },
  nl: { label: "Nederlands", short: "NL", flag: "🇳🇱", enabled: true },
};

export const STORAGE_KEY = "inpoints-locale";
