import { motion, useReducedMotion } from "motion/react";
import type { BehavioralStage } from "./behavioralDecisionDesignData";

interface ExperienceAnnotationProps {
  stage: BehavioralStage;
  color: string;
  compact?: boolean;
}

export default function ExperienceAnnotation({
  stage,
  color,
  compact = false,
}: ExperienceAnnotationProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.aside
      key={stage.id}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0.16 : 0.42,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: compact ? "20px 22px" : "22px 24px",
        border: "1px solid rgba(245,235,210,.11)",
        background:
          "linear-gradient(145deg, rgba(12,15,24,.94), rgba(7,9,16,.90))",
        boxShadow: "0 18px 60px rgba(0,0,0,.32)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        style={{
          marginBottom: 14,
          fontFamily: "'DM Mono',monospace",
          fontSize: "clamp(11px, .72vw, 12px)",
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color,
        }}
      >
        {stage.title}
      </div>

      <div style={{ display: "grid", gap: compact ? 18 : 20 }}>
        <Block label="What you're seeing" value={stage.annotation.what} />
        <Block label="Why it matters" value={stage.annotation.why} />
        {!compact && (
          <>
            <Block
              label="Sovereign principle"
              value={stage.annotation.principle}
            />
            <Block
              label="Question to consider"
              value={stage.annotation.question}
            />
          </>
        )}
      </div>
    </motion.aside>
  );
}

function Block({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div
        style={{
          marginBottom: 8,
          fontFamily: "'DM Mono',monospace",
          fontSize: "clamp(9.5px, .62vw, 10.5px)",
          lineHeight: 1.4,
          letterSpacing: ".16em",
          textTransform: "uppercase",
          color: "rgba(200,180,130,.60)",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontFamily: "'EB Garamond',serif",
          fontSize: "clamp(17px, 1.05vw, 18.5px)",
          lineHeight: 1.52,
          color: "rgba(245,235,210,.80)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
