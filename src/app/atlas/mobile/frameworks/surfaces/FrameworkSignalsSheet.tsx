import { createPortal } from "react-dom";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { T } from "../../components/mobileShared";
import type { FrameworkFocusItem } from "../frameworkOverviewData";
import {
  frameworkSignalConfigFor,
  type FrameworkRelationshipItem,
} from "../frameworkSignalData";
import {
  FrameworkSignalChip,
  frameworkSignalsFor,
} from "./FrameworkSignalRow";

const LINEAGE = "#D78368";
const DISMISS_DISTANCE = 84;
const DISMISS_MIN_VELOCITY = 0.52;
const DISMISS_DURATION = 190;

const SOURCE_URLS: Record<string, string> = {
  "agentic-insurance":
    "https://wchiudesign.com/case-studies/agentic-insurance",
  globality: "https://wchiudesign.com/case-studies/globality",
  oracle: "https://wchiudesign.com/case-studies/oracle",
  "sovereign-atlas-cs":
    "https://wchiudesign.com/case-studies/sovereign-atlas",
};

function titleCase(value: string) {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function relationshipPreviewEyebrow(
  relationship: FrameworkRelationshipItem,
) {
  return relationship.kind === "origin" ? "ORIGIN IN PRACTICE" : "APPLIED IN";
}

function sourceLabel(relationship: FrameworkRelationshipItem) {
  return `VIEW ${relationship.relatedLabel.toUpperCase()} ${relationship.relatedCategory} →`;
}

function RelationshipOrb({
  kind,
}: {
  kind: FrameworkRelationshipItem["kind"];
}) {
  const applied = kind === "applied-in";
  const color = applied ? T.frameworks : T.caseStudies;

  return (
    <span
      aria-hidden="true"
      style={{
        position: "relative",
        width: 34,
        height: 34,
        borderRadius: 999,
        flex: "0 0 auto",
        background: `radial-gradient(circle at 42% 38%, ${color}DD 0%, ${color}8A 24%, ${color}35 48%, rgba(5,5,10,0.18) 72%)`,
        border: `1px solid ${color}66`,
        boxShadow: `0 0 18px ${color}26, inset 0 0 12px rgba(255,255,255,0.08)`,
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 7,
          borderRadius: 999,
          border: "1px solid rgba(240,233,216,0.13)",
        }}
      />
    </span>
  );
}

function RelationshipRow({
  relationship,
  onOpen,
}: {
  relationship: FrameworkRelationshipItem;
  onOpen: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 12px",
        borderRadius: 10,
        border: "1px solid rgba(240,233,216,0.085)",
        background: pressed
          ? "rgba(215,131,104,0.085)"
          : "rgba(240,233,216,0.025)",
        color: "inherit",
        textAlign: "left",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        transform: pressed ? "scale(0.992)" : "scale(1)",
        transition: "background 130ms ease, transform 120ms ease",
      }}
    >
      <RelationshipOrb kind={relationship.kind} />

      <span style={{ minWidth: 0, flex: 1 }}>
        <span
          style={{
            display: "block",
            fontFamily: T.serif,
            fontSize: 16,
            fontWeight: 600,
            lineHeight: 1.1,
            color: "#F0E9D8",
          }}
        >
          {relationship.relatedLabel}
        </span>
        <span
          style={{
            display: "block",
            marginTop: 4,
            fontFamily: T.serif,
            fontSize: 12.5,
            lineHeight: 1.36,
            color: "rgba(240,233,216,0.56)",
          }}
        >
          {relationship.compactSummary}
        </span>
      </span>

      <span
        aria-hidden="true"
        style={{
          flex: "0 0 auto",
          fontFamily: T.mono,
          fontSize: 16,
          color: "rgba(240,233,216,0.54)",
        }}
      >
        ›
      </span>
    </button>
  );
}

