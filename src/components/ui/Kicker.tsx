import { cn } from "@/lib/utils";

/** Small mono uppercase label with a leading tick, used above section titles. */
export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("text-kicker inline-flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="h-px w-6 bg-[var(--color-primary)]"
      />
      {children}
    </span>
  );
}
