import { motion, useReducedMotion } from "motion/react";
import type { BehavioralStage } from "./behavioralDecisionDesignData";

interface BehavioralStageInspectorProps {
  stage: BehavioralStage;
  color: string;
}

export default function BehavioralStageInspector({
  stage,
  color,
}: BehavioralStageInspectorProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      key={stage.id}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0.16 : 0.36,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 8.5,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color,
          marginBottom: 12,
        }}
      >
        {stage.number} · {stage.title}
      </div>

      <div
        style={{
          fontFamily: "'EB Garamond',serif",
          fontSize: 20,
          lineHeight: 1.25,
          color: "rgba(255,248,230,0.94)",
          marginBottom: 16,
        }}
      >
        {stage.summary}
      </div>

      <div
        style={{
          fontFamily: "'EB Garamond',serif",
          fontSize: 14.5,
          lineHeight: 1.65,
          color: "rgba(240,232,215,0.66)",
          marginBottom: 22,
        }}
      >
        {stage.detail}
      </div>

      {stage.id === "separate" && (
        <div style={{ display: "grid", gap: 8, marginBottom: 24 }}>
          {[
            ["INFORMATION", "Observable fact or data.", "3 teammates are unavailable Tuesday."],
            ["INTERPRETATION", "What the system infers.", "Wednesday creates the least scheduling conflict."],
            ["RECOMMENDATION", "What the system suggests.", "I recommend Wednesday at 2 PM."],
          ].map(([label, description, example], index) => (
            <div
              key={label}
              style={{
                padding: "13px 14px",
                border: `1px solid ${index === 0 ? "rgba(101,214,154,.22)" : index === 1 ? "rgba(220,180,80,.22)" : "rgba(220,120,90,.22)"}`,
                background: "rgba(255,255,255,0.018)",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 8,
                  letterSpacing: "0.18em",
                  color: index === 0 ? "#65D69A" : index === 1 ? "#D9B65E" : "#E58D6F",
                  marginBottom: 5,
                }}
              >
                {label}
              </div>
              <div style={{ fontFamily: "'EB Garamond',serif", fontSize: 12.5, color: "rgba(245,235,210,.56)" }}>
                {description}
              </div>
              <div style={{ marginTop: 7, fontFamily: "'EB Garamond',serif", fontSize: 12.5, lineHeight: 1.4, color: "rgba(245,235,210,.80)" }}>
                {example}
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          paddingTop: 18,
          borderTop: "1px solid rgba(200,180,130,0.08)",
        }}
      >
        <div
          style={{
            marginBottom: 12,
            fontFamily: "'DM Mono',monospace",
            fontSize: 8,
            letterSpacing: "0.22em",
            color: "rgba(200,180,130,0.46)",
            textTransform: "uppercase",
          }}
        >
          Questions to inspect
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {stage.prompts.map((prompt) => (
            <div
              key={prompt}
              style={{
                display: "grid",
                gridTemplateColumns: "12px 1fr",
                gap: 8,
                fontFamily: "'EB Garamond',serif",
                fontSize: 13,
                lineHeight: 1.45,
                color: "rgba(240,232,215,0.58)",
              }}
            >
              <span style={{ color, opacity: 0.68 }}>◇</span>
              <span>{prompt}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
          padding: "13px 14px",
          borderLeft: `2px solid ${color}`,
          background: `${color}0C`,
          fontFamily: "'EB Garamond',serif",
          fontSize: 13.5,
          lineHeight: 1.5,
          color: "rgba(245,235,210,.76)",
        }}
      >
        {stage.id === "separate"
          ? "Never collapse information, interpretation, and recommendation into one authoritative statement."
          : "Keep the user's authority visible as the system moves through this stage."}
      </div>
    </motion.div>
  );
}
