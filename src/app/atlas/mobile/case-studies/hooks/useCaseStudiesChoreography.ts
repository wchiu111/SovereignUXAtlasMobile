import { useEffect, useRef, useState } from "react";

import {
  CASE_STUDY_FOCUS_ITEMS,
  CASE_STUDY_PROJECTS,
} from "../caseStudyData";
import {
  CASE_STUDY_MINIATURE_SCALE,
  CASE_STUDY_OVERVIEW_LAYOUT,
  CS_FOCUS,
  OVERVIEW_CORE,
  lerp,
} from "../caseStudyGeometry";

import {
  CASE_STUDIES_ENTRY_DURATION,
  CASE_STUDIES_EXIT_DURATION,
  CASE_STUDIES_PULL_EASE,
  SELECTION_PULSE_DURATION,
  DRAWER_CLOSE_DURATION,
  DRAWER_OPEN_DURATION,
  OVERVIEW_LABEL_REVEAL_DELAY,
  OVERVIEW_CHROME_REVEAL_DELAY,
  REDUCED_MOTION_TRANSITION_DURATION,
  REDUCED_MOTION_DRAWER_DURATION,
  PROJECT_READING_HANDOFF_DURATION,
  PROJECT_READING_REDUCED_HANDOFF_DURATION,
  PROJECT_RETURN_DURATION,
  PROJECT_RETURN_REDUCED_DURATION,
} from "../caseStudyMotion";

export type CaseStudiesEntryPhase =
  | "idle"
  | "acknowledge"
  | "pulling"
  | "resolving"
  | "settled";

export type CaseStudiesDrawerPhase = "open" | "closing" | "opening";
export type CaseStudiesFocusId =
  (typeof CASE_STUDY_FOCUS_ITEMS)[number]["id"];
export type CaseStudyProjectId =
  (typeof CASE_STUDY_PROJECTS)[number]["id"];

type LandingState = "atlas-landing" | "system-awakened" | "system-overview";

interface UseCaseStudiesChoreographyArgs {
  state: LandingState;
  returnProjectId: CaseStudyProjectId | null;
  onSelectCaseStudies: () => void;
  onSelectProject?: (projectId: CaseStudyProjectId) => void;
  onReturnProjectComplete?: () => void;
  onBack: () => void;
}

