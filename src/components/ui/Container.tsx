import { cn } from "@/lib/utils";

/** Max-width page container with responsive gutters. */
export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 xl:px-12",
        size === "default" && "max-w-[1360px]",
        size === "wide" && "max-w-[1680px]",
        size === "narrow" && "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
