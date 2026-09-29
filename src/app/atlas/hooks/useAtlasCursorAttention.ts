import { useEffect, type RefObject } from "react";
import { CURSOR_ATTENTION } from "../constellation/visualTokens";

const LABEL_SELECTOR = "[data-atlas-attention-label]";

interface UseAtlasCursorAttentionOptions {
  rootRef: RefObject<SVGSVGElement | null>;
  enabled: boolean;
}

interface LabelSnapshot {
  element: SVGTextElement;
  centerX: number;
  centerY: number;
  relationId: string;
  tier: "system" | "planet" | "satellite";
}

function gaussianFalloff(distance: number) {
  return Math.exp(
    -(distance * distance) /
      (2 * CURSOR_ATTENTION.sigma * CURSOR_ATTENTION.sigma),
  );
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function resetLabel(element: SVGTextElement) {
  element.style.opacity = "";
  element.style.filter = "";
  element.style.transform = "";
  element.style.transformBox = "";
  element.style.transformOrigin = "";
}

function tierRestingOpacity(
  tier: LabelSnapshot["tier"],
) {
  if (tier === "system") return 0.38;
  if (tier === "planet") return 0.16;
  return CURSOR_ATTENTION.restingOpacity;
}

function tierProximityCeiling(
  tier: LabelSnapshot["tier"],
) {
  if (tier === "system") return 0.82;
  if (tier === "planet") return 0.72;
  return 0.52;
}

export default function useAtlasCursorAttention({
  rootRef,
  enabled,
}: UseAtlasCursorAttentionOptions) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return;

    const pointer = {
      x: 0,
      y: 0,
      inside: false,
      dirty: true,
    };

    let frameId = 0;
    let snapshots: LabelSnapshot[] = [];

    const collectLabels = () => {
      snapshots = Array.from(
        root.querySelectorAll<SVGTextElement>(LABEL_SELECTOR),
      ).map(element => {
        const rect = element.getBoundingClientRect();
        const rawTier = element.dataset.atlasTier;

        const tier: LabelSnapshot["tier"] =
          rawTier === "system" || rawTier === "satellite"
            ? rawTier
            : "planet";

        return {
          element,
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2,
          relationId: element.dataset.atlasRelation ?? "",
          tier,
        };
      });
    };

    const render = () => {
      frameId = window.requestAnimationFrame(render);

      if (!pointer.dirty) return;
      pointer.dirty = false;

      collectLabels();

      if (!pointer.inside) {
        snapshots.forEach(({ element }) => resetLabel(element));
        return;
      }

      const hoveredRelationIds = new Set(
        snapshots
          .filter(({ element }) => element.matches(":hover"))
          .map(({ relationId }) => relationId)
          .filter(Boolean),
      );

      snapshots.forEach(
        ({ element, centerX, centerY, relationId, tier }) => {
          const dx = pointer.x - centerX;
          const dy = pointer.y - centerY;
          const distance = Math.hypot(dx, dy);
          const proximity = clamp01(gaussianFalloff(distance));
          const insideField =
            distance <= CURSOR_ATTENTION.maxPointerDistance;
          const hovered = element.matches(":hover");
          const related =
            !hovered &&
            relationId.length > 0 &&
            hoveredRelationIds.has(relationId);

          const restingOpacity = tierRestingOpacity(tier);
          const ceiling = tierProximityCeiling(tier);

          let opacity = insideField
            ? restingOpacity + proximity * (ceiling - restingOpacity)
            : restingOpacity;

          if (related) {
            opacity = Math.max(
              opacity,
              tier === "system"
                ? 0.62
                : CURSOR_ATTENTION.relatedOpacity,
            );
          }

          if (hovered) opacity = 1;

          const safeDistance = Math.max(distance, 1);
          const liftStrength = hovered
            ? 1
            : insideField
              ? proximity
              : 0;

          const liftX =
            (dx / safeDistance) *
            CURSOR_ATTENTION.maxLift *
            liftStrength;

          const liftY =
            (dy / safeDistance) *
            CURSOR_ATTENTION.maxLift *
            liftStrength;

          const scale = hovered
            ? CURSOR_ATTENTION.maxScale
            : 0.98 + proximity * 0.035;

          const blur =
            tier === "system"
              ? 0
              : hovered
                ? 0
                : Math.max(0, 0.34 - proximity * 0.46);

          const glow = hovered
            ? "drop-shadow(0 0 4px currentColor)"
            : related
              ? "drop-shadow(0 0 1.5px currentColor)"
              : "none";

          element.style.opacity = opacity.toFixed(3);
          element.style.filter =
            blur > 0.01
              ? `blur(${blur.toFixed(2)}px) ${glow}`
              : glow;
          element.style.transformBox = "fill-box";
          element.style.transformOrigin = "center";
          element.style.transform =
            `translate(${liftX.toFixed(2)}px, ${liftY.toFixed(2)}px) scale(${scale.toFixed(3)})`;
        },
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.inside = true;
      pointer.dirty = true;
    };

    const handlePointerLeave = () => {
      pointer.inside = false;
      pointer.dirty = true;
    };

    const handleLayoutChange = () => {
      pointer.dirty = true;
    };

    root.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    root.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleLayoutChange);
    window.addEventListener("scroll", handleLayoutChange, {
      passive: true,
    });

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleLayoutChange);
      window.removeEventListener("scroll", handleLayoutChange);
      snapshots.forEach(({ element }) => resetLabel(element));
    };
  }, [enabled, rootRef]);
}
