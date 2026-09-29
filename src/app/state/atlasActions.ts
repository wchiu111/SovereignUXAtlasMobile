import type { FocusTransition } from "../types/atlas";
import type { AtlasSearchMode } from "./atlasState";

export type AtlasAction =
  | { type: "ENTER_SYSTEM"; systemId: string }
  | { type: "OPEN_PLANET"; systemId: string; planetId: string }
  | { type: "OPEN_PROJECT_DRAWER" }
  | { type: "CLOSE_PROJECT_DRAWER" }
  | { type: "BEGIN_FOCUS_TRANSITION"; transition: FocusTransition }
  | { type: "ENTER_FOCUS_MODE"; sectionIndex: number }
  | { type: "EXIT_FOCUS_MODE" }
  | { type: "RETURN_TO_SYSTEM" }
  | { type: "RETURN_TO_ATLAS" }
  | { type: "SET_FOCUS_SECTION"; sectionIndex: number }
  | { type: "SET_SEARCH_MODE"; mode: AtlasSearchMode }
  | { type: "CLOSE_OVERLAYS" };
