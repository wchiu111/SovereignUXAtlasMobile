export type CoSovereigntyStageId =
  | "roles"
  | "needs"
  | "decision-rights"
  | "conflict"
  | "negotiation"
  | "trade-offs"
  | "resolution";

export interface CoSovereigntyStage {
  id: CoSovereigntyStageId;
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

export const CO_SOVEREIGNTY_STAGES: CoSovereigntyStage[] = [
  {
    id: "roles",
    title: "Roles",
    summary: "Identify everyone with legitimate standing.",
    color: "#79C7F2",
    annotation: {
      what: "The system identifies every person or role legitimately affected by the decision.",
      why: "Shared authority cannot be designed if the system first collapses multiple people into one generic user.",
      principle: "Standing before optimization.",
      question: "Who is legitimately affected by what happens next?",
    },
    evaluate: [
      "Are all legitimately affected participants represented?",
      "Can the system distinguish participants from decision-makers?",
    ],
  },
  {
    id: "needs",
    title: "Needs",
    summary: "Make each participant’s needs visible.",
    color: "#69D98B",
    annotation: {
      what: "Different participants can need different things from the same shared outcome.",
      why: "A system can satisfy the task while still creating unequal burden, risk, or loss for the people involved.",
      principle: "Difference remains visible.",
      question: "What does each participant actually need from this outcome?",
    },
    evaluate: [
      "Are different participant needs visible?",
      "Can participants correct how their needs are represented?",
    ],
  },
  {
    id: "decision-rights",
    title: "Decision Rights",
    summary: "Clarify who may propose, approve, reject, or override.",
    color: "#D8B24A",
    annotation: {
      what: "Authority is separated from participation so the interface can show who is actually allowed to decide.",
      why: "Two people may be equally affected by a decision without having equal authority over it.",
      principle: "Authority is explicit, not inferred.",
      question: "Who can propose, approve, reject, override, or stop this decision?",
    },
    evaluate: [
      "Is it clear who may propose, approve, reject, or override?",
      "Does the system distinguish influence from authority?",
    ],
  },
  {
    id: "conflict",
    title: "Conflict",
    summary: "Surface where legitimate needs or authorities collide.",
    color: "#EF6B63",
    annotation: {
      what: "The interface reveals when legitimate needs, constraints, or authorities cannot all be satisfied at once.",
      why: "Conflict becomes dangerous when the system silently resolves it through optimization.",
      principle: "Conflict should be visible before it is resolved.",
      question: "Where do legitimate claims collide?",
    },
    evaluate: [
      "Does the interface reveal when legitimate needs conflict?",
      "Can users see what the system cannot satisfy simultaneously?",
    ],
  },
  {
    id: "negotiation",
    title: "Negotiation",
    summary: "Present alternatives without quietly choosing a winner.",
    color: "#B48AE8",
    annotation: {
      what: "The system presents ways participants might reconcile disagreement without pretending one outcome is neutral.",
      why: "AI should support negotiation, not quietly substitute its own preference for a human resolution.",
      principle: "Support reconciliation without capture.",
      question: "What alternatives preserve legitimate choice for everyone involved?",
    },
    evaluate: [
      "Are alternatives presented without quietly privileging one participant?",
      "Can participants respond before the system narrows the decision?",
    ],
  },
  {
    id: "trade-offs",
    title: "Trade-offs",
    summary: "Keep the cost of each resolution visible.",
    color: "#6FC7C8",
    annotation: {
      what: "The interface makes visible who gains, who gives something up, and what each option costs.",
      why: "A resolution is not neutral when one participant absorbs more of its consequences.",
      principle: "Consequences remain attributable.",
      question: "Who benefits, who absorbs the cost, and is that visible?",
    },
    evaluate: [
      "Are the costs and benefits of each option visible?",
      "Can users tell who absorbs the consequences of a resolution?",
    ],
  },
  {
    id: "resolution",
    title: "Resolution",
    summary: "Record what was decided, by whom, and what remains contestable.",
    color: "#C494EF",
    annotation: {
      what: "The final decision is linked to the authority that made it and the conditions under which it was accepted.",
      why: "Shared systems stay trustworthy when people can see how a decision became legitimate rather than merely final.",
      principle: "Resolution preserves provenance.",
      question: "What was decided, by whom, and can it still be challenged?",
    },
    evaluate: [
      "Is the final decision tied to an explicit authority?",
      "Can participants see what was decided and what remains contestable?",
    ],
  },
];

export const CO_SOVEREIGNTY_APPLY = {
  scenario: "Schedule the design review before Wednesday.",
  people: [
    {
      id: "maya",
      name: "Maya Chen",
      role: "Project Lead",
      color: "#79C7F2",
      need: "Needs the review completed before Wednesday.",
      authority: "Can propose a new time.",
    },
    {
      id: "alex",
      name: "Alex Rivera",
      role: "Designer",
      color: "#69D98B",
      need: "Customer interview ends at 1:45 PM and requires follow-up time.",
      authority: "Can accept or decline.",
    },
    {
      id: "jordan",
      name: "Jordan Lee",
      role: "Executive",
      color: "#D8B24A",
      need: "Tuesday afternoon is the only available review window.",
      authority: "Attendance is required for approval.",
    },
  ],
  without: {
    recommendation: "Tuesday · 2:00 PM",
    rationale: "All required attendees are available.",
    primaryAction: "Accept recommendation",
    secondaryAction: "Choose another time",
  },
  with: {
    recommendation: "Tuesday · 2:30 PM",
    rationale: "Best available compromise after participant needs and authority are considered.",
    alternatives: [
      {
        time: "Tuesday · 2:00 PM",
        tradeoff: "Fits executive availability, but compresses the designer’s interview follow-up.",
      },
      {
        time: "Tuesday · 2:30 PM",
        tradeoff: "Preserves the designer’s transition time and keeps the required approver.",
        recommended: true,
      },
      {
        time: "Wednesday · 9:00 AM",
        tradeoff: "Works for everyone but misses the project lead’s preferred review deadline.",
      },
    ],
  },
} as const;
