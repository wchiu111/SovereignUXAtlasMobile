import { motion, useReducedMotion } from "motion/react";

const COLOR = "#B394E8";
const LIGHT = "#E8DFFF";
const MUTED = "#6D5B86";

const mainPath = "M 16 56 C 70 56, 112 56, 164 56 S 264 56, 404 56";
const topBranch = "M 142 56 C 178 54, 188 30, 226 28 S 298 28, 338 30";
const midBranch = "M 142 56 C 184 56, 202 46, 242 45 S 300 44, 338 44";
const bottomBranch = "M 142 56 C 178 58, 190 82, 228 84 S 300 84, 350 80";

export default function ExperimentPreview() {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0.01 : 3.9;

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
        <filter id="experiment-preview-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Complete structure is visible immediately. */}
      <path
        d={mainPath}
        fill="none"
        stroke={COLOR}
        strokeWidth="0.9"
        strokeOpacity="0.34"
        strokeLinecap="round"
      />
      <path
        d={topBranch}
        fill="none"
        stroke={COLOR}
        strokeWidth="0.75"
        strokeOpacity="0.26"
        strokeLinecap="round"
      />
      <path
        d={midBranch}
        fill="none"
        stroke={COLOR}
        strokeWidth="0.7"
        strokeOpacity="0.18"
        strokeLinecap="round"
        strokeDasharray="3 7"
      />
      <path
        d={bottomBranch}
        fill="none"
        stroke={COLOR}
        strokeWidth="0.8"
        strokeOpacity="0.3"
        strokeLinecap="round"
      />

      {/* Source/question node */}
      <motion.g
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [0.98, 1.06, 0.98],
                opacity: [0.72, 1, 0.72],
              }
        }
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "24px 56px" }}
      >
        <circle cx="24" cy="56" r="16" fill={COLOR} opacity="0.05" />
        <circle
          cx="24"
          cy="56"
          r="8"
          fill="none"
          stroke={COLOR}
          strokeOpacity="0.42"
          strokeWidth="0.8"
        />
        <circle
          cx="24"
          cy="56"
          r="4.4"
          fill={LIGHT}
          opacity="0.94"
          filter="url(#experiment-preview-glow)"
        />
      </motion.g>

      {/* Real moving signal along the main question path */}
      <motion.path
        d={mainPath}
        fill="none"
        stroke={LIGHT}
        strokeWidth="2.35"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="0.1 0.9"
        initial={{ strokeDashoffset: 0.98, opacity: 0 }}
        animate={
          reduceMotion
            ? { opacity: 0 }
            : {
                strokeDashoffset: [0.98, -0.12],
                opacity: [0, 0.88, 0.88, 0],
              }
        }
        transition={{
          duration,
          times: [0, 0.12, 0.84, 1],
          repeat: Infinity,
          ease: "linear",
        }}
        filter="url(#experiment-preview-glow)"
      />

      {/* Branching point */}
      <circle cx="142" cy="56" r="8" fill={COLOR} opacity="0.055" />
      <circle cx="142" cy="56" r="3.6" fill={COLOR} opacity="0.82" />

      {/* Branch signals */}
      {[topBranch, midBranch, bottomBranch].map((path, index) => (
        <motion.path
          key={path}
          d={path}
          fill="none"
          stroke={index === 1 ? MUTED : LIGHT}
          strokeWidth={index === 1 ? 1.5 : 1.85}
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="0.13 0.87"
          initial={{ strokeDashoffset: 0.95, opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0 }
              : {
                  strokeDashoffset: [0.95, -0.12],
                  opacity:
                    index === 1
                      ? [0, 0.38, 0.18, 0]
                      : [0, 0.72, 0.72, 0],
                }
          }
          transition={{
            duration,
            delay: 0.42 + index * 0.08,
            times: [0, 0.14, 0.8, 1],
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Invalid branch */}
      <motion.g
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.42, 0.62, 0.18, 0.42],
                scale: [1, 1.03, 0.94, 1],
              }
        }
        transition={{ duration, delay: 0.15, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "338px 44px" }}
      >
        <circle cx="338" cy="44" r="7" fill={MUTED} opacity="0.16" />
        <circle cx="338" cy="44" r="3.1" fill={MUTED} opacity="0.72" />
        <path
          d="M 335.7 41.7 L 340.3 46.3 M 340.3 41.7 L 335.7 46.3"
          stroke={LIGHT}
          strokeOpacity="0.55"
          strokeWidth="0.75"
        />
      </motion.g>

      {/* Viable but unresolved branch */}
      <motion.g
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.48, 0.8, 0.48],
                scale: [0.98, 1.04, 0.98],
              }
        }
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "338px 30px" }}
      >
        <circle cx="338" cy="30" r="6.8" fill={COLOR} opacity="0.08" />
        <circle cx="338" cy="30" r="3" fill={COLOR} opacity="0.82" />
      </motion.g>

      {/* Insight/discovery */}
      <motion.g
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.54, 1, 0.54],
                scale: [0.94, 1.08, 0.94],
              }
        }
        transition={{ duration, delay: 0.28, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "350px 80px" }}
      >
        <path
          d="M 350 68 L 352.5 77.5 L 362 80 L 352.5 82.5 L 350 92 L 347.5 82.5 L 338 80 L 347.5 77.5 Z"
          fill={LIGHT}
          opacity="0.92"
          filter="url(#experiment-preview-glow)"
        />
      </motion.g>

      {/* Ambient uncertainty markers */}
      {[72, 102, 188, 278, 380].map((x, index) => (
        <motion.circle
          key={x}
          cx={x}
          cy={index % 2 === 0 ? 34 : 78}
          r={1.15}
          fill={COLOR}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.08, 0.28, 0.08],
                  y: [0, index % 2 === 0 ? -1 : 1, 0],
                }
          }
          transition={{
            duration,
            delay: index * 0.14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
