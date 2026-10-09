import { useEffect, useState } from "react";

import { T } from "../../components/mobileShared";
import AtlasSignalRow from "../../signals/AtlasSignalRow";
import AtlasSignalsSheet from "../../signals/AtlasSignalsSheet";
import { EXPERIMENTS_TEMPLATE } from "../config/experimentsConfig";
import { experimentSignalsFor } from "../experimentSignalData";
import type { MobileExperimentId } from "../experimentsTypes";
import ConstellationOverviewDrawer from "../template/ConstellationOverviewDrawer";
import type { ConstellationItem } from "../template/constellationTypes";

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
  const signals = item ? experimentSignalsFor(item.id) : [];
  const [signalsOpen, setSignalsOpen] = useState(false);

  useEffect(() => {
    setSignalsOpen(false);
  }, [item?.id]);

  return (
    <>
      <ConstellationOverviewDrawer
        parent={EXPERIMENTS_TEMPLATE.parent}
        item={item}
        phase={phase}
        onExplore={onExplore}
        arrivalVisible={arrivalVisible}
        reducedMotion={reducedMotion}
        closeDurationMs={closeDurationMs}
        reducedDurationMs={reducedDurationMs}
        headerMeta={
          item && signals.length > 0 ? (
            <AtlasSignalRow
              signals={signals}
              accent={T.experiments}
              onMore={() => setSignalsOpen(true)}
            />
          ) : undefined
        }
      />

      {item && (
        <AtlasSignalsSheet
          title="Experiment Signals"
          subjectTitle={item.title}
          signals={signals}
          accent={T.experiments}
          open={signalsOpen}
          onClose={() => setSignalsOpen(false)}
        />
      )}
    </>
  );
}
