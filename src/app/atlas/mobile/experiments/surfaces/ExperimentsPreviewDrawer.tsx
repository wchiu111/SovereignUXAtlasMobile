import { EXPERIMENTS_TEMPLATE } from "../config/experimentsConfig";
import type { MobileExperimentId } from "../experimentsTypes";
import type { ConstellationItem } from "../template/constellationTypes";
import ConstellationOverviewDrawer from "../template/ConstellationOverviewDrawer";

export default function ExperimentsPreviewDrawer({
  item,
  phase,
  onExplore,
  arrivalVisible,
  reducedMotion,
  closeDurationMs,
  reducedDurationMs,
}: {
  item: ConstellationItem<MobileExperimentId> | null;
  phase: "open" | "closing" | "opening";
  onExplore: () => void;
  arrivalVisible: boolean;
  reducedMotion: boolean;
  closeDurationMs: number;
  reducedDurationMs: number;
}) {
  return (
    <ConstellationOverviewDrawer
      parent={EXPERIMENTS_TEMPLATE.parent}
      item={item}
      phase={phase}
      onExplore={onExplore}
      arrivalVisible={arrivalVisible}
      reducedMotion={reducedMotion}
      closeDurationMs={closeDurationMs}
      reducedDurationMs={reducedDurationMs}
    />
  );
}
