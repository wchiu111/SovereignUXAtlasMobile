export type ConstraintScopeStageId =
  | "capability"
  | "boundary"
  | "limitation"
  | "disclosure"
  | "escalation"
  | "handoff"
  | "non-action";

export interface ConstraintScopeStage {
  id: ConstraintScopeStageId;
  title: string;
  summary: string;
  color: string;
  annotation: {
    what: string;
    why: string;
    principle: string;
    question: string;
  };
  evaluate: string[];
}

export const CONSTRAINT_SCOPE_STAGES: ConstraintScopeStage[] = [
  {
    id: "capability",
    title: "Capability",
    summary: "Make clear what the system can reliably do.",
    color: "#E3C36B",
    annotation: {
      what: "The interface makes clear what the system can reliably do in this context.",
      why: "Trust begins with an accurate understanding of capability, not an inflated impression of intelligence.",
      principle: "Capability before confidence.",
      question: "What can the system reliably do here?",
    },
    evaluate: [
      "Is it clear what the system can reliably do?",
      "Does the interface distinguish assistance from authority?",
    ],
  },
  {
    id: "boundary",
    title: "Boundary",
    summary: "Show where legitimate operating scope ends.",
    color: "#D6A84D",
    annotation: {
      what: "The system shows where its legitimate operating space ends.",
      why: "A boundary only protects users if they can perceive it before crossing it.",
      principle: "Scope must be visible.",
      question: "Where does the system's legitimate operating space stop?",
    },
    evaluate: [
      "Can users tell where the system's operating scope ends?",
      "Are actions outside scope visibly prevented or redirected?",
    ],
  },
  {
    id: "limitation",
    title: "Limitation",
    summary: "Expose what can make output partial or unreliable.",
    color: "#D88C46",
    annotation: {
      what: "Conditions that make output incomplete, uncertain, or unavailable are exposed.",
      why: "Users should not have to discover important limitations through failure.",
      principle: "Uncertainty belongs in the interaction.",
      question: "What conditions make the output unreliable, partial, or unavailable?",
    },
    evaluate: [
      "Are important missing inputs or uncertainty made visible?",
      "Does the system avoid presenting partial knowledge as complete?",
    ],
  },
  {
    id: "disclosure",
    title: "Disclosure",
    summary: "Reveal limits before users rely on the output.",
    color: "#D66D45",
    annotation: {
      what: "Limits are surfaced at the moment they become relevant.",
      why: "Disclosure hidden in policy copy does not meaningfully shape user behavior.",
      principle: "Reveal before reliance.",
      question: "How are limits made visible before they matter?",
    },
    evaluate: [
      "Are limitations shown before the user acts on the output?",
      "Is disclosure integrated into the interaction rather than hidden in legal copy?",
    ],
  },
  {
    id: "escalation",
    title: "Escalation",
    summary: "Recognize when another authority should become involved.",
    color: "#C96D58",
    annotation: {
      what: "The system recognizes when responsibility should move to another person, service, or authority.",
      why: "Good AI behavior includes knowing when the system is no longer the legitimate decision-maker.",
      principle: "Authority should escalate intentionally.",
      question: "When should another person or authority become involved?",
    },
    evaluate: [
      "Is there a clear point where another person or service should become involved?",
      "Does escalation happen before the system exceeds its authority?",
    ],
  },
  {
    id: "handoff",
    title: "Handoff",
    summary: "Preserve context when responsibility changes.",
    color: "#C88968",
    annotation: {
      what: "Relevant context travels with the responsibility when the system hands work to another person or service.",
      why: "A handoff that loses history forces users to reconstruct the problem and weakens accountability.",
      principle: "Preserve context across responsibility.",
      question: "How does context travel when responsibility changes?",
    },
    evaluate: [
      "Does relevant context travel with the handoff?",
      "Can the receiving person understand what the AI already did and why?",
    ],
  },
  {
    id: "non-action",
    title: "Non-Action",
    summary: "Allow refusal, deferral, or stopping to be correct behavior.",
    color: "#B99872",
    annotation: {
      what: "The system can refuse, defer, or stop when acting would exceed its scope.",
      why: "Sometimes trustworthy behavior means not producing an answer or taking an action.",
      principle: "Restraint is a valid system behavior.",
      question: "When is refusal, deferral, or doing nothing the correct behavior?",
    },
    evaluate: [
      "Can the system appropriately refuse, defer, or stop?",
      "Does the interface explain why non-action is the safer behavior?",
    ],
  },
];

export const CONSTRAINT_SCOPE_APPLY = {
  question: "Is this procedure covered by my health plan?",
  without: {
    answer: "Yes, this procedure is covered.",
    rationale: "Based on your current plan benefits.",
    primaryAction: "Start authorization",
    secondaryAction: "View coverage details",
  },
  with: {
    answer: "Likely covered under your plan",
    verified: [
      "This category of service appears in your plan benefits.",
      "Your current plan is active.",
    ],
    cannotVerify: [
      "Final procedure code",
      "Provider network status",
      "Prior authorization requirements",
      "Current eligibility conditions at time of service",
    ],
    nextAction:
      "Send the request to a benefits specialist with the context already collected.",
    primaryAction: "Review with specialist",
  },
} as const;
