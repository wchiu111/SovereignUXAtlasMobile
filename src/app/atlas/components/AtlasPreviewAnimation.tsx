import type { AtlasPreviewId } from "./AtlasPreviewContent";
import SovereignOriginBanner from "./SovereignOriginBanner";
import CaseStudyPreview from "./preview-scenes/CaseStudyPreview";
import ExperimentPreview from "./preview-scenes/ExperimentPreview";
import FrameworkPreview from "./preview-scenes/FrameworkPreview";

interface AtlasPreviewAnimationProps {
  previewId: AtlasPreviewId;
}

export default function AtlasPreviewAnimation({ previewId }: AtlasPreviewAnimationProps) {
  if (previewId === "case-studies") return <CaseStudyPreview />;
  if (previewId === "experiments") return <ExperimentPreview />;
  if (previewId === "frameworks") return <FrameworkPreview />;
  return <SovereignOriginBanner />;
}
