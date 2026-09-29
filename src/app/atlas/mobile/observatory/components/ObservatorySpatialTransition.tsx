export const OBSERVATORY_SPATIAL_TRANSITION_DURATION = 1420;
export const OBSERVATORY_SPATIAL_EASE =
  "cubic-bezier(0.16,1,0.3,1)";

export type ObservatorySpatialDirection =
  | "toObservatory"
  | "toAtlas";

export function atlasSpatialAnimation(
  direction: ObservatorySpatialDirection | null,
) {
  if (direction === "toObservatory") {
    return `mobileAtlasPullIntoObservatory ${OBSERVATORY_SPATIAL_TRANSITION_DURATION}ms ${OBSERVATORY_SPATIAL_EASE} both`;
  }

  if (direction === "toAtlas") {
    return `mobileAtlasPushFromObservatory ${OBSERVATORY_SPATIAL_TRANSITION_DURATION}ms ${OBSERVATORY_SPATIAL_EASE} both`;
  }

  return undefined;
}

export function observatorySpatialAnimation(
  direction: ObservatorySpatialDirection | null,
) {
  if (direction === "toObservatory") {
    return `mobileObservatoryRoomResolve ${OBSERVATORY_SPATIAL_TRANSITION_DURATION}ms ${OBSERVATORY_SPATIAL_EASE} both`;
  }

  if (direction === "toAtlas") {
    return `mobileObservatoryRoomPushAway ${OBSERVATORY_SPATIAL_TRANSITION_DURATION}ms ${OBSERVATORY_SPATIAL_EASE} both`;
  }

  return undefined;
}

export default function ObservatorySpatialTransition({
  direction,
}: {
  direction: ObservatorySpatialDirection;
}) {
  return (
    <>
      <style>{`
        @keyframes mobileAtlasPullIntoObservatory {
          0% {
            transform: scale(var(--mobile-atlas-scene-scale, 1));
            clip-path: circle(150% at 50% 44%);
            filter: blur(0px) saturate(1);
            opacity: 1;
          }

          100% {
            transform: scale(calc(var(--mobile-atlas-scene-scale, 1) * 0.6));
            clip-path: circle(29% at 50% 44%);
            filter: blur(4px) saturate(0.76);
            opacity: 0;
          }
        }

        @keyframes mobileObservatoryRoomResolve {
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

        @keyframes mobileAtlasPushFromObservatory {
          0% {
            transform: scale(calc(var(--mobile-atlas-scene-scale, 1) * 0.6));
            clip-path: circle(29% at 50% 44%);
            filter: blur(4px) saturate(0.76);
            opacity: 0;
          }

          18% {
            opacity: 0.08;
          }

          100% {
            transform: scale(var(--mobile-atlas-scene-scale, 1));
            clip-path: circle(150% at 50% 44%);
            filter: blur(0px) saturate(1);
            opacity: 1;
          }
        }

        @keyframes mobileObservatoryRoomPushAway {
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

        @keyframes mobileAtlasWindowPush {
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

        @keyframes mobileAtlasSelectionPulse {
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

        @keyframes mobileAtlasPushEdgeFade {
          0% { opacity: 0; }
          24% { opacity: 0.38; }
          100% { opacity: 0; }
        }

        @keyframes mobileObservatoryLensResolve {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.28);
          }

          55% { opacity: 0.34; }

          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.96);
          }
        }

        @keyframes mobileObservatoryEdgeResolve {
          0% { opacity: 0; }
          52% { opacity: 0.32; }
          100% { opacity: 0; }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 60,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {direction === "toObservatory" ? (
          <>
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
                animation: `mobileObservatoryLensResolve ${OBSERVATORY_SPATIAL_TRANSITION_DURATION}ms ${OBSERVATORY_SPATIAL_EASE} both`,
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 50% 44%, transparent 20%, rgba(2,3,8,0.08) 45%, rgba(2,3,8,0.56) 100%)",
                animation: `mobileObservatoryEdgeResolve ${OBSERVATORY_SPATIAL_TRANSITION_DURATION}ms ease-out both`,
              }}
            />
          </>
        ) : (
          <>
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
                animation: `mobileAtlasWindowPush ${OBSERVATORY_SPATIAL_TRANSITION_DURATION}ms ${OBSERVATORY_SPATIAL_EASE} both`,
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "44%",
                width: 112,
                height: 112,
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, rgba(245,208,84,0.52) 0%, rgba(245,208,84,0.18) 32%, rgba(245,208,84,0) 72%)",
                boxShadow:
                  "0 0 42px rgba(245,208,84,0.24), 0 0 120px rgba(245,208,84,0.12)",
                animation:
                  "mobileAtlasSelectionPulse 520ms cubic-bezier(0.16,1,0.3,1) both",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 50% 44%, transparent 18%, rgba(2,3,8,0.06) 44%, rgba(2,3,8,0.5) 100%)",
                animation: `mobileAtlasPushEdgeFade ${OBSERVATORY_SPATIAL_TRANSITION_DURATION}ms ease-out both`,
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
