/**
 * Authored Case Studies geometry for the mobile Atlas.
 *
 * Refactor Pass 1 only moves constants/helpers out of LandingScene.
 * Coordinates and scale values are intentionally unchanged.
 */
export const CASE_STUDY_OVERVIEW_LAYOUT = [
  { x: 145, y: 175, labelX: 166, labelY: 163, anchor: "start" as const },
  { x: 306, y: 238, labelX: 327, labelY: 242, anchor: "start" as const },
  { x: 272, y: 365, labelX: 291, labelY: 379, anchor: "start" as const },
  { x: 106, y: 333, labelX: 84, labelY: 347, anchor: "end" as const },
] as const;

export const OVERVIEW_CORE = { x: 195, y: 265 } as const;
export const CASE_STUDY_MINIATURE_SCALE = 0.32;

export const CS_FOCUS = {
  "atlas-landing": { x: 95, y: 196, orbitR: 36, opacity: 1 },
  "system-awakened": { x: 195, y: 250, orbitR: 72, opacity: 1 },
  "system-overview": { x: 195, y: 82, orbitR: 24, opacity: 0.45 },
} as const;

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
