/**
 * Les écrans montrés dans la section « Application ». L'ordre est celui des
 * onglets ; les libellés, titres et descriptions vivent dans le dictionnaire
 * (t.appScreens.tabs / t.appScreens.detail), indexés par cet identifiant.
 *
 * Volontairement sans discipline : aucun sport n'est nommé.
 */
export type ScreenId =
  | "dashboard"
  | "participants"
  | "draws"
  | "planning"
  | "scoring"
  | "results";

export const screens: { id: ScreenId }[] = [
  { id: "dashboard" },
  { id: "participants" },
  { id: "draws" },
  { id: "planning" },
  { id: "scoring" },
  { id: "results" },
];
