import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import { resolveStellarColor } from "../../../atlas/constellation/stellarPalette";

import BehavioralDecisionDesignExperience from "../behavioral-decision-design/BehavioralDecisionDesignExperience";
import MultiUserCoSovereigntyExperience from "../multi-user-co-sovereignty/MultiUserCoSovereigntyExperience";
import ConstraintScopeDesignExperience from "../constraint-scope-design/ConstraintScopeDesignExperience";

interface ApplicationKitModuleRouterProps {
  moduleId: string | null;
  systemColor: string;
  onExit: () => void;
}

export const BEHAVIOR_AUTHORITY_MODULE_IDS = [
  "behavioral-decision-design",
  "multi-user-co-sovereignty",
  "constraint-scope-design",
] as const;

export default function ApplicationKitModuleRouter({
  moduleId,
  systemColor,
  onExit,
}: ApplicationKitModuleRouterProps) {
  useEffect(() => {
    if (!moduleId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      onExit();
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [moduleId, onExit]);

  if (typeof document === "undefined") return null;

  const relationalColor = resolveStellarColor("relational", systemColor);
  const strategyColor = resolveStellarColor("strategy", systemColor);

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        pointerEvents: moduleId ? "auto" : "none",
      }}
    >
      <AnimatePresence mode="wait">
        {moduleId === "behavioral-decision-design" && (
          <BehavioralDecisionDesignExperience
            key="behavioral-decision-design"
            systemColor={systemColor}
            onExit={onExit}
          />
        )}

        {moduleId === "multi-user-co-sovereignty" && (
          <MultiUserCoSovereigntyExperience
            key="multi-user-co-sovereignty"
            color={relationalColor}
            onExit={onExit}
          />
        )}

        {moduleId === "constraint-scope-design" && (
          <ConstraintScopeDesignExperience
            key="constraint-scope-design"
            color={strategyColor}
            onExit={onExit}
          />
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
