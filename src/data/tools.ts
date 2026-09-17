import type { LucideIcon } from "lucide-react";
import {
  Trophy,
  FileInput,
  ClipboardList,
  Network,
  Gavel,
  Radio,
  Medal,
  CalendarClock,
  Scale,
} from "lucide-react";

/** Les neuf outils de la section « Les outils ». Le texte vit dans le
 *  dictionnaire (t.tools.items[id]) ; l'icône et la micro-maquette sont
 *  choisies ici. L'ordre suit le déroulé d'une compétition. Les quatre outils
 *  approfondis plus bas pointent vers leur bloc. */
export type ToolId =
  | "competitions"
  | "registrations"
  | "participants"
  | "brackets"
  | "scoring"
  | "live"
  | "results"
  | "planning"
  | "desk";

export const tools: { id: ToolId; icon: LucideIcon; anchor?: string }[] = [
  { id: "competitions", icon: Trophy },
  { id: "registrations", icon: FileInput, anchor: "#inscriptions" },
  { id: "participants", icon: ClipboardList },
  { id: "brackets", icon: Network, anchor: "#bracket" },
  { id: "scoring", icon: Gavel, anchor: "#arbitrage" },
  { id: "live", icon: Radio, anchor: "#direct" },
  { id: "results", icon: Medal },
  { id: "planning", icon: CalendarClock },
  { id: "desk", icon: Scale },
];
