import type { FocusTransition, ViewLevel } from "../types/atlas";

export type AtlasSearchMode = "suggestions" | "results" | null;

export interface AtlasState {
  level: ViewLevel;
  activeSystemId: string | null;
  activePlanetId: string | null;
  focusSection: number;
  drawerOpen: boolean;
  searchMode: AtlasSearchMode;
  focusTransition: FocusTransition | null;
}

export const initialAtlasState: AtlasState = {
  level: 0,
  activeSystemId: null,
  activePlanetId: null,
  focusSection: 0,
  drawerOpen: false,
  searchMode: null,
  focusTransition: null,
};
