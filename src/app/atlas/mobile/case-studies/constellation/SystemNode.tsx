import { ANIM, BASE_R, FADE, T } from "../../components/mobileShared";
import type { SystemDef } from "../../components/mobileShared";
import { atlasSystemNodeTopology } from "../../overview/atlasSystemNodeTopology";
import PlanetCluster from "./PlanetCluster";

const SYSTEM_VISUAL_SCALE = 1.18;
const SYSTEM_LABEL_SIZE = 10;

export default function SystemNode({
  sys,
  cx,
  cy,
  orbitR,
  awakened,
  dimmed,
  showLabel,
  planetColors,
  baseLayoutTargets,
  baseLayoutScale,
  resolveTargets,
  resolveT = 0,
}: {
  sys: SystemDef;
  cx: number;
  cy: number;
  orbitR: number;
  awakened: boolean;
  dimmed: boolean;
  showLabel: boolean;
  planetColors?: readonly string[];
  baseLayoutTargets?: readonly { x: number; y: number }[];
  baseLayoutScale?: number;
  resolveTargets?: readonly { x: number; y: number }[];
  resolveT?: number;
}) {
  const authoredTopology = atlasSystemNodeTopology(sys.id);
  const resolvedPlanetColors =
    planetColors ?? authoredTopology?.colors;
  const resolvedBaseTargets =
    baseLayoutTargets ?? authoredTopology?.targets;
  const resolvedBaseScale =
    baseLayoutScale ?? authoredTopology?.scale ?? 1;

  const atmoR =
    (awakened ? BASE_R * 1.45 : BASE_R * 0.82) *
    SYSTEM_VISUAL_SCALE;
  const outerR =
    (awakened ? BASE_R * 3.2 : BASE_R * 1.9) *
    SYSTEM_VISUAL_SCALE;
  const coreR =
    (awakened ? BASE_R * 0.52 : BASE_R * 0.36) *
    SYSTEM_VISUAL_SCALE;

  return (
    <g
      data-system-id={sys.id}
      style={{
        transform: `translate(${cx}px,${cy}px)`,
        transition: resolveTargets ? "none" : ANIM,
      }}
    >
      <PlanetCluster
        planets={sys.planets}
        orbitR={orbitR}
        color={sys.color}
        awakened={awakened}
        dimmed={dimmed}
        planetColors={resolvedPlanetColors}
        baseLayoutTargets={resolvedBaseTargets}
        baseLayoutScale={resolvedBaseScale}
        resolveTargets={resolveTargets}
        resolveT={resolveT}
      />

      <circle
        r={outerR}
        fill={sys.color}
        opacity={awakened ? 0.08 : 0.032}
        style={{ transition: FADE }}
      />
      <circle
        r={atmoR}
        fill={sys.color}
        opacity={awakened ? 0.18 : 0.082}
        style={{ transition: FADE }}
      />
      <circle
        r={28 * SYSTEM_VISUAL_SCALE}
        fill="none"
        stroke={sys.color}
        strokeWidth={0.5}
        opacity={awakened ? 0.32 : 0.13}
        style={{ transition: FADE }}
      />
      <circle
        r={42 * SYSTEM_VISUAL_SCALE}
        fill="none"
        stroke={sys.color}
        strokeWidth={0.3}
        opacity={awakened ? 0.18 : 0.07}
        style={{ transition: FADE }}
      />
      <circle
        r={coreR}
        fill={sys.color}
        opacity={awakened ? 1 : 0.88}
        style={{ transition: FADE }}
      />

      {showLabel && (
        <text
          y={BASE_R * 2.2 + 14}
          textAnchor="middle"
          fontFamily={T.mono}
          fontSize={SYSTEM_LABEL_SIZE}
          letterSpacing="0.14em"
          fill={sys.color}
          opacity={0.74}
        >
          {sys.label}
        </text>
      )}
    </g>
  );
}
