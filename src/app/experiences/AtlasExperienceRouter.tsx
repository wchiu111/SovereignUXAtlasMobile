import { getAtlasEntry } from "../content/registry";
import CaseStudyEngine from "./case-studies/CaseStudyEngine";
import ExperimentEngine from "./experiments/ExperimentEngine";
import FrameworkEngine from "./frameworks/FrameworkEngine";

interface Props {
  planetId: string;
  system: { color: string; label: string };
  onExit: () => void;
  onAtlas?: () => void;
  onSystem?: () => void;
  initialSectionIndex?: number;
}

export default function AtlasExperienceRouter(props: Props) {
  const entry = getAtlasEntry(props.planetId);
  if (!entry) return null;
  switch (entry.category) {
    case "case-study": return <CaseStudyEngine {...props} />;
    case "experiment": return <ExperimentEngine {...props} />;
    case "framework": return <FrameworkEngine {...props} />;
  }
}
