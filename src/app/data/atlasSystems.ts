import { getEntriesByCategory } from "../content";
import type { AtlasCategory } from "../content";
import type { StarNode, StarSystem } from "../types/atlas";
import { ATLAS_SYSTEM_CONFIGS } from "./atlasSystemConfig";

export const mkCaseStars = (p: string): StarNode[] => [
  { id: `${p}-context`, label: "CONTEXT", angle: -90 },
  { id: `${p}-problem`, label: "PROBLEM", angle: -30 },
  { id: `${p}-approach`, label: "APPROACH", angle: 30 },
  { id: `${p}-decisions`, label: "DECISIONS", angle: 90 },
  { id: `${p}-outcomes`, label: "OUTCOMES", angle: 150 },
  { id: `${p}-lessons`, label: "LESSONS", angle: 210 },
];

export const mkExpStars = (p: string): StarNode[] => [
  { id: `${p}-question`, label: "QUESTION", angle: -72 },
  { id: `${p}-setup`, label: "SETUP", angle: 0 },
  { id: `${p}-evidence`, label: "EVIDENCE", angle: 72 },
  { id: `${p}-findings`, label: "FINDINGS", angle: 144 },
  { id: `${p}-implications`, label: "IMPLICATIONS", angle: 216 },
];

export const mkFwStars = (p: string): StarNode[] => [
  { id: `${p}-principle`, label: "PRINCIPLE", angle: -72 },
  { id: `${p}-model`, label: "MENTAL MODEL", angle: 0 },
  { id: `${p}-pattern`, label: "PATTERN", angle: 72 },
  { id: `${p}-example`, label: "EXAMPLE", angle: 144 },
  { id: `${p}-apply`, label: "APPLICATION", angle: 216 },
];

const STAR_FACTORIES: Record<AtlasCategory, (prefix: string) => StarNode[]> = {
  "case-study": mkCaseStars,
  experiment: mkExpStars,
  framework: mkFwStars,
};

export const STAR_ORBIT_R = 52;

export const SYSTEMS: StarSystem[] = ATLAS_SYSTEM_CONFIGS.map((config) => ({
  id: config.id,
  label: config.label,
  subtitle: config.subtitle,
  color: config.color,
  size: config.size,
  orbitA: config.orbitA,
  orbitB: config.orbitB,
  orbitOffsetX: config.orbitOffsetX,
  orbitOffsetY: config.orbitOffsetY,
  orbitRotation: config.orbitRotation,
  orbitTilt: config.orbitTilt,
  orbitDepth: config.orbitDepth,
  orbitPhase0: config.orbitPhase0,
  orbitSpeed: config.orbitSpeed,
  driftRadiusX: config.driftRadiusX,
  driftRadiusY: config.driftRadiusY,
  driftDurationMs: config.driftDurationMs,
  driftDirection: config.driftDirection,
  driftPhase: config.driftPhase,
  driftAngleOffset: config.driftAngleOffset,
  pulseSpeed: config.pulseSpeed,
  pulsePhase: config.pulsePhase,
  planets: getEntriesByCategory(config.category).map((entry, index) => {
    const planeSequence = [0, 1, -1, 2, -2, 1, -1, 2, -2];
    const orbitPlane = planeSequence[index % planeSequence.length];

    return {
      id: entry.id,
      label: entry.title,
      angle: entry.orbit.angle,
      orbitR: entry.orbit.radius,
      orbitSpeed: entry.orbit.speed,
      orbitPlane,
      orbitOffsetX: orbitPlane * 7,
      orbitOffsetY: orbitPlane * 15,
      signatureStellarType: entry.signatureStellarType,
      tags: entry.tags,
      showCenterConnections: entry.constellation?.showCenterConnections,
      constellationConnections: entry.constellation?.connections?.map((connection) => ({
        from: `${entry.orbit.starPrefix}-${connection.from}`,
        to: `${entry.orbit.starPrefix}-${connection.to}`,
        strength: connection.strength ?? "primary",
      })),
      stars:
        entry.overviewStars?.map((star) => ({
          id: `${entry.orbit.starPrefix}-${star.id}`,
          label: star.label,
          angle: star.angle,
          x: star.x,
          y: star.y,
          scale: star.scale,
          stellarType: star.stellarType,
          intensity: star.intensity,
          labelPosition: star.labelPosition,
        })) ?? STAR_FACTORIES[entry.category](entry.orbit.starPrefix),
      what: entry.overview.what,
      why: entry.overview.why,
      researchFocus: entry.overview.researchFocus,
      keyDiscovery: entry.overview.keyDiscovery,
    };
  }),
}));

export const SYSTEM_MAP = Object.fromEntries(
  SYSTEMS.map((system) => [system.id, system]),
);
