/**
 * Shared Atlas overview motion vocabulary.
 *
 * These timings define the interaction grammar common to Case Studies,
 * Frameworks, and future Experiments. System-specific entry/exit choreography,
 * geometry transitions, and breath staggering remain local to each system.
 */

export const ATLAS_OVERVIEW_SELECTION_PULSE_DURATION = 420;
export const ATLAS_OVERVIEW_DRAWER_CLOSE_DURATION = 240;
export const ATLAS_OVERVIEW_DRAWER_OPEN_DURATION = 320;
export const ATLAS_OVERVIEW_LABEL_REVEAL_DELAY = 110;
export const ATLAS_OVERVIEW_CHROME_REVEAL_DELAY = 170;

export const ATLAS_OVERVIEW_REDUCED_DRAWER_DURATION = 140;

export const ATLAS_OVERVIEW_READING_HANDOFF_DURATION = 520;
export const ATLAS_OVERVIEW_REDUCED_HANDOFF_DURATION = 160;

export const ATLAS_OVERVIEW_RETURN_DURATION = 480;
export const ATLAS_OVERVIEW_REDUCED_RETURN_DURATION = 160;

export const ATLAS_OVERVIEW_SELECTION_EASE =
  "cubic-bezier(0.22,1,0.36,1)";

export const ATLAS_OVERVIEW_MOTION = {
  selectionPulse: ATLAS_OVERVIEW_SELECTION_PULSE_DURATION,
  drawerClose: ATLAS_OVERVIEW_DRAWER_CLOSE_DURATION,
  drawerOpen: ATLAS_OVERVIEW_DRAWER_OPEN_DURATION,
  labelRevealDelay: ATLAS_OVERVIEW_LABEL_REVEAL_DELAY,
  chromeRevealDelay: ATLAS_OVERVIEW_CHROME_REVEAL_DELAY,
  reducedDrawer: ATLAS_OVERVIEW_REDUCED_DRAWER_DURATION,
  readingHandoff: ATLAS_OVERVIEW_READING_HANDOFF_DURATION,
  reducedHandoff: ATLAS_OVERVIEW_REDUCED_HANDOFF_DURATION,
  returnDuration: ATLAS_OVERVIEW_RETURN_DURATION,
  reducedReturn: ATLAS_OVERVIEW_REDUCED_RETURN_DURATION,
  selectionEase: ATLAS_OVERVIEW_SELECTION_EASE,
} as const;
