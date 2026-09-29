import recommendationLast from "../../../../imports/frameworks/decision-rights/01-system-purpose/1-recommendation-last.jpg";
import recommendationFirst from "../../../../imports/frameworks/decision-rights/01-system-purpose/2-recommendation-first.jpg";
import type { MobileFrameworkDocument } from "./mobileFrameworkTypes";

export const AUTHORITY_GRADIENT: MobileFrameworkDocument = {
  id: "authority-gradient",
  title: "AUTHORITY GRADIENT",
  subtitle:
    "A framework for mapping who defines purpose, sets strategy, delegates AI decisions, and retains meaningful review authority.",
  tags: ["HUMAN AUTHORITY", "DELEGATION", "GOVERNANCE"],
  status: "ready",
  overview: {
    what:
      "A framework for mapping who holds decision rights across system purpose, strategy, AI execution, and human review.",
    why:
      "Human-in-the-loop patterns often add approval without clarifying who controls the choices that shape the system upstream.",
    researchFocus:
      "How can individual decisions be delegated to AI without quietly delegating the authority to define what the system is trying to accomplish?",
    keyDiscovery:
      "Human authority does not require manual control over every decision. It requires meaningful control over purpose, boundaries, and the conditions under which decisions are made.",
  },
  sequenceLabel: "AUTHORITY PATH",
  sections: [
    {
      id: "system-purpose",
      label: "SYSTEM PURPOSE",
      short: "P",
      subtitle: "Why authority begins upstream.",
      readingTime: 2,
      content:
        "Before an AI system makes a decision, someone has already decided what the system is trying to accomplish. System purpose defines the intended outcome, who the system is meant to serve, which values must be protected, and what the system should never optimize for.\n\nThis is the deepest layer of authority because every downstream strategy and decision inherits its direction from here. If the purpose is incomplete, misaligned, or invisible, adding human review later cannot repair the foundation.\n\nThe practical question is not whether a person touches every output. It is whether people can still examine, challenge, and change the purpose governing those outputs.",
      insight:
        "If people do not control the system's purpose, reviewing its outputs does not restore meaningful authority.",
    },
    {
      id: "system-strategy",
      label: "SYSTEM STRATEGY",
      short: "S",
      subtitle: "How human intent becomes operating logic.",
      readingTime: 2,
      content:
        "System strategy translates purpose into policies, constraints, thresholds, evidence requirements, and acceptable methods. It determines how competing goals are weighed and which conditions require escalation.\n\nThis is often the least visible layer. Teams may agree on a responsible purpose while allowing implementation choices, optimization targets, or model behavior to quietly redefine it. The system still appears aligned because the stated goal has not changed, but its operating logic has.\n\nStrategy is usually a shared layer. AI can recommend methods and adapt within context, but the boundaries governing those adaptations must remain visible and contestable.",
      insight:
        "Strategy is where human intent either becomes structural or quietly disappears.",
    },
    {
      id: "ai-decision",
      label: "AI DECISION",
      short: "AI",
      subtitle: "What can be delegated without surrendering the system.",
      readingTime: 2,
      content:
        "AI decisions include classification, routing, prioritization, recommendations, and routine actions made within established boundaries. These are the moments most people notice because they produce visible outcomes.\n\nDelegation at this layer can be useful. A system does not need human permission for every low-risk decision if its purpose, constraints, confidence thresholds, and escalation conditions are well governed.\n\nThe danger appears when repeated execution begins changing the rules that were meant to contain it. Decision authority has expanded into strategic authority, often without an explicit handoff.",
      insight:
        "Delegating a decision is not the same as delegating the authority to define the conditions under which it is made.",
    },
    {
      id: "human-approval",
      label: "HUMAN APPROVAL",
      short: "H",
      subtitle: "Why a final review can create the appearance of control.",
      readingTime: 2,
      content:
        "Human-in-the-loop is often treated as a safety guarantee: the AI proposes and a person approves. But approval only preserves authority when the reviewer has enough context, time, alternatives, and permission to meaningfully disagree.\n\nWhen people review too many outputs, inherit invisible assumptions, or can only accept and reject what the system has already framed, approval becomes ceremonial. A human is present, but the consequential choices were made earlier.\n\nSome integrity and review steps may eventually be automated as well. That does not automatically make the system unsafe. It makes the upstream questions more important: who defined the evaluator's purpose, which standards govern it, and where can a person still redirect the system?",
      insight:
        "A person can approve every output while controlling none of the assumptions that produced it.",
    },
  ],
  evidence: [
    {
      id: "recommendation-last",
      sectionId: "system-purpose",
      image: recommendationLast,
      imageFit: "contain",
      alt:
        "Meeting scheduling interface that presents availability and preferences before placing the recommended time at the bottom of the page.",
      number: "01",
      title: "Recommendation Last",
      type: "Interactive Example",
      description:
        "The person receives the underlying availability, constraints, and alternatives first, then must scan and synthesize them before reaching the system's recommendation.",
      caption:
        "The system preserves the final choice but leaves the comparison work with the person.",
    },
    {
      id: "recommendation-first",
      sectionId: "system-purpose",
      image: recommendationFirst,
      imageFit: "contain",
      alt:
        "Meeting scheduling interface that presents the recommended time first, followed by its reasoning, alternatives, and final scheduling controls.",
      number: "02",
      title: "Recommendation First",
      type: "Interactive Example",
      description:
        "The system synthesizes the same constraints into a recommended time, explains why it fits, and keeps alternatives and the final scheduling action available to the person.",
      caption:
        "AI performs the synthesis it is suited for while the person retains the authority to accept, change, or reject the recommendation.",
    },
  ],
};
