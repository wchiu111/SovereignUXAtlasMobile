import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { createAtlasAssistProviderSelection } from "../../atlas-assist/providers";
import { useAtlasAssistContext } from "../../hooks/useAtlasAssistContext";
import type {
  AtlasAssistInteractionMethod,
  AtlasAssistPromptCategory,
} from "../../types/atlasAssist";
import AtlasAssistStatus from "./AtlasAssistStatus";
import "./atlasAssist.css";

export default function AtlasAssistEntry({
  open,
  projectId,
  color,
  onClose,
  onConsult,
}: {
  open: boolean;
  projectId: string;
  color: string;
  onClose: () => void;
  onConsult: (
    query: string,
    trigger: HTMLElement,
    promptCategory?: AtlasAssistPromptCategory,
    interactionMethod?: AtlasAssistInteractionMethod,
  ) => void;
}) {
  const [question, setQuestion] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const submissionMethodRef = useRef<AtlasAssistInteractionMethod>("keyboard");
  const { error: contextError } = useAtlasAssistContext({
    mode: "overview",
    scope: "atlas",
    projectId,
  });
  const providerMode = useMemo(() => {
    try {
      return createAtlasAssistProviderSelection().mode;
    } catch {
      return "unavailable" as const;
    }
  }, []);
  const status = contextError
    ? "error"
    : providerMode === "unavailable"
      ? "unavailable"
      : "idle";

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    console.debug("[Atlas Assist] overview.entry.mounted", JSON.stringify({
      status,
      providerMode,
      projectId,
      contextAvailable: !contextError,
    }));
  }, [contextError, projectId, providerMode, status]);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, open]);

  const submitQuestion = async (
    nextQuestion: string,
    trigger: HTMLElement,
    interactionMethod: AtlasAssistInteractionMethod,
  ): Promise<void> => {
    const clean = nextQuestion.trim();
    if (import.meta.env.DEV) {
      console.debug("[Atlas Assist] entry.submit", {
        hasQuestion: Boolean(clean),
        scope: "atlas",
        projectId,
        sectionId: undefined,
        interactionMethod,
      });
    }
    if (!clean) {
      setValidationError("Enter a question before consulting Atlas.");
      return;
    }
    if (contextError) {
      setValidationError("Atlas could not prepare the current grounding context.");
      if (import.meta.env.DEV) {
        console.error("[Atlas Assist] entry.context.failed", contextError);
      }
      return;
    }
    setValidationError(null);
    onConsult(clean, trigger, undefined, interactionMethod);
  };

  return (
    <div
      className="atlas-assist-entry-shell"
      data-open={open || undefined}
      aria-hidden={!open}
      {...(!open ? { inert: "" } : {})}
    >
      <button
        type="button"
        className="atlas-assist-entry-backdrop"
        aria-label="Close Ask a question"
        tabIndex={-1}
        onClick={onClose}
      />
      <section
        className="atlas-assist-entry"
        style={{ "--atlas-assist-color": color } as React.CSSProperties}
        role="dialog"
        aria-modal="false"
        aria-labelledby="atlas-assist-entry-title"
        data-atlas-assist-status={status}
        data-atlas-assist-provider={providerMode}
      >
        <header className="atlas-assist-entry__header">
          <div className="atlas-assist-section-heading" id="atlas-assist-entry-title">
            ASK A QUESTION
          </div>
          <button type="button" onClick={onClose} aria-label="Close Ask a question">
            <X aria-hidden="true" size={15} strokeWidth={1.35} />
          </button>
        </header>
        {status === "idle" ? (
          <form
            className="atlas-assist-question"
            onSubmit={(event) => {
              event.preventDefault();
              void submitQuestion(
                question,
                inputRef.current ?? event.currentTarget,
                submissionMethodRef.current,
              );
            }}
          >
            <label
              className="atlas-assist-visually-hidden"
              htmlFor={`atlas-assist-overview-${projectId}`}
            >
              Ask a question
            </label>
            <div>
              <input
                ref={inputRef}
                id={`atlas-assist-overview-${projectId}`}
                value={question}
                onChange={(event) => {
                  setQuestion(event.currentTarget.value);
                  if (validationError) setValidationError(null);
                }}
                onKeyDown={(event) => {
                  submissionMethodRef.current = "keyboard";
                  if (event.key !== "Enter") return;
                  event.preventDefault();
                  void submitQuestion(
                    event.currentTarget.value,
                    event.currentTarget,
                    "keyboard",
                  );
                }}
                placeholder="What would you like to understand?"
                aria-invalid={Boolean(validationError) || undefined}
                aria-describedby={validationError ? `atlas-assist-overview-error-${projectId}` : undefined}
              />
              <button
                type="submit"
                aria-label="Ask Atlas this question"
                onPointerDown={() => { submissionMethodRef.current = "mouse"; }}
                onKeyDown={() => { submissionMethodRef.current = "keyboard"; }}
              >
                <ArrowRight aria-hidden="true" size={15} strokeWidth={1.35} />
              </button>
            </div>
            {validationError && (
              <p
                className="atlas-assist-question__error"
                id={`atlas-assist-overview-error-${projectId}`}
                role="alert"
              >
                {validationError}
              </p>
            )}
          </form>
        ) : (
          <AtlasAssistStatus
            progressIndex={0}
            error={status === "unavailable"
              ? "Atlas Assist is not available on this deployment."
              : "Atlas could not prepare the current Atlas context."}
          />
        )}
      </section>
    </div>
  );
}
