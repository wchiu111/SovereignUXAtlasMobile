import { useState, type MouseEvent, type KeyboardEvent } from "react";
import type { AtlasModuleFamily } from "../../content/types";
import ApplicationKitModuleRouter from "../../experiences/application-kit/shared/ApplicationKitModuleRouter";
import { resolveStellarColor } from "../constellation/stellarPalette";

interface ApplicationKitModuleArcProps {
  family: AtlasModuleFamily;
  x: number;
  y: number;
  angle: number;
  orbitRadius: number;
  color: string;
}

interface ModuleNodeOffset {
  x: number;
  y: number;
}

/**
 * Small authored node adjustments used only where the default arc places a
 * module directly on top of a family label.
 */
const MODULE_NODE_OFFSETS: Record<string, ModuleNodeOffset> = {
  "sovereign-onboarding": {
    x: 24,
    y: -60,
  },
};

interface ModuleLabelPosition {
  x: number;
  y: number;
  anchor: "start" | "middle" | "end";
  maxCharacters?: number;
  lineGap?: number;
}

/**
 * Authored label choreography for the Application Kit overview.
 *
 * Values are offsets from each module node—not absolute screen coordinates—so
 * the composition remains responsive when the focused constellation scales.
 *
 * IMPORTANT: Pass 6.1 intentionally leaves every authored position unchanged.
 */
const MODULE_LABEL_POSITIONS: Record<string, ModuleLabelPosition> = {
  "sovereign-onboarding": {
    x: -2,
    y: -22,
    anchor: "middle",
    maxCharacters: 11,
    lineGap: 9,
  },
  "presence-sustainability": {
    x: 8,
    y: -20,
    anchor: "start",
    maxCharacters: 14,
  },
  "behavioral-decision-design": {
    x: 0,
    y: -22,
    anchor: "middle",
    maxCharacters: 15,
  },
  "multi-user-co-sovereignty": {
    x: 18,
    y: -8,
    anchor: "start",
    maxCharacters: 14,
  },
  "constraint-scope-design": {
    x: 20,
    y: 6,
    anchor: "start",
    maxCharacters: 14,
  },
  "distortion-drift-detection": {
    x: 18,
    y: -5,
    anchor: "start",
    maxCharacters: 14,
  },
  "vulnerable-context-safeguards": {
    x: 19,
    y: 1,
    anchor: "start",
    maxCharacters: 13,
  },
  "signal-fidelity": {
    x: 18,
    y: 10,
    anchor: "start",
    maxCharacters: 14,
  },
  "bias-projection-safeguards": {
    x: -18,
    y: 8,
    anchor: "end",
    maxCharacters: 14,
  },
  "value-aligned-growth": {
    x: 18,
    y: 11,
    anchor: "start",
    maxCharacters: 14,
  },
  "stillness-closure-recovery": {
    x: -18,
    y: 10,
    anchor: "end",
    maxCharacters: 14,
  },
  "cross-cultural-adaptation": {
    x: -18,
    y: 2,
    anchor: "end",
    maxCharacters: 14,
  },
  "threshold-signal-stewardship": {
    x: -18,
    y: 8,
    anchor: "end",
    maxCharacters: 14,
  },
  "simulation-based-validation": {
    x: -18,
    y: -4,
    anchor: "end",
    maxCharacters: 16,
  },
};

const BEHAVIOR_AUTHORITY_MODULE_IDS = new Set([
  "behavioral-decision-design",
  "multi-user-co-sovereignty",
  "constraint-scope-design",
]);

function wrapModuleTitle(title: string, maxCharacters = 18) {
  const words = title.split(" ");
  const lines: string[] = [];

  words.forEach((word) => {
    const current = lines[lines.length - 1];

    if (!current || current.length + word.length + 1 > maxCharacters) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = `${current} ${word}`;
    }
  });

  return lines.slice(0, 3);
}

