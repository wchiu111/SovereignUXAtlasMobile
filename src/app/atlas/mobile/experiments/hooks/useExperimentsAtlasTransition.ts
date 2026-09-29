import { useEffect, useRef, useState } from "react";

import { EX_POS, ORBIT_R } from "../../components/mobileShared";
import { lerp } from "../../case-studies/caseStudyGeometry";
import {
  EXPERIMENTS_ATLAS_LANDING_OFFSET_Y,
  EXPERIMENTS_OVERVIEW_TARGETS,
  EXPERIMENTS_PARENT_CORE,
  EXPERIMENTS_TOPOLOGY_RADIUS,
} from "../config/experimentsTopology";
import {
  EXPERIMENTS_ATLAS_ACKNOWLEDGE_DELAY,
  EXPERIMENTS_ATLAS_ENTRY_DURATION,
  EXPERIMENTS_ATLAS_EXIT_DURATION,
  EXPERIMENTS_ATLAS_REDUCED_DURATION,
  EXPERIMENTS_ATLAS_RESOLVE_DURATION,
  EXPERIMENTS_ATLAS_RESOLVE_START,
} from "../config/experimentsMotion";
import {
  ATLAS_SYSTEM_CONTEXT_RECEDE,
  ATLAS_SYSTEM_ENTRY_PROGRESS,
  ATLAS_SYSTEM_NEXUS_RECEDE,
  atlasSystemExitBackgroundProgress,
  atlasSystemExitChromeProgress,
  atlasSystemOrbitRecedeOpacity,
  atlasSystemSmoothProgress,
} from "../../overview/atlasSystemTransitionMotion";

export type ExperimentAtlasEntryPhase =
  | "idle"
  | "acknowledge"
  | "pulling"
  | "resolving"
  | "settled";

interface UseExperimentsAtlasTransitionArgs {
  returningToAtlas: boolean;
  onEnterComplete: () => void;
  onReturnComplete?: () => void;
}

