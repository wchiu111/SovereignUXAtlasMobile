import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  BEHAVIORAL_STAGES,
  type BehavioralStageId,
} from "./behavioralDecisionDesignData";

type NoteState = Partial<Record<BehavioralStageId, string>>;

const EXPLORE_QUESTIONS: Record<BehavioralStageId, string[]> = {
  interpret: [
    "Can users distinguish facts from interpretation?",
    "Can the user correct the system's interpretation?",
  ],
  separate: [
    "Are observation, inference, and recommendation visibly distinct?",
    "Is the source or basis of the inference clear?",
  ],
  frame: [
    "Are alternatives or trade-offs presented?",
    "Are assumptions exposed where they affect the outcome?",
  ],
  recommend: [
    "Is the recommendation visibly a recommendation?",
    "Can the system decide not to recommend?",
  ],
  confirm: [
    "Can the recommendation be rejected without friction?",
    "Is the decision checkpoint explicit and unavoidable?",
  ],
  act: [
    "Does the system seek confirmation before consequential action?",
    "Can the user review or undo the action?",
  ],
};

const STAGE_COLORS: Record<BehavioralStageId, string> = {
  interpret: "rgba(119,190,235,.95)",
  separate: "rgba(230,196,66,.95)",
  frame: "rgba(232,228,211,.92)",
  recommend: "rgba(232,145,70,.96)",
  confirm: "rgba(234,92,88,.96)",
  act: "rgba(186,142,235,.96)",
};

