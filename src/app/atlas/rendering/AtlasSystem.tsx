import { useState } from "react";
import type { Planet, StarSystem, ViewLevel } from "../../types/atlas";
import {
  ATLAS_MOTION_EASE,
  SYSTEM_VISUAL,
} from "../constellation/visualTokens";
import AtlasPlanet from "./AtlasPlanet";

interface AtlasSystemProps {
  system: StarSystem;
  initialPosition: { x: number; y: number; scale?: number };
  level: ViewLevel;
  activeSystemId: string | null;
  activePlanetId: string | null;
  searchPreviewSystemId?: string | null;
  systemGroupRefs: React.MutableRefObject<Map<string, SVGGElement>>;
  planetGroupRefs: React.MutableRefObject<Map<string, SVGGElement>>;
  outerGlowRefs: React.MutableRefObject<Map<string, SVGCircleElement>>;
  planetLineRefs: React.MutableRefObject<Map<string, SVGLineElement>>;
  onSelectSystem: (system: StarSystem) => void;
  onSelectPlanet: (system: StarSystem, planet: Planet) => void;
  onPlanetHoverChange?: (
    system: StarSystem | null,
    planet: Planet | null,
    anchor?: { x: number; y: number },
  ) => void;
  onSystemHoverChange?: (
    system: StarSystem | null,
    anchor?: { x: number; y: number },
  ) => void;
}

