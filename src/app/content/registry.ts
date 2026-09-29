import { entries as caseStudies } from "./case-studies";
import { entries as experiments } from "./experiments";
import { entries as frameworks } from "./frameworks";
import type { AtlasCategory, AtlasEntry } from "./types";

export const ATLAS_ENTRIES: AtlasEntry[] = [
  ...caseStudies,
  ...experiments,
  ...frameworks,
];

export const ATLAS_ENTRY_MAP = new Map<string, AtlasEntry>();

ATLAS_ENTRIES.forEach((entry) => {
  ATLAS_ENTRY_MAP.set(entry.id, entry);
  entry.aliases?.forEach((alias) => ATLAS_ENTRY_MAP.set(alias, entry));
});

export function getAtlasEntry(id: string): AtlasEntry | undefined {
  return ATLAS_ENTRY_MAP.get(id);
}

export function getEntriesByCategory(category: AtlasCategory): AtlasEntry[] {
  return ATLAS_ENTRIES.filter((entry) => entry.category === category);
}
