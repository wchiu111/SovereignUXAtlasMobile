import { getAtlasEntry } from "../content";
import type { FocusContent } from "../types/atlas";

export function getFocusContent(entryId: string): FocusContent {
  const entry = getAtlasEntry(entryId);

  if (!entry) {
    return { headline: "Concept", subheadline: "", sections: [] };
  }

  if (entry.sections?.length) {
    return {
      headline: entry.title,
      subheadline: entry.subtitle,
      sections: entry.sections,
    };
  }

  return {
    headline: entry.title,
    subheadline: entry.subtitle,
    sections: [
      { id: "what", label: "Overview", content: entry.overview.what },
      {
        id: "why",
        label: "Why It Matters",
        content: entry.overview.why,
        insight: entry.overview.keyDiscovery,
      },
      {
        id: "focus",
        label: "Research Focus",
        content: entry.overview.researchFocus,
      },
    ],
  };
}
