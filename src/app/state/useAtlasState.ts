import { useCallback } from "react";
import type { FocusTransition } from "../types/atlas";
import type { AtlasSearchMode } from "./atlasState";
import { useAtlasStateContext } from "./AtlasStateProvider";

export function useAtlasState() {
  const { state, dispatch } = useAtlasStateContext();

  const actions = {
    enterSystem: useCallback((systemId: string) => dispatch({ type: "ENTER_SYSTEM", systemId }), [dispatch]),
    openPlanet: useCallback((systemId: string, planetId: string) => dispatch({ type: "OPEN_PLANET", systemId, planetId }), [dispatch]),
    openProjectDrawer: useCallback(() => dispatch({ type: "OPEN_PROJECT_DRAWER" }), [dispatch]),
    closeProjectDrawer: useCallback(() => dispatch({ type: "CLOSE_PROJECT_DRAWER" }), [dispatch]),
    beginFocusTransition: useCallback((transition: FocusTransition) => dispatch({ type: "BEGIN_FOCUS_TRANSITION", transition }), [dispatch]),
    enterFocusMode: useCallback((sectionIndex: number) => dispatch({ type: "ENTER_FOCUS_MODE", sectionIndex }), [dispatch]),
    exitFocusMode: useCallback(() => dispatch({ type: "EXIT_FOCUS_MODE" }), [dispatch]),
    returnToSystem: useCallback(() => dispatch({ type: "RETURN_TO_SYSTEM" }), [dispatch]),
    returnToAtlas: useCallback(() => dispatch({ type: "RETURN_TO_ATLAS" }), [dispatch]),
    setFocusSection: useCallback((sectionIndex: number) => dispatch({ type: "SET_FOCUS_SECTION", sectionIndex }), [dispatch]),
    setSearchMode: useCallback((mode: AtlasSearchMode) => dispatch({ type: "SET_SEARCH_MODE", mode }), [dispatch]),
    closeOverlays: useCallback(() => dispatch({ type: "CLOSE_OVERLAYS" }), [dispatch]),
  };

  return { state, actions };
}
