import { defineAtlasEntry } from "../defineAtlasEntry";

import genericArtifact from "../../../imports/experiments/think-like-a-designer/a-generic.png";
import contextArtifact from "../../../imports/experiments/think-like-a-designer/b-user-context.png";
import reflectionArtifact from "../../../imports/experiments/think-like-a-designer/c-after-reflection.png";
import portalImage from "../../../imports/experiments/think-like-a-designer/think-like-a-designer-portal.jpg";

const focus = {
  headline: "Think Like a Designer",
  subheadline:
    "Can AI move beyond user context and reconsider the assumptions behind its own design?",
  sections: [
    {
      id: "question",
      label: "Question",
      accentStellarType: "purpose",
      subtitle: "Can AI reconsider the problem behind its own design?",
      readingTime: 1,
      content: `The experiment begins with a deliberately generic instruction:

“Design a mobile medication management app.”

The first output is polished and usable, but it is generic by construction. It presents upcoming medication, daily status, medication lists, reminders, and adherence messaging without revealing a clear understanding of one particular person's needs.

The question is not whether AI can generate a usable interface. It can.

The question is whether the system can recognize when the assumptions behind that interface no longer fit the person it is designing for.`,
      insight:
        "A usable interface can still be based on assumptions about a user who does not exist.",
    },
    {
      id: "context",
      label: "Context",
      accentStellarType: "relational",
      subtitle: "What changes when the model knows who it is designing for?",
      readingTime: 2,
      content: `The second prompt introduces a specific user: a 72-year-old stroke survivor managing eight medications throughout the day, with deteriorating eyesight, mild memory loss, anxiety around missed doses, occasional family support, and a desire to remain independent.

The redesigned interface improves immediately. Typography is larger. Status communication is clearer. The schedule is simplified. “All caught up!” and the next dose become more prominent. Family support is surfaced.

But the underlying solution remains recognizable.

The system has more information about the person, yet it still largely behaves like a medication dashboard.

The persona changes the interface. It does not fully change the model's assumptions about what the interface should be.`,
      insight:
        "Context improved the solution without fully changing the problem the system believed it was solving.",
    },
    {
      id: "reflection",
      label: "Reflection",
      accentStellarType: "agentic",
      subtitle: "What assumptions are now incorrect?",
      readingTime: 2,
      content: `Instead of supplying another feature request or more user information, the experiment interrupts generation with one question:

“Based on the design you created, what assumptions are now incorrect?”

This changes the task.

Context says: here is more information. Generate again.

Reflection asks the model to compare its existing solution assumptions against what it now knows about the person.

The third design begins to behave differently. It confirms what was already taken. It says “It's not time yet.” It creates an explicit path for “I'm not sure if I took them.” Family, voice, and support become accessible without taking over the experience.

The interface is no longer only organizing medication. It is helping the person understand their state with greater certainty.`,
      insight:
        "Reflection changed what the interface believed the user needed from it.",
    },
    {
      id: "finding",
      label: "Finding",
      accentStellarType: "judgment",
      subtitle: "The difference wasn't more context. It was reflection.",
      readingTime: 1,
      content: `The three states reveal a progression.

A — GENERIC PROMPT

The system designs around medication management.

B — USER CONTEXT

The system adapts medication management to a specific person.

C — AFTER REFLECTION

The system reconsiders what that person actually needs the experience to do.

The largest shift is not visual. It is conceptual.

The interface moves from managing medication toward supporting certainty.

Designers do not simply absorb research and continue executing the same solution. New information causes us to revisit our assumptions about the problem itself.

If AI is becoming part of the design process, the missing step may not be more prompting. It may be teaching the system to reflect before it generates again.`,
      insight:
        "More context can improve a solution. Reflection can change the solution being pursued.",
      evidence: [
        {
          id: "think-designer-generic",
          image: genericArtifact,
          alt: "Generic medication management mobile interface generated from a prompt with no user context.",
          imageFit: "contain",
          number: "01",
          title: "A — Generic Prompt",
          type: "Experiment Artifact",
          description:
            "A polished but broadly applicable medication dashboard generated without a defined user.",
          caption:
            "The interface manages medication effectively, but its assumptions are generic.",
          canvas: {
            id: "think-like-a-designer-comparison",
            eyebrow: "INTERACTIVE COMPARISON",
            title: "What changed after reflection",
            description:
              "Compare the generic prompt, user-context redesign, and reflected redesign to see how the model's assumptions changed.",
            portalImage,
            boardLabel: "A — GENERIC PROMPT",
            boardSubtitle: "No user context · Medication management as the default solution",
            boardHeight: 1260,
            transitionLabels: ["ADD USER CONTEXT", "ASK AI TO REFLECT"],
            annotations: [
              {
                id: "a-default-dashboard",
                number: "01",
                x: 48,
                y: 44,
                category: "encoded-cognition",
                title: "Generic dashboard assumptions",
                observation:
                  "The screen prioritizes next medication, summary counts, and a medication list.",
                meaning:
                  "The system assumes that organizing medication data is the primary problem to solve.",
                rightHolder: "AI",
                footerLabel: "ASSUMPTION",
                footerValue: "MEDICATION MANAGEMENT",
                cardSide: "right",
              },
              {
                id: "a-independent-recall",
                number: "02",
                x: 47,
                y: 70,
                category: "capability-focus",
                title: "Perfect recall is assumed",
                observation:
                  "The interface offers status and reminders but no explicit support for uncertainty about whether a dose was already taken.",
                meaning:
                  "The workflow assumes the person can reliably interpret and remember their medication state.",
                rightHolder: "AI",
                footerLabel: "ASSUMPTION",
                footerValue: "RECALL",
                cardSide: "right",
              },
            ],
          },
        },
        {
          id: "think-designer-context",
          image: contextArtifact,
          alt: "Medication management interface redesigned with an older adult medication persona.",
          imageFit: "contain",
          number: "02",
          title: "B — User Context",
          type: "Experiment Artifact",
          description:
            "The same product redesigned after receiving a specific user profile.",
          caption:
            "Context improves accessibility and clarity while preserving much of the original solution model.",
          canvas: {
            id: "think-like-a-designer-comparison",
            eyebrow: "INTERACTIVE COMPARISON",
            title: "What changed after reflection",
            description:
              "Compare the generic prompt, user-context redesign, and reflected redesign to see how the model's assumptions changed.",
            boardLabel: "B — USER CONTEXT",
            boardSubtitle: "Specific persona · Better adaptation, similar underlying solution",
            boardHeight: 1260,
            transitionLabels: ["ADD USER CONTEXT", "ASK AI TO REFLECT"],
            annotations: [
              {
                id: "b-clarity",
                number: "01",
                x: 50,
                y: 34,
                category: "expectation-clarity",
                title: "Context improves clarity",
                observation:
                  "Larger type, a simplified next-dose surface, and explicit “All caught up!” messaging respond to the user's visual and cognitive needs.",
                meaning:
                  "The persona meaningfully changes presentation and reassurance.",
                rightHolder: "Shared",
                footerLabel: "CONTEXT EFFECT",
                footerValue: "ACCESSIBILITY",
                cardSide: "right",
              },
              {
                id: "b-same-model",
                number: "02",
                x: 51,
                y: 67,
                category: "capability-focus",
                title: "The solution model remains",
                observation:
                  "The interface is still organized primarily as a medication schedule and management dashboard.",
                meaning:
                  "More context improves the existing answer without fully reconsidering whether the original answer is the right one.",
                rightHolder: "AI",
                footerLabel: "ASSUMPTION",
                footerValue: "PRESERVED",
                cardSide: "right",
              },
            ],
          },
        },
        {
          id: "think-designer-reflection",
          image: reflectionArtifact,
          alt: "Medication support interface redesigned after the AI reflected on incorrect assumptions in its previous design.",
          imageFit: "contain",
          number: "03",
          title: "C — After Reflection",
          type: "Experiment Artifact",
          description:
            "The redesigned interface after asking the model which assumptions in its previous design were now incorrect.",
          caption:
            "Reflection changes the experience from a medication dashboard toward support for certainty and anxiety reduction.",
          canvas: {
            id: "think-like-a-designer-comparison",
            eyebrow: "INTERACTIVE COMPARISON",
            title: "What changed after reflection",
            description:
              "Compare the generic prompt, user-context redesign, and reflected redesign to see how the model's assumptions changed.",
            boardLabel: "C — AFTER REFLECTION",
            boardSubtitle: "Assumptions reconsidered · Certainty becomes the primary experiential need",
            boardHeight: 1260,
            transitionLabels: ["ADD USER CONTEXT", "ASK AI TO REFLECT"],
            annotations: [
              {
                id: "c-reassurance",
                number: "01",
                x: 47,
                y: 18,
                category: "expectation-clarity",
                title: "Reassurance before action",
                observation:
                  "The interface begins by confirming that today's medication has already been taken.",
                meaning:
                  "The system now treats certainty about current state as a primary user need.",
                rightHolder: "Shared",
                footerLabel: "REVISED ASSUMPTION",
                footerValue: "CERTAINTY",
                cardSide: "right",
              },
              {
                id: "c-uncertainty-path",
                number: "02",
                x: 50,
                y: 62,
                category: "behavioral-sequencing",
                title: "Uncertainty becomes a valid state",
                observation:
                  "“I'm not sure if I took them” is now an explicit path rather than an edge case the user must solve alone.",
                meaning:
                  "The design stops assuming perfect recall and gives the person a safe recovery path.",
                rightHolder: "Human",
                footerLabel: "REVISED ASSUMPTION",
                footerValue: "MEMORY",
                cardSide: "right",
              },
              {
                id: "c-support",
                number: "03",
                x: 72,
                y: 88,
                category: "human-authority",
                title: "Support without removing independence",
                observation:
                  "Family, voice, and help are available as support layers while the primary workflow remains usable by the person.",
                meaning:
                  "The design recognizes assistance as optional scaffolding rather than replacing the user's agency.",
                rightHolder: "Human",
                footerLabel: "REVISED ASSUMPTION",
                footerValue: "SUPPORT",
                cardSide: "left",
              },
            ],
          },
        },
      ],
    },
  ],
};

