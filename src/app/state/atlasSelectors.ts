import { SYSTEM_MAP } from "../data/atlasSystems";
import type { AtlasState } from "./atlasState";

export function selectActiveSystem(state: AtlasState) {
  return state.activeSystemId ? SYSTEM_MAP[state.activeSystemId] ?? null : null;
}

export function selectActivePlanet(state: AtlasState) {
  const system = selectActiveSystem(state);
  return system?.planets.find((planet) => planet.id === state.activePlanetId) ?? null;
}

export const selectIsAtlasRoot = (state: AtlasState) => state.level === 0;
export const selectIsSystemView = (state: AtlasState) => state.level === 1;
export const selectIsOverview = (state: AtlasState) => state.level === 2;
export const selectIsFocusMode = (state: AtlasState) => state.level === 3;
export const selectSearchResultsOpen = (state: AtlasState) => state.searchMode === "results";
