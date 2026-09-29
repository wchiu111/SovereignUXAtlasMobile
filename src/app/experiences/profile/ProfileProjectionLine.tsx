import type { ProfileHotspotDefinition } from "./profileHotspots";
import {
  getProfileHudAttachment,
  getProfileHudRect,
  isPointInsideHud,
} from "./profileHudLayout";
import { useProfileStage } from "./useProfileStage";

interface ProfileProjectionLineProps {
  hotspot: ProfileHotspotDefinition;
  closing?: boolean;
}

export default function ProfileProjectionLine({
  hotspot,
  closing = false,
}: ProfileProjectionLineProps) {
  const { stageToScreen, viewportWidth, viewportHeight } = useProfileStage();
  const start = stageToScreen(hotspot);
  const rect = getProfileHudRect(
    hotspot.id,
    viewportWidth,
    viewportHeight,
  );
  const target = getProfileHudAttachment(hotspot.id, rect, start);
  const originInsideHud = isPointInsideHud(start, rect, 4);

  if (originInsideHud) {
    return null;
  }

  const elbow = {
    x: Math.max(start.x + 44, target.x - 46),
    y: start.y - 12,
  };

  const path = `M ${start.x} ${start.y} L ${elbow.x} ${elbow.y} L ${target.x} ${target.y}`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 21,
        pointerEvents: "none",
        opacity: closing ? 0 : 1,
        transition: "opacity 260ms ease",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewportWidth} ${viewportHeight}`}
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
        }}
      >
        <path
          d={path}
          fill="none"
          stroke={`${hotspot.color}2E`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          style={{
            filter: `drop-shadow(0 0 8px ${hotspot.color}2A)`,
            opacity: closing ? 0 : 1,
          }}
        />

        <path
          d={path}
          fill="none"
          stroke={`${hotspot.color}C8`}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={closing ? 1 : 0}
          style={{
            filter: `drop-shadow(0 0 5px ${hotspot.color}72)`,
            transition:
              "stroke-dashoffset 620ms cubic-bezier(0.22,1,0.36,1) 160ms",
          }}
        />

        {[0, 1, 2].map((packet) => (
          <circle
            key={packet}
            r={packet === 0 ? 3.2 : 2.4}
            fill="rgba(181,255,220,0.96)"
            style={{
              filter:
                "drop-shadow(0 0 6px rgba(116,201,155,0.92)) drop-shadow(0 0 14px rgba(116,201,155,0.48))",
              opacity: closing ? 0 : 1,
            }}
          >
            <animateMotion
              dur={`${2.8 + packet * 0.45}s`}
              begin={`${0.55 + packet * 0.72}s`}
              repeatCount="indefinite"
              path={path}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.12;0.82;1"
              dur={`${2.8 + packet * 0.45}s`}
              begin={`${0.55 + packet * 0.72}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      <span
        style={{
          position: "absolute",
          left: start.x,
          top: start.y,
          width: 15,
          height: 15,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: `${hotspot.color}20`,
          border: `1px solid ${hotspot.color}B8`,
          boxShadow: `0 0 22px ${hotspot.color}78`,
          animation: closing
            ? "profileProjectionEmitterOut 260ms ease forwards"
            : "profileProjectionEmitterIn 480ms ease-out both",
        }}
      />
    </div>
  );
}
