/**
 * Central site configuration — used for metadata, navigation and structured data.
 */

export const siteConfig = {
  name: "Inpoints",
  /** L'éditeur, tel qu'il figure dans les mentions légales : une personne, pas une société. */
  legalName: "Théo Bauweleers — Syne Studio",
  tagline: "Votre logiciel d'organisation de compétition",
  description:
    "Inpoints est le logiciel de gestion de compétitions pour les sports de combat : inscriptions, participants, tableaux, arbitrage électronique, direct, écran géant et classements. Application sœur d'InSports.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://inpoints-landing.vercel.app",
  locale: "fr_FR",
  email: "synestudio@hotmail.com",
  /** Le site vitrine de l'application sœur — lien croisé dans le pied de page. */
  siblingName: "InSports",
  siblingUrl: "https://insport-landing.vercel.app",
  /** L'application elle-même : les documents juridiques y sont publiés sous /legal. */
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://app.inpoints.be",
} as const;

