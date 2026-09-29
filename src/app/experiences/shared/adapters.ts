import type { AtlasEntry, AtlasEntrySection } from "../../content/types";
import type { ReadingDocument, ReadingSection } from "./types";

const CATEGORY_LABEL = {
  "case-study": "CASE STUDY",
  experiment: "EXPERIMENT",
  framework: "FRAMEWORK",
} as const;

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 180));
}

function toBody(content: string): string[] {
  return content.split(/\n\n+/).map((part) => part.trim()).filter(Boolean);
}

function sectionFromEntry(section: AtlasEntrySection, index: number): ReadingSection {
  return {
    id: section.id,
    slug: section.id,
    number: String(index + 1).padStart(2, "0"),
    title: section.label,
    subtitle: section.subtitle ?? "",
    body: toBody(section.content),
    keyInsight: section.insight ?? "",
    readingTime: section.readingTime ?? estimateReadingTime(section.content),
    evidence: section.evidence ?? [],
    accentStellarType: section.accentStellarType,
  };
}

function fallbackSections(entry: AtlasEntry): AtlasEntrySection[] {
  return [
    { id: "overview", label: "Overview", content: entry.overview.what, insight: entry.overview.keyDiscovery },
    { id: "why-it-matters", label: "Why It Matters", content: entry.overview.why, insight: entry.overview.keyDiscovery },
    { id: "research-focus", label: "Research Focus", content: entry.overview.researchFocus, insight: entry.overview.keyDiscovery },
  ];
}

export function atlasEntryToReadingDocument(entry: AtlasEntry): ReadingDocument {
  const sections = (entry.sections?.length ? entry.sections : fallbackSections(entry))
    .map(sectionFromEntry);

  const defaultMeta = entry.category === "case-study"
    ? [entry.role, entry.year].filter(Boolean).join(" · ")
    : [entry.status, entry.year].filter(Boolean).join(" · ");

  return {
    id: entry.id,
    title: entry.title,
    subtitle: entry.subtitle,
    categoryLabel: CATEGORY_LABEL[entry.category],
    meta: entry.meta ?? defaultMeta ?? "",
    sequenceLabel: entry.presentation?.sequenceLabel,
    railLabel: entry.presentation?.railLabel ?? "EVIDENCE",
    artifactLabel: entry.presentation?.artifactLabel ?? "ARTIFACT",
    emptyRailMessage: entry.presentation?.emptyRailMessage,
    sections,
  };
}
