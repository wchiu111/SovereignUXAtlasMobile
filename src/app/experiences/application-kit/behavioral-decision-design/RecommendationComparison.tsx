import { motion, useReducedMotion } from "motion/react";
import {
  APPLY_COMPARISON,
  type BehavioralStageId,
} from "./behavioralDecisionDesignData";

interface Props {
  mode: "without" | "with";
  active: BehavioralStageId | null;
}

const focusOpacity = (
  active: BehavioralStageId | null,
  stage: BehavioralStageId,
) => (active === null || active === stage ? 1 : 0.22);

const focusFilter = (
  active: BehavioralStageId | null,
  stage: BehavioralStageId,
) => (active === stage ? "brightness(1.12)" : "none");

const assistantIcon = {
  width: 26,
  height: 26,
  borderRadius: 7,
  display: "grid",
  placeItems: "center",
  background:
    "linear-gradient(145deg, rgba(133,100,205,.95), rgba(96,73,160,.88))",
  color: "rgba(255,255,255,.95)",
  fontFamily: "'DM Mono',monospace",
  fontSize: 12,
  boxShadow: "0 0 22px rgba(123,95,190,.14)",
};

export default function RecommendationComparison({
  mode,
  active,
}: Props) {
  const reduced = useReducedMotion();
  const withFramework = mode === "with";
  const t = {
    duration: reduced ? 0.12 : 0.38,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  return (
    <section
      style={{
        width: "100%",
        minHeight: withFramework ? 660 : 540,
        border: "1px solid rgba(245,235,210,.10)",
        background:
          "linear-gradient(180deg, rgba(9,12,19,.96), rgba(5,8,14,.94))",
        backdropFilter: "blur(16px)",
        boxShadow:
          "0 28px 80px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.015)",
        transition:
          "min-height .46s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 56,
          padding: "0 18px",
          borderBottom: "1px solid rgba(245,235,210,.07)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={assistantIcon}>⌘</span>
          <span
            style={{
              fontFamily: "'EB Garamond',serif",
              fontSize: 16,
              fontWeight: 600,
              color: "rgba(255,248,230,.90)",
            }}
          >
            AI Assistant
          </span>
        </div>

        <button
          type="button"
          aria-label="More options"
          style={{
            minWidth: 32,
            minHeight: 32,
            border: 0,
            background: "transparent",
            color: "rgba(245,235,210,.45)",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ⋮
        </button>
      </div>

      {!withFramework ? (
        <WithoutFramework />
      ) : (
        <WithFramework
          active={active}
          transition={t}
        />
      )}
    </section>
  );
}

function WithoutFramework() {
  return (
    <div style={{ padding: "26px 22px 24px" }}>
      <div
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 8.5,
          letterSpacing: ".16em",
          textTransform: "uppercase",
          color: "rgba(230,93,93,.82)",
        }}
      >
        AI recommends
      </div>

      <div
        style={{
          marginTop: 10,
          fontFamily: "'EB Garamond',serif",
          fontSize: 27,
          lineHeight: 1.2,
          color: "rgba(255,248,230,.94)",
        }}
      >
        Reschedule the meeting to Tuesday at 2:00 PM.
      </div>

      <div
        style={{
          marginTop: 22,
          padding: "14px 16px",
          border: "1px solid rgba(160,195,218,.11)",
          background:
            "linear-gradient(180deg, rgba(15,20,30,.72), rgba(8,12,19,.62))",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "34px 1fr",
            gap: 10,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              display: "grid",
              placeItems: "center",
              border: "1px solid rgba(160,195,218,.32)",
              color: "rgba(160,195,218,.82)",
              fontSize: 16,
            }}
          >
            ◫
          </div>

          <div>
            <div
              style={{
                fontFamily: "'EB Garamond',serif",
                fontSize: 14,
                color: "rgba(245,235,210,.66)",
              }}
            >
              Current meeting
            </div>
            <div
              style={{
                marginTop: 2,
                fontFamily: "'EB Garamond',serif",
                fontSize: 13.5,
                color: "rgba(245,235,210,.45)",
              }}
            >
              Mon, May 12 · 2:00 PM – 3:00 PM
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
          display: "grid",
          gap: 10,
        }}
      >
        <button
          type="button"
          style={{
            minHeight: 48,
            border: "1px solid rgba(239,84,84,.80)",
            background:
              "linear-gradient(180deg, rgba(245,91,91,.98), rgba(229,72,72,.96))",
            color: "#fff",
            fontFamily: "'EB Garamond',serif",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 8px 22px rgba(230,70,70,.08)",
          }}
        >
          Accept recommendation
        </button>

        <button
          type="button"
          style={{
            minHeight: 46,
            border: "1px solid rgba(245,235,210,.13)",
            background: "rgba(3,4,9,.18)",
            color: "rgba(245,235,210,.78)",
            fontFamily: "'EB Garamond',serif",
            fontSize: 15.5,
            cursor: "pointer",
          }}
        >
          Choose another time
        </button>
      </div>

      <div
        style={{
          marginTop: 62,
          textAlign: "center",
          fontFamily: "'EB Garamond',serif",
          fontSize: 13.5,
          lineHeight: 1.5,
          color: "rgba(245,235,210,.34)",
        }}
      >
        The recommendation appears immediately.
        <br />
        Context, reasoning, and trade-offs are hidden.
      </div>
    </div>
  );
}

function WithFramework({
  active,
  transition,
}: {
  active: BehavioralStageId | null;
  transition: {
    duration: number;
    ease: [number, number, number, number];
  };
}) {
  return (
    <div style={{ padding: "24px 22px 24px" }}>
      <motion.div
        animate={{
          opacity: focusOpacity(active, "interpret"),
        }}
        transition={transition}
        style={{
          filter: focusFilter(active, "interpret"),
        }}
      >
        <ProductLabel>Scheduling context</ProductLabel>

        <div
          style={{
            marginTop: 9,
            fontFamily: "'EB Garamond',serif",
            fontSize: 26,
            lineHeight: 1.2,
            color: "rgba(255,248,230,.94)",
          }}
        >
          Find a better time for the project review.
        </div>

        <div
          style={{
            marginTop: 11,
            fontFamily: "'EB Garamond',serif",
            fontSize: 15.5,
            lineHeight: 1.45,
            color: "rgba(245,235,210,.65)",
          }}
        >
          5 attendees invited
          <br />
          4 are available Tuesday afternoon
        </div>
      </motion.div>

      <div
        style={{
          height: 1,
          margin: "17px 0",
          background: "rgba(245,235,210,.07)",
        }}
      />

      <motion.div
        animate={{
          opacity: focusOpacity(active, "frame"),
        }}
        transition={transition}
        style={{
          filter: focusFilter(active, "frame"),
        }}
      >
        <ProductLabel>Availability</ProductLabel>

        <div
          style={{
            display: "grid",
            gap: 7,
            marginTop: 10,
          }}
        >
          {APPLY_COMPARISON.with.alternatives.map((option) => (
            <div
              key={option.time}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 12,
                alignItems: "center",
                padding: "11px 12px",
                border: option.recommended
                  ? "1px solid rgba(210,151,104,.34)"
                  : "1px solid rgba(245,235,210,.09)",
                background: option.recommended
                  ? "rgba(210,151,104,.05)"
                  : "rgba(3,4,9,.20)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'EB Garamond',serif",
                    fontSize: 15.5,
                    fontWeight: 500,
                    color: "rgba(255,248,230,.90)",
                  }}
                >
                  {option.time}
                </div>

                <div
                  style={{
                    marginTop: 2,
                    fontFamily: "'EB Garamond',serif",
                    fontSize: 13.2,
                    color: "rgba(245,235,210,.48)",
                  }}
                >
                  {option.tradeoff}
                </div>
              </div>

              <span
                aria-hidden="true"
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: option.recommended
                    ? "1px solid rgba(221,165,73,.92)"
                    : "1px solid rgba(245,235,210,.38)",
                  boxShadow: option.recommended
                    ? "0 0 13px rgba(221,165,73,.16)"
                    : "none",
                  position: "relative",
                }}
              >
                {option.recommended && (
                  <span
                    style={{
                      position: "absolute",
                      inset: 4,
                      borderRadius: "50%",
                      background: "rgba(221,165,73,.92)",
                    }}
                  />
                )}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{
          opacity: focusOpacity(active, "recommend"),
        }}
        transition={transition}
        style={{
          marginTop: 17,
          filter: focusFilter(active, "recommend"),
        }}
      >
        <ProductLabel>Recommended time</ProductLabel>

        <div
          style={{
            marginTop: 9,
            display: "grid",
            gridTemplateColumns: "36px 1fr",
            gap: 11,
            alignItems: "center",
            minHeight: 58,
            padding: "0 13px",
            border: "1px solid rgba(210,151,104,.38)",
            background:
              "linear-gradient(180deg, rgba(210,151,104,.07), rgba(210,151,104,.035))",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              border: "1px solid rgba(210,151,104,.32)",
              color: "rgba(221,165,73,.88)",
              fontSize: 16,
              background: "rgba(210,151,104,.06)",
            }}
          >
            ◫
          </div>

          <div
            style={{
              fontFamily: "'EB Garamond',serif",
              fontSize: 20.5,
              color: "rgba(255,248,230,.94)",
            }}
          >
            Tuesday at 2:00 PM
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{
          opacity: focusOpacity(active, "confirm"),
        }}
        transition={transition}
        style={{
          marginTop: 17,
          filter: focusFilter(active, "confirm"),
        }}
      >
        <ProductLabel>Confirmation</ProductLabel>

        <div
          style={{
            marginTop: 8,
            fontFamily: "'EB Garamond',serif",
            fontSize: 15,
            lineHeight: 1.45,
            color: "rgba(245,235,210,.67)",
          }}
        >
          Reschedule the project review to Tuesday at 2:00 PM?
        </div>
      </motion.div>

      <motion.div
        animate={{
          opacity: focusOpacity(active, "act"),
        }}
        transition={transition}
        style={{
          marginTop: 16,
          display: "grid",
          gap: 9,
          filter: focusFilter(active, "act"),
        }}
      >
        <button
          type="button"
          style={{
            minHeight: 46,
            border: "1px solid rgba(92,179,114,.72)",
            background:
              "linear-gradient(180deg, rgba(84,183,109,.92), rgba(68,154,91,.90))",
            color: "#071009",
            fontFamily: "'EB Garamond',serif",
            fontSize: 15.5,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {APPLY_COMPARISON.with.primaryAction}
        </button>

        <button
          type="button"
          style={{
            minHeight: 44,
            border: "1px solid rgba(245,235,210,.13)",
            background: "transparent",
            color: "rgba(245,235,210,.70)",
            fontFamily: "'EB Garamond',serif",
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          {APPLY_COMPARISON.with.secondaryAction}
        </button>
      </motion.div>

      <motion.div
        animate={{
          opacity: focusOpacity(active, "separate"),
        }}
        transition={transition}
        style={{
          marginTop: 16,
          paddingTop: 14,
          borderTop: "1px solid rgba(245,235,210,.06)",
          fontFamily: "'EB Garamond',serif",
          fontSize: 13.2,
          lineHeight: 1.45,
          color: "rgba(245,235,210,.34)",
          filter: focusFilter(active, "separate"),
        }}
      >
        Availability is presented as observed information. The recommended fit is
        presented separately as a system judgment.
      </motion.div>
    </div>
  );
}

function ProductLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'DM Mono',monospace",
        fontSize: 8.4,
        letterSpacing: ".16em",
        textTransform: "uppercase",
        color: "rgba(200,180,130,.58)",
      }}
    >
      {children}
    </div>
  );
}
