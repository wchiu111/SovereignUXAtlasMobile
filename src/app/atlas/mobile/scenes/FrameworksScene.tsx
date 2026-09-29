/**
 * FrameworksScene
 *
 * Shared mobile framework renderer.
 * Framework identity and authored overview/reading data come from the registry.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { T, W, H } from "../components/mobileShared";
import MobileReadingHeader from "../reading/MobileReadingHeader";
import { mobileFrameworkFor } from "../frameworks/frameworkRegistry";
import FrameworkOverviewConstellation from "../frameworks/constellation/FrameworkOverviewConstellation";
import FrameworkPreviewDrawer from "../frameworks/surfaces/FrameworkPreviewDrawer";
import FrameworksChrome from "../frameworks/surfaces/FrameworksChrome";
import FrameworkSceneStyles from "../frameworks/surfaces/FrameworkSceneStyles";
import AtlasOverviewFrame from "../overview/AtlasOverviewFrame";
import useFrameworksChoreography from "../frameworks/hooks/useFrameworksChoreography";
import {
  FRAMEWORK_DRAWER_CLOSE_DURATION,
  FRAMEWORK_REDUCED_MOTION_DRAWER_DURATION,
} from "../frameworks/frameworkMotion";
import type {
  MobileFrameworkDocument,
  MobileFrameworkId,
  MobileFrameworkSection,
} from "../frameworks/mobileFrameworkTypes";

type FWState =
  | "frameworks-focus"
  | "framework-reading"
  | "framework-evidence";

function FrameworkReadingSurface({
  framework,
  activeSectionId,
  setActiveSectionId,
  onCanvas,
  onBack,
}: {
  framework: MobileFrameworkDocument;
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
  onCanvas: (evidenceId: string) => void;
  onBack: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef(new Map<string, HTMLElement>());
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());

  const [chromeHeight, setChromeHeight] = useState(114);
  const [headerElevated, setHeaderElevated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionIds = useMemo(
    () => framework.sections.map((section) => section.id),
    [framework.sections],
  );

  useEffect(() => {
    const firstId = framework.sections[0]?.id ?? "";
    setActiveSectionId(firstId);
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [framework.id, framework.sections, setActiveSectionId]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const chrome = chromeRef.current;
    if (!chrome) return;

    const updateChromeHeight = () => {
      const nextHeight = Math.ceil(chrome.getBoundingClientRect().height);
      if (nextHeight > 0) setChromeHeight(nextHeight);
    };

    updateChromeHeight();

    const observer = new ResizeObserver(updateChromeHeight);
    observer.observe(chrome);
    window.addEventListener("resize", updateChromeHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateChromeHeight);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || sectionIds.length === 0) return;

    let frame = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      setHeaderElevated(scroller.scrollTop > 12);

      frame = requestAnimationFrame(() => {
        const rootTop = scroller.getBoundingClientRect().top;
        const activationLine = rootTop + 156;

        let bestId = sectionIds[0];
        let bestDistance = Number.POSITIVE_INFINITY;

        for (const id of sectionIds) {
          const node = sectionRefs.current.get(id);
          if (!node) continue;

          const rect = node.getBoundingClientRect();
          const distance = Math.abs(rect.top - activationLine);

          if (rect.top <= activationLine + 24 && distance < bestDistance) {
            bestId = id;
            bestDistance = distance;
          }
        }

        const lastId = sectionIds[sectionIds.length - 1];
        const lastNode = sectionRefs.current.get(lastId);

        if (
          lastNode &&
          scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 24
        ) {
          bestId = lastId;
        }

        setActiveSectionId(bestId);
      });
    };

    updateActiveSection();
    scroller.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds, setActiveSectionId]);

  useEffect(() => {
    const activeButton = buttonRefs.current.get(activeSectionId);
    activeButton?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeSectionId, prefersReducedMotion]);

  const scrollToSection = (id: string) => {
    const node = sectionRefs.current.get(id);
    const scroller = scrollRef.current;
    if (!node || !scroller) return;

    setActiveSectionId(id);

    const scrollerTop = scroller.getBoundingClientRect().top;
    const nodeTop = node.getBoundingClientRect().top;
    const target = scroller.scrollTop + nodeTop - scrollerTop - 2;

    scroller.scrollTo({
      top: target,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background:
          "linear-gradient(to bottom, rgba(5,5,10,0.72), rgba(5,5,10,0.99) 180px)",
      }}
    >
      <div
        ref={chromeRef}
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          zIndex: 10,
        }}
      >
        <MobileReadingHeader
          title={framework.title}
          onBack={onBack}
          elevated={headerElevated}
        />

        <nav
          aria-label={`${framework.title} framework sections`}
          style={{
            minHeight: 52,
            background: "rgba(5,5,10,0.97)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            borderBottom: "0.5px solid rgba(106,184,138,0.12)",
          }}
        >
          <div
            style={{
              minHeight: 52,
              overflowX: "auto",
              overflowY: "hidden",
              display: "flex",
              alignItems: "stretch",
              gap: "clamp(20px, 6vw, 26px)",
              padding: "0 clamp(18px, 5.5vw, 24px)",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
              overscrollBehaviorX: "contain",
              scrollSnapType: "x proximity",
            }}
          >
            {framework.sections.map((section, index) => {
              const active = section.id === activeSectionId;
              const number = String(index + 1).padStart(2, "0");

              return (
                <button
                  key={section.id}
                  ref={(node) => {
                    if (node) buttonRefs.current.set(section.id, node);
                    else buttonRefs.current.delete(section.id);
                  }}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  aria-current={active ? "location" : undefined}
                  style={{
                    position: "relative",
                    flex: "0 0 auto",
                    minHeight: 44,
                    border: "none",
                    borderRadius: 2,
                    background: "transparent",
                    padding: "0 0 2px",
                    fontFamily: T.mono,
                    fontSize: "clamp(9px, 2.4vw, 9.5px)",
                    letterSpacing: "0.14em",
                    opacity: active ? 0.98 : 0.52,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    scrollSnapAlign: "center",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      marginRight: 7,
                      color: active ? T.frameworks : T.accentGold,
                      opacity: active ? 0.96 : 0.58,
                    }}
                  >
                    {number}
                  </span>
                  <span
                    style={{
                      color: active ? "#F0E9D8" : T.accentGold,
                      opacity: active ? 0.96 : 0.68,
                    }}
                  >
                    {section.label}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 1,
                      background: T.frameworks,
                      transform: `scaleX(${active ? 1 : 0})`,
                      transformOrigin: "left center",
                      transition: "transform 220ms ease, opacity 220ms ease",
                      opacity: active ? 0.86 : 0,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      <div
        ref={scrollRef}
        role="main"
        aria-label={`${framework.title} framework reading`}
        style={{
          position: "absolute",
          top: chromeHeight,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorY: "contain",
        }}
      >
        {framework.sections.map((section) => {
          const evidence = framework.evidence.filter(
            (item) => item.sectionId === section.id || item.sectionId === "*",
          );

          return (
            <section
              key={section.id}
              id={`mobile-framework-reading-${section.id}`}
              ref={(node) => {
                if (node) sectionRefs.current.set(section.id, node);
                else sectionRefs.current.delete(section.id);
              }}
              data-section-id={section.id}
              style={{
                scrollMarginTop: 138,
                padding:
                  "clamp(34px, 9vw, 40px) clamp(22px, 6.6vw, 28px) clamp(54px, 14vw, 64px)",
                borderBottom: "0.5px solid rgba(232,213,163,0.08)",
              }}
            >
              <div style={{ marginBottom: 18 }}>
                <h2
                  style={{
                    margin: "0 0 10px",
                    fontFamily: T.serif,
                    fontSize: "clamp(30px, 8vw, 34px)",
                    fontWeight: 600,
                    lineHeight: 1.08,
                    color: "#F0E9D8",
                  }}
                >
                  {section.label
                    .toLowerCase()
                    .replace(/\b\w/g, (letter) => letter.toUpperCase())}
                </h2>

                <div
                  style={{
                    fontFamily: T.serif,
                    fontSize: 19,
                    lineHeight: 1.3,
                    color: T.accentGold,
                    opacity: 0.88,
                  }}
                >
                  {section.subtitle}
                </div>
              </div>

              <div
                style={{
                  height: 0.5,
                  background: "rgba(232,213,163,0.10)",
                  marginBottom: 24,
                }}
              />

              {section.content.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    margin: "0 0 18px",
                    fontFamily: T.serif,
                    fontSize: "clamp(15px, 4.1vw, 16px)",
                    color: "#F0E9D8",
                    opacity: 0.86,
                    lineHeight: 1.7,
                  }}
                >
                  {paragraph}
                </p>
              ))}

              <aside
                style={{
                  borderLeft: "1.5px solid rgba(106,184,138,0.30)",
                  paddingLeft: 16,
                  margin: "28px 0",
                }}
              >
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 7,
                    letterSpacing: "0.18em",
                    color: T.frameworks,
                    opacity: 0.72,
                    marginBottom: 8,
                  }}
                >
                  LAYER INSIGHT
                </div>

                <div
                  style={{
                    fontFamily: T.serif,
                    fontSize: 14,
                    color: T.body,
                    opacity: 0.84,
                    lineHeight: 1.58,
                    fontStyle: "italic",
                  }}
                >
                  “{section.insight}”
                </div>
              </aside>

              {evidence.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveSectionId(section.id);
                    onCanvas(item.id);
                  }}
                  style={{
                    width: "100%",
                    borderRadius: 4,
                    border: "0.5px solid rgba(106,184,138,0.22)",
                    overflow: "hidden",
                    cursor: "pointer",
                    padding: 0,
                    background: "rgba(5,5,10,0.88)",
                    textAlign: "left",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    style={{
                      width: "100%",
                      height: 150,
                      objectFit: item.imageFit,
                      display: "block",
                      opacity: 0.88,
                    }}
                  />
                  <div style={{ padding: "11px 14px 13px" }}>
                    <div
                      style={{
                        fontFamily: T.mono,
                        fontSize: 7.5,
                        letterSpacing: "0.14em",
                        color: T.frameworks,
                        opacity: 0.74,
                        marginBottom: 5,
                      }}
                    >
                      {item.number} · {item.title.toUpperCase()} · INSPECT →
                    </div>

                    <div
                      style={{
                        fontFamily: T.serif,
                        fontSize: 13,
                        lineHeight: 1.52,
                        color: T.body,
                        opacity: 0.78,
                      }}
                    >
                      {item.caption}
                    </div>
                  </div>
                </button>
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function FrameworkEvidenceViewer({
  framework,
  section,
  evidenceId,
  onClose,
}: {
  framework: MobileFrameworkDocument;
  section: MobileFrameworkSection;
  evidenceId: string | null;
  onClose: () => void;
}) {
  const item =
    framework.evidence.find((evidence) => evidence.id === evidenceId) ??
    framework.evidence.find(
      (evidence) =>
        evidence.sectionId === section.id || evidence.sectionId === "*",
    );
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null);
  const panStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(
    null,
  );
  const lastTap = useRef(0);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  if (!item) return null;

  const distance = () => {
    const values = [...pointers.current.values()];
    if (values.length < 2) return 0;
    return Math.hypot(
      values[1].x - values[0].x,
      values[1].y - values[0].y,
    );
  };

  const reset = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Evidence: ${item.title}`}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 40,
        background: "rgba(5,5,10,0.985)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          minHeight: 68,
          padding: "10px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `0.5px solid rgba(106,184,138,0.12)`,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            minHeight: 44,
            border: "none",
            background: "transparent",
            padding: 0,
            fontFamily: T.mono,
            fontSize: 8,
            letterSpacing: "0.15em",
            color: T.body,
            opacity: 0.74,
          }}
        >
          ‹ {section.label}
        </button>
        <div
          style={{
            textAlign: "right",
            fontFamily: T.mono,
            fontSize: 7,
            letterSpacing: "0.13em",
            color: T.frameworks,
            opacity: 0.72,
          }}
        >
          {item.number} · {item.title.toUpperCase()}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <div
          onPointerDown={(event) => {
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
              pinchStart.current = { distance: distance(), scale };
              panStart.current = null;
            }
          }}
          onPointerMove={(event) => {
            if (!pointers.current.has(event.pointerId)) return;
            pointers.current.set(event.pointerId, {
              x: event.clientX,
              y: event.clientY,
            });
            if (pointers.current.size >= 2 && pinchStart.current) {
              const nextDistance = distance();
              if (pinchStart.current.distance > 0) {
                setScale(
                  Math.min(
                    4,
                    Math.max(
                      1,
                      pinchStart.current.scale *
                        (nextDistance / pinchStart.current.distance),
                    ),
                  ),
                );
              }
            } else if (
              pointers.current.size === 1 &&
              panStart.current &&
              scale > 1
            ) {
              setTranslate({
                x: panStart.current.tx + event.clientX - panStart.current.x,
                y: panStart.current.ty + event.clientY - panStart.current.y,
              });
            }
          }}
          onPointerUp={(event) => {
            pointers.current.delete(event.pointerId);
            if (pointers.current.size < 2) pinchStart.current = null;
            if (pointers.current.size === 0) panStart.current = null;
          }}
          onPointerCancel={(event) => {
            pointers.current.delete(event.pointerId);
          }}
          onClick={() => {
            const now = Date.now();
            if (now - lastTap.current < 280) {
              if (scale > 1) reset();
              else setScale(2);
            }
            lastTap.current = now;
          }}
          style={{
            overflow: "hidden",
            touchAction: "none",
            background: "rgba(3,3,8,0.96)",
            cursor: scale > 1 ? "grab" : "zoom-in",
          }}
        >
          <img
            src={item.image}
            alt={item.alt}
            draggable={false}
            style={{
              width: "100%",
              display: "block",
              objectFit: item.imageFit,
              transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
              transformOrigin: "center center",
              userSelect: "none",
              WebkitUserDrag: "none",
            }}
          />
        </div>

        <div
          style={{
            minHeight: 44,
            padding: "0 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `0.5px solid rgba(106,184,138,0.10)`,
          }}
        >
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 7,
              letterSpacing: "0.16em",
              color: T.body,
              opacity: 0.46,
            }}
          >
            PINCH OR DOUBLE-TAP TO INSPECT
          </div>
          <button
            type="button"
            onClick={reset}
            style={{
              minWidth: 44,
              minHeight: 44,
              border: "none",
              background: "transparent",
              fontFamily: T.mono,
              fontSize: 7,
              letterSpacing: "0.14em",
              color: T.frameworks,
            }}
          >
            RESET
          </button>
        </div>

        <div style={{ padding: "20px 28px 70px" }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 7,
              letterSpacing: "0.16em",
              color: T.frameworks,
              opacity: 0.70,
              marginBottom: 8,
            }}
          >
            CAPTION
          </div>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 13.5,
              lineHeight: 1.62,
              color: T.body,
              opacity: 0.84,
              marginBottom: 18,
            }}
          >
            {item.caption}
          </div>
          <div
            style={{
              borderTop: "0.5px solid rgba(232,213,163,0.08)",
              paddingTop: 16,
              fontFamily: T.serif,
              fontSize: 13,
              lineHeight: 1.62,
              color: T.body,
              opacity: 0.70,
            }}
          >
            {item.description}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FrameworksSceneProps {
  state: FWState;
  activeFrameworkId: MobileFrameworkId;
  overviewSelectionId: import("../frameworks/frameworkGeometry").FrameworkOverviewId;
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
  onSelectFramework: (id: MobileFrameworkId) => void;
  onSelectParent: () => void;
  onExplore: () => void;
  onCanvas: (evidenceId: string) => void;
  activeEvidenceId: string | null;
  viewportUiTarget?: HTMLElement | null;
  returnFrameworkId?: MobileFrameworkId | null;
  onReturnFrameworkComplete?: () => void;
  onBack: () => void;
}

export default function FrameworksScene({
  state,
  activeFrameworkId,
  overviewSelectionId,
  activeSectionId,
  setActiveSectionId,
  onSelectFramework,
  onSelectParent,
  onExplore,
  onCanvas,
  activeEvidenceId,
  viewportUiTarget = null,
  returnFrameworkId = null,
  onReturnFrameworkComplete,
  onBack,
}: FrameworksSceneProps) {
  const framework = mobileFrameworkFor(activeFrameworkId);
  const {
    selectedId,
    drawerItem,
    drawerPhase,
    selectionPulseId,
    labelsVisible,
    chromeVisible,
    drawerVisible,
    prefersReducedMotion,
    ambientPaused,
    focusedEntryFrameworkId,
    focusedEntryProgress,
    isReturningFromReading,
    focusedReturnProgress,
    selectOverviewItem,
    enterFocusedReading,
  } = useFrameworksChoreography({
    state,
    activeFrameworkId,
    overviewSelectionId,
    returnFrameworkId,
    onReturnFrameworkComplete,
    onSelectFramework,
    onSelectParent,
    onExplore,
  });

  const currentSection =
    framework.sections.find((section) => section.id === activeSectionId) ??
    framework.sections[0];

  if (state === "framework-reading") {
    return (
      <FrameworkReadingSurface
        framework={framework}
        activeSectionId={activeSectionId}
        setActiveSectionId={setActiveSectionId}
        onCanvas={onCanvas}
        onBack={onBack}
      />
    );
  }

  if (state === "framework-evidence" && currentSection) {
    return (
      <FrameworkEvidenceViewer
        framework={framework}
        section={currentSection}
        evidenceId={activeEvidenceId}
        onClose={onBack}
      />
    );
  }

  return (
    <>
      <FrameworkSceneStyles />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        style={{ position: "absolute", inset: 0 }}
        aria-label="Frameworks constellation"
      >
        <FrameworkOverviewConstellation
          selectedId={selectedId}
          selectionPulseId={selectionPulseId}
          ambientPaused={ambientPaused}
          labelsVisible={labelsVisible}
          focusedEntryId={focusedEntryFrameworkId}
          focusedEntryProgress={focusedEntryProgress}
          focusedReturnId={
            isReturningFromReading ? returnFrameworkId : null
          }
          focusedReturnProgress={focusedReturnProgress}
          reducedMotion={prefersReducedMotion}
          onSelect={selectOverviewItem}
        />
      </svg>

      <AtlasOverviewFrame
        target={viewportUiTarget}
        chrome={
          <FrameworksChrome
            visible={chromeVisible}
            onExitToAtlas={onBack}
          />
        }
        narrative={
          <FrameworkPreviewDrawer
            item={drawerItem}
            phase={drawerPhase}
            arrivalVisible={drawerVisible}
            reducedMotion={prefersReducedMotion}
            closeDurationMs={FRAMEWORK_DRAWER_CLOSE_DURATION}
            reducedDurationMs={FRAMEWORK_REDUCED_MOTION_DRAWER_DURATION}
            onExplore={() => {
              if (selectedId !== "frameworks") {
                enterFocusedReading(selectedId);
              }
            }}
          />
        }
      />
    </>
  );
}
