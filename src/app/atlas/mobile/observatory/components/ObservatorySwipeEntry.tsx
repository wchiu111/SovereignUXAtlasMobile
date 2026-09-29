import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { T } from "../../components/mobileShared";

const MAX_DRAG = 72;
const COMMIT_PROGRESS = 0.52;
const MIN_FLICK_DISTANCE = 22;
const FLICK_VELOCITY = 0.55;

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

export default function ObservatorySwipeEntry({
  disabled = false,
  onCommit,
}: {
  disabled?: boolean;
  onCommit: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startYRef = useRef(0);
  const startTimeRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const movedRef = useRef(false);
  const suppressClickRef = useRef(false);

  const reset = () => {
    pointerIdRef.current = null;
    movedRef.current = false;
    setDragging(false);
    setProgress(0);
  };

  const commit = () => {
    if (disabled) return;
    setProgress(1);
    setDragging(false);
    onCommit();
  };

  const onPointerDown = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (disabled) return;

    pointerIdRef.current = event.pointerId;
    startYRef.current = event.clientY;
    startTimeRef.current = performance.now();
    movedRef.current = false;
    suppressClickRef.current = false;
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (
      disabled ||
      pointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    const distance = Math.max(
      0,
      startYRef.current - event.clientY,
    );

    if (distance > 5) movedRef.current = true;
    setProgress(clamp01(distance / MAX_DRAG));
  };

  const finishPointer = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (pointerIdRef.current !== event.pointerId) return;

    const distance = Math.max(
      0,
      startYRef.current - event.clientY,
    );
    const elapsed = Math.max(
      1,
      performance.now() - startTimeRef.current,
    );
    const velocity = distance / elapsed;
    const finalProgress = clamp01(distance / MAX_DRAG);
    const shouldCommit =
      finalProgress >= COMMIT_PROGRESS ||
      (distance >= MIN_FLICK_DISTANCE &&
        velocity >= FLICK_VELOCITY);

    suppressClickRef.current = movedRef.current;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);

    if (shouldCommit) {
      pointerIdRef.current = null;
      movedRef.current = false;
      commit();
      return;
    }

    reset();
  };

  const entryControl = (
    <button
      type="button"
      aria-label="Enter Observatory. Swipe up or tap."
      disabled={disabled}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finishPointer}
      onPointerCancel={finishPointer}
      onClick={() => {
        if (
          disabled ||
          suppressClickRef.current ||
          movedRef.current
        ) {
          return;
        }
        commit();
      }}
      className="mobile-atlas-system-hit-target"
      style={{
        position: "absolute",
        left: "50%",
        bottom: 20,
        width: 180,
        height: 94,
        zIndex: 26,
        transform: "translateX(-50%)",
        border: 0,
        borderRadius: 10,
        background: "transparent",
        padding: 0,
        cursor: disabled ? "default" : "ns-resize",
        touchAction: "none",
        pointerEvents: "auto",
        WebkitTapHighlightColor: "transparent",
        opacity: disabled ? 0.35 : 1,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: 8,
          width: 38 + progress * 32,
          height: 38 + progress * 32,
          transform: `translate(-50%, ${-progress * 17}px)`,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(232,200,109,${
            0.05 + progress * 0.16
          }) 0%, rgba(232,200,109,${
            0.02 + progress * 0.06
          }) 38%, transparent 72%)`,
          filter: "blur(0.4px)",
          transition: dragging
            ? "none"
            : "transform 220ms cubic-bezier(0.22,1,0.36,1), width 220ms ease, height 220ms ease, background 220ms ease",
        }}
      />

      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: 15,
          width: 0.5,
          height: 18 + progress * 27,
          transform: `translate(-50%, ${-progress * 16}px)`,
          transformOrigin: "50% 100%",
          background:
            "linear-gradient(180deg, rgba(232,200,109,0.56), rgba(232,200,109,0.14))",
          boxShadow:
            progress > 0.05
              ? "0 0 8px rgba(232,200,109,0.22)"
              : "none",
          opacity: 0.42 + progress * 0.48,
          transition: dragging
            ? "none"
            : "all 220ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: 27,
          width: 7,
          height: 7,
          transform: `translate(-50%, ${-progress * 34}px) rotate(45deg)`,
          border: "0.75px solid rgba(232,200,109,0.72)",
          background:
            progress > 0.16
              ? "rgba(232,200,109,0.22)"
              : "rgba(5,5,10,0.86)",
          boxShadow:
            progress > 0.08
              ? "0 0 10px rgba(232,200,109,0.34)"
              : "0 0 4px rgba(232,200,109,0.12)",
          transition: dragging
            ? "none"
            : "all 220ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 10,
          fontFamily: T.mono,
          fontSize: 9,
          lineHeight: 1.1,
          letterSpacing: "0.20em",
          color: T.identityGold,
          opacity: 0.70 + progress * 0.22,
          transform: `translateY(${progress * 2}px)`,
          textAlign: "center",
          transition: dragging
            ? "none"
            : "opacity 220ms ease, transform 220ms ease",
        }}
      >
        {progress > 0.26 ? "RELEASE TO ENTER" : "SWIPE UP"}
      </span>
    </button>
  );

  /**
   * ENTER OBSERVATORY is rendered by LandingScene inside the unscaled
   * viewport-UI layer. The gesture control must live in that same coordinate
   * system; otherwise the authored 390×844 scene scale shifts SWIPE UP above
   * the primary label on shorter/wider previews.
   */
  if (typeof document !== "undefined") {
    const runtimeViewport =
      document.querySelector<HTMLElement>(
        ".mobile-atlas-runtime-viewport",
      );

    if (runtimeViewport) {
      return createPortal(entryControl, runtimeViewport);
    }
  }

  return entryControl;
}
