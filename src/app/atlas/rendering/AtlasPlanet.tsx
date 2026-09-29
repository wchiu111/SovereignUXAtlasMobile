import { useState } from "react";
import { STAR_ORBIT_R } from "../../data/atlasSystems";
import { planetLocalPos, starLocalPos } from "../../utils/atlasGeometry";
import type { Planet, StarSystem, ViewLevel } from "../../types/atlas";
import { resolveDepthColor } from "../constellation/depthColor";
import { resolveStellarColor } from "../constellation/stellarPalette";
import {
  ATLAS_MOTION_EASE,
  PLANET_VISUAL,
  SATELLITE_VISUAL,
} from "../constellation/visualTokens";

interface AtlasPlanetProps {
  system: StarSystem;
  planet: Planet;
  level: ViewLevel;
  activeSystemId: string | null;
  activePlanetId: string | null;
  planetGroupRefs: React.MutableRefObject<Map<string, SVGGElement>>;
  planetLineRefs: React.MutableRefObject<Map<string, SVGLineElement>>;
  onSelect: (system: StarSystem, planet: Planet) => void;
  onPreviewChange?: (
    system: StarSystem | null,
    planet: Planet | null,
    anchor?: { x: number; y: number },
  ) => void;
}

export default function AtlasPlanet({
  system,
  planet,
  level,
  activeSystemId,
  activePlanetId,
  planetGroupRefs,
  planetLineRefs,
  onSelect,
  onPreviewChange,
}: AtlasPlanetProps) {
  const [hovered, setHovered] = useState(false);
  const active = activePlanetId === planet.id;
  const enabled = level >= 1 && activeSystemId === system.id;
  const initial = planetLocalPos(planet, 0);

  const depthColor = resolveDepthColor({
    domainColor: system.color,
    stellarType: planet.signatureStellarType,
    level,
    hovered,
    active,
  });

  const foregroundBoost = Math.max(
    -0.06,
    Math.min(0.1, planet.orbitPlane * 0.04),
  );

  const opacity =
    level === 0
      ? PLANET_VISUAL.overviewOpacity + foregroundBoost
      : activeSystemId !== system.id
        ? 0
        : level === 1
          ? 0.82 + foregroundBoost
          : active
            ? 1
            : 0.42 + foregroundBoost;

  const labelY = planet.orbitPlane > 0 ? -19 : -17;
  const labelOpacity = active
    ? PLANET_VISUAL.activeLabelOpacity
    : hovered && enabled
      ? PLANET_VISUAL.hoverLabelOpacity
      : level === 0
        ? PLANET_VISUAL.overviewLabelOpacity + foregroundBoost
        : PLANET_VISUAL.focusedLabelOpacity + foregroundBoost;

  const outerRadius = active
    ? PLANET_VISUAL.outerActive
    : hovered && enabled
      ? PLANET_VISUAL.outerHover
      : PLANET_VISUAL.outerRest;

  const innerRadius = active
    ? PLANET_VISUAL.innerActive
    : hovered && enabled
      ? PLANET_VISUAL.innerHover
      : PLANET_VISUAL.innerRest;

  const coreRadius = active
    ? PLANET_VISUAL.coreActive
    : hovered && enabled
      ? PLANET_VISUAL.coreHover
      : PLANET_VISUAL.coreRest;

  const navigationLabel = planet.label.toLocaleUpperCase("en-US");

  return (
    <>
      <style>{`
        .atlas-concept-planet {
          transition:
            opacity 260ms ${ATLAS_MOTION_EASE},
            filter 260ms ${ATLAS_MOTION_EASE};
        }

        svg:has(.atlas-concept-hit:hover)
          .atlas-concept-planet[data-atlas-level="1"]:not(:has(.atlas-concept-hit:hover)),
        svg:has(.atlas-concept-hit:focus)
          .atlas-concept-planet[data-atlas-level="1"]:not(:has(.atlas-concept-hit:focus)) {
          opacity: 0.48 !important;
          filter: saturate(0.72) brightness(0.78);
        }
      `}</style>

      <g
        className="atlas-concept-planet"
        data-atlas-level={level}
      >
      <line
        ref={element => {
          if (element) planetLineRefs.current.set(planet.id, element);
          else planetLineRefs.current.delete(planet.id);
        }}
        x1={0}
        y1={0}
        x2={initial.x}
        y2={initial.y}
        stroke={system.color}
        strokeWidth="0.4"
        strokeOpacity={
          level === 0
            ? hovered
              ? 0.1
              : 0.028
            : enabled
              ? hovered || active
                ? 0.14
                : 0.055
              : 0
        }
        style={{
          transition: `stroke-opacity 380ms ${ATLAS_MOTION_EASE}`,
          pointerEvents: "none",
        }}
      />

      <g
        ref={element => {
          if (element) planetGroupRefs.current.set(planet.id, element);
          else planetGroupRefs.current.delete(planet.id);
        }}
        transform={`translate(${initial.x},${initial.y}) scale(${initial.scale})`}
        opacity={opacity}
        style={{
          transition: `opacity 420ms ${ATLAS_MOTION_EASE}`,
        }}
      >
        <circle
          cx={0}
          cy={0}
          r={outerRadius}
          fill={depthColor.atmosphereColor}
          opacity={active ? 0.07 : hovered && enabled ? 0.095 : 0.012}
          style={{
            transition:
              `r 420ms ${ATLAS_MOTION_EASE}, opacity 420ms ${ATLAS_MOTION_EASE}`,
          }}
        />

        <circle
          cx={0}
          cy={0}
          r={innerRadius}
          fill={depthColor.semanticColor}
          opacity={
            (active ? 0.28 : hovered && enabled ? 0.46 : 0.2) *
            depthColor.semanticStrength
          }
          filter={
            hovered || active
              ? `url(#glow-${system.id})`
              : "url(#glow-sm)"
          }
          style={{
            transition:
              `r 380ms ${ATLAS_MOTION_EASE}, opacity 380ms ${ATLAS_MOTION_EASE}`,
          }}
        />

        <circle
          cx={0}
          cy={0}
          r={coreRadius}
          fill={depthColor.semanticColor}
          opacity={depthColor.coreOpacity}
          filter={
            hovered || active
              ? `url(#glow-${system.id})`
              : "url(#glow-sm)"
          }
          style={{
            transition: `r 220ms ${ATLAS_MOTION_EASE}`,
          }}
        />

        <circle
          cx={0}
          cy={0}
          r={hovered && enabled ? 18 : 0}
          fill="none"
          stroke={depthColor.stateColor}
          strokeWidth="0.58"
          strokeOpacity={hovered && enabled ? 0.5 : 0}
          strokeDasharray="3 7"
          style={{
            transition:
              `r 300ms ${ATLAS_MOTION_EASE}, stroke-opacity 300ms ${ATLAS_MOTION_EASE}`,
          }}
        />

        <circle
          className="atlas-concept-hit"
          cx={0}
          cy={0}
          r={PLANET_VISUAL.interactionTarget}
          fill="transparent"
          tabIndex={enabled ? 0 : -1}
          role="button"
          aria-label={`Open ${planet.label}`}
          onClick={event => {
            event.stopPropagation();
            if (enabled) onSelect(system, planet);
          }}
          onKeyDown={event => {
            if (!enabled) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelect(system, planet);
            }
          }}
          onFocus={event => {
            if (!enabled) return;
            setHovered(true);
            const rect = event.currentTarget.getBoundingClientRect();
            onPreviewChange?.(system, planet, {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            });
          }}
          onBlur={() => {
            setHovered(false);
            onPreviewChange?.(null, null);
          }}
          onMouseEnter={event => {
            event.stopPropagation();
            if (!enabled) return;
            setHovered(true);
            const rect = event.currentTarget.getBoundingClientRect();
            onPreviewChange?.(system, planet, {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            });
          }}
          onMouseLeave={event => {
            event.stopPropagation();
            setHovered(false);
            onPreviewChange?.(null, null);
          }}
          style={{
            cursor: enabled ? "crosshair" : "default",
            outline: "none",
          }}
        />

        <text
          data-atlas-attention-label
          data-atlas-relation={system.id}
          data-atlas-tier="planet"
          x={planet.orbitPlane * 1.5}
          y={labelY}
          textAnchor="middle"
          fontSize="7.4"
          fontFamily="'DM Mono',monospace"
          fontWeight="500"
          letterSpacing="1.3"
          fill={depthColor.labelColor}
          opacity={labelOpacity}
          paintOrder="stroke"
          stroke="#070811"
          strokeWidth="1.45"
          strokeOpacity="0.76"
          style={{
            transition:
              `opacity 220ms ${ATLAS_MOTION_EASE}, filter 220ms ${ATLAS_MOTION_EASE}, transform 220ms ${ATLAS_MOTION_EASE}`,
            pointerEvents: "none",
            willChange: "opacity, filter, transform",
          }}
        >
          {navigationLabel}
        </text>

        {active && level === 2 && (
          <g>
            <circle
              cx={0}
              cy={0}
              r={STAR_ORBIT_R}
              fill="none"
              stroke={system.color}
              strokeWidth="0.3"
              strokeOpacity={SATELLITE_VISUAL.orbitOpacity}
              strokeDasharray="3 8"
            />

            {planet.stars.map(star => {
              const position = starLocalPos(star);
              const starColor = resolveStellarColor(
                star.stellarType,
                system.color,
              );

              return (
                <g key={star.id}>
                  <line
                    x1={0}
                    y1={0}
                    x2={position.x}
                    y2={position.y}
                    stroke={system.color}
                    strokeWidth="0.3"
                    strokeOpacity={SATELLITE_VISUAL.lineOpacity}
                    style={{ pointerEvents: "none" }}
                  />

                  <circle
                    cx={position.x}
                    cy={position.y}
                    r={SATELLITE_VISUAL.atmosphereRadius}
                    fill={starColor}
                    opacity="0.035"
                  />

                  <circle
                    cx={position.x}
                    cy={position.y}
                    r={SATELLITE_VISUAL.coreRadius}
                    fill={starColor}
                    opacity="0.58"
                    filter="url(#glow-sm)"
                  />

                  <text
                    data-atlas-attention-label
                    data-atlas-relation={system.id}
                    data-atlas-tier="satellite"
                    x={position.x}
                    y={position.y - 8}
                    textAnchor="middle"
                    fontSize="4.9"
                    fontFamily="'DM Mono',monospace"
                    letterSpacing="1"
                    fill={system.color}
                    opacity={SATELLITE_VISUAL.labelOpacity}
                    paintOrder="stroke"
                    stroke="#070811"
                    strokeWidth="1"
                    strokeOpacity="0.72"
                    style={{ pointerEvents: "none" }}
                  >
                    {star.label}
                  </text>
                </g>
              );
            })}
          </g>
        )}
      </g>
      </g>
    </>
  );
}
