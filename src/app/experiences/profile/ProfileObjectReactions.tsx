import type { ProfileHotspotId } from "./profileHotspots";

interface ProfileObjectReactionsProps {
  active: ProfileHotspotId | null;
}

const atlasNodes = [
  [753, 218, 0],
  [820, 183, 120],
  [872, 238, 230],
  [944, 203, 340],
  [1023, 263, 450],
  [831, 293, 560],
  [768, 327, 670],
] as const;

export default function ProfileObjectReactions({
  active,
}: ProfileObjectReactionsProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 619,
          top: 79,
          width: 523,
          height: 337,
          borderRadius: "50%",
          opacity: active === "atlas" ? 1 : 0,
          background:
            "radial-gradient(circle, rgba(232,200,109,0.085), transparent 68%)",
          mixBlendMode: "screen",
          filter: "blur(3px)",
          transition: "opacity 520ms ease",
          animation:
            active === "atlas"
              ? "profileAtlasFieldWake 3000ms ease-in-out infinite"
              : "none",
        }}
      />

      <svg
        viewBox="0 0 1586 992"
        style={{
          position: "absolute",
          inset: 0,
          width: 1586,
          height: 992,
          overflow: "visible",
          opacity: active === "atlas" ? 1 : 0,
          transition: "opacity 420ms ease",
        }}
      >
        <g
          fill="none"
          stroke="rgba(232,200,109,0.30)"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M753 218 L820 183 L872 238"
            pathLength="1"
            style={{
              strokeDasharray: 1,
              filter: "drop-shadow(0 0 2px rgba(232,200,109,0.34))",
              animation:
                active === "atlas"
                  ? "profileAtlasPathPulseA 3200ms cubic-bezier(0.22,1,0.36,1) 80ms infinite"
                  : "none",
            }}
          />
          <path
            d="M872 238 L944 203 L1023 263"
            pathLength="1"
            style={{
              strokeDasharray: 1,
              filter: "drop-shadow(0 0 2px rgba(232,200,109,0.30))",
              animation:
                active === "atlas"
                  ? "profileAtlasPathPulseB 3200ms cubic-bezier(0.22,1,0.36,1) 210ms infinite"
                  : "none",
            }}
          />
          <path
            d="M872 238 L831 293 L768 327"
            pathLength="1"
            style={{
              strokeDasharray: 1,
              filter: "drop-shadow(0 0 2px rgba(232,200,109,0.28))",
              animation:
                active === "atlas"
                  ? "profileAtlasPathPulseC 3200ms cubic-bezier(0.22,1,0.36,1) 330ms infinite"
                  : "none",
            }}
          />
        </g>
      </svg>

      {atlasNodes.map(([x, y, delay]) => (
        <span
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "rgba(232,200,109,0.88)",
            boxShadow:
              "0 0 7px rgba(232,200,109,0.72), 0 0 16px rgba(232,200,109,0.28)",
            opacity: active === "atlas" ? 1 : 0,
            transform: "translate(-50%, -50%)",
            animation:
              active === "atlas"
                ? `profileAtlasNodeReveal 1800ms ease-in-out ${delay}ms infinite`
                : "none",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          left: 111,
          top: 615,
          width: 381,
          height: 278,
          opacity: active === "timeline" ? 1 : 0,
          background:
            "radial-gradient(ellipse at 38% 62%, rgba(244,181,88,0.20), transparent 55%)",
          mixBlendMode: "screen",
          filter: "blur(2px)",
          transition: "opacity 340ms ease",
          animation:
            active === "timeline"
              ? "profileNotebookWarmth 2600ms ease-in-out infinite"
              : "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 167,
          top: 766,
          width: 190,
          height: 2,
          opacity: active === "timeline" ? 1 : 0,
          transformOrigin: "left center",
          background:
            "linear-gradient(90deg, rgba(232,200,109,0), rgba(232,200,109,0.92), rgba(232,200,109,0))",
          boxShadow: "0 0 12px rgba(232,200,109,0.58)",
          transition: "opacity 240ms ease",
          animation:
            active === "timeline"
              ? "profileNotebookScan 1500ms ease-in-out infinite"
              : "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 603,
          top: 655,
          width: 412,
          height: 218,
          opacity: active === "contact" ? 1 : 0,
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(116,201,155,0.16), transparent 58%)",
          mixBlendMode: "screen",
          transition: "opacity 320ms ease",
          animation:
            active === "contact"
              ? "profileConsoleWake 1800ms ease-in-out infinite"
              : "none",
        }}
      />

      {active === "contact" && (
        <>
          <span style={{ ...consoleLed, left: 758, top: 746, animationDelay: "0ms" }} />
          <span style={{ ...consoleLed, left: 796, top: 754, animationDelay: "240ms" }} />
          <span style={{ ...consoleLed, left: 834, top: 741, animationDelay: "480ms" }} />
          <span
            style={{
              position: "absolute",
              left: 809,
              top: 754,
              width: 104,
              height: 104,
              borderRadius: "50%",
              border: "1px solid rgba(116,201,155,0.44)",
              transform: "translate(-50%, -50%)",
              animation: "profileConsoleSignal 1900ms ease-out infinite",
            }}
          />
        </>
      )}



    </div>
  );
}

const consoleLed: React.CSSProperties = {
  position: "absolute",
  width: 4,
  height: 4,
  borderRadius: "50%",
  background: "#74C99B",
  boxShadow: "0 0 10px rgba(116,201,155,0.9)",
  animation: "profileConsoleLed 1100ms ease-in-out infinite",
};
