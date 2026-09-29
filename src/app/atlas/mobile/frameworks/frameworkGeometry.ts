import type { MobileFrameworkId } from "./mobileFrameworkTypes";
import { FRAMEWORK_TOPOLOGY } from "./frameworkTopology";

export type FrameworkOverviewId = "frameworks" | MobileFrameworkId;
export type FrameworkLabelAnchor = "start" | "middle" | "end";

export interface FrameworkOverviewGeometry {
  id: MobileFrameworkId;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  anchor: FrameworkLabelAnchor;
}

/**
 * Parent placement remains the visual center of the expanded overview.
 */
export const FRAMEWORK_PARENT_CORE = { x: 195, y: 270 } as const;

/**
 * Expanded overview geometry is now derived from the same relative topology
 * used by the top-level Frameworks miniature.
 *
 * Selection changes emphasis, not place. More importantly, entering the
 * overview will no longer require child nodes to swap positions.
 */
export const FRAMEWORK_OVERVIEW_LAYOUT: readonly FrameworkOverviewGeometry[] =
  FRAMEWORK_TOPOLOGY.map(({ id, vector }) => {
    const x = FRAMEWORK_PARENT_CORE.x + vector.x;
    const y = FRAMEWORK_PARENT_CORE.y + vector.y;

    return {
      id,
      x,
      y,
      labelX: x,
      labelY: y + 27,
      anchor: "middle" as const,
    };
  });

export const FRAMEWORK_LABEL_LINES: Record<
  MobileFrameworkId,
  readonly string[]
> = {
  "authority-gradient": ["AUTHORITY", "GRADIENT"],
  "behavioral-architecture": ["BEHAVIORAL", "ARCHITECTURE"],
  "relational-ai-literacy": ["RELATIONAL AI", "LITERACY"],
  "presence-navigation": ["PRESENCE", "NAVIGATION"],
  "regenerative-systems": ["REGENERATIVE", "SYSTEMS"],
};

function pointFor(id: MobileFrameworkId) {
  return (
    FRAMEWORK_OVERVIEW_LAYOUT.find((item) => item.id === id) ??
    FRAMEWORK_OVERVIEW_LAYOUT[0]
  );
}

function spokePath(id: MobileFrameworkId) {
  const target = pointFor(id);
  return `M${FRAMEWORK_PARENT_CORE.x} ${FRAMEWORK_PARENT_CORE.y} L${target.x} ${target.y}`;
}

const authority = pointFor("authority-gradient");
const behavioral = pointFor("behavioral-architecture");
const presence = pointFor("presence-navigation");
const regenerative = pointFor("regenerative-systems");

/**
 * Relationship paths now terminate on topology-derived node positions.
 * The two light cross-links preserve the existing "system" feeling without
 * becoming a second source of node geometry.
 */
export const FRAMEWORK_RELATION_PATHS: readonly string[] = [
  ...FRAMEWORK_TOPOLOGY.map(({ id }) => spokePath(id)),
  `M${authority.x} ${authority.y} C${authority.x + 45} ${authority.y - 12} ${behavioral.x - 45} ${behavioral.y - 12} ${behavioral.x} ${behavioral.y}`,
  `M${regenerative.x} ${regenerative.y} C${regenerative.x + 55} ${regenerative.y + 18} ${presence.x - 55} ${presence.y + 18} ${presence.x} ${presence.y}`,
];

export function frameworkGeometryFor(
  id: MobileFrameworkId,
): FrameworkOverviewGeometry {
  return (
    FRAMEWORK_OVERVIEW_LAYOUT.find((item) => item.id === id) ??
    FRAMEWORK_OVERVIEW_LAYOUT[0]
  );
}