export default function ExploreBehaviorCanvas() {
  const reducedMotion = useReducedMotion();
  const [notes, setNotes] = useState<NoteState>({});
  const [openStage, setOpenStage] = useState<BehavioralStageId | null>(null);

  const exportText = useMemo(() => {
    const lines = [
      "# Behavioral & Decision Design — Interface Evaluation",
      "",
      "Use these questions to inspect whether an AI experience preserves behavioral clarity and human authority.",
      "",
    ];

    BEHAVIORAL_STAGES.forEach((stage, index) => {
      lines.push(`## ${String(index + 1).padStart(2, "0")} ${stage.title}`);
      EXPLORE_QUESTIONS[stage.id].forEach((question) => {
        lines.push(`- [ ] ${question}`);
      });
      const note = notes[stage.id]?.trim();
      if (note) {
        lines.push("", "### Notes", note);
      }
      lines.push("");
    });

    return lines.join("\n");
  }, [notes]);

  const exportChecklist = () => {
    const blob = new Blob([exportText], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "behavioral-decision-design-evaluation.md";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setNotes({});
    setOpenStage(null);
  };

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0.16 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        width: "min(1180px, 100%)",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          marginBottom: 28,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "clamp(29px, 2.1vw, 36px)",
            lineHeight: 1.22,
            color: "rgba(255,248,230,.95)",
          }}
        >
          Evaluate an interface
        </div>
      
        <div
          style={{
            margin: "8px auto 0",
            maxWidth: 700,
            fontFamily: "'EB Garamond', serif",
            fontSize: "clamp(16px, 1.1vw, 18px)",
            lineHeight: 1.55,
            color: "rgba(245,235,210,.62)",
          }}
        >
          Use these questions to inspect whether an AI experience preserves
          behavioral clarity and human authority. Apply these questions to any AI
          feature, workflow, or decision touchpoint.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 330px",
          gap: 24,
          alignItems: "start",
        }}
      >
        <section
          style={{
            border: "1px solid rgba(245,235,210,.10)",
            background:
              "linear-gradient(180deg, rgba(8,11,18,.80), rgba(4,7,12,.72))",
            backdropFilter: "blur(14px)",
          }}
        >
          {BEHAVIORAL_STAGES.map((stage, index) => {
            const color = STAGE_COLORS[stage.id];
            const open = openStage === stage.id;

            return (
              <div
                key={stage.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "38px 48px 170px minmax(0,1fr) 112px",
                  gap: 12,
                  alignItems: "center",
                  minHeight: 92,
                  padding: "14px 16px",
                  borderTop:
                    index === 0
                      ? "none"
                      : "1px solid rgba(245,235,210,.07)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 15,
                    color,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    border: `1px solid ${color}55`,
                    background: `${color}0C`,
                    boxShadow: `0 0 22px ${color}14`,
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: color,
                      boxShadow: `0 0 12px ${color}`,
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color,
                    }}
                  >
                    {stage.title}
                  </div>
                  <div
                    style={{
                      marginTop: 5,
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 14.5,
                      lineHeight: 1.35,
                      color: "rgba(245,235,210,.54)",
                    }}
                  >
                    {stage.id === "interpret" && "Context appears before suggestion."}
                    {stage.id === "separate" && "Observation and inference remain distinct."}
                    {stage.id === "frame" && "Alternatives and trade-offs are visible."}
                    {stage.id === "recommend" && "Recommendation follows reasoning."}
                    {stage.id === "confirm" && "Consequential choice returns to the human."}
                    {stage.id === "act" && "Action follows confirmed authority."}
                  </div>
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                  {EXPLORE_QUESTIONS[stage.id].map((question) => (
                    <label
                      key={question}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "18px 1fr",
                        gap: 9,
                        alignItems: "start",
                        fontFamily: "'EB Garamond', serif",
                        fontSize: 14.5,
                        lineHeight: 1.35,
                        color: "rgba(245,235,210,.72)",
                      }}
                    >
                      <input
                        type="checkbox"
                        style={{
                          margin: 0,
                          width: 16,
                          height: 16,
                          accentColor: color,
                        }}
                      />
                      <span>{question}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setOpenStage(open ? null : stage.id)}
                    style={{
                      width: "100%",
                      minHeight: 38,
                      border: `1px solid ${color}65`,
                      background: open ? `${color}0E` : "rgba(3,4,9,.16)",
                      color,
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    {open ? "Close notes" : "Add notes"}
                  </button>
                </div>

                {open && (
                  <div
                    style={{
                      gridColumn: "4 / 6",
                      marginTop: -2,
                    }}
                  >
                    <textarea
                      value={notes[stage.id] ?? ""}
                      onChange={(event) =>
                        setNotes((current) => ({
                          ...current,
                          [stage.id]: event.target.value,
                        }))
                      }
                      placeholder="Capture observations, screenshots, or examples…"
                      style={{
                        width: "100%",
                        minHeight: 86,
                        boxSizing: "border-box",
                        resize: "vertical",
                        padding: 12,
                        border: `1px solid ${color}3A`,
                        background: "rgba(3,5,10,.72)",
                        color: "rgba(255,248,230,.82)",
                        fontFamily: "'EB Garamond', serif",
                        fontSize: 14,
                        lineHeight: 1.4,
                        outline: "none",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 18,
              padding: "14px 16px",
              borderTop: "1px solid rgba(245,235,210,.08)",
            }}
          >
            <button
              type="button"
              onClick={exportChecklist}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                minHeight: 42,
                padding: "0 14px",
                border: "1px solid rgba(245,235,210,.12)",
                background: "rgba(3,4,9,.16)",
                color: "rgba(245,235,210,.78)",
                fontFamily: "'EB Garamond', serif",
                fontSize: 14.5,
                cursor: "pointer",
              }}
            >
              <span style={{ color: "rgba(220,174,77,.90)" }}>⇩</span>
              Export checklist
            </button>

            <button
              type="button"
              onClick={reset}
              style={{
                minHeight: 42,
                padding: "0 14px",
                border: "1px solid rgba(245,235,210,.12)",
                background: "transparent",
                color: "rgba(245,235,210,.62)",
                fontFamily: "'EB Garamond', serif",
                fontSize: 14.5,
                cursor: "pointer",
              }}
            >
              ↻ &nbsp; Start a new evaluation
            </button>
          </div>
        </section>

        <aside
          style={{
            padding: "22px 20px",
            border: "1px solid rgba(245,235,210,.10)",
            background:
              "linear-gradient(180deg, rgba(8,11,18,.86), rgba(4,7,12,.74))",
            backdropFilter: "blur(14px)",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "rgba(213,173,75,.74)",
            }}
          >
            How to use this
          </div>

          <div style={{ display: "grid", gap: 20, marginTop: 18 }}>
            {[
              ["Choose an interface", "Select the AI feature, workflow, or decision point you want to evaluate."],
              ["Work through the six stages", "Use the questions to assess how the system handles each behavioral decision."],
              ["Add notes and evidence", "Capture observations, screenshots, or examples for each stage."],
              ["Identify strengths and gaps", "Look for patterns that protect or erode human authority."],
            ].map(([title, body], index) => (
              <div
                key={title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr",
                  gap: 12,
                  alignItems: "start",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid rgba(140,185,220,.22)",
                    color: index === 3
                      ? "rgba(113,196,118,.82)"
                      : index === 2
                        ? "rgba(220,174,77,.86)"
                        : index === 1
                          ? "rgba(178,141,227,.86)"
                          : "rgba(119,190,235,.88)",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                  }}
                >
                  {index === 0 ? "✦" : index === 1 ? "⌕" : index === 2 ? "▧" : "✓"}
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 16,
                      color: "rgba(255,248,230,.86)",
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      marginTop: 3,
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 14,
                      lineHeight: 1.4,
                      color: "rgba(245,235,210,.52)",
                    }}
                  >
                    {body}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 24,
              paddingTop: 18,
              borderTop: "1px solid rgba(245,235,210,.09)",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 8.5,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "rgba(213,173,75,.72)",
              }}
            >
              Why it matters
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "'EB Garamond', serif",
                fontSize: 14.5,
                lineHeight: 1.45,
                color: "rgba(245,235,210,.58)",
              }}
            >
              These six decisions shape whether users stay in control, understand
              what is happening, and can act with confidence.
            </div>
          </div>

          <div
            style={{
              marginTop: 20,
              paddingTop: 18,
              borderTop: "1px solid rgba(245,235,210,.09)",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 8.5,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "rgba(213,173,75,.72)",
              }}
            >
              Sovereign principle
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "'EB Garamond', serif",
                fontSize: 14.5,
                lineHeight: 1.45,
                color: "rgba(245,235,210,.58)",
              }}
            >
              Authority is earned through clarity, separation, and explicit human consent.
            </div>
          </div>
        </aside>
      </div>

      <div
        style={{
          marginTop: 26,
          display: "flex",
          justifyContent: "center",
          gap: 18,
          alignItems: "center",
          fontFamily: "'EB Garamond', serif",
          fontSize: 14,
          color: "rgba(245,235,210,.40)",
        }}
      >
        <span style={{ color: "rgba(220,174,77,.92)" }}>✦</span>
        <span style={{ color: "rgba(245,235,210,.68)" }}>
          Designing the sequence changes the experience.
        </span>
        <span style={{ opacity: 0.35 }}>|</span>
        <span>Better interfaces begin where behavior is made visible.</span>
      </div>
    </motion.div>
  );
}
