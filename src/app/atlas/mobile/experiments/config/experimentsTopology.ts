import { STELLAR_PALETTE } from "../../../constellation/stellarPalette";

/**
 * Canonical Experiments topology.
 *
 * The same relative vectors are used by:
 * 1. the top-level Atlas miniature,
 * 2. the Atlas -> Experiments transition, and
 * 3. the expanded Experiments overview.
 *
 * That continuity prevents the child nodes from reshuffling during handoff.
 */
export const EXPERIMENTS_PARENT_CORE = { x: 195, y: 270 } as const;

/**
 * LandingScene currently gives the two upper systems a +18px visual offset.
 * Keep the Experiments transition anchored to that exact rendered position.
 */
export const EXPERIMENTS_ATLAS_LANDING_OFFSET_Y = 18;

export const EXPERIMENTS_TOPOLOGY = [
  {
    id: "ai-evaluation",
    label: "AI EVALUATION",
    color: STELLAR_PALETTE.relational,
    vector: { x: -101, y: -106 },
  },
  {
    id: "authority-drift",
    label: "AUTHORITY DRIFT",
    color: STELLAR_PALETTE.risk,
    vector: { x: 99, y: -104 },
  },
  {
    id: "design-philosophy",
    label: "DESIGN PHILOSOPHY",
    color: STELLAR_PALETTE.judgment,
    vector: { x: 123, y: 24 },
  },
  {
    id: "gestalt-principles",
    label: "GESTALT PRINCIPLES",
    color: STELLAR_PALETTE.relational,
    vector: { x: 37, y: 108 },
  },
  {
    id: "think-like-a-designer",
    label: "THINK LIKE A DESIGNER",
    color: STELLAR_PALETTE.agentic,
    vector: { x: -123, y: 56 },
  },
] as const;

export const EXPERIMENTS_TOPOLOGY_RADIUS = Math.max(
  ...EXPERIMENTS_TOPOLOGY.map(({ vector }) =>
    Math.hypot(vector.x, vector.y),
  ),
);

export const EXPERIMENTS_OVERVIEW_TARGETS =
  EXPERIMENTS_TOPOLOGY.map(({ vector }) => vector);

export const EXPERIMENTS_SYSTEM_PLANETS =
  EXPERIMENTS_TOPOLOGY.map(({ label, color, vector }) => ({
    label,
    color,
    angle: (Math.atan2(vector.y, vector.x) * 180) / Math.PI,
  }));
