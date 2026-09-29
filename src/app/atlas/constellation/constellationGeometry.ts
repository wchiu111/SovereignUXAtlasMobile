import type { StarNode } from "../../types/atlas";
import { resolveStellarColor } from "./stellarPalette";

export interface ConstellationBounds {
  width: number;
  height: number;
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
}

export interface ResolvedLabelPosition {
  x: number;
  y: number;
  anchor: "start" | "middle" | "end";
}

export interface ResolvedConstellationNode {
  star: StarNode;
  x: number;
  y: number;
  angle: number;
  nodeColor: string;
  nodeScale: number;
  label: ResolvedLabelPosition;
}

interface ResolveConstellationOptions {
  stars: StarNode[];
  centerX: number;
  centerY: number;
  orbitRadius: number;
  domainColor: string;
  bounds: ConstellationBounds;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function resolveLabel(
  star: StarNode,
  x: number,
  y: number,
  angle: number,
  centerX: number,
  nodeScale: number,
  bounds: ConstellationBounds,
): ResolvedLabelPosition {
  const side = star.labelPosition?.side ?? "auto";
  const offset = star.labelPosition?.offset ?? 28 + nodeScale * 6;
  let dx = Math.cos(angle);
  let dy = Math.sin(angle);

  if (side === "top") [dx, dy] = [0, -1];
  if (side === "right") [dx, dy] = [1, 0];
  if (side === "bottom") [dx, dy] = [0, 1];
  if (side === "left") [dx, dy] = [-1, 0];

  let labelX = x + dx * offset;
  let labelY = y + dy * offset + (dy < -0.25 ? -6 : dy > 0.25 ? 8 : 4);
  let anchor: ResolvedLabelPosition["anchor"] =
    Math.abs(dx) > Math.abs(dy) * 1.1 ? (dx > 0 ? "start" : "end") : "middle";

  const minX = bounds.minX ?? 76;
  const maxX = bounds.maxX ?? bounds.width - 88;
  const minY = bounds.minY ?? 52;
  const maxY = bounds.maxY ?? bounds.height - 58;

  if (labelX <= minX) {
    labelX = minX;
    anchor = "start";
  } else if (labelX >= maxX) {
    labelX = maxX;
    anchor = "end";
  }

  labelY = clamp(labelY, minY, maxY);

  // An authored node can be clamped slightly off its original radial line.
  // Preserve an outward-facing fallback rather than pointing labels toward center.
  if (side === "auto" && Math.abs(dx) < 0.15) {
    anchor = "middle";
    labelX = clamp(labelX, minX, maxX);
  } else if (side === "auto" && labelX === centerX) {
    anchor = x >= centerX ? "start" : "end";
  }

  return { x: labelX, y: labelY, anchor };
}

export function resolveConstellationNodes({
  stars,
  centerX,
  centerY,
  orbitRadius,
  domainColor,
  bounds,
}: ResolveConstellationOptions): ResolvedConstellationNode[] {
  const nodeMinX = bounds.minX ?? 62;
  const nodeMaxX = bounds.maxX ?? bounds.width - 70;
  const nodeMinY = bounds.minY ?? 70;
  const nodeMaxY = bounds.maxY ?? bounds.height - 82;

  return stars.map((star, index) => {
    const fallbackAngle = (index / stars.length) * Math.PI * 2 - Math.PI / 2;
    const authored = typeof star.x === "number" && typeof star.y === "number";
    const proposedX = authored
      ? centerX + star.x! * orbitRadius
      : centerX + Math.cos(fallbackAngle) * orbitRadius;
    const proposedY = authored
      ? centerY + star.y! * orbitRadius
      : centerY + Math.sin(fallbackAngle) * orbitRadius;
    const x = clamp(proposedX, nodeMinX, nodeMaxX);
    const y = clamp(proposedY, nodeMinY, nodeMaxY);
    const angle = Math.atan2(y - centerY, x - centerX);
    const nodeScale = star.scale ?? 1;

    return {
      star,
      x,
      y,
      angle,
      nodeColor: resolveStellarColor(star.stellarType, domainColor),
      nodeScale,
      label: resolveLabel(
        star,
        x,
        y,
        angle,
        centerX,
        nodeScale,
        bounds,
      ),
    };
  });
}
