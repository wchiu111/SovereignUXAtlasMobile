import { defineAtlasEntry } from "../defineAtlasEntry";

import baselineArtifact from "../../../imports/experiments/authority-drift/a-baseline.png";
import unconstrainedArtifact from "../../../imports/experiments/authority-drift/b-unconstrained-ai.png";
import constrainedArtifact from "../../../imports/experiments/authority-drift/c-authority-constrained.png";
import authorityDriftPortal from "../../../imports/experiments/authority-drift/authority-drift-portal.jpg";

const focus = {
  headline: "Authority Drift",
  subheadline:
    "How AI implementation can quietly rewrite who appears to hold authority inside an existing interface.",
  sections: [
    {
      id: "baseline",
      label: "Baseline",
      accentStellarType: "relational",
      subtitle: "Establish the authority model before AI enters the workflow",
      readingTime: 2,
      content: `The experiment begins with an existing approval experience before AI assistance is introduced. The baseline is deliberately ordinary: a compact review surface where the person can inspect the request, understand the relevant context, and make the final decision.

The important part is not the visual treatment. It is the authority relationship already encoded in the interface. The person is the decision-maker. The system presents information and supports the workflow, but it does not interpret the request on the person's behalf or reposition itself as the author of the decision.

Several relationships matter at baseline. The original information hierarchy remains centered on the request. Operational density stays compact. The person retains the final decision. Decision language remains direct and explicit. AI is not the interpretive center of the experience.

These relationships become the reference point for everything that follows.`,
      insight:
        "Authority drift can only be identified when the original decision relationship is made explicit first.",
    },
    {
      id: "hypothesis",
      label: "Hypothesis",
      accentStellarType: "purpose",
      subtitle: "A capability change may also change the user's role",
      readingTime: 2,
      content: `Adding AI assistance to an existing interface can change more than functionality.

Even when nobody asks the system to redistribute decision rights, generation may alter hierarchy, language, interaction patterns, and the position AI occupies in the workflow.

The experiment asks:

Can an existing product gain AI capability without changing the user's original authority?

The signals to watch are AI hierarchy dominance, recommendation centralization, workflow restructuring around AI analysis, reduced human decision visibility, AI becoming the primary narrative layer, and scope expansion beyond the original interface boundary.

If those relationships move without an explicit product decision, authority has drifted.`,
      insight:
        "A feature request can preserve formal approval while still changing who appears to frame, interpret, or own the decision.",
    },
    {
      id: "ai-intervention",
      label: "AI Intervention",
      accentStellarType: "agentic",
      subtitle: "Compare unconstrained AI with authority-constrained AI",
      readingTime: 3,
      content: `The experiment introduces AI in two conditions.

B — UNCONSTRAINED AI

Starting from the baseline, the system receives a simple instruction to add AI assistance. No explicit authority-preservation constraints are supplied. The generated interface adds useful-looking capability: analysis, risk framing, compliance scoring, and a recommendation. But it also expands the modal and reorganizes the reading order around AI.

C — AUTHORITY CONSTRAINED

The same task is repeated with an Authority Distribution Invariant:

Preserve human workflow primacy. AI insights must remain contextual, lightweight, and subordinate to operational decision-making. The AI contribution contracts into a compact contextual check. The original hierarchy, density, decision controls, and human role remain recognizable.

The comparison isolates the effect of the authority constraint rather than removing AI capability altogether.`,
      insight:
        "The constrained state demonstrates that useful AI assistance does not require the interface to reorganize itself around AI.",
    },
    {
      id: "drift",
      label: "Drift",
      accentStellarType: "risk",
      subtitle: "Diagnose what moved between A and B",
      readingTime: 3,
      content: `Comparing A — Baseline with B — Unconstrained AI reveals six observable signals.

AI HIERARCHY DOMINANCE — The AI analysis becomes the largest interpretive surface.

RECOMMENDATION CENTRALIZATION — The system tells the user what it recommends before the user has completed independent review.

WORKFLOW RESTRUCTURING — The compact approval task expands into a broader AI management surface.

REDUCED HUMAN DECISION VISIBILITY — The human still presses the final button, but the decision is increasingly framed upstream by AI.

AI NARRATIVE DOMINANCE — Policy, risk, compliance, and recommendation become the primary story of the request.

SCOPE EXPANSION — The interface grows beyond the original operational boundary.

The sharpest evidence happens at the word level: Reject becomes Cancel.

That substitution appears small, but it changes the user's relationship to the workflow. The user is no longer simply exercising an independent negative decision; the language now frames the action as leaving the AI-expanded flow.

This is Semantic Authority Drift.`,
      insight:
        "A one-word substitution can encode an authority inversion even when the surrounding workflow still looks familiar.",
    },
    {
      id: "evidence",
      label: "Evidence",
      accentStellarType: "relational",
      subtitle: "Inspect A, B, and C as a three-state comparison",
      readingTime: 3,
      content: `The evidence is the interface itself.

A — BASELINE establishes the original authority relationship.

B — UNCONSTRAINED AI shows what happens when AI capability is added without explicit authority-preservation constraints.

C — AUTHORITY CONSTRAINED shows the same capability added while preserving human workflow primacy.

The interactive comparison keeps each claim attached to the artifact that supports it. Annotation bubbles identify where hierarchy, interpretation, semantic language, and decision authority move—and where the constrained version preserves the baseline relationship.

The comparison should be read as a design experiment, not as a claim that every AI interface will produce the same result.`,
      insight:
        "The strongest evidence is not that B looks different. It is that specific relationships move in B and remain stable again in C.",
      evidence: [
        {
          id: "authority-drift-baseline",
          image: baselineArtifact,
          alt:
            "A — Baseline vendor exception approval modal with request details, justification, and Reject and Approve controls.",
          imageFit: "contain",
          number: "01",
          title: "A — Baseline",
          type: "Interactive Example",
          description:
            "The original compact approval workflow keeps the request and the human decision at the center.",
          caption:
            "A establishes the hierarchy, density, semantics, and decision relationship against which the AI variants are compared.",
          canvas: {
            id: "authority-drift-three-state-comparison",
            eyebrow: "INTERACTIVE COMPARISON",
            title: "Where authority moved",
            description:
              "Compare the same vendor exception workflow across baseline, unconstrained AI, and authority-constrained implementation.",
            portalImage: authorityDriftPortal,
            boardLabel: "A — BASELINE",
            boardSubtitle: "Human-led approval before AI enters the workflow",
            boardHeight: 956,
            transitionLabels: [
              "ADD AI ASSISTANCE",
              "APPLY AUTHORITY CONSTRAINTS",
            ],
            annotations: [
              {
                id: "a-request-primary",
                number: "01",
                x: 49,
                y: 24,
                category: "human-authority",
                title: "The request remains primary",
                observation:
                  "The vendor, request details, and justification occupy the dominant reading path.",
                meaning:
                  "The system supports review without inserting an interpretive layer between the person and the decision.",
                rightHolder: "Human",
                footerLabel: "BASELINE SIGNAL",
                footerValue: "HIERARCHY",
                cardSide: "right",
              },
              {
                id: "a-operational-density",
                number: "02",
                x: 50,
                y: 52,
                category: "invariant-preservation",
                title: "Operational density stays compact",
                observation:
                  "Context is presented directly with no recommendation, scoring, or AI-authored analysis surface.",
                meaning:
                  "The interface remains proportional to the task instead of expanding around machine interpretation.",
                rightHolder: "Human",
                footerLabel: "BASELINE SIGNAL",
                footerValue: "STRUCTURE",
                cardSide: "right",
              },
              {
                id: "a-decision-parity",
                number: "03",
                x: 73,
                y: 91,
                category: "human-authority",
                title: "The user owns the decision",
                observation:
                  "Reject and Approve remain direct decision actions at the end of the review flow.",
                meaning:
                  "The person acts on the request rather than responding to a machine-authored recommendation.",
                rightHolder: "Human",
                footerLabel: "BASELINE SIGNAL",
                footerValue: "AUTHORITY",
                cardSide: "left",
              },
            ],
          },
        },
        {
          id: "authority-drift-unconstrained",
          image: unconstrainedArtifact,
          alt:
            "B — Unconstrained AI vendor exception modal with AI-powered analysis, risk, compliance score, recommendation, and Cancel and Approve Request actions.",
          imageFit: "contain",
          number: "02",
          title: "B — Unconstrained AI",
          type: "Interactive Example",
          description:
            "A simple request to add AI assistance expands the workflow and makes AI interpretation the dominant narrative layer.",
          caption:
            "B adds useful capability while also changing hierarchy, density, reading order, and decision semantics.",
          canvas: {
            id: "authority-drift-three-state-comparison",
            eyebrow: "INTERACTIVE COMPARISON",
            title: "Where authority moved",
            description:
              "Compare the same vendor exception workflow across baseline, unconstrained AI, and authority-constrained implementation.",
            boardLabel: "B — UNCONSTRAINED AI",
            boardSubtitle: "AI reshapes the workflow and leads the narrative",
            boardHeight: 1320,
            transitionLabels: [
              "ADD AI ASSISTANCE",
              "APPLY AUTHORITY CONSTRAINTS",
            ],
            annotations: [
              {
                id: "b-ai-hierarchy",
                number: "01",
                x: 49,
                y: 34,
                category: "structural-drift",
                title: "AI becomes the dominant hierarchy",
                observation:
                  "A large AI-powered analysis surface now sits above the original request details.",
                meaning:
                  "The workflow is reorganized around the system's interpretation before the person reaches the underlying request.",
                rightHolder: "AI",
                footerLabel: "DRIFT SIGNAL",
                footerValue: "HIERARCHY",
                cardSide: "right",
              },
              {
                id: "b-recommendation-centralized",
                number: "02",
                x: 50,
                y: 58,
                category: "authority-drift",
                title: "Recommendation becomes central",
                observation:
                  "Risk framing, compliance scoring, and a recommended course of action arrive before the user's independent decision.",
                meaning:
                  "AI moves from contextual support toward primary narrator and recommender.",
                rightHolder: "AI",
                footerLabel: "DRIFT SIGNAL",
                footerValue: "AUTHORITY",
                cardSide: "right",
              },
              {
                id: "b-request-secondary",
                number: "03",
                x: 35,
                y: 76,
                category: "cognitive-drift",
                title: "The original request becomes secondary",
                observation:
                  "Request details remain available, but they now sit downstream of machine interpretation.",
                meaning:
                  "The user's attention is routed through AI framing before returning to the source material.",
                rightHolder: "Shared",
                footerLabel: "DRIFT SIGNAL",
                footerValue: "ATTENTION",
                cardSide: "right",
              },
              {
                id: "b-semantic-authority",
                number: "04",
                x: 64,
                y: 94,
                category: "semantic-drift",
                title: "Reject becomes Cancel",
                observation:
                  "The negative decision action is reframed as leaving the AI-expanded workflow.",
                meaning:
                  "A one-word change repositions the user from independent decision-maker toward respondent.",
                rightHolder: "AI",
                footerLabel: "AUTHORITY EFFECT",
                footerValue: "SEMANTIC DRIFT",
                cardSide: "left",
              },
            ],
          },
        },
        {
          id: "authority-drift-constrained",
          image: constrainedArtifact,
          alt:
            "C — Authority Constrained vendor exception modal preserving the original request hierarchy with a compact AI Check and Reject and Approve controls.",
          imageFit: "contain",
          number: "03",
          title: "C — Authority Constrained",
          type: "Interactive Example",
          description:
            "AI remains present but subordinate, preserving the original workflow primacy and decision structure.",
          caption:
            "C shows that authority constraints can preserve the human-led workflow without removing AI capability.",
          canvas: {
            id: "authority-drift-three-state-comparison",
            eyebrow: "INTERACTIVE COMPARISON",
            title: "Where authority moved",
            description:
              "Compare the same vendor exception workflow across baseline, unconstrained AI, and authority-constrained implementation.",
            boardLabel: "C — AUTHORITY CONSTRAINED",
            boardSubtitle: "AI assists without reorganizing the workflow",
            boardHeight: 1305,
            transitionLabels: [
              "ADD AI ASSISTANCE",
              "APPLY AUTHORITY CONSTRAINTS",
            ],
            annotations: [
              {
                id: "c-hierarchy-preserved",
                number: "01",
                x: 49,
                y: 30,
                category: "invariant-preservation",
                title: "The original hierarchy is preserved",
                observation:
                  "The request remains the dominant object and keeps essentially the same reading order as A.",
                meaning:
                  "Adding AI does not require reorganizing the experience around AI.",
                rightHolder: "Human",
                footerLabel: "PRESERVED SIGNAL",
                footerValue: "HIERARCHY",
                cardSide: "right",
              },
              {
                id: "c-ai-contextual",
                number: "02",
                x: 50,
                y: 82,
                category: "invariant-preservation",
                title: "AI stays contextual",
                observation:
                  "AI appears as one compact check beneath the user's source material.",
                meaning:
                  "The system supports interpretation without becoming the dominant hierarchy or recommendation layer.",
                rightHolder: "Shared",
                footerLabel: "PRESERVED SIGNAL",
                footerValue: "AI ROLE",
                cardSide: "right",
              },
              {
                id: "c-decision-controls",
                number: "03",
                x: 73,
                y: 95,
                category: "integrity-verification",
                title: "Decision controls remain intact",
                observation:
                  "Reject and Approve are preserved from the baseline.",
                meaning:
                  "The constrained variant demonstrates that AI capability can be added without rewriting the user's decision role.",
                rightHolder: "Human",
                footerLabel: "VERIFIED SIGNAL",
                footerValue: "AUTHORITY",
                cardSide: "left",
              },
            ],
          },
        },
      ],
    },
    {
      id: "finding",
      label: "Finding",
      accentStellarType: "judgment",
      subtitle: "Human involvement is not the same as preserved human authority",
      readingTime: 2,
      content: `The experiment does not show that AI assistance is inherently incompatible with human authority.

It shows something more specific:

Implementation can redistribute authority without explicitly announcing that authority has changed. The system may preserve the final approval action while shifting other forms of power toward AI: attention, framing, interpretation, narrative priority, and decision language.

C also reveals an important limitation. The authority constraint worked because preservation was explicitly specified. That is prompt discipline—not yet preservation architecture.

The open question is what happens after implementation:

Can a system recognize that authority has drifted and repair only what changed without requiring designers to restate the invariant every time? That question leads into regenerative systems, invariant preservation, and repair.`,
      insight:
        "Small interface changes can encode large authority shifts. The next challenge is moving from explicit prompt constraints to systems that can preserve and repair integrity.",
    },
  ],
};

