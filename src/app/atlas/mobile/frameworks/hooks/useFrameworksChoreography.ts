import { useEffect, useMemo, useRef, useState } from "react";

import { FRAMEWORK_FOCUS_ITEMS } from "../frameworkOverviewData";
import type { FrameworkOverviewId } from "../frameworkGeometry";
import type { MobileFrameworkId } from "../mobileFrameworkTypes";
import {
  FRAMEWORK_CHROME_REVEAL_DELAY,
  FRAMEWORK_DRAWER_CLOSE_DURATION,
  FRAMEWORK_DRAWER_OPEN_DURATION,
  FRAMEWORK_LABEL_REVEAL_DELAY,
  FRAMEWORK_READING_HANDOFF_DURATION,
  FRAMEWORK_READING_REDUCED_HANDOFF_DURATION,
  FRAMEWORK_REDUCED_MOTION_DRAWER_DURATION,
  FRAMEWORK_RETURN_DURATION,
  FRAMEWORK_RETURN_REDUCED_DURATION,
  FRAMEWORK_SELECTION_PULSE_DURATION,
} from "../frameworkMotion";

export type FrameworkDrawerPhase = "open" | "closing" | "opening";

type FrameworkOverviewState =
  | "frameworks-focus"
  | "framework-reading"
  | "framework-evidence";

interface UseFrameworksChoreographyArgs {
  state: FrameworkOverviewState;
  activeFrameworkId: MobileFrameworkId;
  overviewSelectionId: FrameworkOverviewId;
  returnFrameworkId?: MobileFrameworkId | null;
  onReturnFrameworkComplete?: () => void;
  onSelectFramework: (id: MobileFrameworkId) => void;
  onSelectParent: () => void;
  onExplore: () => void;
}

