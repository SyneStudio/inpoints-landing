"use client";

import Image from "next/image";
import base from "@/assets/app/dashboard.webp";
import { ShotCanvas, ShotText } from "@/components/ui/ShotCanvas";

/**
 * Le tableau de bord de l'application, en exemple vivant. L'image est la
 * capture réelle — cadres, icônes, boutons, couleurs — et seuls des textes y
 * sont réécrits, à leurs cotes et dans les polices de l'application, pour
 * montrer une fédération en pleine journée de compétition plutôt qu'un
 * compte de démonstration vide.
 */

const W = 1326;
const H = 1070;
const INK = "#e8eef8";
const MUTED = "#8598b3";

export function DashboardShot({ alt, sizes, eager = false }: { alt: string; sizes: string; eager?: boolean }) {
  return (
    <ShotCanvas width={W} height={H} alt={alt}>
      <Image
        src={base}
        alt=""
        sizes={sizes}
        quality={95}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className="absolute left-0 top-0 max-w-none"
        style={{ width: W, height: H }}
      />

      {/* L'accueil : un compte d'exemple, pas celui de la capture */}
      <ShotText left={23} baseline={58.5} size={30} color={INK} weight={600} app>
        Bonjour Sophie
      </ShotText>
      <ShotText left={23} baseline={79.5} size={15} color={MUTED}>
        Connecté en tant que contact@votre-federation.be
      </ShotText>

      {/* En ce moment */}
      <ShotText left={44} baseline={170.5} size={15} color={MUTED}>
        Open international de printemps · Bruxelles — 3 tapis en cours, 128 engagés, 42 rencontres jouées sur 96.
      </ShotText>

      {/* Ce qui demande votre attention */}
      <ShotText left={83} baseline={291.5} size={15} color={INK} weight={500} maxWidth={292}>
        5 demande(s) d’inscription · Open international de printemps
      </ShotText>

      {/* Ensuite */}
      <ShotText left={540} baseline={320} size={13} color={MUTED}>
        Aarschot, Belgique · 31 janv. 2027 · dans 70 jour(s)
      </ShotText>

      {/* Les quatre compteurs */}
      <ShotText left={39} baseline={471.5} size={31} color={INK} weight={600} app>
        12
      </ShotText>
      <ShotText left={363} baseline={471.5} size={31} color={INK} weight={600} app>
        1
      </ShotText>
      <ShotText left={685} baseline={471.5} size={31} color={INK} weight={600} app>
        3
      </ShotText>
      <ShotText left={1008} baseline={471.5} size={31} color={INK} weight={600} app>
        5
      </ShotText>

      {/* Carte 1 : le lieu */}
      <ShotText left={180} baseline={708} size={14} color={MUTED}>
        Aarschot, Belgique
      </ShotText>

      {/* Carte 2 : la compétition du jour */}
      <ShotText left={599} baseline={618.5} size={18} color={INK} weight={500} app>
        Open international
      </ShotText>
      <ShotText left={599} baseline={642.5} size={18} color={INK} weight={500} app>
        de printemps
      </ShotText>
      <ShotText left={817} baseline={589} size={11} color="#ffffff" weight={600}>
        5 à traiter
      </ShotText>
      <ShotText left={618} baseline={696.5} size={14} color={MUTED}>
        Du 21 nov. 2026 au 22 nov. 2026
      </ShotText>

      {/* Carte 4 : la compétition passée */}
      <ShotText left={167} baseline={822.5} size={18} color={INK} weight={500} app>
        Championnat national
      </ShotText>
      <ShotText left={167} baseline={846.5} size={18} color={INK} weight={500} app>
        de wushu 2026
      </ShotText>
      <ShotText left={297} baseline={950} size={12} color="#b9cde2" weight={500}>
        128 engagé(s)
      </ShotText>
    </ShotCanvas>
  );
}
