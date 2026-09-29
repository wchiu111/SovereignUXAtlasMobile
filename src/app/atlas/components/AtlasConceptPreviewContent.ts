import type { Planet, StarSystem } from "../../types/atlas";

export interface AtlasConceptPreviewDefinition {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  metaLabel: string;
  metaItems: string[];
  color: string;
}

function formatPreviewTitle(label: string) {
  if (label !== label.toUpperCase()) return label;

  return label
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function previewMeta(
  system: StarSystem,
  planet: Planet,
): { eyebrow: string; metaLabel: string; metaItems: string[] } {
  const tags = planet.tags?.filter(Boolean).slice(0, 3) ?? [];

  if (system.id === "case-studies") {
    return {
      eyebrow: "Case study",
      metaLabel: "Project signals",
      metaItems: tags,
    };
  }

  if (system.id === "experiments") {
    return {
      eyebrow: "Experiment",
      metaLabel: tags.length > 0 ? "Investigates" : "Research focus",
      metaItems: tags.length > 0 ? tags : [planet.researchFocus].filter(Boolean),
    };
  }

  if (system.id === "frameworks") {
    return {
      eyebrow: "Framework",
      metaLabel: tags.length > 0 ? "Framework signals" : "Framework focus",
      metaItems: tags.length > 0 ? tags : [planet.researchFocus].filter(Boolean),
    };
  }

  return {
    eyebrow: "Concept",
    metaLabel: "Signals",
    metaItems: tags,
  };
}

export function buildAtlasConceptPreview(
  system: StarSystem,
  planet: Planet,
): AtlasConceptPreviewDefinition {
  const meta = previewMeta(system, planet);

  return {
    id: planet.id,
    eyebrow: meta.eyebrow,
    title: formatPreviewTitle(planet.label),
    description: planet.what,
    metaLabel: meta.metaLabel,
    metaItems: meta.metaItems,
    color: system.color,
  };
}
