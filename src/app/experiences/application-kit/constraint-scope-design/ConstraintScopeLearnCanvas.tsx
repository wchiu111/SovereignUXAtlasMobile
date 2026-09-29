import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import type {
  ConstraintScopeStage,
  ConstraintScopeStageId,
} from "./constraintScopeDesignData";

interface ConstraintScopeLearnCanvasProps {
  stages: ConstraintScopeStage[];
  activeStageId: ConstraintScopeStageId;
  onCommitStage: (id: ConstraintScopeStageId) => void;
  onApply: () => void;
  moduleColor: string;
}

const FIELD_SIZE = 1155;
const ORBIT_CENTER = { x: 165, y: 1060 };
const CORE_SIZE = 505;
const OUTER_RADIUS = 700;
const INNER_RADIUS = 505;

const ORDER: ConstraintScopeStageId[] = [
  "capability",
  "boundary",
  "limitation",
  "disclosure",
  "escalation",
  "handoff",
  "non-action",
];

const NODE_GEOMETRY: Record<
  ConstraintScopeStageId,
  { orbit: "outer" | "inner"; angle: number; width: number }
> = {
  capability: { orbit: "outer", angle: -95, width: 215 },
  boundary: { orbit: "outer", angle: -80, width: 215 },
  limitation: { orbit: "outer", angle: -64, width: 220 },
  disclosure: { orbit: "outer", angle: -47, width: 220 },
  escalation: { orbit: "inner", angle: -79, width: 220 },
  handoff: { orbit: "inner", angle: -50, width: 220 },
  "non-action": { orbit: "inner", angle: -19, width: 225 },
};

function fieldPercent(value: number) {
  return `${(value / FIELD_SIZE) * 100}%`;
}

function pointOnOrbit(
  orbit: "outer" | "inner",
  angleDegrees: number,
) {
  const radius = orbit === "outer" ? OUTER_RADIUS : INNER_RADIUS;
  const radians = (angleDegrees * Math.PI) / 180;

  return {
    x: ORBIT_CENTER.x + Math.cos(radians) * radius,
    y: ORBIT_CENTER.y + Math.sin(radians) * radius,
  };
}

