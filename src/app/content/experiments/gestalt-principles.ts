import { defineAtlasEntry } from "../defineAtlasEntry";

import output01 from "../../../imports/experiments/gestalt-principles/output-01.png";
import output02 from "../../../imports/experiments/gestalt-principles/output-02.png";
import output03 from "../../../imports/experiments/gestalt-principles/output-03.png";
import output04 from "../../../imports/experiments/gestalt-principles/output-04.png";
import output05 from "../../../imports/experiments/gestalt-principles/output-05.png";
import gestaltPortal from "../../../imports/experiments/gestalt-principles/gestalt-principles-portal.jpg";

const sharedCanvas = {
  id: "gestalt-five-output-comparison",
  boardWidth: 620,
  eyebrow: "INTERACTIVE COMPARISON",
  title: "How each model organizes perception",
  description:
    "Compare five anonymous responses to the same habit-tracking prompt through Proximity, Similarity, Continuity, and Closure.",
  transitionLabels: [
    "SAME PROMPT",
    "SAME PROMPT",
    "SAME PROMPT",
    "SAME PROMPT",
  ],
};

const focus = {
  headline: "Gestalt Principles",
  subheadline: "Can AI understand why an interface works?",
  sections: [
    {
      id: "question",
      label: "Question",
      accentStellarType: "purpose",
      subtitle: "Can AI understand why an interface works?",
      readingTime: 1,
      content: `AI can generate polished interfaces quickly. But visual polish does not necessarily mean the system understands the perceptual relationships that make an interface easy to read.

This experiment evaluates generated interfaces through four Gestalt principles that have shaped visual design for decades:

PROXIMITY — Related information should feel grouped through spatial relationships.

SIMILARITY — Shared visual characteristics should communicate relationships.

CONTINUITY — Visual organization should guide the eye through information.

CLOSURE — People should be able to perceive complete structures without every boundary being explicitly drawn.

The goal is not to rank aesthetics. It is to test whether perceptual structure emerges from the model without being explicitly requested.`,
      insight:
        "The benchmark is not which model makes the prettiest interface. It is which model best understands human perception.",
    },
    {
      id: "test",
      label: "Test",
      accentStellarType: "relational",
      subtitle: "One prompt. Five models. Four principles.",
      readingTime: 1,
      content: `Every model received the same prompt:

“Design a mobile habit tracking dashboard.”

No style direction. No component requirements. No design system. No Gestalt instructions. The outputs were then evaluated through the same four lenses: Proximity, Similarity, Continuity, and Closure. Keeping the prompt deliberately minimal makes the differences in visual organization easier to compare.`,
      insight:
        "The experiment tests what perceptual organization emerges naturally from each model—not whether a model can follow explicit Gestalt instructions.",
    },
    {
      id: "outputs",
      label: "Outputs",
      accentStellarType: "judgment",
      subtitle: "Five anonymous interpretations of the same prompt",
      readingTime: 2,
      content: `The five outputs are shown together with their model attribution so the comparison can be read directly in context. Rather than treating model identity as a separate reveal, inspect the relationships inside each interface:

What feels grouped?
What looks related?
Where does the eye move next?
How much structure depends on containers rather than perceptual relationships?

Open the canvas to compare all five outputs side by side.`,
      insight:
        "Evaluate the interface first. Reveal the model second.",
      evidence: [
        {
          id: "gestalt-output-01",
          image: output01,
          alt: "Anonymous Output 01 from the Gestalt Principles experiment.",
          imageFit: "contain",
          number: "01",
          title: "Output 01",
          type: "Experiment Artifact",
          description:
            "An anonymous habit-tracking dashboard generated from the shared prompt.",
          caption:
            "A competent modern interface with clear repetition, but much of its grouping is carried by explicit containers.",
          canvas: {
            ...sharedCanvas,
            portalImage: gestaltPortal,
            boardLabel: "OUTPUT 01",
            boardSubtitle: "Figma Make · Generated output",
            boardHeight: 1220,
            annotations: [
              {
                id: "o1-similarity",
                number: "01",
                x: 46,
                y: 59,
                category: "visible-reasoning",
                title: "Similarity works",
                observation:
                  "Habit rows repeat the same anatomy, progress treatment, typography, and interaction pattern.",
                meaning:
                  "The repetition makes separate habits immediately recognizable as members of the same system.",
                rightHolder: "Shared",
                footerLabel: "GESTALT LENS",
                footerValue: "SIMILARITY · WORKING",
                cardSide: "right",
              },
              {
                id: "o1-proximity",
                number: "02",
                x: 49,
                y: 31,
                category: "capability-focus",
                title: "Proximity is doing less work",
                observation:
                  "Progress, metrics, and habit groups are understandable, but nearly every relationship is reinforced by a card or container.",
                meaning:
                  "The interface is coherent, but the composition relies more on explicit enclosure than on spacing alone to establish relationships.",
                rightHolder: "Shared",
                footerLabel: "GESTALT LENS",
                footerValue: "PROXIMITY · MIXED",
                cardSide: "right",
              },
              {
                id: "o1-closure",
                number: "03",
                x: 46,
                y: 78,
                category: "capability-focus",
                title: "Closure is underused",
                observation:
                  "Most groups are fully bounded rather than allowing the eye to complete implied structures.",
                meaning:
                  "The design stays legible, but it gives perception less work to do because containment is explicit almost everywhere.",
                rightHolder: "Shared",
                footerLabel: "GESTALT LENS",
                footerValue: "CLOSURE · LIMITED",
                cardSide: "right",
              },
            ],
          },
        },
        {
          id: "gestalt-output-02",
          image: output02,
          alt: "Anonymous Output 02 from the Gestalt Principles experiment.",
          imageFit: "contain",
          number: "02",
          title: "Output 02",
          type: "Experiment Artifact",
          description:
            "A second anonymous interpretation of the identical habit-tracking prompt.",
          caption:
            "The strongest balance of grouping, consistency, and top-to-bottom reading flow in the set.",
          canvas: {
            ...sharedCanvas,
            boardLabel: "OUTPUT 02",
            boardSubtitle: "ChatGPT · Generated output",
            boardHeight: 1220,
            annotations: [
              {
                id: "o2-proximity",
                number: "01",
                x: 47,
                y: 35,
                category: "visible-reasoning",
                title: "Proximity is strong",
                observation:
                  "Date, progress, and habit information form distinct groups without losing the relationship between them.",
                meaning:
                  "Spacing and grouping make the screen scannable before the user reads individual labels.",
                rightHolder: "Shared",
                footerLabel: "GESTALT LENS",
                footerValue: "PROXIMITY · WORKING",
                cardSide: "right",
              },
              {
                id: "o2-continuity",
                number: "02",
                x: 48,
                y: 58,
                category: "visible-reasoning",
                title: "Continuity guides the eye",
                observation:
                  "The composition establishes a predictable vertical path from date to progress to today's habits.",
                meaning:
                  "The user can move through the dashboard in a natural sequence with very little visual backtracking.",
                rightHolder: "Shared",
                footerLabel: "GESTALT LENS",
                footerValue: "CONTINUITY · WORKING",
                cardSide: "right",
              },
            ],
          },
        },
        {
          id: "gestalt-output-03",
          image: output03,
          alt: "Anonymous Output 03 from the Gestalt Principles experiment.",
          imageFit: "contain",
          number: "03",
          title: "Output 03",
          type: "Experiment Artifact",
          description:
            "A third anonymous interpretation of the identical habit-tracking prompt.",
          caption:
            "Clear and orderly, but the composition reads more like an information architecture exercise than a finished mobile interface.",
          canvas: {
            ...sharedCanvas,
            boardLabel: "OUTPUT 03",
            boardSubtitle: "Claude · Generated output",
            boardHeight: 1220,
            annotations: [
              {
                id: "o3-similarity",
                number: "01",
                x: 42,
                y: 64,
                category: "visible-reasoning",
                title: "Similarity is clear",
                observation:
                  "Every habit row follows the same simple pattern and completion states are immediately distinguishable.",
                meaning:
                  "The interface establishes a reliable component grammar with very little ambiguity.",
                rightHolder: "Shared",
                footerLabel: "GESTALT LENS",
                footerValue: "SIMILARITY · WORKING",
                cardSide: "right",
              },
              {
                id: "o3-continuity",
                number: "02",
                x: 50,
                y: 42,
                category: "capability-focus",
                title: "Continuity feels flattened",
                observation:
                  "Summary metrics, weekly progress, and the habit list are stacked clearly, but the visual transitions between them carry little momentum.",
                meaning:
                  "The information is organized, yet the screen feels assembled as sections rather than choreographed as a mobile flow.",
                rightHolder: "Shared",
                footerLabel: "GESTALT LENS",
                footerValue: "CONTINUITY · MIXED",
                cardSide: "right",
              },
            ],
          },
        },
        {
          id: "gestalt-output-04",
          image: output04,
          alt: "Anonymous Output 04 from the Gestalt Principles experiment.",
          imageFit: "contain",
          number: "04",
          title: "Output 04",
          type: "Experiment Artifact",
          description:
            "A fourth anonymous interpretation of the identical habit-tracking prompt.",
          caption:
            "Familiar and highly explicit, but dense status signals compete with the core habit hierarchy.",
          canvas: {
            ...sharedCanvas,
            boardLabel: "OUTPUT 04",
            boardSubtitle: "Gemini · Generated output",
            boardHeight: 1220,
            annotations: [
              {
                id: "o4-similarity",
                number: "01",
                x: 51,
                y: 64,
                category: "visible-reasoning",
                title: "Similarity creates recognition",
                observation:
                  "Habit rows use a highly consistent rounded-row pattern, icon placement, status language, and progress treatment.",
                meaning:
                  "The repeated anatomy makes each item easy to identify as part of the same habit system.",
                rightHolder: "Shared",
                footerLabel: "GESTALT LENS",
                footerValue: "SIMILARITY · WORKING",
                cardSide: "right",
              },
              {
                id: "o4-proximity",
                number: "02",
                x: 57,
                y: 58,
                category: "capability-focus",
                title: "Proximity becomes crowded",
                observation:
                  "Progress bars, streak counts, completion timestamps, emojis, and actions cluster tightly within each row.",
                meaning:
                  "Related information is close together, but too many signals compete inside the same perceptual group.",
                rightHolder: "Shared",
                footerLabel: "GESTALT LENS",
                footerValue: "PROXIMITY · OVERLOADED",
                cardSide: "left",
              },
            ],
          },
        },
        {
          id: "gestalt-output-05",
          image: output05,
          alt: "Anonymous Output 05 from the Gestalt Principles experiment.",
          imageFit: "contain",
          number: "05",
          title: "Output 05",
          type: "Experiment Artifact",
          description:
            "A fifth anonymous interpretation of the identical habit-tracking prompt.",
          caption:
            "Strong perceptual hierarchy with relationships carried by spacing, repetition, and restrained containers.",
          canvas: {
            ...sharedCanvas,
            boardLabel: "OUTPUT 05",
            boardSubtitle: "Sovereign UX · Generated output",
            boardHeight: 1220,
            annotations: [
              {
                id: "o5-proximity",
                number: "01",
                x: 48,
                y: 37,
                category: "visible-reasoning",
                title: "Proximity establishes hierarchy",
                observation:
                  "Progress, supporting metrics, habits, and the closing motivation block form clearly separated perceptual groups.",
                meaning:
                  "Spacing does meaningful organizational work instead of asking borders to define every relationship.",
                rightHolder: "Shared",
                footerLabel: "GESTALT LENS",
                footerValue: "PROXIMITY · WORKING",
                cardSide: "right",
              },
              {
                id: "o5-continuity",
                number: "02",
                x: 50,
                y: 64,
                category: "visible-reasoning",
                title: "Continuity is coherent",
                observation:
                  "The eye moves from orientation to progress to action and finally to supporting motivation in a predictable sequence.",
                meaning:
                  "The composition creates a clear narrative path through the dashboard rather than treating every module as equally important.",
                rightHolder: "Shared",
                footerLabel: "GESTALT LENS",
                footerValue: "CONTINUITY · WORKING",
                cardSide: "right",
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
      subtitle: "Aesthetics are only one part of AI design quality",
      readingTime: 1,
      content: `The most useful comparison was not which interface looked the most modern. It was how consistently each output used perceptual relationships to organize information. The experiment suggests a more meaningful benchmark for AI-generated interfaces:

Which AI model best understands human perception?


If AI is going to become a genuine design partner, perceptual reasoning matters as much as speed or visual novelty.`,
      insight:
        "AI should be evaluated not only by what it generates, but by how well that output supports the way people perceive and organize information.",
    },
  ],
};

export default defineAtlasEntry({
  id: "gestalt-principles",
  category: "experiment",
  signatureStellarType: "relational",
  title: "GESTALT PRINCIPLES",
  subtitle: focus.subheadline,
  tags: ["GESTALT", "HUMAN PERCEPTION", "AI DESIGN"],
  overview: {
    what:
      "A comparative experiment testing whether AI models apply established Gestalt principles when generating an interface.",
    why:
      "AI-generated design is often judged by speed or aesthetics, but perceptual organization may be a more meaningful measure of design understanding.",
    researchFocus:
      "Comparing five model outputs through Proximity, Similarity, Continuity, and Closure.",
    keyDiscovery:
      "The more useful benchmark may be which AI model best understands human perception—not which one generates the prettiest interface.",
  },
  presentation: {
    mode: "example-led",
    sequenceLabel: "EXPERIMENT",
    railLabel: "EVIDENCE",
    artifactLabel: "ARTIFACT",
    emptyRailMessage: "Evidence appears as the experiment develops.",
  },
  orbit: {
    angle: 67,
    radius: 122,
    speed: 1.10e-4,
    starPrefix: "gp",
  },
  overviewStars: [
    {
      id: "question",
      label: "QUESTION",
      angle: -138,
      x: -0.88,
      y: -0.72,
      scale: 0.94,
      stellarType: "purpose",
      intensity: "balanced",
      labelPosition: { side: "left", offset: 30 },
    },
    {
      id: "test",
      label: "TEST",
      angle: -92,
      x: -0.18,
      y: -1.06,
      scale: 1.12,
      stellarType: "relational",
      intensity: "bright",
      labelPosition: { side: "top", offset: 32 },
    },
    {
      id: "outputs",
      label: "OUTPUTS",
      angle: 42,
      x: 0.92,
      y: 0.66,
      scale: 1.16,
      stellarType: "judgment",
      intensity: "bright",
      labelPosition: { side: "right", offset: 30 },
    },
    {
      id: "finding",
      label: "FINDING",
      angle: 92,
      x: 0.18,
      y: 1.08,
      scale: 0.96,
      stellarType: "judgment",
      intensity: "balanced",
      labelPosition: { side: "bottom", offset: 32 },
    },
  ],
  constellation: {
    showCenterConnections: false,
    connections: [
      { from: "question", to: "test", strength: "primary" },
      { from: "test", to: "outputs", strength: "primary" },
      { from: "outputs", to: "finding", strength: "primary" },
    ],
  },
  sections: focus.sections,
});
