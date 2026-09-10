import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * Type system — kept deliberately close to the InSports application itself.
 * - sans:    Inter — the exact UI face used across the product dashboard.
 * - display: Inter (heavy weights) — large, tight headlines for the vitrine.
 * - mono:    JetBrains Mono — technical kickers, labels & metrics.
 */

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--ff-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});
