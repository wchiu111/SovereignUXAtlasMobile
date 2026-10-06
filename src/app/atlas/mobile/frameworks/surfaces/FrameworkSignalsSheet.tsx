import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";

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

function titleCase(value: string) {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function relationshipGroupTitle(kind: FrameworkRelationshipItem["kind"]) {
  return kind === "origin" ? "ORIGINS IN PRACTICE" : "APPLIED IN";
}

function relationshipPreviewEyebrow(
  relationship: FrameworkRelationshipItem,
) {
  return relationship.kind === "origin" ? "ORIGIN IN PRACTICE" : "APPLIED IN";
}

function RelationshipOrb({ kind }: { kind: FrameworkRelationshipItem["kind"] }) {
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
  title,
  subtitle,
  onClose,
  onBack,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  onBack?: () => void;
}) {
  return (
    <div
      style={{
        padding: "0 20px 15px",
        borderBottom: "1px solid rgba(240,233,216,0.075)",
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40px minmax(0,1fr) 40px",
          alignItems: "start",
          gap: 8,
        }}
      >
        <div>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to framework signals"
              style={{
                width: 40,
                minHeight: 40,
                border: "none",
                background: "transparent",
                padding: 0,
                color: "rgba(240,233,216,0.76)",
                fontFamily: T.mono,
                fontSize: 18,
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              ‹
            </button>
          )}
        </div>

        <div style={{ minWidth: 0, paddingTop: 3 }}>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 22,
              fontWeight: 600,
              lineHeight: 1.08,
              color: "#F0E9D8",
              textAlign: onBack ? "center" : "left",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                marginTop: 6,
                fontFamily: T.serif,
                fontSize: 12.5,
                lineHeight: 1.42,
                color: "rgba(240,233,216,0.52)",
                textAlign: onBack ? "center" : "left",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close framework signals"
          style={{
            width: 40,
            minHeight: 40,
            border: "none",
            background: "transparent",
            padding: 0,
            color: "rgba(240,233,216,0.72)",
            fontFamily: T.mono,
            fontSize: 18,
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          ×
        </button>
      </div>
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

function RelationshipPreview({
  relationship,
}: {
  relationship: FrameworkRelationshipItem;
}) {
  return (
    <div style={{ padding: "24px 22px 34px" }}>
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
          paddingTop: 16,
          borderTop: "1px solid rgba(240,233,216,0.06)",
          fontFamily: T.mono,
          fontSize: 7.5,
          letterSpacing: "0.15em",
          color: "rgba(240,233,216,0.38)",
        }}
      >
        RELATED {relationship.relatedCategory}
      </div>
    </div>
  );
}

export default function FrameworkSignalsSheet({
  item,
  open,
  onClose,
}: {
  item: FrameworkFocusItem;
  open: boolean;
  onClose: () => void;
}) {
  const [activeRelationship, setActiveRelationship] =
    useState<FrameworkRelationshipItem | null>(null);

  useEffect(() => {
    if (!open) setActiveRelationship(null);
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

  if (!open || typeof document === "undefined") return null;

  const title = activeRelationship
    ? activeRelationship.relatedLabel
    : "Framework Signals";
  const subtitle = activeRelationship
    ? undefined
    : `Concepts and connections that define ${titleCase(item.title)}.`;

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
        aria-label="Close framework signals"
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
          animation: "frameworkSignalsSheetIn 300ms cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        <style>{`
          @keyframes frameworkSignalsSheetIn {
            from { transform: translateY(28px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            [role="dialog"] > div:last-child {
              animation: none !important;
            }
          }
        `}</style>

        <SheetHeader
          title={title}
          subtitle={subtitle}
          onClose={onClose}
          onBack={
            activeRelationship
              ? () => setActiveRelationship(null)
              : undefined
          }
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
            <RelationshipPreview relationship={activeRelationship} />
          ) : (
            <SignalsIndex
              item={item}
              onSelectRelationship={setActiveRelationship}
            />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
