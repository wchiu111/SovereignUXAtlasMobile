import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { T } from "../../components/mobileShared";
import type { FrameworkFocusItem } from "../frameworkOverviewData";
import {
  frameworkSignalConfigFor,
  type FrameworkRelationshipKind,
} from "../frameworkSignalData";

export type FrameworkSignalKind =
  | "identity"
  | "concept"
  | "relationship";

export interface FrameworkSignalDescriptor {
  id: string;
  kind: FrameworkSignalKind;
  label: string;
  relationshipKind?: FrameworkRelationshipKind;
}

const GAP = 7;

const chipBase: CSSProperties = {
  minHeight: 27,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  flex: "0 0 auto",
  padding: "0 9px",
  borderRadius: 999,
  whiteSpace: "nowrap",
  fontFamily: T.mono,
  fontSize: 7.6,
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  boxSizing: "border-box",
};

export function FrameworkSignalChip({
  signal,
  pressed = false,
}: {
  signal: FrameworkSignalDescriptor;
  pressed?: boolean;
}) {
  const identity = signal.kind === "identity";
  const relationship = signal.kind === "relationship";

  return (
    <span
      style={{
        ...chipBase,
        border: identity
          ? "1px solid rgba(232,200,109,0.58)"
          : relationship
          ? "1px solid rgba(215,131,104,0.46)"
          : "1px solid rgba(240,233,216,0.17)",
        background: identity
          ? pressed
            ? "rgba(232,200,109,0.15)"
            : "rgba(232,200,109,0.055)"
          : relationship
          ? "rgba(215,131,104,0.055)"
          : "rgba(240,233,216,0.025)",
        color: identity
          ? "rgba(245,235,210,0.94)"
          : relationship
          ? "rgba(222,143,113,0.90)"
          : "rgba(240,233,216,0.66)",
        boxShadow: identity
          ? pressed
            ? "0 0 18px rgba(232,200,109,0.20), inset 0 0 12px rgba(232,200,109,0.06)"
            : "0 0 12px rgba(232,200,109,0.08)"
          : "none",
        transition:
          "background 140ms ease, border-color 140ms ease, box-shadow 160ms ease, transform 140ms ease",
        transform: pressed ? "scale(0.985)" : "scale(1)",
      }}
    >
      {identity && (
        <span
          aria-hidden="true"
          style={{
            width: 5.5,
            height: 5.5,
            borderRadius: 999,
            background: T.identityGold,
            boxShadow: "0 0 9px rgba(232,200,109,0.72)",
            flex: "0 0 auto",
          }}
        />
      )}
      {relationship && (
        <span
          aria-hidden="true"
          style={{
            width: 5,
            height: 5,
            borderRadius: 999,
            background: "#D78368",
            boxShadow: "0 0 8px rgba(215,131,104,0.44)",
            flex: "0 0 auto",
          }}
        />
      )}
      {signal.label}
    </span>
  );
}

function relationshipSignals(item: FrameworkFocusItem) {
  const config = frameworkSignalConfigFor(item.id);
  const origins = config.relationships.filter(
    (relationship) => relationship.kind === "origin",
  );
  const applied = config.relationships.filter(
    (relationship) => relationship.kind === "applied-in",
  );

  const signals: FrameworkSignalDescriptor[] = [];

  if (origins.length > 0) {
    signals.push({
      id: `${item.id}-origins`,
      kind: "relationship",
      relationshipKind: "origin",
      label: `${origins.length} ${origins.length === 1 ? "ORIGIN" : "ORIGINS"}`,
    });
  }

  if (applied.length > 0) {
    signals.push({
      id: `${item.id}-applied-in`,
      kind: "relationship",
      relationshipKind: "applied-in",
      label: "APPLIED IN",
    });
  }

  return signals;
}

