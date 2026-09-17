/**
 * Les sports de combat montrés sur l'arc de la section « Pour tous les sports
 * de combat ». `key` est l'identifiant stable ; le nom affiché vient du
 * dictionnaire (t.sports.names[key]). `code` est le monogramme de la carte —
 * deux lettres, parce qu'un pictogramme prétendrait connaître la discipline
 * mieux qu'on ne la connaît, et qu'un emoji ne tient pas la promesse
 * « premium ». `hue` teinte légèrement la carte, sans quitter la charte.
 */
export type CombatSportKey =
  | "wushu"
  | "kungfu"
  | "karate"
  | "taekwondo"
  | "judo"
  | "boxing"
  | "kickboxing"
  | "mma"
  | "jiujitsu"
  | "sanda";

export type CombatSport = { key: CombatSportKey; code: string; hue: number };

export const combatSports: CombatSport[] = [
  { key: "wushu", code: "WU", hue: 196 },
  { key: "kungfu", code: "KF", hue: 206 },
  { key: "karate", code: "KA", hue: 186 },
  { key: "taekwondo", code: "TK", hue: 214 },
  { key: "judo", code: "JU", hue: 200 },
  { key: "boxing", code: "BX", hue: 222 },
  { key: "kickboxing", code: "KB", hue: 192 },
  { key: "mma", code: "MM", hue: 210 },
  { key: "jiujitsu", code: "JJ", hue: 182 },
  { key: "sanda", code: "SA", hue: 204 },
];
