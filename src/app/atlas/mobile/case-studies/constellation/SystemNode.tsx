import { ANIM, BASE_R, FADE, T } from "../../components/mobileShared";
import type { SystemDef } from "../../components/mobileShared";
import { atlasSystemNodeTopology } from "../../overview/atlasSystemNodeTopology";
import PlanetCluster from "./PlanetCluster";

const SYSTEM_VISUAL_SCALE = 1.18;
const SYSTEM_LABEL_SIZE = 10;

const SYSTEM_MOTION = {
  "case-studies": {
    atmosphere: 6.4,
    rings: 7.2,
    core: 6.8,
    delay: -1.1,
  },
  experiments: {
    atmosphere: 5.2,
    rings: 6.1,
    core: 5.7,
    delay: -3.0,
  },
  frameworks: {
    atmosphere: 7.1,
    rings: 8.0,
    core: 7.6,
    delay: -2.0,
  },
} as const;

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

  const motion =
    SYSTEM_MOTION[sys.id as keyof typeof SYSTEM_MOTION] ??
    SYSTEM_MOTION["case-studies"];
  const ambientRunning =
    !awakened && !dimmed && !resolveTargets;

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
        motionKey={sys.id}
      />

      <g
        className="atlas-landing-system-atmosphere"
        style={{
          animationDuration: `${motion.atmosphere}s`,
          animationDelay: `${motion.delay}s`,
          animationPlayState: ambientRunning ? "running" : "paused",
        }}
      >
        <circle
          r={outerR}
          fill={sys.color}
          opacity={awakened ? 0.10 : 0.055}
          style={{ transition: FADE }}
        />
        <circle
          r={atmoR}
          fill={sys.color}
          opacity={awakened ? 0.20 : 0.125}
          style={{ transition: FADE }}
        />
      </g>

      <g
        className="atlas-landing-system-rings"
        style={{
          animationDuration: `${motion.rings}s`,
          animationDelay: `${motion.delay - 0.9}s`,
          animationPlayState: ambientRunning ? "running" : "paused",
        }}
      >
        <circle
          r={28 * SYSTEM_VISUAL_SCALE}
          fill="none"
          stroke={sys.color}
          strokeWidth={0.5}
          opacity={awakened ? 0.34 : 0.18}
          style={{ transition: FADE }}
        />
        <circle
          r={42 * SYSTEM_VISUAL_SCALE}
          fill="none"
          stroke={sys.color}
          strokeWidth={0.3}
          opacity={awakened ? 0.20 : 0.10}
          style={{ transition: FADE }}
        />
      </g>

      <g
        className="atlas-landing-system-core"
        style={{
          animationDuration: `${motion.core}s`,
          animationDelay: `${motion.delay - 1.7}s`,
          animationPlayState: ambientRunning ? "running" : "paused",
        }}
      >
        <circle
          r={coreR}
          fill={sys.color}
          opacity={awakened ? 1 : 0.88}
          style={{
            transition: FADE,
            filter: `drop-shadow(0 0 7px ${sys.color}88) drop-shadow(0 0 16px ${sys.color}26)`,
          }}
        />
      </g>

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
