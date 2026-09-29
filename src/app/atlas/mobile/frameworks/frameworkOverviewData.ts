import { MOBILE_FRAMEWORKS } from "./frameworkRegistry";
import { FRAMEWORK_LABEL_LINES } from "./frameworkGeometry";

/**
 * Overview-specific presentation data for the five active frameworks.
 *
 * The registry remains the source of truth for authored framework documents.
 * This focus dataset adds only overview/presentation metadata so visual
 * interaction can evolve without polluting the content documents.
 */
export const FRAMEWORK_FOCUS_ITEMS = MOBILE_FRAMEWORKS.map(
  (framework, index) => ({
    ...framework,
    meta: `FRAMEWORK ${index + 1} OF ${MOBILE_FRAMEWORKS.length}`,
    labelLines: FRAMEWORK_LABEL_LINES[framework.id],
  }),
);

export const FRAMEWORKS_COLLECTION_OVERVIEW = {
  id: "frameworks",
  title: "FRAMEWORKS",
  meta: `${MOBILE_FRAMEWORKS.length} FRAMEWORKS`,
  headline: "See how recurring design problems become reusable systems.",
  body:
    "These frameworks organize questions of authority, behavior, attention, relational interaction, and system integrity into structures that can be applied across products.",
  invitation:
    "Select a framework to understand the problem it addresses, the relationship it preserves, and the interaction model that follows.",
} as const;

export type FrameworkFocusItem = (typeof FRAMEWORK_FOCUS_ITEMS)[number];
