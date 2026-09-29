import { motion, useReducedMotion } from "motion/react";

const COLOR = "#8CC8EE";
const LIGHT = "#D9F0FF";

export default function CaseStudyPreview() {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0.01 : 3.8;

  const mainPath =
    "M 18 66 C 58 66, 72 38, 112 42 " +
    "S 174 72, 214 58 " +
    "S 286 34, 328 52 " +
    "S 372 66, 404 56";

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
          id="case-study-glow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Secondary evidence relationships */}
      <path
        d="M 28 30 C 64 34, 72 48, 112 42"
        fill="none"
        stroke={COLOR}
        strokeWidth="0.7"
        strokeOpacity="0.24"
      />

      <path
        d="M 54 88 C 82 82, 88 60, 112 42"
        fill="none"
        stroke={COLOR}
        strokeWidth="0.7"
        strokeOpacity="0.2"
      />

      <path
        d="M 172 28 C 192 34, 202 46, 214 58"
        fill="none"
        stroke={COLOR}
        strokeWidth="0.7"
        strokeOpacity="0.2"
      />

      {/* Main evidence journey */}
      <path
        d={mainPath}
        fill="none"
        stroke={COLOR}
        strokeWidth="1"
        strokeOpacity="0.38"
        strokeLinecap="round"
      />

      {/* Moving signal */}
      <motion.path
        d={mainPath}
        fill="none"
        stroke={LIGHT}
        strokeWidth="2.4"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="0.11 0.89"
        initial={{ strokeDashoffset: 0.98, opacity: 0 }}
        animate={
          reduceMotion
            ? { opacity: 0 }
            : {
                strokeDashoffset: [0.98, -0.12],
                opacity: [0, 0.9, 0.9, 0],
              }
        }
        transition={{
          duration,
          times: [0, 0.12, 0.84, 1],
          repeat: Infinity,
          ease: "linear",
        }}
        filter="url(#case-study-glow)"
      />

      {/* Evidence card 1 */}
      <g>
        <rect
          x="18"
          y="22"
          width="20"
          height="18"
          rx="2.5"
          fill="rgba(140,200,238,0.07)"
          stroke={COLOR}
          strokeOpacity="0.62"
          strokeWidth="0.8"
        />
        <line
          x1="23"
          y1="28"
          x2="33"
          y2="28"
          stroke={LIGHT}
          strokeOpacity="0.55"
          strokeWidth="0.7"
        />
        <line
          x1="23"
          y1="33"
          x2="31"
          y2="33"
          stroke={COLOR}
          strokeOpacity="0.36"
          strokeWidth="0.6"
        />
      </g>

      {/* Evidence card 2 */}
      <g>
        <rect
          x="44"
          y="80"
          width="20"
          height="18"
          rx="2.5"
          fill="rgba(140,200,238,0.06)"
          stroke={COLOR}
          strokeOpacity="0.52"
          strokeWidth="0.8"
        />
        <line
          x1="49"
          y1="86"
          x2="59"
          y2="86"
          stroke={LIGHT}
          strokeOpacity="0.48"
          strokeWidth="0.7"
        />
        <line
          x1="49"
          y1="91"
          x2="57"
          y2="91"
          stroke={COLOR}
          strokeOpacity="0.32"
          strokeWidth="0.6"
        />
      </g>

      {/* First synthesis node */}
      <circle
        cx="112"
        cy="42"
        r="9"
        fill={COLOR}
        opacity="0.08"
      />
      <circle
        cx="112"
        cy="42"
        r="4"
        fill={COLOR}
        opacity="0.9"
        filter="url(#case-study-glow)"
      />

      {/* Evidence card 3 */}
      <g>
        <rect
          x="162"
          y="18"
          width="20"
          height="18"
          rx="2.5"
          fill="rgba(140,200,238,0.06)"
          stroke={COLOR}
          strokeOpacity="0.5"
          strokeWidth="0.8"
        />
        <line
          x1="167"
          y1="24"
          x2="177"
          y2="24"
          stroke={LIGHT}
          strokeOpacity="0.48"
          strokeWidth="0.7"
        />
        <line
          x1="167"
          y1="29"
          x2="175"
          y2="29"
          stroke={COLOR}
          strokeOpacity="0.3"
          strokeWidth="0.6"
        />
      </g>

      {/* Decision point */}
      <motion.g
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [0.98, 1.05, 0.98],
                opacity: [0.72, 1, 0.72],
              }
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "214px 58px" }}
      >
        <rect
          x="207"
          y="51"
          width="14"
          height="14"
          rx="1.5"
          transform="rotate(45 214 58)"
          fill="rgba(217,240,255,0.06)"
          stroke={LIGHT}
          strokeOpacity="0.7"
          strokeWidth="0.85"
        />
      </motion.g>

      {/* Supporting nodes */}
      <circle cx="278" cy="40" r="2.5" fill={COLOR} opacity="0.62" />
      <circle cx="304" cy="70" r="2.2" fill={COLOR} opacity="0.42" />

      {/* Outcome */}
      <motion.g
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [0.98, 1.07, 0.98],
                opacity: [0.75, 1, 0.75],
              }
        }
        transition={{
          duration,
          delay: 0.25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "404px 56px" }}
      >
        <circle
          cx="404"
          cy="56"
          r="19"
          fill={COLOR}
          opacity="0.045"
        />
        <circle
          cx="404"
          cy="56"
          r="11"
          fill="none"
          stroke={COLOR}
          strokeOpacity="0.48"
          strokeWidth="0.9"
        />
        <circle
          cx="404"
          cy="56"
          r="5"
          fill={LIGHT}
          opacity="0.96"
          filter="url(#case-study-glow)"
        />
      </motion.g>
    </svg>
  );
}