export default function useFrameworksChoreography({
  state,
  activeFrameworkId,
  overviewSelectionId,
  returnFrameworkId = null,
  onReturnFrameworkComplete,
  onSelectFramework,
  onSelectParent,
  onExplore,
}: UseFrameworksChoreographyArgs) {
  const overviewActive = state === "frameworks-focus";

  const initialOverviewId: FrameworkOverviewId =
    returnFrameworkId ?? overviewSelectionId;

  const [drawerItemId, setDrawerItemId] =
    useState<FrameworkOverviewId>(initialOverviewId);
  const [drawerPhase, setDrawerPhase] =
    useState<FrameworkDrawerPhase>("open");
  const [selectionPulseId, setSelectionPulseId] =
    useState<FrameworkOverviewId | null>(null);
  const [labelsVisible, setLabelsVisible] = useState(false);
  const [chromeVisible, setChromeVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const [focusedEntryFrameworkId, setFocusedEntryFrameworkId] =
    useState<MobileFrameworkId | null>(null);
  const [focusedEntryProgress, setFocusedEntryProgress] = useState(0);
  const [isReturningFromReading, setIsReturningFromReading] = useState(false);
  const [focusedReturnProgress, setFocusedReturnProgress] = useState(0);

  const drawerTimersRef = useRef<number[]>([]);
  const revealTimersRef = useRef<number[]>([]);
  const pulseTimerRef = useRef<number | null>(null);
  const focusedEntryFrameRef = useRef<number | null>(null);
  const focusedReturnFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      drawerTimersRef.current.forEach(window.clearTimeout);
      revealTimersRef.current.forEach(window.clearTimeout);
      drawerTimersRef.current = [];
      revealTimersRef.current = [];

      if (pulseTimerRef.current !== null) {
        window.clearTimeout(pulseTimerRef.current);
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
    if (!overviewActive || returnFrameworkId) return;

    revealTimersRef.current.forEach(window.clearTimeout);
    revealTimersRef.current = [];

    setLabelsVisible(false);
    setChromeVisible(false);
    setDrawerVisible(false);

    const labelDelay = prefersReducedMotion ? 0 : FRAMEWORK_LABEL_REVEAL_DELAY;
    const chromeDelay = prefersReducedMotion ? 0 : FRAMEWORK_CHROME_REVEAL_DELAY;

    revealTimersRef.current.push(
      window.setTimeout(() => setLabelsVisible(true), labelDelay),
      window.setTimeout(() => {
        setChromeVisible(true);
        setDrawerVisible(true);
      }, chromeDelay),
    );

    return () => {
      revealTimersRef.current.forEach(window.clearTimeout);
      revealTimersRef.current = [];
    };
  }, [overviewActive, prefersReducedMotion, returnFrameworkId]);

  useEffect(() => {
    if (!overviewActive || !returnFrameworkId) return;

    drawerTimersRef.current.forEach(window.clearTimeout);
    revealTimersRef.current.forEach(window.clearTimeout);
    drawerTimersRef.current = [];
    revealTimersRef.current = [];

    setDrawerItemId(returnFrameworkId);
    setDrawerPhase("open");
    setSelectionPulseId(null);
    setLabelsVisible(false);
    setChromeVisible(false);
    setDrawerVisible(false);
    setFocusedEntryFrameworkId(null);
    setFocusedEntryProgress(0);
    setIsReturningFromReading(true);
    setFocusedReturnProgress(0);

    const duration = prefersReducedMotion
      ? FRAMEWORK_RETURN_REDUCED_DURATION
      : FRAMEWORK_RETURN_DURATION;
    const start = performance.now();

    const tickReturn = (now: number) => {
      const raw = Math.min(1, (now - start) / duration);
      const eased = prefersReducedMotion
        ? raw
        : raw * raw * (3 - 2 * raw);

      setFocusedReturnProgress(eased);

      if (raw >= 0.42) setLabelsVisible(true);
      if (raw >= 0.56) setDrawerVisible(true);
      if (raw >= 0.70) setChromeVisible(true);

      if (raw < 1) {
        focusedReturnFrameRef.current = requestAnimationFrame(tickReturn);
        return;
      }

      focusedReturnFrameRef.current = null;
      setFocusedReturnProgress(1);
      setLabelsVisible(true);
      setDrawerVisible(true);
      setChromeVisible(true);
      setIsReturningFromReading(false);
      onReturnFrameworkComplete?.();
    };

    focusedReturnFrameRef.current = requestAnimationFrame(tickReturn);

    return () => {
      if (focusedReturnFrameRef.current !== null) {
        cancelAnimationFrame(focusedReturnFrameRef.current);
        focusedReturnFrameRef.current = null;
      }
    };
  }, [
    overviewActive,
    returnFrameworkId,
    prefersReducedMotion,
    onReturnFrameworkComplete,
  ]);

  useEffect(() => {
    if (!overviewActive || returnFrameworkId || isReturningFromReading) return;

    const expected: FrameworkOverviewId = overviewSelectionId;

    if (drawerPhase === "open") setDrawerItemId(expected);
  }, [
    overviewActive,
    overviewSelectionId,
    drawerPhase,
    returnFrameworkId,
    isReturningFromReading,
  ]);

  const selectedId: FrameworkOverviewId = overviewSelectionId;

  const drawerItem = useMemo(() => {
    if (drawerItemId === "frameworks") return null;
    return (
      FRAMEWORK_FOCUS_ITEMS.find((item) => item.id === drawerItemId) ?? null
    );
  }, [drawerItemId]);

  const clearSelectionPulse = () => {
    if (pulseTimerRef.current !== null) {
      window.clearTimeout(pulseTimerRef.current);
      pulseTimerRef.current = null;
    }
    setSelectionPulseId(null);
  };

  const enterFocusedReading = (frameworkId: MobileFrameworkId) => {
    if (
      !overviewActive ||
      focusedEntryFrameworkId ||
      isReturningFromReading ||
      drawerPhase === "closing"
    ) {
      return;
    }

    clearSelectionPulse();
    drawerTimersRef.current.forEach(window.clearTimeout);
    drawerTimersRef.current = [];

    setFocusedEntryFrameworkId(frameworkId);
    setFocusedEntryProgress(0);
    setChromeVisible(false);
    setDrawerPhase("closing");

    const duration = prefersReducedMotion
      ? FRAMEWORK_READING_REDUCED_HANDOFF_DURATION
      : FRAMEWORK_READING_HANDOFF_DURATION;
    const start = performance.now();

    const tickEntry = (now: number) => {
      const raw = Math.min(1, (now - start) / duration);
      const eased = prefersReducedMotion
        ? raw
        : raw * raw * (3 - 2 * raw);

      setFocusedEntryProgress(eased);

      if (raw < 1) {
        focusedEntryFrameRef.current = requestAnimationFrame(tickEntry);
        return;
      }

      focusedEntryFrameRef.current = null;
      setFocusedEntryProgress(1);
      onExplore();
    };

    focusedEntryFrameRef.current = requestAnimationFrame(tickEntry);
  };

  const selectOverviewItem = (id: FrameworkOverviewId) => {
    if (
      !overviewActive ||
      drawerPhase === "closing" ||
      focusedEntryFrameworkId ||
      isReturningFromReading
    ) {
      return;
    }

    if (id === selectedId) {
      if (id !== "frameworks") enterFocusedReading(id);
      return;
    }

    clearSelectionPulse();
    drawerTimersRef.current.forEach(window.clearTimeout);
    drawerTimersRef.current = [];

    if (!prefersReducedMotion) {
      setSelectionPulseId(id);
      pulseTimerRef.current = window.setTimeout(() => {
        setSelectionPulseId(null);
        pulseTimerRef.current = null;
      }, FRAMEWORK_SELECTION_PULSE_DURATION);
    }

    setDrawerPhase("closing");

    if (id === "frameworks") onSelectParent();
    else onSelectFramework(id);

    const phaseDuration = prefersReducedMotion
      ? FRAMEWORK_REDUCED_MOTION_DRAWER_DURATION
      : FRAMEWORK_DRAWER_CLOSE_DURATION;

    drawerTimersRef.current.push(
      window.setTimeout(() => {
        setDrawerItemId(id);
        setDrawerPhase("opening");

        const openDuration = prefersReducedMotion
          ? FRAMEWORK_REDUCED_MOTION_DRAWER_DURATION
          : FRAMEWORK_DRAWER_OPEN_DURATION;

        drawerTimersRef.current.push(
          window.setTimeout(() => setDrawerPhase("open"), openDuration),
        );
      }, phaseDuration),
    );
  };

  const ambientPaused =
    drawerPhase !== "open" ||
    selectionPulseId !== null ||
    focusedEntryFrameworkId !== null ||
    isReturningFromReading;

  return {
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
  };
}
