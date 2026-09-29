import type { AtlasStarIntensity, AtlasStellarType } from "../../content/types";

/**
 * Semantic stellar colors remain stable across frameworks.
 * Domain colors still own labels, state rings, and orientation.
 */
export const STELLAR_PALETTE: Record<AtlasStellarType, string> = {
  purpose: "#E8C86D",
  strategy: "#F4EBD0",
  agentic: "#8AAEC8",
  judgment: "#D4916A",
  risk: "#D86C61",
  relational: "#A68BD4",
};

export const STELLAR_INTENSITY: Record<AtlasStarIntensity, number> = {
  dim: 0.72,
  balanced: 1,
  bright: 1.12,
};

export function resolveStellarColor(
  stellarType: AtlasStellarType | undefined,
  fallback: string,
) {
  return stellarType ? STELLAR_PALETTE[stellarType] : fallback;
}

export function resolveStellarIntensity(intensity: AtlasStarIntensity | undefined) {
  return intensity ? STELLAR_INTENSITY[intensity] : 1;
}
