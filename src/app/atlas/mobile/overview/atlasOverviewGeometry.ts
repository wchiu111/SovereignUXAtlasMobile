import type { CSSProperties } from "react";

import {
  ATLAS_OVERVIEW_CHROME_MIN_HEIGHT,
  ATLAS_OVERVIEW_CHROME_OFFSET_Y,
  ATLAS_OVERVIEW_CONTENT_INSET,
  ATLAS_OVERVIEW_NARRATIVE_BOTTOM,
  ATLAS_OVERVIEW_NARRATIVE_HEIGHT,
  ATLAS_OVERVIEW_NARRATIVE_TOP,
} from "./atlasOverviewLayout";

/**
 * Shared geometry helpers for future overview chrome/drawer consumers.
 *
 * These functions return structural styles only. System identity color,
 * opacity, animation state, content, and interaction remain consumer-owned.
 */

export function atlasOverviewChromeGeometry(): CSSProperties {
  return {
    position: "absolute",
    top: ATLAS_OVERVIEW_CHROME_OFFSET_Y,
    left: 0,
    right: 0,
    minHeight: ATLAS_OVERVIEW_CHROME_MIN_HEIGHT,
    padding: `max(0px, env(safe-area-inset-top)) ${ATLAS_OVERVIEW_CONTENT_INSET} 0`,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  };
}

export function atlasOverviewNarrativeGeometry(): CSSProperties {
  return {
    position: "absolute",
    top: "auto",
    bottom: 0,
    left: 0,
    right: 0,
    height: ATLAS_OVERVIEW_NARRATIVE_HEIGHT,
    boxSizing: "border-box",
    padding: `${ATLAS_OVERVIEW_NARRATIVE_TOP}px ${ATLAS_OVERVIEW_CONTENT_INSET} calc(${ATLAS_OVERVIEW_NARRATIVE_BOTTOM}px + env(safe-area-inset-bottom, 0px))`,
    display: "flex",
    flexDirection: "column",
  };
}
