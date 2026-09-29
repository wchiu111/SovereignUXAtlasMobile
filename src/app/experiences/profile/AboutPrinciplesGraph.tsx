import { ABOUT_BLUE, aboutMotion } from "./aboutMotion";

const anchors = [
  { x: 36, y: 24, delay: 120 },
  { x: 118, y: 12, delay: 440 },
  { x: 194, y: 48, delay: 760 },
  { x: 164, y: 126, delay: 1080 },
  { x: 58, y: 136, delay: 1400 },
] as const;

export default function AboutPrinciplesGraph() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: 230,
        height: 164,
        margin: "0 auto",
      }}
    >
      <style>{`
        @keyframes aboutPrincipleLineDraw {
          0% { opacity: 0; stroke-dashoffset: 1; }
          18% { opacity: 0.9; }
          45%, 82% { opacity: 0.72; stroke-dashoffset: 0; }
          100% { opacity: 0; stroke-dashoffset: 0; }
        }

        @keyframes aboutPrincipleNodeResolve {
          0%, 8% { opacity: 0.18; transform: scale(0.72); }
          22%, 78% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.28; transform: scale(0.82); }
        }

        @keyframes aboutPrincipleCoreResolve {
          0%, 20% {
            opacity: 0.32;
            transform: translate(-50%, -50%) rotate(45deg) scale(0.72);
          }
          42%, 82% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(45deg) scale(1.14);
          }
          100% {
            opacity: 0.48;
            transform: translate(-50%, -50%) rotate(45deg) scale(0.9);
          }
        }

        @keyframes aboutPrincipleFieldBreath {
          0%, 100% { opacity: 0.38; transform: translate(-50%, -50%) scale(0.96); }
          50% { opacity: 0.82; transform: translate(-50%, -50%) scale(1.03); }
        }
      `}</style>

      <svg
        viewBox="0 0 230 164"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        {[32, 62, 94, 126].map((radius) => (
          <circle
            key={radius}
            cx="115"
            cy="82"
            r={radius / 2}
            fill="none"
            stroke={`${ABOUT_BLUE}${radius === 126 ? "30" : "20"}`}
            strokeWidth="1"
            strokeDasharray={radius % 2 ? "3 6" : "2 5"}
          />
        ))}

        {anchors.map((anchor, index) => (
          <path
            key={`line-${index}`}
            d={`M${anchor.x} ${anchor.y} L115 82`}
            fill="none"
            stroke={`${ABOUT_BLUE}B8`}
            strokeWidth="1"
            pathLength="1"
            strokeDasharray="1"
            style={{
              filter: `drop-shadow(0 0 4px ${ABOUT_BLUE}66)`,
              animation: `aboutPrincipleLineDraw ${aboutMotion.principleCycleMs}ms ${aboutMotion.ease} ${anchor.delay}ms infinite`,
            }}
          />
        ))}

        {anchors.map((anchor, index) => (
          <g
            key={`node-${index}`}
            style={{
              transformOrigin: `${anchor.x}px ${anchor.y}px`,
              animation: `aboutPrincipleNodeResolve ${aboutMotion.principleCycleMs}ms ease-in-out ${anchor.delay}ms infinite`,
            }}
          >
            <circle
              cx={anchor.x}
              cy={anchor.y}
              r="5"
              fill={ABOUT_BLUE}
              style={{
                filter: `drop-shadow(0 0 7px ${ABOUT_BLUE}) drop-shadow(0 0 16px ${ABOUT_BLUE}88)`,
              }}
            />
            <circle
              cx={anchor.x}
              cy={anchor.y}
              r="10"
              fill="none"
              stroke={`${ABOUT_BLUE}38`}
              strokeWidth="1"
            />
          </g>
        ))}
      </svg>

      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 64,
          height: 64,
          borderRadius: "50%",
          border: `1px dashed ${ABOUT_BLUE}42`,
          animation: "aboutPrincipleFieldBreath 4200ms ease-in-out infinite",
        }}
      />

      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 16,
          height: 16,
          background: ABOUT_BLUE,
          boxShadow: `0 0 18px ${ABOUT_BLUE}, 0 0 46px ${ABOUT_BLUE}80`,
          animation: `aboutPrincipleCoreResolve ${aboutMotion.principleCycleMs}ms ease-in-out infinite`,
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
          letterSpacing: "0.1em",
          color: "rgba(106,167,255,0.62)",
          whiteSpace: "nowrap",
        }}
      >
        PRINCIPLES SHAPE EACH DECISION
      </span>
    </div>
  );
}
