import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import CoSovereigntyApplyCanvas from "./CoSovereigntyApplyCanvas";
import CoSovereigntyEvaluateCanvas from "./CoSovereigntyEvaluateCanvas";
import CoSovereigntyLearnCanvas from "./CoSovereigntyLearnCanvas";

import behavioralFrameworkSpaceBg from "../shared/assets/behavioral-framework-space-bg.png";

import {
  CO_SOVEREIGNTY_STAGES,
  type CoSovereigntyStageId,
} from "./coSovereigntyData";

interface MultiUserCoSovereigntyExperienceProps {
  color: string;
  onExit: () => void;
}

type ExperienceMode = "learn" | "apply" | "evaluate";

const EXPERIENCE_MODES: Array<{
  id: ExperienceMode;
  label: string;
}> = [
  { id: "learn", label: "Learn" },
  { id: "apply", label: "Apply" },
  { id: "evaluate", label: "Evaluate" },
];

const FRAMEWORK_NAME = "Multi-User & Co-Sovereignty";

export default function MultiUserCoSovereigntyExperience({
  color,
  onExit,
}: MultiUserCoSovereigntyExperienceProps) {
  const reducedMotion = useReducedMotion();

  const [mode, setMode] =
    useState<ExperienceMode>("learn");

  const [activeStageId, setActiveStageId] =
    useState<CoSovereigntyStageId>("roles");

  const handleApply = () => {
    setMode("apply");
  };

  return (
    <motion.section
      role="dialog"
      aria-modal="true"
      aria-labelledby="co-sovereignty-title"
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.996 }
      }
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.998 }
      }
      transition={{
        duration: reducedMotion ? 0.18 : 0.56,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={styles.shell}
    >
      <Background />

      <ExperienceHeader
        mode={mode}
        color={color}
        onExit={onExit}
        onModeChange={setMode}
      />

      <main
        style={{
          ...styles.main,
          overflow:
            mode === "learn" ? "visible" : "auto",
          padding:
            mode === "learn"
              ? "22px 28px 0"
              : "22px 28px 44px",
        }}
      >
        <AnimatePresence mode="wait">
          {mode === "learn" && (
            <LearnMode
              color={color}
              activeStageId={activeStageId}
              onCommitStage={setActiveStageId}
              onApply={handleApply}
            />
          )}

          {mode === "apply" && (
            <ApplyMode reducedMotion={reducedMotion} />
          )}

          {mode === "evaluate" && (
            <EvaluateMode reducedMotion={reducedMotion} />
          )}
        </AnimatePresence>
      </main>
    </motion.section>
  );
}

function Background() {
  return (
    <>
      <div
        aria-hidden="true"
        style={styles.backgroundImage}
      />

      <div
        aria-hidden="true"
        style={styles.backgroundOverlay}
      />
    </>
  );
}

interface ExperienceHeaderProps {
  mode: ExperienceMode;
  color: string;
  onExit: () => void;
  onModeChange: (mode: ExperienceMode) => void;
}

function ExperienceHeader({
  mode,
  color,
  onExit,
  onModeChange,
}: ExperienceHeaderProps) {
  return (
    <header style={styles.header}>
      <button
        type="button"
        onClick={onExit}
        style={styles.backButton}
      >
        <span
          style={{
            color,
            marginRight: 9,
          }}
        >
          ←
        </span>

        Behavior &amp; Authority
      </button>

      <div style={styles.headerTitle}>
        <div
          id="co-sovereignty-title"
          style={styles.frameworkName}
        >
          {FRAMEWORK_NAME}
        </div>
      </div>

      <nav
        aria-label="Framework experience modes"
        style={styles.modeNavigation}
      >
        {EXPERIENCE_MODES.map(({ id, label }) => {
          const active = mode === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onModeChange(id)}
              aria-pressed={active}
              style={{
                ...styles.modeButton,
                border: active
                  ? `1px solid ${color}55`
                  : "1px solid transparent",
                background: active
                  ? `${color}0B`
                  : "transparent",
                color: active
                  ? "rgba(245,235,210,.90)"
                  : "rgba(245,235,210,.50)",
              }}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

interface LearnModeProps {
  color: string;
  activeStageId: CoSovereigntyStageId;
  onCommitStage: (stageId: CoSovereigntyStageId) => void;
  onApply: () => void;
}

function LearnMode({
  color,
  activeStageId,
  onCommitStage,
  onApply,
}: LearnModeProps) {
  return (
    <motion.div
      key="learn"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.learnMode}
    >
      <section style={styles.learnIntroduction}>
        <h1 style={styles.learnHeadline}>
          Shared systems become clearer when
          authority is made visible.
        </h1>

        <p style={styles.learnSubcopy}>
          Begin with who is involved.
          Understand what each person needs and
          may decide. Resolve only after those
          relationships are visible.
        </p>
      </section>

      <CoSovereigntyLearnCanvas
        stages={CO_SOVEREIGNTY_STAGES}
        activeStageId={activeStageId}
        onCommitStage={onCommitStage}
        onApply={onApply}
        moduleColor={color}
      />
    </motion.div>
  );
}

function ApplyMode({
  reducedMotion,
}: {
  reducedMotion: boolean | null;
}) {
  return (
    <motion.div
      key="apply"
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 8 }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{ opacity: 0 }}
      transition={getModeTransition(reducedMotion)}
    >
      <section style={styles.modeIntroduction}>
        <h2 style={styles.modeHeadline}>
          See what changes when shared
          authority is designed.
        </h2>

        <p style={styles.modeSubcopy}>
          Same people. Same scheduling
          problem. Different treatment of
          needs and decision rights.
        </p>
      </section>

      <CoSovereigntyApplyCanvas />
    </motion.div>
  );
}

function EvaluateMode({
  reducedMotion,
}: {
  reducedMotion: boolean | null;
}) {
  return (
    <motion.div
      key="evaluate"
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 8 }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{ opacity: 0 }}
      transition={getModeTransition(reducedMotion)}
    >
      <CoSovereigntyEvaluateCanvas />
    </motion.div>
  );
}

