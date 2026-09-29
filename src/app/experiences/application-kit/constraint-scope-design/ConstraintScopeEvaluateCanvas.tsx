import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  CONSTRAINT_SCOPE_STAGES,
  type ConstraintScopeStageId,
} from "./constraintScopeDesignData";

type NotesState = Partial<Record<ConstraintScopeStageId, string>>;

export default function ConstraintScopeEvaluateCanvas() {
  const reducedMotion = useReducedMotion();

  const [notes, setNotes] = useState<NotesState>({});
  const [openStageId, setOpenStageId] =
    useState<ConstraintScopeStageId | null>(null);

  const exportText = useMemo(() => {
    const lines = [
      "# Constraint & Scope Design — Interface Evaluation",
      "",
      "Use these questions to inspect whether an AI experience makes capability, limitation, escalation, and non-action visible before users rely on it.",
      "",
    ];

    CONSTRAINT_SCOPE_STAGES.forEach((stage, index) => {
      lines.push(
        `## ${String(index + 1).padStart(2, "0")} ${stage.title}`,
      );

      stage.evaluate.forEach((question) => {
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
    const blob = new Blob([exportText], {
      type: "text/markdown;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "constraint-scope-evaluation.md";
    anchor.click();

    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 8 }
      }
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: reducedMotion ? 0.16 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ ...styles.canvas, opacity: 0 }}
    >
      <div style={styles.introduction}>
        <h2 style={styles.headline}>Evaluate system boundaries</h2>

        <p style={styles.subcopy}>
          Use these questions to inspect whether an AI experience makes
          capability, limitation, escalation, and non-action visible before
          users rely on it.
        </p>
      </div>

      <section style={styles.checklist}>
        {CONSTRAINT_SCOPE_STAGES.map((stage, index) => {
          const open = openStageId === stage.id;

          return (
            <div
              key={stage.id}
              style={{
                ...styles.checklistRow,
                borderTop:
                  index === 0
                    ? "none"
                    : "1px solid rgba(245,235,210,.07)",
              }}
            >
              <div
                style={{
                  ...styles.number,
                  color: stage.color,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              <div
                style={{
                  ...styles.stageOrb,
                  border: `1px solid ${stage.color}55`,
                  background: `${stage.color}0C`,
                  boxShadow: `0 0 22px ${stage.color}14`,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: stage.color,
                    boxShadow: `0 0 12px ${stage.color}`,
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    ...styles.stageName,
                    color: stage.color,
                  }}
                >
                  {stage.title}
                </div>

                <div style={styles.stageSummary}>
                  {stage.summary}
                </div>
              </div>

              <div style={styles.questionList}>
                {stage.evaluate.map((question) => (
                  <label key={question} style={styles.question}>
                    <input
                      type="checkbox"
                      style={{
                        ...styles.checkbox,
                        accentColor: stage.color,
                      }}
                    />
                    <span>{question}</span>
                  </label>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setOpenStageId(open ? null : stage.id)
                }
                style={{
                  ...styles.notesButton,
                  border: `1px solid ${stage.color}65`,
                  background: open
                    ? `${stage.color}0E`
                    : "rgba(3,4,9,.16)",
                  color: stage.color,
                }}
              >
                {open ? "Close notes" : "Add notes"}
              </button>

              {open && (
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
                    ...styles.notesField,
                    border: `1px solid ${stage.color}3A`,
                  }}
                />
              )}
            </div>
          );
        })}

        <div style={styles.actions}>
          <button
            type="button"
            onClick={exportChecklist}
            style={styles.actionButton}
          >
            ⇩ &nbsp; Export checklist
          </button>

          <button
            type="button"
            onClick={() => {
              setNotes({});
              setOpenStageId(null);
            }}
            style={styles.actionButton}
          >
            ↻ &nbsp; Start a new evaluation
          </button>
        </div>
      </section>
    </motion.div>
  );
}

const styles = {
  canvas: {
    width: "min(1180px,100%)",
    margin: "0 auto",
  },
  introduction: {
    textAlign: "center" as const,
    marginBottom: 26,
  },
  headline: {
    margin: 0,
    fontFamily: "'EB Garamond',serif",
    fontSize: "clamp(29px,2.1vw,36px)",
    fontWeight: 500,
    color: "rgba(255,248,230,.95)",
  },
  subcopy: {
    maxWidth: 760,
    margin: "8px auto 0",
    fontFamily: "'EB Garamond',serif",
    fontSize: "clamp(16px,1.1vw,18px)",
    lineHeight: 1.55,
    color: "rgba(245,235,210,.62)",
  },
  checklist: {
    border: "1px solid rgba(245,235,210,.10)",
    background:
      "linear-gradient(180deg,rgba(8,11,18,.80),rgba(4,7,12,.72))",
    backdropFilter: "blur(14px)",
  },
  checklistRow: {
    display: "grid",
    gridTemplateColumns: "42px 48px 190px minmax(0,1fr) 112px",
    gap: 12,
    alignItems: "center",
    minHeight: 92,
    padding: "14px 16px",
  },
  number: {
    fontFamily: "'DM Mono',monospace",
    fontSize: 15,
  },
  stageOrb: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
  },
  stageName: {
    fontFamily: "'DM Mono',monospace",
    fontSize: 10,
    letterSpacing: ".12em",
    textTransform: "uppercase" as const,
  },
  stageSummary: {
    marginTop: 5,
    fontFamily: "'EB Garamond',serif",
    fontSize: 14.5,
    lineHeight: 1.35,
    color: "rgba(245,235,210,.54)",
  },
  questionList: {
    display: "grid",
    gap: 8,
  },
  question: {
    display: "grid",
    gridTemplateColumns: "18px 1fr",
    gap: 9,
    alignItems: "start",
    fontFamily: "'EB Garamond',serif",
    fontSize: 14.5,
    lineHeight: 1.35,
    color: "rgba(245,235,210,.72)",
  },
  checkbox: {
    margin: 0,
    width: 16,
    height: 16,
  },
  notesButton: {
    width: "100%",
    minHeight: 38,
    fontFamily: "'EB Garamond',serif",
    fontSize: 14,
    cursor: "pointer",
  },
  notesField: {
    gridColumn: "4 / 6",
    width: "100%",
    minHeight: 84,
    boxSizing: "border-box" as const,
    resize: "vertical" as const,
    padding: 12,
    background: "rgba(3,5,10,.72)",
    color: "rgba(255,248,230,.82)",
    fontFamily: "'EB Garamond',serif",
    fontSize: 14,
    lineHeight: 1.4,
    outline: "none",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    padding: "14px 16px",
    borderTop: "1px solid rgba(245,235,210,.08)",
  },
  actionButton: {
    minHeight: 42,
    padding: "0 14px",
    border: "1px solid rgba(245,235,210,.12)",
    background: "rgba(3,4,9,.16)",
    color: "rgba(245,235,210,.72)",
    fontFamily: "'EB Garamond',serif",
    fontSize: 14.5,
    cursor: "pointer",
  },
};
