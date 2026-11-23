import type { LucideIcon } from "lucide-react";
import {
  Trophy,
  FileInput,
  Network,
  Gavel,
  Radio,
  Medal,
  CalendarClock,
  Scale,
} from "lucide-react";

/** Les huit outils de la section « Les outils », en deux rangées de quatre.
 *  Le texte vit dans le dictionnaire (t.tools.items[id]) ; l'icône et la
 *  micro-maquette sont choisies ici. L'ordre suit le déroulé d'une
 *  compétition. */
export type ToolId =
  | "competitions"
  | "registrations"
  | "brackets"
  | "scoring"
  | "live"
  | "results"
  | "planning"
  | "desk";

export const tools: { id: ToolId; icon: LucideIcon }[] = [
  { id: "competitions", icon: Trophy },
  { id: "registrations", icon: FileInput },
  { id: "brackets", icon: Network },
  { id: "scoring", icon: Gavel },
  { id: "live", icon: Radio },
  { id: "results", icon: Medal },
  { id: "planning", icon: CalendarClock },
  { id: "desk", icon: Scale },
];
