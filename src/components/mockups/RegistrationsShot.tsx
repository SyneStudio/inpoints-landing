"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import base from "@/assets/app/registrations.webp";
import row from "@/assets/app/registration-row.webp";

/**
 * L'écran « Demandes d'inscription », allongé. Le haut est la capture réelle
 * de l'application (en-tête, filtres, lien d'inscription, deux demandes). Les
 * lignes ajoutées reprennent la carte d'une vraie ligne — cadre et boutons
 * tels quels — et seul le texte y est réécrit, dans la police de
 * l'application et à ses cotes. Tout est posé sur une toile aux dimensions de
 * la capture, puis réduit d'un bloc : rien ne se replie.
 */

const W = 1373;
const ROW_H = 92;
const PITCH = 100;
const FIRST_EXTRA_TOP = 471;
const BOTTOM = 74;

const extra = [
  {
    initials: "IL",
    name: "Inès Lambert",
    details: ["Changquan adultes", "Club Démo Nord", "BE", "2003-06-21", "Déposée le 14 nov. 2026, 09:42"],
    contact: "ines.demo@example.invalid",
  },
  {
    initials: "TP",
    name: "Thomas Peeters",
    details: ["Sanda hommes −70 kg", "Club Démo Sud", "BE", "2001-11-05", "Déposée le 14 nov. 2026, 10:17"],
    contact: "thomas.demo@example.invalid",
  },
  {
    initials: "YB",
    name: "Yasmine Benali",
    details: ["Changquan adultes", "Club Démo Ouest", "FR", "2005-01-28", "Déposée le 14 nov. 2026, 11:03"],
    contact: "yasmine.demo@example.invalid",
  },
];

const TOTAL = 2 + extra.length;
const H = FIRST_EXTRA_TOP + (extra.length - 1) * PITCH + ROW_H + BOTTOM;

const MUTED = "#8598b3";

export function RegistrationsShot({ alt, sizes }: { alt: string; sizes: string }) {
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

  return (
    <div
      ref={ref}
      role="img"
      aria-label={alt}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${W} / ${H}`, background: "#0e1626" }}
    >
      <div
        aria-hidden
        className="absolute left-0 top-0 origin-top-left font-sans"
        style={{
          width: W,
          height: H,
          transform: `scale(${width === null ? 1 : width / W})`,
          visibility: width === null ? "hidden" : "visible",
          fontFeatureSettings: "normal",
        }}
      >
        <Image src={base} alt="" sizes={sizes} quality={95} className="absolute left-0 top-0 max-w-none" style={{ width: W, height: 537 }} />

        {/* Les trois compteurs, mis en accord avec la liste allongée */}
        <Text left={52} top={76.9} size={14} color={MUTED}>
          {TOTAL} demande(s), dont {TOTAL} à traiter
        </Text>
        <Text left={147.5} top={130.1} size={12} color="#60a5fa" weight={600}>
          {TOTAL}
        </Text>
        <Text right={W - 988} top={233.6} size={12} color={MUTED}>
          {TOTAL} sur {TOTAL}
        </Text>

        {extra.map((r, i) => (
          <div
            key={r.name}
            className="absolute"
            style={{ left: 52, top: FIRST_EXTRA_TOP + i * PITCH, width: 936, height: ROW_H }}
          >
            <Image src={row} alt="" sizes={sizes} quality={95} className="absolute inset-0 max-w-none" style={{ width: 936, height: ROW_H }} />
            <span
              className="absolute grid place-items-center rounded-full"
              style={{
                left: 17,
                top: 17.5,
                width: 40,
                height: 40,
                background: "#17171a",
                color: "#f25c54",
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {r.initials}
            </span>
            <span className="absolute flex items-center whitespace-nowrap" style={{ left: 69, top: 20, height: 18 }}>
              <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1, color: "#e8eef8" }}>{r.name}</span>
              <span className="rounded-full" style={{ marginLeft: 16, width: 6, height: 6, background: "#b45309" }} />
              <span style={{ marginLeft: 6, fontSize: 12, fontWeight: 500, lineHeight: 1, color: "#fbbf24" }}>
                À traiter
              </span>
            </span>
            <Text left={69} top={44.8} size={13} color={MUTED}>
              {r.details.map((d, j) => (
                <span key={d} style={{ marginLeft: j ? 8 : 0 }}>
                  {d}
                </span>
              ))}
            </Text>
            <Text left={69} top={60.8} size={13} color={MUTED}>
              Contact · {r.contact}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}

function Text({
  left,
  right,
  top,
  size,
  color,
  weight = 400,
  children,
}: {
  left?: number;
  right?: number;
  top: number;
  size: number;
  color: string;
  weight?: number;
  children: React.ReactNode;
}) {
  return (
    <span
      className="absolute whitespace-nowrap"
      style={{ left, right, top, fontSize: size, lineHeight: 1, color, fontWeight: weight }}
    >
      {children}
    </span>
  );
}
