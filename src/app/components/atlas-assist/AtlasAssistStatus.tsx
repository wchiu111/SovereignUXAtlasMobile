import type { AtlasAssistContext } from "../../types/atlasAssist";

export default function AtlasAssistStatus({
  context,
  progressIndex,
  error,
  onRetry,
}: {
  context?: AtlasAssistContext | null;
  progressIndex: number;
  error?: string | null;
  onRetry?: () => void;
}) {
  if (error) {
    return (
      <div className="atlas-assist-status atlas-assist-status--error" role="alert">
        <strong>{error}</strong>
        <p>You can still inspect the current scope, supporting evidence, and documented decisions.</p>
        {onRetry && (
          <button type="button" onClick={onRetry}>Try again</button>
        )}
      </div>
    );
  }

  if (!context) {
    return (
      <div className="atlas-assist-status atlas-assist-status--error" role="alert">
        <strong>Atlas could not prepare the current grounding context.</strong>
        <p>The consultation remains open so you can retry or return to the documented content.</p>
      </div>
    );
  }

  const firstLine = context.scope === "section"
    ? "Reading this section..."
    : context.scope === "project"
      ? "Reviewing this project..."
      : "Reviewing the documented Atlas...";
  const steps = [
    firstLine,
    `Reviewing ${context.grounding.evidenceCount} evidence artifact${context.grounding.evidenceCount === 1 ? "" : "s"}...`,
    "Preparing a grounded response...",
  ];

  return (
    <div className="atlas-assist-status" role="status" aria-live="polite">
      {steps.map((step, index) => (
        <div key={step} data-active={index === progressIndex || undefined} data-complete={index < progressIndex || undefined}>
          <span aria-hidden="true" />
          {step}
        </div>
      ))}
    </div>
  );
}
