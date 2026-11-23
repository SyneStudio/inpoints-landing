/**
 * Les sports de combat montrés dans les grandes cases défilantes de la
 * section « Sports ». `key` est l'identifiant stable ; le nom affiché vient
 * du dictionnaire (t.sports.names[key]).
 *
 * `photo` est le chemin de la photo du sport, à déposer dans
 * `public/sports/` (par exemple `public/sports/judo.jpg` → `"/sports/judo.jpg"`).
 * Format conseillé : portrait 3:4, au moins 900 × 1200 px. Tant qu'elle est
 * absente, la case montre un fond dégradé avec `glyph` ; `tint` en donne la
 * teinte, et reste en voile sous le nom une fois la photo en place.
 */
export type CombatSportKey =
  | "wushu"
  | "karate"
  | "taekwondo"
  | "judo"
  | "boxing"
  | "kickboxing"
  | "mma"
  | "jiujitsu"
  | "sanda";

export type CombatSport = {
  key: CombatSportKey;
  glyph: string;
  tint: string;
  photo?: string;
};

export const combatSports: CombatSport[] = [
  { key: "wushu", glyph: "⚔️", tint: "#3461a8" },
  { key: "karate", glyph: "🥋", tint: "#2f6f8f" },
  { key: "taekwondo", glyph: "🦵", tint: "#4a55a8" },
  { key: "judo", glyph: "🥋", tint: "#2d5f9e" },
  { key: "boxing", glyph: "🥊", tint: "#8a3d4a" },
  { key: "kickboxing", glyph: "🦶", tint: "#3f6a7a" },
  { key: "mma", glyph: "🤼", tint: "#5a4a9a" },
  { key: "jiujitsu", glyph: "🥋", tint: "#2f7a78" },
  { key: "sanda", glyph: "🥊", tint: "#7a4a3a" },
];
