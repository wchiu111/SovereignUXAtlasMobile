import {
  EXPERIMENTS_OVERVIEW_TARGETS,
  EXPERIMENTS_TOPOLOGY,
  EXPERIMENTS_TOPOLOGY_RADIUS,
} from "../experiments/config/experimentsTopology";

export interface AtlasSystemNodeTopology {
  targets: readonly { x: number; y: number }[];
  scale: number;
  colors?: readonly string[];
}

const TOP_LEVEL_ORBIT_RADIUS = 36;

export function atlasSystemNodeTopology(
  systemId: string,
): AtlasSystemNodeTopology | null {
  if (systemId === "experiments") {
    return {
      targets: EXPERIMENTS_OVERVIEW_TARGETS,
      scale: TOP_LEVEL_ORBIT_RADIUS / EXPERIMENTS_TOPOLOGY_RADIUS,
      colors: EXPERIMENTS_TOPOLOGY.map(({ color }) => color),
    };
  }

  return null;
}
