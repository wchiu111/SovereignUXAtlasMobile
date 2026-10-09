import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { T } from "../components/mobileShared";

export type AtlasSignalKind = "identity" | "concept";

export interface AtlasSignalDescriptor {
  id: string;
  kind: AtlasSignalKind;
  label: string;
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

export function AtlasSignalChip({
  signal,
  pressed = false,
}: {
  signal: AtlasSignalDescriptor;
  pressed?: boolean;
}) {
  const identity = signal.kind === "identity";

  return (
    <span
      style={{
        ...chipBase,
        border: identity
          ? "1px solid rgba(232,200,109,0.58)"
          : "1px solid rgba(240,233,216,0.17)",
        background: identity
          ? pressed
            ? "rgba(232,200,109,0.15)"
            : "rgba(232,200,109,0.055)"
          : "rgba(240,233,216,0.025)",
        color: identity
          ? "rgba(245,235,210,0.94)"
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
      {signal.label}
    </span>
  );
}

function MoreChip({
  count,
  accent,
  onClick,
}: {
  count: number;
  accent: string;
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
      aria-label={`Show ${count} more signals`}
      style={{
        ...chipBase,
        border: `1px solid ${accent}5C`,
        background: pressed ? `${accent}1F` : `${accent}0A`,
        color: `${accent}E6`,
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
 * Shared one-line signal summary for mobile Atlas preview drawers.
 *
 * Invariants:
 * - one line only
 * - no wrapping
 * - no horizontal scrolling
 * - complete signal labels only
 * - reserve room for +N MORE before exposing another signal
 */
export default function AtlasSignalRow({
  signals,
  accent,
  onMore,
}: {
  signals: readonly AtlasSignalDescriptor[];
  accent: string;
  onMore: () => void;
}) {
  const stableSignals = useMemo(() => [...signals], [signals]);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRefs = useRef(new Map<string, HTMLSpanElement>());
  const moreMeasureRefs = useRef(new Map<number, HTMLSpanElement>());
  const [visibleCount, setVisibleCount] = useState(
    Math.min(2, stableSignals.length),
  );

  useEffect(() => {
    setVisibleCount(Math.min(2, stableSignals.length));
  }, [stableSignals.length, stableSignals[0]?.id]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || stableSignals.length === 0) return;

    const calculate = () => {
      const available = container.getBoundingClientRect().width;
      if (available <= 0) return;

      const widths = stableSignals.map(
        (signal) => measureRefs.current.get(signal.id)?.offsetWidth ?? 0,
      );

      let nextVisible = stableSignals.length;

      for (
        let candidate = stableSignals.length;
        candidate >= 1;
        candidate -= 1
      ) {
        const hidden = stableSignals.length - candidate;
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

      setVisibleCount(
        Math.max(1, Math.min(nextVisible, stableSignals.length)),
      );
    };

    calculate();

    const observer = new ResizeObserver(calculate);
    observer.observe(container);
    window.addEventListener("resize", calculate);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculate);
    };
  }, [stableSignals]);

  if (stableSignals.length === 0) return null;

  const hiddenCount = Math.max(0, stableSignals.length - visibleCount);

  return (
    <div
      ref={containerRef}
      data-atlas-signal-row
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
        {stableSignals.slice(0, visibleCount).map((signal) => (
          <AtlasSignalChip key={signal.id} signal={signal} />
        ))}

        {hiddenCount > 0 && (
          <MoreChip count={hiddenCount} accent={accent} onClick={onMore} />
        )}
      </div>

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
        {stableSignals.map((signal) => (
          <span
            key={signal.id}
            ref={(node) => {
              if (node) measureRefs.current.set(signal.id, node);
              else measureRefs.current.delete(signal.id);
            }}
          >
            <AtlasSignalChip signal={signal} />
          </span>
        ))}

        {Array.from(
          { length: Math.max(0, stableSignals.length - 1) },
          (_, index) => {
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
                  border: `1px solid ${accent}5C`,
                }}
              >
                +{count} MORE
              </span>
            );
          },
        )}
      </div>
    </div>
  );
}