function SheetHeader({
  frameworkTitle,
  detail,
  onBack,
  onDragStart,
  onDragMove,
  onDragEnd,
}: {
  frameworkTitle: string;
  detail: boolean;
  onBack?: () => void;
  onDragStart: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onDragMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onDragEnd: (event: ReactPointerEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      data-framework-signals-drag-zone
      onPointerDown={onDragStart}
      onPointerMove={onDragMove}
      onPointerUp={onDragEnd}
      onPointerCancel={onDragEnd}
      style={{
        padding: "0 20px 15px",
        borderBottom: "1px solid rgba(240,233,216,0.075)",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 38,
          height: 3,
          borderRadius: 999,
          background: "rgba(240,233,216,0.48)",
          margin: "8px auto 17px",
        }}
      />

      {detail ? (
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onBack}
          aria-label="Back to framework signals"
          style={{
            minHeight: 34,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: "none",
            background: "transparent",
            padding: 0,
            color: "rgba(240,233,216,0.72)",
            fontFamily: T.mono,
            fontSize: 8.5,
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
          }}
        >
          <span aria-hidden="true" style={{ fontSize: 15, lineHeight: 1 }}>
            ‹
          </span>
          BACK TO FRAMEWORK SIGNALS
        </button>
      ) : (
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 22,
              fontWeight: 600,
              lineHeight: 1.08,
              color: "#F0E9D8",
              textAlign: "left",
            }}
          >
            Framework Signals
          </div>
          <div
            style={{
              marginTop: 6,
              fontFamily: T.serif,
              fontSize: 12.5,
              lineHeight: 1.42,
              color: "rgba(240,233,216,0.52)",
              textAlign: "left",
            }}
          >
            Concepts and connections that define {titleCase(frameworkTitle)}.
          </div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({
  children,
  count,
  accent = T.frameworks,
}: {
  children: string;
  count?: number;
  accent?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          fontFamily: T.mono,
          fontSize: 8,
          letterSpacing: "0.18em",
          color: accent,
          opacity: 0.86,
        }}
      >
        {children}
      </div>
      {typeof count === "number" && (
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 8,
            color: accent,
            opacity: 0.58,
          }}
        >
          {count}
        </div>
      )}
    </div>
  );
}

