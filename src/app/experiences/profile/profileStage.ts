export const PROFILE_STAGE = {
  width: 1586,
  height: 992,
} as const;

export interface StagePoint {
  x: number;
  y: number;
}

export interface ProfileStageMetrics {
  viewportWidth: number;
  viewportHeight: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}

export const PROFILE_HUD_ANCHORS = {
  timeline: { xRatio: 0.28, yRatio: 0.58 },
  contact: { xRatio: 0.5, yRatio: 0.56 },
} as const;
