import { ATLAS_OVERVIEW_SELECTION_EASE } from "./atlasOverviewMotion";

/**
 * Shared top-level Atlas system transition.
 *
 * Case Studies already uses this rhythm in product:
 * acknowledge -> pull -> resolve -> overview
 *
 * Frameworks now uses the same values. Experiments can reuse this contract
 * later without inventing a third transition grammar.
 */
export const ATLAS_SYSTEM_ENTRY_DURATION = 900;
export const ATLAS_SYSTEM_EXIT_DURATION = 820;

export const ATLAS_SYSTEM_ACKNOWLEDGE_DELAY = 110;
export const ATLAS_SYSTEM_RESOLVE_START = 560;
export const ATLAS_SYSTEM_RESOLVE_DURATION = 320;

export const ATLAS_SYSTEM_PULL_EASE = ATLAS_OVERVIEW_SELECTION_EASE;

export const ATLAS_SYSTEM_ENTRY_PROGRESS = {
  idle: 0,
  acknowledge: 0.16,
  pulling: 0.66,
  resolving: 0.94,
  settled: 1,
} as const;

export const ATLAS_SYSTEM_CONTEXT_RECEDE = {
  idle: { opacity: 1, scale: 1 },
  acknowledge: { opacity: 0.52, scale: 0.992 },
  pulling: { opacity: 0.015, scale: 0.978 },
  resolving: { opacity: 0, scale: 0.965 },
  settled: { opacity: 1, scale: 1 },
} as const;

export const ATLAS_SYSTEM_NEXUS_RECEDE = {
  idle: { opacity: 1, scale: 1 },
  acknowledge: { opacity: 0.56, scale: 0.996 },
  pulling: { opacity: 0.01, scale: 0.984 },
  resolving: { opacity: 0, scale: 0.972 },
  settled: { opacity: 1, scale: 1 },
} as const;

export function atlasSystemOrbitRecedeOpacity(
  phase: keyof typeof ATLAS_SYSTEM_ENTRY_PROGRESS,
) {
  if (phase === "acknowledge") return 0.07;
  if (phase === "pulling" || phase === "resolving") return 0;
  return null;
}

export function atlasSystemExitBackgroundProgress(progress: number) {
  return Math.max(0, Math.min(1, (progress - 0.42) / 0.58));
}

export function atlasSystemExitChromeProgress(progress: number) {
  return Math.max(0, Math.min(1, (progress - 0.62) / 0.38));
}

export function atlasSystemSmoothProgress(rawProgress: number) {
  const raw = Math.max(0, Math.min(1, rawProgress));
  return raw * raw * (3 - 2 * raw);
}
