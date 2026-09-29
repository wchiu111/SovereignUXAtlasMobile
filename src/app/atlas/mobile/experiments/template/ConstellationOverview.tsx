import ConstellationNode from "./ConstellationNode";
import ConstellationParent from "./ConstellationParent";
import ConstellationRelations from "./ConstellationRelations";
import ConstellationSceneStyles from "./ConstellationSceneStyles";
import type { ConstellationDefinition } from "./constellationTypes";

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothSegment(progress: number, start: number, end: number) {
  const span = Math.max(0.0001, end - start);
  const raw = clamp01((progress - start) / span);
  return raw * raw * (3 - 2 * raw);
}

export default function ConstellationOverview<
  TParentId extends string,
  TItemId extends string,
>({
  definition,
  positionTransition,
  selectedId,
  selectionPulseId = null,
  ambientPaused = false,
  labelsVisible = true,
  focusedEntryId = null,
  focusedEntryProgress = 0,
  focusedReturnId = null,
  focusedReturnProgress = 0,
  reducedMotion = false,
  onSelect,
}: {
  definition: ConstellationDefinition<TParentId, TItemId>;
  positionTransition: string;
  selectedId: TParentId | TItemId;
  selectionPulseId?: TParentId | TItemId | null;
  ambientPaused?: boolean;
  labelsVisible?: boolean;
  focusedEntryId?: TItemId | null;
  focusedEntryProgress?: number;
  focusedReturnId?: TItemId | null;
  focusedReturnProgress?: number;
  reducedMotion?: boolean;
  onSelect: (id: TParentId | TItemId) => void;
}) {
  const parentSelected = selectedId === definition.parent.id;
  const transitionLocked =
    focusedEntryId !== null || focusedReturnId !== null;

  const entryContextFade = focusedEntryId
    ? smoothSegment(focusedEntryProgress, 0.18, 0.78)
    : 0;

  const entryScaleProgress = focusedEntryId
    ? smoothSegment(focusedEntryProgress, 0.04, 0.88)
    : 0;

  const entryLabelFade = focusedEntryId
    ? smoothSegment(focusedEntryProgress, 0.58, 0.96)
    : 0;

  const relationFocusOpacity = focusedEntryId
    ? 1 - entryContextFade
    : focusedReturnId
    ? focusedReturnProgress
    : 1;

  const parentFocusOpacity = relationFocusOpacity;

  return (
    <>
      <ConstellationSceneStyles />

      <ConstellationRelations
        relations={definition.relations}
        color={definition.parent.color}
        opacity={relationFocusOpacity}
      />

      <ConstellationParent
        parent={definition.parent}
        selected={parentSelected}
        selectionPulse={selectionPulseId === definition.parent.id}
        ambientPaused={ambientPaused}
        focusOpacity={parentFocusOpacity}
        interactive={!transitionLocked}
        positionTransition={positionTransition}
        onSelect={() => onSelect(definition.parent.id)}
      />

      {definition.items.map((item) => {
        const geometry =
          definition.geometry.find((entry) => entry.id === item.id) ??
          definition.geometry[0];

        if (!geometry) return null;

        const selected = selectedId === item.id;
        const isFocusedEntry = focusedEntryId === item.id;
        const isFocusedReturn = focusedReturnId === item.id;

        const focusOpacity = focusedEntryId
          ? isFocusedEntry
            ? 1
            : 1 - entryContextFade
          : focusedReturnId
          ? isFocusedReturn
            ? 1
            : focusedReturnProgress
          : 1;

        const focusScale = isFocusedEntry
          ? reducedMotion
            ? 1
            : 1 + 0.10 * entryScaleProgress
          : isFocusedReturn
          ? reducedMotion
            ? 1
            : 1 + 0.10 * (1 - focusedReturnProgress)
          : 1;

        const entryLabelOpacity = isFocusedEntry
          ? 1 - entryLabelFade
          : 1;

        const returnLabelOpacity = focusedReturnId
          ? isFocusedReturn
            ? 1
            : smoothSegment(focusedReturnProgress, 0.48, 0.96)
          : 1;

        return (
          <ConstellationNode
            key={item.id}
            item={item}
            geometry={geometry}
            domainColor={definition.parent.color}
            positionTransition={positionTransition}
            selected={selected}
            parentSelected={parentSelected}
            selectionPulse={selectionPulseId === item.id}
            ambientPaused={ambientPaused}
            labelsVisible={labelsVisible}
            focusOpacity={focusOpacity}
            focusScale={focusScale}
            labelOpacityMultiplier={
              focusedEntryId
                ? isFocusedEntry
                  ? entryLabelOpacity
                  : 0
                : focusedReturnId
                ? returnLabelOpacity
                : 1
            }
            interactive={!transitionLocked}
            onSelect={() => onSelect(item.id)}
          />
        );
      })}
    </>
  );
}
