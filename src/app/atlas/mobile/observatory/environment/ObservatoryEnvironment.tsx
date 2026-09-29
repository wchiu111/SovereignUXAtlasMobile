import type { ReactNode } from "react";
import observatoryBackground from "@/assets/observatory-mobile.jpg";
import type { ObservatoryCameraTarget } from "../observatoryTypes";
import ObservatoryAmbientLayer from "./ObservatoryAmbientLayer";

export default function ObservatoryEnvironment({
  camera,
  reducedMotion,
  paused = false,
  selected = false,
  presentationScale,
  children,
}: {
  camera: ObservatoryCameraTarget;
  reducedMotion: boolean;
  paused?: boolean;
  selected?: boolean;
  presentationScale: number;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#04060A",
      }}
    >
      <style>{`
        @keyframes observatoryRoomBreath {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          34% {
            transform: translate3d(0, -2.6px, 0) scale(1.007);
          }
          68% {
            transform: translate3d(1.4px, -0.8px, 0) scale(1.0035);
          }
        }

        @keyframes observatoryRoomLightBreathe {
          0%, 100% { opacity: 0.26; }
          45% { opacity: 0.52; }
          74% { opacity: 0.34; }
        }

        @media (prefers-reduced-motion: reduce) {
          .observatory-mobile-room-breathe,
          .observatory-mobile-room-light {
            animation: none !important;
          }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate3d(${camera.translateX}px, ${camera.translateY}px, 0) scale(${camera.scale})`,
          transformOrigin: "50% 48%",
          transition: reducedMotion
            ? "opacity 160ms ease"
            : "transform 1280ms cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
        }}
      >
        <div
          className="observatory-mobile-room-breathe"
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "50% 48%",
            animation:
              "observatoryRoomBreath 12.8s ease-in-out infinite",
            animationPlayState:
              paused || reducedMotion ? "paused" : "running",
            willChange: "transform",
          }}
        >
          <img
            src={observatoryBackground}
            alt=""
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
              userSelect: "none",
              pointerEvents: "none",
              filter: selected
                ? "brightness(0.79) saturate(0.82) contrast(1.045) hue-rotate(-3deg)"
                : "brightness(0.84) saturate(0.86) contrast(1.04) hue-rotate(-3deg)",
              transition:
                "filter 460ms cubic-bezier(0.16,1,0.3,1)",
            }}
          />

          {/* Keep the astral treatment, but let the background art remain visible. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(2,4,10,0.035), rgba(2,4,10,0.008) 34%, rgba(2,4,10,0.085) 100%), radial-gradient(circle at 50% 17%, rgba(80,96,150,0.12), transparent 46%), radial-gradient(circle at 50% 64%, transparent 42%, rgba(1,3,8,0.08) 94%)",
              pointerEvents: "none",
            }}
          />

          <div
            aria-hidden="true"
            className="observatory-mobile-room-light"
            style={{
              position: "absolute",
              left: "50%",
              top: "34%",
              width: 420,
              height: 560,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(92,119,184,0.12), rgba(64,83,142,0.045) 43%, transparent 72%)",
              mixBlendMode: "screen",
              filter: "blur(18px)",
              animation:
                "observatoryRoomLightBreathe 10.5s ease-in-out -2.3s infinite",
              animationPlayState:
                paused || reducedMotion ? "paused" : "running",
              pointerEvents: "none",
            }}
          />

          <ObservatoryAmbientLayer paused={paused} />

          {/* Selection should focus attention without crushing the room into black. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(circle at 50% 52%, transparent 38%, rgba(2,4,10,0.045) 88%)",
              opacity: selected ? 1 : 0,
              transition:
                "opacity 400ms cubic-bezier(0.16,1,0.3,1)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 390,
              height: 844,
              transform: `translate(-50%, -50%) scale(${presentationScale})`,
              transformOrigin: "center center",
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Softer edge treatment than v1 so the room does not read as a dark overlay. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(2,3,8,0.08), transparent 14%, transparent 80%, rgba(2,3,8,0.18)), radial-gradient(ellipse at center, transparent 58%, rgba(2,3,8,0.09) 100%)",
        }}
      />
    </div>
  );
}
