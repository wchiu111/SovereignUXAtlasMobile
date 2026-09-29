import {
  MOBILE_CHROME_MIN_HEIGHT,
  MOBILE_CONTENT_INSET,
  MOBILE_NARRATIVE_SURFACE_BOTTOM,
  MOBILE_NARRATIVE_SURFACE_TOP,
} from "../components/mobileShared";

/**
 * Shared presentation contract for Atlas system overviews.
 *
 * Pass 1 only defines these values. Existing Case Studies and Frameworks
 * consumers are intentionally untouched so this pass produces no visible
 * change. Later passes will migrate both systems onto this contract.
 */

export const ATLAS_OVERVIEW_MAX_WIDTH = 430;

/**
 * A small shared downward adjustment from the current Case Studies chrome
 * position. This is the agreed visual midpoint between the current Case Studies
 * and Frameworks overview screenshots.
 */
export const ATLAS_OVERVIEW_CHROME_OFFSET_Y = 6;

/**
 * Shared narrative surface target. This deliberately sits between the current
 * Case Studies and Frameworks compositions while remaining bounded on shorter
 * devices.
 */
export const ATLAS_OVERVIEW_NARRATIVE_HEIGHT = "min(400px, 48dvh)";

export const ATLAS_OVERVIEW_CONTENT_INSET = MOBILE_CONTENT_INSET;
export const ATLAS_OVERVIEW_CHROME_MIN_HEIGHT = MOBILE_CHROME_MIN_HEIGHT;
export const ATLAS_OVERVIEW_NARRATIVE_TOP =
  MOBILE_NARRATIVE_SURFACE_TOP;
export const ATLAS_OVERVIEW_NARRATIVE_BOTTOM =
  MOBILE_NARRATIVE_SURFACE_BOTTOM;

export const ATLAS_OVERVIEW_SAFE_AREA_TOP =
  "env(safe-area-inset-top, 0px)";
export const ATLAS_OVERVIEW_SAFE_AREA_BOTTOM =
  "env(safe-area-inset-bottom, 0px)";

export const ATLAS_OVERVIEW_FRAME = {
  maxWidth: ATLAS_OVERVIEW_MAX_WIDTH,
  contentInset: ATLAS_OVERVIEW_CONTENT_INSET,
  chromeMinHeight: ATLAS_OVERVIEW_CHROME_MIN_HEIGHT,
  chromeOffsetY: ATLAS_OVERVIEW_CHROME_OFFSET_Y,
  narrativeHeight: ATLAS_OVERVIEW_NARRATIVE_HEIGHT,
  narrativeTopPadding: ATLAS_OVERVIEW_NARRATIVE_TOP,
  narrativeBottomPadding: ATLAS_OVERVIEW_NARRATIVE_BOTTOM,
  safeAreaTop: ATLAS_OVERVIEW_SAFE_AREA_TOP,
  safeAreaBottom: ATLAS_OVERVIEW_SAFE_AREA_BOTTOM,
} as const;
