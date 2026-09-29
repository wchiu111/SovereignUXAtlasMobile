import { getAtlasEntry } from "../../content/registry";
import { atlasEntryToReadingDocument } from "../shared/adapters";
import AtlasReadingEngine from "../shared/AtlasReadingEngine";

interface Props {
  planetId: string;
  system: { color: string; label: string };
  onExit: () => void;
  onAtlas?: () => void;
  onSystem?: () => void;
  initialSectionIndex?: number;
}

export default function ExperimentEngine({ planetId, ...props }: Props) {
  const entry = getAtlasEntry(planetId);
  if (!entry || entry.category !== "experiment") return null;
  return (
    <AtlasReadingEngine
      document={atlasEntryToReadingDocument(entry)}
      routeSegment="experiment"
      {...props}
    />
  );
}
