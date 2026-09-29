import { EXPERIMENTS_TEMPLATE } from "../config/experimentsConfig";
import { EXPERIMENTS_MOTION } from "../config/experimentsMotion";
import type {
  ExperimentOverviewId,
  MobileExperimentId,
} from "../experimentsTypes";
import ConstellationOverview from "../template/ConstellationOverview";

export default function ExperimentsOverviewConstellation({
  selectedId,
  selectionPulseId,
  ambientPaused,
  labelsVisible,
  focusedEntryId,
  focusedEntryProgress,
  focusedReturnId,
  focusedReturnProgress,
  reducedMotion,
  onSelect,
}: {
  selectedId: ExperimentOverviewId;
  selectionPulseId: ExperimentOverviewId | null;
  ambientPaused: boolean;
  labelsVisible: boolean;
  focusedEntryId: MobileExperimentId | null;
  focusedEntryProgress: number;
  focusedReturnId: MobileExperimentId | null;
  focusedReturnProgress: number;
  reducedMotion: boolean;
  onSelect: (id: ExperimentOverviewId) => void;
}) {
  return (
    <ConstellationOverview
      definition={EXPERIMENTS_TEMPLATE}
      positionTransition={EXPERIMENTS_MOTION.positionTransition}
      selectedId={selectedId}
      selectionPulseId={selectionPulseId}
      ambientPaused={ambientPaused}
      labelsVisible={labelsVisible}
      focusedEntryId={focusedEntryId}
      focusedEntryProgress={focusedEntryProgress}
      focusedReturnId={focusedReturnId}
      focusedReturnProgress={focusedReturnProgress}
      reducedMotion={reducedMotion}
      onSelect={onSelect}
    />
  );
}
