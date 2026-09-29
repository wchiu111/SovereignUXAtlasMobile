import { ANIM, FADE, T } from "../../components/mobileShared";
import type { Planet } from "../../components/mobileShared";
import { lerp } from "../caseStudyGeometry";

const SYSTEM_VISUAL_SCALE = 1.18;
const PLANET_LABEL_SIZE = 8.5;

export default function PlanetCluster({
  planets,
  orbitR,
  color,
  awakened,
  dimmed,
  planetColors,
  baseLayoutTargets,
  baseLayoutScale = 1,
  resolveTargets,
  resolveT = 0,
}: {
  planets: Planet[];
  orbitR: number;
  color: string;
  awakened: boolean;
  dimmed: boolean;
  planetColors?: readonly string[];
  baseLayoutTargets?: readonly { x: number; y: number }[];
  baseLayoutScale?: number;
  resolveTargets?: readonly { x: number; y: number }[];
  resolveT?: number;
}) {
  const ringScale  = orbitR / 36;
  const showLabels = awakened && orbitR >= 44 && !resolveTargets && !baseLayoutTargets;
  return (
    <g>
      {!baseLayoutTargets && (
        <g style={{ transform: `scale(${ringScale})`, transition: ANIM }}>
          <circle
            r={36}
            fill="none"
            stroke={color}
            strokeWidth={0.4}
            strokeDasharray="2.5 5"
            opacity={dimmed ? 0.04 : awakened ? 0.22 : 0.09}
            style={{ transition: FADE }}
          />
        </g>
      )}
      {planets.map((p, i) => {
        const planetColor = planetColors?.[i] ?? p.color ?? color;
        const rad = (p.angle * Math.PI) / 180;
        const authoredBase = baseLayoutTargets?.[i];
        const orbitX = authoredBase
          ? authoredBase.x * baseLayoutScale
          : Math.cos(rad) * orbitR;
        const orbitY = authoredBase
          ? authoredBase.y * baseLayoutScale
          : Math.sin(rad) * orbitR;
        const target = resolveTargets?.[i];
        const lpx = target ? lerp(orbitX, target.x, resolveT) : orbitX;
        const lpy = target ? lerp(orbitY, target.y, resolveT) : orbitY;

        // Label direction follows the actual node vector when using authored geometry.
        const vectorLength = Math.max(1, Math.hypot(lpx, lpy));
        const ldx = authoredBase ? lpx / vectorLength : Math.cos(rad);
        const ldy = authoredBase ? lpy / vectorLength : Math.sin(rad);
        const ta  = ldx > 0.28 ? "start" : ldx < -0.28 ? "end" : "middle";
        const db  = ldy > 0.28 ? "hanging" : ldy < -0.28 ? "auto" : "middle";
        return (
          <g
            key={i}
            style={{
              transform: `translate(${lpx}px,${lpy}px)`,
              transition: resolveTargets ? "none" : ANIM,
            }}
          >
            <circle r={(awakened ? 9.5 : 5.5) * SYSTEM_VISUAL_SCALE} fill={planetColor}
              opacity={dimmed ? 0.03 : awakened ? 0.16 : 0.07} style={{ transition: FADE }} />
            <circle r={(awakened ? 3 : 1.7) * SYSTEM_VISUAL_SCALE} fill={planetColor}
              opacity={dimmed ? 0.18 : awakened ? 1 : 0.52} style={{ transition: FADE }} />
            {showLabels && (
              <text x={ldx * 11} y={ldy * 11}
                textAnchor={ta} dominantBaseline={db}
                fontFamily={T.mono} fontSize={PLANET_LABEL_SIZE} letterSpacing="0.08em" fill={planetColor} opacity={0.88}>
                {p.label}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
