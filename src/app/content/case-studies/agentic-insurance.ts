import { defineAtlasEntry } from "../defineAtlasEntry";

import layeredClaimsJourney from "../../../imports/case-studies/agentic-insurance/01-context/1-layered-claims-journey.png";
import driverJourney from "../../../imports/case-studies/agentic-insurance/01-context/2-driver-journey.png";
import adjusterJourney from "../../../imports/case-studies/agentic-insurance/01-context/3-adjuster-journey.png";

import blackBoxMoment from "../../../imports/case-studies/agentic-insurance/02-problem/1-the-blackbox-moment.png";
import reasoningGapAnalysis from "../../../imports/case-studies/agentic-insurance/02-problem/2-reasoning-gap-analysis.png";
import initialDashboardAssumption from "../../../imports/case-studies/agentic-insurance/02-problem/3-initial-dashboard-assumption.png";

import postAccidentEntryFlow from "../../../imports/case-studies/agentic-insurance/03-approach/1-post-accident-entry-flow.png";
import guidedEvidenceCapture from "../../../imports/case-studies/agentic-insurance/03-approach/2-guided-evidence-capture.png";
import adjustersClaimOverview from "../../../imports/case-studies/agentic-insurance/03-approach/3-adjusters-claim-overview.png";

import estimateConfidenceExplanation from "../../../imports/case-studies/agentic-insurance/04-decisions/1-estimate-confidence-explaination.png";
import contextualClaimReview from "../../../imports/case-studies/agentic-insurance/04-decisions/2-contextual-claim-review.png";
import editableReserveRecommendation from "../../../imports/case-studies/agentic-insurance/04-decisions/3-editable-reserve-recommendation.png";

import submissionNextStepVisibility from "../../../imports/case-studies/agentic-insurance/05-outcomes/1-submission-next-step-visibility.png";
import claimStabilizationStateOne from "../../../imports/case-studies/agentic-insurance/05-outcomes/2-claim-stabilization-state-1.png";
import claimStabilizationStateTwo from "../../../imports/case-studies/agentic-insurance/05-outcomes/2-claim-stabilization-state-2.png";
import confidenceVsConsequence from "../../../imports/case-studies/agentic-insurance/05-outcomes/3-confidence-vs-consequence.png";

import emotionalRepairLayer from "../../../imports/case-studies/agentic-insurance/06-lessons/1-emotional-repair-layer.png";
import humanOverrideFeedback from "../../../imports/case-studies/agentic-insurance/06-lessons/2-human-override-feedback.png";

