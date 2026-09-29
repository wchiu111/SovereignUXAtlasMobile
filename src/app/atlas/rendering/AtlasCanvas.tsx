import { useRef } from "react";
import { SYSTEMS } from "../../data/atlasSystems";
import { sysOrbitPos, systemOrbitPath } from "../../utils/atlasGeometry";
import type { Planet, StarSystem, ViewLevel } from "../../types/atlas";
import useAtlasCursorAttention from "../hooks/useAtlasCursorAttention";
import AtlasNexus from "./AtlasNexus";
import AtlasSystem from "./AtlasSystem";

interface AtlasCanvasProps {
  width: number;
  height: number;
  level: ViewLevel;
  activeSystemId: string | null;
  activePlanetId: string | null;
  searchPreviewSystemId?: string | null;
  zoomableRef: React.RefObject<HTMLDivElement | null>;
  systemGroupRefs: React.MutableRefObject<Map<string, SVGGElement>>;
  planetGroupRefs: React.MutableRefObject<Map<string, SVGGElement>>;
  outerGlowRefs: React.MutableRefObject<Map<string, SVGCircleElement>>;
  planetLineRefs: React.MutableRefObject<Map<string, SVGLineElement>>;
  hoveredNexus: boolean;
  onNexusHoverChange: (hovered: boolean) => void;
  onBackgroundClick: () => void;
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
  revealStage?: number;
}

export default function AtlasCanvas({
  width,
  height,
  level,
  activeSystemId,
  activePlanetId,
  searchPreviewSystemId = null,
  zoomableRef,
  systemGroupRefs,
  planetGroupRefs,
  outerGlowRefs,
  planetLineRefs,
  hoveredNexus,
  onNexusHoverChange,
  onBackgroundClick,
  onSelectSystem,
  onSelectPlanet,
  onPlanetHoverChange,
  onSystemHoverChange,
  revealStage = 6,
}: AtlasCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const nexusX = width * 0.5;
  const nexusY = height * 0.48;
  const initialSystemPosition = (system: StarSystem) =>
    sysOrbitPos(system, 0, nexusX, nexusY);

  useAtlasCursorAttention({
    rootRef: svgRef,
    enabled: level <= 1,
  });

  return (
    <div
      ref={zoomableRef}
      className="absolute inset-0"
      style={{
        transformOrigin: "0 0",
        opacity: level >= 2 ? 0.04 : 1,
        transition: "opacity 0.55s ease-out",
        pointerEvents: level >= 2 ? "none" : "auto",
      }}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${width} ${height}`}
        overflow="visible"
        style={{ cursor: level > 0 && level < 3 ? "crosshair" : "default" }}
        onClick={onBackgroundClick}
      >
        <defs>
          {SYSTEMS.map(system => (
            <filter
              key={system.id}
              id={`glow-${system.id}`}
              x="-55%"
              y="-55%"
              width="210%"
              height="210%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3.2"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}

          <filter
            id="glow-nexus"
            x="-70%"
            y="-70%"
            width="240%"
            height="240%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="4.8"
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="glow-sm"
            x="-45%"
            y="-45%"
            width="190%"
            height="190%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="1.9"
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          opacity={revealStage >= 2 ? 0.016 : 0}
          stroke="#C8A96E"
          fill="none"
          strokeWidth="0.45"
          style={{
            transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {[110, 230, 360, 500].map(radius => (
            <circle key={radius} cx={nexusX} cy={nexusY} r={radius} />
          ))}

          {[0, 30, 60, 90, 120, 150].map(degrees => {
            const radians = (degrees * Math.PI) / 180;

            return (
              <line
                key={degrees}
                x1={nexusX + Math.cos(radians) * 700}
                y1={nexusY + Math.sin(radians) * 700}
                x2={nexusX - Math.cos(radians) * 700}
                y2={nexusY - Math.sin(radians) * 700}
              />
            );
          })}
        </g>

        {SYSTEMS.map(system => {
          const stageBySystem: Record<string, number> = {
            frameworks: 3,
            "case-studies": 4,
            experiments: 5,
          };
          const stage = stageBySystem[system.id] ?? 5;
          const visible = level !== 0 || revealStage >= stage;

          return (
            <g
              key={`orbit-${system.id}`}
              opacity={visible ? 1 : 0}
              style={{
                transition:
                  "opacity 520ms cubic-bezier(0.16,1,0.3,1)",
                pointerEvents: "none",
              }}
            >
              <path
                d={systemOrbitPath(system, nexusX, nexusY)}
                fill="none"
                stroke={system.color}
                strokeWidth="0.55"
                strokeOpacity={
                  level === 0
                    ? 0.065
                    : activeSystemId === system.id
                      ? 0.13
                      : 0.018
                }
                strokeDasharray="3 13"
                style={{
                  transition: "stroke-opacity 0.5s",
                  filter: `drop-shadow(0 0 3px ${system.color}10)`,
                }}
              />
            </g>
          );
        })}

        <g
          opacity={level !== 0 || revealStage >= 1 ? 1 : 0}
          style={{
            transition:
              "opacity 520ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <AtlasNexus
            x={nexusX}
            y={nexusY}
            level={level}
            hovered={hoveredNexus}
            onHoverChange={onNexusHoverChange}
          />
        </g>

        {SYSTEMS.map(system => {
          const stageBySystem: Record<string, number> = {
            frameworks: 3,
            "case-studies": 4,
            experiments: 5,
          };
          const stage = stageBySystem[system.id] ?? 5;
          const visible = level !== 0 || revealStage >= stage;

          return (
            <g
              key={system.id}
              opacity={visible ? 1 : 0}
              style={{
                filter: visible ? "blur(0px)" : "blur(6px)",
                transform: visible ? "scale(1)" : "scale(0.94)",
                transformOrigin: "center",
                transformBox: "fill-box",
                transition:
                  "opacity 560ms cubic-bezier(0.16,1,0.3,1), filter 720ms cubic-bezier(0.16,1,0.3,1), transform 720ms cubic-bezier(0.16,1,0.3,1)",
                pointerEvents: visible ? "auto" : "none",
              }}
            >
              <AtlasSystem
                system={system}
                initialPosition={initialSystemPosition(system)}
                level={level}
                activeSystemId={activeSystemId}
                activePlanetId={activePlanetId}
                searchPreviewSystemId={searchPreviewSystemId}
                systemGroupRefs={systemGroupRefs}
                planetGroupRefs={planetGroupRefs}
                outerGlowRefs={outerGlowRefs}
                planetLineRefs={planetLineRefs}
                onSelectSystem={onSelectSystem}
                onSelectPlanet={onSelectPlanet}
                onPlanetHoverChange={onPlanetHoverChange}
                onSystemHoverChange={onSystemHoverChange}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
