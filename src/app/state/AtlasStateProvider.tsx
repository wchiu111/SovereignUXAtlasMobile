import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { AtlasAction } from "./atlasActions";
import { atlasReducer } from "./atlasReducer";
import { initialAtlasState, type AtlasState } from "./atlasState";

interface AtlasStateContextValue {
  state: AtlasState;
  dispatch: Dispatch<AtlasAction>;
}

const AtlasStateContext = createContext<AtlasStateContextValue | null>(null);

export function AtlasStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(atlasReducer, initialAtlasState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AtlasStateContext.Provider value={value}>
      {children}
    </AtlasStateContext.Provider>
  );
}

export function useAtlasStateContext() {
  const context = useContext(AtlasStateContext);
  if (!context) {
    throw new Error("useAtlasStateContext must be used inside AtlasStateProvider");
  }
  return context;
}
