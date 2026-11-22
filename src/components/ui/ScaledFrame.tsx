"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Montre une maquette d'écran à l'identique sur tous les appareils : en dessous
 * de `minWidth`, la maquette garde sa mise en page de bureau et c'est le tout
 * qui est réduit, au lieu de se replier en une autre disposition.
 * Au-dessus, rien ne change : la maquette occupe la largeur disponible.
 */
export function ScaledFrame({
  aspect,
  minWidth = 600,
  className,
  children,
}: {
  /** Rapport largeur / hauteur de la maquette. */
  aspect: number;
  minWidth?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const inner = width === null ? minWidth : Math.max(width, minWidth);
  const scale = width === null ? 1 : width / inner;

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{ aspectRatio: aspect }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: inner,
          height: inner / aspect,
          transform: `scale(${scale})`,
          visibility: width === null ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
    </div>
  );
}
