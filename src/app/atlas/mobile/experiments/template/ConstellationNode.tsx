import { T } from "../../components/mobileShared";
import type {
  ConstellationItem,
  ConstellationNodeGeometry,
} from "./constellationTypes";

export default function ConstellationNode<TId extends string>({
  item,
  geometry,
  domainColor,
  positionTransition,
  selected,
  parentSelected,
  selectionPulse,
  ambientPaused,
  labelsVisible,
  focusOpacity = 1,
  focusScale = 1,
  labelOpacityMultiplier = 1,
  interactive = true,
  onSelect,
}: {
  item: ConstellationItem<TId>;
  geometry: ConstellationNodeGeometry<TId>;
  domainColor: string;
  positionTransition: string;
  selected: boolean;
  parentSelected: boolean;
  selectionPulse: boolean;
  ambientPaused: boolean;
  labelsVisible: boolean;
  focusOpacity?: number;
  focusScale?: number;
  labelOpacityMultiplier?: number;
  interactive?: boolean;
  onSelect: () => void;
}) {
  const coreR = selected ? 7.5 : 6.5;
  const siblingOpacity = selected ? 1 : parentSelected ? 0.86 : 0.78;
  const animationPlayState =
    ambientPaused || selectionPulse ? "paused" : "running";

  const spatialTransition = interactive ? positionTransition : "none";
  const labelTransition = interactive ? "opacity 240ms ease" : "none";

  const outerDuration = selected
    ? 6.8
    : 5.8 + item.breathDelay * 0.18;
  const innerDuration = selected
    ? 5.8
    : 4.9 + item.breathDelay * 0.12;
  const coreDuration = selected
    ? 7.2
    : 6.4 + item.breathDelay * 0.14;

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
          className={
            selectionPulse ? "atlas-template-selection-pulse" : undefined
          }
          style={{
            animationPlayState: selectionPulse ? "running" : "paused",
          }}
        >
          <g
            className="atlas-template-node-atmosphere"
            style={{
              animationDelay: `-${item.breathDelay + 0.65}s`,
              animationDuration: `${outerDuration}s`,
              animationPlayState,
            }}
          >
            <circle
              r={selected ? 30 : 24}
              fill={item.color}
              opacity={selected ? 0.12 : 0.065}
              pointerEvents="none"
            />
          </g>

          <g
            className="atlas-template-node-inner"
            style={{
              animationDelay: `-${item.breathDelay * 0.72 + 0.28}s`,
              animationDuration: `${innerDuration}s`,
              animationPlayState,
              filter: `drop-shadow(0 0 2.5px ${item.color}55)`,
            }}
          >
            <circle
              r={selected ? 18 : 14}
              fill={item.color}
              opacity={selected ? 0.24 : 0.14}
              pointerEvents="none"
            />
            <circle
              r={selected ? 21 : 17}
              fill="none"
              stroke={domainColor}
              strokeWidth={selected ? 0.7 : 0.5}
              opacity={selected ? 0.44 : 0.24}
              pointerEvents="none"
            />
          </g>
        </g>

        <g
          className="atlas-template-node-core"
          style={{
            animationDelay: `-${item.breathDelay * 0.48 + 1.1}s`,
            animationDuration: `${coreDuration}s`,
            animationPlayState,
            filter: `drop-shadow(0 0 2px ${item.color}88) drop-shadow(0 0 6px ${item.color}22)`,
          }}
        >
          <circle
            r={coreR}
            fill={item.color}
            opacity={selected ? 1 : 0.84}
            pointerEvents="none"
          />
        </g>

        <circle r={30} fill="transparent" pointerEvents="all" />
      </g>

      <text
        x={geometry.labelX}
        y={geometry.labelY}
        textAnchor={geometry.anchor}
        fontFamily={T.mono}
        fontSize={9.25}
        letterSpacing="0.08em"
        fill={domainColor}
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