const focus = {
  headline: "Agentic Insurance",
  subheadline:
    "Exploring where AI could support insurance decisions—and where real validation still had to begin.",
  sections: [
    {
      id: "context",
      label: "Context",
      accentStellarType: "relational",
      subtitle: "How curiosity became a domain-research problem",
      readingTime: 3,
      content: `This project began while I was interviewing for a product design role at an insurance company.

At first, I was mostly curious about what insurance UX might look like with AI-assisted tools. I assumed there would be opportunities to summarize claims, reduce manual work, and help adjusters move through cases more efficiently.

Once I started researching the role, I realized the domain was far more complicated than I had expected. Claims are influenced by legal requirements, jurisdictional differences, policy language, internal processes, and the judgment of the person reviewing the case.

That changed the direction of the project. Instead of beginning with an interface, I needed to understand the person doing the work.`,
      insight:
        "The project became less about adding AI to insurance and more about learning enough about the role to know where AI should—and should not—intervene.",
      evidence: [
        {
          id: "layered-claims-journey",
          image: layeredClaimsJourney,
          alt: "Layered claims journey map",
          imageFit: "contain",
          number: "01",
          title: "Layered Claims Journey",
          type: "Research Mapping",
          description:
            "An early mapping exercise examining the claims experience across interface behavior, emotional response, assumptions, and moments where human reflection needed to re-enter the process.",
          caption:
            "The map separated what users see from what they may feel, assume, and need after an automated decision.",
        },
        {
          id: "driver-journey",
          image: driverJourney,
          alt: "Driver journey map",
          imageFit: "contain",
          number: "02",
          title: "Driver Journey",
          type: "Journey Map",
          description:
            "A journey model focused on the driver’s need for reassurance, guided evidence capture, and visibility into what happens after submission.",
          caption:
            "The driver journey helped identify where uncertainty builds and where the experience needed to offer clearer orientation and next steps.",
        },
        {
          id: "adjuster-journey",
          image: adjusterJourney,
          alt: "Claims adjuster journey map",
          imageFit: "contain",
          number: "03",
          title: "Claim Adjuster Journey",
          type: "Journey Map",
          description:
            "A parallel journey model focused on the adjuster’s workload, evidence review, regulatory responsibilities, and final decision authority.",
          caption:
            "The adjuster journey clarified that the same claim creates a very different set of information, accountability, and time-pressure needs.",
        },
      ],
    },
    {
      id: "problem",
      label: "The Problem",
      accentStellarType: "risk",
      subtitle: "Designing without direct access to the person doing the work",
      readingTime: 3,
      content: `I did not have direct access to claim adjusters, and I did not know what their typical day looked like.

Without that context, it would have been easy to design a polished AI tool around assumptions that were completely wrong.

The real question became:

Before deciding where AI belongs in the workflow, how do I understand the decisions, pressures, responsibilities, and constraints of the person using it?

This also raised a second problem. In a high-stakes domain, an AI system cannot simply recommend an action and assume the user will trust it. The adjuster needs to understand what the system found, what it may be missing, and why a recommendation is being made.`,
      insight:
        "In a high-stakes domain, the first design risk was not a bad interface. It was solving the wrong problem with confidence.",
      evidence: [
        {
          id: "black-box-moment",
          image: blackBoxMoment,
          alt: "Black-box moment research map",
          imageFit: "contain",
          number: "01",
          title: "The Black-Box Moment",
          type: "Research Finding",
          description:
            "The journey map exposed a mismatch between system speed and human understanding: analysis may happen immediately, while the user is left without visibility into what was reviewed or how the conclusion was reached.",
          caption:
            "The gap between instant processing and delayed human understanding became one of the central problems to investigate.",
        },
        {
          id: "reasoning-gap-analysis",
          image: reasoningGapAnalysis,
          alt: "Reasoning gap analysis system map",
          imageFit: "contain",
          number: "02",
          title: "Reasoning Gap Analysis",
          type: "System Map",
          description:
            "A breakdown of the decision from both the customer and insurance sides, used to identify where historical comparisons, rationale, and additional clarification needed to become visible.",
          caption:
            "The core question became: can the system explain its reasoning back to the person affected by it?",
        },
        {
          id: "initial-dashboard-assumptions",
          image: initialDashboardAssumption,
          alt: "Initial adjuster dashboard assumption",
          imageFit: "contain",
          number: "03",
          title: "Initial Dashboard Assumptions",
          type: "Design Exploration",
          description:
            "The first adjuster concept emphasized AI confidence and generic prioritization before the research exposed the importance of deadlines, jurisdiction, documentation status, and financial exposure.",
          caption:
            "This early version became useful evidence of which assumptions needed to change as the domain became clearer.",
        },
      ],
    },
    {
      id: "approach",
      label: "Approach",
      accentStellarType: "strategy",
      subtitle: "Using AI to investigate the role, not impersonate validation",
      readingTime: 4,
      content: `I used public research, job descriptions, workflow documentation, industry material, and AI-assisted role simulation to build a more complete picture of the claim-adjuster experience.

The AI-generated persona was not treated as a substitute for a real person. It was used as a research instrument—a way to ask more specific questions about the role, pressure-test assumptions, and identify areas I needed to investigate further.

From that research, I mapped a customer and adjuster journey and explored where AI-assisted tools might support the process.

The concepts focused on areas such as:

• summarizing claim information
• identifying missing or conflicting evidence
• surfacing jurisdictional or policy considerations
• explaining why a case may require escalation
• helping the adjuster compare possible next steps
• preserving a clear record of how a decision was reached`,
      insight:
        "AI was most useful when it helped me ask better questions about an unfamiliar role—not when it pretended to be the final source of truth.",
      evidence: [
        {
          id: "post-accident-entry-flow",
          image: postAccidentEntryFlow,
          alt: "Post-accident entry flow screens",
          imageFit: "contain",
          number: "01",
          title: "Post-Accident Entry Flow",
          type: "Design Exploration",
          description:
            "The driver experience begins with a small set of direct actions and conversational guidance intended to reduce the immediate uncertainty of what to do after a collision.",
          caption:
            "The concept prioritizes orientation and reassurance before asking the user to begin a complex claims workflow.",
        },
        {
          id: "guided-evidence-capture",
          image: guidedEvidenceCapture,
          alt: "Guided vehicle damage evidence capture",
          imageFit: "contain",
          number: "02",
          title: "Guided Evidence Capture",
          type: "Interaction Pattern",
          description:
            "Visual prompts guide the driver toward usable damage photos while keeping the documentation task understandable and under their control.",
          caption:
            "AI assistance is positioned as guidance for producing better evidence rather than as an invisible evaluator.",
        },
        {
          id: "adjuster-claims-overview",
          image: adjustersClaimOverview,
          alt: "Claims adjuster overview dashboard",
          imageFit: "contain",
          number: "03",
          title: "Adjuster Claims Overview",
          type: "UI Concept",
          description:
            "A unified claims workspace intended to support triage, workload awareness, and faster orientation before the adjuster begins deeper analysis.",
          caption:
            "The dashboard explores how fragmented claim information might be consolidated without making AI the primary authority.",
        },
      ],
    },
    {
      id: "decisions",
      label: "Key Decisions",
      accentStellarType: "judgment",
      subtitle: "Keeping the adjuster responsible for the outcome",
      readingTime: 4,
      content: `One of the most important decisions was not to design AI as an autonomous claim decision-maker.

The system was positioned as decision support. It could gather information, surface patterns, and identify possible concerns, but the adjuster remained responsible for interpreting the situation and choosing what happened next.

I also avoided presenting the AI’s output as certain. The interface needed to distinguish between:

• verified information
• inferred information
• missing information
• potential conflicts
• recommended next steps

This made the concept less about automation and more about helping the user form a clearer understanding of the claim.`,
      insight:
        "The better design question was not, ‘What can the AI decide?’ It was, ‘What does the adjuster need to understand before making the decision?’",
      evidence: [
        {
          id: "estimate-confidence-explanation",
          image: estimateConfidenceExplanation,
          alt: "Estimate and confidence explanation interface",
          imageFit: "contain",
          number: "01",
          title: "Estimate and Confidence Explanation",
          type: "UI Component",
          description:
            "The damage estimate is paired with a confidence statement and plain-language explanation, positioning the output as an informed assessment rather than a final fact.",
          caption:
            "The design exposes uncertainty so the user can understand the limits of the system’s interpretation.",
        },
        {
          id: "contextual-claim-review",
          image: contextualClaimReview,
          alt: "Contextual claim review drawer",
          imageFit: "contain",
          number: "02",
          title: "Contextual Claim Review",
          type: "Interaction Pattern",
          description:
            "Selecting a claim opens supporting evidence and regulatory context beside the claims table, allowing the adjuster to investigate without losing awareness of the broader workload.",
          caption:
            "Progressive disclosure preserves context while making deeper evidence available when the adjuster needs it.",
        },
        {
          id: "editable-reserve-recommendation",
          image: editableReserveRecommendation,
          alt: "Editable reserve recommendation interface",
          imageFit: "contain",
          number: "03",
          title: "Editable Reserve Recommendation",
          type: "Decision Support",
          description:
            "The system proposes a reserve and exposes the underlying inputs, while the adjuster can change the amount, compare benchmarks, and document why their judgment differs.",
          caption:
            "The recommendation acts as a starting point; human judgment remains editable, explicit, and accountable.",
        },
      ],
    },
    {
      id: "outcomes",
      label: "Outcomes",
      accentStellarType: "agentic",
      subtitle: "What the exploration produced—and what it did not prove",
      readingTime: 3,
      content: `The project resulted in a conceptual customer and adjuster journey showing how AI-assisted tools could be introduced across the claims process.

It helped me identify several areas where AI might reduce cognitive load and improve access to relevant information. It also exposed the limits of designing for a regulated, high-stakes workflow without direct access to the people doing the work.

I did not conduct formal usability testing with claim adjusters, so I cannot claim that the concept improved speed, accuracy, trust, or decision quality.

That validation would require real users, realistic claim scenarios, and subject-matter experts who could evaluate whether the proposed experience reflected actual insurance practice.`,
      insight:
        "The outcome was a stronger hypothesis and a clearer research direction—not proof that the concept worked.",
      evidence: [
        {
          id: "submission-next-step-visibility",
          image: submissionNextStepVisibility,
          alt: "Claim submission and next-step visibility",
          imageFit: "contain",
          number: "01",
          title: "Submission and Next-Step Visibility",
          type: "Journey Outcome",
          description:
            "The final driver concept closes the submission flow with a structured summary, status progression, and visible handoff to the adjuster rather than ending at a generic confirmation screen.",
          caption:
            "The concept explores how a completed action can still communicate what happens next and who now owns the process.",
        },
        {
          id: "claim-stabilization-state-overview",
          image: claimStabilizationStateOne,
          alt: "Claim stabilization overview interface",
          imageFit: "contain",
          number: "02",
          title: "Claim Stabilization State",
          type: "UI State",
          description:
            "Once immediate decisions are complete, the interface shifts from active decision support into a stabilized status view showing completed actions and the claim’s current posture.",
          caption:
            "The overview helps the adjuster confirm what has been completed without reconstructing the claim from scattered information.",
        },
        {
          id: "claim-stabilization-monitoring",
          image: claimStabilizationStateTwo,
          alt: "Claim stabilization monitoring and reminders interface",
          imageFit: "contain",
          number: "03",
          title: "Ongoing Monitoring and Reminders",
          type: "UI State",
          description:
            "A supporting monitoring view surfaces remaining deadlines, upcoming events, and reminders after the claim moves out of active decision-making.",
          caption:
            "The second state explores how the system could remain vigilant after the adjuster has applied professional judgment.",
        },
        {
          id: "confidence-to-consequence",
          image: confidenceVsConsequence,
          alt: "Confidence-first and consequence-first dashboard comparison",
          imageFit: "contain",
          number: "04",
          title: "From Confidence-First to Consequence-First",
          type: "Design Evolution",
          description:
            "The adjuster dashboard evolved from generic confidence signals into a workflow organized around statutory deadlines, documentation readiness, regulatory exposure, and required action.",
          caption:
            "The redesign reflects a more grounded hypothesis about what an adjuster may need to see before deciding what deserves attention.",
        },
      ],
    },
    {
      id: "lessons",
      label: "Lessons",
      accentStellarType: "purpose",
      subtitle: "Knowing where simulated research has to stop",
      readingTime: 4,
      content: `The biggest lesson was that AI-generated research can help expand an investigation, but it cannot complete the validation.

AI helped me simulate the role, generate better questions, and uncover aspects of the domain I had not initially considered. It gave me enough context to design a more informed concept than I would have produced from assumptions alone.

But there was a clear stopping point.

Running the design back through another AI model would only produce a simulated evaluation and likely return artificial confidence scores. It would not tell me whether a real adjuster found the system useful, whether the information was legally appropriate, or whether the recommendations supported better decisions.

The experiment ended there because I did not have the bandwidth or access required to validate it responsibly.

That limitation became part of the project’s value. It taught me to distinguish between using AI to explore a problem and using evidence to prove that a solution works.`,
      insight:
        "I used AI to help me understand an unfamiliar role and explore a possible workflow, but I stopped before treating simulated feedback as real validation.",
      evidence: [
        {
          id: "emotional-repair-layer",
          image: emotionalRepairLayer,
          alt: "Emotional repair layer system map",
          imageFit: "contain",
          number: "01",
          title: "Emotional Repair Layer",
          type: "System Map",
          description:
            "A conceptual flow exploring what happens after an automated decision, including moments where a user may need to signal concern, request correction, or receive acknowledgment.",
          caption:
            "The map suggests that trust is not resolved when the system produces an answer; the interaction still needs a meaningful close.",
        },
        {
          id: "human-override-feedback",
          image: humanOverrideFeedback,
          alt: "Human override feedback model",
          imageFit: "contain",
          number: "02",
          title: "Human Override as Feedback",
          type: "Feedback Model",
          description:
            "A conceptual model showing how overrides, corrections, and repeated conversational friction could become signals for improving both the model and the surrounding workflow.",
          caption:
            "This remained a design hypothesis rather than an implemented or validated learning loop.",
        },
      ],
    },
  ],
};

