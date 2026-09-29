import { useEffect, useRef, useState } from "react";
import AtlasExplorer from "../atlas/AtlasExplorer";
import ProfileExperience from "./ProfileExperience";
import type { SovereignMode } from "./sovereignExperience.types";

type SpatialTransition = "toObservatory" | "toAtlas" | null;

const SPATIAL_TRANSITION_DURATION = 1420;

export default function SovereignExperience() {
  const [mode, setMode] = useState<SovereignMode>("atlas");
  const [spatialTransition, setSpatialTransition] =
    useState<SpatialTransition>(null);
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const clearTransitionTimer = () => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  };

  const completeSpatialTransition = () => {
    clearTransitionTimer();

    transitionTimerRef.current = window.setTimeout(() => {
      setSpatialTransition(null);
      transitionTimerRef.current = null;
    }, SPATIAL_TRANSITION_DURATION);
  };

  const enterObservatory = () => {
    if (spatialTransition) return;

    setSpatialTransition("toObservatory");
    setMode("profile");
    completeSpatialTransition();
  };

  const returnToAtlas = () => {
    if (spatialTransition) return;

    setSpatialTransition("toAtlas");
    setMode("atlas");
    completeSpatialTransition();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: "#05050A",
      }}
    >
      {(mode === "profile" || spatialTransition !== null) && (
        <div
          aria-hidden={mode !== "profile"}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: spatialTransition === "toAtlas" ? 3 : 1,
            pointerEvents:
              mode === "profile" && !spatialTransition ? "auto" : "none",
            transformOrigin: "50% 44%",
            willChange: "transform, filter, opacity",
            animation:
              spatialTransition === "toObservatory"
                ? "observatoryRoomResolve 1420ms cubic-bezier(0.16,1,0.3,1) both"
                : spatialTransition === "toAtlas"
                  ? "observatoryRoomPushAway 1420ms cubic-bezier(0.16,1,0.3,1) both"
                  : undefined,
          }}
        >
          <ProfileExperience
            onReturnToAtlas={returnToAtlas}
          />
        </div>
      )}

      <div
        aria-hidden={mode !== "atlas"}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: spatialTransition === "toAtlas" ? 2 : 3,
          visibility:
            mode === "atlas" || spatialTransition !== null
              ? "visible"
              : "hidden",
          pointerEvents:
            mode === "atlas" && !spatialTransition ? "auto" : "none",
          transformOrigin: "50% 44%",
          willChange: "transform, clip-path, filter, opacity",
          animation:
            spatialTransition === "toObservatory"
              ? "atlasPullIntoObservatory 1420ms cubic-bezier(0.16,1,0.3,1) both"
              : spatialTransition === "toAtlas"
                ? "atlasPushFromObservatory 1420ms cubic-bezier(0.16,1,0.3,1) both"
                : undefined,
        }}
      >
        <AtlasExplorer
          active={mode === "atlas" && !spatialTransition}
          onEnterObservatory={enterObservatory}
        />
      </div>

      {spatialTransition === "toObservatory" && (
        <ObservatoryPullbackOverlay />
      )}

      {spatialTransition === "toAtlas" && <AtlasPushInOverlay />}

      <style>{`
        [aria-label="Profile destinations"] button:nth-child(2),
        [aria-label="Profile destinations"] button:nth-child(3) {
          display: none;
        }

        [aria-label="Profile destinations"] button:first-child {
          font-size: 0;
        }

        [aria-label="Profile destinations"] button:first-child::after {
          content: "Return to Atlas";
          font-size: 8px;
        }

        @keyframes atlasPullIntoObservatory {
          0% {
            transform: scale(1);
            clip-path: circle(150% at 50% 44%);
            filter: blur(0px) saturate(1);
            opacity: 1;
          }

          100% {
            transform: scale(0.6);
            clip-path: circle(29% at 50% 44%);
            filter: blur(4px) saturate(0.76);
            opacity: 0;
          }
        }

        @keyframes observatoryRoomResolve {
          0% {
            transform: scale(1.04);
            filter: blur(7px);
            opacity: 0;
          }

          100% {
            transform: scale(1);
            filter: blur(0px);
            opacity: 1;
          }
        }

        @keyframes atlasPushFromObservatory {
          0% {
            transform: scale(0.6);
            clip-path: circle(29% at 50% 44%);
            filter: blur(4px) saturate(0.76);
            opacity: 0;
          }

          18% {
            opacity: 0.08;
          }

          100% {
            transform: scale(1);
            clip-path: circle(150% at 50% 44%);
            filter: blur(0px) saturate(1);
            opacity: 1;
          }
        }

        @keyframes observatoryRoomPushAway {
          0% {
            transform: scale(1);
            filter: blur(0px);
            opacity: 1;
          }

          100% {
            transform: scale(1.085);
            filter: blur(7px);
            opacity: 0;
          }
        }

        @keyframes atlasWindowPush {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.94);
          }

          18% {
            opacity: 0.72;
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2.45);
          }
        }

        @keyframes atlasSelectionPulse {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.62);
          }

          10% {
            opacity: 0.88;
          }

          28% {
            opacity: 0.48;
            transform: translate(-50%, -50%) scale(1.15);
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2.6);
          }
        }

        @keyframes atlasPushEdgeFade {
          0% {
            opacity: 0;
          }

          24% {
            opacity: 0.38;
          }

          100% {
            opacity: 0;
          }
        }

        @keyframes observatoryLensResolve {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.28);
          }

          55% {
            opacity: 0.34;
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.96);
          }
        }

        @keyframes observatoryEdgeResolve {
          0% {
            opacity: 0;
          }

          52% {
            opacity: 0.32;
          }

          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function ObservatoryPullbackOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 4,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          width: "68vmin",
          height: "68vmin",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(232,200,109,0.2)",
          boxShadow:
            "0 0 0 3px rgba(2,4,8,0.22), 0 0 90px rgba(2,4,8,0.74), inset 0 0 90px rgba(2,4,8,0.18)",
          background:
            "radial-gradient(circle, transparent 58%, rgba(2,4,8,0.2) 76%, rgba(2,4,8,0.58) 100%)",
          animation:
            "observatoryLensResolve 1420ms cubic-bezier(0.16,1,0.3,1) both",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 44%, transparent 20%, rgba(2,3,8,0.08) 45%, rgba(2,3,8,0.56) 100%)",
          animation: "observatoryEdgeResolve 1420ms ease-out both",
        }}
      />
    </div>
  );
}

function AtlasPushInOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 4,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          width: "68vmin",
          height: "68vmin",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(232,200,109,0.24)",
          boxShadow:
            "0 0 0 3px rgba(2,4,8,0.2), 0 0 110px rgba(232,200,109,0.12), inset 0 0 90px rgba(2,4,8,0.16)",
          background:
            "radial-gradient(circle, transparent 55%, rgba(2,4,8,0.16) 74%, rgba(2,4,8,0.5) 100%)",
          animation:
            "atlasWindowPush 1420ms cubic-bezier(0.16,1,0.3,1) both",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          width: "112px",
          height: "112px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(245,208,84,0.52) 0%, rgba(245,208,84,0.18) 32%, rgba(245,208,84,0) 72%)",
          boxShadow:
            "0 0 42px rgba(245,208,84,0.24), 0 0 120px rgba(245,208,84,0.12)",
          animation:
            "atlasSelectionPulse 520ms cubic-bezier(0.16,1,0.3,1) both",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 44%, transparent 18%, rgba(2,3,8,0.06) 44%, rgba(2,3,8,0.5) 100%)",
          animation: "atlasPushEdgeFade 1420ms ease-out both",
        }}
      />
    </div>
  );
}
