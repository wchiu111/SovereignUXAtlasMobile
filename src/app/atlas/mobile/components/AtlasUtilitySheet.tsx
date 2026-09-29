/**
 * AtlasUtilitySheet — top-anchored mobile utility layer.
 *
 * Pass 2.5:
 * - Activator is the thicker horizontal line at the utility-layer boundary.
 * - The layer reveals from above the viewport and moves downward with the finger.
 * - No lower bulge, secondary handle, or footer protrusion.
 * - Handle, backdrop, and sheet are positioned relative to the Atlas viewport.
 *
 * Phase 3:
 * - Search is the only active utility destination.
 * - Search opens a local placeholder surface.
 * - Other utility destinations remain visibly present but inactive.
 *
 * Pass 3.2:
 * - Drag response is tuned for short mobile pulls.
 * - The entry activator fades/hides once the layer begins opening.
 */

import { useEffect, useRef, useState } from "react";
import { T } from "./mobileShared";
import AtlasSearchPlaceholder from "./AtlasSearchPlaceholder";

type DragOrigin = "handle" | "sheet";
type UtilityView = "menu" | "search";

const SHEET_HEIGHT = 372;
const HIDDEN_CLEARANCE = 48;
const DRAG_DISTANCE = 180;
const OPEN_THRESHOLD = 0.32;
const TAP_SLOP = 8;

const items = [
  { id: "search", label: "SEARCH", glyph: "⌕", active: true },
  { id: "observatory", label: "OBSERVATORY", glyph: "◉", active: false },
  { id: "journey", label: "JOURNEY", glyph: "⌁", active: false },
  { id: "about", label: "ABOUT WILSON", glyph: "○", active: false },
  { id: "philosophy", label: "PHILOSOPHY", glyph: "◇", active: false },
] as const;

