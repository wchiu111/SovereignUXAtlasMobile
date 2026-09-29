import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  CO_SOVEREIGNTY_APPLY,
  CO_SOVEREIGNTY_STAGES,
  type CoSovereigntyStageId,
} from "./coSovereigntyData";

type Variant = "without" | "with";

const VARIANTS: Array<{
  id: Variant;
  label: string;
}> = [
  {
    id: "without",
    label: "Without framework",
  },
  {
    id: "with",
    label: "With framework",
  },
];

export default function CoSovereigntyApplyCanvas() {
  const reducedMotion = useReducedMotion();

  const [variant, setVariant] =
    useState<Variant>("without");

  const [focusId, setFocusId] =
    useState<CoSovereigntyStageId | null>(null);

  const frameworkActive =
    variant === "with";

  return (
    <div style={styles.canvas}>
      <VariantToggle
        variant={variant}
        onChange={setVariant}
      />

      <div style={styles.contentGrid}>
        <motion.section
          key={variant}
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 8 }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducedMotion
              ? 0.16
              : 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={styles.interfacePanel}
        >
          {variant === "without" ? (
            <WithoutFramework />
          ) : (
            <WithFramework
              focusId={focusId}
            />
          )}
        </motion.section>

        <FrameworkPanel
          active={frameworkActive}
          focusId={focusId}
          onFocusChange={setFocusId}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Variant toggle                                                             */
/* -------------------------------------------------------------------------- */

interface VariantToggleProps {
  variant: Variant;
  onChange: (variant: Variant) => void;
}

function VariantToggle({
  variant,
  onChange,
}: VariantToggleProps) {
  return (
    <div style={styles.toggleWrapper}>
      <div style={styles.toggle}>
        {VARIANTS.map(({ id, label }) => {
          const active =
            variant === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() =>
                onChange(id)
              }
              aria-pressed={active}
              style={{
                ...styles.toggleButton,

                borderRight:
                  id === "without"
                    ? "1px solid rgba(245,235,210,.10)"
                    : 0,

                background: active
                  ? "rgba(184,140,235,.09)"
                  : "transparent",

                color: active
                  ? "rgba(255,248,230,.92)"
                  : "rgba(245,235,210,.48)",
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

/* -------------------------------------------------------------------------- */
/* Framework panel                                                            */
/* -------------------------------------------------------------------------- */

interface FrameworkPanelProps {
  active: boolean;
  focusId:
    | CoSovereigntyStageId
    | null;
  onFocusChange: (
    id:
      | CoSovereigntyStageId
      | null,
  ) => void;
}

function FrameworkPanel({
  active,
  focusId,
  onFocusChange,
}: FrameworkPanelProps) {
  return (
    <aside
      style={{
        ...styles.frameworkPanel,

        opacity: active
          ? 1
          : 0.22,

        pointerEvents: active
          ? "auto"
          : "none",
      }}
    >
      <div
        style={
          styles.frameworkPanelTitle
        }
      >
        What changed?
      </div>

      <div
        style={
          styles.frameworkStageList
        }
      >
        {CO_SOVEREIGNTY_STAGES.map(
          (stage, index) => {
            const focused =
              focusId === stage.id;

            return (
              <FrameworkStage
                key={stage.id}
                stage={stage}
                index={index}
                focused={focused}
                onFocus={() =>
                  onFocusChange(
                    stage.id,
                  )
                }
                onBlur={() =>
                  onFocusChange(null)
                }
                onClick={() =>
                  onFocusChange(
                    focused
                      ? null
                      : stage.id,
                  )
                }
              />
            );
          },
        )}
      </div>

      <div
        style={
          styles.frameworkPanelFooter
        }
      >
        Hover a principle to focus on
        how it changes the interface.
      </div>
    </aside>
  );
}

interface FrameworkStageProps {
  stage:
    (typeof CO_SOVEREIGNTY_STAGES)[number];
  index: number;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onClick: () => void;
}

function FrameworkStage({
  stage,
  index,
  focused,
  onFocus,
  onBlur,
  onClick,
}: FrameworkStageProps) {
  return (
    <button
      type="button"
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      style={{
        ...styles.frameworkStage,

        background: focused
          ? `${stage.color}0A`
          : "transparent",
      }}
    >
      <span
        style={{
          ...styles.stageNumber,
          color: stage.color,
        }}
      >
        {String(index + 1).padStart(
          2,
          "0",
        )}
      </span>

      <span
        style={
          styles.stageName
        }
      >
        {stage.title}
      </span>

      <span
        style={
          styles.stageSummary
        }
      >
        {stage.summary}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Without framework                                                          */
/* -------------------------------------------------------------------------- */

function WithoutFramework() {
  return (
    <>
      <InterfaceHeader />

      <div
        style={eyebrow(
          "#EF6B63",
        )}
      >
        AI recommends
      </div>

      <h3 style={styles.headline}>
        Reschedule the design review to
        Tuesday at 2:00 PM.
      </h3>

      <div
        style={{
          ...styles.panel,
          marginTop: 18,
        }}
      >
        <div style={styles.smallLabel}>
          Current meeting
        </div>

        <div style={styles.body}>
          Monday · 2:00 PM – 3:00 PM
        </div>
      </div>

      <button
        type="button"
        style={{
          ...styles.primaryButton,
          marginTop: 20,
          background: "#EF5454",
        }}
      >
        Accept recommendation
      </button>

      <button
        type="button"
        style={{
          ...styles.secondaryButton,
          marginTop: 10,
        }}
      >
        Choose another time
      </button>

      <div style={styles.footnote}>
        The recommendation appears
        immediately. Needs, authority,
        and human trade-offs remain
        hidden.
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* With framework                                                             */
/* -------------------------------------------------------------------------- */

interface WithFrameworkProps {
  focusId:
    | CoSovereigntyStageId
    | null;
}

function WithFramework({
  focusId,
}: WithFrameworkProps) {
  const visible = (
    ids: CoSovereigntyStageId[],
  ) =>
    focusId === null ||
    ids.includes(focusId);

  return (
    <>
      <InterfaceHeader />

      <div
        style={eyebrow(
          "#B48AE8",
        )}
      >
        Shared scheduling decision
      </div>

      <h3 style={styles.headline}>
        {
          CO_SOVEREIGNTY_APPLY.scenario
        }
      </h3>

      <FocusSection
        label="Participants"
        dim={
          !visible([
            "roles",
            "needs",
            "decision-rights",
          ])
        }
      >
        <ParticipantList />
      </FocusSection>

      <FocusSection
        label="Options & trade-offs"
        dim={
          !visible([
            "conflict",
            "negotiation",
            "trade-offs",
          ])
        }
      >
        <TradeOffList />
      </FocusSection>

      <FocusSection
        label="Resolution"
        dim={
          !visible([
            "resolution",
          ])
        }
      >
        <Resolution />
      </FocusSection>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Participants                                                               */
/* -------------------------------------------------------------------------- */

function ParticipantList() {
  return (
    <div
      style={{
        display: "grid",
        gap: 9,
      }}
    >
      {CO_SOVEREIGNTY_APPLY.people.map(
        (person) => (
          <ParticipantRow
            key={person.id}
            person={person}
          />
        ),
      )}
    </div>
  );
}

function ParticipantRow({
  person,
}: {
  person:
    (typeof CO_SOVEREIGNTY_APPLY.people)[number];
}) {
  const initials =
    person.name
      .split(" ")
      .map((part) => part[0])
      .join("");

  return (
    <div
      style={
        styles.participantRow
      }
    >
      <div
        style={{
          ...styles.avatar,
          border: `1px solid ${person.color}88`,
          color: person.color,
        }}
      >
        {initials}
      </div>

      <div>
        <div
          style={{
            ...styles.body,
            color:
              "rgba(255,248,230,.84)",
          }}
        >
          {person.name}
        </div>

        <div
          style={{
            ...styles.smallLabel,
            marginTop: 2,
          }}
        >
          {person.role}
        </div>

        <div
          style={{
            ...styles.body,
            marginTop: 5,
            fontSize: 13,
          }}
        >
          {person.need}
        </div>
      </div>

      <div>
        <div
          style={
            styles.smallLabel
          }
        >
          Decision right
        </div>

        <div
          style={{
            ...styles.body,
            marginTop: 4,
            fontSize: 13,
          }}
        >
          {person.authority}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Trade-offs                                                                 */
/* -------------------------------------------------------------------------- */

function TradeOffList() {
  return (
    <div
      style={{
        display: "grid",
        gap: 8,
      }}
    >
      {CO_SOVEREIGNTY_APPLY.with.alternatives.map(
        (option) => (
          <TradeOffRow
            key={option.time}
            option={option}
          />
        ),
      )}
    </div>
  );
}

function TradeOffRow({
  option,
}: {
  option:
    (typeof CO_SOVEREIGNTY_APPLY.with.alternatives)[number];
}) {
  return (
    <div
      style={{
        ...styles.tradeOffRow,

        border:
          option.recommended
            ? "1px solid rgba(180,138,232,.44)"
            : "1px solid rgba(245,235,210,.08)",

        background:
          option.recommended
            ? "rgba(180,138,232,.06)"
            : "transparent",
      }}
    >
      <div
        style={{
          ...styles.body,
          color:
            "rgba(255,248,230,.88)",
        }}
      >
        {option.time}
      </div>

      <div
        style={{
          ...styles.body,
          fontSize: 13.5,
        }}
      >
        {option.tradeoff}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Resolution                                                                 */
/* -------------------------------------------------------------------------- */

function Resolution() {
  return (
    <>
      <div
        style={{
          ...styles.panel,
          borderColor:
            "rgba(180,138,232,.32)",
        }}
      >
        <div
          style={
            styles.smallLabel
          }
        >
          Recommended compromise
        </div>

        <div
          style={{
            ...styles.headline,
            fontSize: 24,
            marginTop: 7,
          }}
        >
          {
            CO_SOVEREIGNTY_APPLY.with
              .recommendation
          }
        </div>

        <div
          style={{
            ...styles.body,
            marginTop: 6,
          }}
        >
          {
            CO_SOVEREIGNTY_APPLY.with
              .rationale
          }
        </div>
      </div>

      <button
        type="button"
        style={{
          ...styles.primaryButton,
          marginTop: 12,
          background: "#B48AE8",
          color: "#0B0710",
        }}
      >
        Propose to participants
      </button>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Focus section                                                              */
/* -------------------------------------------------------------------------- */

interface FocusSectionProps {
  dim: boolean;
  label: string;
  children: React.ReactNode;
}

function FocusSection({
  dim,
  label,
  children,
}: FocusSectionProps) {
  return (
    <section
      style={{
        marginTop: 16,
        opacity: dim ? 0.18 : 1,
        transition:
          "opacity .28s ease",
      }}
    >
      <div
        style={{
          ...styles.smallLabel,
          marginBottom: 8,
        }}
      >
        {label}
      </div>

      {children}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Interface header                                                           */
/* -------------------------------------------------------------------------- */

function InterfaceHeader() {
  return (
    <div
      style={
        styles.interfaceHeader
      }
    >
      <div
        style={
          styles.interfaceIdentity
        }
      >
        <div
          style={
            styles.assistantIcon
          }
        >
          ✦
        </div>

        <div
          style={{
            ...styles.body,
            fontSize: 16,
            color:
              "rgba(255,248,230,.90)",
          }}
        >
          AI Assistant
        </div>
      </div>

      <div
        style={{
          color:
            "rgba(245,235,210,.38)",
        }}
      >
        ⋮
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function eyebrow(
  color: string,
) {
  return {
    fontFamily:
      "'DM Mono',monospace",
    fontSize: 8,
    letterSpacing: ".14em",
    textTransform:
      "uppercase" as const,
    color,
  };
}

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const styles = {
  canvas: {
    maxWidth: 1030,
    margin: "0 auto",
  },

  toggleWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 22,
  },

  toggle: {
    display: "inline-flex",
    border:
      "1px solid rgba(245,235,210,.10)",
  },

  toggleButton: {
    minWidth: 158,
    minHeight: 46,
    padding: "0 16px",
    border: 0,
    fontFamily:
      "'DM Mono',monospace",
    fontSize: 9,
    letterSpacing: ".13em",
    textTransform:
      "uppercase" as const,
    cursor: "pointer",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1fr) 330px",
    gap: 24,
    alignItems: "start",
  },

  interfacePanel: {
    padding: 22,
    border:
      "1px solid rgba(245,235,210,.10)",
    background:
      "linear-gradient(180deg,rgba(8,11,18,.91),rgba(4,7,12,.88))",
  },

  frameworkPanel: {
    padding: "18px 17px",
    border:
      "1px solid rgba(245,235,210,.09)",
    background:
      "rgba(4,7,12,.74)",

    transition:
      "opacity .35s cubic-bezier(.16,1,.3,1)",
  },

  frameworkPanelTitle: {
    marginBottom: 14,
    fontFamily:
      "'DM Mono',monospace",
    fontSize: 8,
    letterSpacing: ".16em",
    textTransform:
      "uppercase" as const,
    color:
      "rgba(200,180,130,.66)",
  },

  frameworkStageList: {
    display: "grid",
    gap: 4,
  },

  frameworkStage: {
    display: "grid",
    gridTemplateColumns:
      "34px 110px 1fr",
    gap: 10,
    minHeight: 55,
    padding: "9px 8px",
    border: 0,
    color: "inherit",
    textAlign: "left" as const,
    cursor: "pointer",
  },

  stageNumber: {
    fontFamily:
      "'DM Mono',monospace",
    fontSize: 9,
  },

  stageName: {
    fontFamily:
      "'DM Mono',monospace",
    fontSize: 8.5,
    letterSpacing: ".10em",
    textTransform:
      "uppercase" as const,
    color:
      "rgba(245,235,210,.72)",
  },

  stageSummary: {
    fontFamily:
      "'EB Garamond',serif",
    fontSize: 14,
    lineHeight: 1.3,
    color:
      "rgba(245,235,210,.58)",
  },

  frameworkPanelFooter: {
    marginTop: 16,
    paddingTop: 14,
    borderTop:
      "1px solid rgba(245,235,210,.08)",
    fontFamily:
      "'EB Garamond',serif",
    fontSize: 13.5,
    lineHeight: 1.45,
    color:
      "rgba(245,235,210,.42)",
  },

  headline: {
    margin: "8px 0 0",
    fontFamily:
      "'EB Garamond',serif",
    fontSize: 29,
    lineHeight: 1.16,
    fontWeight: 500,
    color:
      "rgba(255,248,230,.95)",
  },

  body: {
    fontFamily:
      "'EB Garamond',serif",
    fontSize: 14.5,
    lineHeight: 1.42,
    color:
      "rgba(245,235,210,.62)",
  },

  smallLabel: {
    fontFamily:
      "'DM Mono',monospace",
    fontSize: 8,
    letterSpacing: ".13em",
    textTransform:
      "uppercase" as const,
    color:
      "rgba(200,180,130,.56)",
  },

  panel: {
    padding: "14px 15px",
    border:
      "1px solid rgba(137,185,220,.18)",
    background:
      "rgba(9,13,20,.54)",
  },

  primaryButton: {
    width: "100%",
    minHeight: 48,
    border: 0,
    color:
      "rgba(255,255,255,.96)",
    fontFamily:
      "'EB Garamond',serif",
    fontSize: 15.5,
    cursor: "pointer",
  },

  secondaryButton: {
    width: "100%",
    minHeight: 46,
    border:
      "1px solid rgba(245,235,210,.14)",
    background: "transparent",
    color:
      "rgba(245,235,210,.82)",
    fontFamily:
      "'EB Garamond',serif",
    fontSize: 15,
    cursor: "pointer",
  },

  footnote: {
    marginTop: 44,
    textAlign: "center" as const,
    fontFamily:
      "'EB Garamond',serif",
    fontSize: 13.5,
    lineHeight: 1.45,
    color:
      "rgba(245,235,210,.40)",
  },

  participantRow: {
    display: "grid",
    gridTemplateColumns:
      "34px 1fr 1fr",
    gap: 10,
    alignItems: "center",
    padding: "9px 10px",
    border:
      "1px solid rgba(245,235,210,.08)",
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    fontFamily:
      "'DM Mono',monospace",
    fontSize: 9,
  },

  tradeOffRow: {
    display: "grid",
    gridTemplateColumns:
      "150px 1fr",
    gap: 12,
    padding: "11px 12px",
  },

  interfaceHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent:
      "space-between",
    paddingBottom: 16,
    marginBottom: 18,
    borderBottom:
      "1px solid rgba(245,235,210,.08)",
  },

  interfaceIdentity: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  assistantIcon: {
    width: 30,
    height: 30,
    borderRadius: 7,
    display: "grid",
    placeItems: "center",
    background:
      "rgba(180,138,232,.78)",
    color: "white",
  },
};