import { cn } from "@/lib/utils";

/** Standard vertical section rhythm with optional alternating band + id anchor. */
export function Section({
  id,
  children,
  className,
  band = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  band?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-20 sm:py-24 lg:py-28",
        band && "bg-[var(--color-bg-subtle)] border-y border-[var(--color-line)]",
        className,
      )}
    >
      {children}
    </section>
  );
}
