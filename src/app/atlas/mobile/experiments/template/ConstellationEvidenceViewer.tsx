import { useEffect, useRef, useState } from "react";
import { T } from "../../components/mobileShared";
import type { ConstellationEvidence } from "./constellationTypes";

function InspectableEvidenceImage({
  item,
  domainColor,
}: {
  item: ConstellationEvidence;
  domainColor: string;
}) {
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ distance: number; scale: number } | null>(
    null,
  );
  const panStart = useRef<{
    x: number;
    y: number;
    tx: number;
    ty: number;
  } | null>(null);
  const lastTap = useRef(0);

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const reset = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    pinchStart.current = null;
    panStart.current = null;
  };

  const distance = () => {
    const pts = [...pointers.current.values()];
    if (pts.length < 2) return 0;
    return Math.hypot(
      pts[1].x - pts[0].x,
      pts[1].y - pts[0].y,
    );
  };

  const clampScale = (next: number) =>
    Math.min(4, Math.max(1, next));

  function onPointerDown(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointers.current.size === 1 && scale > 1) {
      panStart.current = {
        x: event.clientX,
        y: event.clientY,
        tx: translate.x,
        ty: translate.y,
      };
    }

    if (pointers.current.size === 2) {
      pinchStart.current = {
        distance: distance(),
        scale,
      };
      panStart.current = null;
    }
  }

  function onPointerMove(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    if (!pointers.current.has(event.pointerId)) return;

    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointers.current.size >= 2 && pinchStart.current) {
      const nextDistance = distance();
      if (pinchStart.current.distance > 0) {
        setScale(
          clampScale(
            pinchStart.current.scale *
              (nextDistance / pinchStart.current.distance),
          ),
        );
      }
      return;
    }

    if (
      pointers.current.size === 1 &&
      panStart.current &&
      scale > 1
    ) {
      setTranslate({
        x:
          panStart.current.tx +
          (event.clientX - panStart.current.x),
        y:
          panStart.current.ty +
          (event.clientY - panStart.current.y),
      });
    }
  }

  function onPointerUp(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) panStart.current = null;
  }

  function onDoubleTap() {
    const now = Date.now();
    if (now - lastTap.current < 280) {
      if (scale > 1) reset();
      else setScale(2);
    }
    lastTap.current = now;
  }

  return (
    <>
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
        onClick={onDoubleTap}
        className="atlas-template-evidence-inspectable"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "clamp(220px, 44dvh, 360px)",
          maxHeight: "min(55dvh, 510px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(3,3,8,0.99)",
          touchAction: "none",
          cursor: scale > 1 ? "grab" : "zoom-in",
          borderBottom: `0.5px solid ${domainColor}22`,
        }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.alt}
            draggable={false}
            style={{
              width: "100%",
              maxHeight: "min(55dvh, 510px)",
              objectFit: item.imageFit,
              display: "block",
              transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
              transformOrigin: "center center",
              transition:
                pointers.current.size > 0
                  ? "none"
                  : "transform 160ms ease",
              userSelect: "none",
              WebkitUserDrag: "none",
            }}
          />
        ) : (
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 7,
              letterSpacing: "0.16em",
              color: T.body,
              opacity: 0.34,
            }}
          >
            ARTIFACT IMAGE UNAVAILABLE
          </div>
        )}
      </div>

      <div
        style={{
          minHeight: 42,
          padding:
            "0 max(18px, env(safe-area-inset-right)) 0 max(18px, env(safe-area-inset-left))",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          borderBottom: `0.5px solid ${domainColor}22`,
          flex: "0 0 auto",
        }}
      >
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 6.5,
            letterSpacing: "0.15em",
            color: T.body,
            opacity: 0.34,
          }}
        >
          PINCH OR DOUBLE-TAP TO INSPECT
        </div>

        <button
          type="button"
          onClick={reset}
          disabled={
            scale === 1 &&
            translate.x === 0 &&
            translate.y === 0
          }
          className="mobile-reading-focusable"
          style={{
            minWidth: 44,
            minHeight: 42,
            border: "none",
            background: "transparent",
            padding: 0,
            fontFamily: T.mono,
            fontSize: 7,
            letterSpacing: "0.14em",
            color: domainColor,
            opacity:
              scale === 1 &&
              translate.x === 0 &&
              translate.y === 0
                ? 0.24
                : 0.76,
            cursor:
              scale === 1 &&
              translate.x === 0 &&
              translate.y === 0
                ? "default"
                : "pointer",
          }}
        >
          RESET
        </button>
      </div>
    </>
  );
}

