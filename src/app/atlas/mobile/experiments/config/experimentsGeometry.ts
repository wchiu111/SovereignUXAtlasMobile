import type { MobileExperimentId } from "../experimentsTypes";
import type {
  ConstellationNodeGeometry,
  ConstellationRelation,
} from "../template/constellationTypes";
import {
  EXPERIMENTS_PARENT_CORE,
  EXPERIMENTS_TOPOLOGY,
} from "./experimentsTopology";

export { EXPERIMENTS_PARENT_CORE } from "./experimentsTopology";

/**
 * Expanded Experiments geometry is derived from the same relative topology
 * used by the top-level Atlas miniature.
 *
 * The constellation remains intentionally non-uniform, but selection and
 * system entry now change scale and emphasis rather than node identity/angle.
 */
export const EXPERIMENTS_OVERVIEW_LAYOUT: readonly ConstellationNodeGeometry<MobileExperimentId>[] =
  EXPERIMENTS_TOPOLOGY.map(({ id, vector }) => {
    const x = EXPERIMENTS_PARENT_CORE.x + vector.x;
    const y = EXPERIMENTS_PARENT_CORE.y + vector.y;

    return {
      id,
      x,
      y,
      labelX: x,
      labelY: y + 34,
      anchor: "middle" as const,
    };
  });

function point(id: MobileExperimentId) {
  return (
    EXPERIMENTS_OVERVIEW_LAYOUT.find((item) => item.id === id) ??
    EXPERIMENTS_OVERVIEW_LAYOUT[0]
  );
}

function spoke(id: MobileExperimentId) {
  const target = point(id);
  return `M${EXPERIMENTS_PARENT_CORE.x} ${EXPERIMENTS_PARENT_CORE.y} L${target.x} ${target.y}`;
}

const ai = point("ai-evaluation");
const authority = point("authority-drift");
const design = point("design-philosophy");
const gestalt = point("gestalt-principles");
const thinking = point("think-like-a-designer");

export const EXPERIMENTS_RELATIONS: readonly ConstellationRelation[] = [
  ...EXPERIMENTS_TOPOLOGY.map(({ id }) => ({
    id: `parent-${id}`,
    d: spoke(id),
    strength: "primary" as const,
    dashed: true,
  })),
  {
    id: "evaluation-authority",
    d: `M${ai.x} ${ai.y} C${ai.x + 46} ${ai.y - 24} ${authority.x - 46} ${authority.y - 24} ${authority.x} ${authority.y}`,
    strength: "secondary",
  },
  {
    id: "design-gestalt",
    d: `M${design.x} ${design.y} C${design.x + 6} ${design.y + 52} ${gestalt.x + 54} ${gestalt.y - 44} ${gestalt.x} ${gestalt.y}`,
    strength: "secondary",
  },
  {
    id: "thinking-ai",
    d: `M${thinking.x} ${thinking.y} C${thinking.x - 18} ${thinking.y - 72} ${ai.x - 34} ${ai.y + 52} ${ai.x} ${ai.y}`,
    strength: "secondary",
  },
] as const;
