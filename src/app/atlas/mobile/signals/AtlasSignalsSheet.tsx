import { createPortal } from "react-dom";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { T } from "../components/mobileShared";
import {
  AtlasSignalChip,
  type AtlasSignalDescriptor,
} from "./AtlasSignalRow";

const DISMISS_DISTANCE = 84;
const DISMISS_MIN_VELOCITY = 0.52;
const DISMISS_DURATION = 190;

function displayTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bAi\b/g, "AI")
    .replace(/\bUx\b/g, "UX");
}

function SheetHeader({
  title,
  subjectTitle,
  onDragStart,
  onDragMove,
  onDragEnd,
}: {
  title: string;
  subjectTitle: string;
  onDragStart: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onDragMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onDragEnd: (event: ReactPointerEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      data-atlas-signals-drag-zone
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
          {title}
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
          Concepts that define {displayTitle(subjectTitle)}.
        </div>
      </div>
    </div>
  );
}

export default function AtlasSignalsSheet({
  title,
  subjectTitle,
  signals,
  accent,
  open,
  onClose,
}: {
  title: string;
  subjectTitle: string;
  signals: readonly AtlasSignalDescriptor[];
  accent: string;
  open: boolean;
  onClose: () => void;
}) {
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
      onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

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
    const damped =
      nextOffset > 260 ? 260 + (nextOffset - 260) * 0.2 : nextOffset;

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
    const recentVelocity =
      Math.max(0, event.clientY - dragLastY.current) / recentDuration;
    const totalDuration = Math.max(1, now - dragStartTime.current);
    const totalVelocity =
      Math.max(0, event.clientY - dragStartY.current) / totalDuration;
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
      aria-label={`${title} for ${subjectTitle}`}
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
        aria-label={`Dismiss ${title.toLowerCase()}`}
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
        data-atlas-signals-sheet
        style={{
          position: "relative",
          width: "min(100%, 430px)",
          maxHeight: "56vh",
          minHeight: 260,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px 20px 0 0",
          border: `1px solid ${accent}29`,
          borderBottom: "none",
          background:
            "linear-gradient(180deg, rgba(12,15,24,0.995), rgba(6,7,12,0.998))",
          boxShadow: "0 -24px 80px rgba(0,0,0,0.58)",
          transform: `translateY(${dragOffset}px)`,
          opacity: closing ? 0.96 : 1,
          transition,
          animation:
            !dragging && !closing && dragOffset === 0 && !reducedMotion
              ? "atlasSignalsSheetIn 300ms cubic-bezier(0.22,1,0.36,1) both"
              : undefined,
          willChange: "transform, opacity",
        }}
      >
        <style>{`
          @keyframes atlasSignalsSheetIn {
            from { transform: translateY(28px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            [data-atlas-signals-sheet] {
              animation: none !important;
              transition-duration: 1ms !important;
            }
          }
        `}</style>

        <SheetHeader
          title={title}
          subjectTitle={subjectTitle}
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
            padding: "18px 20px 30px",
          }}
        >
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
              CORE CONCEPTS
            </div>
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 8,
                color: accent,
                opacity: 0.58,
              }}
            >
              {signals.length}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {signals.map((signal) => (
              <AtlasSignalChip key={signal.id} signal={signal} />
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