export default function ConstellationEvidenceViewer({
  items,
  index,
  sectionLabel,
  domainColor,
  onIndexChange,
  onClose,
}: {
  items: readonly ConstellationEvidence[];
  index: number;
  sectionLabel: string;
  domainColor: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const item = items[index] ?? items[0];
  const hasPrevious = index > 0;
  const hasNext = index < items.length - 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    (focusable[0] ?? dialog).focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft" && hasPrevious) {
        event.preventDefault();
        onIndexChange(index - 1);
        return;
      }

      if (event.key === "ArrowRight" && hasNext) {
        event.preventDefault();
        onIndexChange(index + 1);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((node) => !node.hasAttribute("disabled"));

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    hasNext,
    hasPrevious,
    index,
    onClose,
    onIndexChange,
  ]);

  if (!item) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      aria-label={`Evidence: ${item.title}`}
      className="atlas-template-evidence-viewer"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        background: "rgba(5,5,10,0.988)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        outline: "none",
      }}
    >
      <style>{`
        .atlas-template-evidence-viewer-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .atlas-template-evidence-viewer-scroll::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }

        @media (max-height: 700px) {
          .atlas-template-evidence-inspectable {
            min-height: 205px !important;
            max-height: 42dvh !important;
          }
        }
      `}</style>

      <div
        style={{
          minHeight:
            "calc(66px + env(safe-area-inset-top, 0px))",
          padding:
            "calc(11px + env(safe-area-inset-top, 0px)) 20px 11px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          borderBottom: `0.5px solid ${domainColor}22`,
          flex: "0 0 auto",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="mobile-reading-focusable"
          style={{
            minHeight: 44,
            border: "none",
            background: "transparent",
            padding: "0 12px 0 0",
            fontFamily: T.mono,
            fontSize: 8,
            letterSpacing: "0.14em",
            color: T.body,
            opacity: 0.78,
            cursor: "pointer",
          }}
        >
          ‹ {sectionLabel}
        </button>

        <div
          style={{
            minWidth: 0,
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 7.5,
              letterSpacing: "0.12em",
              color: domainColor,
              opacity: 0.84,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "min(57vw, 245px)",
            }}
          >
            {item.number} · {item.title.toUpperCase()}
          </div>

          <div
            style={{
              marginTop: 3,
              fontFamily: T.mono,
              fontSize: 6.5,
              letterSpacing: "0.12em",
              color: T.body,
              opacity: 0.36,
            }}
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      <InspectableEvidenceImage
        key={item.id}
        item={item}
        domainColor={domainColor}
      />

      <div
        className="atlas-template-evidence-viewer-scroll"
        style={{
          flex: "1 1 auto",
          minHeight: 0,
          overflowY: "auto",
          padding: "20px 22px 22px",
        }}
      >
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 6.75,
            letterSpacing: "0.14em",
            color: T.accentGold,
            opacity: 0.62,
            marginBottom: 8,
          }}
        >
          {item.type.toUpperCase()}
        </div>

        <h3
          style={{
            margin: "0 0 10px",
            fontFamily: T.serif,
            fontSize: 21,
            lineHeight: 1.18,
            fontWeight: 600,
            color: "#F0E9D8",
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            margin: "0 0 16px",
            fontFamily: T.serif,
            fontSize: 14.5,
            lineHeight: 1.58,
            color: "#F0E9D8",
            opacity: 0.84,
          }}
        >
          {item.description}
        </p>

        <div
          style={{
            borderLeft: `1.5px solid ${domainColor}55`,
            paddingLeft: 14,
            fontFamily: T.serif,
            fontSize: 13.25,
            lineHeight: 1.56,
            color: T.body,
            opacity: 0.72,
            fontStyle: "italic",
          }}
        >
          {item.caption}
        </div>
      </div>

      {items.length > 1 && (
        <div
          style={{
            minHeight:
              "calc(56px + env(safe-area-inset-bottom, 0px))",
            padding:
              "6px 18px calc(6px + env(safe-area-inset-bottom, 0px))",
            boxSizing: "border-box",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            borderTop: `0.5px solid ${domainColor}22`,
            flex: "0 0 auto",
          }}
        >
          <button
            type="button"
            disabled={!hasPrevious}
            onClick={() => onIndexChange(index - 1)}
            className="mobile-reading-focusable"
            style={{
              minHeight: 44,
              border: `0.5px solid ${domainColor}28`,
              borderRadius: 3,
              background: "transparent",
              fontFamily: T.mono,
              fontSize: 7,
              letterSpacing: "0.14em",
              color: domainColor,
              opacity: hasPrevious ? 0.80 : 0.20,
              cursor: hasPrevious ? "pointer" : "default",
            }}
          >
            ← PREVIOUS
          </button>

          <button
            type="button"
            disabled={!hasNext}
            onClick={() => onIndexChange(index + 1)}
            className="mobile-reading-focusable"
            style={{
              minHeight: 44,
              border: `0.5px solid ${domainColor}28`,
              borderRadius: 3,
              background: "transparent",
              fontFamily: T.mono,
              fontSize: 7,
              letterSpacing: "0.14em",
              color: domainColor,
              opacity: hasNext ? 0.80 : 0.20,
              cursor: hasNext ? "pointer" : "default",
            }}
          >
            NEXT →
          </button>
        </div>
      )}
    </div>
  );
}
