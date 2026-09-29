import { useEffect, useRef, useState } from "react";
import { T } from "../components/mobileShared";
import type { MobileEvidenceItem } from "./mobileReadingTypes";

function InspectableEvidenceImage({ item }: { item: MobileEvidenceItem }) {
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null);
  const panStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(
    null,
  );
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
    return Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
  };

  const clampScale = (next: number) => Math.min(4, Math.max(1, next));

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
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

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
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

    if (pointers.current.size === 1 && panStart.current && scale > 1) {
      setTranslate({
        x: panStart.current.tx + (event.clientX - panStart.current.x),
        y: panStart.current.ty + (event.clientY - panStart.current.y),
      });
    }
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
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
        className="mobile-evidence-inspectable"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "clamp(220px, 46dvh, 360px)",
          maxHeight: "min(56dvh, 520px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(3,3,8,0.99)",
          touchAction: "none",
          cursor: scale > 1 ? "grab" : "zoom-in",
        }}
      >
        <img
          src={item.image}
          alt={item.alt}
          draggable={false}
          style={{
            width: "100%",
            maxHeight: "min(56dvh, 520px)",
            objectFit: item.imageFit,
            display: "block",
            transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
            transformOrigin: "center center",
            transition: pointers.current.size ? "none" : "transform 160ms ease",
            userSelect: "none",
            WebkitUserDrag: "none",
          }}
        />
      </div>

      <div
        style={{
          minHeight: 44,
          padding: "0 max(18px, env(safe-area-inset-right)) 0 max(18px, env(safe-area-inset-left))",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          borderBottom: `0.5px solid ${T.caseStudies}22`,
        }}
      >
        <div
          style={{
            minWidth: 0,
            fontFamily: T.mono,
            fontSize: 7,
            letterSpacing: "0.16em",
            color: T.body,
            opacity: 0.34,
          }}
        >
          PINCH OR DOUBLE-TAP TO INSPECT
        </div>

        <button
          type="button"
          onClick={reset}
          disabled={scale === 1 && translate.x === 0 && translate.y === 0}
          className="mobile-reading-focusable"
          style={{
            flex: "0 0 auto",
            minWidth: 44,
            minHeight: 44,
            border: "none",
            background: "transparent",
            padding: 0,
            fontFamily: T.mono,
            fontSize: 7,
            letterSpacing: "0.14em",
            color: T.caseStudies,
            opacity:
              scale === 1 && translate.x === 0 && translate.y === 0 ? 0.24 : 0.76,
            cursor:
              scale === 1 && translate.x === 0 && translate.y === 0
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

export default function MobileEvidenceViewer({
  item,
  sectionLabel,
  onClose,
}: {
  item: MobileEvidenceItem;
  sectionLabel: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

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
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      aria-label={`Evidence: ${item.title}`}
      className="mobile-evidence-viewer"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        background: "rgba(5,5,10,0.985)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        outline: "none",
      }}
    >
      <style>{`
        .mobile-evidence-viewer {
          padding-left: env(safe-area-inset-left, 0px);
          padding-right: env(safe-area-inset-right, 0px);
        }

        @media (max-height: 700px) {
          .mobile-evidence-inspectable {
            min-height: 210px !important;
            max-height: 44dvh !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-evidence-viewer *,
          .mobile-evidence-viewer *::before,
          .mobile-evidence-viewer *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div
        style={{
          minHeight: "calc(68px + env(safe-area-inset-top, 0px))",
          padding: "calc(12px + env(safe-area-inset-top, 0px)) 20px 12px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          borderBottom: `0.5px solid ${T.caseStudies}22`,
          flex: "0 0 auto",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="mobile-reading-focusable"
          style={{
            minHeight: 44,
            minWidth: 44,
            border: "none",
            background: "transparent",
            padding: "0 12px 0 0",
            fontFamily: T.mono,
            fontSize: 8,
            letterSpacing: "0.14em",
            color: T.body,
            opacity: 0.76,
            cursor: "pointer",
          }}
        >
          ‹ {sectionLabel}
        </button>

        <div style={{ minWidth: 0, textAlign: "right" }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 7.5,
              letterSpacing: "0.12em",
              color: T.caseStudies,
              opacity: 0.82,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "min(58vw, 250px)",
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
              opacity: 0.42,
            }}
          >
            {item.type.toUpperCase()}
          </div>
        </div>
      </div>

      <div
        style={{
          flex: "1 1 auto",
          minHeight: 0,
          overflowY: "auto",
          overscrollBehaviorY: "contain",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <InspectableEvidenceImage item={item} />

        <div
          style={{
            padding:
              "20px clamp(20px, 6.6vw, 28px) calc(58px + env(safe-area-inset-bottom, 0px))",
          }}
        >
          <div
            style={{
              marginBottom: 8,
              fontFamily: T.mono,
              fontSize: 7,
              letterSpacing: "0.16em",
              color: T.caseStudies,
              opacity: 0.64,
            }}
          >
            CAPTION
          </div>
          <div
            style={{
              marginBottom: 20,
              fontFamily: T.serif,
              fontSize: 14,
              lineHeight: 1.6,
              color: "#F0E9D8",
              opacity: 0.88,
            }}
          >
            {item.caption}
          </div>

          <div
            style={{
              paddingTop: 16,
              borderTop: `0.5px solid ${T.identityGold}1F`,
              fontFamily: T.serif,
              fontSize: 13.5,
              lineHeight: 1.62,
              color: "#F0E9D8",
              opacity: 0.72,
            }}
          >
            {item.description}
          </div>
        </div>
      </div>
    </div>
  );
}