export default function AtlasUtilitySheet() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [view, setView] = useState<UtilityView>("menu");

  const drag = useRef<{
    origin: DragOrigin;
    startY: number;
    startProgress: number;
    moved: boolean;
    pointerId: number;
  } | null>(null);

  const activeProgress = dragging ? progress : open ? 1 : 0;
  const translateY =
    -(SHEET_HEIGHT + HIDDEN_CLEARANCE) +
    (SHEET_HEIGHT + HIDDEN_CLEARANCE) * activeProgress;

  useEffect(() => {
    if (!dragging) setProgress(open ? 1 : 0);
  }, [open, dragging]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (view === "search") {
        setView("menu");
        return;
      }

      if (open) setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, view]);

  function closeLayer() {
    setOpen(false);
    setView("menu");
  }

  function beginDrag(
    event: React.PointerEvent<HTMLElement>,
    origin: DragOrigin,
  ) {
    if (view === "search") return;

    event.currentTarget.setPointerCapture?.(event.pointerId);
    drag.current = {
      origin,
      startY: event.clientY,
      startProgress: open ? 1 : 0,
      moved: false,
      pointerId: event.pointerId,
    };
    setProgress(open ? 1 : 0);
    setDragging(true);
  }

  function updateDrag(event: React.PointerEvent<HTMLElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;

    const deltaY = event.clientY - current.startY;
    if (Math.abs(deltaY) > TAP_SLOP) current.moved = true;

    const next = current.startProgress + deltaY / DRAG_DISTANCE;
    setProgress(Math.max(0, Math.min(1, next)));
  }

  function endDrag(event: React.PointerEvent<HTMLElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;

    const wasTap = !current.moved;

    if (wasTap && current.origin === "handle") {
      setOpen((value) => !value);
    } else if (wasTap && current.origin === "sheet") {
      setOpen(true);
    } else {
      setOpen(progress >= OPEN_THRESHOLD);
    }

    drag.current = null;
    setDragging(false);
  }

  function cancelDrag() {
    drag.current = null;
    setDragging(false);
    setProgress(open ? 1 : 0);
  }

  const overlayActive = activeProgress > 0.02;

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close Atlas utility layer" : "Open Atlas utility layer"}
        aria-expanded={open}
        onPointerDown={(event) => beginDrag(event, "handle")}
        onPointerMove={updateDrag}
        onPointerUp={endDrag}
        onPointerCancel={cancelDrag}
        style={{
          position: "absolute",
          left: "50%",
          top: 28,
          transform: "translateX(-50%)",
          width: 132,
          height: 44,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          border: "none",
          padding: "3px 0 0",
          background: "transparent",
          opacity: activeProgress > 0.02 ? 0 : 1,
          pointerEvents: activeProgress > 0.02 ? "none" : "auto",
          cursor: "s-resize",
          touchAction: "none",
          zIndex: 60,
          transition: dragging ? "opacity 120ms ease" : "opacity 180ms ease",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "block",
            width: 44,
            height: 4,
            borderRadius: 999,
            background: T.identityGold,
            opacity: 0.62,
          }}
        />
      </button>

      <div
        aria-hidden={!open && !dragging}
        onClick={closeLayer}
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(2,2,7,${Math.min(0.48, activeProgress * 0.48)})`,
          backdropFilter: overlayActive ? `blur(${activeProgress * 3}px)` : "none",
          WebkitBackdropFilter: overlayActive ? `blur(${activeProgress * 3}px)` : "none",
          opacity: overlayActive ? 1 : 0,
          pointerEvents: overlayActive ? "auto" : "none",
          transition: dragging ? "none" : "opacity 220ms ease",
          zIndex: 40,
        }}
      />

      <section
        aria-label="Atlas utility layer"
        aria-hidden={!open && !dragging}
        onPointerDown={(event) => beginDrag(event, "sheet")}
        onPointerMove={updateDrag}
        onPointerUp={endDrag}
        onPointerCancel={cancelDrag}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: SHEET_HEIGHT,
          transform: `translate3d(0, ${translateY}px, 0)`,
          zIndex: 50,
          boxSizing: "border-box",
          border: "0.5px solid rgba(232,213,163,0.14)",
          borderTop: "none",
          borderRadius: "0 0 30px 30px",
          background:
            "linear-gradient(180deg, rgba(14,15,20,0.985) 0%, rgba(8,9,13,0.992) 100%)",
          boxShadow:
            activeProgress > 0.02
              ? `0 22px 70px rgba(0,0,0,${0.16 + activeProgress * 0.42})`
              : "none",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          pointerEvents: overlayActive ? "auto" : "none",
          touchAction: view === "search" ? "auto" : "none",
          transition: dragging
            ? "none"
            : "transform 420ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms ease",
          overflow: "hidden",
        }}
      >
        {view === "search" ? (
          <AtlasSearchPlaceholder
            onBack={() => setView("menu")}
            onClose={closeLayer}
          />
        ) : (
          <div style={{ padding: "28px 26px 24px" }}>

            <div style={{ borderTop: "0.5px solid rgba(232,213,163,0.07)" }}>
              {items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  disabled={!item.active}
                  onClick={() => item.id === "search" && setView("search")}
                  style={{
                    width: "100%",
                    minHeight: 58,
                    display: "grid",
                    gridTemplateColumns: "30px 1fr 18px",
                    gap: 12,
                    alignItems: "center",
                    border: "none",
                    borderBottom: "0.5px solid rgba(232,213,163,0.07)",
                    background: "transparent",
                    color: item.active ? T.accentGold : T.body,
                    opacity: item.active ? 1 : 0.72,
                    padding: 0,
                    textAlign: "left",
                    cursor: item.active ? "pointer" : "default",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: T.serif,
                      fontSize: item.id === "search" ? 22 : 17,
                    }}
                  >
                    {item.glyph}
                  </span>

                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: item.active ? 10 : 9,
                      letterSpacing: "0.20em",
                    }}
                  >
                    {item.label}
                  </span>

                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: T.mono,
                      fontSize: 12,
                      opacity: item.active ? 0.30 : 0,
                      textAlign: "right",
                    }}
                  >
                    ›
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
