import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius)] transition-all duration-200 ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none select-none active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white shadow-[0_6px_24px_-8px_rgba(11,122,171,0.7)] hover:bg-[var(--color-primary-strong)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-[var(--color-surface-2)] text-[var(--color-fg)] border border-[var(--color-line-strong)] hover:bg-[var(--color-surface)] hover:border-[var(--color-faint)] hover:-translate-y-0.5",
  ghost:
    "text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface)]",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps &
  ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const external = href.startsWith("http");
  if (external) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonEl({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
