import { defineAtlasEntry } from "../defineAtlasEntry";

import baselineModal from "../../../imports/frameworks/regenerative-systems/01-drift-detection/baseline-modal.png";
import unconstrainedGeneration from "../../../imports/frameworks/regenerative-systems/01-drift-detection/unconstrained-generation.png";
import preservationConstrained from "../../../imports/frameworks/regenerative-systems/01-drift-detection/preservation-constrained.png";
import regenerativeSystemsPortal from "../../../imports/frameworks/regenerative-systems/regenerative-systems-portal.jpg";

export default defineAtlasEntry({
  id: "regenerative-systems",
  aliases: ["regenerative-design", "preservation-architecture"],
  semantics: {
    keywords: [
      "regenerative systems",
      "drift detection",
      "design integrity",
      "structural invariants",
      "preservation architecture",
      "guided regeneration",
      "integrity verification",
    ],
    aliases: [
      "regenerative design",
      "system preservation",
      "coherence architecture",
      "drift resistance",
    ],
    summary:
      "A framework for detecting drift, preserving critical relationships, guiding regeneration, and verifying that system integrity survives change.",
  },
  category: "framework",
  frameworkKind: "core",
  signatureStellarType: "relational",
  title: "REGENERATIVE SYSTEMS",
  subtitle:
    "A framework for detecting drift, preserving critical relationships, and guiding intelligent systems back toward integrity.",
  tags: ["DRIFT", "PRESERVATION", "SYSTEM INTEGRITY"],
  overview: {
    what:
      "A framework for evolving intelligent systems without losing the relationships that define their identity.",
    why:
      "AI-assisted generation can produce locally successful interfaces while quietly changing hierarchy, workflow, operational density, authority, or meaning.",
    researchFocus:
      "How can a system identify, evaluate, and resist coherence violations without relying solely on carefully engineered prompts?",
    keyDiscovery:
      "Regeneration is not the preservation of pixels. It is the preservation of the relationships that keep a system coherent while its artifacts change.",
  },
  presentation: {
    mode: "example-led",
    sequenceLabel: "REGENERATION LOOP",
    railLabel: "EXPLORE THE CANVAS",
    artifactLabel: "",
    emptyRailMessage:
      "Drift maps and preservation tools will appear here as the framework develops.",
  },
  orbit: {
    angle: 150,
    radius: 112,
    speed: 1.05e-4,
    starPrefix: "rs",
  },
  overviewStars: [
    {
      id: "drift-detection",
      label: "DRIFT DETECTION",
      angle: -154,
      x: -1.08,
      y: -0.42,
      scale: 1.14,
      stellarType: "risk",
      intensity: "bright",
      labelPosition: { side: "top", offset: 30 },
    },
    {
      id: "invariant-preservation",
      label: "INVARIANT PRESERVATION",
      angle: -78,
      x: -0.18,
      y: -1.04,
      scale: 1.06,
      stellarType: "purpose",
      intensity: "balanced",
      labelPosition: { side: "right", offset: 30 },
    },
    {
      id: "guided-regeneration",
      label: "GUIDED REGENERATION",
      angle: -12,
      x: 1.02,
      y: -0.18,
      scale: 1.18,
      stellarType: "relational",
      intensity: "bright",
      labelPosition: { side: "right", offset: 30 },
    },
    {
      id: "integrity-verification",
      label: "INTEGRITY VERIFICATION",
      angle: 84,
      x: 0.18,
      y: 0.92,
      scale: 0.98,
      stellarType: "judgment",
      intensity: "balanced",
      labelPosition: { side: "left", offset: 30 },
    },
  ],
  constellation: {
    showCenterConnections: false,
    connections: [
      {
        from: "drift-detection",
        to: "invariant-preservation",
        strength: "primary",
        type: "evidences",
        rationale:
          "Detected drift becomes meaningful only when it can be compared with an explicit relationship the system was meant to preserve.",
      },
      {
        from: "invariant-preservation",
        to: "guided-regeneration",
        strength: "primary",
        type: "guards",
        rationale:
          "Invariants constrain regeneration so the affected layer can change without quietly rewriting the system around it.",
      },
      {
        from: "guided-regeneration",
        to: "integrity-verification",
        strength: "primary",
        type: "applies",
        rationale:
          "A regenerated artifact must be tested against the preserved relationships rather than accepted because it appears improved.",
      },
      {
        from: "integrity-verification",
        to: "drift-detection",
        strength: "secondary",
        type: "extends",
        rationale:
          "Verification reveals remaining or newly introduced drift and returns that evidence to the next regeneration cycle.",
      },
    ],
  },
  sections: [
    {
      id: "drift-detection",
      label: "Drift Detection",
      accentStellarType: "risk",
      semantics: {
        keywords: [
          "drift detection",
          "structural drift",
          "authority drift",
          "semantic drift",
          "cognitive drift",
          "coherence",
        ],
        aliases: ["design drift", "relationship drift"],
        summary:
          "The practice of recognizing when an evolving artifact has changed a relationship that gives the system its identity.",
      },
      subtitle: "What changed beneath the surface.",
      readingTime: 3,
      content:
        "Drift occurs when an evolving system changes a relationship that matters even though the new artifact may still look polished or function correctly. The change may be structural, such as a compact approval flow becoming a large analysis interface. It may redistribute authority, increase the work required to reach a decision, or subtly reassign a user's role through language.\n\nDetection therefore begins with comparison, not preference. Teams examine the generated state against the original workflow and ask which relationships moved: hierarchy, density, sequence, decision ownership, semantic intent, or recovery behavior. A visible difference is not automatically drift, and a visually consistent result is not automatically coherent.\n\nThe current experiments provide strong evidence for structural and authority drift, and promising evidence for semantic drift. Cognitive drift remains a working hypothesis that requires more deliberate measurement.",
      insight:
        "A system can remain visually successful while becoming structurally or semantically less faithful to what it was designed to preserve.",
      evidence: [
        {
          id: "baseline-modal",
          image: baselineModal,
          alt:
            "Compact vendor exception approval modal showing the original hierarchy, request context, and Cancel and Approve Exception actions.",
          imageFit: "contain",
          number: "01",
          title: "Baseline System",
          type: "Interactive Example",
          description:
            "The original compact approval flow establishes the relationships against which later generations can be evaluated.",
          caption:
            "The baseline is not a perfect answer. It is the evidence of the hierarchy, density, authority, and semantics that existed before generation.",
          canvas: {
            id: "regenerative-systems-comparison",
            eyebrow: "INTERACTIVE COMPARISON",
            title: "What generation changes",
            description:
              "The same request evolves differently depending on whether the system is instructed to preserve its original structure, meaning, and authority.",
            portalImage: regenerativeSystemsPortal,
            boardLabel: "BASELINE",
            boardSubtitle: "Original system",
            boardHeight: 817,
            transitionLabels: ["DRIFT EMERGES", "PRESERVATION CONSTRAINS"],
            annotations: [
              {
                id: "original-hierarchy",
                number: "01",
                x: 51,
                y: 31,
                category: "invariant-preservation",
                title: "The original hierarchy is compact",
                observation:
                  "The request, its risk context, and the consequential actions remain visible within one focused approval surface.",
                meaning:
                  "This establishes compact hierarchy and operational density as candidate relationships to preserve—not pixels to freeze.",
                rightHolder: "Human",
                footerLabel: "BASELINE SIGNAL",
                footerValue: "STRUCTURE",
                cardSide: "right",
              },
              {
                id: "original-authority",
                number: "02",
                x: 61,
                y: 72,
                category: "human-authority",
                title: "Decision authority remains explicit",
                observation:
                  "The person may approve the exception or leave the decision without the system interpreting the request on their behalf.",
                meaning:
                  "Human authority is visible in the action structure and becomes a relationship later generations should not obscure.",
                rightHolder: "Human",
                footerLabel: "BASELINE SIGNAL",
                footerValue: "AUTHORITY",
                cardSide: "left",
              },
              {
                id: "original-semantics",
                number: "03",
                x: 41,
                y: 72,
                category: "semantic-drift",
                title: "Cancel has a specific meaning",
                observation:
                  "The secondary action exits without expressing a decision about the request.",
                meaning:
                  "Action language is part of the baseline. Changing it later may alter the user's role even when the layout remains compact.",
                rightHolder: "Human",
                footerLabel: "BASELINE SIGNAL",
                footerValue: "SEMANTICS",
                cardSide: "right",
              },
            ],
          },
        },
        {
          id: "unconstrained-generation",
          image: unconstrainedGeneration,
          alt:
            "Expanded vendor exception modal with a large AI-powered analysis section, policy concerns, compliance impact, and a recommendation.",
          imageFit: "contain",
          number: "02",
          title: "Unconstrained Generation",
          type: "Interactive Example",
          description:
            "A simple request to add AI assistance expands the interface and makes AI interpretation the dominant center of the workflow.",
          caption:
            "The generated artifact adds capability while changing the structure through which the person understands and decides.",
          canvas: {
            id: "regenerative-systems-comparison",
            eyebrow: "INTERACTIVE COMPARISON",
            title: "What generation changes",
            description:
              "The same request evolves differently depending on whether the system is instructed to preserve its original structure, meaning, and authority.",
            portalImage: regenerativeSystemsPortal,
            boardLabel: "UNCONSTRAINED GENERATION",
            boardSubtitle: "AI becomes the interpretive center",
            boardHeight: 1070,
            transitionLabels: ["DRIFT EMERGES", "PRESERVATION CONSTRAINS"],
            annotations: [
              {
                id: "structural-expansion",
                number: "01",
                x: 51,
                y: 48,
                category: "structural-drift",
                title: "The workflow expands around AI",
                observation:
                  "The compact approval surface becomes a much taller analysis interface with several new interpretive layers.",
                meaning:
                  "Local capability was added by changing the original hierarchy, density, and interaction cadence.",
                rightHolder: "Shared",
                footerLabel: "OBSERVED DRIFT",
                footerValue: "STRUCTURAL",
                cardSide: "right",
              },
              {
                id: "ai-interpretive-center",
                number: "02",
                x: 53,
                y: 62,
                category: "authority-drift",
                title: "AI becomes the interpreter",
                observation:
                  "Risk, policy, compliance, and a recommended decision are framed through the AI's analysis before the person acts.",
                meaning:
                  "Formal approval remains human, but interpretive authority shifts toward the system.",
                rightHolder: "Shared",
                footerLabel: "OBSERVED DRIFT",
                footerValue: "AUTHORITY",
                cardSide: "left",
              },
              {
                id: "original-content-secondary",
                number: "03",
                x: 51,
                y: 25,
                category: "cognitive-drift",
                title: "Original context becomes secondary",
                observation:
                  "The request still exists, but it now serves as input to a larger AI narrative rather than the center of review.",
                meaning:
                  "This suggests cognitive drift, but the effect on decision quality still requires deliberate measurement.",
                rightHolder: "Shared",
                footerLabel: "WORKING HYPOTHESIS",
                footerValue: "COGNITIVE",
                cardSide: "right",
              },
              {
                id: "formal-authority-remains",
                number: "04",
                x: 61,
                y: 93,
                category: "human-authority",
                title: "Formal authority remains human",
                observation:
                  "The person still approves the exception through the final action.",
                meaning:
                  "The evidence supports a shift in interpretive emphasis, not the claim that the AI took final decision authority.",
                rightHolder: "Human",
                footerLabel: "AUTHORITY CHECK",
                footerValue: "FINAL DECISION",
                cardSide: "left",
              },
            ],
          },
        },
        {
          id: "preservation-constrained",
          image: preservationConstrained,
          alt:
            "Compact vendor exception modal generated with preservation constraints, keeping the original density while adding a subordinate compliance note.",
          imageFit: "contain",
          number: "03",
          title: "Preservation-Constrained Generation",
          type: "Interactive Example",
          description:
            "The same AI assistance is regenerated with explicit constraints protecting hierarchy, density, workflow, and human authority.",
          caption:
            "Preservation constraints materially influence the output, but the result still requires verification for unresolved semantic change.",
          canvas: {
            id: "regenerative-systems-comparison",
            eyebrow: "INTERACTIVE COMPARISON",
            title: "What generation changes",
            description:
              "The same request evolves differently depending on whether the system is instructed to preserve its original structure, meaning, and authority.",
            portalImage: regenerativeSystemsPortal,
            boardLabel: "PRESERVATION-CONSTRAINED",
            boardSubtitle: "Original relationships largely survive",
            boardHeight: 817,
            transitionLabels: ["DRIFT EMERGES", "PRESERVATION CONSTRAINS"],
            annotations: [
              {
                id: "density-preserved",
                number: "01",
                x: 51,
                y: 35,
                category: "invariant-preservation",
                title: "The original density is preserved",
                observation:
                  "The generated interface remains a compact approval modal instead of expanding into a management workspace.",
                meaning:
                  "Explicit preservation constraints materially changed how the AI responded to the same request.",
                rightHolder: "Shared",
                footerLabel: "PRESERVED INVARIANT",
                footerValue: "STRUCTURE",
                cardSide: "left",
              },
              {
                id: "ai-remains-contextual",
                number: "02",
                x: 51,
                y: 68,
                category: "invariant-preservation",
                title: "AI remains supporting context",
                observation:
                  "The compliance note is visible but subordinate to the request and its decision controls.",
                meaning:
                  "Assistance is added without making AI interpretation the dominant center of the workflow.",
                rightHolder: "Shared",
                footerLabel: "PRESERVED INVARIANT",
                footerValue: "AUTHORITY",
                cardSide: "left",
              },
              {
                id: "decision-remains-visible",
                number: "03",
                x: 61,
                y: 82,
                category: "human-authority",
                title: "The consequential action remains visible",
                observation:
                  "Approval still belongs to the person and remains the strongest action in the surface.",
                meaning:
                  "Human decision authority is preserved while AI supplies contextual support.",
                rightHolder: "Human",
                footerLabel: "PRESERVED INVARIANT",
                footerValue: "DECISION RIGHT",
                cardSide: "left",
              },
              {
                id: "semantic-change-unresolved",
                number: "04",
                x: 41,
                y: 82,
                category: "integrity-verification",
                title: "One semantic change remains unresolved",
                observation:
                  "The secondary action changes from Cancel to Reject Request.",
                meaning:
                  "This may be a clearer workflow action or semantic authority drift. Without the product requirement, verification must preserve the ambiguity rather than declare success.",
                rightHolder: "Human",
                footerLabel: "VERIFICATION FINDING",
                footerValue: "REQUIRES REVIEW",
                cardSide: "right",
              },
            ],
          },
        },
      ],
    },
    {
      id: "invariant-preservation",
      label: "Invariant Preservation",
      accentStellarType: "purpose",
      semantics: {
        keywords: [
          "structural invariants",
          "preservation",
          "hierarchy continuity",
          "workflow continuity",
          "operational density",
          "semantic intent",
        ],
        aliases: ["preservation constraints", "system invariants"],
        summary:
          "The explicit relationships that should remain stable while an intelligent system evolves.",
      },
      subtitle: "What must remain true while artifacts change.",
      readingTime: 2,
      content:
        "An invariant names a relationship that should survive change. It may protect hierarchy continuity, spacing rhythm, navigation predictability, workflow progression, operational density, authority distribution, or semantic intent. Unlike a component specification, it does not require the next artifact to look identical.\n\nPreservation is therefore selective. Teams identify which relationships carry the system's identity and which details may be freely reinterpreted. An approval surface might tolerate new explanatory content while preserving compactness, the prominence of the decision, and the distinction between leaving and rejecting.\n\nIn the current experiments, invariants are expressed as prompt constraints. They measurably influence generation, but they are not yet autonomous guardrails. That distinction matters: prompt discipline demonstrates the value of preservation without proving a complete preservation architecture.",
      insight:
        "Preservation does not freeze the interface. It gives change a set of relationships it is not allowed to quietly erase.",
    },
    {
      id: "guided-regeneration",
      label: "Guided Regeneration",
      accentStellarType: "relational",
      semantics: {
        keywords: [
          "guided regeneration",
          "constraint application",
          "repair",
          "affected layer",
          "recovery",
          "preservation architecture",
        ],
        aliases: ["constrained generation", "regenerative repair"],
        summary:
          "The process of regenerating an affected layer under explicit preservation constraints rather than replacing the surrounding system.",
      },
      subtitle: "How the affected layer changes without rewriting the system.",
      readingTime: 2,
      content:
        "Guided regeneration applies the identified invariants while producing a new candidate state. The goal is not to make the output resemble the baseline at any cost. It is to repair the affected layer while retaining the relationships that continue to serve the system.\n\nThis changes the generation task. Instead of asking only for a desired feature or behavior, the system must also carry forward what may not drift: decision ownership, operational sequence, information density, semantic roles, and the recovery path if the change fails.\n\nToday this guidance is supplied through explicit prompts. A mature regenerative architecture would apply constraints from governed system knowledge, record which ones shaped the result, and escalate when the requested change cannot coexist with them.",
      insight:
        "Repair becomes regenerative when it changes what failed without treating everything around the failure as disposable.",
    },
    {
      id: "integrity-verification",
      label: "Integrity Verification",
      accentStellarType: "judgment",
      semantics: {
        keywords: [
          "integrity verification",
          "invariant evaluation",
          "drift review",
          "audit trail",
          "remaining drift",
          "system integrity",
        ],
        aliases: ["integrity check", "preservation review"],
        summary:
          "The evaluation of a regenerated state against its intended invariants, including documentation of what changed and what remains unresolved.",
      },
      subtitle: "Whether the regenerated system still means what it meant.",
      readingTime: 2,
      content:
        "Integrity verification asks whether the regenerated state actually preserved the relationships it claimed to protect. It compares the candidate with the baseline and the authored invariants, then identifies remaining drift, newly introduced trade-offs, and ambiguities that require human judgment.\n\nVerification prevents visual resemblance from becoming false assurance. A compact modal may preserve density while changing Cancel into Reject, which could clarify the workflow or quietly alter the user's role. The correct conclusion depends on the product requirement, so the system must surface the change rather than label the generation successful.\n\nThis is also where regeneration becomes a loop. Verification records which constraints held, which failed, and which were incomplete. That evidence returns to drift detection and improves the next repair rather than hiding the history of change.",
      insight:
        "A regenerated artifact is not trustworthy because it looks restored. It is trustworthy when preserved relationships and unresolved changes are made inspectable.",
    },
  ],
});
