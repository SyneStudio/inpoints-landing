/**
 * Sports shown in the "for every sport" section.
 * `key` is a stable, language-neutral identifier; the display label comes from
 * the i18n dictionary (t.sports.names[key]). Order is intentionally mixed so no
 * discipline appears prioritised. Emoji are lightweight glyphs (no image weight).
 */
export type SportKey =
  | "Football"
  | "Basketball"
  | "Tennis"
  | "Athletics"
  | "Swimming"
  | "Judo"
  | "Karate"
  | "Cycling"
  | "Gymnastics"
  | "Volleyball"
  | "Handball"
  | "Rugby"
  | "Climbing"
  | "Fencing"
  | "Rowing"
  | "Boxing";

export type Sport = { key: SportKey; glyph: string };

export const sports: Sport[] = [
  { key: "Football", glyph: "⚽" },
  { key: "Basketball", glyph: "🏀" },
  { key: "Tennis", glyph: "🎾" },
  { key: "Athletics", glyph: "🏃" },
  { key: "Swimming", glyph: "🏊" },
  { key: "Judo", glyph: "🥋" },
  { key: "Karate", glyph: "🥋" },
  { key: "Cycling", glyph: "🚴" },
  { key: "Gymnastics", glyph: "🤸" },
  { key: "Volleyball", glyph: "🏐" },
  { key: "Handball", glyph: "🤾" },
  { key: "Rugby", glyph: "🏉" },
  { key: "Climbing", glyph: "🧗" },
  { key: "Fencing", glyph: "🤺" },
  { key: "Rowing", glyph: "🚣" },
  { key: "Boxing", glyph: "🥊" },
];
