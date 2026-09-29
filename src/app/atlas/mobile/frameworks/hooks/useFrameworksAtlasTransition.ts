import { useEffect, useRef, useState } from "react";

import { FW_POS, ORBIT_R } from "../../components/mobileShared";
import { lerp } from "../../case-studies/caseStudyGeometry";
import { FRAMEWORK_PARENT_CORE } from "../frameworkGeometry";
import {
  FRAMEWORK_OVERVIEW_TARGETS,
  FRAMEWORK_TOPOLOGY_RADIUS,
} from "../frameworkTopology";
import {
  FRAMEWORK_ATLAS_ACKNOWLEDGE_DELAY,
  FRAMEWORK_ATLAS_ENTRY_DURATION,
  FRAMEWORK_ATLAS_EXIT_DURATION,
  FRAMEWORK_ATLAS_REDUCED_DURATION,
  FRAMEWORK_ATLAS_RESOLVE_DURATION,
  FRAMEWORK_ATLAS_RESOLVE_START,
} from "../frameworkMotion";
import {
  ATLAS_SYSTEM_CONTEXT_RECEDE,
  ATLAS_SYSTEM_ENTRY_PROGRESS,
  ATLAS_SYSTEM_NEXUS_RECEDE,
  atlasSystemExitBackgroundProgress,
  atlasSystemExitChromeProgress,
  atlasSystemOrbitRecedeOpacity,
  atlasSystemSmoothProgress,
} from "../../overview/atlasSystemTransitionMotion";

export type FrameworkAtlasEntryPhase =
  | "idle"
  | "acknowledge"
  | "pulling"
  | "resolving"
  | "settled";

interface UseFrameworksAtlasTransitionArgs {
  returningToAtlas: boolean;
  onEnterComplete: () => void;
  onReturnComplete?: () => void;
}

export default function useFrameworksAtlasTransition({
  returningToAtlas,
  onEnterComplete,
  onReturnComplete,
}: UseFrameworksAtlasTransitionArgs) {
  const [entryPhase, setEntryPhase] =
    useState<FrameworkAtlasEntryPhase>("idle");
  const [resolveT, setResolveT] = useState(0);
  const [exitProgress, setExitProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
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

  const enterFrameworks = () => {
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
          (now - start) / FRAMEWORK_ATLAS_REDUCED_DURATION,
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
        FRAMEWORK_ATLAS_ACKNOWLEDGE_DELAY,
      ),
      window.setTimeout(
        () => setEntryPhase("resolving"),
        FRAMEWORK_ATLAS_RESOLVE_START,
      ),
      window.setTimeout(() => {
        setEntryPhase("settled");
        onEnterComplete();
      }, FRAMEWORK_ATLAS_ENTRY_DURATION),
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
        (now - start) / FRAMEWORK_ATLAS_RESOLVE_DURATION,
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
          (now - start) / FRAMEWORK_ATLAS_REDUCED_DURATION,
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
        (now - start) / FRAMEWORK_ATLAS_EXIT_DURATION,
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

  const entryProgress =
    ATLAS_SYSTEM_ENTRY_PROGRESS[entryPhase];

  const landingStartX = FW_POS.x;
  const landingStartY = FW_POS.y;

  const animatedFrameworkX = reducedEntryInProgress
    ? lerp(landingStartX, landingStartX + 8, reducedEntryProgress)
    : lerp(landingStartX, FRAMEWORK_PARENT_CORE.x, entryProgress);

  // Case Studies pulls slightly beyond its final center before resolving.
  // Preserve that same 15px overshoot for Frameworks.
  const pullTargetY = FRAMEWORK_PARENT_CORE.y - 15;

  const baseAnimatedFrameworkY = reducedEntryInProgress
    ? lerp(landingStartY, landingStartY + 8, reducedEntryProgress)
    : lerp(landingStartY, pullTargetY, entryProgress);

  const animatedFrameworkY =
    entryPhase === "resolving"
      ? lerp(
          baseAnimatedFrameworkY,
          FRAMEWORK_PARENT_CORE.y,
          resolveT,
        )
      : baseAnimatedFrameworkY;

  const animatedFrameworkOrbitR = reducedEntryInProgress
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
    ORBIT_R / FRAMEWORK_TOPOLOGY_RADIUS;

  const exitScale = reducedExitInProgress
    ? 1
    : lerp(1, miniatureScale, exitProgress);

  const exitTranslateX = reducedExitInProgress
    ? lerp(0, -8, reducedExitProgress)
    : lerp(
        0,
        FW_POS.x - FRAMEWORK_PARENT_CORE.x,
        exitProgress,
      );

  const exitTranslateY = reducedExitInProgress
    ? lerp(0, -6, reducedExitProgress)
    : lerp(
        0,
        FW_POS.y - FRAMEWORK_PARENT_CORE.y,
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

    enterFrameworks,

    entryInProgress,
    reducedEntryInProgress,
    reducedExitInProgress,
    entryProgress,
    resolvingOverview,

    animatedFrameworkX,
    animatedFrameworkY,
    animatedFrameworkOrbitR,
    selectedSystemScale,
    travelingSystemOpacity,
    overviewResolveOpacity,
    overviewResolveScale,
    overviewResolveTargets: FRAMEWORK_OVERVIEW_TARGETS,

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