function SignalsIndex({
  item,
  onSelectRelationship,
}: {
  item: FrameworkFocusItem;
  onSelectRelationship: (relationship: FrameworkRelationshipItem) => void;
}) {
  const config = frameworkSignalConfigFor(item.id);
  const allSignals = useMemo(() => frameworkSignalsFor(item), [item]);
  const coreSignals = allSignals.filter(
    (signal) => signal.kind === "identity" || signal.kind === "concept",
  );
  const origins = config.relationships.filter(
    (relationship) => relationship.kind === "origin",
  );
  const applied = config.relationships.filter(
    (relationship) => relationship.kind === "applied-in",
  );

  return (
    <div style={{ padding: "18px 20px 30px" }}>
      <section>
        <SectionLabel count={coreSignals.length}>CORE CONCEPTS</SectionLabel>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {coreSignals.map((signal) => (
            <FrameworkSignalChip key={signal.id} signal={signal} />
          ))}
        </div>
      </section>

      {origins.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <SectionLabel count={origins.length} accent={LINEAGE}>
            ORIGINS IN PRACTICE
          </SectionLabel>
          <div style={{ display: "grid", gap: 8 }}>
            {origins.map((relationship) => (
              <RelationshipRow
                key={relationship.id}
                relationship={relationship}
                onOpen={() => onSelectRelationship(relationship)}
              />
            ))}
          </div>
        </section>
      )}

      {applied.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <SectionLabel count={applied.length} accent={T.frameworks}>
            APPLIED IN
          </SectionLabel>
          <div style={{ display: "grid", gap: 8 }}>
            {applied.map((relationship) => (
              <RelationshipRow
                key={relationship.id}
                relationship={relationship}
                onOpen={() => onSelectRelationship(relationship)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SourceCta({
  relationship,
  onOpenSource,
}: {
  relationship: FrameworkRelationshipItem;
  onOpenSource?: (relationship: FrameworkRelationshipItem) => void;
}) {
  const href = SOURCE_URLS[relationship.relatedId];
  const baseStyle = {
    minHeight: 52,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    marginTop: 24,
    padding: "0 14px",
    borderRadius: 8,
    border: "1px solid rgba(138,174,200,0.22)",
    background: "rgba(138,174,200,0.045)",
    color: "rgba(176,205,226,0.92)",
    fontFamily: T.mono,
    fontSize: 8.5,
    fontWeight: 500,
    letterSpacing: "0.13em",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    boxSizing: "border-box" as const,
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
  };

  const content = (
    <>
      <span>{sourceLabel(relationship)}</span>
      <span aria-hidden="true" style={{ fontSize: 15, lineHeight: 1 }}>
        ↗
      </span>
    </>
  );

  if (onOpenSource) {
    return (
      <button
        type="button"
        onClick={() => onOpenSource(relationship)}
        style={baseStyle}
      >
        {content}
      </button>
    );
  }

  if (!href) return null;

  return (
    <a href={href} target="_blank" rel="noreferrer" style={baseStyle}>
      {content}
    </a>
  );
}

function RelationshipPreview({
  relationship,
  onOpenSource,
}: {
  relationship: FrameworkRelationshipItem;
  onOpenSource?: (relationship: FrameworkRelationshipItem) => void;
}) {
  return (
    <div style={{ padding: "24px 20px 34px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 13,
          marginBottom: 20,
        }}
      >
        <RelationshipOrb kind={relationship.kind} />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 7.5,
              letterSpacing: "0.17em",
              color:
                relationship.kind === "origin" ? LINEAGE : T.frameworks,
              marginBottom: 5,
            }}
          >
            {relationshipPreviewEyebrow(relationship)}
          </div>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 27,
              fontWeight: 600,
              lineHeight: 1.02,
              color: "#F0E9D8",
            }}
          >
            {relationship.relatedLabel}
          </div>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: "rgba(240,233,216,0.075)",
          marginBottom: 20,
        }}
      />

      <div
        style={{
          fontFamily: T.mono,
          fontSize: 7.5,
          letterSpacing: "0.17em",
          color: "rgba(240,233,216,0.46)",
          marginBottom: 9,
        }}
      >
        WHY IT CONNECTS
      </div>

      <p
        style={{
          margin: 0,
          fontFamily: T.serif,
          fontSize: 16,
          lineHeight: 1.58,
          color: "rgba(240,233,216,0.82)",
        }}
      >
        {relationship.summary}
      </p>

      <div
        style={{
          marginTop: 24,
          paddingTop: 20,
          borderTop: "1px solid rgba(240,233,216,0.06)",
        }}
      >
        <SourceCta
          relationship={relationship}
          onOpenSource={onOpenSource}
        />
      </div>
    </div>
  );
}

