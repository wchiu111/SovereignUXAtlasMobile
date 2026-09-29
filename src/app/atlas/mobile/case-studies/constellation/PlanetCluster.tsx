import { ANIM, FADE, T } from "../../components/mobileShared";
import type { Planet } from "../../components/mobileShared";
import { lerp } from "../caseStudyGeometry";

const SYSTEM_VISUAL_SCALE = 1.18;
const PLANET_LABEL_SIZE = 8.5;

const SATELLITE_BASE_DURATION: Record<string, number> = {
  "case-studies": 12.8,
  experiments: 10.8,
  frameworks: 14.8,
};

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
  motionKey = "case-studies",
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
  motionKey?: string;
}) {
  const ringScale  = orbitR / 36;
  const showLabels = awakened && orbitR >= 44 && !resolveTargets && !baseLayoutTargets;
  const ambientRunning = !awakened && !dimmed && !resolveTargets;
  const baseMotionDuration =
    SATELLITE_BASE_DURATION[motionKey] ??
    SATELLITE_BASE_DURATION["case-studies"];

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

        const vectorLength = Math.max(1, Math.hypot(lpx, lpy));
        const ldx = authoredBase ? lpx / vectorLength : Math.cos(rad);
        const ldy = authoredBase ? lpy / vectorLength : Math.sin(rad);
        const ta  = ldx > 0.28 ? "start" : ldx < -0.28 ? "end" : "middle";
        const db  = ldy > 0.28 ? "hanging" : ldy < -0.28 ? "auto" : "middle";

        const driftClass =
          `atlas-landing-satellite-drift atlas-landing-satellite-drift-${
            ["a", "b", "c", "d"][i % 4]
          }`;
        const duration = baseMotionDuration + i * 1.85;
        const delay = -(i * 2.6 + (motionKey === "experiments" ? 1.4 : 0));

        return (
          <g
            key={i}
            style={{
              transform: `translate(${lpx}px,${lpy}px)`,
              transition: resolveTargets ? "none" : ANIM,
            }}
          >
            <g
              className={driftClass}
              style={{
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                animationPlayState: ambientRunning ? "running" : "paused",
              }}
            >
              <circle
                r={(awakened ? 9.5 : 5.5) * SYSTEM_VISUAL_SCALE}
                fill={planetColor}
                opacity={dimmed ? 0.03 : awakened ? 0.18 : 0.11}
                style={{
                  transition: FADE,
                  filter: `drop-shadow(0 0 6px ${planetColor}44)`,
                }}
              />
              <circle
                r={(awakened ? 3 : 1.7) * SYSTEM_VISUAL_SCALE}
                fill={planetColor}
                opacity={dimmed ? 0.18 : awakened ? 1 : 0.68}
                style={{
                  transition: FADE,
                  filter: `drop-shadow(0 0 5px ${planetColor}88)`,
                }}
              />
            </g>

            {showLabels && (
              <text
                x={ldx * 11}
                y={ldy * 11}
                textAnchor={ta}
                dominantBaseline={db}
                fontFamily={T.mono}
                fontSize={PLANET_LABEL_SIZE}
                letterSpacing="0.08em"
                fill={planetColor}
                opacity={0.88}
              >
                {p.label}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
