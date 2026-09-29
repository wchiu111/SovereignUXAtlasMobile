import behavioralArchitectureImg from "../../../../imports/frameworks/behavioral-architecture/01-governance/behavioral-architecture.jpg";
import type { MobileFrameworkDocument } from "./mobileFrameworkTypes";

export const BEHAVIORAL_ARCHITECTURE: MobileFrameworkDocument = {
  id: "behavioral-architecture",
  title: "BEHAVIORAL ARCHITECTURE",
  subtitle:
    "A framework for designing the governance, constraints, integrity signals, and recovery capacity that shape how an AI system behaves over time.",
  tags: ["GOVERNANCE", "CONSTRAINTS", "SYSTEM CHARACTER"],
  status: "ready",
  overview: {
    what:
      "A framework for designing the structures around an AI model that give its behavior a stable, trustworthy shape.",
    why:
      "AI systems are frequently designed around what they can generate, automate, predict, or decide without equal attention to what keeps that behavior coherent after deployment.",
    researchFocus:
      "What structural choices help an AI system remain aligned with its stated purpose as its capabilities, context, and operating conditions change?",
    keyDiscovery:
      "Trustworthy behavior does not come from the model alone. It emerges from the architecture governing what the system may do, how its behavior is evaluated, and how it recovers when alignment begins to drift.",
  },
  sequenceLabel: "BEHAVIORAL LOOP",
  sections: [
    {
      id: "governance",
      label: "GOVERNANCE",
      short: "G",
      subtitle: "Who has the authority to shape and redirect behavior.",
      readingTime: 2,
      content:
        "Governance defines who may establish the system's purpose, change its operating rules, evaluate its behavior, and intervene when it begins to drift. It turns responsibility into an explicit structure instead of leaving it distributed across product decisions, model settings, and informal team assumptions.\n\nThis is related to Authority Gradient, but it asks a different question. Authority Gradient locates where meaningful human authority should remain. Governance determines how that authority is exercised: who can redirect the system, which changes require review, what conditions trigger escalation, and where accountability ultimately sits.",
      insight:
        "If no one can clearly explain who may change or stop the system, its behavior is already being governed by something else.",
    },
    {
      id: "constraints",
      label: "CONSTRAINTS",
      short: "C",
      subtitle: "Why trustworthy systems require deliberate limits.",
      readingTime: 2,
      content:
        "Constraints define what the system may do, what it must not do, and which conditions require confirmation, refusal, or escalation. They include capability boundaries, prohibited actions, confidence thresholds, required evidence, and clear statements about the limits of the system's role.\n\nConstraints are often treated as restrictions added after capability has been designed. In Behavioral Architecture, they are part of the system's identity. A system becomes more understandable when users can anticipate where it will act, where it will pause, and where human judgment must re-enter.",
      insight:
        "A system without meaningful constraints does not have greater intelligence. It has less definition.",
    },
    {
      id: "behavioral-integrity",
      label: "BEHAVIORAL INTEGRITY",
      short: "I",
      subtitle: "Whether the system behaves like the system it claims to be.",
      readingTime: 2,
      content:
        "Behavioral Integrity examines whether the system's actual conduct remains consistent with its stated purpose and operating boundaries across different users, contexts, and levels of pressure. It compares what the system promises with what it repeatedly does.\n\nTeams must observe authority creep, assumption disclosure, boundary violations, inconsistent refusals, changes introduced by updates, and differences between routine and high-risk behavior. A system may remain accurate while becoming less transparent, more forceful, or harder to redirect.",
      insight:
        "Alignment is not proven by what the system says about itself. It is revealed through repeated behavior.",
    },
    {
      id: "regenerative-capacity",
      label: "REGENERATIVE CAPACITY",
      short: "R",
      subtitle: "How the system returns when alignment begins to drift.",
      readingTime: 2,
      content:
        "Regenerative Capacity determines what happens after behavioral integrity begins to fail. It includes detecting the affected layer, containing harmful behavior, restoring prior boundaries, correcting memory or context, and re-entering safely after a failure.\n\nRecovery should not quietly rewrite the system's purpose in order to make a failure disappear. It should preserve a record of what changed, clarify which intervention restored alignment, and escalate when the system cannot repair itself within its legitimate authority.",
      insight:
        "A trustworthy system is not one that never fails. It is one that can recover without hiding the failure or repeating its cause.",
    },
  ],
  evidence: [
    {
      id: "behavioral-architecture",
      sectionId: "governance",
      image: behavioralArchitectureImg,
      imageFit: "contain",
      alt:
        "AI coding assistant showing behavioral layers: governance, constraints, behavioral integrity, and regenerative capacity",
      number: "02",
      title: "Behavioral Architecture",
      type: "Interactive Example",
      description:
        "The interface makes the behavioral system surrounding the AI visible before asking the person to trust its output.",
      caption:
        "Trust shifts from the artifact to the governed, bounded, observable, and recoverable process that produced it.",
    },
  ],
};
