import type { ExperimentOverviewId } from "./experimentsOverviewScaffold";

export type MobileExperimentId = Exclude<
  ExperimentOverviewId,
  "experiments"
>;

export type { ExperimentOverviewId };
