import type {
  AtlasCategory,
  AtlasSemanticRelationshipType,
  AtlasStellarType,
} from "../content/types";

export type AtlasConceptId = `${AtlasCategory}/${string}`;

export interface AtlasSemanticConcept {
  id: AtlasConceptId;
  entryId: string;
  sectionId?: string;
  parentId?: AtlasConceptId;
  category: AtlasCategory;
  title: string;
  summary: string;
  keywords: string[];
  aliases: string[];
  stellarType?: AtlasStellarType;
}

export interface AtlasSemanticRelationship {
  id: string;
  from: AtlasConceptId;
  to: AtlasConceptId;
  type: AtlasSemanticRelationshipType;
  strength: "primary" | "secondary";
  rationale: string;
}

export interface AtlasSemanticRegistry {
  concepts: AtlasSemanticConcept[];
  conceptMap: Map<AtlasConceptId, AtlasSemanticConcept>;
  relationships: AtlasSemanticRelationship[];
}

export type AtlasSemanticMatchField =
  | "title"
  | "alias"
  | "keyword"
  | "summary";

export interface AtlasSemanticSearchResult {
  concept: AtlasSemanticConcept;
  matchedOn: AtlasSemanticMatchField;
  matchedValue: string;
  score: number;
}

export interface AtlasSemanticValidationIssue {
  code:
    | "duplicate-concept-id"
    | "duplicate-relationship"
    | "missing-relationship-origin"
    | "missing-relationship-target"
    | "self-relationship"
    | "missing-rationale";
  message: string;
  conceptId?: string;
  relationshipId?: string;
}
