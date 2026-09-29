import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type Priority = "fewest-conflicts" | "earliest" | "executive";

const PRIORITIES: { id: Priority; label: string }[] = [
  { id: "fewest-conflicts", label: "Fewest conflicts" },
  { id: "earliest", label: "Earliest availability" },
  { id: "executive", label: "Executive preference" },
];

export default function BehavioralDecisionExample() {
  const [mode, setMode] = useState<"traditional" | "behavioral">("behavioral");
  const [priority, setPriority] = useState<Priority>("fewest-conflicts");
  const reducedMotion = useReducedMotion();

  const decision = useMemo(() => {
    if (priority === "earliest") {
      return {
        information: "Tuesday has one viable opening at 4:30 PM.",
        interpretation: "Tuesday is the earliest option, but two attendees marked late meetings as undesirable.",
        recommendation: "Tuesday at 4:30 PM",
        confidence: "Low–medium",
      };
    }
    if (priority === "executive") {
      return {
        information: "The executive sponsor is available Wednesday at 11 AM and Thursday at 3 PM.",
        interpretation: "Wednesday preserves the sponsor's preferred morning window but creates one attendee conflict.",
        recommendation: "Wednesday at 11:00 AM",
        confidence: "Medium",
      };
    }
    return {
      information: "3 teammates are unavailable Tuesday.",
      interpretation: "Wednesday creates the least scheduling conflict.",
      recommendation: "Wednesday at 2:00 PM",
      confidence: "Medium",
    };
  }, [priority]);

  return (
    <section
      aria-labelledby="behavioral-example-title"
      style={{
        display: "grid",
        gridTemplateColumns: "260px minmax(0, 1fr)",
        gap: 24,
        padding: "26px",
        border: "1px solid rgba(200,180,130,0.09)",
        background: "rgba(255,255,255,0.012)",
      }}
    >
      <div>
        <div style={eyebrow}>Interactive example</div>
        <h2 id="behavioral-example-title" style={{ margin: "0 0 10px", fontFamily: "'EB Garamond',serif", fontSize: 25, fontWeight: 500, color: "rgba(255,248,230,.94)" }}>
          Calendar Assistant
        </h2>
        <p style={{ margin: "0 0 22px", fontFamily: "'EB Garamond',serif", fontSize: 14, lineHeight: 1.55, color: "rgba(245,235,210,.56)" }}>
          Change the decision criteria and inspect how the recommendation changes.
        </p>

        <div style={{ marginBottom: 22 }}>
          <div style={{ ...eyebrow, marginBottom: 10 }}>Priority</div>
          <div style={{ display: "grid", gap: 7 }}>
            {PRIORITIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPriority(item.id)}
                aria-pressed={priority === item.id}
                style={{
                  padding: "9px 11px",
                  border: priority === item.id ? "1px solid rgba(101,214,154,.48)" : "1px solid rgba(245,235,210,.08)",
                  background: priority === item.id ? "rgba(101,214,154,.06)" : "transparent",
                  color: priority === item.id ? "rgba(245,235,210,.90)" : "rgba(245,235,210,.52)",
                  textAlign: "left",
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 9,
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                }}
              >
                {priority === item.id ? "◆ " : "◇ "}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ ...eyebrow, marginBottom: 10 }}>View</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {(["traditional", "behavioral"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                aria-pressed={mode === item}
                style={{
                  padding: "9px 6px",
                  border: mode === item ? "1px solid rgba(138,174,200,.48)" : "1px solid rgba(245,235,210,.08)",
                  background: mode === item ? "rgba(138,174,200,.07)" : "transparent",
                  color: mode === item ? "rgba(245,235,210,.92)" : "rgba(245,235,210,.50)",
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 8,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        key={`${mode}-${priority}`}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0.16 : 0.34, ease: [0.16, 1, 0.3, 1] }}
        style={{
          alignSelf: "stretch",
          padding: "22px",
          border: "1px solid rgba(138,174,200,.10)",
          background: "linear-gradient(145deg, rgba(9,12,20,.92), rgba(6,8,15,.78))",
        }}
      >
        {mode === "traditional" ? (
          <>
            <div style={{ ...eyebrow, color: "rgba(138,174,200,.68)" }}>Traditional AI</div>
            <div style={{ marginTop: 40, textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: ".16em", color: "rgba(245,235,210,.46)", textTransform: "uppercase" }}>Best time</div>
              <div style={{ marginTop: 12, fontFamily: "'EB Garamond',serif", fontSize: 28, color: "rgba(255,248,230,.96)" }}>{decision.recommendation}</div>
              <div style={{ marginTop: 9, fontFamily: "'EB Garamond',serif", fontSize: 13, color: "rgba(245,235,210,.46)" }}>High confidence</div>
            </div>
          </>
        ) : (
          <>
            <div style={{ ...eyebrow, color: "#65D69A" }}>Behavioral design approach</div>
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              <DecisionLayer label="Information" color="#65D69A" body={decision.information} />
              <DecisionLayer label="Interpretation" color="#D9B65E" body={decision.interpretation} />
              <DecisionLayer label="Recommendation" color="#E58D6F" body={decision.recommendation} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(245,235,210,.08)" }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, letterSpacing: ".18em", color: "rgba(138,174,200,.72)", textTransform: "uppercase" }}>Confidence</span>
              <span style={{ fontFamily: "'EB Garamond',serif", fontSize: 13, color: "rgba(245,235,210,.72)" }}>{decision.confidence}</span>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
}

function DecisionLayer({ label, color, body }: { label: string; color: string; body: string }) {
  return (
    <div style={{ padding: "13px 14px", border: `1px solid ${color}30`, background: `${color}08` }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, letterSpacing: ".18em", color, textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: "'EB Garamond',serif", fontSize: 14, lineHeight: 1.48, color: "rgba(245,235,210,.76)" }}>{body}</div>
    </div>
  );
}

const eyebrow = {
  fontFamily: "'DM Mono',monospace",
  fontSize: 8,
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  color: "rgba(101,214,154,.72)",
};
