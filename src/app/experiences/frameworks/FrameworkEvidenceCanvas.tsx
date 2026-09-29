import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { Minus, Plus, Scan, X } from "lucide-react";
import type {
  AtlasEvidenceAnnotation,
  AtlasEvidenceAnnotationCategory,
} from "../../content/types";
import type { ReadingEvidenceItem } from "../shared/types";

const DEFAULT_BOARD_WIDTH = 1050;
const BOARD_X = 140;
const BOARD_Y = 260;
const BOARD_GAP = 320;
const OPENING_SCALE = 0.73;
const MIN_SCALE = 0.12;
const MAX_SCALE = 2;

const CATEGORY_STYLE: Record<
  AtlasEvidenceAnnotationCategory,
  { label: string; color: string }
> = {
  "ai-delegation": { label: "AI DELEGATION", color: "#7CB4D5" },
  "human-authority": { label: "HUMAN AUTHORITY", color: "#76C79A" },
  "visible-reasoning": { label: "VISIBLE REASONING", color: "#E1C35C" },
  "authority-problem": { label: "AUTHORITY PROBLEM", color: "#D47B68" },
  "capability-focus": { label: "CAPABILITY FOCUS", color: "#D47B68" },
  governance: { label: "GOVERNANCE", color: "#A78BDB" },
  constraints: { label: "CONSTRAINTS", color: "#76C79A" },
  "behavioral-integrity": { label: "BEHAVIORAL INTEGRITY", color: "#7CB4D5" },
  "regenerative-capacity": { label: "REGENERATIVE CAPACITY", color: "#D99A6C" },
  "structural-drift": { label: "STRUCTURAL DRIFT", color: "#D47B68" },
  "cognitive-drift": { label: "COGNITIVE DRIFT", color: "#E1C35C" },
  "authority-drift": { label: "AUTHORITY DRIFT", color: "#D99A6C" },
  "semantic-drift": { label: "SEMANTIC DRIFT", color: "#A78BDB" },
  "invariant-preservation": { label: "INVARIANT PRESERVATION", color: "#76C79A" },
  "integrity-verification": { label: "INTEGRITY VERIFICATION", color: "#7CB4D5" },
  "aspiration-focus": { label: "ASPIRATION FOCUS", color: "#E1C35C" },
  "encoded-cognition": { label: "ENCODED COGNITION", color: "#A78BDB" },
  "behavioral-sequencing": { label: "BEHAVIORAL SEQUENCING", color: "#7CB4D5" },
  "expectation-clarity": { label: "EXPECTATION CLARITY", color: "#76C79A" },
};

interface ActiveAnnotation {
  boardId: string;
  annotationId: string;
}

interface ViewState {
  x: number;
  y: number;
  scale: number;
}

type TransitionPhase = "entering" | "open" | "exiting";

interface Props {
  items: ReadingEvidenceItem[];
  frameworkTitle: string;
  sectionTitle: string;
  onClose: () => void;
  backLabel?: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getBoardPosition(index: number, boardWidth: number) {
  return {
    x: BOARD_X + index * (boardWidth + BOARD_GAP),
    y: BOARD_Y,
  };
}

function AnnotationCard({ annotation }: { annotation: AtlasEvidenceAnnotation }) {
  const style = CATEGORY_STYLE[annotation.category];

  return (
    <div
      aria-live="polite"
      data-canvas-control
      style={{
        width: 410,
        padding: "26px 28px 24px",
        border: `1px solid ${style.color}66`,
        background:
          "linear-gradient(145deg, rgba(10,13,22,0.98), rgba(5,7,13,0.98))",
        boxShadow:
          "0 24px 70px rgba(0,0,0,0.48), inset 0 1px rgba(255,255,255,0.035)",
        color: "rgba(255,248,230,0.94)",
        pointerEvents: "auto",
      }}
    >
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 13,
        letterSpacing: "0.19em",
        color: style.color,
        marginBottom: 18,
      }}>
        {annotation.number} · {style.label}
      </div>

      <div style={{
        fontFamily: "'EB Garamond', serif",
        fontSize: 27,
        lineHeight: 1.12,
        fontWeight: 500,
        marginBottom: 16,
      }}>
        {annotation.title}
      </div>

      <div style={{
        fontFamily: "'EB Garamond', serif",
        fontSize: 18,
        lineHeight: 1.55,
        color: "rgba(240,232,215,0.76)",
        marginBottom: 16,
      }}>
        {annotation.observation}
      </div>

