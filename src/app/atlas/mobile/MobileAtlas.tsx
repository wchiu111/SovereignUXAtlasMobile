/**
 * MobileAtlas — Sovereign Atlas mobile prototype orchestrator.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  T,
  W,
  H,
  NEXUS,
  ORBIT_R,
  SYSTEMS,
  MOBILE_STATES,
  useStarfield,
  type MobileState,
} from "./components/mobileShared";
import LandingScene from "./scenes/LandingScene";
import ReadingScene from "./scenes/ReadingScene";
import FrameworksScene from "./scenes/FrameworksScene";
import ExperimentsScene from "./experiments/ExperimentsScene";
import ObservatoryScene from "./observatory/ObservatoryScene";
import ObservatorySwipeEntry from "./observatory/components/ObservatorySwipeEntry";
import ObservatorySpatialTransition, {
  OBSERVATORY_SPATIAL_TRANSITION_DURATION,
  atlasSpatialAnimation,
  observatorySpatialAnimation,
  type ObservatorySpatialDirection,
} from "./observatory/components/ObservatorySpatialTransition";
import SystemNode from "./case-studies/constellation/SystemNode";
import ExperimentsOverviewConstellation from "./experiments/constellation/ExperimentsOverviewConstellation";
import useExperimentsAtlasTransition from "./experiments/hooks/useExperimentsAtlasTransition";
import { EXPERIMENTS_PARENT_CORE } from "./experiments/config/experimentsTopology";
import type { MobileCaseStudyProjectId } from "./reading/mobileReadingTypes";
import type { MobileFrameworkId } from "./frameworks/mobileFrameworkTypes";
import type { FrameworkOverviewId } from "./frameworks/frameworkGeometry";
import type { MobileExperimentId } from "./experiments/experimentsTypes";
import {
  DEFAULT_MOBILE_FRAMEWORK_ID,
  mobileFrameworkFor,
} from "./frameworks/frameworkRegistry";
import {
  DEFAULT_MOBILE_EXPERIMENT_ID,
} from "./experiments/config/experimentsContent";

type AtlasRuntimeState =
  | MobileState
  | "experiments-focus"
  | "experiment-reading";

type ObservatoryRuntimePhase =
  | "closed"
  | "pre-enter"
  | "entering"
  | "open"
  | "exiting";


const RUNTIME_STATES: readonly AtlasRuntimeState[] = [
  ...MOBILE_STATES,
  "experiments-focus",
  "experiment-reading",
];

const STATE_LABELS: Record<AtlasRuntimeState, string> = {
  "atlas-landing":      "A · Landing",
  "system-awakened":    "B · CS Awakened",
  "system-overview":    "C · CS Overview",
  "project-reading":    "H · Reading",
  "frameworks-focus":   "J · FW Overview",
  "framework-reading":  "K · FW Reading",
  "framework-evidence": "L · FW Evidence",
  "experiments-focus":  "M · EX Overview",
  "experiment-reading": "N · EX Reading",
};

const STATE_GROUPS: {
  label: string;
  color: string;
  states: AtlasRuntimeState[];
}[] = [
  {
    label: "LANDING",
    color: T.gold,
    states: ["atlas-landing", "system-awakened", "system-overview"],
  },
  {
    label: "CASE STUDIES",
    color: T.caseStudies,
    states: ["project-reading"],
  },
  {
    label: "FRAMEWORKS",
    color: T.frameworks,
    states: ["frameworks-focus", "framework-reading", "framework-evidence"],
  },
  {
    label: "EXPERIMENTS",
    color: T.experiments,
    states: ["experiments-focus", "experiment-reading"],
  },
];

const LANDING_STATES: readonly AtlasRuntimeState[] = [
  "atlas-landing",
  "system-awakened",
  "system-overview",
];
const CS_READING_STATES: readonly AtlasRuntimeState[] = [
  "project-reading",
];
const FW_STATES: readonly AtlasRuntimeState[] = [
  "frameworks-focus",
  "framework-reading",
  "framework-evidence",
];

function debugRgb(color: string) {
  if (color === T.gold) return "232,213,163";
  if (color === T.caseStudies) return "138,174,200";
  if (color === T.experiments) return "166,139,212";
  return "106,184,138";
}

function isDebugMode() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("debug") === "1";
}

export default function MobileAtlas() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const runtimeViewportRef = useRef<HTMLDivElement>(null);
  useStarfield(canvasRef);

  const [sceneScale, setSceneScale] = useState(1);
  const [observatoryScale, setObservatoryScale] = useState(1);
  const [viewportUiTarget, setViewportUiTarget] =
    useState<HTMLDivElement | null>(null);
  const [state, setStateRaw] =
    useState<AtlasRuntimeState>("atlas-landing");

  const [activeFrameworkId, setActiveFrameworkId] =
    useState<MobileFrameworkId>(DEFAULT_MOBILE_FRAMEWORK_ID);
  const [frameworkOverviewSelectionId, setFrameworkOverviewSelectionId] =
    useState<FrameworkOverviewId>("frameworks");
  const [activeFrameworkSectionId, setActiveFrameworkSectionId] =
    useState<string>("governance");
  const [activeFrameworkEvidenceId, setActiveFrameworkEvidenceId] =
    useState<string | null>(null);
  const [returnFrameworkId, setReturnFrameworkId] =
    useState<MobileFrameworkId | null>(null);
  const [returningFrameworksToAtlas, setReturningFrameworksToAtlas] =
    useState(false);

  const [activeCaseStudyProjectId, setActiveCaseStudyProjectId] =
    useState<MobileCaseStudyProjectId | null>(null);
  const [returnCaseStudyProjectId, setReturnCaseStudyProjectId] =
    useState<MobileCaseStudyProjectId | null>(null);

  const [activeExperimentId, setActiveExperimentId] =
    useState<MobileExperimentId>(DEFAULT_MOBILE_EXPERIMENT_ID);
  const [returnExperimentId, setReturnExperimentId] =
    useState<MobileExperimentId | null>(null);
  const [returningExperimentsToAtlas, setReturningExperimentsToAtlas] =
    useState(false);

  const completeExperimentAtlasEntry = useCallback(() => {
    setStateRaw("experiments-focus");
  }, []);

  const completeExperimentAtlasReturn = useCallback(() => {
    setReturningExperimentsToAtlas(false);
  }, []);

  const {
    entryPhase: experimentEntryPhase,
    resolveT: experimentResolveT,
    prefersReducedMotion: experimentPrefersReducedMotion,
    reducedEntryProgress: experimentReducedEntryProgress,
    reducedExitProgress: experimentReducedExitProgress,

    enterExperiments,

    entryInProgress: experimentEntryInProgress,
    reducedEntryInProgress: experimentReducedEntryInProgress,
    reducedExitInProgress: experimentReducedExitInProgress,
    entryProgress: experimentEntryProgress,
    resolvingOverview: resolvingExperimentOverview,

    landingStartX: experimentLandingStartX,
    landingStartY: experimentLandingStartY,
    animatedExperimentX,
    animatedExperimentY,
    animatedExperimentOrbitR,
    selectedSystemScale: experimentSelectedSystemScale,
    travelingSystemOpacity: experimentTravelingSystemOpacity,
    overviewResolveOpacity: experimentOverviewResolveOpacity,
    overviewResolveScale: experimentOverviewResolveScale,
    overviewResolveTargets: experimentOverviewResolveTargets,

    exitScale: experimentExitScale,
    exitTranslateX: experimentExitTranslateX,
    exitTranslateY: experimentExitTranslateY,
    exitBackgroundT: experimentExitBackgroundT,
    exitChromeT: experimentExitChromeT,

    contextRecede: experimentContextRecede,
  } = useExperimentsAtlasTransition({
    returningToAtlas: returningExperimentsToAtlas,
    onEnterComplete: completeExperimentAtlasEntry,
    onReturnComplete: completeExperimentAtlasReturn,
  });

  const [observatoryPhase, setObservatoryPhase] =
    useState<ObservatoryRuntimePhase>("closed");
  const [observatoryPrefersReducedMotion, setObservatoryPrefersReducedMotion] =
    useState(false);
  const observatoryTimerRef = useRef<number | null>(null);
  const observatoryRafRef = useRef<number | null>(null);

  const observatoryVisible = observatoryPhase !== "closed";
  const observatoryDirection: ObservatorySpatialDirection | null =
    observatoryPhase === "entering"
      ? "toObservatory"
      : observatoryPhase === "exiting"
      ? "toAtlas"
      : null;
  const observatoryTransitionDuration = observatoryPrefersReducedMotion
    ? 160
    : OBSERVATORY_SPATIAL_TRANSITION_DURATION;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setObservatoryPrefersReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  const clearObservatoryTransition = useCallback(() => {
    if (observatoryTimerRef.current !== null) {
      window.clearTimeout(observatoryTimerRef.current);
      observatoryTimerRef.current = null;
    }
    if (observatoryRafRef.current !== null) {
      cancelAnimationFrame(observatoryRafRef.current);
      observatoryRafRef.current = null;
    }
  }, []);

  const enterObservatory = useCallback(() => {
    if (
      observatoryVisible ||
      experimentEntryInProgress ||
      returningExperimentsToAtlas
    ) {
      return;
    }

    clearObservatoryTransition();
    setObservatoryPhase("pre-enter");

    observatoryRafRef.current = requestAnimationFrame(() => {
      observatoryRafRef.current = requestAnimationFrame(() => {
        setObservatoryPhase("entering");
        observatoryRafRef.current = null;
      });
    });

    observatoryTimerRef.current = window.setTimeout(() => {
      setObservatoryPhase("open");
      observatoryTimerRef.current = null;
    }, observatoryTransitionDuration);
  }, [
    clearObservatoryTransition,
    experimentEntryInProgress,
    observatoryTransitionDuration,
    observatoryVisible,
    returningExperimentsToAtlas,
  ]);

  const exitObservatory = useCallback(() => {
    if (!observatoryVisible || observatoryPhase === "exiting") return;

    clearObservatoryTransition();
    setObservatoryPhase("exiting");

    observatoryTimerRef.current = window.setTimeout(() => {
      setObservatoryPhase("closed");
      observatoryTimerRef.current = null;
    }, observatoryTransitionDuration);
  }, [
    clearObservatoryTransition,
    observatoryPhase,
    observatoryTransitionDuration,
    observatoryVisible,
  ]);

  useEffect(() => {
    return () => clearObservatoryTransition();
  }, [clearObservatoryTransition]);

  const debugMode = isDebugMode();

  useLayoutEffect(() => {
    const viewport = runtimeViewportRef.current;
    if (!viewport) return;

    function updateSceneScale() {
      const width = viewport.clientWidth;
      const height = viewport.clientHeight;
      if (width <= 0 || height <= 0) return;

      // Uniform contain scaling:
      // preserve the authored 390×844 scene as one composition.
      // On wide preview surfaces, stop scaling once the mobile presentation
      // reaches the same 430px width used by Focused Mode.
      const maxPresentationScale = 430 / W;
      const nextScale = Math.min(
        width / W,
        height / H,
        maxPresentationScale,
      );
      setSceneScale(nextScale);
      setObservatoryScale(Math.min(width / W, height / H));
    }

    updateSceneScale();
    window.addEventListener("resize", updateSceneScale);

    return () => {
      window.removeEventListener("resize", updateSceneScale);
    };
  }, []);

  function setState(next: AtlasRuntimeState) {
    if ((RUNTIME_STATES as readonly string[]).includes(next)) {
      setStateRaw(next);
    } else {
      setStateRaw("atlas-landing");
    }
  }

  const isLanding =
    (LANDING_STATES as readonly string[]).includes(state);
  const isCSReading =
    (CS_READING_STATES as readonly string[]).includes(state);
  const isFW =
    (FW_STATES as readonly string[]).includes(state);
  const isFrameworkReadingDepth =
    state === "framework-reading" || state === "framework-evidence";
  const isFrameworkEvidence = state === "framework-evidence";
  const isExperimentsOverview = state === "experiments-focus";
  const isExperimentReading = state === "experiment-reading";

  const experimentsAtlasTransitionActive =
    experimentEntryInProgress || returningExperimentsToAtlas;

  const experimentsLandingOpacity = returningExperimentsToAtlas
    ? experimentExitBackgroundT
    : experimentEntryInProgress
    ? experimentReducedEntryInProgress
      ? 1 - experimentReducedEntryProgress
      : experimentContextRecede.opacity
    : 1;

  const experimentsLandingScale = returningExperimentsToAtlas
    ? 0.978 + (1 - 0.978) * experimentExitBackgroundT
    : experimentEntryInProgress
    ? experimentReducedEntryInProgress
      ? 1 - 0.012 * experimentReducedEntryProgress
      : experimentContextRecede.scale
    : 1;

  const experimentsViewportUiOpacity = returningExperimentsToAtlas
    ? experimentExitChromeT
    : experimentEntryInProgress
    ? experimentReducedEntryInProgress
      ? 1 - experimentReducedEntryProgress
      : Math.max(0, 1 - experimentEntryProgress * 1.35)
    : 1;

  const experimentsSystem = SYSTEMS[1];

  return (
    <>
      <style>{`
        .mobile-atlas-root,
        .mobile-atlas-root * { -webkit-tap-highlight-color: transparent; }
        .mobile-atlas-root { overscroll-behavior: contain; touch-action: manipulation; }
        .mobile-atlas-root * { scrollbar-width: none; -ms-overflow-style: none; }
        .mobile-atlas-root *::-webkit-scrollbar { width: 0; height: 0; display: none; }

        .mobile-atlas-system-hit-target:focus-visible {
          outline: 1.5px solid rgba(166,139,212,0.9);
          outline-offset: 3px;
        }

        .mobile-atlas-observatory-layer button:focus-visible {
          outline: 1.5px solid rgba(232,200,109,0.92);
          outline-offset: 3px;
        }

        .mobile-atlas-landing-wrap[data-experiments-transitioning="true"]
        [data-system-id="experiments"] {
          opacity: 0 !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-atlas-root *,
          .mobile-atlas-root *::before,
          .mobile-atlas-root *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div
        className="mobile-atlas-root"
        style={{
          minHeight: debugMode ? "100vh" : "100dvh",
          width: "100%",
          background: "#080810",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: debugMode ? 24 : 0,
          padding: debugMode ? "48px 24px 60px" : 0,
          fontFamily: T.mono,
        }}
      >
        {debugMode && (
          <div
            style={{
              color: "rgba(232,213,163,0.32)",
              fontSize: 9,
              letterSpacing: "0.32em",
            }}
          >
            SOVEREIGN ATLAS · MOBILE PROTOTYPE · 390 × 844
          </div>
        )}

        <div
          ref={runtimeViewportRef}
          className="mobile-atlas-runtime-viewport"
          style={{
            position: "relative",
            width: debugMode ? W : "100%",
            height: debugMode ? H : "100dvh",
            overflow: "hidden",
            background: T.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              display: "block",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              width: W,
              height: H,
              overflow: "hidden",
              overscrollBehavior: "contain",
              borderRadius: debugMode ? 48 : 0,
              border: debugMode
                ? "1.5px solid rgba(232,213,163,0.10)"
                : "none",
              boxShadow: debugMode
                ? "0 0 0 6px rgba(5,5,10,0.9), 0 0 80px rgba(138,174,200,0.055), 0 40px 120px rgba(0,0,0,0.85)"
                : "none",
              background: "transparent",
              flexShrink: 0,
              zIndex:
                observatoryPhase === "entering"
                  ? 46
                  : observatoryPhase === "exiting"
                  ? 44
                  : 1,
              visibility:
                observatoryPhase === "open" ? "hidden" : "visible",
              transform: `scale(${sceneScale})`,
              transformOrigin: "center center",
              pointerEvents: observatoryVisible
                ? "none"
                : "auto",
            }}
          >
            <div
              className="mobile-atlas-spatial-layer"
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                opacity:
                  observatoryPhase === "open" ||
                  (observatoryPrefersReducedMotion &&
                    observatoryPhase === "entering")
                    ? 0
                    : 1,
                filter:
                  observatoryPhase === "open"
                    ? "blur(4px) saturate(0.76)"
                    : undefined,
                clipPath:
                  observatoryPhase === "open"
                    ? "circle(29% at 50% 44%)"
                    : undefined,
                transform:
                  observatoryPhase === "open"
                    ? "scale(0.6)"
                    : "scale(1)",
                transformOrigin: "50% 44%",
                animation:
                  observatoryPrefersReducedMotion
                    ? undefined
                    : atlasSpatialAnimation(observatoryDirection),
                transition:
                  observatoryPrefersReducedMotion &&
                  observatoryDirection
                    ? "opacity 160ms ease"
                    : undefined,
                willChange: "transform, clip-path, filter, opacity",
              }}
            >
            {isLanding && (
              <div
                className="mobile-atlas-landing-wrap"
                data-experiments-transitioning={
                  experimentsAtlasTransitionActive ? "true" : "false"
                }
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: experimentsLandingOpacity,
                  transform: `scale(${experimentsLandingScale})`,
                  transformOrigin: `${NEXUS.x}px ${NEXUS.y + 26}px`,
                  transition: experimentsAtlasTransitionActive
                    ? "opacity 260ms ease, transform 560ms cubic-bezier(0.22,1,0.36,1)"
                    : "none",
                  pointerEvents: experimentsAtlasTransitionActive
                    ? "none"
                    : "auto",
                }}
              >
              <LandingScene
                state={
                  state as
                    | "atlas-landing"
                    | "system-awakened"
                    | "system-overview"
                }
                onSelectCaseStudies={() =>
                  setState("system-awakened")
                }
                onSelectFrameworks={() => {
                  setReturningFrameworksToAtlas(false);
                  setFrameworkOverviewSelectionId("frameworks");
                  setReturnFrameworkId(null);
                  setState("frameworks-focus");
                }}
                onOverviewExpand={() =>
                  setState("system-overview")
                }
                onOverviewBack={() =>
                  setState("system-awakened")
                }
                onSelectProject={(projectId) => {
                  setActiveCaseStudyProjectId(projectId);
                  setReturnCaseStudyProjectId(null);
                  setState("project-reading");
                }}
                returnProjectId={returnCaseStudyProjectId}
                onReturnProjectComplete={() => {
                  setReturnCaseStudyProjectId(null);
                }}
                returningFromFrameworks={
                  returningFrameworksToAtlas
                }
                onFrameworkReturnComplete={() => {
                  setReturningFrameworksToAtlas(false);
                }}
                viewportUiTarget={viewportUiTarget}
                onBack={() => {
                  setActiveCaseStudyProjectId(null);
                  setReturnCaseStudyProjectId(null);
                  setState("atlas-landing");
                }}
              />
              </div>
            )}

            {state === "atlas-landing" && (
              <button
                type="button"
                className="mobile-atlas-system-hit-target"
                aria-label="Open Experiments"
                onClick={() => {
                  setReturningExperimentsToAtlas(false);
                  setReturnExperimentId(null);
                  enterExperiments();
                }}
                disabled={
                  experimentEntryInProgress || returningExperimentsToAtlas
                }
                style={{
                  position: "absolute",
                  left: experimentLandingStartX - 56,
                  top: experimentLandingStartY - 56,
                  width: 112,
                  height: 112,
                  zIndex: 8,
                  border: "none",
                  borderRadius: "50%",
                  background: "transparent",
                  padding: 0,
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                }}
              />
            )}

            {state === "atlas-landing" &&
              !observatoryVisible &&
              !experimentEntryInProgress &&
              !returningExperimentsToAtlas && (
                <ObservatorySwipeEntry
                  disabled={
                    experimentEntryInProgress ||
                    returningExperimentsToAtlas
                  }
                  onCommit={enterObservatory}
                />
              )}

            {state === "atlas-landing" &&
              (experimentEntryInProgress || returningExperimentsToAtlas) && (
              <svg
                viewBox={`0 0 ${W} ${H}`}
                width={W}
                height={H}
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 10,
                  pointerEvents: "none",
                  overflow: "visible",
                }}
              >
                {experimentEntryInProgress && (
                  <>
                    <g
                      style={{
                        opacity: experimentTravelingSystemOpacity,
                        transform: `scale(${experimentSelectedSystemScale})`,
                        transformOrigin: `${animatedExperimentX}px ${animatedExperimentY}px`,
                        transition: resolvingExperimentOverview
                          ? "opacity 180ms ease"
                          : "transform 760ms cubic-bezier(0.22,1,0.36,1), opacity 180ms ease",
                      }}
                    >
                      <SystemNode
                        sys={experimentsSystem}
                        cx={animatedExperimentX}
                        cy={animatedExperimentY}
                        orbitR={animatedExperimentOrbitR}
                        awakened
                        dimmed={false}
                        showLabel={false}
                        resolveTargets={
                          resolvingExperimentOverview
                            ? experimentOverviewResolveTargets
                            : undefined
                        }
                        resolveT={
                          resolvingExperimentOverview
                            ? experimentResolveT
                            : 0
                        }
                      />
                    </g>

                    {resolvingExperimentOverview && (
                      <g
                        style={{
                          opacity:
                            experimentResolveT < 0.82
                              ? 0
                              : experimentOverviewResolveOpacity,
                          transform: `scale(${experimentOverviewResolveScale})`,
                          transformOrigin: `${EXPERIMENTS_PARENT_CORE.x}px ${EXPERIMENTS_PARENT_CORE.y}px`,
                          transition: "opacity 120ms ease",
                        }}
                      >
                        <ExperimentsOverviewConstellation
                          selectedId="experiments"
                          selectionPulseId={null}
                          ambientPaused
                          labelsVisible={false}
                          focusedEntryId={null}
                          focusedEntryProgress={0}
                          focusedReturnId={null}
                          focusedReturnProgress={0}
                          reducedMotion={experimentPrefersReducedMotion}
                          onSelect={() => {}}
                        />
                      </g>
                    )}
                  </>
                )}

                {returningExperimentsToAtlas && (
                  <g
                    style={{
                      opacity: experimentReducedExitInProgress
                        ? 1 - experimentReducedExitProgress
                        : 1,
                      transform: `translate(${experimentExitTranslateX}px, ${experimentExitTranslateY}px) scale(${experimentExitScale})`,
                      transformOrigin: `${EXPERIMENTS_PARENT_CORE.x}px ${EXPERIMENTS_PARENT_CORE.y}px`,
                    }}
                  >
                    <ExperimentsOverviewConstellation
                      selectedId="experiments"
                      selectionPulseId={null}
                      ambientPaused
                      labelsVisible={false}
                      focusedEntryId={null}
                      focusedEntryProgress={0}
                      focusedReturnId={null}
                      focusedReturnProgress={0}
                      reducedMotion={experimentPrefersReducedMotion}
                      onSelect={() => {}}
                    />
                  </g>
                )}
              </svg>
            )}

            {isFW && !isFrameworkReadingDepth && (
              <FrameworksScene
                state="frameworks-focus"
                activeFrameworkId={activeFrameworkId}
                overviewSelectionId={frameworkOverviewSelectionId}
                activeSectionId={activeFrameworkSectionId}
                setActiveSectionId={setActiveFrameworkSectionId}
                onSelectFramework={(frameworkId) => {
                  const nextFramework =
                    mobileFrameworkFor(frameworkId);
                  setReturnFrameworkId(null);
                  setActiveFrameworkId(frameworkId);
                  setActiveFrameworkSectionId(
                    nextFramework.sections[0]?.id ?? "",
                  );
                  setActiveFrameworkEvidenceId(null);
                  setFrameworkOverviewSelectionId(frameworkId);
                }}
                onSelectParent={() => {
                  setReturnFrameworkId(null);
                  setFrameworkOverviewSelectionId("frameworks");
                }}
                onExplore={() => {
                  setReturnFrameworkId(null);
                  setFrameworkOverviewSelectionId(
                    activeFrameworkId,
                  );
                  setState("framework-reading");
                }}
                onCanvas={(evidenceId) => {
                  setActiveFrameworkEvidenceId(evidenceId);
                  setState("framework-evidence");
                }}
                activeEvidenceId={activeFrameworkEvidenceId}
                viewportUiTarget={viewportUiTarget}
                returnFrameworkId={returnFrameworkId}
                onReturnFrameworkComplete={() => {
                  setReturnFrameworkId(null);
                }}
                onBack={() => {
                  setReturnFrameworkId(null);
                  setFrameworkOverviewSelectionId("frameworks");
                  setReturningFrameworksToAtlas(true);
                  setState("atlas-landing");
                }}
              />
            )}

            {isExperimentsOverview && (
              <ExperimentsScene
                state="experiments-focus"
                activeExperimentId={activeExperimentId}
                returnExperimentId={returnExperimentId}
                viewportUiTarget={viewportUiTarget}
                onSelectExperiment={(experimentId) => {
                  setReturnExperimentId(null);
                  setActiveExperimentId(experimentId);
                }}
                onExplore={(experimentId) => {
                  setReturnExperimentId(null);
                  setActiveExperimentId(experimentId);
                  setState("experiment-reading");
                }}
                onReturnExperimentComplete={() => {
                  setReturnExperimentId(null);
                }}
                onBack={() => {
                  setReturnExperimentId(null);
                  setReturningExperimentsToAtlas(true);
                  setState("atlas-landing");
                }}
              />
            )}
            </div>
          </div>

          {observatoryVisible && (
            <div
              className="mobile-atlas-observatory-layer"
              style={{
                position: "absolute",
                inset: 0,
                zIndex:
                  observatoryPhase === "exiting" ? 46 : 44,
                overflow: "hidden",
                pointerEvents:
                  observatoryPhase === "open" ? "auto" : "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity:
                    observatoryPhase === "pre-enter" ||
                    (observatoryPrefersReducedMotion &&
                      observatoryPhase === "exiting")
                      ? 0
                      : 1,
                  transform:
                    observatoryPhase === "pre-enter"
                      ? "scale(1.04)"
                      : "scale(1)",
                  filter:
                    observatoryPhase === "pre-enter"
                      ? "blur(7px)"
                      : "blur(0px)",
                  transformOrigin: "50% 44%",
                  animation:
                    observatoryPrefersReducedMotion
                      ? undefined
                      : observatorySpatialAnimation(
                          observatoryDirection,
                        ),
                  transition: observatoryPrefersReducedMotion
                    ? "opacity 160ms ease, filter 160ms ease"
                    : undefined,
                  willChange: "transform, filter, opacity",
                }}
              >
                <ObservatoryScene
                  onReturnToAtlas={exitObservatory}
                  presentationScale={observatoryScale}
                />
              </div>
            </div>
          )}

          {observatoryDirection && !observatoryPrefersReducedMotion && (
            <ObservatorySpatialTransition
              direction={observatoryDirection}
            />
          )}

          <div
            ref={(node) => setViewportUiTarget(node)}
            className="mobile-atlas-viewport-ui"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: "min(100%, 430px)",
              transform: "translateX(-50%)",
              zIndex: 20,
              pointerEvents: "none",
              overflow: "hidden",
              opacity: observatoryVisible
                ? 0
                : experimentsViewportUiOpacity,
              transition: observatoryVisible
                ? "opacity 180ms ease"
                : experimentsAtlasTransitionActive
                ? "opacity 220ms ease"
                : "none",
            }}
          />

          {isCSReading && (
            <div
              className="mobile-atlas-reading-layer"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 30,
                overflow: "hidden",
                pointerEvents: "auto",
              }}
            >
              <ReadingScene
                projectId={activeCaseStudyProjectId}
                onBack={() => {
                  setReturnCaseStudyProjectId(
                    activeCaseStudyProjectId,
                  );
                  setState("system-awakened");
                }}
              />
            </div>
          )}

          {isFrameworkReadingDepth && (
            <div
              className="mobile-atlas-reading-layer mobile-atlas-framework-reading-layer"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 30,
                overflow: "hidden",
                pointerEvents: "auto",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "50%",
                  width: "min(100%, 430px)",
                  transform: "translateX(-50%)",
                  overflow: "hidden",
                }}
              >
                <FrameworksScene
                  state="framework-reading"
                  activeFrameworkId={activeFrameworkId}
                  overviewSelectionId={
                    frameworkOverviewSelectionId
                  }
                  activeSectionId={activeFrameworkSectionId}
                  setActiveSectionId={
                    setActiveFrameworkSectionId
                  }
                  onSelectFramework={setActiveFrameworkId}
                  onSelectParent={() =>
                    setFrameworkOverviewSelectionId("frameworks")
                  }
                  onExplore={() =>
                    setState("framework-reading")
                  }
                  onCanvas={(evidenceId) => {
                    setActiveFrameworkEvidenceId(evidenceId);
                    setState("framework-evidence");
                  }}
                  activeEvidenceId={activeFrameworkEvidenceId}
                  onBack={() => {
                    setReturnFrameworkId(activeFrameworkId);
                    setFrameworkOverviewSelectionId(
                      activeFrameworkId,
                    );
                    setState("frameworks-focus");
                  }}
                />

                {isFrameworkEvidence && (
                  <FrameworksScene
                    state="framework-evidence"
                    activeFrameworkId={activeFrameworkId}
                    overviewSelectionId={
                      frameworkOverviewSelectionId
                    }
                    activeSectionId={
                      activeFrameworkSectionId
                    }
                    setActiveSectionId={
                      setActiveFrameworkSectionId
                    }
                    onSelectFramework={setActiveFrameworkId}
                    onSelectParent={() =>
                      setFrameworkOverviewSelectionId(
                        "frameworks",
                      )
                    }
                    onExplore={() =>
                      setState("framework-reading")
                    }
                    onCanvas={(evidenceId) => {
                      setActiveFrameworkEvidenceId(evidenceId);
                      setState("framework-evidence");
                    }}
                    activeEvidenceId={
                      activeFrameworkEvidenceId
                    }
                    onBack={() => {
                      setActiveFrameworkEvidenceId(null);
                      setState("framework-reading");
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {isExperimentReading && (
            <div
              className="mobile-atlas-reading-layer mobile-atlas-experiment-reading-layer"
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 30,
                overflow: "hidden",
                pointerEvents: "auto",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "50%",
                  width: "min(100%, 430px)",
                  transform: "translateX(-50%)",
                  overflow: "hidden",
                }}
              >
                <ExperimentsScene
                  state="experiment-reading"
                  activeExperimentId={activeExperimentId}
                  onBack={() => {
                    setReturnExperimentId(activeExperimentId);
                    setState("experiments-focus");
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {debugMode && (
          <>
            <div
              style={{
                color: "rgba(232,213,163,0.28)",
                fontSize: 8.5,
                letterSpacing: "0.22em",
                textAlign: "center",
              }}
            >
              {STATE_LABELS[state]}
            </div>

            <div
              style={{
                borderTop:
                  "0.5px solid rgba(232,213,163,0.10)",
                paddingTop: 20,
                width: "100%",
                maxWidth: 560,
              }}
            >
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 7,
                  letterSpacing: "0.22em",
                  color: "rgba(232,213,163,0.22)",
                  marginBottom: 14,
                  textAlign: "center",
                }}
              >
                DEV · STATE SWITCHER · NOT PART OF MOBILE
                EXPERIENCE
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {STATE_GROUPS.map((group) => {
                  const rgb = debugRgb(group.color);

                  return (
                    <div
                      key={group.label}
                      style={{
                        display: "flex",
                        gap: 4,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: T.mono,
                          fontSize: 6,
                          letterSpacing: "0.18em",
                          color: group.color,
                          opacity: 0.28,
                          minWidth: 80,
                          paddingRight: 8,
                          textAlign: "right",
                        }}
                      >
                        {group.label}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: 2,
                          flexWrap: "wrap",
                          background: `rgba(${rgb},0.05)`,
                          borderRadius: 4,
                          padding: 2,
                        }}
                      >
                        {group.states.map((s) => (
                          <button
                            key={s}
                            onClick={() => setState(s)}
                            style={{
                              background:
                                state === s
                                  ? `rgba(${rgb},0.16)`
                                  : "transparent",
                              border: "none",
                              color:
                                state === s
                                  ? group.color
                                  : `${group.color}66`,
                              fontFamily: T.mono,
                              fontSize: 7.5,
                              letterSpacing: "0.14em",
                              padding: "7px 10px",
                              cursor: "pointer",
                              borderRadius: 3,
                              transition: "all 0.2s ease",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {STATE_LABELS[s]}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                color: "rgba(232,213,163,0.12)",
                fontSize: 7.5,
                letterSpacing: "0.14em",
                textAlign: "center",
                lineHeight: 1.7,
              }}
            >
              MOBILE PROTOTYPE · Experiments Connected
            </div>
          </>
        )}
      </div>
    </>
  );
}
