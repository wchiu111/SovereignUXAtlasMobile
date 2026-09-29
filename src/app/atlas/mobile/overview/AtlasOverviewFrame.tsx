import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export interface AtlasOverviewFrameProps {
  target: HTMLElement | null;
  chrome?: ReactNode;
  narrative?: ReactNode;
}

/**
 * Viewport-UI portal for system overview chrome and narrative surfaces.
 *
 * Spatial constellations remain in the authored 390×844 scene. Chrome and
 * narrative UI render into the shared runtime viewport layer so Case Studies,
 * Frameworks, and future Experiments use the same coordinate system.
 *
 * Pass 1 introduces this primitive without migrating existing consumers.
 */
export default function AtlasOverviewFrame({
  target,
  chrome,
  narrative,
}: AtlasOverviewFrameProps) {
  if (!target) return null;

  return createPortal(
    <div
      data-atlas-overview-frame
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {chrome}
      {narrative}
    </div>,
    target,
  );
}
