export type ConstellationLabelAnchor = "start" | "middle" | "end";

export interface ConstellationOverviewCopy {
  what: string;
  why: string;
  researchFocus: string;
  keyDiscovery: string;
}

export interface ConstellationEvidence {
  id: string;
  image?: string;
  imageFit: "contain" | "cover";
  alt: string;
  number: string;
  title: string;
  type: string;
  description: string;
  caption: string;
}

export interface ConstellationSection {
  id: string;
  label: string;
  short?: string;
  subtitle: string;
  readingTime: number;
  content: string;
  insight: string;
  evidence?: readonly ConstellationEvidence[];
}

export interface ConstellationItem<TId extends string = string> {
  id: TId;
  title: string;
  subtitle: string;
  labelLines: readonly string[];
  color: string;
  meta: string;
  breathDelay: number;
  overview: ConstellationOverviewCopy;
  sections: readonly ConstellationSection[];
}

export interface ConstellationNodeGeometry<TId extends string = string> {
  id: TId;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  anchor: ConstellationLabelAnchor;
}

export interface ConstellationParentDefinition<TId extends string = string> {
  id: TId;
  title: string;
  countLabel: string;
  color: string;
  headline: string;
  body: string;
  invitation: string;
  x: number;
  y: number;
}

export interface ConstellationRelation {
  id: string;
  d: string;
  strength?: "primary" | "secondary";
  dashed?: boolean;
}

export interface ConstellationDefinition<
  TParentId extends string = string,
  TItemId extends string = string,
> {
  parent: ConstellationParentDefinition<TParentId>;
  items: readonly ConstellationItem<TItemId>[];
  geometry: readonly ConstellationNodeGeometry<TItemId>[];
  relations: readonly ConstellationRelation[];
}

export interface ConstellationMotionConfig {
  selectionPulseMs: number;
  drawerCloseMs: number;
  drawerOpenMs: number;
  drawerReducedMs: number;
  labelRevealDelayMs: number;
  chromeRevealDelayMs: number;
  readingHandoffMs: number;
  readingReducedHandoffMs: number;
  returnMs: number;
  returnReducedMs: number;
  positionTransition: string;
}

export function defineConstellationTemplate<
  const TParentId extends string,
  const TItemId extends string,
>(
  definition: ConstellationDefinition<TParentId, TItemId>,
) {
  return definition;
}
