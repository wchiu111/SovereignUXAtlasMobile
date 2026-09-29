import { T } from "../../components/mobileShared";
import type { ObservatoryHotspotDefinition } from "../observatoryTypes";

const LABEL_WIDTH = 140;

export default function ObservatoryHotspot({
  hotspot,
  selected,
  subdued,
  disabled,
  onSelect,
}: {
  hotspot: ObservatoryHotspotDefinition;
  selected: boolean;
  subdued: boolean;
  disabled: boolean;
  onSelect: () => void;
}) {
  const buttonLeft = hotspot.x - 26;
  const buttonTop = hotspot.y - 26;
  const labelLocalX = hotspot.labelX - buttonLeft;
  const labelLocalY = hotspot.labelY - buttonTop;

  const labelTransform =
    hotspot.align === "center"
      ? "translateX(-50%)"
      : hotspot.align === "right"
      ? "translateX(-100%)"
      : undefined;

  const textAlign =
    hotspot.align === "center"
      ? "center"
      : hotspot.align === "right"
      ? "right"
      : "left";

  const backdropCenterX =
    hotspot.align === "center"
      ? 26
      : hotspot.align === "right"
      ? labelLocalX - LABEL_WIDTH * 0.28
      : labelLocalX + LABEL_WIDTH * 0.28;

  const backdropCenterY = 26 + (labelLocalY - 26) * 0.22;
  const backdropWidth = hotspot.align === "center" ? 150 : 164;
  const backdropHeight = 78;

  return (
    <button
      type="button"
      data-observatory-hotspot={hotspot.id}
      aria-label={`${hotspot.label}. ${hotspot.description}`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onSelect}
      className="observatory-mobile-focusable"
      style={{
        position: "absolute",
        left: buttonLeft,
        top: buttonTop,
        width: 52,
        height: 52,
        border: 0,
        padding: 0,
        borderRadius: "50%",
        background: "transparent",
        cursor: disabled ? "default" : "pointer",
        opacity: subdued ? 0.42 : 1,
        transform:
          selected && hotspot.id === "about"
            ? "translateY(-20px)"
            : "translateY(0)",
        transition:
          "transform 280ms cubic-bezier(0.22,1,0.36,1), opacity 240ms ease, filter 240ms ease",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: backdropCenterX,
          top: backdropCenterY,
          width: backdropWidth,
          height: backdropHeight,
          transform: "translate(-50%, -50%)",
          borderRadius: 999,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.16) 45%, rgba(0,0,0,0.08) 62%, rgba(0,0,0,0) 78%)",
          opacity: selected ? 0.96 : 0.9,
          pointerEvents: "none",
          transition: "opacity 240ms ease",
        }}
      />

      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: selected ? 42 : 34,
          height: selected ? 42 : 34,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: `0.75px solid ${hotspot.color}${
            selected ? "B5" : "66"
          }`,
          boxShadow: selected
            ? `0 0 16px ${hotspot.color}45, inset 0 0 10px ${hotspot.color}1C`
            : `0 0 10px ${hotspot.color}18`,
          transition: "all 280ms ease",
        }}
      />

      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: selected ? 10 : 8,
          height: selected ? 10 : 8,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: hotspot.color,
          boxShadow: `0 0 9px ${hotspot.color}CC, 0 0 20px ${hotspot.color}55`,
          animation: selected
            ? "observatoryMobileSelectedCore 2.8s ease-in-out infinite"
            : "observatoryMobileIdleCore 5.6s ease-in-out infinite",
        }}
      />

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: labelLocalX,
          top: labelLocalY,
          width: LABEL_WIDTH,
          transform: labelTransform,
          fontFamily: T.mono,
          fontSize: 12,
          lineHeight: 1.25,
          letterSpacing: "0.14em",
          textAlign,
          color: selected ? hotspot.color : T.body,
          opacity: selected ? 0.98 : 0.72,
          textShadow: "0 1px 8px rgba(0,0,0,0.92)",
          pointerEvents: "none",
          transition: "color 240ms ease, opacity 240ms ease",
          whiteSpace: "nowrap",
        }}
      >
        {hotspot.label}
      </span>
    </button>
  );
}
