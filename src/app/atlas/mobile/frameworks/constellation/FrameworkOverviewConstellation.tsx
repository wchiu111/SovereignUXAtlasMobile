import { T } from "../../components/mobileShared";
import { FRAMEWORK_FOCUS_ITEMS } from "../frameworkOverviewData";
import {
  FRAMEWORK_RELATION_PATHS,
  type FrameworkOverviewId,
  frameworkGeometryFor,
} from "../frameworkGeometry";
import type { MobileFrameworkId } from "../mobileFrameworkTypes";
import {
  FRAMEWORK_BREATH_DELAYS,
  FRAMEWORK_FADE_TRANSITION,
} from "../frameworkMotion";
import FrameworkNode from "./FrameworkNode";
import FrameworkParent from "./FrameworkParent";

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothSegment(progress: number, start: number, end: number) {
  const span = Math.max(0.0001, end - start);
  const raw = clamp01((progress - start) / span);
  return raw * raw * (3 - 2 * raw);
}

export default function FrameworkOverviewConstellation({
  selectedId,
  selectionPulseId,
  ambientPaused,
  labelsVisible,
  focusedEntryId = null,
  focusedEntryProgress = 0,
  focusedReturnId = null,
  focusedReturnProgress = 0,
  reducedMotion = false,
  onSelect,
}: {
  selectedId: FrameworkOverviewId;
  selectionPulseId: FrameworkOverviewId | null;
  ambientPaused: boolean;
  labelsVisible: boolean;
  focusedEntryId?: MobileFrameworkId | null;
  focusedEntryProgress?: number;
  focusedReturnId?: MobileFrameworkId | null;
  focusedReturnProgress?: number;
  reducedMotion?: boolean;
  onSelect: (id: FrameworkOverviewId) => void;
}) {
  const parentSelected = selectedId === "frameworks";
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
    <g>
      <g
        style={{
          opacity:
            (parentSelected ? 1 : 0.72) * relationFocusOpacity,
          transition: transitionLocked
            ? "none"
            : FRAMEWORK_FADE_TRANSITION,
          pointerEvents: "none",
        }}
      >
        {FRAMEWORK_RELATION_PATHS.map((path) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke={T.frameworks}
            strokeWidth={0.42}
            strokeDasharray="3 7"
            opacity={0.12}
          />
        ))}
      </g>

      <FrameworkParent
        selected={parentSelected}
        selectionPulse={selectionPulseId === "frameworks"}
        ambientPaused={ambientPaused}
        focusOpacity={parentFocusOpacity}
        interactive={!transitionLocked}
        onSelect={() => onSelect("frameworks")}
      />

      {FRAMEWORK_FOCUS_ITEMS.map((item, index) => {
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
            : 1 + 0.18 * (1 - focusedReturnProgress)
          : 1;

        const entryLabelOpacity = isFocusedEntry
          ? 1 - entryLabelFade
          : 1;

        const returnLabelOpacity = focusedReturnId
          ? isFocusedReturn
            ? 1
            : Math.max(
                0,
                Math.min(1, (focusedReturnProgress - 0.52) / 0.48),
              )
          : 1;

        return (
          <FrameworkNode
            key={item.id}
            item={item}
            geometry={frameworkGeometryFor(item.id)}
            selected={selectedId === item.id}
            parentSelected={parentSelected}
            selectionPulse={selectionPulseId === item.id}
            ambientPaused={ambientPaused}
            labelsVisible={labelsVisible || isFocusedReturn}
            breathDelay={FRAMEWORK_BREATH_DELAYS[index] ?? 0}
            focusOpacity={focusOpacity}
            focusScale={focusScale}
            labelOpacityMultiplier={
              focusedEntryId ? entryLabelOpacity : returnLabelOpacity
            }
            interactive={!transitionLocked}
            onSelect={() => onSelect(item.id)}
          />
        );
      })}
    </g>
  );
}