export default defineAtlasEntry({
  id: "authority-drift",
  category: "experiment",
  signatureStellarType: "risk",
  title: "AUTHORITY DRIFT",
  subtitle: focus.subheadline,
  tags: ["HUMAN AUTHORITY", "AI INTERPRETATION"],
  overview: {
    what:
      "An experiment examining how AI implementation can unintentionally change who appears to hold authority within an existing interface.",
    why:
      "AI-generated interfaces can look functionally correct while quietly changing hierarchy, language, and the user's relationship to the system.",
    researchFocus:
      "Whether an existing product can gain AI capabilities without altering the user's original agency, decision role, or semantic authority.",
    keyDiscovery:
      "Small interface changes can encode large authority shifts. A constrained AI state can preserve the original decision model without removing AI capability.",
  },
  presentation: {
    mode: "example-led",
    sequenceLabel: "EXPERIMENT",
    railLabel: "EVIDENCE",
    artifactLabel: "ARTIFACT",
    emptyRailMessage: "Evidence appears as the experiment develops.",
  },
  orbit: {
    angle: 15,
    radius: 122,
    speed: 0.95e-4,
    starPrefix: "ad",
  },
  overviewStars: [
    {
      id: "baseline",
      label: "BASELINE",
      angle: -142,
      x: -0.78,
      y: -0.78,
      scale: 0.9,
      stellarType: "relational",
      intensity: "balanced",
      labelPosition: { side: "left", offset: 30 },
    },
    {
      id: "hypothesis",
      label: "HYPOTHESIS",
      angle: -90,
      x: 0,
      y: -1.08,
      scale: 1.16,
      stellarType: "purpose",
      intensity: "bright",
      labelPosition: { side: "top", offset: 32 },
    },
    {
      id: "ai-intervention",
      label: "AI INTERVENTION",
      angle: -38,
      x: 0.78,
      y: -0.78,
      scale: 0.94,
      stellarType: "agentic",
      intensity: "bright",
      labelPosition: { side: "right", offset: 30 },
    },
    {
      id: "drift",
      label: "DRIFT",
      angle: 142,
      x: -0.78,
      y: 0.78,
      scale: 0.94,
      stellarType: "risk",
      intensity: "bright",
      labelPosition: { side: "left", offset: 30 },
    },
    {
      id: "evidence",
      label: "EVIDENCE",
      angle: 90,
      x: 0,
      y: 1.08,
      scale: 1.16,
      stellarType: "relational",
      intensity: "bright",
      labelPosition: { side: "bottom", offset: 32 },
    },
    {
      id: "finding",
      label: "FINDING",
      angle: 38,
      x: 0.78,
      y: 0.78,
      scale: 0.94,
      stellarType: "judgment",
      intensity: "bright",
      labelPosition: { side: "right", offset: 30 },
    },
  ],
  constellation: {
    showCenterConnections: false,
    connections: [
      { from: "baseline", to: "hypothesis", strength: "primary" },
      { from: "hypothesis", to: "ai-intervention", strength: "primary" },
      { from: "drift", to: "evidence", strength: "primary" },
      { from: "evidence", to: "finding", strength: "primary" },
    ],
  },
  sections: focus.sections,
});
