import type { AtlasStellarType } from "../../content/types";
import type { ViewLevel } from "../../types/atlas";
import { resolveStellarColor } from "./stellarPalette";

interface DepthColorInput {
  domainColor: string;
  stellarType?: AtlasStellarType;
  level: ViewLevel;
  hovered: boolean;
  active: boolean;
}

/**
 * Domain color owns navigation and state. Semantic color gains prominence
 * as the camera approaches an idea.
 */
export function resolveDepthColor({
  domainColor,
  stellarType,
  level,
  hovered,
  active,
}: DepthColorInput) {
  const semanticColor = resolveStellarColor(stellarType, domainColor);
  const hasSemanticIdentity = Boolean(stellarType);
  const semanticStrength = !hasSemanticIdentity
    ? 1
    : level === 0
      ? hovered
        ? 0.58
        : 0.34
      : level === 1
        ? hovered || active
          ? 1
          : 0.78
        : 1;

  return {
    semanticColor,
    atmosphereColor: domainColor,
    stateColor: domainColor,
    labelColor: domainColor,
    semanticStrength,
    coreOpacity: hasSemanticIdentity && level === 0 ? 0.72 : 0.98,
  };
}
