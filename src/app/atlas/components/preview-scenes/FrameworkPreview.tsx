import { motion, useReducedMotion } from "motion/react";

const COLOR = "#6ED7A0";
const LIGHT = "#A8F0C8";
const MUTED = "#3F8D66";

const nodes = [
  { x: 28, y: 28 },
  { x: 94, y: 28 },
  { x: 160, y: 28 },
  { x: 260, y: 28 },
  { x: 326, y: 28 },
  { x: 392, y: 28 },
  { x: 28, y: 84 },
  { x: 94, y: 84 },
  { x: 160, y: 84 },
  { x: 260, y: 84 },
  { x: 326, y: 84 },
  { x: 392, y: 84 },
] as const;

const links = [
  [28, 28, 94, 28],
  [28, 84, 94, 84],
  [94, 28, 160, 28],
  [94, 84, 160, 84],
  [160, 28, 210, 56],
  [160, 84, 210, 56],
  [210, 56, 260, 28],
  [210, 56, 260, 84],
  [260, 28, 326, 28],
  [260, 84, 326, 84],
  [326, 28, 392, 28],
  [326, 84, 392, 84],
  [94, 28, 94, 84],
  [326, 28, 326, 84],
] as const;

const activationPhases = [
  {
    delay: 0,
    links: [4, 5, 6, 7],
  },
  {
    delay: 0.45,
    links: [2, 3, 8, 9],
  },
  {
    delay: 0.9,
    links: [0, 1, 10, 11, 12, 13],
  },
] as const;

export default function FrameworkPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 420 112"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <filter
          id="framework-preview-glow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="3.1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Stable structure remains visible at all times. */}
      {links.map(([x1, y1, x2, y2], index) => (
        <line
          key={`base-${x1}-${y1}-${x2}-${y2}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={COLOR}
          strokeWidth={index < 12 ? 0.72 : 0.55}
          strokeOpacity={index < 12 ? 0.1 : 0.07}
        />
      ))}

      {/* Relationship activation propagates from the center outward. */}
      {activationPhases.map((phase, phaseIndex) => (
        <g key={`phase-${phaseIndex}`}>
          {phase.links.map((linkIndex) => {
            const [x1, y1, x2, y2] = links[linkIndex];

            return (
              <motion.line
                key={`active-${phaseIndex}-${linkIndex}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={LIGHT}
                strokeWidth="1.8"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="0.22 0.78"
                initial={{
                  strokeDashoffset: 1,
                  opacity: 0,
                }}
                animate={
                  reduceMotion
                    ? { opacity: 0 }
                    : {
                        strokeDashoffset: [1, -0.22],
                        opacity: [0, 0.95, 0.65, 0],
                      }
                }
                transition={{
                  duration: 2.4,
                  delay: phase.delay,
                  times: [0, 0.18, 0.72, 1],
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  ease: "linear",
                }}
                filter="url(#framework-preview-glow)"
              />
            );
          })}
        </g>
      ))}

      {/* Central principle initiates each propagation cycle. */}
      <motion.g
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.12, 1.03, 1],
                opacity: [0.78, 1, 0.9, 0.78],
              }
        }
        transition={{
          duration: 4.7,
          times: [0, 0.12, 0.3, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "210px 56px" }}
      >
        <circle cx="210" cy="56" r="22" fill={COLOR} opacity="0.035" />
        <circle
          cx="210"
          cy="56"
          r="13"
          fill="none"
          stroke={COLOR}
          strokeOpacity="0.32"
          strokeWidth="0.9"
        />
        <circle
          cx="210"
          cy="56"
          r="7"
          fill="none"
          stroke={COLOR}
          strokeOpacity="0.48"
          strokeWidth="0.85"
          strokeDasharray="2.5 3.5"
        />
        <circle
          cx="210"
          cy="56"
          r="4.7"
          fill={LIGHT}
          opacity="0.94"
          filter="url(#framework-preview-glow)"
        />
      </motion.g>

      {/* Outer concepts stay spatially stable and only breathe slightly. */}
      {nodes.map((node, index) => (
        <motion.g
          key={`${node.x}-${node.y}`}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.56, 0.88, 0.56],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 4.7,
            delay: 0.2 + (index % 3) * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        >
          <circle cx={node.x} cy={node.y} r="8" fill={COLOR} opacity="0.05" />
          <circle
            cx={node.x}
            cy={node.y}
            r="3.3"
            fill={COLOR}
            opacity="0.86"
            filter="url(#framework-preview-glow)"
          />
        </motion.g>
      ))}

      {/* Minor system markers soften the geometry without becoming distracting. */}
      {[61, 127, 293, 359].map((x, index) => (
        <motion.circle
          key={x}
          cx={x}
          cy={56}
          r={1.35}
          fill={MUTED}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.12, 0.4, 0.12],
                  scale: [0.9, 1.15, 0.9],
                }
          }
          transition={{
            duration: 4.7,
            delay: index * 0.18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: `${x}px 56px` }}
        />
      ))}
    </svg>
  );
}
