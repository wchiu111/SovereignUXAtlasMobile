import { ABOUT_BLUE, aboutMotion } from "./aboutMotion";

const focusNodes = [
  { x: 116, y: 18, delay: 0 },
  { x: 196, y: 54, delay: 780 },
  { x: 168, y: 132, delay: 1560 },
  { x: 66, y: 138, delay: 2340 },
  { x: 24, y: 64, delay: 3120 },
] as const;

export default function AboutFocusRadar() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: 224,
        height: 166,
        margin: "0 auto",
      }}
    >
      <style>{`
        @keyframes aboutFocusNodeEmphasis {
          0%, 100% { opacity: 0.34; transform: scale(0.82); }
          10%, 24% { opacity: 1; transform: scale(1.24); }
          36% { opacity: 0.52; transform: scale(0.94); }
        }

        @keyframes aboutFocusCorePulse {
          0%, 100% {
            opacity: 0.54;
            transform: translate(-50%, -50%) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes aboutFocusSweep {
          0% { transform: rotate(-35deg); opacity: 0; }
          10% { opacity: 0.68; }
          55% { opacity: 0.42; }
          100% { transform: rotate(325deg); opacity: 0; }
        }

        @keyframes aboutFocusOrbitDrift {
          0%, 100% { transform: translate(-50%, -50%) rotate(-2deg); }
          50% { transform: translate(-50%, -50%) rotate(2deg); }
        }
      `}</style>

      <svg
        viewBox="0 0 224 166"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        <ellipse
          cx="112"
          cy="80"
          rx="84"
          ry="50"
          fill="none"
          stroke={`${ABOUT_BLUE}44`}
          strokeWidth="1"
          strokeDasharray="4 6"
          transform="rotate(-14 112 80)"
        />
        <ellipse
          cx="112"
          cy="80"
          rx="62"
          ry="34"
          fill="none"
          stroke={`${ABOUT_BLUE}36`}
          strokeWidth="1"
          transform="rotate(18 112 80)"
        />
        <ellipse
          cx="112"
          cy="80"
          rx="42"
          ry="62"
          fill="none"
          stroke={`${ABOUT_BLUE}28`}
          strokeWidth="1"
          strokeDasharray="2 5"
          transform="rotate(36 112 80)"
        />

        {focusNodes.map((node, index) => (
          <path
            key={`focus-line-${index}`}
            d={`M112 80 L${node.x} ${node.y}`}
            stroke={`${ABOUT_BLUE}42`}
            strokeWidth="0.8"
          />
        ))}

        {focusNodes.map((node, index) => (
          <g
            key={`focus-${index}`}
            style={{
              transformOrigin: `${node.x}px ${node.y}px`,
              animation: `aboutFocusNodeEmphasis ${aboutMotion.focusCycleMs}ms ease-in-out ${node.delay}ms infinite`,
            }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r="5"
              fill={ABOUT_BLUE}
              style={{
                filter: `drop-shadow(0 0 7px ${ABOUT_BLUE}) drop-shadow(0 0 18px ${ABOUT_BLUE}88)`,
              }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="10"
              fill="none"
              stroke={`${ABOUT_BLUE}32`}
            />
          </g>
        ))}
      </svg>

      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "48%",
          width: 128,
          height: 1,
          transformOrigin: "0 50%",
          background: `linear-gradient(90deg, ${ABOUT_BLUE}B8, ${ABOUT_BLUE}24, transparent)`,
          boxShadow: `0 0 9px ${ABOUT_BLUE}72`,
          animation: "aboutFocusSweep 9000ms linear infinite",
        }}
      />

      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "48%",
          width: 13,
          height: 13,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: ABOUT_BLUE,
          boxShadow: `0 0 20px ${ABOUT_BLUE}, 0 0 50px ${ABOUT_BLUE}88`,
          animation: "aboutFocusCorePulse 3600ms ease-in-out infinite",
        }}
      />

      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: -2,
          transform: "translateX(-50%)",
          fontFamily: "'DM Mono', monospace",
          fontSize: 8,
          letterSpacing: "0.08em",
          color: "rgba(106,167,255,0.62)",
          whiteSpace: "nowrap",
        }}
      >
        ACTIVE FIELDS OF INQUIRY
      </span>
    </div>
  );
}
