import { useEffect, useMemo, useState } from "react";
import { getAtlasEntry } from "../../content/registry";
import type { Planet, StarSystem } from "../../types/atlas";
import ApplicationKitModuleDrawer, {
  APPLICATION_KIT_DRAWER_WIDTH,
} from "./ApplicationKitModuleDrawer";

interface ApplicationKitOverviewProps {
  system: StarSystem;
  planet: Planet;
  onBack: () => void;
  transitioning?: boolean;
}

interface Point {
  x: number;
  y: number;
}

const PEER_POSITIONS: Point[] = [
  { x: 0.13, y: 0.43 },
  { x: 0.28, y: 0.31 },
  { x: 0.44, y: 0.29 },
  { x: 0.59, y: 0.78 },
  { x: 0.20, y: 0.76 },
];

function familyLabelLines(title: string): string[] {
  if (title.includes(" & ")) {
    const [first, second] = title.split(" & ");
    return [`${first} &`, second];
  }

  const words = title.split(" ");
  if (words.length < 2) return [title];
  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];
}

function moduleLabelLines(title: string): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > 20 && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);
  return lines.slice(0, 3);
}

export default function ApplicationKitOverview({
  system,
  planet,
  onBack,
  transitioning = false,
}: ApplicationKitOverviewProps) {
  const [visible, setVisible] = useState(false);
  const [hoveredFamilyId, setHoveredFamilyId] = useState<string | null>(null);
  const [activeFamilyId, setActiveFamilyId] = useState<string | null>(null);
  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [dims, setDims] = useState(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
  }));

  const entry = getAtlasEntry(planet.id);
  const collection = entry?.frameworkKind === "collection" ? entry.collection : undefined;

  useEffect(() => {
    const revealTimer = window.setTimeout(() => setVisible(true), 20);
    const resize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    const keydown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (activeModuleId) {
        setActiveModuleId(null);
        setHoveredModuleId(null);
      } else if (activeFamilyId) {
        setActiveFamilyId(null);
        setHoveredFamilyId(null);
      } else {
        onBack();
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("keydown", keydown);
    return () => {
      window.clearTimeout(revealTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", keydown);
    };
  }, [activeFamilyId, activeModuleId, onBack]);

  const geometry = useMemo(() => {
    const { w, h } = dims;
    const compact = w < 1100;
    const framework: Point = {
      x: w * (compact ? 0.34 : 0.39),
      y: h * 0.61,
    };
    const applicationKit: Point = {
      x: w * (compact ? 0.69 : 0.72),
      y: h * 0.42,
    };
    const familyOrbit = Math.min(w * (compact ? 0.19 : 0.165), h * 0.27, 245);
    const familyAngles = [-90, -38, 0, 42, 90];

    const families = (collection?.families ?? []).map((family, index) => {
      const radians = (familyAngles[index] ?? index * 72) * Math.PI / 180;
      return {
        family,
        angle: radians,
        x: applicationKit.x + Math.cos(radians) * familyOrbit,
        y: applicationKit.y + Math.sin(radians) * familyOrbit,
      };
    });

    const peerPlanets = system.planets.filter((candidate) => candidate.id !== planet.id);
    const peers = peerPlanets.map((peer, index) => ({
      peer,
      x: w * (PEER_POSITIONS[index]?.x ?? 0.18 + index * 0.1),
      y: h * (PEER_POSITIONS[index]?.y ?? 0.35 + index * 0.08),
    }));

    return {
      framework,
      applicationKit,
      families,
      peers,
      applicationRadius: Math.min(112, w * 0.075, h * 0.15),
    };
  }, [collection?.families, dims, planet.id, system.planets]);

  if (!collection) return null;

  const { framework, applicationKit, families, peers, applicationRadius } = geometry;
  const emphasisFamilyId = hoveredFamilyId ?? activeFamilyId;
  const activeFamily = activeFamilyId
    ? families.find(({ family }) => family.id === activeFamilyId) ?? null
    : null;
  const describedFamily = emphasisFamilyId
    ? families.find(({ family }) => family.id === emphasisFamilyId)?.family ?? null
    : null;
  const moduleOrbit = Math.min(94, dims.w * 0.07, dims.h * 0.12);
  const expandedModules = activeFamily
    ? activeFamily.family.modules.map((module, index, modules) => {
        const angle = -Math.PI / 2 + index * (Math.PI * 2 / modules.length);
        const rawX = activeFamily.x + Math.cos(angle) * moduleOrbit;
        const rawY = activeFamily.y + Math.sin(angle) * moduleOrbit;
        return {
          module,
          angle,
          x: Math.max(118, Math.min(dims.w - 150, rawX)),
          y: Math.max(105, Math.min(dims.h - 130, rawY)),
        };
      })
    : [];
  const activeModule = activeModuleId && activeFamily
    ? activeFamily.family.modules.find(module => module.id === activeModuleId) ?? null
    : null;
  const describedModuleId = hoveredModuleId ?? activeModuleId;
  const describedModule = describedModuleId && activeFamily
    ? activeFamily.family.modules.find(module => module.id === describedModuleId) ?? null
    : null;
  const contextVisible = !!(describedModule || describedFamily) && !activeModule;

  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 18,
        opacity: transitioning ? 0.16 : visible ? 1 : 0,
        transform: transitioning ? "scale(1.025)" : "scale(1)",
        transformOrigin: "center center",
        transition: transitioning
          ? "opacity 0.34s ease-out, transform 0.76s cubic-bezier(0.22,1,0.36,1)"
          : "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        onClick={() => {
          if (activeModuleId) {
            setActiveModuleId(null);
            setHoveredModuleId(null);
          } else if (activeFamilyId) {
            setActiveFamilyId(null);
            setHoveredFamilyId(null);
          } else {
            onBack();
          }
        }}
        role="img"
        aria-label="Application Kit with five module families"
        style={{
          cursor: "crosshair",
          transform: activeModule
            ? `translateX(-${Math.min(82, APPLICATION_KIT_DRAWER_WIDTH * 0.18)}px)`
            : "translateX(0)",
          transformOrigin: "center center",
          transition: "transform 0.58s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <defs>
          <filter id="ak-glow-lg" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ak-glow-sm" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="ak-focus-field">
            <stop offset="0%" stopColor={system.color} stopOpacity="0.12" />
            <stop offset="56%" stopColor={system.color} stopOpacity="0.025" />
            <stop offset="100%" stopColor={system.color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* A local field softens the underlying Atlas without replacing it. */}
        <rect width={dims.w} height={dims.h} fill="rgba(5,5,10,0.56)" />
        <circle
          cx={applicationKit.x}
          cy={applicationKit.y}
          r={applicationRadius * 3.25}
          fill="url(#ak-focus-field)"
          pointerEvents="none"
        />

        {/* Framework hub and receded peer frameworks preserve the prior spatial context. */}
        <g opacity="0.34" pointerEvents="none">
          {peers.map(({ peer, x, y }) => (
            <line
              key={`peer-line-${peer.id}`}
              x1={framework.x}
              y1={framework.y}
              x2={x}
              y2={y}
              stroke={system.color}
              strokeWidth="0.55"
              strokeOpacity="0.24"
              strokeDasharray="2 9"
            />
          ))}
        </g>

        {peers.map(({ peer, x, y }) => (
          <g key={peer.id} opacity="0.30" pointerEvents="none">
            <circle cx={x} cy={y} r="27" fill={system.color} opacity="0.035" />
            <circle cx={x} cy={y} r="14" fill={system.color} opacity="0.18" filter="url(#ak-glow-sm)" />
            <circle cx={x} cy={y} r="4.4" fill={system.color} opacity="0.74" />
            <text
              x={x}
              y={y - 27}
              textAnchor="middle"
              fontFamily="'DM Mono',monospace"
              fontSize="9"
              letterSpacing="1.7"
              fill={system.color}
              opacity="0.82"
            >
              {peer.label}
            </text>
          </g>
        ))}

        <g pointerEvents="none">
          <circle cx={framework.x} cy={framework.y} r="84" fill={system.color} opacity="0.025" />
          <circle cx={framework.x} cy={framework.y} r="48" fill={system.color} opacity="0.06" />
          <circle cx={framework.x} cy={framework.y} r="24" fill={system.color} opacity="0.18" filter="url(#ak-glow-sm)" />
          <circle cx={framework.x} cy={framework.y} r="8" fill={system.color} opacity="0.92" filter="url(#ak-glow-sm)" />
          <text
            x={framework.x}
            y={framework.y + 122}
            textAnchor="middle"
            fontFamily="'DM Mono',monospace"
            fontSize="16"
            letterSpacing="3.2"
            fill={system.color}
            opacity="0.76"
          >
            {system.label}
          </text>
        </g>

        {/* Application Kit remains visibly connected to its framework parent. */}
        <line
          x1={framework.x + 24}
          y1={framework.y - 12}
          x2={applicationKit.x - applicationRadius * 0.78}
          y2={applicationKit.y + applicationRadius * 0.42}
          stroke={system.color}
          strokeWidth="0.8"
          strokeOpacity="0.42"
        />

        {/* Five family relationships resolve only after commitment to Application Kit. */}
        <g stroke={system.color} fill="none" pointerEvents="none">
          {families.map(({ family, x, y }) => {
            const emphasized = emphasisFamilyId === family.id;
            const muted = !!emphasisFamilyId && !emphasized;
            return (
            <line
              key={`family-line-${family.id}`}
              x1={applicationKit.x}
              y1={applicationKit.y}
              x2={x}
              y2={y}
              strokeWidth={emphasized ? 1.15 : 0.72}
              strokeOpacity={emphasized ? 0.88 : muted ? 0.13 : 0.48}
              style={{ transition: "stroke-opacity 0.3s ease-out, stroke-width 0.3s ease-out" }}
            />
            );
          })}
          {[1.18, 1.66, 2.16].map((multiplier) => (
            <circle
              key={multiplier}
              cx={applicationKit.x}
              cy={applicationKit.y}
              r={applicationRadius * multiplier}
              strokeWidth="0.5"
              strokeOpacity={multiplier === 2.16 ? 0.24 : 0.16}
              strokeDasharray={multiplier === 2.16 ? "3 8" : undefined}
            />
          ))}
        </g>

        <g onClick={(event) => event.stopPropagation()} style={{ cursor: "default" }}>
          <circle
            cx={applicationKit.x}
            cy={applicationKit.y}
            r={applicationRadius}
            fill={system.color}
            opacity="0.055"
          />
          <circle
            cx={applicationKit.x}
            cy={applicationKit.y}
            r={applicationRadius * 0.68}
            fill={system.color}
            opacity="0.10"
            filter="url(#ak-glow-lg)"
          />
          <circle
            cx={applicationKit.x}
            cy={applicationKit.y}
            r={applicationRadius * 0.38}
            fill={system.color}
            opacity="0.20"
            filter="url(#ak-glow-lg)"
          />
          <circle
            cx={applicationKit.x}
            cy={applicationKit.y}
            r={applicationRadius * 0.15}
            fill={system.color}
            opacity="0.94"
            filter="url(#ak-glow-sm)"
          />
          <text
            x={applicationKit.x}
            y={applicationKit.y + applicationRadius + 46}
            textAnchor="middle"
            fontFamily="'DM Mono',monospace"
            fontSize="15"
            letterSpacing="3"
            fill={system.color}
            opacity="0.94"
          >
            {planet.label}
          </text>
          <text
            x={applicationKit.x}
            y={applicationKit.y + applicationRadius + 69}
            textAnchor="middle"
            fontFamily="'DM Mono',monospace"
            fontSize="8"
            letterSpacing="2.1"
            fill="rgba(244,235,208,0.62)"
          >
            {collection.moduleCount} OPTIONAL MODULES
          </text>
        </g>

        {/* The selected family becomes a local constellation without leaving Application Kit. */}
        {activeFamily && (
          <g pointerEvents="none">
            <circle
              cx={activeFamily.x}
              cy={activeFamily.y}
              r={moduleOrbit}
              fill="none"
              stroke={system.color}
              strokeWidth="0.55"
              strokeOpacity="0.24"
              strokeDasharray="3 9"
            />
            {expandedModules.map(({ module, x, y }) => {
              const emphasized = describedModuleId === module.id;
              const muted = !!describedModuleId && !emphasized;
              return (
                <line
                  key={`module-line-${module.id}`}
                  x1={activeFamily.x}
                  y1={activeFamily.y}
                  x2={x}
                  y2={y}
                  stroke={system.color}
                  strokeWidth={emphasized ? 1 : 0.65}
                  strokeOpacity={emphasized ? 0.86 : muted ? 0.14 : 0.42}
                  style={{ transition: "stroke-opacity 0.28s ease-out, stroke-width 0.28s ease-out" }}
                />
              );
            })}
          </g>
        )}

        {expandedModules.map(({ module, x, y }, index) => {
          const lines = moduleLabelLines(module.title);
          const isHovered = hoveredModuleId === module.id;
          const isActive = activeModuleId === module.id;
          const isEmphasized = isHovered || isActive;
          const isMuted = !!describedModuleId && !isEmphasized;
          return (
            <g
              key={module.id}
              role="button"
              tabIndex={0}
              aria-label={`${module.title}. ${module.purpose}`}
              aria-current={isActive ? "true" : undefined}
              onClick={(event) => {
                event.stopPropagation();
                setActiveModuleId(module.id);
                setHoveredModuleId(module.id);
              }}
              onMouseEnter={(event) => {
                event.stopPropagation();
                setHoveredModuleId(module.id);
              }}
              onMouseLeave={(event) => {
                event.stopPropagation();
                setHoveredModuleId(null);
              }}
              onFocus={() => setHoveredModuleId(module.id)}
              onBlur={() => setHoveredModuleId(null)}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                event.stopPropagation();
                setActiveModuleId(module.id);
              }}
              pointerEvents="all"
              opacity={visible ? (isMuted ? 0.34 : 1) : 0}
              style={{
                cursor: "crosshair",
                outline: "none",
                transition: `opacity 0.42s ease-out ${index * 55}ms`,
              }}
            >
              <circle
                cx={x}
                cy={y}
                r={isEmphasized ? 33 : 22}
                fill={system.color}
                opacity={isEmphasized ? 0.13 : 0.045}
                style={{ transition: "r 0.32s ease-out, opacity 0.32s ease-out" }}
              />
              <circle
                cx={x}
                cy={y}
                r={isEmphasized ? 18 : 11}
                fill={system.color}
                opacity={isEmphasized ? 0.38 : 0.18}
                filter="url(#ak-glow-sm)"
                style={{ transition: "r 0.28s ease-out, opacity 0.28s ease-out" }}
              />
              <circle
                cx={x}
                cy={y}
                r={isEmphasized ? 5.2 : 3.8}
                fill={system.color}
                opacity="0.94"
                style={{ transition: "r 0.25s ease-out" }}
              />
              <circle
                cx={x}
                cy={y}
                r={isEmphasized ? 20 : 15}
                fill="none"
                stroke={system.color}
                strokeWidth={isEmphasized ? 0.85 : 0.55}
                strokeOpacity={isEmphasized ? 0.72 : 0.34}
                strokeDasharray="2 5"
                style={{ transition: "r 0.28s ease-out, stroke-opacity 0.28s ease-out" }}
              />
              <text
                x={x}
                y={y + 34 - (lines.length - 1) * 6}
                textAnchor="middle"
                fontFamily="'DM Mono',monospace"
                fontSize="7.3"
                letterSpacing="1.15"
                fill={system.color}
                opacity={isEmphasized ? 1 : 0.78}
                pointerEvents="none"
                style={{ transition: "opacity 0.28s ease-out" }}
              >
                {lines.map((line, lineIndex) => (
                  <tspan key={`${module.id}-${lineIndex}`} x={x} dy={lineIndex === 0 ? 0 : 12}>
                    {line}
                  </tspan>
                ))}
              </text>
              <circle cx={x} cy={y} r="30" fill="transparent" />
            </g>
          );
        })}

        {families.map(({ family, x, y, angle }, index) => {
          const lines = familyLabelLines(family.title);
          const isHovered = hoveredFamilyId === family.id;
          const isActive = activeFamilyId === family.id;
          const isEmphasized = isHovered || isActive;
          const isMuted = !!emphasisFamilyId && !isEmphasized;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const labelX = x + cos * 34;
          const labelY = y + sin * 33;
          const anchor = Math.abs(cos) > 0.42 ? (cos > 0 ? "start" : "end") : "middle";

          return (
            <g
              key={family.id}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              aria-label={`${family.title}, ${family.modules.length} modules`}
              onClick={(event) => {
                event.stopPropagation();
                setActiveModuleId(null);
                setHoveredModuleId(null);
                setActiveFamilyId(current => current === family.id ? null : family.id);
                setHoveredFamilyId(family.id);
              }}
              onMouseEnter={(event) => {
                event.stopPropagation();
                setHoveredFamilyId(family.id);
              }}
              onMouseLeave={(event) => {
                event.stopPropagation();
                setHoveredFamilyId(null);
              }}
              onFocus={() => setHoveredFamilyId(family.id)}
              onBlur={() => setHoveredFamilyId(null)}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                event.stopPropagation();
                setActiveModuleId(null);
                setHoveredModuleId(null);
                setActiveFamilyId(current => current === family.id ? null : family.id);
              }}
              opacity={isMuted ? 0.28 : 1}
              style={{
                cursor: "crosshair",
                outline: "none",
                transition: "opacity 0.3s ease-out",
              }}
            >
              <circle
                cx={x}
                cy={y}
                r={isEmphasized ? 43 : 31}
                fill={system.color}
                opacity={isEmphasized ? 0.14 : 0.06}
                style={{ transition: "r 0.35s ease-out, opacity 0.35s ease-out" }}
              />
              <circle
                cx={x}
                cy={y}
                r={isEmphasized ? 25 : 18}
                fill={system.color}
                opacity={isEmphasized ? 0.36 : 0.18}
                filter="url(#ak-glow-sm)"
                style={{ transition: "r 0.3s ease-out, opacity 0.3s ease-out" }}
              />
              <circle
                cx={x}
                cy={y}
                r={isEmphasized ? 18 : 13}
                fill="none"
                stroke={system.color}
                strokeWidth={isEmphasized ? 0.9 : 0.6}
                strokeOpacity={isEmphasized ? 0.72 : 0.28}
                strokeDasharray="3 6"
                style={{ transition: "r 0.3s ease-out, stroke-opacity 0.3s ease-out" }}
              />
              <circle
                cx={x}
                cy={y}
                r={isEmphasized ? 6.2 : 4.8}
                fill={system.color}
                opacity="0.98"
                style={{ transition: "r 0.25s ease-out" }}
              >
                <animate
                  attributeName="opacity"
                  values="0.72;1;0.72"
                  dur="4.2s"
                  begin={`${index * 0.38}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <text
                x={labelX}
                y={labelY - (lines.length - 1) * 7}
                textAnchor={anchor}
                fontFamily="'DM Mono',monospace"
                fontSize="8.6"
                letterSpacing="1.55"
                fill={system.color}
                opacity={isEmphasized ? 1 : 0.84}
                pointerEvents="none"
                style={{ transition: "opacity 0.3s ease-out" }}
              >
                {lines.map((line, lineIndex) => (
                  <tspan key={line} x={labelX} dy={lineIndex === 0 ? 0 : 15}>
                    {line}
                  </tspan>
                ))}
              </text>
              <circle cx={x} cy={y} r="38" fill="transparent" />
            </g>
          );
        })}
      </svg>

      <div
        aria-live="polite"
        style={{
          position: "absolute",
          right: 30,
          bottom: 72,
          width: Math.min(360, dims.w * 0.28),
          minHeight: 62,
          paddingLeft: 17,
          borderLeft: contextVisible ? `1px solid ${system.color}` : "1px solid transparent",
          opacity: contextVisible ? 1 : 0,
          transform: contextVisible ? "translateY(0)" : "translateY(5px)",
          transition:
            "opacity 0.28s ease-out, transform 0.32s cubic-bezier(0.16,1,0.3,1), border-color 0.28s ease-out",
          pointerEvents: "none",
        }}
      >
        {describedModule && !activeModule ? (
          <>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 8,
                letterSpacing: "0.24em",
                color: system.color,
                marginBottom: 8,
              }}
            >
              {describedModule.title} · CLICK TO INSPECT
            </div>
            <div
              style={{
                fontFamily: "'EB Garamond',serif",
                fontSize: 14,
                lineHeight: 1.45,
                color: "rgba(244,235,208,0.72)",
              }}
            >
              {describedModule.purpose}
            </div>
          </>
        ) : describedFamily && !activeModule ? (
          <>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 8,
                letterSpacing: "0.24em",
                color: system.color,
                marginBottom: 8,
              }}
            >
              {describedFamily.title} · {describedFamily.modules.length} MODULES
            </div>
            <div
              style={{
                fontFamily: "'EB Garamond',serif",
                fontSize: 14,
                lineHeight: 1.45,
                color: "rgba(244,235,208,0.72)",
              }}
            >
              {describedFamily.description}
            </div>
          </>
        ) : null}
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 27,
          transform: "translateX(-50%)",
          fontFamily: "'DM Mono',monospace",
          fontSize: 8,
          letterSpacing: "0.28em",
          color: "rgba(200,169,110,0.54)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {activeModuleId
          ? "MODULE INSPECTION · ESC TO CLOSE"
          : activeFamilyId
          ? "SELECT A MODULE · ESC TO COLLAPSE"
          : "SELECT A MODULE FAMILY · ESC TO RETURN"}
      </div>

      <ApplicationKitModuleDrawer
        open={!!activeModule}
        module={activeModule}
        family={activeFamily?.family ?? null}
        color={system.color}
        onClose={() => {
          setActiveModuleId(null);
          setHoveredModuleId(null);
        }}
        onSelectModule={(moduleId) => {
          setActiveModuleId(moduleId);
          setHoveredModuleId(moduleId);
        }}
      />
    </div>
  );
}
