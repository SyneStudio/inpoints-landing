import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Une capture de l'application, montrée telle quelle : recadrée, jamais
 * redessinée. Ce que le visiteur voit ici est ce qu'il trouvera une fois
 * connecté. `cover` remplit un cadre de proportions fixes en gardant le coin
 * haut-gauche de l'écran ; sans lui, l'image garde ses proportions.
 */
export function AppShot({
  src,
  alt,
  sizes,
  cover = false,
  eager = false,
  className,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  cover?: boolean;
  eager?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      quality={95}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      className={cn(
        cover ? "absolute inset-0 h-full w-full object-cover object-left-top" : "block h-auto w-full",
        className,
      )}
    />
  );
}
