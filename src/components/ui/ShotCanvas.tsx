"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Une toile aux dimensions exactes d'une capture de l'application. Ce qu'on y
 * pose est coté en pixels de la capture ; la toile entière est ensuite réduite
 * d'un bloc à la largeur disponible. Sert quand un texte de la capture doit
 * être réécrit par la page : il reste ainsi à sa place et à sa taille, quelle
 * que soit la largeur d'affichage.
 */
export function ShotCanvas({
  width,
  height,
  alt,
  children,
}: {
  width: number;
  height: number;
  alt: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={alt}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${width} / ${height}`, background: "#0e1626" }}
    >
      <div
        aria-hidden
        className="absolute left-0 top-0 origin-top-left font-sans"
        style={{
          width,
          height,
          transform: `scale(${w === null ? 1 : w / width})`,
          visibility: w === null ? "hidden" : "visible",
          // La page règle des variantes d'Inter ; l'application, non.
          fontFeatureSettings: "normal",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Un texte posé sur la toile, repéré par sa ligne de base. */
export function ShotText({
  left,
  right,
  baseline,
  size,
  color,
  weight = 400,
  app = false,
  maxWidth,
  children,
}: {
  left?: number;
  right?: number;
  /** Ordonnée de la ligne de base, en pixels de la capture. */
  baseline: number;
  size: number;
  color: string;
  weight?: number;
  /** La police des titres de l'application (Oswald) plutôt qu'Inter. */
  app?: boolean;
  /** Au-delà, le texte est coupé par des points de suspension. */
  maxWidth?: number;
  children: React.ReactNode;
}) {
  // Une ligne de hauteur 1 pose la ligne de base à une fraction fixe du corps.
  const ratio = app ? 0.952 : 0.863;
  return (
    <span
      className="absolute overflow-hidden text-ellipsis whitespace-nowrap"
      style={{
        left,
        right,
        top: baseline - size * ratio,
        maxWidth,
        fontSize: size,
        lineHeight: 1.25,
        marginTop: -size * 0.125,
        color,
        fontWeight: weight,
        fontFamily: app ? "var(--ff-app), sans-serif" : undefined,
      }}
    >
      {children}
    </span>
  );
}
