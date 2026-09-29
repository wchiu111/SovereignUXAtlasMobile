import { useState } from "react";
import { motion } from "motion/react";
import applicationKitEntry from "../../content/frameworks/application-kit";
import { PROJECT_DRAWER_WIDTH } from "../../components/AtlasProjectIntelligenceDrawer";
import ApplicationKitModuleRouter from "../../experiences/application-kit/shared/ApplicationKitModuleRouter";
import { resolveStellarColor } from "../constellation/stellarPalette";

interface ApplicationKitLevel2DrawerProps {
  open: boolean;
  systemColor: string;
  onBack: () => void;
}

const MODULE_SUMMARIES: Record<string, string> = {
  "behavioral-decision-design":
    "Clarify interpretation, assumptions, recommendations, and confirmation loops.",
  "multi-user-co-sovereignty":
    "Support shared systems where legitimate needs and decision rights may conflict.",
  "constraint-scope-design":
    "Make system capabilities, boundaries, and non-capabilities understandable.",
};

const CONNECTED_FRAMEWORKS = [
  "Behavioral Architecture",
  "Decision Rights",
  "Relational AI Literacy",
];

function sentenceCase(value: string) {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function ApplicationKitLevel2Drawer({
  open,
  systemColor,
  onBack,
}: ApplicationKitLevel2DrawerProps) {
  const [activeModuleId, setActiveModuleId] =
    useState<string | null>(null);

  const family =
    applicationKitEntry.collection?.families.find(
      (item) => item.id === "behavior-authority",
    );

  if (!family) return null;

  const closeFamily = () => {
    setActiveModuleId(null);
    onBack();
  };

  return (
    <>
      <motion.aside
          initial={{
            x: PROJECT_DRAWER_WIDTH,
            opacity: 0.98,
          }}
          animate={{
            x: open ? 0 : PROJECT_DRAWER_WIDTH,
            opacity: open ? 1 : 0.98,
          }}
        transition={{
          x: {
            duration: 0.58,
            ease: [0.16, 1, 0.3, 1],
          },
          opacity: {
            duration: 0.22,
            ease: "easeOut",
          },
        }}
        className="absolute top-0 right-0 bottom-0 overflow-hidden"
        style={{
          zIndex: 38,
          width: PROJECT_DRAWER_WIDTH,
          background:
            "linear-gradient(180deg, rgba(4,4,10,0.995), rgba(4,5,11,0.985))",
          borderLeft: "1px solid rgba(138,174,200,0.14)",
          boxShadow: "-28px 0 96px rgba(0,0,0,0.48)",
          backdropFilter: "blur(38px)",
          color: "#F4EBD0",
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              padding: "28px 28px 36px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 18,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 8,
                  letterSpacing: "0.22em",
                  color: "#65D69A",
                  textTransform: "uppercase",
                }}
              >
                Application Kit / Behavior &amp; Authority
              </div>

              <button
                type="button"
                onClick={closeFamily}
                aria-label="Return to all Application Kit families"
                style={{
                  width: 44,
                  height: 44,
                  flex: "0 0 auto",
                  border: "1px solid rgba(245,235,210,0.15)",
                  background: "rgba(255,255,255,0.02)",
                  color: "rgba(245,235,210,0.78)",
                  cursor: "pointer",
                  fontSize: 18,
                }}
              >
                ×
              </button>
            </div>

            <button
              type="button"
              onClick={closeFamily}
              style={{
                appearance: "none",
                border: 0,
                background: "transparent",
                padding: 0,
                margin: "0 0 24px",
                color: "#65D69A",
                fontFamily: "'DM Mono',monospace",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              ← All Families
            </button>

            <h1
              style={{
                margin: "0 0 30px",
                fontFamily: "'EB Garamond',serif",
                fontSize: 31,
                lineHeight: 1.02,
                color: "#F4EBD0",
              }}
            >
              Behavior &amp; Authority
            </h1>

            <Section
              label="What This Family Governs"
              body="How systems interpret, frame, negotiate, and remain within legitimate human-defined authority."
            />

            <Divider />

            <Section
              label="The Question It Helps Answer"
              body="How should a system support decisions without quietly assuming the right to make them?"
            />

            <Divider />

            <div style={eyebrowStyle}>3 Modules</div>
            <div style={{ display: "grid", gap: 8 }}>
              {family.modules.map((module) => {
                const color = resolveStellarColor(
                  module.stellarType,
                  systemColor,
                );

                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => setActiveModuleId(module.id)}
                    aria-label={`Open ${sentenceCase(module.title)}`}
                    style={{
                      display: "grid",
                      width: "100%",
                      gridTemplateColumns: "12px 1fr 16px",
                      alignItems: "start",
                      gap: 11,
                      padding: "15px 14px",
                      border: "1px solid rgba(245,235,210,0.1)",
                      background: "rgba(255,255,255,0.025)",
                      color: "#F4EBD0",
                      textAlign: "left",
                      cursor: "pointer",
                      opacity: 1,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 9,
                        height: 9,
                        marginTop: 5,
                        borderRadius: "50%",
                        background: color,
                        boxShadow: `0 0 9px ${color}`,
                      }}
                    />

                    <span>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "'EB Garamond',serif",
                          fontSize: 16,
                          lineHeight: 1.25,
                          marginBottom: 5,
                        }}
                      >
                        {sentenceCase(module.title)}
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "'EB Garamond',serif",
                          fontSize: 12.5,
                          lineHeight: 1.48,
                          color: "rgba(245,235,210,0.66)",
                        }}
                      >
                        {MODULE_SUMMARIES[module.id] ?? module.purpose}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      style={{
                        marginTop: 11,
                        fontSize: 18,
                        color,
                        opacity: 0.78,
                      }}
                    >
                      ›
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 30 }}>
              <div style={eyebrowStyle}>Connected Frameworks</div>

              <div style={{ display: "grid", gap: 12 }}>
                {CONNECTED_FRAMEWORKS.map((framework) => (
                  <div
                    key={framework}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: "'EB Garamond',serif",
                      fontSize: 15,
                      color: "rgba(245,235,210,0.8)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        color: "rgba(200,169,110,0.72)",
                      }}
                    >
                      ◇
                    </span>
                    {framework}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "18px 22px 22px",
              borderTop: "1px solid rgba(245,235,210,0.08)",
              background: "rgba(3,4,9,0.92)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                minHeight: 49,
                padding: "0 12px",
                border: "1px solid rgba(200,169,110,0.48)",
                borderRadius: 12,
              }}
            >
              <span style={{ color: "#65D69A" }}>✦</span>
              <span
                style={{
                  flex: 1,
                  fontFamily: "'EB Garamond',serif",
                  fontSize: 13.5,
                  color: "rgba(245,235,210,0.52)",
                }}
              >
                Ask Atlas about this family...
              </span>
              <span
                aria-hidden="true"
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "#65D69A",
                  color: "#05100A",
                  fontSize: 17,
                }}
              >
                ↑
              </span>
            </div>

            <div
              style={{
                marginTop: 11,
                fontFamily: "'EB Garamond',serif",
                fontSize: 10.5,
                lineHeight: 1.4,
                color: "rgba(245,235,210,0.46)",
              }}
            >
              ◇ Responses are grounded in this family and its documented
              connections.
            </div>
          </div>
        </div>
      </motion.aside>

      <ApplicationKitModuleRouter
        moduleId={activeModuleId}
        systemColor={systemColor}
        onExit={() => setActiveModuleId(null)}
      />
    </>
  );
}

function Section({
  label,
  body,
}: {
  label: string;
  body: string;
}) {
  return (
    <section>
      <div style={eyebrowStyle}>{label}</div>
      <div
        style={{
          fontFamily: "'EB Garamond',serif",
          fontSize: 15.5,
          lineHeight: 1.65,
          color: "rgba(245,235,210,0.86)",
        }}
      >
        {body}
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        margin: "25px 0",
        background: "rgba(245,235,210,0.09)",
      }}
    />
  );
}

const eyebrowStyle = {
  fontFamily: "'DM Mono',monospace",
  fontSize: 8.5,
  letterSpacing: "0.23em",
  textTransform: "uppercase" as const,
  color: "#65D69A",
  marginBottom: 11,
};
