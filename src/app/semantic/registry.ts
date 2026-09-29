import { ATLAS_ENTRIES } from "../content/registry";
import {
  assertValidSemanticRegistry,
  buildSemanticRegistry,
} from "./semanticRegistry";

/**
 * The assembled Atlas registry is intentionally separate from the pure
 * semantic utilities so search and validation can be tested with bounded
 * content sets.
 */
export const SEMANTIC_REGISTRY = buildSemanticRegistry(ATLAS_ENTRIES);

export const validateAtlasSemantics = () =>
  assertValidSemanticRegistry(SEMANTIC_REGISTRY);