function getModeTransition(
  reducedMotion: boolean | null,
) {
  return {
    duration: reducedMotion ? 0.16 : 0.5,
    ease: [0.16, 1, 0.3, 1] as [
      number,
      number,
      number,
      number,
    ],
  };
}

const styles = {
  shell: {
    position: "absolute",
    inset: 0,
    zIndex: 64,
    display: "grid",
    gridTemplateRows: "64px minmax(0,1fr)",
    overflow: "hidden",
    color: "#F4EBD0",
    background: "#030409",
  },
  backgroundImage: {
    position: "absolute",
    inset: "-7%",
    zIndex: 0,
    pointerEvents: "none",
    backgroundImage: `url(${behavioralFrameworkSpaceBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    transform: "scale(1.03)",
    filter:
      "saturate(.78) brightness(.62) contrast(1.04)",
  },
  backgroundOverlay: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    pointerEvents: "none",
    background:
      "radial-gradient(circle at 48% 46%, rgba(3,4,9,.04) 0%, rgba(3,4,9,.18) 46%, rgba(3,4,9,.42) 100%), linear-gradient(180deg, rgba(3,4,9,.08), rgba(3,4,9,.30))",
  },
  header: {
    position: "relative",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    padding: "0 24px",
    borderBottom:
      "1px solid rgba(245,235,210,.08)",
    background: "rgba(3,4,9,.20)",
    backdropFilter: "blur(6px)",
  },
  backButton: {
    minHeight: 44,
    padding: "0 10px 0 0",
    border: 0,
    background: "transparent",
    color: "rgba(200,180,130,.78)",
    fontFamily: "'DM Mono',monospace",
    fontSize: 9.5,
    letterSpacing: ".14em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
  },
  headerTitle: {
    minWidth: 0,
    textAlign: "center" as const,
  },
  frameworkName: {
    marginTop: 0,
    fontFamily: "'EB Garamond',serif",
    fontSize: 21,
    color: "rgba(255,248,230,.94)",
  },
  modeNavigation: {
    display: "flex",
    gap: 6,
  },
  modeButton: {
    minHeight: 42,
    padding: "0 12px",
    fontFamily: "'DM Mono',monospace",
    fontSize: 9,
    letterSpacing: ".115em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
  },
  main: {
    position: "relative",
    zIndex: 2,
    minWidth: 0,
    minHeight: "calc(100dvh - 64px)",
    scrollbarWidth: "none" as const,
  },
  learnMode: {
    position: "relative",
    minHeight: "calc(100dvh - 86px)",
    overflow: "visible",
  },
  learnIntroduction: {
    maxWidth: 1120,
    margin: "12px auto 0",
    padding: "0 24px",
    textAlign: "center" as const,
  },
  learnHeadline: {
    margin: 0,
    fontFamily: "'EB Garamond',serif",
    fontSize: "clamp(30px, 2.2vw, 36px)",
    lineHeight: 1.28,
    fontWeight: 500,
    color: "rgba(255,248,230,.95)",
    textShadow:
      "0 2px 18px rgba(0,0,0,.34)",
  },
  learnSubcopy: {
    margin: "12px 0 0",
    fontFamily: "'EB Garamond',serif",
    fontSize: "clamp(16.5px, 1.1vw, 18px)",
    lineHeight: 1.55,
    color: "rgba(245,235,210,.64)",
  },
  modeIntroduction: {
    maxWidth: 820,
    margin: "12px auto 24px",
    textAlign: "center" as const,
  },
  modeHeadline: {
    margin: 0,
    fontFamily: "'EB Garamond',serif",
    fontSize: "clamp(27px, 1.8vw, 32px)",
    fontWeight: 500,
    color: "rgba(255,248,230,.92)",
  },
  modeSubcopy: {
    margin: "8px 0 0",
    fontFamily: "'EB Garamond',serif",
    fontSize: "clamp(16px, 1vw, 17.5px)",
    lineHeight: 1.55,
    color: "rgba(245,235,210,.58)",
  },
};
