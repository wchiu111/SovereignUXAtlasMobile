import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import behavioralFrameworkSpaceBg from "./assets/behavioral-framework-space-bg.png";

export type ApplicationKitExperienceMode = "learn" | "apply" | "evaluate";

interface ApplicationKitExperienceShellProps {
  titleId: string;
  frameworkName: string;
  accentColor: string;
  mode: ApplicationKitExperienceMode;
  onExit: () => void;
  onModeChange: (mode: ApplicationKitExperienceMode) => void;
  children: ReactNode;
}

const MODES: Array<{
  id: ApplicationKitExperienceMode;
  label: string;
}> = [
  { id: "learn", label: "Learn" },
  { id: "apply", label: "Apply" },
  { id: "evaluate", label: "Evaluate" },
];

export default function ApplicationKitExperienceShell({
  titleId,
  frameworkName,
  accentColor,
  mode,
  onExit,
  onModeChange,
  children,
}: ApplicationKitExperienceShellProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.996 }
      }
      animate={{ opacity: 1, scale: 1 }}
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
      <div aria-hidden="true" style={styles.backgroundImage} />
      <div aria-hidden="true" style={styles.backgroundOverlay} />

      <header style={styles.header}>
        <button type="button" onClick={onExit} style={styles.backButton}>
          <span style={{ color: accentColor, marginRight: 9 }}>←</span>
          Behavior &amp; Authority
        </button>

        <div style={styles.headerTitle}>
          <div id={titleId} style={styles.frameworkName}>
            {frameworkName}
          </div>
        </div>

        <nav aria-label="Framework experience modes" style={styles.modeNavigation}>
          {MODES.map(({ id, label }) => {
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
                    ? `1px solid ${accentColor}55`
                    : "1px solid transparent",
                  background: active
                    ? `${accentColor}0B`
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

      <main
        style={{
          ...styles.main,
          overflow: mode === "learn" ? "visible" : "auto",
          padding:
            mode === "learn"
              ? "22px 28px 0"
              : "22px 28px 44px",
        }}
      >
        {children}
      </main>
    </motion.section>
  );
}

const styles = {
  shell: {
    position: "absolute" as const,
    inset: 0,
    zIndex: 64,
    display: "grid",
    gridTemplateRows: "64px minmax(0,1fr)",
    overflow: "hidden",
    color: "#F4EBD0",
    background: "#030409",
  },
  backgroundImage: {
    position: "absolute" as const,
    inset: "-7%",
    zIndex: 0,
    pointerEvents: "none" as const,
    backgroundImage: `url(${behavioralFrameworkSpaceBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    transform: "scale(1.03)",
    filter: "saturate(.78) brightness(.62) contrast(1.04)",
  },
  backgroundOverlay: {
    position: "absolute" as const,
    inset: 0,
    zIndex: 1,
    pointerEvents: "none" as const,
    background:
      "radial-gradient(circle at 48% 46%,rgba(3,4,9,.04) 0%,rgba(3,4,9,.18) 46%,rgba(3,4,9,.42) 100%),linear-gradient(180deg,rgba(3,4,9,.08),rgba(3,4,9,.30))",
  },
  header: {
    position: "relative" as const,
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    padding: "0 24px",
    borderBottom: "1px solid rgba(245,235,210,.08)",
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
    position: "relative" as const,
    zIndex: 2,
    minWidth: 0,
    minHeight: "calc(100dvh - 64px)",
    scrollbarWidth: "none" as const,
  },
};
