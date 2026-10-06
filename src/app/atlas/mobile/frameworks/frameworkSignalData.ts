import type { MobileFrameworkId } from "./mobileFrameworkTypes";

export type FrameworkSignalIdentity =
  | "PURPOSE"
  | "STRATEGY"
  | "RELATIONAL";

export type FrameworkRelationshipKind = "origin" | "applied-in";

export interface FrameworkRelationshipItem {
  id: string;
  kind: FrameworkRelationshipKind;
  relatedId: string;
  relatedLabel: string;
  relatedCategory: "CASE STUDY" | "FRAMEWORK" | "EXPERIMENT";
  compactSummary: string;
  summary: string;
}

export interface FrameworkSignalConfig {
  identity: FrameworkSignalIdentity;
  relationships: readonly FrameworkRelationshipItem[];
}

/**
 * Mobile presentation metadata derived from the current Desktop Atlas model.
 *
 * Desktop reference points:
 * - signatureStellarType -> identity signal
 * - tags -> concept signals (already authored on MobileFrameworkDocument)
 * - ATLAS_RELATIONSHIPS -> relationship groups and preview copy
 *
 * This keeps the Figma-first pass intentionally small: Mobile keeps its
 * existing authored framework documents while the signal layer is tested.
 */
export const FRAMEWORK_SIGNAL_CONFIG: Record<
  MobileFrameworkId,
  FrameworkSignalConfig
> = {
  "authority-gradient": {
    identity: "PURPOSE",
    relationships: [
      {
        id: "agentic-insurance-authority-gradient",
        kind: "origin",
        relatedId: "agentic-insurance",
        relatedLabel: "Agentic Insurance",
        relatedCategory: "CASE STUDY",
        compactSummary: "AI recommendations and professional judgment",
        summary:
          "Questions about where AI recommendations should stop and professional judgment should begin emerged while exploring an agentic insurance claims workflow.",
      },
    ],
  },

  "behavioral-architecture": {
    identity: "STRATEGY",
    relationships: [],
  },

  "relational-ai-literacy": {
    identity: "RELATIONAL",
    relationships: [],
  },

  "presence-navigation": {
    identity: "STRATEGY",
    relationships: [
      {
        id: "globality-presence-navigation",
        kind: "origin",
        relatedId: "globality",
        relatedLabel: "Globality",
        relatedCategory: "CASE STUDY",
        compactSummary: "Enterprise procurement and sourcing workflows",
        summary:
          "Questions about orientation first surfaced while redesigning a complex enterprise procurement workflow.",
      },
      {
        id: "oracle-presence-navigation",
        kind: "origin",
        relatedId: "oracle",
        relatedLabel: "Oracle",
        relatedCategory: "CASE STUDY",
        compactSummary: "Sequencing information across a complex portfolio",
        summary:
          "Questions about sequencing information around when it becomes useful surfaced while translating Oracle’s Higher Education portfolio into a coherent customer journey.",
      },
      {
        id: "sovereign-atlas-presence-navigation",
        kind: "applied-in",
        relatedId: "sovereign-atlas-cs",
        relatedLabel: "Sovereign Atlas",
        relatedCategory: "CASE STUDY",
        compactSummary: "Arrival, Focus Mode, and progressive disclosure",
        summary:
          "Presence Navigation is applied throughout Atlas to guide arrival, orientation, focus, and exploration without removing user agency.",
      },
    ],
  },

  "regenerative-systems": {
    identity: "RELATIONAL",
    relationships: [],
  },
};

export function frameworkSignalConfigFor(id: MobileFrameworkId) {
  return FRAMEWORK_SIGNAL_CONFIG[id];
}