export default function useCaseStudiesChoreography({
  state,
  returnProjectId,
  onSelectCaseStudies,
  onSelectProject,
  onReturnProjectComplete,
  onBack,
}: UseCaseStudiesChoreographyArgs) {
  const [selectedCaseStudyId, setSelectedCaseStudyId] =
    useState<CaseStudiesFocusId>(returnProjectId ?? "case-studies");
  const [drawerItemId, setDrawerItemId] =
    useState<CaseStudiesFocusId>(returnProjectId ?? "case-studies");
  const [drawerPhase, setDrawerPhase] =
    useState<CaseStudiesDrawerPhase>("open");
  const [entryPhase, setEntryPhase] =
    useState<CaseStudiesEntryPhase>("idle");
  const [overviewChromeVisible, setOverviewChromeVisible] = useState(false);
  const [overviewLabelsVisible, setOverviewLabelsVisible] = useState(false);
  const [selectionPulseId, setSelectionPulseId] =
    useState<CaseStudiesFocusId | null>(null);
  const [exitProgress, setExitProgress] = useState(0);
  const [isExitingCaseStudies, setIsExitingCaseStudies] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [reducedEntryProgress, setReducedEntryProgress] = useState(0);
  const [reducedExitProgress, setReducedExitProgress] = useState(0);
  const [focusedEntryProjectId, setFocusedEntryProjectId] =
    useState<CaseStudiesFocusId | null>(null);
  const [focusedEntryProgress, setFocusedEntryProgress] = useState(0);
  const [isReturningFromReading, setIsReturningFromReading] = useState(false);
  const [focusedReturnProgress, setFocusedReturnProgress] = useState(0);
  const [resolveT, setResolveT] = useState(0);

  const focusedReturnFrameRef = useRef<number | null>(null);
  const focusedEntryFrameRef = useRef<number | null>(null);
  const reducedEntryFrameRef = useRef<number | null>(null);
  const reducedExitFrameRef = useRef<number | null>(null);
  const exitFrameRef = useRef<number | null>(null);
  const selectionPulseTimerRef = useRef<number | null>(null);
  const drawerTimersRef = useRef<number[]>([]);
  const entryTimersRef = useRef<number[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      entryTimersRef.current.forEach(window.clearTimeout);
      entryTimersRef.current = [];
      drawerTimersRef.current.forEach(window.clearTimeout);
      drawerTimersRef.current = [];

      if (selectionPulseTimerRef.current !== null) {
        window.clearTimeout(selectionPulseTimerRef.current);
      }
      if (exitFrameRef.current !== null) {
        cancelAnimationFrame(exitFrameRef.current);
      }
      if (reducedEntryFrameRef.current !== null) {
        cancelAnimationFrame(reducedEntryFrameRef.current);
      }
      if (reducedExitFrameRef.current !== null) {
        cancelAnimationFrame(reducedExitFrameRef.current);
      }
      if (focusedEntryFrameRef.current !== null) {
        cancelAnimationFrame(focusedEntryFrameRef.current);
      }
      if (focusedReturnFrameRef.current !== null) {
        cancelAnimationFrame(focusedReturnFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (state === "atlas-landing") {
      setOverviewChromeVisible(false);
      setOverviewLabelsVisible(false);
    }

    if (state === "system-awakened") {
      if (entryPhase === "idle") setEntryPhase("settled");
      if (returnProjectId) return;

      const labelsTimer = window.setTimeout(() => {
        setOverviewLabelsVisible(true);
      }, prefersReducedMotion ? 0 : OVERVIEW_LABEL_REVEAL_DELAY);
      const chromeTimer = window.setTimeout(() => {
        setOverviewChromeVisible(true);
      }, prefersReducedMotion ? 0 : OVERVIEW_CHROME_REVEAL_DELAY);

      return () => {
        window.clearTimeout(labelsTimer);
        window.clearTimeout(chromeTimer);
      };
    }

    if (state !== "atlas-landing" && state !== "system-awakened") {
      entryTimersRef.current.forEach(window.clearTimeout);
      entryTimersRef.current = [];
      setEntryPhase("idle");
      setOverviewChromeVisible(false);
      setOverviewLabelsVisible(false);
    }
  }, [state, entryPhase, prefersReducedMotion, returnProjectId]);

  useEffect(() => {
    if (state !== "system-awakened" || !returnProjectId) return;

    setSelectedCaseStudyId(returnProjectId);
    setDrawerItemId(returnProjectId);
    setDrawerPhase("open");
    setOverviewLabelsVisible(false);
    setOverviewChromeVisible(false);
    setIsReturningFromReading(true);
    setFocusedReturnProgress(0);

    const duration = prefersReducedMotion
      ? PROJECT_RETURN_REDUCED_DURATION
      : PROJECT_RETURN_DURATION;
    const start = performance.now();

    const tickFocusedReturn = (now: number) => {
      const raw = Math.min(1, (now - start) / duration);
      const eased = prefersReducedMotion
        ? raw
        : raw * raw * (3 - 2 * raw);

      setFocusedReturnProgress(eased);

      if (raw < 1) {
        focusedReturnFrameRef.current =
          requestAnimationFrame(tickFocusedReturn);
        return;
      }

      focusedReturnFrameRef.current = null;
      setFocusedReturnProgress(1);
      setOverviewLabelsVisible(true);
      setOverviewChromeVisible(true);
      setIsReturningFromReading(false);
      onReturnProjectComplete?.();
    };

    focusedReturnFrameRef.current =
      requestAnimationFrame(tickFocusedReturn);

    return () => {
      if (focusedReturnFrameRef.current !== null) {
        cancelAnimationFrame(focusedReturnFrameRef.current);
        focusedReturnFrameRef.current = null;
      }
    };
  }, [
    state,
    returnProjectId,
    prefersReducedMotion,
    onReturnProjectComplete,
  ]);

  const enterCaseStudies = () => {
    entryTimersRef.current.forEach(window.clearTimeout);
    entryTimersRef.current = [];

    if (prefersReducedMotion) {
      setEntryPhase("acknowledge");
      setReducedEntryProgress(0);
      const start = performance.now();

      const tickReducedEntry = (now: number) => {
        const raw = Math.min(
          1,
          (now - start) / REDUCED_MOTION_TRANSITION_DURATION,
        );
        setReducedEntryProgress(raw);

        if (raw < 1) {
          reducedEntryFrameRef.current =
            requestAnimationFrame(tickReducedEntry);
          return;
        }

        reducedEntryFrameRef.current = null;
        setEntryPhase("settled");
        setReducedEntryProgress(0);
        onSelectCaseStudies();
      };

      reducedEntryFrameRef.current =
        requestAnimationFrame(tickReducedEntry);
      return;
    }

    setEntryPhase("acknowledge");

    entryTimersRef.current.push(
      window.setTimeout(() => setEntryPhase("pulling"), 110),
      window.setTimeout(() => setEntryPhase("resolving"), 560),
      window.setTimeout(() => {
        setEntryPhase("settled");
        onSelectCaseStudies();
      }, CASE_STUDIES_ENTRY_DURATION),
    );
  };

  const drawerItem =
    CASE_STUDY_FOCUS_ITEMS.find((item) => item.id === drawerItemId) ??
    CASE_STUDY_FOCUS_ITEMS[0];

  const enterFocusedReading = (projectId: CaseStudiesFocusId) => {
    if (focusedEntryProjectId || isExitingCaseStudies) return;
    if (projectId === "case-studies") return;

    if (selectionPulseTimerRef.current !== null) {
      window.clearTimeout(selectionPulseTimerRef.current);
      selectionPulseTimerRef.current = null;
      setSelectionPulseId(null);
    }
    drawerTimersRef.current.forEach(window.clearTimeout);
    drawerTimersRef.current = [];

    setFocusedEntryProjectId(projectId);
    setFocusedEntryProgress(0);
    setOverviewChromeVisible(false);
    setDrawerPhase("closing");

    const duration = prefersReducedMotion
      ? PROJECT_READING_REDUCED_HANDOFF_DURATION
      : PROJECT_READING_HANDOFF_DURATION;
    const start = performance.now();

    const tickFocusedEntry = (now: number) => {
      const raw = Math.min(1, (now - start) / duration);
      const eased = prefersReducedMotion
        ? raw
        : raw * raw * (3 - 2 * raw);

      setFocusedEntryProgress(eased);

      if (raw < 1) {
        focusedEntryFrameRef.current =
          requestAnimationFrame(tickFocusedEntry);
        return;
      }

      focusedEntryFrameRef.current = null;
      setFocusedEntryProgress(1);
      onSelectProject?.(projectId as CaseStudyProjectId);
    };

    focusedEntryFrameRef.current =
      requestAnimationFrame(tickFocusedEntry);
  };

  const selectCaseStudyOverviewItem = (id: CaseStudiesFocusId) => {
    if (drawerPhase === "closing") return;

    if (id === selectedCaseStudyId) {
      if (id !== "case-studies") enterFocusedReading(id);
      return;
    }

    if (selectionPulseTimerRef.current !== null) {
      window.clearTimeout(selectionPulseTimerRef.current);
      selectionPulseTimerRef.current = null;
    }
    drawerTimersRef.current.forEach(window.clearTimeout);
    drawerTimersRef.current = [];

    setSelectionPulseId(prefersReducedMotion ? null : id);
    setSelectedCaseStudyId(id);

    if (prefersReducedMotion) {
      setDrawerPhase("closing");
      drawerTimersRef.current.push(
        window.setTimeout(() => {
          setDrawerItemId(id);
          setDrawerPhase("opening");
          drawerTimersRef.current.push(
            window.setTimeout(() => {
              setDrawerPhase("open");
            }, REDUCED_MOTION_DRAWER_DURATION),
          );
        }, REDUCED_MOTION_DRAWER_DURATION),
      );
      return;
    }

    setDrawerPhase("closing");

    selectionPulseTimerRef.current = window.setTimeout(() => {
      setSelectionPulseId(null);
      selectionPulseTimerRef.current = null;
    }, SELECTION_PULSE_DURATION);

    drawerTimersRef.current.push(
      window.setTimeout(() => {
        setDrawerItemId(id);
        setDrawerPhase("opening");
        drawerTimersRef.current.push(
          window.setTimeout(() => {
            setDrawerPhase("open");
          }, DRAWER_OPEN_DURATION),
        );
      }, DRAWER_CLOSE_DURATION),
    );
  };

  const exitCaseStudiesToAtlas = () => {
    if (isExitingCaseStudies) return;

    if (prefersReducedMotion) {
      setIsExitingCaseStudies(true);
      setOverviewLabelsVisible(false);
      setOverviewChromeVisible(false);
      setDrawerPhase("closing");
      setReducedExitProgress(0);

      const start = performance.now();

      const tickReducedExit = (now: number) => {
        const raw = Math.min(
          1,
          (now - start) / REDUCED_MOTION_TRANSITION_DURATION,
        );
        setReducedExitProgress(raw);

        if (raw < 1) {
          reducedExitFrameRef.current =
            requestAnimationFrame(tickReducedExit);
          return;
        }

        reducedExitFrameRef.current = null;
        setSelectedCaseStudyId("case-studies");
        setDrawerItemId("case-studies");
        setDrawerPhase("open");
        setIsExitingCaseStudies(false);
        setReducedExitProgress(0);
        onBack();
      };

      reducedExitFrameRef.current =
        requestAnimationFrame(tickReducedExit);
      return;
    }

    if (selectionPulseTimerRef.current !== null) {
      window.clearTimeout(selectionPulseTimerRef.current);
      selectionPulseTimerRef.current = null;
      setSelectionPulseId(null);
    }

    setIsExitingCaseStudies(true);
    setOverviewLabelsVisible(false);
    setOverviewChromeVisible(false);
    setDrawerPhase("closing");
    setExitProgress(0);

    const start = performance.now();

    const tick = (now: number) => {
      const raw = Math.min(1, (now - start) / CASE_STUDIES_EXIT_DURATION);
      const eased = raw * raw * (3 - 2 * raw);
      setExitProgress(eased);

      if (raw < 1) {
        exitFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      exitFrameRef.current = null;
      setSelectedCaseStudyId("case-studies");
      setDrawerItemId("case-studies");
      setDrawerPhase("open");
      setIsExitingCaseStudies(false);
      setExitProgress(0);
      onBack();
    };

    exitFrameRef.current = requestAnimationFrame(tick);
  };

  const entryInProgress =
    state === "atlas-landing" &&
    entryPhase !== "idle" &&
    entryPhase !== "settled";

  const reducedEntryInProgress =
    prefersReducedMotion &&
    state === "atlas-landing" &&
    entryPhase === "acknowledge" &&
    reducedEntryProgress > 0;

  const reducedExitInProgress =
    prefersReducedMotion &&
    isExitingCaseStudies &&
    reducedExitProgress > 0;

  const entryProgress = (() => {
    switch (entryPhase) {
      case "acknowledge":
        return 0.16;
      case "pulling":
        return 0.66;
      case "resolving":
        return 0.94;
      case "settled":
        return 1;
      default:
        return 0;
    }
  })();

  const resolvingOverview =
    state === "atlas-landing" && entryPhase === "resolving";

  useEffect(() => {
    if (!resolvingOverview) {
      setResolveT(0);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 320;

    const tick = (now: number) => {
      const raw = Math.min(1, (now - start) / duration);
      const eased = raw * raw * (3 - 2 * raw);
      setResolveT(eased);
      if (raw < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [resolvingOverview]);

  const landingStartX = CS_FOCUS["atlas-landing"].x;
  const landingStartY = CS_FOCUS["atlas-landing"].y;
  const animatedCsX = reducedEntryInProgress
    ? lerp(landingStartX, landingStartX + 8, reducedEntryProgress)
    : landingStartX + (195 - landingStartX) * entryProgress;
  const pullTargetY = 250;
  const baseAnimatedCsY = reducedEntryInProgress
    ? lerp(landingStartY, landingStartY + 8, reducedEntryProgress)
    : landingStartY + (pullTargetY - landingStartY) * entryProgress;
  const animatedCsY =
    entryPhase === "resolving"
      ? lerp(baseAnimatedCsY, OVERVIEW_CORE.y, resolveT)
      : baseAnimatedCsY;
  const animatedCsOrbitR = reducedEntryInProgress
    ? 36
    : 36 + (72 - 36) * entryProgress;

  const selectedSystemScale = reducedEntryInProgress
    ? 1
    : entryPhase === "acknowledge"
      ? 1.035
      : entryPhase === "pulling"
      ? 1.12
      : entryPhase === "resolving"
      ? lerp(1.18, 1, resolveT)
      : 1;

  const travelingSystemOpacity =
    resolvingOverview ? lerp(1, 0.12, resolveT) : 1;
  const overviewResolveOpacity =
    resolvingOverview ? lerp(0.06, 1, resolveT) : 0;
  const overviewResolveScale =
    resolvingOverview ? lerp(0.94, 1, resolveT) : 0.92;

  const overviewResolveTargets =
    CASE_STUDY_OVERVIEW_LAYOUT.map((layout) => ({
      x: layout.x - OVERVIEW_CORE.x,
      y: layout.y - OVERVIEW_CORE.y,
    }));

  const exitScale = reducedExitInProgress
    ? 1
    : lerp(1, CASE_STUDY_MINIATURE_SCALE, exitProgress);
  const exitTranslateX = reducedExitInProgress
    ? lerp(0, -8, reducedExitProgress)
    : lerp(0, landingStartX - OVERVIEW_CORE.x, exitProgress);
  const exitTranslateY = reducedExitInProgress
    ? lerp(0, -6, reducedExitProgress)
    : lerp(0, landingStartY - OVERVIEW_CORE.y, exitProgress);

  const exitBackgroundT = reducedExitInProgress
    ? reducedExitProgress
    : Math.max(0, Math.min(1, (exitProgress - 0.42) / 0.58));
  const exitChromeT = reducedExitInProgress
    ? reducedExitProgress
    : Math.max(0, Math.min(1, (exitProgress - 0.62) / 0.38));

  const returnDrawerVisible =
    !isReturningFromReading || focusedReturnProgress >= 0.58;
  const returnChromeVisible =
    !isReturningFromReading || focusedReturnProgress >= 0.72;

  const contextRecede = (() => {
    switch (entryPhase) {
      case "acknowledge":
        return { opacity: 0.52, scale: 0.992, blur: 0 };
      case "pulling":
        return { opacity: 0.015, scale: 0.978, blur: 0 };
      case "resolving":
        return { opacity: 0, scale: 0.965, blur: 0 };
      default:
        return { opacity: 1, scale: 1, blur: 0 };
    }
  })();

  const nexusRecede = (() => {
    switch (entryPhase) {
      case "acknowledge":
        return { opacity: 0.56, scale: 0.996 };
      case "pulling":
        return { opacity: 0.01, scale: 0.984 };
      case "resolving":
        return { opacity: 0, scale: 0.972 };
      default:
        return { opacity: 1, scale: 1 };
    }
  })();

  const orbitRecedeOpacity = (() => {
    switch (entryPhase) {
      case "acknowledge":
        return 0.07;
      case "pulling":
      case "resolving":
        return 0;
      default:
        return null;
    }
  })();

  return {
    selectedCaseStudyId,
    drawerPhase,
    entryPhase,
    overviewChromeVisible,
    overviewLabelsVisible,
    selectionPulseId,
    exitProgress,
    isExitingCaseStudies,
    prefersReducedMotion,
    reducedEntryProgress,
    reducedExitProgress,
    focusedEntryProjectId,
    focusedEntryProgress,
    isReturningFromReading,
    focusedReturnProgress,
    resolveT,
    drawerItem,

    enterCaseStudies,
    selectCaseStudyOverviewItem,
    enterFocusedReading,
    exitCaseStudiesToAtlas,

    entryInProgress,
    reducedEntryInProgress,
    reducedExitInProgress,
    entryProgress,
    resolvingOverview,
    animatedCsX,
    animatedCsY,
    animatedCsOrbitR,
    selectedSystemScale,
    travelingSystemOpacity,
    overviewResolveOpacity,
    overviewResolveScale,
    overviewResolveTargets,
    exitScale,
    exitTranslateX,
    exitTranslateY,
    exitBackgroundT,
    exitChromeT,
    returnDrawerVisible,
    returnChromeVisible,
    contextRecede,
    nexusRecede,
    orbitRecedeOpacity,
  };
}
