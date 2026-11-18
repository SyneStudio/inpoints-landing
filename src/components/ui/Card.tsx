import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Site-wide "case" surface — the shared card DA, modeled on the Solution
 * feature cards: on hover its border and surface brighten, nothing else
 * moves. Pass padding and inner layout through `className` / children.
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
        "group relative h-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-line-strong)] hover:bg-[var(--color-surface-2)]",
        className,
      )}
    >
      <div className="relative h-full">{children}</div>
    </div>
  );
}

/** Icon tile for use inside a Card; its border takes the accent on card hover. */
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
        "grid shrink-0 place-items-center rounded-[var(--radius)] border border-[var(--color-line-strong)] bg-[var(--color-bg)] text-[var(--color-primary-soft)] transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:border-[var(--color-primary)]",
        className,
      )}
    >
      <Icon size={size} aria-hidden />
    </span>
  );
}
