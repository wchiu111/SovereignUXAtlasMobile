import { T } from "../../components/mobileShared";
import type { FrameworkFocusItem } from "../frameworkOverviewData";
import type { FrameworkOverviewGeometry } from "../frameworkGeometry";
import { FRAMEWORK_POSITION_TRANSITION } from "../frameworkMotion";
import { FRAMEWORK_TOPOLOGY } from "../frameworkTopology";

export default function FrameworkNode({
  item,
  geometry,
  selected,
  parentSelected,
  selectionPulse,
  ambientPaused,
  labelsVisible,
  breathDelay,
  focusOpacity = 1,
  focusScale = 1,
  labelOpacityMultiplier = 1,
  interactive = true,
  onSelect,
}: {
  item: FrameworkFocusItem;
  geometry: FrameworkOverviewGeometry;
  selected: boolean;
  parentSelected: boolean;
  selectionPulse: boolean;
  ambientPaused: boolean;
  labelsVisible: boolean;
  breathDelay: number;
  focusOpacity?: number;
  focusScale?: number;
  labelOpacityMultiplier?: number;
  interactive?: boolean;
  onSelect: () => void;
}) {
  const coreR = selected ? 7.5 : 6.5;
  const nodeColor =
    FRAMEWORK_TOPOLOGY.find(({ id }) => id === item.id)?.color ?? T.frameworks;
  const siblingOpacity = selected ? 1 : parentSelected ? 0.86 : 0.78;
  const animationPlayState =
    ambientPaused || selectionPulse ? "paused" : "running";

  const spatialTransition = interactive
    ? FRAMEWORK_POSITION_TRANSITION
    : "none";
  const labelTransition = interactive ? "opacity 240ms ease" : "none";

  const outerDuration = selected ? 6.8 : 5.8 + breathDelay * 0.18;
  const innerDuration = selected ? 5.8 : 4.9 + breathDelay * 0.12;
  const coreDuration = selected ? 7.2 : 6.4 + breathDelay * 0.14;

  const activate = () => {
    if (interactive) onSelect();
  };

  return (
    <g
      role="button"
      tabIndex={interactive ? 0 : -1}
      aria-label={item.title}
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
        cursor: interactive ? "pointer" : "default",
        opacity: siblingOpacity * focusOpacity,
        transition: spatialTransition,
        outline: "none",
        pointerEvents: interactive ? "auto" : "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <g
        style={{
          transform: `translate(${geometry.x}px,${geometry.y}px) scale(${focusScale})`,
          transformOrigin: `${geometry.x}px ${geometry.y}px`,
          transition: spatialTransition,
        }}
      >
        <g
          className={selectionPulse ? "framework-selection-pulse" : undefined}
          style={{
            animationPlayState: selectionPulse ? "running" : "paused",
          }}
        >
          <g
            className="framework-node-atmosphere"
            style={{
              animationDelay: `-${breathDelay + 0.65}s`,
              animationDuration: `${outerDuration}s`,
              animationPlayState,
            }}
          >
            <circle
              r={selected ? 30 : 24}
              fill={nodeColor}
              opacity={selected ? 0.12 : 0.065}
              pointerEvents="none"
            />
          </g>

          <g
            className="framework-node-inner"
            style={{
              animationDelay: `-${breathDelay * 0.72 + 0.28}s`,
              animationDuration: `${innerDuration}s`,
              animationPlayState,
              filter: `drop-shadow(0 0 2.5px ${nodeColor}55)`,
            }}
          >
            <circle
              r={selected ? 18 : 14}
              fill={nodeColor}
              opacity={selected ? 0.24 : 0.14}
              pointerEvents="none"
            />
            <circle
              r={selected ? 21 : 17}
              fill="none"
              stroke={T.frameworks}
              strokeWidth={selected ? 0.7 : 0.5}
              opacity={selected ? 0.44 : 0.24}
              pointerEvents="none"
            />
          </g>
        </g>

        <g
          className="framework-node-core"
          style={{
            animationDelay: `-${breathDelay * 0.48 + 1.1}s`,
            animationDuration: `${coreDuration}s`,
            animationPlayState,
            filter: `drop-shadow(0 0 2px ${nodeColor}88) drop-shadow(0 0 6px ${nodeColor}22)`,
          }}
        >
          <circle
            r={coreR}
            fill={nodeColor}
            opacity={selected ? 1 : 0.84}
            pointerEvents="none"
          />
        </g>

        <circle r={28} fill="transparent" pointerEvents="all" />
      </g>

      <text
        x={geometry.labelX}
        y={geometry.labelY}
        textAnchor={geometry.anchor}
        fontFamily={T.mono}
        fontSize={9.25}
        letterSpacing="0.08em"
        fill={T.frameworks}
        opacity={
          labelsVisible
            ? (selected ? 1 : parentSelected ? 0.86 : 0.78) *
              labelOpacityMultiplier
            : 0
        }
        pointerEvents="none"
        style={{ transition: labelTransition }}
      >
        {item.labelLines.map((line, index) => (
          <tspan
            key={line}
            x={geometry.labelX}
            dy={index === 0 ? 0 : 11}
          >
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}
