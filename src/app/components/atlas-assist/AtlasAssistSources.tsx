import { ArrowUpRight } from "lucide-react";
import type {
  AtlasAssistGroundingSummary,
  AtlasAssistScope,
  AtlasAssistSource,
} from "../../types/atlasAssist";

const SOURCE_LABELS: Record<AtlasAssistSource["sourceType"], string> = {
  section: "Section",
  evidence: "Evidence",
  decision: "Decision",
  outcome: "Outcome",
  framework: "Framework",
  "case-study": "Case Study",
  experiment: "Experiment",
};

export default function AtlasAssistSources({
  grounding,
  scope,
  sources,
  onOpenSource,
}: {
  grounding?: AtlasAssistGroundingSummary;
  scope: AtlasAssistScope;
  sources: AtlasAssistSource[];
  onOpenSource: (source: AtlasAssistSource) => void;
}) {
  return (
    <section className="atlas-assist-sources" aria-labelledby="atlas-assist-sources-title">
      <div className="atlas-assist-section-heading" id="atlas-assist-sources-title">
        GROUNDED IN THE ATLAS
      </div>
      {grounding && (
        <div className="atlas-assist-sources__grounding">
          <strong>{scope === "atlas" ? "Entire Atlas" : grounding.sectionTitle ?? grounding.title}</strong>
          {scope === "atlas" ? (
            <span>
              {grounding.caseStudyCount} case studies
              <span aria-hidden="true"> · </span>
              {grounding.frameworkCount} frameworks
              <span aria-hidden="true"> · </span>
              {grounding.experimentCount} experiments
            </span>
          ) : (
            <span>
              {grounding.sectionCount} documented section{grounding.sectionCount === 1 ? "" : "s"}
              <span aria-hidden="true"> · </span>
              {grounding.evidenceCount} evidence artifact{grounding.evidenceCount === 1 ? "" : "s"}
            </span>
          )}
          <small>No external knowledge used</small>
        </div>
      )}
      {sources.length > 0 && (
        <>
          <div className="atlas-assist-sources__count">SOURCES · {sources.length}</div>
          <div className="atlas-assist-sources__list">
            {sources.map((source) => (
              <button key={source.id} type="button" onClick={() => onOpenSource(source)}>
                <span>
                  <strong>{source.title}</strong>
                  <small>
                    {SOURCE_LABELS[source.sourceType]}
                    {source.parentTitle ? ` · ${source.parentTitle}` : ""}
                  </small>
                </span>
                <ArrowUpRight aria-hidden="true" size={13} strokeWidth={1.35} />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
