import type { FocusTransition } from "../../types/atlas";

export const FOCUS_TRANSITION_DURATION = 760;
export const REDUCED_FOCUS_TRANSITION_DURATION = 180;

export default function FocusPullTransition({
  transition,
  reducedMotion = false,
}: {
  transition: FocusTransition;
  reducedMotion?: boolean;
}) {
  const duration = reducedMotion
    ? REDUCED_FOCUS_TRANSITION_DURATION
    : FOCUS_TRANSITION_DURATION;
  const easing = "cubic-bezier(0.16,1,0.3,1)";

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 44,
        overflow: "hidden",
        background: "rgba(3,4,10,0)",
        animation: `atlasFocusVeil ${duration}ms ${easing} forwards`,
      }}
    >
      <style>{`
        @keyframes atlasFocusVeil {
          0% {
            background: rgba(3,4,10,0);
            backdrop-filter: blur(0px);
          }
          42% {
            background: rgba(3,4,10,0.26);
            backdrop-filter: blur(2px);
          }
          100% {
            background: rgba(3,4,10,0.96);
            backdrop-filter: blur(10px);
          }
        }

        @keyframes atlasFocusBloom {
          0% {
            width: 42px;
            height: 42px;
            opacity: 0.75;
            transform: translate(-50%, -50%) scale(1);
          }
          46% {
            width: 220px;
            height: 220px;
            opacity: 0.88;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            width: 260vmax;
            height: 260vmax;
            opacity: 0.32;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes atlasFocusCore {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          52% {
            opacity: 0.92;
            transform: translate(-50%, -50%) scale(2.2);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(6);
          }
        }

        @keyframes atlasFocusLabel {
          0% {
            opacity: 0;
            transform: translate(-50%, 14px);
            letter-spacing: 0.26em;
          }
          26% {
            opacity: 0.86;
            transform: translate(-50%, 0);
          }
          68% {
            opacity: 0.72;
            transform: translate(-50%, -8px);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -22px);
            letter-spacing: 0.42em;
          }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          left: transition.x,
          top: transition.y,
          borderRadius: "9999px",
          background: `radial-gradient(circle,
            ${transition.color}CC 0%,
            ${transition.color}55 28%,
            ${transition.color}18 54%,
            rgba(3,4,10,0) 72%)`,
          boxShadow: `0 0 38px ${transition.color}55, 0 0 120px ${transition.color}22`,
          animation: `atlasFocusBloom ${duration}ms ${easing} forwards`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: transition.x,
          top: transition.y,
          width: 16,
          height: 16,
          borderRadius: "9999px",
          background: transition.color,
          boxShadow: `0 0 24px ${transition.color}AA, 0 0 80px ${transition.color}55`,
          animation: `atlasFocusCore ${duration}ms ${easing} forwards`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: transition.x,
          top: transition.y + 48,
          fontFamily: "'DM Mono',monospace",
          fontSize: 9,
          letterSpacing: "0.30em",
          color: transition.color,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          textShadow: `0 0 22px ${transition.color}55`,
          animation: `atlasFocusLabel ${duration}ms ${easing} forwards`,
        }}
      >
        Entering {transition.label}
      </div>
    </div>
  );
}

// ─── Focused Overview ──────────────────────────────────────────────────────