export default defineAtlasEntry({
  id: "agentic-insurance",
  category: "case-study",
  signatureStellarType: "judgment",
  title: "Agentic Insurance",
  subtitle: focus.subheadline,
  tags: ["HUMAN AUTHORITY", "AI SUPPORT"],
  overview: {
    what:
      "A self-directed exploration of how AI-assisted tools might support claim adjusters and customers during complex insurance decisions.",
    why:
      "The project started during an interview process, but the research quickly exposed how little I understood about adjuster workflows, jurisdictional constraints, policy interpretation, and human accountability.",
    researchFocus:
      "I studied what claim adjusters do during a typical workday, how claims move through the system, where information becomes difficult to interpret, and where AI might reduce cognitive load without taking decision authority away from the user.",
    keyDiscovery:
      "AI helped me simulate the role and ask better questions, but it could not validate the solution. Real evidence would require real adjusters, realistic claim scenarios, and insurance subject-matter expertise.",
  },
  orbit: {
    angle: -45,
    radius: 115,
    speed: 1.2e-4,
    starPrefix: "ai",
  },
  overviewStars: [
    {
      id: "context",
      label: "CONTEXT",
      angle: -145,
      x: -0.95,
      y: -0.82,
      scale: 0.92,
      stellarType: "relational",
      intensity: "balanced",
      labelPosition: { side: "top", offset: 30 },
    },
    {
      id: "problem",
      label: "PROBLEM",
      angle: -96,
      x: -0.42,
      y: -0.38,
      scale: 1.05,
      stellarType: "risk",
      intensity: "bright",
      labelPosition: { side: "left", offset: 30 },
    },
    {
      id: "approach",
      label: "APPROACH",
      angle: -38,
      x: 0.28,
      y: -0.72,
      scale: 1.08,
      stellarType: "strategy",
      intensity: "balanced",
      labelPosition: { side: "top", offset: 30 },
    },
    {
      id: "decisions",
      label: "DECISIONS",
      angle: 18,
      x: 0.9,
      y: -0.08,
      scale: 1.18,
      stellarType: "judgment",
      intensity: "bright",
      labelPosition: { side: "right", offset: 32 },
    },
    {
      id: "outcomes",
      label: "OUTCOMES",
      angle: 72,
      x: 0.92,
      y: 0.62,
      scale: 1.08,
      stellarType: "agentic",
      intensity: "bright",
      labelPosition: { side: "right", offset: 30 },
    },
    {
      id: "lessons",
      label: "LESSONS",
      angle: 145,
      x: -0.72,
      y: 0.8,
      scale: 0.96,
      stellarType: "purpose",
      intensity: "balanced",
      labelPosition: { side: "left", offset: 30 },
    },
  ],
  constellation: {
    showCenterConnections: false,
    connections: [
      { from: "context", to: "problem", strength: "primary" },
      { from: "problem", to: "approach", strength: "primary" },
      { from: "approach", to: "decisions", strength: "primary" },
      { from: "decisions", to: "outcomes", strength: "primary" },
      { from: "outcomes", to: "lessons", strength: "primary" },
    ],
  },
  caseStudyId: "agentic-insurance",
  role: "Product Designer",
  year: 2024,
  sections: focus.sections,
});