export default function ApplicationKitModuleArc({
  family,
  x,
  y,
  angle,
  orbitRadius,
  color,
}: ApplicationKitModuleArcProps) {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const behaviorAuthority = family.id === "behavior-authority";

  const openModule = (moduleId: string) => {
    if (!behaviorAuthority || !BEHAVIOR_AUTHORITY_MODULE_IDS.has(moduleId)) {
      return;
    }
    setActiveModuleId(moduleId);
  };

  return (
    <>
      <g
        onClick={(event: MouseEvent<SVGGElement>) => event.stopPropagation()}
        style={{ cursor: "default" }}
      >
        {family.modules.map((module, moduleIndex) => {
          const moduleCount = family.modules.length;
          const arcSweep =
            moduleCount > 3 ? Math.PI * 0.82 : Math.PI * 0.68;
          const moduleAngle =
            angle +
            (moduleCount === 1
              ? 0
              : -arcSweep / 2 +
                (moduleIndex / (moduleCount - 1)) * arcSweep);
          const arcRadius = Math.min(94, orbitRadius * 0.4);
          const nodeOffset = MODULE_NODE_OFFSETS[module.id];
          const moduleX =
            x +
            Math.cos(moduleAngle) * arcRadius +
            (nodeOffset?.x ?? 0);
          const moduleY =
            y +
            Math.sin(moduleAngle) * arcRadius +
            (nodeOffset?.y ?? 0);
          const moduleColor = resolveStellarColor(
            module.stellarType,
            color,
          );

          const authoredLabel = MODULE_LABEL_POSITIONS[module.id];
          const fallbackAnchor =
            Math.cos(moduleAngle) > 0.25
              ? "start"
              : Math.cos(moduleAngle) < -0.25
                ? "end"
                : "middle";

          const labelX =
            moduleX +
            (authoredLabel?.x ?? Math.cos(moduleAngle) * 16);
          const labelY =
            moduleY +
            (authoredLabel?.y ?? Math.sin(moduleAngle) * 16);
          const labelAnchor =
            authoredLabel?.anchor ?? fallbackAnchor;
          const lineGap = authoredLabel?.lineGap ?? 10;
          const labelLines = wrapModuleTitle(
            module.title,
            authoredLabel?.maxCharacters ?? 18,
          );

          const interactive =
            behaviorAuthority &&
            BEHAVIOR_AUTHORITY_MODULE_IDS.has(module.id);

          const activateFromKeyboard = (
            event: KeyboardEvent<SVGGElement>,
          ) => {
            if (!interactive) return;
            if (event.key !== "Enter" && event.key !== " ") return;

            event.preventDefault();
            event.stopPropagation();
            openModule(module.id);
          };

          return (
            <g
              key={module.id}
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={
                interactive ? `Open ${module.title}` : undefined
              }
              onClick={
                interactive
                  ? (event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      openModule(module.id);
                    }
                  : undefined
              }
              onKeyDown={activateFromKeyboard}
              style={{
                cursor: interactive ? "pointer" : "default",
                outline: "none",
              }}
            >
              <path
                d={`M ${x + Math.cos(moduleAngle) * 25} ${
                  y + Math.sin(moduleAngle) * 25
                } L ${moduleX} ${moduleY}`}
                fill="none"
                stroke={moduleColor}
                strokeWidth="0.55"
                strokeOpacity="0.28"
                strokeDasharray="2 5"
                pointerEvents="none"
              />

              <circle
                cx={moduleX}
                cy={moduleY}
                r="13"
                fill={moduleColor}
                opacity="0.055"
                filter="url(#fo-glow-sm)"
                pointerEvents="none"
              />

              <circle
                cx={moduleX}
                cy={moduleY}
                r="7.5"
                fill="none"
                stroke={moduleColor}
                strokeWidth="0.65"
                strokeOpacity="0.42"
                strokeDasharray="2 4"
                pointerEvents="none"
              />

              <circle
                cx={moduleX}
                cy={moduleY}
                r="3.2"
                fill={moduleColor}
                opacity="0.94"
                filter="url(#fo-glow-sm)"
                pointerEvents="none"
              />

              <circle
                cx={moduleX}
                cy={moduleY}
                r={interactive ? 22 : 14}
                fill="transparent"
                pointerEvents={interactive ? "all" : "auto"}
              />

              <text
                x={labelX}
                y={
                  labelY -
                  ((labelLines.length - 1) * lineGap) / 2
                }
                textAnchor={labelAnchor}
                fontSize="8.5"
                fontFamily="'DM Mono',monospace"
                letterSpacing="0.55"
                fill={moduleColor}
                opacity="0.86"
                pointerEvents="none"
              >
                {labelLines.map((line, lineIndex) => (
                  <tspan
                    key={`${module.id}-${lineIndex}`}
                    x={labelX}
                    dy={lineIndex === 0 ? 0 : lineGap}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </g>

      {behaviorAuthority && (
        <ApplicationKitModuleRouter
          moduleId={activeModuleId}
          systemColor={color}
          onExit={() => setActiveModuleId(null)}
        />
      )}
    </>
  );
}
