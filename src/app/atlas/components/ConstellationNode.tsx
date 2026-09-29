import type {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";
import type { ResolvedConstellationNode } from "../constellation/constellationGeometry";
import { resolveStellarIntensity } from "../constellation/stellarPalette";

interface ConstellationNodeProps {
  node: ResolvedConstellationNode;
  domainColor: string;
  active: boolean;
  related?: boolean;
  dimmed?: boolean;
  pulseDelay: string;
  reducedMotion: boolean;
  showOpenCue?: boolean;
  actionCueLabel?: string;
  children?: ReactNode;
  onActivate: () => void;
  onAwaken: () => void;
  onRest: () => void;
}

export default function ConstellationNode({
  node,
  domainColor,
  active,
  related = false,
  dimmed = false,
  pulseDelay,
  reducedMotion,
  showOpenCue = true,
  actionCueLabel = "OPEN",
  children,
  onActivate,
  onAwaken,
  onRest,
}: ConstellationNodeProps) {
  const { star, x, y, nodeColor, nodeScale, label } = node;
  const intensity = resolveStellarIntensity(star.intensity);
  const transition = reducedMotion ? "none" : "all 0.22s cubic-bezier(0.16,1,0.3,1)";
  const cueY = y + 23 * nodeScale;
  const cueWidth = actionCueLabel === "EXPLORE" ? 56 : 40;

  const activate = (event: MouseEvent<SVGGElement> | KeyboardEvent<SVGGElement>) => {
    event.stopPropagation();
    onActivate();
  };

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    activate(event);
  };

  return (
    <g
      role="button"
      tabIndex={0}
      focusable="true"
      aria-label={`${actionCueLabel === "EXPLORE" ? "Explore" : "Open"} ${star.label}`}
      onClick={activate}
      onKeyDown={handleKeyDown}
      onMouseEnter={(event) => {
        event.stopPropagation();
        onAwaken();
      }}
      onMouseLeave={(event) => {
        event.stopPropagation();
        onRest();
      }}
      onFocus={onAwaken}
      onBlur={onRest}
      opacity={dimmed ? 0.52 : 1}
      style={{ cursor: "crosshair", outline: "none", transition }}
    >
      <circle cx={x} cy={y} r={20 * nodeScale} fill={nodeColor}
        opacity={active ? 0 : related ? 0.09 * intensity : 0.055 * intensity}
        filter="url(#fo-glow-sm)" style={{ transition }}>
        {!active && !reducedMotion && <>
          <animate attributeName="r" values={`${18 * nodeScale};${24 * nodeScale};${18 * nodeScale}`} dur="3.8s" begin={pulseDelay} repeatCount="indefinite" />
          <animate attributeName="opacity" values={`${0.045 * intensity};${0.12 * intensity};${0.045 * intensity}`} dur="3.8s" begin={pulseDelay} repeatCount="indefinite" />
        </>}
      </circle>

      <circle cx={x} cy={y} r={(active ? 42 : 26) * nodeScale} fill={nodeColor}
        opacity={active ? 0.15 : related ? 0.045 : 0} style={{ transition }} />
      <circle cx={x} cy={y} r={(active ? 25 : 12) * nodeScale} fill={nodeColor}
        opacity={active ? 0.34 : 0} filter="url(#fo-glow-sm)" style={{ transition }} />

      <circle cx={x} cy={y} r={(active ? 18 : 14) * nodeScale} fill="none"
        stroke={domainColor} strokeWidth={active ? 1.05 : 0.8} strokeDasharray="3 6"
        strokeOpacity={active ? 0.78 : related ? 0.5 : 0.32} style={{ transition }}>
        {!active && !reducedMotion && (
          <animate attributeName="stroke-opacity" values="0.24;0.48;0.24" dur="3.8s" begin={pulseDelay} repeatCount="indefinite" />
        )}
      </circle>

      <circle cx={x} cy={y} r={(active ? 10 : 9) * nodeScale} fill={nodeColor}
        opacity={active ? 0.26 : 0.18} filter="url(#fo-glow-sm)" style={{ transition }}>
        {!active && !reducedMotion && <>
          <animate attributeName="r" values={`${8 * nodeScale};${11 * nodeScale};${8 * nodeScale}`} dur="3.8s" begin={pulseDelay} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.14;0.25;0.14" dur="3.8s" begin={pulseDelay} repeatCount="indefinite" />
        </>}
      </circle>

      <circle cx={x} cy={y} r={(active ? 6.2 : 4.7) * nodeScale} fill={nodeColor}
        opacity={Math.min(1, (active ? 0.98 : 0.86) * intensity)} filter="url(#fo-glow-sm)" style={{ transition }}>
        {!active && !reducedMotion && <>
          <animate attributeName="r" values={`${4.3 * nodeScale};${5.4 * nodeScale};${4.3 * nodeScale}`} dur="3.8s" begin={pulseDelay} repeatCount="indefinite" />
          <animate attributeName="opacity" values={`${0.72 * intensity};${Math.min(1, 0.96 * intensity)};${0.72 * intensity}`} dur="3.8s" begin={pulseDelay} repeatCount="indefinite" />
        </>}
      </circle>

      <circle cx={x} cy={y} r={Math.max(22, 22 * nodeScale)} fill="transparent" style={{ cursor: "crosshair" }} />

      <text x={label.x} y={label.y} textAnchor={label.anchor} fontSize={active ? "10" : "9.5"}
        fontFamily="'DM Mono',monospace" letterSpacing="1.6" fill={domainColor}
        opacity={active ? 0.98 : related ? 0.94 : 0.74}
        style={{ transition, pointerEvents: "none" }}>
        {star.label}
      </text>

      {children}

      {active && showOpenCue && (
        <g opacity="0.82" style={{ pointerEvents: "none" }}>
          <rect x={x - cueWidth / 2} y={cueY} width={cueWidth} height="16" rx="8"
            fill="rgba(5,6,12,0.82)" stroke={domainColor} strokeOpacity="0.4" strokeWidth="0.7" />
          <text x={x} y={cueY + 11} textAnchor="middle" fontSize="6"
            fontFamily="'DM Mono',monospace" letterSpacing="0.9" fill={domainColor} opacity="0.9">
            {actionCueLabel}
          </text>
        </g>
      )}
    </g>
  );
}
