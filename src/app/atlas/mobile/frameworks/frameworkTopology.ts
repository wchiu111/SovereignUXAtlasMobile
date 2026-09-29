import { STELLAR_PALETTE } from "../../constellation/stellarPalette";
import type { MobileFrameworkId } from "./mobileFrameworkTypes";

/**
 * Canonical Frameworks constellation topology.
 *
 * This is the single spatial source of truth for both:
 * 1. the Frameworks miniature shown in the top-level Atlas, and
 * 2. the expanded Frameworks overview.
 *
 * Keeping the same relative vectors means the eventual transition can be a
 * scale + translation rather than a node reshuffle.
 */
export const FRAMEWORK_TOPOLOGY_RADIUS = 126;

export interface FrameworkTopologyItem {
  id: MobileFrameworkId;
  label: string;
  angle: number;
  color: string;
  vector: {
    x: number;
    y: number;
  };
}

function polarVector(angle: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: Math.round(Math.cos(radians) * FRAMEWORK_TOPOLOGY_RADIUS),
    y: Math.round(Math.sin(radians) * FRAMEWORK_TOPOLOGY_RADIUS),
  };
}

/**
 * Five unique pentagonal slots.
 *
 * The old top-level definition contained six entries: Authority Gradient and
 * Presence Navigation occupied the same -100° / 260° position, while the
 * retired Application Kit still consumed a slot. This topology removes that
 * overlap and maps the five active frameworks onto the five visible positions.
 *
 * Node colors mirror each framework's desktop signature stellar type while
 * Frameworks green continues to own the domain rings, labels, and orientation.
 *
 * Identity assignment minimizes movement from the current expanded overview:
 * - Authority Gradient → top
 * - Behavioral Architecture → upper-right
 * - Presence Navigation → lower-right
 * - Regenerative Systems → lower-left
 * - Relational AI Literacy → left
 */
export const FRAMEWORK_TOPOLOGY: readonly FrameworkTopologyItem[] = [
  {
    id: "authority-gradient",
    label: "AUTHORITY GRADIENT",
    angle: -100,
    color: STELLAR_PALETTE.purpose,
    vector: polarVector(-100),
  },
  {
    id: "behavioral-architecture",
    label: "BEHAVIORAL ARCHITECTURE",
    angle: -28,
    color: STELLAR_PALETTE.strategy,
    vector: polarVector(-28),
  },
  {
    id: "presence-navigation",
    label: "PRESENCE NAVIGATION",
    angle: 44,
    color: STELLAR_PALETTE.strategy,
    vector: polarVector(44),
  },
  {
    id: "regenerative-systems",
    label: "REGENERATIVE SYSTEMS",
    angle: 116,
    color: STELLAR_PALETTE.relational,
    vector: polarVector(116),
  },
  {
    id: "relational-ai-literacy",
    label: "RELATIONAL AI LITERACY",
    angle: 188,
    color: STELLAR_PALETTE.relational,
    vector: polarVector(188),
  },
] as const;

/**
 * `SystemNode` still consumes the lightweight Planet shape at the Atlas level.
 * Export it from the same topology so labels/angles/colors cannot drift independently.
 */
export const FRAMEWORK_SYSTEM_PLANETS = FRAMEWORK_TOPOLOGY.map(
  ({ label, angle, color }) => ({ label, angle, color }),
);

/**
 * Relative overview-space vectors. The top-level miniature uses these same
 * targets at a smaller scale.
 */
export const FRAMEWORK_OVERVIEW_TARGETS = FRAMEWORK_TOPOLOGY.map(
  ({ vector }) => vector,
);