      <div style={{
        paddingTop: 16,
        borderTop: "1px solid rgba(220,205,170,0.12)",
        fontFamily: "'EB Garamond', serif",
        fontSize: 16,
        lineHeight: 1.5,
        color: "rgba(220,205,175,0.62)",
      }}>
        {annotation.meaning}
      </div>

      <div style={{
        marginTop: 20,
        paddingTop: 15,
        borderTop: "1px solid rgba(220,205,170,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.16em",
      }}>
        <span style={{ color: "rgba(200,180,130,0.48)" }}>
          {annotation.footerLabel ?? "DECISION RIGHT"}
        </span>
        <span style={{ color: style.color }}>
          {(annotation.footerValue ?? annotation.rightHolder).toUpperCase()}
        </span>
      </div>
    </div>
  );
}

function EvidenceBoard({
  item,
  position,
  boardIndex,
  boardWidth,
  boardHeight,
  viewScale,
  active,
  locked,
  onPreview,
  onLeave,
  onSelect,
}: {
  item: ReadingEvidenceItem;
  position: { x: number; y: number };
  boardIndex: number;
  boardWidth: number;
  boardHeight: number;
  viewScale: number;
  active: ActiveAnnotation | null;
  locked: boolean;
  onPreview: (next: ActiveAnnotation) => void;
  onLeave: () => void;
  onSelect: (next: ActiveAnnotation) => void;
}) {
  const canvas = item.canvas;
  if (!canvas || !item.image) return null;

  const activeAnnotation =
    active?.boardId === item.id
      ? canvas.annotations.find((annotation) => annotation.id === active.annotationId)
      : undefined;
  const anotherBoardIsActive = Boolean(active && active.boardId !== item.id);

  return (
    <section
      aria-label={`${canvas.boardLabel}: ${canvas.boardSubtitle}`}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: boardWidth,
        zIndex: active?.boardId === item.id ? 10 : 1,
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "baseline",
        gap: 18,
        margin: "0 0 20px 20px",
        fontFamily: "'DM Mono', monospace",
      }}>
        <span style={{
          color: "rgba(225,195,92,0.86)",
          fontSize: 16,
          letterSpacing: "0.18em",
        }}>
          {String(boardIndex + 1).padStart(2, "0")}
        </span>
        <div>
          <div style={{
            color: "rgba(255,248,230,0.84)",
            fontSize: 16,
            letterSpacing: "0.15em",
          }}>
            {canvas.boardLabel}
          </div>
          <div style={{
            marginTop: 7,
            color: "rgba(220,205,175,0.52)",
            fontSize: 14,
            letterSpacing: "0.04em",
          }}>
            {canvas.boardSubtitle}
          </div>
        </div>
      </div>

      <div style={{
        position: "relative",
        width: boardWidth,
        height: boardHeight,
        transition: "opacity 240ms ease, filter 240ms ease",
        opacity: anotherBoardIsActive ? 0.42 : 1,
        filter: activeAnnotation ? "brightness(0.84)" : "none",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          border: activeAnnotation
            ? "1px solid rgba(225,195,92,0.28)"
            : "1px solid rgba(220,205,175,0.18)",
          background: "#E8E8E8",
          boxShadow: activeAnnotation
            ? "0 32px 100px rgba(0,0,0,0.46), 0 0 52px rgba(225,195,92,0.07)"
            : "0 28px 80px rgba(0,0,0,0.38)",
        }}>
          <img
            src={item.image}
            alt={item.alt ?? item.title}
            draggable={false}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </div>

        {canvas.annotations.map((annotation) => {
          const annotationActive =
            active?.boardId === item.id && active.annotationId === annotation.id;
          const markerStyle = CATEGORY_STYLE[annotation.category];

          return (
            <div
              key={annotation.id}
              style={{
                position: "absolute",
                left: `${annotation.x}%`,
                top: `${annotation.y}%`,
                zIndex: annotationActive ? 6 : 3,
                transform: `translate(-50%, -50%) scale(${1 / viewScale})`,
                transformOrigin: "50% 50%",
              }}
            >
              {annotationActive && (
                <>
                  <span aria-hidden style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 116,
                    height: 116,
                    borderRadius: "50%",
                    border: `1px solid ${markerStyle.color}55`,
                    background: `${markerStyle.color}12`,
                    transform: "translate(-50%, -50%)",
                    boxShadow: `0 0 42px ${markerStyle.color}2E`,
                    pointerEvents: "none",
                  }} />
                  <span aria-hidden style={{
                    position: "absolute",
                    top: "50%",
                    width: 82,
                    height: 1,
                    background: `linear-gradient(${
                      annotation.cardSide === "left" ? "270deg" : "90deg"
                    }, ${markerStyle.color}90, transparent)`,
                    ...(annotation.cardSide === "left" ? { right: 34 } : { left: 34 }),
                    pointerEvents: "none",
                  }} />
                </>
              )}

              <button
                type="button"
                data-canvas-control
                aria-label={`${annotation.number}. ${annotation.title}`}
                aria-expanded={annotationActive}
                onMouseEnter={() =>
                  !locked && onPreview({ boardId: item.id, annotationId: annotation.id })
                }
                onMouseLeave={() => !locked && onLeave()}
                onFocus={() =>
                  !locked && onPreview({ boardId: item.id, annotationId: annotation.id })
                }
                onBlur={() => !locked && onLeave()}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect({ boardId: item.id, annotationId: annotation.id });
                }}
                style={{
                  position: "relative",
                  width: 66,
                  height: 66,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  border: `2px solid ${
                    annotationActive ? markerStyle.color : markerStyle.color + "A8"
                  }`,
                  background: annotationActive
                    ? "rgba(8,11,18,0.98)"
                    : "rgba(8,11,18,0.90)",
                  boxShadow: annotationActive
                    ? `0 0 0 8px ${markerStyle.color}18, 0 0 34px ${markerStyle.color}55`
                    : "0 8px 22px rgba(0,0,0,0.32)",
                  color: markerStyle.color,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 19,
                  cursor: "pointer",
                  transition:
                    "transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms ease",
                }}
              >
                {Number(annotation.number)}
              </button>

              {annotationActive && (
                <div style={{
                  position: "absolute",
                  top: "50%",
                  ...(annotation.cardSide === "left" ? { right: 98 } : { left: 98 }),
                  transform: "translateY(-50%)",
                }}>
                  <AnnotationCard annotation={annotation} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function FrameworkEvidenceCanvas({
  items,
  frameworkTitle,
  sectionTitle,
  onClose,
  backLabel,
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const hasInteractedRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);
  const resolveTimerRef = useRef<number | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const canvasItems = useMemo(
    () => items.filter((item) => item.canvas && item.image).slice(0, 8),
    [items],
  );
  const canvasMeta = canvasItems[0]?.canvas;
  const boardWidth = canvasMeta?.boardWidth ?? DEFAULT_BOARD_WIDTH;
  const defaultBoardHeight = Math.round((boardWidth * 2023) / 1374);

  const [view, setView] = useState<ViewState>({
    x: 32 - BOARD_X * OPENING_SCALE,
    y: 198 - BOARD_Y * OPENING_SCALE,
    scale: OPENING_SCALE,
  });
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState<ActiveAnnotation | null>(null);
  const [locked, setLocked] = useState(false);
  const [transitionPhase, setTransitionPhase] =
    useState<TransitionPhase>("entering");

  const canvasGroups = useMemo(
    () =>
      (canvasMeta?.groups ?? []).filter(
        (group) =>
          group.startIndex >= 0 &&
          group.endIndex >= group.startIndex &&
          group.startIndex < canvasItems.length,
      ),
    [canvasItems.length, canvasMeta?.groups],
  );

  const boardPositions = useMemo(
    () => canvasItems.map((_, index) => getBoardPosition(index, boardWidth)),
    [boardWidth, canvasItems],
  );

  const boardHeights = useMemo(
    () =>
      canvasItems.map(
        (item) => item.canvas?.boardHeight ?? defaultBoardHeight,
      ),
    [canvasItems, defaultBoardHeight],
  );

  const worldWidth = useMemo(() => {
    const lastPosition =
      boardPositions.at(-1) ?? getBoardPosition(0, boardWidth);
    return Math.max(2700, lastPosition.x + boardWidth + BOARD_X);
  }, [boardPositions, boardWidth]);

  const maxBoardHeight = useMemo(
    () => boardHeights.length > 0 ? Math.max(...boardHeights) : defaultBoardHeight,
    [boardHeights, defaultBoardHeight],
  );

  const worldHeight = BOARD_Y + maxBoardHeight + 220;

  const setOpeningView = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const scale = rect.width < 900 ? 0.58 : OPENING_SCALE;
    const boardLeft = rect.width < 900 ? 20 : 32;
    const boardLabelTop = rect.width < 900 ? 174 : 198;
    setView({
      scale,
      x: boardLeft - BOARD_X * scale,
      y: boardLabelTop - BOARD_Y * scale,
    });
  }, []);

  const fitAll = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const horizontalPadding = 86;
    const topInset = 118;
    const bottomInset = 70;
    const scale = clamp(
      Math.min(
        (rect.width - horizontalPadding * 2) / worldWidth,
        (rect.height - topInset - bottomInset) / worldHeight,
      ),
      MIN_SCALE,
      0.82,
    );
    hasInteractedRef.current = true;
    setView({
      scale,
      x: (rect.width - worldWidth * scale) / 2,
      y:
        topInset +
        (rect.height - topInset - bottomInset - worldHeight * scale) / 2,
    });
  }, [worldHeight, worldWidth]);

  useEffect(() => {
    setOpeningView();
    const handleResize = () => {
      if (!hasInteractedRef.current) setOpeningView();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpeningView]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    resolveTimerRef.current = window.setTimeout(
      () => setTransitionPhase("open"),
      reducedMotion ? 240 : 1260,
    );
    return () => {
      if (resolveTimerRef.current !== null) window.clearTimeout(resolveTimerRef.current);
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const requestClose = useCallback(() => {
    if (transitionPhase === "exiting") return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setActive(null);
    setLocked(false);
    setTransitionPhase("exiting");
    closeTimerRef.current = window.setTimeout(
      onClose,
      reducedMotion ? 240 : 920,
    );
  }, [onClose, transitionPhase]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (active) {
          setActive(null);
          setLocked(false);
        } else {
          requestClose();
        }
        return;
      }
      if (event.key === "0") {
        event.preventDefault();
        fitAll();
      }
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        hasInteractedRef.current = true;
        setView((current) => ({
          ...current,
          scale: clamp(current.scale * 1.18, MIN_SCALE, MAX_SCALE),
        }));
      }
      if (event.key === "-") {
        event.preventDefault();
        hasInteractedRef.current = true;
        setView((current) => ({
          ...current,
          scale: clamp(current.scale / 1.18, MIN_SCALE, MAX_SCALE),
        }));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, fitAll, requestClose]);

  const zoomAt = useCallback(
    (nextScale: number, clientX?: number, clientY?: number) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const rect = viewport.getBoundingClientRect();
      hasInteractedRef.current = true;
      setView((current) => {
        const scale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
        const anchorX =
          typeof clientX === "number" ? clientX - rect.left : rect.width / 2;
        const anchorY =
          typeof clientY === "number" ? clientY - rect.top : rect.height / 2;
        const worldX = (anchorX - current.x) / current.scale;
        const worldY = (anchorY - current.y) / current.scale;
        return {
          scale,
          x: anchorX - worldX * scale,
          y: anchorY - worldY * scale,
        };
      });
    },
    [],
  );

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const factor = Math.exp(-event.deltaY * 0.0013);
    zoomAt(view.scale * factor, event.clientX, event.clientY);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-canvas-control]")) return;
    hasInteractedRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: view.x,
      originY: view.y,
    };
    setDragging(true);
    setActive(null);
    setLocked(false);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setView((current) => ({
      ...current,
      x: drag.originX + event.clientX - drag.startX,
      y: drag.originY + event.clientY - drag.startY,
    }));
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
  };

  const handleSelect = (next: ActiveAnnotation) => {
    if (
      locked &&
      active?.boardId === next.boardId &&
      active.annotationId === next.annotationId
    ) {
      setActive(null);
      setLocked(false);
      return;
    }
    setActive(next);
    setLocked(true);
  };

  if (!canvasMeta || canvasItems.length === 0) return null;

  const resolvedBackLabel =
    backLabel ??
    (frameworkTitle.toUpperCase().includes("GESTALT")
      ? "BACK TO EXPERIMENTS"
      : "BACK TO FRAMEWORK");

  return (
    <div
      data-framework-canvas-root
      data-transition-phase={transitionPhase}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 80,
        background: "#000",
        color: "rgba(255,248,230,0.94)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes portalThresholdEnter { from { opacity: 0; } to { opacity: 1; } }
        @keyframes portalCanvasReveal {
          0%,18% { opacity:0; transform:scale(.972); filter:blur(9px) brightness(.34); }
          62% { opacity:.72; filter:blur(2px) brightness(.72); }
          100% { opacity:1; transform:scale(1); filter:blur(0) brightness(1); }
        }
        @keyframes portalCanvasRecede {
          from { opacity:1; transform:scale(1); filter:blur(0) brightness(1); }
          to { opacity:0; transform:scale(.974); filter:blur(8px) brightness(.32); }
        }
        @keyframes portalThresholdExit { from { opacity:1; } to { opacity:0; } }
        [data-framework-canvas-root][data-transition-phase="entering"] {
          animation: portalThresholdEnter 320ms ease-out both;
        }
        [data-framework-canvas-root][data-transition-phase="entering"] [data-portal-content] {
          animation: portalCanvasReveal 900ms 320ms cubic-bezier(.16,1,.3,1) both;
        }
        [data-framework-canvas-root][data-transition-phase="exiting"] {
          animation: portalThresholdExit 300ms 590ms ease-in both;
          pointer-events:none;
        }
        [data-framework-canvas-root][data-transition-phase="exiting"] [data-portal-content] {
          animation: portalCanvasRecede 560ms cubic-bezier(.4,0,.7,.2) both;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-framework-canvas-root],[data-portal-content] {
            animation-duration:220ms!important;
            animation-delay:0ms!important;
            filter:none!important;
            transform:none!important;
          }
        }
        [data-framework-canvas] button:focus-visible {
          outline:2px solid rgba(255,248,230,.92);
          outline-offset:4px;
        }
      `}</style>

      <div
        data-portal-content
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          background:
            "radial-gradient(circle at 18% 22%, rgba(45,33,68,0.18), transparent 34%), radial-gradient(circle at 78% 30%, rgba(20,65,68,0.12), transparent 35%), #04060B",
          transformOrigin: "50% 46%",
          willChange: "opacity, transform, filter",
        }}
      >
        <header
          data-canvas-control
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            zIndex: 20,
            minHeight: 96,
            padding: "18px 28px 20px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 32,
            background:
              "linear-gradient(180deg, rgba(4,6,11,0.98), rgba(4,6,11,0.82), transparent)",
            pointerEvents: "none",
          }}
        >
          <div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.22em",
              color: "rgba(225,195,92,0.82)",
              marginBottom: 7,
            }}>
              {canvasMeta.eyebrow}
            </div>
            <div style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 25,
              lineHeight: 1.12,
              color: "rgba(255,248,230,0.92)",
            }}>
              {canvasMeta.title}
            </div>
          </div>

          <button
            type="button"
            data-canvas-control
            onClick={requestClose}
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: 10,
              minHeight: 40,
              padding: "0 14px",
              color: "rgba(220,205,175,0.76)",
              border: "1px solid rgba(200,180,130,0.42)",
              background: "rgba(7,9,15,0.72)",
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.18em",
              cursor: "pointer",
            }}
          >
            <span style={{ lineHeight: 1, transform: "translateY(1px)" }}>
              {resolvedBackLabel}
            </span>
            <X size={13} />
          </button>
        </header>

        <div
          ref={viewportRef}
          data-framework-canvas
          role="application"
          aria-label={`${frameworkTitle}, ${sectionTitle}, interactive evidence canvas`}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            cursor: dragging ? "grabbing" : "grab",
            touchAction: "none",
            backgroundImage:
              "linear-gradient(rgba(130,160,155,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(130,160,155,0.035) 1px, transparent 1px), radial-gradient(circle, rgba(255,248,230,0.28) 0 1px, transparent 1.5px)",
            backgroundSize: "160px 160px, 160px 160px, 137px 137px",
            backgroundPosition: "center",
          }}
        >
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: worldWidth,
            height: worldHeight,
            transformOrigin: "0 0",
            transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
            willChange: "transform",
          }}>
            {canvasGroups.map((group) => {
              const startIndex = Math.min(group.startIndex, boardPositions.length - 1);
              const endIndex = Math.min(group.endIndex, boardPositions.length - 1);
              const start = boardPositions[startIndex];
              const end = boardPositions[endIndex];
              if (!start || !end) return null;
              const width = end.x + boardWidth - start.x;

              return (
                <section
                  key={group.id}
                  aria-label={`${group.label}. ${group.question}`}
                  style={{
                    position: "absolute",
                    left: start.x,
                    top: 132,
                    width,
                    height: worldHeight - 214,
                    pointerEvents: "none",
                  }}
                >
                  <div style={{
                    height: 1,
                    background: `linear-gradient(90deg, ${group.color}88, ${group.color}18 48%, transparent)`,
                  }} />
                  <div style={{
                    marginTop: 16,
                    paddingLeft: 18,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    letterSpacing: "0.2em",
                    color: group.color,
                  }}>
                    {group.label}
                  </div>
                  <div style={{
                    marginTop: 8,
                    paddingLeft: 18,
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 19,
                    lineHeight: 1.2,
                    color: "rgba(240,232,215,0.72)",
                  }}>
                    {group.question}
                  </div>
                </section>
              );
            })}

            {canvasItems.length > 2 &&
              canvasItems.slice(0, -1).map((item, index) => {
                const current = boardPositions[index];
                const next = boardPositions[index + 1];
                if (!current || !next) return null;
                const label =
                  canvasMeta.transitionLabels?.[index] ??
                  (index === 0 ? "DRIFT EMERGES" : "PRESERVATION CONSTRAINS");

                return (
                  <div
                    key={`transition-${item.id}`}
                    style={{
                      position: "absolute",
                      left: current.x + boardWidth + 22,
                      top:
                        BOARD_Y +
                        Math.max(boardHeights[index], boardHeights[index + 1]) +
                        68,
                      width: next.x - current.x - boardWidth - 44,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      color: "rgba(225,195,92,0.66)",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                    }}
                  >
                    <span>{label}</span>
                    <span style={{
                      flex: 1,
                      height: 1,
                      background:
                        "linear-gradient(90deg, rgba(225,195,92,0.18), rgba(225,195,92,0.72))",
                    }} />
                    <span style={{ fontSize: 18 }}>→</span>
                  </div>
                );
              })}

            {canvasItems.map((item, index) => (
              <EvidenceBoard
                key={item.id}
                item={item}
                position={boardPositions[index] ?? getBoardPosition(0, boardWidth)}
                boardIndex={index}
                boardWidth={boardWidth}
                boardHeight={boardHeights[index] ?? defaultBoardHeight}
                viewScale={view.scale}
                active={active}
                locked={locked}
                onPreview={setActive}
                onLeave={() => setActive(null)}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        <div data-canvas-control style={{
          position: "absolute",
          left: 26,
          bottom: 22,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 9,
          color: "rgba(200,180,130,0.52)",
          fontFamily: "'DM Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.16em",
          pointerEvents: "none",
        }}>
          <span style={{ fontSize: 15 }}>☝</span>
          DRAG TO EXPLORE&nbsp;&nbsp;·&nbsp;&nbsp;SCROLL TO ZOOM
        </div>

        <div data-canvas-control aria-label="Canvas zoom controls" style={{
          position: "absolute",
          left: "50%",
          bottom: 18,
          zIndex: 20,
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: 5,
          border: "1px solid rgba(200,180,130,0.20)",
          background: "rgba(8,10,17,0.90)",
          boxShadow: "0 12px 36px rgba(0,0,0,0.34)",
        }}>
          <button
            type="button"
            data-canvas-control
            aria-label="Zoom out"
            onClick={() => zoomAt(view.scale / 1.18)}
            style={controlButtonStyle}
          >
            <Minus size={14} />
          </button>
          <div style={{
            minWidth: 54,
            textAlign: "center",
            color: "rgba(255,248,230,0.76)",
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
          }}>
            {Math.round(view.scale * 100)}%
          </div>
          <button
            type="button"
            data-canvas-control
            aria-label="Zoom in"
            onClick={() => zoomAt(view.scale * 1.18)}
            style={controlButtonStyle}
          >
            <Plus size={14} />
          </button>
          <button
            type="button"
            data-canvas-control
            onClick={fitAll}
            style={{ ...controlButtonStyle, width: "auto", padding: "0 13px" }}
          >
            <Scan size={13} />
            FIT ALL
          </button>
          <button
            type="button"
            data-canvas-control
            onClick={() => zoomAt(1)}
            style={{ ...controlButtonStyle, width: "auto", padding: "0 13px" }}
          >
            1:1
          </button>
        </div>
      </div>
    </div>
  );
}

const controlButtonStyle = {
  height: 34,
  width: 38,
  border: "1px solid rgba(200,180,130,0.16)",
  background: "rgba(255,255,255,0.025)",
  color: "rgba(255,248,230,0.76)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  fontFamily: "'DM Mono', monospace",
  fontSize: 9,
  letterSpacing: "0.12em",
  cursor: "pointer",
} as const;
