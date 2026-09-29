import type { AtlasEntry } from "../content/types";
import type {
  AtlasConceptId,
  AtlasSemanticConcept,
  AtlasSemanticRegistry,
  AtlasSemanticRelationship,
  AtlasSemanticSearchResult,
  AtlasSemanticValidationIssue,
} from "./types";

const normalize = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

export const conceptIdForEntry = (entry: AtlasEntry): AtlasConceptId =>
  `${entry.category}/${entry.id}`;

export const conceptIdForSection = (
  entry: AtlasEntry,
  sectionId: string,
): AtlasConceptId => `${conceptIdForEntry(entry)}/${sectionId}`;

export function buildSemanticRegistry(
  entries: readonly AtlasEntry[],
): AtlasSemanticRegistry {
  const concepts: AtlasSemanticConcept[] = [];
  const relationships: AtlasSemanticRelationship[] = [];

  entries.forEach((entry) => {
    if (!entry.semantics) return;

    const entryConceptId = conceptIdForEntry(entry);
    concepts.push({
      id: entryConceptId,
      entryId: entry.id,
      category: entry.category,
      title: entry.title,
      summary: entry.semantics.summary ?? entry.overview.what,
      keywords: entry.semantics.keywords,
      aliases: [...(entry.aliases ?? []), ...(entry.semantics.aliases ?? [])],
      stellarType: entry.signatureStellarType,
    });

    entry.sections?.forEach((section) => {
      if (!section.semantics) return;

      concepts.push({
        id: conceptIdForSection(entry, section.id),
        entryId: entry.id,
        sectionId: section.id,
        parentId: entryConceptId,
        category: entry.category,
        title: section.label,
        summary: section.semantics.summary ?? section.content.split("\n")[0],
        keywords: section.semantics.keywords,
        aliases: section.semantics.aliases ?? [],
        stellarType: section.accentStellarType,
      });
    });

    entry.constellation?.connections?.forEach((connection) => {
      const from = conceptIdForSection(entry, connection.from);
      const to = conceptIdForSection(entry, connection.to);
      relationships.push({
        id: `${from}->${to}`,
        from,
        to,
        type: connection.type ?? "related",
        strength: connection.strength ?? "primary",
        rationale: connection.rationale ?? "",
      });
    });
  });

  return {
    concepts,
    conceptMap: new Map(concepts.map((concept) => [concept.id, concept])),
    relationships,
  };
}

function bestFieldMatch(
  query: string,
  concept: AtlasSemanticConcept,
): Omit<AtlasSemanticSearchResult, "concept"> | null {
  const fields = [
    { matchedOn: "title" as const, values: [concept.title], exact: 1 },
    { matchedOn: "alias" as const, values: concept.aliases, exact: 0.96 },
    { matchedOn: "keyword" as const, values: concept.keywords, exact: 0.9 },
    { matchedOn: "summary" as const, values: [concept.summary], exact: 0.58 },
  ];

  let best: Omit<AtlasSemanticSearchResult, "concept"> | null = null;

  fields.forEach((field) => {
    field.values.forEach((value) => {
      const candidate = normalize(value);
      let score = 0;

      if (candidate === query) score = field.exact;
      else if (candidate.startsWith(query)) score = field.exact * 0.84;
      else if (candidate.includes(query)) score = field.exact * 0.7;
      else if (
        query
          .split(" ")
          .filter((token) => token.length > 2)
          .every((token) => candidate.includes(token))
      ) {
        score = field.exact * 0.54;
      }

      if (!best || score > best.score) {
        if (score > 0) {
          best = {
            matchedOn: field.matchedOn,
            matchedValue: value,
            score: Number(score.toFixed(3)),
          };
        }
      }
    });
  });

  return best;
}

export function searchSemanticRegistry(
  query: string,
  registry: AtlasSemanticRegistry,
  limit = 12,
): AtlasSemanticSearchResult[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  return registry.concepts
    .flatMap((concept) => {
      const match = bestFieldMatch(normalizedQuery, concept);
      return match ? [{ concept, ...match }] : [];
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.concept.title.localeCompare(b.concept.title),
    )
    .slice(0, limit);
}

export function getRelatedConcepts(
  conceptId: AtlasConceptId,
  registry: AtlasSemanticRegistry,
) {
  const related: Array<{
    concept: AtlasSemanticConcept;
    relationship: AtlasSemanticRelationship;
    direction: "outgoing" | "incoming";
  }> = [];

  registry.relationships.forEach((relationship) => {
    if (relationship.from === conceptId) {
      const concept = registry.conceptMap.get(relationship.to);
      if (concept) related.push({ concept, relationship, direction: "outgoing" });
    }

    if (relationship.to === conceptId) {
      const concept = registry.conceptMap.get(relationship.from);
      if (concept) related.push({ concept, relationship, direction: "incoming" });
    }
  });

  return related;
}

export function validateSemanticRegistry(
  registry: AtlasSemanticRegistry,
): AtlasSemanticValidationIssue[] {
  const issues: AtlasSemanticValidationIssue[] = [];
  const seenConcepts = new Set<string>();
  const seenRelationships = new Set<string>();

  registry.concepts.forEach((concept) => {
    if (seenConcepts.has(concept.id)) {
      issues.push({
        code: "duplicate-concept-id",
        conceptId: concept.id,
        message: `Duplicate semantic concept id: ${concept.id}`,
      });
    }
    seenConcepts.add(concept.id);
  });

  registry.relationships.forEach((relationship) => {
    if (seenRelationships.has(relationship.id)) {
      issues.push({
        code: "duplicate-relationship",
        relationshipId: relationship.id,
        message: `Duplicate semantic relationship: ${relationship.id}`,
      });
    }
    seenRelationships.add(relationship.id);

    if (!registry.conceptMap.has(relationship.from)) {
      issues.push({
        code: "missing-relationship-origin",
        relationshipId: relationship.id,
        message: `Missing relationship origin: ${relationship.from}`,
      });
    }

    if (!registry.conceptMap.has(relationship.to)) {
      issues.push({
        code: "missing-relationship-target",
        relationshipId: relationship.id,
        message: `Missing relationship target: ${relationship.to}`,
      });
    }

    if (relationship.from === relationship.to) {
      issues.push({
        code: "self-relationship",
        relationshipId: relationship.id,
        message: `Semantic relationship cannot point to itself: ${relationship.id}`,
      });
    }

    if (!relationship.rationale.trim()) {
      issues.push({
        code: "missing-rationale",
        relationshipId: relationship.id,
        message: `Semantic relationship requires a rationale: ${relationship.id}`,
      });
    }
  });

  return issues;
}

export function assertValidSemanticRegistry(
  registry: AtlasSemanticRegistry,
) {
  const issues = validateSemanticRegistry(registry);
  if (issues.length > 0) {
    throw new Error(
      `Invalid Atlas semantic registry:\n${issues
        .map((issue) => `- ${issue.message}`)
        .join("\n")}`,
    );
  }
  return registry;
}
