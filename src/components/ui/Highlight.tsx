import type { ReactNode } from "react";

/**
 * Site-wide emphasis mark: highlights the key phrase of a title in the brand
 * red (primary-soft). Reused across sections so the highlight scheme stays
 * consistent everywhere.
 */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-[var(--color-primary-soft)]">{children}</span>;
}
