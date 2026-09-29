import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import ExperienceAnnotation from "./ExperienceAnnotation";
import type {
  BehavioralStage,
  BehavioralStageId,
} from "./behavioralDecisionDesignData";

interface ProgressiveBehaviorCanvasProps {
  stages: BehavioralStage[];
  revealedCount: number;
  activeStageId: BehavioralStageId;
  onCommitStage: (stageId: BehavioralStageId) => void;
  onAdvance: () => void;
  onRevealAll: () => void;
  onApply: () => void;
  resolveColor: (role: BehavioralStage["colorRole"]) => string;
}

const ORDER: BehavioralStageId[] = [
  "interpret",
  "separate",
  "frame",
  "recommend",
  "confirm",
  "act",
];

/**
 * Geometry is rebuilt from the Figma Make export:
 * source frame: 1155 × 785
 * visual system begins at roughly y=180 after the title / intro area.
 *
 * We keep those spatial relationships, but express x/y as percentages
 * so the composition scales with the current Atlas viewport.
 */
const DESIGN_WIDTH = 1155;
const SYSTEM_TOP = 180;
const ORBITAL_VIEWBOX = 1155;
const SYSTEM_HEIGHT = 605;
const READING_COLUMN_WIDTH = 395;
const ORBITAL_FIELD_SIZE = "clamp(760px, 72vw, 1155px)";
const CORE_SIZE = 505;

// Core, rings, and nodes now share one coordinate origin.
const ORBIT_CENTER = { x: 164.5, y: 1060 };
const OUTER_RADIUS = 700;
const INNER_RADIUS = 505;

const NODE_GEOMETRY: Record<
  BehavioralStageId,
  { orbit: "outer" | "inner"; angle: number; width: number }
> = {
  interpret: { orbit: "outer", angle: -94, width: 210.422 },
  separate: { orbit: "outer", angle: -76, width: 210.422 },
  frame: { orbit: "outer", angle: -56, width: 210.422 },
  recommend: { orbit: "inner", angle: -77, width: 220.944 },
  confirm: { orbit: "inner", angle: -48, width: 210.422 },
  act: { orbit: "inner", angle: -18, width: 210.422 },
};

const pctX = (value: number) => `${(value / DESIGN_WIDTH) * 100}%`;
const pctY = (value: number) => `${(value / SYSTEM_HEIGHT) * 100}%`;
const orbitalPct = (value: number) =>
  `${(value / ORBITAL_VIEWBOX) * 100}%`;

const pointOnOrbit = (
  orbit: "outer" | "inner",
  angleDegrees: number,
) => {
  const radius = orbit === "outer" ? OUTER_RADIUS : INNER_RADIUS;
  const radians = (angleDegrees * Math.PI) / 180;

  return {
    x: ORBIT_CENTER.x + Math.cos(radians) * radius,
    y: ORBIT_CENTER.y + Math.sin(radians) * radius,
  };
};

