import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import { resolveStellarColor } from "../../../atlas/constellation/stellarPalette";

import AppliedBehaviorCanvas from "./AppliedBehaviorCanvas";
import ExploreBehaviorCanvas from "./ExploreBehaviorCanvas";
import ProgressiveBehaviorCanvas from "./ProgressiveBehaviorCanvas";

import behavioralFrameworkSpaceBg from "../shared/assets/behavioral-framework-space-bg.png";

import {
  BEHAVIORAL_STAGES,
  type BehavioralStageId,
} from "./behavioralDecisionDesignData";

interface BehavioralDecisionDesignExperienceProps {
  systemColor: string;
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

const FRAMEWORK_NAME = "Behavioral & Decision Design";

export default function BehavioralDecisionDesignExperience({
  systemColor,
  onExit,
}: BehavioralDecisionDesignExperienceProps) {
  const reducedMotion = useReducedMotion();

  const [revealedCount, setRevealedCount] = useState(1);
  const [activeStageId, setActiveStageId] =
    useState<BehavioralStageId>("interpret");
  const [mode, setMode] = useState<ExperienceMode>("learn");

  const moduleColor = resolveStellarColor("agentic", systemColor);

  const resolveColor = useMemo(
    () =>
      (
        role: (typeof BEHAVIORAL_STAGES)[number]["colorRole"],
      ) =>
        resolveStellarColor(role, systemColor),
    [systemColor],
  );

  const complete =
    revealedCount >= BEHAVIORAL_STAGES.length;

  const handleAdvance = () => {
    if (complete) return;

    const nextCount = Math.min(
      BEHAVIORAL_STAGES.length,
      revealedCount + 1,
    );

    setRevealedCount(nextCount);
    setActiveStageId(
      BEHAVIORAL_STAGES[nextCount - 1].id,
    );
  };

  const handleRevealAll = () => {
    setRevealedCount(BEHAVIORAL_STAGES.length);
  };

  const handleApply = () => {
    setMode("apply");
  };

  return (
    <motion.section
      role="dialog"
      aria-modal="true"
      aria-labelledby="behavioral-design-title"
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
        moduleColor={moduleColor}
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
              revealedCount={revealedCount}
              activeStageId={activeStageId}
              resolveColor={resolveColor}
              onCommitStage={setActiveStageId}
              onAdvance={handleAdvance}
              onRevealAll={handleRevealAll}
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
  moduleColor: string;
  onExit: () => void;
  onModeChange: (mode: ExperienceMode) => void;
}

function ExperienceHeader({
  mode,
  moduleColor,
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
            color: moduleColor,
            marginRight: 9,
          }}
        >
          ←
        </span>
        Behavior &amp; Authority
      </button>

      <div style={styles.headerTitle}>
        <div
          id="behavioral-design-title"
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
                  ? `1px solid ${moduleColor}55`
                  : "1px solid transparent",
                background: active
                  ? `${moduleColor}0B`
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
  revealedCount: number;
  activeStageId: BehavioralStageId;
  resolveColor: (
    role: (typeof BEHAVIORAL_STAGES)[number]["colorRole"],
  ) => string;
  onCommitStage: (stageId: BehavioralStageId) => void;
  onAdvance: () => void;
  onRevealAll: () => void;
  onApply: () => void;
}

function LearnMode({
  revealedCount,
  activeStageId,
  resolveColor,
  onCommitStage,
  onAdvance,
  onRevealAll,
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
          Complex systems reveal themselves at the
          pace understanding is formed.
        </h1>

        <p style={styles.learnSubcopy}>
          Begin with one point of attention. Commit
          when it makes sense. The next relationship
          appears only after context exists.
        </p>
      </section>

      <ProgressiveBehaviorCanvas
        stages={BEHAVIORAL_STAGES}
        revealedCount={revealedCount}
        activeStageId={activeStageId}
        onCommitStage={onCommitStage}
        onAdvance={onAdvance}
        onRevealAll={onRevealAll}
        onApply={onApply}
        resolveColor={resolveColor}
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
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={getModeTransition(reducedMotion)}
    >
      <section style={styles.modeIntroduction}>
        <h2 style={styles.modeHeadline}>
          See what changes when the framework is
          applied.
        </h2>

        <p style={styles.modeSubcopy}>
          Same scenario. Same recommendation engine.
          Different behavioral design.
        </p>
      </section>

      <AppliedBehaviorCanvas />
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
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={getModeTransition(reducedMotion)}
    >
      <ExploreBehaviorCanvas />
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
    textShadow: "0 2px 18px rgba(0,0,0,.34)",
  },
  learnSubcopy: {
    margin: "12px 0 0",
    fontFamily: "'EB Garamond',serif",
    fontSize: "clamp(16.5px, 1.1vw, 18px)",
    lineHeight: 1.55,
    color: "rgba(245,235,210,.64)",
  },
  modeIntroduction: {
    maxWidth: 800,
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