export default function useExperimentsAtlasTransition({
  returningToAtlas,
  onEnterComplete,
  onReturnComplete,
}: UseExperimentsAtlasTransitionArgs) {
  const [entryPhase, setEntryPhase] =
    useState<ExperimentAtlasEntryPhase>("idle");
  const [resolveT, setResolveT] = useState(0);
  const [exitProgress, setExitProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(false);
  const [reducedEntryProgress, setReducedEntryProgress] = useState(0);
  const [reducedExitProgress, setReducedExitProgress] = useState(0);

  const entryTimersRef = useRef<number[]>([]);
  const resolveFrameRef = useRef<number | null>(null);
  const exitFrameRef = useRef<number | null>(null);
  const reducedEntryFrameRef = useRef<number | null>(null);
  const reducedExitFrameRef = useRef<number | null>(null);

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

      if (resolveFrameRef.current !== null) {
        cancelAnimationFrame(resolveFrameRef.current);
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
    };
  }, []);

  const entryInProgress =
    entryPhase !== "idle" && entryPhase !== "settled";

  const reducedEntryInProgress =
    prefersReducedMotion &&
    entryPhase === "acknowledge" &&
    reducedEntryProgress > 0;

  const reducedExitInProgress =
    prefersReducedMotion &&
    returningToAtlas &&
    reducedExitProgress > 0;

  const enterExperiments = () => {
    if (entryInProgress || returningToAtlas) return;

    entryTimersRef.current.forEach(window.clearTimeout);
    entryTimersRef.current = [];

    if (prefersReducedMotion) {
      setEntryPhase("acknowledge");
      setReducedEntryProgress(0);
      const start = performance.now();

      const tickReducedEntry = (now: number) => {
        const raw = Math.min(
          1,
          (now - start) / EXPERIMENTS_ATLAS_REDUCED_DURATION,
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
        onEnterComplete();
      };

      reducedEntryFrameRef.current =
        requestAnimationFrame(tickReducedEntry);
      return;
    }

    setEntryPhase("acknowledge");

    entryTimersRef.current.push(
      window.setTimeout(
        () => setEntryPhase("pulling"),
        EXPERIMENTS_ATLAS_ACKNOWLEDGE_DELAY,
      ),
      window.setTimeout(
        () => setEntryPhase("resolving"),
        EXPERIMENTS_ATLAS_RESOLVE_START,
      ),
      window.setTimeout(() => {
        setEntryPhase("settled");
        onEnterComplete();
      }, EXPERIMENTS_ATLAS_ENTRY_DURATION),
    );
  };

  const resolvingOverview = entryPhase === "resolving";

  useEffect(() => {
    if (!resolvingOverview) {
      setResolveT(0);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const raw = Math.min(
        1,
        (now - start) / EXPERIMENTS_ATLAS_RESOLVE_DURATION,
      );
      setResolveT(atlasSystemSmoothProgress(raw));

      if (raw < 1) {
        resolveFrameRef.current = requestAnimationFrame(tick);
      } else {
        resolveFrameRef.current = null;
      }
    };

    resolveFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (resolveFrameRef.current !== null) {
        cancelAnimationFrame(resolveFrameRef.current);
        resolveFrameRef.current = null;
      }
    };
  }, [resolvingOverview]);

  useEffect(() => {
    if (!returningToAtlas) {
      setExitProgress(0);
      setReducedExitProgress(0);
      return;
    }

    if (prefersReducedMotion) {
      setReducedExitProgress(0);
      const start = performance.now();

      const tickReducedExit = (now: number) => {
        const raw = Math.min(
          1,
          (now - start) / EXPERIMENTS_ATLAS_REDUCED_DURATION,
        );
        setReducedExitProgress(raw);

        if (raw < 1) {
          reducedExitFrameRef.current =
            requestAnimationFrame(tickReducedExit);
          return;
        }

        reducedExitFrameRef.current = null;
        setReducedExitProgress(0);
        onReturnComplete?.();
      };

      reducedExitFrameRef.current =
        requestAnimationFrame(tickReducedExit);

      return () => {
        if (reducedExitFrameRef.current !== null) {
          cancelAnimationFrame(reducedExitFrameRef.current);
          reducedExitFrameRef.current = null;
        }
      };
    }

    setExitProgress(0);
    const start = performance.now();

    const tickExit = (now: number) => {
      const raw = Math.min(
        1,
        (now - start) / EXPERIMENTS_ATLAS_EXIT_DURATION,
      );
      setExitProgress(atlasSystemSmoothProgress(raw));

      if (raw < 1) {
        exitFrameRef.current = requestAnimationFrame(tickExit);
        return;
      }

      exitFrameRef.current = null;
      setExitProgress(1);
      onReturnComplete?.();
    };

    exitFrameRef.current = requestAnimationFrame(tickExit);

    return () => {
      if (exitFrameRef.current !== null) {
        cancelAnimationFrame(exitFrameRef.current);
        exitFrameRef.current = null;
      }
    };
  }, [
    returningToAtlas,
    prefersReducedMotion,
    onReturnComplete,
  ]);

  const entryProgress = ATLAS_SYSTEM_ENTRY_PROGRESS[entryPhase];

  const landingStartX = EX_POS.x;
  const landingStartY =
    EX_POS.y + EXPERIMENTS_ATLAS_LANDING_OFFSET_Y;

  const animatedExperimentX = reducedEntryInProgress
    ? lerp(landingStartX, landingStartX - 8, reducedEntryProgress)
    : lerp(
        landingStartX,
        EXPERIMENTS_PARENT_CORE.x,
        entryProgress,
      );

  // Match the shared Atlas grammar: pull 15px past the final center,
  // then settle into the authored Experiments parent position.
  const pullTargetY = EXPERIMENTS_PARENT_CORE.y - 15;

  const baseAnimatedExperimentY = reducedEntryInProgress
    ? lerp(landingStartY, landingStartY + 8, reducedEntryProgress)
    : lerp(landingStartY, pullTargetY, entryProgress);

  const animatedExperimentY =
    entryPhase === "resolving"
      ? lerp(
          baseAnimatedExperimentY,
          EXPERIMENTS_PARENT_CORE.y,
          resolveT,
        )
      : baseAnimatedExperimentY;

  const animatedExperimentOrbitR = reducedEntryInProgress
    ? ORBIT_R
    : lerp(ORBIT_R, 72, entryProgress);

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

  const miniatureScale =
    ORBIT_R / EXPERIMENTS_TOPOLOGY_RADIUS;

  const exitScale = reducedExitInProgress
    ? 1
    : lerp(1, miniatureScale, exitProgress);

  const exitTranslateX = reducedExitInProgress
    ? lerp(0, 8, reducedExitProgress)
    : lerp(
        0,
        landingStartX - EXPERIMENTS_PARENT_CORE.x,
        exitProgress,
      );

  const exitTranslateY = reducedExitInProgress
    ? lerp(0, -6, reducedExitProgress)
    : lerp(
        0,
        landingStartY - EXPERIMENTS_PARENT_CORE.y,
        exitProgress,
      );

  const exitBackgroundT = reducedExitInProgress
    ? reducedExitProgress
    : atlasSystemExitBackgroundProgress(exitProgress);

  const exitChromeT = reducedExitInProgress
    ? reducedExitProgress
    : atlasSystemExitChromeProgress(exitProgress);

  const contextRecede =
    ATLAS_SYSTEM_CONTEXT_RECEDE[entryPhase];

  const nexusRecede =
    ATLAS_SYSTEM_NEXUS_RECEDE[entryPhase];

  const orbitRecedeOpacity =
    atlasSystemOrbitRecedeOpacity(entryPhase);

  return {
    entryPhase,
    resolveT,
    exitProgress,
    prefersReducedMotion,
    reducedEntryProgress,
    reducedExitProgress,

    enterExperiments,

    entryInProgress,
    reducedEntryInProgress,
    reducedExitInProgress,
    entryProgress,
    resolvingOverview,

    landingStartX,
    landingStartY,
    animatedExperimentX,
    animatedExperimentY,
    animatedExperimentOrbitR,
    selectedSystemScale,
    travelingSystemOpacity,
    overviewResolveOpacity,
    overviewResolveScale,
    overviewResolveTargets: EXPERIMENTS_OVERVIEW_TARGETS,

    exitScale,
    exitTranslateX,
    exitTranslateY,
    exitBackgroundT,
    exitChromeT,

    contextRecede,
    nexusRecede,
    orbitRecedeOpacity,
  };
}