export default function AtlasSystem({
  system,
  initialPosition,
  level,
  activeSystemId,
  activePlanetId,
  searchPreviewSystemId = null,
  systemGroupRefs,
  planetGroupRefs,
  outerGlowRefs,
  planetLineRefs,
  onSelectSystem,
  onSelectPlanet,
  onPlanetHoverChange,
  onSystemHoverChange,
}: AtlasSystemProps) {
  const [hovered, setHovered] = useState(false);
  const active = activeSystemId === system.id;
  const searchAware = searchPreviewSystemId === system.id;
  const searchDimmed = Boolean(searchPreviewSystemId) && !searchAware;
  const baseRadius = system.size * 4;
  const opacity = level === 0 ? (searchDimmed ? 0.3 : 1) : active ? 1 : 0.08;
  const interactive = level === 0;
  const depthSortedPlanets = [...system.planets].sort(
    (a, b) => a.orbitPlane - b.orbitPlane,
  );

  const systemLabelOpacity = active
    ? SYSTEM_VISUAL.focusedLabelOpacity
    : hovered && interactive
      ? SYSTEM_VISUAL.hoverLabelOpacity
      : level === 0
        ? SYSTEM_VISUAL.restingLabelOpacity
        : SYSTEM_VISUAL.inactiveLabelOpacity;

  return (
    <g
      ref={element => {
        if (element) systemGroupRefs.current.set(system.id, element);
        else systemGroupRefs.current.delete(system.id);
      }}
      transform={`translate(${initialPosition.x},${initialPosition.y}) scale(${initialPosition.scale ?? 1})`}
      opacity={opacity}
      style={{ transition: "opacity 220ms cubic-bezier(0.16,1,0.3,1)" }}
    >
      <circle
        cx={0}
        cy={0}
        r={system.planets[0].orbitR}
        fill="none"
        stroke={system.color}
        strokeWidth="0.32"
        strokeOpacity={
          level >= 1 && active
            ? hovered
              ? 0.12
              : 0.075
            : hovered && interactive
              ? 0.05
              : 0.012
        }
        strokeDasharray="3 11"
        style={{
          transition: `stroke-opacity 420ms ${ATLAS_MOTION_EASE}`,
        }}
      />

      {[
        {
          r: 28,
          dur: "84s",
          f: "0",
          t: "360",
          d: "4 12",
          op: 0.1,
          sw: 0.44,
        },
        {
          r: 42,
          dur: "126s",
          f: "360",
          t: "0",
          d: "2 15",
          op: 0.052,
          sw: 0.32,
        },
      ].map((ring, index) => (
        <circle
          key={index}
          cx={0}
          cy={0}
          r={ring.r}
          fill="none"
          stroke={system.color}
          strokeWidth={ring.sw}
          strokeOpacity={
            hovered && interactive ? ring.op * 1.9 : ring.op
          }
          strokeDasharray={ring.d}
          style={{
            transition: `stroke-opacity 420ms ${ATLAS_MOTION_EASE}`,
          }}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from={`${ring.f} 0 0`}
            to={`${ring.t} 0 0`}
            dur={ring.dur}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      <circle
        ref={element => {
          if (element) outerGlowRefs.current.set(system.id, element);
          else outerGlowRefs.current.delete(system.id);
        }}
        cx={0}
        cy={0}
        r={
            (hovered || searchAware) && interactive
            ? baseRadius * SYSTEM_VISUAL.outerFieldHover
            : baseRadius * SYSTEM_VISUAL.outerFieldRest
        }
        fill={system.color}
        opacity={(hovered || searchAware) && interactive ? 0.085 : 0.025}
        style={{
          transition:
            `r 460ms ${ATLAS_MOTION_EASE}, opacity 460ms ${ATLAS_MOTION_EASE}`,
        }}
      />

      <circle
        cx={0}
        cy={0}
        r={
          (hovered || searchAware) && interactive
            ? baseRadius * SYSTEM_VISUAL.atmosphereHover
            : baseRadius * SYSTEM_VISUAL.atmosphereRest
        }
        fill={system.color}
        opacity={(hovered || searchAware) && interactive ? 0.3 : 0.12}
        filter={`url(#glow-${system.id})`}
        style={{
          transition:
            `r 420ms ${ATLAS_MOTION_EASE}, opacity 420ms ${ATLAS_MOTION_EASE}`,
        }}
      />

      <circle
        cx={0}
        cy={0}
        r={(hovered || searchAware) && interactive ? baseRadius * 1.85 : baseRadius * 1.36}
        fill="none"
        stroke={system.color}
        strokeWidth="0.55"
        strokeDasharray="4 9"
        strokeOpacity={(hovered || searchAware) && interactive ? 0.26 : 0}
        style={{
          transition:
            `r 340ms ${ATLAS_MOTION_EASE}, stroke-opacity 340ms ${ATLAS_MOTION_EASE}`,
        }}
      />

      <circle
        cx={0}
        cy={0}
        r={
          (hovered || searchAware) && interactive
            ? system.size * SYSTEM_VISUAL.coreHoverScale
            : system.size
        }
        fill={system.color}
        filter={`url(#glow-${system.id})`}
        style={{
          cursor: "pointer",
          transition: `r 220ms ${ATLAS_MOTION_EASE}`,
        }}
      />

      <circle
        cx={0}
        cy={0}
        r={baseRadius * SYSTEM_VISUAL.interactionTargetMultiplier}
        fill="transparent"
        tabIndex={interactive ? 0 : -1}
        role="button"
        aria-label={`Open ${system.label}`}
        onClick={event => {
          event.stopPropagation();
          if (interactive) onSelectSystem(system);
        }}
        onKeyDown={event => {
          if (!interactive) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelectSystem(system);
          }
        }}
        onFocus={event => {
          if (!interactive) return;
          setHovered(true);
          const rect = event.currentTarget.getBoundingClientRect();
          onSystemHoverChange?.(system, {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }}
        onBlur={() => {
          setHovered(false);
          onSystemHoverChange?.(null);
        }}
        onMouseEnter={event => {
          event.stopPropagation();
          if (!interactive) return;

          setHovered(true);
          const rect = event.currentTarget.getBoundingClientRect();
          onSystemHoverChange?.(system, {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }}
        onMouseLeave={event => {
          event.stopPropagation();
          setHovered(false);
          onSystemHoverChange?.(null);
        }}
        style={{
          cursor: "crosshair",
          outline: "none",
        }}
      />

      <text
        data-atlas-attention-label
        data-atlas-relation={system.id}
        data-atlas-tier="system"
        x={0}
        y={baseRadius * 2.2 + 14}
        textAnchor="middle"
        fontSize="11.5"
        fontFamily="'DM Mono',monospace"
        letterSpacing="1.9"
        fill={system.color}
        opacity={systemLabelOpacity}
        style={{
          transition:
            `opacity 220ms ${ATLAS_MOTION_EASE}, filter 220ms ${ATLAS_MOTION_EASE}, transform 220ms ${ATLAS_MOTION_EASE}`,
          pointerEvents: "none",
          willChange: "opacity, filter, transform",
        }}
      >
        {system.label}
      </text>

      {depthSortedPlanets.map(planet => (
        <AtlasPlanet
          key={planet.id}
          system={system}
          planet={planet}
          level={level}
          activeSystemId={activeSystemId}
          activePlanetId={activePlanetId}
          planetGroupRefs={planetGroupRefs}
          planetLineRefs={planetLineRefs}
          onSelect={onSelectPlanet}
          onPreviewChange={onPlanetHoverChange}
        />
      ))}
    </g>
  );
}
