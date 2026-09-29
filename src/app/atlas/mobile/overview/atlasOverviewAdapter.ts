import type {
  AtlasOverviewSystemAdapterDefinition,
  AtlasOverviewSystemId,
} from "./atlasOverviewTypes";

/**
 * Identity-preserving helper for domain overview definitions.
 *
 * It exists mostly to keep literal ids and item ids narrow in TypeScript while
 * giving Case Studies, Frameworks, and Experiments one adapter boundary.
 */
export function defineAtlasOverviewSystemAdapter<
  const TSystemId extends AtlasOverviewSystemId,
  const TSelectionId extends string,
>(
  definition: AtlasOverviewSystemAdapterDefinition<
    TSystemId,
    TSelectionId
  >,
) {
  return definition;
}

/**
 * All valid overview selection ids for an adapter, parent first.
 * Useful to seed keyboard/debug tooling without knowing domain geometry.
 */
export function atlasOverviewSelectionIds<
  TSystemId extends AtlasOverviewSystemId,
  TSelectionId extends string,
>(
  definition: AtlasOverviewSystemAdapterDefinition<
    TSystemId,
    TSelectionId
  >,
): readonly TSelectionId[] {
  return [
    definition.parentId,
    ...definition.items.map((item) => item.id),
  ];
}

/**
 * Lightweight structural validation for dev/QA tooling.
 * This does not police product copy or geometry.
 */
export function validateAtlasOverviewAdapter<
  TSystemId extends AtlasOverviewSystemId,
  TSelectionId extends string,
>(
  definition: AtlasOverviewSystemAdapterDefinition<
    TSystemId,
    TSelectionId
  >,
) {
  const ids = atlasOverviewSelectionIds(definition);
  const uniqueIds = new Set(ids);

  return {
    hasParent: ids[0] === definition.parentId,
    hasItems: definition.items.length > 0,
    idsAreUnique: uniqueIds.size === ids.length,
    countLabelPresent: definition.system.countLabel.trim().length > 0,
    titlePresent: definition.system.title.trim().length > 0,
    colorPresent: definition.system.color.trim().length > 0,
  } as const;
}
