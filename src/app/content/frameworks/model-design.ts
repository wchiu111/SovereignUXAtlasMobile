import { defineAtlasEntry } from "../defineAtlasEntry";
import traditionalAi from "../../../imports/frameworks/behavioral-architecture/01-governance/traditional-ai.jpg";
import behavioralArchitecture from "../../../imports/frameworks/behavioral-architecture/01-governance/behavioral-architecture.jpg";
import behavioralArchitecturePortal from "../../../imports/frameworks/behavioral-architecture/behavioral-architecture-portal.jpg";

export default defineAtlasEntry({
  id: "behavioral-architecture",
  aliases: ["model-design"],
  semantics: {
    keywords: [
      "behavioral architecture",
      "model behavior",
      "AI governance",
      "constraints",
      "behavioral integrity",
      "recovery",
      "alignment",
    ],
    aliases: [
      "model design",
      "alignment architecture",
      "behavioral infrastructure",
      "system character",
    ],
    summary:
      "A framework for designing the structures around an AI model that preserve trustworthy behavior over time.",
  },
  category: "framework",
  frameworkKind: "core",
  signatureStellarType: "strategy",
  title: "BEHAVIORAL ARCHITECTURE",
  subtitle:
    "A framework for designing the governance, constraints, integrity signals, and recovery capacity that shape how an AI system behaves over time.",
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
  presentation: {
    mode: "map-led",
    sequenceLabel: "BEHAVIORAL LOOP",
    railLabel: "EXPLORE THE CANVAS",
    artifactLabel: "",
    emptyRailMessage:
      "Behavior maps and evaluation tools will appear here as the framework develops.",
  },
  orbit: {
    angle: 30,
    radius: 112,
    speed: 0.92e-4,
    starPrefix: "ba",
  },
  overviewStars: [
    {
      id: "governance",
      label: "GOVERNANCE",
      angle: -160,
      x: -1.08,
      y: -0.4,
      scale: 1.2,
      stellarType: "purpose",
      intensity: "bright",
      labelPosition: { side: "top", offset: 30 },
    },
    {
      id: "constraints",
      label: "CONSTRAINTS",
      angle: -128,
      x: -0.87,
      y: -1.1,
      scale: 0.98,
      stellarType: "risk",
      intensity: "balanced",
      labelPosition: { side: "right", offset: 30 },
    },
    {
      id: "behavioral-integrity",
      label: "BEHAVIORAL INTEGRITY",
      angle: -93,
      x: -0.05,
      y: -0.97,
      scale: 1.12,
      stellarType: "judgment",
      intensity: "bright",
      labelPosition: { side: "right", offset: 30 },
    },
    {
      id: "regenerative-capacity",
      label: "REGENERATIVE CAPACITY",
      angle: -30,
      x: 0.92,
      y: -0.53,
      scale: 1.02,
      stellarType: "relational",
      intensity: "balanced",
      labelPosition: { side: "left", offset: 30 },
    },
  ],
  constellation: {
    showCenterConnections: false,
    connections: [
      {
        from: "governance",
        to: "constraints",
        strength: "primary",
        type: "extends",
        rationale:
          "Governance becomes operational when authority, intent, and accountability are translated into explicit system boundaries.",
      },
      {
        from: "constraints",
        to: "behavioral-integrity",
        strength: "primary",
        type: "guards",
        rationale:
          "Visible constraints create the standards against which actual system behavior can be evaluated.",
      },
      {
        from: "behavioral-integrity",
        to: "regenerative-capacity",
        strength: "primary",
        type: "evidences",
        rationale:
          "Integrity signals reveal when behavior has moved away from stated purpose or operating boundaries and recovery is required.",
      },
      {
        from: "regenerative-capacity",
        to: "governance",
        strength: "secondary",
        type: "applies",
        rationale:
          "Recovery turns observed failures into governance changes so the system does not repeatedly regenerate the same misalignment.",
      },
    ],
  },
  sections: [
    {
      id: "governance",
      label: "Governance",
      accentStellarType: "purpose",
      semantics: {
        keywords: [
          "governance",
          "decision ownership",
          "change authority",
          "escalation",
          "intervention",
          "accountability",
        ],
        aliases: ["system governance", "control structure"],
        summary:
          "The structural logic that determines who may define, evaluate, redirect, or stop system behavior.",
      },
      subtitle: "Who has the authority to shape and redirect behavior.",
      readingTime: 2,
      content:
        "Governance defines who may establish the system's purpose, change its operating rules, evaluate its behavior, and intervene when it begins to drift. It turns responsibility into an explicit structure instead of leaving it distributed across product decisions, model settings, and informal team assumptions.\n\nThis is related to Authority Gradient, but it asks a different question. Authority Gradient locates where meaningful human authority should remain. Governance determines how that authority is exercised: who can redirect the system, which changes require review, what conditions trigger escalation, and where accountability ultimately sits.\n\nWithout governance, system behavior can still change. It simply changes through updates, optimization pressure, accumulated exceptions, and automated decisions that no one clearly owns.",
      insight:
        "If no one can clearly explain who may change or stop the system, its behavior is already being governed by something else.",
      evidence: [
        {
          id: "traditional-ai",
          image: traditionalAi,
          alt:
            "Traditional AI coding assistant that leads with changed files, line counts, a code diff, and approve or reject controls.",
          imageFit: "contain",
          number: "01",
          title: "Traditional AI",
          type: "Interactive Example",
          description:
            "The interface exposes the generated artifact first, leaving the person to infer whether the behavior that produced it was trustworthy.",
          caption:
            "Capability is visible. Governance, operating boundaries, validation, and recovery remain implicit.",
          canvas: {
            id: "behavioral-architecture-comparison",
            eyebrow: "INTERACTIVE COMPARISON",
            title: "Where trust comes from",
            description:
              "The code is unchanged. What changes is the trust architecture surrounding it.",
            portalImage: behavioralArchitecturePortal,
            boardLabel: "TRADITIONAL AI",
            boardSubtitle: "Trust centers on the artifact",
            transitionFrom: "ARTIFACT-BASED TRUST",
            transitionTo: "SYSTEM-BASED TRUST",
            annotations: [
              {
                id: "artifact-leads",
                number: "01",
                x: 54,
                y: 15,
                category: "capability-focus",
                title: "The artifact leads",
                observation:
                  "The interaction begins with what the AI generated and how much code changed.",
                meaning:
                  "The output becomes the primary evidence offered to the person evaluating the AI.",
                rightHolder: "AI",
                footerLabel: "TRUST BASIS",
                footerValue: "OUTPUT",
                cardSide: "right",
              },
              {
                id: "capability-becomes-evidence",
                number: "02",
                x: 52,
                y: 30,
                category: "capability-focus",
                title: "Capability becomes evidence",
                observation:
                  "File counts, changed lines, packages, and estimated time saved describe the scale of the work.",
                meaning:
                  "These signals show activity, but they do not establish whether the AI acted within legitimate boundaries.",
                rightHolder: "AI",
                footerLabel: "VISIBLE SIGNAL",
                footerValue: "CAPABILITY",
                cardSide: "right",
              },
              {
                id: "trust-remains-implicit",
                number: "03",
                x: 60,
                y: 68,
                category: "authority-problem",
                title: "Trust remains implicit",
                observation:
                  "The person can inspect the diff, approve it, or reject it, but must decide for themselves whether the process was safe.",
                meaning:
                  "The interface exposes implementation while leaving governance, validation, and recovery outside the decision.",
                rightHolder: "Human",
                footerLabel: "TRUST WORK",
                footerValue: "INFERRED BY HUMAN",
                cardSide: "right",
              },
            ],
          },
        },
        {
          id: "behavioral-architecture",
          image: behavioralArchitecture,
          alt:
            "AI coding assistant that explains governance, constraints, behavioral integrity, and regenerative capacity before showing implementation details.",
          imageFit: "contain",
          number: "02",
          title: "Behavioral Architecture",
          type: "Interactive Example",
          description:
            "The interface makes the behavioral system surrounding the AI visible before asking the person to trust its output.",
          caption:
            "Trust shifts from the artifact to the governed, bounded, observable, and recoverable process that produced it.",
          canvas: {
            id: "behavioral-architecture-comparison",
            eyebrow: "INTERACTIVE COMPARISON",
            title: "Where trust comes from",
            description:
              "The code is unchanged. What changes is the trust architecture surrounding it.",
            portalImage: behavioralArchitecturePortal,
            boardLabel: "BEHAVIORAL ARCHITECTURE",
            boardSubtitle: "Trust centers on the system",
            transitionFrom: "ARTIFACT-BASED TRUST",
            transitionTo: "SYSTEM-BASED TRUST",
            annotations: [
              {
                id: "governance-visible",
                number: "01",
                x: 58,
                y: 31,
                category: "governance",
                title: "Governance establishes authority",
                observation:
                  "The interface identifies the project owner and makes required approval explicit.",
                meaning:
                  "The AI operates within delegated authority rather than appearing to act independently.",
                rightHolder: "Human",
                footerLabel: "BEHAVIORAL LAYER",
                footerValue: "GOVERNANCE",
                cardSide: "left",
              },
              {
                id: "constraints-visible",
                number: "02",
                x: 58,
                y: 36,
                category: "constraints",
                title: "Constraints define the envelope",
                observation:
                  "The system states which module may change, how many files are targeted, and which rules remain enforced.",
                meaning:
                  "The person can understand the operating boundaries before inspecting the implementation.",
                rightHolder: "Shared",
                footerLabel: "BEHAVIORAL LAYER",
                footerValue: "CONSTRAINTS",
                cardSide: "left",
              },
              {
                id: "integrity-visible",
                number: "03",
                x: 58,
                y: 41,
                category: "behavioral-integrity",
                title: "Behavior becomes observable",
                observation:
                  "Tests, policy consistency, and affected scope show whether the AI remained within its stated boundaries.",
                meaning:
                  "Trust is supported by evidence of conduct, not merely confidence in the generated artifact.",
                rightHolder: "Shared",
                footerLabel: "BEHAVIORAL LAYER",
                footerValue: "INTEGRITY",
                cardSide: "left",
              },
              {
                id: "recovery-visible",
                number: "04",
                x: 58,
                y: 46,
                category: "regenerative-capacity",
                title: "Recovery is prepared",
                observation:
                  "A rollback snapshot is created before the proposed change is applied.",
                meaning:
                  "The person is not asked to trust perfection. They can trust that failure has a governed recovery path.",
                rightHolder: "Shared",
                footerLabel: "BEHAVIORAL LAYER",
                footerValue: "REGENERATIVE CAPACITY",
                cardSide: "left",
              },
              {
                id: "artifact-becomes-evidence",
                number: "05",
                x: 61,
                y: 72,
                category: "visible-reasoning",
                title: "The artifact becomes supporting evidence",
                observation:
                  "Files, lines, packages, and the complete diff remain available for detailed review.",
                meaning:
                  "Implementation evidence still matters, but it no longer carries the entire burden of trust.",
                rightHolder: "Human",
                footerLabel: "TRUST BASIS",
                footerValue: "SYSTEM + OUTPUT",
                cardSide: "left",
              },
            ],
          },
        },
      ],
    },
    {
      id: "constraints",
      label: "Constraints",
      accentStellarType: "risk",
      semantics: {
        keywords: [
          "constraints",
          "boundaries",
          "capability limits",
          "prohibited actions",
          "confidence thresholds",
          "scope",
        ],
        aliases: ["guardrails", "system limits", "operating boundaries"],
        summary:
          "The deliberate and visible limits that give an intelligent system a recognizable operating shape.",
      },
      subtitle: "Why trustworthy systems require deliberate limits.",
      readingTime: 2,
      content:
        "Constraints define what the system may do, what it must not do, and which conditions require confirmation, refusal, or escalation. They include capability boundaries, prohibited actions, confidence thresholds, required evidence, and clear statements about the limits of the system's role.\n\nConstraints are often treated as restrictions added after capability has been designed. In Behavioral Architecture, they are part of the system's identity. A system becomes more understandable when users can anticipate where it will act, where it will pause, and where human judgment must re-enter.\n\nThe strongest constraints are not hidden safety mechanisms. They are reflected in the interaction itself through visible boundaries, honest uncertainty, and behavior that remains consistent when pressure increases.",
      insight:
        "A system without meaningful constraints does not have greater intelligence. It has less definition.",
    },
    {
      id: "behavioral-integrity",
      label: "Behavioral Integrity",
      accentStellarType: "judgment",
      semantics: {
        keywords: [
          "behavioral integrity",
          "behavioral fidelity",
          "promise versus behavior",
          "evaluation",
          "drift detection",
          "consistency",
        ],
        aliases: ["behavioral alignment", "behavior consistency"],
        summary:
          "The degree to which actual system behavior remains consistent with its stated purpose, promises, and boundaries.",
      },
      subtitle: "Whether the system behaves like the system it claims to be.",
      readingTime: 2,
      content:
        "Behavioral Integrity examines whether the system's actual conduct remains consistent with its stated purpose and operating boundaries across different users, contexts, and levels of pressure. It compares what the system promises with what it repeatedly does.\n\nThis requires more than measuring output quality. Teams must observe authority creep, assumption disclosure, boundary violations, inconsistent refusals, changes introduced by updates, and differences between routine and high-risk behavior. A system may remain accurate while becoming less transparent, more forceful, or harder to redirect.\n\nIntegrity signals make those changes visible. They provide evidence that governance and constraints are shaping behavior in practice rather than existing only as documentation.",
      insight:
        "Alignment is not proven by what the system says about itself. It is revealed through repeated behavior.",
    },
    {
      id: "regenerative-capacity",
      label: "Regenerative Capacity",
      accentStellarType: "relational",
      semantics: {
        keywords: [
          "regenerative capacity",
          "recovery",
          "repair",
          "drift correction",
          "rollback",
          "safe re-entry",
        ],
        aliases: ["system recovery", "behavioral repair", "regeneration"],
        summary:
          "The system's capacity to recognize, contain, and recover from behavioral misalignment without concealing what changed.",
      },
      subtitle: "How the system returns when alignment begins to drift.",
      readingTime: 2,
      content:
        "Regenerative Capacity determines what happens after behavioral integrity begins to fail. It includes detecting the affected layer, containing harmful behavior, restoring prior boundaries, correcting memory or context, and re-entering safely after a failure.\n\nRecovery should not quietly rewrite the system's purpose in order to make a failure disappear. It should preserve a record of what changed, clarify which intervention restored alignment, and escalate when the system cannot repair itself within its legitimate authority.\n\nRegenerative Systems explores these repair mechanics in greater depth. Within Behavioral Architecture, regenerative capacity establishes a simpler requirement: trustworthy behavior must include a governed way to return from misalignment.",
      insight:
        "A trustworthy system is not one that never fails. It is one that can recover without hiding the failure or repeating its cause.",
    },
  ],
});
