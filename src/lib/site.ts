/**
 * Central site configuration — used for metadata, navigation and structured data.
 */

export const siteConfig = {
  name: "Inpoints",
  /** L'éditeur, tel qu'il figure dans les mentions légales : une personne, pas une société. */
  legalName: "Théo Bauweleers — Syne Studio",
  tagline: "La plateforme de compétition, d'arbitrage et de résultats",
  description:
    "Inpoints gère la compétition de bout en bout : inscriptions, tirages et tableaux, terrains et planning, accueil et pesée, arbitrage électronique, direct, écran géant et résultats officiels. Application sœur d'InSports.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://inpoints-landing.vercel.app",
  locale: "fr_FR",
  email: "contact@insport.app",
  /** Le site vitrine de l'application sœur — lien croisé dans le pied de page. */
  siblingName: "InSports",
  siblingUrl: "https://insport-landing.vercel.app",
  /** L'application elle-même : les documents juridiques y sont publiés sous /legal. */
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://app.inpoints.be",
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Pour qui", href: "#federations" },
  { label: "Application", href: "#application" },
  { label: "Sécurité", href: "#securite" },
  { label: "Tarifs", href: "#tarifs" },
];
