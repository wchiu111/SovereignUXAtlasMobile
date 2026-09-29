import { defineAtlasEntry } from "../defineAtlasEntry";

import chatgptArtifact from "../../../imports/experiments/design-philosophy/a-chatgpt.png";
import sovereignArtifact from "../../../imports/experiments/design-philosophy/b-sovereign-ux.png";
import designPhilosophyPortal from "../../../imports/experiments/design-philosophy/design-philosophy-portal.jpg";

const sharedCanvas = {
  id: "design-philosophy-two-model-comparison",
  eyebrow: "INTERACTIVE COMPARISON",
  title: "Where design philosophy becomes visible",
  description:
    "Compare two interfaces generated from the same hiring-assistant brief and inspect how hierarchy, language, and CTA placement reveal different assumptions about decision ownership.",
};

const focus = {
  headline: "Design Philosophy",
  subheadline:
    "What does an interface reveal about what a model believes should own the decision?",
  sections: [
    {
      id: "prompt",
      label: "Prompt",
      accentStellarType: "purpose",
      subtitle: "Same brief. No authority instructions.",
      readingTime: 1,
      content: `Both models received the exact same brief:

“Design the primary interface for an AI hiring assistant that helps recruiters evaluate and recommend job candidates. The interface should support reviewing applicants, comparing candidates, and arriving at a hiring recommendation.”

The prompt did not mention trust, authority, human oversight, or decision ownership.

That is the control condition.

The experiment is not asking which model follows an authority prompt more faithfully. It asks what authority model emerges when nobody explicitly tells the system who should lead the decision.`,
      insight:
        "The prompt controls the task. It does not fully control the philosophy behind how that task is organized.",
    },
    {
      id: "outputs",
      label: "Outputs",
      accentStellarType: "relational",
      subtitle:
        "The interfaces look similar until you inspect what each one prioritizes.",
      readingTime: 2,
      content: `At first glance, the outputs are remarkably similar.

Both use familiar enterprise patterns: a candidate list, a candidate detail view, match scores, comparison tools, recommendation content, and a three-panel information architecture.

That similarity is useful because aesthetics stop being the main variable.

The divergence appears when the hierarchy is studied more closely.

One interface organizes the experience around the AI recommendation. The other keeps recruiter evaluation as the center of the workflow while AI contributes from the side.

The components are similar. The relationship between human and AI is not.`,
      insight:
        "Two interfaces can share the same components while encoding different decision models.",
    },
    {
      id: "authority",
      label: "Authority",
      accentStellarType: "agentic",
      subtitle:
        "Who does the interface behave as though should own the decision?",
      readingTime: 3,
      content: `A — CHATGPT

The right rail is organized around an AI Hiring Recommendation. Candidate ranking, recommendation confidence, and the explanation of how the AI reached its conclusion culminate in “Move to Interview.”

The recruiter can still inspect the candidate and approve the next step, but the system has already framed the answer.

AI recommends. Human approves.

B — SOVEREIGN UX AGENT

The candidate profile, experience, match breakdown, strengths, and activity remain the dominant center of the interface.

AI Insights, comparison support, and a recommendation remain available, but they occupy a supporting rail rather than becoming the primary narrative.

Human evaluates. AI contributes.

The difference is not a feature. It is an authority relationship expressed through hierarchy, sequencing, language, and action placement.`,
      insight:
        "Authority is encoded through hierarchy, sequencing, CTA placement, and language long before anyone labels it as authority.",
      evidence: [
        {
          id: "design-philosophy-chatgpt",
          image: chatgptArtifact,
          alt:
            "ChatGPT-generated AI hiring assistant organized around AI recommendation, ranking, confidence, and a Move to Interview action.",
          imageFit: "contain",
          number: "01",
          title: "A — ChatGPT",
          type: "Experiment Artifact",
          description:
            "An AI hiring assistant where the recommendation panel frames the workflow and the recruiter approves the suggested next step.",
          caption:
            "AI recommendation leads the hierarchy; human action follows the AI verdict.",
          canvas: {
            ...sharedCanvas,
            portalImage: designPhilosophyPortal,
            boardLabel: "A — CHATGPT",
            boardSubtitle: "AI recommendation leads · Human approves",
            boardHeight: 700,
            annotations: [
              {
                id: "chatgpt-recommendation-hierarchy",
                number: "01",
                x: 84,
                y: 25,
                category: "authority-drift",
                title: "Recommendation dominates hierarchy",
                observation:
                  "The right rail opens with an AI Hiring Recommendation, confidence, and explanation of how the system reached its conclusion.",
                meaning:
                  "The interface frames the candidate through the AI verdict before the recruiter reaches the final action.",
                rightHolder: "AI",
                footerLabel: "AUTHORITY SIGNAL",
                footerValue: "RECOMMENDATION",
                cardSide: "left",
              },
              {
                id: "chatgpt-cta",
                number: "02",
                x: 84,
                y: 78,
                category: "ai-delegation",
                title: "The CTA follows the AI verdict",
                observation:
                  "“Move to Interview” sits directly beneath ranking and recommendation content.",
                meaning:
                  "The human still clicks the button, but the decision path is structurally authored upstream by AI.",
                rightHolder: "Shared",
                footerLabel: "AUTHORITY SIGNAL",
                footerValue: "ACTION FLOW",
                cardSide: "left",
              },
            ],
          },
        },
        {
          id: "design-philosophy-sovereign",
          image: sovereignArtifact,
          alt:
            "Sovereign UX Agent AI hiring assistant organized around recruiter evaluation, with AI insights and recommendation in a supporting rail.",
          imageFit: "contain",
          number: "02",
          title: "B — Sovereign UX Agent",
          type: "Experiment Artifact",
          description:
            "An AI hiring assistant where recruiter evaluation remains central and AI contributes contextual support.",
          caption:
            "Human evaluation leads the hierarchy; AI remains present without becoming the primary decision narrator.",
          canvas: {
            ...sharedCanvas,
            boardLabel: "B — SOVEREIGN UX AGENT",
            boardSubtitle: "Human evaluation leads · AI contributes",
            boardHeight: 700,
            annotations: [
              {
                id: "sovereign-evidence-central",
                number: "01",
                x: 51,
                y: 50,
                category: "human-authority",
                title: "Candidate evidence remains central",
                observation:
                  "Profile context, experience, match breakdown, strengths, and recent activity occupy the dominant reading surface.",
                meaning:
                  "The recruiter evaluates the candidate through source evidence instead of starting from a machine-authored conclusion.",
                rightHolder: "Human",
                footerLabel: "AUTHORITY SIGNAL",
                footerValue: "EVALUATION",
                cardSide: "right",
              },
              {
                id: "sovereign-ai-contextual",
                number: "02",
                x: 84,
                y: 31,
                category: "human-authority",
                title: "AI is contextual, not central",
                observation:
                  "AI Insights, candidate comparison, and Recommendation live in the supporting rail.",
                meaning:
                  "AI contributes interpretation while the recruiter-led evaluation remains the primary workflow.",
                rightHolder: "Human",
                footerLabel: "AUTHORITY SIGNAL",
                footerValue: "AI ROLE",
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
      subtitle:
        "AI doesn't just generate interfaces. It generates design philosophy.",
      readingTime: 2,
      content: `The visual differences between the two outputs are less important than the reasoning they expose.

The experiment suggests three layers behind AI-assisted design.

FOUNDATION

General design knowledge: layout, spacing, SaaS conventions, and familiar interaction patterns. Every capable model has access to some version of this layer.

INSTRUCTION

The model's worldview: what problems it notices, what it prioritizes, and who it assumes should own decisions.

RELATIONSHIP

The accumulated effect of critique, refinement, and repeated correction over time. This layer cannot simply be added as one more prompt. It has to be cultivated.

The more important shift may not be AI replacing wireframes.

It may be designers increasingly shaping the reasoning that precedes the wireframe: principles, heuristics, evaluation criteria, and assumptions about the relationship between people and AI.

The future of prompt engineering is not only describing interfaces. It is teaching design thinking.`,
      insight:
        "The output becomes a reflection of the reasoning system that produced it.",
    },
  ],
};

export default defineAtlasEntry({
  id: "design-philosophy",
  category: "experiment",
  signatureStellarType: "judgment",
  title: "DESIGN PHILOSOPHY",
  subtitle: focus.subheadline,
  tags: ["AI DESIGN", "AUTHORITY", "MODEL BEHAVIOR", "DESIGN REASONING"],
  overview: {
    what:
      "A comparative experiment testing whether two AI models given the exact same design brief encode different assumptions about who should own the decision.",
    why:
      "AI-generated interfaces can look visually similar while encoding very different assumptions about who should interpret, recommend, approve, and decide.",
    researchFocus:
      "Comparing panel hierarchy, recommendation framing, interaction flow, and CTA ownership across two outputs generated from the same hiring-assistant brief.",
    keyDiscovery:
      "Similar interfaces can encode fundamentally different relationships between human and AI.",
  },
  presentation: {
    mode: "example-led",
    sequenceLabel: "EXPERIMENT",
    railLabel: "EVIDENCE",
    artifactLabel: "ARTIFACT",
    emptyRailMessage: "Evidence appears as the experiment develops.",
  },
  orbit: {
    angle: 196,
    radius: 126,
    speed: 0.000104,
    starPrefix: "dphi",
  },
  overviewStars: [
    {
      id: "prompt",
      label: "PROMPT",
      angle: -164,
      x: -1.18,
      y: -0.20,
      scale: 0.92,
      stellarType: "purpose",
      intensity: "balanced",
      labelPosition: { side: "left", offset: 32 },
    },
    {
      id: "outputs",
      label: "OUTPUTS",
      angle: -72,
      x: -0.12,
      y: -1.05,
      scale: 0.98,
      stellarType: "relational",
      intensity: "balanced",
      labelPosition: { side: "top", offset: 32 },
    },
    {
      id: "authority",
      label: "AUTHORITY",
      angle: 18,
      x: 1.15,
      y: 0.12,
      scale: 1.18,
      stellarType: "agentic",
      intensity: "bright",
      labelPosition: { side: "right", offset: 34 },
    },
    {
      id: "finding",
      label: "FINDING",
      angle: 112,
      x: 0.28,
      y: 1.10,
      scale: 0.94,
      stellarType: "judgment",
      intensity: "balanced",
      labelPosition: { side: "bottom", offset: 32 },
    },
  ],
  constellation: {
    showCenterConnections: false,
    connections: [
      { from: "prompt", to: "outputs", strength: "primary" },
      { from: "outputs", to: "authority", strength: "primary" },
      { from: "authority", to: "finding", strength: "primary" },
    ],
  },
  sections: focus.sections,
});
