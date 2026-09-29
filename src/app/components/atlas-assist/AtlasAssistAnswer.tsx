import type {
  AtlasAssistAnswer as AtlasAssistAnswerValue,
  AtlasAssistGroundingSummary,
} from "../../types/atlasAssist";
import AtlasAssistSources from "./AtlasAssistSources";

function normalizeAnswerLabel(label: string) {
  const clean = label.trim();
  return /\bsummary$/i.test(clean) ? "Summary" : clean;
}

function renderAnswerParagraph(paragraph: string, index: number) {
  const labeled = paragraph.match(/^([^:\n]{2,80}):\s+([\s\S]+)$/);
  if (!labeled) {
    return <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>;
  }

  return (
    <section className="atlas-assist-answer__section" key={`${index}-${labeled[1]}`}>
      <h3>{normalizeAnswerLabel(labeled[1])}</h3>
      <p>{labeled[2]}</p>
    </section>
  );
}

export default function AtlasAssistAnswer({
  answer,
  grounding,
  question,
  onOpenSource,
}: {
  answer: AtlasAssistAnswerValue;
  grounding?: AtlasAssistGroundingSummary;
  question: string;
  onOpenSource: Parameters<typeof AtlasAssistSources>[0]["onOpenSource"];
}) {
  return (
    <div className="atlas-assist-answer" aria-live="polite">
      <section className="atlas-assist-answer__question" aria-labelledby="atlas-assist-question-context">
        <div className="atlas-assist-section-heading" id="atlas-assist-question-context">
          YOU ASKED
        </div>
        <p>{question}</p>
      </section>
      <div className="atlas-assist-section-heading">ANSWER</div>
      {answer.interpretation && (
        <div className="atlas-assist-answer__interpretation">
          INTERPRETATION · Based only on the documented project narrative
        </div>
      )}
      <div className="atlas-assist-answer__copy">
        {answer.answer
          .trim()
          .split(/\n\s*\n/)
          .filter(Boolean)
          .map(renderAnswerParagraph)}
      </div>

      {answer.limitations.length > 0 && (
        <section className="atlas-assist-limitations" aria-labelledby="atlas-assist-limitations-title">
          <div className="atlas-assist-section-heading" id="atlas-assist-limitations-title">
            LIMITATIONS
          </div>
          <ul>
            {answer.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
          </ul>
        </section>
      )}

      <AtlasAssistSources
        grounding={grounding}
        scope={answer.scope}
        sources={answer.sources}
        onOpenSource={onOpenSource}
      />
    </div>
  );
}
