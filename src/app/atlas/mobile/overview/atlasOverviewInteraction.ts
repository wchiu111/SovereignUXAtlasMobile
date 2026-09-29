import type { AtlasOverviewDrawerPhase } from "./atlasOverviewTypes";

export type AtlasOverviewSelectionIntent =
  | "noop"
  | "select"
  | "commit";

/**
 * Shared selection semantics used by Atlas overview systems.
 *
 * - selecting a different target changes context
 * - selecting the already-selected child commits into deeper content
 * - selecting the already-selected parent is a no-op
 *
 * The function is pure so each system can keep its own choreography hook and
 * spatial transitions while sharing the same behavioral rule.
 */
export function resolveAtlasOverviewSelectionIntent<TId extends string>({
  targetId,
  selectedId,
  parentId,
}: {
  targetId: TId;
  selectedId: TId;
  parentId: TId;
}): AtlasOverviewSelectionIntent {
  if (targetId !== selectedId) return "select";
  if (targetId === parentId) return "noop";
  return "commit";
}

export function atlasOverviewInteractionLocked({
  drawerPhase,
  entering,
  returning,
}: {
  drawerPhase: AtlasOverviewDrawerPhase;
  entering: boolean;
  returning: boolean;
}) {
  return drawerPhase === "closing" || entering || returning;
}

/**
 * The focused reading handoff/return easing currently used by both implemented
 * overview systems.
 */
export function atlasOverviewProgress(
  rawProgress: number,
  reducedMotion: boolean,
) {
  const raw = Math.max(0, Math.min(1, rawProgress));
  return reducedMotion ? raw : raw * raw * (3 - 2 * raw);
}
