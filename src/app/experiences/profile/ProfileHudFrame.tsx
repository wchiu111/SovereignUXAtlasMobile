import type { CSSProperties, ReactNode } from "react";
import type { ProfileHotspotDefinition } from "./profileHotspots";
import {
  getNearestHudEdgePoint,
  getProfileHudAttachment,
  getProfileHudRect,
  isPointInsideHud,
} from "./profileHudLayout";
import { useProfileStage } from "./useProfileStage";

interface ProfileHudFrameProps {
  hotspot: ProfileHotspotDefinition;
  closing?: boolean;
  children: ReactNode;
  onClose: () => void;
}

export default function ProfileHudFrame({
  hotspot,
  closing = false,
  children,
  onClose,
}: ProfileHudFrameProps) {
  const { stageToScreen, viewportWidth, viewportHeight } = useProfileStage();
  const rect = getProfileHudRect(
    hotspot.id,
    viewportWidth,
    viewportHeight,
  );
  const origin = stageToScreen(hotspot);
  const originInsideHud = isPointInsideHud(origin, rect, 4);
  const attachment = originInsideHud
    ? getNearestHudEdgePoint(rect, origin, 54)
    : getProfileHudAttachment(hotspot.id, rect, origin);

  const localAttachment = {
    x: attachment.x - rect.left,
    y: attachment.y - rect.top,
  };

  return (
    <section
      style={{
        position: "absolute",
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        transform: `translateY(${closing ? "18px" : "0"}) scale(${
          closing ? 0.988 : 1
        })`,
        opacity: closing ? 0 : 1,
        color: "#F4EBD0",
        background: getSurface(hotspot.id),
        border: `1px solid ${hotspot.color}42`,
        boxShadow:
          "0 28px 90px rgba(0,0,0,0.42), inset 0 1px rgba(255,255,255,0.025)",
        overflow: "hidden",
        clipPath:
          "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
        transition:
          "opacity 300ms ease, transform 460ms cubic-bezier(0.16,1,0.3,1)",
        animation: closing
          ? "none"
          : "profileHudShellIn 720ms cubic-bezier(0.16,1,0.3,1) 240ms both",
      }}
    >
      <FrameGeometry
        hotspot={hotspot}
        closing={closing}
        attachment={localAttachment}
        originInsideHud={originInsideHud}
      />

      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "grid",
          gridTemplateRows: "auto minmax(0, 1fr)",
          height: "100%",
          minHeight: 0,
          opacity: closing ? 0 : 1,
          transform: `translateY(${closing ? 8 : 0}px)`,
          transition:
            "opacity 240ms ease, transform 340ms cubic-bezier(0.16,1,0.3,1)",
          animation: closing
            ? "none"
            : "profileHudContentIn 520ms ease-out 660ms both",
        }}
      >
        <PanelHeader hotspot={hotspot} onClose={onClose} />

        <div
          style={{
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            overscrollBehavior: "contain",
            scrollbarWidth: "thin",
            scrollbarColor: `${hotspot.color}52 transparent`,
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function FrameGeometry({
  hotspot,
  closing,
  attachment,
  originInsideHud,
}: {
  hotspot: ProfileHotspotDefinition;
  closing: boolean;
  attachment: { x: number; y: number };
  originInsideHud: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        opacity: closing ? 0 : 1,
        transition: "opacity 220ms ease",
      }}
    >
      <span style={{ ...corner, left: 0, top: 0, borderLeft: `1px solid ${hotspot.color}B0`, borderTop: `1px solid ${hotspot.color}B0` }} />
      <span style={{ ...corner, right: 0, top: 0, borderRight: `1px solid ${hotspot.color}B0`, borderTop: `1px solid ${hotspot.color}B0` }} />
      <span style={{ ...corner, left: 0, bottom: 0, borderLeft: `1px solid ${hotspot.color}B0`, borderBottom: `1px solid ${hotspot.color}B0` }} />
      <span style={{ ...corner, right: 0, bottom: 0, borderRight: `1px solid ${hotspot.color}B0`, borderBottom: `1px solid ${hotspot.color}B0` }} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage:
            `linear-gradient(${hotspot.color}1A 1px, transparent 1px), linear-gradient(90deg, ${hotspot.color}12 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.76), rgba(0,0,0,0.08) 68%, transparent)",
        }}
      />

      {hotspot.id === "contact" && !originInsideHud && (
        <span
          style={{
            position: "absolute",
            left: attachment.x,
            top: attachment.y,
            width: 10,
            height: 10,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: hotspot.color,
            border: "2px solid rgba(4,7,9,0.92)",
            boxShadow: `0 0 16px ${hotspot.color}9C`,
          }}
        />
      )}
    </div>
  );
}

function PanelHeader({
  hotspot,
  onClose,
}: {
  hotspot: ProfileHotspotDefinition;
  onClose: () => void;
}) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        minHeight: 92,
        padding: "20px 24px 18px",
        borderBottom: `1px solid ${hotspot.color}24`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.018), transparent)",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: `${hotspot.color}C8`,
          }}
        >
          {hotspot.eyebrow}
        </div>

        <h2
          style={{
            margin: "7px 0 0",
            fontFamily: "'EB Garamond', serif",
            fontSize: 31,
            lineHeight: 1,
            fontWeight: 500,
            letterSpacing: "0.01em",
            color: "rgba(255,248,229,0.96)",
          }}
        >
          {hotspot.id === "about" ? "About Wilson" : hotspot.label}
        </h2>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label={`Close ${hotspot.label}`}
        title="Close · Esc"
        style={{
          width: 44,
          height: 44,
          flexShrink: 0,
          borderRadius: 8,
          border: `1px solid ${hotspot.color}36`,
          background: "rgba(0,0,0,0.12)",
          color: "rgba(245,235,210,0.76)",
          fontFamily: "'DM Mono', monospace",
          fontSize: 18,
          cursor: "pointer",
          transition:
            "border-color 180ms ease, color 180ms ease, background 180ms ease",
        }}
      >
        ×
      </button>
    </header>
  );
}

function getSurface(id: ProfileHotspotDefinition["id"]) {
  if (id === "timeline") {
    return "linear-gradient(180deg, rgba(15,10,5,0.94), rgba(7,6,5,0.965))";
  }
  if (id === "contact") {
    return "linear-gradient(180deg, rgba(4,13,12,0.94), rgba(3,8,9,0.97))";
  }
  if (id === "about") {
    return "linear-gradient(180deg, rgba(5,10,19,0.95), rgba(3,7,13,0.97))";
  }
  return "linear-gradient(180deg, rgba(12,7,20,0.95), rgba(6,4,12,0.97))";
}

const corner: CSSProperties = {
  position: "absolute",
  width: 22,
  height: 22,
};
