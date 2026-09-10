import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  Network,
  CalendarClock,
  Scale,
  Gavel,
  MonitorPlay,
  Medal,
  ShieldAlert,
} from "lucide-react";

/** Les huit modules. Le texte vit dans le dictionnaire (t.solution.features),
 *  dans le même ordre. Ils suivent le déroulé réel d'une compétition : ce
 *  qu'on prépare, ce qui se passe sur le tapis, ce qu'on publie. */
export const featureIcons: LucideIcon[] = [
  ClipboardList,
  Network,
  CalendarClock,
  Scale,
  Gavel,
  MonitorPlay,
  Medal,
  ShieldAlert,
];