export default function ProgressiveBehaviorCanvas({
  stages,
  revealedCount,
  activeStageId,
  onCommitStage,
  onAdvance: _onAdvance,
  onRevealAll: _onRevealAll,
  onApply,
  resolveColor,
}: ProgressiveBehaviorCanvasProps) {
  const reducedMotion = useReducedMotion();
  const [hoveredStageId, setHoveredStageId] =
    useState<BehavioralStageId | null>(null);
  const [orbitHovered, setOrbitHovered] = useState<"outer" | "inner" | null>(
    null,
  );


  const activeStage =
    stages.find((stage) => stage.id === activeStageId) ?? stages[0];

  const activeStageIndex = ORDER.indexOf(activeStageId);
  const nextStageId =
    activeStageIndex >= 0 && activeStageIndex < ORDER.length - 1
      ? ORDER[activeStageIndex + 1]
      : null;
  const nextStage = nextStageId
    ? stages.find((stage) => stage.id === nextStageId)
    : undefined;
  const canAdvance = nextStage !== undefined;

  const getStage = (id: BehavioralStageId) =>
    stages.find((stage) => stage.id === id)!;

  const coreColor = resolveColor(getStage("interpret").colorRole);

  const outerActive =
    orbitHovered === "outer" ||
    (revealedCount > 0 && hoveredStageId === "interpret") ||
    hoveredStageId === "separate" ||
    hoveredStageId === "frame";

  const innerActive =
    orbitHovered === "inner" ||
    hoveredStageId === "recommend" ||
    hoveredStageId === "confirm" ||
    hoveredStageId === "act";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "calc(100dvh - 150px)",
        overflow: "visible",
      }}
    >
      {/* Rigid orbital field: composition can scale, celestial geometry never deforms. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: ORBITAL_FIELD_SIZE,
          height: ORBITAL_FIELD_SIZE,
          pointerEvents: "none",
        }}
      >
        {/* Core stays spherical and shares the same Figma-derived coordinate field. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: orbitalPct(ORBIT_CENTER.x - CORE_SIZE / 2),
            top: orbitalPct(ORBIT_CENTER.y - CORE_SIZE / 2),
            width: orbitalPct(CORE_SIZE),
            height: orbitalPct(CORE_SIZE),
            minWidth: 350,
            minHeight: 350,
            maxWidth: CORE_SIZE,
            maxHeight: CORE_SIZE,
            borderRadius: "50%",
            background: `radial-gradient(
              circle at 42% 34%,
              ${coreColor}E6 0%,
              ${coreColor}C2 31%,
              ${coreColor}94 62%,
              ${coreColor}66 100%
            )`,
            boxShadow: `
              0 0 156px ${coreColor}24,
              0 0 358px ${coreColor}12
            `,
          }}
        />

        {/* Square SVG viewBox + meet scaling keeps both rings perfectly circular. */}
        <svg
          viewBox={`0 0 ${ORBITAL_VIEWBOX} ${ORBITAL_VIEWBOX}`}
          preserveAspectRatio="xMinYMin meet"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <defs>
            <linearGradient
              id="figma-outer-gradient"
              x1="87"
              y1={207 - SYSTEM_TOP}
              x2="477"
              y2={325 - SYSTEM_TOP}
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor={resolveColor(getStage("interpret").colorRole)}
                stopOpacity=".82"
              />
              <stop
                offset="50%"
                stopColor={resolveColor(getStage("separate").colorRole)}
                stopOpacity=".82"
              />
              <stop
                offset="100%"
                stopColor={resolveColor(getStage("frame").colorRole)}
                stopOpacity=".82"
              />
            </linearGradient>

            <linearGradient
              id="figma-inner-gradient"
              x1="330"
              y1={417 - SYSTEM_TOP}
              x2="602"
              y2={666 - SYSTEM_TOP}
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor={resolveColor(getStage("recommend").colorRole)}
                stopOpacity=".82"
              />
              <stop
                offset="50%"
                stopColor={resolveColor(getStage("confirm").colorRole)}
                stopOpacity=".82"
              />
              <stop
                offset="100%"
                stopColor={resolveColor(getStage("act").colorRole)}
                stopOpacity=".82"
              />
            </linearGradient>

            <filter
              id="figma-orbit-glow"
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3.5"
                result="orbitBlur"
              />
              <feMerge>
                <feMergeNode in="orbitBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle
            cx={ORBIT_CENTER.x}
            cy={ORBIT_CENTER.y}
            r={OUTER_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,.29)"
            strokeWidth="2.6"
          />

          <motion.circle
            cx={ORBIT_CENTER.x}
            cy={ORBIT_CENTER.y}
            r={OUTER_RADIUS}
            fill="none"
            stroke="url(#figma-outer-gradient)"
            strokeWidth={outerActive ? 3.4 : 2.6}
            initial={{ opacity: 0 }}
            animate={{ opacity: outerActive ? 0.96 : 0 }}
            transition={{
              duration: reducedMotion ? 0.16 : 0.46,
              ease: [0.16, 1, 0.3, 1],
            }}
            filter={
              outerActive && !reducedMotion
                ? "url(#figma-orbit-glow)"
                : undefined
            }
          />

          <circle
            cx={ORBIT_CENTER.x}
            cy={ORBIT_CENTER.y}
            r={INNER_RADIUS}
            fill="none"
            stroke="rgba(138,174,200,.35)"
            strokeWidth="2.6"
          />

          <motion.circle
            cx={ORBIT_CENTER.x}
            cy={ORBIT_CENTER.y}
            r={INNER_RADIUS}
            fill="none"
            stroke="url(#figma-inner-gradient)"
            strokeWidth={innerActive ? 3.4 : 2.6}
            initial={{ opacity: 0 }}
            animate={{ opacity: innerActive ? 0.96 : 0 }}
            transition={{
              duration: reducedMotion ? 0.16 : 0.46,
              ease: [0.16, 1, 0.3, 1],
            }}
            filter={
              innerActive && !reducedMotion
                ? "url(#figma-orbit-glow)"
                : undefined
            }
          />

          <circle
            cx={ORBIT_CENTER.x}
            cy={ORBIT_CENTER.y}
            r={OUTER_RADIUS}
            fill="none"
            stroke="transparent"
            strokeWidth="22"
            pointerEvents="stroke"
            onMouseEnter={() => setOrbitHovered("outer")}
            onMouseLeave={() => setOrbitHovered(null)}
            style={{ cursor: "pointer" }}
          />

          <circle
            cx={ORBIT_CENTER.x}
            cy={ORBIT_CENTER.y}
            r={INNER_RADIUS}
            fill="none"
            stroke="transparent"
            strokeWidth="22"
            pointerEvents="stroke"
            onMouseEnter={() => setOrbitHovered("inner")}
            onMouseLeave={() => setOrbitHovered(null)}
            style={{ cursor: "pointer" }}
          />
        </svg>

        {/* Nodes share the exact same square field as the rings, so alignment is stable. */}
        <AnimatePresence>
          {stages.map((stage, stageIndex) => {
            const geometry = NODE_GEOMETRY[stage.id];
            const point = pointOnOrbit(geometry.orbit, geometry.angle);
            const color = resolveColor(stage.colorRole);
            const active = stage.id === activeStageId;
            const unlocked = stageIndex < revealedCount;
            const future = !unlocked;
            const hovered = stage.id === hoveredStageId;

            return (
              <motion.button
                key={stage.id}
                type="button"
                onClick={() => onCommitStage(stage.id)}
                onMouseEnter={() => setHoveredStageId(stage.id)}
                onMouseLeave={() => setHoveredStageId(null)}
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.96 }
                }
                animate={{
                  opacity: active ? 1 : hovered ? 0.68 : future ? 0.24 : 0.48,
                  scale: active ? 1.05 : hovered ? 1.02 : 1,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reducedMotion ? 0.16 : 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  position: "absolute",
                  left: orbitalPct(point.x),
                  top: orbitalPct(point.y),
                  width: `${(geometry.width / ORBITAL_VIEWBOX) * 100}%`,
                  minWidth: active ? 210 : 180,
                  maxWidth: active ? 255 : 220,
                  padding: 0,
                  border: 0,
                  background: "transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  color: "#F4EBD0",
                  pointerEvents: "auto",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: active ? "49px 1fr" : "46px 1fr",
                    gap: active ? 14 : 13,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: active ? 49 : 46,
                      height: active ? 49 : 46,
                      borderRadius: "50%",
                      border:
                        future && !hovered
                          ? "1px solid rgba(245,235,210,.22)"
                          : `1px solid ${color}${
                              active ? "D9" : hovered ? "A0" : "58"
                            }`,
                      background:
                        future && !hovered
                          ? "rgba(245,235,210,.025)"
                          : `${color}${active ? "1F" : hovered ? "12" : "08"}`,
                      boxShadow:
                        active || hovered
                          ? `0 0 31px ${color}38`
                          : "none",
                    }}
                  >
                    <span
                      style={{
                        width: active ? 9 : 8,
                        height: active ? 9 : 8,
                        borderRadius: "50%",
                        background:
                          future && !hovered
                            ? "rgba(245,235,210,.28)"
                            : color,
                        boxShadow: active || hovered
                          ? `0 0 13px ${color}`
                          : "none",
                      }}
                    />
                  </span>

                  <span>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: active ? 12.7 : 12.1,
                        lineHeight: 1.5,
                        letterSpacing: ".115em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        color: active
                          ? "rgba(255,248,230,.98)"
                          : "rgba(245,235,210,.74)",
                      }}
                    >
                      {stage.title}
                    </span>

                    {active && (
                      <span
                        style={{
                          display: "block",
                          marginTop: 5.5,
                          maxWidth: 160,
                          fontFamily: "'EB Garamond', serif",
                          fontSize: 15.5,
                          lineHeight: 1.4,
                          fontWeight: 500,
                          color: "rgba(245,235,210,.66)",
                        }}
                      >
                        {stage.summary}
                      </span>
                    )}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Exact Figma Make reading column: x≈691 / width≈395. */}
      <div
        style={{
          position: "absolute",
          left: pctX(691),
          top: pctY(229 - SYSTEM_TOP),
          width: READING_COLUMN_WIDTH,
          maxWidth: "34.21vw",
        }}
      >
        <div style={{ pointerEvents: "none" }}>
          <ExperienceAnnotation
            stage={activeStage}
            color={resolveColor(activeStage.colorRole)}
            compact
          />
        </div>

        {canAdvance && (
          <motion.div
            initial={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reducedMotion ? 0 : 0.18,
              duration: reducedMotion ? 0.16 : 0.42,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ marginTop: 16 }}
          >
            <button
              type="button"
              onClick={() => {
                if (nextStage) {
                  onCommitStage(nextStage.id);
                }
              }}
              style={{
                width: "100%",
                minHeight: 54,
                padding: "0 18px",
                border: "1.3px solid rgba(138,174,200,.34)",
                background: "rgba(7,9,16,.78)",
                color: "rgba(190,220,245,.90)",
                fontFamily: "'DM Mono', monospace",
                fontSize: 11.5,
                letterSpacing: ".145em",
                textTransform: "uppercase",
                textAlign: "left",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
              }}
            >
              Next step
              <span
                aria-hidden="true"
                style={{ margin: "0 12px", opacity: 0.72 }}
              >
                →
              </span>
              {nextStage?.title ?? "Continue"}
            </button>
          </motion.div>
        )}

        {activeStageId === "act" && (
          <motion.div
            initial={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reducedMotion ? 0 : 0.22,
              duration: reducedMotion ? 0.16 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              marginTop: 16,
              width: "100%",
              boxSizing: "border-box",
              padding: "20px 20px",
              border: "1px solid rgba(200,169,110,.26)",
              background:
                "linear-gradient(145deg, rgba(18,14,8,.80), rgba(8,9,14,.92))",
              boxShadow:
                "0 18px 60px rgba(0,0,0,.28), 0 0 34px rgba(200,169,110,.05)",
              backdropFilter: "blur(14px)",
            }}
          >
            <div
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 18,
                color: "rgba(239,203,126,.96)",
                marginBottom: 6,
              }}
            >
              Ready to put it into practice?
            </div>

            <div
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 14,
                lineHeight: 1.5,
                color: "rgba(245,235,210,.64)",
                marginBottom: 13,
              }}
            >
              Move into a real example and see how the framework changes the
              interface.
            </div>

            <button
              type="button"
              onClick={onApply}
              style={{
                width: "100%",
                minHeight: 50,
                padding: "0 16px",
                border: "1px solid rgba(218,179,98,.54)",
                background:
                  "linear-gradient(180deg, rgba(218,179,98,.96), rgba(179,139,68,.92))",
                color: "rgba(18,13,7,.96)",
                fontFamily: "'DM Mono', monospace",
                fontSize: 9.5,
                fontWeight: 600,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 0 24px rgba(218,179,98,.17)",
              }}
            >
              Learn how to apply this framework
              <span aria-hidden="true" style={{ marginLeft: 10 }}>
                →
              </span>
            </button>
          </motion.div>
        )}
      </div>

    </div>
  );
}
