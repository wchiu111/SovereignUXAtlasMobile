import type { CSSProperties, ReactNode } from "react";

const VIOLET = "#A879FF";

const beliefs = [
  "Design is understanding before execution.",
  "Systems are more important than screens.",
  "AI should increase human agency.",
  "Interfaces should reveal intent.",
  "Every interaction should earn trust.",
  "The best UX knows when to be invisible.",
];

const modelSteps = [
  { label: "Observe", glyph: "◉" },
  { label: "Understand", glyph: "◌" },
  { label: "Structure", glyph: "◇" },
  { label: "Prototype", glyph: "✎" },
  { label: "Evaluate", glyph: "⌕" },
  { label: "Reflect", glyph: "◎" },
];

const influences = [
  "Systems Thinking",
  "Interaction Design",
  "Behavioral Psychology",
  "AI Alignment",
  "Architecture",
  "Industrial Design",
  "Cartography",
  "Information Design",
  "Cognitive Science",
  "Minimalism",
];

const beliefNodes = [
  { x: 7.3, y: 25.3 },
  { x: 24.0, y: 38.9 },
  { x: 41.5, y: 23.2 },
  { x: 59.0, y: 40.0 },
  { x: 76.5, y: 26.3 },
  { x: 93.1, y: 37.9 },
];

const explorationNodes = [
  { label: "Human–AI Collaboration", x: 160, y: 24, align: "center" as const },
  { label: "Design Integrity", x: 72, y: 58, align: "right" as const },
  { label: "AI Evaluation Systems", x: 248, y: 58, align: "left" as const },
  { label: "Explainability", x: 72, y: 132, align: "right" as const },
  { label: "Presence", x: 248, y: 132, align: "left" as const },
  { label: "Trust Calibration", x: 160, y: 166, align: "bottom" as const },
];

export default function ProfilePhilosophyPanel() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto auto auto auto",
        alignContent: "start",
        gap: 20,
        minHeight: "100%",
        padding: "28px 30px 40px",
        boxSizing: "border-box",
      }}
    >
      <PanelBlock index="01" title="Design Beliefs">
        <BeliefWave />
      </PanelBlock>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.08fr) minmax(0, 0.92fr)",
          gap: 12,
          minHeight: 196,
        }}
      >
        <PanelBlock index="02" title="Design Model">
          <div
            style={{
              display: "grid",
              alignContent: "center",
              height: "100%",
              minHeight: 0,
              paddingTop: 4,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(11, minmax(0, auto))",
                alignItems: "start",
                justifyContent: "space-between",
                gap: 5,
              }}
            >
              {modelSteps.map((step, index) => (
                <ModelStep
                  key={step.label}
                  {...step}
                  showArrow={index < modelSteps.length - 1}
                />
              ))}
            </div>

            <div
              style={{
                position: "relative",
                height: 36,
                margin: "14px 24px 0",
                borderBottom: "1px dashed rgba(168,121,255,0.64)",
                borderLeft: "1px dashed rgba(168,121,255,0.64)",
                borderRight: "1px dashed rgba(168,121,255,0.64)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: -4,
                  top: -1,
                  width: 7,
                  height: 7,
                  borderLeft: "1px solid rgba(168,121,255,0.82)",
                  borderTop: "1px solid rgba(168,121,255,0.82)",
                  transform: "rotate(45deg)",
                }}
              />
            </div>

            <div
              style={{
                marginTop: 8,
                textAlign: "center",
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                lineHeight: 1.4,
                letterSpacing: "0.14em",
                color: "rgba(190,160,255,0.66)",
              }}
            >
              Iterate with intent. Reflect with honesty.
            </div>
          </div>
        </PanelBlock>

        <PanelBlock index="03" title="Influences" contentOffset={-5}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignContent: "flex-start",
            }}
          >
            {influences.map((influence, index) => (
              <InfluenceChip key={influence} label={influence} index={index} />
            ))}
          </div>
        </PanelBlock>
      </div>

      <PanelBlock index="04" title="Current Exploration">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(340px, 0.92fr) minmax(0, 1.08fr)",
            alignItems: "center",
            gap: 32,
            minHeight: 214,
          }}
        >
          <ExplorationField />

          <div
            style={{
              maxWidth: 420,
              justifySelf: "center",
              alignSelf: "center",
              transform: "translateY(8px)",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                lineHeight: 1.4,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(168,121,255,0.88)",
              }}
            >
              Exploring What’s Next
            </div>

            <p
              style={{
                margin: "14px 0 0",
                fontFamily: "'EB Garamond', serif",
                fontSize: 17,
                lineHeight: 1.52,
                color: "rgba(244,237,255,0.78)",
              }}
            >
              Focused on building design frameworks and evaluation systems that
              support human judgment, strengthen collaboration, and prepare us
              for the future of AI.
            </p>
          </div>
        </div>
      </PanelBlock>

      <section
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "46px minmax(0, 1fr) 120px",
          alignItems: "center",
          gap: 16,
          minHeight: 88,
          padding: "14px 20px",
          border: "1px solid rgba(168,121,255,0.24)",
          background:
            "linear-gradient(90deg, rgba(168,121,255,0.05), rgba(168,121,255,0.014) 62%, transparent)",
          overflow: "hidden",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            alignSelf: "start",
            fontFamily: "'EB Garamond', serif",
            fontSize: 38,
            lineHeight: 1,
            color: "rgba(168,121,255,0.74)",
          }}
        >
          “
        </span>

        <p
          style={{
            margin: 0,
            maxWidth: 820,
            fontFamily: "'EB Garamond', serif",
            fontSize: 18,
            lineHeight: 1.38,
            letterSpacing: "0.02em",
            color: "rgba(247,242,229,0.9)",
          }}
        >
          I believe great design is less about creating perfect interfaces and
          more about building systems that help people think, decide, and
          collaborate with confidence.
        </p>

        <StatementStar />
      </section>
    </div>
  );
}