export function frameworkSignalsFor(
  item: FrameworkFocusItem,
): FrameworkSignalDescriptor[] {
  const config = frameworkSignalConfigFor(item.id);

  return [
    {
      id: `${item.id}-identity`,
      kind: "identity",
      label: config.identity,
    },
    ...item.tags.map((tag) => ({
      id: `${item.id}-${tag.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      kind: "concept" as const,
      label: tag,
    })),
    ...relationshipSignals(item),
  ];
}

function MoreChip({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      aria-label={`Show ${count} more framework signals`}
      style={{
        ...chipBase,
        border: "1px solid rgba(138,174,200,0.36)",
        background: pressed
          ? "rgba(138,174,200,0.13)"
          : "rgba(138,174,200,0.04)",
        color: "rgba(176,205,226,0.88)",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        transform: pressed ? "scale(0.975)" : "scale(1)",
        transition: "background 140ms ease, transform 120ms ease",
      }}
    >
      +{count} MORE
    </button>
  );
}

/**
 * A strict one-line signal summary.
 *
 * The component measures the available width and always reserves enough room
 * for the +N MORE control before exposing another signal. It never wraps and
 * never becomes horizontally scrollable.
 */
export default function FrameworkSignalRow({
  item,
  onMore,
}: {
  item: FrameworkFocusItem;
  onMore: () => void;
}) {
  const signals = useMemo(() => frameworkSignalsFor(item), [item]);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRefs = useRef(new Map<string, HTMLSpanElement>());
  const moreMeasureRefs = useRef(new Map<number, HTMLSpanElement>());
  const [visibleCount, setVisibleCount] = useState(
    Math.min(2, signals.length),
  );

  useEffect(() => {
    setVisibleCount(Math.min(2, signals.length));
  }, [item.id, signals.length]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculate = () => {
      const available = container.getBoundingClientRect().width;
      if (available <= 0) return;

      const widths = signals.map(
        (signal) => measureRefs.current.get(signal.id)?.offsetWidth ?? 0,
      );

      let nextVisible = signals.length;

      for (let candidate = signals.length; candidate >= 1; candidate -= 1) {
        const hidden = signals.length - candidate;
        const signalWidth = widths
          .slice(0, candidate)
          .reduce((sum, width) => sum + width, 0);
        const signalGaps = Math.max(0, candidate - 1) * GAP;

        if (hidden === 0) {
          if (signalWidth + signalGaps <= available) {
            nextVisible = candidate;
            break;
          }
          continue;
        }

        const moreWidth = moreMeasureRefs.current.get(hidden)?.offsetWidth ?? 0;
        const total = signalWidth + signalGaps + GAP + moreWidth;

        if (total <= available) {
          nextVisible = candidate;
          break;
        }
      }

      setVisibleCount(Math.max(1, Math.min(nextVisible, signals.length)));
    };

    calculate();

    const observer = new ResizeObserver(calculate);
    observer.observe(container);
    window.addEventListener("resize", calculate);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculate);
    };
  }, [signals]);

  const hiddenCount = Math.max(0, signals.length - visibleCount);

  return (
    <div
      ref={containerRef}
      data-framework-signal-row
      style={{
        position: "relative",
        width: "100%",
        minWidth: 0,
        height: 27,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: GAP,
          width: "100%",
          minWidth: 0,
        }}
      >
        {signals.slice(0, visibleCount).map((signal) => (
          <FrameworkSignalChip key={signal.id} signal={signal} />
        ))}

        {hiddenCount > 0 && (
          <MoreChip count={hiddenCount} onClick={onMore} />
        )}
      </div>

      {/* Invisible measurement layer: mirrors the real chip styles exactly. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: -10000,
          top: -10000,
          visibility: "hidden",
          display: "flex",
          alignItems: "center",
          gap: GAP,
          pointerEvents: "none",
        }}
      >
        {signals.map((signal) => (
          <span
            key={signal.id}
            ref={(node) => {
              if (node) measureRefs.current.set(signal.id, node);
              else measureRefs.current.delete(signal.id);
            }}
          >
            <FrameworkSignalChip signal={signal} />
          </span>
        ))}

        {Array.from({ length: Math.max(0, signals.length - 1) }, (_, index) => {
          const count = index + 1;
          return (
            <span
              key={`more-${count}`}
              ref={(node) => {
                if (node) moreMeasureRefs.current.set(count, node);
                else moreMeasureRefs.current.delete(count);
              }}
              style={{
                ...chipBase,
                border: "1px solid rgba(138,174,200,0.36)",
              }}
            >
              +{count} MORE
            </span>
          );
        })}
      </div>
    </div>
  );
}
