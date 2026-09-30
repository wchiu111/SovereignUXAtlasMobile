/**
 * AtlasUtilitySheet — search-only mobile utility layer.
 *
 * Touch + recessed-notch refinement:
 * - The closed state exposes only a narrow recessed notch, not a full-width lip.
 * - The notch/handle remains physically attached to the drawer and travels with it.
 * - Search remains the only utility surface.
 * - The full Atlas beneath recedes through the runtime-viewport backdrop.
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

const IDLE_SHEET_HEIGHT = 370;
const RESULTS_SHEET_HEIGHT = 500;
const NOTCH_WIDTH = 90;
const NOTCH_DEPTH = 12;
const HANDLE_HIT_HEIGHT = 48;
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
    startY: number;
    startProgress: number;
    moved: boolean;
    pointerId: number;
  } | null>(null);

  const sheetHeight = searchExpanded
    ? RESULTS_SHEET_HEIGHT
    : IDLE_SHEET_HEIGHT;
  const activeProgress = dragging ? progress : open ? 1 : 0;

  // Closed: the body resolves completely above the viewport while the
  // attached notch remains visible just below the top seam.
  const translateY = -sheetHeight * (1 - activeProgress);
  const overlayActive = activeProgress > 0.02;
  const searchVisible = open || dragging || activeProgress > 0.02;

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
        (activeElement instanceof HTMLElement &&
          activeElement.isContentEditable)
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

  function beginHandleDrag(
    event: React.PointerEvent<HTMLButtonElement>,
  ) {
    event.currentTarget.setPointerCapture?.(event.pointerId);

    drag.current = {
      startY: event.clientY,
      startProgress: open ? 1 : 0,
      moved: false,
      pointerId: event.pointerId,
    };

    setProgress(open ? 1 : 0);
    setDragging(true);
  }

  function updateHandleDrag(
    event: React.PointerEvent<HTMLButtonElement>,
  ) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;

    const deltaY = event.clientY - current.startY;
    if (Math.abs(deltaY) > TAP_SLOP) current.moved = true;

    const next =
      current.startProgress + deltaY / DRAG_DISTANCE;

    setProgress(Math.max(0, Math.min(1, next)));
  }

  function endHandleDrag(
    event: React.PointerEvent<HTMLButtonElement>,
  ) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;

    if (!current.moved) {
      setOpen((value) => !value);
    } else {
      const nextOpen = progress >= OPEN_THRESHOLD;
      setOpen(nextOpen);

      if (!nextOpen) {
        setSearchExpanded(false);
        setSearchResetKey((value) => value + 1);
      }
    }

    drag.current = null;
    setDragging(false);
  }

  function cancelHandleDrag() {
    drag.current = null;
    setDragging(false);
    setProgress(open ? 1 : 0);
  }

  const content = (
    <>
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
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "min(100%, 430px)",
          height: sheetHeight + NOTCH_DEPTH,
          transform: `translate3d(-50%, ${translateY}px, 0)`,
          zIndex: 50,
          boxSizing: "border-box",
          pointerEvents: "none",
          transition: dragging
            ? "none"
            : "transform 420ms cubic-bezier(0.16,1,0.3,1), height 260ms cubic-bezier(0.22,1,0.36,1)",
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: `0 0 ${NOTCH_DEPTH}px 0`,
            boxSizing: "border-box",
            borderLeft: "0.5px solid rgba(232,213,163,0.16)",
            borderRight: "0.5px solid rgba(232,213,163,0.16)",
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
            overflow: "hidden",
            pointerEvents: "none",
            transition:
              "box-shadow 220ms ease",
          }}
        >
          {searchVisible && (
            <div
              data-atlas-search-interactive="true"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                pointerEvents:
                  open && !dragging ? "auto" : "none",
              }}
            >
              <AtlasMobileSearch
                key={searchResetKey}
                onNavigate={handleNavigate}
                onExpandedChange={setSearchExpanded}
              />
            </div>
          )}
        </div>

        {/* Bottom seam: split around the notch so it reads as one recessed edge. */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 28,
            bottom: NOTCH_DEPTH,
            width: `calc(50% - ${NOTCH_WIDTH / 2 + 28}px)`,
            height: 1,
            background: "rgba(232,213,163,0.16)",
            pointerEvents: "none",
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 28,
            bottom: NOTCH_DEPTH,
            width: `calc(50% - ${NOTCH_WIDTH / 2 + 28}px)`,
            height: 1,
            background: "rgba(232,213,163,0.16)",
            pointerEvents: "none",
          }}
        />

        <svg
          aria-hidden="true"
          width={NOTCH_WIDTH}
          height={NOTCH_DEPTH + 2}
          viewBox={`0 0 ${NOTCH_WIDTH} ${NOTCH_DEPTH + 2}`}
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            transform: "translateX(-50%)",
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <path
            d="M 0 0 H 18 C 24 0 24 12 32 12 H 58 C 66 12 66 0 72 0 H 90 V 0 H 0 Z"
            fill="rgba(7,8,13,0.994)"
          />
          <path
            d="M 0 0 H 18 C 24 0 24 12 32 12 H 58 C 66 12 66 0 72 0 H 90"
            fill="none"
            stroke="rgba(232,213,163,0.20)"
            strokeWidth="0.75"
          />
        </svg>

        <button
          type="button"
          aria-label={open ? "Close Atlas search" : "Open Atlas search"}
          aria-expanded={open}
          onPointerDown={beginHandleDrag}
          onPointerMove={updateHandleDrag}
          onPointerUp={endHandleDrag}
          onPointerCancel={cancelHandleDrag}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpen((value) => !value);
            }
          }}
          style={{
            position: "absolute",
            left: "50%",
            bottom: -(HANDLE_HIT_HEIGHT - NOTCH_DEPTH) / 2,
            zIndex: 4,
            width: 132,
            height: HANDLE_HIT_HEIGHT,
            transform: "translateX(-50%)",
            border: "none",
            background: "transparent",
            padding: 0,
            cursor: open ? "n-resize" : "s-resize",
            touchAction: "none",
            WebkitTapHighlightColor: "transparent",
            pointerEvents: "auto",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              top: 22,
              width: 38,
              height: 2,
              borderRadius: 999,
              background: T.identityGold,
              opacity: dragging
                ? 0.72
                : open
                ? 0.42
                : 0.62,
              transform: "translateX(-50%)",
              boxShadow: dragging
                ? "0 0 12px rgba(232,200,109,0.18)"
                : "none",
              transition:
                "opacity 180ms ease, box-shadow 180ms ease",
            }}
          />
        </button>
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
