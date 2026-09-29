import { motion, useReducedMotion } from "motion/react";
import type { BehavioralStage, BehavioralStageId } from "./behavioralDecisionDesignData";

interface BehavioralPipelineProps {
  stages: BehavioralStage[];
  activeStageId: BehavioralStageId;
  onStageChange: (stageId: BehavioralStageId) => void;
  resolveColor: (role: BehavioralStage["colorRole"]) => string;
}

const POSITIONS: Record<BehavioralStageId, { x: number; y: number }> = {
  interpret: { x: 50, y: 14 },
  separate: { x: 28, y: 38 },
  frame: { x: 36, y: 72 },
  recommend: { x: 58, y: 82 },
  confirm: { x: 80, y: 67 },
  act: { x: 77, y: 30 },
};

const CONNECTIONS: [BehavioralStageId, BehavioralStageId][] = [
  ["interpret", "separate"],
  ["separate", "frame"],
  ["frame", "recommend"],
  ["recommend", "confirm"],
  ["confirm", "act"],
  ["act", "interpret"],
  ["separate", "recommend"],
  ["frame", "confirm"],
];

export default function BehavioralPipeline({
  stages,
  activeStageId,
  onStageChange,
  resolveColor,
}: BehavioralPipelineProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 520,
        overflow: "hidden",
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <circle cx="52" cy="49" r="22" fill="none" stroke="rgba(200,180,130,0.05)" strokeWidth=".12" />
        <circle cx="52" cy="49" r="31" fill="none" stroke="rgba(200,180,130,0.035)" strokeWidth=".12" strokeDasharray="1.2 2.4" />
        {CONNECTIONS.map(([from, to]) => {
          const a = POSITIONS[from];
          const b = POSITIONS[to];
          const active = from === activeStageId || to === activeStageId;
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(138,174,200,0.34)"
              strokeWidth={active ? 0.28 : 0.16}
              strokeDasharray={active ? "1.4 1.5" : ".7 1.8"}
              initial={false}
              animate={{ opacity: active ? 0.9 : 0.32 }}
              transition={{ duration: reducedMotion ? 0 : 0.32 }}
            />
          );
        })}
      </svg>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "52%",
          top: "49%",
          width: 112,
          height: 112,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid rgba(200,169,110,0.18)",
          boxShadow: "0 0 54px rgba(200,169,110,0.05)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 22,
            borderRadius: "50%",
            border: "1px dashed rgba(200,169,110,0.22)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 43,
            borderRadius: "50%",
            background: "rgba(200,169,110,0.78)",
            boxShadow: "0 0 24px rgba(200,169,110,0.42)",
          }}
        />
      </div>

      {stages.map((stage) => {
        const p = POSITIONS[stage.id];
        const color = resolveColor(stage.colorRole);
        const active = stage.id === activeStageId;

        return (
          <motion.button
            key={stage.id}
            type="button"
            onClick={() => onStageChange(stage.id)}
            aria-pressed={active}
            initial={false}
            animate={{
              scale: active ? 1.08 : 1,
              opacity: active ? 1 : 0.74,
            }}
            whileHover={reducedMotion ? undefined : { scale: active ? 1.08 : 1.035 }}
            transition={{
              duration: reducedMotion ? 0 : 0.34,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: 180,
              transform: "translate(-50%, -50%)",
              padding: 0,
              border: 0,
              background: "transparent",
              textAlign: "left",
              cursor: "pointer",
              color: "#F4EBD0",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "38px 1fr",
                gap: 12,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  position: "relative",
                  display: "grid",
                  placeItems: "center",
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: `1px solid ${color}${active ? "BB" : "66"}`,
                  background: `${color}${active ? "20" : "0D"}`,
                  boxShadow: active ? `0 0 28px ${color}38` : `0 0 14px ${color}18`,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: color,
                    boxShadow: `0 0 10px ${color}`,
                  }}
                />
              </span>

              <span>
                <span
                  style={{
                    display: "block",
                    marginBottom: 5,
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 8,
                    letterSpacing: "0.18em",
                    color,
                  }}
                >
                  {stage.number}
                </span>
                <span
                  style={{
                    display: "block",
                    marginBottom: 4,
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: active ? "rgba(255,248,230,0.98)" : "rgba(245,235,210,0.76)",
                  }}
                >
                  {stage.title}
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "'EB Garamond',serif",
                    fontSize: 12,
                    lineHeight: 1.35,
                    color: "rgba(240,232,215,0.46)",
                  }}
                >
                  {stage.summary}
                </span>
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
