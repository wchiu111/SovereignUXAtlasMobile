import { T } from "../components/mobileShared";
import {
  atlasOverviewSelectionIds,
  defineAtlasOverviewSystemAdapter,
  validateAtlasOverviewAdapter,
} from "../overview/atlasOverviewAdapter";

/**
 * Experiments overview scaffold.
 *
 * This is NOT the Experiments product UI and contains no authored narrative
 * copy. It proves the third Atlas system can satisfy the shared overview
 * adapter using the identities already present in the mobile Atlas.
 *
 * Geometry and interaction choreography will be authored when Experiments work
 * begins.
 */

export type ExperimentOverviewId =
  | "experiments"
  | "ai-evaluation"
  | "authority-drift"
  | "design-philosophy"
  | "gestalt-principles"
  | "think-like-a-designer";

export const EXPERIMENTS_OVERVIEW_SCAFFOLD =
  defineAtlasOverviewSystemAdapter({
    system: {
      id: "experiments",
      title: "EXPERIMENTS",
      countLabel: "5 EXPERIMENTS",
      color: T.experiments,
    },
    parentId: "experiments",
    items: [
      { id: "ai-evaluation", label: "AI EVALUATION" },
      { id: "authority-drift", label: "AUTHORITY DRIFT" },
      { id: "design-philosophy", label: "DESIGN PHILOSOPHY" },
      { id: "gestalt-principles", label: "GESTALT PRINCIPLES" },
      { id: "think-like-a-designer", label: "THINK LIKE A DESIGNER" },
    ],
  } as const);

export const EXPERIMENTS_OVERVIEW_SELECTION_IDS =
  atlasOverviewSelectionIds(EXPERIMENTS_OVERVIEW_SCAFFOLD);

export const EXPERIMENTS_OVERVIEW_SCAFFOLD_VALIDATION =
  validateAtlasOverviewAdapter(EXPERIMENTS_OVERVIEW_SCAFFOLD);
