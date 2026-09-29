import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { BehavioralStage } from "./behavioralDecisionDesignData";

interface BehavioralAskPanelProps {
  open: boolean;
  stage: BehavioralStage;
  color: string;
  onClose: () => void;
}

export default function BehavioralAskPanel({
  open,
  stage,
  color,
  onClose,
}: BehavioralAskPanelProps) {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  if (!open) return null;

  const suggestions = [
    `Why does ${stage.title.toLowerCase()} matter here?`,
    "Show me another interface example",
    "When is this pattern unnecessary?",
    "How could this pattern create false authority?",
  ];

  const submit = (value: string) => {
    const next = value.trim();
    if (!next) return;
    setQuestion("");
    setSubmitted(next);
  };

  return (
    <motion.aside
      role="dialog"
      aria-label="Ask Atlas about this module"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: reducedMotion ? 0.16 : 0.34, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        right: 18,
        bottom: 18,
        zIndex: 8,
        width: 360,
        maxHeight: "70vh",
        overflow: "auto",
        border: "1px solid rgba(200,180,130,.18)",
        background: "linear-gradient(145deg, rgba(10,13,21,.985), rgba(7,9,16,.98))",
        boxShadow: "0 24px 70px rgba(0,0,0,.46)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 16px", borderBottom: "1px solid rgba(245,235,210,.08)" }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8.5, letterSpacing: ".18em", color, textTransform: "uppercase" }}>Ask · {stage.title}</div>
        <button type="button" onClick={onClose} aria-label="Close Ask panel" style={{ width: 32, height: 32, border: "1px solid rgba(245,235,210,.10)", background: "transparent", color: "rgba(245,235,210,.68)", cursor: "pointer" }}>×</button>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: "grid", gap: 7 }}>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => submit(suggestion)}
              style={{ padding: "10px 11px", border: "1px solid rgba(245,235,210,.07)", background: "rgba(255,255,255,.018)", color: "rgba(245,235,210,.62)", textAlign: "left", fontFamily: "'EB Garamond',serif", fontSize: 12.5, cursor: "pointer" }}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {submitted && (
          <div style={{ marginTop: 13, padding: 12, borderLeft: `2px solid ${color}`, background: `${color}0B`, fontFamily: "'EB Garamond',serif", fontSize: 12.5, lineHeight: 1.5, color: "rgba(245,235,210,.62)" }}>
            <strong style={{ color: "rgba(245,235,210,.82)", fontWeight: 500 }}>Question captured:</strong><br />
            {submitted}<br /><br />
            <span style={{ color: "rgba(245,235,210,.42)" }}>
              This pass wires the contextual Ask interaction and state. Connect this submit handler to the Atlas grounded-response service when that endpoint is available to this experience.
            </span>
          </div>
        )}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(question);
          }}
          style={{ display: "grid", gridTemplateColumns: "1fr 38px", gap: 8, marginTop: 14 }}
        >
          <label style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }} htmlFor="behavioral-ask-input">Ask a question</label>
          <input
            id="behavioral-ask-input"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask a question"
            style={{ minWidth: 0, height: 38, padding: "0 11px", border: "1px solid rgba(200,169,110,.24)", background: "rgba(3,4,9,.72)", color: "rgba(245,235,210,.86)", outline: "none", fontFamily: "'EB Garamond',serif", fontSize: 13 }}
          />
          <button type="submit" aria-label="Submit question" style={{ border: 0, background: color, color: "#06100B", fontSize: 16, cursor: "pointer" }}>↑</button>
        </form>
      </div>
    </motion.aside>
  );
}
