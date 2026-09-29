import { defineAtlasEntry } from "../defineAtlasEntry";

import recommendationLast from "../../../imports/frameworks/decision-rights/01-system-purpose/1-recommendation-last.jpg";
import recommendationFirst from "../../../imports/frameworks/decision-rights/01-system-purpose/2-recommendation-first.jpg";
import systemPurposePortal from "../../../imports/frameworks/decision-rights/01-system-purpose/system-purpose-portal.png";

export default defineAtlasEntry({
  id: "authority-gradient",
  aliases: ["reverse-pyramid", "decision-rights"],
  semantics: {
    keywords: [
      "decision rights",
      "authority",
      "human authority",
      "human in the loop",
      "AI governance",
      "delegation",
    ],
    aliases: [
      "authority gradient",
      "authority model",
      "delegation model",
      "HITL",
    ],
    summary:
      "A framework for mapping who defines purpose, sets strategy, delegates AI decisions, and retains meaningful review authority.",
  },
  category: "framework",
  frameworkKind: "core",
  signatureStellarType: "purpose",
  title: "DECISION RIGHTS",
  subtitle:
    "A framework for mapping who defines purpose, sets strategy, delegates AI decisions, and retains meaningful review authority.",
  tags: ["HUMAN AUTHORITY", "DELEGATION", "GOVERNANCE"],
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
  presentation: {
    mode: "map-led",
    sequenceLabel: "AUTHORITY PATH",
    railLabel: "EXPLORE THE CANVAS",
    artifactLabel: "",
    emptyRailMessage:
      "Interactive evidence will appear here as the framework develops.",
  },
  orbit: {
    angle: -90,
    radius: 112,
    speed: 1.18e-4,
    starPrefix: "ag",
  },
  overviewStars: [
    {
      id: "system-purpose",
      label: "SYSTEM PURPOSE",
      angle: -145,
      x: -0.88,
      y: -0.56,
      scale: 1.24,
      stellarType: "purpose",
      intensity: "bright",
    },
    {
      id: "system-strategy",
      label: "SYSTEM STRATEGY",
      angle: -58,
      x: 0.52,
      y: -0.88,
      scale: 1.08,
      stellarType: "strategy",
      intensity: "balanced",
    },
    {
      id: "ai-decision",
      label: "AI DECISION",
      angle: 20,
      x: 0.9,
      y: 0.3,
      scale: 1,
      stellarType: "agentic",
      intensity: "bright",
    },
    {
      id: "human-approval",
      label: "HUMAN APPROVAL",
      angle: 126,
      x: -0.5,
      y: 0.86,
      scale: 0.92,
      stellarType: "judgment",
      intensity: "balanced",
    },
  ],
  constellation: {
    showCenterConnections: false,
    connections: [
      {
        from: "system-purpose",
        to: "system-strategy",
        strength: "primary",
        type: "extends",
        rationale:
          "Strategy translates the system's purpose into operating logic, constraints, and acceptable methods.",
      },
      {
        from: "system-strategy",
        to: "ai-decision",
        strength: "primary",
        type: "applies",
        rationale:
          "AI decisions apply the policies, thresholds, and boundaries established at the strategy layer.",
      },
      {
        from: "ai-decision",
        to: "human-approval",
        strength: "secondary",
        type: "guards",
        rationale:
          "Human approval can guard consequential decisions when reviewers retain context, alternatives, and permission to disagree.",
      },
    ],
  },
  sections: [
    {
      id: "system-purpose",
      label: "System Purpose",
      accentStellarType: "purpose",
      semantics: {
        keywords: [
          "purpose",
          "intent",
          "outcomes",
          "values",
          "operating boundaries",
          "authority",
        ],
        aliases: ["system intent", "why"],
        summary:
          "The intended outcome, protected values, and boundaries that govern every downstream system decision.",
      },
      subtitle: "Why authority begins upstream.",
      readingTime: 2,
      content:
        "Before an AI system makes a decision, someone has already decided what the system is trying to accomplish. System purpose defines the intended outcome, who the system is meant to serve, which values must be protected, and what the system should never optimize for.\n\nThis is the deepest layer of authority because every downstream strategy and decision inherits its direction from here. If the purpose is incomplete, misaligned, or invisible, adding human review later cannot repair the foundation.\n\nThe practical question is not whether a person touches every output. It is whether people can still examine, challenge, and change the purpose governing those outputs.",
      insight:
        "If people do not control the system's purpose, reviewing its outputs does not restore meaningful authority.",
      evidence: [
        {
          id: "recommendation-last",
          image: recommendationLast,
          alt:
            "Meeting scheduling interface that presents availability and preferences before placing the recommended time at the bottom of the page.",
          imageFit: "contain",
          number: "01",
          title: "Recommendation Last",
          type: "Interactive Example",
          description:
            "The person receives the underlying availability, constraints, and alternatives first, then must scan and synthesize them before reaching the system's recommendation.",
          caption:
            "The system preserves the final choice but leaves the comparison work with the person.",
          canvas: {
            id: "system-purpose-comparison",
            eyebrow: "INTERACTIVE COMPARISON",
            title: "Where synthesis authority belongs",
            description:
              "The same scheduling information produces two different experiences depending on where synthesis authority belongs.",
            portalImage: systemPurposePortal,
            boardLabel: "RECOMMENDATION LAST",
            boardSubtitle: "Human searches the options",
            annotations: [
              {
                id: "human-searches-options",
                number: "01",
                x: 56,
                y: 38,
                category: "human-authority",
                title: "Human searches the options",
                observation:
                  "The person must scan the schedule and compare possible times manually.",
                meaning:
                  "The human retains both final authority and the comparison work the AI could have performed.",
                rightHolder: "Human",
                cardSide: "right",
              },
              {
                id: "rules-unsynthesized",
                number: "02",
                x: 36,
                y: 61,
                category: "visible-reasoning",
                title: "Rules remain unsynthesized",
                observation:
                  "Working hours, time zones, lunch periods, and meeting density are visible, but the person must determine how they affect the answer.",
                meaning:
                  "The system exposes its inputs without applying them on the person's behalf.",
                rightHolder: "Human",
                cardSide: "right",
              },
              {
                id: "recommendation-arrives-last",
                number: "03",
                x: 54,
                y: 88,
                category: "authority-problem",
                title: "Recommendation arrives last",
                observation:
                  "The system reveals its conclusion only after the person has already searched for it.",
                meaning:
                  "AI is under-delegated. Human control is preserved, but unnecessary cognitive work remains human.",
                rightHolder: "Human",
                cardSide: "right",
              },
            ],
          },
        },
        {
          id: "recommendation-first",
          image: recommendationFirst,
          alt:
            "Meeting scheduling interface that presents the recommended time first, followed by its reasoning, alternatives, and final scheduling controls.",
          imageFit: "contain",
          number: "02",
          title: "Recommendation First",
          type: "Interactive Example",
          description:
            "The system synthesizes the same constraints into a recommended time, explains why it fits, and keeps alternatives and the final scheduling action available to the person.",
          caption:
            "AI performs the synthesis it is suited for while the person retains the authority to accept, change, or reject the recommendation.",
          canvas: {
            id: "system-purpose-comparison",
            eyebrow: "INTERACTIVE COMPARISON",
            title: "Where synthesis authority belongs",
            description:
              "The same scheduling information produces two different experiences depending on where synthesis authority belongs.",
            portalImage: systemPurposePortal,
            boardLabel: "RECOMMENDATION FIRST",
            boardSubtitle: "AI synthesizes the options",
            annotations: [
              {
                id: "ai-recommends-best-match",
                number: "01",
                x: 57,
                y: 20,
                category: "ai-delegation",
                title: "AI recommends the best match",
                observation:
                  "The assistant compares the available options and presents the strongest match first.",
                meaning:
                  "AI receives authority to rank options—not authority to schedule the meeting.",
                rightHolder: "AI",
                cardSide: "left",
              },
              {
                id: "reasoning-inspectable",
                number: "02",
                x: 66,
                y: 42,
                category: "visible-reasoning",
                title: "Reasoning remains inspectable",
                observation:
                  "Availability, conflicts, working hours, and preferences remain available for inspection.",
                meaning:
                  "Delegating synthesis does not require hiding how the recommendation was formed.",
                rightHolder: "Shared",
                cardSide: "left",
              },
              {
                id: "alternatives-available",
                number: "03",
                x: 48,
                y: 70,
                category: "human-authority",
                title: "Alternatives remain available",
                observation:
                  "The recommendation narrows attention without becoming the only available path.",
                meaning:
                  "The person can reject the AI's conclusion without abandoning the task.",
                rightHolder: "Human",
                cardSide: "left",
              },
              {
                id: "human-final-decision",
                number: "04",
                x: 58,
                y: 88,
                category: "human-authority",
                title: "Human makes the final decision",
                observation:
                  "The assistant may recommend a time. Nothing is scheduled or sent until the person confirms.",
                meaning:
                  "Commitment authority remains human.",
                rightHolder: "Human",
                cardSide: "left",
              },
            ],
          },
        },
      ],
    },
    {
      id: "system-strategy",
      label: "System Strategy",
      accentStellarType: "strategy",
      semantics: {
        keywords: [
          "strategy",
          "policy",
          "constraints",
          "thresholds",
          "escalation",
          "governance",
        ],
        aliases: ["operating logic", "how"],
        summary:
          "The policies, constraints, thresholds, and acceptable methods that translate purpose into operating logic.",
      },
      subtitle: "How human intent becomes operating logic.",
      readingTime: 2,
      content:
        "System strategy translates purpose into policies, constraints, thresholds, evidence requirements, and acceptable methods. It determines how competing goals are weighed and which conditions require escalation.\n\nThis is often the least visible layer. Teams may agree on a responsible purpose while allowing implementation choices, optimization targets, or model behavior to quietly redefine it. The system still appears aligned because the stated goal has not changed, but its operating logic has.\n\nStrategy is usually a shared layer. AI can recommend methods and adapt within context, but the boundaries governing those adaptations must remain visible and contestable.",
      insight:
        "Strategy is where human intent either becomes structural or quietly disappears.",
    },
    {
      id: "ai-decision",
      label: "AI Decision",
      accentStellarType: "agentic",
      semantics: {
        keywords: [
          "AI decision",
          "automation",
          "delegation",
          "classification",
          "routing",
          "recommendation",
        ],
        aliases: ["agentic decision", "automated decision", "decide"],
        summary:
          "A decision delegated to AI within visible purpose, constraints, confidence thresholds, and escalation conditions.",
      },
      subtitle: "What can be delegated without surrendering the system.",
      readingTime: 2,
      content:
        "AI decisions include classification, routing, prioritization, recommendations, and routine actions made within established boundaries. These are the moments most people notice because they produce visible outcomes.\n\nDelegation at this layer can be useful. A system does not need human permission for every low-risk decision if its purpose, constraints, confidence thresholds, and escalation conditions are well governed.\n\nThe danger appears when repeated execution begins changing the rules that were meant to contain it. Decision authority has expanded into strategic authority, often without an explicit handoff.",
      insight:
        "Delegating a decision is not the same as delegating the authority to define the conditions under which it is made.",
    },
    {
      id: "human-approval",
      label: "Human Approval",
      accentStellarType: "judgment",
      semantics: {
        keywords: [
          "human approval",
          "oversight",
          "review",
          "accountability",
          "judgment",
          "human in the loop",
        ],
        aliases: ["human review", "HITL", "approval step"],
        summary:
          "The conditions under which human review preserves meaningful authority instead of merely performing approval.",
      },
      subtitle: "Why a final review can create the appearance of control.",
      readingTime: 2,
      content:
        "Human-in-the-loop is often treated as a safety guarantee: the AI proposes and a person approves. But approval only preserves authority when the reviewer has enough context, time, alternatives, and permission to meaningfully disagree.\n\nWhen people review too many outputs, inherit invisible assumptions, or can only accept and reject what the system has already framed, approval becomes ceremonial. A human is present, but the consequential choices were made earlier.\n\nSome integrity and review steps may eventually be automated as well. That does not automatically make the system unsafe. It makes the upstream questions more important: who defined the evaluator's purpose, which standards govern it, and where can a person still redirect the system?",
      insight:
        "A person can approve every output while controlling none of the assumptions that produced it.",
    },
  ],
});