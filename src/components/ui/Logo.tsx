import { cn } from "@/lib/utils";

/**
 * Marque Inpoints. La tuile reprend la géométrie de celle d'InSports — même
 * taille, même rayon, même filet — mais le monogramme y est remplacé par ce
 * que fait le produit : deux entrées qui se rejoignent en un point. C'est un
 * tableau de compétition réduit à son geste minimal, et c'est aussi pourquoi
 * le point final est plein : c'est lui qui porte le résultat.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-8 w-8 place-items-center rounded-[9px] bg-gradient-to-br from-[#17253e] to-[#0a1120] border border-[var(--color-line-strong)] edge-light">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          {/* deux entrées qui se rejoignent — le geste d'un tableau */}
          <path
            d="M4 6h4.5a3 3 0 0 1 3 3v6a3 3 0 0 0 3 3H19"
            stroke="var(--color-primary-soft)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 18h4.5"
            stroke="var(--color-line-strong)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="19" cy="18" r="2.2" fill="var(--color-primary-soft)" />
        </svg>
      </span>
      {showWordmark && (
        <span className="text-[1.05rem] font-extrabold tracking-tight text-[var(--color-fg)]">
          In<span className="text-[var(--color-primary-soft)]">points</span>
        </span>
      )}
    </span>
  );
}