function BeliefWave() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: 218,
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes philosophyBeliefWaveFlow {
          0%, 100% { opacity: 0.58; stroke-dashoffset: 0; }
          50% { opacity: 1; stroke-dashoffset: -26; }
        }

        @keyframes philosophyBeliefNodePulse {
          0%, 100% { opacity: 0.46; transform: translate(-50%, -50%) scale(0.84); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.22); }
        }
      `}</style>

      <svg
        viewBox="0 0 1040 190"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="beliefWaveStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(168,121,255,0.16)" />
            <stop offset="0.5" stopColor="rgba(193,155,255,0.92)" />
            <stop offset="1" stopColor="rgba(168,121,255,0.18)" />
          </linearGradient>
        </defs>

        <path
          d="M76 48 C135 28 188 92 250 74 C310 58 362 22 432 44 C504 66 546 98 614 76 C680 54 734 26 796 50 C856 72 912 94 968 72"
          fill="none"
          stroke="url(#beliefWaveStroke)"
          strokeWidth="1.4"
          strokeDasharray="8 9"
          vectorEffect="non-scaling-stroke"
          style={{
            filter: "drop-shadow(0 0 6px rgba(168,121,255,0.48))",
            animation: "philosophyBeliefWaveFlow 8800ms ease-in-out infinite",
          }}
        />

        <path
          d="M76 58 C150 92 188 44 250 68 C324 96 368 30 432 54 C502 80 556 54 614 84 C684 120 736 38 796 58 C866 82 912 54 968 82"
          fill="none"
          stroke="rgba(168,121,255,0.22)"
          strokeWidth="0.9"
          strokeDasharray="2 7"
          vectorEffect="non-scaling-stroke"
        />

        {beliefNodes.map((node, index) => (
          <line
            key={index}
            x1={`${node.x}%`}
            y1={`${node.y + 4}%`}
            x2={`${node.x}%`}
            y2="63%"
            stroke="rgba(168,121,255,0.78)"
            strokeWidth="1"
            strokeDasharray="2 5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {beliefNodes.map((node, index) => (
        <div
          key={index}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: 60,
            height: 60,
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            border: "1px solid rgba(168,121,255,0.14)",
            transform: "translate(-50%, -50%)",
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 11,
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              border: "1px solid rgba(168,121,255,0.28)",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 14,
              height: 14,
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              background: VIOLET,
              filter:
                "drop-shadow(0 0 8px rgba(168,121,255,1)) drop-shadow(0 0 18px rgba(168,121,255,0.72))",
              animation: `philosophyBeliefNodePulse ${
                3000 + index * 260
              }ms ease-in-out ${index * -240}ms infinite`,
            }}
          />
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 17,
          display: "grid",
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          gap: 55,
          padding: "0 10px",
        }}
      >
        {beliefs.map((belief) => (
          <div
            key={belief}
            style={{
              textAlign: "center",
              fontFamily: "'EB Garamond', serif",
              fontSize: 15,
              lineHeight: 1.34,
              color: "rgba(244,237,255,0.82)",
            }}
          >
            {belief}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExplorationField() {
  return (
    <div style={{ position: "relative", minHeight: 198 }}>
      <style>{`
        @keyframes explorationNodeFocus {
          0%, 100% { opacity: 0.42; transform: scale(0.84); }
          20%, 38% { opacity: 1; transform: scale(1.18); }
          52% { opacity: 0.62; transform: scale(0.94); }
        }

        @keyframes explorationCoreBreathe {
          0%, 100% { opacity: 0.54; transform: translate(-50%, -50%) scale(0.9); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.18); }
        }
      `}</style>

      <svg
        viewBox="0 0 320 190"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 320,
          height: 190,
          transform: "translate(-50%, -50%)",
          overflow: "visible",
        }}
      >
        {[32, 54, 76].map((radius) => (
          <circle
            key={radius}
            cx="160"
            cy="94"
            r={radius}
            fill="none"
            stroke={`rgba(168,121,255,${radius === 32 ? 0.34 : 0.18})`}
            strokeDasharray={radius === 54 ? "3 6" : undefined}
          />
        ))}

        {explorationNodes.map((item, index) => (
          <g key={item.label}>
            <line
              x1="160"
              y1="94"
              x2={item.x}
              y2={item.y}
              stroke="rgba(168,121,255,0.38)"
              strokeWidth="1"
            />
            <circle
              cx={item.x}
              cy={item.y}
              r="6"
              fill={VIOLET}
              style={{
                filter:
                  "drop-shadow(0 0 8px rgba(168,121,255,0.96)) drop-shadow(0 0 18px rgba(168,121,255,0.66))",
                transformOrigin: `${item.x}px ${item.y}px`,
                animation: `explorationNodeFocus 8400ms ease-in-out ${
                  index * 860
                }ms infinite`,
              }}
            />
            <circle
              cx={item.x}
              cy={item.y}
              r="14"
              fill="none"
              stroke="rgba(168,121,255,0.24)"
            />
          </g>
        ))}
      </svg>

      {explorationNodes.map((item) => (
        <span
          key={item.label}
          style={{
            position: "absolute",
            left: `calc(50% + ${item.x - 160}px)`,
            top: `calc(50% + ${item.y - 94}px)`,
            width: 130,
            transform:
              item.align === "center"
                ? "translate(-50%, -175%)"
                : item.align === "bottom"
                  ? "translate(-50%, 21px)"
                  : item.align === "right"
                    ? "translate(-125%, -50%)"
                    : "translate(25%, -50%)",
            textAlign:
              item.align === "center" || item.align === "bottom"
                ? "center"
                : item.align === "right"
                  ? "right"
                  : "left",
            fontFamily: "'EB Garamond', serif",
            fontSize: 13,
            lineHeight: 1.2,
            color: "rgba(244,237,255,0.8)",
            pointerEvents: "none",
          }}
        >
          {item.label}
        </span>
      ))}

      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 16,
          height: 16,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: VIOLET,
          boxShadow:
            "0 0 18px rgba(168,121,255,1), 0 0 48px rgba(168,121,255,0.78)",
          animation: "explorationCoreBreathe 3600ms ease-in-out infinite",
        }}
      />
    </div>
  );
}

function PanelBlock({
  index,
  title,
  children,
  contentOffset = 0,
}: {
  index: string;
  title: string;
  children: ReactNode;
  contentOffset?: number;
}) {
  return (
    <section
      style={{
        minHeight: 0,
        padding: "18px 4px 22px",
        borderTop: "1px solid rgba(168,121,255,0.18)",
        background: "transparent",
        overflow: "visible",
      }}
    >
      <h3 style={sectionStyle}>
        <span style={{ opacity: 0.78 }}>{index}</span>
        <span>{title}</span>
      </h3>
      <div style={{ marginTop: contentOffset }}>{children}</div>
    </section>
  );
}

function ModelStep({
  label,
  glyph,
  showArrow,
}: {
  label: string;
  glyph: string;
  showArrow: boolean;
}) {
  return (
    <>
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          gap: 6,
          minWidth: 50,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "grid",
            placeItems: "center",
            width: 40,
            height: 40,
            aspectRatio: "1 / 1",
            flexShrink: 0,
            borderRadius: "50%",
            border: "1px solid rgba(168,121,255,0.68)",
            background: "rgba(168,121,255,0.035)",
            color: "rgba(225,210,255,0.9)",
            fontFamily: "'DM Mono', monospace",
            fontSize: 16,
          }}
        >
          {glyph}
        </span>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(228,214,255,0.68)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>

      {showArrow && (
        <span
          aria-hidden="true"
          style={{
            alignSelf: "center",
            marginTop: -17,
            color: "rgba(168,121,255,0.78)",
            fontFamily: "'DM Mono', monospace",
            fontSize: 14,
          }}
        >
          →
        </span>
      )}
    </>
  );
}

function InfluenceChip({ label, index }: { label: string; index: number }) {
  return (
    <span
      style={{
        padding: "7px 10px",
        border: "1px solid rgba(168,121,255,0.28)",
        background: "rgba(168,121,255,0.028)",
        fontFamily: "'DM Mono', monospace",
        fontSize: 9.5,
        lineHeight: 1,
        letterSpacing: "0.04em",
        color: "rgba(232,221,255,0.78)",
        boxShadow:
          index % 4 === 0 ? "0 0 16px rgba(168,121,255,0.08)" : "none",
      }}
    >
      {label}
    </span>
  );
}

function StatementStar() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "relative", width: 98, height: 64, marginLeft: "auto" }}
    >
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 72,
          height: 1,
          transform: "translate(-50%,-50%)",
          background:
            "linear-gradient(90deg, transparent, rgba(168,121,255,0.72), transparent)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 1,
          height: 56,
          transform: "translate(-50%,-50%)",
          background:
            "linear-gradient(180deg, transparent, rgba(168,121,255,0.72), transparent)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 8,
          height: 8,
          transform: "translate(-50%,-50%) rotate(45deg)",
          background: VIOLET,
          boxShadow: "0 0 18px rgba(168,121,255,0.92)",
          animation: "profilePhilosophyStatementPulse 3600ms ease-in-out infinite",
        }}
      />
    </div>
  );
}

const sectionStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  margin: "0 0 24px",
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  lineHeight: 1.3,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(168,121,255,0.9)",
};
