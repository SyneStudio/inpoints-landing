import { cn } from "@/lib/utils";

/** Small mono uppercase label, used above section titles. */
export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("text-kicker inline-flex items-center", className)}>{children}</span>
  );
}
