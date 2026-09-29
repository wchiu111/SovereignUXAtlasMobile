import { T } from "../../components/mobileShared";
import { FRAMEWORK_PARENT_CORE } from "../frameworkGeometry";
import { FRAMEWORK_POSITION_TRANSITION } from "../frameworkMotion";

export default function FrameworkParent({
  selected,
  selectionPulse,
  ambientPaused,
  focusOpacity = 1,
  interactive = true,
  onSelect,
}: {
  selected: boolean;
  selectionPulse: boolean;
  ambientPaused: boolean;
  focusOpacity?: number;
  interactive?: boolean;
  onSelect: () => void;
}) {
  const activate = () => {
    if (interactive) onSelect();
  };

  const animationPlayState =
    ambientPaused || selectionPulse ? "paused" : "running";

  return (
    <g
      role="button"
      tabIndex={interactive ? 0 : -1}
      aria-label="Frameworks"
      aria-pressed={selected}
      aria-disabled={!interactive}
      onClick={activate}
      onKeyDown={(event) => {
        if (
          interactive &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          activate();
        }
      }}
      style={{
        transform: `translate(${FRAMEWORK_PARENT_CORE.x}px,${FRAMEWORK_PARENT_CORE.y}px)`,
        transformOrigin: `${FRAMEWORK_PARENT_CORE.x}px ${FRAMEWORK_PARENT_CORE.y}px`,
        transition: FRAMEWORK_POSITION_TRANSITION,
        cursor: interactive ? "pointer" : "default",
        opacity: focusOpacity,
        outline: "none",
        pointerEvents: interactive ? "auto" : "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <g
        className={selectionPulse ? "framework-selection-pulse" : undefined}
        style={{
          animationPlayState: selectionPulse ? "running" : "paused",
        }}
      >
        <g
          className="framework-parent-atmosphere"
          style={{
            animationDelay: "-1.4s",
            animationPlayState,
          }}
        >
          <circle
            r={selected ? 74 : 62}
            fill={T.frameworks}
            opacity={selected ? 0.10 : 0.035}
            pointerEvents="none"
          />
          <circle
            r={selected ? 48 : 42}
            fill={T.frameworks}
            opacity={selected ? 0.18 : 0.065}
            pointerEvents="none"
          />
        </g>

        <g
          className="framework-parent-rings"
          style={{
            animationDelay: "-3.1s",
            animationPlayState,
            filter: "drop-shadow(0 0 3px rgba(106,184,138,0.18))",
          }}
        >
          <circle
            r={selected ? 57 : 50}
            fill="none"
            stroke={T.frameworks}
            strokeWidth={selected ? 0.72 : 0.42}
            opacity={selected ? 0.36 : 0.14}
            pointerEvents="none"
          />
          <circle
            r={selected ? 34 : 30}
            fill="none"
            stroke={T.frameworks}
            strokeWidth={0.35}
            opacity={selected ? 0.23 : 0.09}
            pointerEvents="none"
          />
        </g>
      </g>

      <g
        className="framework-parent-core"
        style={{
          animationDelay: "-4.8s",
          animationPlayState,
          filter:
            "drop-shadow(0 0 2px rgba(106,184,138,0.55)) drop-shadow(0 0 8px rgba(106,184,138,0.12))",
        }}
      >
        <circle
          r={selected ? 14 : 11}
          fill={T.frameworks}
          opacity={selected ? 1 : 0.55}
          pointerEvents="none"
        />
      </g>

      <circle r={36} fill="transparent" pointerEvents="all" />

      <text
        y={selected ? 29 : 27}
        textAnchor="middle"
        fontFamily={T.mono}
        fontSize={7.4}
        letterSpacing="0.19em"
        fill={T.frameworks}
        opacity={selected ? 0.90 : 0.55}
        pointerEvents="none"
      >
        FRAMEWORKS
      </text>
    </g>
  );
}
