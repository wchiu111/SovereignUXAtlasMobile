import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  CONSTRAINT_SCOPE_STAGES,
  type ConstraintScopeStageId,
} from "./constraintScopeDesignData";

type Variant = "without" | "with";

const VARIANTS: Array<{ id: Variant; label: string }> = [
  { id: "without", label: "Without framework" },
  { id: "with", label: "With framework" },
];

const QUESTION = "Is this procedure covered by my health plan?";

export default function ConstraintScopeApplyCanvas() {
  const reducedMotion = useReducedMotion();
  const [variant, setVariant] = useState<Variant>("without");
  const [focusId, setFocusId] =
    useState<ConstraintScopeStageId | null>(null);

  return (
    <div style={styles.canvas}>
      <VariantToggle variant={variant} onChange={setVariant} />

      <div style={styles.contentGrid}>
        <motion.section
          key={variant}
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 8 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0.16 : 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={styles.interfacePanel}
        >
          {variant === "without" ? (
            <WithoutFramework />
          ) : (
            <WithFramework focusId={focusId} />
          )}
        </motion.section>

        <FrameworkPanel
          active={variant === "with"}
          focusId={focusId}
          onFocusChange={setFocusId}
        />
      </div>
    </div>
  );
}

function VariantToggle({
  variant,
  onChange,
}: {
  variant: Variant;
  onChange: (variant: Variant) => void;
}) {
  return (
    <div style={styles.toggleWrapper}>
      <div style={styles.toggle}>
        {VARIANTS.map(({ id, label }) => {
          const active = variant === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={active}
              style={{
                ...styles.toggleButton,
                borderRight:
                  id === "without"
                    ? "1px solid rgba(245,235,210,.10)"
                    : 0,
                background: active
                  ? "rgba(221,184,90,.07)"
                  : "transparent",
                color: active
                  ? "rgba(255,248,230,.94)"
                  : "rgba(245,235,210,.46)",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FrameworkPanel({
  active,
  focusId,
  onFocusChange,
}: {
  active: boolean;
  focusId: ConstraintScopeStageId | null;
  onFocusChange: (id: ConstraintScopeStageId | null) => void;
}) {
  return (
    <aside
      style={{
        ...styles.frameworkPanel,
        opacity: active ? 1 : 0.2,
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <div style={styles.frameworkPanelTitle}>What changed?</div>

      <div style={styles.stageList}>
        {CONSTRAINT_SCOPE_STAGES.map((stage, index) => {
          const focused = focusId === stage.id;

          return (
            <button
              key={stage.id}
              type="button"
              onMouseEnter={() => onFocusChange(stage.id)}
              onMouseLeave={() => onFocusChange(null)}
              onFocus={() => onFocusChange(stage.id)}
              onBlur={() => onFocusChange(null)}
              onClick={() =>
                onFocusChange(focused ? null : stage.id)
              }
              style={{
                ...styles.stageButton,
                background: focused
                  ? `${stage.color}08`
                  : "transparent",
              }}
            >
              <span
                style={{
                  ...styles.stageNumber,
                  color: stage.color,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span style={styles.stageName}>{stage.title}</span>

              <span
                style={{
                  ...styles.stageSummary,
                  maxHeight: focused ? 56 : 0,
                  marginTop: focused ? 6 : 0,
                  opacity: focused ? 1 : 0,
                }}
              >
                {stage.summary}
              </span>
            </button>
          );
        })}
      </div>

      <div style={styles.frameworkPanelFooter}>
        Hover a principle to see how it changes this interface.
      </div>
    </aside>
  );
}

function WithoutFramework() {
  return (
    <>
      <InterfaceHeader />

      <div style={styles.questionBlock}>
        <div style={styles.eyebrow}>You asked</div>
        <div style={styles.userQuestion}>{QUESTION}</div>
      </div>

      <section style={styles.resultSection}>
        <div style={styles.sectionLabel}>Coverage result</div>

        <h3 style={styles.resultValue}>
          Yes, this procedure is covered.
        </h3>

        <p style={styles.resultCopy}>
          Based on your current plan benefits.
        </p>

        <div style={styles.inlineMeta}>
          <span>In-network benefit</span>
          <span aria-hidden="true">·</span>
          <span>Specialist referral may apply</span>
        </div>
      </section>

      <button
        type="button"
        style={{
          ...styles.primaryAction,
          marginTop: 24,
        }}
      >
        Continue to authorization →
      </button>

      <button
        type="button"
        style={{
          ...styles.secondaryAction,
          marginTop: 10,
        }}
      >
        View coverage details
      </button>

      <div style={styles.footnote}>
        Final coverage may still depend on coding, network status, and prior
        authorization requirements.
      </div>
    </>
  );
}

function WithFramework({
  focusId,
}: {
  focusId: ConstraintScopeStageId | null;
}) {
  const visible = (ids: ConstraintScopeStageId[]) =>
    focusId === null || ids.includes(focusId);

  return (
    <>
      <InterfaceHeader />

      <div style={styles.questionBlock}>
        <div style={styles.eyebrow}>You asked</div>
        <div style={styles.userQuestion}>{QUESTION}</div>
      </div>

      <FocusSection
        dim={!visible(["capability", "boundary", "disclosure"])}
      >
        <div
          style={{
            ...styles.resultQualified,
            borderColor: "rgba(221,184,90,.42)",
          }}
        >
          <div style={styles.sectionLabel}>Coverage result</div>

          <h3
            style={{
              ...styles.resultValue,
              color: "#E2BE62",
            }}
          >
            Likely covered under your plan
          </h3>

          <p style={styles.boundaryCopy}>
            This is guidance, not a final coverage determination.
          </p>
        </div>
      </FocusSection>

      <FocusSection dim={!visible(["capability", "disclosure"])}>
        <EvidenceSection
          label="What I can verify"
          color="#79C98E"
          icon="✓"
          items={[
            "This category of service appears in your plan benefits.",
            "Your current plan is active.",
          ]}
        />
      </FocusSection>

      <FocusSection
        dim={!visible(["boundary", "limitation", "non-action"])}
      >
        <EvidenceSection
          label="Still needs verification"
          color="#D98A42"
          icon="◇"
          columns
          items={[
            "Final procedure code",
            "Provider network status",
            "Prior authorization requirements",
            "Eligibility at time of service",
          ]}
        />
      </FocusSection>

      <FocusSection
        dim={!visible(["escalation", "handoff", "non-action"])}
      >
        <div style={styles.handoff}>
          <div
            style={{
              ...styles.sectionLabel,
              color: "#B99AE5",
            }}
          >
            Next step
          </div>

          <p style={styles.handoffCopy}>
            A benefits specialist can confirm final coverage. Your plan
            details and this request will be included automatically.
          </p>

          <button
            type="button"
            style={styles.handoffAction}
          >
            Review with specialist →
          </button>
        </div>
      </FocusSection>
    </>
  );
}

function EvidenceSection({
  label,
  color,
  icon,
  items,
  columns = false,
}: {
  label: string;
  color: string;
  icon: string;
  items: string[];
  columns?: boolean;
}) {
  return (
    <section style={styles.evidenceSection}>
      <div
        style={{
          ...styles.sectionLabel,
          color,
        }}
      >
        {label}
      </div>

      <div
        style={{
          ...styles.evidenceList,
          gridTemplateColumns: columns
            ? "repeat(2,minmax(0,1fr))"
            : "1fr",
        }}
      >
        {items.map((item) => (
          <div key={item} style={styles.evidenceRow}>
            <span
              aria-hidden="true"
              style={{
                ...styles.evidenceIcon,
                color,
              }}
            >
              {icon}
            </span>

            <span style={styles.evidenceCopy}>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FocusSection({
  dim,
  children,
}: {
  dim: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        opacity: dim ? 0.18 : 1,
        transition: "opacity .28s ease",
      }}
    >
      {children}
    </section>
  );
}

function InterfaceHeader() {
  return (
    <header style={styles.interfaceHeader}>
      <div style={styles.interfaceIdentity}>
        <div style={styles.assistantIcon}>✦</div>

        <div>
          <div style={styles.productName}>Benefits Assistant</div>
          <div style={styles.productSubtitle}>Coverage guidance</div>
        </div>
      </div>

      <div style={styles.planLabel}>PPO Gold</div>
    </header>
  );
}

const styles = {
  canvas: {
    width: "min(1120px,100%)",
    margin: "0 auto",
  },
  toggleWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 22,
  },
  toggle: {
    display: "inline-flex",
    border: "1px solid rgba(245,235,210,.10)",
  },
  toggleButton: {
    minWidth: 158,
    minHeight: 46,
    padding: "0 16px",
    border: 0,
    fontFamily: "'DM Mono',monospace",
    fontSize: 9,
    letterSpacing: ".13em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) 280px",
    gap: 26,
    alignItems: "start",
  },
  interfacePanel: {
    padding: "28px 30px 30px",
    border: "1px solid rgba(245,235,210,.12)",
    background:
      "linear-gradient(180deg,rgba(8,11,18,.94),rgba(4,7,12,.90))",
    backdropFilter: "blur(14px)",
  },
  interfaceHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingBottom: 20,
    marginBottom: 24,
    borderBottom: "1px solid rgba(245,235,210,.09)",
  },
  interfaceIdentity: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  assistantIcon: {
    width: 32,
    height: 32,
    display: "grid",
    placeItems: "center",
    borderRadius: 6,
    background: "#DDB85A",
    color: "#090805",
  },
  productName: {
    fontFamily: "'EB Garamond',serif",
    fontSize: 17,
    lineHeight: 1.2,
    color: "rgba(255,248,230,.94)",
  },
  productSubtitle: {
    marginTop: 2,
    fontFamily: "'EB Garamond',serif",
    fontSize: 13.5,
    color: "rgba(245,235,210,.48)",
  },
  planLabel: {
    fontFamily: "'DM Mono',monospace",
    fontSize: 9,
    letterSpacing: ".13em",
    textTransform: "uppercase" as const,
    color: "rgba(221,184,90,.82)",
  },
  questionBlock: {
    paddingBottom: 24,
    borderBottom: "1px solid rgba(245,235,210,.08)",
  },
  eyebrow: {
    fontFamily: "'DM Mono',monospace",
    fontSize: 8.5,
    letterSpacing: ".15em",
    textTransform: "uppercase" as const,
    color: "rgba(221,184,90,.72)",
  },
  userQuestion: {
    marginTop: 9,
    fontFamily: "'EB Garamond',serif",
    fontSize: 21,
    lineHeight: 1.35,
    color: "rgba(255,248,230,.90)",
  },
  resultSection: {
    marginTop: 26,
  },
  resultQualified: {
    marginTop: 26,
    padding: "18px 20px",
    border: "1px solid rgba(221,184,90,.42)",
    background:
      "linear-gradient(180deg,rgba(221,184,90,.065),rgba(9,13,20,.42))",
  },
  sectionLabel: {
    fontFamily: "'DM Mono',monospace",
    fontSize: 8.5,
    letterSpacing: ".15em",
    textTransform: "uppercase" as const,
    color: "rgba(221,184,90,.68)",
  },
  resultValue: {
    margin: "12px 0 0",
    fontFamily: "'EB Garamond',serif",
    fontSize: 30,
    lineHeight: 1.15,
    fontWeight: 500,
    color: "rgba(255,248,230,.96)",
  },
  resultCopy: {
    margin: "7px 0 0",
    fontFamily: "'EB Garamond',serif",
    fontSize: 15,
    lineHeight: 1.45,
    color: "rgba(245,235,210,.64)",
  },
  boundaryCopy: {
    margin: "7px 0 0",
    fontFamily: "'EB Garamond',serif",
    fontSize: 14.5,
    lineHeight: 1.45,
    color: "rgba(221,184,90,.80)",
  },
  inlineMeta: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 10,
    marginTop: 18,
    fontFamily: "'EB Garamond',serif",
    fontSize: 13.5,
    color: "rgba(245,235,210,.48)",
  },
  primaryAction: {
    width: "100%",
    minHeight: 52,
    border: 0,
    background: "#DDB85A",
    color: "#090805",
    fontFamily: "'EB Garamond',serif",
    fontSize: 16,
    cursor: "pointer",
  },
  secondaryAction: {
    width: "100%",
    minHeight: 46,
    border: "1px solid rgba(245,235,210,.14)",
    background: "transparent",
    color: "rgba(245,235,210,.82)",
    fontFamily: "'EB Garamond',serif",
    fontSize: 15,
    cursor: "pointer",
  },
  footnote: {
    marginTop: 34,
    paddingTop: 18,
    borderTop: "1px solid rgba(245,235,210,.08)",
    fontFamily: "'EB Garamond',serif",
    fontSize: 13.5,
    lineHeight: 1.45,
    color: "rgba(245,235,210,.38)",
  },
  evidenceSection: {
    marginTop: 24,
  },
  evidenceList: {
    display: "grid",
    columnGap: 26,
    rowGap: 10,
    marginTop: 12,
  },
  evidenceRow: {
    display: "grid",
    gridTemplateColumns: "22px minmax(0,1fr)",
    gap: 8,
    alignItems: "start",
  },
  evidenceIcon: {
    paddingTop: 1,
    fontFamily: "'DM Mono',monospace",
    fontSize: 13,
  },
  evidenceCopy: {
    fontFamily: "'EB Garamond',serif",
    fontSize: 15,
    lineHeight: 1.42,
    color: "rgba(245,235,210,.68)",
  },
  handoff: {
    marginTop: 26,
    paddingTop: 22,
    borderTop: "1px solid rgba(245,235,210,.09)",
  },
  handoffCopy: {
    maxWidth: 600,
    margin: "8px 0 0",
    fontFamily: "'EB Garamond',serif",
    fontSize: 15,
    lineHeight: 1.5,
    color: "rgba(245,235,210,.70)",
  },
  handoffAction: {
    width: "100%",
    minHeight: 48,
    marginTop: 16,
    border: "1px solid rgba(185,154,229,.44)",
    background: "rgba(185,154,229,.025)",
    color: "#C8A8EE",
    fontFamily: "'EB Garamond',serif",
    fontSize: 15.5,
    cursor: "pointer",
  },
  frameworkPanel: {
    padding: "20px 18px",
    border: "1px solid rgba(245,235,210,.10)",
    background: "rgba(4,7,12,.76)",
    transition: "opacity .35s cubic-bezier(.16,1,.3,1)",
  },
  frameworkPanelTitle: {
    paddingBottom: 14,
    marginBottom: 6,
    borderBottom: "1px solid rgba(245,235,210,.08)",
    fontFamily: "'DM Mono',monospace",
    fontSize: 8,
    letterSpacing: ".16em",
    textTransform: "uppercase" as const,
    color: "rgba(200,180,130,.66)",
  },
  stageList: {
    display: "grid",
  },
  stageButton: {
    display: "grid",
    gridTemplateColumns: "32px minmax(0,1fr)",
    columnGap: 10,
    minHeight: 48,
    padding: "10px 6px",
    border: 0,
    background: "transparent",
    color: "inherit",
    textAlign: "left" as const,
    cursor: "pointer",
  },
  stageNumber: {
    fontFamily: "'DM Mono',monospace",
    fontSize: 8.5,
    letterSpacing: ".10em",
  },
  stageName: {
    fontFamily: "'DM Mono',monospace",
    fontSize: 8.5,
    letterSpacing: ".10em",
    textTransform: "uppercase" as const,
    color: "rgba(245,235,210,.78)",
  },
  stageSummary: {
    gridColumn: "2",
    overflow: "hidden",
    fontFamily: "'EB Garamond',serif",
    fontSize: 13.5,
    lineHeight: 1.38,
    color: "rgba(245,235,210,.58)",
    transition:
      "opacity .22s ease,max-height .22s ease,margin-top .22s ease",
  },
  frameworkPanelFooter: {
    marginTop: 12,
    paddingTop: 14,
    borderTop: "1px solid rgba(245,235,210,.08)",
    fontFamily: "'EB Garamond',serif",
    fontSize: 13,
    lineHeight: 1.45,
    color: "rgba(245,235,210,.38)",
  },
};
