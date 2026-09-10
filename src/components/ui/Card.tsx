import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Site-wide "case" surface — the shared card DA, modeled on the Solution
 * feature cards: it lifts on hover, reveals a soft red brand glow and brightens
 * its border. Pass padding and inner layout through `className` / children.
 */
export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-line-strong)] hover:bg-[var(--color-surface-2)] hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      <div className="brand-glow pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

/** Red icon tile for use inside a Card; its border reddens on card hover. */
export function CardIcon({
  icon: Icon,
  size = 20,
  className,
}: {
  icon: LucideIcon;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-[var(--radius)] border border-[var(--color-line-strong)] bg-[var(--color-bg)] text-[var(--color-primary-soft)] transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:border-[var(--color-primary)]/50",
        className,
      )}
    >
      <Icon size={size} aria-hidden />
    </span>
  );
}