export default defineAtlasEntry({
  id: "think-like-a-designer",
  category: "experiment",
  signatureStellarType: "agentic",
  title: "THINK LIKE A DESIGNER",
  subtitle: focus.subheadline,
  tags: ["AI DESIGN", "REFLECTION", "ASSUMPTIONS", "USER CONTEXT"],
  overview: {
    what:
      "A three-state experiment testing whether more user context is enough to improve AI-generated design—or whether the model also needs to reflect on the assumptions behind its existing solution.",
    why:
      "Designers do not move directly from research to execution. New information changes what we believe the problem is, and AI-assisted design may need the same reflective step.",
    researchFocus:
      "Comparing a generic medication interface, a redesign with a specific user profile, and a third redesign after asking the model which assumptions in its previous solution were now incorrect.",
    keyDiscovery:
      "More context improved the interface. Reflection changed its underlying priorities.",
  },
  presentation: {
    mode: "example-led",
    sequenceLabel: "EXPERIMENT",
    railLabel: "EVIDENCE",
    artifactLabel: "ARTIFACT",
    emptyRailMessage: "Evidence appears as the experiment develops.",
  },
  orbit: {
    angle: 118,
    radius: 118,
    speed: 1.06e-4,
    starPrefix: "tlad",
  },
  overviewStars: [
    {
      id: "question",
      label: "QUESTION",
      angle: -148,
      x: -1.02,
      y: -0.42,
      scale: 0.92,
      stellarType: "purpose",
      intensity: "balanced",
      labelPosition: { side: "left", offset: 32 },
    },
    {
      id: "context",
      label: "CONTEXT",
      angle: -64,
      x: 0.20,
      y: -1.12,
      scale: 0.96,
      stellarType: "relational",
      intensity: "balanced",
      labelPosition: { side: "top", offset: 34 },
    },
    {
      id: "reflection",
      label: "REFLECTION",
      angle: 18,
      x: 1.18,
      y: 0.12,
      scale: 1.22,
      stellarType: "agentic",
      intensity: "bright",
      labelPosition: { side: "right", offset: 34 },
    },
    {
      id: "finding",
      label: "FINDING",
      angle: 126,
      x: -0.42,
      y: 1.02,
      scale: 0.92,
      stellarType: "judgment",
      intensity: "balanced",
      labelPosition: { side: "bottom", offset: 32 },
    },
  ],
  constellation: {
    showCenterConnections: false,
    connections: [
      { from: "question", to: "context", strength: "primary" },
      { from: "context", to: "reflection", strength: "primary" },
      { from: "reflection", to: "finding", strength: "primary" },
      { from: "finding", to: "question", strength: "secondary" },
    ],
  },
  sections: focus.sections,
});
