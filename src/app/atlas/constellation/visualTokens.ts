export const ATLAS_MOTION_EASE = "cubic-bezier(0.16,1,0.3,1)";

export const SYSTEM_VISUAL = {
  coreHoverScale: 1.22,
  atmosphereRest: 0.82,
  atmosphereHover: 1.38,
  outerFieldRest: 1.9,
  outerFieldHover: 2.8,
  interactionTargetMultiplier: 2.6,
  restingLabelOpacity: 0.38,
  hoverLabelOpacity: 0.84,
  focusedLabelOpacity: 0.72,
  inactiveLabelOpacity: 0.2,
} as const;

export const PLANET_VISUAL = {
  coreRest: 4,
  coreHover: 5.2,
  coreActive: 6.2,
  innerRest: 12,
  innerHover: 19,
  innerActive: 18,
  outerRest: 22,
  outerHover: 31,
  outerActive: 29,
  interactionTarget: 30,
  overviewOpacity: 0.42,
  overviewLabelOpacity: 0.28,
  focusedLabelOpacity: 0.58,
  hoverLabelOpacity: 0.92,
  activeLabelOpacity: 1,
} as const;

export const SATELLITE_VISUAL = {
  coreRadius: 2.35,
  atmosphereRadius: 7,
  labelOpacity: 0.4,
  lineOpacity: 0.11,
  orbitOpacity: 0.06,
} as const;

export const CURSOR_ATTENTION = {
  restingOpacity: 0.1,
  maxPointerDistance: 320,
  sigma: 126,
  maxLift: 2.5,
  maxScale: 1.06,
  relatedOpacity: 0.44,
} as const;
