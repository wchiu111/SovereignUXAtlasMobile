import type { ReactNode } from "react";

export type AtlasOverviewSystemId =
  | "case-studies"
  | "frameworks"
  | "experiments";

export type AtlasOverviewDrawerPhase =
  | "open"
  | "closing"
  | "opening";

export interface AtlasOverviewParentContent {
  headline: string;
  body: string;
  invitation?: string;
}

/**
 * Identity can exist before authored overview copy is ready.
 * This is useful for a new system such as Experiments while it is still being
 * scaffolded into the shared frame.
 */
export interface AtlasOverviewSystemIdentity<
  TSystemId extends string = AtlasOverviewSystemId,
> {
  id: TSystemId;
  title: string;
  countLabel: string;
  color: string;
}

/**
 * Full product-ready system definition.
 */
export interface AtlasOverviewSystemDefinition<
  TSystemId extends string = AtlasOverviewSystemId,
> extends AtlasOverviewSystemIdentity<TSystemId> {
  parentContent: AtlasOverviewParentContent;
}

export interface AtlasOverviewItemIdentity<
  TSelectionId extends string = string,
> {
  id: TSelectionId;
  label: string;
}

/**
 * Adapter definition used to plug a domain-specific constellation into the
 * shared Atlas overview architecture.
 *
 * It deliberately stops at identity + selection topology. Geometry, node
 * rendering, relationship paths, reading surfaces, and evidence remain local.
 */
export interface AtlasOverviewSystemAdapterDefinition<
  TSystemId extends string = AtlasOverviewSystemId,
  TSelectionId extends string = string,
> {
  system: AtlasOverviewSystemIdentity<TSystemId>;
  parentId: TSelectionId;
  items: readonly AtlasOverviewItemIdentity<TSelectionId>[];
}

export interface AtlasOverviewFrameSlots {
  chrome?: ReactNode;
  narrative?: ReactNode;
}

export interface AtlasOverviewPresentationState<
  TSelectionId extends string = string,
> {
  selectedId: TSelectionId;
  drawerPhase: AtlasOverviewDrawerPhase;
  drawerVisible: boolean;
  chromeVisible: boolean;
  reducedMotion: boolean;
}

/**
 * Shared observable interaction state.
 *
 * This is deliberately a contract, not a generic React hook. Case Studies,
 * Frameworks, and future Experiments may implement different spatial motion
 * while still exposing the same behavioral vocabulary to the overview frame.
 */
export interface AtlasOverviewInteractionState<
  TSelectionId extends string = string,
> extends AtlasOverviewPresentationState<TSelectionId> {
  parentId: TSelectionId;
  selectionPulseId: TSelectionId | null;
  labelsVisible: boolean;
  ambientPaused: boolean;
  focusedEntryId: TSelectionId | null;
  focusedEntryProgress: number;
  isReturningFromReading: boolean;
  focusedReturnProgress: number;
}

export interface AtlasOverviewInteractionActions<
  TSelectionId extends string = string,
> {
  selectOverviewItem: (id: TSelectionId) => void;
  enterFocusedReading: (id: TSelectionId) => void;
  selectParent: () => void;
  exitToAtlas: () => void;
}

/**
 * Minimum adapter shape a system can expose to the shared frame without
 * surrendering its system-specific spatial behavior.
 */
export interface AtlasOverviewAdapter<
  TSelectionId extends string = string,
> extends AtlasOverviewPresentationState<TSelectionId> {
  onSelect: (id: TSelectionId) => void;
  onBack: () => void;
  onExplore?: () => void;
}
