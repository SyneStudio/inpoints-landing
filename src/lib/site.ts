/**
 * Central site configuration — used for metadata, navigation and structured data.
 */

export const siteConfig = {
  name: "Inpoints",
  /** L'éditeur, tel qu'il figure dans les mentions légales : une personne, pas une société. */
  legalName: "Théo Bauweleers — Syne Studio",
  tagline: "Le logiciel qui vous accompagne à chaque compétition",
  description:
    "Inpoints accompagne l'organisation d'une compétition de sports de combat de l'inscription aux résultats : participants, brackets, arbitrage électronique, direct, écran géant et classements. Application sœur d'InSports.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://inpoints-landing.vercel.app",
  locale: "fr_FR",
  email: "contact@insport.app",
  /** Le site vitrine de l'application sœur — lien croisé dans le pied de page. */
  siblingName: "InSports",
  siblingUrl: "https://insport-landing.vercel.app",
  /** L'application elle-même : les documents juridiques y sont publiés sous /legal. */
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://app.inpoints.be",
} as const;

