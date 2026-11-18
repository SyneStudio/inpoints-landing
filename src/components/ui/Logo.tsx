import { cn } from "@/lib/utils";

/**
 * Marque Inpoints. Trois quarts de cercle : deux pleins en haut, un plus clair
 * en bas à gauche, et le quatrième laissé vide. Le symbole se pose nu, sans
 * tuile ni cadre — c'est sa géométrie qui fait la marque, pas son écrin.
 * Les deux bleus sont ceux de la charte et ne suivent pas le thème.
 */
export function LogoMark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      <path d="M0 11.75A11.75 11.75 0 0 1 11.75 0v11.75Z" fill="var(--color-logo)" />
      <path d="M12.25 0A11.75 11.75 0 0 1 24 11.75H12.25Z" fill="var(--color-logo)" />
      <path d="M0 12.25h11.75A11.75 11.75 0 0 1 0 24Z" fill="var(--color-logo-soft)" />
    </svg>
  );
}

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {showWordmark && (
        <span className="text-[1.1rem] font-bold tracking-[-0.02em] text-[var(--color-fg)]">
          Inpoints
        </span>
      )}
    </span>
  );
}