export default function ConstraintScopeLearnCanvas({
  stages,
  activeStageId,
  onCommitStage,
  onApply,
  moduleColor,
}: ConstraintScopeLearnCanvasProps) {
  const reducedMotion = useReducedMotion();

  const [hoveredStageId, setHoveredStageId] =
    useState<ConstraintScopeStageId | null>(null);

  const [orbitHovered, setOrbitHovered] =
    useState<"outer" | "inner" | null>(null);

  const activeStage =
    stages.find((stage) => stage.id === activeStageId) ?? stages[0];

  const activeIndex = ORDER.indexOf(activeStageId);

  const nextStageId =
    activeIndex >= 0 && activeIndex < ORDER.length - 1
      ? ORDER[activeIndex + 1]
      : null;

  const nextStage = nextStageId
    ? stages.find((stage) => stage.id === nextStageId)
    : undefined;

  const outerActive =
    orbitHovered === "outer" ||
    ["capability", "boundary", "limitation", "disclosure"].includes(
      hoveredStageId ?? "",
    );

  const innerActive =
    orbitHovered === "inner" ||
    ["escalation", "handoff", "non-action"].includes(hoveredStageId ?? "");

  return (
    <div style={styles.canvas}>
      <div style={styles.orbitalField}>
        <div
          aria-hidden="true"
          style={{
            ...styles.core,
            left: fieldPercent(ORBIT_CENTER.x - CORE_SIZE / 2),
            top: fieldPercent(ORBIT_CENTER.y - CORE_SIZE / 2),
            width: fieldPercent(CORE_SIZE),
            height: fieldPercent(CORE_SIZE),
            background: `radial-gradient(
              circle at 42% 34%,
              ${moduleColor}E6 0%,
              ${moduleColor}C2 31%,
              ${moduleColor}94 62%,
              ${moduleColor}66 100%
            )`,
            boxShadow: `
              0 0 156px ${moduleColor}24,
              0 0 358px ${moduleColor}12
            `,
          }}
        />

        <svg
          viewBox={`0 0 ${FIELD_SIZE} ${FIELD_SIZE}`}
          preserveAspectRatio="xMinYMin meet"
          style={styles.orbitSvg}
        >
          <defs>
            <linearGradient
              id="constraint-outer-gradient"
              x1="90"
              y1="150"
              x2="650"
              y2="480"
              gradientUnits="userSpaceOnUse"
            >
              {stages.slice(0, 4).map((stage, index) => (
                <stop
                  key={stage.id}
                  offset={`${(index / 3) * 100}%`}
                  stopColor={stage.color}
                  stopOpacity=".84"
                />
              ))}
            </linearGradient>

            <linearGradient
              id="constraint-inner-gradient"
              x1="280"
              y1="350"
              x2="665"
              y2="750"
              gradientUnits="userSpaceOnUse"
            >
              {stages.slice(4).map((stage, index) => (
                <stop
                  key={stage.id}
                  offset={`${(index / 2) * 100}%`}
                  stopColor={stage.color}
                  stopOpacity=".84"
                />
              ))}
            </linearGradient>

            <filter
              id="constraint-orbit-glow"
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3.5"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle
            cx={ORBIT_CENTER.x}
            cy={ORBIT_CENTER.y}
            r={OUTER_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,.28)"
            strokeWidth="2.6"
          />

          <circle
            cx={ORBIT_CENTER.x}
            cy={ORBIT_CENTER.y}
            r={OUTER_RADIUS}
            fill="none"
            stroke="url(#constraint-outer-gradient)"
            strokeWidth={outerActive ? 3.4 : 2.6}
            filter={
              outerActive && !reducedMotion
                ? "url(#constraint-orbit-glow)"
                : "none"
            }
            style={{
              opacity: outerActive ? 0.96 : 0,
              transition: reducedMotion
                ? "opacity .16s linear"
                : "opacity .46s cubic-bezier(.16,1,.3,1)",
              pointerEvents: "none",
            }}
          />

          <circle
            cx={ORBIT_CENTER.x}
            cy={ORBIT_CENTER.y}
            r={INNER_RADIUS}
            fill="none"
            stroke="rgba(212,168,77,.30)"
            strokeWidth="2.6"
          />

          <circle
            cx={ORBIT_CENTER.x}
            cy={ORBIT_CENTER.y}
            r={INNER_RADIUS}
            fill="none"
            stroke="url(#constraint-inner-gradient)"
            strokeWidth={innerActive ? 3.4 : 2.6}
            filter={
              innerActive && !reducedMotion
                ? "url(#constraint-orbit-glow)"
                : "none"
            }
            style={{
              opacity: innerActive ? 0.96 : 0,
              transition: reducedMotion
                ? "opacity .16s linear"
                : "opacity .46s cubic-bezier(.16,1,.3,1)",
              pointerEvents: "none",
            }}
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
            style={{ cursor: "pointer", pointerEvents: "stroke" }}
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
            style={{ cursor: "pointer", pointerEvents: "stroke" }}
          />
        </svg>

        {stages.map((stage) => {
          const geometry = NODE_GEOMETRY[stage.id];
          const point = pointOnOrbit(geometry.orbit, geometry.angle);
          const active = stage.id === activeStageId;
          const hovered = stage.id === hoveredStageId;
          const silent = !active && !hovered;

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
                opacity: active ? 1 : hovered ? 0.72 : 0.24,
                scale: active ? 1.05 : hovered ? 1.02 : 1,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reducedMotion ? 0.16 : 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                ...styles.node,
                left: fieldPercent(point.x),
                top: fieldPercent(point.y),
                width: fieldPercent(geometry.width),
                minWidth: active ? 220 : 185,
                maxWidth: active ? 270 : 235,
                opacity: 0,
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
                    ...styles.nodeOrb,
                    width: active ? 49 : 46,
                    height: active ? 49 : 46,
                    border: `1px solid ${
                      silent ? "rgba(245,235,210,.20)" : stage.color
                    }`,
                    background: silent
                      ? "rgba(245,235,210,.02)"
                      : `${stage.color}${active ? "20" : "10"}`,
                    boxShadow:
                      active || hovered
                        ? `0 0 31px ${stage.color}38`
                        : "none",
                  }}
                >
                  <span
                    style={{
                      width: active ? 9 : 8,
                      height: active ? 9 : 8,
                      borderRadius: "50%",
                      background: silent
                        ? "rgba(245,235,210,.25)"
                        : stage.color,
                      boxShadow:
                        active || hovered
                          ? `0 0 13px ${stage.color}`
                          : "none",
                    }}
                  />
                </span>

                <span>
                  <span
                    style={{
                      ...styles.nodeTitle,
                      fontSize: active ? 12.7 : 12.1,
                      color: active
                        ? "rgba(255,248,230,.98)"
                        : "rgba(245,235,210,.68)",
                    }}
                  >
                    {stage.title}
                  </span>

                  {active && (
                    <span style={styles.nodeSummary}>
                      {stage.summary}
                    </span>
                  )}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div style={styles.readingColumn}>
        <div style={styles.annotationPanel}>
          <div
            style={{
              ...styles.annotationTitle,
              color: activeStage.color,
            }}
          >
            {activeStage.title}
          </div>

          <AnnotationLabel>What you're seeing</AnnotationLabel>
          <AnnotationCopy>{activeStage.annotation.what}</AnnotationCopy>

          <AnnotationLabel>Why it matters</AnnotationLabel>
          <AnnotationCopy>{activeStage.annotation.why}</AnnotationCopy>

          <AnnotationLabel>Sovereign principle</AnnotationLabel>
          <AnnotationCopy>
            {activeStage.annotation.principle}
          </AnnotationCopy>
        </div>

        {nextStage ? (
          <button
            type="button"
            onClick={() => onCommitStage(nextStage.id)}
            style={styles.nextButton}
          >
            Next step &nbsp;→&nbsp; {nextStage.title}
          </button>
        ) : (
          <div
            style={{
              ...styles.finalCta,
              border: `1px solid ${moduleColor}55`,
            }}
          >
            <div style={styles.finalCtaTitle}>
              Ready to see the boundary in practice?
            </div>

            <div style={styles.finalCtaCopy}>
              Compare the same question with and without visible system scope.
            </div>

            <button
              type="button"
              onClick={onApply}
              style={{
                ...styles.applyButton,
                background: moduleColor,
              }}
            >
              Learn how to apply this framework →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AnnotationLabel({ children }: { children: React.ReactNode }) {
  return <div style={styles.annotationLabel}>{children}</div>;
}

function AnnotationCopy({ children }: { children: React.ReactNode }) {
  return <div style={styles.annotationCopy}>{children}</div>;
}

const styles = {
  canvas: {
    position: "relative",
    width: "100%",
    minHeight: "calc(100dvh - 150px)",
    overflow: "visible",
  },

  orbitalField: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "clamp(760px,72vw,1155px)",
    height: "clamp(760px,72vw,1155px)",
    pointerEvents: "none",
  },

  core: {
    position: "absolute",
    minWidth: 350,
    minHeight: 350,
    maxWidth: CORE_SIZE,
    maxHeight: CORE_SIZE,
    borderRadius: "50%",
  },

  orbitSvg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "auto" as const,
  },

  node: {
    position: "absolute",
    padding: 0,
    border: 0,
    background: "transparent",
    color: "#F4EBD0",
    textAlign: "left" as const,
    cursor: "pointer",
    pointerEvents: "auto" as const,
  },

  nodeOrb: {
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
  },

  nodeTitle: {
    display: "block",
    fontFamily: "'DM Mono',monospace",
    lineHeight: 1.5,
    letterSpacing: ".115em",
    textTransform: "uppercase" as const,
    whiteSpace: "nowrap" as const,
  },

  nodeSummary: {
    display: "block",
    marginTop: 5.5,
    maxWidth: 175,
    fontFamily: "'EB Garamond',serif",
    fontSize: 15.5,
    lineHeight: 1.45,
    color: "rgba(245,235,210,.78)",
  },

  readingColumn: {
    position: "absolute",
    top: 34,
    right: "clamp(2px,4vw,74px)",
    width: "min(395px,31vw)",
    minWidth: 350,
  },

  annotationPanel: {
    padding: "23px 22px 21px",
    border: "1px solid rgba(245,235,210,.11)",
    background:
      "linear-gradient(180deg,rgba(8,11,18,.93),rgba(4,7,12,.90))",
    backdropFilter: "blur(14px)",
  },

  annotationTitle: {
    fontFamily: "'DM Mono',monospace",
    fontSize: 10,
    letterSpacing: ".15em",
    textTransform: "uppercase" as const,
  },

  annotationLabel: {
    marginTop: 17,
    fontFamily: "'DM Mono',monospace",
    fontSize: 8.5,
    letterSpacing: ".17em",
    textTransform: "uppercase" as const,
    color: "rgba(200,180,130,.64)",
  },

  annotationCopy: {
    marginTop: 7,
    fontFamily: "'EB Garamond',serif",
    fontSize: 17,
    lineHeight: 1.5,
    color: "rgba(245,235,210,.82)",
  },

  nextButton: {
    width: "100%",
    minHeight: 54,
    marginTop: 14,
    padding: "0 18px",
    border: "1px solid rgba(221,180,90,.34)",
    background: "rgba(4,7,12,.80)",
    color: "rgba(239,208,138,.92)",
    textAlign: "left" as const,
    fontFamily: "'DM Mono',monospace",
    fontSize: 10,
    letterSpacing: ".16em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
  },

  finalCta: {
    marginTop: 14,
    padding: "20px 20px 19px",
    background:
      "linear-gradient(135deg,rgba(17,13,8,.92),rgba(8,8,12,.88))",
  },

  finalCtaTitle: {
    fontFamily: "'EB Garamond',serif",
    fontSize: 21,
    color: "rgba(233,198,113,.95)",
  },

  finalCtaCopy: {
    marginTop: 7,
    fontFamily: "'EB Garamond',serif",
    fontSize: 15,
    lineHeight: 1.45,
    color: "rgba(245,235,210,.62)",
  },

  applyButton: {
    width: "100%",
    minHeight: 48,
    marginTop: 16,
    border: 0,
    color: "#08070C",
    fontFamily: "'DM Mono',monospace",
    fontSize: 9.5,
    letterSpacing: ".12em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
  },
};