export default function FrameworkSignalsSheet({
  item,
  open,
  onClose,
  onOpenSource,
}: {
  item: FrameworkFocusItem;
  open: boolean;
  onClose: () => void;
  onOpenSource?: (relationship: FrameworkRelationshipItem) => void;
}) {
  const [activeRelationship, setActiveRelationship] =
    useState<FrameworkRelationshipItem | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [closing, setClosing] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const dragStartY = useRef(0);
  const dragStartTime = useRef(0);
  const dragLastY = useRef(0);
  const dragLastTime = useRef(0);
  const dragOffsetRef = useRef(0);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (open) {
      setDragOffset(0);
      dragOffsetRef.current = 0;
      setDragging(false);
      setClosing(false);
      return;
    }

    setActiveRelationship(null);
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();

      if (activeRelationship) {
        setActiveRelationship(null);
      } else {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeRelationship, onClose, open]);

  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (closing || event.button !== 0) return;

    event.currentTarget.setPointerCapture?.(event.pointerId);
    const now = performance.now();

    dragStartY.current = event.clientY;
    dragStartTime.current = now;
    dragLastY.current = event.clientY;
    dragLastTime.current = now;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    setDragging(true);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging || closing) return;

    const nextOffset = Math.max(0, event.clientY - dragStartY.current);
    const damped = nextOffset > 260 ? 260 + (nextOffset - 260) * 0.2 : nextOffset;

    dragOffsetRef.current = damped;
    dragLastY.current = event.clientY;
    dragLastTime.current = performance.now();
    setDragOffset(damped);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging || closing) return;

    event.currentTarget.releasePointerCapture?.(event.pointerId);

    const now = performance.now();
    const distance = dragOffsetRef.current;
    const recentDuration = Math.max(1, now - dragLastTime.current);
    const recentVelocity = Math.max(0, event.clientY - dragLastY.current) / recentDuration;
    const totalDuration = Math.max(1, now - dragStartTime.current);
    const totalVelocity = Math.max(0, event.clientY - dragStartY.current) / totalDuration;
    const velocity = Math.max(recentVelocity, totalVelocity);

    const shouldDismiss =
      distance >= DISMISS_DISTANCE ||
      (distance >= 24 && velocity >= DISMISS_MIN_VELOCITY);

    setDragging(false);

    if (!shouldDismiss) {
      dragOffsetRef.current = 0;
      setDragOffset(0);
      return;
    }

    setClosing(true);

    if (reducedMotion) {
      onClose();
      return;
    }

    const dismissOffset = Math.max(window.innerHeight, 720);
    dragOffsetRef.current = dismissOffset;
    setDragOffset(dismissOffset);

    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onClose();
    }, DISMISS_DURATION);
  };

  if (!open || typeof document === "undefined") return null;

  const transition = dragging
    ? "none"
    : closing
    ? `transform ${DISMISS_DURATION}ms cubic-bezier(0.4,0,1,1), opacity ${DISMISS_DURATION}ms ease`
    : "transform 220ms cubic-bezier(0.22,1,0.36,1)";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Framework signals for ${item.title}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <button
        type="button"
        aria-label="Dismiss framework signals"
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          border: "none",
          background: "rgba(2,3,7,0.64)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          padding: 0,
          cursor: "default",
          opacity: Math.max(0.25, 1 - dragOffset / 520),
          transition: dragging ? "none" : "opacity 180ms ease",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "min(100%, 430px)",
          maxHeight: "74vh",
          minHeight: activeRelationship ? 390 : 420,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px 20px 0 0",
          border: "1px solid rgba(138,174,200,0.16)",
          borderBottom: "none",
          background:
            "linear-gradient(180deg, rgba(12,15,24,0.995), rgba(6,7,12,0.998))",
          boxShadow: "0 -24px 80px rgba(0,0,0,0.58)",
          transform: `translateY(${dragOffset}px)`,
          opacity: closing ? 0.96 : 1,
          transition,
          animation:
            !dragging && !closing && dragOffset === 0 && !reducedMotion
              ? "frameworkSignalsSheetIn 300ms cubic-bezier(0.22,1,0.36,1) both"
              : undefined,
          willChange: "transform, opacity",
        }}
      >
        <style>{`
          @keyframes frameworkSignalsSheetIn {
            from { transform: translateY(28px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            [data-framework-signals-sheet] {
              animation: none !important;
              transition-duration: 1ms !important;
            }
          }
        `}</style>

        <div data-framework-signals-sheet style={{ display: "contents" }}>
          <SheetHeader
            frameworkTitle={item.title}
            detail={Boolean(activeRelationship)}
            onBack={
              activeRelationship
                ? () => setActiveRelationship(null)
                : undefined
            }
            onDragStart={beginDrag}
            onDragMove={moveDrag}
            onDragEnd={endDrag}
          />

          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              overscrollBehaviorY: "contain",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {activeRelationship ? (
              <RelationshipPreview
                relationship={activeRelationship}
                onOpenSource={onOpenSource}
              />
            ) : (
              <SignalsIndex
                item={item}
                onSelectRelationship={setActiveRelationship}
              />
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
