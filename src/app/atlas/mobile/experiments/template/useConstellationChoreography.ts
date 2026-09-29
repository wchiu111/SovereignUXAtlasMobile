import { useEffect, useRef, useState } from "react";

import type { ConstellationMotionConfig } from "./constellationTypes";

export default function useConstellationChoreography<
  TParentId extends string,
  TItemId extends string,
>({
  parentId,
  motion,
  returnItemId = null,
  onCommit,
  onReturnComplete,
}: {
  parentId: TParentId;
  motion: ConstellationMotionConfig;
  returnItemId?: TItemId | null;
  onCommit: (id: TItemId) => void;
  onReturnComplete?: () => void;
}) {
  type OverviewId = TParentId | TItemId;

  const [selectedId, setSelectedId] = useState<OverviewId>(
    returnItemId ?? parentId,
  );
  const [drawerItemId, setDrawerItemId] = useState<OverviewId>(
    returnItemId ?? parentId,
  );
  const [drawerPhase, setDrawerPhase] = useState<
    "open" | "closing" | "opening"
  >("open");
  const [selectionPulseId, setSelectionPulseId] =
    useState<OverviewId | null>(null);
  const [labelsVisible, setLabelsVisible] = useState(false);
  const [chromeVisible, setChromeVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const [focusedEntryItemId, setFocusedEntryItemId] =
    useState<TItemId | null>(null);
  const [focusedEntryProgress, setFocusedEntryProgress] = useState(0);
  const [isReturningFromReading, setIsReturningFromReading] =
    useState(false);
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
    if (returnItemId) return;

    revealTimersRef.current.forEach(window.clearTimeout);
    revealTimersRef.current = [];

    setLabelsVisible(false);
    setChromeVisible(false);
    setDrawerVisible(false);

    const labelDelay = prefersReducedMotion
      ? 0
      : motion.labelRevealDelayMs;
    const chromeDelay = prefersReducedMotion
      ? 0
      : motion.chromeRevealDelayMs;

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
  }, [
    motion.chromeRevealDelayMs,
    motion.labelRevealDelayMs,
    prefersReducedMotion,
    returnItemId,
  ]);

  useEffect(() => {
    if (!returnItemId) return;

    drawerTimersRef.current.forEach(window.clearTimeout);
    revealTimersRef.current.forEach(window.clearTimeout);
    drawerTimersRef.current = [];
    revealTimersRef.current = [];

    setSelectedId(returnItemId);
    setDrawerItemId(returnItemId);
    setDrawerPhase("open");
    setSelectionPulseId(null);
    setLabelsVisible(false);
    setChromeVisible(false);
    setDrawerVisible(false);
    setFocusedEntryItemId(null);
    setFocusedEntryProgress(0);
    setIsReturningFromReading(true);
    setFocusedReturnProgress(0);

    const duration = prefersReducedMotion
      ? motion.returnReducedMs
      : motion.returnMs;
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
        focusedReturnFrameRef.current =
          requestAnimationFrame(tickReturn);
        return;
      }

      focusedReturnFrameRef.current = null;
      setFocusedReturnProgress(1);
      setLabelsVisible(true);
      setDrawerVisible(true);
      setChromeVisible(true);
      setIsReturningFromReading(false);
      onReturnComplete?.();
    };

    focusedReturnFrameRef.current =
      requestAnimationFrame(tickReturn);

    return () => {
      if (focusedReturnFrameRef.current !== null) {
        cancelAnimationFrame(focusedReturnFrameRef.current);
        focusedReturnFrameRef.current = null;
      }
    };
  }, [
    motion.returnMs,
    motion.returnReducedMs,
    onReturnComplete,
    prefersReducedMotion,
    returnItemId,
  ]);

  const clearSelectionPulse = () => {
    if (pulseTimerRef.current !== null) {
      window.clearTimeout(pulseTimerRef.current);
      pulseTimerRef.current = null;
    }
    setSelectionPulseId(null);
  };

  const enterFocusedReading = (itemId: TItemId) => {
    if (
      focusedEntryItemId ||
      isReturningFromReading ||
      drawerPhase === "closing"
    ) {
      return;
    }

    clearSelectionPulse();
    drawerTimersRef.current.forEach(window.clearTimeout);
    drawerTimersRef.current = [];

    setSelectedId(itemId);
    setDrawerItemId(itemId);
    setFocusedEntryItemId(itemId);
    setFocusedEntryProgress(0);
    setChromeVisible(false);
    setDrawerPhase("closing");

    const duration = prefersReducedMotion
      ? motion.readingReducedHandoffMs
      : motion.readingHandoffMs;
    const start = performance.now();

    const tickEntry = (now: number) => {
      const raw = Math.min(1, (now - start) / duration);
      const eased = prefersReducedMotion
        ? raw
        : raw * raw * (3 - 2 * raw);

      setFocusedEntryProgress(eased);

      if (raw < 1) {
        focusedEntryFrameRef.current =
          requestAnimationFrame(tickEntry);
        return;
      }

      focusedEntryFrameRef.current = null;
      setFocusedEntryProgress(1);
      onCommit(itemId);
    };

    focusedEntryFrameRef.current =
      requestAnimationFrame(tickEntry);
  };

  const selectOverviewItem = (id: OverviewId) => {
    if (
      drawerPhase === "closing" ||
      focusedEntryItemId ||
      isReturningFromReading
    ) {
      return;
    }

    if (id === selectedId) {
      if (id !== parentId) enterFocusedReading(id as TItemId);
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
      }, motion.selectionPulseMs);
    }

    setSelectedId(id);
    setDrawerPhase("closing");

    const closeDuration = prefersReducedMotion
      ? motion.drawerReducedMs
      : motion.drawerCloseMs;

    drawerTimersRef.current.push(
      window.setTimeout(() => {
        setDrawerItemId(id);
        setDrawerPhase("opening");

        const openDuration = prefersReducedMotion
          ? motion.drawerReducedMs
          : motion.drawerOpenMs;

        drawerTimersRef.current.push(
          window.setTimeout(
            () => setDrawerPhase("open"),
            openDuration,
          ),
        );
      }, closeDuration),
    );
  };

  const ambientPaused =
    drawerPhase !== "open" ||
    selectionPulseId !== null ||
    focusedEntryItemId !== null ||
    isReturningFromReading;

  return {
    selectedId,
    drawerItemId,
    drawerPhase,
    selectionPulseId,
    labelsVisible,
    chromeVisible,
    drawerVisible,
    prefersReducedMotion,
    ambientPaused,
    focusedEntryItemId,
    focusedEntryProgress,
    isReturningFromReading,
    focusedReturnProgress,
    selectOverviewItem,
    enterFocusedReading,
  };
}
