import type { AtlasEntry } from "./types";

export function defineAtlasEntry<const T extends AtlasEntry>(entry: T): T {
  return entry;
}
