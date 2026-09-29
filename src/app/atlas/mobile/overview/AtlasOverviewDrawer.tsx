import type { CSSProperties, ReactNode } from "react";

import { atlasOverviewNarrativeGeometry } from "./atlasOverviewGeometry";
import type { AtlasOverviewDrawerPhase } from "./atlasOverviewTypes";

export interface AtlasOverviewDrawerProps {
  title: string;
  color: string;
  titleColor?: string;
  titleLetterSpacing?: CSSProperties["letterSpacing"];
  countLabel?: string;
  phase: AtlasOverviewDrawerPhase;
  arrivalVisible?: boolean;
  reducedMotion?: boolean;
  closeDurationMs: number;
  reducedDurationMs: number;
  compact?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * Shared narrative surface shell for Atlas system overviews.
 *
 * The shell owns presentation invariants:
 * - shared viewport-relative geometry
 * - title / count alignment
 * - divider placement
 * - background / blur / border treatment
 * - drawer reveal / close motion
 * - safe-area-aware padding
 * - footer slot geometry
 *
 * System-specific copy and CTA semantics remain in the consumer.
 *
 * `compact` preserves the same shell and hierarchy while allowing short
 * previews to size naturally to their content instead of inheriting the
 * full narrative-surface height.
 */
export default function AtlasOverviewDrawer({
  title,
  color,
  titleColor,
  titleLetterSpacing,
  countLabel,
  phase,
  arrivalVisible = true,
  reducedMotion = false,
  closeDurationMs,
  reducedDurationMs,
  compact = false,
  children,
  footer,
}: AtlasOverviewDrawerProps) {
  const translateY = reducedMotion
    ? "0%"
    : phase === "closing"
    ? "100%"
    : arrivalVisible
    ? "0%"
    : "18px";

  const opacity =
    phase === "closing"
      ? reducedMotion
        ? 0
        : 0.08
      : arrivalVisible
      ? 1
      : 0;

  return (
    <div
      data-atlas-overview-drawer
      style={{
        ...atlasOverviewNarrativeGeometry(),
        ...(compact ? { height: "auto" } : {}),
        borderTop: `1px solid ${color}44`,
        background: "rgba(5,5,10,0.96)",
        backdropFilter: "blur(26px)",
        WebkitBackdropFilter: "blur(26px)",
        transform: `translateY(${translateY})`,
        opacity,
        transition: reducedMotion
          ? `opacity ${reducedDurationMs}ms ease`
          : phase === "closing"
          ? `transform ${closeDurationMs}ms cubic-bezier(0.4,0,0.2,1), opacity 180ms ease`
          : "transform 360ms cubic-bezier(0.22,1,0.36,1), opacity 260ms ease",
        willChange: "transform, opacity",
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          minWidth: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              minWidth: 0,
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: titleLetterSpacing ?? "0.10em",
              color: titleColor ?? color,
              opacity: 0.98,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>

          {countLabel && (
            <div
              style={{
                flexShrink: 0,
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.14em",
                color: "#C8A96E",
                opacity: 0.62,
              }}
            >
              {countLabel}
            </div>
          )}
        </div>

        <div
          style={{
            height: 0.5,
            background: `${color}24`,
            marginBottom: 16,
          }}
        />

        <div
          style={{
            minWidth: 0,
            flex: compact ? "0 0 auto" : 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>

        {footer && (
          <div
            style={{
              marginTop: compact ? 22 : "auto",
              paddingTop: 18,
              borderTop: "0.5px solid rgba(240,233,216,0.10)",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
