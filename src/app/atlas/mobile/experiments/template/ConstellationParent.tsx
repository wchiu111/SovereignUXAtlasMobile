import { T } from "../../components/mobileShared";
import type { ConstellationParentDefinition } from "./constellationTypes";

export default function ConstellationParent<TParentId extends string>({
  parent,
  selected,
  selectionPulse,
  ambientPaused,
  focusOpacity = 1,
  interactive = true,
  positionTransition,
  onSelect,
}: {
  parent: ConstellationParentDefinition<TParentId>;
  selected: boolean;
  selectionPulse: boolean;
  ambientPaused: boolean;
  focusOpacity?: number;
  interactive?: boolean;
  positionTransition: string;
  onSelect: () => void;
}) {
  const animationPlayState =
    ambientPaused || selectionPulse ? "paused" : "running";

  const activate = () => {
    if (interactive) onSelect();
  };

  return (
    <g
      role="button"
      tabIndex={interactive ? 0 : -1}
      aria-label={parent.title}
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
        transform: `translate(${parent.x}px,${parent.y}px)`,
        transformOrigin: `${parent.x}px ${parent.y}px`,
        transition: interactive ? positionTransition : "none",
        cursor: interactive ? "pointer" : "default",
        opacity: focusOpacity,
        outline: "none",
        pointerEvents: interactive ? "auto" : "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <g
        className={
          selectionPulse ? "atlas-template-selection-pulse" : undefined
        }
        style={{
          animationPlayState: selectionPulse ? "running" : "paused",
        }}
      >
        <g
          className="atlas-template-parent-atmosphere"
          style={{
            animationDelay: "-1.4s",
            animationPlayState,
          }}
        >
          <circle
            r={selected ? 74 : 62}
            fill={parent.color}
            opacity={selected ? 0.085 : 0.028}
            pointerEvents="none"
          />
          <circle
            r={selected ? 48 : 42}
            fill={parent.color}
            opacity={selected ? 0.15 : 0.052}
            pointerEvents="none"
          />
        </g>

        <g
          className="atlas-template-parent-rings"
          style={{
            animationDelay: "-3.1s",
            animationPlayState,
            filter: `drop-shadow(0 0 3px ${parent.color}2E)`,
          }}
        >
          <circle
            r={selected ? 57 : 50}
            fill="none"
            stroke={parent.color}
            strokeWidth={selected ? 0.72 : 0.42}
            opacity={selected ? 0.32 : 0.12}
            pointerEvents="none"
          />
          <circle
            r={selected ? 34 : 30}
            fill="none"
            stroke={parent.color}
            strokeWidth={0.35}
            opacity={selected ? 0.20 : 0.075}
            pointerEvents="none"
          />
        </g>
      </g>

      <g
        className="atlas-template-parent-core"
        style={{
          animationDelay: "-4.8s",
          animationPlayState,
          filter: `drop-shadow(0 0 2px ${parent.color}88) drop-shadow(0 0 8px ${parent.color}1F)`,
        }}
      >
        <circle
          r={selected ? 14 : 11}
          fill={parent.color}
          opacity={selected ? 0.96 : 0.52}
          pointerEvents="none"
        />
      </g>

      <circle r={38} fill="transparent" pointerEvents="all" />

      <text
        y={selected ? 29 : 27}
        textAnchor="middle"
        fontFamily={T.mono}
        fontSize={7.4}
        letterSpacing="0.19em"
        fill={parent.color}
        opacity={selected ? 0.90 : 0.55}
        pointerEvents="none"
      >
        {parent.title}
      </text>
    </g>
  );
}
