/**
 * AtlasUtilitySheet — search-only mobile utility layer.
 *
 * Consolidated Search pass:
 * - Pulling the top handle reveals Search immediately.
 * - The previous utility-menu destinations are removed.
 * - Empty search shows guided prompts.
 * - Query state expands the sheet for up to four results.
 * - The backdrop lives at the runtime-viewport level so the entire Atlas,
 *   including ENTER OBSERVATORY / gesture symbol / SWIPE UP, recedes together.
 */

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { T } from "./mobileShared";
import AtlasMobileSearch from "./AtlasMobileSearch";
import type { AtlasMobileSearchDestination } from "./atlasMobileSearchIndex";

type DragOrigin = "handle" | "sheet";

const IDLE_SHEET_HEIGHT = 356;
const RESULTS_SHEET_HEIGHT = 480;
const HIDDEN_CLEARANCE = 52;
const DRAG_DISTANCE = 180;
const OPEN_THRESHOLD = 0.32;
const TAP_SLOP = 8;
const NAVIGATION_HANDOFF_DELAY = 250;

export default function AtlasUtilitySheet({
  onNavigate,
}: {
  onNavigate: (destination: AtlasMobileSearchDestination) => void;
}) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchResetKey, setSearchResetKey] = useState(0);

  const navigationTimerRef = useRef<number | null>(null);
  const drag = useRef<{
    origin: DragOrigin;
    startY: number;
    startProgress: number;
    moved: boolean;
    pointerId: number;
  } | null>(null);

  const sheetHeight = searchExpanded
    ? RESULTS_SHEET_HEIGHT
    : IDLE_SHEET_HEIGHT;
  const activeProgress = dragging ? progress : open ? 1 : 0;
  const translateY =
    -(sheetHeight + HIDDEN_CLEARANCE) +
    (sheetHeight + HIDDEN_CLEARANCE) * activeProgress;
  const overlayActive = activeProgress > 0.02;

  useEffect(() => {
    if (!dragging) setProgress(open ? 1 : 0);
  }, [open, dragging]);

  useEffect(() => {
    return () => {
      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape" || !open) return;

      const activeElement = document.activeElement;
      if (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLElement &&
          activeElement.isContentEditable
      ) {
        activeElement.blur();
        return;
      }

      closeLayer();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function closeLayer() {
    setOpen(false);
    setSearchExpanded(false);
    setSearchResetKey((value) => value + 1);
  }

  function handleNavigate(
    destination: AtlasMobileSearchDestination,
  ) {
    if (navigationTimerRef.current !== null) {
      window.clearTimeout(navigationTimerRef.current);
    }

    setOpen(false);
    setSearchExpanded(false);

    navigationTimerRef.current = window.setTimeout(() => {
      setSearchResetKey((value) => value + 1);
      onNavigate(destination);
      navigationTimerRef.current = null;
    }, NAVIGATION_HANDOFF_DELAY);
  }

  function beginDrag(
    event: React.PointerEvent<HTMLElement>,
    origin: DragOrigin,
  ) {
    const target = event.target as HTMLElement | null;
    if (
      origin === "sheet" &&
      target?.closest(
        "input, button, [role='option'], [data-atlas-search-interactive='true']",
      )
    ) {
      return;
    }

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
      if (progress < OPEN_THRESHOLD) {
        setSearchExpanded(false);
        setSearchResetKey((value) => value + 1);
      }
    }

    drag.current = null;
    setDragging(false);
  }

  function cancelDrag() {
    drag.current = null;
    setDragging(false);
    setProgress(open ? 1 : 0);
  }

  const content = (
    <>
      <button
        type="button"
        aria-label={open ? "Close Atlas search" : "Open Atlas search"}
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
          transition: dragging
            ? "opacity 120ms ease"
            : "opacity 180ms ease",
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
          zIndex: 40,
          background: `rgba(2,2,7,${Math.min(
            0.42,
            activeProgress * 0.42,
          )})`,
          backdropFilter: overlayActive
            ? `blur(${activeProgress * 6}px) brightness(${
                1 - activeProgress * 0.32
              }) saturate(${1 - activeProgress * 0.16})`
            : "none",
          WebkitBackdropFilter: overlayActive
            ? `blur(${activeProgress * 6}px) brightness(${
                1 - activeProgress * 0.32
              }) saturate(${1 - activeProgress * 0.16})`
            : "none",
          opacity: overlayActive ? 1 : 0,
          pointerEvents: overlayActive ? "auto" : "none",
          transition: dragging
            ? "none"
            : "opacity 220ms ease, backdrop-filter 220ms ease",
        }}
      />

      <section
        aria-label="Search the Sovereign Atlas"
        aria-hidden={!open && !dragging}
        onPointerDown={(event) => beginDrag(event, "sheet")}
        onPointerMove={updateDrag}
        onPointerUp={endDrag}
        onPointerCancel={cancelDrag}
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "min(100%, 430px)",
          height: `min(${sheetHeight}px, calc(100dvh - 12px))`,
          transform: `translate3d(-50%, ${translateY}px, 0)`,
          zIndex: 50,
          boxSizing: "border-box",
          border: "0.5px solid rgba(232,213,163,0.16)",
          borderTop: "none",
          borderRadius: "0 0 28px 28px",
          background:
            "linear-gradient(180deg, rgba(12,13,19,0.985) 0%, rgba(7,8,13,0.994) 100%)",
          boxShadow: overlayActive
            ? `0 24px 74px rgba(0,0,0,${
                0.20 + activeProgress * 0.40
              })`
            : "none",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          pointerEvents: overlayActive ? "auto" : "none",
          touchAction: "pan-y",
          transition: dragging
            ? "none"
            : "transform 420ms cubic-bezier(0.16,1,0.3,1), height 260ms cubic-bezier(0.22,1,0.36,1), box-shadow 220ms ease",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 26,
            zIndex: 3,
            cursor: "n-resize",
            touchAction: "none",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              width: 42,
              height: 2,
              borderRadius: 999,
              background: T.identityGold,
              opacity: open ? 0.28 : 0,
              transform: "translateX(-50%)",
              transition: "opacity 180ms ease",
              pointerEvents: "none",
            }}
          />
        </div>

        <div
          data-atlas-search-interactive="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
        >
          <AtlasMobileSearch
            key={searchResetKey}
            onNavigate={handleNavigate}
            onExpandedChange={setSearchExpanded}
          />
        </div>
      </section>
    </>
  );

  if (typeof document !== "undefined") {
    const runtimeViewport =
      document.querySelector<HTMLElement>(
        ".mobile-atlas-runtime-viewport",
      );

    if (runtimeViewport) {
      return createPortal(content, runtimeViewport);
    }
  }

  return content;
}
