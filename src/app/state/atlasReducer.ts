import type { AtlasAction } from "./atlasActions";
import type { AtlasState } from "./atlasState";

export function atlasReducer(state: AtlasState, action: AtlasAction): AtlasState {
  switch (action.type) {
    case "ENTER_SYSTEM":
      return {
        ...state,
        level: 1,
        activeSystemId: action.systemId,
        activePlanetId: null,
        drawerOpen: false,
        focusTransition: null,
        focusSection: 0,
        searchMode: null,
      };

    case "OPEN_PLANET":
      return {
        ...state,
        level: 2,
        activeSystemId: action.systemId,
        activePlanetId: action.planetId,
        drawerOpen: false,
        focusTransition: null,
        focusSection: 0,
        searchMode: null,
      };

    case "OPEN_PROJECT_DRAWER":
      if (state.level !== 2 || !state.activePlanetId) return state;
      return { ...state, drawerOpen: true };

    case "CLOSE_PROJECT_DRAWER":
      return { ...state, drawerOpen: false };

    case "BEGIN_FOCUS_TRANSITION":
      if (state.level !== 2 || !state.activePlanetId) return state;
      return {
        ...state,
        drawerOpen: false,
        focusSection: action.transition.index,
        focusTransition: action.transition,
      };

    case "ENTER_FOCUS_MODE":
      if (!state.activeSystemId || !state.activePlanetId) return state;
      return {
        ...state,
        level: 3,
        focusSection: action.sectionIndex,
        drawerOpen: false,
        focusTransition: null,
        searchMode: null,
      };

    case "EXIT_FOCUS_MODE":
      if (!state.activeSystemId || !state.activePlanetId) return state;
      return {
        ...state,
        level: 2,
        drawerOpen: false,
        focusTransition: null,
      };

    case "RETURN_TO_SYSTEM":
      if (!state.activeSystemId) return state;
      return {
        ...state,
        level: 1,
        activePlanetId: null,
        drawerOpen: false,
        focusTransition: null,
        focusSection: 0,
        searchMode: null,
      };

    case "RETURN_TO_ATLAS":
      return {
        ...state,
        level: 0,
        activeSystemId: null,
        activePlanetId: null,
        drawerOpen: false,
        focusTransition: null,
        focusSection: 0,
        searchMode: null,
      };

    case "SET_FOCUS_SECTION":
      if (state.level !== 3) return state;
      return { ...state, focusSection: Math.max(0, action.sectionIndex) };

    case "SET_SEARCH_MODE":
      if (state.level !== 0 && action.mode !== null) return state;
      return { ...state, searchMode: action.mode };

    case "CLOSE_OVERLAYS":
      return { ...state, drawerOpen: false, searchMode: null };

    default:
      return state;
  }
}
