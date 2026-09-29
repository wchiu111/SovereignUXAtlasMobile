import { motion, useReducedMotion } from "motion/react";

const COLOR = "#E8C86D";
const LIGHT = "#FFF1B8";
const MUTED = "#8D7538";

const nodes = [
  { x: 42, y: 30, delay: 0.12, r: 2.2 },
  { x: 92, y: 72, delay: 0.26, r: 2.5 },
  { x: 144, y: 34, delay: 0.4, r: 2.1 },
  { x: 276, y: 32, delay: 0.18, r: 2.4 },
  { x: 324, y: 76, delay: 0.34, r: 2.2 },
  { x: 378, y: 38, delay: 0.5, r: 2.5 },
] as const;

const relationships = [
  "M 210 56 C 176 52, 134 36, 92 30",
  "M 210 56 C 170 62, 130 72, 92 72",
  "M 210 56 C 184 44, 164 36, 144 34",
  "M 210 56 C 238 42, 254 34, 276 32",
  "M 210 56 C 246 64, 282 72, 324 76",
  "M 210 56 C 264 48, 324 42, 378 38",
] as const;

const crossLinks = [
  "M 92 30 C 112 28, 128 30, 144 34",
  "M 276 32 C 314 28, 344 30, 378 38",
  "M 92 72 C 120 78, 154 72, 178 64",
  "M 242 64 C 270 76, 296 80, 324 76",
] as const;

export default function SovereignOriginBanner() {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0.01 : 4.4;

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
          id="sovereign-field-glow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient id="sovereign-core-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={LIGHT} stopOpacity="1" />
          <stop offset="45%" stopColor={COLOR} stopOpacity="0.9" />
          <stop offset="100%" stopColor={COLOR} stopOpacity="0" />
        </radialGradient>
      </defs>

      {[
        [24, 54],
        [66, 50],
        [116, 48],
        [164, 76],
        [256, 78],
        [304, 48],
        [354, 56],
        [400, 64],
      ].map(([x, y], index) => (
        <motion.circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={1.1}
          fill={index % 2 === 0 ? COLOR : MUTED}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.08, 0.24, 0.08],
                  scale: [0.92, 1.08, 0.92],
                }
          }
          transition={{
            duration,
            delay: index * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}

      {relationships.map((path) => (
        <path
          key={path}
          d={path}
          fill="none"
          stroke={COLOR}
          strokeWidth="0.65"
          strokeOpacity="0.11"
          strokeLinecap="round"
        />
      ))}

      {crossLinks.map((path) => (
        <path
          key={path}
          d={path}
          fill="none"
          stroke={COLOR}
          strokeWidth="0.48"
          strokeOpacity="0.07"
          strokeLinecap="round"
          strokeDasharray="3 7"
        />
      ))}

      <motion.g
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.14, 1.03, 1],
                opacity: [0.78, 1, 0.9, 0.78],
              }
        }
        transition={{
          duration,
          times: [0, 0.14, 0.34, 1],
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
          strokeOpacity="0.3"
          strokeWidth="0.9"
        />
        <circle
          cx="210"
          cy="56"
          r="7"
          fill="none"
          stroke={COLOR}
          strokeOpacity="0.44"
          strokeWidth="0.8"
          strokeDasharray="2.5 3.5"
        />
        <circle
          cx="210"
          cy="56"
          r="5"
          fill="url(#sovereign-core-fill)"
          filter="url(#sovereign-field-glow)"
        />
      </motion.g>

      {relationships.map((path, index) => (
        <motion.path
          key={`active-${path}`}
          d={path}
          fill="none"
          stroke={LIGHT}
          strokeWidth="1.55"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="0.18 0.82"
          initial={{ strokeDashoffset: 0.98, opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0 }
              : {
                  strokeDashoffset: [0.98, -0.18],
                  opacity: [0, 0.8, 0.52, 0],
                }
          }
          transition={{
            duration: 2.5,
            delay: 0.16 + index * 0.11,
            times: [0, 0.18, 0.72, 1],
            repeat: Infinity,
            repeatDelay: 1.45,
            ease: "linear",
          }}
          filter="url(#sovereign-field-glow)"
        />
      ))}

      {nodes.map((node) => (
        <motion.g
          key={`${node.x}-${node.y}`}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.4, 0.96, 0.52, 0.4],
                  scale: [0.94, 1.18, 1.02, 0.94],
                }
          }
          transition={{
            duration,
            delay: node.delay,
            times: [0, 0.22, 0.52, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        >
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r + 6}
            fill={COLOR}
            opacity="0.035"
          />
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.delay > 0.3 ? COLOR : LIGHT}
            opacity="0.84"
            filter={
              node.delay <= 0.3 ? "url(#sovereign-field-glow)" : undefined
            }
          />
        </motion.g>
      ))}

      {crossLinks.map((path, index) => (
        <motion.path
          key={`cross-${path}`}
          d={path}
          fill="none"
          stroke={COLOR}
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeDasharray="2.5 5.5"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.04, 0.34, 0.18, 0.04],
                }
          }
          transition={{
            duration,
            delay: 0.7 + index * 0.16,
            times: [0, 0.26, 0.6, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
