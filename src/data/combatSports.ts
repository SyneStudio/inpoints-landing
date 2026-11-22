/**
 * Les sports de combat montrés sur la roue de la section « Pour tous les
 * sports de combat ». `key` est l'identifiant stable ; le nom affiché vient
 * du dictionnaire (t.sports.names[key]). `glyph` est l'emoji de la carte,
 * comme sur la roue des sports d'InSports : les deux sites partagent la même
 * carte, et plusieurs disciplines voisines partagent le même emoji.
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

export type CombatSport = { key: CombatSportKey; glyph: string };

export const combatSports: CombatSport[] = [
  { key: "wushu", glyph: "⚔️" },
  { key: "kungfu", glyph: "🐉" },
  { key: "karate", glyph: "🥋" },
  { key: "taekwondo", glyph: "🦵" },
  { key: "judo", glyph: "🥋" },
  { key: "boxing", glyph: "🥊" },
  { key: "kickboxing", glyph: "🦶" },
  { key: "mma", glyph: "🤼" },
  { key: "jiujitsu", glyph: "🥋" },
  { key: "sanda", glyph: "🥊" },
];
